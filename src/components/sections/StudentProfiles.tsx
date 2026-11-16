"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, Instagram, X, Heart, Sparkles, User, Award } from "lucide-react";
import { students, Student } from "@/data/students";
import { useGSAP, gsap } from "@/lib/gsap-config";
import confetti from "canvas-confetti";

export function StudentProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
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

  const fireStudentConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#58CC02", "#1CB0F6", "#FFC800", "#FF4B4B", "#CE82FF"],
    });
  };

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".student-clay-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.03,
          ease: "back.out(1.6)",
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

  // Close modal on Escape key & lock scroll when open
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
    <section id="siswa" ref={sectionRef} className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-heading font-extrabold text-xs border border-emerald-200 border-b-2 border-b-emerald-300 shadow-xs mb-3">
          👥 Anggota Kelas
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight mb-2">
          31 Siswa XII PPLG 3
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Keluarga besar siswa kelas XII PPLG 3 SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Clay Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama teman atau akun Instagram..."
            className="w-full pl-11 pr-10 py-3.5 rounded-full bg-white text-slate-800 placeholder:text-slate-400 font-heading font-bold text-xs sm:text-sm border-2 border-slate-200 border-b-[4px] border-b-slate-300 shadow-lg shadow-slate-200/50 focus:outline-none focus:border-[#1CB0F6] focus:border-b-[#1899D6] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs flex items-center justify-center font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 31 Students Claymorphism Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {filteredStudents.map((s) => (
          <div
            key={s.id}
            className="student-clay-card clay-card p-3 sm:p-4 flex flex-col justify-between group cursor-pointer"
            onClick={() => {
              setSelectedStudent(s);
              fireStudentConfetti();
            }}
          >
            {/* Photo Container */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden mb-3 bg-slate-100 border-2 border-slate-100/90 shadow-inner">
              <Image
                src={s.avatar}
                alt={s.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />

              {/* 3D Clay Student Number Badge */}
              <div className="absolute top-2 left-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-800 font-heading font-black text-xs flex items-center justify-center border-2 border-slate-100 border-b-[3px] border-b-slate-300 shadow-md">
                {s.id}
              </div>

              {/* Gradient Bottom Shimmer on Photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-heading font-black text-xs sm:text-sm text-slate-900 group-hover:text-[#58CC02] transition-colors leading-snug line-clamp-1 mb-1">
                  {s.name}
                </h3>
                <a
                  href={`https://instagram.com/${s.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[11px] font-heading font-extrabold text-sky-600 hover:text-sky-700 hover:underline mb-3 truncate max-w-full"
                >
                  <Instagram className="w-3 h-3 shrink-0" />
                  <span className="truncate">@{s.ig}</span>
                </a>
              </div>

              {/* Tactile 3D Duolingo Button */}
              <button
                type="button"
                className="clay-btn clay-btn-green w-full py-2 text-xs flex items-center justify-center gap-1"
              >
                <span>Lihat Detail</span>
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-16 clay-card max-w-md mx-auto p-8">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-heading font-black text-lg text-slate-800 mb-1">
            Siswa Tidak Ditemukan
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Tidak ada siswa dengan nama atau akun &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="clay-btn clay-btn-white px-5 py-2 text-xs"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Claymorphic Student Detail Modal */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedStudent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="clay-card p-6 sm:p-8 max-w-md w-full relative z-10 border-b-[8px] border-b-slate-300 animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:translate-y-0.5 border-b-2 border-slate-300 font-heading font-black text-sm flex items-center justify-center text-slate-600 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Centered Photo */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-2xl overflow-hidden mb-4 border-2 border-slate-100 border-b-[4px] border-b-slate-200 shadow-lg bg-slate-100">
                <Image
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 font-heading font-black text-xs text-slate-800 border border-slate-200 border-b-2 border-b-slate-300 shadow-sm">
                  #{selectedStudent.id}
                </div>
              </div>

              {/* Student Identity */}
              <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 tracking-tight mb-1">
                {selectedStudent.name}
              </h3>
              <p className="text-xs font-heading font-bold text-slate-500 mb-4">
                Nama Panggilan: <span className="text-slate-800 font-extrabold">{selectedStudent.nickname}</span>
              </p>

              {/* Info Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-heading font-bold text-xs border border-emerald-200 border-b-2 border-b-emerald-300">
                  <Award className="w-3.5 h-3.5 text-[#58CC02]" />
                  <span>XII PPLG 3</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 font-heading font-bold text-xs border border-sky-200 border-b-2 border-b-sky-300">
                  <User className="w-3.5 h-3.5 text-[#1CB0F6]" />
                  <span>SMKN 1 Beringin</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full">
                <a
                  href={`https://instagram.com/${selectedStudent.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn clay-btn-blue flex-1 py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>

                <button
                  onClick={fireStudentConfetti}
                  className="clay-btn clay-btn-amber px-4 py-3 text-xs sm:text-sm flex items-center justify-center gap-1.5"
                  title="Kirim Semangat!"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Beri Semangat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
