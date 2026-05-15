/**
 * Conversation API Route Handlers
 *
 * Route ownership lives here in the API kitchen-sink package.
 * Lower-level conversation behavior stays in ../conversations/*.
 */

import * as crypto from 'crypto';

import { createAdminClient } from '@bitcode/orm';
import type { AttachmentReference } from '@bitcode/attachments-generics';
import { validateAttachmentCategory } from '@bitcode/attachments-generics';
import { createClient } from '@bitcode/supabase/ssr/server';
import { traceRoute } from '@bitcode/observability';
import { createJsonResponse } from '@bitcode/responses';

import {
  branchConversation,
  createConversation,
  createMessage,
  createStreamResponse,
  getConversation,
  getConversationWithAll,
  listConversations,
} from '../conversations';
import {
  formatAgenticExecutionLabel,
  normalizeAgenticExecutionStorageType,
  normalizeAgenticExecutionType,
} from '../executions/agentic-execution';

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
  tokens?: Array<{ type?: string; value?: string; text?: string; metadata?: Record<string, unknown> }>;
  includeHistory?: boolean;
};

type ConversationStreamToken = NonNullable<ConversationStreamRequest['tokens']>[number];

type ConversationStreamExecution = {
  runId: string;
  canonicalType: string;
  storageType: string;
  label: string;
};

type ConversationAttachmentReference = AttachmentReference & {
  token_type: string;
  title?: string;
  metadata: Record<string, unknown>;
};

type ConversationRichInputReference = {
  token_type: string;
  value: string | null;
  metadata: Record<string, unknown>;
};

type ConversationRichInputSummary = {
  rich_input_version: 'v26-conversation-rich-input-1';
  source_attachments: ConversationAttachmentReference[];
  output_destinations: ConversationAttachmentReference[];
  asset_pack_references: ConversationRichInputReference[];
  need_measurement_intents: ConversationRichInputReference[];
  token_counts: ReturnType<typeof countTokenTypes>;
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

function normalizeConversationText(value?: string | null) {
  return value?.trim() || '';
}

function resolveConversationTokenValue(token?: ConversationStreamToken | null) {
  return normalizeConversationText(token?.value) || normalizeConversationText(token?.text);
}

function normalizeConversationTokenType(token?: ConversationStreamToken | null) {
  return normalizeConversationText(token?.type).toLowerCase();
}

function deriveConversationInput(body: ConversationStreamRequest) {
  return normalizeConversationText(body.content) || normalizeConversationText(body.message);
}

function deriveConversationTitle(content: string) {
  const normalized = normalizeConversationText(content);
  if (!normalized) return 'New Bitcode Terminal conversation';
  if (normalized.length <= 72) return normalized;
  return `${normalized.slice(0, 69)}...`;
}

function inferAttachmentCategory(token: ConversationStreamToken): AttachmentReference['category'] {
  const metadataCategory = token.metadata?.category;
  if (typeof metadataCategory === 'string' && validateAttachmentCategory(metadataCategory)) {
    return metadataCategory;
  }

  const value = resolveConversationTokenValue(token);
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return 'url';
  }

  if (token.type === 'source') return 'integration';
  if (token.type === 'destination') return 'integration';
  if (token.type === 'attachment') return 'file';

  return 'integration';
}

function buildAttachmentReferences(tokens: ConversationStreamToken[]) {
  return tokens
    .filter((token) => {
      const tokenType = normalizeConversationTokenType(token);
      return tokenType === 'attachment' || tokenType === 'source' || tokenType === 'destination';
    })
    .map((token) => {
      const tokenType = normalizeConversationTokenType(token) || 'attachment';
      const attachmentId =
        (typeof token.metadata?.attachment_id === 'string' && normalizeConversationText(token.metadata.attachment_id)) ||
        (typeof token.metadata?.id === 'string' && normalizeConversationText(token.metadata.id)) ||
        resolveConversationTokenValue(token) ||
        crypto.randomUUID();

      return {
        attachment_id: attachmentId,
        category: inferAttachmentCategory(token),
        type:
          (typeof token.metadata?.type === 'string' && normalizeConversationText(token.metadata.type)) ||
          token.type ||
          'attachment',
        token_type: tokenType,
        title: resolveConversationTokenValue(token) || undefined,
        metadata: token.metadata || {},
      } satisfies ConversationAttachmentReference;
    });
}

