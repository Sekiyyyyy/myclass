"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { ArrowDown, Camera, Users } from "lucide-react";
import { HeroBackground } from "@/components/sections/HeroBackground";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Entrance sequence
      tl.fromTo(
        logoWrapperRef.current,
        { opacity: 0, scale: 0.88, y: -25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.4)" }
      )
        .fromTo(
          ".pixel-hero-title",
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.45, ease: "steps(5)" },
          "-=0.2"
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

      // Continuous Floating Levitation Animation for 3D Planet Logo
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: -14,
          rotation: 2.5,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: heroRef }
  );

  // Subtle Parallax Effect on Desktop Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoWrapperRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = (clientX / innerWidth - 0.5) * 18;
    const yPos = (clientY / innerHeight - 0.5) * 18;

    gsap.to(logoWrapperRef.current, {
      x: xPos,
      y: yPos,
      rotationY: xPos * 0.7,
      rotationX: -yPos * 0.7,
      duration: 0.6,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    if (!logoWrapperRef.current) return;
    gsap.to(logoWrapperRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-20 text-center select-none overflow-hidden"
    >
      {/* Dynamic Animated Retro Cyber Arcade Background */}
      <HeroBackground />

      {/* 8-Bit Stepped Pixel Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 pixel-pill bg-white dark:bg-[#111827]">
        <span className="w-2 h-2 bg-amber-500 border border-slate-950 inline-block animate-pulse" />
        <span className="font-pixel text-[9px] sm:text-[10px] text-slate-900 dark:text-white uppercase tracking-wider">
          SMK NEGERI 1 BERINGIN
        </span>
        <span className="font-pixel text-[9px] text-amber-500 font-bold">
          [ 2026 ]
        </span>
      </div>

      {/* Official 3D Planet Logo — Floating Emblem with Native White Circular Badge */}
      <div
        ref={logoWrapperRef}
        className="relative z-10 mb-6 mx-auto perspective-1000 flex items-center justify-center"
      >
        {/* Soft Ambient Cosmic Aura Glow */}
        <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-purple-500/25 dark:bg-purple-600/30 blur-3xl pointer-events-none" />

        {/* Floating Logo Badge with its Authentic White Circular Backdrop */}
        <div
          ref={logoRef}
          className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 transform-gpu will-change-transform"
        >
          <Image
            src="/logo-v3.png"
            alt="Logo Resmi XII PPLG 3"
            fill
            priority
            className="object-contain filter drop-shadow-[0_12px_30px_rgba(168,85,247,0.45)]"
          />
        </div>
      </div>

      {/* Main Headline */}
      <div className="relative z-10 max-w-4xl mx-auto mb-8">
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

      {/* Action Buttons - Tactile Stepped Pixel Shape */}
      <div className="relative z-10 pixel-hero-btns flex flex-wrap items-center justify-center gap-4">
        <a href="#siswa" className="pixel-btn pixel-btn-primary">
          <Users className="w-3.5 h-3.5 mr-2" />
          <span>Lihat 31 Siswa</span>
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
