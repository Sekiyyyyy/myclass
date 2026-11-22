import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AboutClass } from "@/components/sections/AboutClass";
import { StudentProfiles } from "@/components/sections/StudentProfiles";
import { ClassStructure } from "@/components/sections/ClassStructure";
import { Footer } from "@/components/sections/Footer";
import { Marquee } from "@/components/animated/Marquee";
import { students, CLASS_INFO } from "@/data/students";
import { Instagram, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden transition-colors duration-200">
      {/* 1. 16-Bit Pixel HUD Navbar */}
      <Navbar />

      {/* 2. Hero Cartridge Cover (Logo on Left + Theme-Aware Pixel Sky) */}
      <Hero />

      {/* Crisp 16-Bit Pixel Dither Divider */}
      <div className="pixel-dither-strip" aria-hidden="true" />

      {/* 3. Profil & Spesifikasi Kelas */}
      <AboutClass />

      {/* 4. Slow, Readable Pixel Roster Strip (Authentic Names Only) */}
      <div className="border-y-3 border-[var(--border-hard)] bg-[var(--bg-inset)] py-4 my-4 space-y-3 overflow-hidden select-none">
        <Marquee speed={75} direction="left" pauseOnHover={true}>
          {students.slice(0, 16).map((s) => (
            <div key={s.id} className="pixel-pill whitespace-nowrap mx-1.5">
              <span className="px-1.5 py-0.5 bg-[#FACC15] text-[#181624] font-pixel text-[8px] font-bold border border-[#181624]">
                #{s.id}
              </span>
              <span className="font-silk font-bold text-xs text-[var(--fg-primary)] uppercase tracking-wide">
                {s.name}
              </span>
              {s.role && (
                <span className="px-1.5 py-0.5 bg-[#5B46C8] text-white font-pixel text-[7px] uppercase">
                  {s.role}
                </span>
              )}
            </div>
          ))}
        </Marquee>

        <Marquee speed={80} direction="right" pauseOnHover={true}>
          {students.slice(16, 31).map((s) => (
            <div key={s.id} className="pixel-pill whitespace-nowrap mx-1.5">
              <span className="px-1.5 py-0.5 bg-[#FACC15] text-[#181624] font-pixel text-[8px] font-bold border border-[#181624]">
                #{s.id}
              </span>
              <span className="font-silk font-bold text-xs text-[var(--fg-primary)] uppercase tracking-wide">
                {s.name}
              </span>
              {s.role && (
                <span className="px-1.5 py-0.5 bg-[#5B46C8] text-white font-pixel text-[7px] uppercase">
                  {s.role}
                </span>
              )}
            </div>
          ))}
        </Marquee>
      </div>

      {/* 5. Daftar 31 Siswa (Interactive Character Roster & Dossier Modal) */}
      <StudentProfiles />

      {/* Crisp 16-Bit Pixel Dither Divider */}
      <div className="pixel-dither-strip" aria-hidden="true" />

      {/* 6. Struktur Organisasi & Kepengurusan Kelas */}
      <ClassStructure />

      {/* 7. Authentic Official Archive Banner (Replaces Fake Stock Photo Gallery) */}
      <section className="px-4 sm:px-6 pb-20 max-w-6xl mx-auto select-none">
        <div className="pixel-box overflow-hidden">
          <div className="pixel-titlebar">
            <span className="font-pixel text-[9px] text-[var(--fg-primary)]">
              ARSIP_DOKUMENTASI.LNK
            </span>
            <span className="font-silk text-[10px] font-bold text-[var(--fg-muted)]">
              INSTAGRAM RESMI
            </span>
          </div>
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-pixel text-sm sm:text-base text-[var(--fg-primary)] leading-relaxed mb-2">
                Foto &amp; Dokumentasi Kegiatan Kelas
              </h2>
              <p className="font-sans text-sm text-[var(--fg-secondary)] leading-relaxed">
                Seluruh dokumentasi asli kegiatan, momen di sekolah, dan arsip
                foto bersama kelas {CLASS_INFO.name} tersimpan di akun Instagram
                resmi kelas kami.
              </p>
            </div>
            <a
              href={CLASS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn pixel-btn-primary shrink-0"
            >
              <Instagram className="w-3.5 h-3.5 mr-2 shrink-0" />
              <span>@{CLASS_INFO.instagramHandle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
