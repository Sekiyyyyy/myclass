"use client";

import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Only toggle hide/show after passing initial top 60px
      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 8) {
          // Scrolling down -> hide navbar
          setVisible(false);
        } else if (lastScrollY.current - currentScrollY > 8) {
          // Scrolling up -> show navbar
          setVisible(true);
        }
      } else {
        // At the top of page -> always show
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 sm:py-4 transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <nav
        className={`flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2.5 rounded-full transition-all duration-300 bg-white/95 backdrop-blur-xl border-2 border-slate-100 border-b-[4px] border-b-slate-200 shadow-xl shadow-slate-200/50 ${
          scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group pr-1 sm:pr-2 select-none">
          <div className="w-8 h-8 rounded-full bg-[#58CC02] text-white flex items-center justify-center font-heading font-black text-sm border-b-[3px] border-[#46A302] shadow-sm group-hover:scale-105 active:translate-y-0.5 transition-transform">
            3
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xs sm:text-sm tracking-tight text-slate-800 group-hover:text-[#58CC02] transition-colors leading-none">
              XII PPLG 3
            </span>
            <span className="text-[10px] font-bold text-slate-400 leading-tight">
              SMKN 1 Beringin
            </span>
          </div>
        </a>

        {/* Streak Pill (Duolingo Flame) */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-heading font-extrabold text-xs border border-amber-200 border-b-2 border-b-amber-300 shadow-xs select-none">
          <span className="text-sm">🔥</span>
          <span>31 Siswa Solid</span>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-5 bg-slate-200 mx-0.5" />

        {/* Navigation Links */}
        <div className="flex items-center gap-1 text-xs font-heading font-extrabold text-slate-600">
          <a
            href="#hero"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/90 active:translate-y-0.5 transition-all"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/90 active:translate-y-0.5 transition-all"
          >
            Tentang
          </a>
          <a
            href="#siswa"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/90 active:translate-y-0.5 transition-all"
          >
            Siswa
          </a>
          <a
            href="#galeri"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/90 active:translate-y-0.5 transition-all"
          >
            Galeri
          </a>
          <a
            href="#pesan"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/90 active:translate-y-0.5 transition-all"
          >
            Kenangan
          </a>
        </div>
      </nav>
    </header>
  );
}
