import { useCallback, useRef, useState } from "react";

interface UseRecorderOptions {
  recordSeconds: number;
  onStart?: () => void;
  onStop?: (blob: Blob, durationSeconds: number) => void;
}

const MIME_CANDIDATES = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];

function pickMimeType(): string | undefined {
  return MIME_CANDIDATES.find((t) => MediaRecorder.isTypeSupported(t));
}

export function useRecorder({ recordSeconds, onStart, onStop }: UseRecorderOptions) {
  const [isRecording, setIsRecording] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(recordSeconds);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Set by cancel() so the in-flight recording is thrown away instead of reported.
  const discardRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearTimer();
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
    setIsRecording(false);
  }, [clearTimer]);

  /** Stop without keeping the take, and put the timer back to full. */
  const cancel = useCallback(() => {
    discardRef.current = true;
    stop();
    chunksRef.current = [];
    setRemainingSeconds(recordSeconds);
  }, [stop, recordSeconds]);

  const start = useCallback(
    (stream: MediaStream) => {
      discardRef.current = false;
      chunksRef.current = [];
      setRemainingSeconds(recordSeconds);

      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        if (discardRef.current) return;
        const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        onStop?.(blob, durationSeconds);
      };

      recorderRef.current = recorder;
      startTimeRef.current = Date.now();
      recorder.start();
      setIsRecording(true);
      onStart?.();

      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            clearTimer();
            stop();
            return 0;
          }
          return next;
        });
      }, 1000);
    },
    [recordSeconds, onStart, onStop, stop, clearTimer]
  );

  return { isRecording, remainingSeconds, start, stop, cancel };
}
