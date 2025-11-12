import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { VCSFactory } from '@engi/vcs';

export async function GET(
  request: Request,
  { params }: { params: { provider: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { provider } = params;
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const path = searchParams.get('path') || '';
    
    if (!owner || !repo) {
      return NextResponse.json({ 
        error: 'Owner and repo parameters are required' 
      }, { status: 400 });
    }

    // Get the VCS connection
    const { data: connection, error: connectionError } = await supabase
      .from('user_vcs_connections')
      .select('*')
      .eq('userId', user.id)
      .eq('provider', provider)
      .single();

    if (connectionError || !connection) {
      return NextResponse.json({ 
        error: `No ${provider} connection found` 
      }, { status: 404 });
    }

    // Create VCS provider instance
    const vcsProvider = await VCSFactory.createProvider(
      provider as any,
      {
        accessToken: connection.accessToken,
        refreshToken: connection.refreshToken,
        expiresAt: connection.expiresAt ? new Date(connection.expiresAt) : undefined,
        instanceUrl: connection.instanceUrl
      },
      {
        userId: user.id,
        supabase
      }
    );

    // Get file tree
    const files = await vcsProvider.getFileTree(owner, repo, path);
    
    // Transform to match expected format
    const formattedFiles = files.map(file => ({
      name: file.name,
      path: file.path,
      sha: file.sha || '',
      size: file.size || 0,
      type: file.type === 'tree' ? 'dir' : 'file',
      url: file.url || '',
      download_url: file.downloadUrl || ''
    }));
    
    return NextResponse.json({ files: formattedFiles });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch files' 
    }, { status: 500 });
  }
}