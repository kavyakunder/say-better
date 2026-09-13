// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import TopicPanel from "./components/TopicPanel";
// import RecordPanel from "./components/RecordPanel";
// import ReviewPanel from "./components/ReviewPanel";
// import FeedbackPanel from "./components/FeedbackPanel";
// import { getRandomTopic } from "./data/topics";
// import { countFillerWords, countWords, wordsPerMinute } from "./utils/fillerWords";
// import { parseFeedback } from "./utils/markdown";
// import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
// import { useAudioWaveform } from "./hooks/useAudioWaveform";
// import { useRecorder } from "./hooks/useRecorder";
// import { CLAUDE_API_URL, CLAUDE_MODEL, RECORD_SECONDS } from "./config";
// import type { FeedbackResult } from "./types";
// import { SAMPLE_ANSWERS } from "./utils/test";

// export default function App() {
//   // --- topic -----------------------------------------------------------
//   const [topic, setTopic] = useState(() => getRandomTopic(null));
//   const handleNewTopic = useCallback(() => {
//     setTopic((prev) => getRandomTopic(prev));
//   }, []);

//   // --- camera / mic ------------------------------------------------------
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
//   const [cameraError, setCameraError] = useState<string | null>(null);

//   const handleEnableCamera = useCallback(async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setMediaStream(stream);
//       setCameraError(null);
//     } catch (err) {
//       setCameraError(err instanceof Error ? err.message : "unknown error");
//     }
//   }, []);

//   const handleUseSampleAnswer = () => {
//     console.log("sjssj");
//     setDurationSeconds(60);
//     setReviewTranscript(SAMPLE_ANSWERS[topic.id] ?? SAMPLE_ANSWERS.popcorn);
//     setHasRecorded(true);
//     setFeedback(null);
//     setFeedbackError(null);
//   };

//   useEffect(() => {
//     if (videoRef.current && mediaStream) {
//       videoRef.current.srcObject = mediaStream;
//     }
//   }, [mediaStream]);

//   useAudioWaveform(canvasRef, mediaStream);

//   // --- transcription -------------------------------------------------------
//   const speech = useSpeechRecognition();
//   const transcriptRef = useRef("");
//   useEffect(() => {
//     transcriptRef.current = speech.transcript;
//   }, [speech.transcript]);

//   // --- review state (post-recording) --------------------------------------
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [durationSeconds, setDurationSeconds] = useState(0);
//   const [reviewTranscript, setReviewTranscript] = useState("");
//   const [hasRecorded, setHasRecorded] = useState(false);

//   const handleRecordStart = useCallback(() => {
//     speech.reset();
//     speech.start();
//   }, [speech]);

//   const handleRecordStop = useCallback(
//     (blob: Blob, duration: number) => {
//       speech.stop();
//       setVideoUrl((prevUrl) => {
//         if (prevUrl) URL.revokeObjectURL(prevUrl);
//         return URL.createObjectURL(blob);
//       });
//       setDurationSeconds(duration);
//       // Read from the ref, not speech.transcript directly — this callback was
//       // captured when recording *started*, so the state variable would be stale.
//       setReviewTranscript(transcriptRef.current.trim());
//       setHasRecorded(true);
//       // reset AI feedback from any previous take
//       setFeedback(null);
//       setFeedbackError(null);
//     },
//     [speech],
//   );

//   const recorder = useRecorder({
//     recordSeconds: RECORD_SECONDS,
//     onStart: handleRecordStart,
//     onStop: handleRecordStop,
//   });

//   const handleStartRecording = useCallback(() => {
//     if (mediaStream) recorder.start(mediaStream);
//   }, [mediaStream, recorder]);

//   // --- derived stats -------------------------------------------------------
//   const wordCount = useMemo(() => countWords(reviewTranscript), [reviewTranscript]);
//   const wpm = useMemo(() => wordsPerMinute(wordCount, durationSeconds), [wordCount, durationSeconds]);
//   const fillerCounts = useMemo(() => countFillerWords(reviewTranscript), [reviewTranscript]);

//   const transcriptSourceNote = speech.supported
//     ? "(auto-transcribed — please proofread, speech recognition isn't perfect)"
//     : "(not auto-transcribed in this browser — type what you said)";

