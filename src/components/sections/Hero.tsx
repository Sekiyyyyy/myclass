"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { ArrowDown, Terminal, Sparkles, Gamepad2, Code2, Users, Flame, Zap, Shield } from "lucide-react";
import confetti from "canvas-confetti";
import { playBlip, playClick, playPowerUp } from "@/lib/sound";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const fireCyberConfetti = () => {
    playPowerUp();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#00F0FF", "#A855F7", "#10B981", "#3B82F6", "#F59E0B"],
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".arcade-hud-chip",
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      )
        .fromTo(
          ".arcade-title-word",
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(1.7)" },
          "-=0.2"
        )
        .fromTo(
          ".arcade-hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".arcade-stat-item",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          ".arcade-btn-group",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
          "-=0.2"
        );

      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 14,
          scale: 1.06,
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
      {/* Ambient Cyber Background Photo */}
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
          className="object-cover object-center opacity-20 dark:opacity-15 brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/85 to-[#F8FAFC]/95 dark:from-[#07090E] dark:via-[#07090E]/85 dark:to-[#07090E]/95" />
      </div>

      {/* Cyber HUD Status Header */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 relative z-10">
        <div className="arcade-hud-chip inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs shadow-xs select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">SYSTEM ONLINE</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>SMKN 1 BERINGIN</span>
        </div>

        <div className="arcade-hud-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-mono text-xs select-none">
          <Zap className="w-3.5 h-3.5" />
          <span>CLASS OF 2026</span>
        </div>
      </div>

      {/* Hero Headline */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter leading-[0.98] mb-4 flex flex-wrap justify-center gap-x-4 text-slate-900 dark:text-white">
          <span className="arcade-title-word inline-block">XII</span>
          <span className="arcade-title-word inline-block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            PPLG
          </span>
          <span className="arcade-title-word inline-block">3</span>
        </h1>

        <p className="arcade-hero-sub font-heading text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-200 tracking-tight mb-3">
          Pengembangan Perangkat Lunak dan Gim
        </p>

        <p className="arcade-hero-sub text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-8 font-medium">
          Ruang digital kebersamaan, arsip karya rekayasa perangkat lunak dan gim, serta persahabatan 31 siswa selama menempuh perjalanan di SMK Negeri 1 Beringin.
        </p>

        {/* High-Tech HUD Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-10">
          <div
            onMouseEnter={() => playBlip(700)}
            className="arcade-stat-item arcade-card p-3.5 text-center flex flex-col items-center justify-center hud-corner"
          >
            <div className="flex items-center gap-1.5 text-cyan-500 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase">Roster</span>
            </div>
            <span className="font-heading font-black text-2xl text-slate-900 dark:text-white leading-none">31</span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">Siswa Aktif</span>
          </div>

          <div
            onMouseEnter={() => playBlip(750)}
            className="arcade-stat-item arcade-card p-3.5 text-center flex flex-col items-center justify-center hud-corner"
          >
            <div className="flex items-center gap-1.5 text-purple-500 mb-1">
              <Gamepad2 className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase">Fokus</span>
            </div>
            <span className="font-heading font-black text-2xl text-slate-900 dark:text-white leading-none">Gim &amp; Web</span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">Developer</span>
          </div>

          <div
            onMouseEnter={() => playBlip(800)}
            className="arcade-stat-item arcade-card p-3.5 text-center flex flex-col items-center justify-center hud-corner"
          >
            <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
              <Code2 className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase">Level</span>
            </div>
            <span className="font-heading font-black text-2xl text-slate-900 dark:text-white leading-none">XII</span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">Senior Dev</span>
          </div>

          <div
            onMouseEnter={() => playBlip(850)}
            className="arcade-stat-item arcade-card p-3.5 text-center flex flex-col items-center justify-center hud-corner"
          >
            <div className="flex items-center gap-1.5 text-amber-500 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase">Target</span>
            </div>
            <span className="font-heading font-black text-2xl text-slate-900 dark:text-white leading-none">2026</span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">Kelulusan</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="arcade-btn-group flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#siswa"
            onClick={() => playClick()}
            onMouseEnter={() => playBlip(820)}
            className="arcade-btn arcade-btn-primary px-8 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <span>Buka Roster 31 Siswa</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#tentang"
            onClick={() => playClick()}
            onMouseEnter={() => playBlip(880)}
            className="arcade-btn arcade-btn-secondary px-7 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <span>Dossier Kelas</span>
            <Terminal className="w-4 h-4" />
          </a>

          <button
            onClick={fireCyberConfetti}
            onMouseEnter={() => playBlip(940)}
            className="arcade-btn arcade-btn-purple px-5 py-3.5 text-sm flex items-center gap-1.5"
            title="Kirim Semangat / Boost XP!"
          >
            <Sparkles className="w-4 h-4" />
            <span>Boost XP</span>
          </button>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#tentang"
        onClick={() => playBlip(700)}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[11px] font-mono font-bold text-slate-400 hover:text-cyan-500 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest">JELAJAHI</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-500" />
      </a>
    </section>
  );
}
