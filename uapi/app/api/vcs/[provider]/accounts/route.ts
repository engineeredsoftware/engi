import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// TODO: VCS-core package needs to be implemented
// import { VCSFactory } from '@engi/vcs';

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

    // Get accounts/namespaces/workspaces based on provider
    if (provider === 'github') {
      // For GitHub, get installations
      const response = await fetch('https://api.github.com/user/installations', {
        headers: {
          'Authorization': `Bearer ${connection.accessToken}`,
          'Accept': 'application/vnd.github+json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub installations');
      }

      const data = await response.json();
      const accounts = data.installations.map((installation: any) => ({
        id: installation.id,
        login: installation.account.login,
        type: installation.account.type,
        name: installation.account.name || installation.account.login,
        avatar_url: installation.account.avatar_url,
        url: installation.account.html_url
      }));

      return NextResponse.json({ accounts });
    } else if (provider === 'gitlab') {
      // For GitLab, get namespaces
      const baseUrl = connection.instanceUrl || 'https://gitlab.com';
      const response = await fetch(`${baseUrl}/api/v4/namespaces`, {
        headers: {
          'PRIVATE-TOKEN': connection.accessToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch GitLab namespaces');
      }

      const namespaces = await response.json();
      return NextResponse.json({ namespaces });
    } else if (provider === 'bitbucket') {
      // For Bitbucket, get workspaces
      const response = await fetch('https://api.bitbucket.org/2.0/workspaces', {
        headers: {
          'Authorization': `Bearer ${connection.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Bitbucket workspaces');
      }

      const data = await response.json();
      return NextResponse.json({ workspaces: data.values });
    }

    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch accounts' 
    }, { status: 500 });
  }
}