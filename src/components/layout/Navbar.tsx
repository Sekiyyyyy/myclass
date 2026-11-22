"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

const navItems = [
  { href: "#hero", id: "hero", label: "Beranda" },
  { href: "#tentang", id: "tentang", label: "Tentang" },
  { href: "#siswa", id: "siswa", label: "Siswa" },
  { href: "#struktur", id: "struktur", label: "Struktur" },
];

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(
          Math.min(1, Math.max(0, currentScrollY / totalHeight))
        );
      }

      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 12) {
          setVisible(false);
        } else if (lastScrollY - currentScrollY > 12) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds = navItems.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 transition-transform duration-150 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="relative flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 pixel-box max-w-4xl w-full sm:w-auto"
      >
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 select-none group pr-1"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-100 group-hover:scale-105">
            <Image
              src="/logo-v4.png"
              alt="Logo XII PPLG 3"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-pixel text-[9px] sm:text-[10px] text-[var(--fg-primary)] leading-none">
              XII PPLG 3
            </span>
            <span className="font-silk text-[9px] text-[var(--accent-indigo)] dark:text-[#FACC15] font-bold leading-tight mt-0.5">
              SMKN 1 BERINGIN
            </span>
          </div>
        </a>

        {/* Pixel Divider */}
        <div
          aria-hidden="true"
          className="w-[2px] h-6 bg-[var(--border-soft)] hidden sm:block"
        />

        {/* Navigation Links */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 font-silk font-bold text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 transition-colors ${
                  item.id === "hero" ? "hidden sm:inline-flex" : ""
                } ${item.id === "tentang" ? "hidden md:inline-flex" : ""} ${
                  isActive
                    ? "bg-[#5B46C8] text-white dark:bg-[#FACC15] dark:text-[#181624]"
                    : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--bg-inset)]"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 bg-current inline-block shrink-0"
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Tactile Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Ubah ke Mode Terang" : "Ubah ke Mode Gelap"
          }
          title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
          className="group ml-auto inline-flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-[var(--border-hard)] bg-[var(--bg-inset)] hover:bg-[var(--accent-gold)] hover:text-[#181624] text-[var(--fg-primary)] font-silk text-[10px] font-bold shadow-[2px_2px_0px_var(--shadow-hard)] active:translate-y-[1px] active:shadow-none transition-all shrink-0 cursor-pointer"
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-3.5 h-3.5 text-[#FACC15] group-hover:text-[#181624] transition-colors" />
              <span className="hidden sm:inline">TERANG</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-[#5B46C8] group-hover:text-[#181624] transition-colors" />
              <span className="hidden sm:inline">GELAP</span>
            </>
          )}
        </button>

        {/* Discrete 8-Bit Segmented Pixel Scroll Progress Bar */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1 right-1 h-[3px] bg-[var(--bg-inset)] overflow-hidden"
        >
          <div
            className="h-full origin-left transition-transform duration-75"
            style={{
              transform: `scaleX(${scrollProgress})`,
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--accent-indigo) 0px, var(--accent-indigo) 6px, transparent 6px, transparent 8px)",
            }}
          />
        </div>
      </nav>
    </header>
  );
}
