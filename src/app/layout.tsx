import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CyberGridBackground } from "@/components/layout/CyberGridBackground";
import { ThemeProvider } from "@/lib/theme-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XII PPLG 3 — SMK Negeri 1 Beringin | Arcade Roster & Digital Portal",
  description:
    "Portal resmi dan arsip digital kelas XII PPLG 3 SMK Negeri 1 Beringin (Angkatan 2026). 31 Siswa Rekayasa Perangkat Lunak dan Gim.",
  keywords: [
    "XII PPLG 3",
    "SMK Negeri 1 Beringin",
    "PPLG",
    "Software Engineering",
    "Game Engineering",
    "Arcade Modern",
    "Angkatan 2026"
  ],
  authors: [{ name: "Keluarga Besar XII PPLG 3" }],
  openGraph: {
    title: "XII PPLG 3 — SMK Negeri 1 Beringin",
    description: "Ruang digital kebersamaan 31 siswa XII PPLG 3 SMK Negeri 1 Beringin.",
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
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${jakarta.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#07090E] dark:text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-x-hidden transition-colors duration-300">
        <ThemeProvider>
          <CyberGridBackground />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
