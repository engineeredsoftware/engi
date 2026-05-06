import { assertNonEmptyString, assertNonNegativeSafeInteger } from './constants';

export type BtdAncestorEdgeKind =
  | 'implementation_dependency'
  | 'proof_dependency'
  | 'source_reuse'
  | 'conceptual_dependency'
  | 'teaching_dependency'
  | 'citation_only';

export type BtdAncestorEdgeStatus = 'payable' | 'recorded_unpaid' | 'rejected';
export type BtdAncestorRiskFlag =
  | 'duplicate_edge'
  | 'duplicate_source'
  | 'self_edge'
  | 'not_late_bound'
  | 'child_mismatch'
  | 'reciprocal_loop'
  | 'dependency_cycle'
  | 'claimant_reviewer_conflict'
  | 'conflict_disclosed'
  | 'confidence_below_threshold'
  | 'citation_only';

export interface BtdAncestorGraphEdge {
  parentAssetPackId: string;
  childAssetPackId: string;
  status?: BtdAncestorEdgeStatus;
  sourceFingerprintRoot?: string;
  claimantId?: string;
  reviewerId?: string;
}

export interface BtdAncestorEdgeInput {
  parentAssetPackId: string;
  childAssetPackId: string;
  edgeKind: BtdAncestorEdgeKind;
  evidenceRoot: string;
  sourceFingerprintRoot?: string;
  reviewerReceiptRoot?: string;
  claimantId?: string;
  reviewerId?: string;
  confidenceBps: number;
  timelessnessBps: number;
  depth: number;
  createdAfterChildFit: boolean;
  conflictDisclosure: string[];
}

export interface BtdAncestorEdge extends BtdAncestorEdgeInput {
  status: BtdAncestorEdgeStatus;
  rejectionReason?: string;
  riskFlags: BtdAncestorRiskFlag[];
  routeWeight: string;
  supplyEffect: 'none';
  mintCountDelta: 0;
}

export interface BtdAncestryReviewReceipt {
  kind: 'btd.ancestry_review';
  reviewId: string;
  childAssetPackId: string;
  minConfidenceBps: number;
  payableEdgeCount: number;
  recordedUnpaidEdgeCount: number;
  rejectedEdgeCount: number;
  supplyEffect: 'none';
  mintCountDelta: 0;
  edges: BtdAncestorEdge[];
  issuedAt: string;
}

