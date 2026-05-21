import { createHash } from 'crypto';
import { assertNonEmptyString } from './constants';

export const V27_CRYPTO_TELEMETRY_EVENTS = [
  'wallet.connection_failed',
  'wallet.signing_failed',
  'btc_fee.estimation_drift',
  'btc_fee.transaction_construction_failed',
  'btc_fee.broadcast_rejected',
  'btc_fee.confirmation_lag',
  'btc_fee.replaced',
  'ledger_anchor.reorged',
  'ledger_anchor.failed',
  'ledger_provider.disagreement',
  'exchange_journal.drift',
  'database_projection.lag',
  'database_projection.repaired',
  'access_check.failed',
  'settlement_route.failed',
  'upgrade_migration.failed',
] as const;

export type V27CryptoTelemetryEvent = (typeof V27_CRYPTO_TELEMETRY_EVENTS)[number];

export type V27CryptoTelemetrySeverity = 'info' | 'warning' | 'critical';

export interface V27CryptoTelemetryRecord {
  event: V27CryptoTelemetryEvent;
  severity: V27CryptoTelemetrySeverity;
  subjectId: string;
  receiptRoot?: string;
  ledgerAnchorId?: string;
  issuedAt: string;
}

export function classifyV27CryptoTelemetryEvent(
  event: V27CryptoTelemetryEvent,
): V27CryptoTelemetrySeverity {
  if (
    event === 'ledger_anchor.reorged' ||
    event === 'ledger_provider.disagreement' ||
    event === 'exchange_journal.drift' ||
    event === 'upgrade_migration.failed'
  ) {
    return 'critical';
  }

  if (
    event === 'wallet.signing_failed' ||
    event === 'btc_fee.estimation_drift' ||
    event === 'btc_fee.broadcast_rejected' ||
    event === 'btc_fee.confirmation_lag' ||
    event === 'database_projection.lag' ||
    event === 'access_check.failed' ||
    event === 'settlement_route.failed'
  ) {
    return 'warning';
  }

  return 'info';
}

