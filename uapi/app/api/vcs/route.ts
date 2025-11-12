import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@engi/supabase/ssr/server';
import { VCSProviderFactory, buildCacheKey, VCSProviderType } from '@engi/vcs';
import { uapiVCSCache as vcsCache } from '@/lib/browser-vcs-caching';
import { GitHubService } from '@engi/api';
// supabaseAdmin unused here; using request-scoped client

/**
 * Unified VCS API endpoint
 * GET /api/vcs?provider=github&resource=accounts
 * GET /api/vcs?provider=github&resource=repositories&owner=foo
 * GET /api/vcs?provider=github&resource=branches&owner=foo&repo=bar
 * GET /api/vcs?provider=github&resource=commits&owner=foo&repo=bar&branch=main
 */

type VCSResource = 'connections' | 'accounts' | 'repositories' | 'branches' | 'commits' | 'issues' | 'files';

/**
 * Resource handlers map - zero runtime cost
 */
const RESOURCE_HANDLERS: Record<VCSResource, (
  provider: VCSProviderType,
  connection: any,
  params: URLSearchParams
) => Promise<any>> = {
  connections: async (provider, connection, params) => {
    // Return all connections - no provider needed
    return { connections: [connection] };
  },

  accounts: async (provider, connection, params) => {
    if (provider === 'github') {
      const connData = connection.metadata || {};
      
      // Use GitHubService to get accounts with proper token refresh
      const accounts = await GitHubService.getAccounts(
        connData,
        connection.userid,
        null // Don't update DB from here, let GitHubService decide
      );
      
      return { accounts };
    } else if (provider === 'gitlab') {
      const baseUrl = connection.instanceurl || 'https://gitlab.com';
      const response = await fetch(`${baseUrl}/api/v4/namespaces`, {
        headers: { 'PRIVATE-TOKEN': connection.accesstoken }
      });
      return { namespaces: await response.json() };
    } else if (provider === 'bitbucket') {
      const response = await fetch('https://api.bitbucket.org/2.0/workspaces', {
        headers: { 'Authorization': `Bearer ${connection.accesstoken}` }
      });
      const data = await response.json();
      return { workspaces: data.values };
    }
    throw new Error(`Unsupported provider: ${provider}`);
  },

  repositories: async (provider, connection, params) => {
    const owner = params.get('owner');
    if (!owner) throw new Error('Owner parameter required');

    if (provider === 'github') {
      const connData = connection.metadata || {};
      
      try {
        // Use GitHubService with automatic token refresh
        const repositories = await GitHubService.listRepositories(
          connData,
          connection.userid,
          null, // Don't update DB from here, let GitHubService decide
          {
            type: 'all',
            perPage: 100
          }
        );
      
      // Filter by owner if needed
      // Special cases for generic accounts that should return all repos
      const isGenericAccount = 
        owner === 'GitHub Account' || 
        owner === 'All Repositories' ||
        owner.startsWith('github-') || 
        owner === 'default' ||
        owner === 'all';
      
      const filteredRepos = isGenericAccount ? repositories : 
        repositories.filter(r => r.owner.username === owner || r.owner.id === owner);
      
        return { repositories: filteredRepos };
      } catch (error) {
        console.error('GitHub repository fetch failed:', error);
        
        // Provide user-friendly error message
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('Bad credentials') || errorMessage.includes('401')) {
          throw new Error('GitHub authentication failed. We are unable to refresh your token automatically. Please try again later or contact support.');
        } else if (errorMessage.includes('404')) {
          throw new Error('GitHub installation not found. Please reinstall the GitHub App.');
        } else if (errorMessage.includes('422')) {
          throw new Error('GitHub App permissions insufficient. Please update app permissions.');
        }
        
        throw error;
      }
    } else {
      // Non-GitHub providers use the standard flow
      const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, connection.instanceurl || undefined);

      const auth = {
        accessToken: connection.accesstoken,
        refreshToken: connection.refreshtoken,
        expiresAt: connection.expiresat ? new Date(connection.expiresat) : undefined
      };

      const repositories = await vcsProvider.listRepositories(auth, {
        type: 'all',
        perPage: 100
      });
      
      const filteredRepos = owner === 'all' ? repositories : 
        repositories.filter(r => r.owner.username === owner || r.owner.id === owner);
      
      return { repositories: filteredRepos };
    }
  },

  branches: async (provider, connection, params) => {
    const owner = params.get('owner');
    const repo = params.get('repo');
    if (!owner || !repo) throw new Error('Owner and repo parameters required');

    if (provider === 'github') {
      const connData = connection.metadata || {};
      
      try {
        // Use GitHubService to get valid auth with token refresh
        const auth = await GitHubService.getValidAuth(
          connData,
          connection.userid,
          null // Don't update DB from here
        );
        
        const vcsProvider = await VCSProviderFactory.createFromEnvironment('github');
        
        const [repository, branches] = await Promise.all([
          vcsProvider.getRepository(auth, owner, repo),
          vcsProvider.listBranches(auth, owner, repo)
        ]);
        
        return { 
          branches,
          defaultBranch: repository.defaultBranch 
        };
      } catch (error) {
        console.error('GitHub branches fetch failed:', error);
        
        // Provide user-friendly error message
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('Bad credentials') || errorMessage.includes('401')) {
          throw new Error('GitHub authentication failed. We are unable to refresh your token automatically. Please try again later or contact support.');
        } else if (errorMessage.includes('404')) {
          throw new Error('Repository not found or GitHub installation was removed. Please check repository access.');
        } else if (errorMessage.includes('422')) {
          throw new Error('GitHub App permissions insufficient. Please update app permissions.');
        }
        
        throw error;
      }
    } else {
      // Non-GitHub providers use the standard flow
      const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, connection.instanceurl || undefined);

      const auth = {
        accessToken: connection.accesstoken,
        refreshToken: connection.refreshtoken,
        expiresAt: connection.expiresat ? new Date(connection.expiresat) : undefined
      };

      const [repository, branches] = await Promise.all([
        vcsProvider.getRepository(auth, owner, repo),
        vcsProvider.listBranches(auth, owner, repo)
      ]);

      return { 
        branches,
        defaultBranch: repository.defaultBranch 
      };
    }
  },

  commits: async (provider, connection, params) => {
    const owner = params.get('owner');
    const repo = params.get('repo');
    const branch = params.get('branch');
    if (!owner || !repo || !branch) throw new Error('Owner, repo, and branch parameters required');

    if (provider === 'github') {
      const connData = connection.metadata || {};
      
      try {
        // Use GitHubService with automatic token refresh
        const commits = await GitHubService.listCommits(
          connData,
          owner,
          repo,
          { branch, perPage: 100 },
          connection.userid,
          null // Don't update DB from here, let GitHubService decide
        );
        
        return { commits };
      } catch (error) {
        console.error('GitHub commits fetch failed:', error);
        
        // Provide user-friendly error message
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('Bad credentials') || errorMessage.includes('401')) {
          throw new Error('GitHub authentication failed. We are unable to refresh your token automatically. Please try again later or contact support.');
        } else if (errorMessage.includes('404')) {
          throw new Error('Branch not found or GitHub installation was removed. Please check repository access.');
        } else if (errorMessage.includes('422')) {
          throw new Error('GitHub App permissions insufficient. Please update app permissions.');
        }
        
        throw error;
      }
    } else {
      // Non-GitHub providers use the standard flow
      const vcsProvider = await VCSProviderFactory.create({
        provider,
        clientId: process.env[`${provider.toUpperCase()}_CLIENT_ID`] || '',
        clientSecret: process.env[`${provider.toUpperCase()}_CLIENT_SECRET`] || '',
        redirectUri: process.env.VCS_REDIRECT_URI || '',
        instanceUrl: connection.instanceurl
      });

      const auth = {
        accessToken: connection.accesstoken,
        refreshToken: connection.refreshtoken,
        expiresAt: connection.expiresat ? new Date(connection.expiresat) : undefined
      };

      const commits = await vcsProvider.listCommits(auth, owner, repo, { branch });
      return { commits };
    }
  },

  issues: async (provider, connection, params) => {
    const owner = params.get('owner');
    const repo = params.get('repo');
    if (!owner || !repo) throw new Error('Owner and repo parameters required');

    if (provider === 'github') {
      const connData = connection.metadata || {};
      
      // Use GitHubService to get valid auth with token refresh
      const auth = await GitHubService.getValidAuth(
        connData,
        connection.userid,
        null // Don't update DB from here
      );
      
      const vcsProvider = await VCSProviderFactory.createFromEnvironment('github');
      
      const [issues, pullRequests] = await Promise.all([
        vcsProvider.listIssues(auth, owner, repo, { state: 'all', perPage: 50 }),
        vcsProvider.listPullRequests(auth, owner, repo, { state: 'all', perPage: 50 })
      ]);
      
      return { 
        issues: [...issues, ...pullRequests.map(pr => ({ ...pr, pull_request: {} }))]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      };
    } else {
      // Non-GitHub providers use the standard flow
      const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, connection.instanceurl || undefined);

      const auth = {
        accessToken: connection.accesstoken,
        refreshToken: connection.refreshtoken,
        expiresAt: connection.expiresat ? new Date(connection.expiresat) : undefined
      };

      const [issues, pullRequests] = await Promise.all([
        vcsProvider.listIssues(auth, owner, repo, { state: 'all', perPage: 50 }),
        vcsProvider.listPullRequests(auth, owner, repo, { state: 'all', perPage: 50 })
      ]);

      return { 
        issues: [...issues, ...pullRequests.map(pr => ({ ...pr, pull_request: {} }))]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      };
    }
  },

  files: async (provider, connection, params) => {
    const owner = params.get('owner');
    const repo = params.get('repo');
    const path = params.get('path') || '';
    if (!owner || !repo) throw new Error('Owner and repo parameters required');

    if (provider === 'github') {
      const connData = connection.metadata || {};
      
      // Use GitHubService to get valid auth with token refresh
      const auth = await GitHubService.getValidAuth(
        connData,
        connection.userid,
        null // Don't update DB from here
      );
      
      const vcsProvider = await VCSProviderFactory.createFromEnvironment('github');
      
      const files = await vcsProvider.listFiles ? 
        await vcsProvider.listFiles(auth, owner, repo, path) : 
        [];
      return { 
        files: files.map(file => ({
          name: file.name,
          path: file.path,
          sha: file.sha || '',
          size: file.size || 0,
          type: file.type === 'tree' ? 'dir' : 'file',
          url: file.url || '',
          download_url: file.downloadUrl || ''
        }))
      };
    } else {
      // Non-GitHub providers use the standard flow
      const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, connection.instanceurl || undefined);

      const auth = {
        accessToken: connection.accesstoken,
        refreshToken: connection.refreshtoken,
        expiresAt: connection.expiresat ? new Date(connection.expiresat) : undefined
      };

      const files = await vcsProvider.listFiles ? 
        await vcsProvider.listFiles(auth, owner, repo, path) : 
        [];
      return { 
        files: files.map(file => ({
          name: file.name,
          path: file.path,
          sha: file.sha || '',
          size: file.size || 0,
          type: file.type === 'tree' ? 'dir' : 'file',
          url: file.url || '',
          download_url: file.downloadUrl || ''
        }))
      };
    }
  }
};

