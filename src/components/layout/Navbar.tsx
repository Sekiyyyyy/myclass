"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { useTheme } from "@/lib/theme-provider";
import { snappySpring } from "@/lib/motion-presets";

const navItems = [
  { href: "#hero", id: "hero", label: "Beranda" },
  { href: "#tentang", id: "tentang", label: "Tentang" },
  { href: "#siswa", id: "siswa", label: "Siswa" },
  { href: "#struktur", id: "struktur", label: "Struktur" },
];

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();

  // GPU-driven scroll progress with zero per-frame React re-renders
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    if (latest > 80) {
      if (latest > prev && latest - prev > 12) {
        setVisible(false);
      } else if (prev - latest > 12) {
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
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
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: visible ? 0 : -110, opacity: 1 }}
      transition={snappySpring}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 pointer-events-none"
    >
      <nav
        aria-label="Navigasi utama"
        className="pointer-events-auto relative flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 pixel-box max-w-4xl w-full sm:w-auto"
      >
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 select-none group pr-1"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileTap={{ scale: 0.94 }}
            transition={snappySpring}
            className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0"
          >
            <Image
              src="/logo-v4.png"
              alt="Logo XII PPLG 3"
              fill
              className="object-contain"
            />
          </motion.div>
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

        {/* Navigation Links with Shared-Element Sliding Pixel Active Pill */}
        <div className="flex items-center gap-0.5 sm:gap-1 font-silk font-bold text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 transition-colors ${
                  item.id === "hero" ? "hidden sm:inline-flex" : ""
                } ${item.id === "tentang" ? "hidden md:inline-flex" : ""} ${
                  isActive
                    ? "text-white dark:text-[#181624]"
                    : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={snappySpring}
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#5B46C8] dark:bg-[#FACC15] z-0"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 bg-current inline-block shrink-0"
                    />
                  )}
                  <span>{item.label}</span>
                </span>
              </a>
            );
          })}
        </div>

        {/* Tactile Theme Toggle with Animated Icon Swap */}
        <motion.button
          type="button"
          onClick={toggleTheme}
          whileTap={{ scale: 0.94, y: 1 }}
          transition={snappySpring}
          aria-label={
            theme === "dark" ? "Ubah ke Mode Terang" : "Ubah ke Mode Gelap"
          }
          title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
          className="group ml-auto inline-flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-[var(--border-hard)] bg-[var(--bg-inset)] hover:bg-[var(--accent-gold)] hover:text-[#181624] text-[var(--fg-primary)] font-silk text-[10px] font-bold shadow-[2px_2px_0px_var(--shadow-hard)] transition-colors shrink-0 cursor-pointer"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.span
                key="sun"
                initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.16 }}
                className="inline-flex items-center gap-1.5"
              >
                <Sun className="w-3.5 h-3.5 text-[#FACC15] group-hover:text-[#181624] transition-colors" />
                <span className="hidden sm:inline">TERANG</span>
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 60, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -60, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.16 }}
                className="inline-flex items-center gap-1.5"
              >
                <Moon className="w-3.5 h-3.5 text-[#5B46C8] group-hover:text-[#181624] transition-colors" />
                <span className="hidden sm:inline">GELAP</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Discrete 8-Bit Segmented Pixel Scroll Progress Bar (GPU Spring) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1 right-1 h-[3px] bg-[var(--bg-inset)] overflow-hidden"
        >
          <motion.div
            className="h-full origin-left"
            style={{
              scaleX: smoothProgress,
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--accent-indigo) 0px, var(--accent-indigo) 6px, transparent 6px, transparent 8px)",
            }}
          />
        </div>
      </nav>
    </motion.header>
  );
}
