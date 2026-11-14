"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Instagram, ArrowUpRight, X } from "lucide-react";
import { students, Student } from "@/data/students";
import { useGSAP, gsap } from "@/lib/gsap-config";

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

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".student-card-item");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.03,
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
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-2">
          Anggota Kelas
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mb-2">
          31 Siswa XII PPLG 3
        </h2>
        <p className="text-sm text-stone-600">
          Keluarga besar kelas XII PPLG 3 SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama teman atau akun Instagram..."
            className="w-full pl-10 pr-9 py-3 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-stone-400 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs p-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 21st.dev Style Cards: Clear Photo, Lowered Gradient, Beautiful Quotes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStudents.map((s) => (
          <div key={s.id} className="student-card-item">
            <div
              onClick={() => setSelectedStudent(s)}
              className="group rounded-2xl bg-white border border-stone-200/90 hover:border-amber-400/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Photo Area: Clear, Sharp, Gradient only at the very bottom edge */}
              <div className="relative -mt-px overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="h-[270px] w-full rounded-2xl group-hover:scale-105 transition-all duration-500 object-cover object-center"
                />
                {/* Gentle bottom-edge transition (only 40px) so the face & person are 100% visible */}
                <div className="absolute bottom-0 z-10 h-10 w-full bg-gradient-to-t pointer-events-none from-white/90 via-white/20 to-transparent"></div>
                <span className="absolute top-3 left-3 z-20 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-stone-900/70 text-white backdrop-blur-xs">
                  #{s.id}
                </span>
              </div>

              {/* Card Footer: Clean Name, Instagram, & Detail trigger */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base tracking-tight truncate">
                    {s.name}
                  </h3>
                  <a
                    href={`https://instagram.com/${s.ig}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-amber-600 via-rose-500 to-purple-600 text-transparent bg-clip-text hover:opacity-80 transition-opacity mt-1 group/ig"
                  >
                    <Instagram className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="group-hover/ig:underline">@{s.ig}</span>
                  </a>
                </div>

                <span className="text-xs font-semibold text-stone-400 group-hover:text-stone-800 flex items-center gap-0.5 transition-colors shrink-0">
                  <span>Detail</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clean Student Memory Modal */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedStudent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm sm:max-w-md w-full relative shadow-2xl border border-stone-200 cursor-default flex flex-col items-center text-center max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Photo: Centered, Beautifully Sized, Object-Center */}
            <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-2xl overflow-hidden bg-stone-100 mb-4 border border-stone-200 shadow-md shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute top-2.5 left-2.5 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-stone-900/75 text-white backdrop-blur-xs">
                #{selectedStudent.id}
              </span>
            </div>

            {/* Student Name */}
            <div className="mb-6">
              <h3 className="font-bold text-xl sm:text-2xl text-stone-900 leading-tight">
                {selectedStudent.name}
              </h3>
              <p className="text-xs font-medium text-stone-500 mt-1">
                XII PPLG 3 • SMK Negeri 1 Beringin
              </p>
            </div>

            {/* Instagram Button */}
            <a
              href={`https://instagram.com/${selectedStudent.ig}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:opacity-95 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Buka Profil Instagram @{selectedStudent.ig}</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
