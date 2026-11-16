"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { ArrowDown, Sparkles, Code2, Users, GraduationCap, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const fireCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366F1", "#38BDF8", "#EC4899", "#10B981"],
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-stat-card",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          ".hero-btn-group",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.2"
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
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-32 pb-20 overflow-hidden"
    >
      {/* Subtle Background Photo with Gradient Fade */}
      <div
        ref={bgImageRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      >
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600"
          alt="Suasana Kelas XII PPLG 3"
          fill
          priority
          className="object-cover object-center opacity-10 dark:opacity-10 brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/80 to-[#F8FAFC]/95 dark:from-[#0B0F19] dark:via-[#0B0F19]/85 dark:to-[#0B0F19]/95" />
      </div>

      {/* Modern Badge */}
      <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-xs select-none">
        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
        <span>SMK Negeri 1 Beringin • Angkatan 2026</span>
      </div>

      {/* Main Headline */}
      <div className="text-center max-w-4xl mx-auto z-10 mb-6">
        <h1 className="hero-title-line text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-3">
          Keluarga Besar <br />
          <span className="text-gradient-accent">XII PPLG 3</span>
        </h1>
        <p className="hero-description text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
          Ruang berkarya, belajar rekayasa perangkat lunak dan gim, serta merajut kebersamaan 31 siswa hebat di SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Modern Bento Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full z-10 mb-8 px-2">
        <div className="hero-stat-card glass-card p-4 sm:p-5 text-center flex flex-col items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            31
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Siswa Terdaftar
          </span>
        </div>

        <div className="hero-stat-card glass-card p-4 sm:p-5 text-center flex flex-col items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            PPLG
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Software & Game
          </span>
        </div>

        <div className="hero-stat-card glass-card p-4 sm:p-5 text-center flex flex-col items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-2">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            2026
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Tahun Kelulusan
          </span>
        </div>

        <div className="hero-stat-card glass-card p-4 sm:p-5 text-center flex flex-col items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-2">
            <Heart className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            Solid
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Kompak & Kreatif
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="hero-btn-group flex flex-wrap items-center justify-center gap-3.5 z-10">
        <a href="#siswa" className="btn-primary">
          <span>Lihat Profil Siswa</span>
          <ArrowDown className="w-4 h-4 ml-2" />
        </a>

        <button
          onClick={fireCelebration}
          type="button"
          className="btn-secondary"
        >
          <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
          <span>Rayakan Angkatan</span>
        </button>
      </div>
    </section>
  );
}
