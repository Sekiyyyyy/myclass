import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AmbientBubbles } from "@/components/layout/AmbientBubbles";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XII PPLG 3 — SMK Negeri 1 Beringin | Class Yearbook & Portal",
  description:
    "Portal resmi dan album kenangan digital kelas XII PPLG 3 SMK Negeri 1 Beringin (Angkatan 2026). Merangkum kisah, karya game & software, dan persahabatan abadi.",
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
    description: "Ruang kebersamaan 31 siswa XII PPLG 3 SMK Negeri 1 Beringin.",
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
    <html lang="id" className={`${nunito.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans antialiased selection:bg-[#BAE6FD] selection:text-[#0369A1] relative overflow-x-hidden">
        <AmbientBubbles />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
