"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { ArrowDown, Camera, Users } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".pixel-hero-title",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "steps(5)" }
      )
        .fromTo(
          ".pixel-hero-sub",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "steps(4)" },
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
      className="relative min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-32 pb-16 text-center select-none"
    >
      {/* 8-Bit Stepped Pixel Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 pixel-pill bg-white dark:bg-[#111827]">
        <span className="w-2.5 h-2.5 bg-emerald-500 border border-slate-950 inline-block animate-pulse" />
        <span className="font-pixel text-[9px] sm:text-[10px] text-slate-900 dark:text-white uppercase tracking-wider">
          SMK NEGERI 1 BERINGIN
        </span>
        <span className="font-pixel text-[9px] text-amber-500 font-bold">
          [ 2026 ]
        </span>
      </div>

      {/* Main Headline */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="pixel-hero-title font-pixel text-4xl sm:text-6xl md:text-7xl text-slate-900 dark:text-white leading-[1.25] tracking-wide mb-4 pixel-title-shadow">
          XII PPLG 3
        </h1>
        <p className="font-silk text-sm sm:text-lg text-amber-500 dark:text-amber-400 font-bold tracking-wider mb-4 uppercase">
          Pengembangan Perangkat Lunak &amp; Gim
        </p>
        <p className="pixel-hero-sub font-sans text-sm sm:text-base text-slate-800 dark:text-slate-100 max-w-xl mx-auto leading-relaxed font-medium">
          Website buku kenangan dan arsip digital 31 siswa kelas XII PPLG 3 SMK Negeri 1 Beringin. Tiga tahun kebersamaan, belajar koding, dan berproses bersama.
        </p>
      </div>

      {/* Action Buttons - Stepped Pixel Shape */}
      <div className="pixel-hero-btns flex flex-wrap items-center justify-center gap-4">
        <a href="#siswa" className="pixel-btn pixel-btn-primary">
          <Users className="w-3.5 h-3.5 mr-2" />
          <span>Lihat Anggota Kelas</span>
          <ArrowDown className="w-3.5 h-3.5 ml-2" />
        </a>

        <a href="#galeri" className="pixel-btn pixel-btn-secondary">
          <Camera className="w-3.5 h-3.5 mr-2" />
          <span>Galeri Foto</span>
        </a>
      </div>
    </section>
  );
}
