"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, Instagram, X, Heart, ExternalLink, Users } from "lucide-react";
import { students, Student } from "@/data/students";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { PixelCard } from "@/components/ui/PixelCard";
import confetti from "canvas-confetti";

export function StudentProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [likes, setLikes] = useState<{ [id: string]: number }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.nickname.toLowerCase().includes(q) ||
        s.ig.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    confetti({
      particleCount: 20,
      spread: 40,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#FBBF24", "#F59E0B", "#FCD34D"],
      shapes: ["square"],
    });
  };

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".student-card-item");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.02,
          ease: "steps(4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [filteredStudents] }
  );

  useEffect(() => {
    if (!selectedStudent) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStudent(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedStudent]);

  return (
    <section id="siswa" ref={sectionRef} className="py-20 px-3 sm:px-6 max-w-7xl mx-auto relative select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 pixel-box bg-slate-900 text-[#FBBF24] font-pixel text-[10px] mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>DAFTAR KELAS</span>
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-slate-900 dark:text-white mb-3">
          31 Siswa XII PPLG 3
        </h2>
        <p className="font-silk text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold uppercase">
          Klik kartu untuk melihat informasi profil lengkap siswa
        </p>
      </div>

      {/* Pixel Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau username Instagram..."
            className="w-full pl-10 pr-9 py-2.5 pixel-box bg-white dark:bg-[#111827] text-slate-900 dark:text-white placeholder:text-slate-400 font-silk text-xs focus:outline-none focus:border-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Student Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {filteredStudents.map((s) => (
          <div key={s.id} className="student-card-item">
            <PixelCard
              onClick={() => setSelectedStudent(s)}
              className="p-3 flex flex-col justify-between h-full"
            >
              <div>
                {/* Photo Frame with Sharp Pixel Border */}
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-2.5 bg-slate-950 border-2 border-slate-900 dark:border-slate-700">
                  <Image
                    src={s.avatar}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Absen Tag */}
                  <div className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 bg-slate-950/90 text-[#FBBF24] font-pixel text-[9px] border border-amber-500/50">
                    #{s.id}
                  </div>

                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={(e) => handleLike(e, s.id)}
                    title="Beri Suka"
                    className="absolute top-1.5 right-1.5 z-10 w-6 h-6 bg-slate-950/90 text-amber-400 hover:text-amber-300 flex items-center justify-center border border-amber-500/50 transition-transform active:scale-90"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likes[s.id] ? "fill-amber-400 text-amber-400" : ""}`} />
                  </button>

                  {likes[s.id] ? (
                    <div className="absolute bottom-1.5 right-1.5 z-10 px-1.5 py-0.5 bg-amber-500 text-slate-950 font-pixel text-[8px] font-bold">
                      +{likes[s.id]}
                    </div>
                  ) : null}
                </div>

                {/* Info */}
                <h3 className="font-silk font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate mb-0.5">
                  {s.name}
                </h3>
                <p className="font-pixel text-[9px] text-amber-500 mb-2 truncate">
                  {s.nickname}
                </p>
              </div>

              {/* Instagram & View */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] font-silk">
                <a
                  href={`https://instagram.com/${s.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-500 truncate max-w-[70%]"
                >
                  <Instagram className="w-3 h-3 shrink-0" />
                  <span className="truncate">@{s.ig}</span>
                </a>
                <span className="text-amber-500 font-bold group-hover:translate-x-0.5 transition-transform">
                  &gt;
                </span>
              </div>
            </PixelCard>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-16 pixel-box max-w-md mx-auto p-8">
          <Users className="w-8 h-8 text-amber-500 mx-auto mb-3" />
          <h3 className="font-pixel text-xs text-slate-800 dark:text-white mb-2">
            SISWA TIDAK DITEMUKAN
          </h3>
          <p className="font-silk text-xs text-slate-500 mb-4">
            Tidak ada siswa dengan nama &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="pixel-btn pixel-btn-primary text-[10px] py-2 px-3"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedStudent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="pixel-box p-5 sm:p-7 max-w-sm w-full relative z-10 bg-white dark:bg-[#111827] border-4 border-slate-900 dark:border-amber-500 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 w-7 h-7 bg-slate-200 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center cursor-pointer border-2 border-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Info */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-40 h-52 sm:w-44 sm:h-56 overflow-hidden mb-3.5 border-4 border-slate-900 dark:border-slate-700 bg-slate-950">
                <Image
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950 text-[#FBBF24] font-pixel text-[9px] border border-amber-500">
                  ABSEN #{selectedStudent.id}
                </div>
              </div>

              <h3 className="font-pixel text-sm sm:text-base text-slate-900 dark:text-white mb-1 leading-snug">
                {selectedStudent.name}
              </h3>
              <p className="font-silk text-xs text-amber-500 font-bold mb-4 uppercase">
                Panggilan: {selectedStudent.nickname}
              </p>

              {/* Class Info */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5 font-silk text-[10px]">
                <span className="px-2 py-0.5 pixel-box bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  XII PPLG 3
                </span>
                <span className="px-2 py-0.5 pixel-box bg-amber-500/20 text-amber-500">
                  SMKN 1 BERINGIN
                </span>
                <span className="px-2 py-0.5 pixel-box bg-sky-500/20 text-sky-500">
                  ANGKATAN 2026
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full">
                <a
                  href={`https://instagram.com/${selectedStudent.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn pixel-btn-primary flex-1 py-2 text-[9px] flex items-center justify-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={(e) => handleLike(e, selectedStudent.id)}
                  className="pixel-btn pixel-btn-secondary py-2 px-3 text-[9px] flex items-center justify-center gap-1"
                >
                  <Heart className={`w-3.5 h-3.5 text-amber-500 ${likes[selectedStudent.id] ? "fill-amber-500" : ""}`} />
                  <span>+{likes[selectedStudent.id] || 1}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
