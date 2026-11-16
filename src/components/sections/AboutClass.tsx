"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { Trophy, Award, Gamepad2, Sparkles, BookOpen } from "lucide-react";
import { PixelCard } from "@/components/ui/PixelCard";

export function AboutClass() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".pixel-about-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
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
    { scope: sectionRef }
  );

  return (
    <section id="tentang" ref={sectionRef} className="py-20 px-3 sm:px-6 max-w-6xl mx-auto relative select-none">
      {/* Arcade Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded pixel-box bg-slate-900 text-[#FBBF24] font-pixel text-[10px] mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>[ QUEST LOG: 2023 - 2026 ]</span>
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-slate-900 dark:text-white mb-3">
          STORY &amp; JOURNEY
        </h2>
        <p className="font-silk text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold uppercase">
          Tiga tahun kebersamaan kelas XII PPLG 3 di SMK Negeri 1 Beringin
        </p>
      </div>

      {/* Main Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch mb-6">
        {/* Card 1: Story (7 Cols) */}
        <div className="pixel-about-card md:col-span-7">
          <PixelCard className="p-6 sm:p-7 flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded pixel-box bg-amber-500/10 text-amber-500 font-silk text-[11px] font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXP: 3 YEARS IN LAB 2</span>
              </div>

              <h3 className="font-pixel text-sm sm:text-lg text-slate-900 dark:text-white leading-relaxed mb-4">
                LEBIH DARI SEKARANG TEMAN SEKELAS
              </h3>

              <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Tiga tahun bukan waktu yang singkat. Dimulai dari rasa canggung saat pertama kali menginjakkan kaki di laboratorium komputer, hingga akhirnya menjadi tempat di mana kita bisa berkreasi, coding game bersama, dan tertawa lepas tanpa beban.
              </p>

              <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Di balik setiap deadline project dan error compiler yang rumit, selalu ada canda yang menghidupkan suasana kelas. 31 siswa dengan karakter unik yang saling melengkapi menjadi satu tim solid angkatan 2026.
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between font-pixel text-[9px] text-slate-500">
              <span>SMKN 1 BERINGIN</span>
              <span className="text-amber-500">STAGE CLEAR 2026</span>
            </div>
          </PixelCard>
        </div>

        {/* Card 2: Wali Kelas (5 Cols) */}
        <div className="pixel-about-card md:col-span-5">
          <PixelCard className="p-6 sm:p-7 flex flex-col justify-between h-full border-amber-500/50">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded pixel-box bg-amber-500 text-slate-950 font-pixel text-[9px] mb-4">
                <Trophy className="w-3 h-3" />
                <span>WALI KELAS / MENTOR</span>
              </div>

              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded pixel-box bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-pixel text-sm font-bold shrink-0">
                  VS
                </div>
                <div>
                  <h4 className="font-pixel text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                    Vevy Sisnia, S.Kom.
                  </h4>
                  <p className="font-silk text-[10px] text-amber-500 font-bold mt-0.5 uppercase">
                    Pembimbing Kelas XII PPLG 3
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded pixel-box bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <p className="font-sans text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  &ldquo;Bukan cuma tentang apa yang sudah kalian capai di kelas, tapi tentang bagaimana 31 anak ini saling menjaga kekompakan dan persaudaraan. Tetaplah rendah hati dan saling menyapa di mana pun kalian berada nanti.&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 flex items-center justify-between font-silk text-[10px] text-slate-400">
              <span>Guru Pembimbing</span>
              <span className="text-amber-500 font-bold">Ibu Vevy Sisnia</span>
            </div>
          </PixelCard>
        </div>
      </div>

      {/* 3 Worlds / Levels of High School */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <PixelCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded pixel-box bg-sky-500 text-white font-pixel text-[10px] flex items-center justify-center">
              1
            </span>
            <span className="font-pixel text-[10px] text-sky-500">WORLD 1: KELAS X</span>
          </div>
          <h4 className="font-silk font-bold text-xs text-slate-900 dark:text-white mb-1">
            DASAR PEMROGRAMAN &amp; LOGIKA
          </h4>
          <p className="font-sans text-xs text-slate-600 dark:text-slate-400">
            Awal masuk lab, belajar algoritma dasar, sintaks koding, dan adaptasi 31 karakter baru.
          </p>
        </PixelCard>

        <PixelCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded pixel-box bg-amber-500 text-slate-950 font-pixel text-[10px] flex items-center justify-center">
              2
            </span>
            <span className="font-pixel text-[10px] text-amber-500">WORLD 2: KELAS XI</span>
          </div>
          <h4 className="font-silk font-bold text-xs text-slate-900 dark:text-white mb-1">
            WEB, DATABASE &amp; GAME ENGINE
          </h4>
          <p className="font-sans text-xs text-slate-600 dark:text-slate-400">
            Membangun aplikasi fungsional, proyek gim digital, dan kerja kelompok yang semakin kompak.
          </p>
        </PixelCard>

        <PixelCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded pixel-box bg-emerald-500 text-slate-950 font-pixel text-[10px] flex items-center justify-center">
              3
            </span>
            <span className="font-pixel text-[10px] text-emerald-500">WORLD 3: KELAS XII</span>
          </div>
          <h4 className="font-silk font-bold text-xs text-slate-900 dark:text-white mb-1">
            KARYA AKHIR &amp; KELULUSAN 2026
          </h4>
          <p className="font-sans text-xs text-slate-600 dark:text-slate-400">
            Penyempurnaan portofolio, persiapan masa depan, dan kenangan manis kelulusan bersama.
          </p>
        </PixelCard>
      </div>
    </section>
  );
}
