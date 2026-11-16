"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Quote, X, Send, MessageSquareHeart } from "lucide-react";
import { MessageItem } from "@/types";
import confetti from "canvas-confetti";

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
    role: "Siswa",
    text: "Tiga tahun penuh cerita di lab komputer SMK Negeri 1 Beringin. Terima kasih untuk kerja sama dan persahabatan yang solid.",
    date: "Tahun Ajaran 2026"
  },
  {
    id: "msg-03",
    author: "Clara Savira",
    avatar: "/students/student-05.jpg",
    role: "Siswa",
    text: "Semoga setelah lulus nanti kita semua bisa meraih cita-cita masing-masing dan tetap saling menyapa saat jumpa.",
    date: "Tahun Ajaran 2026"
  },
  {
    id: "msg-04",
    author: "Bima Triyanda",
    avatar: "/students/student-03.jpg",
    role: "Siswa",
    text: "Dari yang awalnya bingung waktu pertama kali buka editor koding, sampai akhirnya bisa bikin project bareng. Pengalaman terbaik!",
    date: "Tahun Ajaran 2026"
  },
  {
    id: "msg-05",
    author: "Winner Aurasari Debes",
    avatar: "/students/student-30.jpg",
    role: "Siswa",
    text: "Banyak hal berharga yang dipelajari bersama di kelas XII PPLG 3, bukan cuma soal koding tapi juga arti solidaritas.",
    date: "Tahun Ajaran 2026"
  },
  {
    id: "msg-06",
    author: "Mhd Fathir Aldiansyah",
    avatar: "/students/student-21.jpg",
    role: "Siswa",
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

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#6366F1", "#EC4899", "#38BDF8"],
    });
  };

  return (
    <section id="pesan" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold text-xs border border-indigo-200 dark:border-indigo-800/60 mb-3">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Buku Kenangan</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-slate-900 dark:text-white mb-3">
          Kesan &amp; Pesan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6">
          Untaian kata dan doa dari guru serta teman-teman kelas XII PPLG 3.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Pesan Anda</span>
        </button>
      </div>

      {/* Grid of Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="glass-card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Quote className="w-4 h-4 fill-current" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
                &ldquo;{msg.text}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100">
                <Image
                  src={msg.avatar}
                  alt={msg.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                  {msg.author}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">{msg.role}</span>
                  <span>•</span>
                  <span>{msg.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write Message Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 bg-white dark:bg-slate-900"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-1">
              Tulis Pesan Baru
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Bagikan kesan, doa, atau kenangan untuk teman-teman sekelas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nama Anda
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Rizky Alfianno"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Peran / Status
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 cursor-pointer"
                >
                  <option value="Siswa">Siswa</option>
                  <option value="Wali Kelas">Wali Kelas</option>
                  <option value="Guru">Guru</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Teman">Teman</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Isi Pesan atau Doa
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tuliskan pesan berhargamu di sini..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
