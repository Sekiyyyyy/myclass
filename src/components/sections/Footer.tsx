"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp, Instagram } from "lucide-react";
import { CLASS_INFO } from "@/data/students";
import { snappySpring } from "@/lib/motion-presets";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t-4 border-[var(--border-hard)] bg-[var(--bg-surface)] py-8 sm:py-10 px-4 sm:px-6 select-none">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
            <Image
              src="/logo-v4.png"
              alt="Logo XII PPLG 3"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-pixel text-[9px] sm:text-xs text-[var(--fg-primary)] block mb-1">
              {CLASS_INFO.name} &bull; {CLASS_INFO.school}
            </span>
            <a
              href={CLASS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-silk text-[11px] text-[var(--accent-indigo)] dark:text-[#FACC15] font-bold hover:underline"
            >
              <Instagram className="w-3.5 h-3.5 shrink-0" />
              <span>@{CLASS_INFO.instagramHandle}</span>
            </a>
          </div>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-2.5 sm:gap-5 font-silk text-xs font-bold">
          <Link
            href="/#hero"
            className="text-[var(--fg-secondary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/#tentang"
            className="text-[var(--fg-secondary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] transition-colors"
          >
            Tentang
          </Link>
          <Link
            href="/#siswa"
            className="text-[var(--fg-secondary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] transition-colors"
          >
            Siswa
          </Link>
          <Link
            href="/galeri"
            className="text-[var(--fg-secondary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] transition-colors"
          >
            Kenangan
          </Link>
          <Link
            href="/#struktur"
            className="text-[var(--fg-secondary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] transition-colors"
          >
            Struktur
          </Link>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ y: 2 }}
            transition={snappySpring}
            className="pixel-btn pixel-btn-secondary !text-[8px] !py-2 !px-3 !m-0 flex items-center gap-1 cursor-pointer"
          >
            <span>KE ATAS</span>
            <ArrowUp className="w-3 h-3" />
          </motion.button>
        </div>
      </div>

      {/* Understated Colophon / Author Credit */}
      <div className="max-w-6xl mx-auto mt-7 pt-5 border-t-2 border-dashed border-[var(--border-soft)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-silk text-[var(--fg-muted)]">
        <span>
          &copy; {CLASS_INFO.year} {CLASS_INFO.name} &mdash; {CLASS_INFO.school}
        </span>
        <span>
          Created by{" "}
          <a
            href="https://github.com/Sekiyyyyy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--fg-primary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] font-bold hover:underline transition-colors"
          >
            Rizky Alfianno
          </a>
        </span>
      </div>
    </footer>
  );
}
