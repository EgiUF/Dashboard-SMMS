# Sanggaluri Social Media Management System (SMMS) Dashboard

Sanggaluri SMMS adalah platform internal yang dirancang khusus untuk tim manajemen Sanggaluri dalam mengelola, merencanakan, dan mengevaluasi konten di berbagai platform media sosial (TikTok & Instagram).

## 🚀 Fitur Utama

- **Unified Dashboard**: Pantau performa statistik (Reach, Likes, ER) secara *real-time* untuk setiap workspace.
- **Content Plan (Kanban)**: Kelola alur kerja konten dari tahap *Awareness*, *Consideration*, hingga *Conversion*.
- **Interactive Calendar**: Visualisasi jadwal posting konten bulanan untuk memastikan konsistensi unggahan.
- **Evaluation Analytics**: Tabel evaluasi mendalam untuk menganalisis konten mana yang paling berkinerja baik.
- **Multi-Workspace**: Kemampuan untuk berpindah antara akun media sosial yang berbeda dalam satu dashboard.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **State Persistence**: LocalStorage (Active Workspace Tracking)

---

## 💻 Panduan Instalasi Lokal

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer Anda:

### 1. Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)

### 2. Clone Repositori
Buka terminal dan jalankan perintah berikut:
```bash
git clone https://github.com/EgiUF/Dashboard-SMMS.git
cd Dashboard-SMMS
```

### 3. Instal Dependensi
Instal semua library yang dibutuhkan:
```bash
npm install
```

### 4. Konfigurasi Environment Variables
Buat file baru bernama `.env.local` di direktori root project dan tambahkan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 5. Jalankan Development Server
Setelah semua selesai, jalankan aplikasi:
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📂 Struktur Folder
- `app/`: Routing utama dan halaman aplikasi.
- `app/(dashboard)/`: Grup rute untuk area dashboard (membutuhkan autentikasi).
- `components/`: Komponen UI yang dapat digunakan kembali.
- `lib/services/`: Logika integrasi API dan Database (Supabase).
- `public/`: Asset statis seperti gambar dan logo.
- `SMMS UI/`: Folder referensi desain UI (PNG).

## 📄 Lisensi
Project ini dibuat untuk keperluan internal manajemen Sanggaluri.

---
