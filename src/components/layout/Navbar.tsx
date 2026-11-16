"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sun, Moon, Terminal, ShieldAlert } from "lucide-react";
import { playBlip, playClick, toggleSound, isSoundEnabled } from "@/lib/sound";
import { useTheme } from "@/lib/theme-provider";

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const lastScrollY = useRef(0);

  useEffect(() => {
    setSoundOn(isSoundEnabled());

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

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 sm:py-4 transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <nav
        className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 arcade-card hud-corner ${
          scrolled ? "scale-[0.98] border-cyan-500/40" : "scale-100"
        }`}
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={() => playBlip(900)}
          className="flex items-center gap-2.5 group pr-1 sm:pr-2 select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/20 dark:text-cyan-400 flex items-center justify-center font-mono font-black text-xs border border-cyan-500/30 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
            P3
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-xs sm:text-sm tracking-wider text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors leading-none flex items-center gap-1.5">
              <span>XII PPLG 3</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 leading-tight">
              SMKN 1 Beringin
            </span>
          </div>
        </a>

        {/* Status Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-[11px] border border-cyan-500/20 select-none">
          <Terminal className="w-3 h-3" />
          <span>ROSTER: 31/31</span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-0.5" />

        {/* Navigation Links */}
        <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
          <a
            href="#hero"
            onClick={() => playBlip(750)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            onClick={() => playBlip(800)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
          >
            Tentang
          </a>
          <a
            href="#siswa"
            onClick={() => playBlip(850)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
          >
            Siswa
          </a>
          <a
            href="#galeri"
            onClick={() => playBlip(900)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
          >
            Galeri
          </a>
          <a
            href="#pesan"
            onClick={() => playBlip(950)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
          >
            Transmisi
          </a>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-0.5" />

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Ganti ke Tema Terang" : "Ganti ke Tema Gelap"}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>

        {/* Sound Toggle Button */}
        <button
          onClick={handleSoundToggle}
          title={soundOn ? "Matikan Efek Suara Arcade" : "Nyalakan Efek Suara Arcade"}
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            soundOn
              ? "text-cyan-500 hover:bg-cyan-500/10"
              : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80"
          }`}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </nav>
    </header>
  );
}
