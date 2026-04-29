# SanggaluriMS - Social Media Management System Dashboard

SanggaluriMS adalah aplikasi *dashboard* manajemen konten media sosial yang ditujukan untuk *Social Media Specialist*. Proyek ini dibangun menggunakan **Next.js (App Router)** dan **Supabase** sebagai *Backend-as-a-Service* (BaaS).

## 🚀 Fitur Utama
- **Sistem Autentikasi & Sesi**: Ditenagai oleh Supabase Auth dan middleware sisi server (SSR).
- **Manajemen Workspace**: Mendukung lingkungan kerja berbasis ruang kerja (multi-tenant) untuk memisahkan proyek/data dengan aman.
- **Manajemen Konten (CRUD)**: Fasilitas komprehensif untuk mendata, mengelola, dan memonitor kinerja konten beserta evaluasinya.
- **Analitik Kinerja**: Terintegrasi langsung dengan pemrosesan basis data (*Stored Procedures / RPC*) untuk mengambil data statistik penting seperti performa bulanan dan rasio pertumbuhan konten (*growth*).

## 🛠️ Stack Teknologi
- **Framework**: Next.js (versi 16.x) dengan React 19
- **Backend & Database**: Supabase (PostgreSQL, Auth, RPC)
- **Styling**: Tailwind CSS (v4)
- **Ikonografi**: Lucide React

## 📦 Struktur Proyek
- `app/` - Berisi *router* antarmuka aplikasi, termasuk halaman publik (login/register) dan area privat (*dashboard*).
- `lib/services/` - Kumpulan abstraksi fungsi *backend* khusus untuk berkomunikasi dengan basis data Supabase (seperti `auth.ts`, `konten.ts`, `workspace.ts`).
- `lib/supabase/` - Klien sisi *browser* dan *middleware* otentikasi.

## ⚙️ Cara Menjalankan Aplikasi

1. Klon repositori ini dan masuk ke dalam direktori proyek.
2. Salin isi file `.env.example` ke file baru bernama `.env.local` dan isi nilainya:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Instal semua dependensi melalui Node.js:
   ```bash
   npm install
   ```
4. Jalankan *development server*:
   ```bash
   npm run dev
   ```
5. Akses antarmuka aplikasi melalui [http://localhost:3000](http://localhost:3000).

---

*Proyek dashboard ini dirancang agar cepat, modular, dan memiliki pengalaman pengguna yang interaktif dan dinamis.*
