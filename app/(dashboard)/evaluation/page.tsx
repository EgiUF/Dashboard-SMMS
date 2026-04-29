"use client";

import React from "react";
import { Plus, Pencil, Trash2, Download } from "lucide-react";
import { clsx } from "clsx";

const stats = [
  { label: "Best Content", value: "7" },
  { label: "Total Diunggah", value: "7" },
  { label: "Berhasil Upload", value: "6" },
  { label: "Gagal Upload", value: "1" },
];

const evaluationData = [
  { name: "Vlog Keseruan Anak SD", upload: "1 Apr 2026", eval: "7 Apr 2026", views: "15.2K", likes: "1.4K", comments: "230", shares: "312", favs: "180", er: "13.96%", erType: "good" },
  { name: "Fakta Unik Burung Nuri", upload: "3 Apr 2026", eval: "9 Apr 2026", views: "8.4K", likes: "720", comments: "95", shares: "140", favs: "88", er: "12.34%", erType: "good" },
  { name: "Promo Tiket Rombongan", upload: "8 Apr 2026", eval: "14 Apr 2026", views: "6.3K", likes: "410", comments: "67", shares: "89", favs: "55", er: "9.86%", erType: "average" },
  { name: "Behind the Scenes Wahana", upload: "12 Apr 2026", eval: "18 Apr 2026", views: "4.1K", likes: "290", comments: "44", shares: "62", favs: "31", er: "10.41%", erType: "good" },
  { name: "Sejarah Sanggaluri Park", upload: "15 Apr 2026", eval: "21 Apr 2026", views: "9.8K", likes: "870", comments: "150", shares: "210", favs: "120", er: "13.78%", erType: "good" },
  { name: "Tips Foto di Sanggaluri", upload: "3 Apr 2026", eval: "9 Apr 2026", views: "7.2K", likes: "610", comments: "88", shares: "155", favs: "72", er: "12.85%", erType: "good" },
  { name: "Opening Hour Update", upload: "5 Apr 2026", eval: "11 Apr 2026", views: "0", likes: "0", comments: "0", shares: "0", favs: "0", er: "0.00%", erType: "none" },
];

export default function EvaluationPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-extrabold text-[#1e293b]">Evaluasi</h1>
        <span className="px-3 py-1 bg-[#ccfbf1] text-[#0f766e] text-xs font-bold rounded-full">TikTok</span>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</h3>
            <div className="text-3xl font-extrabold text-[#1e293b]">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h3 className="text-xl font-bold text-[#1e293b]">Tabel Evaluasi Konten</h3>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              {["Semua", "Bulan Ini", "Last Week"].map((f, i) => (
                <button key={i} className={clsx(
                  "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                  i === 1 ? "bg-white text-[#1e293b] shadow-sm" : "text-gray-400 hover:text-gray-600"
                )}>
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#122C28] text-white text-xs font-bold rounded-xl hover:bg-[#1B3C37] transition-all">
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
            </button>
            <button className="p-2.5 bg-[#122C28] text-white rounded-xl hover:bg-[#1B3C37] transition-all">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                <th className="px-4 py-4">Nama Konten</th>
                <th className="px-4 py-4">Tgl Upload</th>
                <th className="px-4 py-4">Tgl Evaluasi</th>
                <th className="px-4 py-4">Views</th>
                <th className="px-4 py-4">Likes</th>
                <th className="px-4 py-4">Komentar</th>
                <th className="px-4 py-4">Share</th>
                <th className="px-4 py-4">Favorit</th>
                <th className="px-4 py-4">ER</th>
                <th className="px-4 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {evaluationData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-4">
                    <span className="text-sm font-bold text-[#1e293b]">{row.name}</span>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500 font-medium">{row.upload}</td>
                  <td className="px-4 py-4 text-xs text-gray-500 font-medium">{row.eval}</td>
                  <td className="px-4 py-4 text-xs text-[#1e293b] font-bold">{row.views}</td>
                  <td className="px-4 py-4 text-xs text-[#1e293b] font-bold">{row.likes}</td>
                  <td className="px-4 py-4 text-xs text-[#1e293b] font-bold">{row.comments}</td>
                  <td className="px-4 py-4 text-xs text-[#1e293b] font-bold">{row.shares}</td>
                  <td className="px-4 py-4 text-xs text-[#1e293b] font-bold">{row.favs}</td>
                  <td className="px-4 py-4">
                    <span className={clsx(
                      "px-3 py-1 rounded-md text-[10px] font-bold",
                      row.erType === "good" && "bg-[#ccfbf1] text-[#0f766e]",
                      row.erType === "average" && "bg-[#dcfce7] text-[#166534]",
                      row.erType === "none" && "bg-[#fee2e2] text-[#991b1b]",
                    )}>
                      {row.er}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 bg-[#f59e0b] text-white rounded-lg hover:bg-[#d97706] transition-all">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-2 bg-[#ef4444] text-white rounded-lg hover:bg-[#dc2626] transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
