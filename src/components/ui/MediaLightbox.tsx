"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Film, ImageIcon } from "lucide-react";
import type { MemoryItem } from "@/data/memories";
import { modalSpring, pixelEase } from "@/lib/motion-presets";
import { pauseScroll, resumeScroll } from "@/lib/scroll";

interface MediaLightboxProps {
  items: MemoryItem[];
  selectedIndex: number;
  direction: number;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 32 : -32,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.22, ease: pixelEase },
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -32 : 32,
    opacity: 0,
    transition: { duration: 0.16, ease: pixelEase },
  }),
};

export function MediaLightbox({
  items,
  selectedIndex,
  direction,
  onClose,
  onNavigate,
}: MediaLightboxProps) {
  const item =
    selectedIndex >= 0 && selectedIndex < items.length
      ? items[selectedIndex]
      : null;

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    pauseScroll();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      resumeScroll();
    };
  }, [item, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau ${item.label}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#07060D]/90"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={modalSpring}
            onClick={(e) => e.stopPropagation()}
            className="pixel-box max-w-3xl w-full max-h-[92dvh] flex flex-col overflow-hidden"
          >
            {/* Retro Window Titlebar */}
            <div className="pixel-titlebar shrink-0">
              <div className="inline-flex items-center gap-2 font-pixel text-[8px] sm:text-[9px] text-[var(--fg-primary)]">
                {item.type === "video" ? (
                  <Film className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
                ) : (
                  <ImageIcon className="w-3.5 h-3.5 text-[var(--accent-indigo)] dark:text-[#FACC15]" />
                )}
                <span>
                  {item.label}
                  {item.duration ? ` • ${item.duration}` : ""}
                </span>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Tutup tampilan penuh"
                className="w-6 h-6 bg-[var(--bg-surface)] hover:bg-[var(--accent-crimson)] hover:text-white text-[var(--fg-primary)] flex items-center justify-center border-2 border-[var(--border-hard)] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Media Viewport */}
            <div className="relative bg-[#0D0C18] flex items-center justify-center overflow-hidden p-2 sm:p-4 min-h-[260px] flex-1">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={item.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex items-center justify-center"
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      autoPlay
                      muted
                      playsInline
                      className="max-h-[68dvh] max-w-full w-auto border-2 border-[#3D375E] bg-black"
                    />
                  ) : (
                    <div className="relative flex items-center justify-center w-full">
                      <Image
                        src={item.src}
                        alt={item.label}
                        width={item.width}
                        height={item.height}
                        priority
                        className="max-h-[68dvh] w-auto h-auto object-contain border-2 border-[#3D375E]"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Controls */}
            <div className="px-3 sm:px-5 py-3 border-t-2 border-[var(--border-soft)] bg-[var(--bg-surface)] flex items-center justify-between gap-2 shrink-0">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(-1)}
                className="pixel-btn pixel-btn-secondary !py-2 !px-2.5 sm:!px-3 !m-0 !text-[8px] sm:!text-[9px]"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-0.5 sm:mr-1 shrink-0" />
                <span className="hidden min-[380px]:inline">SEBELUM</span>
                <span className="min-[380px]:hidden">PREV</span>
              </motion.button>

              <span className="font-silk text-[11px] font-bold text-[var(--fg-muted)] whitespace-nowrap">
                {selectedIndex + 1} / {items.length}
              </span>

              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(1)}
                className="pixel-btn pixel-btn-accent !py-2 !px-2.5 sm:!px-3 !m-0 !text-[8px] sm:!text-[9px]"
              >
                <span className="hidden min-[380px]:inline">LANJUT</span>
                <span className="min-[380px]:hidden">NEXT</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5 sm:ml-1 shrink-0" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
