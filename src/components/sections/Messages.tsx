"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Quote } from "lucide-react";
import { MessageItem } from "@/types";

const initialMessages: MessageItem[] = [
  {
    id: "msg-01",
    author: "Vevy Sisnia, S.Kom.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    role: "Wali Kelas",
    text: "Teruslah rendah hati dan jangan pernah berhenti belajar. Pintu doa Ibu selalu terbuka untuk kesuksesan 31 siswa hebat ini.",
    date: "Tahun Ajaran 2026"
  },
  {
    id: "msg-02",
    author: "Arrosid Hadi Nur Majid",
    avatar: "/students/student-02.jpg",
    role: "XII PPLG 3",
    text: "Tiga tahun penuh cerita di lab komputer SMK Negeri 1 Beringin. Terima kasih untuk kerja sama dan persahabatan yang solid.",
    date: "Tahun Ajaran 2026"
  },
  {
    id: "msg-03",
    author: "Clara Savira",
    avatar: "/students/student-05.jpg",
    role: "XII PPLG 3",
    text: "Semoga setelah lulus nanti kita semua bisa meraih cita-cita masing-masing dan tetap saling menyapa saat jumpa.",
    date: "Tahun Ajaran 2026"
  },
  {
    id: "msg-04",
    author: "Bima Triyanda",
    avatar: "/students/student-03.jpg",
    role: "XII PPLG 3",
    text: "Dari yang awalnya bingung waktu pertama kali buka editor koding, sampai akhirnya bisa bikin project bareng. Pengalaman terbaik!",
    date: "Tahun Ajaran 2026"
  },
  {
    id: "msg-05",
    author: "Winner Aurasari Debes",
    avatar: "/students/student-30.jpg",
    role: "XII PPLG 3",
    text: "Banyak hal berharga yang dipelajari bersama di kelas XII PPLG 3, bukan cuma soal koding tapi juga arti solidaritas.",
    date: "Tahun Ajaran 2026"
  },
  {
    id: "msg-06",
    author: "Mhd Fathir Aldiansyah",
    avatar: "/students/student-21.jpg",
    role: "XII PPLG 3",
    text: "Sampai jumpa di masa depan teman-teman. Sukses selalu untuk XII PPLG 3 angkatan 2026!",
    date: "Tahun Ajaran 2026"
  }
];

export function Messages() {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Siswa");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      author: name.trim(),
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
      role: role.trim(),
      text: text.trim(),
      date: "Baru saja"
    };

    setMessages([newMsg, ...messages]);
    setName("");
    setText("");
    setModalOpen(false);
  };

  return (
    <section id="pesan" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-2">
          Kenangan
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mb-2">
          Catatan &amp; Kesan
        </h2>
        <p className="text-sm text-stone-600 mb-6">
          Untaian pesan dari guru dan siswa kelas XII PPLG 3.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Pesan Singkat</span>
        </button>
      </div>

      {/* Grid of Message Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Quote className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-6">
                &ldquo;{msg.text}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-stone-200 shadow-xs">
                <Image
                  src={msg.avatar}
                  alt={msg.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 leading-tight">
                  {msg.author}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-0.5">
                  <span className="font-medium text-amber-800">{msg.role}</span>
                  <span>•</span>
                  <span>{msg.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Write Message Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-xs transition-colors"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg text-stone-900 mb-1">
              Tulis Catatan / Kesan
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Pesan singkat untuk teman-teman dan kelas XII PPLG 3.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Nama Kamu
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Arrosid / Bima"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Peran / Keterangan
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Siswa / Frontend Dev"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Pesan / Kesan
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tuliskan pengalaman atau pesan terbaikmu selama di kelas..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-stone-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors shadow-sm"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
