import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { ImageSegmenter } from "@mediapipe/tasks-vision";
import type { BackgroundOption } from "../data/backgrounds";

// Pinned to the installed @mediapipe/tasks-vision version so the WASM matches the JS.
const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite";
const BLUR_PX = 14;
const OUTPUT_FPS = 30;

export type VirtualBackgroundStatus = "idle" | "loading" | "ready" | "error";

interface UseVirtualBackgroundOptions {
  sourceVideoRef: RefObject<HTMLVideoElement | null>;
  outputCanvasRef: RefObject<HTMLCanvasElement | null>;
  mediaStream: MediaStream | null;
  background: BackgroundOption;
}

async function createSegmenter(): Promise<ImageSegmenter> {
  // Loaded on demand so the ~MBs of WASM/model are only fetched once a background is picked.
  const { FilesetResolver, ImageSegmenter } = await import("@mediapipe/tasks-vision");
  const vision = await FilesetResolver.forVisionTasks(WASM_URL);
  return ImageSegmenter.createFromOptions(vision, {
    baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
    runningMode: "VIDEO",
    outputConfidenceMasks: true,
    outputCategoryMask: false,
  });
}

function drawCover(ctx: CanvasRenderingContext2D, img: CanvasImageSource, srcW: number, srcH: number, w: number, h: number) {
  const scale = Math.max(w / srcW, h / srcH);
  const dw = srcW * scale;
  const dh = srcH * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

/**
 * Draws the camera feed onto `outputCanvasRef`, replacing the background with a
 * blur or image when one is selected, and exposes the canvas (plus mic audio) as
 * a MediaStream so the recording includes the effect.
 */
export function useVirtualBackground({
  sourceVideoRef,
  outputCanvasRef,
  mediaStream,
  background,
}: UseVirtualBackgroundOptions) {
  const [outputStream, setOutputStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<VirtualBackgroundStatus>("idle");

  const segmenterRef = useRef<ImageSegmenter | null>(null);
  const segmenterPromiseRef = useRef<Promise<ImageSegmenter> | null>(null);
  const backgroundRef = useRef(background);
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  // --- keep the latest selection visible to the render loop ---------------
  useEffect(() => {
    backgroundRef.current = background;
    bgImageRef.current = null;
    if (background.kind === "image") {
      const img = new Image();
      img.onload = () => {
        if (backgroundRef.current === background) bgImageRef.current = img;
      };
      img.src = background.src;
    }
  }, [background]);

  // --- lazily load the segmenter the first time a background is chosen ----
  useEffect(() => {
    if (background.kind === "none" || segmenterRef.current) return;
    let cancelled = false;
    setStatus("loading");
    segmenterPromiseRef.current ??= createSegmenter();
    segmenterPromiseRef.current
      .then((segmenter) => {
        segmenterRef.current = segmenter;
        if (!cancelled) setStatus("ready");
      })
      .catch((err) => {
        console.error("Failed to load background segmenter:", err);
        segmenterPromiseRef.current = null;
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [background]);

  useEffect(() => {
    return () => {
      segmenterRef.current?.close();
      segmenterRef.current = null;
    };
  }, []);

  // --- render loop + output stream ---------------------------------------
  useEffect(() => {
    const video = sourceVideoRef.current;
    const canvas = outputCanvasRef.current;
    if (!mediaStream || !video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");
    let maskImageData: ImageData | null = null;
    let lastVideoTime = -1;
    let frameId = 0;

    const composite = (w: number, h: number) => {
      const bg = backgroundRef.current;
      // 1. mask alpha = "how likely this pixel is the person"
      ctx.globalCompositeOperation = "copy";
      ctx.drawImage(maskCanvas, 0, 0, w, h);
      // 2. keep only the person from the camera frame
      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(video, 0, 0, w, h);
      // 3. paint the new background behind them
      ctx.globalCompositeOperation = "destination-over";
      if (bg.kind === "blur") {
        ctx.filter = `blur(${BLUR_PX}px)`;
        ctx.drawImage(video, 0, 0, w, h);
        ctx.filter = "none";
      } else if (bgImageRef.current) {
        const img = bgImageRef.current;
        drawCover(ctx, img, img.naturalWidth, img.naturalHeight, w, h);
      } else {
        ctx.fillStyle = "#0d0d0f";
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const render = () => {
      frameId = requestAnimationFrame(render);
      if (video.readyState < 2 || video.currentTime === lastVideoTime) return;
      lastVideoTime = video.currentTime;

      const w = video.videoWidth;
      const h = video.videoHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const segmenter = segmenterRef.current;
      if (backgroundRef.current.kind === "none" || !segmenter || !maskCtx) {
        ctx.drawImage(video, 0, 0, w, h);
        return;
      }

      segmenter.segmentForVideo(video, performance.now(), (result) => {
        const mask = result.confidenceMasks?.[0];
        if (!mask) {
          ctx.drawImage(video, 0, 0, w, h);
          return;
        }
        if (!maskImageData || maskImageData.width !== mask.width || maskImageData.height !== mask.height) {
          maskCanvas.width = mask.width;
          maskCanvas.height = mask.height;
          maskImageData = maskCtx.createImageData(mask.width, mask.height);
        }
        const confidence = mask.getAsFloat32Array();
        const pixels = maskImageData.data;
        for (let i = 0; i < confidence.length; i++) {
          pixels[i * 4 + 3] = confidence[i] * 255;
        }
        maskCtx.putImageData(maskImageData, 0, 0);
        composite(w, h);
      });
    };
    frameId = requestAnimationFrame(render);

    const stream = canvas.captureStream(OUTPUT_FPS);
    mediaStream.getAudioTracks().forEach((track) => stream.addTrack(track));
    setOutputStream(stream);

    return () => {
      cancelAnimationFrame(frameId);
      stream.getVideoTracks().forEach((track) => track.stop());
      setOutputStream(null);
    };
  }, [mediaStream, sourceVideoRef, outputCanvasRef]);

  return { outputStream, status };
}
