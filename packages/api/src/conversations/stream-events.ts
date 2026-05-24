import * as crypto from 'crypto';

import {
  buildConversationTelemetryProofHook,
  type ConversationTelemetryEventFamily,
  type ConversationTelemetryProofHook,
} from './telemetry';

export type ConversationStreamEventKind =
  | 'model_delta'
  | 'tool_call'
  | 'retrieval_summary'
  | 'proof_root'
  | 'retry_state'
  | 'completion_decision'
  | 'error_row';

export type ConversationStreamDisclosurePosture =
  | 'prompt_template_id_only'
  | 'prompt_summary_only'
  | 'result_summary_only'
  | 'parsed_result_shape_only'
  | 'source_safe_metadata_only';

export type ConversationStreamEvent = {
  eventId: string;
  eventKind: ConversationStreamEventKind;
  legacySseType: string;
  runId: string | null;
  conversationId: string | null;
  sequence: number;
  timestamp: string;
  collapsedStatus: string;
  expandedMetadata: Record<string, unknown>;
  proofRoots: Record<string, string>;
  telemetryProofHook: ConversationTelemetryProofHook;
  redactionPosture: {
    postureId: 'conversation-stream-redaction-source-safe';
    forbiddenPayloadClasses: string[];
    promptPayloadVisible: false;
    protectedSourceVisible: false;
    unpaidAssetPackSourceVisible: false;
    rawModelResponseVisible: false;
    globalLedgerAuthorityClaimed: false;
  };
  promptDisclosurePosture: ConversationStreamDisclosurePosture;
  resultDisclosurePosture: ConversationStreamDisclosurePosture;
  failClosedStates: string[];
  sourceSafetyClass: 'source_safe_conversation_stream_event_metadata';
  executionState: Record<string, unknown>;
};

type BuildConversationStreamEventInput = {
  eventKind: ConversationStreamEventKind;
  legacySseType: string;
  runId?: string | null;
  conversationId?: string | null;
  sequence: number;
  collapsedStatus: string;
  metadata?: Record<string, unknown>;
  proofRootFields?: string[];
  failClosedStates?: string[];
  executionState?: Record<string, unknown>;
};

const FORBIDDEN_PAYLOAD_CLASSES = [
  'secret_values',
  'provider_tokens',
  'wallet_private_material',
  'protected_source_payloads',
  'raw_protected_prompts',
  'raw_model_responses_with_protected_source',
  'unpaid_assetpack_source',
  'settlement_private_payloads',
  'global_ledger_authority_claim',
];

const EVENT_KIND_DEFAULTS: Record<
  ConversationStreamEventKind,
  {
    type: 'thinking' | 'generation' | 'tool-use' | 'completion' | 'error';
    phase: string;
    step: 'plan' | 'try' | 'refine' | 'retry';
    generation?: 'reason' | 'judge' | 'structured_output';
    tool?: string;
    proofRootFields: string[];
    failClosedStates: string[];
  }
> = {
  model_delta: {
    type: 'generation',
    phase: 'stream',
    step: 'try',
    generation: 'structured_output',
    proofRootFields: ['eventRoot', 'conversationRoot', 'deltaRoot'],
    failClosedStates: ['missing_event_id', 'unsafe_delta_payload', 'protected_source_visible'],
  },
  tool_call: {
    type: 'tool-use',
    phase: 'tooling',
    step: 'try',
    tool: 'conversation-stream-router',
    proofRootFields: ['eventRoot', 'conversationRoot', 'toolCallRoot'],
    failClosedStates: ['missing_tool_name', 'tool_payload_not_source_safe', 'provider_token_visible'],
  },
  retrieval_summary: {
    type: 'thinking',
    phase: 'retrieval',
    step: 'plan',
    proofRootFields: ['eventRoot', 'conversationRoot', 'retrievalRoot'],
    failClosedStates: ['missing_context_ref', 'protected_source_visible', 'raw_prompt_visible'],
  },
  proof_root: {
    type: 'thinking',
    phase: 'proof',
    step: 'refine',
    proofRootFields: ['eventRoot', 'conversationRoot', 'telemetryRoot', 'redactionRoot'],
    failClosedStates: ['missing_proof_root', 'redaction_posture_missing'],
  },
  retry_state: {
    type: 'thinking',
    phase: 'retry',
    step: 'retry',
    proofRootFields: ['eventRoot', 'conversationRoot', 'retryRoot'],
    failClosedStates: ['retry_without_history_ref', 'retry_policy_missing', 'unsafe_retry_payload'],
  },
  completion_decision: {
    type: 'completion',
    phase: 'completion',
    step: 'refine',
    proofRootFields: ['eventRoot', 'conversationRoot', 'messageRoot', 'completionRoot'],
    failClosedStates: ['missing_message_id', 'unsafe_completion_payload', 'assistant_message_not_persisted'],
  },
  error_row: {
    type: 'error',
    phase: 'error',
    step: 'retry',
    proofRootFields: ['eventRoot', 'conversationRoot', 'errorRoot'],
    failClosedStates: ['stream_exception', 'unsafe_error_detail', 'raw_provider_error_visible'],
  },
};

const EVENT_KIND_TELEMETRY_FAMILY: Record<ConversationStreamEventKind, ConversationTelemetryEventFamily> = {
  model_delta: 'stream',
  tool_call: 'tool',
  retrieval_summary: 'stream',
  proof_root: 'stream',
  retry_state: 'retry',
  completion_decision: 'completion',
  error_row: 'error',
};

function digest(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex').slice(0, 24);
}

