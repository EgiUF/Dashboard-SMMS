"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { clsx } from "clsx";
import { Modal } from "@/components/ui/Modal";
import { SuccessDialog } from "@/components/ui/SuccessDialog";

const initialColumns = [
  {
    title: "Awareness",
    items: [
      { id: 1, title: "Fakta Unik Burung Nuri", date: "19 Apr 2026", time: "10:00", status: "Uploaded", format: "Carousel", pillar: "Awareness", description: "Konten edukasi tentang burung nuri di Sanggaluri Park." },
      { id: 2, title: "Sejarah Sanggaluri Park", date: "21 Apr 2026", time: "09:00", status: "Pending", format: "Reel", pillar: "Awareness", description: "Sejarah singkat berdirinya Sanggaluri Park." },
      { id: 3, title: "Vlog Keseruan Anak SD", date: "23 Apr 2026", time: "11:00", status: "Pending", format: "Reel", pillar: "Awareness", description: "Dokumentasi keseruan anak-anak SD saat kunjungan." },
      { id: 4, title: "Mengenal Satwa Lokal", date: "25 Apr 2026", time: "13:00", status: "Pending", format: "Carousel", pillar: "Awareness", description: "Mengenal aneka satwa lokal yang ada di taman." },
      { id: 5, title: "Opening Hour Update", date: "5 Apr 2026", time: "07:00", status: "Uploaded", format: "Story", pillar: "Awareness", description: "Update jam operasional terbaru Sanggaluri Park." },
    ]
  },
  {
    title: "Consideration",
    items: [
      { id: 6, title: "Behind the Scenes Wahana", date: "19 Apr 2026", time: "18:00", status: "Unuploaded", format: "Story", pillar: "Consideration", description: "Konten behind the scenes persiapan wahana baru." },
      { id: 7, title: "FAQ Wahana Edukatif", date: "24 Apr 2026", time: "10:00", status: "Pending", format: "Carousel", pillar: "Consideration", description: "Jawaban pertanyaan umum tentang wahana edukatif." },
      { id: 8, title: "Review Pengunjung", date: "22 Apr 2026", time: "16:00", status: "Pending", format: "Reel", pillar: "Consideration", description: "Kompilasi review pengunjung tentang pengalaman mereka." },
      { id: 9, title: "Tips Foto di Sanggaluri", date: "3 Apr 2026", time: "09:00", status: "Uploaded", format: "Carousel", pillar: "Consideration", description: "Spot foto terbaik di kawasan Sanggaluri Park." },
    ]
  },
  {
    title: "Conversion",
    items: [
      { id: 10, title: "Promo Tiket Rombongan", date: "19 Apr 2026", time: "15:00", status: "Pending", format: "Reel", pillar: "Conversion", description: "Promo diskon untuk pembelian tiket rombongan." },
      { id: 11, title: "Paket Wisata Edukasi", date: "26 Apr 2026", time: "14:00", status: "Pending", format: "Carousel", pillar: "Conversion", description: "Penawaran paket wisata edukasi untuk sekolah." },
      { id: 12, title: "Flash Sale Weekend", date: "28 Apr 2026", time: "08:00", status: "Pending", format: "Story", pillar: "Conversion", description: "Promo flash sale khusus akhir pekan." },
    ]
  }
];

const pillarOptions = ["Awareness", "Consideration", "Conversion"];
const formatOptions = ["Reels", "Feed", "Story", "TikTok Video", "Carousel", "Short Video"];
const statusOptions = ["Uploaded", "Unuploaded", "Pending", "Cancelled"];

interface ContentItem {
  id: number;
  title: string;
  date: string;
  time: string;
  status: string;
  format: string;
  pillar: string;
  description: string;
  link?: string;
}

