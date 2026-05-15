/**
 * @jest-environment node
 */

const mockGetReadReview = jest.fn((body?: Record<string, unknown>) => ({
  ok: true,
  specVersion: 'V26',
  protocolFocus: 'source-to-shares',
  scenario: { scenarioId: body?.scenarioId ?? 'scenario-1' },
  reviewableRead: {
    status: 'ready-for-review',
    fitSearchAdmission: { admitted: false },
  },
  readFittingReview: {
    artifactKind: 'bitcode-read-fitting-review',
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
  readReview: {
    status: body?.readReviewAction === 'accept' ? 'accepted' : 'remeasure-requested',
    fitSearchAdmission: { admitted: body?.readReviewAction === 'accept' },
  },
  fitSearchAdmission: { admitted: body?.readReviewAction === 'accept' },
  reviewDecision: {
    action: body?.readReviewAction ?? 'accept',
  },
  readFittingReview: {
    artifactKind: 'bitcode-read-fitting-review',
    status: body?.readReviewAction === 'accept' ? 'accepted' : 'remeasure-requested',
    action: body?.readReviewAction ?? 'accept',
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
      getReadReview: mockGetReadReview,
      reviewRead: mockReviewNeed,
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

import { GET, POST } from '@/app/api/read-review/route';

describe('/api/read-review', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('presents a reviewable Read before fit search', async () => {
    const response = await GET(
      new Request('http://localhost/api/read-review?scenarioId=scenario-auth'),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(mockGetReadReview).toHaveBeenCalledWith({ scenarioId: 'scenario-auth' });
    expect(payload.protocolFocus).toBe('source-to-shares');
    expect(payload.reviewableRead.fitSearchAdmission.admitted).toBe(false);
    expect(payload.readFittingReview).toMatchObject({
      artifactKind: 'bitcode-read-fitting-review',
      requiredBefore: 'find-fitting-settlement',
      settlementReview: {
        reviewStage: 'present-fit-for-settlement-review',
        quantizedObjectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
      },
    });
  });

  it('records explicit operator review decisions before fit search admission', async () => {
    const response = await POST(
      new Request('http://localhost/api/read-review', {
        method: 'POST',
        body: JSON.stringify({
          scenarioId: 'scenario-auth',
          readReviewAction: 'accept',
          readReviewFeedback: ['Read is precise enough for source-to-shares fitting.'],
        }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(mockReviewNeed).toHaveBeenCalledWith(
      expect.objectContaining({
        scenarioId: 'scenario-auth',
        readReviewAction: 'accept',
      }),
    );
    expect(payload.fitSearchAdmission.admitted).toBe(true);
    expect(payload.reviewDecision.action).toBe('accept');
    expect(payload.readFittingReview).toMatchObject({
      artifactKind: 'bitcode-read-fitting-review',
      status: 'accepted',
      action: 'accept',
    });
  });
});
