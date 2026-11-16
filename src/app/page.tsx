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
    <main className="min-h-screen relative overflow-hidden bg-[#F4F7FC] text-slate-800">
      {/* 1. Sleek Floating Clay Dock Navbar */}
      <Navbar />

      {/* 2. Hero with Duolingo-inspired Clay Badges & Tactile 3D Buttons */}
      <Hero />

      {/* 3. Section 2: Tentang XII PPLG 3 (Kisah & Kebersamaan) */}
      <AboutClass />

      {/* 4. Dual-directional Running Clay Marquee Ribbons */}
      <div className="py-6 border-y-2 border-slate-200/60 bg-white/60 backdrop-blur-sm overflow-hidden my-6 space-y-3">
        <Marquee speed={36} direction="left">
          {students.slice(0, 16).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-slate-100 border-b-[3px] border-b-slate-200 shadow-sm text-xs font-heading font-extrabold text-slate-800 whitespace-nowrap mx-1.5 hover:border-[#58CC02] hover:border-b-[#46A302] transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#58CC02] flex items-center justify-center text-[10px] font-black">
                {s.id.replace("std-", "")}
              </span>
              <span className="text-slate-900">{s.name}</span>
              <span className="text-sky-600 font-bold text-[11px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>

        <Marquee speed={40} direction="right">
          {students.slice(16, 31).map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-slate-100 border-b-[3px] border-b-slate-200 shadow-sm text-xs font-heading font-extrabold text-slate-800 whitespace-nowrap mx-1.5 hover:border-[#1CB0F6] hover:border-b-[#1899D6] transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-sky-100 text-[#1CB0F6] flex items-center justify-center text-[10px] font-black">
                {s.id.replace("std-", "")}
              </span>
              <span className="text-slate-900">{s.name}</span>
              <span className="text-sky-600 font-bold text-[11px]">@{s.ig}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 5. 31 Siswa with Soft Claymorphism Cards */}
      <StudentProfiles />

      {/* 6. Multi-Column Parallax Photo Gallery */}
      <Gallery />

      {/* 7. Catatan & Kesan Kenangan */}
      <Messages />

      {/* 8. Playful Clay Footer */}
      <Footer />
    </main>
  );
}
