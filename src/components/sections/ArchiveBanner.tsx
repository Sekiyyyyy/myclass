"use client";

import { motion } from "motion/react";
import { Instagram, ArrowUpRight } from "lucide-react";
import { CLASS_INFO } from "@/data/students";
import { pixelEase, snappySpring, viewportOnce } from "@/lib/motion-presets";

export function ArchiveBanner() {
  return (
    <section className="px-4 sm:px-6 pb-20 max-w-6xl mx-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.36, ease: pixelEase }}
        className="pixel-box overflow-hidden"
      >
        <div className="pixel-titlebar">
          <span className="font-pixel text-[9px] text-[var(--fg-primary)]">
            ARSIP_DOKUMENTASI.LNK
          </span>
          <span className="font-silk text-[10px] font-bold text-[var(--fg-muted)]">
            INSTAGRAM RESMI
          </span>
        </div>
        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-pixel text-sm sm:text-base text-[var(--fg-primary)] leading-relaxed mb-2">
              Foto &amp; Dokumentasi Kegiatan Kelas
            </h2>
            <p className="font-sans text-sm text-[var(--fg-secondary)] leading-relaxed">
              Seluruh dokumentasi asli kegiatan, momen di sekolah, dan arsip
              foto bersama kelas {CLASS_INFO.name} tersimpan di akun Instagram
              resmi kelas kami.
            </p>
          </div>
          <motion.a
            href={CLASS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ y: 2 }}
            transition={snappySpring}
            className="pixel-btn pixel-btn-primary shrink-0"
          >
            <Instagram className="w-3.5 h-3.5 mr-2 shrink-0" />
            <span>@{CLASS_INFO.instagramHandle}</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
