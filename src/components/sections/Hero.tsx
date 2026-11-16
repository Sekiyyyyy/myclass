"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { ArrowDown, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#58CC02", "#1CB0F6", "#FFC800", "#FF4B4B", "#CE82FF"],
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-clay-badge",
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(2)" }
      )
        .fromTo(
          ".hero-title-word",
          { opacity: 0, y: 35, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-btn-container",
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(2)" },
          "-=0.3"
        );

      // Subtle Parallax background zoom
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 15,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[94vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-32 pb-20 overflow-hidden"
    >
      {/* Warm, Clear Blended Background Photo */}
      <div
        ref={bgImageRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      >
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600"
          alt="Suasana Kebersamaan Kelas PPLG"
          fill
          priority
          className="object-cover object-center opacity-40 brightness-105 contrast-100"
        />
        {/* Soft Pastel Gradient Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F7FC] via-[#F4F7FC]/80 to-[#F4F7FC]/90" />
      </div>

      {/* Floating Clay Badges in Hero */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 relative z-10">
        <div className="hero-clay-badge inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-heading font-extrabold text-xs border border-emerald-200 border-b-[3px] border-b-emerald-300 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#58CC02] animate-pulse" />
          <span>Angkatan 2026</span>
        </div>

        <div className="hero-clay-badge inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-50 text-sky-800 font-heading font-extrabold text-xs border border-sky-200 border-b-[3px] border-b-sky-300 shadow-sm">
          <span>⚡</span>
          <span>SMK Negeri 1 Beringin</span>
        </div>

        <button
          onClick={fireConfetti}
          title="Klik untuk letupkan confetti!"
          className="hero-clay-badge cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 font-heading font-extrabold text-xs border border-amber-200 border-b-[3px] border-b-amber-300 shadow-sm hover:scale-105 active:translate-y-0.5 transition-all"
        >
          <span>🎉</span>
          <span>31 Siswa Solid</span>
        </button>
      </div>

      {/* Foreground Hero Content */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Big Bubbly Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-slate-900 tracking-tight leading-[1.05] mb-4 flex flex-wrap justify-center gap-x-4">
          <span className="hero-title-word inline-block drop-shadow-xs">XII</span>
          <span className="hero-title-word inline-block bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-xs">
            PPLG
          </span>
          <span className="hero-title-word inline-block drop-shadow-xs">3</span>
        </h1>

        {/* Subtitle with correct PPLG expansion */}
        <p className="hero-sub font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
          Pengembangan Perangkat Lunak dan Gim
        </p>

        {/* Clean, friendly description */}
        <p className="hero-sub text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
          Ruang digital kebersamaan dan arsip kenangan 31 siswa selama menempuh perjalanan penuh cerita, koding, dan persahabatan di SMK Negeri 1 Beringin.
        </p>

        {/* Signature Duolingo 3D Tactile Action Buttons */}
        <div className="hero-btn-container flex flex-wrap items-center justify-center gap-4">
          <a
            href="#siswa"
            className="clay-btn clay-btn-green px-8 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <span>Daftar 31 Siswa</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#tentang"
            className="clay-btn clay-btn-white px-7 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <span>Tentang Kelas</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </a>

          <button
            onClick={fireConfetti}
            className="clay-btn clay-btn-amber px-5 py-3.5 text-sm flex items-center gap-1.5"
            title="Kirim Semangat!"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Semangat!</span>
          </button>
        </div>
      </div>

      {/* Down Arrow / Scroll Prompt */}
      <a
        href="#tentang"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[11px] font-heading font-bold text-slate-400 hover:text-slate-700 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-wider">Jelajahi</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#58CC02]" />
      </a>
    </section>
  );
}
