import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, RefObject } from "react";
import { BACKGROUNDS } from "../data/backgrounds";
import type { BackgroundOption } from "../data/backgrounds";
import type { VirtualBackgroundStatus } from "../hooks/useVirtualBackground";

interface RecordPanelProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  outputCanvasRef: RefObject<HTMLCanvasElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  background: BackgroundOption;
  onBackgroundChange: (background: BackgroundOption) => void;
  backgroundStatus: VirtualBackgroundStatus;
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
  outputCanvasRef,
  canvasRef,
  background,
  onBackgroundChange,
  backgroundStatus,
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

  // One slot for a user-uploaded image; it stays in the browser as an object URL.
  const [customBackground, setCustomBackground] = useState<BackgroundOption | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (customBackground?.kind === "image") URL.revokeObjectURL(customBackground.src);
    };
  }, [customBackground]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const option: BackgroundOption = { id: "custom", label: "Your image", kind: "image", src: URL.createObjectURL(file) };
    setCustomBackground(option);
    onBackgroundChange(option);
  };

  const backgroundOptions = customBackground ? [...BACKGROUNDS, customBackground] : BACKGROUNDS;

  const backgroundNote =
    backgroundStatus === "loading"
      ? "Loading background effect…"
      : backgroundStatus === "error"
      ? "Couldn't load the background effect — check your connection and try again."
      : null;

  const hint = cameraError
    ? `Couldn't access your camera/mic (${cameraError}). Check your browser's site permissions and reload.`
    : !speechRecognitionSupported && cameraReady
    ? "Live transcription isn't available in this browser (it works best in Chrome or Edge). You can still record — just type your transcript manually afterward."
    : 'Your video never leaves this browser. Only the text transcript is sent, and only when you tap "Get feedback."';

  return (
    <section className="panel record-panel">
      <header className="panel-header">
        <span className="panel-step">Step 2</span>
        <h2 className="panel-title">Take the stage</h2>
      </header>

      <div className="spotlight-frame">
        {/* raw camera feed: hidden, it only feeds the canvas below */}
        <video ref={videoRef} className="source-video" autoPlay muted playsInline />
        <canvas ref={outputCanvasRef} className="camera-canvas" />
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

      {cameraReady && (
        <div className="background-picker">
          <p className="background-picker-label">Background</p>
          <div className="background-options" role="radiogroup" aria-label="Video background">
            {backgroundOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={background.id === option.id}
                className={`background-option${background.id === option.id ? " selected" : ""}`}
                onClick={() => onBackgroundChange(option)}
                title={option.label}
              >
                {option.kind === "image" ? (
                  <img src={option.src} alt="" />
                ) : (
                  <span className={`background-swatch ${option.kind}`}>{option.kind === "none" ? "⊘" : "◌"}</span>
                )}
                <span className="background-option-name">{option.label}</span>
              </button>
            ))}
            <button type="button" className="background-option" onClick={() => fileInputRef.current?.click()} title="Upload an image">
              <span className="background-swatch upload">+</span>
              <span className="background-option-name">Upload</span>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleUpload} />
          </div>
          {backgroundNote && <p className="hint">{backgroundNote}</p>}
        </div>
      )}

      <canvas ref={canvasRef} id="waveform" height={64} />

      <div className="record-controls">
        {!cameraReady && (
          <button className="btn btn-primary" type="button" onClick={onEnableCamera}>
            Enable camera &amp; mic
          </button>
        )}
        {cameraReady && !isRecording && (
          <button className="btn btn-record" type="button" onClick={onStartRecording}>
            <span className="btn-rec-dot" aria-hidden="true" />
            Start recording · {recordSecondsTotal}s
          </button>
        )}
        {isRecording && (
          <button className="btn btn-stop" type="button" onClick={onStopRecording}>
            <span className="btn-stop-square" aria-hidden="true" />
            Stop
          </button>
        )}
      </div>
      <p className="hint">{hint}</p>
    </section>
  );
}
