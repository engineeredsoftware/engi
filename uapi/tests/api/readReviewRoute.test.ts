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

  it('synthesizes a reviewable Read-Need before Need-Fit search', async () => {
    const response = await POST(
      new Request('http://localhost/api/read-review', {
        method: 'POST',
        body: JSON.stringify({
          action: 'synthesize_read_need',
          readId: 'read-activity',
          readPrompt: 'Find a source-bound Terminal AssetPack fit.',
          sourceRevision: {
            repositoryFullName: 'engineeredsoftware/ENGI',
            branch: 'main',
            commit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
          },
          targetArtifactKinds: ['asset-pack-evidence', 'proof-root'],
          closureCriteria: ['Candidate must be source-bound.'],
        }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(mockReviewNeed).not.toHaveBeenCalled();
    expect(payload.stage).toBe('read_need_review');
    expect(payload.readNeed).toMatchObject({
      schema: 'bitcode.read.need',
      reviewState: 'needs_acceptance',
      read: {
        id: 'read-activity',
        prompt: 'Find a source-bound Terminal AssetPack fit.',
        repositoryFullName: 'engineeredsoftware/ENGI',
        sourceBranch: 'main',
        sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      },
      sourceConstraints: {
        protectedSourceDisclosure: 'forbidden_before_settlement',
      },
    });
    expect(payload.telemetry).toMatchObject({
      schema: 'bitcode.read-need.synthesis-telemetry',
      measurementRoot: payload.readNeed.measurementRoot,
      reviewState: 'needs_acceptance',
    });
  });

  it('accepts a synthesized Read-Need as the only Need-Fit input', async () => {
    const synthesisResponse = await POST(
      new Request('http://localhost/api/read-review', {
        method: 'POST',
        body: JSON.stringify({
          action: 'synthesize_read_need',
          readPrompt: 'Find a source-bound Terminal AssetPack fit.',
          sourceRevision: {
            repositoryFullName: 'engineeredsoftware/ENGI',
            branch: 'main',
            commit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
          },
        }),
      }),
    );
    const synthesis = await synthesisResponse.json();
    const acceptResponse = await POST(
      new Request('http://localhost/api/read-review', {
        method: 'POST',
        body: JSON.stringify({
          action: 'accept_read_need',
          readNeed: synthesis.readNeed,
        }),
      }),
    );
    const payload = await acceptResponse.json();

    expect(acceptResponse.status).toBe(200);
    expect(payload.stage).toBe('need_fit_ready');
    expect(payload.acceptedReadNeed).toMatchObject({
      schema: 'bitcode.read.need',
      reviewState: 'accepted',
      needId: synthesis.readNeed.needId,
      measurementRoot: synthesis.readNeed.measurementRoot,
    });
    expect(payload.fitSearchAdmission).toMatchObject({
      admitted: true,
      blockers: [],
    });
    expect(payload.telemetry).toMatchObject({
      schema: 'bitcode.read-need.acceptance-telemetry',
      needId: synthesis.readNeed.needId,
      nextStage: 'need_fit_search',
    });
  });
});
