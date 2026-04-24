/**
 * @jest-environment node
 */

type BitcodeAppContext = {
  getState(principal?: string): Record<string, any>;
  getNeedReview(input?: Record<string, unknown>): Record<string, any>;
  reviewNeed(input?: Record<string, unknown>): Record<string, any>;
  makeBitcodeBranch(input?: Record<string, unknown>): Promise<Record<string, any>>;
};

type BitcodeProtocolRuntime = {
  buildInitialState(): Record<string, any>;
  publicState(state: Record<string, any>, principal?: string): Record<string, any>;
  measureNeedFromScenario(scenario: Record<string, any>): Record<string, any>;
  reviewNeedForFitSearch(reviewableNeed: Record<string, any>, input?: Record<string, unknown>): Record<string, any>;
  runMakeBitcodeBranch(state: Record<string, any>, input?: Record<string, unknown>): Record<string, any>;
};

async function readRequestBody(request: Request): Promise<Record<string, unknown>> {
  const text = await request.text();
  return text.trim() ? (JSON.parse(text) as Record<string, unknown>) : {};
}

function mapBitcodeError(error: unknown) {
  const resolvedError =
    error instanceof Error ? (error as Error & { statusCode?: number }) : new Error('Unknown error.');
  const message = resolvedError.message || 'Unknown error.';
  const status =
    resolvedError.statusCode || (/fit search cannot proceed/i.test(message) ? 409 : 500);

  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function parseBranchArtifact(latestRun: Record<string, any>, artifactPath: string) {
  const artifact = latestRun.branchArtifacts?.files?.[artifactPath];
  if (typeof artifact !== 'string') {
    throw new Error(`Missing branch artifact ${artifactPath}.`);
  }
  return JSON.parse(artifact) as Record<string, any>;
}

function buildCommercialRouteContext(protocol: BitcodeProtocolRuntime): BitcodeAppContext {
  let state = protocol.buildInitialState();

  const resolveScenario = (input?: Record<string, unknown>) => {
    const scenarioId = String(input?.scenarioId || '').trim();
    const scenario = state.needScenarios.find((entry: Record<string, any>) =>
      String(entry.scenarioId) === (scenarioId || String(state.needScenarios[0]?.scenarioId || '')),
    );
    if (!scenario) throw new Error('Need scenario not found.');
    return scenario;
  };

  const getNeedReview = (input?: Record<string, unknown>) => {
    const scenario = resolveScenario(input);
    const measurement = protocol.measureNeedFromScenario(scenario);
    return {
      ok: true,
      specVersion: 'V26',
      protocolFocus: 'source-to-shares',
      reviewStage: 'post-measurement-pre-fit',
      scenario: {
        scenarioId: scenario.scenarioId,
        scenarioFamily: scenario.scenarioFamily,
        repo: scenario.repo,
        baseRef: scenario.baseRef,
      },
      measurement: {
        needId: measurement.needDescriptor.needId,
        measurementHash: measurement.needDescriptor.measurementHash,
        reviewableNeedRef: measurement.needDescriptor.reviewableNeedRef,
      },
      reviewableNeed: measurement.reviewableNeed,
      allowedActions: measurement.reviewableNeed.allowedActions,
      fitSearchAdmission: measurement.reviewableNeed.fitSearchAdmission,
      nextProtocolAction: 'POST /api/need-review with action=accept|reject|remeasure-with-feedback',
    };
  };

  return {
    getState(principal?: string) {
      return protocol.publicState(state, principal || 'public');
    },
    getNeedReview,
    reviewNeed(input?: Record<string, unknown>) {
      const payload = getNeedReview(input);
      const needReview = protocol.reviewNeedForFitSearch(payload.reviewableNeed, {
        action: input?.needReviewAction || input?.reviewAction || 'accept',
        feedback: input?.needReviewFeedback || input?.reviewFeedback || [],
        actorId: input?.needReviewActorId || input?.actorId || 'bitcode-terminal:need-review',
        decisionMode: input?.needReviewDecisionMode || input?.decisionMode || 'operator-review-api',
      });
      return {
        ...payload,
        needReview,
        reviewDecision: needReview.reviewDecision,
        fitSearchAdmission: needReview.fitSearchAdmission,
        nextProtocolAction: needReview.fitSearchAdmission?.admitted
          ? 'POST /api/make-bitcode-branch'
          : 'GET /api/need-review after revising the Need measurement input',
      };
    },
    async makeBitcodeBranch(input?: Record<string, unknown>) {
      const result = protocol.runMakeBitcodeBranch(state, input);
      state = { ...result.nextState, latestRun: result.latestRun };
      return {
        ok: true,
        specVersion: 'V26',
        latestRun: result.latestRun,
        ledger: state.ledger,
        runHistory: state.runHistory,
      };
    },
  };
}

describe('V26 Need-review SPEC-IMPL parity across protocol and commercial API', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('presents the protocol reviewable Need through the commercial /api/need-review route', async () => {
    const protocol = (await import(
      '@bitcode/protocol-demonstration/src/bitcode-demo.js'
    )) as BitcodeProtocolRuntime;
    const app = buildCommercialRouteContext(protocol);
    const directProtocolPayload = app.getNeedReview({ scenarioId: 'auth-issuer-rollback' });

    jest.doMock('@/lib/bitcode-app-context', () => ({
      getBitcodeAppContext: () => app,
      readBitcodeRequestBody: readRequestBody,
      toBitcodeErrorResponse: mapBitcodeError,
    }));

    const { GET, POST } = await import('@/app/api/need-review/route');

    const getResponse = await GET(
      new Request('http://localhost/api/need-review?scenarioId=auth-issuer-rollback'),
    );
    const routePayload = await getResponse.json();

    expect(getResponse.status).toBe(200);
    expect(routePayload.protocolFocus).toBe('source-to-shares');
    expect(routePayload.reviewableNeed).toMatchObject({
      artifactKind: 'bitcode-reviewable-need',
      protocolFocus: 'source-to-shares',
      reviewStage: 'post-measurement-pre-fit',
      status: 'ready-for-review',
      requiredAfter: 'need-measurement-synthesized',
      requiredBefore: 'find-fitting-settlement',
    });
    expect(routePayload.reviewableNeed.needId).toBe(directProtocolPayload.reviewableNeed.needId);
    expect(routePayload.measurement.measurementHash).toBe(directProtocolPayload.measurement.measurementHash);
    expect(routePayload.fitSearchAdmission.admitted).toBe(false);

    const postResponse = await POST(
      new Request('http://localhost/api/need-review', {
        method: 'POST',
        body: JSON.stringify({
          scenarioId: 'auth-issuer-rollback',
          needReviewAction: 'remeasure-with-feedback',
          needReviewFeedback: ['Clarify rollback ordering before fit search.'],
        }),
      }),
    );
    const reviewPayload = await postResponse.json();

    expect(postResponse.status).toBe(200);
    expect(reviewPayload.reviewDecision.action).toBe('remeasure-with-feedback');
    expect(reviewPayload.fitSearchAdmission.admitted).toBe(false);
    expect(reviewPayload.nextProtocolAction).toContain('/api/need-review');
  });

  it('blocks commercial branch materialization when the protocol Need review rejects fit search', async () => {
    const protocol = (await import(
      '@bitcode/protocol-demonstration/src/bitcode-demo.js'
    )) as BitcodeProtocolRuntime;
    const app = buildCommercialRouteContext(protocol);

    jest.doMock('@/lib/bitcode-app-context', () => ({
      getBitcodeAppContext: () => app,
      readBitcodeRequestBody: readRequestBody,
      toBitcodeErrorResponse: mapBitcodeError,
    }));
    jest.doMock('@/app/application/bitcode-transaction-route-readiness', () => ({
      requireBitcodeSignedTransactionReadiness: jest.fn(async () => undefined),
    }));

    const { POST } = await import('@/app/api/make-bitcode-branch/route');

    const response = await POST(
      new Request('http://localhost/api/make-bitcode-branch', {
        method: 'POST',
        body: JSON.stringify({
          scenarioId: 'auth-issuer-rollback',
          repositoryAnchor: 'frontier/demo-auth',
          needReviewAction: 'reject',
          needReviewFeedback: ['Measured Need is too broad for this settlement review.'],
        }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(409);
    expect(payload.error).toMatch(/fit search cannot proceed/i);
  });

  it('carries accepted source-to-shares settlement artifacts through the commercial branch route', async () => {
    const protocol = (await import(
      '@bitcode/protocol-demonstration/src/bitcode-demo.js'
    )) as BitcodeProtocolRuntime;
    const directProtocolRun = protocol.runMakeBitcodeBranch(protocol.buildInitialState(), {
      scenarioId: 'auth-issuer-rollback',
      needReviewAction: 'accept',
    }).latestRun;
    const app = buildCommercialRouteContext(protocol);

    jest.doMock('@/lib/bitcode-app-context', () => ({
      getBitcodeAppContext: () => app,
      readBitcodeRequestBody: readRequestBody,
      toBitcodeErrorResponse: mapBitcodeError,
    }));
    jest.doMock('@/app/application/bitcode-transaction-route-readiness', () => ({
      requireBitcodeSignedTransactionReadiness: jest.fn(async () => undefined),
    }));

    const { POST } = await import('@/app/api/make-bitcode-branch/route');

    const response = await POST(
      new Request('http://localhost/api/make-bitcode-branch', {
        method: 'POST',
        body: JSON.stringify({
          scenarioId: 'auth-issuer-rollback',
          repositoryAnchor: 'frontier/demo-auth',
          needReviewAction: 'accept',
        }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.latestRun.needReview).toMatchObject({
      protocolFocus: 'source-to-shares',
      reviewStage: 'post-measurement-pre-fit',
      status: 'accepted',
    });

    const routeNeedReview = parseBranchArtifact(payload.latestRun, '.bitcode/need-review.json');
    const routeSourceToShares = parseBranchArtifact(payload.latestRun, '.bitcode/source-to-shares.json');
    const routeSettlementPreview = parseBranchArtifact(payload.latestRun, '.bitcode/settlement-preview.json');
    const routeSettlementProof = parseBranchArtifact(payload.latestRun, '.bitcode/settlement-source-to-shares-proof.json');
    const directSourceToShares = parseBranchArtifact(directProtocolRun, '.bitcode/source-to-shares.json');
    const directSettlementPreview = parseBranchArtifact(directProtocolRun, '.bitcode/settlement-preview.json');

    expect(routeNeedReview).toMatchObject({
      artifactKind: 'bitcode-reviewable-need',
      protocolFocus: 'source-to-shares',
      reviewStage: 'post-measurement-pre-fit',
      status: 'accepted',
    });
    expect(routeSourceToShares.protocolFocus).toBe('source-to-shares');
    expect(routeSourceToShares.quantizedObjectiveContractId).toBe(
      'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
    );
    expect(routeSourceToShares.quantizedFitQualities.fitQualityHash).toBe(
      directSourceToShares.quantizedFitQualities.fitQualityHash,
    );
    expect(routeSettlementPreview.reviewStage).toBe('present-fit-for-settlement-review');
    expect(routeSettlementPreview.quantizedFitQualities.fitQualityHash).toBe(
      directSettlementPreview.quantizedFitQualities.fitQualityHash,
    );
    expect(routeSettlementPreview.sourceToSharesRef).toBe(directSettlementPreview.sourceToSharesRef);
    expect(routeSettlementPreview.sourceToSharesRef).toMatch(/^sha256:/);
    expect(routeSettlementPreview.receipts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          receiptKind: 'issuance',
          quantizedObjectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
          sourceToSharesRef: routeSettlementPreview.sourceToSharesRef,
          quantizedFitQualities: expect.objectContaining({
            fitQualityHash: routeSourceToShares.quantizedFitQualities.fitQualityHash,
          }),
        }),
      ]),
    );
    expect(routeSettlementProof.memberVerdicts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          memberId: 'quantized-fit-quality-receipting',
          passed: true,
        }),
      ]),
    );
  });

  it('rereads accepted Need review and source-to-shares settlement artifacts through the commercial /api/state route', async () => {
    const protocol = (await import(
      '@bitcode/protocol-demonstration/src/bitcode-demo.js'
    )) as BitcodeProtocolRuntime;
    const app = buildCommercialRouteContext(protocol);

    jest.doMock('@/lib/bitcode-app-context', () => ({
      getBitcodeAppContext: () => app,
      readBitcodeRequestBody: readRequestBody,
      toBitcodeErrorResponse: mapBitcodeError,
    }));
    jest.doMock('@/app/application/bitcode-transaction-route-readiness', () => ({
      requireBitcodeSignedTransactionReadiness: jest.fn(async () => undefined),
    }));

    const { POST } = await import('@/app/api/make-bitcode-branch/route');
    const { GET: getState } = await import('@/app/api/state/route');

    const branchResponse = await POST(
      new Request('http://localhost/api/make-bitcode-branch', {
        method: 'POST',
        body: JSON.stringify({
          scenarioId: 'auth-issuer-rollback',
          repositoryAnchor: 'frontier/demo-auth',
          principal: 'buyer',
          needReviewAction: 'accept',
        }),
      }),
    );
    const branchPayload = await branchResponse.json();
    const branchSourceToShares = parseBranchArtifact(branchPayload.latestRun, '.bitcode/source-to-shares.json');
    const branchSettlementPreview = parseBranchArtifact(branchPayload.latestRun, '.bitcode/settlement-preview.json');

    expect(branchResponse.status).toBe(200);

    const stateResponse = await getState(new Request('http://localhost/api/state?principal=buyer'));
    const statePayload = await stateResponse.json();

    expect(stateResponse.status).toBe(200);
    expect(statePayload.projectionPrincipal).toBe('buyer');
    expect(statePayload.latestRun.needReview).toMatchObject({
      protocolFocus: 'source-to-shares',
      reviewStage: 'post-measurement-pre-fit',
      status: 'accepted',
    });
    expect(statePayload.latestRun.sourceToSharesArtifact).toMatchObject({
      protocolFocus: 'source-to-shares',
      quantizedObjectiveContractId: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
    });
    expect(statePayload.latestRun.sourceToSharesArtifact.quantizedFitQualities.fitQualityHash).toBe(
      branchSourceToShares.quantizedFitQualities.fitQualityHash,
    );
    expect(statePayload.latestRun.settlementPreview).toMatchObject({
      reviewStage: 'present-fit-for-settlement-review',
      sourceToSharesRef: branchSettlementPreview.sourceToSharesRef,
    });
    expect(statePayload.latestRun.settlementPreview.quantizedFitQualities.fitQualityHash).toBe(
      branchSourceToShares.quantizedFitQualities.fitQualityHash,
    );
    expect(statePayload.latestRun.branchArtifacts.visibleFileInventory).toEqual(
      expect.arrayContaining([
        '.bitcode/need-review.json',
        '.bitcode/source-to-shares.json',
        '.bitcode/settlement-preview.json',
        '.bitcode/settlement-source-to-shares-proof.json',
      ]),
    );
    expect(statePayload.latestRun.branchArtifacts.files).toBeUndefined();
    expect(statePayload.latestRun.settlementSourceToSharesProof.memberVerdicts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          memberId: 'quantized-fit-quality-receipting',
          passed: true,
        }),
      ]),
    );
  });
});
