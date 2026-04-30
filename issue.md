# Issue Tracking

## 🐛 Bug: Data `admin_profile` dan `workspace` Tidak Terisi Saat Registrasi

**Status**: Teridentifikasi (Membutuhkan Perbaikan Konfigurasi Database)
**Tanggal Identifikasi**: 29 April 2026

### 📝 Deskripsi Masalah
Saat pengguna baru melakukan pendaftaran akun melalui halaman *Register*, proses *sign-up* ke sistem Auth Supabase dinyatakan berhasil dan email masuk ke tabel `auth.users`. Akan tetapi, data pelengkap sekunder yaitu profil admin (tabel `admin_profile`) dan *workspace* bawaan (tabel `workspace`) tetap **kosong**.

Kendala ini bersifat *silent failure* karena antarmuka (*user interface*) tidak menampilkan peringatan *error* dan menyatakan proses registrasi berhasil, namun saat basis data diperiksa datanya belum tersisipkan.

### 🔍 Root Cause (Akar Masalah)
Masalah ini timbul akibat regulasi pengamanan basis data oleh Supabase:
1. **Row Level Security (RLS)**: Tabel `admin_profile` dan `workspace` dilindungi oleh RLS.
2. Permintaan *insert* yang dilakukan di file `lib/services/auth.ts` dijalankan dari sisi klien menggunakan *Anon Key*.
3. Jika akun pengguna baru tersebut tertunda otentikasinya akibat opsi "Confirm Email" aktif di Supabase, atau jika tidak terdapat izin *Policy* eksplisit yang memperbolehkan Anonim menyisipkan data, operasi *insert* tersebut akan otomatis diblokir oleh mesin PostgreSQL Supabase.

### 💡 Solusi yang Direkomendasikan
Cara kerja terbaik (*best practice*) dalam ekosistem Supabase untuk mengatur pembuatan data profil setelah pendaftaran adalah menggunakan **Database Trigger** (otomatisasi sisi server *database*). Hal ini membuat fungsi aman dari intervensi RLS sisi *client*.

**Langkah Penanganan Utama (di Supabase SQL Editor):**
Jalankan *script* SQL di bawah ini pada halaman SQL Editor proyek Supabase:

```sql
-- 1. Buat fungsi trigger untuk menangani pengguna baru
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Memasukkan data awal ke tabel admin_profile
  insert into public.admin_profile (id, nama, role)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'nama_lengkap', 'Admin Baru'), 
    'admin'
  );
  
  -- Memasukkan data default workspace untuk admin tersebut
  insert into public.workspace (nama_workspace, user_id)
  values (
    'Workspace Utama - ' || coalesce(new.raw_user_meta_data->>'nama_lengkap', 'Admin Baru'), 
    new.id
  );

  return new;
end;
$$ language plpgsql security definer;

-- 2. Pasang trigger tersebut agar menyala otomatis saat auth.users diisi
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

> **Catatan Tindak Lanjut**: Setelah *trigger* ini diaktifkan di *database*, pemanggilan `supabase.from('admin_profile').insert(...)` di file `lib/services/auth.ts` menjadi tidak diperlukan lagi (opsional untuk dihapus agar tidak *redundant*).
