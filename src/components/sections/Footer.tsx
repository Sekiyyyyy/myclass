"use client";

import Image from "next/image";
import { ArrowUp, Instagram } from "lucide-react";

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
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-slate-300 dark:border-indigo-400/50 shadow-sm shrink-0 group hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="Logo XII PPLG 3"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <div>
            <span className="font-pixel text-[10px] sm:text-xs text-slate-900 dark:text-white block mb-0.5">
              XII PPLG 3 • SMKN 1 BERINGIN
            </span>
            <a
              href="https://instagram.com/class.of.eterna.pplgthree"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-silk text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase hover:underline"
            >
              <Instagram className="w-3 h-3" />
              <span>@class.of.eterna.pplgthree</span>
            </a>
          </div>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-5 font-silk text-xs font-bold">
          <a href="#hero" className="text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Beranda
          </a>
          <a href="#tentang" className="text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Tentang
          </a>
          <a href="#siswa" className="text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Siswa
          </a>
          <a href="#galeri" className="text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Galeri
          </a>
          <a href="#struktur" className="text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Struktur
          </a>

          <button
            onClick={scrollToTop}
            className="pixel-btn pixel-btn-secondary text-[9px] py-1.5 px-2.5 flex items-center gap-1 cursor-pointer"
          >
            <span>Ke Atas</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