function buildRichInputReference(token: ConversationStreamToken): ConversationRichInputReference {
  return {
    token_type: normalizeConversationTokenType(token),
    value: resolveConversationTokenValue(token) || null,
    metadata: token.metadata || {},
  };
}

function tokenRequestsReadMeasurement(token: ConversationStreamToken) {
  const tokenType = normalizeConversationTokenType(token);
  const pipelineType =
    typeof token.metadata?.pipelineType === 'string' ? normalizeConversationText(token.metadata.pipelineType).toLowerCase() : '';

  return tokenType === 'need_measurement' || tokenType === 'measure' || pipelineType.includes('measure');
}

function buildConversationRichInputSummary(
  tokens: ConversationStreamToken[],
  attachments: ConversationAttachmentReference[],
): ConversationRichInputSummary {
  return {
    rich_input_version: 'v26-conversation-rich-input-1',
    source_attachments: attachments.filter((attachment) => attachment.token_type === 'attachment' || attachment.token_type === 'source'),
    output_destinations: attachments.filter((attachment) => attachment.token_type === 'destination'),
    asset_pack_references: tokens
      .filter((token) => {
        const tokenType = normalizeConversationTokenType(token);
        return tokenType === 'asset_pack' || tokenType === 'shippable' || tokenType === 'evidence_document';
      })
      .map(buildRichInputReference),
    need_measurement_intents: tokens.filter(tokenRequestsReadMeasurement).map(buildRichInputReference),
    token_counts: countTokenTypes(tokens),
  };
}

function deriveConversationExecutionType(tokens: ConversationStreamToken[]) {
  for (const token of tokens) {
    const metadataPipelineType =
      typeof token.metadata?.pipelineType === 'string' ? token.metadata.pipelineType : undefined;
    const candidate = metadataPipelineType || normalizeConversationTokenType(token) || resolveConversationTokenValue(token);

    if (candidate === 'need_measurement' || candidate === 'measure') {
      return normalizeAgenticExecutionType(candidate);
    }

    if (candidate === 'asset_pack' || candidate === 'shippable' || candidate === 'evidence_document') {
      return normalizeAgenticExecutionType(candidate);
    }
  }

  return null;
}

function countTokenTypes(tokens: ConversationStreamToken[]) {
  return tokens.reduce(
    (acc, token) => {
      const normalized = normalizeConversationTokenType(token);
      if (normalized === 'attachment') acc.attachments += 1;
      if (normalized === 'source') acc.sources += 1;
      if (normalized === 'destination') acc.destinations += 1;
      if (normalized === 'asset_pack' || normalized === 'shippable' || normalized === 'evidence_document') {
        acc.assetPacks += 1;
      }
      if (tokenRequestsReadMeasurement(token)) acc.readMeasurements += 1;
      return acc;
    },
    { attachments: 0, sources: 0, destinations: 0, assetPacks: 0, readMeasurements: 0 },
  );
}

function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

function buildAssistantReply(input: {
  content: string;
  tokens: ConversationStreamToken[];
  execution?: ConversationStreamExecution | null;
}) {
  const counts = countTokenTypes(input.tokens);
  const parts = ['Bitcode Terminal write path accepted the instruction.'];

  if (counts.sources > 0) {
    parts.push(`Bound ${counts.sources} Connects ${pluralize(counts.sources, 'source')}.`);
  }

  if (counts.attachments > 0) {
    parts.push(`Captured ${counts.attachments} rich ${pluralize(counts.attachments, 'attachment')}.`);
  }

  if (counts.assetPacks > 0) {
    parts.push(`Aligned ${counts.assetPacks} ${pluralize(counts.assetPacks, 'asset pack')} for synthesis and fit review.`);
  }

  if (counts.destinations > 0) {
    parts.push(
      `Recorded ${counts.destinations} output ${pluralize(counts.destinations, 'destination')} for settlement follow-through.`,
    );
  }

  if (input.execution) {
    parts.push(`Started ${input.execution.label} ${input.execution.runId} for the current conversation context.`);
  }

  if (normalizeConversationText(input.content)) {
    parts.push('Use the Bitcode activity ledger to inspect proofs, history, and closure once this write is committed.');
  }

  return parts.join(' ');
}

