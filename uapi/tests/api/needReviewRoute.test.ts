/**
 * @jest-environment node
 */

const mockGetNeedReview = jest.fn((body?: Record<string, unknown>) => ({
  ok: true,
  specVersion: 'V26',
  protocolFocus: 'source-to-shares',
  scenario: { scenarioId: body?.scenarioId ?? 'scenario-1' },
  reviewableNeed: {
    status: 'ready-for-review',
    fitSearchAdmission: { admitted: false },
  },
  needFittingReview: {
    artifactKind: 'bitcode-need-fitting-review',
    requiredBefore: 'find-fitting-settlement',
    settlementReview: {
      reviewStage: 'present-fit-for-settlement-review',
      quantizedObjectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
    },
  },
}));

const mockReviewNeed = jest.fn((body?: Record<string, unknown>) => ({
  ok: true,
  specVersion: 'V26',
  protocolFocus: 'source-to-shares',
  needReview: {
    status: body?.needReviewAction === 'accept' ? 'accepted' : 'remeasure-requested',
    fitSearchAdmission: { admitted: body?.needReviewAction === 'accept' },
  },
  fitSearchAdmission: { admitted: body?.needReviewAction === 'accept' },
  reviewDecision: {
    action: body?.needReviewAction ?? 'accept',
  },
  needFittingReview: {
    artifactKind: 'bitcode-need-fitting-review',
    status: body?.needReviewAction === 'accept' ? 'accepted' : 'remeasure-requested',
    action: body?.needReviewAction ?? 'accept',
    requiredBefore: 'find-fitting-settlement',
    settlementReview: {
      reviewStage: 'present-fit-for-settlement-review',
      quantizedObjectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
    },
  },
}));

jest.mock('@/lib/bitcode-app-context', () => {
  return {
    getBitcodeAppContext: () => ({
      getNeedReview: mockGetNeedReview,
      reviewNeed: mockReviewNeed,
    }),
    readBitcodeRequestBody: async (request: Request) => {
      const text = await request.text();
      return text.trim() ? (JSON.parse(text) as Record<string, unknown>) : {};
    },
    toBitcodeErrorResponse: (error: unknown) => {
      const resolvedError = error instanceof Error ? (error as Error & { statusCode?: number }) : new Error('Unknown error.');
      return new Response(
        JSON.stringify({ error: resolvedError.message || 'Unknown error.' }),
        {
          status: resolvedError.statusCode || 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    },
  };
});

import { GET, POST } from '@/app/api/need-review/route';

describe('/api/need-review', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('presents a reviewable Need before fit search', async () => {
    const response = await GET(
      new Request('http://localhost/api/need-review?scenarioId=scenario-auth'),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(mockGetNeedReview).toHaveBeenCalledWith({ scenarioId: 'scenario-auth' });
    expect(payload.protocolFocus).toBe('source-to-shares');
    expect(payload.reviewableNeed.fitSearchAdmission.admitted).toBe(false);
    expect(payload.needFittingReview).toMatchObject({
      artifactKind: 'bitcode-need-fitting-review',
      requiredBefore: 'find-fitting-settlement',
      settlementReview: {
        reviewStage: 'present-fit-for-settlement-review',
        quantizedObjectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
      },
    });
  });

  it('records explicit operator review decisions before fit search admission', async () => {
    const response = await POST(
      new Request('http://localhost/api/need-review', {
        method: 'POST',
        body: JSON.stringify({
          scenarioId: 'scenario-auth',
          needReviewAction: 'accept',
          needReviewFeedback: ['Need is precise enough for source-to-shares fitting.'],
        }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(mockReviewNeed).toHaveBeenCalledWith(
      expect.objectContaining({
        scenarioId: 'scenario-auth',
        needReviewAction: 'accept',
      }),
    );
    expect(payload.fitSearchAdmission.admitted).toBe(true);
    expect(payload.reviewDecision.action).toBe('accept');
    expect(payload.needFittingReview).toMatchObject({
      artifactKind: 'bitcode-need-fitting-review',
      status: 'accepted',
      action: 'accept',
    });
  });
});
