"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, Instagram, X, Heart, Sparkles, User, Award, Flame } from "lucide-react";
import { students, Student } from "@/data/students";
import { useGSAP, gsap } from "@/lib/gsap-config";
import confetti from "canvas-confetti";
import { playPop, playClick, playChime } from "@/lib/sound";

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
    playPop(700);
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    confetti({
      particleCount: 25,
      spread: 45,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#FF4B4B", "#FFC800", "#1CB0F6"],
    });
  };

  const handleCardClick = (student: Student) => {
    playChime();
    setSelectedStudent(student);
  };

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".student-clay-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.94 },
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
      {/* Header (No Emojis, Pure SVG Icons) */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="clay-pill-tag bg-emerald-50 text-emerald-800 border-2 border-emerald-200 mb-3">
          <Award className="w-3.5 h-3.5 text-[#58CC02]" />
          <span>Anggota Kelas Resmi</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight mb-2">
          31 Siswa XII PPLG 3
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
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
              onClick={() => {
                setSearchQuery("");
                playPop(450);
              }}
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
            onMouseEnter={() => playPop(600)}
            onClick={() => handleCardClick(s)}
            className="student-clay-card clay-card clay-card-interactive p-3.5 sm:p-4 flex flex-col justify-between group"
          >
            {/* Photo in Sunken Clay Frame */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden mb-3 bg-slate-100 border-2 border-slate-100 shadow-inner">
              <Image
                src={s.avatar}
                alt={s.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />

              {/* 3D Student Number Badge */}
              <div className="clay-coin absolute top-2 left-2 z-10 w-7 h-7 sm:w-8 sm:h-8 text-xs text-slate-800">
                {s.id}
              </div>

              {/* Interactive Like Button */}
              <button
                onClick={(e) => handleLike(e, s.id)}
                title="Beri Suka!"
                className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-rose-500 hover:bg-rose-50 flex items-center justify-center border border-slate-200 border-b-2 border-b-slate-300 shadow-sm transition-transform active:scale-90"
              >
                <Heart className={`w-3.5 h-3.5 ${likes[s.id] ? "fill-rose-500" : ""}`} />
              </button>

              {/* Like counter bubble if liked */}
              {likes[s.id] ? (
                <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-full bg-rose-500 text-white font-heading font-black text-[10px] shadow-sm flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 fill-current" />
                  <span>{likes[s.id]}</span>
                </div>
              ) : null}
            </div>

            {/* Student Info */}
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
                  className="inline-flex items-center gap-1 text-[11px] font-heading font-black text-sky-600 hover:text-sky-700 hover:underline mb-3 truncate max-w-full"
                >
                  <Instagram className="w-3 h-3 shrink-0" />
                  <span className="truncate">@{s.ig}</span>
                </a>
              </div>

              {/* Tactile 3D Duolingo Button */}
              <button
                type="button"
                className="clay-btn clay-btn-green w-full py-2 text-xs flex items-center justify-center gap-1 mt-auto"
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
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-black text-lg text-slate-800 mb-1">
            Siswa Tidak Ditemukan
          </h3>
          <p className="text-xs text-slate-500 mb-4 font-medium">
            Tidak ada siswa dengan nama atau akun &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              playClick();
            }}
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
          onClick={() => {
            playPop(400);
            setSelectedStudent(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="clay-card p-6 sm:p-8 max-w-md w-full relative z-10 border-b-[8px] border-b-slate-300 animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playPop(400);
                setSelectedStudent(null);
              }}
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
                <div className="clay-coin absolute top-2.5 left-2.5 px-2.5 py-1 text-xs text-slate-800">
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
                <div className="clay-pill-tag bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Award className="w-3.5 h-3.5 text-[#58CC02]" />
                  <span>XII PPLG 3</span>
                </div>
                <div className="clay-pill-tag bg-sky-50 text-sky-800 border border-sky-200">
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
                  onClick={() => playClick()}
                  className="clay-btn clay-btn-blue flex-1 py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>

                <button
                  onClick={(e) => handleLike(e, selectedStudent.id)}
                  className="clay-btn clay-btn-amber px-4 py-3 text-xs sm:text-sm flex items-center justify-center gap-1.5"
                  title="Kirim Semangat!"
                >
                  <Heart className="w-4 h-4 fill-current text-white" />
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
