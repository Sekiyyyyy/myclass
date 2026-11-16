"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, Instagram, X, Terminal, Shield, Zap, Sparkles, ExternalLink, Flame } from "lucide-react";
import { students, Student } from "@/data/students";
import { useGSAP, gsap } from "@/lib/gsap-config";
import confetti from "canvas-confetti";
import { playBlip, playClick, playPowerUp } from "@/lib/sound";

export function StudentProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [likedMap, setLikedMap] = useState<{ [id: string]: number }>({});
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
    playPowerUp();
    setLikedMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    confetti({
      particleCount: 30,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#00F0FF", "#A855F7", "#10B981"],
    });
  };

  const handleCardClick = (student: Student) => {
    playPowerUp();
    setSelectedStudent(student);
  };

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".roster-player-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.025,
          ease: "power3.out",
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
    <section id="siswa" ref={sectionRef} className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs border border-cyan-500/25 mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>ROSTER SELECT // 31 OPERATIVES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-slate-900 dark:text-white mb-2">
          31 Siswa XII PPLG 3
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
          Daftar anggota resmi angkatan 2026 SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Cyber Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa atau akun Instagram..."
            className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white/90 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder:text-slate-400 font-mono text-xs sm:text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                playBlip(500);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs flex items-center justify-center font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 31 Student Character Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {filteredStudents.map((s) => (
          <div
            key={s.id}
            onMouseEnter={() => playBlip(800)}
            onClick={() => handleCardClick(s)}
            className="roster-player-card arcade-card arcade-card-interactive hud-corner p-3 sm:p-4 flex flex-col justify-between group"
          >
            {/* Portrait Photo with Tech Border */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <Image
                src={s.avatar}
                alt={s.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Player Tag */}
              <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-slate-900/90 text-cyan-400 font-mono font-bold text-[10px] border border-cyan-500/40 backdrop-blur-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>P-{s.id}</span>
              </div>

              {/* Kudos Heart */}
              <button
                onClick={(e) => handleLike(e, s.id)}
                title="Beri Kudos / XP!"
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-lg bg-slate-900/80 text-rose-400 hover:text-rose-300 hover:bg-slate-900 flex items-center justify-center border border-slate-700/60 backdrop-blur-xs transition-transform active:scale-90"
              >
                <Flame className={`w-3.5 h-3.5 ${likedMap[s.id] ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>

              {likedMap[s.id] ? (
                <div className="absolute bottom-2 right-2 z-10 px-1.5 py-0.5 rounded bg-rose-500/90 text-white font-mono text-[9px] font-bold">
                  +{likedMap[s.id]} XP
                </div>
              ) : null}

              {/* Subtle Scanline Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors leading-snug line-clamp-1 mb-1">
                  {s.name}
                </h3>
                <a
                  href={`https://instagram.com/${s.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline mb-3 truncate max-w-full"
                >
                  <Instagram className="w-3 h-3 shrink-0" />
                  <span className="truncate">@{s.ig}</span>
                </a>
              </div>

              {/* Action Trigger */}
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 group-hover:bg-cyan-500 group-hover:text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all mt-auto"
              >
                <span>INSPECT</span>
                <Terminal className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-16 arcade-card max-w-md mx-auto p-8 hud-corner">
          <Terminal className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="font-heading font-black text-lg text-slate-800 dark:text-white mb-1">
            Data Tidak Ditemukan
          </h3>
          <p className="text-xs text-slate-500 font-mono mb-4">
            Operative dengan identifier &ldquo;{searchQuery}&rdquo; tidak ada dalam roster.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              playClick();
            }}
            className="arcade-btn arcade-btn-secondary px-5 py-2 text-xs"
          >
            Reset Query
          </button>
        </div>
      )}

      {/* High-Tech Character Dossier Modal */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => {
            playBlip(500);
            setSelectedStudent(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="arcade-card hud-corner p-6 sm:p-8 max-w-md w-full relative z-10 border border-cyan-500/40 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playBlip(500);
                setSelectedStudent(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-cyan-500 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Centered Photo & Dossier Details */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-xl overflow-hidden mb-4 border-2 border-cyan-500/50 shadow-lg bg-slate-950">
                <Image
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/90 text-cyan-400 font-mono font-bold text-xs border border-cyan-500/40">
                  PLAYER P-{selectedStudent.id}
                </div>
              </div>

              {/* Student Identity */}
              <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white tracking-tight mb-1">
                {selectedStudent.name}
              </h3>
              <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4">
                CALL-SIGN: <span className="font-bold text-slate-800 dark:text-slate-200">{selectedStudent.nickname}</span>
              </p>

              {/* Info Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6 font-mono text-xs">
                <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  XII PPLG 3
                </span>
                <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  SMKN 1 BERINGIN
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full">
                <a
                  href={`https://instagram.com/${selectedStudent.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="arcade-btn arcade-btn-primary flex-1 py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={(e) => handleLike(e, selectedStudent.id)}
                  className="arcade-btn arcade-btn-purple px-4 py-3 text-xs sm:text-sm flex items-center justify-center gap-1.5"
                  title="Kirim Kudos!"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Boost XP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
