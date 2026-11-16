"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { galleryData, GalleryItem } from "@/data/gallery";
import { X, Camera, Eye } from "lucide-react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { PixelCard } from "@/components/ui/PixelCard";

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
      const cards = galleryRef.current?.querySelectorAll(".gallery-card-item");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.03,
          ease: "steps(4)",
        }
      );
    },
    { scope: galleryRef, dependencies: [activeCategory] }
  );

  return (
    <section id="galeri" ref={galleryRef} className="py-20 px-3 sm:px-6 max-w-7xl mx-auto relative select-none">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 pixel-box bg-slate-900 text-[#FBBF24] font-pixel text-[10px] mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>DOKUMENTASI</span>
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-slate-900 dark:text-white mb-3">
          Galeri Kenangan
        </h2>
        <p className="font-silk text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-bold uppercase">
          Dokumentasi momen kegiatan siswa XII PPLG 3 di SMK Negeri 1 Beringin
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-silk text-xs px-3.5 py-2 pixel-box transition-all cursor-pointer font-bold ${
                isActive
                  ? "bg-[#FBBF24] text-slate-950 border-amber-500 shadow-[4px_4px_0px_0px_#F59E0B]"
                  : "bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-200 hover:border-amber-400"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Photo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredPhotos.map((item) => (
          <div key={item.id} className="gallery-card-item">
            <PixelCard
              onClick={() => setSelectedPhoto(item)}
              className="flex flex-col justify-between h-full"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 border-2 border-slate-900 dark:border-slate-700 mb-3 pixel-corners-sm">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="font-silk text-xs text-[#FBBF24] font-bold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Ukuran Penuh</span>
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-silk font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1 truncate">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-slate-700 dark:text-slate-200 line-clamp-1 font-medium">
                  {item.caption}
                </p>
              </div>
            </PixelCard>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="pixel-box p-4 sm:p-6 max-w-xl w-full relative z-10 border-4 border-slate-950"
          >
            {/* 4 Corner 8-Bit Pixel Blocks */}
            <span className="absolute top-1 left-1 w-2 h-2 bg-amber-400 pointer-events-none z-20" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 pointer-events-none z-20" />
            <span className="absolute bottom-1 left-1 w-2 h-2 bg-amber-400 pointer-events-none z-20" />
            <span className="absolute bottom-1 right-1 w-2 h-2 bg-amber-400 pointer-events-none z-20" />

            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 w-7 h-7 bg-slate-200 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-800 dark:text-slate-200 flex items-center justify-center cursor-pointer border-2 border-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 mb-3.5 border-3 border-slate-900 dark:border-slate-700 shadow-md">
              <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#FBBF24] z-20 pointer-events-none" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#FBBF24] z-20 pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#FBBF24] z-20 pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#FBBF24] z-20 pointer-events-none" />
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            <div>
              <h3 className="font-pixel text-xs sm:text-sm text-slate-900 dark:text-white mb-1.5 leading-snug">
                {selectedPhoto.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
