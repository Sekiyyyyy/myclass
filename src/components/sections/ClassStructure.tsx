"use client";

import { useRef } from "react";
import Image from "next/image";
import { Instagram, Crown, Shield, FileText, Wallet, Award, Users } from "lucide-react";
import { useGSAP, gsap } from "@/lib/gsap-config";

interface Officer {
  id: string;
  role: string;
  name: string;
  nickname: string;
  avatar: string;
  ig: string;
  quote: string;
  icon: typeof Crown;
  badgeColor: string;
}

const officers: Officer[] = [
  {
    id: "27",
    role: "Ketua Kelas",
    name: "Rizky Alfianno",
    nickname: "Rizky",
    avatar: "/students/student-27.jpg",
    ig: "rizkyalfianno",
    quote: "Membangun ruang kenangan digital untuk 31 teman seperjuangan di XII PPLG 3.",
    icon: Crown,
    badgeColor: "bg-amber-500 text-slate-950",
  },
  {
    id: "07",
    role: "Wakil Ketua",
    name: "Dhiaurrahman Nasution",
    nickname: "Dhia",
    avatar: "/students/student-07.jpg",
    ig: "dhianst_",
    quote: "Banyak belajar hal baik di kelas ini, terutama arti kebersamaan.",
    icon: Shield,
    badgeColor: "bg-indigo-600 text-white",
  },
  {
    id: "17",
    role: "Sekretaris",
    name: "Kikio Angelia",
    nickname: "Kikio",
    avatar: "/students/student-17.jpg",
    ig: "kikio.angelia",
    quote: "Setiap goresan kenangan di kelas ini terlalu berharga untuk dilupakan.",
    icon: FileText,
    badgeColor: "bg-sky-600 text-white",
  },
  {
    id: "06",
    role: "Bendahara",
    name: "Dara Khairunisa Annida",
    nickname: "Dara",
    avatar: "/students/student-06.jpg",
    ig: "dara_annida",
    quote: "Terima kasih untuk tiga tahun yang penuh warna dan persahabatan tulus.",
    icon: Wallet,
    badgeColor: "bg-emerald-600 text-white",
  },
];

export function ClassStructure() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".structure-card-item");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
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
    <section
      id="struktur"
      ref={sectionRef}
      className="py-20 px-3 sm:px-6 max-w-6xl mx-auto relative select-none"
    >
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-slate-950 font-pixel text-[9px] font-bold border-2 border-slate-950 shadow-[2px_2px_0px_#000] mb-3">
          <Users className="w-3.5 h-3.5 text-slate-950" />
          <span>STRUKTUR KELAS</span>
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-slate-900 dark:text-white mb-3 pixel-title-shadow">
          Struktur Organisasi
        </h2>
        <p className="font-silk text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-bold uppercase">
          Kepengurusan Kelas XII PPLG 3 Periode 2023 &ndash; 2026
        </p>
      </div>

      {/* Tier 1: Wali Kelas */}
      <div className="structure-card-item max-w-md mx-auto mb-10">
        <div className="student-card-box p-4 sm:p-5 text-center relative overflow-hidden group">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 text-white font-pixel text-[9px] font-bold border border-slate-950 shadow-[2px_2px_0px_#000] mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>WALI KELAS</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-950 text-amber-400 font-pixel text-xl sm:text-2xl font-bold flex items-center justify-center border-2 border-slate-800 shadow-[3px_3px_0px_#000] shrink-0">
              VS
            </div>
            <div>
              <h3 className="font-pixel text-sm sm:text-base text-slate-900 dark:text-white mb-1">
                Vevy Sisnia, S.Kom.
              </h3>
              <p className="font-silk text-[10px] text-amber-500 dark:text-amber-400 font-bold uppercase mb-2">
                Guru Pembimbing &amp; Wali Kelas
              </p>
              <p className="font-sans text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;Menjaga kekompakan, integritas, dan mengantarkan 31 siswa hebat menuju masa depan gemilang.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connecting Indicator */}
      <div className="flex justify-center mb-6">
        <div className="font-pixel text-xs text-amber-500 font-bold">
          [ ▼ PENGURUS KELAS ▼ ]
        </div>
      </div>

      {/* Tier 2: 4 Pengurus Kelas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {officers.map((officer) => {
          const Icon = officer.icon;
          return (
            <div
              key={officer.id}
              className="structure-card-item student-card-box group flex flex-col justify-between p-3.5 overflow-hidden transition-transform hover:-translate-y-1.5"
            >
              <div>
                {/* Role Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${officer.badgeColor} font-pixel text-[8px] font-bold border border-slate-950 shadow-[1px_1px_0px_#000]`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="uppercase">{officer.role}</span>
                  </div>
                  <span className="font-pixel text-[9px] text-slate-500 dark:text-slate-400 font-bold">
                    #{officer.id}
                  </span>
                </div>

                {/* Photo Frame (Neutral Slate Bezel) */}
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-3 bg-[#0A0E18] pixel-frame-neutral shadow-[2px_2px_0px_#000]">
                  <Image
                    src={officer.avatar}
                    alt={officer.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 bg-[#080C14]/90 text-white font-pixel text-[8px] font-bold border border-slate-700/80 shadow-[1px_1px_0px_#000]">
                    ABSEN #{officer.id}
                  </div>
                </div>

                {/* Name & Nickname */}
                <h3 className="font-silk font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate mb-0.5">
                  {officer.name}
                </h3>
                <p className="font-pixel text-[8px] text-slate-500 dark:text-slate-400 font-bold mb-2">
                  [{officer.nickname}]
                </p>

                {/* Quote */}
                <p className="font-sans text-[11px] text-slate-700 dark:text-slate-300 italic leading-relaxed line-clamp-3 mb-3">
                  &ldquo;{officer.quote}&rdquo;
                </p>
              </div>

              {/* Instagram Link */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] font-silk">
                <a
                  href={`https://instagram.com/${officer.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 truncate max-w-[85%] font-bold transition-colors"
                >
                  <Instagram className="w-3 h-3 shrink-0" />
                  <span className="truncate">@{officer.ig}</span>
                </a>
                <span className="text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all font-bold">
                  &gt;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
