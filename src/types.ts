export type AppStep = "topic" | "record" | "review";

export interface FillerCount {
  phrase: string;
  count: number;
}

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
  summary?: string;
  strengths: string[];
  improvements: string[];
  vocabUsed: VocabCheck[];
  upgradedSentence: string;
  reveal: string;
}
