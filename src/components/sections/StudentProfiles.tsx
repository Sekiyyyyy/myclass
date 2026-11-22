"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Search,
  X,
  Users,
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react";
import { students, Student, CLASS_INFO } from "@/data/students";
import { useGSAP, gsap } from "@/lib/gsap-config";

type FilterMode = "all" | "officers";

function getRoleShortLabel(role?: Student["role"]) {
  if (!role) return null;
  if (role === "Ketua Kelas") return "KETUA";
  if (role === "Wakil Ketua") return "WAKIL";
  return role.toUpperCase();
}

export function StudentProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return students.filter((s) => {
      if (filterMode === "officers" && !s.role) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.nickname.toLowerCase().includes(q) ||
        s.id.includes(q) ||
        (s.role && s.role.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, filterMode]);

  const selectedIndex = useMemo(() => {
    if (!selectedId) return -1;
    return filteredStudents.findIndex((s) => s.id === selectedId);
  }, [selectedId, filteredStudents]);

  const selectedStudent: Student | null =
    selectedIndex >= 0 ? filteredStudents[selectedIndex] : null;

  const navigateModal = useCallback(
    (delta: number) => {
      if (selectedIndex < 0 || filteredStudents.length === 0) return;
      const nextIdx =
        (selectedIndex + delta + filteredStudents.length) %
        filteredStudents.length;
      setSelectedId(filteredStudents[nextIdx].id);
    },
    [selectedIndex, filteredStudents]
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = sectionRef.current?.querySelectorAll(".student-card-item");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.015,
          ease: "steps(4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    if (!selectedStudent) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "ArrowLeft") navigateModal(-1);
      if (e.key === "ArrowRight") navigateModal(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedStudent, navigateModal]);

  return (
    <section
      id="siswa"
      ref={sectionRef}
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative select-none"
    >
      {/* Clean Responsive Section Header & Toolbar */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b-2 border-[var(--border-soft)] pb-6">
        <div className="shrink-0">
          <p className="font-pixel text-[9px] sm:text-[10px] text-[var(--accent-indigo)] dark:text-[#FACC15] tracking-widest uppercase mb-2">
            02 // DAFTAR SISWA
          </p>
          <h2 className="font-pixel text-lg sm:text-2xl md:text-3xl text-[var(--fg-primary)] leading-snug pixel-title-shadow mb-2">
            Daftar {CLASS_INFO.totalStudents} Siswa
          </h2>
          <p className="font-silk text-[11px] sm:text-xs text-[var(--fg-muted)] font-bold">
            Klik kartu untuk melihat detail siswa ({filteredStudents.length}{" "}
            ditampilkan)
          </p>
        </div>

        {/* Responsive Search + Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative pixel-box !p-0 w-full sm:flex-1 lg:w-64 xl:w-72">
            <Search className="w-4 h-4 text-[var(--fg-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau absen..."
              aria-label="Cari siswa"
              className="w-full pl-9 pr-8 py-2 bg-transparent text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)] font-silk text-xs focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Hapus pencarian"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--fg-primary)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="grid grid-cols-2 sm:flex items-center gap-2 font-silk text-[11px] font-bold shrink-0">
            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={`px-3.5 py-2 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--shadow-hard)] active:translate-y-[1px] active:shadow-none transition-all whitespace-nowrap cursor-pointer ${
                filterMode === "all"
                  ? "bg-[#5B46C8] text-white dark:bg-[#FACC15] dark:text-[#181624]"
                  : "bg-[var(--bg-surface)] text-[var(--fg-secondary)] hover:bg-[var(--bg-inset)]"
              }`}
            >
              Semua (31)
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("officers")}
              className={`px-3.5 py-2 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--shadow-hard)] active:translate-y-[1px] active:shadow-none transition-all whitespace-nowrap cursor-pointer ${
                filterMode === "officers"
                  ? "bg-[#5B46C8] text-white dark:bg-[#FACC15] dark:text-[#181624]"
                  : "bg-[var(--bg-surface)] text-[var(--fg-secondary)] hover:bg-[var(--bg-inset)]"
              }`}
            >
              Pengurus (4)
            </button>
          </div>
        </div>
      </div>

      {/* 16-Bit Roster Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {filteredStudents.map((s) => {
          const shortRole = getRoleShortLabel(s.role);
          const isLeader = s.role === "Ketua Kelas";

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedId(s.id)}
              className="student-card-item student-card-box group flex flex-col justify-between text-left h-full p-2 sm:p-2.5 md:p-3 cursor-pointer overflow-hidden"
            >
              <div className="w-full">
                {/* Studio Red Pas-Foto Framed inside Neutral Matte Pixel Bezel */}
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-2.5 sm:mb-3 pixel-frame-portrait p-[2px]">
                  <div className="relative w-full h-full overflow-hidden bg-[#181624]">
                    <Image
                      src={s.avatar}
                      alt={s.name}
                      fill
                      sizes="(max-width: 640px) 46vw, (max-width: 768px) 31vw, (max-width: 1024px) 23vw, 19vw"
                      className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-300 ease-out"
                    />
                  </div>

                  {/* Crisp Absen Stamp */}
                  <div className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 bg-[#181624] text-[#F4F1FA] font-pixel text-[8px] font-bold border border-[#4C4672]">
                    #{s.id}
                  </div>

                  {/* Real Officer Tag Only */}
                  {shortRole && (
                    <div
                      className={`absolute bottom-1.5 right-1.5 z-10 inline-flex items-center gap-1 px-1.5 py-0.5 font-pixel text-[7px] font-bold border border-[#181624] shadow-[1px_1px_0px_#181624] ${
                        isLeader
                          ? "bg-[#FACC15] text-[#181624]"
                          : "bg-[#5B46C8] text-white"
                      }`}
                    >
                      {isLeader && <Crown className="w-2.5 h-2.5" />}
                      <span>{shortRole}</span>
                    </div>
                  )}
                </div>

                {/* Student Name */}
                <h3 className="font-silk font-bold text-[11px] sm:text-xs md:text-[13px] text-[var(--fg-primary)] leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.2rem] mb-1">
                  {s.name}
                </h3>
              </div>

              {/* Card Footer Strip with Authentic 8-Bit Selector Indicator */}
              <div className="w-full pt-2 mt-1 border-t border-[var(--border-soft)] flex items-center justify-between gap-2 font-pixel text-[7px] sm:text-[8px]">
                <span className="text-[var(--fg-muted)] truncate">
                  {s.nickname}
                </span>
                <span className="inline-flex items-center gap-1 text-[var(--accent-indigo)] dark:text-[#FACC15] opacity-75 group-hover:opacity-100 shrink-0">
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">
                    &#9654;
                  </span>
                  <span className="hidden sm:inline">INFO</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty Search State */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-14 pixel-box max-w-md mx-auto p-8 mt-4">
          <Users className="w-8 h-8 text-[var(--accent-indigo)] dark:text-[#FACC15] mx-auto mb-3" />
          <h3 className="font-pixel text-xs text-[var(--fg-primary)] mb-2">
            DATA TIDAK DITEMUKAN
          </h3>
          <p className="font-silk text-xs text-[var(--fg-secondary)] mb-5">
            Tidak ada siswa yang cocok dengan &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setFilterMode("all");
            }}
            className="pixel-btn pixel-btn-primary text-[9px] py-2 px-3"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* 16-Bit Character Dossier Modal with Prev/Next Navigation */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="student-modal-title"
          onClick={() => setSelectedId(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07060D]/85"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="pixel-box max-w-md w-full relative z-10 overflow-hidden"
          >
            {/* Retro Window Titlebar */}
            <div className="pixel-titlebar">
              <span className="font-pixel text-[9px] text-[var(--fg-primary)]">
                SISWA_#{selectedStudent.id}.DAT
              </span>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Tutup profil"
                className="w-6 h-6 bg-[var(--bg-surface)] hover:bg-[var(--accent-crimson)] hover:text-white text-[var(--fg-primary)] flex items-center justify-center border-2 border-[var(--border-hard)] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Framed Portrait */}
                <div className="relative w-36 h-48 sm:w-40 sm:h-52 shrink-0 pixel-frame-portrait p-[2px]">
                  <div className="relative w-full h-full overflow-hidden bg-[#181624]">
                    <Image
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                      fill
                      priority
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#181624] text-[#F4F1FA] font-pixel text-[8px] font-bold border border-[#4C4672]">
                    #{selectedStudent.id}
                  </div>
                </div>

                {/* Real Authentic Dossier Metadata */}
                <div className="flex-1 text-center sm:text-left w-full">
                  {selectedStudent.role ? (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 mb-2 font-pixel text-[8px] font-bold border border-[#181624] ${
                        selectedStudent.role === "Ketua Kelas"
                          ? "bg-[#FACC15] text-[#181624]"
                          : "bg-[#5B46C8] text-white"
                      }`}
                    >
                      {selectedStudent.role === "Ketua Kelas" && (
                        <Crown className="w-2.5 h-2.5" />
                      )}
                      <span>{selectedStudent.role.toUpperCase()}</span>
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 mb-2 bg-[var(--bg-inset)] text-[var(--fg-muted)] font-pixel text-[8px] border border-[var(--border-soft)]">
                      ANGGOTA KELAS
                    </span>
                  )}

                  <h3
                    id="student-modal-title"
                    className="font-pixel text-xs sm:text-sm text-[var(--fg-primary)] leading-relaxed mb-3"
                  >
                    {selectedStudent.name}
                  </h3>

                  <dl className="space-y-1.5 text-left bg-[var(--bg-inset)] border-2 border-[var(--border-soft)] p-3">
                    <div className="flex justify-between gap-2 text-[11px] font-silk">
                      <dt className="text-[var(--fg-muted)]">Panggilan</dt>
                      <dd className="font-bold text-[var(--fg-primary)]">
                        {selectedStudent.nickname}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2 text-[11px] font-silk">
                      <dt className="text-[var(--fg-muted)]">No. Absen</dt>
                      <dd className="font-bold text-[var(--fg-primary)]">
                        {selectedStudent.id} / {CLASS_INFO.totalStudents}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2 text-[11px] font-silk">
                      <dt className="text-[var(--fg-muted)]">Kelas</dt>
                      <dd className="font-bold text-[var(--fg-primary)]">
                        {CLASS_INFO.name}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2 text-[11px] font-silk">
                      <dt className="text-[var(--fg-muted)]">Sekolah</dt>
                      <dd className="font-bold text-[var(--fg-primary)]">
                        SMKN 1 Beringin
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Prev / Next Yearbook Flip Controls */}
              <div className="mt-5 pt-4 border-t-2 border-dashed border-[var(--border-soft)] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => navigateModal(-1)}
                  className="pixel-btn pixel-btn-secondary !py-2 !px-3 !m-0 text-[8px] sm:text-[9px]"
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                  <span>SEBELUMNYA</span>
                </button>

                <span className="font-silk text-[11px] font-bold text-[var(--fg-muted)]">
                  {selectedIndex + 1} / {filteredStudents.length}
                </span>

                <button
                  type="button"
                  onClick={() => navigateModal(1)}
                  className="pixel-btn pixel-btn-accent !py-2 !px-3 !m-0 text-[8px] sm:text-[9px]"
                >
                  <span>BERIKUTNYA</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
