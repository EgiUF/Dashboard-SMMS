"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Download } from "lucide-react";
import { clsx } from "clsx";
import { Modal } from "@/components/ui/Modal";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const initialStats = [
  { label: "Best Content of Month", value: "7" },
  { label: "Uploaded", value: "7", valueColor: "text-[#10b981]" },
  { label: "Unuploaded", value: "6", valueColor: "text-[#ef4444]" },
  { label: "Pending", value: "1", valueColor: "text-[#f59e0b]" },
  { label: "Cancelled", value: "0", valueColor: "text-[#64748b]" },
];

const initialData = [
  { id: 1, name: "Vlog Keseruan Anak SD", upload: "1 Apr 2026", eval: "7 Apr 2026", views: "15.2K", likes: "1.4K", comments: "230", shares: "312", favs: "180", er: "13.96%", erType: "good" },
  { id: 2, name: "Fakta Unik Burung Nuri", upload: "3 Apr 2026", eval: "9 Apr 2026", views: "8.4K", likes: "720", comments: "95", shares: "140", favs: "88", er: "12.34%", erType: "good" },
  { id: 3, name: "Promo Tiket Rombongan", upload: "8 Apr 2026", eval: "14 Apr 2026", views: "6.3K", likes: "410", comments: "67", shares: "89", favs: "55", er: "9.86%", erType: "average" },
  { id: 4, name: "Behind the Scenes Wahana", upload: "12 Apr 2026", eval: "18 Apr 2026", views: "4.1K", likes: "290", comments: "44", shares: "62", favs: "31", er: "10.41%", erType: "good" },
  { id: 5, name: "Sejarah Sanggaluri Park", upload: "15 Apr 2026", eval: "18 Apr 2026", views: "9.8K", likes: "870", comments: "150", shares: "210", favs: "120", er: "13.78%", erType: "good" },
  { id: 6, name: "Tips Foto di Sanggaluri", upload: "3 Apr 2026", eval: "9 Apr 2026", views: "7.2K", likes: "610", comments: "88", shares: "155", favs: "72", er: "12.85%", erType: "good" },
  { id: 7, name: "Opening Hour Update", upload: "5 Apr 2026", eval: "11 Apr 2026", views: "0", likes: "0", comments: "0", shares: "0", favs: "0", er: "0.00%", erType: "none" },
];

const statusUploadOptions = ["Uploaded", "Unuploaded", "Pending", "Cancelled"];

