import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PixelBackground } from "@/components/layout/PixelBackground";
import { ThemeProvider } from "@/lib/theme-provider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XII PPLG 3 — Pixel Arcade Edition | SMKN 1 Beringin",
  description:
    "Portal digital resmi dan buku kenangan bergaya Pixel Arcade kelas XII PPLG 3 SMK Negeri 1 Beringin (Angkatan 2026). 31 Siswa Rekayasa Perangkat Lunak dan Gim.",
  keywords: [
    "XII PPLG 3",
    "SMK Negeri 1 Beringin",
    "PPLG",
    "Pixel Arcade",
    "Retro Game",
    "Angkatan 2026"
  ],
  authors: [{ name: "Keluarga Besar XII PPLG 3" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${jakarta.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200">
        <ThemeProvider>
          <PixelBackground />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
