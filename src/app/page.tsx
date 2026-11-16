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
    <main className="min-h-screen relative overflow-hidden bg-[#F8FAFC] dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Tactical HUD Dock Navbar with Theme & Audio SFX Toggles */}
      <Navbar />

      {/* 2. Hero with Cyber Horizon & Roster Overview */}
      <Hero />

      {/* 3. Section 2: Tentang XII PPLG 3 (Dossier & Quest Log) */}
      <AboutClass />

      {/* 4. Dual-directional Running Roster Marquee Ribbons */}
      <div className="py-5 border-y border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xs overflow-hidden my-6 space-y-2.5">
        <Marquee speed={36} direction="left">
          {students.slice(0, 16).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-mono whitespace-nowrap mx-1.5 hover:border-cyan-500 transition-colors shadow-xs"
            >
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-[10px]">
                P-{s.id}
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
              <span className="text-slate-400 font-mono text-[11px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>

        <Marquee speed={40} direction="right">
          {students.slice(16, 31).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-mono whitespace-nowrap mx-1.5 hover:border-purple-500 transition-colors shadow-xs"
            >
              <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-[10px]">
                P-{s.id}
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
              <span className="text-slate-400 font-mono text-[11px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 5. 31 Siswa Character Roster Select Screen */}
      <StudentProfiles />

      {/* 6. Multi-Column Parallax Photo Gallery */}
      <Gallery />

      {/* 7. Comm-Link Messages */}
      <Messages />

      {/* 8. Modern Terminal Footer */}
      <Footer />
    </main>
  );
}
