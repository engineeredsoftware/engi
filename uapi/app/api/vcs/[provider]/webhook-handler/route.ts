import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { VCSProviderFactory, VCSProviderType } from '@engi/vcs';
import { z } from 'zod';
import crypto from 'crypto';

const providerSchema = z.enum(['github', 'gitlab', 'bitbucket']);

// Webhook event mappings
const eventMappings: Record<VCSProviderType, Record<string, string>> = {
  github: {
    'push': 'push',
    'pull_request': 'pull_request',
    'issues': 'issues',
    'issue_comment': 'issue_comment',
    'pull_request_review': 'review',
    'pull_request_review_comment': 'review_comment'
  },
  gitlab: {
    'Push Hook': 'push',
    'Merge Request Hook': 'pull_request',
    'Issue Hook': 'issues',
    'Note Hook': 'comment'
  },
  bitbucket: {
    'repo:push': 'push',
    'pullrequest:created': 'pull_request',
    'pullrequest:updated': 'pull_request',
    'pullrequest:approved': 'review',
    'pullrequest:unapproved': 'review',
    'pullrequest:fulfilled': 'pull_request',
    'pullrequest:rejected': 'pull_request',
    'pullrequest:comment_created': 'comment',
    'issue:created': 'issues',
    'issue:updated': 'issues'
  }
};

/**
 * POST /api/vcs/[provider]/webhook-handler
 * Handle incoming webhooks from VCS providers
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
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
    // Get webhook signature based on provider
    let signature: string | null = null;
    let event: string | null = null;
    
    switch (provider) {
      case 'github':
        signature = request.headers.get('x-hub-signature-256');
        event = request.headers.get('x-github-event');
        break;
      case 'gitlab':
        signature = request.headers.get('x-gitlab-token');
        event = request.headers.get('x-gitlab-event');
        break;
      case 'bitbucket':
        signature = request.headers.get('x-hook-uuid');
        event = request.headers.get('x-event-key');
        break;
    }
    
    if (!event) {
      return NextResponse.json(
        { error: 'Missing event header' },
        { status: 400 }
      );
    }
    
    // Get request body
    const body = await request.text();
    const payload = JSON.parse(body);
    
    // Get webhook configuration from database
    const supabase = createRouteHandlerClient({ cookies });
    
    // Find webhook by provider-specific identifier
    let webhookQuery = supabase
      .from('vcs_webhooks')
      .select('*')
      .eq('provider', provider)
      .eq('active', true);
    
    // Add provider-specific filters
    if (provider === 'github' && payload.repository) {
      webhookQuery = webhookQuery
        .eq('owner', payload.repository.owner.login)
        .eq('repo', payload.repository.name);
    } else if (provider === 'gitlab' && payload.project) {
      const pathParts = payload.project.path_with_namespace.split('/');
      webhookQuery = webhookQuery
        .eq('owner', pathParts[0])
        .eq('repo', pathParts[1]);
    } else if (provider === 'bitbucket' && payload.repository) {
      webhookQuery = webhookQuery
        .eq('owner', payload.repository.workspace.slug)
        .eq('repo', payload.repository.slug);
    }
    
    const { data: webhook, error: webhookError } = await webhookQuery.single();
    
    if (webhookError || !webhook) {
      console.error('Webhook not found:', webhookError);
      return NextResponse.json(
        { error: 'Webhook not registered' },
        { status: 404 }
      );
    }
    
    // Verify webhook signature if secret is configured
    if (webhook.secret && signature) {
      const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider);
      
      if (!vcsProvider.verifyWebhookSignature(body, signature, webhook.secret)) {
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 401 }
        );
      }
    }
    
    // Map provider event to common event type
    const commonEvent = eventMappings[provider][event] || event;
    
    // Process webhook based on event type
    const processingResult = await processWebhookEvent(
      provider,
      commonEvent,
      payload,
      webhook
    );
    
    // Record webhook receipt
    await supabase
      .from('vcs_webhook_events')
      .insert({
        webhook_id: webhook.id,
        event_type: event,
        common_event_type: commonEvent,
        payload,
        processed: true,
        processing_result: processingResult
      });
    
    return NextResponse.json({
      success: true,
      event: commonEvent,
      processed: true
    });
  } catch (error) {
    console.error(`Webhook handler error for ${provider}:`, error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

/**
 * Process webhook event based on type
 */
async function processWebhookEvent(
  provider: VCSProviderType,
  event: string,
  payload: any,
  webhook: any
): Promise<any> {
  const supabase = createRouteHandlerClient({ cookies });
  
  switch (event) {
    case 'push':
      // Handle push events
      return await handlePushEvent(provider, payload, webhook);
    
    case 'pull_request':
      // Handle pull request events
      return await handlePullRequestEvent(provider, payload, webhook);
    
    case 'issues':
      // Handle issue events
      return await handleIssueEvent(provider, payload, webhook);
    
    case 'comment':
    case 'issue_comment':
    case 'review_comment':
      // Handle comment events
      return await handleCommentEvent(provider, payload, webhook);
    
    case 'review':
      // Handle review events
      return await handleReviewEvent(provider, payload, webhook);
    
    default:
      console.log(`Unhandled webhook event: ${event}`);
      return { handled: false, event };
  }
}