function sanitizeMetadata(value: unknown): unknown {
  if (value == null) return value;
  if (typeof value === 'string') return value.length > 500 ? `${value.slice(0, 497)}...` : value;
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.slice(0, 12).map(sanitizeMetadata);
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key]) => !/secret|token|private|rawPrompt|rawResponse|sourceContent/i.test(key))
        .slice(0, 24)
        .map(([key, entryValue]) => [key, sanitizeMetadata(entryValue)]),
    );
  }

  return String(value);
}

function buildProofRoots(input: BuildConversationStreamEventInput) {
  const defaults = EVENT_KIND_DEFAULTS[input.eventKind];
  const proofRootFields = input.proofRootFields || defaults.proofRootFields;
  return Object.fromEntries(
    proofRootFields.map((field) => [
      field,
      `conversation-stream-proof:${digest([
        input.eventKind,
        input.legacySseType,
        input.runId || 'no-run',
        input.conversationId || 'no-conversation',
        input.sequence,
        field,
      ].join(':'))}`,
    ]),
  );
}

export function buildConversationStreamEvent(input: BuildConversationStreamEventInput): ConversationStreamEvent {
  const defaults = EVENT_KIND_DEFAULTS[input.eventKind];
  const proofRoots = buildProofRoots(input);
  const eventId = `conversation-stream-event:${digest([
    input.eventKind,
    input.legacySseType,
    input.runId || 'no-run',
    input.conversationId || 'no-conversation',
    input.sequence,
    input.collapsedStatus,
  ].join(':'))}`;
  const telemetryProofHook = buildConversationTelemetryProofHook({
    eventFamily: EVENT_KIND_TELEMETRY_FAMILY[input.eventKind],
    eventKind: `conversation.stream.${input.eventKind}`,
    status: input.eventKind === 'error_row' ? 'error' : input.eventKind === 'completion_decision' ? 'completed' : 'observed',
    conversationId: input.conversationId || null,
    runId: input.runId || null,
    timestamp: new Date().toISOString(),
    correlationIds: {
      conversationId: input.conversationId || null,
      runId: input.runId || null,
      eventId,
      sequence: input.sequence,
    },
    proofRoots: {
      ...proofRoots,
      telemetryRoot: proofRoots.telemetryRoot || `conversation-stream-proof:${digest(`${eventId}:telemetryRoot`)}`,
    },
    metadata: {
      eventKind: input.eventKind,
      legacySseType: input.legacySseType,
      sequence: input.sequence,
      metadata: input.metadata || {},
    },
  });

  return {
    eventId,
    eventKind: input.eventKind,
    legacySseType: input.legacySseType,
    runId: input.runId || null,
    conversationId: input.conversationId || null,
    sequence: input.sequence,
    timestamp: new Date().toISOString(),
    collapsedStatus: input.collapsedStatus,
    expandedMetadata: sanitizeMetadata(input.metadata || {}) as Record<string, unknown>,
    proofRoots,
    telemetryProofHook,
    redactionPosture: {
      postureId: 'conversation-stream-redaction-source-safe',
      forbiddenPayloadClasses: [...FORBIDDEN_PAYLOAD_CLASSES],
      promptPayloadVisible: false,
      protectedSourceVisible: false,
      unpaidAssetPackSourceVisible: false,
      rawModelResponseVisible: false,
      globalLedgerAuthorityClaimed: false,
    },
    promptDisclosurePosture: 'prompt_template_id_only',
    resultDisclosurePosture: 'parsed_result_shape_only',
    failClosedStates: input.failClosedStates || defaults.failClosedStates,
    sourceSafetyClass: 'source_safe_conversation_stream_event_metadata',
    executionState: {
      type: defaults.type,
      pipeline: 'ConversationStream',
      phase: defaults.phase,
      agent: 'ConversationStreamEvent',
      step: defaults.step,
      generation: defaults.generation,
      tool: defaults.tool,
      outputSchema: `ConversationStreamEvent:${input.eventKind}`,
      eventId,
      proofRoot: proofRoots.eventRoot,
      redactionPosture: 'source_safe_conversation_stream_event_metadata',
      promptDisclosurePosture: 'prompt_template_id_only',
      resultDisclosurePosture: 'parsed_result_shape_only',
      failClosedState: (input.failClosedStates || defaults.failClosedStates)[0],
      ...input.executionState,
    },
  };
}

export function attachConversationStreamEvent<T extends Record<string, unknown>>(
  payload: T,
  event: ConversationStreamEvent,
) {
  return {
    ...payload,
    conversationStreamEvent: event,
  };
}

export function buildConversationPipelineLogEvent(event: ConversationStreamEvent) {
  return {
    type: event.executionState.type,
    message: event.collapsedStatus,
    collapsedStatus: event.collapsedStatus,
    timestamp: event.timestamp,
    status: {
      progress: event.eventKind === 'error_row' ? 'error' : event.eventKind === 'completion_decision' ? 'success' : 'in-progress',
      detail: event.collapsedStatus,
      timestamp: event.timestamp,
      executionState: event.executionState,
      metadata: {
        conversationStreamEvent: event,
        eventId: event.eventId,
        eventKind: event.eventKind,
        proofRoots: event.proofRoots,
        telemetryProofHook: event.telemetryProofHook,
        dashboardPanel: event.telemetryProofHook.dashboardPanel,
        runbookId: event.telemetryProofHook.runbookId,
        redactionPosture: event.redactionPosture,
        promptDisclosurePosture: event.promptDisclosurePosture,
        resultDisclosurePosture: event.resultDisclosurePosture,
        failClosedStates: event.failClosedStates,
        expandedMetadata: event.expandedMetadata,
      },
    },
  };
}
