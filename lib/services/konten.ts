import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export async function getKonten(workspaceId?: number) {
  let query = supabase.from('konten').select('*');
  
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
