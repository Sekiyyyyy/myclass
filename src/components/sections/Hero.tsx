"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { Gamepad2, ArrowDown, Users, Code, Trophy, Sparkles } from "lucide-react";
import { PixelCard } from "@/components/ui/PixelCard";
import confetti from "canvas-confetti";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const firePixelConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#FBBF24", "#38BDF8", "#F43F5E", "#34D399", "#818CF8"],
      shapes: ["square"],
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".pixel-hero-badge",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "steps(4)" }
      )
        .fromTo(
          ".pixel-hero-title",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "steps(6)" },
          "-=0.1"
        )
        .fromTo(
          ".pixel-hero-sub",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "steps(4)" },
          "-=0.2"
        )
        .fromTo(
          ".pixel-hero-stat",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "steps(5)" },
          "-=0.1"
        )
        .fromTo(
          ".pixel-hero-btns",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "steps(4)" },
          "-=0.1"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-16 text-center select-none"
    >
      {/* Arcade Status Header */}
      <div className="pixel-hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded pixel-box bg-[#FBBF24] text-slate-950 font-silk font-bold text-xs mb-6 shadow-xs">
        <Gamepad2 className="w-3.5 h-3.5" />
        <span>SMKN 1 BERINGIN • ANGKATAN 2026</span>
      </div>

      {/* Main Pixel Title */}
      <div className="max-w-4xl mx-auto mb-4">
        <h1 className="pixel-hero-title font-pixel text-2xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white leading-[1.25] tracking-wide mb-3">
          XII PPLG 3
        </h1>
        <p className="font-silk text-sm sm:text-lg text-amber-500 dark:text-amber-400 font-bold tracking-wider mb-4 uppercase">
          &lt; Pengembangan Perangkat Lunak &amp; Gim &gt;
        </p>
        <p className="pixel-hero-sub font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          31 siswa, ribuan baris kode, dan 3 tahun petualangan seru di laboratorium komputer SMK Negeri 1 Beringin. Selamat datang di portal resmi kelas kita.
        </p>
      </div>

      {/* 4 Pixel Arcade Stats (With Interactive Pixel Canvas) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full my-8 px-2">
        <PixelCard interactive={true} className="p-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="font-pixel text-amber-500 text-xs mb-1">01</span>
            <span className="font-pixel text-xl sm:text-2xl text-slate-900 dark:text-white mb-1">
              31
            </span>
            <span className="font-silk text-xs text-slate-600 dark:text-slate-400 font-bold uppercase">
              Players
            </span>
          </div>
        </PixelCard>

        <PixelCard interactive={true} className="p-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="font-pixel text-sky-500 text-xs mb-1">02</span>
            <span className="font-pixel text-xl sm:text-2xl text-slate-900 dark:text-white mb-1">
              PPLG
            </span>
            <span className="font-silk text-xs text-slate-600 dark:text-slate-400 font-bold uppercase">
              Dev Team
            </span>
          </div>
        </PixelCard>

        <PixelCard interactive={true} className="p-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="font-pixel text-emerald-500 text-xs mb-1">03</span>
            <span className="font-pixel text-xl sm:text-2xl text-slate-900 dark:text-white mb-1">
              XII
            </span>
            <span className="font-silk text-xs text-slate-600 dark:text-slate-400 font-bold uppercase">
              Level Max
            </span>
          </div>
        </PixelCard>

        <PixelCard interactive={true} className="p-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="font-pixel text-rose-500 text-xs mb-1">04</span>
            <span className="font-pixel text-xl sm:text-2xl text-slate-900 dark:text-white mb-1">
              2026
            </span>
            <span className="font-silk text-xs text-slate-600 dark:text-slate-400 font-bold uppercase">
              Stage Clear
            </span>
          </div>
        </PixelCard>
      </div>

      {/* Action Buttons */}
      <div className="pixel-hero-btns flex flex-wrap items-center justify-center gap-3">
        <a href="#siswa" className="pixel-btn pixel-btn-primary">
          <span>[ SELECT CHARACTER ]</span>
        </a>

        <button
          onClick={firePixelConfetti}
          type="button"
          className="pixel-btn pixel-btn-secondary"
        >
          <span>[ INSERT COIN ]</span>
        </button>
      </div>
    </section>
  );
}
