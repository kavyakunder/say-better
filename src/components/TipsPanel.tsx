const TIPS = [
  {
    title: "Have a shape",
    body: "Point → Reason → Example → Point. Know your start and finish.",
  },
  {
    title: "Slow down",

    body: "Aim for 120–150 WPM. Let your words breathe.",
  },
  {
    title: "Pause instead of “um”",
    body: "A short pause sounds more confident than a filler.",
  },
  {
    title: "Use the defined word early",
    body: "Work the target word into your first 15 seconds naturally",
  },
];

const FAQS = [
  {
    q: "Is my video uploaded anywhere?",
    a: "No. Your camera, mic, recording, and virtual background all stay in your browser.",
  },
  {
    q: "What gets sent for feedback?",
    a: "Only the text transcript and a few stats (word count, pace, filler count), and only when you tap “Get feedback.”",
  },
  {
    q: "The transcript looks wrong. What do I do?",
    a: "Speech recognition isn't perfect. Edit the transcript in the review step before asking for feedback. The coach only sees the text.",
  },
  {
    q: "Can I try it without recording?",
    a: "Yes. Tap “Try a sample answer” under the prompt to load an example transcript and go straight to feedback.",
  },
  {
    q: "Can I switch off my video?",
    a: "Yes, you can use audio only.but for confidence practice, we encourage keeping your video on.",
  },
];

export default function TipsFaqPanel() {
  return (
    <section id="tips" className="tips-faq" aria-labelledby="tips-heading">
      <div className="tips-section">
        <h2 id="tips-heading" className="section-title">
          Tips for a better take
        </h2>
        <ol className="tips-grid">
          {TIPS.map((tip, i) => (
            <li key={tip.title} className="tip-card">
              <span className="tip-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="tip-title">{tip.title}</h3>
              <p className="tip-body">{tip.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="faq-section">
        <div className="faq-intro">
          <h2 className="section-title">Questions</h2>
          <p className="faq-intro-text">Your recording never leaves this browser. Here's what else people ask.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary className="faq-question">{item.q}</summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
