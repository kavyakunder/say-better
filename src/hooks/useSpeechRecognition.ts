import { useCallback, useRef, useState } from "react";

// The DOM lib doesn't reliably ship SpeechRecognition types across TS/browser
// versions, so we type the bits we actually use and reach for the browser's
// (possibly prefixed) constructor via `any`.
interface MinimalSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => MinimalSpeechRecognition;

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  const w = window as unknown as Record<string, unknown>;
  const ctor = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as
    | SpeechRecognitionConstructor
    | undefined;
  return ctor ?? null;
}

export const SPEECH_RECOGNITION_SUPPORTED = getSpeechRecognitionConstructor() !== null;

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("");
  const recognizerRef = useRef<MinimalSpeechRecognition | null>(null);
  const finalTranscriptRef = useRef("");
  const shouldContinueRef = useRef(false);

  const reset = useCallback(() => {
    finalTranscriptRef.current = "";
    setTranscript("");
  }, []);

  const start = useCallback(() => {
    if (!SPEECH_RECOGNITION_SUPPORTED) return;
    const Ctor = getSpeechRecognitionConstructor();
    if (!Ctor) return;

    finalTranscriptRef.current = "";
    setTranscript("");
    shouldContinueRef.current = true;

    const recognizer = new Ctor();
    recognizer.continuous = true;
    recognizer.interimResults = true;
    recognizer.lang = "en-US";

    recognizer.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const piece = event.results[i][0].transcript as string;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += piece + " ";
        } else {
          interim += piece;
        }
      }
      setTranscript((finalTranscriptRef.current + interim).trim());
    };

    // Some browsers stop recognition after a pause in speech; restart while
    // we're still meant to be listening.
    recognizer.onend = () => {
      if (shouldContinueRef.current) {
        try {
          recognizer.start();
        } catch {
          /* a start() call may already be pending — ignore */
        }
      }
    };

    recognizer.onerror = (event: any) => {
      console.warn("Speech recognition error:", event?.error);
    };

    recognizerRef.current = recognizer;
    try {
      recognizer.start();
    } catch {
      /* ignore */
    }
  }, []);

  const stop = useCallback(() => {
    shouldContinueRef.current = false;
    const recognizer = recognizerRef.current;
    if (recognizer) {
      recognizer.onend = null;
      try {
        recognizer.stop();
      } catch {
        /* ignore */
      }
    }
  }, []);

  const setTranscriptManually = useCallback((value: string) => {
    finalTranscriptRef.current = value;
    setTranscript(value);
  }, []);

  return {
    supported: SPEECH_RECOGNITION_SUPPORTED,
    transcript,
    start,
    stop,
    reset,
    setTranscript: setTranscriptManually,
  };
}
