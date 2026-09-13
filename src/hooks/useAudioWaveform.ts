import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Draws a live bar-style waveform from the given MediaStream's audio track
 * onto the provided canvas ref, for as long as the stream is active.
 */
export function useAudioWaveform(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  stream: MediaStream | null
) {
  useEffect(() => {
    if (!stream || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioCtx();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function resizeCanvas() {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;

    function render() {
      animationId = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      const w = canvas.width;
      const h = canvas.height;
      ctx!.clearRect(0, 0, w, h);

      const barCount = 48;
      const step = Math.floor(bufferLength / barCount);
      const barWidth = w / barCount;

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * step] / 255;
        const barHeight = Math.max(2, value * h);
        const x = i * barWidth;
        const y = (h - barHeight) / 2;
        ctx!.fillStyle = i % 6 === 0 ? "#E5484D" : "#F2B705";
        ctx!.globalAlpha = 0.55 + value * 0.45;
        ctx!.fillRect(x + barWidth * 0.15, y, barWidth * 0.7, barHeight);
      }
    }
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      source.disconnect();
      audioContext.close().catch(() => {});
    };
  }, [stream, canvasRef]);
}
