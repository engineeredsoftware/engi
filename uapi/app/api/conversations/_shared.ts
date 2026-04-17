import { createClient } from '@bitcode/supabase/ssr/server';

import { ENABLE_MOCKS, MOCK_CHAT_STREAM } from '../../../config/featureFlags';
import { buildMockReviewUser, isUserOrbitalMockMode } from '../../../lib/mock-review-mode';

type ConversationToken = {
  type?: string;
  value?: string;
  metadata?: Record<string, unknown>;
};

type MockConversationRow = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  attachment_count: number;
  last_message: string | null;
};

const MOCK_USER = buildMockReviewUser();
const MOCK_CONVERSATIONS: MockConversationRow[] = [
  {
    id: 'conv-bitcode-proof-closure',
    user_id: MOCK_USER.id,
    title: 'Bitcode proof closure plan',
    created_at: '2026-04-16T11:14:00.000Z',
    updated_at: '2026-04-16T12:07:00.000Z',
    message_count: 14,
    attachment_count: 3,
    last_message: 'Bound the remaining V26 proof layers to conversations, runs, and deliverables.',
  },
  {
    id: 'conv-application-second-gate',
    user_id: MOCK_USER.id,
    title: 'Second-gate application convergence',
    created_at: '2026-04-16T10:40:00.000Z',
    updated_at: '2026-04-16T11:42:00.000Z',
    message_count: 9,
    attachment_count: 1,
    last_message: 'Port the fullscreen conversations and run-detail reservoirs inward to /application.',
  },
  {
    id: 'conv-run-deliverable-reuse',
    user_id: MOCK_USER.id,
    title: 'Run and deliverable inward reuse',
    created_at: '2026-04-16T09:08:00.000Z',
    updated_at: '2026-04-16T10:21:00.000Z',
    message_count: 7,
    attachment_count: 2,
    last_message: 'Preserve the master-detail reading surfaces while removing peer-product routing.',
  },
];

function getMockConversationRows() {
  return [...MOCK_CONVERSATIONS].sort((left, right) => right.updated_at.localeCompare(left.updated_at));
}

export function isConversationMockMode() {
  return isUserOrbitalMockMode() || (ENABLE_MOCKS && MOCK_CHAT_STREAM);
}

export function getEmptyConversationPage() {
  return {
    data: [],
    hasMore: false,
    nextCursor: null,
  };
}

export function listMockConversations(options: {
  limit?: number;
  cursor?: string | null;
  search?: string | null;
}) {
  const limit = Math.max(1, Math.min(options.limit ?? 25, 100));
  const search = String(options.search || '').trim().toLowerCase();

  let rows = getMockConversationRows();

  if (search) {
    rows = rows.filter((row) => row.title.toLowerCase().includes(search) || (row.last_message || '').toLowerCase().includes(search));
  }

  if (options.cursor) {
    rows = rows.filter((row) => row.updated_at < options.cursor!);
  }

  const data = rows.slice(0, limit);
  const hasMore = rows.length > limit;
  const nextCursor = hasMore ? data[data.length - 1]?.updated_at ?? null : null;

  return {
    data,
    hasMore,
    nextCursor,
  };
}

export function createMockConversation(title?: string) {
  const timestamp = new Date().toISOString();
  return {
    id: `conv-${Date.now()}`,
    user_id: MOCK_USER.id,
    title: (title || 'New Bitcode conversation').trim(),
    created_at: timestamp,
    updated_at: timestamp,
    message_count: 0,
    attachment_count: 0,
    last_message: null,
  };
}

export function branchMockConversation(sourceConversationId: string, title?: string) {
  const source = getMockConversationRows().find((row) => row.id === sourceConversationId);
  return createMockConversation(title || `${source?.title || 'Bitcode conversation'} (branch)`);
}

export async function getConversationRouteUserId() {
  if (isConversationMockMode()) {
    return MOCK_USER.id;
  }

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

function buildMockAssistantReply(content: string) {
  const normalized = content.trim();

  if (!normalized) {
    return 'Bitcode mock mode is active. Ask for a run, pipeline, or deliverable operation to inspect the fullscreen conversation flow.';
  }

  return `Bitcode mock mode received "${normalized}". The conversation surface is now mounted inside /application and can attach runs, deliverables, and proof-bearing outputs as V26 converges.`;
}

function buildPipelineEvents(tokens: ConversationToken[]) {
  const pipelineToken = tokens.find((token) => token.type === 'deliverable' || token.type === 'measure');

  if (!pipelineToken) {
    return null;
  }

  const runId = `run-${Date.now()}`;
  const pipelineType = pipelineToken.type === 'measure' ? 'measure' : 'deliverable';

  return {
    runId,
    pipelineType,
    events: [
      {
        type: 'pipeline_triggered',
        data: { runId, pipelineType },
      },
      {
        type: 'pipeline_event',
        data: {
          runId,
          event: {
            type: 'phase',
            phase: 'mock_execution',
            title: 'Mock Bitcode pipeline execution',
            summary: `Prepared ${pipelineType} evidence under the application-owned V26 workspace.`,
          },
        },
      },
      {
        type: 'pipeline_complete',
        data: {
          runId,
          success: true,
          summary: `Mock ${pipelineType} pipeline completed for the current Bitcode application review.`,
        },
      },
    ],
  };
}

export function createMockConversationStreamResponse(input: {
  content?: string;
  tokens?: ConversationToken[];
}) {
  const encoder = new TextEncoder();
  const content = String(input.content || '');
  const tokens = Array.isArray(input.tokens) ? input.tokens : [];
  const assistantReply = buildMockAssistantReply(content);
  const messageId = `msg-${Date.now()}`;
  const pipeline = buildPipelineEvents(tokens);
  const tokenChunks = assistantReply.match(/.{1,28}/g) || [assistantReply];

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const queue = [
        ...(pipeline?.events || []),
        ...tokenChunks.map((chunk) => ({
          type: 'token',
          data: chunk,
        })),
        {
          type: 'message_complete',
          data: {
            messageId,
            content: assistantReply,
          },
        },
      ];

      let index = 0;

      const pushNext = () => {
        if (index >= queue.length) {
          controller.close();
          return;
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(queue[index])}\n\n`));
        index += 1;
        setTimeout(pushNext, index <= (pipeline?.events.length || 0) ? 70 : 45);
      };

      pushNext();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
