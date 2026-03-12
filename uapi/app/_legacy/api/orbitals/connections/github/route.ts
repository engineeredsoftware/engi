import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
// Use the authenticated client so RLS (`auth.uid() = user_id`) succeeds.
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { ENABLE_MOCKS, MOCK_USER_ORBITAL } from '@/config/featureFlags';
import userConnectionsMock from '@/mocks/user-connections.json';
import { log } from '@engi/logger';
import { app } from '@/octokit';
import * as crypto from 'crypto';
import type { NextRequest } from 'next/server';
import { VCSService, VCSConnections } from '@engi/vcs';
import { GitHubAppAuth } from '@engi/github';

/**
 * POST /api/user/connections/github
 * Stores or updates GitHub connection data for the authenticated user.
 */
const POSTHandler = async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  // Return mock if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return createJsonResponse({ success: true });
  }
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  log('[route /user/connections/github POST] Request started', 'info', { requestId, url: requestUrl });
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    log('[route /user/connections/github POST] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }
  log('[route /user/connections/github POST] Authentication successful', 'info', { requestId, userId: user.id });
  let body: any;
  // Parse and validate request body
  try {
    body = await request.json();
    log('[route /user/connections/github POST] Request body parsed', 'debug', { requestId, body });
  } catch {
    log('[route /user/connections/github POST] Invalid JSON body', 'error', { requestId });
    return new Response('Invalid JSON', { status: 400 });
  }
  const { connectionId, installationId, code } = body;
  
  // We may receive either:
  // 1. installationId + code (from GitHub callback with both OAuth and App installation)
  // 2. connectionId only (legacy format, treat as installation ID)
  const effectiveInstallationId = installationId || connectionId;
  
  if (!effectiveInstallationId || isNaN(Number(effectiveInstallationId))) {
    log('[route /user/connections/github POST] Invalid installation ID', 'warn', { 
      requestId, 
      connectionId, 
      installationId 
    });
    return createErrorResponse(new Error('Invalid installation ID'), 400);
  }
  try {
    log('[route /user/connections/github POST] Processing GitHub connection', 'info', { 
      requestId, 
      userId: user.id,
      hasCode: !!code,
      installationId: effectiveInstallationId
    });
    
    // Preserve any existing data
    const { data: existingRec } = await supabase
      .from('user_connections')
      .select('connection_data')
      .eq('user_id', user.id)
      .eq('provider', 'github')
      .maybeSingle();
    const oldData = existingRec?.connection_data || {};
    
    // Prepare connection data with installation ID
    const connectionData: any = { 
      ...oldData, 
      connectionId: effectiveInstallationId
    };
    
    // Handle dual authentication flow:
    // 1. OAuth token for user authentication (if code provided)
    // 2. Installation token for repository access (always needed)
    
    let oauthToken = connectionData.oauth_token || connectionData.access_token;
    let installationToken = null;
    
    // Step 1: Exchange OAuth code if provided (for user authentication)
    // Note: OAuth codes can only be used once and expire quickly
    // For GitHub App installations, the installation token is more important
    if (code && !oauthToken) {
      try {
        log('[route /user/connections/github POST] Exchanging OAuth code for user token', 'info', { 
          requestId,
          hasClientId: !!process.env.AUTH_GITHUB_ID,
          hasClientSecret: !!process.env.AUTH_GITHUB_SECRET,
          codeLength: code.length,
          codePrefix: code.substring(0, 8)
        });
        
        // Use GitHub App OAuth credentials if available, fallback to regular OAuth
        const clientId = process.env.GITHUB_APP_CLIENT_ID || process.env.AUTH_GITHUB_ID || process.env.GITHUB_OAUTH_CLIENT_ID || '';
        const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET || process.env.AUTH_GITHUB_SECRET || process.env.GITHUB_OAUTH_CLIENT_SECRET || '';
        
        const params = new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        });
        
        const res = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: params,
        });
        
        const json = await res.json();
        log('[route /user/connections/github POST] OAuth token exchange response', 'info', { 
          requestId, 
          status: res.status,
          hasToken: !!json.access_token,
          error: json.error,
          errorDescription: json.error_description
        });
        
        if (res.ok && json.access_token) {
          oauthToken = json.access_token;
          connectionData.oauth_token = oauthToken;
          connectionData.oauth_scope = json.scope;
          log('[route /user/connections/github POST] OAuth token obtained successfully', 'info', { requestId });
        } else {
          log('[route /user/connections/github POST] OAuth token exchange failed', 'warn', { 
            requestId, 
            response: json,
            note: 'OAuth codes can only be used once. This is expected if the code was already used.'
          });
          // OAuth failure is not critical for GitHub App installations
          // The installation token is sufficient for repository operations
        }
      } catch (ex) {
        log('[route /user/connections/github POST] OAuth token exchange error', 'error', { 
          requestId, 
          error: ex,
          note: 'Continuing with installation token only'
        });
        // Continue to try installation token
      }
    }
    
    // Step 2: Generate installation access token for repository access
    try {
      const appId = process.env.GITHUB_APP_ID;
      const privateKey = process.env.GITHUB_PRIVATE_KEY;
      
      if (appId && privateKey) {
        log('[route /user/connections/github POST] Generating installation access token', 'info', { 
          requestId,
          installation_id: effectiveInstallationId
        });
        
        const githubApp = new GitHubAppAuth({
          appId,
          privateKey,
          clientId: process.env.GITHUB_APP_CLIENT_ID,
          clientSecret: process.env.GITHUB_APP_CLIENT_SECRET
        });
        
        // Don't request specific permissions - use whatever the installation has granted
        // This avoids 422 errors when requesting permissions not available to the installation
        const installationTokenData = await githubApp.generateInstallationToken(
          Number(effectiveInstallationId)
          // Omitting permissions parameter to use installation's granted permissions
        );
        
        installationToken = installationTokenData.token;
        connectionData.installation_token = installationToken;
        connectionData.installation_token_expires_at = installationTokenData.expiresAt.toISOString();
        connectionData.installation_permissions = installationTokenData.permissions;
        connectionData.installation_repository_selection = installationTokenData.repositorySelection;
        
        log('[route /user/connections/github POST] Installation token generated successfully', 'info', { 
          requestId,
          expiresAt: installationTokenData.expiresAt,
          permissions: installationTokenData.permissions,
          repositorySelection: installationTokenData.repositorySelection,
          tokenPrefix: installationToken.substring(0, 10),
          installation_id: effectiveInstallationId
        });
      } else {
        log('[route /user/connections/github POST] GitHub App not configured, using OAuth only', 'warn', { 
          requestId,
          hasAppId: !!appId,
          hasPrivateKey: !!privateKey
        });
      }
    } catch (appError) {
      log('[route /user/connections/github POST] Failed to generate installation token', 'error', { 
        requestId, 
        error: appError 
      });
      // Continue with OAuth token if available
    }
    
    // Use the best available token for the access_token field
    // Prefer installation token for repository operations
    const primaryToken = installationToken || oauthToken;
    
    if (!primaryToken) {
      log('[route /user/connections/github POST] No valid token obtained', 'error', { 
        requestId,
        hasOAuth: !!oauthToken,
        hasInstallation: !!installationToken
      });
      return createErrorResponse(new Error('Failed to obtain valid authentication token'), 400);
    }
    
    // Save the connection with all tokens
    connectionData.access_token = primaryToken;  // Primary token for VCS operations
    
    try {
      const vcsConnections = new VCSConnections(supabase);
      await vcsConnections.saveConnection(
        user.id,
        'github',
        {
          accessToken: primaryToken,
          providerUserId: effectiveInstallationId.toString(),
          providerUsername: effectiveInstallationId.toString(),
          metadata: connectionData
        }
      );
      
      log('[route /user/connections/github POST] GitHub connection saved successfully', 'info', { 
        requestId,
        hasOAuthToken: !!oauthToken,
        hasInstallationToken: !!installationToken,
        primaryTokenType: installationToken ? 'installation' : 'oauth'
      });
    } catch (saveError) {
      log('[route /user/connections/github POST] Failed to save connection', 'error', { 
        requestId, 
        error: saveError 
      });
      return createErrorResponse(saveError);
    }
    // CRITICAL: Synchronously fetch repositories on first installation
    // This ensures the user sees repos immediately when they return to the connects pane
    let repositories: any[] = [];
    if (primaryToken) {
      try {
        log('[route /user/connections/github POST] Starting repository sync', 'info', {
          requestId,
          userId: user.id,
          tokenType: installationToken ? 'installation' : 'oauth',
          installation_id: effectiveInstallationId
        });
        
        // Initialize VCS Service to fetch and store repositories
        const vcsService = new VCSService({ supabaseClient: supabaseAdmin });
        
        log('[route /user/connections/github POST] VCS Service initialized, fetching repositories', 'debug', {
          requestId,
          userId: user.id
        });
        
        // Fetch repositories from GitHub
        repositories = await vcsService.listRepositories(user.id);
        
        log('[route /user/connections/github POST] Fetched repositories from GitHub', 'info', {
          requestId,
          userId: user.id,
          repositoryCount: repositories.length,
          repositoryNames: repositories.slice(0, 5).map((r: any) => r.fullName || r.name) // Log first 5 repo names
        });
        
        // Store repositories in database
        if (repositories.length > 0) {
          log('[route /user/connections/github POST] Preparing to store repositories', 'debug', {
            requestId,
            userId: user.id,
            repositoryCount: repositories.length
          });
          
          const repoRecords = repositories.map((repo: any, index: number) => {
            const record = {
              user_id: user.id,
              provider: 'github' as const,
              provider_repo_id: repo.id.toString(),  // VCS service returns standardized format
              repo_name: repo.name,
              repo_full_name: repo.fullName,
              repo_owner: repo.owner?.username || '',
              repo_description: repo.description,
              repo_language: repo.language,
              repo_default_branch: repo.defaultBranch || 'main',
              repo_private: repo.private,
              repo_url: repo.url,
              repo_data: repo,  // Store the full repo object
              repo_created_at: repo.createdAt,
              repo_updated_at: repo.updatedAt,
              synced_at: new Date().toISOString()
            };
            
            // Log first few records for debugging
            if (index < 3) {
              log('[route /user/connections/github POST] Repository record sample', 'debug', {
                requestId,
                index,
                repoId: record.provider_repo_id,
                repoName: record.repo_full_name,
                owner: record.repo_owner
              });
            }
            
            return record;
          });
          
          log('[route /user/connections/github POST] Upserting repositories to database', 'info', {
            requestId,
            recordCount: repoRecords.length
          });
          
          // Upsert repositories (update if exists, insert if new)
          const { error: repoError, data: upsertData } = await supabaseAdmin
            .from('vcs_repositories')
            .upsert(repoRecords, {
              onConflict: 'user_id,provider,provider_repo_id',
              ignoreDuplicates: false
            })
            .select('repo_full_name');
          
          if (repoError) {
            log('[route /user/connections/github POST] Failed to store repositories', 'error', {
              requestId,
              error: repoError,
              errorMessage: repoError.message,
              errorDetails: repoError.details
            });
          } else {
            log('[route /user/connections/github POST] Repositories stored successfully', 'info', {
              requestId,
              userId: user.id,
              repositoryCount: repositories.length,
              upsertedCount: upsertData?.length || 0,
              upsertedRepos: upsertData?.slice(0, 5).map(r => r.repo_full_name)
            });
          }
        } else {
          log('[route /user/connections/github POST] No repositories to store', 'warn', {
            requestId,
            userId: user.id
          });
        }
      } catch (syncError) {
        log('[route /user/connections/github POST] Repository sync failed', 'error', {
          requestId,
          error: syncError
        });
        // Don't fail the whole request if sync fails, but log it prominently
        // The user can still refresh later to get their repos
      }
    }
    
    // Update onboarding step to mark 'connects' as complete
    // Update onboarding state
    try {
      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('onboarded_steps')
        .eq('id', user.id)
        .single();
      
      let onboardedSteps = ['models']; // Default
      if (profile?.onboarded_steps) {
        try {
          const parsed = JSON.parse(profile.onboarded_steps);
          if (Array.isArray(parsed)) {
            onboardedSteps = parsed;
          }
        } catch {
          onboardedSteps = ['models'];
        }
      }
      
      // Add 'connects' if not already present
      if (!onboardedSteps.includes('connects')) {
        onboardedSteps.push('connects');
        
        await supabaseAdmin
          .from('user_profiles')
          .update({ 
            onboarded_steps: JSON.stringify(onboardedSteps),
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
      }
      log('[route /user/connections/github POST] Updated onboarding', 'info', { requestId, userId: user.id });
    } catch (flagErr) {
      log('[route /user/connections/github POST] Failed to update onboarding', 'error', { requestId, error: flagErr });
      // Don't fail the whole request if flag update fails
    }
    
    // Return the connection data and repositories in the response
    // This allows the frontend to immediately show the synced repos
    return createJsonResponse({ 
      success: true,
      repositories: repositories || [],
      connectionData: {
        connectionId: effectiveInstallationId.toString(),
        repositoryCount: repositories?.length || 0
      }
    });
  } catch (err) {
    // Log any unhandled errors
    log('[route /user/connections/github POST] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}
/**
 * GET /api/user/connections/github
 * Retrieves GitHub connection and lists installation repositories and organizations.
 */
const GETHandler = async function GET(request: NextRequest) {
  // Return mock if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return createJsonResponse(userConnectionsMock.github);
  }
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  log('[route /user/connections/github GET] Request started', 'info', { requestId, url: requestUrl });
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    log('[route /user/connections/github GET] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }
  log('[route /user/connections/github GET] Authentication successful', 'info', { requestId, userId: user.id });
  // Fetch saved GitHub connection for this user
  const { data: conn, error: connError } = await supabase
    .from('user_connections')
    .select('connection_data')
    .eq('user_id', user.id)
    .eq('provider', 'github')
    .maybeSingle();
  if (connError || !conn) {
    log('[route /user/connections/github GET] No connection found', 'info', {
      requestId,
      userId: user.id,
      connError,
    });
    return createJsonResponse({ success: false, error: 'No GitHub connection found' }, 404);
  }

  const cd = conn.connection_data as any;
  const installationId = cd.connectionId;
  if (!installationId) {
    log('[route /user/connections/github GET] Missing installation_id', 'error', {
      requestId,
      userId: user.id,
      connectionData: cd,
    });
    return createJsonResponse({ success: false, error: 'Invalid GitHub connection data' }, 400);
  }

  // ---------------------------------------------------------------------
  // Decide whether to return cached repos or trigger background refresh
  // ---------------------------------------------------------------------

  const refreshRequested = request.nextUrl.searchParams.get('refresh') === '1'
    || request.nextUrl.searchParams.get('refresh') === 'true';

  // Always attempt to read from cache first
  const { data: cachedRows, error: cacheError } = await supabase
    .from('vcs_repositories')
    .select('repo_data, updated_at')
    .eq('user_id', user.id);

  if (cacheError) {
    log('[route /user/connections/github GET] Cache fetch error', 'error', { requestId, error: cacheError });
  }

  let repos = cachedRows?.map((r: any) => r.repo_data) ?? [];

  // Determine if cache is stale (>60min) – treat absent updated_at as stale
  const isStale = (() => {
    if (!cachedRows || !cachedRows.length) return true;
    const latestUpdated = cachedRows.reduce((acc: number, row: any) => {
      const ts = row.updated_at ? new Date(row.updated_at).getTime() : 0;
      return ts > acc ? ts : acc;
    }, 0);
    const ageMinutes = (Date.now() - latestUpdated) / 1000 / 60;
    return ageMinutes > 60;
  })();

  // Kick off a background sync if stale or explicit refresh
  if (isStale || refreshRequested) {
    log('[route /user/connections/github GET] Triggering background sync', 'info', {
      requestId,
      userId: user.id,
      reason: refreshRequested ? 'manual' : 'stale',
    });
    // Fire and forget – do not block the response
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        const vcsService = new VCSService({ supabaseClient: supabase });
        const repositories = await vcsService.listRepositories(user.id);
        
        // Store in database for caching
        const upsertData = repositories.map((repo: any) => ({
          user_id: user.id,
          provider: 'github',
          provider_repo_id: repo.id.toString(),
          repo_name: repo.name,
          repo_full_name: repo.fullName,
          repo_owner: repo.owner.username,
          repo_description: repo.description,
          repo_url: repo.url,
          repo_language: repo.language,
          repo_default_branch: repo.defaultBranch,
          repo_private: repo.private,
          repo_created_at: repo.createdAt,
          repo_updated_at: repo.updatedAt,
          repo_data: repo,
          synced_at: new Date().toISOString()
        }));

        await supabase
          .from('vcs_repositories')
          .upsert(upsertData, {
            onConflict: 'user_id,provider,provider_repo_id'
          });
          
        log('[route /user/connections/github GET] Repositories synced', 'info', {
          requestId,
          count: repositories.length
        });
      } catch (err) {
        log('[route /user/connections/github GET] Background sync failed', 'error', { requestId, error: err });
      }
    })();
  }

  // If we have no cached repos (e.g., first visit) we will *wait* for sync to
  // complete once to avoid returning empty results.  To keep implementation
  // simple we fallback to the direct GitHub call (same as before) when cache
  // is empty and refresh is not explicitly forced asynchronously.

  if (!repos.length && !refreshRequested) {
    try {
      log('[route /user/connections/github GET] Cache miss – fetching directly', 'debug', { requestId });
      
      // Use VCS Service to list repositories
      try {
        const vcsService = new VCSService({ 
          supabaseClient: supabaseAdmin 
        });
        
        // List repositories using the user ID, not connectionId
        repos = await vcsService.listRepositories(user.id);
        
        log('[route /user/connections/github GET] Fetched repositories via VCS service', 'info', { 
          requestId, 
          count: repos.length 
        });
      } catch (vcsError) {
        log('[route /user/connections/github GET] VCS service error, returning empty list', 'error', { 
          requestId, 
          error: vcsError 
        });
        // Return empty list if VCS service fails - connection might still be valid
        repos = [];
      }
      
      // Save to cache for next time (best-effort)
      const payload = repos.map((r: any) => ({
        user_id: user.id,
        provider_repo_id: r.id,
        repo_full_name: r.fullName,  // VCS service returns camelCase
        repo_data: r,
        updated_at: new Date().toISOString(),
      }));
      await supabaseAdmin.from('vcs_repositories').upsert(payload, { onConflict: ['user_id', 'provider_repo_id'] });
    } catch (err: any) {
      // Handle GitHub API rate limit
      if (err.status === 403 || err.message?.includes('rate limit')) {
        log('[route /user/connections/github GET] GitHub rate limit exceeded', 'error', { requestId });
        return createErrorResponse(new Error('GitHub API rate limit exceeded'), 429);
      }
      log('[route /user/connections/github GET] Direct fetch failed', 'error', { requestId, error: err });
      return createErrorResponse(err);
    }
  }

  const organizations = Array.from(
    new Set(
      repos
        .filter((r: any) => r.owner && r.owner.type === 'Organization')
        .map((r: any) => r.owner.login),
    ),
  );

  return createJsonResponse({
    success: true,
    connectionData: cd,
    repositories: repos,
    organizations,
    cacheStale: isStale,
  });
}

export const POST = traceRoute('/user/connections/github', POSTHandler);
export const GET = traceRoute('/user/connections/github', GETHandler);
