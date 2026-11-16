"use client";

import { useState, useMemo, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";
import { Search, Instagram, X, Heart, ExternalLink, Users, Quote, Sparkles } from "lucide-react";
import { students, Student } from "@/data/students";
import { useGSAP, gsap } from "@/lib/gsap-config";
import confetti from "canvas-confetti";

interface StudentCardItemProps {
  student: Student;
  likesCount: number;
  onLike: (e: React.MouseEvent, id: string) => void;
  onSelect: (student: Student) => void;
}

function StudentCardItem({
  student,
  likesCount,
  onLike,
  onSelect,
}: StudentCardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTiltStyle({
      transform: `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 10px)`,
      transition: "transform 0.08s ease-out",
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(700px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)",
      transition: "transform 0.4s cubic-bezier(0.2, 0, 0, 1)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(student)}
      style={tiltStyle}
      className="student-card-item student-card-box group flex flex-col justify-between h-full p-2.5 sm:p-3 cursor-pointer overflow-hidden transform-gpu select-none"
    >
      {/* Holographic Sheen Overlay on Hover */}
      {isHovered && <div className="holo-sheen" />}

      <div className="relative z-10">
        {/* Photo Frame with Clean Neutral Slate Bezel (No Clashing Yellow around Red Photo) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden mb-3 bg-[#0A0E18] pixel-frame-neutral shadow-[2px_2px_0px_#000]">
          <Image
            src={student.avatar}
            alt={student.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* High-Contrast Obsidian Absen Tag (Harmonizes perfectly with crimson red background) */}
          <div className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 bg-[#080C14]/90 text-white font-pixel text-[9px] font-bold border border-slate-700/80 shadow-[1px_1px_0px_#000]">
            #{student.id}
          </div>

          {/* Ruby / Rose Heart Like Button */}
          <button
            type="button"
            onClick={(e) => onLike(e, student.id)}
            title="Beri Suka"
            className="absolute top-1.5 right-1.5 z-10 w-6 h-6 bg-[#080C14]/90 hover:bg-slate-900 text-rose-500 hover:text-rose-400 flex items-center justify-center border border-slate-700/80 shadow-[1px_1px_0px_#000] transition-transform active:scale-75 cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                likesCount ? "fill-rose-500 text-rose-500" : "text-rose-400"
              }`}
            />
          </button>

          {/* Active Likes Counter Badge */}
          {likesCount ? (
            <div className="absolute bottom-1.5 right-1.5 z-10 px-1.5 py-0.5 bg-rose-600 text-white font-pixel text-[8px] font-bold border border-slate-950 shadow-[1px_1px_0px_#000] animate-in zoom-in-50 duration-150">
              +{likesCount}
            </div>
          ) : null}
        </div>

        {/* Student Name */}
        <h3 className="font-silk font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate mb-1">
          {student.name}
        </h3>

        {/* Cool Slate Nickname Badge (Non-clashing neutral color) */}
        <div className="mb-2">
          <span className="inline-block px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-pixel text-[8px] border border-slate-300 dark:border-slate-700 truncate max-w-full">
            [{student.nickname}]
          </span>
        </div>
      </div>

      {/* Instagram & Quick Action */}
      <div className="relative z-10 pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-silk">
        <a
          href={`https://instagram.com/${student.ig}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 truncate max-w-[80%] font-bold transition-colors"
        >
          <Instagram className="w-3 h-3 shrink-0" />
          <span className="truncate">@{student.ig}</span>
        </a>
        <span className="text-slate-400 dark:text-slate-500 group-hover:text-rose-500 group-hover:translate-x-1 transition-all font-bold">
          &gt;
        </span>
      </div>
    </div>
  );
}

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

    // Confetti burst in Ruby Red, Soft Lavender Iridescent, and Warm Gold
    confetti({
      particleCount: 24,
      spread: 45,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#F43F5E", "#E11D48", "#C084FC", "#FBBF24"],
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-slate-950 font-pixel text-[9px] font-bold border-2 border-slate-950 shadow-[2px_2px_0px_#000] mb-3">
          <Users className="w-3.5 h-3.5 text-slate-950" />
          <span>DAFTAR SISWA</span>
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-slate-900 dark:text-white mb-3 pixel-title-shadow">
          31 Siswa XII PPLG 3
        </h2>
        <p className="font-silk text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-bold uppercase">
          Klik kartu untuk melihat informasi profil lengkap dan pesan kenangan
        </p>
      </div>

      {/* Search Bar & Counter */}
      <div className="max-w-md mx-auto mb-10 space-y-2">
        <div className="relative pixel-box p-1">
          <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau username Instagram..."
            className="w-full pl-10 pr-9 py-2 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 font-silk text-xs focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex items-center justify-between px-1 text-[10px] font-silk text-slate-600 dark:text-slate-400 font-bold">
          <span>Menampilkan {filteredStudents.length} dari 31 siswa</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-amber-600 dark:text-amber-400 hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>
      </div>

      {/* Grid of Student Cards with 3D Tilt & Holographic Sheen */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
        {filteredStudents.map((s) => (
          <StudentCardItem
            key={s.id}
            student={s}
            likesCount={likes[s.id] || 0}
            onLike={handleLike}
            onSelect={setSelectedStudent}
          />
        ))}
      </div>

      {/* Empty Search State */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-16 pixel-box max-w-md mx-auto p-8">
          <Users className="w-8 h-8 text-amber-500 mx-auto mb-3" />
          <h3 className="font-pixel text-xs text-slate-900 dark:text-white mb-2">
            SISWA TIDAK DITEMUKAN
          </h3>
          <p className="font-silk text-xs text-slate-700 dark:text-slate-300 mb-4">
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

      {/* Student Detail Modal with Retro Dialogue Log & Quote */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedStudent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="pixel-box p-5 sm:p-7 max-w-sm w-full relative z-10 bg-white dark:bg-[#0D1322]"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 w-7 h-7 bg-slate-200 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-800 dark:text-slate-200 flex items-center justify-center cursor-pointer border border-slate-950 shadow-[2px_2px_0px_#000] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Info */}
            <div className="flex flex-col items-center text-center">
              {/* Photo Frame with Clean Neutral Slate Bezel */}
              <div className="relative w-40 h-52 sm:w-44 sm:h-56 overflow-hidden mb-3.5 pixel-frame-neutral bg-[#0A0E18] shadow-[3px_3px_0px_#000]">
                <Image
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#080C14]/90 text-white font-pixel text-[9px] font-bold border border-slate-700 shadow-[1px_1px_0px_#000]">
                  ABSEN #{selectedStudent.id}
                </div>
              </div>

              {/* Name & Nickname */}
              <h3 className="font-pixel text-sm sm:text-base text-slate-900 dark:text-white mb-1 leading-snug">
                {selectedStudent.name}
              </h3>
              <p className="font-silk text-xs text-slate-600 dark:text-slate-400 font-bold mb-3 uppercase">
                Panggilan: {selectedStudent.nickname}
              </p>

              {/* Student Quote Dialogue Box */}
              {selectedStudent.quote && (
                <div className="w-full bg-slate-100 dark:bg-slate-900/90 border-2 border-slate-300 dark:border-slate-800 p-3 mb-4 text-left relative">
                  <Quote className="w-3.5 h-3.5 text-rose-500 mb-1" />
                  <p className="font-sans text-xs text-slate-800 dark:text-slate-200 italic leading-relaxed">
                    &ldquo;{selectedStudent.quote}&rdquo;
                  </p>
                </div>
              )}

              {/* School Badges */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5 font-silk text-[9px]">
                <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold">
                  XII PPLG 3
                </span>
                <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold">
                  SMKN 1 BERINGIN
                </span>
                <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold">
                  2026
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full">
                <a
                  href={`https://instagram.com/${selectedStudent.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn pixel-btn-primary flex-1 py-2.5 text-[9px] flex items-center justify-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={(e) => handleLike(e, selectedStudent.id)}
                  className="pixel-btn pixel-btn-secondary py-2.5 px-3 text-[9px] flex items-center justify-center gap-1.5 hover:text-rose-500"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likes[selectedStudent.id]
                        ? "fill-rose-500 text-rose-500"
                        : "text-rose-400"
                    }`}
                  />
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
