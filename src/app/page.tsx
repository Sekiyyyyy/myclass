import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AboutClass } from "@/components/sections/AboutClass";
import { StudentProfiles } from "@/components/sections/StudentProfiles";
import { ClassStructure } from "@/components/sections/ClassStructure";
import { ArchiveBanner } from "@/components/sections/ArchiveBanner";
import { Footer } from "@/components/sections/Footer";
import { Marquee } from "@/components/animated/Marquee";
import { students } from "@/data/students";

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

      {/* 5. Daftar 31 Siswa (Motion Layout Grid & Animated Dossier Modal) */}
      <StudentProfiles />

      {/* Crisp 16-Bit Pixel Dither Divider */}
      <div className="pixel-dither-strip" aria-hidden="true" />

      {/* 6. Struktur Organisasi & Kepengurusan Kelas */}
      <ClassStructure />

      {/* 7. Authentic Official Archive Banner */}
      <ArchiveBanner />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
