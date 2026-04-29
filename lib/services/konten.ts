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
