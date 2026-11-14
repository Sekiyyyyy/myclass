"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { galleryData, GalleryItem } from "@/data/gallery";
import { ArrowUpRight, X } from "lucide-react";
import { useGSAP, gsap } from "@/lib/gsap-config";

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

  // Split photos evenly into 3 columns
  const col1 = filteredPhotos.filter((_, i) => i % 3 === 0);
  const col2 = filteredPhotos.filter((_, i) => i % 3 === 1);
  const col3 = filteredPhotos.filter((_, i) => i % 3 === 2);

  useGSAP(
    () => {
      // Parallax scroll on desktop with gentle natural speeds (no sinking center column)
      if (window.innerWidth < 768) return;

      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: -40,
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
          y: -15, // Gentle glide, stays anchored in center view
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
          y: -50,
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
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-2">
          Dokumentasi
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mb-2">
          Galeri Kenangan
        </h2>
        <p className="text-sm text-stone-600">
          Momen nyata kebersamaan di Lab RPL dan lingkungan SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-stone-100/90 border border-stone-200/80">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Parallax Photo Grid (Harmonious natural depth) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-12 items-start">
        {/* Column 1 */}
        <div ref={col1Ref} className="flex flex-col gap-6">
          {col1.map((item) => (
            <PhotoCard key={item.id} item={item} onSelect={() => setSelectedPhoto(item)} />
          ))}
        </div>

        {/* Column 2 */}
        <div ref={col2Ref} className="flex flex-col gap-6">
          {col2.map((item) => (
            <PhotoCard key={item.id} item={item} onSelect={() => setSelectedPhoto(item)} />
          ))}
        </div>

        {/* Column 3 */}
        <div ref={col3Ref} className="flex flex-col gap-6">
          {col3.map((item) => (
            <PhotoCard key={item.id} item={item} onSelect={() => setSelectedPhoto(item)} />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-2xl w-full relative shadow-2xl border border-stone-200/90 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center text-xs transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-100 mb-4 border border-stone-200/80 shadow-sm">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="font-bold text-xl text-stone-900">
                {selectedPhoto.title}
              </h3>
              <span className="text-xs font-mono font-medium text-stone-500">
                {selectedPhoto.date}
              </span>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
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
      className="group glass-card rounded-3xl overflow-hidden cursor-pointer flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <span className="absolute bottom-3 right-3 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
          {item.date}
        </span>

        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-white text-xs font-semibold">
          <span>Perbesar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
