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
  fillerControl: "Filler Control",
  confidence: "Confidence",
};

export default function FeedbackPanel({ onGetFeedback, loading, error, feedback }: FeedbackPanelProps) {
  return (
    <section className="panel feedback-panel">
      <p className="eyebrow">04 — coach's notes</p>

      <button className="btn btn-primary" type="button" onClick={onGetFeedback} disabled={loading}>
        {loading ? "Consulting the coach…" : "Get AI Feedback"}
      </button>

      <div className="feedback-result">
        {loading && <p className="loading-line">Consulting the coach…</p>}
        {!loading && error && <p className="error-line">{error}</p>}

        {!loading && !error && feedback && (
          <>
            <div className="score-grid">
              {(Object.keys(feedback.scores) as Array<keyof FeedbackResult["scores"]>).map((key) => (
                <div className="score-card" key={key}>
                  <span className="score-num">{feedback.scores[key]}</span>
                  <span className="score-label">{SCORE_LABELS[key]}</span>
                </div>
              ))}
            </div>

            <div className="feedback-block">
              <h4>Strengths</h4>
              <ul>
                {feedback.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="feedback-block">
              <h4>Areas to Improve</h4>
              <ul>
                {feedback.improvements.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {feedback.vocabUsed.length > 0 && (
              <div className="feedback-block vocab-block">
                <h4>Vocabulary Check</h4>
                <ul className="vocab-list">
                  {feedback.vocabUsed.map((v) => (
                    <li key={v.word} className={v.usedCorrectly ? "vocab-hit" : "vocab-miss"}>
                      <span className="vocab-badge">{v.usedCorrectly ? "✅" : "—"}</span>
                      <span className="vocab-word">{v.word}</span>
                      {v.quote && <span className="vocab-quote">"{v.quote}"</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.upgradedSentence && (
              <div className="feedback-block upgrade-block">
                <h4>Level It Up</h4>
                <p className="upgraded-sentence">{feedback.upgradedSentence}</p>
              </div>
            )}

            {feedback.reveal && (
              <div className="feedback-block reveal-block">
                <h4>🎉 Now You Know</h4>
                <p>{feedback.reveal}</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
