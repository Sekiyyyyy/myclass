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
      {/* 1. Pixel Arcade Scoreboard / Navbar */}
      <Navbar />

      {/* 2. Hero Section: Start Stage */}
      <Hero />

      {/* 3. Section: Quest Log & Wali Kelas */}
      <AboutClass />

      {/* 4. Retro Pixel Character Marquee Ribbon */}
      <div className="py-3.5 border-y-2 border-slate-300 dark:border-slate-800 bg-amber-500/10 dark:bg-slate-900/60 overflow-hidden my-4 space-y-2 select-none">
        <Marquee speed={28} direction="left">
          {students.slice(0, 16).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-3 py-1 rounded pixel-box bg-white dark:bg-[#111827] text-xs font-silk whitespace-nowrap mx-1.5 shadow-xs"
            >
              <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-pixel text-[8px] font-bold">
                #{s.id}
              </span>
              <span className="font-bold text-slate-900 dark:text-white uppercase">{s.name}</span>
              <span className="text-amber-500 text-[10px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>

        <Marquee speed={32} direction="right">
          {students.slice(16, 31).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-3 py-1 rounded pixel-box bg-white dark:bg-[#111827] text-xs font-silk whitespace-nowrap mx-1.5 shadow-xs"
            >
              <span className="px-1.5 py-0.5 rounded bg-sky-500 text-white font-pixel text-[8px] font-bold">
                #{s.id}
              </span>
              <span className="font-bold text-slate-900 dark:text-white uppercase">{s.name}</span>
              <span className="text-sky-500 text-[10px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 5. Character Select Roster (31 Siswa) */}
      <StudentProfiles />

      {/* 6. Photo Gallery */}
      <Gallery />

      {/* 7. Guestbook & Messages */}
      <Messages />

      {/* 8. Retro Footer */}
      <Footer />
    </main>
  );
}