async function handlePushEvent(provider: VCSProviderType, payload: any, webhook: any) {
  // Extract push information based on provider
  let branch: string;
  let commits: any[];
  let repository: any;
  
  switch (provider) {
    case 'github':
      branch = payload.ref?.replace('refs/heads/', '') || '';
      commits = payload.commits || [];
      repository = payload.repository;
      break;
    
    case 'gitlab':
      branch = payload.ref?.replace('refs/heads/', '') || '';
      commits = payload.commits || [];
      repository = payload.project;
      break;
    
    case 'bitbucket':
      branch = payload.push?.changes?.[0]?.new?.name || '';
      commits = payload.push?.changes?.[0]?.commits || [];
      repository = payload.repository;
      break;
    
    default:
      return { error: 'Unknown provider' };
  }
  
  // Process push event (e.g., trigger CI/CD, notify team, etc.)
  console.log(`Push to ${branch} with ${commits.length} commits`);
  
  return {
    handled: true,
    branch,
    commitCount: commits.length
  };
}

async function handlePullRequestEvent(provider: VCSProviderType, payload: any, webhook: any) {
  // Extract PR information based on provider
  let action: string;
  let prNumber: number;
  let title: string;
  
  switch (provider) {
    case 'github':
      action = payload.action;
      prNumber = payload.pull_request?.number;
      title = payload.pull_request?.title;
      break;
    
    case 'gitlab':
      action = payload.object_attributes?.action || payload.object_attributes?.state;
      prNumber = payload.object_attributes?.iid;
      title = payload.object_attributes?.title;
      break;
    
    case 'bitbucket':
      // Bitbucket uses event key to determine action
      const eventKey = payload.pullrequest?.state;
      action = eventKey;
      prNumber = payload.pullrequest?.id;
      title = payload.pullrequest?.title;
      break;
    
    default:
      return { error: 'Unknown provider' };
  }
  
  // Process PR event
  console.log(`Pull request ${action}: #${prNumber} - ${title}`);
  
  return {
    handled: true,
    action,
    prNumber,
    title
  };
}

async function handleIssueEvent(provider: VCSProviderType, payload: any, webhook: any) {
  // Extract issue information based on provider
  let action: string;
  let issueNumber: number;
  let title: string;
  
  switch (provider) {
    case 'github':
      action = payload.action;
      issueNumber = payload.issue?.number;
      title = payload.issue?.title;
      break;
    
    case 'gitlab':
      action = payload.object_attributes?.action || payload.object_attributes?.state;
      issueNumber = payload.object_attributes?.iid;
      title = payload.object_attributes?.title;
      break;
    
    case 'bitbucket':
      action = payload.issue?.state;
      issueNumber = payload.issue?.id;
      title = payload.issue?.title;
      break;
    
    default:
      return { error: 'Unknown provider' };
  }
  
  // Process issue event
  console.log(`Issue ${action}: #${issueNumber} - ${title}`);
  
  return {
    handled: true,
    action,
    issueNumber,
    title
  };
}

async function handleCommentEvent(provider: VCSProviderType, payload: any, webhook: any) {
  // Extract comment information based on provider
  let commentBody: string;
  let author: string;
  let targetType: string;
  let targetId: number;
  
  switch (provider) {
    case 'github':
      commentBody = payload.comment?.body;
      author = payload.comment?.user?.login;
      targetType = payload.issue ? 'issue' : 'pull_request';
      targetId = payload.issue?.number || payload.pull_request?.number;
      break;
    
    case 'gitlab':
      commentBody = payload.object_attributes?.note;
      author = payload.user?.username;
      targetType = payload.merge_request ? 'merge_request' : 'issue';
      targetId = payload.merge_request?.iid || payload.issue?.iid;
      break;
    
    case 'bitbucket':
      commentBody = payload.comment?.content?.raw;
      author = payload.comment?.user?.username;
      targetType = 'pull_request';
      targetId = payload.pullrequest?.id;
      break;
    
    default:
      return { error: 'Unknown provider' };
  }
  
  // Process comment event
  console.log(`New comment on ${targetType} #${targetId} by ${author}`);
  
  return {
    handled: true,
    targetType,
    targetId,
    author,
    commentLength: commentBody?.length || 0
  };
}

async function handleReviewEvent(provider: VCSProviderType, payload: any, webhook: any) {
  // Extract review information based on provider
  let action: string;
  let prNumber: number;
  let reviewer: string;
  
  switch (provider) {
    case 'github':
      action = payload.review?.state;
      prNumber = payload.pull_request?.number;
      reviewer = payload.review?.user?.login;
      break;
    
    case 'gitlab':
      // GitLab doesn't have explicit review events, handled in MR events
      action = payload.object_attributes?.action;
      prNumber = payload.merge_request?.iid;
      reviewer = payload.user?.username;
      break;
    
    case 'bitbucket':
      action = payload.approval ? 'approved' : 'unapproved';
      prNumber = payload.pullrequest?.id;
      reviewer = payload.approval?.user?.username || payload.user?.username;
      break;
    
    default:
      return { error: 'Unknown provider' };
  }
  
  // Process review event
  console.log(`Pull request #${prNumber} ${action} by ${reviewer}`);
  
  return {
    handled: true,
    action,
    prNumber,
    reviewer
  };
}
