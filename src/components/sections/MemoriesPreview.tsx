"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Play, ArrowRight, Images, Eye } from "lucide-react";
import { memories, featuredMemories } from "@/data/memories";
import { MediaLightbox } from "@/components/ui/MediaLightbox";
import { pixelEase, snappySpring, viewportOnce } from "@/lib/motion-presets";

export function MemoriesPreview() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [direction, setDirection] = useState(1);

  const heroPhoto = featuredMemories[0]; // mem-12 (landscape group + wali kelas)
  const featuredVideo = featuredMemories[1]; // vid-01 (portrait beach video)
  const subPhotos = featuredMemories.slice(2, 6); // 4 diverse highlight shots

  const openItemById = (id: string) => {
    const idx = memories.findIndex((m) => m.id === id);
    if (idx >= 0) {
      setDirection(1);
      setSelectedIndex(idx);
    }
  };

  const handleNavigate = useCallback((delta: number) => {
    setDirection(delta);
    setSelectedIndex((prev) => (prev + delta + memories.length) % memories.length);
  }, []);

  return (
    <section
      id="kenangan"
      className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative select-none"
    >
      {/* Split Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.34, ease: pixelEase }}
        className="mb-7 sm:mb-9 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[var(--border-soft)] pb-5"
      >
        <div>
          <p className="font-pixel text-[9px] sm:text-[10px] text-[var(--accent-indigo)] dark:text-[#FACC15] tracking-widest uppercase mb-2">
            03 // KENANGAN KELAS
          </p>
          <h2 className="font-pixel text-lg sm:text-2xl md:text-3xl text-[var(--fg-primary)] leading-snug pixel-title-shadow mb-2">
            Momen Kebersamaan
          </h2>
          <p className="font-silk text-[11px] sm:text-xs text-[var(--fg-muted)] font-bold">
            Cuplikan 18 foto &amp; 1 video kenangan asli XII PPLG 3
          </p>
        </div>

        <Link
          href="/galeri"
          className="pixel-btn pixel-btn-accent !m-0 !text-[8px] sm:!text-[9px] self-start sm:self-auto shrink-0"
        >
          <Images className="w-3.5 h-3.5 mr-2 shrink-0" />
          <span>SELENGKAPNYA ({memories.length})</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
        </Link>
      </motion.div>

      {/* Top Feature Row: Iconic Class Photo + Featured Video */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 mb-3.5 sm:mb-5 px-0.5">
        {/* Featured Group Photo (8 Cols) */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.99 }}
          viewport={viewportOnce}
          transition={snappySpring}
          onClick={() => openItemById(heroPhoto.id)}
          className="md:col-span-8 student-card-box group p-2 sm:p-2.5 text-left cursor-pointer overflow-hidden"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden pixel-frame-portrait p-[2px]">
            <div className="relative w-full h-full overflow-hidden bg-[#181624]">
              <Image
                src={heroPhoto.src}
                alt="Foto bersama kelas XII PPLG 3"
                fill
                sizes="(max-width: 768px) 96vw, 64vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
              />
            </div>

            <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[#181624] text-[#F4F1FA] font-pixel text-[8px] border border-[#4C4672]">
              {heroPhoto.label}
            </div>

            <div className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#181624]/90 text-[#FACC15] font-pixel text-[8px] border border-[#4C4672] opacity-90 group-hover:opacity-100">
              <Eye className="w-3 h-3" />
              <span>LIHAT</span>
            </div>
          </div>
        </motion.button>

        {/* Featured Video Card (4 Cols) */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.99 }}
          viewport={viewportOnce}
          transition={snappySpring}
          onClick={() => openItemById(featuredVideo.id)}
          className="md:col-span-4 student-card-box group p-2 sm:p-2.5 text-left cursor-pointer overflow-hidden flex flex-col"
        >
          <div className="relative aspect-[4/3] md:aspect-auto md:flex-1 w-full overflow-hidden pixel-frame-portrait p-[2px]">
            <div className="relative w-full h-full min-h-[220px] overflow-hidden bg-[#181624]">
              <Image
                src={featuredVideo.poster || featuredVideo.src}
                alt="Video kenangan kelas XII PPLG 3"
                fill
                sizes="(max-width: 768px) 96vw, 32vw"
                className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-300 ease-out brightness-90"
              />

              {/* Crisp Pixel Play Button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
                <div className="w-14 h-14 bg-[#FACC15] text-[#181624] border-3 border-[#181624] shadow-[4px_4px_0px_#181624] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[var(--accent-crimson)] text-white font-pixel text-[8px] border border-[#181624]">
              VIDEO &bull; {featuredVideo.duration}
            </div>

            <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 bg-[#181624]/90 text-[#F4F1FA] font-pixel text-[8px] border border-[#4C4672]">
              PUTAR
            </div>
          </div>
        </motion.button>
      </div>

      {/* Bottom Row: 4 Highlight Photos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 px-0.5">
        {subPhotos.map((item, idx) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            viewport={viewportOnce}
            transition={{ ...snappySpring, delay: idx * 0.04 }}
            onClick={() => openItemById(item.id)}
            className="student-card-box group p-2 text-left cursor-pointer overflow-hidden"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden pixel-frame-portrait p-[2px]">
              <div className="relative w-full h-full overflow-hidden bg-[#181624]">
                <Image
                  src={item.src}
                  alt={`Kenangan kelas ${item.label}`}
                  fill
                  sizes="(max-width: 768px) 46vw, 24vw"
                  className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-300 ease-out"
                />
              </div>
              <div className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 bg-[#181624] text-[#F4F1FA] font-pixel text-[7px] sm:text-[8px] border border-[#4C4672]">
                {item.label}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom Full-Album Callout Bar */}
      <div className="mt-7 sm:mt-8 flex justify-center">
        <Link
          href="/galeri"
          className="pixel-btn pixel-btn-primary !text-[9px] sm:!text-[10px] w-full sm:w-auto"
        >
          <Images className="w-3.5 h-3.5 mr-2 shrink-0" />
          <span>LIHAT SEMUA {memories.length} FOTO &amp; VIDEO</span>
          <ArrowRight className="w-3.5 h-3.5 ml-2 shrink-0" />
        </Link>
      </div>

      {/* Interactive Lightbox (Navigates across ALL 19 real items!) */}
      <MediaLightbox
        items={memories}
        selectedIndex={selectedIndex}
        direction={direction}
        onClose={() => setSelectedIndex(-1)}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
