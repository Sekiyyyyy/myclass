"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Flame, Users, BookOpen, Image as ImageIcon, MessageSquare } from "lucide-react";
import { playPop, playClick, toggleSound, isSoundEnabled } from "@/lib/sound";

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
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
        className={`flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2.5 rounded-full transition-all duration-300 clay-card ${
          scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={() => playPop(600)}
          className="flex items-center gap-2.5 group pr-1 sm:pr-2 select-none"
        >
          <div className="w-8 h-8 rounded-full bg-[#58CC02] text-white flex items-center justify-center font-heading font-black text-sm border-b-[3px] border-[#46A302] shadow-sm group-hover:scale-105 active:translate-y-0.5 transition-transform">
            3
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-xs sm:text-sm tracking-tight text-slate-800 group-hover:text-[#58CC02] transition-colors leading-none">
              XII PPLG 3
            </span>
            <span className="text-[10px] font-bold text-slate-400 leading-tight">
              SMKN 1 Beringin
            </span>
          </div>
        </a>

        {/* 31 Siswa Solid Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-heading font-black text-xs border border-amber-200 shadow-xs select-none">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>31 Siswa Solid</span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 mx-0.5" />

        {/* Navigation Links */}
        <div className="flex items-center gap-1 text-xs font-heading font-extrabold text-slate-600">
          <a
            href="#hero"
            onClick={() => playPop(540)}
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100 active:translate-y-0.5 transition-all"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            onClick={() => playPop(580)}
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100 active:translate-y-0.5 transition-all"
          >
            Tentang
          </a>
          <a
            href="#siswa"
            onClick={() => playPop(620)}
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100 active:translate-y-0.5 transition-all"
          >
            Siswa
          </a>
          <a
            href="#galeri"
            onClick={() => playPop(660)}
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100 active:translate-y-0.5 transition-all"
          >
            Galeri
          </a>
          <a
            href="#pesan"
            onClick={() => playPop(700)}
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100 active:translate-y-0.5 transition-all"
          >
            Kenangan
          </a>
        </div>

        {/* Sound Toggle Button */}
        <button
          onClick={handleSoundToggle}
          title={soundOn ? "Matikan Suara SFX" : "Nyalakan Suara SFX"}
          className={`clay-btn p-2 text-xs rounded-full ml-1 border-b-2 transition-all cursor-pointer ${
            soundOn
              ? "bg-emerald-100 text-[#58CC02] border-emerald-300"
              : "bg-slate-100 text-slate-400 border-slate-300"
          }`}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </nav>
    </header>
  );
}
