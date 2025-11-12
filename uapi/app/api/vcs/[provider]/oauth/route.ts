import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { VCSProviderFactory, getProviderScopes, VCSProviderType } from '@engi/vcs';
import { createRouteWrapper } from '@engi/middleware';
import { z } from 'zod';

const providerSchema = z.enum(['github', 'gitlab', 'bitbucket']);

/**
 * GET /api/vcs/[provider]/oauth
 * Initiates OAuth flow for the specified VCS provider
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
    
    try {
      // Optional self-hosted instance URL from query
      const { searchParams } = new URL(request.url);
      const instanceUrl = searchParams.get('instance_url') || undefined;

      // Create provider instance from environment + optional instanceUrl
      const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, instanceUrl);
      
      // Generate state for CSRF protection
      const state = crypto.randomBytes(16).toString('hex');
      
      // Store state in cookie
      cookies().set(`vcs_oauth_state_${provider}`, state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 600 // 10 minutes
      });
      
      // Get provider-specific scopes
      const scopes = getProviderScopes(provider);
      
      // Get authorization URL
      const authUrl = vcsProvider.getAuthorizationUrl(state, scopes);
      
      // Store instance URL in cookie if provided (for self-hosted instances)
      if (instanceUrl) {
        cookies().set(`vcs_oauth_instance_${provider}`, instanceUrl, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 600
        });
      }
      
      return NextResponse.redirect(authUrl);
    } catch (error) {
      console.error(`OAuth initiation failed for ${provider}:`, error);
      return NextResponse.json(
        { error: 'Failed to initiate OAuth flow' },
        { status: 500 }
      );
    }
  },
  {
    requiredScopes: ['vcs:connect']
  }
);
