import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export async function getKonten(workspaceId?: string | number) {
  let query = supabase.from('konten').select('*, evaluasi(*)');
  
  if (workspaceId) {
    query = query.eq('id_workspace', workspaceId);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching konten:', error);
    throw error;
  }
  return data;
}

export async function createKonten(konten: any) {
  const { data, error } = await supabase
    .from('konten')
    .insert([konten])
    .select()
    .single();

  if (error) {
    console.error('Error creating konten:', error);
    throw error;
  }

  return data;
}

export async function updateKonten(id: string | number, updates: any) {
  const { data, error } = await supabase
    .from('konten')
    .update(updates)
    .eq('id_konten', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating konten:', error);
    throw error;
  }

  return data;
}

export async function deleteKonten(id: string | number) {
  const { error } = await supabase
    .from('konten')
    .delete()
    .eq('id_konten', id);

  if (error) {
    console.error('Error deleting konten:', error);
    throw error;
  }
}


export async function getTopKonten(workspaceId: number, year: number, month: number, metric: string = 'views', limit: number = 5) {
  const { data, error } = await supabase.rpc('get_top_konten_bulanan', {
    p_workspace_id: workspaceId,
    p_year: year,
    p_month: month,
    p_metric: metric,
    p_limit: limit,
  });

  if (error) {
    console.error('Error fetching top konten:', error);
    throw error;
  }
  return data;
}

export async function getGrowth(workspaceId: number, year: number, month: number) {
  const { data, error } = await supabase.rpc('get_growth_views_bulanan', {
    p_workspace_id: workspaceId,
    p_year: year,
    p_month: month,
  });

  if (error) {
    console.error('Error fetching growth:', error);
    throw error;
  }
  return data?.[0] || null;
}

// ==========================================
// FUNGSI STORAGE & UPLOAD UNTUK FRONTEND
// ==========================================

/**
 * 1. Fungsi Upload yang "Satu Pintu" & 4. Validasi Pencegahan Error
 * Mengunggah file ke bucket konten-media, memvalidasi tipe/ukuran, dan mereturn Public URL.
 */
export async function uploadAsset(file: File, workspaceId: string | number) {
  // Validasi: Hanya menerima gambar atau video
  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
    throw new Error('Tipe file tidak didukung. Mohon unggah gambar atau video.');
  }

  // Validasi: Ukuran maksimal 50MB
  const MAX_SIZE_MB = 50;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`Ukuran file terlalu besar. Maksimal pengunggahan adalah ${MAX_SIZE_MB}MB.`);
  }

  // 3. Folder/Pathing Terorganisir berdasarkan ID Workspace
  // Membersihkan nama file dari spasi dan karakter aneh agar URL friendly
  const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${workspaceId}/${Date.now()}_${safeFileName}`;

  // Mengunggah ke Supabase Storage
  const { error } = await supabase.storage
    .from('konten-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false // Jangan timpa file dengan nama sama (karena sudah pakai Date.now)
    });

  if (error) {
    console.error('Error saat upload aset:', error);
    throw new Error(`Gagal mengunggah file: ${error.message}`);
  }

  // Langsung mengambil Public URL
  const { data: publicUrlData } = supabase.storage
    .from('konten-media')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

/**
 * 2. Integrasi ke Tabel Konten
 * Mengunggah file media lalu langsung menyimpannya ke tabel konten.
 */
export async function saveKontenWithMedia(kontenData: any, file: File) {
  if (!kontenData.id_workspace) {
    throw new Error('Data gagal disimpan: id_workspace tidak ditemukan.');
  }

  try {
    // A. Proses upload dan ambil URL-nya
    const publicUrl = await uploadAsset(file, kontenData.id_workspace);

    // B. Gabungkan URL ke properti link_konten
    const payload = {
      ...kontenData,
      link_konten: publicUrl
    };

    // C. Simpan ke database menggunakan fungsi createKonten yang sudah ada
    return await createKonten(payload);
  } catch (error) {
    throw error;
  }
}

