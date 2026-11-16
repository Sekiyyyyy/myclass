"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Quote, X, Send, MessageSquareHeart } from "lucide-react";
import { MessageItem } from "@/types";
import { PixelCard } from "@/components/ui/PixelCard";
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
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#FBBF24", "#38BDF8", "#34D399"],
      shapes: ["square"],
    });
  };

  return (
    <section id="pesan" className="py-20 px-3 sm:px-6 max-w-6xl mx-auto relative select-none">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-slate-950 font-pixel text-[9px] font-bold border-2 border-slate-950 shadow-[2px_2px_0px_#000] mb-3">
          <MessageSquareHeart className="w-3.5 h-3.5 text-slate-950" />
          <span>BUKU KENANGAN</span>
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-slate-900 dark:text-white mb-3 pixel-title-shadow">
          Kesan &amp; Pesan
        </h2>
        <p className="font-silk text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-bold uppercase mb-6">
          Untaian kata dan doa kenangan dari guru serta teman-teman XII PPLG 3
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="pixel-btn pixel-btn-primary mx-auto"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          <span>Tulis Pesan</span>
        </button>
      </div>

      {/* Grid of Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="pixel-box p-4 sm:p-5 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-1"
          >
            {/* Header: Author & Role */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 overflow-hidden shrink-0 border-2 border-slate-950 dark:border-amber-400 bg-slate-950 shadow-[2px_2px_0px_#000]">
                    <Image
                      src={msg.avatar}
                      alt={msg.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-silk font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight truncate">
                      {msg.author}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="px-1.5 py-0.5 bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 font-pixel text-[8px] font-bold">
                        {msg.role}
                      </span>
                      <span className="text-slate-400 text-[8px]">•</span>
                      <span className="text-slate-500 dark:text-slate-400 font-pixel text-[8px]">
                        {msg.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-7 h-7 bg-amber-500/15 text-amber-500 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Quote className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

              {/* Message Content: Dialogue Box */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <p className="font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-100 italic leading-relaxed font-normal">
                  &ldquo;{msg.text}&rdquo;
                </p>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="pixel-box p-5 sm:p-7 max-w-sm w-full relative z-10"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 w-7 h-7 bg-slate-200 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-800 dark:text-slate-200 flex items-center justify-center cursor-pointer border border-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-pixel text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
              Tulis Pesan Baru
            </h3>
            <p className="font-silk text-[10px] text-slate-800 dark:text-slate-200 font-bold mb-4 uppercase">
              Bagikan kesan atau doa untuk angkatan 2026
            </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block font-silk font-bold text-[10px] text-slate-900 dark:text-white mb-1 uppercase">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Rizky Alfianno"
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-silk text-xs border-2 border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-silk font-bold text-[10px] text-slate-900 dark:text-white mb-1 uppercase">
                    Peran / Status
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-silk text-xs border-2 border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Siswa">Siswa</option>
                    <option value="Wali Kelas">Wali Kelas</option>
                    <option value="Guru">Guru</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Teman">Teman</option>
                  </select>
                </div>

                <div>
                  <label className="block font-silk font-bold text-[10px] text-slate-900 dark:text-white mb-1 uppercase">
                    Pesan atau Doa
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tuliskan pesan berhargamu di sini..."
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-sans text-xs border-2 border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="pixel-btn pixel-btn-primary w-full py-2.5 text-[10px] flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    );
  }
