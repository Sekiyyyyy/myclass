export interface Student {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  quote: string;
  ig: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "lab" | "kegiatan" | "candid" | "lapangan";
  imageUrl: string;
  caption: string;
  date: string;
}

export interface MessageItem {
  id: string;
  author: string;
  avatar: string;
  role: string;
  text: string;
  date: string;
}
