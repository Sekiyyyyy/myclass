"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, Instagram, X, Heart, ExternalLink, Sparkles, UserCheck } from "lucide-react";
import { students, Student } from "@/data/students";
import { useGSAP, gsap } from "@/lib/gsap-config";
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
      particleCount: 25,
      spread: 45,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#6366F1", "#EC4899", "#38BDF8"],
    });
  };

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".student-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.02,
          ease: "power2.out",
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
    <section id="siswa" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold text-xs border border-indigo-200 dark:border-indigo-800/60 mb-3">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Daftar Anggota Kelas</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-slate-900 dark:text-white mb-3">
          31 Siswa XII PPLG 3
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Temukan dan kenali profil lengkap setiap teman sekelas kita angkatan 2026.
        </p>
      </div>

      {/* Clean Modern Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau username Instagram..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Clean Grid Showcase */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
        {filteredStudents.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelectedStudent(s)}
            className="student-card glass-card glass-card-interactive p-3 sm:p-3.5 flex flex-col group cursor-pointer"
          >
            {/* Student Photo */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
              <Image
                src={s.avatar}
                alt={s.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Number Badge */}
              <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-slate-900/80 text-white font-mono font-bold text-[10px] backdrop-blur-xs">
                #{s.id}
              </div>

              {/* Like Heart Button */}
              <button
                type="button"
                onClick={(e) => handleLike(e, s.id)}
                title="Beri Apresiasi"
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-lg bg-white/90 dark:bg-slate-900/90 text-rose-500 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center shadow-xs backdrop-blur-xs transition-transform active:scale-90"
              >
                <Heart className={`w-3.5 h-3.5 ${likes[s.id] ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>

              {likes[s.id] ? (
                <div className="absolute bottom-2 right-2 z-10 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-semibold flex items-center gap-0.5">
                  <Heart className="w-2.5 h-2.5 fill-current" />
                  <span>{likes[s.id]}</span>
                </div>
              ) : null}
            </div>

            {/* Student Info */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-1 mb-1">
                  {s.name}
                </h3>
                <a
                  href={`https://instagram.com/${s.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline mb-2.5 truncate max-w-full font-medium"
                >
                  <Instagram className="w-3 h-3 shrink-0" />
                  <span className="truncate">@{s.ig}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">{s.nickname}</span>
                <span className="group-hover:translate-x-0.5 transition-transform text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                  Lihat &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-16 glass-card max-w-md mx-auto p-8">
          <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-base text-slate-800 dark:text-white mb-1">
            Tidak Ditemukan
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Tidak ada siswa dengan nama atau akun &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="btn-secondary text-xs px-4 py-2"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Clean Student Detail Modal */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedStudent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-6 sm:p-8 max-w-md w-full relative z-10 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 bg-white/95 dark:bg-slate-900/95"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Student Photo & Profile Details */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-2xl overflow-hidden mb-4 shadow-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                <Image
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white font-mono font-bold text-xs backdrop-blur-xs">
                  Absen #{selectedStudent.id}
                </div>
              </div>

              {/* Name & Identity */}
              <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white tracking-tight mb-1">
                {selectedStudent.name}
              </h3>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                Panggilan: {selectedStudent.nickname}
              </p>

              {/* Class & School Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs">
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700">
                  XII PPLG 3
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-200 dark:border-indigo-800/60">
                  SMK Negeri 1 Beringin
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-medium border border-sky-200 dark:border-sky-800/60">
                  Angkatan 2026
                </span>
              </div>

              {/* Instagram Action Button */}
              <div className="flex items-center gap-3 w-full">
                <a
                  href={`https://instagram.com/${selectedStudent.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Kunjungi Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={(e) => handleLike(e, selectedStudent.id)}
                  className="btn-secondary px-4 py-3 text-xs sm:text-sm flex items-center justify-center gap-1.5"
                  title="Beri Suka"
                >
                  <Heart className={`w-4 h-4 text-rose-500 ${likes[selectedStudent.id] ? "fill-rose-500" : ""}`} />
                  <span>{likes[selectedStudent.id] || "Suka"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
