"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  Users,
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react";
import { students, Student, CLASS_INFO } from "@/data/students";
import {
  snappySpring,
  modalSpring,
  pixelEase,
  viewportOnce,
} from "@/lib/motion-presets";

type FilterMode = "all" | "officers";

function getRoleShortLabel(role?: Student["role"]) {
  if (!role) return null;
  if (role === "Ketua Kelas") return "KETUA";
  if (role === "Wakil Ketua") return "WAKIL";
  return role.toUpperCase();
}

const pageFlipVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 28 : -28,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.22, ease: pixelEase },
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -28 : 28,
    opacity: 0,
    transition: { duration: 0.16, ease: pixelEase },
  }),
};

export function StudentProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [navDirection, setNavDirection] = useState(1);

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
      setNavDirection(delta);
      const nextIdx =
        (selectedIndex + delta + filteredStudents.length) %
        filteredStudents.length;
      setSelectedId(filteredStudents[nextIdx].id);
    },
    [selectedIndex, filteredStudents]
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
      className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative select-none"
    >
      {/* Clean Responsive Section Header & Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.34, ease: pixelEase }}
        className="mb-7 sm:mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-5 border-b-2 border-[var(--border-soft)] pb-5 sm:pb-6"
      >
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

        {/* Responsive Search + Motion Filter Tabs */}
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

          {/* Filter Tabs with Shared Sliding Pixel Background */}
          <div className="grid grid-cols-2 sm:flex items-center gap-2 font-silk text-[11px] font-bold shrink-0">
            {(
              [
                { id: "all", label: "Semua (31)" },
                { id: "officers", label: "Pengurus (4)" },
              ] as const
            ).map((tab) => {
              const isActive = filterMode === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  whileTap={{ scale: 0.96, y: 1 }}
                  transition={snappySpring}
                  onClick={() => setFilterMode(tab.id)}
                  className={`relative px-3.5 py-2 border-2 border-[var(--border-hard)] bg-[var(--bg-surface)] shadow-[2px_2px_0px_var(--shadow-hard)] whitespace-nowrap cursor-pointer overflow-hidden ${
                    isActive
                      ? "text-white dark:text-[#181624]"
                      : "text-[var(--fg-secondary)] hover:bg-[var(--bg-inset)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="student-filter-pill"
                      transition={snappySpring}
                      aria-hidden="true"
                      className="absolute inset-0 bg-[#5B46C8] dark:bg-[#FACC15] z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* 16-Bit Roster Grid with Animated Layout Reflow */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5 px-0.5"
      >
        <AnimatePresence mode="popLayout">
          {filteredStudents.map((s) => {
            const shortRole = getRoleShortLabel(s.role);
            const isLeader = s.role === "Ketua Kelas";

            return (
              <motion.button
                key={s.id}
                layout
                type="button"
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={snappySpring}
                onClick={() => {
                  setNavDirection(1);
                  setSelectedId(s.id);
                }}
                className="student-card-box group flex flex-col justify-between text-left h-full p-2 sm:p-2.5 md:p-3 cursor-pointer overflow-hidden"
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
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty Search State */}
      <AnimatePresence>
        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: pixelEase }}
            className="text-center py-14 pixel-box max-w-md mx-auto p-8 mt-4"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated 16-Bit Character Dossier Modal with Directional Page-Flip */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07060D]/85"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={modalSpring}
              onClick={(e) => e.stopPropagation()}
              className="pixel-box max-w-lg w-full max-h-[90dvh] flex flex-col relative z-10 overflow-hidden"
            >
              {/* Retro Window Titlebar */}
              <div className="pixel-titlebar shrink-0">
                <span className="font-pixel text-[9px] text-[var(--fg-primary)]">
                  SISWA_#{selectedStudent.id}.DAT
                </span>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedId(null)}
                  aria-label="Tutup profil"
                  className="w-6 h-6 bg-[var(--bg-surface)] hover:bg-[var(--accent-crimson)] hover:text-white text-[var(--fg-primary)] flex items-center justify-center border-2 border-[var(--border-hard)] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto">
                <AnimatePresence mode="wait" custom={navDirection} initial={false}>
                  <motion.div
                    key={selectedStudent.id}
                    custom={navDirection}
                    variants={pageFlipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5"
                  >
                    {/* Framed Portrait */}
                    <div className="relative w-32 h-44 sm:w-40 sm:h-52 shrink-0 pixel-frame-portrait p-[2px]">
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

                      <dl className="divide-y divide-[var(--border-soft)]/70 text-left bg-[var(--bg-inset)] border-2 border-[var(--border-soft)] px-3 py-1.5">
                        <div className="py-1.5 flex items-baseline justify-between gap-3 text-[10px] sm:text-[11px] font-silk">
                          <dt className="text-[var(--fg-muted)] shrink-0">Panggilan</dt>
                          <dd className="font-bold text-[var(--fg-primary)] text-right whitespace-nowrap">
                            {selectedStudent.nickname}
                          </dd>
                        </div>
                        <div className="py-1.5 flex items-baseline justify-between gap-3 text-[10px] sm:text-[11px] font-silk">
                          <dt className="text-[var(--fg-muted)] shrink-0">No. Absen</dt>
                          <dd className="font-bold text-[var(--fg-primary)] text-right whitespace-nowrap">
                            {selectedStudent.id} / {CLASS_INFO.totalStudents}
                          </dd>
                        </div>
                        <div className="py-1.5 flex items-baseline justify-between gap-3 text-[10px] sm:text-[11px] font-silk">
                          <dt className="text-[var(--fg-muted)] shrink-0">Kelas</dt>
                          <dd className="font-bold text-[var(--fg-primary)] text-right whitespace-nowrap">
                            {CLASS_INFO.name}
                          </dd>
                        </div>
                        <div className="py-1.5 flex items-baseline justify-between gap-3 text-[10px] sm:text-[11px] font-silk">
                          <dt className="text-[var(--fg-muted)] shrink-0">Sekolah</dt>
                          <dd className="font-bold text-[var(--fg-primary)] text-right whitespace-nowrap">
                            SMKN 1 Beringin
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next Yearbook Flip Controls */}
                <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t-2 border-dashed border-[var(--border-soft)] flex items-center justify-between gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigateModal(-1)}
                    className="pixel-btn pixel-btn-secondary !py-2 !px-2.5 sm:!px-3 !m-0 !text-[8px] sm:!text-[9px]"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-0.5 sm:mr-1 shrink-0" />
                    <span className="hidden min-[380px]:inline">SEBELUM</span>
                    <span className="min-[380px]:hidden">PREV</span>
                  </motion.button>

                  <span className="font-silk text-[11px] font-bold text-[var(--fg-muted)] whitespace-nowrap">
                    {selectedIndex + 1} / {filteredStudents.length}
                  </span>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigateModal(1)}
                    className="pixel-btn pixel-btn-accent !py-2 !px-2.5 sm:!px-3 !m-0 !text-[8px] sm:!text-[9px]"
                  >
                    <span className="hidden min-[380px]:inline">LANJUT</span>
                    <span className="min-[380px]:hidden">NEXT</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5 sm:ml-1 shrink-0" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