//   // --- AI feedback -----------------------------------------------------------
//   const [apiKey, setApiKey] = useState("");
//   const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
//   const [feedbackLoading, setFeedbackLoading] = useState(false);
//   const [feedbackError, setFeedbackError] = useState<string | null>(null);

//   const handleGetFeedback = useCallback(async () => {
//     if (!apiKey.trim()) {
//       setFeedbackError("Add your Anthropic API key above first.");
//       return;
//     }
//     if (!reviewTranscript.trim()) {
//       setFeedbackError("There's no transcript to review yet — record a take or type one in.");
//       return;
//     }

//     setFeedbackLoading(true);
//     setFeedbackError(null);

//     const totalFillers = fillerCounts.reduce((s, f) => s + f.count, 0);
//     const prompt = `You are a supportive but honest public-speaking coach. Someone just gave a ${durationSeconds}-second impromptu speech on this prompt:

// "${topic}"

// Here is the transcript (auto-transcribed, may contain small errors):
// """
// ${reviewTranscript}
// """

// Stats: ${wordCount} words, ~${wpm ?? "unknown"} words per minute, ${totalFillers} filler words detected.

// Respond in EXACTLY this format, with no text before or after it:

// SCORES: Clarity=<1-10>, Structure=<1-10>, Pacing=<1-10>, Filler Control=<1-10>, Confidence=<1-10>

// ## Strengths
// - 2-3 bullets on what worked, specific to what they actually said

// ## Areas to Improve
// - 2-3 bullets, specific and actionable, not generic

// ## Try Next Time
// - 2-3 concrete drills or techniques they could practice before their next take`;

//     try {
//       const response = await fetch(CLAUDE_API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": apiKey.trim(),
//           "anthropic-version": "2023-06-01",
//           "anthropic-dangerous-direct-browser-access": "true",
//         },
//         body: JSON.stringify({
//           model: CLAUDE_MODEL,
//           max_tokens: 900,
//           messages: [{ role: "user", content: prompt }],
//         }),
//       });

//       if (!response.ok) {
//         const errBody = await response.text();
//         throw new Error(`API returned ${response.status}: ${errBody.slice(0, 200)}`);
//       }

//       const data = await response.json();
//       const text = (data.content ?? [])
//         .filter((block: { type: string }) => block.type === "text")
//         .map((block: { text: string }) => block.text)
//         .join("\n");

//       setFeedback(parseFeedback(text));
//     } catch (err) {
//       setFeedbackError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setFeedbackLoading(false);
//     }
//   }, [apiKey, reviewTranscript, topic, durationSeconds, wordCount, wpm, fillerCounts]);

//   return (
//     <>
//       <div className="stage-bg" aria-hidden="true" />

//       <header className="site-header">
//         <div className="wordmark">
//           <span className="wordmark-dot" />
//           ON&nbsp;THE&nbsp;SPOT
//         </div>
//         <p className="tagline">impromptu speech practice, with a coach in your pocket</p>
//       </header>

//       <main>
//         {/* <TopicPanel topic={topic} onNewTopic={handleNewTopic} /> */}

//         <TopicPanel topic={topic} onNewTopic={handleNewTopic} onUseSampleAnswer={handleUseSampleAnswer} />
//         <RecordPanel
//           videoRef={videoRef}
//           canvasRef={canvasRef}
//           cameraReady={!!mediaStream}
//           cameraError={cameraError}
//           onEnableCamera={handleEnableCamera}
//           isRecording={recorder.isRecording}
//           remainingSeconds={recorder.remainingSeconds}
//           recordSecondsTotal={RECORD_SECONDS}
//           onStartRecording={handleStartRecording}
//           onStopRecording={recorder.stop}
//           speechRecognitionSupported={speech.supported}
//         />
//         <button onClick={handleUseSampleAnswer}>🧪 Test with sample answer</button>

//         {hasRecorded && videoUrl && (
//           <ReviewPanel
//             videoUrl={videoUrl}
//             durationSeconds={durationSeconds}
//             transcript={reviewTranscript}
//             onTranscriptChange={setReviewTranscript}
//             transcriptSourceNote={transcriptSourceNote}
//             wordCount={wordCount}
//             wpm={wpm}
//             fillerCounts={fillerCounts}
//           />
//         )}

