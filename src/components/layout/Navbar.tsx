"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, Images } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { useTheme } from "@/lib/theme-provider";
import { snappySpring, pixelEase } from "@/lib/motion-presets";
import { scrollToSection, scrollToTop } from "@/lib/scroll";

const navItems = [
  { href: "/", id: "hero", label: "Beranda" },
  { href: "/#tentang", id: "tentang", label: "Tentang" },
  { href: "/#siswa", id: "siswa", label: "Siswa" },
  { href: "/#kenangan", id: "kenangan", label: "Kenangan" },
  { href: "/#struktur", id: "struktur", label: "Struktur" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isGalleryPage = pathname === "/galeri";

  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    isGalleryPage ? "kenangan" : "hero"
  );
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    if (mobileMenuOpen) {
      lastScrollY.current = latest;
      return;
    }
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
    if (isGalleryPage) {
      setActiveSection("kenangan");
      return;
    }

    const initialHash = window.location.hash.replace(/^#/, "");
    if (initialHash && navItems.some((item) => item.id === initialHash)) {
      setActiveSection(initialHash);
    } else {
      setActiveSection("hero");
    }

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
  }, [isGalleryPage]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    setMobileMenuOpen(false);
    if (isHomePage) {
      e.preventDefault();
      if (id === "hero") {
        scrollToTop(false);
        if (window.location.hash) {
          window.history.replaceState(null, "", "/");
        }
      } else {
        scrollToSection(id, false);
        window.history.replaceState(null, "", `/#${id}`);
      }
      setActiveSection(id);
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: visible || mobileMenuOpen ? 0 : -110, opacity: 1 }}
      transition={snappySpring}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pt-3 pointer-events-none"
    >
      <nav
        aria-label="Navigasi utama"
        className="pointer-events-auto relative flex items-center justify-between sm:justify-start gap-2 sm:gap-4 px-3 sm:px-4 py-2 pixel-box max-w-5xl w-full sm:w-auto"
      >
        {/* Brand */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "hero")}
          className="flex items-center gap-2 sm:gap-2.5 select-none group pr-1 shrink-0"
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
          <div className="flex flex-col justify-center">
            <span className="font-pixel text-[9px] sm:text-[10px] text-[var(--fg-primary)] leading-snug pt-[1px] whitespace-nowrap">
              XII PPLG 3
            </span>
            <span className="font-silk text-[8px] sm:text-[9px] text-[var(--accent-indigo)] dark:text-[#FACC15] font-bold leading-tight whitespace-nowrap">
              SMKN 1 BERINGIN
            </span>
          </div>
        </Link>

        {/* Pixel Divider (Desktop/Tablet) */}
        <div
          aria-hidden="true"
          className="w-[2px] h-6 bg-[var(--border-soft)] hidden sm:block"
        />

        {/* Desktop / Tablet Navigation Links */}
        <div className="hidden sm:flex items-center gap-1 font-silk font-bold text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 transition-colors whitespace-nowrap ${
                  item.id === "tentang" ? "hidden md:inline-flex" : ""
                } ${
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
              </Link>
            );
          })}
        </div>

        {/* Right Actions: Theme Toggle + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <motion.button
            type="button"
            onClick={toggleTheme}
            whileTap={{ scale: 0.94, y: 1 }}
            transition={snappySpring}
            aria-label={
              theme === "dark" ? "Ubah ke Mode Terang" : "Ubah ke Mode Gelap"
            }
            title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
            className="group inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 border-2 border-[var(--border-hard)] bg-[var(--bg-inset)] hover:bg-[var(--accent-gold)] hover:text-[#181624] text-[var(--fg-primary)] font-silk text-[10px] font-bold shadow-[2px_2px_0px_var(--shadow-hard)] transition-colors shrink-0 cursor-pointer"
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

          {/* Mobile Hamburger Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.94, y: 1 }}
            transition={snappySpring}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
            className="sm:hidden inline-flex items-center justify-center w-8 h-8 border-2 border-[var(--border-hard)] bg-[var(--bg-inset)] text-[var(--fg-primary)] shadow-[2px_2px_0px_var(--shadow-hard)] cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Discrete 8-Bit Segmented Pixel Scroll Progress Bar */}
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

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: pixelEase }}
            className="sm:hidden pointer-events-auto w-full mt-2 pixel-box p-2 space-y-1.5"
          >
            <div className="grid grid-cols-2 gap-1.5 font-silk font-bold text-xs">
              {navItems
                .filter((i) => i.id !== "kenangan")
                .map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`flex items-center justify-between px-3 py-2.5 border-2 transition-colors ${
                        isActive
                          ? "bg-[#5B46C8] text-white border-[#181624] dark:bg-[#FACC15] dark:text-[#181624]"
                          : "bg-[var(--bg-inset)] text-[var(--fg-primary)] border-transparent hover:border-[var(--border-hard)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 bg-current inline-block"
                        />
                      )}
                    </Link>
                  );
                })}
            </div>

            <Link
              href="/galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-[#FACC15] text-[#181624] border-2 border-[#181624] font-pixel text-[9px] font-bold"
            >
              <Images className="w-3.5 h-3.5" />
              <span>ALBUM KENANGAN (19)</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
