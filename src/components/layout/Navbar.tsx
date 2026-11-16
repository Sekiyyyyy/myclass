"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Scroll Progress Calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, currentScrollY / totalHeight)));
      }

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
        className={`relative flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 pixel-box ${
          scrolled ? "bg-white/95 dark:bg-[#111827]/95 shadow-md" : "bg-white dark:bg-[#111827]"
        }`}
      >
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 select-none group pr-1">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            <Image
              src="/logo-v3.png"
              alt="Logo XII PPLG 3"
              fill
              className="object-contain"
            />
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
            href="#struktur"
            className="px-2 py-1 text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Struktur
          </a>
        </div>

        {/* Theme Toggle Button - Stepped Pixel Icon */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
          className="ml-auto w-8 h-8 flex items-center justify-center pixel-btn !p-0 !m-0 !shadow-none text-slate-800 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
          )}
        </button>

        {/* Dynamic 8-Bit Scroll Reading Progress Bar */}
        <div className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-slate-200/50 dark:bg-slate-800/80 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 origin-left transition-transform duration-75"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </nav>
    </header>
  );
}
