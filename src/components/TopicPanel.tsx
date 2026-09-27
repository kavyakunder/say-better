import type { Topic } from "../data/topics";

interface TopicPanelProps {
  topic: Topic;
  onNewTopic: () => void;
  /** True while recording, so a sample transcript can't replace a take in progress. */
  sampleDisabled?: boolean;
  onUseSampleAnswer?: () => void;
}

const CATEGORY_LABELS: Record<Topic["category"], string> = {
  nature: "Nature",
  technology: "Technology",
  human: "Human Behavior",
  space: "Space",
  everyday: "Everyday Mysteries",
  science: "Science",
};

export default function TopicPanel({ topic, onNewTopic, onUseSampleAnswer, sampleDisabled = false }: TopicPanelProps) {
  return (
    <section className="panel topic-panel">
      <header className="panel-header">
        <span className="panel-step">Step 1</span>
        <h2 className="panel-title">Your prompt</h2>
      </header>

      <div className="topic-card">
        <span className="topic-category">{CATEGORY_LABELS[topic.category]}</span>
        <h3 className="topic-text">{topic.question}</h3>
        {/* <p className="topic-spark">{topic.spark}</p> */}

        {topic.vocabWords.length > 0 && (
          <div className="topic-tags">
            <span className="topic-tags-label">Try to use</span>
            <ul className="topic-chip-list">
              {topic.vocabWords.map((v) => (
                <li key={v} className="topic-chip">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="topic-controls">
        <button className="btn btn-primary" type="button" onClick={onNewTopic}>
          New topic
        </button>

        {onUseSampleAnswer && (
          <button className="btn btn-ghost" type="button" onClick={onUseSampleAnswer} disabled={sampleDisabled}>
            Try a sample answer
          </button>
        )}
      </div>
    </section>
  );
}
