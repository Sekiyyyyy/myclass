"use client";

import { useEffect, useRef } from "react";

interface PixelCanvasProps {
  className?: string;
  pixelSize?: number;
  gap?: number;
  colors?: string[];
  fadeSpeed?: number;
}

export function PixelCanvas({
  className = "",
  pixelSize = 8,
  gap = 2,
  colors = ["#38BDF8", "#818CF8", "#F43F5E", "#FBBF24", "#34D399"],
  fadeSpeed = 0.04,
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface ActivePixel {
      col: number;
      row: number;
      color: string;
      alpha: number;
    }

    const activePixels = new Map<string, ActivePixel>();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const step = pixelSize + gap;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > width || y < 0 || y > height) return;

      const col = Math.floor(x / step);
      const row = Math.floor(y / step);

      // Light up mouse pixel and 2 adjacent random pixels
      const targets = [
        { c: col, r: row },
        { c: col + (Math.random() > 0.5 ? 1 : -1), r: row },
        { c: col, r: row + (Math.random() > 0.5 ? 1 : -1) },
      ];

      for (const t of targets) {
        const key = `${t.c},${t.r}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        activePixels.set(key, { col: t.c, row: t.r, color, alpha: 1 });
      }
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handlePointerMove);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      activePixels.forEach((pixel, key) => {
        ctx.fillStyle = pixel.color;
        ctx.globalAlpha = pixel.alpha;
        ctx.fillRect(pixel.col * step, pixel.row * step, pixelSize, pixelSize);

        pixel.alpha -= fadeSpeed;
        if (pixel.alpha <= 0) {
          activePixels.delete(key);
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      if (parent) {
        parent.removeEventListener("mousemove", handlePointerMove);
      }
    };
  }, [pixelSize, gap, colors, fadeSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
