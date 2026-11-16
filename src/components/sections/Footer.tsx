"use client";

import { ArrowUp, Terminal, Shield, Zap } from "lucide-react";
import { playBlip, playClick } from "@/lib/sound";

export function Footer() {
  const scrollToTop = () => {
    playClick();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold text-xs border border-cyan-500/30">
            P3
          </div>
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs sm:text-sm">
              XII PPLG 3 // SMK NEGERI 1 BERINGIN
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              SYSTEM BUILD: v2026.3.0 • CLASS YEARBOOK &amp; ROSTER ARCHIVE
            </span>
          </div>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 font-bold text-slate-600 dark:text-slate-300">
          <a
            href="#hero"
            onClick={() => playBlip(700)}
            className="hover:text-cyan-500 transition-colors"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            onClick={() => playBlip(750)}
            className="hover:text-cyan-500 transition-colors"
          >
            Tentang
          </a>
          <a
            href="#siswa"
            onClick={() => playBlip(800)}
            className="hover:text-cyan-500 transition-colors"
          >
            Siswa
          </a>
          <a
            href="#galeri"
            onClick={() => playBlip(850)}
            className="hover:text-cyan-500 transition-colors"
          >
            Galeri
          </a>
          <a
            href="#pesan"
            onClick={() => playBlip(900)}
            className="hover:text-cyan-500 transition-colors"
          >
            Transmisi
          </a>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => playBlip(950)}
            className="arcade-btn arcade-btn-secondary px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
