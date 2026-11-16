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
        { opacity: 0, scale: 0.9, x: -30 },
        { opacity: 1, scale: 1, x: 0, duration: 0.7, ease: "back.out(1.4)" }
      )
        .fromTo(
          ".pixel-hero-badge",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.35, ease: "steps(4)" },
          "-=0.3"
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
      className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-10 pt-28 pb-16 select-none overflow-hidden"
    >
      {/* Dynamic Animated Retro Cyber Arcade Background */}
      <HeroBackground />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Official 3D Planet Logo Emblem */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <div
            ref={logoWrapperRef}
            className="relative perspective-1000 flex items-center justify-center"
          >
            {/* Soft Ambient Cosmic Aura Glow */}
            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full bg-purple-500/25 dark:bg-purple-600/30 blur-3xl pointer-events-none" />

            {/* Floating Logo Badge with its Authentic White Circular Backdrop */}
            <div
              ref={logoRef}
              className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 transform-gpu will-change-transform"
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
        </div>

        {/* Right Column: Hero Information & Call To Action */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* 8-Bit Stepped Pixel Badge */}
          <div className="pixel-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 pixel-pill bg-white dark:bg-[#111827]">
            <span className="w-2 h-2 bg-amber-500 border border-slate-950 inline-block animate-pulse" />
            <span className="font-pixel text-[9px] sm:text-[10px] text-slate-900 dark:text-white uppercase tracking-wider">
              SMK NEGERI 1 BERINGIN
            </span>
            <span className="font-pixel text-[9px] text-amber-500 font-bold">
              [ 2026 ]
            </span>
          </div>

          {/* Main Headline (Replaced Redundant Title with Expressive Yearbook Headline) */}
          <h1 className="pixel-hero-title font-pixel text-3xl sm:text-5xl lg:text-5xl xl:text-6xl text-slate-900 dark:text-white leading-[1.2] tracking-wide mb-3 pixel-title-shadow">
            BUKU KENANGAN DIGITAL
          </h1>

          <p className="font-silk text-xs sm:text-sm md:text-base text-amber-500 dark:text-amber-400 font-bold tracking-wider mb-4 uppercase">
            ETERNA • PENGEMBANGAN PERANGKAT LUNAK &amp; GIM
          </p>

          <p className="pixel-hero-sub font-sans text-sm sm:text-base text-slate-800 dark:text-slate-100 max-w-xl leading-relaxed font-medium mb-6">
            Website memori dan arsip digital 31 siswa kelas XII PPLG 3 SMK Negeri 1 Beringin. Tiga tahun kebersamaan, belajar koding, dan berproses bersama.
          </p>

          {/* Action Buttons - Tactile Stepped Pixel Shape */}
          <div className="pixel-hero-btns flex flex-wrap items-center justify-center lg:justify-start gap-4">
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
        </div>
      </div>
    </section>
  );
}
