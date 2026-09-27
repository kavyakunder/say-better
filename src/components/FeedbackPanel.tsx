import type { FeedbackResult } from "../types";

interface FeedbackPanelProps {
  onGetFeedback: () => void;
  loading: boolean;
  error: string | null;
  feedback: FeedbackResult | null;
}

const SCORE_LABELS: Record<keyof FeedbackResult["scores"], string> = {
  clarity: "Clarity",
  structure: "Structure",
  pacing: "Pacing",
  fillerControl: "Filler control",
  confidence: "Confidence",
};

// Keep the at-a-glance view short; everything else lives in the breakdown.
const MAX_POINTS = 2;

export default function FeedbackPanel({ onGetFeedback, loading, error, feedback }: FeedbackPanelProps) {
  const scoreKeys = Object.keys(SCORE_LABELS) as Array<keyof FeedbackResult["scores"]>;
  const overall = feedback
    ? Math.round((scoreKeys.reduce((sum, key) => sum + (feedback.scores?.[key] ?? 0), 0) / scoreKeys.length) * 10) / 10
    : null;
  const vocab = feedback?.vocabUsed ?? [];
  const vocabHits = vocab.filter((v) => v.usedCorrectly).length;

  return (
    <section className="panel feedback-panel">
      <header className="panel-header">
        <span className="panel-step">Step 4</span>
        <h2 className="panel-title">Coach's notes</h2>
      </header>

      {!feedback && (
        <div className="feedback-cta">
          <p className="feedback-cta-text">
            Happy with the transcript? Send it to your coach for a score, a couple of pointers, and the answer to today's
            question.
          </p>
          <button className="btn btn-primary" type="button" onClick={onGetFeedback} disabled={loading}>
            {loading ? "Reviewing your take…" : "Get feedback"}
          </button>
        </div>
      )}

      {loading && (
        <div className="feedback-loading" role="status">
          <span className="spinner" aria-hidden="true" />
          Your coach is reviewing the transcript…
        </div>
      )}
      {!loading && error && (
        <p className="error-line" role="alert">
          {error}
        </p>
      )}

      {!loading && feedback && (
        <div className="feedback-result">
          <div className="summary-row">
            <div className="verdict">
              <div className="verdict-score">
                <span className="verdict-num">{overall}</span>
                <span className="verdict-out-of">/10</span>
              </div>
              {feedback.summary && <p className="verdict-summary">{feedback.summary}</p>}
            </div>

            <div className="pointer keep">
              <h3>Keep doing</h3>
              <ul>
                {(feedback.strengths ?? []).slice(0, MAX_POINTS).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="pointer next">
              <h3>Try next time</h3>
              <ul>
                {(feedback.improvements ?? []).slice(0, MAX_POINTS).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {vocab.length > 0 && (
            <div className="vocab-summary">
              <span className="vocab-summary-label">
                Vocabulary · {vocabHits}/{vocab.length}
              </span>
              <ul className="vocab-chips">
                {vocab.map((v) => (
                  <li
                    key={v.word}
                    className={`vocab-chip ${v.usedCorrectly ? "hit" : "miss"}`}
                    title={v.quote ? `"${v.quote}"` : "Not used"}
                  >
                    <span aria-hidden="true">{v.usedCorrectly ? "✓" : "–"}</span>
                    {v.word}
                    <span className="visually-hidden">{v.usedCorrectly ? " (used well)" : " (missed)"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feedback.reveal && (
            <div className="reveal-card">
              <span className="reveal-eyebrow">Now you know</span>
              <p>{feedback.reveal}</p>
            </div>
          )}

          <details className="breakdown">
            <summary>Show full breakdown</summary>
            <div className="breakdown-body">
              <ul className="score-list">
                {scoreKeys.map((key) => {
                  const value = feedback.scores?.[key] ?? 0;
                  return (
                    <li key={key}>
                      <span className="score-label">{SCORE_LABELS[key]}</span>
                      <span className="score-meter" aria-hidden="true">
                        <span style={{ width: `${Math.min(10, Math.max(0, value)) * 10}%` }} />
                      </span>
                      <span className="score-num">{value}</span>
                    </li>
                  );
                })}
              </ul>
              {feedback.upgradedSentence && (
                <div>
                  <h3 className="breakdown-heading">Level it up</h3>
                  <blockquote className="upgraded-sentence">{feedback.upgradedSentence}</blockquote>
                </div>
              )}
            </div>
          </details>

          <button className="btn btn-ghost feedback-retry" type="button" onClick={onGetFeedback}>
            Get feedback again
          </button>
        </div>
      )}
    </section>
  );
}
