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
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 6) {
          // Scrolling down -> hide navbar
          setVisible(false);
        } else if (lastScrollY.current - currentScrollY > 6) {
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
        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border border-stone-200/90 shadow-md shadow-stone-900/5"
            : "bg-white/80 backdrop-blur-md border border-stone-200/70 shadow-xs"
        }`}
      >
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2 group pr-1 sm:pr-2">
          <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs group-hover:scale-105 transition-transform">
            3
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
            XII PPLG 3
          </span>
        </a>

        {/* Subtle Vertical Divider */}
        <div className="w-px h-3.5 bg-stone-200/90 mx-0.5" />

        {/* Compact Navigation Links */}
        <div className="flex items-center gap-0.5 sm:gap-1 text-xs font-medium text-stone-600">
          <a
            href="#hero"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-stone-900 hover:bg-stone-100/90 transition-all"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-stone-900 hover:bg-stone-100/90 transition-all"
          >
            Tentang
          </a>
          <a
            href="#siswa"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-stone-900 hover:bg-stone-100/90 transition-all"
          >
            Siswa
          </a>
          <a
            href="#galeri"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-stone-900 hover:bg-stone-100/90 transition-all"
          >
            Galeri
          </a>
          <a
            href="#pesan"
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-stone-900 hover:bg-stone-100/90 transition-all"
          >
            Kenangan
          </a>
        </div>
      </nav>
    </header>
  );
}
