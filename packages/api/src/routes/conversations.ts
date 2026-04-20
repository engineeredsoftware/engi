/**
 * Conversation API Route Handlers
 *
 * Route ownership lives here in the API kitchen-sink package.
 * Lower-level conversation behavior stays in ../conversations/*.
 */

import { createClient } from '@bitcode/supabase/ssr/server';
import { traceRoute } from '@bitcode/observability';
import { createJsonResponse } from '@bitcode/responses';

import { branchConversation, createConversation, listConversations } from '../conversations';

type CreateConversationRequest = {
  title?: string;
};

type BranchConversationRequest = {
  sourceConversationId?: string;
  title?: string;
  branchMessageId?: string;
  copyMessages?: boolean;
};

type ConversationStreamRequest = {
  content?: string;
  message?: string;
  tokens?: Array<{ type?: string; value?: string; metadata?: Record<string, unknown> }>;
};

function parseLimit(value: string | null) {
  const parsed = Number.parseInt(String(value || ''), 10);
  if (!Number.isFinite(parsed)) {
    return 25;
  }
  return Math.max(1, Math.min(parsed, 100));
}

async function getAuthenticatedConversationUserId() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user.id;
}

export const getConversationsRoute = traceRoute('/conversations', async (request: Request) => {
  const userId = await getAuthenticatedConversationUserId();

  if (!userId) {
    return createJsonResponse({
      data: [],
      hasMore: false,
      nextCursor: null,
    });
  }

  const url = new URL(request.url);
  const limit = parseLimit(url.searchParams.get('limit'));
  const cursor = url.searchParams.get('cursor');
  const search = url.searchParams.get('search');

  return createJsonResponse(
    await listConversations(userId, {
      limit,
      cursor: cursor || undefined,
      search: search || undefined,
    }),
  );
});

export const postConversationsRoute = traceRoute('/conversations', async (request: Request) => {
  const userId = await getAuthenticatedConversationUserId();
  if (!userId) {
    return createJsonResponse({ error: 'Unauthorized' }, 401);
  }

  const body = await request.json().catch(() => ({} as CreateConversationRequest));
  const title = typeof body.title === 'string' ? body.title : undefined;

  return createJsonResponse(await createConversation(userId, title));
});

export const postConversationBranchRoute = traceRoute('/conversations/branch', async (request: Request) => {
  const body = await request.json().catch(() => ({} as BranchConversationRequest));
  const sourceConversationId = typeof body.sourceConversationId === 'string' ? body.sourceConversationId : '';

  if (!sourceConversationId) {
    return createJsonResponse({ error: 'sourceConversationId is required' }, 400);
  }

  const userId = await getAuthenticatedConversationUserId();
  if (!userId) {
    return createJsonResponse({ error: 'Unauthorized' }, 401);
  }

  return createJsonResponse(
    await branchConversation(userId, sourceConversationId, {
      title: body.title,
      branchMessageId: body.branchMessageId,
      copyMessages: body.copyMessages,
    }),
  );
});

function createConversationStreamingNotMountedResponse(scope: 'global' | 'thread', conversationId?: string) {
  return createJsonResponse(
    {
      error:
        scope === 'thread'
          ? `Conversation streaming is not yet mounted outside mock mode in the App Router surface for conversation ${conversationId || 'unknown'}.`
          : 'Conversation streaming is not yet mounted outside mock mode in the App Router surface.',
    },
    501,
  );
}

export const postConversationStreamRoute = traceRoute('/conversations/stream', async (request: Request) => {
  await request.json().catch(() => ({} as ConversationStreamRequest));
  return createConversationStreamingNotMountedResponse('global');
});

export const postConversationThreadStreamRoute = traceRoute(
  '/conversations/[conversationId]/stream',
  async (request: Request, context: { params: Promise<{ conversationId: string }> | { conversationId: string } }) => {
    await request.json().catch(() => ({} as ConversationStreamRequest));
    const params = await context.params;
    return createConversationStreamingNotMountedResponse('thread', params?.conversationId);
  },
);
