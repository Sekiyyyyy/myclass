export interface GalleryItem {
  id: string;
  title: string;
  category: "lab" | "kegiatan" | "candid" | "lapangan";
  imageUrl: string;
  caption: string;
  date: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Praktik Lab Komputer",
    category: "lab",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000",
    caption: "Pengerjaan tugas akhir perangkat lunak di Lab 2.",
    date: "Oktober 2025"
  },
  {
    id: "gal-02",
    title: "Class Meeting",
    category: "kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    caption: "Dukungan untuk tim kelas pada pekan olahraga sekolah.",
    date: "Desember 2024"
  },
  {
    id: "gal-03",
    title: "Koridor Kelas",
    category: "candid",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=900",
    caption: "Suasana santai saat istirahat siang.",
    date: "Maret 2025"
  },
  {
    id: "gal-04",
    title: "Kunjungan Industri",
    category: "lapangan",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
    caption: "Pengenalan alur kerja profesional di mitra industri.",
    date: "September 2024"
  },
  {
    id: "gal-05",
    title: "Uji Coba Aplikasi",
    category: "lab",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    caption: "Presentasi dan pengujian game di depan kelas.",
    date: "November 2024"
  },
  {
    id: "gal-06",
    title: "Kegiatan Luar Sekolah",
    category: "lapangan",
    imageUrl: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&q=80&w=900",
    caption: "Kegiatan kebersamaan dan perkemahan sekolah.",
    date: "Mei 2024"
  },
  {
    id: "gal-07",
    title: "Buka Puasa Bersama",
    category: "kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
    caption: "Pertemuan ramah tamah bersama wali kelas.",
    date: "Maret 2024"
  },
  {
    id: "gal-08",
    title: "Sesi Ujian Praktik",
    category: "lab",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    caption: "Uji kompetensi keahlian pemrograman.",
    date: "Mei 2025"
  },
  {
    id: "gal-09",
    title: "Foto Angkatan",
    category: "kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=900",
    caption: "Sesi pemotretan buku tahunan di area taman sekolah.",
    date: "Februari 2026"
  }
];