function chunkAssistantReply(content: string) {
  return content.match(/\S+\s*/g) || [content];
}

function encodeSseChunk(payload: unknown) {
  return new TextEncoder().encode(`data: ${JSON.stringify(payload)}\n\n`);
}

async function createConversationExecution(options: {
  userId: string;
  conversationId: string;
  content: string;
  tokens: ConversationStreamToken[];
  richInput: ConversationRichInputSummary;
  canonicalType: string;
}) {
  try {
    const nowIso = new Date().toISOString();
    const storageType = normalizeAgenticExecutionStorageType(options.canonicalType);
    const runId = crypto.randomUUID();
    const admin = createAdminClient();

    await admin.pipelineExecutions.create({
      id: runId,
      user_id: options.userId,
      type: storageType,
      status: 'running',
      guide: options.canonicalType.includes('read-measurement') ? 'Read' : 'Develop',
      input: {
        conversationId: options.conversationId,
        content: options.content,
        tokens: options.tokens,
        rich_input: options.richInput,
      } as any,
      output: null,
      metadata: {
        canonical_type: options.canonicalType,
        entrypoint: 'conversations',
        rich_input: options.richInput,
        source_attachments: options.richInput.source_attachments,
        output_destinations: options.richInput.output_destinations,
        asset_pack_references: options.richInput.asset_pack_references,
        need_measurement_intents: options.richInput.need_measurement_intents,
      } as any,
      started_at: nowIso,
      created_at: nowIso,
      updated_at: nowIso,
      completed_at: null,
    } as any);

    return {
      runId,
      canonicalType: normalizeAgenticExecutionType(options.canonicalType),
      storageType,
      label: formatAgenticExecutionLabel(options.canonicalType),
    } satisfies ConversationStreamExecution;
  } catch (error) {
    return null;
  }
}

async function finalizeConversationExecution(
  execution: ConversationStreamExecution | null | undefined,
  options: {
    success: boolean;
    summary: string;
    error?: string;
  },
) {
  if (!execution) return;

  try {
    const admin = createAdminClient();
    await admin.pipelineExecutions.update(execution.runId, {
      status: options.success ? 'completed' : 'failed',
      output: { summary: options.summary } as any,
      error: options.error || null,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as any);
  } catch (_error) {
    // Fail closed on execution finalization. The write path should not crash
    // after the message stream has already been emitted.
  }
}

async function createConversationWriteStreamResponse(options: {
  conversationId: string;
  userId: string;
  content: string;
  tokens: ConversationStreamToken[];
}) {
  const attachments = buildAttachmentReferences(options.tokens);
  const richInput = buildConversationRichInputSummary(options.tokens, attachments);
  await createMessage({
    conversation_id: options.conversationId,
    role: 'user',
    content: options.content,
    attachments,
  });

  const canonicalExecutionType = deriveConversationExecutionType(options.tokens);
  const execution = canonicalExecutionType
    ? await createConversationExecution({
        userId: options.userId,
        conversationId: options.conversationId,
        content: options.content,
        tokens: options.tokens,
        richInput,
        canonicalType: canonicalExecutionType,
      })
    : null;

  const assistantReply = buildAssistantReply({
    content: options.content,
    tokens: options.tokens,
    execution,
  });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        if (execution) {
          controller.enqueue(
            encodeSseChunk({
              type: 'pipeline_triggered',
              data: {
                runId: execution.runId,
                pipelineType: execution.canonicalType,
              },
            }),
          );
          controller.enqueue(
            encodeSseChunk({
              type: 'pipeline_event',
              data: {
                runId: execution.runId,
                event: {
                  status: 'running',
                  summary: `${execution.label} is in flight.`,
                },
              },
            }),
          );
        }

        for (const chunk of chunkAssistantReply(assistantReply)) {
          controller.enqueue(
            encodeSseChunk({
              type: 'token',
              data: chunk,
            }),
          );
        }

        const assistantMessage = await createMessage({
          conversation_id: options.conversationId,
          role: 'assistant',
          content: assistantReply,
          pipeline_run_id: execution?.runId,
        });

        await finalizeConversationExecution(execution, {
          success: true,
          summary: assistantReply,
        });

        if (execution) {
          controller.enqueue(
            encodeSseChunk({
              type: 'pipeline_complete',
              data: {
                runId: execution.runId,
                success: true,
                summary: assistantReply,
              },
            }),
          );
        }

        controller.enqueue(
          encodeSseChunk({
            type: 'message_complete',
            data: {
              messageId: assistantMessage.id,
              content: assistantReply,
              conversationId: options.conversationId,
            },
          }),
        );
      } catch (error) {
        await finalizeConversationExecution(execution, {
          success: false,
          summary: 'Conversation write failed closed.',
          error: error instanceof Error ? error.message : 'Conversation write failed.',
        });

        controller.enqueue(
          encodeSseChunk({
            type: 'error',
            data: {
              message: error instanceof Error ? error.message : 'Conversation write failed.',
              code: 'CONVERSATION_STREAM_ERROR',
            },
          }),
        );
      } finally {
        controller.close();
      }
    },
  });

  return createStreamResponse(stream);
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

