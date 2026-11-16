"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { Star, Code2, Heart, Trophy, Sparkles, BookOpen, Users, GraduationCap } from "lucide-react";
import { playPop } from "@/lib/sound";

export function AboutClass() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".about-clay-item");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="tentang" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="clay-pill-tag bg-indigo-50 text-indigo-700 border-2 border-indigo-200 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Cerita &amp; Perjalanan</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight mb-3">
          Kisah &amp; Kebersamaan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Tiga tahun penuh tawa, kode eror, dan perjuangan bersama di SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Main Bento Clay Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-6">
        {/* Card 1: Cerita Kebersamaan (7 Cols) */}
        <div
          onMouseEnter={() => playPop(520)}
          className="about-clay-item md:col-span-7 clay-card p-7 sm:p-9 flex flex-col justify-between"
        >
          <div>
            <div className="clay-pill-tag bg-emerald-50 text-emerald-800 border border-emerald-200 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#58CC02]" />
              <span>Perjalanan 3 Tahun PPLG</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight leading-snug mb-4">
              Lebih dari Sekadar Teman Sekelas
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 font-medium">
              Tiga tahun bukan waktu yang singkat. Dimulai dari rasa canggung saat pertama kali menginjakkan kaki di kelas, hingga akhirnya menjadi tempat di mana kita bisa tertawa lepas tanpa beban.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Di balik setiap tugas dan jam belajar di lab komputer, selalu ada canda yang menghidupkan suasana, saling bantu saat ada yang kesulitan koding, dan kebersamaan yang membuat setiap hari terasa berarti. Tiga puluh satu karakter berbeda yang tumbuh menjadi satu keluarga yang saling melengkapi.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t-2 border-slate-100 flex items-center justify-between text-xs font-heading font-black text-slate-500">
            <span>SMK Negeri 1 Beringin</span>
            <span className="text-emerald-700 font-black">Angkatan 2026 Solid</span>
          </div>
        </div>

        {/* Card 2: Wali Kelas (5 Cols) */}
        <div
          onMouseEnter={() => playPop(580)}
          className="about-clay-item md:col-span-5 clay-card p-7 sm:p-9 flex flex-col justify-between bg-gradient-to-br from-white to-amber-50/50"
        >
          <div>
            <div className="clay-pill-tag bg-amber-100 text-amber-800 border border-amber-200 mb-5">
              <Trophy className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>Wali Kelas &amp; Mentor Utama</span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#58CC02] text-white flex items-center justify-center font-heading font-black text-xl border-b-[4px] border-[#46A302] shadow-md shrink-0">
                VS
              </div>
              <div>
                <h4 className="text-lg font-heading font-black text-slate-900 leading-tight">
                  Vevy Sisnia, S.Kom.
                </h4>
                <p className="text-xs font-bold text-[#58CC02] mt-0.5">
                  Wali Kelas XII PPLG 3
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-100/90 border-b-[3px] border-b-amber-200/90">
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-medium">
                &ldquo;Bukan cuma tentang apa yang sudah kalian capai di kelas, tapi tentang bagaimana 31 anak ini saling menjaga kekompakan dan persaudaraan. Tetaplah rendah hati dan saling menyapa di mana pun kalian berada nanti.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-5 mt-5 flex items-center justify-between text-xs font-heading font-black text-slate-400">
            <span>Pembimbing Teladan</span>
            <span className="text-amber-600">Ibu Vevy Sisnia, S.Kom.</span>
          </div>
        </div>
      </div>

      {/* 4 Mini Gamified Clay Stat Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onMouseEnter={() => playPop(500)}
          className="about-clay-item clay-card clay-card-interactive p-4 sm:p-5 text-center flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#1CB0F6] flex items-center justify-center mb-2 border-b-2 border-sky-200">
            <Users className="w-5 h-5" />
          </div>
          <span className="font-heading font-black text-2xl text-slate-900">31</span>
          <span className="text-xs font-bold text-slate-500">Siswa Berkarakter</span>
        </div>

        <div
          onMouseEnter={() => playPop(540)}
          className="about-clay-item clay-card clay-card-interactive p-4 sm:p-5 text-center flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#58CC02] flex items-center justify-center mb-2 border-b-2 border-emerald-200">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-heading font-black text-2xl text-slate-900">100%</span>
          <span className="text-xs font-bold text-slate-500">PPLG Bersatu</span>
        </div>

        <div
          onMouseEnter={() => playPop(580)}
          className="about-clay-item clay-card clay-card-interactive p-4 sm:p-5 text-center flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 border-b-2 border-amber-200">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-heading font-black text-2xl text-slate-900">3 Tahun</span>
          <span className="text-xs font-bold text-slate-500">Kenangan Manis</span>
        </div>

        <div
          onMouseEnter={() => playPop(620)}
          className="about-clay-item clay-card clay-card-interactive p-4 sm:p-5 text-center flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#8B5CF6] flex items-center justify-center mb-2 border-b-2 border-purple-200">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-heading font-black text-2xl text-slate-900">2026</span>
          <span className="text-xs font-bold text-slate-500">Tahun Kelulusan</span>
        </div>
      </div>
    </section>
  );
}