export function buildV27CryptoTelemetryRecord(input: {
  event: V27CryptoTelemetryEvent;
  subjectId: string;
  receiptRoot?: string;
  ledgerAnchorId?: string;
  severity?: V27CryptoTelemetrySeverity;
  issuedAt?: string;
}): V27CryptoTelemetryRecord {
  return {
    event: input.event,
    severity: input.severity ?? classifyV27CryptoTelemetryEvent(input.event),
    subjectId: assertNonEmptyString(input.subjectId, 'subjectId'),
    receiptRoot: input.receiptRoot
      ? assertNonEmptyString(input.receiptRoot, 'receiptRoot')
      : undefined,
    ledgerAnchorId: input.ledgerAnchorId
      ? assertNonEmptyString(input.ledgerAnchorId, 'ledgerAnchorId')
      : undefined,
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}

export const BTD_PROTOCOL_TELEMETRY_SUBJECT_KINDS = [
  'btd_receipt',
  'btc_fee_state',
  'ledger_projection',
  'source_to_shares_proof',
  'bridge_readiness_posture',
] as const;

export type BtdProtocolTelemetrySubjectKind =
  (typeof BTD_PROTOCOL_TELEMETRY_SUBJECT_KINDS)[number];

export const BTD_PROTOCOL_TELEMETRY_EVENTS = [
  'btd.receipt.emitted',
  'btd.btc_fee_state.emitted',
  'btd.ledger_projection.emitted',
  'btd.source_to_shares_proof.emitted',
  'btd.bridge_readiness_posture.emitted',
] as const;

export type BtdProtocolTelemetryEvent = (typeof BTD_PROTOCOL_TELEMETRY_EVENTS)[number];

export type BtdProtocolTelemetryMetadataValue = string | number | boolean | null;

export interface BtdProtocolTelemetrySourceSafety {
  sourceSafe: true;
  protectedSourceVisible: false;
  containsProtectedSource: false;
  containsSecret: false;
}

export interface BtdProtocolTelemetryInput {
  telemetryId?: string;
  event: BtdProtocolTelemetryEvent;
  subjectKind: BtdProtocolTelemetrySubjectKind;
  subjectId: string;
  root: string;
  receiptRoot?: string;
  proofRoot?: string;
  ledgerAnchorId?: string;
  artifactPath?: string;
  severity?: V27CryptoTelemetrySeverity;
  metadata?: Record<string, BtdProtocolTelemetryMetadataValue>;
  issuedAt?: string;
}

export interface BtdProtocolTelemetryRecord {
  kind: 'btd.protocol_telemetry_record';
  telemetryId: string;
  event: BtdProtocolTelemetryEvent;
  subjectKind: BtdProtocolTelemetrySubjectKind;
  subjectId: string;
  root: string;
  receiptRoot?: string;
  proofRoot?: string;
  ledgerAnchorId?: string;
  artifactPath?: string;
  severity: V27CryptoTelemetrySeverity;
  metadata: Record<string, BtdProtocolTelemetryMetadataValue>;
  sourceSafety: BtdProtocolTelemetrySourceSafety;
  telemetryRoot: string;
  issuedAt: string;
}

export const BTD_PROTOCOL_PROOF_HOOK_FAMILIES = [
  'btd_receipt',
  'btc_fee_state',
  'ledger_projection',
  'source_to_shares',
  'bridge_readiness',
] as const;

export type BtdProtocolProofHookFamily =
  (typeof BTD_PROTOCOL_PROOF_HOOK_FAMILIES)[number];

export interface BtdProtocolProofHookInput {
  proofHookId?: string;
  proofFamily: BtdProtocolProofHookFamily;
  subjectKind: BtdProtocolTelemetrySubjectKind;
  subjectId: string;
  evidenceRoot: string;
  telemetryRoot: string;
  theoremIds: string[];
  replayStepIds: string[];
  witnessArtifactPaths: string[];
  generatedArtifactPath?: string;
  issuedAt?: string;
}

export interface BtdProtocolProofHook {
  kind: 'btd.protocol_proof_hook';
  proofHookId: string;
  proofFamily: BtdProtocolProofHookFamily;
  subjectKind: BtdProtocolTelemetrySubjectKind;
  subjectId: string;
  evidenceRoot: string;
  telemetryRoot: string;
  theoremIds: string[];
  replayStepIds: string[];
  witnessArtifactPaths: string[];
  generatedArtifactPath?: string;
  compatibleWith: ['V32', 'V35'];
  sourceSafety: BtdProtocolTelemetrySourceSafety;
  hookRoot: string;
  issuedAt: string;
}

export interface BtdProtocolTelemetryEnvelopeInput {
  envelopeId?: string;
  telemetry: BtdProtocolTelemetryInput[];
  proofHooks: BtdProtocolProofHookInput[];
  issuedAt?: string;
}

export interface BtdProtocolTelemetryEnvelope {
  kind: 'btd.protocol_telemetry_envelope';
  envelopeId: string;
  telemetry: BtdProtocolTelemetryRecord[];
  proofHooks: BtdProtocolProofHook[];
  compatibleWith: ['V32', 'V35'];
  sourceSafety: BtdProtocolTelemetrySourceSafety;
  telemetryRoot: string;
  proofRoot: string;
  issuedAt: string;
}

const PROTOCOL_EVENT_SUBJECT_KIND: Record<
  BtdProtocolTelemetryEvent,
  BtdProtocolTelemetrySubjectKind
> = {
  'btd.receipt.emitted': 'btd_receipt',
  'btd.btc_fee_state.emitted': 'btc_fee_state',
  'btd.ledger_projection.emitted': 'ledger_projection',
  'btd.source_to_shares_proof.emitted': 'source_to_shares_proof',
  'btd.bridge_readiness_posture.emitted': 'bridge_readiness_posture',
};

const SOURCE_SAFETY: BtdProtocolTelemetrySourceSafety = {
  sourceSafe: true,
  protectedSourceVisible: false,
  containsProtectedSource: false,
  containsSecret: false,
};

const SECRET_OR_SOURCE_PATTERNS = [
  new RegExp(`sb_${'secret'}__`, 'iu'),
  /\bsk-(?:proj|live|test)?[-_A-Za-z0-9]{16,}\b/u,
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/u,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/u,
  /\bprotected\s+source\b/iu,
  /\bprivate\s+source\b/iu,
];

const SENSITIVE_METADATA_KEYS = new Set([
  'protectedSource',
  'protectedSourceText',
  'rawSource',
  'sourceText',
  'privateKey',
  'secret',
  'token',
]);

export function buildBtdProtocolTelemetryRecord(
  input: BtdProtocolTelemetryInput,
): BtdProtocolTelemetryRecord {
  assertProtocolTelemetrySubjectKind(input.subjectKind);
  assertProtocolTelemetryEvent(input.event);
  if (PROTOCOL_EVENT_SUBJECT_KIND[input.event] !== input.subjectKind) {
    throw new Error('Protocol telemetry event does not match subject kind.');
  }

  const subjectId = assertSourceSafeString(input.subjectId, 'subjectId');
  const root = assertSourceSafeString(input.root, 'root');
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const metadata = normalizeProtocolTelemetryMetadata(input.metadata ?? {});
  const telemetryId =
    input.telemetryId ??
    stableProtocolTelemetryRoot('btd-protocol-telemetry', [
      input.event,
      input.subjectKind,
      subjectId,
      root,
    ]);
  const telemetryRoot = stableProtocolTelemetryRoot('btd-protocol-telemetry-root', [
    telemetryId,
    input.event,
    input.subjectKind,
    subjectId,
    root,
    input.receiptRoot ?? '',
    input.proofRoot ?? '',
    input.ledgerAnchorId ?? '',
    input.artifactPath ?? '',
  ]);

  return {
    kind: 'btd.protocol_telemetry_record',
    telemetryId,
    event: input.event,
    subjectKind: input.subjectKind,
    subjectId,
    root,
    receiptRoot: optionalSourceSafeString(input.receiptRoot, 'receiptRoot'),
    proofRoot: optionalSourceSafeString(input.proofRoot, 'proofRoot'),
    ledgerAnchorId: optionalSourceSafeString(input.ledgerAnchorId, 'ledgerAnchorId'),
    artifactPath: optionalSourceSafeString(input.artifactPath, 'artifactPath'),
    severity: input.severity ?? 'info',
    metadata,
    sourceSafety: { ...SOURCE_SAFETY },
    telemetryRoot,
    issuedAt,
  };
}

export function buildBtdProtocolProofHook(
  input: BtdProtocolProofHookInput,
): BtdProtocolProofHook {
  assertProtocolProofHookFamily(input.proofFamily);
  assertProtocolTelemetrySubjectKind(input.subjectKind);

  if (!input.theoremIds.length) {
    throw new Error('Protocol proof hook requires at least one theoremId.');
  }
  if (!input.replayStepIds.length) {
    throw new Error('Protocol proof hook requires at least one replayStepId.');
  }
  if (!input.witnessArtifactPaths.length) {
    throw new Error('Protocol proof hook requires at least one witnessArtifactPath.');
  }

  const subjectId = assertSourceSafeString(input.subjectId, 'subjectId');
  const evidenceRoot = assertSourceSafeString(input.evidenceRoot, 'evidenceRoot');
  const telemetryRoot = assertSourceSafeString(input.telemetryRoot, 'telemetryRoot');
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const proofHookId =
    input.proofHookId ??
    stableProtocolTelemetryRoot('btd-protocol-proof-hook', [
      input.proofFamily,
      input.subjectKind,
      subjectId,
      evidenceRoot,
      telemetryRoot,
    ]);
  const theoremIds = input.theoremIds.map((id) => assertSourceSafeString(id, 'theoremId'));
  const replayStepIds = input.replayStepIds.map((id) =>
    assertSourceSafeString(id, 'replayStepId'),
  );
  const witnessArtifactPaths = input.witnessArtifactPaths.map((path) =>
    assertSourceSafeString(path, 'witnessArtifactPath'),
  );
  const generatedArtifactPath = optionalSourceSafeString(
    input.generatedArtifactPath,
    'generatedArtifactPath',
  );
  const hookRoot = stableProtocolTelemetryRoot('btd-protocol-proof-hook-root', [
    proofHookId,
    input.proofFamily,
    input.subjectKind,
    subjectId,
    evidenceRoot,
    telemetryRoot,
    theoremIds.join(','),
    replayStepIds.join(','),
    witnessArtifactPaths.join(','),
    generatedArtifactPath ?? '',
  ]);

  return {
    kind: 'btd.protocol_proof_hook',
    proofHookId,
    proofFamily: input.proofFamily,
    subjectKind: input.subjectKind,
    subjectId,
    evidenceRoot,
    telemetryRoot,
    theoremIds,
    replayStepIds,
    witnessArtifactPaths,
    generatedArtifactPath,
    compatibleWith: ['V32', 'V35'],
    sourceSafety: { ...SOURCE_SAFETY },
    hookRoot,
    issuedAt,
  };
}

export function buildBtdProtocolTelemetryEnvelope(
  input: BtdProtocolTelemetryEnvelopeInput,
): BtdProtocolTelemetryEnvelope {
  if (!input.telemetry.length) {
    throw new Error('Protocol telemetry envelope requires at least one telemetry record.');
  }
  if (!input.proofHooks.length) {
    throw new Error('Protocol telemetry envelope requires at least one proof hook.');
  }

  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const telemetry = input.telemetry.map((record) =>
    buildBtdProtocolTelemetryRecord({ ...record, issuedAt: record.issuedAt ?? issuedAt }),
  );
  const proofHooks = input.proofHooks.map((hook) =>
    buildBtdProtocolProofHook({ ...hook, issuedAt: hook.issuedAt ?? issuedAt }),
  );
  const telemetryRoots = new Set(telemetry.map((record) => record.telemetryRoot));
  for (const hook of proofHooks) {
    if (!telemetryRoots.has(hook.telemetryRoot)) {
      throw new Error('Protocol proof hook references a telemetryRoot not present in the envelope.');
    }
  }

  const telemetryRoot = stableProtocolTelemetryRoot(
    'btd-protocol-telemetry-envelope-root',
    telemetry.map((record) => record.telemetryRoot),
  );
  const proofRoot = stableProtocolTelemetryRoot(
    'btd-protocol-proof-envelope-root',
    proofHooks.map((hook) => hook.hookRoot),
  );
  const envelopeId =
    input.envelopeId ??
    stableProtocolTelemetryRoot('btd-protocol-telemetry-envelope', [
      telemetryRoot,
      proofRoot,
    ]);

  return {
    kind: 'btd.protocol_telemetry_envelope',
    envelopeId,
    telemetry,
    proofHooks,
    compatibleWith: ['V32', 'V35'],
    sourceSafety: { ...SOURCE_SAFETY },
    telemetryRoot,
    proofRoot,
    issuedAt,
  };
}

function assertProtocolTelemetryEvent(event: string): BtdProtocolTelemetryEvent {
  if (!BTD_PROTOCOL_TELEMETRY_EVENTS.includes(event as BtdProtocolTelemetryEvent)) {
    throw new Error(`Unsupported Protocol telemetry event: ${event}.`);
  }

  return event as BtdProtocolTelemetryEvent;
}

function assertProtocolTelemetrySubjectKind(
  subjectKind: string,
): BtdProtocolTelemetrySubjectKind {
  if (
    !BTD_PROTOCOL_TELEMETRY_SUBJECT_KINDS.includes(
      subjectKind as BtdProtocolTelemetrySubjectKind,
    )
  ) {
    throw new Error(`Unsupported Protocol telemetry subject kind: ${subjectKind}.`);
  }

  return subjectKind as BtdProtocolTelemetrySubjectKind;
}

function assertProtocolProofHookFamily(
  proofFamily: string,
): BtdProtocolProofHookFamily {
  if (!BTD_PROTOCOL_PROOF_HOOK_FAMILIES.includes(proofFamily as BtdProtocolProofHookFamily)) {
    throw new Error(`Unsupported Protocol proof hook family: ${proofFamily}.`);
  }

  return proofFamily as BtdProtocolProofHookFamily;
}

function normalizeProtocolTelemetryMetadata(
  metadata: Record<string, BtdProtocolTelemetryMetadataValue>,
): Record<string, BtdProtocolTelemetryMetadataValue> {
  return Object.fromEntries(
    Object.entries(metadata).map(([key, value]) => {
      if (SENSITIVE_METADATA_KEYS.has(key)) {
        throw new Error(`Protocol telemetry metadata key is not source-safe: ${key}.`);
      }
      assertSourceSafeString(key, 'metadataKey');
      if (typeof value === 'string') {
        return [key, assertSourceSafeString(value, `metadata.${key}`)];
      }
      if (
        value === null ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        return [key, value];
      }

      throw new Error(`Protocol telemetry metadata value is not source-safe: ${key}.`);
    }),
  );
}

function optionalSourceSafeString(value: string | undefined, label: string): string | undefined {
  return value === undefined ? undefined : assertSourceSafeString(value, label);
}

function assertSourceSafeString(value: unknown, label: string): string {
  const text = assertNonEmptyString(value, label);
  if (SECRET_OR_SOURCE_PATTERNS.some((pattern) => pattern.test(text))) {
    throw new Error(`${label} must not contain secrets or protected source.`);
  }

  return text;
}

function stableProtocolTelemetryRoot(prefix: string, parts: string[]): string {
  const hash = createHash('sha256').update(parts.join('\u001f')).digest('hex').slice(0, 24);
  return `${prefix}:${hash}`;
}
