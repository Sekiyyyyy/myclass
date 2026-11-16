"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { ArrowDown, Sparkles, Heart, Zap, Gamepad2, GraduationCap, Users, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { playPop, playClick, playChime } from "@/lib/sound";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const fireConfetti = () => {
    playChime();
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.65 },
      colors: ["#58CC02", "#1CB0F6", "#FFC800", "#FF4B4B", "#CE82FF"],
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-clay-badge",
        { opacity: 0, y: -25, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)" }
      )
        .fromTo(
          ".hero-title-word",
          { opacity: 0, y: 35, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.8)" },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-stat-card",
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)" },
          "-=0.3"
        )
        .fromTo(
          ".hero-btn-container",
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
          "-=0.3"
        );

      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 12,
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
      className="relative min-h-[96vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-32 pb-20 overflow-hidden"
    >
      {/* Warm Ambient Photo in Sunken Clay Canvas */}
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
          className="object-cover object-center opacity-30 brightness-105 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0F4FA] via-[#F0F4FA]/85 to-[#F0F4FA]/90" />
      </div>

      {/* Floating 3D Badges (Zero Emojis, Pure SVG Icons) */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 relative z-10">
        <div className="hero-clay-badge inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border-2 border-slate-100 border-b-[3px] border-b-slate-200 shadow-md text-slate-800 font-heading font-black text-xs select-none">
          <GraduationCap className="w-4 h-4 text-[#58CC02]" />
          <span>Angkatan 2026</span>
        </div>

        <div className="hero-clay-badge inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border-2 border-slate-100 border-b-[3px] border-b-slate-200 shadow-md text-slate-800 font-heading font-black text-xs select-none">
          <Zap className="w-4 h-4 text-[#1CB0F6] fill-[#1CB0F6]" />
          <span>SMK Negeri 1 Beringin</span>
        </div>

        <button
          onClick={fireConfetti}
          onMouseEnter={() => playPop(580)}
          className="hero-clay-badge cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border-2 border-amber-200 border-b-[3px] border-b-amber-300 shadow-md text-amber-800 font-heading font-black text-xs hover:scale-105 active:translate-y-0.5 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>31 Siswa Solid</span>
        </button>
      </div>

      {/* Big Bubbly Headline */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-slate-900 tracking-tight leading-[1] mb-4 flex flex-wrap justify-center gap-x-4">
          <span className="hero-title-word inline-block drop-shadow-sm">XII</span>
          <span className="hero-title-word inline-block bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-sm">
            PPLG
          </span>
          <span className="hero-title-word inline-block drop-shadow-sm">3</span>
        </h1>

        <p className="hero-sub font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          Pengembangan Perangkat Lunak dan Gim
        </p>

        <p className="hero-sub text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-6 font-medium">
          Ruang digital kebersamaan dan arsip kenangan 31 siswa selama menempuh perjalanan penuh cerita, koding, dan persahabatan di SMK Negeri 1 Beringin.
        </p>

        {/* Gamified Duolingo Level Progress Bar */}
        <div className="w-full max-w-md mx-auto mb-8 px-4">
          <div className="flex items-center justify-between text-xs font-heading font-black text-slate-600 mb-1.5">
            <span className="flex items-center gap-1 text-[#58CC02]">
              <Trophy className="w-3.5 h-3.5 fill-current" /> Level 12 PPLG
            </span>
            <span className="text-slate-400">100% Siap Lulus</span>
          </div>
          <div className="w-full h-4 rounded-full bg-slate-200/90 border-2 border-slate-300/80 p-0.5 overflow-hidden shadow-inner">
            <div className="h-full rounded-full bg-gradient-to-r from-[#58CC02] to-[#1CB0F6] animate-pulse" style={{ width: "100%" }} />
          </div>
        </div>

        {/* 3 Chunky 3D Clay Stat Blocks */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg mb-8">
          <div
            onMouseEnter={() => playPop(500)}
            className="hero-stat-card clay-card p-3 sm:p-4 text-center clay-card-interactive flex flex-col items-center justify-center"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#58CC02] flex items-center justify-center mb-1.5 border-b-2 border-emerald-200">
              <Users className="w-4 h-4" />
            </div>
            <span className="font-heading font-black text-xl sm:text-2xl text-slate-900 leading-none">31</span>
            <span className="text-[11px] font-heading font-extrabold text-slate-500 mt-1">Siswa Aktif</span>
          </div>

          <div
            onMouseEnter={() => playPop(560)}
            className="hero-stat-card clay-card p-3 sm:p-4 text-center clay-card-interactive flex flex-col items-center justify-center"
          >
            <div className="w-9 h-9 rounded-full bg-sky-100 text-[#1CB0F6] flex items-center justify-center mb-1.5 border-b-2 border-sky-200">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <span className="font-heading font-black text-xl sm:text-2xl text-slate-900 leading-none">PPLG</span>
            <span className="text-[11px] font-heading font-extrabold text-slate-500 mt-1">Game &amp; Web</span>
          </div>

          <div
            onMouseEnter={() => playPop(620)}
            className="hero-stat-card clay-card p-3 sm:p-4 text-center clay-card-interactive flex flex-col items-center justify-center"
          >
            <div className="w-9 h-9 rounded-full bg-purple-100 text-[#8B5CF6] flex items-center justify-center mb-1.5 border-b-2 border-purple-200">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-heading font-black text-xl sm:text-2xl text-slate-900 leading-none">2026</span>
            <span className="text-[11px] font-heading font-extrabold text-slate-500 mt-1">Kelulusan</span>
          </div>
        </div>

        {/* Duolingo 3D Tactile Action Buttons */}
        <div className="hero-btn-container flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#siswa"
            onClick={() => playClick()}
            onMouseEnter={() => playPop(520)}
            className="clay-btn clay-btn-green px-8 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <span>Daftar 31 Siswa</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#tentang"
            onClick={() => playClick()}
            onMouseEnter={() => playPop(560)}
            className="clay-btn clay-btn-white px-7 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <span>Tentang Kelas</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </a>

          <button
            onClick={fireConfetti}
            onMouseEnter={() => playPop(600)}
            className="clay-btn clay-btn-amber px-5 py-3.5 text-sm flex items-center gap-1.5"
            title="Kirim Semangat!"
          >
            <Heart className="w-4 h-4 fill-current text-white" />
            <span>Beri Semangat</span>
          </button>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#tentang"
        onClick={() => playPop(480)}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[11px] font-heading font-black text-slate-400 hover:text-slate-700 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-wider">Jelajahi</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#58CC02]" />
      </a>
    </section>
  );
}
