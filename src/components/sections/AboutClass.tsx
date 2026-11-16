"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { GraduationCap, Award, BookOpen, Layers, Heart, Sparkles } from "lucide-react";

export function AboutClass() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".about-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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
    { scope: sectionRef }
  );

  return (
    <section id="tentang" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold text-xs border border-indigo-200 dark:border-indigo-800/60 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Tentang Kelas Kami</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-slate-900 dark:text-white mb-3">
          Kisah &amp; Perjalanan Kita
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Tiga tahun dedikasi, ribuan baris kode, dan persahabatan erat di SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Main Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-6">
        {/* Card 1: Cerita Kelas (7 Cols) */}
        <div className="about-card md:col-span-7 glass-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-4 border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Perjalanan 2023 - 2026</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-4">
              Lebih dari Sekadar Teman Sekelas
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Tiga tahun bukan waktu yang singkat. Dimulai dari rasa canggung saat pertama kali menginjakkan kaki di laboratorium komputer, hingga akhirnya menjadi tempat di mana kita bisa berkreasi dan tertawa lepas tanpa beban.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Di balik setiap tugas coding dan proyek aplikasi yang menantang, selalu ada canda yang menghidupkan suasana, saling bantu saat ada bug yang sulit dipecahkan, dan persahabatan yang membuat setiap hari terasa berarti. 31 karakter berbeda yang bersatu menjadi keluarga yang solid.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>SMK Negeri 1 Beringin</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Angkatan 2026</span>
          </div>
        </div>

        {/* Card 2: Wali Kelas Tercinta (5 Cols) */}
        <div className="about-card md:col-span-5 glass-card p-6 sm:p-8 flex flex-col justify-between border-indigo-200/50 dark:border-indigo-800/40">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-5 border border-amber-200 dark:border-amber-800/60">
              <Award className="w-3.5 h-3.5" />
              <span>Wali Kelas XII PPLG 3</span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center font-heading font-black text-xl shadow-md shrink-0">
                VS
              </div>
              <div>
                <h4 className="text-lg font-heading font-black text-slate-900 dark:text-white leading-tight">
                  Vevy Sisnia, S.Kom.
                </h4>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                  Guru &amp; Pembimbing Tercinta
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;Bukan cuma tentang apa yang sudah kalian capai di kelas, tapi tentang bagaimana 31 anak ini saling menjaga kekompakan dan persaudaraan. Tetaplah rendah hati dan saling menyapa di mana pun kalian berada nanti.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-5 mt-5 flex items-center justify-between text-xs text-slate-400">
            <span>Dedikasi Pembimbing</span>
            <span className="text-amber-600 dark:text-amber-400 font-medium">Ibu Vevy Sisnia, S.Kom.</span>
          </div>
        </div>
      </div>

      {/* 3 Phases of Journey */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="about-card glass-card p-5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs mb-3">
            01
          </div>
          <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-1">
            Kelas X: Fondasi &amp; Logika
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Mengenal dasar pemrograman, algoritma berpikir, perakitan perangkat, dan awal perjumpaan 31 siswa.
          </p>
        </div>

        <div className="about-card glass-card p-5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs mb-3">
            02
          </div>
          <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-1">
            Kelas XI: Web &amp; Game Dev
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Mulai membangun aplikasi interaktif, antarmuka web, mekanika gim, dan proyek kolaboratif bersama tim.
          </p>
        </div>

        <div className="about-card glass-card p-5">
          <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-xs mb-3">
            03
          </div>
          <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-1">
            Kelas XII: Karya &amp; Kelulusan
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Penyempurnaan portofolio, persiapan dunia industri atau kuliah, dan mengukir kenangan manis kelulusan 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
