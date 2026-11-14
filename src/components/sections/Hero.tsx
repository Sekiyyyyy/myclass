"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Entrance timeline
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.5)" }
      )
        .fromTo(
          ".hero-title-word",
          { opacity: 0, y: 40, rotateX: 20 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-btn",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.3"
        );

      // 2. Parallax background zoom and subtle drift on scroll
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 20,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // 3. Huge typography subtle parallax
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          yPercent: 30,
          opacity: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
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
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-32 pb-24 overflow-hidden"
    >
      {/* Warm, Clear Blended Background Image */}
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
          className="object-cover object-center opacity-65 brightness-100 contrast-105"
        />
        {/* Soft Vignette Overlay to ensure text readability while keeping photo vividly clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF9] via-[#FAFAF9]/40 to-[#FAFAF9]/75" />
        <div className="absolute inset-0 bg-radial-[at_50%_40%] from-white/30 via-white/50 to-[#FAFAF9]/90" />
      </div>

      {/* Subtle Huge Background Typography */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-[22vw] font-black text-stone-900/[0.04] tracking-tighter uppercase whitespace-nowrap z-0"
      >
        PPLG 3
      </div>

      {/* Foreground Hero Content */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Class Identity Pill */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-xs text-xs font-medium text-stone-700 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Angkatan 2026</span>
          <span className="text-stone-300">•</span>
          <span>SMK Negeri 1 Beringin</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-stone-900 tracking-tight leading-[1] mb-5 flex flex-wrap justify-center gap-x-4">
          <span className="hero-title-word inline-block">XII</span>
          <span className="hero-title-word inline-block bg-gradient-to-r from-stone-900 via-amber-800 to-stone-900 bg-clip-text text-transparent">
            PPLG
          </span>
          <span className="hero-title-word inline-block">3</span>
        </h1>

        {/* Subtitle with correct PPLG expansion */}
        <p className="hero-sub text-xl sm:text-2xl md:text-3xl font-semibold text-stone-800 tracking-tight mb-3">
          Pengembangan Perangkat Lunak dan Gim
        </p>

        {/* Clean, authentic brief description */}
        <p className="hero-sub text-sm sm:text-base text-stone-600 max-w-lg mx-auto leading-relaxed mb-10">
          Ruang digital kebersamaan dan arsip kenangan 31 siswa selama menempuh perjalanan di SMK Negeri 1 Beringin.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#siswa"
            className="hero-btn px-7 py-3.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Daftar 31 Siswa</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#tentang"
            className="hero-btn px-6 py-3.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-stone-800 hover:bg-stone-50 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Tentang Kelas</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>
      </div>

      {/* Down Arrow / Scroll Prompt */}
      <a
        href="#tentang"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[11px] font-medium text-stone-400 hover:text-stone-700 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest">Jelajahi</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
