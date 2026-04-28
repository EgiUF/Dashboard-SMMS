import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export async function registerAdmin(email: string, password: string, namaLengkap: string, role: string = 'admin') {
  // 1. Register Auth User
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw authError;
  }

  const userId = authData.user?.id;

  if (userId) {
    // 2. Insert into admin_profile
    const { error: profileError } = await supabase
      .from('admin_profile')
      .insert([
        {
          id: userId,
          nama_lengkap: namaLengkap,
          email: email,
          role: role,
        }
      ]);

    if (profileError) {
      console.error('Error inserting admin profile:', profileError);
      // Depending on requirements, we might want to revert auth or notify admin
      throw profileError;
    }

    // 3. Create a default workspace or handle workspace relation
    // For now, let's assume an initial workspace is created or assigned
    const { data: workspaceData, error: workspaceError } = await supabase
      .from('workspace')
      .insert([
        {
          nama_workspace: `Workspace - ${namaLengkap}`,
          id_admin: userId
        }
      ])
      .select('id_workspace')
      .single();
      
    if (workspaceError) {
       console.error('Error creating default workspace:', workspaceError);
       // Throw error or handle gracefully
    }
  }

  return authData;
}

export async function loginAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function logoutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`,
  });

  if (error) {
    throw error;
  }

  return data;
}
