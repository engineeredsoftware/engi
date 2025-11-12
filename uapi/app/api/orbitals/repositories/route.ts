import { createClient } from '@engi/supabase/ssr/server';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { log } from '@engi/logger';

/**
 * GET /api/user/repositories
 * Fetches the user's GitHub repositories for procurement marketplace opt-in
 */
export async function GET(request: Request) {
  const requestId = crypto.randomUUID();
  
  log('[route /user/repositories GET] Request started', 'info', { requestId });
  
  // Initialize Supabase auth client
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    log('[route /user/repositories GET] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }

  try {
    // First, get the user's GitHub integration info from user_connections table
    const { data: connectionRow } = await supabase
      .from('user_connections')
      .select('connection_data')
      .eq('user_id', user.id)
      .eq('provider', 'github')
      .single();

    const connectionData = connectionRow?.connection_data as any;
    const accessToken = connectionData?.access_token || connectionData?.installation_token || connectionData?.oauth_token;
    const githubUsername = connectionData?.provider_username || connectionData?.github_user_login;

    if (!accessToken) {
      log('[route /user/repositories GET] No GitHub connection found', 'warn', { requestId, userId: user.id });
      return createErrorResponse('GitHub account not connected. Please connect your GitHub account first.');
    }

    // Fetch repositories from GitHub API
    // Use Bearer format for installation tokens, token format for OAuth tokens
    const authHeader = accessToken.startsWith('ghs_') 
      ? `Bearer ${accessToken}` 
      : `token ${accessToken}`;
    
    const githubResponse = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Engi-Procurement-Bot'
      }
    });

    if (!githubResponse.ok) {
      log('[route /user/repositories GET] GitHub API error', 'error', { 
        requestId, 
        status: githubResponse.status,
        statusText: githubResponse.statusText 
      });
      return createErrorResponse('Failed to fetch repositories from GitHub');
    }

    const repositories = await githubResponse.json();

    // Filter and format repositories for procurement opt-in
    const formattedRepos = repositories
      .filter((repo: any) => {
        // Only include repositories that:
        // 1. User has admin access to (can opt into marketplace)
        // 2. Are not forks (original work preferred)
        // 3. Have been updated in the last 2 years (active projects)
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
        const updatedAt = new Date(repo.updated_at);
        
        return repo.permissions?.admin && 
               !repo.fork && 
               updatedAt > twoYearsAgo;
      })
      .map((repo: any) => ({
        id: repo.id.toString(),
        full_name: repo.full_name,
        name: repo.name,
        description: repo.description,
        private: repo.private,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        topics: repo.topics || [],
        has_issues: repo.has_issues,
        has_projects: repo.has_projects,
        archived: repo.archived
      }))
      .filter((repo: any) => !repo.archived) // Exclude archived repositories
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()); // Sort by most recently updated

    log('[route /user/repositories GET] Repositories fetched successfully', 'info', { 
      requestId, 
      userId: user.id,
      totalRepos: repositories.length,
      eligibleRepos: formattedRepos.length
    });

    return createJsonResponse({
      repositories: formattedRepos,
      total: formattedRepos.length,
      github_username: githubUsername
    });

  } catch (error: any) {
    log('[route /user/repositories GET] Unhandled error', 'error', { 
      requestId, 
      error: error.message,
      stack: error.stack 
    });
    return createErrorResponse('Failed to fetch repositories');
  }
}