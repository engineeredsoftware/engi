import { NextResponse } from 'next/server';
import { createClient } from '@engi/supabase/ssr/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all VCS connections for the user
    const { data: connections, error } = await supabase
      .from('user_vcs_connections')
      .select('*')
      .eq('userid', user.id)
      .order('createdat', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ 
      connections: connections || [] 
    });
  } catch (error) {
    console.error('Error fetching VCS connections:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch connections' 
    }, { status: 500 });
  }
}