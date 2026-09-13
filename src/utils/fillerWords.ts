import type { FillerCount } from "../types";

export const FILLER_WORDS: string[] = [
  "um", "uh", "er", "ah", "like", "you know", "sort of", "kind of",
  "basically", "actually", "literally", "i mean", "so yeah", "right",
];

export function countFillerWords(text: string): FillerCount[] {
  const lower = ` ${text.toLowerCase()} `;

  return FILLER_WORDS.map((phrase) => {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?<![a-z])${escaped}(?![a-z])`, "g");
    const matches = lower.match(re);
    return { phrase, count: matches ? matches.length : 0 };
  });
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed.length ? trimmed.split(/\s+/).length : 0;
}

export function wordsPerMinute(words: number, durationSeconds: number): number | null {
  const minutes = durationSeconds / 60;
  if (minutes <= 0 || words <= 0) return null;
  return Math.round(words / minutes);
}
