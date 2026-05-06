jest.mock(
  '@bitcode/supabase/ssr/server',
  () => ({
    createClient: async () => ({
      auth: {
        getUser: async () => ({
          data: { user: { id: 'mock-user' } },
          error: null,
        }),
      },
    }),
  }),
  { virtual: true },
);

import {
  buildBtdMintDraft,
  buildBtdReadAccessDecision,
  buildGetBtdRegistrySnapshotRoute,
  buildPostBtdMintDraftRoute,
  buildPostBtdReadAccessRoute,
} from '../btd-crypto';
import { createBtdMeasureMintState } from '@bitcode/btd';

const issuedAt = '2026-05-06T00:00:00.000Z';

function mintDraftInput() {
  return {
    assetPackId: 'asset-pack-api-1',
    needId: 'need-api-1',
    acceptedNeed: true as const,
    acceptedFit: true as const,
    sourceManifestRoot: 'source-root',
    fitReceiptRoot: 'fit-root',
    proofRoot: 'proof-root',
    dedupeReceiptRoot: 'dedupe-root',
    settlementJournalRoot: 'settlement-root',
    exchangeReceiptRoot: 'exchange-root',
    accessPolicyId: 'policy-1',
    accessPolicyHash: 'policy-hash',
    exchangeSequence: 1n,
    issuedAt,
    measureMintState: createBtdMeasureMintState({ curveParameter: 10_000n }),
    semanticUnits: [
      {
        unitId: 'unit-a',
        proofReceiptRoot: 'proof-a',
        dedupeReceiptRoot: 'dedupe-a',
        fitAccepted: true,
        normalizedUnits: 10_000n,
      },
    ],
    contributors: [
      {
        contributorId: 'contributor-a',
        walletId: 'wallet-a',
        normalizedContributionVolume: 10_000n,
        fitBps: 10_000,
        qualityBps: 10_000,
        provenanceBps: 10_000,
        noveltyBps: 10_000,
        antiNoiseBps: 10_000,
      },
    ],
  };
}

function mintDraftRequestBody(overrides: Record<string, unknown> = {}) {
  const input = mintDraftInput();

  return {
    ...input,
    exchangeSequence: '1',
    measureMintState: {
      ...input.measureMintState,
      cumulativeAdmittedMeasurement: '0',
      residualMintCredit: '0',
      curveParameter: '10000',
    },
    semanticUnits: input.semanticUnits.map((unit) => ({
      ...unit,
      normalizedUnits: unit.normalizedUnits.toString(),
    })),
    contributors: input.contributors.map((contributor) => ({
      ...contributor,
      normalizedContributionVolume: contributor.normalizedContributionVolume.toString(),
    })),
    ...overrides,
  };
}

