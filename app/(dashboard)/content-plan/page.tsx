"use client";

import React from "react";
import { Plus } from "lucide-react";
import { clsx } from "clsx";

const columns = [
  {
    title: "Awareness",
    count: 5,
    items: [
      { title: "Fakta Unik Burung Nuri", date: "19 Apr 2026", time: "10:00", status: "Uploaded", format: "Carousel" },
      { title: "Sejarah Sanggaluri Park", date: "21 Apr 2026", time: "09:00", status: "Pending", format: "Reel" },
      { title: "Vlog Keseruan Anak SD", date: "23 Apr 2026", time: "11:00", status: "Pending", format: "Reel" },
      { title: "Mengenal Satwa Lokal", date: "25 Apr 2026", time: "13:00", status: "Pending", format: "Carousel" },
      { title: "Opening Hour Update", date: "5 Apr 2026", time: "07:00", status: "Uploaded", format: "Story" },
    ]
  },
  {
    title: "Consideration",
    count: 4,
    items: [
      { title: "Behind the Scenes Wahana", date: "19 Apr 2026", time: "18:00", status: "Unuploaded", format: "Story" },
      { title: "FAQ Wahana Edukatif", date: "24 Apr 2026", time: "10:00", status: "Pending", format: "Carousel" },
      { title: "Review Pengunjung", date: "22 Apr 2026", time: "16:00", status: "Pending", format: "Reel" },
      { title: "Tips Foto di Sanggaluri", date: "3 Apr 2026", time: "09:00", status: "Uploaded", format: "Carousel" },
    ]
  },
  {
    title: "Conversion",
    count: 3,
    items: [
      { title: "Promo Tiket Rombongan", date: "19 Apr 2026", time: "15:00", status: "Pending", format: "Reel" },
      { title: "Paket Wisata Edukasi", date: "26 Apr 2026", time: "14:00", status: "Pending", format: "Carousel" },
      { title: "Flash Sale Weekend", date: "28 Apr 2026", time: "08:00", status: "Pending", format: "Story" },
    ]
  }
];

export default function ContentPlanPage() {
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
              <span className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">{column.count}</span>
            </div>

            <div className="space-y-4">
              {column.items.map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <h4 className="font-bold text-[#1e293b] text-sm group-hover:text-[#10b981] transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">{item.date} • {item.time}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className={clsx(
                      "text-[9px] font-bold px-2 py-0.5 rounded",
                      item.status === "Uploaded" && "bg-[#ccfbf1] text-[#0f766e]",
                      item.status === "Pending" && "bg-[#fef3c7] text-[#92400e]",
                      item.status === "Unuploaded" && "bg-[#fee2e2] text-[#991b1b]",
                    )}>
                      {item.status}
                    </span>
                    <span className="text-[9px] font-bold text-[#ef4444] uppercase tracking-tighter">{item.format}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-[#10b981] transition-colors py-2 group">
              <Plus className="w-4 h-4" />
              <span>Tambah Ide</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
