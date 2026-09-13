import type { VercelRequest, VercelResponse } from "@vercel/node";

const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface VocabWord {
  word: string;
  definition: string;
}

interface FeedbackRequestBody {
  topic: string;
  transcript: string;
  durationSeconds: number;
  wordCount: number;
  wpm: number | null;
  fillerWordCount: number;
  vocabWords?: VocabWord[];
}

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   console.log("hellloo");
//   // --- basic method guard -------------------------------------------------
//   if (req.method !== "POST") {
//     res.setHeader("Allow", "POST");
//     return res.status(405).json({ error: "Method not allowed. Use POST." });
//   }

//   // --- env check -----------------------------------------------------------
//   const apiKey = process.env.GROQ_API_KEY;
//   if (!apiKey) {
//     console.error("GROQ_API_KEY is not set in environment variables.");
//     return res.status(500).json({ error: "Server is not configured correctly." });
//   }

//   // --- input validation ------------------------------------------------------
//   const body = req.body as Partial<FeedbackRequestBody>;
//   const { topic, transcript, durationSeconds, wordCount, wpm, fillerWordCount, vocabWords = [] } = body ?? {};

//   if (!topic || typeof topic !== "string") {
//     return res.status(400).json({ error: "Missing or invalid 'topic'." });
//   }
//   if (!transcript || typeof transcript !== "string" || !transcript.trim()) {
//     return res.status(400).json({ error: "Missing or empty 'transcript'." });
//   }

//   // Basic sanity caps so nobody can send a huge payload and burn your quota
//   const safeTranscript = transcript.slice(0, 6000);
//   const safeDuration = typeof durationSeconds === "number" ? durationSeconds : 0;
//   const safeWordCount = typeof wordCount === "number" ? wordCount : 0;
//   const safeWpm = typeof wpm === "number" ? wpm : null;
//   const safeFillerCount = typeof fillerWordCount === "number" ? fillerWordCount : 0;
//   const safeVocabWords = Array.isArray(vocabWords) ? vocabWords.slice(0, 10) : [];

//   // --- build prompt ----------------------------------------------------------
//   const vocabSection =
//     safeVocabWords.length > 0
//       ? `Target vocabulary words for this topic:
// ${safeVocabWords.map((w) => `- ${w.word}: ${w.definition}`).join("\n")}

// For each of these words, check whether the speaker used it, and if so, whether they used it CORRECTLY in context (not just said the word in passing).`
//       : "No target vocabulary words were provided for this topic.";

//   const userPrompt = `Someone researched this topic for a few minutes and then gave a ${safeDuration}-second impromptu spoken explanation.

// Topic: "${topic}"

// Transcript (auto-transcribed from speech, may contain small errors):
// """
// ${safeTranscript}
// """

// Stats: ${safeWordCount} words, ${safeWpm !== null ? `~${safeWpm} words per minute` : "pace unknown"}, ${safeFillerCount} filler words detected.

// ${vocabSection}

// Respond with a JSON object in exactly this shape:

// {
//   "scores": {
//     "clarity": <1-10>,
//     "structure": <1-10>,
//     "pacing": <1-10>,
//     "fillerControl": <1-10>,
//     "confidence": <1-10>
//   },
//   "strengths": ["2-3 short bullets, specific to what they actually said"],
//   "improvements": ["2-3 short bullets, specific and actionable, not generic"],
//   "vocabUsed": [
//     { "word": "<one of the target words>", "usedCorrectly": <true|false>, "quote": "<short quote from transcript, or empty string if not used>" }
//   ],
//   "upgradedSentence": "<rewrite one of their actual sentences to naturally include a target word they missed or used weakly; if they used all words well, upgrade any sentence for clarity>",
//   "reveal": "<a clear, satisfying 2-3 sentence explanation of the topic's actual answer, for a 'Now You Know' card shown at the end>"
// }`;