export const getConversationRoute = traceRoute(
  '/conversations/[conversationId]',
  async (
    _request: Request,
    context: { params: Promise<{ conversationId: string }> | { conversationId: string } },
  ) => {
    const userId = await getAuthenticatedConversationUserId();
    if (!userId) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    const params = await context.params;
    const conversationId = normalizeConversationText(params?.conversationId);
    if (!conversationId) {
      return createJsonResponse({ error: 'conversationId is required' }, 400);
    }

    const conversation = await getConversationWithAll(conversationId, userId);
    if (!conversation) {
      return createJsonResponse({ error: 'Conversation not found' }, 404);
    }

    return createJsonResponse(conversation);
  },
);

export const postConversationsRoute = traceRoute('/conversations', async (request: Request) => {
  const userId = await getAuthenticatedConversationUserId();
  if (!userId) {
    return createJsonResponse({ error: 'Unauthorized' }, 401);
  }

  const body = (await request.json().catch(() => ({}))) as CreateConversationRequest;
  const title = typeof body.title === 'string' ? body.title : undefined;

  return createJsonResponse(await createConversation(userId, title));
});

export const postConversationBranchRoute = traceRoute('/conversations/branch', async (request: Request) => {
  const body = (await request.json().catch(() => ({}))) as BranchConversationRequest;
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

export const postConversationStreamRoute = traceRoute('/conversations/stream', async (request: Request) => {
  const body = (await request.json().catch(() => ({}))) as ConversationStreamRequest;
  const userId = await getAuthenticatedConversationUserId();

  if (!userId) {
    return createJsonResponse({ error: 'Unauthorized' }, 401);
  }

  const content = deriveConversationInput(body);
  if (!content) {
    return createJsonResponse({ error: 'content is required' }, 400);
  }

  const conversation = await createConversation(userId, deriveConversationTitle(content));
  return createConversationWriteStreamResponse({
    conversationId: conversation.id,
    userId,
    content,
    tokens: body.tokens || [],
  });
});

export const postConversationThreadStreamRoute = traceRoute(
  '/conversations/[conversationId]/stream',
  async (request: Request, context: { params: Promise<{ conversationId: string }> | { conversationId: string } }) => {
    const params = await context.params;
    const body = (await request.json().catch(() => ({}))) as ConversationStreamRequest;
    const userId = await getAuthenticatedConversationUserId();

    if (!userId) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    const conversationId = normalizeConversationText(params?.conversationId);
    if (!conversationId) {
      return createJsonResponse({ error: 'conversationId is required' }, 400);
    }

    const conversation = await getConversation(conversationId, userId);
    if (!conversation) {
      return createJsonResponse({ error: 'Conversation not found' }, 404);
    }

    const content = deriveConversationInput(body);
    if (!content) {
      return createJsonResponse({ error: 'content is required' }, 400);
    }

    return createConversationWriteStreamResponse({
      conversationId: conversation.id,
      userId,
      content,
      tokens: body.tokens || [],
    });
  },
);
