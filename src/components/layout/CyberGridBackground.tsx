"use client";

export function CyberGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Cyber Grid Horizon */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_10%,#000_60%,transparent_100%)]" />

      {/* Top Cyan Ambient Glow Spotlight */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[52rem] h-[30rem] rounded-full bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl opacity-75 dark:opacity-90" />

      {/* Violet Cyber Glow Mid Left */}
      <div className="absolute top-[35%] -left-32 w-[30rem] h-[30rem] rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-[110px]" />

      {/* Emerald Matrix Glow Bottom Right */}
      <div className="absolute top-[65%] -right-32 w-[32rem] h-[32rem] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[110px]" />
    </div>
  );
}