//   // --- call Groq ----------------------------------------------------------
//   try {
//     const groqRes = await fetch(GROQ_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         model: GROQ_MODEL,
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a supportive but honest speaking coach for a curiosity/vocabulary-building app. You always respond with valid JSON only, no markdown fences, no commentary outside the JSON.",
//           },
//           { role: "user", content: userPrompt },
//         ],
//         response_format: { type: "json_object" }, // Groq's JSON mode — enforces valid JSON output
//         temperature: 0.7,
//         max_completion_tokens: 1200,
//       }),
//     });

//     if (!groqRes.ok) {
//       const errText = await groqRes.text();
//       console.error("Groq API error:", groqRes.status, errText.slice(0, 500));
//       return res.status(502).json({ error: "Upstream AI request failed. Try again shortly." });
//     }

//     const data = await groqRes.json();
//     const text = data.choices?.[0]?.message?.content ?? "";

//     let parsed: unknown;
//     try {
//       parsed = JSON.parse(text);
//     } catch (parseErr) {
//       console.error("Failed to parse Groq JSON response:", text.slice(0, 500));
//       return res.status(502).json({ error: "AI response could not be parsed. Try again." });
//     }

//     return res.status(200).json(parsed);
//   } catch (err) {
//     console.error("Unexpected error calling Groq:", err);
//     return res.status(500).json({ error: "Something went wrong reaching the AI service." });
//   }
// }

// // /api/feedback.ts
// //
// // Vercel serverless function (Node runtime). Deployed automatically at
// // POST https://<your-app>.vercel.app/api/feedback
// //
// // This holds the real Anthropic API key server-side (as an env var) so it
// // never reaches the browser. The frontend sends the transcript + topic
// // data; this function builds the prompt, calls Claude, and returns
// // parsed JSON feedback.

// import type { VercelRequest, VercelResponse } from "@vercel/node";

// const CLAUDE_MODEL = "claude-sonnet-4-6";
// const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

// interface VocabWord {
//   word: string;
//   definition: string;
// }

// interface FeedbackRequestBody {
//   topic: string;
//   transcript: string;
//   durationSeconds: number;
//   wordCount: number;
//   wpm: number | null;
//   fillerWordCount: number;
//   vocabWords?: VocabWord[];
// }

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   // --- basic method guard -------------------------------------------------
//   if (req.method !== "POST") {
//     res.setHeader("Allow", "POST");
//     return res.status(405).json({ error: "Method not allowed. Use POST." });
//   }

//   // --- env check -----------------------------------------------------------
//   const apiKey = process.env.ANTHROPIC_API_KEY;
//   if (!apiKey) {
//     // Don't leak internal details to the client beyond "server misconfigured"
//     console.error("ANTHROPIC_API_KEY is not set in environment variables.");
//     return res.status(500).json({ error: "Server is not configured correctly." });
//   }

//   // --- input validation ------------------------------------------------------
//   const body = req.body as Partial<FeedbackRequestBody>;
//   const { topic, transcript, durationSeconds, wordCount, wpm, fillerWordCount, vocabWords = [] } = body ?? {};

//   if (!topic || typeof topic !== "string") {
//     return res.status(400).json({ error: "Missing or invalid 'topic'." });
//   }
//   if (!transcript || typeof transcript !== "string" || !transcript.trim()) {
//     return res.status(400).json({ error: "Missing or empty 'transcript'." });
//   }

//   // Basic sanity caps so nobody can send a huge payload and burn your quota
//   const safeTranscript = transcript.slice(0, 6000);
//   const safeDuration = typeof durationSeconds === "number" ? durationSeconds : 0;
//   const safeWordCount = typeof wordCount === "number" ? wordCount : 0;
//   const safeWpm = typeof wpm === "number" ? wpm : null;
//   const safeFillerCount = typeof fillerWordCount === "number" ? fillerWordCount : 0;
//   const safeVocabWords = Array.isArray(vocabWords) ? vocabWords.slice(0, 10) : [];

