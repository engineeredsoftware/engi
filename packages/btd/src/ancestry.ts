import { assertNonEmptyString, assertNonNegativeSafeInteger } from './constants';

export type BtdAncestorEdgeKind =
  | 'implementation_dependency'
  | 'proof_dependency'
  | 'source_reuse'
  | 'conceptual_dependency'
  | 'teaching_dependency'
  | 'citation_only';

export type BtdAncestorEdgeStatus = 'payable' | 'recorded_unpaid' | 'rejected';

export interface BtdAncestorEdgeInput {
  parentAssetPackId: string;
  childAssetPackId: string;
  edgeKind: BtdAncestorEdgeKind;
  evidenceRoot: string;
  reviewerReceiptRoot?: string;
  confidenceBps: number;
  timelessnessBps: number;
  depth: number;
  createdAfterChildFit: boolean;
  conflictDisclosure: string[];
}

export interface BtdAncestorEdge extends BtdAncestorEdgeInput {
  status: BtdAncestorEdgeStatus;
  rejectionReason?: string;
  routeWeight: string;
}

export interface BtdAncestryReviewReceipt {
  kind: 'btd.ancestry_review';
  childAssetPackId: string;
  minConfidenceBps: number;
  edges: BtdAncestorEdge[];
  issuedAt: string;
}

export function reviewBtdAncestorEdges(input: {
  childAssetPackId: string;
  edges: BtdAncestorEdgeInput[];
  minConfidenceBps?: number;
  citationOnlyPayable?: boolean;
  issuedAt?: string;
}): BtdAncestryReviewReceipt {
  const childAssetPackId = assertNonEmptyString(input.childAssetPackId, 'childAssetPackId');
  const minConfidenceBps = assertBasisPoints(input.minConfidenceBps ?? 2_500, 'minConfidenceBps');
  const seen = new Set<string>();

  const edges = input.edges.map((edge) => {
    const parentAssetPackId = assertNonEmptyString(edge.parentAssetPackId, 'parentAssetPackId');
    const normalizedEdge: BtdAncestorEdgeInput = {
      ...edge,
      parentAssetPackId,
      childAssetPackId: assertNonEmptyString(edge.childAssetPackId, 'edge.childAssetPackId'),
      evidenceRoot: assertNonEmptyString(edge.evidenceRoot, 'evidenceRoot'),
      confidenceBps: assertBasisPoints(edge.confidenceBps, 'confidenceBps'),
      timelessnessBps: assertBasisPoints(edge.timelessnessBps, 'timelessnessBps'),
      depth: assertNonNegativeSafeInteger(edge.depth, 'depth'),
      conflictDisclosure: edge.conflictDisclosure.map((item) =>
        assertNonEmptyString(item, 'conflictDisclosure'),
      ),
      createdAfterChildFit: edge.createdAfterChildFit,
    };

    const edgeKey = `${normalizedEdge.parentAssetPackId}->${normalizedEdge.childAssetPackId}:${normalizedEdge.edgeKind}`;
    if (seen.has(edgeKey)) {
      return edgeWithStatus(normalizedEdge, 'rejected', 'duplicate_edge');
    }
    seen.add(edgeKey);

    if (normalizedEdge.childAssetPackId !== childAssetPackId) {
      return edgeWithStatus(normalizedEdge, 'rejected', 'child_mismatch');
    }

    if (normalizedEdge.parentAssetPackId === normalizedEdge.childAssetPackId) {
      return edgeWithStatus(normalizedEdge, 'rejected', 'self_edge');
    }

    if (normalizedEdge.createdAfterChildFit !== true) {
      return edgeWithStatus(normalizedEdge, 'rejected', 'not_late_bound');
    }

    if (normalizedEdge.confidenceBps < minConfidenceBps) {
      return edgeWithStatus(normalizedEdge, 'recorded_unpaid', 'confidence_below_threshold');
    }

    if (normalizedEdge.edgeKind === 'citation_only' && input.citationOnlyPayable !== true) {
      return edgeWithStatus(normalizedEdge, 'recorded_unpaid', 'citation_only');
    }

    return edgeWithStatus(normalizedEdge, 'payable');
  });

  return {
    kind: 'btd.ancestry_review',
    childAssetPackId,
    minConfidenceBps,
    edges,
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}

function edgeWithStatus(
  edge: BtdAncestorEdgeInput,
  status: BtdAncestorEdgeStatus,
  rejectionReason?: string,
): BtdAncestorEdge {
  return {
    ...edge,
    status,
    rejectionReason,
    routeWeight: status === 'payable' ? computeAncestorRouteWeight(edge).toString() : '0',
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
