import type { RefObject } from "react";

interface RecordPanelProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  cameraReady: boolean;
  cameraError: string | null;
  onEnableCamera: () => void;
  isRecording: boolean;
  remainingSeconds: number;
  recordSecondsTotal: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  speechRecognitionSupported: boolean;
}

const RING_RADIUS = 92;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function RecordPanel({
  videoRef,
  canvasRef,
  cameraReady,
  cameraError,
  onEnableCamera,
  isRecording,
  remainingSeconds,
  recordSecondsTotal,
  onStartRecording,
  onStopRecording,
  speechRecognitionSupported,
}: RecordPanelProps) {
  const mins = Math.floor(Math.max(0, remainingSeconds) / 60);
  const secs = Math.max(0, remainingSeconds) % 60;
  const fraction = remainingSeconds / recordSecondsTotal;
  const dashOffset = RING_CIRCUMFERENCE * (1 - fraction);

  const hint = cameraError
    ? `Couldn't access your camera/mic (${cameraError}). Check your browser's site permissions and reload.`
    : !speechRecognitionSupported && cameraReady
    ? "Live transcription isn't available in this browser (it works best in Chrome or Edge). You can still record — just type your transcript manually afterward."
    : 'Your video never leaves this browser tab except the text transcript, which is sent to Claude only when you tap "Get Feedback."';

  return (
    <section className="panel record-panel">
      <p className="eyebrow">02 — take the stage</p>

      <div className="spotlight-frame">
        <video ref={videoRef} autoPlay muted playsInline />
        <svg className="timer-ring" viewBox="0 0 200 200" aria-hidden="true">
          <circle className="timer-ring-track" cx="100" cy="100" r={RING_RADIUS} />
          <circle
            className="timer-ring-progress"
            cx="100"
            cy="100"
            r={RING_RADIUS}
            style={{
              strokeDasharray: RING_CIRCUMFERENCE,
              strokeDashoffset: dashOffset,
            }}
          />
        </svg>
        <div className="timer-readout">
          {mins}:{String(secs).padStart(2, "0")}
        </div>
        <div className={`rec-badge${isRecording ? " live" : ""}`}>
          <span className="rec-dot" />
          REC
        </div>
      </div>

      <canvas ref={canvasRef} id="waveform" height={64} />

      <div className="record-controls">
        {!cameraReady && (
          <button className="btn btn-primary" type="button" onClick={onEnableCamera}>
            Enable Camera &amp; Mic
          </button>
        )}
        {cameraReady && !isRecording && (
          <button className="btn btn-record" type="button" onClick={onStartRecording}>
            ● Start Recording ({recordSecondsTotal}s)
          </button>
        )}
        {isRecording && (
          <button className="btn btn-stop" type="button" onClick={onStopRecording}>
            ■ Stop
          </button>
        )}
      </div>
      <p className="hint">{hint}</p>
    </section>
  );
}
