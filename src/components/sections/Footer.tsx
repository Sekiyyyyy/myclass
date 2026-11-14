"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-stone-200/80 bg-white/70 backdrop-blur-md py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
            3
          </div>
          <span>XII PPLG 3 • SMK Negeri 1 Beringin, Deli Serdang</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-stone-900 transition-colors">
            Beranda
          </a>
          <a href="#tentang" className="hover:text-stone-900 transition-colors">
            Tentang
          </a>
          <a href="#siswa" className="hover:text-stone-900 transition-colors">
            Siswa
          </a>
          <a href="#galeri" className="hover:text-stone-900 transition-colors">
            Galeri
          </a>
          <a href="#pesan" className="hover:text-stone-900 transition-colors">
            Kenangan
          </a>
          <button
            onClick={scrollToTop}
            className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
