import type { Topic } from "../data/topics";

interface TopicPanelProps {
  topic: Topic;
  onNewTopic: () => void;
  onUseSampleAnswer?: () => void;
}

const CATEGORY_LABELS: Record<Topic["category"], string> = {
  nature: "🌿 Nature",
  technology: "💻 Technology",
  human: "🧠 Human Behavior",
  space: "🌌 Space",
  everyday: "🏙️ Everyday Mysteries",
  science: "🔬 Science",
};

export default function TopicPanel({ topic, onNewTopic, onUseSampleAnswer }: TopicPanelProps) {
  return (
    <section className="panel topic-panel">
      <p className="eyebrow">01 — your prompt</p>

      <div className="topic-card">
        <span className="topic-category">{CATEGORY_LABELS[topic.category]}</span>
        <p className="topic-text">{topic.question}</p>
        <p className="topic-spark">{topic.spark}</p>

        {topic.lookInto.length > 0 && (
          <div className="topic-look-into">
            <span className="topic-look-into-label">Look into:</span> {topic.lookInto.join(" · ")}
          </div>
        )}

        {topic.vocabWords.length > 0 && (
          <div className="topic-vocab">
            <span className="topic-vocab-label">Try to use:</span> {topic.vocabWords.map((v) => v.word).join(", ")}
          </div>
        )}
      </div>

      <div className="topic-controls">
        <button className="btn btn-ghost" type="button" onClick={onNewTopic}>
          🎲 New Topic
        </button>

        {onUseSampleAnswer && (
          <button className="btn btn-ghost" type="button" onClick={onUseSampleAnswer}>
            🧪 Use Sample Answer (testing)s
          </button>
        )}
      </div>
    </section>
  );
}
