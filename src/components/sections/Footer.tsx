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
    <footer className="border-t-2 border-slate-200/80 bg-white/80 backdrop-blur-md py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-heading">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#58CC02] text-white flex items-center justify-center font-black text-xs border-b-2 border-[#46A302] shadow-xs">
            3
          </div>
          <div>
            <span className="font-extrabold text-slate-800 block text-xs sm:text-sm">
              XII PPLG 3 • SMK Negeri 1 Beringin
            </span>
            <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
              Dibuat dengan <Heart className="w-3 h-3 text-[#FF4B4B] fill-current" /> untuk Angkatan 2026
            </span>
          </div>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 font-extrabold text-slate-600">
          <a href="#hero" className="hover:text-slate-900 transition-colors">
            Beranda
          </a>
          <a href="#tentang" className="hover:text-slate-900 transition-colors">
            Tentang
          </a>
          <a href="#siswa" className="hover:text-slate-900 transition-colors">
            Siswa
          </a>
          <a href="#galeri" className="hover:text-slate-900 transition-colors">
            Galeri
          </a>
          <a href="#pesan" className="hover:text-slate-900 transition-colors">
            Kenangan
          </a>

          <button
            onClick={scrollToTop}
            className="clay-btn clay-btn-white px-3.5 py-1.5 text-xs flex items-center gap-1"
          >
            <span>Ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
