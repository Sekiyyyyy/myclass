"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  twinkleSpeed: number;
  shape: "square" | "cross" | "diamond";
  color: string;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Color palette for retro cyber arcade hero particles
    const colors = [
      "rgba(168, 85, 247, ", // Lavender purple
      "rgba(244, 63, 94, ",  // Soft Rose
      "rgba(56, 189, 248, ", // Cyan ice
      "rgba(251, 191, 36, ", // Warm gold
    ];

    const shapes: ("square" | "cross" | "diamond")[] = ["square", "cross", "diamond"];

    const particles: Particle[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() > 0.7 ? 4 : 2.5,
      speedY: 0.2 + Math.random() * 0.35,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: 0.3 + Math.random() * 0.6,
      twinkleSpeed: 0.02 + Math.random() * 0.03,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let tick = 0;

    const drawParticle = (p: Particle, alpha: number) => {
      ctx.fillStyle = `${p.color}${alpha})`;

      if (p.shape === "cross") {
        const s = p.size;
        // Draw 8-bit cross
        ctx.fillRect(Math.floor(p.x - s / 2), Math.floor(p.y - s * 1.5), s, s * 3);
        ctx.fillRect(Math.floor(p.x - s * 1.5), Math.floor(p.y - s / 2), s * 3, s);
      } else if (p.shape === "diamond") {
        const s = p.size;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y - s), s, s);
        ctx.fillRect(Math.floor(p.x - s), Math.floor(p.y), s, s);
        ctx.fillRect(Math.floor(p.x + s), Math.floor(p.y), s, s);
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y + s), s, s);
      } else {
        // Square pixel
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }
    };

    const animate = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        // Vertical float
        p.y -= p.speedY;
        p.x += p.speedX;

        // Reset if off-screen
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Interactive mouse gentle push
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Twinkle factor
        const currentAlpha =
          0.25 + Math.abs(Math.sin(tick * p.twinkleSpeed)) * p.opacity;

        drawParticle(p, currentAlpha);
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
    >
      {/* 1. Luminous Cosmic Aura Behind Hero Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] sm:w-[48rem] h-[24rem] sm:h-[30rem] rounded-full bg-gradient-to-tr from-purple-500/15 via-indigo-500/10 to-amber-500/10 blur-3xl opacity-75 dark:opacity-60" />

      {/* 2. Interactive Retro Pixel Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70 dark:opacity-90"
      />

      {/* 3. Retro 3D Arcade Horizon Grid (Perspective Plane at Bottom of Hero) */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-56 overflow-hidden [mask-image:linear-gradient(to_top,black_30%,transparent_100%)]">
        <div className="absolute inset-0 [perspective:350px]">
          <div className="w-full h-[200%] origin-bottom [transform:rotateX(68deg)] bg-[linear-gradient(to_right,rgba(15,23,42,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(168,85,247,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.18)_1px,transparent_1px)] bg-[size:32px_32px] animate-grid-glide" />
        </div>
      </div>

      {/* 4. Subtle Top Horizon Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
    </div>
  );
}
