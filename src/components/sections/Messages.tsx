"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Quote, Terminal, X, Send, Radio } from "lucide-react";
import { MessageItem } from "@/types";
import confetti from "canvas-confetti";
import { playBlip, playClick, playPowerUp } from "@/lib/sound";

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

    playPowerUp();
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#00F0FF", "#A855F7", "#10B981"],
    });
  };

  return (
    <section id="pesan" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs border border-cyan-500/25 mb-3">
          <Radio className="w-3.5 h-3.5" />
          <span>COMM-LINK // TRANSMISSIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Kesan &amp; Pesan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 font-medium">
          Untaian pesan dari guru dan siswa kelas XII PPLG 3 SMK Negeri 1 Beringin.
        </p>

        <button
          onClick={() => {
            playClick();
            setModalOpen(true);
          }}
          onMouseEnter={() => playBlip(750)}
          className="arcade-btn arcade-btn-primary px-6 py-3.5 text-xs sm:text-sm flex items-center gap-2 mx-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Transmisikan Pesan</span>
        </button>
      </div>

      {/* Grid of Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onMouseEnter={() => playBlip(720)}
            className="arcade-card arcade-card-interactive hud-corner p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-4 border border-cyan-500/20">
                <Quote className="w-4 h-4 fill-current" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6 font-medium">
                &ldquo;{msg.text}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-cyan-500/30 bg-slate-950">
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
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  <span className="text-cyan-500 font-bold">{msg.role}</span>
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
          onClick={() => {
            playBlip(500);
            setModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="arcade-card hud-corner p-6 sm:p-8 max-w-md w-full relative border border-cyan-500/40 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => {
                playBlip(500);
                setModalOpen(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-cyan-500 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white mb-1">
              Transmisikan Pesan
            </h3>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-5">
              Kirimkan transmisi kesan &amp; pesan untuk angkatan 2026.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  NAMA OPERATIVE
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Arrosid / Clara / Rizky"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  ROLE / PERAN
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Siswa / Frontend Dev"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  PESAN INTEL
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tuliskan pengalaman atau pesan terbaikmu selama di kelas..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                onClick={() => playClick()}
                className="arcade-btn arcade-btn-primary w-full py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Transmisi</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
