"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { Terminal, Shield, Zap, Code2, Users, Trophy, Award } from "lucide-react";
import { playBlip } from "@/lib/sound";

export function AboutClass() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".about-arcade-card");
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
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs border border-cyan-500/25 mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>DOSSIER // QUEST LOG</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-slate-900 dark:text-white mb-3">
          Kisah &amp; Kebersamaan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
          Tiga tahun perjalanan dedikasi, baris kode, dan persaudaraan di SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Main Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-6">
        {/* Card 1: Cerita (7 Cols) */}
        <div
          onMouseEnter={() => playBlip(750)}
          className="about-arcade-card md:col-span-7 arcade-card hud-corner p-7 sm:p-9 flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs mb-4 border border-slate-200 dark:border-slate-700">
              <Zap className="w-3.5 h-3.5 text-cyan-500" />
              <span>CAMPAIGN LOG: 2023 - 2026</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-4">
              Lebih dari Sekadar Rekan Belajar
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
              Tiga tahun bukan waktu yang singkat. Dimulai dari rasa canggung saat pertama kali menginjakkan kaki di laboratorium komputer, hingga akhirnya menjadi tempat di mana kita bisa berkreasi dan tertawa lepas tanpa beban.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Di balik setiap tantangan koding dan proyek gim, selalu ada canda yang menghidupkan suasana, saling bantu saat ada bug yang sulit dipecahkan, dan persahabatan yang membuat setiap hari terasa berarti. Tiga puluh satu karakter berbeda yang tumbuh menjadi satu kesatuan yang solid.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>SMK NEGERI 1 BERINGIN</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">STATUS: COMPLETED // 2026</span>
          </div>
        </div>

        {/* Card 2: Wali Kelas / Lead Mentor (5 Cols) */}
        <div
          onMouseEnter={() => playBlip(800)}
          className="about-arcade-card md:col-span-5 arcade-card hud-corner p-7 sm:p-9 flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs mb-5 border border-amber-500/30">
              <Trophy className="w-3.5 h-3.5" />
              <span>LEAD INSTRUCTOR // WALI KELAS</span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-mono font-black text-xl shadow-md shrink-0">
                VS
              </div>
              <div>
                <h4 className="text-lg font-heading font-black text-slate-900 dark:text-white leading-tight">
                  Vevy Sisnia, S.Kom.
                </h4>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                  Pembimbing Kelas XII PPLG 3
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/90 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed font-medium">
                &ldquo;Bukan cuma tentang apa yang sudah kalian capai di kelas, tapi tentang bagaimana 31 anak ini saling menjaga kekompakan dan persaudaraan. Tetaplah rendah hati dan saling menyapa di mana pun kalian berada nanti.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-5 mt-5 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>MENTOR INTEL</span>
            <span className="text-amber-600 dark:text-amber-400">Ibu Vevy Sisnia, S.Kom.</span>
          </div>
        </div>
      </div>

      {/* 4 Tech Stat Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onMouseEnter={() => playBlip(700)}
          className="about-arcade-card arcade-card p-4 text-center flex flex-col items-center hud-corner"
        >
          <Users className="w-5 h-5 text-cyan-500 mb-2" />
          <span className="font-heading font-black text-2xl text-slate-900 dark:text-white">31</span>
          <span className="text-xs font-mono text-slate-500">Siswa Berkarakter</span>
        </div>

        <div
          onMouseEnter={() => playBlip(750)}
          className="about-arcade-card arcade-card p-4 text-center flex flex-col items-center hud-corner"
        >
          <Code2 className="w-5 h-5 text-purple-500 mb-2" />
          <span className="font-heading font-black text-2xl text-slate-900 dark:text-white">100%</span>
          <span className="text-xs font-mono text-slate-500">PPLG Bersatu</span>
        </div>

        <div
          onMouseEnter={() => playBlip(800)}
          className="about-arcade-card arcade-card p-4 text-center flex flex-col items-center hud-corner"
        >
          <Shield className="w-5 h-5 text-emerald-500 mb-2" />
          <span className="font-heading font-black text-2xl text-slate-900 dark:text-white">3 Tahun</span>
          <span className="text-xs font-mono text-slate-500">Perjalanan Penuh Cerita</span>
        </div>

        <div
          onMouseEnter={() => playBlip(850)}
          className="about-arcade-card arcade-card p-4 text-center flex flex-col items-center hud-corner"
        >
          <Award className="w-5 h-5 text-amber-500 mb-2" />
          <span className="font-heading font-black text-2xl text-slate-900 dark:text-white">2026</span>
          <span className="text-xs font-mono text-slate-500">Tahun Kelulusan</span>
        </div>
      </div>
    </section>
  );
}
