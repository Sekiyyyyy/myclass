"use client";

import { ArrowUp, Gamepad2 } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t-2 border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827] py-10 px-4 sm:px-6 select-none">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded pixel-box bg-[#FBBF24] text-slate-950 flex items-center justify-center font-pixel text-xs font-bold">
            P3
          </div>
          <div>
            <span className="font-pixel text-[10px] sm:text-xs text-slate-900 dark:text-white block">
              XII PPLG 3 • SMKN 1 BERINGIN
            </span>
            <span className="font-silk text-[10px] text-amber-500 font-bold uppercase">
              CLASS YEARBOOK • STAGE CLEAR 2026
            </span>
          </div>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-5 font-silk text-xs font-bold">
          <a href="#hero" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
            START
          </a>
          <a href="#tentang" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
            CLASS
          </a>
          <a href="#siswa" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
            ROSTER
          </a>
          <a href="#galeri" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
            GALLERY
          </a>
          <a href="#pesan" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
            BOARD
          </a>

          <button
            onClick={scrollToTop}
            className="pixel-btn pixel-btn-secondary text-[9px] py-1.5 px-2.5 flex items-center gap-1 cursor-pointer"
          >
            <span>[ TOP ]</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
