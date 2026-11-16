"use client";

export function PixelBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 8-bit Pixel Grid Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Retro Arcade Ambient Glow - Top Center */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[42rem] h-[22rem] bg-gradient-to-b from-amber-500/15 via-indigo-600/10 to-transparent blur-3xl opacity-60 dark:opacity-40" />

      {/* Subtle CRT Screen Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.25)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
