"use client";

export function CyberGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle modern dot/grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

      {/* Top Center Ambient Indigo Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[48rem] h-[28rem] rounded-full bg-gradient-to-b from-indigo-500/15 via-sky-500/10 to-transparent blur-3xl opacity-50 dark:opacity-40" />

      {/* Subtle Soft Violet Glow Side */}
      <div className="absolute top-[40%] -right-40 w-[28rem] h-[28rem] rounded-full bg-violet-500/10 dark:bg-indigo-500/10 blur-[120px]" />
    </div>
  );
}
