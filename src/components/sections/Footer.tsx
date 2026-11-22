"use client";

import Image from "next/image";
import { ArrowUp, Instagram } from "lucide-react";
import { CLASS_INFO } from "@/data/students";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t-4 border-[var(--border-hard)] bg-[var(--bg-surface)] py-10 px-4 sm:px-6 select-none">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
            <Image
              src="/logo-v3.png"
              alt="Logo XII PPLG 3"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-pixel text-[10px] sm:text-xs text-[var(--fg-primary)] block mb-1">
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

        <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-5 font-silk text-xs font-bold">
          <a
            href="#hero"
            className="text-[var(--fg-secondary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] transition-colors"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            className="text-[var(--fg-secondary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] transition-colors"
          >
            Tentang
          </a>
          <a
            href="#siswa"
            className="text-[var(--fg-secondary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] transition-colors"
          >
            Siswa
          </a>
          <a
            href="#struktur"
            className="text-[var(--fg-secondary)] hover:text-[var(--accent-indigo)] dark:hover:text-[#FACC15] transition-colors"
          >
            Struktur
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="pixel-btn pixel-btn-secondary !text-[8px] !py-2 !px-3 !m-0 flex items-center gap-1 cursor-pointer"
          >
            <span>KE ATAS</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
