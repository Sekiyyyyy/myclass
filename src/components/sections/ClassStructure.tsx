"use client";

import { useRef } from "react";
import Image from "next/image";
import { Crown, Shield, FileText, Wallet, Award } from "lucide-react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { CLASS_INFO } from "@/data/students";

interface Officer {
  id: string;
  role: string;
  name: string;
  nickname: string;
  avatar: string;
  icon: typeof Crown;
  featured?: boolean;
}

const officers: Officer[] = [
  {
    id: "27",
    role: "Ketua Kelas",
    name: "Rizky Alfianno",
    nickname: "Rizky",
    avatar: "/students/student-27.jpg",
    icon: Crown,
    featured: true,
  },
  {
    id: "07",
    role: "Wakil Ketua",
    name: "Dhiaurrahman Nasution",
    nickname: "Dhia",
    avatar: "/students/student-07.jpg",
    icon: Shield,
  },
  {
    id: "17",
    role: "Sekretaris",
    name: "Kikio Angelia",
    nickname: "Kikio",
    avatar: "/students/student-17.jpg",
    icon: FileText,
  },
  {
    id: "06",
    role: "Bendahara",
    name: "Dara Khairunisa Annida",
    nickname: "Dara",
    avatar: "/students/student-06.jpg",
    icon: Wallet,
  },
];

export function ClassStructure() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = sectionRef.current?.querySelectorAll(".structure-card-item");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: "steps(4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
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
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto relative select-none"
    >
      {/* Left-Aligned Section Header */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[var(--border-soft)] pb-5">
        <div>
          <p className="font-pixel text-[9px] sm:text-[10px] text-[var(--accent-indigo)] dark:text-[#FACC15] tracking-widest uppercase mb-2">
            03 // STRUKTUR KELAS
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-[var(--fg-primary)] leading-snug pixel-title-shadow">
            Kepengurusan Kelas
          </h2>
        </div>
        <p className="font-silk text-xs text-[var(--fg-muted)] font-bold uppercase">
          {CLASS_INFO.name} &bull; Periode {CLASS_INFO.period}
        </p>
      </div>

      {/* Tier 1: Wali Kelas */}
      <div className="structure-card-item max-w-md mx-auto">
        <div className="pixel-box overflow-hidden">
          <div className="pixel-titlebar">
            <div className="inline-flex items-center gap-1.5 font-pixel text-[9px] text-[var(--fg-primary)]">
              <Award className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
              <span>WALI KELAS</span>
            </div>
            <span className="font-pixel text-[8px] text-[var(--fg-muted)]">
              PEMBIMBING
            </span>
          </div>

          <div className="p-5 flex items-center gap-4">
            <div className="w-16 h-16 bg-[#5B46C8] dark:bg-[#23203A] text-white dark:text-[#FACC15] font-pixel text-lg font-bold flex items-center justify-center border-2 border-[#181624] dark:border-[#9D8BF4] shadow-[3px_3px_0px_#181624] dark:shadow-[3px_3px_0px_#07060D] shrink-0">
              VS
            </div>
            <div className="min-w-0">
              <h3 className="font-pixel text-xs sm:text-sm text-[var(--fg-primary)] leading-snug mb-1.5">
                {CLASS_INFO.homeroomTeacher}
              </h3>
              <p className="font-silk text-xs text-[var(--accent-indigo)] dark:text-[#FACC15] font-bold uppercase">
                Wali Kelas {CLASS_INFO.name}
              </p>
              <p className="font-silk text-[10px] text-[var(--fg-muted)] mt-1">
                {CLASS_INFO.school}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* True Pixel-Exact Stepped Org-Chart Tree Connectors */}
      <div aria-hidden="true" className="flex flex-col items-center">
        {/* Vertical stem from Wali Kelas */}
        <div className="w-[3px] h-7 bg-[var(--border-hard)]" />

        {/* Desktop pixel-exact 4-way branch aligned to exact column centers */}
        <div className="hidden lg:grid lg:grid-cols-4 w-full">
          {officers.map((officer, idx) => (
            <div key={officer.id} className="relative h-7 flex justify-center">
              {/* Horizontal connector bar */}
              <div
                className={`absolute top-0 h-[3px] bg-[var(--border-hard)] ${
                  idx === 0
                    ? "left-1/2 right-0"
                    : idx === officers.length - 1
                      ? "left-0 right-1/2"
                      : "left-0 right-0"
                }`}
              />
              {/* Vertical drop stem */}
              <div className="w-[3px] h-full bg-[var(--border-hard)]" />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet compact label bridge */}
        <div className="lg:hidden px-3 py-1 bg-[var(--bg-inset)] border-2 border-[var(--border-hard)] font-pixel text-[8px] text-[var(--fg-primary)] mb-5 shadow-[2px_2px_0px_var(--shadow-hard)]">
          PENGURUS INTI
        </div>
      </div>

      {/* Tier 2: 4 Core Class Officers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {officers.map((officer) => {
          const Icon = officer.icon;
          return (
            <div
              key={officer.id}
              className="structure-card-item student-card-box group flex flex-col justify-between overflow-hidden"
            >
              {/* Cohesive Role Header Bar */}
              <div
                className={`px-3 py-2 flex items-center justify-between border-b-2 border-[var(--border-hard)] ${
                  officer.featured
                    ? "bg-[#FACC15] text-[#181624]"
                    : "bg-[#5B46C8] text-white dark:bg-[#23203A] dark:text-[#F4F1FA]"
                }`}
              >
                <div className="inline-flex items-center gap-1.5 font-pixel text-[8px] font-bold uppercase">
                  <Icon className="w-3 h-3 shrink-0" />
                  <span>{officer.role}</span>
                </div>
                <span className="font-pixel text-[8px] opacity-85">
                  #{officer.id}
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                {/* Framed Studio Portrait */}
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-3 pixel-frame-portrait p-[2px]">
                  <div className="relative w-full h-full overflow-hidden bg-[#181624]">
                    <Image
                      src={officer.avatar}
                      alt={officer.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-300 ease-out"
                    />
                  </div>
                </div>

                {/* Authentic Identity Only */}
                <div>
                  <h3 className="font-silk font-bold text-xs sm:text-sm text-[var(--fg-primary)] leading-snug mb-1">
                    {officer.name}
                  </h3>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border-soft)] font-pixel text-[8px] text-[var(--fg-muted)]">
                    <span>{officer.nickname}</span>
                    <span>ABSEN #{officer.id}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