//         {hasRecorded && (
//           <FeedbackPanel
//             onGetFeedback={handleGetFeedback}
//             loading={feedbackLoading}
//             error={feedbackError}
//             feedback={feedback}
//           />
//         )}
//       </main>

//       <footer className="site-footer">
//         <p>Built for practicing on your feet. Nothing you record is uploaded anywhere by this app.</p>
//       </footer>
//     </>
//   );
// }

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TopicPanel from "./components/TopicPanel";
import RecordPanel from "./components/RecordPanel";
import ReviewPanel from "./components/ReviewPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import { getRandomTopic } from "./data/topics";
import { countFillerWords, countWords, wordsPerMinute } from "./utils/fillerWords";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useAudioWaveform } from "./hooks/useAudioWaveform";
import { useRecorder } from "./hooks/useRecorder";
import { RECORD_SECONDS } from "./config";
import type { FeedbackResult } from "./types";
import { SAMPLE_ANSWERS } from "./utils/test";

export default function App() {
  // --- topic -----------------------------------------------------------
  const [topic, setTopic] = useState(() => getRandomTopic(null));
  const handleNewTopic = useCallback(() => {
    setTopic((prev) => getRandomTopic(prev));
  }, []);

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
    if (mediaStream) recorder.start(mediaStream);
  }, [mediaStream, recorder]);

  // --- testing shortcut: skip camera/mic entirely ---------------------------
  const handleUseSampleAnswer = useCallback(() => {
    setDurationSeconds(60);
    setReviewTranscript(SAMPLE_ANSWERS[topic.id] ?? SAMPLE_ANSWERS.popcorn);
    setHasRecorded(true);
    setFeedback(null);
    setFeedbackError(null);
  }, [topic]);

  // --- derived stats -------------------------------------------------------
  const wordCount = useMemo(() => countWords(reviewTranscript), [reviewTranscript]);
  const wpm = useMemo(() => wordsPerMinute(wordCount, durationSeconds), [wordCount, durationSeconds]);
  const fillerCounts = useMemo(() => countFillerWords(reviewTranscript), [reviewTranscript]);

  const transcriptSourceNote = speech.supported
    ? "(auto-transcribed — please proofread, speech recognition isn't perfect)"
    : "(not auto-transcribed in this browser — type what you said)";

  // --- AI feedback -----------------------------------------------------------
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const handleGetFeedback = useCallback(async () => {
    if (!reviewTranscript.trim()) {
      setFeedbackError("There's no transcript to review yet — record a take or type one in.");
      return;
    }

    setFeedbackLoading(true);
    setFeedbackError(null);

    const totalFillers = fillerCounts.reduce((s, f) => s + f.count, 0);

    console.log("topic", topic, reviewTranscript);
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

      console.log("responsee", response);
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed (${response.status})`);
      }

      const parsed: FeedbackResult = await response.json();
      setFeedback(parsed);
    } catch (err) {
      setFeedbackError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setFeedbackLoading(false);
    }
  }, [reviewTranscript, topic, durationSeconds, wordCount, wpm, fillerCounts]);

  return (
    <>
      <div className="stage-bg" aria-hidden="true" />

      <header className="site-header">
        <div className="wordmark">
          <span className="wordmark-dot" />
          ON&nbsp;THE&nbsp;SPOT
        </div>
        <p className="tagline">impromptu speech practice, with a coach in your pocket</p>
      </header>

      <main>
        <TopicPanel topic={topic} onNewTopic={handleNewTopic} onUseSampleAnswer={handleUseSampleAnswer} />

        <RecordPanel
          videoRef={videoRef}
          canvasRef={canvasRef}
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

        {hasRecorded && videoUrl && (
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

        {hasRecorded && (
          <FeedbackPanel
            onGetFeedback={handleGetFeedback}
            loading={feedbackLoading}
            error={feedbackError}
            feedback={feedback}
          />
        )}
      </main>

      <footer className="site-footer">
        <p>Built for practicing on your feet. Nothing you record is uploaded anywhere by this app.</p>
      </footer>
    </>
  );
}
