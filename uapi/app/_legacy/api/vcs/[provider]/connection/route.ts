import { NextRequest, NextResponse } from 'next/server';
import { createRouteWrapper } from '@engi/middleware';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { 
  VCSConnectionManager, 
  VCSProviderFactory,
  VCSProviderType 
} from '@engi/vcs';
import { z } from 'zod';

const providerSchema = z.enum(['github', 'gitlab', 'bitbucket']);

/**
 * GET /api/vcs/[provider]/connection
 * Check connection status and validate token
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
    
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    try {
      const connectionManager = new VCSConnectionManager(supabase);
      const connection = await connectionManager.getConnection(user.id, provider, instanceUrl);
      
      if (!connection) {
        return NextResponse.json({
          connected: false,
          provider
        });
      }
      
      // Check if token needs refresh
      if (connectionManager.needsTokenRefresh(connection)) {
        if (connection.refreshToken) {
          try {
            const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, instanceUrl);
            
            if (vcsProvider.refreshAccessToken) {
              const newAuth = await vcsProvider.refreshAccessToken(connection.refreshToken);
              await connectionManager.updateTokens(connection.id, {
                accessToken: newAuth.accessToken,
                refreshToken: newAuth.refreshToken,
                expiresAt: newAuth.expiresAt
              });
              
              connection.accessToken = newAuth.accessToken;
              connection.refreshToken = newAuth.refreshToken;
              connection.tokenExpiresAt = newAuth.expiresAt;
            }
          } catch (error) {
            console.error('Failed to refresh token:', error);
            // Continue with existing token
          }
        }
      }
      
      // Validate token
      const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, instanceUrl);
      const isValid = await vcsProvider.validateToken({
        accessToken: connection.accessToken,
        refreshToken: connection.refreshToken,
        expiresAt: connection.tokenExpiresAt
      });
      
      return NextResponse.json({
        connected: true,
        provider,
        valid: isValid,
        username: connection.providerUsername,
        instanceUrl: connection.instanceUrl,
        expiresAt: connection.tokenExpiresAt,
        metadata: connection.metadata
      });
    } catch (error) {
      console.error('Failed to check connection:', error);
      return NextResponse.json(
        { error: 'Failed to check connection' },
        { status: 500 }
      );
    }
  },
  {
    requiredScopes: ['vcs:read']
  }
);

/**
 * DELETE /api/vcs/[provider]/connection
 * Remove VCS connection
 */
export const DELETE = createRouteWrapper(
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
    
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    try {
      const connectionManager = new VCSConnectionManager(supabase);
      await connectionManager.deleteConnection(user.id, provider, instanceUrl);
      
      // If this is GitHub, also remove from legacy table
      if (provider === 'github') {
        await supabase
          .from('user_connections')
          .update({ github_connection: null })
          .eq('user_id', user.id);
      }
      
      return NextResponse.json({
        success: true,
        message: `${provider} connection removed`
      });
    } catch (error) {
      console.error('Failed to delete connection:', error);
      return NextResponse.json(
        { error: 'Failed to delete connection' },
        { status: 500 }
      );
    }
  },
  {
    requiredScopes: ['vcs:write']
  }
);
