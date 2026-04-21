export type AgenticExecutionLens = 'give' | 'need' | 'closure';

export interface AgenticExecutionSummary {
  canonicalType: string;
  family:
    | 'branch-artifact'
    | 'need-measurement'
    | 'proof-refresh'
    | 'upgrade'
    | 'agentic-execution';
  label: string;
  lens: AgenticExecutionLens;
  proofStatus: string;
  closureFocus: string;
}

const DEFAULT_CANONICAL_TYPE = 'agentic-execution:branch-artifact' as const;
const DEFAULT_STORAGE_TYPE = 'pipeline:deliverables';

const CANONICAL_TO_STORAGE_TYPE = {
  'agentic-execution:branch-artifact': 'pipeline:deliverables',
  'agentic-execution:need-measurement': 'pipeline:measure',
  'agentic-execution:proof-refresh': 'pipeline:proof-refresh',
  'agentic-execution:upgrade': 'pipeline:upgrades',
} as const;

type CanonicalAgenticExecutionType = keyof typeof CANONICAL_TO_STORAGE_TYPE;

function normalizeWhitespace(value?: string | null) {
  return value?.trim() || '';
}

export function normalizeAgenticExecutionType(value?: string | null) {
  const normalized = normalizeWhitespace(value).toLowerCase();

  if (!normalized) return DEFAULT_CANONICAL_TYPE;
  if (normalized.startsWith('agentic-execution:')) {
    return normalized in CANONICAL_TO_STORAGE_TYPE
      ? (normalized as CanonicalAgenticExecutionType)
      : DEFAULT_CANONICAL_TYPE;
  }
  if (normalized.includes('upgrade')) return 'agentic-execution:upgrade';
  if (normalized.includes('proof')) return 'agentic-execution:proof-refresh';
  if (normalized.includes('measure')) return 'agentic-execution:need-measurement';
  if (normalized.includes('deliverable') || normalized.includes('artifact')) {
    return 'agentic-execution:branch-artifact';
  }

  return DEFAULT_CANONICAL_TYPE;
}

export function normalizeAgenticExecutionStorageType(value?: string | null) {
  const normalized = normalizeWhitespace(value).toLowerCase();

  if (!normalized) return DEFAULT_STORAGE_TYPE;
  if (normalized.startsWith('pipeline:')) return normalized;

  const canonicalType = normalizeAgenticExecutionType(normalized);
  return CANONICAL_TO_STORAGE_TYPE[canonicalType] ?? DEFAULT_STORAGE_TYPE;
}

export function resolveAgenticExecutionQueryTypes(value?: string | null) {
  const normalized = normalizeWhitespace(value).toLowerCase();

  if (!normalized) return [];

  if (normalized.startsWith('pipeline:')) {
    return Array.from(
      new Set([normalized, normalizeAgenticExecutionType(normalized)]),
    );
  }

  const canonicalType = normalizeAgenticExecutionType(normalized);
  return Array.from(
    new Set([canonicalType, normalizeAgenticExecutionStorageType(canonicalType)]),
  );
}

export function formatAgenticExecutionLabel(value?: string | null) {
  const canonicalType = normalizeAgenticExecutionType(value);

  switch (canonicalType) {
    case 'agentic-execution:need-measurement':
      return 'need measurement execution';
    case 'agentic-execution:proof-refresh':
      return 'proof refresh execution';
    case 'agentic-execution:upgrade':
      return 'upgrade execution';
    case 'agentic-execution:branch-artifact':
    default:
      return 'branch artifact execution';
  }
}

export function deriveAgenticExecutionLens(value?: string | null): AgenticExecutionLens {
  const canonicalType = normalizeAgenticExecutionType(value);

  switch (canonicalType) {
    case 'agentic-execution:need-measurement':
      return 'need';
    case 'agentic-execution:proof-refresh':
    case 'agentic-execution:upgrade':
      return 'closure';
    case 'agentic-execution:branch-artifact':
    default:
      return 'give';
  }
}

export function deriveAgenticExecutionClosureFocus(value?: string | null) {
  const canonicalType = normalizeAgenticExecutionType(value);

  switch (canonicalType) {
    case 'agentic-execution:need-measurement':
      return 'need measurement + verification posture';
    case 'agentic-execution:proof-refresh':
      return 'proof-family refresh + operating posture';
    case 'agentic-execution:upgrade':
      return 'upgrade closure + delivery posture';
    case 'agentic-execution:branch-artifact':
    default:
      return 'branch artifacts + settlement delivery';
  }
}

export function deriveAgenticExecutionProofStatus(value?: string | null, status?: string | null) {
  const canonicalType = normalizeAgenticExecutionType(value);
  const normalizedStatus = normalizeWhitespace(status).toLowerCase();

  if (normalizedStatus === 'completed') {
    switch (canonicalType) {
      case 'agentic-execution:need-measurement':
        return 'need-measurement witness ready';
      case 'agentic-execution:proof-refresh':
        return 'proof witness ready';
      case 'agentic-execution:upgrade':
        return 'upgrade closure ready';
      case 'agentic-execution:branch-artifact':
      default:
        return 'branch artifact bundle ready';
    }
  }

  if (normalizedStatus === 'error' || normalizedStatus === 'failed') {
    return 'agentic execution failed closed';
  }

  switch (canonicalType) {
    case 'agentic-execution:need-measurement':
      return 'need-measurement witness in flight';
    case 'agentic-execution:proof-refresh':
      return 'proof witness in flight';
    case 'agentic-execution:upgrade':
      return 'upgrade closure in flight';
    case 'agentic-execution:branch-artifact':
    default:
      return 'branch artifact bundle in flight';
  }
}

export function buildAgenticExecutionSummary(input: {
  type?: string | null;
  status?: string | null;
}): AgenticExecutionSummary {
  const canonicalType = normalizeAgenticExecutionType(input.type);

  return {
    canonicalType,
    family: canonicalType.replace('agentic-execution:', '') as AgenticExecutionSummary['family'],
    label: formatAgenticExecutionLabel(canonicalType),
    lens: deriveAgenticExecutionLens(canonicalType),
    proofStatus: deriveAgenticExecutionProofStatus(canonicalType, input.status),
    closureFocus: deriveAgenticExecutionClosureFocus(canonicalType),
  };
}
