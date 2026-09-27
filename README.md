# Say Better — Curiosity Speech Coach.

Practice explaining things out loud. On the Spot gives you a curiosity
question ("Why does popcorn pop?"), a few things to look into, and a handful
of vocabulary words to work in. Research it for a couple of minutes, then
record a one-minute explanation on camera and get AI coaching on clarity,
structure, pacing, filler words, confidence, and how well you used the
vocabulary. You finish with a short "Now You Know" answer to the question.

**Privacy:** your video and audio never leave the browser. Only the text
transcript and a few stats (word count, pace, filler count) are sent to the
feedback API, and only when you ask for feedback.

## Features

- Random curiosity topics across nature, technology, space, science, the human
  body, and everyday life, each with research prompts and target vocabulary
- 60-second camera recording with a countdown ring and live mic waveform
- Live transcription (Chrome/Edge) that you can proofread before feedback
- Virtual backgrounds: blur, built-in scenes, or upload your own image
- Pace (words per minute) and filler-word stats
- AI feedback: five scores, strengths, improvements, vocabulary check, an
  upgraded version of one of your sentences, and the answer to the question

## Tech stack

- **Frontend:** React 19, TypeScript, Vite
- **Browser APIs:** MediaRecorder, Web Speech API, Web Audio API, Canvas
- **Virtual backgrounds:** MediaPipe Tasks Vision (selfie segmentation), run
  entirely in the browser
- **Backend:** one Vercel serverless function (`api/feedback.ts`) that calls
  Groq's OpenAI-compatible API, so the API key stays on the server
- **Linting:** oxlint

## Getting started

Requires Node 20.

```bash
npm install
cp .env.example .env   # then add your GROQ_API_KEY
```

```bash
npm run dev
```

`npm run dev` serves the app and the `/api/feedback` route together (a small
Vite plugin in `vite.config.ts` runs `api/*.ts` locally, reading `GROQ_API_KEY`
from `.env`). `npx vercel dev` also works if you want Vercel's exact runtime.
Get a Groq key at https://console.groq.com.

Other scripts:

```bash
npm run build     # type-check with tsc, then build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

Use **Chrome or Edge** — they're the only browsers with solid Web Speech API
support. Elsewhere, recording still works and you can type the transcript.

## Deploying

Import the repo into Vercel and set `GROQ_API_KEY` in the project's
environment variables. Vercel serves the Vite build and deploys `api/` as
serverless functions automatically.

## Project structure

```
api/
  feedback.ts               POST /api/feedback — builds the prompt, calls the model
src/
  App.tsx                   app state; wires the hooks and panels together
  config.ts                 RECORD_SECONDS
  types.ts                  shared types (FeedbackResult, etc.)
  data/
    topics.ts               curiosity topics, research prompts, vocab, answers
    backgrounds.ts          virtual background options
  hooks/
    useRecorder.ts          MediaRecorder + countdown
    useSpeechRecognition.ts Web Speech API wrapper
    useAudioWaveform.ts     live mic waveform on a canvas
    useVirtualBackground.ts selfie segmentation + background compositing
  utils/
    fillerWords.ts          filler-word counts and words per minute
    test.ts                 sample answers for trying feedback without recording
  components/               TopicPanel, RecordPanel, ReviewPanel, FeedbackPanel, TipsPanel
public/backgrounds/         built-in background images
```

## Customizing

- **Speech length:** `RECORD_SECONDS` in `src/config.ts`
- **Topics:** add entries to `TOPICS` in `src/data/topics.ts`
- **Backgrounds:** add an image to `public/backgrounds/` and an entry in
  `src/data/backgrounds.ts`
- **Filler words:** `FILLER_WORDS` in `src/utils/fillerWords.ts`
- **Model:** `GROQ_MODEL` in `api/feedback.ts`
- **Look and feel:** design tokens at the top of `src/index.css`

## Known limitations

- Live transcription is Chrome/Edge only and needs an internet connection.
- Filler-word detection is phrase matching, not true speech analysis.
- Nothing is saved between sessions. Download a take if you want to keep it.
