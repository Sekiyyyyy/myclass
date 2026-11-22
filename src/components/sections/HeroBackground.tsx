"use client";

import { useEffect, useRef } from "react";

interface Star {
  nx: number;
  ny: number;
  size: number;
  twinklePhase: number;
  twinkleSpeed: number;
  shape: "dot" | "cross" | "diamond";
  tone: number;
}

interface PixelCloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
  variant: 0 | 1;
}

interface ShootingPixel {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animId = 0;
    let width = 0;
    let height = 0;
    let isDark = document.documentElement.classList.contains("dark");

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      ctx.imageSmoothingEnabled = false;
    };

    resize();
    window.addEventListener("resize", resize);

    // Watch dark/light theme toggles in real time
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Night mode: crisp pixel stars (normalized coordinates so resize keeps full coverage)
    const stars: Star[] = Array.from({ length: 48 }, () => ({
      nx: Math.random(),
      ny: Math.random() * 0.82,
      size: Math.random() > 0.72 ? 3 : 2,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.025 + Math.random() * 0.035,
      shape:
        Math.random() > 0.75
          ? "cross"
          : Math.random() > 0.55
            ? "diamond"
            : "dot",
      tone: Math.floor(Math.random() * 3),
    }));

    // Day mode: authentic blocky 8-bit pixel clouds
    const clouds: PixelCloud[] = Array.from({ length: 7 }, (_, idx) => ({
      x: (idx / 7) * (width || 1200) + Math.random() * 90,
      y: 68 + (idx % 3) * 78 + Math.random() * 24,
      scale: idx % 2 === 0 ? 5 : 4,
      speed: 0.16 + (idx % 3) * 0.07,
      variant: (idx % 2) as 0 | 1,
    }));

    let shootingStar: ShootingPixel | null = null;
    let tick = 0;

    // Stepped 8-bit pixel skyline silhouette along bottom edge
    const drawPixelSkyline = () => {
      const unit = 8;
      const cols = Math.ceil(width / unit);
      const baseH = isDark ? "#171528" : "#EAE3D5";
      const capH = isDark ? "#2A2648" : "#D6CCBA";

      for (let i = 0; i < cols; i++) {
        // Deterministic retro hill/step silhouette (clean, organic, non-random jitter)
        const wave =
          Math.sin(i * 0.12) * 2.2 +
          Math.cos(i * 0.27) * 1.4 +
          (i % 7 === 0 ? 1 : 0);
        const blocks = Math.max(2, Math.round(3.5 + wave));
        const colH = blocks * unit;
        const x = i * unit;
        const y = height - colH;

        ctx.fillStyle = baseH;
        ctx.fillRect(x, y, unit, colH);

        // Crisp 1-pixel stepped cap highlight
        ctx.fillStyle = capH;
        ctx.fillRect(x, y, unit, 3);
      }
    };

    const drawPixelCloud = (c: PixelCloud) => {
      const s = c.scale;
      const x = Math.floor(c.x / 2) * 2; // snap to 2px grid
      const y = Math.floor(c.y);

      // Cloud shadow base (warm parchment taupe)
      ctx.fillStyle = "#DFD6C5";
      if (c.variant === 0) {
        ctx.fillRect(x + s, y + s * 3, s * 10, s);
        ctx.fillRect(x, y + s * 2, s * 12, s);
      } else {
        ctx.fillRect(x + s, y + s * 2, s * 7, s);
      }

      // Main pixel cloud body (crisp ivory white)
      ctx.fillStyle = "#FFFDF9";
      if (c.variant === 0) {
        ctx.fillRect(x + s * 3, y, s * 4, s);
        ctx.fillRect(x + s * 2, y + s, s * 7, s);
        ctx.fillRect(x + s, y + s * 2, s * 10, s);
        // crisp outline accent pixels
        ctx.fillStyle = "#D5CBB7";
        ctx.fillRect(x + s * 3, y - 2, s * 4, 2);
      } else {
        ctx.fillRect(x + s * 2, y, s * 4, s);
        ctx.fillRect(x + s, y + s, s * 7, s);
        ctx.fillStyle = "#D5CBB7";
        ctx.fillRect(x + s * 2, y - 2, s * 4, 2);
      }
    };

    const drawStar = (star: Star, darkMode: boolean) => {
      const osc = Math.sin(tick * star.twinkleSpeed + star.twinklePhase);
      // Stepped 3-level blink instead of continuous smooth fade for genuine 16-bit feel
      const level = osc > 0.35 ? 1 : osc > -0.35 ? 0.55 : 0.2;

      const darkPalette = [
        `rgba(244, 241, 250, ${level * 0.85})`, // Phosphor white
        `rgba(157, 139, 244, ${level * 0.9})`,  // Periwinkle lavender
        `rgba(250, 204, 21, ${level * 0.85})`,  // 16-bit gold
      ];
      const lightPalette = [
        `rgba(91, 70, 200, ${level * 0.32})`,   // Indigo pixel speck
        `rgba(217, 119, 6, ${level * 0.35})`,   // Warm gold speck
        `rgba(24, 22, 36, ${level * 0.18})`,    // Subtle ink pixel
      ];

      ctx.fillStyle = (darkMode ? darkPalette : lightPalette)[star.tone];
      const x = Math.floor(star.nx * width);
      const y = Math.floor(star.ny * height);
      const s = star.size;

      if (star.shape === "cross") {
        ctx.fillRect(x - s, y, s * 3, s);
        ctx.fillRect(x, y - s, s, s * 3);
      } else if (star.shape === "diamond") {
        ctx.fillRect(x, y - s, s, s);
        ctx.fillRect(x - s, y, s, s);
        ctx.fillRect(x + s, y, s, s);
        ctx.fillRect(x, y + s, s, s);
      } else {
        ctx.fillRect(x, y, s, s);
      }
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      if (isDark) {
        // Night mode: twinkling 8-bit pixel stars + rare shooting comet
        for (let i = 0; i < stars.length; i++) {
          drawStar(stars[i], true);
        }

        if (!prefersReducedMotion) {
          if (!shootingStar && tick % 240 === 90) {
            shootingStar = {
              x: width * (0.25 + Math.random() * 0.6),
              y: height * (0.08 + Math.random() * 0.25),
              vx: -5,
              vy: 2.5,
              life: 0,
              maxLife: 34,
            };
          }

          if (shootingStar) {
            shootingStar.x += shootingStar.vx;
            shootingStar.y += shootingStar.vy;
            shootingStar.life++;

            // Stepped 4-block pixel comet tail
            for (let t = 0; t < 5; t++) {
              const alpha = Math.max(0, 1 - t * 0.22);
              ctx.fillStyle =
                t === 0
                  ? `rgba(250, 204, 21, ${alpha})`
                  : `rgba(157, 139, 244, ${alpha * 0.85})`;
              ctx.fillRect(
                Math.floor((shootingStar.x - shootingStar.vx * t * 1.4) / 3) * 3,
                Math.floor((shootingStar.y - shootingStar.vy * t * 1.4) / 3) * 3,
                3,
                3
              );
            }

            if (shootingStar.life >= shootingStar.maxLife) {
              shootingStar = null;
            }
          }
        }
      } else {
        // Light mode: crisp retro overworld pixel clouds + subtle pixel sparkles
        for (let i = 0; i < clouds.length; i++) {
          const c = clouds[i];
          if (!prefersReducedMotion) {
            c.x += c.speed;
            if (c.x > width + 80) {
              c.x = -90;
            }
          }
          drawPixelCloud(c);
        }

        // Subtle daytime pixel sparkles (sparse)
        for (let i = 0; i < 16; i++) {
          drawStar(stars[i], false);
        }
      }

      // Crisp stepped pixel silhouette along bottom edge of Hero
      drawPixelSkyline();
    };

    const animate = () => {
      if (!document.hidden) {
        tick++;
        renderFrame();
      }
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(animate);
      }
    };

    renderFrame();
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
