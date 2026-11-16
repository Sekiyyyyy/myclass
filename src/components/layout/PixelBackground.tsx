"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  twinkleSpeed: number;
  opacity: number;
}

export function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Color palette for retro pixel arcade stars
    const starColors = [
      "rgba(255, 255, 255, ",
      "rgba(192, 132, 252, ", // soft lavender
      "rgba(56, 189, 248, ",  // soft cyan
      "rgba(251, 191, 36, ",  // soft amber
      "rgba(244, 63, 94, ",   // soft rose
    ];

    // Generate 36 subtle retro drifting stars
    const starCount = 36;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() > 0.8 ? 3 : 2, // 2px or 3px pixel squares
      speed: 0.15 + Math.random() * 0.25,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      twinkleSpeed: 0.02 + Math.random() * 0.03,
      opacity: 0.2 + Math.random() * 0.7,
    }));

    let step = 0;

    const render = () => {
      step++;
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        // Drift upward slowly
        star.y -= star.speed;
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }

        // Twinkle oscillation
        const currentOpacity =
          0.2 + Math.abs(Math.sin(step * star.twinkleSpeed)) * 0.7;

        ctx.fillStyle = `${star.color}${currentOpacity})`;
        // Authentic square pixel
        ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 8-bit Pixel Grid Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Retro Arcade Ambient Glow - Top Center */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[48rem] h-[26rem] bg-gradient-to-b from-purple-600/20 via-indigo-600/15 to-transparent blur-3xl opacity-70 dark:opacity-50" />

      {/* Subtle CRT Screen Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.2)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.65)_100%)]" />

      {/* Retro Drifting Pixel Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-80"
      />
    </div>
  );
}
