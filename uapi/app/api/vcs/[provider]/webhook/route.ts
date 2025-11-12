import { NextRequest, NextResponse } from 'next/server';
import { createRouteWrapper } from '@engi/middleware';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { 
  VCSConnectionManager, 
  VCSProviderFactory,
  VCSProviderType,
  mapWebhookEvents
} from '@engi/vcs';
import { z } from 'zod';
import crypto from 'crypto';

const providerSchema = z.enum(['github', 'gitlab', 'bitbucket']);

const createWebhookSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  events: z.array(z.string()),
  instanceUrl: z.string().optional()
});

/**
 * POST /api/vcs/[provider]/webhook
 * Create a webhook for a repository
 */
export const POST = createRouteWrapper(
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
    const body = await request.json();
    
    // Validate request body
    const validation = createWebhookSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.flatten() },
        { status: 400 }
      );
    }
    
    const { owner, repo, events, instanceUrl } = validation.data;
    
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
      
      // Generate webhook secret
      const webhookSecret = crypto.randomBytes(32).toString('hex');
      
      // Map common events to provider-specific events
      const providerEvents = mapWebhookEvents(provider, events);
      
      // Construct webhook URL
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.engi.ai';
      const webhookUrl = `${baseUrl}/api/vcs/${provider}/webhook-handler`;
      
      // Create webhook
      const webhook = await vcsProvider.createWebhook(
        {
          accessToken: connection.accessToken,
          refreshToken: connection.refreshToken,
          expiresAt: connection.tokenExpiresAt
        },
        owner,
        repo,
        {
          url: webhookUrl,
          events: providerEvents,
          secret: webhookSecret,
          active: true
        }
      );
      
      // Store webhook configuration
      await supabase
        .from('vcs_webhooks')
        .insert({
          provider,
          webhook_id: webhook.id,
          user_id: user.id,
          owner,
          repo,
          webhook_url: webhook.url,
          events: webhook.events,
          secret: webhookSecret,
          active: webhook.active
        });
      
      return NextResponse.json({
        success: true,
        webhook: {
          id: webhook.id,
          url: webhook.url,
          events: webhook.events,
          active: webhook.active
        }
      });
    } catch (error) {
      console.error('Failed to create webhook:', error);
      return NextResponse.json(
        { error: 'Failed to create webhook' },
        { status: 500 }
      );
    }
  },
  {
    requiredScopes: ['vcs:write']
  }
);

/**
 * DELETE /api/vcs/[provider]/webhook
 * Delete a webhook
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
    const webhookId = searchParams.get('webhook_id');
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const instanceUrl = searchParams.get('instance_url') || undefined;
    
    if (!webhookId || !owner || !repo) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
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
      
      // Delete webhook
      await vcsProvider.deleteWebhook(
        {
          accessToken: connection.accessToken,
          refreshToken: connection.refreshToken,
          expiresAt: connection.tokenExpiresAt
        },
        owner,
        repo,
        webhookId
      );
      
      // Remove from database
      await supabase
        .from('vcs_webhooks')
        .delete()
        .eq('webhook_id', webhookId)
        .eq('user_id', user.id);
      
      return NextResponse.json({
        success: true,
        message: 'Webhook deleted successfully'
      });
    } catch (error) {
      console.error('Failed to delete webhook:', error);
      return NextResponse.json(
        { error: 'Failed to delete webhook' },
        { status: 500 }
      );
    }
  },
  {
    requiredScopes: ['vcs:write']
  }
);
