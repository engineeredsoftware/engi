import * as crypto from 'crypto';

import { redactPemPrivateKeyBlocks } from './secret-redaction';

export type ConversationPersistenceVisibilityTier =
  | 'public'
  | 'user_visible'
  | 'organization_visible'
  | 'buyer_visible'
  | 'reviewer_visible'
  | 'operator_only';

export type ConversationPersistenceOperation =
  | 'persist_message'
  | 'restore_history'
  | 'export_history'
  | 'delete_history'
  | 'retain_history'
  | 'replay_history'
  | 'incident_repair';

export type ConversationPersistenceRedactionResult<T = unknown> = {
  value: T;
  redactionApplied: boolean;
  redactedPaths: string[];
};

export type ConversationPersistenceEnvelope = {
  operationId: ConversationPersistenceOperation;
  visibilityTier: ConversationPersistenceVisibilityTier;
  sourceSafetyClass: 'source_safe_conversation_persistence_privacy_redaction';
  redactionApplied: boolean;
  redactedPaths: string[];
  proofRoot: string;
  eventIds: string[];
  retentionPosture: string;
  disclosureBoundary: {
    mayExpose: string[];
    mustNotExpose: string[];
  };
};

const SENSITIVE_KEY_RE = /(secret|token|password|private[_-]?key|wallet[_-]?private|service[_-]?role|authorization|credential)/iu;
const PROTECTED_CONTEXT_RE =
  /(raw[_ -]?prompt|protected[_ -]?prompt|model[_ -]?response|protected[_ -]?source|source[_ -]?body|unpaid[_ -]?assetpack|wallet[_ -]?private|settlement[_ -]?private)/iu;
const NON_SECRET_CLASSIFICATION_KEYS = new Set(['token_type']);
const SECRET_VALUE_PATTERNS = [
  new RegExp(`${['sk', 'proj'].join('-')}[A-Za-z0-9_-]{12,}`, 'gu'),
  new RegExp(`${['sb', 'secret'].join('_')}__[A-Za-z0-9_-]{12,}`, 'gu'),
  new RegExp('eyJ[A-Za-z0-9_-]{16,}\\.[A-Za-z0-9_-]{16,}\\.[A-Za-z0-9_-]{16,}', 'gu'),
  /Bearer\s+[A-Za-z0-9._-]{16,}/giu,
  /(?:password|secret|token|private_key)\s*[:=]\s*\S{8,}/giu,
];

export const CONVERSATION_PERSISTENCE_MUST_NOT_EXPOSE = [
  'secret_values',
  'provider_tokens',
  'wallet_private_material',
  'protected_source_payloads',
  'raw_protected_prompts',
  'raw_model_responses_with_protected_source',
  'unpaid_assetpack_source',
  'settlement_private_payloads',
  'private_payment_credentials',
  'operator_private_notes',
  'ledger_write_authority',
  'wallet_signing_authority',
] as const;

const DEFAULT_MAY_EXPOSE = [
  'conversation_id',
  'message_id',
  'actor_id',
  'visibility_tier',
  'source_safe_content',
  'source_context_refs',
  'redaction_posture',
  'retention_posture',
  'proof_roots',
  'event_ids',
];