describe('BTD crypto API builders', () => {
  it('builds a deterministic mint draft from accepted Need-Fit semantic units', () => {
    const draft = buildBtdMintDraft(mintDraftInput());

    expect(draft.kind).toBe('btd_mint_draft');
    expect(draft.zeroCell).toBe(false);
    expect(draft.measureMint.tokenCount).toBe(10_500_000);
    expect(draft.rangeAllocation?.range.rangeStart).toBe(0);
    expect(draft.rangeAllocation?.previousSupply.curveParameter).toBe(10_000n);
    expect(draft.mintReceipt?.totalMintedAfter).toBe(10_500_000);
    expect(draft.contributorAllocation?.allocations).toHaveLength(1);
    expect(draft.terminalJournalEntry.transactionKind).toBe('asset_pack_mint');
    expect(draft.terminalJournalEntry.exchangeSequence).toBe(1n);
    expect(draft.terminalJournalEntry.receiptRoots).toContain(draft.measurement.measurementId);
    expect(draft.terminalJournalEntry.receiptRoots.length).toBeGreaterThanOrEqual(3);
  });

  it('returns authenticated registry snapshots from the route boundary', async () => {
    const route = buildGetBtdRegistrySnapshotRoute({
      resolveAuthenticatedUser: async () => ({ userId: 'user-1' }),
      registry: {
        getSupplyState: async () => ({ total_minted: 1, max_supply: 21_000_000 }),
        listAssetPackRanges: async (assetPackId?: string) => [{ asset_pack_id: assetPackId }],
      } as any,
    });

    const response = await route(
      new Request('https://bitcode.test/api/btd/registry?assetPackId=asset-pack-api-1'),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.kind).toBe('btd_registry_snapshot');
    expect(body.ranges).toEqual([{ asset_pack_id: 'asset-pack-api-1' }]);
    expect(body.routePosture.feeAsset).toBe('BTC');
  });

  it('returns JSON-safe mint drafts from the route boundary', async () => {
    const route = buildPostBtdMintDraftRoute({
      resolveAuthenticatedUser: async () => ({ userId: 'user-1' }),
    });
    const response = await route(
      new Request('https://bitcode.test/api/btd/mint-draft', {
        method: 'POST',
        body: JSON.stringify(mintDraftRequestBody()),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.measureMint.tokenCount).toBe(10_500_000);
    expect(body.measureMint.normalizedBitcodeVolume).toBe('10000');
    expect(body.terminalJournalEntry.exchangeSequence).toBe('1');
  });

  it('fails mint drafts closed when Need admission is absent', async () => {
    const route = buildPostBtdMintDraftRoute({
      resolveAuthenticatedUser: async () => ({ userId: 'user-1' }),
    });
    const response = await route(
      new Request('https://bitcode.test/api/btd/mint-draft', {
        method: 'POST',
        body: JSON.stringify(mintDraftRequestBody({ acceptedNeed: false })),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('V27 BTD mint draft requires accepted Need.');
  });

  it('fails mint drafts closed when Fit admission is absent', async () => {
    const route = buildPostBtdMintDraftRoute({
      resolveAuthenticatedUser: async () => ({ userId: 'user-1' }),
    });
    const response = await route(
      new Request('https://bitcode.test/api/btd/mint-draft', {
        method: 'POST',
        body: JSON.stringify(mintDraftRequestBody({ acceptedFit: false })),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('V27 BTD mint draft requires accepted Fit.');
  });

  it('fails mint drafts closed when uncommitted proof inputs are missing', async () => {
    const route = buildPostBtdMintDraftRoute({
      resolveAuthenticatedUser: async () => ({ userId: 'user-1' }),
    });
    const response = await route(
      new Request('https://bitcode.test/api/btd/mint-draft', {
        method: 'POST',
        body: JSON.stringify(mintDraftRequestBody({ proofRoot: '' })),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('proofRoot must be a non-empty string.');
  });

  it('fails mint drafts closed without a positive Exchange sequence', async () => {
    const route = buildPostBtdMintDraftRoute({
      resolveAuthenticatedUser: async () => ({ userId: 'user-1' }),
    });
    const response = await route(
      new Request('https://bitcode.test/api/btd/mint-draft', {
        method: 'POST',
        body: JSON.stringify(mintDraftRequestBody({ exchangeSequence: '0' })),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('V27 BTD mint draft requires a positive Exchange sequence.');
  });

  it('builds read-access decisions without merging owner-read and licensed-read rights', () => {
    const policy = {
      accessPolicyId: 'policy-api-1',
      accessPolicyHash: 'policy-api-hash',
      ownerRead: true,
      licensedRead: true,
      derivativeUse: false,
      redistributionAllowed: false,
      confidentiality: 'public_proof_private_source' as const,
    };

    const owner = buildBtdReadAccessDecision({
      actorId: 'user-1',
      walletId: 'wallet-owner',
      assetPackId: 'asset-pack-api-1',
      accessPolicy: policy,
      ownershipClaims: [
        {
          walletId: 'wallet-owner',
          assetPackId: 'asset-pack-api-1',
          rangeStart: 0,
          rangeEndExclusive: 10,
          accessPolicyHash: 'policy-api-hash',
        },
      ],
      at: issuedAt,
    });
    const licensed = buildBtdReadAccessDecision({
      actorId: 'user-1',
      walletId: 'wallet-reader',
      assetPackId: 'asset-pack-api-1',
      accessPolicy: policy,
      licenses: [
        {
          licenseId: 'license-api-1',
          walletId: 'wallet-reader',
          assetPackId: 'asset-pack-api-1',
          accessPolicyHash: 'policy-api-hash',
          validFrom: '2026-05-01T00:00:00.000Z',
          expiresAt: '2026-05-07T00:00:00.000Z',
        },
      ],
      at: issuedAt,
    });

    expect(owner.decision.decision).toBe('owner_read');
    expect(licensed.decision.decision).toBe('licensed_read');
    expect(owner.policyDisclosure.accessPolicyHash).toBe('policy-api-hash');
  });

  it('returns JSON-safe read-access decisions from the route boundary', async () => {
    const route = buildPostBtdReadAccessRoute({
      resolveAuthenticatedUser: async () => ({ userId: 'user-1' }),
    });
    const response = await route(
      new Request('https://bitcode.test/api/btd/read-access', {
        method: 'POST',
        body: JSON.stringify({
          walletId: 'wallet-reader',
          assetPackId: 'asset-pack-api-1',
          accessPolicy: {
            accessPolicyId: 'policy-api-1',
            accessPolicyHash: 'policy-api-hash',
            ownerRead: true,
            licensedRead: true,
            derivativeUse: false,
            redistributionAllowed: false,
            confidentiality: 'public_proof_private_source',
          },
          licenses: [
            {
              licenseId: 'license-api-1',
              walletId: 'wallet-reader',
              assetPackId: 'asset-pack-api-1',
              accessPolicyHash: 'policy-api-hash',
              validFrom: '2026-05-01T00:00:00.000Z',
              expiresAt: '2026-05-07T00:00:00.000Z',
            },
          ],
          at: issuedAt,
        }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.kind).toBe('btd_read_access_decision');
    expect(body.decision.decision).toBe('licensed_read');
    expect(body.policyDisclosure.accessPolicyId).toBe('policy-api-1');
  });

  it('keeps expired license and policy mismatch failures explicit at the route boundary', async () => {
    const route = buildPostBtdReadAccessRoute({
      resolveAuthenticatedUser: async () => ({ userId: 'user-1' }),
    });
    const expiredResponse = await route(
      new Request('https://bitcode.test/api/btd/read-access', {
        method: 'POST',
        body: JSON.stringify({
          walletId: 'wallet-reader',
          assetPackId: 'asset-pack-api-1',
          accessPolicy: {
            accessPolicyId: 'policy-api-1',
            accessPolicyHash: 'policy-api-hash',
            ownerRead: true,
            licensedRead: true,
            derivativeUse: false,
            redistributionAllowed: false,
            confidentiality: 'public_proof_private_source',
          },
          licenses: [
            {
              licenseId: 'license-expired',
              walletId: 'wallet-reader',
              assetPackId: 'asset-pack-api-1',
              accessPolicyHash: 'policy-api-hash',
              validFrom: '2026-05-01T00:00:00.000Z',
              expiresAt: '2026-05-05T00:00:00.000Z',
            },
          ],
          at: issuedAt,
        }),
      }),
    );
    const mismatchResponse = await route(
      new Request('https://bitcode.test/api/btd/read-access', {
        method: 'POST',
        body: JSON.stringify({
          walletId: 'wallet-owner',
          assetPackId: 'asset-pack-api-1',
          accessPolicy: {
            accessPolicyId: 'policy-api-1',
            accessPolicyHash: 'policy-api-hash',
            ownerRead: true,
            licensedRead: true,
            derivativeUse: false,
            redistributionAllowed: false,
            confidentiality: 'public_proof_private_source',
          },
          ownershipClaims: [
            {
              walletId: 'wallet-owner',
              assetPackId: 'asset-pack-api-1',
              rangeStart: 0,
              rangeEndExclusive: 10,
              accessPolicyHash: 'stale-policy-hash',
            },
          ],
          at: issuedAt,
        }),
      }),
    );

    expect((await expiredResponse.json()).decision.reason).toBe('license_expired');
    expect((await mismatchResponse.json()).decision.reason).toBe('policy_mismatch');
  });
});
