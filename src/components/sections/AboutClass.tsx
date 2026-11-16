"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { Award, BookOpen, Sparkles } from "lucide-react";
import { PixelCard } from "@/components/ui/PixelCard";

export function AboutClass() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".about-card-box");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
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
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 pixel-box bg-slate-900 text-[#FBBF24] font-pixel text-[10px] mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TENTANG KELAS</span>
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-slate-900 dark:text-white mb-3">
          Kisah &amp; Perjalanan
        </h2>
        <p className="font-silk text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-bold uppercase">
          Tiga tahun belajar, berkreasi, dan tumbuh bersama di SMK Negeri 1 Beringin
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch mb-6">
        {/* Card 1: Story (7 Cols) */}
        <div className="about-card-box md:col-span-7">
          <PixelCard className="h-full">
            <div className="flex flex-col justify-between h-full p-3 sm:p-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 pixel-box bg-amber-500/15 text-amber-700 dark:text-amber-300 font-silk text-[11px] font-bold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PERJALANAN 2023 - 2026</span>
                </div>

                <h3 className="font-pixel text-sm sm:text-lg text-slate-900 dark:text-white leading-relaxed mb-4">
                  Lebih dari Sekadar Teman Sekelas
                </h3>

                <p className="font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
                  Tiga tahun bukan waktu yang singkat. Dimulai dari rasa canggung saat pertama kali menginjakkan kaki di laboratorium komputer, hingga akhirnya menjadi tempat di mana kita bisa berkreasi, coding aplikasi bersama, dan tertawa lepas tanpa beban.
                </p>

                <p className="font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  Di balik setiap tugas dan proyek yang menantang, selalu ada canda yang menghidupkan suasana kelas. 31 siswa dengan karakter unik yang saling melengkapi menjadi satu keluarga besar yang solid.
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between font-pixel text-[9px] text-slate-700 dark:text-slate-300 font-bold">
                <span>SMK NEGERI 1 BERINGIN</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">ANGKATAN 2026</span>
              </div>
            </div>
          </PixelCard>
        </div>

        {/* Card 2: Wali Kelas (5 Cols) */}
        <div className="about-card-box md:col-span-5">
          <PixelCard className="h-full">
            <div className="flex flex-col justify-between h-full p-3 sm:p-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 pixel-box bg-amber-500 text-slate-950 font-pixel text-[9px] mb-4">
                  <Award className="w-3 h-3" />
                  <span>WALI KELAS</span>
                </div>

                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 pixel-box bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-pixel text-sm font-bold shrink-0 pixel-corners-sm">
                    VS
                  </div>
                  <div>
                    <h4 className="font-pixel text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                      Vevy Sisnia, S.Kom.
                    </h4>
                    <p className="font-silk text-[10px] text-amber-600 dark:text-amber-400 font-bold mt-0.5 uppercase">
                      Pembimbing XII PPLG 3
                    </p>
                  </div>
                </div>

                <div className="p-3.5 pixel-box bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 pixel-corners-sm">
                  <p className="font-sans text-xs text-slate-800 dark:text-slate-200 italic leading-relaxed">
                    &ldquo;Bukan cuma tentang apa yang sudah kalian capai di kelas, tapi tentang bagaimana 31 anak ini saling menjaga kekompakan dan persaudaraan. Tetaplah rendah hati dan saling menyapa di mana pun kalian berada nanti.&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 flex items-center justify-between font-silk text-[10px] text-slate-700 dark:text-slate-300">
                <span>Guru Pembimbing</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">Ibu Vevy Sisnia</span>
              </div>
            </div>
          </PixelCard>
        </div>
      </div>

      {/* 3 Tahap Perjalanan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <PixelCard>
          <div className="p-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 pixel-box bg-sky-500 text-white font-pixel text-[10px] flex items-center justify-center pixel-corners-sm">
                1
              </span>
              <span className="font-pixel text-[10px] text-sky-600 dark:text-sky-400 font-bold">KELAS X</span>
            </div>
            <h4 className="font-silk font-bold text-xs text-slate-900 dark:text-white mb-1">
              Dasar Pemrograman &amp; Logika
            </h4>
            <p className="font-sans text-xs text-slate-700 dark:text-slate-300">
              Awal mula belajar sintaks koding, logika pemrograman dasar, dan adaptasi 31 siswa baru.
            </p>
          </div>
        </PixelCard>

        <PixelCard>
          <div className="p-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 pixel-box bg-amber-500 text-slate-950 font-pixel text-[10px] flex items-center justify-center pixel-corners-sm">
                2
              </span>
              <span className="font-pixel text-[10px] text-amber-600 dark:text-amber-400 font-bold">KELAS XI</span>
            </div>
            <h4 className="font-silk font-bold text-xs text-slate-900 dark:text-white mb-1">
              Web &amp; Game Development
            </h4>
            <p className="font-sans text-xs text-slate-700 dark:text-slate-300">
              Membangun aplikasi fungsional, proyek gim interaktif, dan kerja kelompok yang solid.
            </p>
          </div>
        </PixelCard>

        <PixelCard>
          <div className="p-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 pixel-box bg-emerald-500 text-slate-950 font-pixel text-[10px] flex items-center justify-center pixel-corners-sm">
                3
              </span>
              <span className="font-pixel text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">KELAS XII</span>
            </div>
            <h4 className="font-silk font-bold text-xs text-slate-900 dark:text-white mb-1">
              Karya Akhir &amp; Kelulusan 2026
            </h4>
            <p className="font-sans text-xs text-slate-700 dark:text-slate-300">
              Penyempurnaan portofolio, persiapan masa depan, dan kenangan kelulusan bersama.
            </p>
          </div>
        </PixelCard>
      </div>
    </section>
  );
}
