"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { Star, Code, Heart, Trophy } from "lucide-react";

export function AboutClass() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".about-clay-item");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-heading font-extrabold text-xs border border-indigo-200 border-b-2 border-b-indigo-300 shadow-xs mb-3">
          ✨ Cerita &amp; Perjalanan
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight mb-3">
          Kisah &amp; Kebersamaan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Tiga tahun penuh tawa, kode eror, dan perjuangan bersama di SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Main Bento Clay Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-6">
        {/* Card 1: Cerita Kebersamaan (7 Cols) */}
        <div className="about-clay-item md:col-span-7 clay-card p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-heading font-bold text-xs border border-emerald-200 border-b-2 border-b-emerald-300 mb-4">
              <span>🌱</span>
              <span>Perjalanan 3 Tahun</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight leading-snug mb-4">
              Lebih dari Sekadar Teman Sekelas
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              Tiga tahun bukan waktu yang singkat. Dimulai dari rasa canggung saat pertama kali menginjakkan kaki di kelas, hingga akhirnya menjadi tempat di mana kita bisa tertawa lepas tanpa beban.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Di balik setiap tugas dan jam belajar di lab komputer, selalu ada canda yang menghidupkan suasana, saling bantu saat ada yang kesulitan koding, dan kebersamaan yang membuat setiap hari terasa berarti. Tiga puluh satu karakter berbeda yang tumbuh menjadi satu keluarga yang saling melengkapi.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t-2 border-slate-100 flex items-center justify-between text-xs font-heading font-bold text-slate-500">
            <span>SMK Negeri 1 Beringin</span>
            <span className="text-emerald-700 font-extrabold">Angkatan 2026 Solid</span>
          </div>
        </div>

        {/* Card 2: Wali Kelas (5 Cols) */}
        <div className="about-clay-item md:col-span-5 clay-card p-7 sm:p-9 flex flex-col justify-between bg-gradient-to-br from-white to-amber-50/40">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-heading font-extrabold text-xs border border-amber-200 border-b-2 border-b-amber-300 mb-5">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>Wali Kelas Pilihan</span>
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

            <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-100/90 border-b-[3px] border-b-amber-200/90 relative">
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-medium">
                &ldquo;Bukan cuma tentang apa yang sudah kalian capai di kelas, tapi tentang bagaimana 31 anak ini saling menjaga kekompakan dan persaudaraan. Tetaplah rendah hati dan saling menyapa di mana pun kalian berada nanti.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-5 mt-5 flex items-center justify-between text-xs font-heading font-bold text-slate-400">
            <span>Pembimbing &amp; Teladan</span>
            <span className="text-amber-600">Terima Kasih, Bu Vevy 💐</span>
          </div>
        </div>
      </div>

      {/* 4 Mini Clay Stat Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="about-clay-item clay-card p-4 sm:p-5 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-2 border-b-2 border-sky-200">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-heading font-black text-2xl text-slate-900">31</span>
          <span className="text-xs font-bold text-slate-500">Siswa Berkarakter</span>
        </div>

        <div className="about-clay-item clay-card p-4 sm:p-5 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 border-b-2 border-emerald-200">
            <Code className="w-5 h-5" />
          </div>
          <span className="font-heading font-black text-2xl text-slate-900">100%</span>
          <span className="text-xs font-bold text-slate-500">PPLG Bersatu</span>
        </div>

        <div className="about-clay-item clay-card p-4 sm:p-5 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 border-b-2 border-amber-200">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="font-heading font-black text-2xl text-slate-900">3 Tahun</span>
          <span className="text-xs font-bold text-slate-500">Kenangan Manis</span>
        </div>

        <div className="about-clay-item clay-card p-4 sm:p-5 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 border-b-2 border-purple-200">
            <span className="text-lg">🎓</span>
          </div>
          <span className="font-heading font-black text-2xl text-slate-900">2026</span>
          <span className="text-xs font-bold text-slate-500">Tahun Kelulusan</span>
        </div>
      </div>
    </section>
  );
}