export default function ContentPlanPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addPillar, setAddPillar] = useState("Awareness");
  const [successMsg, setSuccessMsg] = useState("");

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: "", pillar: "", format: "", date: "", time: "", status: "", description: "", link: ""
  });

  // Add form state
  const [addForm, setAddForm] = useState({
    title: "", pillar: "Awareness", format: "Reels", date: "", time: "", status: "Pending", description: "", link: ""
  });

  const handleCardClick = (item: ContentItem) => {
    setSelectedItem(item);
    setEditForm({
      title: item.title,
      pillar: item.pillar,
      format: item.format,
      date: item.date,
      time: item.time,
      status: item.status,
      description: item.description,
      link: item.link || "",
    });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    setIsEditOpen(false);
    setSuccessMsg("Data konten kamu telah berhasil diperbarui ke dalam sistem SanggaluriMS");
  };

  const handleDeleteContent = () => {
    setIsEditOpen(false);
    setSuccessMsg("Berhasil Dihapus!\nKonten yang kamu pilih sudah berhasil dihapus dari sistem.");
  };

  const handleAddClick = (pillar: string) => {
    setAddPillar(pillar);
    setAddForm({ ...addForm, pillar, title: "", format: "Reels", date: "", time: "", status: "Pending", description: "", link: "" });
    setIsAddOpen(true);
  };

  const handleSaveAdd = () => {
    setIsAddOpen(false);
    setSuccessMsg("Data konten kamu telah berhasil ditambahkan ke dalam sistem SanggaluriMS");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-extrabold text-[#1e293b]">Content Plan</h1>
        <span className="px-3 py-1 bg-[#ccfbf1] text-[#0f766e] text-xs font-bold rounded-full">TikTok</span>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column, idx) => (
          <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col h-fit">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="font-bold text-gray-400 text-sm">{column.title}</h3>
              <span className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">{column.items.length}</span>
            </div>

            <div className="space-y-4">
              {column.items.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleCardClick(item)}
                  className="p-5 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer hover:border-[#10b981]/20"
                >
                  <h4 className="font-bold text-[#1e293b] text-sm group-hover:text-[#10b981] transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">{item.date} · {item.time}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className={clsx(
                      "text-[9px] font-bold px-2.5 py-1 rounded-md",
                      item.status === "Uploaded" && "bg-[#ccfbf1] text-[#0f766e]",
                      item.status === "Pending" && "bg-[#fef3c7] text-[#92400e]",
                      item.status === "Unuploaded" && "bg-[#fee2e2] text-[#991b1b]",
                      item.status === "Cancelled" && "bg-gray-100 text-gray-500",
                    )}>
                      {item.status}
                    </span>
                    <span className="text-[9px] font-bold text-[#6366f1] uppercase tracking-tighter">{item.format}</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleAddClick(column.title)}
              className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-[#10b981] transition-colors py-2 group"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Ide</span>
            </button>
          </div>
        ))}
      </div>

      {/* Detail / Edit Konten Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="max-w-xl">
        <div className="p-8">
          <h2 className="text-xl font-bold text-[#1e293b] mb-6">Detail / Edit Konten</h2>

          <div className="space-y-5">
            {/* Nama Konten */}
            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Nama Konten *</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 transition-all"
                value={editForm.title}
                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
              />
            </div>

            {/* Link Konten */}
            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Link Konten</label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 transition-all placeholder:text-gray-300"
                value={editForm.link}
                onChange={(e) => setEditForm({...editForm, link: e.target.value})}
              />
            </div>

            {/* Pilar + Format */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Pilar Konten *</label>
                <select
                  className="w-full px-4 py-3 bg-[#122C28] text-white rounded-xl text-sm outline-none appearance-none cursor-pointer"
                  value={editForm.pillar}
                  onChange={(e) => setEditForm({...editForm, pillar: e.target.value})}
                >
                  {pillarOptions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Format Konten</label>
                <select
                  className="w-full px-4 py-3 bg-[#122C28] text-white rounded-xl text-sm outline-none appearance-none cursor-pointer"
                  value={editForm.format}
                  onChange={(e) => setEditForm({...editForm, format: e.target.value})}
                >
                  {formatOptions.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            {/* Jadwal + Jam */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Jadwal Upload</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  defaultValue="2026-04-03"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Jam Upload</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  defaultValue="09:00"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Status Saat Ini</label>
              <select
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none appearance-none cursor-pointer focus:border-[#10b981] transition-all"
                value={editForm.status}
                onChange={(e) => setEditForm({...editForm, status: e.target.value})}
              >
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Brief / Deskripsi</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none resize-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 transition-all"
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button 
              onClick={handleDeleteContent}
              className="px-6 py-2.5 border border-[#ef4444]/20 text-[#ef4444] rounded-xl text-sm font-bold hover:bg-[#fef2f2] transition-all"
            >
              Hapus Konten
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-2.5 border border-gray-200 text-[#1e293b] rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-6 py-2.5 bg-[#122C28] text-white rounded-xl text-sm font-bold hover:bg-[#1B3C37] transition-all"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Add New Konten Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} maxWidth="max-w-xl">
        <div className="p-8">
          <h2 className="text-xl font-bold text-[#1e293b] mb-6">Tambah Ide Konten</h2>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Nama Konten *</label>
              <input
                type="text"
                placeholder="Masukkan judul konten..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 transition-all placeholder:text-gray-300"
                value={addForm.title}
                onChange={(e) => setAddForm({...addForm, title: e.target.value})}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Link Konten</label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 transition-all placeholder:text-gray-300"
                value={addForm.link}
                onChange={(e) => setAddForm({...addForm, link: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Pilar Konten *</label>
                <select
                  className="w-full px-4 py-3 bg-[#122C28] text-white rounded-xl text-sm outline-none appearance-none cursor-pointer"
                  value={addForm.pillar}
                  onChange={(e) => setAddForm({...addForm, pillar: e.target.value})}
                >
                  {pillarOptions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Format Konten</label>
                <select
                  className="w-full px-4 py-3 bg-[#122C28] text-white rounded-xl text-sm outline-none appearance-none cursor-pointer"
                  value={addForm.format}
                  onChange={(e) => setAddForm({...addForm, format: e.target.value})}
                >
                  {formatOptions.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Jadwal Upload</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={addForm.date}
                  onChange={(e) => setAddForm({...addForm, date: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Jam Upload</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={addForm.time}
                  onChange={(e) => setAddForm({...addForm, time: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Status Saat Ini</label>
              <select
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none appearance-none cursor-pointer"
                value={addForm.status}
                onChange={(e) => setAddForm({...addForm, status: e.target.value})}
              >
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Brief / Deskripsi</label>
              <textarea
                rows={3}
                placeholder="Deskripsikan ide konten..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none resize-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 transition-all placeholder:text-gray-300"
                value={addForm.description}
                onChange={(e) => setAddForm({...addForm, description: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-8 pt-6 border-t border-gray-100 gap-3">
            <button 
              onClick={() => setIsAddOpen(false)}
              className="px-6 py-2.5 border border-gray-200 text-[#1e293b] rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
            <button 
              onClick={handleSaveAdd}
              className="px-6 py-2.5 bg-[#122C28] text-white rounded-xl text-sm font-bold hover:bg-[#1B3C37] transition-all"
            >
              Simpan Konten
            </button>
          </div>
        </div>
      </Modal>

      {/* Success Dialog */}
      <SuccessDialog
        isOpen={!!successMsg}
        onClose={() => setSuccessMsg("")}
        message={successMsg}
      />
    </div>
  );
}
