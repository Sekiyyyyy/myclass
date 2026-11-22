import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "@/lib/theme-provider";
import { MotionProvider } from "@/components/layout/MotionProvider";

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
  title: "XII PPLG 3 — Buku Kenangan Digital | SMK Negeri 1 Beringin",
  description:
    "Arsip digital dan buku kenangan kelas XII PPLG 3 SMK Negeri 1 Beringin (Angkatan 2026). 31 Siswa Pengembangan Perangkat Lunak dan Gim.",
  keywords: [
    "XII PPLG 3",
    "SMK Negeri 1 Beringin",
    "PPLG",
    "Eterna PPLG Three",
    "Angkatan 2026",
  ],
  authors: [{ name: "Rizky Alfianno" }],
  creator: "Rizky Alfianno",
};

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('pplg3_theme');
    var root = document.documentElement;
    if (saved === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${jakarta.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen transition-colors duration-200">
        <ThemeProvider>
          <MotionProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
