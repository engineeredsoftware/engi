import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteWrapper } from '@engi/middleware';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { 
  VCSProviderFactory, 
  VCSConnectionManager, 
  VCSProviderType 
} from '@engi/vcs';
import { z } from 'zod';

const providerSchema = z.enum(['github', 'gitlab', 'bitbucket']);

/**
 * GET /api/vcs/[provider]/callback
 * Handles OAuth callback for VCS providers
 */
export const GET = createRouteWrapper(
  async (request: NextRequest, { params }: { params: { provider: string } }) => {
    // Validate provider
    const providerResult = providerSchema.safeParse(params.provider);
    if (!providerResult.success) {
      return NextResponse.redirect('/settings?error=invalid_provider');
    }
    
    const provider = providerResult.data as VCSProviderType;
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    
    // Handle OAuth errors
    if (error) {
      console.error(`OAuth error for ${provider}:`, error);
      const errorDescription = searchParams.get('error_description') || error;
      return NextResponse.redirect(`/settings?error=${encodeURIComponent(errorDescription)}`);
    }
    
    // Verify state for CSRF protection
    const savedState = cookies().get(`vcs_oauth_state_${provider}`)?.value;
    if (!state || state !== savedState) {
      return NextResponse.redirect('/settings?error=invalid_state');
    }
    
    // Clear state cookie
    cookies().delete(`vcs_oauth_state_${provider}`);
    
    if (!code) {
      return NextResponse.redirect('/settings?error=no_code');
    }
    
    try {
      // Get instance URL if saved (for self-hosted)
      const instanceUrl = cookies().get(`vcs_oauth_instance_${provider}`)?.value;
      if (instanceUrl) {
        cookies().delete(`vcs_oauth_instance_${provider}`);
      }
      
      // Create provider instance from environment + optional instanceUrl
      const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, instanceUrl);
      
      // Exchange code for tokens
      const auth = await vcsProvider.exchangeCodeForToken(code);
      
      // Get user info
      const user = await vcsProvider.getCurrentUser(auth);
      
      // Get current user
      const supabase = createRouteHandlerClient({ cookies });
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        return NextResponse.redirect('/login?error=not_authenticated');
      }
      
      // Save connection to database
      const connectionManager = new VCSConnectionManager(supabase);
      await connectionManager.saveConnection(currentUser.id, provider, {
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        expiresAt: auth.expiresAt,
        providerUserId: user.id,
        providerUsername: user.username,
        instanceUrl,
        metadata: {
          scope: auth.scope,
          email: user.email,
          avatarUrl: user.avatarUrl
        }
      });
      
      // If this is a GitHub connection, also store in the legacy format for compatibility
      if (provider === 'github') {
        await supabase
          .from('user_connections')
          .upsert({
            user_id: currentUser.id,
            github_connection: {
              access_token: auth.accessToken,
              github_user_id: user.id,
              github_username: user.username,
              github_email: user.email,
              github_avatar_url: user.avatarUrl,
              scope: auth.scope
            }
          }, {
            onConflict: 'user_id'
          });
      }
      
      // Redirect to success page
      return NextResponse.redirect(`/settings?success=${provider}_connected`);
    } catch (error) {
      console.error(`OAuth callback failed for ${provider}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      return NextResponse.redirect(`/settings?error=${encodeURIComponent(errorMessage)}`);
    }
  },
  {
    requiredScopes: ['vcs:connect']
  }
);
