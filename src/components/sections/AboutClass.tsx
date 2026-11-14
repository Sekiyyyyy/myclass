"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";

export function AboutClass() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".about-card-item");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
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
    { scope: sectionRef }
  );

  return (
    <section id="tentang" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-2">
          Tentang Kami
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mb-3">
          Kisah &amp; Kebersamaan
        </h2>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Tiga tahun berbagi cerita, tawa, dan mimpi di SMK Negeri 1 Beringin.
        </p>
      </div>

      {/* Two Balanced, Warm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Card 1: Cerita Kebersamaan (7 Cols) */}
        <div className="about-card-item md:col-span-7 rounded-3xl bg-white/90 backdrop-blur-md p-8 sm:p-10 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug mb-4">
              Lebih dari Sekadar Teman Sekelas
            </h3>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-4">
              Tiga tahun bukan waktu yang singkat. Dimulai dari rasa canggung saat pertama kali menginjakkan kaki di kelas, hingga akhirnya menjadi tempat di mana kita bisa tertawa lepas tanpa beban.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Di balik setiap tugas dan jam belajar, selalu ada canda yang menghidupkan suasana, saling bantu saat ada yang kesulitan, dan kebersamaan yang membuat setiap hari terasa berarti. Tiga puluh satu karakter berbeda yang tumbuh menjadi satu keluarga yang saling melengkapi.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>SMK Negeri 1 Beringin</span>
            <span className="font-medium text-stone-700">Angkatan 2026</span>
          </div>
        </div>

        {/* Card 2: Pesan Wali Kelas (5 Cols) */}
        <div className="about-card-item md:col-span-5 rounded-3xl bg-white/90 backdrop-blur-md p-8 sm:p-10 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-4">
              Pesan Wali Kelas
            </span>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                VS
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 leading-tight">
                  Vevy Sisnia, S.Kom.
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Wali Kelas XII PPLG 3
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50/90 border border-stone-100">
              <p className="text-sm text-stone-700 italic leading-relaxed">
                &ldquo;Bukan cuma tentang apa yang sudah kalian capai di kelas, tapi tentang bagaimana 31 anak ini saling menjaga kekompakan dan persaudaraan. Tetaplah rendah hati dan saling menyapa di mana pun kalian berada nanti.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-stone-100 text-xs text-stone-500">
            <span>Deli Serdang, Sumatera Utara</span>
          </div>
        </div>
      </div>
    </section>
  );
}
