"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setVisible(false);
        } else if (lastScrollY - currentScrollY > 10) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 py-3 transition-transform duration-200 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        className={`flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2 pixel-box ${
          scrolled ? "bg-white/95 dark:bg-[#111827]/95 shadow-md" : "bg-white dark:bg-[#111827]"
        }`}
      >
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2 select-none group pr-1">
          <div className="w-7 h-7 bg-[#FBBF24] text-slate-950 flex items-center justify-center pixel-frame font-pixel text-[10px] font-bold">
            P3
          </div>
          <div className="flex flex-col">
            <span className="font-pixel text-[10px] sm:text-xs text-slate-900 dark:text-white leading-none">
              XII PPLG 3
            </span>
            <span className="font-silk text-[9px] text-amber-500 font-bold leading-tight">
              SMKN 1 BERINGIN
            </span>
          </div>
        </a>

        {/* Divider */}
        <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700 hidden sm:block" />

        {/* Navigation Links - Natural Words */}
        <div className="flex items-center gap-1 sm:gap-2 font-silk font-bold text-xs">
          <a
            href="#hero"
            className="px-2 py-1 text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            className="px-2 py-1 text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden md:inline-block"
          >
            Tentang
          </a>
          <a
            href="#siswa"
            className="px-2 py-1 text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Siswa
          </a>
          <a
            href="#galeri"
            className="px-2 py-1 text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:inline-block"
          >
            Galeri
          </a>
          <a
            href="#pesan"
            className="px-2 py-1 text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Pesan
          </a>
        </div>

        {/* Divider */}
        <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
          className="p-1.5 text-slate-700 dark:text-slate-200 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>
      </nav>
    </header>
  );
}
