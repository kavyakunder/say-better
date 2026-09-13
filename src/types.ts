export type AppStep = "topic" | "record" | "review";

export interface FillerCount {
  phrase: string;
  count: number;
}

export interface FeedbackScore {
  label: string;
  value: number;
}

// Replace the old FeedbackResult interface in types.ts with this.

export interface VocabCheck {
  word: string;
  usedCorrectly: boolean;
  quote: string;
}

export interface FeedbackResult {
  scores: {
    clarity: number;
    structure: number;
    pacing: number;
    fillerControl: number;
    confidence: number;
  };
  strengths: string[];
  improvements: string[];
  vocabUsed: VocabCheck[];
  upgradedSentence: string;
  reveal: string;
}
