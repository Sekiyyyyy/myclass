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
    <main className="min-h-screen relative overflow-hidden bg-[#FAFAF9] text-stone-900">
      {/* 1. Sleek Floating Dock Navbar */}
      <Navbar />

      {/* 2. Hero with Atmospheric Blended Background Image */}
      <Hero />

      {/* 3. Section 2: Tentang XII PPLG 3 (Kisah & Kebersamaan) */}
      <AboutClass />

      {/* 4. Dual-directional Running Marquee Ribbons */}
      <div className="py-6 border-y border-stone-200/60 bg-white/50 backdrop-blur-xs overflow-hidden my-6 space-y-2.5">
        <Marquee speed={36} direction="left">
          {students.slice(0, 16).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-xs text-xs text-stone-700 font-medium whitespace-nowrap mx-1.5 hover:border-amber-400/80 transition-colors"
            >
              <span className="font-bold text-stone-900">{s.name}</span>
              <span className="text-stone-400 font-mono text-[11px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>

        <Marquee speed={40} direction="right">
          {students.slice(16, 31).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-xs text-xs text-stone-700 font-medium whitespace-nowrap mx-1.5 hover:border-amber-400/80 transition-colors"
            >
              <span className="font-bold text-stone-900">{s.name}</span>
              <span className="text-stone-400 font-mono text-[11px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 5. 31 Siswa with Clear Photo Cards */}
      <StudentProfiles />

      {/* 6. Multi-Column Parallax Photo Gallery */}
      <Gallery />

      {/* 7. Catatan & Kesan */}
      <Messages />

      {/* 8. Minimal Modern Footer */}
      <Footer />
    </main>
  );
}
