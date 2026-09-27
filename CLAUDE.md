# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this app is

**On the Spot** — a curiosity + vocabulary speaking coach. The user gets a
curiosity question (e.g. "Why does popcorn pop?"), researches it briefly,
records a ~60-second spoken explanation on camera, reviews the tape, and gets
AI feedback: scores, strengths, improvements, target-vocab usage, an upgraded
sentence, and a "Now You Know" reveal.

Video never leaves the browser. Only the transcript + stats are POSTed to the
serverless function.

## Commands

```bash
npm install
npm run dev       # Vite dev server + /api routes via plugin in vite.config.ts
npm run build     # tsc -b type-check, then vite build → dist/
npm run lint      # oxlint
npm run preview   # serve the production build
```

There is no test runner. `src/utils/test.ts` holds sample answers
(`SAMPLE_ANSWERS`) for manually exercising the feedback flow.

Node 20.x is required (`engines` in `package.json`).

## Stack

- React 19 + TypeScript + Vite 8
- oxlint for linting
- Vercel for hosting; `api/` contains Vercel serverless functions (`@vercel/node`)

## Architecture

```
src/
  App.tsx              top-level state machine (AppStep: "topic" | "record" | "review")
  config.ts            RECORD_SECONDS
  types.ts             FeedbackResult, VocabCheck, FillerCount, etc.
  data/topics.ts       TOPICS: Topic[] — the curiosity questions
  data/backgrounds.ts  virtual background options (images live in public/backgrounds/)
  hooks/
    useRecorder.ts            MediaRecorder + countdown
    useSpeechRecognition.ts   Web Speech API (Chrome/Edge only)
    useAudioWaveform.ts       canvas waveform from mic input
    useVirtualBackground.ts   MediaPipe selfie segmentation → composites camera onto
                              blur/image background in a canvas; that canvas stream
                              (plus mic audio) is what gets recorded
  utils/
    fillerWords.ts     filler-word counts + WPM
    test.ts            SAMPLE_ANSWERS for trying feedback without recording
  components/          TopicPanel, TipsPanel, RecordPanel, ReviewPanel, FeedbackPanel
api/
  feedback.ts          POST /api/feedback — builds the coaching prompt, calls the LLM,
                       returns JSON matching FeedbackResult
```

### Feedback API

- `api/feedback.ts` calls **Groq** (`openai/gpt-oss-120b`) using `GROQ_API_KEY`.
- Request body: `{ topic, transcript, durationSeconds, wordCount, wpm, fillerWordCount, vocabWords? }`.
- Inputs are capped (transcript 6000 chars, 10 vocab words) — keep these caps.
- The response JSON shape must stay in sync with `FeedbackResult` in
  `src/types.ts`. If you change one, change the other.
- API keys live only in server-side env vars (`.env` / `.env.local` /
  Vercel project settings). Never import them into `src/` or commit them.

## Conventions

- Keep hooks focused on one browser API each; `App.tsx` wires them together.
- Styling lives in `src/index.css` using CSS custom properties at the top of
  the file — no CSS framework.
- Speech-recognition types are hand-declared in `useSpeechRecognition.ts`
  rather than pulling in an `@types` package.
- Camera/mic need a secure context; `localhost` works in dev.

## Adding a topic

Add an entry to `TOPICS` in `src/data/topics.ts`:

```ts
{
  id: "kebab-case-id",
  category: "nature" | "technology" | "human" | "space" | "everyday" | "science",
  question: "The curiosity question?",
  spark: "One or two sentences of hook that make you want to know the answer.",
  lookInto: ["2-4 search terms to research"],
  vocabWords: [{ word: "term", definition: "plain-English definition" }], // ~5 words
  reveal: "2-3 sentence clear, accurate answer shown at the end.",
}
```

Use the question bank below as the source for new topics.

## Curiosity question bank

Candidate questions for new topics — each is answerable in about a minute
after a few minutes of research. Pick from here when adding to `TOPICS`.

### Technology
- How does Wi-Fi work?
- How does a touchscreen know where your finger is?
- How does a microwave heat food?
- How does Bluetooth pair two devices?
- How does a QR code store information?
- How does a fridge keep things cold?
- How does a credit card tap-to-pay work?
- How does a phone's camera focus so fast?

### Human body & mind
- Why do we yawn when we see someone else yawn?
- Why do we get goosebumps?
- Why do our fingers wrinkle in water?
- Why can't you tickle yourself?
- Why do we dream?
- Why do onions make us cry?
- Why do we get "brain freeze" from cold food?
- Why do some songs get stuck in our heads?

### Nature
- Why do leaves change color in autumn?
- How do bees make honey?
- Why do cats purr?
- How do chameleons change color?
- Why do fireflies glow?
- How do salmon find their way back to the river they were born in?

### Space
- Why does the Moon look bigger near the horizon?
- Why is the sky blue but sunsets red?
- What makes the northern lights?
- Why do stars twinkle but planets don't?
- How do astronauts sleep in space?

### Science
- Why does ice float?
- How do magnets work?
- Why does thunder follow lightning?
- How does soap actually clean things?
- Why does salt melt ice on roads?
- How do rainbows form?

### Everyday
- Why do we have leap years?
- Why is the keyboard laid out as QWERTY?
- How does a vending machine know what coin you put in?
- Why does bread go stale?
- Why do airplanes leave white trails in the sky?
- Why do time zones exist?
