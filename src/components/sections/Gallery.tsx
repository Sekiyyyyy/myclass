"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { galleryData, GalleryItem } from "@/data/gallery";
import { ArrowUpRight, X, Camera, Eye } from "lucide-react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { playBlip, playClick, playPowerUp } from "@/lib/sound";

const categories = [
  { id: "all", label: "Semua" },
  { id: "lab", label: "Lab Komputer" },
  { id: "kegiatan", label: "Kegiatan" },
  { id: "candid", label: "Candid" },
  { id: "lapangan", label: "Luar Sekolah" },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  const col1 = filteredPhotos.filter((_, i) => i % 3 === 0);
  const col2 = filteredPhotos.filter((_, i) => i % 3 === 1);
  const col3 = filteredPhotos.filter((_, i) => i % 3 === 2);

  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  useGSAP(
    () => {
      if (window.innerWidth < 768) return;

      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (col3Ref.current) {
        gsap.to(col3Ref.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      }
    },
    { scope: galleryRef, dependencies: [activeCategory] }
  );

  return (
    <section id="galeri" ref={galleryRef} className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs border border-cyan-500/25 mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>INTEL REEL // MISSION CAPTURES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Galeri Kenangan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
          Dokumentasi nyata kegiatan di lab dan lingkungan SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                playClick();
                setActiveCategory(cat.id);
              }}
              onMouseEnter={() => playBlip(680)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-cyan-500 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 3-Column Parallax Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-12 items-start">
        <div ref={col1Ref} className="flex flex-col gap-6">
          {col1.map((item) => (
            <PhotoCard
              key={item.id}
              item={item}
              onSelect={() => {
                playPowerUp();
                setSelectedPhoto(item);
              }}
            />
          ))}
        </div>

        <div ref={col2Ref} className="flex flex-col gap-6">
          {col2.map((item) => (
            <PhotoCard
              key={item.id}
              item={item}
              onSelect={() => {
                playPowerUp();
                setSelectedPhoto(item);
              }}
            />
          ))}
        </div>

        <div ref={col3Ref} className="flex flex-col gap-6">
          {col3.map((item) => (
            <PhotoCard
              key={item.id}
              item={item}
              onSelect={() => {
                playPowerUp();
                setSelectedPhoto(item);
              }}
            />
          ))}
        </div>
      </div>

      {/* Cyber Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => {
            playBlip(500);
            setSelectedPhoto(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="arcade-card hud-corner p-5 sm:p-7 max-w-2xl w-full relative border border-cyan-500/40 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => {
                playBlip(500);
                setSelectedPhoto(null);
              }}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-cyan-500 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-200 dark:border-slate-800 shadow-md">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                {selectedPhoto.title}
              </h3>
              <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs border border-cyan-500/30">
                {selectedPhoto.date}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function PhotoCard({ item, onSelect }: { item: GalleryItem; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => playBlip(750)}
      className="arcade-card arcade-card-interactive hud-corner p-3 sm:p-4 rounded-2xl overflow-hidden cursor-pointer flex flex-col group transition-all"
    >
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800 mb-3">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-xs">
          {item.date}
        </span>

        <div className="absolute bottom-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-white text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500 text-slate-950">
          <span>PERBESAR</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="px-1 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