export default function EvaluationPage() {
  const [activeFilter, setActiveFilter] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [editForm, setEditForm] = useState({
    name: "", uploadDate: "", evalDate: "", views: "", likes: "", comments: "", shares: "", favs: "", statusUpload: "Uploaded"
  });

  const [addForm, setAddForm] = useState({
    name: "", uploadDate: "", evalDate: "", views: "", likes: "", comments: "", shares: "", favs: "", statusUpload: "Uploaded"
  });

  const handleEditClick = (row: any) => {
    setSelectedRow(row);
    setEditForm({
      name: row.name,
      uploadDate: "2026-04-03",
      evalDate: "2026-04-03",
      views: row.views.replace("K", "000").replace(".", ""),
      likes: row.likes.replace("K", "000").replace(".", ""),
      comments: row.comments,
      shares: row.shares,
      favs: row.favs,
      statusUpload: "Uploaded"
    });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    setIsEditOpen(false);
    setSuccessMsg("Laporan performa untuk konten ini berhasil disimpan dari tabel evaluasi.");
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    setDeleteConfirm(null);
    setSuccessMsg("Berhasil Dihapus!\nKonten yang kamu pilih sudah berhasil dihapus dari sistem.");
  };

  const handleSaveAdd = () => {
    setIsAddOpen(false);
    setSuccessMsg("Data konten kamu telah berhasil ditambahkan ke dalam sistem SanggaluriSM");
  };

  // Compute ER from form values
  const computeER = (form: typeof editForm) => {
    const views = parseInt(form.views) || 0;
    const likes = parseInt(form.likes) || 0;
    const comments = parseInt(form.comments) || 0;
    const shares = parseInt(form.shares) || 0;
    const favs = parseInt(form.favs) || 0;
    if (views === 0) return "0.00%";
    return ((likes + comments + shares + favs) / views * 100).toFixed(2) + "%";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-[#1e293b]">Evaluasi</h1>
          <span className="px-3 py-1 bg-[#ccfbf1] text-[#0f766e] text-xs font-bold rounded-full">TikTok</span>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {initialStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</h3>
            <div className={clsx("text-3xl font-extrabold", stat.valueColor || "text-[#1e293b]")}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Date + Export Row */}
      <div className="flex items-center justify-end gap-3">
        <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm text-xs font-bold text-gray-500">
          Min, 19 Apr 2026
        </div>
        <div className="relative group">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#122C28] text-white text-xs font-bold rounded-xl hover:bg-[#1B3C37] transition-all">
            <Download className="w-4 h-4" />
            <span>Export Laporan</span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <div className="py-2">
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">Export as Excel (.xlsx)</button>
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">Export as CSV (.csv)</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h3 className="text-xl font-bold text-[#1e293b]">Tabel Evaluasi Konten</h3>
          <div className="flex flex-wrap items-center gap-2">
            <select className="px-4 py-2 text-xs font-bold bg-white border border-gray-200 rounded-xl outline-none focus:border-[#10b981]">
              <option value="all">Semua Bulan</option>
              <option value="jan">Januari</option>
              <option value="feb">Februari</option>
              <option value="mar">Maret</option>
              <option value="apr">April</option>
              <option value="may">Mei</option>
              <option value="jun">Juni</option>
              <option value="jul">Juli</option>
              <option value="aug">Agustus</option>
              <option value="sep">September</option>
              <option value="oct">Oktober</option>
              <option value="nov">November</option>
              <option value="dec">Desember</option>
            </select>
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              {["All", "Last Week"].map((f, i) => (
                <button key={i} onClick={() => setActiveFilter(i)} className={clsx(
                  "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                  activeFilter === i ? "bg-white text-[#1e293b] shadow-sm" : "text-gray-400 hover:text-gray-600"
                )}>
                  {f}
                </button>
              ))}
            </div>
            <select className="px-4 py-2 text-xs font-bold bg-white border border-gray-200 rounded-xl outline-none focus:border-[#10b981]">
              <option value="10">10 Data</option>
              <option value="25">25 Data</option>
              <option value="50">50 Data</option>
              <option value="100">100 Data</option>
            </select>
            <button 
              onClick={() => {
                setAddForm({ name: "", uploadDate: "", evalDate: "", views: "", likes: "", comments: "", shares: "", favs: "", statusUpload: "Uploaded" });
                setIsAddOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#122C28] text-white text-xs font-bold rounded-xl hover:bg-[#1B3C37] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
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
              {initialData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
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
                      <button 
                        onClick={() => handleEditClick(row)}
                        className="p-2 bg-[#f59e0b] text-white rounded-lg hover:bg-[#d97706] transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(row.id)}
                        className="p-2 bg-[#ef4444] text-white rounded-lg hover:bg-[#dc2626] transition-all"
                      >
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

      {/* Edit Data Evaluasi Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="max-w-xl">
        <div className="p-8">
          <h2 className="text-xl font-bold text-[#1e293b] mb-6">Edit Data Evaluasi</h2>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Nama Konten *</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all bg-gray-50"
                value={editForm.name}
                readOnly
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Tanggal Upload</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={editForm.uploadDate}
                  onChange={(e) => setEditForm({...editForm, uploadDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Tanggal Evaluasi</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={editForm.evalDate}
                  onChange={(e) => setEditForm({...editForm, evalDate: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Total View</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={editForm.views}
                  onChange={(e) => setEditForm({...editForm, views: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Total Likes</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={editForm.likes}
                  onChange={(e) => setEditForm({...editForm, likes: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Komentar</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={editForm.comments}
                  onChange={(e) => setEditForm({...editForm, comments: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Share</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={editForm.shares}
                  onChange={(e) => setEditForm({...editForm, shares: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Favorit</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={editForm.favs}
                  onChange={(e) => setEditForm({...editForm, favs: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Status Upload</label>
                <select
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none appearance-none cursor-pointer"
                  value={editForm.statusUpload}
                  onChange={(e) => setEditForm({...editForm, statusUpload: e.target.value})}
                >
                  {statusUploadOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* ER computed */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500">
                ER dihitung otomatis: (Likes + Komentar + Share + Favorit) / Views × 100 = <span className="font-bold text-[#10b981]">{computeER(editForm)}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end mt-8 pt-6 border-t border-gray-100 gap-3">
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
              Simpan Data
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Evaluasi Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} maxWidth="max-w-xl">
        <div className="p-8">
          <h2 className="text-xl font-bold text-[#1e293b] mb-6">Tambah Data Evaluasi</h2>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Nama Konten *</label>
              <input
                type="text"
                placeholder="Pilih atau masukkan nama konten..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all placeholder:text-gray-300"
                value={addForm.name}
                onChange={(e) => setAddForm({...addForm, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Tanggal Upload</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={addForm.uploadDate}
                  onChange={(e) => setAddForm({...addForm, uploadDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Tanggal Evaluasi</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all"
                  value={addForm.evalDate}
                  onChange={(e) => setAddForm({...addForm, evalDate: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Total View</label>
                <input type="number" placeholder="0" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all" value={addForm.views} onChange={(e) => setAddForm({...addForm, views: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Total Likes</label>
                <input type="number" placeholder="0" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all" value={addForm.likes} onChange={(e) => setAddForm({...addForm, likes: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Komentar</label>
                <input type="number" placeholder="0" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all" value={addForm.comments} onChange={(e) => setAddForm({...addForm, comments: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Share</label>
                <input type="number" placeholder="0" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all" value={addForm.shares} onChange={(e) => setAddForm({...addForm, shares: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#10b981] mb-1.5 block">Favorit</label>
                <input type="number" placeholder="0" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none focus:border-[#10b981] transition-all" value={addForm.favs} onChange={(e) => setAddForm({...addForm, favs: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-[#64748b] mb-1.5 block">Status Upload</label>
                <select
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#1e293b] outline-none appearance-none cursor-pointer"
                  value={addForm.statusUpload}
                  onChange={(e) => setAddForm({...addForm, statusUpload: e.target.value})}
                >
                  {statusUploadOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500">
                ER dihitung otomatis: (Likes + Komentar + Share + Favorit) / Views × 100 = <span className="font-bold text-[#10b981]">{computeER(addForm)}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end mt-8 pt-6 border-t border-gray-100 gap-3">
            <button onClick={() => setIsAddOpen(false)} className="px-6 py-2.5 border border-gray-200 text-[#1e293b] rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">Batal</button>
            <button onClick={handleSaveAdd} className="px-6 py-2.5 bg-[#122C28] text-white rounded-xl text-sm font-bold hover:bg-[#1B3C37] transition-all">Simpan Data</button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        icon={<Trash2 className="w-7 h-7 text-[#ef4444]" />}
        title="Hapus Data Evaluasi?"
        description="Apakah kamu yakin ingin menghapus data evaluasi ini?"
        subDescription="Data yang sudah dihapus tidak dapat dikembalikan."
        cancelText="Batal"
        confirmText="Ya, Hapus"
      />

      {/* Success Dialog */}
      <SuccessDialog
        isOpen={!!successMsg}
        onClose={() => setSuccessMsg("")}
        message={successMsg}
      />
    </div>
  );
}