function stableJson(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
    .join(',')}}`;
}

function proofRoot(value: unknown) {
  return `conversation-persistence-privacy:${crypto
    .createHash('sha256')
    .update(stableJson(value))
    .digest('hex')
    .slice(0, 24)}`;
}

function shouldRedactKey(key: string) {
  if (NON_SECRET_CLASSIFICATION_KEYS.has(key.toLowerCase())) return false;
  return SENSITIVE_KEY_RE.test(key) || PROTECTED_CONTEXT_RE.test(key);
}

export function redactConversationPersistenceText(value: string): ConversationPersistenceRedactionResult<string> {
  const privateKeyRedaction = redactPemPrivateKeyBlocks(value, '[redacted:conversation-persistence-secret]');
  let redacted = privateKeyRedaction.value;
  let redactionApplied = privateKeyRedaction.redactionApplied;

  for (const pattern of SECRET_VALUE_PATTERNS) {
    redacted = redacted.replace(pattern, () => {
      redactionApplied = true;
      return '[redacted:conversation-persistence-secret]';
    });
  }

  if (PROTECTED_CONTEXT_RE.test(redacted)) {
    redactionApplied = true;
    redacted = redacted.replace(PROTECTED_CONTEXT_RE, '[redacted:conversation-persistence-protected-context]');
  }

  return {
    value: redacted,
    redactionApplied,
    redactedPaths: redactionApplied ? ['$'] : [],
  };
}

export function redactConversationPersistenceValue<T = unknown>(
  value: T,
  path = '$',
): ConversationPersistenceRedactionResult<T> {
  if (typeof value === 'string') {
    const redactedText = redactConversationPersistenceText(value);
    return {
      value: redactedText.value as T,
      redactionApplied: redactedText.redactionApplied,
      redactedPaths: redactedText.redactionApplied ? [path] : [],
    };
  }

  if (value === null || typeof value !== 'object') {
    return {
      value,
      redactionApplied: false,
      redactedPaths: [],
    };
  }

  if (Array.isArray(value)) {
    let redactionApplied = false;
    const redactedPaths: string[] = [];
    const redacted = value.map((entry, index) => {
      const result = redactConversationPersistenceValue(entry, `${path}[${index}]`);
      redactionApplied ||= result.redactionApplied;
      redactedPaths.push(...result.redactedPaths);
      return result.value;
    });

    return {
      value: redacted as T,
      redactionApplied,
      redactedPaths,
    };
  }

  let redactionApplied = false;
  const redactedPaths: string[] = [];
  const record = value as Record<string, unknown>;
  const redactedRecord: Record<string, unknown> = {};

  for (const [key, entry] of Object.entries(record)) {
    const entryPath = `${path}.${key}`;
    if (shouldRedactKey(key)) {
      redactedRecord[key] = '[redacted:conversation-persistence-field]';
      redactionApplied = true;
      redactedPaths.push(entryPath);
      continue;
    }

    const result = redactConversationPersistenceValue(entry, entryPath);
    redactedRecord[key] = result.value;
    redactionApplied ||= result.redactionApplied;
    redactedPaths.push(...result.redactedPaths);
  }

  return {
    value: redactedRecord as T,
    redactionApplied,
    redactedPaths,
  };
}

export function buildConversationPersistenceEnvelope(input: {
  operationId: ConversationPersistenceOperation;
  visibilityTier?: ConversationPersistenceVisibilityTier;
  redactionApplied: boolean;
  redactedPaths?: string[];
  seed: Record<string, unknown>;
}): ConversationPersistenceEnvelope {
  const visibilityTier = input.visibilityTier || 'user_visible';
  const retentionPosture =
    visibilityTier === 'operator_only'
      ? 'operator_audit_only'
      : visibilityTier === 'organization_visible'
        ? 'durable_organization_visible'
        : visibilityTier === 'buyer_visible'
          ? 'buyer_rights_visible'
          : visibilityTier === 'reviewer_visible'
            ? 'reviewer_limited_visible'
            : 'durable_user_visible';

  return {
    operationId: input.operationId,
    visibilityTier,
    sourceSafetyClass: 'source_safe_conversation_persistence_privacy_redaction',
    redactionApplied: input.redactionApplied,
    redactedPaths: input.redactedPaths || [],
    proofRoot: proofRoot({
      operationId: input.operationId,
      visibilityTier,
      redactionApplied: input.redactionApplied,
      redactedPaths: input.redactedPaths || [],
      seed: input.seed,
    }),
    eventIds: [
      `conversation.persistence.${input.operationId}.checked`,
      input.redactionApplied
        ? `conversation.persistence.${input.operationId}.redacted`
        : `conversation.persistence.${input.operationId}.source_safe`,
    ],
    retentionPosture,
    disclosureBoundary: {
      mayExpose: [...DEFAULT_MAY_EXPOSE],
      mustNotExpose: [...CONVERSATION_PERSISTENCE_MUST_NOT_EXPOSE],
    },
  };
}

export function buildPersistedConversationMessageRecord(input: {
  conversationId: string;
  messageId: string;
  role: string;
  content: string;
  actorId?: string | null;
  visibilityTier?: ConversationPersistenceVisibilityTier;
}) {
  const redactedContent = redactConversationPersistenceText(input.content);
  const envelope = buildConversationPersistenceEnvelope({
    operationId: 'persist_message',
    visibilityTier: input.visibilityTier,
    redactionApplied: redactedContent.redactionApplied,
    redactedPaths: redactedContent.redactedPaths,
    seed: {
      conversationId: input.conversationId,
      messageId: input.messageId,
      role: input.role,
      actorId: input.actorId || null,
      contentLength: redactedContent.value.length,
    },
  });

  return {
    content: redactedContent.value,
    envelope,
  };
}

export function assertConversationPersistenceSourceSafe(input: {
  envelope: ConversationPersistenceEnvelope;
  serializedPayload?: string;
}) {
  const missingBoundary = CONVERSATION_PERSISTENCE_MUST_NOT_EXPOSE.filter(
    (payloadClass) => !input.envelope.disclosureBoundary.mustNotExpose.includes(payloadClass),
  );
  const containsSecretValue = input.serializedPayload
    ? SECRET_VALUE_PATTERNS.some((pattern) => {
        pattern.lastIndex = 0;
        return pattern.test(input.serializedPayload || '');
      })
    : false;

  if (missingBoundary.length > 0) {
    return {
      admitted: false,
      reason: 'missing_conversation_persistence_disclosure_boundary',
      missingBoundary,
    };
  }

  if (containsSecretValue) {
    return {
      admitted: false,
      reason: 'conversation_persistence_payload_contains_secret_value',
      missingBoundary,
    };
  }

  return {
    admitted: true,
    reason: 'source_safe_conversation_persistence_payload',
    missingBoundary,
  };
}
