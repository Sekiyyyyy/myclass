import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AboutClass } from "@/components/sections/AboutClass";
import { StudentProfiles } from "@/components/sections/StudentProfiles";
import { Gallery } from "@/components/sections/Gallery";
import { Messages } from "@/components/sections/Messages";
import { Footer } from "@/components/sections/Footer";
import { Marquee } from "@/components/animated/Marquee";
import { students } from "@/data/students";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200">
      {/* 1. Pixel Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Section: Tentang Kelas & Wali Kelas */}
      <AboutClass />

      {/* 4. Running Marquee Nama Siswa - Calm Readable Speed */}
      <div className="py-5 border-y-4 border-slate-900 dark:border-black bg-amber-500/10 dark:bg-[#070a12] overflow-hidden my-6 space-y-3.5 select-none">
        <Marquee speed={65} direction="left" pauseOnHover={true}>
          {students.slice(0, 16).map((s) => (
            <div
              key={s.id}
              className="pixel-pill whitespace-nowrap mx-2 transition-transform hover:scale-105"
            >
              <span className="px-2 py-0.5 bg-[#FBBF24] text-slate-950 font-pixel text-[9px] font-bold border border-slate-950 shadow-[1px_1px_0px_#000]">
                #{s.id}
              </span>
              <span className="text-amber-500 font-pixel text-[10px]">■</span>
              <span className="font-silk font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                {s.name}
              </span>
              <span className="font-silk text-amber-600 dark:text-amber-400 font-bold text-[11px] bg-amber-400/15 dark:bg-amber-400/20 px-1.5 py-0.5 border border-amber-500/30">
                @{s.ig}
              </span>
            </div>
          ))}
        </Marquee>

        <Marquee speed={70} direction="right" pauseOnHover={true}>
          {students.slice(16, 31).map((s) => (
            <div
              key={s.id}
              className="pixel-pill whitespace-nowrap mx-2 transition-transform hover:scale-105"
            >
              <span className="px-2 py-0.5 bg-[#FBBF24] text-slate-950 font-pixel text-[9px] font-bold border border-slate-950 shadow-[1px_1px_0px_#000]">
                #{s.id}
              </span>
              <span className="text-amber-500 font-pixel text-[10px]">■</span>
              <span className="font-silk font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                {s.name}
              </span>
              <span className="font-silk text-amber-600 dark:text-amber-400 font-bold text-[11px] bg-amber-400/15 dark:bg-amber-400/20 px-1.5 py-0.5 border border-amber-500/30">
                @{s.ig}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 5. 31 Siswa Showcase */}
      <StudentProfiles />

      {/* 6. Galeri Foto */}
      <Gallery />

      {/* 7. Pesan & Kesan */}
      <Messages />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
