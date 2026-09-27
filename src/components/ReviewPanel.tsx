import type { FillerCount } from "../types";

interface ReviewPanelProps {
  videoUrl: string;
  durationSeconds: number;
  transcript: string;
  onTranscriptChange: (value: string) => void;
  transcriptSourceNote: string;
  wordCount: number;
  wpm: number | null;
  fillerCounts: FillerCount[];
}

export default function ReviewPanel({
  videoUrl,
  durationSeconds,
  transcript,
  onTranscriptChange,
  transcriptSourceNote,
  wordCount,
  wpm,
  fillerCounts,
}: ReviewPanelProps) {
  const totalFillers = fillerCounts.reduce((sum, f) => sum + f.count, 0);
  const durationLabel = `${Math.floor(durationSeconds / 60)}:${String(durationSeconds % 60).padStart(2, "0")}`;

  return (
    <section className="panel review-panel">
      <header className="panel-header">
        <span className="panel-step">Step 3</span>
        <h2 className="panel-title">Review the tape</h2>
      </header>

      <div className="review-layout">
        <div className="review-video-col">
          <video src={videoUrl} controls playsInline />
          <a className="btn btn-ghost" href={videoUrl} download="on-the-spot-recording.webm">
            Download video
          </a>
        </div>

        <div className="review-main-col">
          <div className="review-stats">
            <div className="stat-card">
              <span className="stat-value">{durationLabel}</span>
              <span className="stat-label">Duration</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{wpm ?? "—"}</span>
              <span className="stat-label">Words/min</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{wordCount || "—"}</span>
              <span className="stat-label">Total words</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{totalFillers}</span>
              <span className="stat-label">Filler words</span>
            </div>
          </div>

          <div className="transcript-block">
            <label htmlFor="transcript-box">
              Transcript <span className="hint-inline">{transcriptSourceNote}</span>
            </label>
            <textarea
              id="transcript-box"
              rows={6}
              placeholder="If your browser doesn't support live transcription, type or paste what you said here."
              value={transcript}
              onChange={(e) => onTranscriptChange(e.target.value)}
            />
          </div>

          {totalFillers > 0 && (
            <div>
              <p className="filler-heading">Filler words</p>
              <div className="filler-breakdown">
                {fillerCounts
                  .filter((f) => f.count > 0)
                  .sort((a, b) => b.count - a.count)
                  .map((f) => (
                    <span className="filler-chip" key={f.phrase}>
                      "{f.phrase}" × {f.count}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
