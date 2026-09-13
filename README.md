# On the Spot — Impromptu Speech Coach (React + TypeScript)

A small web app for practicing 1-minute impromptu speeches: get a random
topic, record yourself on camera, review the tape, and get AI feedback on
clarity, structure, pacing, filler words, and confidence.

Built with **React 19 + TypeScript + Vite**. Everything runs in the
browser. Your video is never uploaded anywhere — only the text transcript
is sent to Claude, and only when you tap **"Get AI Feedback."**

## Project structure

```
speech-coach-react/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig*.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx              entry point
    ├── App.tsx                orchestrates state + wires the hooks together
    ├── index.css              the "stage & spotlight" visual theme
    ├── config.ts               RECORD_SECONDS, model name, API URL
    ├── types.ts
    ├── data/
    │   └── topics.ts           the list of random speech prompts — edit freely
    ├── utils/
    │   ├── fillerWords.ts       filler-word / WPM stats
    │   └── markdown.ts          parses Claude's structured reply into scores + HTML
    ├── hooks/
    │   ├── useRecorder.ts             MediaRecorder + countdown timer
    │   ├── useSpeechRecognition.ts     Web Speech API wrapper (live transcript)
    │   └── useAudioWaveform.ts         canvas waveform driven by mic input
    └── components/
        ├── TopicPanel.tsx
        ├── RecordPanel.tsx
        ├── ReviewPanel.tsx
        └── FeedbackPanel.tsx
```

## Running it

```bash
cd speech-coach-react
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).
Camera/mic access requires a secure context, and `localhost` counts as
one, so `npm run dev` just works.

For a production build:

```bash
npm run build      # type-checks with tsc, then builds with Vite into dist/
npm run preview     # serve that build locally
```

**Browser recommendation:** use **Chrome or Edge**. Live transcription
uses the Web Speech API, which only those two currently support well.
In other browsers, recording and video review still work — you'll just
type the transcript in manually before requesting feedback.

## Using it

1. **New Topic** — pulls a random prompt from `src/data/topics.ts`.
2. **Enable Camera & Mic** — grants browser permission once per session.
3. **Start Recording** — records for 60 seconds (or press Stop early). A
   ring timer, live waveform, and (in Chrome/Edge) a live transcript all
   run during recording.
4. **Review** — watch the playback, download the `.webm` file if you want
   to keep it, and check your words-per-minute and filler-word stats.
   Proofread/edit the transcript — speech recognition isn't perfect.
5. **Get AI Feedback** — paste an Anthropic API key and tap the button.
   Claude scores the speech (Clarity, Structure, Pacing, Filler Control,
   Confidence) and gives strengths, areas to improve, and specific drills
   to try next time.

## About the API key

This app calls `api.anthropic.com` directly from the browser using the
`anthropic-dangerous-direct-browser-access` header, which is meant for
local tools and prototypes like this one. That means:

- Your key is only kept in React state (in memory) — it's never written
  to disk, `localStorage`, or any server this app controls.
- It **is** visible in your browser's network tab / dev tools while the
  request is in flight, since the call is made client-side.
- Don't deploy this as-is to a public website with your personal key
  baked in. For a shared/public deployment, add a tiny backend (a few
  lines of Node/Express, a Cloudflare Worker, etc.) that holds the key
  server-side and proxies the request instead — `src/App.tsx`'s
  `handleGetFeedback` is the one function you'd redirect to call your
  backend instead of `api.anthropic.com` directly.

Get a key at https://console.anthropic.com if you don't have one.

## Customizing

- **Speech length:** change `RECORD_SECONDS` in `src/config.ts`.
- **Topics:** add/remove entries in the `TOPICS` array in `src/data/topics.ts`.
- **Filler words tracked:** edit `FILLER_WORDS` in `src/utils/fillerWords.ts`.
- **Model used for feedback:** change `CLAUDE_MODEL` in `src/config.ts`.
- **Look and feel:** all colors, fonts, and layout live in `src/index.css`
  as CSS custom properties at the top of the file.

## Known limitations

- Live transcription (Web Speech API) is Chrome/Edge-only and requires
  an internet connection even though the video itself is fully local.
- Filler-word counting is a simple word/phrase match, not true speech
  analysis — it's a helpful signal, not a perfect score.
- No accounts, no server, no persistence between sessions — recordings
  and feedback exist only for the current browser tab.
- Speech recognition types aren't consistently shipped in TypeScript's
  DOM lib across versions, so `useSpeechRecognition.ts` types the handful
  of fields it actually uses rather than pulling in a third-party
  `@types` package.

# vocab-coach
