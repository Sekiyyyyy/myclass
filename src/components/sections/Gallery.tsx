"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { galleryData, GalleryItem } from "@/data/gallery";
import { ArrowUpRight, X, Sparkles } from "lucide-react";
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
      if (window.innerWidth < 768) return;

      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: -30,
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
          y: -35,
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 font-heading font-extrabold text-xs border border-sky-200 border-b-2 border-b-sky-300 shadow-xs mb-3">
          📸 Momen Seru
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight mb-2">
          Galeri Kenangan
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Momen nyata kebersamaan di Lab Komputer dan lingkungan SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Filter Tabs (3D Clay Pills) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`clay-btn px-4 py-2 text-xs font-heading font-extrabold transition-all ${
                isActive
                  ? "clay-btn-green"
                  : "clay-btn-white"
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
            <PhotoCard key={item.id} item={item} onSelect={() => setSelectedPhoto(item)} />
          ))}
        </div>

        <div ref={col2Ref} className="flex flex-col gap-6">
          {col2.map((item) => (
            <PhotoCard key={item.id} item={item} onSelect={() => setSelectedPhoto(item)} />
          ))}
        </div>

        <div ref={col3Ref} className="flex flex-col gap-6">
          {col3.map((item) => (
            <PhotoCard key={item.id} item={item} onSelect={() => setSelectedPhoto(item)} />
          ))}
        </div>
      </div>

      {/* Clay Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="clay-card p-5 sm:p-7 max-w-2xl w-full relative border-b-[8px] border-b-slate-300 animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:translate-y-0.5 border-b-2 border-slate-300 font-heading font-black text-slate-700 flex items-center justify-center text-xs transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 border-2 border-slate-100 shadow-md">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="font-heading font-black text-xl text-slate-900">
                {selectedPhoto.title}
              </h3>
              <span className="text-xs font-heading font-extrabold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 border-b-2 border-b-amber-300">
                {selectedPhoto.date}
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
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
      className="clay-card p-3 sm:p-4 rounded-3xl overflow-hidden cursor-pointer flex flex-col group transition-all"
    >
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner mb-3">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <span className="absolute bottom-2.5 right-2.5 text-[10px] font-heading font-extrabold px-2.5 py-0.5 rounded-full bg-white/95 text-slate-800 border border-slate-200 shadow-xs">
          {item.date}
        </span>

        <div className="absolute bottom-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-white text-xs font-heading font-black px-2.5 py-0.5 rounded-full bg-[#58CC02] border-b-2 border-[#46A302]">
          <span>Perbesar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="px-1 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading font-black text-base text-slate-900 mb-1 group-hover:text-[#58CC02] transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
