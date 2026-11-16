"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Quote, Sparkles, X } from "lucide-react";
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

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#58CC02", "#1CB0F6", "#FFC800", "#FF4B4B"],
    });
  };

  return (
    <section id="pesan" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-heading font-extrabold text-xs border border-amber-200 border-b-2 border-b-amber-300 shadow-xs mb-3">
          💌 Catatan Kenangan
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight mb-2">
          Kesan &amp; Pesan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mb-6">
          Untaian pesan dari guru dan siswa kelas XII PPLG 3 SMK Negeri 1 Beringin.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="clay-btn clay-btn-green px-6 py-3 text-xs sm:text-sm flex items-center gap-2 mx-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Pesan Singkat</span>
        </button>
      </div>

      {/* Grid of Clay Message Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="clay-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-transform"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 border-b-2 border-amber-200">
                <Quote className="w-5 h-5 fill-current" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6 font-medium">
                &ldquo;{msg.text}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t-2 border-slate-100">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-100 border-b-[3px] border-b-slate-200 shadow-xs bg-slate-100">
                <Image
                  src={msg.avatar}
                  alt={msg.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-heading font-black text-xs sm:text-sm text-slate-900 leading-tight">
                  {msg.author}
                </h4>
                <div className="flex items-center gap-2 text-[11px] font-heading font-bold text-slate-400 mt-0.5">
                  <span className="text-[#58CC02]">{msg.role}</span>
                  <span>•</span>
                  <span>{msg.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clay Write Message Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="clay-card p-6 sm:p-8 max-w-md w-full relative border-b-[8px] border-b-slate-300 animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:translate-y-0.5 border-b-2 border-slate-300 font-heading font-black text-slate-600 flex items-center justify-center text-xs transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-black text-xl text-slate-900 mb-1">
              Tulis Pesan &amp; Kenangan
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Tuliskan pesan penyemangat untuk teman-teman XII PPLG 3.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-extrabold text-slate-700 mb-1.5">
                  Nama Kamu
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Arrosid / Clara / Rizky"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 border-b-[3px] border-b-slate-300 text-xs font-heading font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#58CC02] focus:border-b-[#46A302]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-extrabold text-slate-700 mb-1.5">
                  Peran / Keterangan
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Siswa / Frontend Dev"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 border-b-[3px] border-b-slate-300 text-xs font-heading font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#58CC02] focus:border-b-[#46A302]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-extrabold text-slate-700 mb-1.5">
                  Pesan / Kesan
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tuliskan pengalaman atau pesan terbaikmu selama di kelas..."
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 border-b-[3px] border-b-slate-300 text-xs font-heading font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#58CC02] focus:border-b-[#46A302] resize-none"
                />
              </div>

              <button
                type="submit"
                className="clay-btn clay-btn-green w-full py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
