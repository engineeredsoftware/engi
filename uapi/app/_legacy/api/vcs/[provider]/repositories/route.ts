import { NextRequest, NextResponse } from 'next/server';
import { createRouteWrapper } from '@engi/middleware';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { 
  VCSConnectionManager, 
  VCSProviderFactory,
  VCSProviderType,
  VCSRepository 
} from '@engi/vcs';
import { z } from 'zod';

const providerSchema = z.enum(['github', 'gitlab', 'bitbucket']);

/**
 * GET /api/vcs/[provider]/repositories
 * List repositories for the connected VCS account
 */
export const GET = createRouteWrapper(
  async (request: NextRequest, { params }: { params: { provider: string } }) => {
    // Validate provider
    const providerResult = providerSchema.safeParse(params.provider);
    if (!providerResult.success) {
      return NextResponse.json(
        { error: 'Invalid VCS provider' },
        { status: 400 }
      );
    }
    
    const provider = providerResult.data as VCSProviderType;
    const { searchParams } = new URL(request.url);
    const instanceUrl = searchParams.get('instance_url') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '50');
    
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    try {
      // Get connection
      const connectionManager = new VCSConnectionManager(supabase);
      const connection = await connectionManager.getConnection(user.id, provider, instanceUrl);
      
      if (!connection) {
        return NextResponse.json(
          { error: `No ${provider} connection found` },
          { status: 404 }
        );
      }
      
      // Create provider instance from environment + optional instanceUrl
      const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, instanceUrl);
      
      // Get repositories
      const repositories = await vcsProvider.listRepositories(
        {
          accessToken: connection.accessToken,
          refreshToken: connection.refreshToken,
          expiresAt: connection.tokenExpiresAt
        },
        {
          page,
          perPage,
          sort: 'updated',
          direction: 'desc'
        }
      );
      
      // Cache repositories for faster access (optional)
      if (provider === 'github' && repositories.length > 0) {
        // Update legacy vcs_repositories table for compatibility
        const repoData = repositories.map((repo: VCSRepository) => ({
          user_id: user.id,
          github_user_id: connection.providerUserId,
          provider_repo_id: repo.id,
          repo_name: repo.name,
          repo_full_name: repo.fullName,
          repo_owner: repo.owner.username,
          repo_description: repo.description,
          repo_url: repo.url,
          repo_language: repo.language,
          repo_default_branch: repo.defaultBranch,
          repo_private: repo.private,
          repo_created_at: repo.createdAt,
          repo_updated_at: repo.updatedAt
        }));
        
        await supabase
          .from('vcs_repositories')
          .upsert(repoData, {
            onConflict: 'user_id,github_user_id,provider_repo_id'
          });
      }
      
      return NextResponse.json({
        repositories,
        pagination: {
          page,
          perPage,
          hasMore: repositories.length === perPage
        }
      });
    } catch (error) {
      console.error('Failed to list repositories:', error);
      return NextResponse.json(
        { error: 'Failed to list repositories' },
        { status: 500 }
      );
    }
  },
  {
    requiredScopes: ['vcs:read']
  }
);
