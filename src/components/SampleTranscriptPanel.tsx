import type { FillerCount } from "../types";

interface SampleTranscriptPanelProps {
  transcript: string;
  wordCount: number;
  fillerCounts: FillerCount[];
}

// Shown for "Try a sample answer", where there's no recording or Review panel,
// so you can read exactly what the coach graded.
export default function SampleTranscriptPanel({ transcript, wordCount, fillerCounts }: SampleTranscriptPanelProps) {
  const totalFillers = fillerCounts.reduce((sum, f) => sum + f.count, 0);
  // Sample scripts are stored with hard line breaks; show them as one paragraph.
  const text = transcript.replace(/\s+/g, " ").trim();

  return (
    <section className="panel sample-transcript-panel">
      <header className="panel-header">
        <span className="panel-step">Sample answer</span>
        <h2 className="panel-title">The transcript</h2>
      </header>

      <p className="sample-meta">
        {wordCount} words · {totalFillers} filler {totalFillers === 1 ? "word" : "words"} · the text the coach reviewed
      </p>
      <blockquote className="sample-transcript">{text}</blockquote>
    </section>
  );
}
