import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export async function getUserWorkspaces(userId: string) {
  const { data, error } = await supabase
    .from('workspace')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching workspaces:', error);
    throw error;
  }

  return data;
}

export async function createWorkspace(userId: string, name: string) {
  const { data, error } = await supabase
    .from('workspace')
    .insert([
      {
        nama_workspace: name,
        user_id: userId,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating workspace:', error);
    throw error;
  }

  return data;
}

export async function getWorkspaceById(workspaceId: string | number) {
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

