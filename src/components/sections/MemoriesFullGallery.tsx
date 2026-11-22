"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Play, Film, ImageIcon } from "lucide-react";
import { memories } from "@/data/memories";
import { CLASS_INFO } from "@/data/students";
import { MediaLightbox } from "@/components/ui/MediaLightbox";
import { snappySpring, pixelEase } from "@/lib/motion-presets";

type MediaFilter = "all" | "image" | "video";

export function MemoriesFullGallery() {
  const [filter, setFilter] = useState<MediaFilter>("all");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [direction, setDirection] = useState(1);

  const imageCount = memories.filter((m) => m.type === "image").length;
  const videoCount = memories.filter((m) => m.type === "video").length;

  const filteredItems = useMemo(() => {
    if (filter === "all") return memories;
    return memories.filter((m) => m.type === filter);
  }, [filter]);

  const handleNavigate = useCallback(
    (delta: number) => {
      if (filteredItems.length === 0) return;
      setDirection(delta);
      setSelectedIndex(
        (prev) => (prev + delta + filteredItems.length) % filteredItems.length
      );
    },
    [filteredItems.length]
  );

  return (
    <section className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto select-none">
      {/* Top Back Navigation */}
      <div className="mb-6">
        <Link
          href="/#kenangan"
          className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-[var(--border-hard)] bg-[var(--bg-surface)] hover:bg-[var(--bg-inset)] text-[var(--fg-primary)] font-silk text-xs font-bold shadow-[2px_2px_0px_var(--shadow-hard)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Header + Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: pixelEase }}
        className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b-2 border-[var(--border-soft)] pb-6"
      >
        <div>
          <p className="font-pixel text-[9px] sm:text-[10px] text-[var(--accent-indigo)] dark:text-[#FACC15] tracking-widest uppercase mb-2">
            ALBUM KENANGAN // {CLASS_INFO.name}
          </p>
          <h1 className="font-pixel text-xl sm:text-3xl text-[var(--fg-primary)] leading-snug pixel-title-shadow mb-2">
            Semua Foto &amp; Video
          </h1>
          <p className="font-silk text-xs text-[var(--fg-muted)] font-bold">
            Total {imageCount} foto dan {videoCount} video kebersamaan{" "}
            {CLASS_INFO.name} {CLASS_INFO.school}
          </p>
        </div>

        {/* Filter Tabs with Shared Motion Pill */}
        <div className="flex flex-wrap items-center gap-2 font-silk text-[11px] font-bold">
          {(
            [
              { id: "all", label: `Semua (${memories.length})` },
              { id: "image", label: `Foto (${imageCount})` },
              { id: "video", label: `Video (${videoCount})` },
            ] as const
          ).map((tab) => {
            const isActive = filter === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                whileTap={{ scale: 0.96, y: 1 }}
                transition={snappySpring}
                onClick={() => {
                  setFilter(tab.id);
                  setSelectedIndex(-1);
                }}
                className={`relative px-3.5 py-2 border-2 border-[var(--border-hard)] bg-[var(--bg-surface)] shadow-[2px_2px_0px_var(--shadow-hard)] whitespace-nowrap cursor-pointer overflow-hidden ${
                  isActive
                    ? "text-white dark:text-[#181624]"
                    : "text-[var(--fg-secondary)] hover:bg-[var(--bg-inset)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    transition={snappySpring}
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#5B46C8] dark:bg-[#FACC15] z-0"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Adaptive Natural-Aspect Masonry Grid (Preserves both 9:16 Portrait & 4:3 Landscape Photos Without Face Cropping!) */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 px-0.5">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.button
              key={item.id}
              layout
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={snappySpring}
              onClick={() => {
                setDirection(1);
                setSelectedIndex(idx);
              }}
              className="break-inside-avoid mb-3 sm:mb-4 w-full student-card-box group p-2 text-left cursor-pointer block overflow-hidden"
            >
              <div className="relative w-full overflow-hidden pixel-frame-portrait p-[2px]">
                <div className="relative w-full overflow-hidden bg-[#181624]">
                  <Image
                    src={item.type === "video" ? item.poster || item.src : item.src}
                    alt={`Kenangan ${item.label}`}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 24vw"
                    className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
                      <div className="w-12 h-12 bg-[#FACC15] text-[#181624] border-2 border-[#181624] shadow-[3px_3px_0px_#181624] flex items-center justify-center">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Type & Index Tag */}
                <div
                  className={`absolute top-1.5 left-1.5 z-10 inline-flex items-center gap-1 px-1.5 py-0.5 font-pixel text-[7px] sm:text-[8px] border ${
                    item.type === "video"
                      ? "bg-[var(--accent-crimson)] text-white border-[#181624]"
                      : "bg-[#181624] text-[#F4F1FA] border-[#4C4672]"
                  }`}
                >
                  {item.type === "video" ? (
                    <Film className="w-2.5 h-2.5" />
                  ) : (
                    <ImageIcon className="w-2.5 h-2.5" />
                  )}
                  <span>
                    {item.label}
                    {item.duration ? ` • ${item.duration}` : ""}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Shared Lightbox (Supports Fullscreen Image & Native Video Playback) */}
      <MediaLightbox
        items={filteredItems}
        selectedIndex={selectedIndex}
        direction={direction}
        onClose={() => setSelectedIndex(-1)}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
