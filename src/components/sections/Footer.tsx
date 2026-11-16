"use client";

import { ArrowUp, Heart } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-heading font-black text-xs border border-indigo-200 dark:border-indigo-800/60">
            P3
          </div>
          <div>
            <span className="font-heading font-bold text-slate-900 dark:text-white block text-sm">
              XII PPLG 3 • SMK Negeri 1 Beringin
            </span>
            <span className="text-xs text-slate-400">
              Buku Kenangan Digital Angkatan 2026
            </span>
          </div>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 font-semibold text-slate-600 dark:text-slate-300">
          <a href="#hero" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Beranda
          </a>
          <a href="#tentang" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Tentang
          </a>
          <a href="#siswa" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Siswa
          </a>
          <a href="#galeri" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Galeri
          </a>
          <a href="#pesan" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Pesan
          </a>

          <button
            onClick={scrollToTop}
            className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer rounded-lg"
          >
            <span>Ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
