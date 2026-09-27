import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TopicPanel from "./components/TopicPanel";
import RecordPanel from "./components/RecordPanel";
import ReviewPanel from "./components/ReviewPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import { TOPICS, getRandomTopic } from "./data/topics";
import { countFillerWords, countWords, wordsPerMinute } from "./utils/fillerWords";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useAudioWaveform } from "./hooks/useAudioWaveform";
import { useRecorder } from "./hooks/useRecorder";
import { useVirtualBackground } from "./hooks/useVirtualBackground";
import { BACKGROUNDS } from "./data/backgrounds";
import type { BackgroundOption } from "./data/backgrounds";
import { RECORD_SECONDS } from "./config";
import type { FeedbackResult } from "./types";
import { SAMPLE_ANSWERS } from "./utils/test";
import TipsFaqPanel from "./components/TipsPanel";
import LogoMark from "./components/Logo";

const STEPS = ["Prompt", "Record", "Review", "Feedback"];

// Only these topics have a written sample answer to try the feedback with.
const SAMPLE_TOPICS = TOPICS.filter((t) => t.id in SAMPLE_ANSWERS);

export default function App() {
  // --- topic -----------------------------------------------------------
  const [topic, setTopic] = useState(() => getRandomTopic(null));

  // --- camera / mic ------------------------------------------------------
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleEnableCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      setCameraError(null);
    } catch (err) {
      setCameraError(err instanceof Error ? err.message : "unknown error");
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  useAudioWaveform(canvasRef, mediaStream);

  // --- virtual background ----------------------------------------------------
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);
  const [background, setBackground] = useState<BackgroundOption>(BACKGROUNDS[0]);
  const virtualBackground = useVirtualBackground({
    sourceVideoRef: videoRef,
    outputCanvasRef,
    mediaStream,
    background,
  });

  // --- transcription -------------------------------------------------------
  const speech = useSpeechRecognition();
  const transcriptRef = useRef("");
  useEffect(() => {
    transcriptRef.current = speech.transcript;
  }, [speech.transcript]);

  // --- review state (post-recording) --------------------------------------
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [reviewTranscript, setReviewTranscript] = useState("");
  const [hasRecorded, setHasRecorded] = useState(false);

  const handleRecordStart = useCallback(() => {
    speech.reset();
    speech.start();
  }, [speech]);

  const handleRecordStop = useCallback(
    (blob: Blob, duration: number) => {
      speech.stop();
      setVideoUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return URL.createObjectURL(blob);
      });
      setDurationSeconds(duration);
      // Read from the ref, not speech.transcript directly — this callback was
      // captured when recording *started*, so the state variable would be stale.
      setReviewTranscript(transcriptRef.current.trim());
      setHasRecorded(true);
      // reset AI feedback from any previous take
      setFeedback(null);
      setFeedbackError(null);
    },
    [speech],
  );

  const recorder = useRecorder({
    recordSeconds: RECORD_SECONDS,
    onStart: handleRecordStart,
    onStop: handleRecordStop,
  });

  const handleStartRecording = useCallback(() => {
    // Record the composited canvas so the chosen background ends up in the video.
    const stream = virtualBackground.outputStream ?? mediaStream;
    if (stream) recorder.start(stream);
  }, [virtualBackground.outputStream, mediaStream, recorder]);

  // --- testing shortcut: skip camera/mic entirely ---------------------------
  const handleUseSampleAnswer = useCallback(() => {
    // If this topic has no sample, switch to one that does so the answer matches the question.
    const sampleTopic =
      topic.id in SAMPLE_ANSWERS ? topic : SAMPLE_TOPICS[Math.floor(Math.random() * SAMPLE_TOPICS.length)];
    setTopic(sampleTopic);
    // A sample has no video, so drop any earlier take's recording.
    setVideoUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
    setDurationSeconds(60);
    setReviewTranscript(SAMPLE_ANSWERS[sampleTopic.id]);
    setHasRecorded(true);
    feedbackRequestRef.current++;
    setFeedback(null);
    setFeedbackError(null);
    setFeedbackLoading(false);
  }, [topic]);

  // --- derived stats -------------------------------------------------------
  const wordCount = useMemo(() => countWords(reviewTranscript), [reviewTranscript]);
  const wpm = useMemo(() => wordsPerMinute(wordCount, durationSeconds), [wordCount, durationSeconds]);
  const fillerCounts = useMemo(() => countFillerWords(reviewTranscript), [reviewTranscript]);

  const transcriptSourceNote = speech.supported
    ? "(auto-transcribed — please proofread, edit below if needed✏️; speech recognition isn't perfect)"
    : "(not auto-transcribed in this browser — type what you said)";

  // --- AI feedback -----------------------------------------------------------
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  // Bumped on every request and on reset, so a slow response for an old take is ignored.
  const feedbackRequestRef = useRef(0);

  const handleGetFeedback = useCallback(async () => {
    if (!reviewTranscript.trim()) {
      setFeedbackError("There's no transcript to review yet — record a take or type one in.");
      return;
    }

    const requestId = ++feedbackRequestRef.current;
    setFeedbackLoading(true);
    setFeedbackError(null);

    const totalFillers = fillerCounts.reduce((s, f) => s + f.count, 0);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.question,
          transcript: reviewTranscript,
          durationSeconds,
          wordCount,
          wpm,
          fillerWordCount: totalFillers,
          vocabWords: topic.vocabWords,
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed (${response.status})`);
      }

      const parsed: FeedbackResult = await response.json();
      if (requestId === feedbackRequestRef.current) setFeedback(parsed);
    } catch (err) {
      if (requestId === feedbackRequestRef.current) {
        setFeedbackError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      if (requestId === feedbackRequestRef.current) setFeedbackLoading(false);
    }
  }, [reviewTranscript, topic, durationSeconds, wordCount, wpm, fillerCounts]);

  // --- new topic: start over ---------------------------------------------------
  const handleNewTopic = useCallback(() => {
    // Abandon any take in progress and put the timer back to full.
    recorder.cancel();
    speech.stop();
    feedbackRequestRef.current++;
    setTopic((prev) => getRandomTopic(prev));
    setVideoUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
    setDurationSeconds(0);
    setReviewTranscript("");
    setHasRecorded(false);
    setFeedback(null);
    setFeedbackError(null);
    setFeedbackLoading(false);
    speech.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [recorder, speech]);

  const currentStep = feedback ? 3 : hasRecorded ? 2 : mediaStream ? 1 : 0;

  // Bring the results into view once a take (or sample answer) is ready.
  const resultsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hasRecorded) resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hasRecorded, videoUrl]);

  const showReview = hasRecorded && !!videoUrl;

  return (
    <>
      <div className="stage-bg" aria-hidden="true" />

      <header className="topbar">
        <div className="topbar-inner">
          <a className="wordmark" href="#" aria-label="Say Better, home">
            <LogoMark />
            <span className="wordmark-text">
              Say <span className="wordmark-accent">Better</span>
            </span>
          </a>
          <ol className="steps" aria-label="Progress">
            {STEPS.map((label, i) => {
              const state = i < currentStep ? "done" : i === currentStep ? "current" : "upcoming";
              return (
                <li key={label} className={`step ${state}`} aria-current={state === "current" ? "step" : undefined}>
                  <span className="step-num">{i + 1}</span>
                  <span className="step-label">{label}</span>
                </li>
              );
            })}
          </ol>
          <a className="topbar-link" href="#tips">
            Tips &amp; FAQ
          </a>
        </div>
      </header>

      <main className="page">
        <section className="intro">
          <h1 className="intro-title">Turn curiosity into clarity</h1>
          <p className="intro-text">
            Research a prompt. Explain it in one minute. Get coached on how clearly you articulate your thoughts.
          </p>
        </section>

        <div className="workspace">
          <TopicPanel
            topic={topic}
            onNewTopic={handleNewTopic}
            onUseSampleAnswer={handleUseSampleAnswer}
            sampleDisabled={recorder.isRecording}
          />

          <RecordPanel
            videoRef={videoRef}
            outputCanvasRef={outputCanvasRef}
            canvasRef={canvasRef}
            background={background}
            onBackgroundChange={setBackground}
            backgroundStatus={virtualBackground.status}
            cameraReady={!!mediaStream}
            cameraError={cameraError}
            onEnableCamera={handleEnableCamera}
            isRecording={recorder.isRecording}
            remainingSeconds={recorder.remainingSeconds}
            recordSecondsTotal={RECORD_SECONDS}
            onStartRecording={handleStartRecording}
            onStopRecording={recorder.stop}
            speechRecognitionSupported={speech.supported}
          />
        </div>

        {hasRecorded && (
          <div ref={resultsRef} className="results">
            {showReview && videoUrl && (
              <ReviewPanel
                videoUrl={videoUrl}
                durationSeconds={durationSeconds}
                transcript={reviewTranscript}
                onTranscriptChange={setReviewTranscript}
                transcriptSourceNote={transcriptSourceNote}
                wordCount={wordCount}
                wpm={wpm}
                fillerCounts={fillerCounts}
              />
            )}

            <FeedbackPanel
              onGetFeedback={handleGetFeedback}
              loading={feedbackLoading}
              error={feedbackError}
              feedback={feedback}
            />
          </div>
        )}

        <TipsFaqPanel />
      </main>

      <footer className="site-footer">
        <p>Say Better · Your camera and mic never leave this browser.</p>
      </footer>
    </>
  );
}
