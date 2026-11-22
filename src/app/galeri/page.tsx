import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { MemoriesFullGallery } from "@/components/sections/MemoriesFullGallery";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Galeri Kenangan — XII PPLG 3 | SMK Negeri 1 Beringin",
  description:
    "Album lengkap foto dan video kebersamaan kelas XII PPLG 3 SMK Negeri 1 Beringin Angkatan 2026.",
};

export default function GaleriPage() {
  return (
    <main className="min-h-screen relative overflow-x-clip transition-colors duration-200 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <MemoriesFullGallery />
      </div>
      <Footer />
    </main>
  );
}
