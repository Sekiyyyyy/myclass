"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { Instagram, ArrowUpRight, Terminal, FolderOpen } from "lucide-react";
import { CLASS_INFO } from "@/data/students";

const classSpecs = [
  { label: "KELAS", value: CLASS_INFO.name },
  { label: "ANGKATAN", value: `${CLASS_INFO.batchName} (${CLASS_INFO.period})` },
  { label: "JURUSAN", value: CLASS_INFO.major },
  { label: "SEKOLAH", value: CLASS_INFO.school },
  { label: "WILAYAH", value: CLASS_INFO.region },
  { label: "WALI KELAS", value: CLASS_INFO.homeroomTeacher },
  { label: "RUANG LAB", value: CLASS_INFO.lab },
  { label: "JUMLAH SISWA", value: `${CLASS_INFO.totalStudents} Orang` },
];

export function AboutClass() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const panels = sectionRef.current?.querySelectorAll(".about-panel");
      if (!panels || panels.length === 0) return;

      gsap.fromTo(
        panels,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.1,
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
      id="tentang"
      ref={sectionRef}
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto relative select-none"
    >
      {/* Left-Aligned Editorial Section Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[var(--border-soft)] pb-5">
        <div>
          <p className="font-pixel text-[9px] sm:text-[10px] text-[var(--accent-indigo)] dark:text-[#FACC15] tracking-widest uppercase mb-2">
            01 // PROFIL KELAS
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-[var(--fg-primary)] leading-snug pixel-title-shadow">
            Tentang {CLASS_INFO.name}
          </h2>
        </div>
        <p className="font-silk text-xs text-[var(--fg-muted)] font-bold uppercase">
          {CLASS_INFO.school} &bull; {CLASS_INFO.period}
        </p>
      </div>

      {/* Asymmetric 12-Column Retro Window Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Window: Class Overview (7 Cols) */}
        <div className="about-panel lg:col-span-7">
          <div className="pixel-box h-full flex flex-col">
            {/* Retro OS Window Titlebar */}
            <div className="pixel-titlebar">
              <div className="flex items-center gap-2 font-pixel text-[9px] text-[var(--fg-primary)]">
                <FolderOpen className="w-3.5 h-3.5 text-[var(--accent-indigo)] dark:text-[#FACC15]" />
                <span>PROFIL_KELAS.TXT</span>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 bg-[var(--accent-gold)] border border-[#181624]" />
                <span className="w-2.5 h-2.5 bg-[var(--accent-indigo)] border border-[#181624]" />
                <span className="w-2.5 h-2.5 bg-[var(--accent-crimson)] border border-[#181624]" />
              </div>
            </div>

            {/* Body Content */}
            <div className="p-5 sm:p-7 flex flex-col justify-between flex-1 gap-6">
              <div className="space-y-4">
                <h3 className="font-pixel text-sm sm:text-base text-[var(--fg-primary)] leading-relaxed">
                  Tiga Tahun di Ruang {CLASS_INFO.lab}
                </h3>

                <p className="font-sans text-sm text-[var(--fg-secondary)] leading-relaxed">
                  {CLASS_INFO.name} adalah rombongan belajar jurusan{" "}
                  <strong className="text-[var(--fg-primary)] font-semibold">
                    {CLASS_INFO.major}
                  </strong>{" "}
                  di {CLASS_INFO.school}, {CLASS_INFO.region}. Beranggotakan{" "}
                  {CLASS_INFO.totalStudents} siswa yang menempuh perjalanan
                  belajar dari kelas X hingga kelas XII bersama Ibu{" "}
                  <strong className="text-[var(--fg-primary)] font-semibold">
                    {CLASS_INFO.homeroomTeacher}
                  </strong>
                  .
                </p>

                <p className="font-sans text-sm text-[var(--fg-secondary)] leading-relaxed">
                  Website ini dibuat sebagai arsip digital sederhana untuk
                  menyimpan daftar lengkap anggota kelas dan struktur
                  kepengurusan kami agar tetap bisa dibuka kembali kapan saja
                  setelah kelulusan tahun {CLASS_INFO.year}.
                </p>
              </div>

              {/* Official Class Instagram Bar */}
              <div className="pt-4 border-t-2 border-dashed border-[var(--border-soft)] flex flex-wrap items-center justify-between gap-3">
                <span className="font-silk text-[11px] font-bold text-[var(--fg-muted)] uppercase">
                  Arsip Resmi Kelas
                </span>
                <a
                  href={CLASS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-inset)] hover:bg-[#5B46C8] hover:text-white dark:hover:bg-[#FACC15] dark:hover:text-[#181624] border-2 border-[var(--border-hard)] font-silk text-[11px] font-bold text-[var(--fg-primary)] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 shrink-0" />
                  <span>@{CLASS_INFO.instagramHandle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Window: Authentic Class Data Spec Sheet (5 Cols) */}
        <div className="about-panel lg:col-span-5">
          <div className="pixel-box h-full flex flex-col">
            <div className="pixel-titlebar">
              <div className="flex items-center gap-2 font-pixel text-[9px] text-[var(--fg-primary)]">
                <Terminal className="w-3.5 h-3.5 text-[var(--accent-indigo)] dark:text-[#FACC15]" />
                <span>DATA_KELAS.DAT</span>
              </div>
              <span className="font-silk text-[9px] font-bold text-[var(--fg-muted)]">
                READ-ONLY
              </span>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
              <dl className="divide-y-2 divide-dashed divide-[var(--border-soft)]">
                {classSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-baseline justify-between gap-4"
                  >
                    <dt className="font-pixel text-[8px] sm:text-[9px] text-[var(--fg-muted)] shrink-0">
                      {spec.label}
                    </dt>
                    <dd className="font-silk text-xs font-bold text-[var(--fg-primary)] text-right">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
