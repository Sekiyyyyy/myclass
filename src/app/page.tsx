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
    <main className="min-h-screen relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Minimalist Glass Dock Navbar with Theme Switcher */}
      <Navbar />

      {/* 2. Hero Section with Class Overview */}
      <Hero />

      {/* 3. Section: Tentang XII PPLG 3 & Wali Kelas */}
      <AboutClass />

      {/* 4. Elegant Clean Running Marquee of Student Names */}
      <div className="py-4 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xs overflow-hidden my-4 space-y-2.5">
        <Marquee speed={32} direction="left">
          {students.slice(0, 16).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs whitespace-nowrap mx-1.5 shadow-xs font-medium"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold flex items-center justify-center">
                #{s.id}
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{s.name}</span>
              <span className="text-slate-400 text-[11px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>

        <Marquee speed={36} direction="right">
          {students.slice(16, 31).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs whitespace-nowrap mx-1.5 shadow-xs font-medium"
            >
              <span className="w-5 h-5 rounded-full bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 font-mono text-[10px] font-bold flex items-center justify-center">
                #{s.id}
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{s.name}</span>
              <span className="text-slate-400 text-[11px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 5. 31 Students Showcase with Interactive Cards & Detail Modal */}
      <StudentProfiles />

      {/* 6. Photo Gallery */}
      <Gallery />

      {/* 7. Memory Board & Messages */}
      <Messages />

      {/* 8. Modern Footer */}
      <Footer />
    </main>
  );
}
