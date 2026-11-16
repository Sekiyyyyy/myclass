"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { galleryData, GalleryItem } from "@/data/gallery";
import { X, Camera, Eye, Sparkles } from "lucide-react";
import { useGSAP, gsap } from "@/lib/gsap-config";

const categories = [
  { id: "all", label: "Semua Foto" },
  { id: "lab", label: "Lab Komputer" },
  { id: "kegiatan", label: "Kegiatan" },
  { id: "candid", label: "Candid" },
  { id: "lapangan", label: "Luar Sekolah" },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  useGSAP(
    () => {
      const cards = galleryRef.current?.querySelectorAll(".gallery-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    },
    { scope: galleryRef, dependencies: [activeCategory] }
  );

  return (
    <section id="galeri" ref={galleryRef} className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold text-xs border border-indigo-200 dark:border-indigo-800/60 mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Dokumentasi Kegiatan</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-slate-900 dark:text-white mb-3">
          Galeri Kenangan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Momen-momen tak terlupakan selama belajar, bercanda, dan berproses di SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                  : "glass-card text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Clean Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPhotos.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="gallery-card glass-card glass-card-interactive p-3 flex flex-col group cursor-pointer"
          >
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-3 border border-slate-200/80 dark:border-slate-800">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                <span className="inline-flex items-center gap-1.5 text-xs text-white font-medium">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Ukuran Penuh</span>
                </span>
              </div>
            </div>

            <div className="px-1 pb-1">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Clean Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-5 sm:p-7 max-w-2xl w-full relative shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 bg-white/95 dark:bg-slate-900/95"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 mb-4 border border-slate-200 dark:border-slate-800 shadow-md">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 dark:text-white mb-1.5">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
