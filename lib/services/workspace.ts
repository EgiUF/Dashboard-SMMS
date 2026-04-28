import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export async function getUserWorkspaces(userId: string) {
  const { data, error } = await supabase
    .from('workspace')
    .select('*')
    .eq('id_user', userId);

  if (error) {
    console.error('Error fetching workspaces:', error);
    throw error;
  }

  return data;
}

export async function getWorkspaceById(workspaceId: number) {
  const { data, error } = await supabase
    .from('workspace')
    .select('*')
    .eq('id_workspace', workspaceId)
    .single();

  if (error) {
    console.error('Error fetching workspace:', error);
    throw error;
  }

  return data;
}
