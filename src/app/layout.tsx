import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { GrainOverlay } from "@/components/layout/GrainOverlay";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XII PPLG 3 — SMK Negeri 1 Beringin | Class Yearbook & Portal",
  description:
    "Portal resmi dan album kenangan digital kelas XII PPLG 3 SMK Negeri 1 Beringin (Angkatan 2026). Merangkum kisah, karya, karya game & software, dan persahabatan abadi.",
  keywords: [
    "XII PPLG 3",
    "SMK Negeri 1 Beringin",
    "PPLG",
    "Software Engineering",
    "Class Yearbook",
    "Beringin",
    "Angkatan 2026"
  ],
  authors: [{ name: "Keluarga Besar XII PPLG 3" }],
  openGraph: {
    title: "XII PPLG 3 — SMK Negeri 1 Beringin",
    description: "A warm, film-grain scrapbook that breathes. Album kenangan digital kami.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FFFDF7] text-[#1C1917] font-sans antialiased selection:bg-amber-200 selection:text-amber-900 relative overflow-x-hidden">
        <GrainOverlay />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
