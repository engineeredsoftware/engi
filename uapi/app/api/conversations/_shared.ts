import { createClient } from '@bitcode/supabase/ssr/server';
import {
  formatAgenticExecutionLabel,
  normalizeAgenticExecutionType,
} from '@bitcode/api/src/executions/agentic-execution';

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
    last_message: 'Bound the remaining V26 proof layers to conversations, runs, asset packs, and settlement evidence.',
  },
  {
    id: 'conv-application-second-gate',
    user_id: MOCK_USER.id,
    title: 'Second-gate application convergence',
    created_at: '2026-04-16T10:40:00.000Z',
    updated_at: '2026-04-16T11:42:00.000Z',
    message_count: 9,
    attachment_count: 1,
    last_message: 'Port the fullscreen conversations, activity runs, and write-side reservoirs inward to /application.',
  },
  {
    id: 'conv-run-shippable-reuse',
    user_id: MOCK_USER.id,
    title: 'Run and asset-pack inward reuse',
    created_at: '2026-04-16T09:08:00.000Z',
    updated_at: '2026-04-16T10:21:00.000Z',
    message_count: 7,
    attachment_count: 2,
    last_message: 'Preserve the master-detail reading surfaces while removing peer-product routing and sealing output destinations.',
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
    title: (title || 'New Bitcode Terminal conversation').trim(),
    created_at: timestamp,
    updated_at: timestamp,
    message_count: 0,
    attachment_count: 0,
    last_message: null,
  };
}

export function getMockConversation(conversationId?: string) {
  const row = getMockConversationRows().find((candidate) => candidate.id === conversationId);
  if (!row) {
    return null;
  }

  return {
    ...row,
    messages: [
      {
        id: `msg-${row.id}-user`,
        conversation_id: row.id,
        role: 'user',
        content: `Resume the ${row.title.toLowerCase()} workstream inside the Bitcode Terminal.`,
        created_at: row.created_at,
        message_attachments: [],
      },
      {
        id: `msg-${row.id}-assistant`,
        conversation_id: row.id,
        role: 'assistant',
        content: row.last_message || 'Bitcode mock mode is active for this conversation.',
        created_at: row.updated_at,
        message_attachments: [],
      },
    ],
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
    return 'Bitcode mock mode is active. Ask for need measurement, AssetPack execution, source attachment, or settlement-bound output to inspect the fullscreen conversation flow.';
  }

  return `Bitcode mock mode received "${normalized}". The conversation surface is now mounted inside the Bitcode Terminal and can bind source attachments, asset packs, output destinations, and settlement-bound proofs as V26 converges.`;
}

function deriveConversationTitle(content: string) {
  const normalized = content.trim();
  if (!normalized) {
    return 'New Bitcode Terminal conversation';
  }
  return normalized.length <= 72 ? normalized : `${normalized.slice(0, 69)}...`;
}

function normalizeConversationExecutionType(token?: ConversationToken) {
  const normalized = String(token?.type || '').trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  if (normalized === 'asset_pack') {
    return 'agentic-execution:asset-pack';
  }

  if (normalized === 'need_measurement') {
    return 'agentic-execution:need-measurement';
  }

  return normalizeAgenticExecutionType(normalized);
}

function buildPipelineEvents(tokens: ConversationToken[]) {
  const pipelineToken = tokens.find((token) => Boolean(normalizeConversationExecutionType(token)));

  if (!pipelineToken) {
    return null;
  }

  const runId = `run-${Date.now()}`;
  const pipelineType = normalizeConversationExecutionType(pipelineToken)!;
  const executionLabel = formatAgenticExecutionLabel(pipelineType);

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
            title: 'Mock Bitcode agentic execution',
            summary: `Prepared ${executionLabel} evidence under the current Bitcode Terminal.`,
          },
        },
      },
      {
        type: 'pipeline_complete',
        data: {
          runId,
          success: true,
          summary: `Mock ${executionLabel} completed for the current Bitcode Terminal review.`,
        },
      },
    ],
  };
}

export function createMockConversationStreamResponse(input: {
  content?: string;
  tokens?: ConversationToken[];
  conversationId?: string;
}) {
  const encoder = new TextEncoder();
  const envelope = buildMockConversationStreamEnvelope(input);

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let index = 0;

      const pushNext = () => {
        if (index >= envelope.queue.length) {
          controller.close();
          return;
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(envelope.queue[index])}\n\n`));
        index += 1;
        setTimeout(pushNext, index <= (envelope.pipeline?.events.length || 0) ? 70 : 45);
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

export function buildMockConversationStreamEnvelope(input: {
  content?: string;
  tokens?: ConversationToken[];
  conversationId?: string;
}) {
  const content = String(input.content || '');
  const tokens = Array.isArray(input.tokens) ? input.tokens : [];
  const assistantReply = buildMockAssistantReply(content);
  const messageId = `msg-${Date.now()}`;
  const conversationId = String(input.conversationId || createMockConversation(deriveConversationTitle(content)).id);
  const pipeline = buildPipelineEvents(tokens);
  const tokenChunks = assistantReply.match(/.{1,28}/g) || [assistantReply];
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
        conversationId,
      },
    },
  ];

  return {
    assistantReply,
    messageId,
    conversationId,
    pipeline,
    queue,
  };
}