export function reviewBtdAncestorEdges(input: {
  reviewId?: string;
  childAssetPackId: string;
  edges: BtdAncestorEdgeInput[];
  existingEdges?: BtdAncestorGraphEdge[];
  duplicateSourceRoots?: string[];
  minConfidenceBps?: number;
  citationOnlyPayable?: boolean;
  issuedAt?: string;
}): BtdAncestryReviewReceipt {
  const childAssetPackId = assertNonEmptyString(input.childAssetPackId, 'childAssetPackId');
  const minConfidenceBps = assertBasisPoints(input.minConfidenceBps ?? 2_500, 'minConfidenceBps');
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const reviewId = assertNonEmptyString(
    input.reviewId ?? `btd-ancestry-review:${childAssetPackId}:${issuedAt}`,
    'reviewId',
  );
  const seen = new Set<string>();
  const duplicateSourceRoots = new Set(
    (input.duplicateSourceRoots ?? []).map((root) =>
      assertNonEmptyString(root, 'duplicateSourceRoots'),
    ),
  );
  const graphEdges = (input.existingEdges ?? []).map((edge) => normalizeGraphEdge(edge));
  const reviewedEdges: BtdAncestorEdge[] = [];

  for (const edge of input.edges) {
    const parentAssetPackId = assertNonEmptyString(edge.parentAssetPackId, 'parentAssetPackId');
    const normalizedEdge: BtdAncestorEdgeInput = {
      ...edge,
      parentAssetPackId,
      childAssetPackId: assertNonEmptyString(edge.childAssetPackId, 'edge.childAssetPackId'),
      evidenceRoot: assertNonEmptyString(edge.evidenceRoot, 'evidenceRoot'),
      sourceFingerprintRoot: edge.sourceFingerprintRoot
        ? assertNonEmptyString(edge.sourceFingerprintRoot, 'sourceFingerprintRoot')
        : undefined,
      reviewerReceiptRoot: edge.reviewerReceiptRoot
        ? assertNonEmptyString(edge.reviewerReceiptRoot, 'reviewerReceiptRoot')
        : undefined,
      claimantId: edge.claimantId ? assertNonEmptyString(edge.claimantId, 'claimantId') : undefined,
      reviewerId: edge.reviewerId ? assertNonEmptyString(edge.reviewerId, 'reviewerId') : undefined,
      confidenceBps: assertBasisPoints(edge.confidenceBps, 'confidenceBps'),
      timelessnessBps: assertBasisPoints(edge.timelessnessBps, 'timelessnessBps'),
      depth: assertNonNegativeSafeInteger(edge.depth, 'depth'),
      conflictDisclosure: assertConflictDisclosure(edge.conflictDisclosure).map((item) =>
        assertNonEmptyString(item, 'conflictDisclosure'),
      ),
      createdAfterChildFit: edge.createdAfterChildFit,
    };

    const edgeKey = `${normalizedEdge.parentAssetPackId}->${normalizedEdge.childAssetPackId}:${normalizedEdge.edgeKind}`;
    if (seen.has(edgeKey)) {
      reviewedEdges.push(edgeWithStatus(normalizedEdge, 'rejected', 'duplicate_edge', [
        'duplicate_edge',
      ]));
      continue;
    }
    seen.add(edgeKey);

    if (normalizedEdge.childAssetPackId !== childAssetPackId) {
      reviewedEdges.push(edgeWithStatus(normalizedEdge, 'rejected', 'child_mismatch', [
        'child_mismatch',
      ]));
      continue;
    }

    if (normalizedEdge.parentAssetPackId === normalizedEdge.childAssetPackId) {
      reviewedEdges.push(edgeWithStatus(normalizedEdge, 'rejected', 'self_edge', ['self_edge']));
      continue;
    }

    if (normalizedEdge.createdAfterChildFit !== true) {
      reviewedEdges.push(edgeWithStatus(normalizedEdge, 'rejected', 'not_late_bound', [
        'not_late_bound',
      ]));
      continue;
    }

    if (
      normalizedEdge.sourceFingerprintRoot &&
      duplicateSourceRoots.has(normalizedEdge.sourceFingerprintRoot)
    ) {
      reviewedEdges.push(edgeWithStatus(normalizedEdge, 'rejected', 'duplicate_source', [
        'duplicate_source',
      ]));
      continue;
    }

    if (normalizedEdge.claimantId && normalizedEdge.claimantId === normalizedEdge.reviewerId) {
      reviewedEdges.push(
        edgeWithStatus(normalizedEdge, 'rejected', 'claimant_reviewer_conflict', [
          'claimant_reviewer_conflict',
        ]),
      );
      continue;
    }

    if (hasDirectReciprocalEdge(graphEdges, normalizedEdge)) {
      reviewedEdges.push(edgeWithStatus(normalizedEdge, 'rejected', 'reciprocal_loop', [
        'reciprocal_loop',
      ]));
      continue;
    }

    if (wouldCreateCycle(graphEdges, normalizedEdge)) {
      reviewedEdges.push(edgeWithStatus(normalizedEdge, 'rejected', 'dependency_cycle', [
        'dependency_cycle',
      ]));
      continue;
    }

    if (normalizedEdge.confidenceBps < minConfidenceBps) {
      const reviewed = edgeWithStatus(
        normalizedEdge,
        'recorded_unpaid',
        'confidence_below_threshold',
        ['confidence_below_threshold'],
      );
      reviewedEdges.push(reviewed);
      graphEdges.push(edgeToGraphEdge(reviewed));
      continue;
    }

    if (normalizedEdge.edgeKind === 'citation_only' && input.citationOnlyPayable !== true) {
      const reviewed = edgeWithStatus(normalizedEdge, 'recorded_unpaid', 'citation_only', [
        'citation_only',
      ]);
      reviewedEdges.push(reviewed);
      graphEdges.push(edgeToGraphEdge(reviewed));
      continue;
    }

    if (normalizedEdge.conflictDisclosure.length > 0) {
      const reviewed = edgeWithStatus(normalizedEdge, 'recorded_unpaid', 'conflict_disclosed', [
        'conflict_disclosed',
      ]);
      reviewedEdges.push(reviewed);
      graphEdges.push(edgeToGraphEdge(reviewed));
      continue;
    }

    const reviewed = edgeWithStatus(normalizedEdge, 'payable');
    reviewedEdges.push(reviewed);
    graphEdges.push(edgeToGraphEdge(reviewed));
  }

  return {
    kind: 'btd.ancestry_review',
    reviewId,
    childAssetPackId,
    minConfidenceBps,
    payableEdgeCount: reviewedEdges.filter((edge) => edge.status === 'payable').length,
    recordedUnpaidEdgeCount: reviewedEdges.filter((edge) => edge.status === 'recorded_unpaid')
      .length,
    rejectedEdgeCount: reviewedEdges.filter((edge) => edge.status === 'rejected').length,
    supplyEffect: 'none',
    mintCountDelta: 0,
    edges: reviewedEdges,
    issuedAt,
  };
}

