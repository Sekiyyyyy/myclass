"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { ArrowDown, Users, Network, Instagram } from "lucide-react";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { CLASS_INFO } from "@/data/students";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-logo-stage",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.45, ease: "steps(5)" }
      )
        .fromTo(
          ".pixel-hero-badge",
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.3, ease: "steps(4)" },
          "-=0.25"
        )
        .fromTo(
          ".pixel-hero-title",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: "steps(4)" },
          "-=0.15"
        )
        .fromTo(
          ".pixel-hero-sub",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "steps(4)" },
          "-=0.15"
        )
        .fromTo(
          ".pixel-hero-btns",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "steps(4)" },
          "-=0.1"
        );

      // Stepped 16-bit idle bob animation for the emblem (authentic cartridge feel)
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: -10,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "steps(5)",
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[84vh] flex items-center justify-center px-4 sm:px-6 lg:px-10 pt-28 pb-20 select-none overflow-hidden"
    >
      {/* Theme-Aware 16-Bit Pixel Sky (Day Clouds in Light Mode / Stars & Comets in Dark Mode) */}
      <HeroBackground />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Official 3D Planet Logo inside Crisp 8-Bit Corner Reticle */}
        <div className="hero-logo-stage lg:col-span-5 flex justify-center lg:justify-start">
          <div className="relative p-5 sm:p-7 flex items-center justify-center">
            {/* Authentic 8-bit L-Corner Brackets (No Blur Blob, No Black Circle) */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-[#181624] dark:border-[#9D8BF4]"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-[#181624] dark:border-[#9D8BF4]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-[#181624] dark:border-[#9D8BF4]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-[#181624] dark:border-[#9D8BF4]"
            />

            {/* Tiny Pixel Cartridge Tag */}
            <span className="absolute -top-3 left-7 px-2 py-0.5 bg-[var(--bg-canvas)] font-pixel text-[8px] text-[var(--accent-indigo)] tracking-wider">
              EMBLEM_2026
            </span>

            {/* Floating Official Logo with its Authentic White Circular Badge */}
            <div
              ref={logoRef}
              className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 will-change-transform"
            >
              <Image
                src="/logo-v3.png"
                alt="Logo Resmi XII PPLG 3"
                fill
                priority
                className="object-contain drop-shadow-[4px_6px_0px_rgba(24,22,36,0.28)] dark:drop-shadow-[4px_6px_0px_rgba(7,6,13,0.85)]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Pixel Title & Actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* School Cartridge Badge */}
          <div className="pixel-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 pixel-pill">
            <span className="w-2 h-2 bg-[#5B46C8] dark:bg-[#FACC15] border border-[#181624] inline-block shrink-0" />
            <span className="font-pixel text-[9px] sm:text-[10px] text-[var(--fg-primary)] uppercase tracking-wider">
              {CLASS_INFO.school}
            </span>
            <span className="font-pixel text-[9px] text-[var(--accent-indigo)] dark:text-[#FACC15] font-bold">
              [{CLASS_INFO.year}]
            </span>
          </div>

          {/* Main Headline (No Duplicate "XII PPLG 3" Text) */}
          <h1 className="pixel-hero-title font-pixel text-2xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl text-[var(--fg-primary)] leading-[1.3] tracking-wide mb-3 pixel-title-shadow">
            BUKU KENANGAN
            <br />
            DIGITAL
            <span
              aria-hidden="true"
              className="inline-block w-3 sm:w-4 h-6 sm:h-9 ml-2 align-middle bg-[#5B46C8] dark:bg-[#FACC15] animate-pixel-blink"
            />
          </h1>

          {/* Major Subtitle */}
          <p className="pixel-hero-sub font-silk text-xs sm:text-sm md:text-base text-[var(--accent-indigo)] dark:text-[#FACC15] font-bold tracking-wider mb-4 uppercase">
            {CLASS_INFO.batchName} &bull; {CLASS_INFO.major}
          </p>

          {/* Grounded Concise Intro */}
          <p className="pixel-hero-sub font-sans text-sm sm:text-base text-[var(--fg-secondary)] max-w-xl leading-relaxed font-medium mb-7">
            Arsip digital resmi {CLASS_INFO.totalStudents} siswa kelas{" "}
            <strong className="text-[var(--fg-primary)] font-bold">
              {CLASS_INFO.name}
            </strong>{" "}
            {CLASS_INFO.school}. Menyimpan daftar anggota, struktur
            kepengurusan, dan jejak tiga tahun bersama di {CLASS_INFO.lab}.
          </p>

          {/* Action Buttons */}
          <div className="pixel-hero-btns flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-7">
            <a href="#siswa" className="pixel-btn pixel-btn-primary">
              <Users className="w-3.5 h-3.5 mr-2 shrink-0" />
              <span>Lihat 31 Siswa</span>
              <ArrowDown className="w-3.5 h-3.5 ml-2 shrink-0" />
            </a>

            <a href="#struktur" className="pixel-btn pixel-btn-secondary">
              <Network className="w-3.5 h-3.5 mr-2 shrink-0" />
              <span>Struktur Kelas</span>
            </a>
          </div>

          {/* Inline Authentic Metadata Strip (Zero Fake Stat Boxes) */}
          <div className="pixel-hero-btns flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 pt-4 border-t-2 border-dashed border-[var(--border-soft)] w-full max-w-xl font-silk text-[11px] font-bold text-[var(--fg-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[var(--accent-crimson)] inline-block" />
              {CLASS_INFO.totalStudents} SISWA
            </span>
            <span aria-hidden="true">/</span>
            <span>{CLASS_INFO.lab}</span>
            <span aria-hidden="true">/</span>
            <a
              href={CLASS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--accent-indigo)] dark:text-[#FACC15] hover:underline"
            >
              <Instagram className="w-3 h-3 shrink-0" />
              <span>@{CLASS_INFO.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