//   // --- build prompt ----------------------------------------------------------
//   const vocabSection =
//     safeVocabWords.length > 0
//       ? `Target vocabulary words for this topic:
// ${safeVocabWords.map((w) => `- ${w.word}: ${w.definition}`).join("\n")}

// For each of these words, check whether the speaker used it, and if so, whether they used it CORRECTLY in context (not just said the word in passing).`
//       : "No target vocabulary words were provided for this topic.";

//   const prompt = `You are a supportive but honest speaking coach for a curiosity/vocabulary-building app. Someone researched this topic for a few minutes and then gave a ${safeDuration}-second impromptu spoken explanation.

// Topic: "${topic}"

// Transcript (auto-transcribed from speech, may contain small errors):
// """
// ${safeTranscript}
// """

// Stats: ${safeWordCount} words, ${safeWpm !== null ? `~${safeWpm} words per minute` : "pace unknown"}, ${safeFillerCount} filler words detected.

// ${vocabSection}

// Respond with ONLY valid JSON, no markdown fences, no text before or after, in exactly this shape:

// {
//   "scores": {
//     "clarity": <1-10>,
//     "structure": <1-10>,
//     "pacing": <1-10>,
//     "fillerControl": <1-10>,
//     "confidence": <1-10>
//   },
//   "strengths": ["2-3 short bullets, specific to what they actually said"],
//   "improvements": ["2-3 short bullets, specific and actionable, not generic"],
//   "vocabUsed": [
//     { "word": "<one of the target words>", "usedCorrectly": <true|false>, "quote": "<short quote from transcript, or empty string if not used>" }
//   ],
//   "upgradedSentence": "<rewrite one of their actual sentences to naturally include a target word they missed or used weakly; if they used all words well, upgrade any sentence for clarity>",
//   "reveal": "<a clear, satisfying 2-3 sentence explanation of the topic's actual answer, for a 'Now You Know' card show at the end>"
// }`;

//   // --- call Anthropic ----------------------------------------------------------
//   try {
//     const anthropicRes = await fetch(ANTHROPIC_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": apiKey,
//         "anthropic-version": "2023-06-01",
//       },
//       body: JSON.stringify({
//         model: CLAUDE_MODEL,
//         max_tokens: 1200,
//         messages: [{ role: "user", content: prompt }],
//       }),
//     });

//     if (!anthropicRes.ok) {
//       const errText = await anthropicRes.text();
//       console.error("Anthropic API error:", anthropicRes.status, errText.slice(0, 500));
//       return res.status(502).json({ error: "Upstream AI request failed. Try again shortly." });
//     }

//     const data = await anthropicRes.json();
//     const text = (data.content ?? [])
//       .filter((block: { type: string }) => block.type === "text")
//       .map((block: { text: string }) => block.text)
//       .join("\n")
//       .trim();

//     let parsed: unknown;
//     try {
//       // Strip accidental markdown fences just in case
//       const cleaned = text.replace(/^```json\s*|```$/g, "").trim();
//       parsed = JSON.parse(cleaned);
//     } catch (parseErr) {
//       console.error("Failed to parse Claude JSON response:", text.slice(0, 500));
//       return res.status(502).json({ error: "AI response could not be parsed. Try again." });
//     }

//     return res.status(200).json(parsed);
//   } catch (err) {
//     console.error("Unexpected error calling Anthropic:", err);
//     return res.status(500).json({ error: "Something went wrong reaching the AI service." });
//   }
// }

// /api/feedback.ts
//
// Vercel serverless function (Node runtime). Deployed automatically at
// POST https://<your-app>.vercel.app/api/feedback
//
// Uses Groq's OpenAI-compatible Chat Completions API. The GROQ_API_KEY
// lives server-side as an env var and never reaches the browser.

export default function handler(req: any, res: any) {
  console.log("hellloooooo");
  res.status(200).json({ ok: true });
}
