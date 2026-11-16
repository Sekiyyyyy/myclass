"use client";

import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 8) {
          setVisible(false);
        } else if (lastScrollY.current - currentScrollY > 8) {
          setVisible(true);
        }
      } else {
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
        className={`flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 glass-card ${
          scrolled ? "shadow-lg border-indigo-500/20 bg-white/90 dark:bg-slate-900/90" : ""
        }`}
      >
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group select-none pr-1"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center font-heading font-black text-xs border border-indigo-500/20 group-hover:border-indigo-400 group-hover:scale-105 transition-all">
            P3
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors leading-none flex items-center gap-1.5">
              <span>XII PPLG 3</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
              SMKN 1 Beringin
            </span>
          </div>
        </a>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        {/* Navigation Links */}
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <a
            href="#hero"
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          >
            Tentang
          </a>
          <a
            href="#siswa"
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          >
            Siswa
          </a>
          <a
            href="#galeri"
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all hidden md:inline-block"
          >
            Galeri
          </a>
          <a
            href="#pesan"
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          >
            Pesan
          </a>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-800" />

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Ganti ke Tema Terang" : "Ganti ke Tema Gelap"}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>
      </nav>
    </header>
  );
}
