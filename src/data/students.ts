export type OfficerRole =
  | "Ketua Kelas"
  | "Wakil Ketua"
  | "Sekretaris"
  | "Bendahara";

export interface Student {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  role?: OfficerRole;
}

export const CLASS_INFO = {
  name: "XII PPLG 3",
  batchName: "Eterna",
  major: "Pengembangan Perangkat Lunak & Gim",
  majorShort: "PPLG",
  school: "SMK Negeri 1 Beringin",
  region: "Deli Serdang, Sumatera Utara",
  year: "2026",
  period: "2023 - 2026",
  lab: "Lab RPL",
  homeroomTeacher: "Vevy Sisnia, S.Kom.",
  instagramHandle: "class.of.eterna.pplgthree",
  instagramUrl: "https://instagram.com/class.of.eterna.pplgthree",
  totalStudents: 31,
} as const;

export const students: Student[] = [
  { id: "01", name: "Anis Aristi Daia", nickname: "Anis", avatar: "/students/student-01.jpg" },
  { id: "02", name: "Arrosid Hadi Nur Majid", nickname: "Arrosid", avatar: "/students/student-02.jpg" },
  { id: "03", name: "Bima Triyanda", nickname: "Bima", avatar: "/students/student-03.jpg" },
  { id: "04", name: "Bimo Abimanyu", nickname: "Bimo", avatar: "/students/student-04.jpg" },
  { id: "05", name: "Clara Savira", nickname: "Clara", avatar: "/students/student-05.jpg" },
  { id: "06", name: "Dara Khairunisa Annida", nickname: "Dara", avatar: "/students/student-06.jpg", role: "Bendahara" },
  { id: "07", name: "Dhiaurrahman Nasution", nickname: "Dhia", avatar: "/students/student-07.jpg", role: "Wakil Ketua" },
  { id: "08", name: "Dia Kartika", nickname: "Dia", avatar: "/students/student-08.jpg" },
  { id: "09", name: "Dian Anggraini", nickname: "Dian", avatar: "/students/student-09.jpg" },
  { id: "10", name: "Husna Aulia", nickname: "Husna", avatar: "/students/student-10.jpg" },
  { id: "11", name: "Icha Windayana", nickname: "Icha", avatar: "/students/student-11.jpg" },
  { id: "12", name: "Indah Chintya Dewi", nickname: "Chintya", avatar: "/students/student-12.jpg" },
  { id: "13", name: "Indah Riyani", nickname: "Riyani", avatar: "/students/student-13.jpg" },
  { id: "14", name: "Jesika Mahdalena Tri Hapsari Puspita", nickname: "Jesika", avatar: "/students/student-14.jpg" },
  { id: "15", name: "Kayla Andriani", nickname: "Kayla", avatar: "/students/student-15.jpg" },
  { id: "16", name: "Kesya Aulia Putri", nickname: "Kesya", avatar: "/students/student-16.jpg" },
  { id: "17", name: "Kikio Angelia", nickname: "Kikio", avatar: "/students/student-17.jpg", role: "Sekretaris" },
  { id: "18", name: "Meisya Fadwi Siregar", nickname: "Meisya", avatar: "/students/student-18.jpg" },
  { id: "19", name: "Mentari", nickname: "Mentari", avatar: "/students/student-19.jpg" },
  { id: "20", name: "Mey Linda Anjuni Waruwu", nickname: "Mey", avatar: "/students/student-20.jpg" },
  { id: "21", name: "Mhd Fathir Aldiansyah", nickname: "Fathir", avatar: "/students/student-21.jpg" },
  { id: "22", name: "Nikita Alviyanti", nickname: "Nikita", avatar: "/students/student-22.jpg" },
  { id: "23", name: "Nur Baiti Laily Afriani", nickname: "Baiti", avatar: "/students/student-23.jpg" },
  { id: "24", name: "Nur Wahidah", nickname: "Wahidah", avatar: "/students/student-24.jpg" },
  { id: "25", name: "Rifky Alfareza Harahap", nickname: "Rifky", avatar: "/students/student-25.jpg" },
  { id: "26", name: "Rifqii Aditya", nickname: "Rifqii", avatar: "/students/student-26.jpg" },
  { id: "27", name: "Rizky Alfianno", nickname: "Rizky", avatar: "/students/student-27.jpg", role: "Ketua Kelas" },
  { id: "28", name: "Safa Ramadina", nickname: "Safa", avatar: "/students/student-28.jpg" },
  { id: "29", name: "Sakti Adiguna", nickname: "Sakti", avatar: "/students/student-29.jpg" },
  { id: "30", name: "Winner Aurasari Debes", nickname: "Winner", avatar: "/students/student-30.jpg" },
  { id: "31", name: "Yulia Amanda", nickname: "Yulia", avatar: "/students/student-31.jpg" },
];