export async function GET(request: NextRequest) {
  try {
    // Normalize auth using server-side Supabase client (matches other GA‑1 routes)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider') as VCSProviderType | null;
    const resource = searchParams.get('resource') as VCSResource;

    if (!resource || !RESOURCE_HANDLERS[resource]) {
      return NextResponse.json({ 
        error: 'Invalid resource. Valid resources: ' + Object.keys(RESOURCE_HANDLERS).join(', ') 
      }, { status: 400 });
    }

    // Special case for connections - get all VCS connections from user_connections table
    if (resource === 'connections') {
      if (!user) {
        // Graceful empty response for unauthenticated state
        return NextResponse.json({ connections: [] });
      }
      // Get all VCS connections from the unified table
      const { data: userConnections, error: connError } = await supabase
        .from('user_connections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (connError) throw connError;
      
      // Transform connections to VCS connection format
      const connections = (userConnections || []).map(conn => {
        const connData = conn.connection_data as any;
        return {
          id: conn.id,
          userid: conn.user_id,
          provider: conn.provider as VCSProviderType,
          accesstoken: connData?.access_token || connData?.installation_token || connData?.oauth_token,
          refreshtoken: connData?.refresh_token || null,
          expiresat: connData?.token_expires_at || connData?.installation_token_expires_at,
          instanceurl: connData?.instance_url || null,
          createdat: conn.created_at,
          updatedat: conn.updated_at,
          metadata: connData
        };
      });
      
      return NextResponse.json({ connections });
    }

    // All other resources require a provider
    if (!provider) {
      return NextResponse.json({ error: 'Provider parameter required' }, { status: 400 });
    }

    // Get the VCS connection from the unified user_connections table
    if (!user) {
      // Graceful empty response for unauthenticated state on non-connections resources
      switch (resource) {
        case 'accounts': return NextResponse.json({ accounts: [] });
        case 'repositories': return NextResponse.json({ repositories: [] });
        case 'branches': return NextResponse.json({ branches: [], defaultBranch: null });
        case 'commits': return NextResponse.json({ commits: [] });
        case 'issues': return NextResponse.json({ issues: [] });
        case 'files': return NextResponse.json({ files: [] });
      }
    }

    const { data: userConn, error: connError } = await supabase
      .from('user_connections')
      .select('*')
      .eq('user_id', user!.id)
      .eq('provider', provider)
      .single();
    
    if (connError || !userConn) {
      return NextResponse.json({ 
        error: `No ${provider} connection found` 
      }, { status: 404 });
    }
    
    // Transform to VCS connection format
    const connData = userConn.connection_data as any;
    
    // Debug logging for token state
    console.log('Connection data state:', {
      hasInstallationToken: !!connData?.installation_token,
      hasAccessToken: !!connData?.access_token,
      hasOAuthToken: !!connData?.oauth_token,
      installationId: connData?.installation_id,
      hasInstallationId: !!connData?.installation_id,
      tokenPrefix: connData?.installation_token?.substring(0, 10) || connData?.access_token?.substring(0, 10),
      expiresAt: connData?.installation_token_expires_at,
      isExpired: connData?.installation_token_expires_at ? 
        new Date(connData.installation_token_expires_at) < new Date() : 'no expiry',
      resource,
      provider
    });
    
    const connection = {
      userid: userConn.user_id,
      provider: userConn.provider as VCSProviderType,
      accesstoken: connData?.access_token || connData?.installation_token || connData?.oauth_token,
      refreshtoken: connData?.refresh_token || null,
      expiresat: connData?.token_expires_at || connData?.installation_token_expires_at,
      instanceurl: connData?.instance_url || null,
      metadata: connData  // Pass full connection data as metadata
    };


    // Build cache key from request parameters
    const cacheKey = buildCacheKey(
      `vcs:${resource}`,
      user!.id,
      provider,
      ...Array.from(searchParams.entries()).flat()
    );

    // For GitHub, check if token might be expired to bypass cache
    let bypassCache = false;
    if (provider === 'github' && connection.metadata?.installation_token_expires_at) {
      const expiresAt = new Date(connection.metadata.installation_token_expires_at);
      bypassCache = expiresAt < new Date();
      if (bypassCache) {
        console.log('Bypassing cache due to expired GitHub installation token');
      }
    }

    // Execute with or without caching based on token state
    const result = bypassCache ? 
      await RESOURCE_HANDLERS[resource](provider, connection, searchParams) :
      await vcsCache.getOrFetch(
        cacheKey,
        () => RESOURCE_HANDLERS[resource](provider, connection, searchParams)
      );
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('VCS API error:', error);
    
    // Determine appropriate status code
    let status = 500;
    let errorMessage = error instanceof Error ? error.message : 'Internal server error';
    
    if (errorMessage.includes('authentication') || errorMessage.includes('credentials')) {
      status = 401;
    } else if (errorMessage.includes('not found')) {
      status = 404;
    } else if (errorMessage.includes('permissions')) {
      status = 403;
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      code: status === 401 ? 'AUTH_EXPIRED' : 
            status === 404 ? 'NOT_FOUND' : 
            status === 403 ? 'PERMISSION_DENIED' : 'SERVER_ERROR'
    }, { status });
  }
}
