"use client";

export function AmbientBubbles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Soft Pastel Blob Top Left (Emerald / Green) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#58CC02]/10 blur-3xl animate-float-soft" />

      {/* Soft Pastel Blob Top Right (Sky Blue) */}
      <div className="absolute top-20 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#1CB0F6]/10 blur-3xl animate-float-reverse-soft" />

      {/* Soft Pastel Blob Center / Mid (Amber / Sun) */}
      <div className="absolute top-[45%] -left-20 w-80 h-80 rounded-full bg-[#FFC800]/10 blur-3xl animate-float-soft" />

      {/* Soft Pastel Blob Lower Right (Purple / Violet) */}
      <div className="absolute top-[75%] -right-20 w-96 h-96 rounded-full bg-[#CE82FF]/10 blur-3xl animate-float-reverse-soft" />
    </div>
  );
}