function edgeWithStatus(
  edge: BtdAncestorEdgeInput,
  status: BtdAncestorEdgeStatus,
  rejectionReason?: string,
  riskFlags: BtdAncestorRiskFlag[] = [],
): BtdAncestorEdge {
  return {
    ...edge,
    status,
    rejectionReason,
    riskFlags,
    routeWeight: status === 'payable' ? computeAncestorRouteWeight(edge).toString() : '0',
    supplyEffect: 'none',
    mintCountDelta: 0,
  };
}

export function computeAncestorRouteWeight(edge: {
  confidenceBps: number;
  timelessnessBps: number;
  depth: number;
}): bigint {
  const depth = BigInt(assertNonNegativeSafeInteger(edge.depth, 'depth'));
  const denominator = (1n + depth) * (1n + depth);

  return (
    BigInt(assertBasisPoints(edge.confidenceBps, 'confidenceBps')) *
    BigInt(assertBasisPoints(edge.timelessnessBps, 'timelessnessBps'))
  ) / denominator;
}

function assertBasisPoints(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 0 || value > 10_000) {
    throw new Error(`${label} must be an integer from 0 to 10000.`);
  }

  return value;
}

function assertConflictDisclosure(value: string[], label = 'conflictDisclosure'): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array.`);
  }

  return value;
}

function normalizeGraphEdge(edge: BtdAncestorGraphEdge): BtdAncestorGraphEdge {
  return {
    parentAssetPackId: assertNonEmptyString(edge.parentAssetPackId, 'existing.parentAssetPackId'),
    childAssetPackId: assertNonEmptyString(edge.childAssetPackId, 'existing.childAssetPackId'),
    status: edge.status,
    sourceFingerprintRoot: edge.sourceFingerprintRoot
      ? assertNonEmptyString(edge.sourceFingerprintRoot, 'existing.sourceFingerprintRoot')
      : undefined,
    claimantId: edge.claimantId
      ? assertNonEmptyString(edge.claimantId, 'existing.claimantId')
      : undefined,
    reviewerId: edge.reviewerId
      ? assertNonEmptyString(edge.reviewerId, 'existing.reviewerId')
      : undefined,
  };
}

function edgeToGraphEdge(edge: BtdAncestorEdge): BtdAncestorGraphEdge {
  return {
    parentAssetPackId: edge.parentAssetPackId,
    childAssetPackId: edge.childAssetPackId,
    status: edge.status,
    sourceFingerprintRoot: edge.sourceFingerprintRoot,
    claimantId: edge.claimantId,
    reviewerId: edge.reviewerId,
  };
}

function hasDirectReciprocalEdge(
  graphEdges: BtdAncestorGraphEdge[],
  edge: BtdAncestorEdgeInput,
): boolean {
  return graphEdges.some(
    (known) =>
      known.status !== 'rejected' &&
      known.parentAssetPackId === edge.childAssetPackId &&
      known.childAssetPackId === edge.parentAssetPackId,
  );
}

function wouldCreateCycle(
  graphEdges: BtdAncestorGraphEdge[],
  edge: BtdAncestorEdgeInput,
): boolean {
  const adjacency = new Map<string, string[]>();
  for (const known of graphEdges) {
    if (known.status === 'rejected') continue;
    const children = adjacency.get(known.parentAssetPackId) ?? [];
    children.push(known.childAssetPackId);
    adjacency.set(known.parentAssetPackId, children);
  }

  return canReach(edge.childAssetPackId, edge.parentAssetPackId, adjacency);
}

function canReach(start: string, target: string, adjacency: Map<string, string[]>): boolean {
  const stack = [start];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || visited.has(current)) continue;
    if (current === target) return true;
    visited.add(current);
    stack.push(...(adjacency.get(current) ?? []));
  }

  return false;
}
