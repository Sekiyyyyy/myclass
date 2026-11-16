"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { ArrowDown, Camera, Users, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#FBBF24", "#38BDF8", "#F43F5E", "#34D399"],
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
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.45, ease: "steps(5)" },
          "-=0.1"
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
      className="relative min-h-[82vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-32 pb-20 text-center select-none"
    >
      {/* Badge Kelas */}
      <div className="pixel-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 pixel-box bg-[#FBBF24] text-slate-950 font-silk font-bold text-xs mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>SMK NEGERI 1 BERINGIN • ANGKATAN 2026</span>
      </div>

      {/* Main Headline */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="pixel-hero-title font-pixel text-3xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white leading-[1.25] tracking-wide mb-4">
          XII PPLG 3
        </h1>
        <p className="font-silk text-sm sm:text-lg text-amber-500 dark:text-amber-400 font-bold tracking-wider mb-4 uppercase">
          Pengembangan Perangkat Lunak &amp; Gim
        </p>
        <p className="pixel-hero-sub font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          Website buku kenangan dan arsip digital 31 siswa kelas XII PPLG 3 SMK Negeri 1 Beringin. Tiga tahun kebersamaan, belajar koding, dan berproses bersama.
        </p>
      </div>

      {/* Action Buttons - Kata-kata Normal & Shape Pixel Tegas */}
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
