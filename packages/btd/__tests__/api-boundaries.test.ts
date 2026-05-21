import {
  buildBtdMintDraft,
  buildBtdReadAccessDecision,
  buildBtdRegistrySnapshot,
  createBtdMeasureMintState,
  parseBtdOptionalBigInt,
  parseBtdRequiredBigInt,
  toBtdJsonSafe,
} from '../src';

const issuedAt = '2026-05-06T00:00:00.000Z';

describe('BTD API boundaries', () => {
  it('builds package-owned mint drafts for route callers', () => {
    const draft = buildBtdMintDraft({
      assetPackId: 'asset-pack-boundary-1',
      readId: 'read-boundary-1',
      acceptedNeed: true,
      acceptedFit: true,
      sourceManifestRoot: 'source-root-boundary',
      fitReceiptRoot: 'fit-root-boundary',
      proofRoot: 'proof-root-boundary',
      dedupeReceiptRoot: 'dedupe-root-boundary',
      settlementJournalRoot: 'settlement-root-boundary',
      exchangeReceiptRoot: 'exchange-root-boundary',
      accessPolicyId: 'policy-boundary-1',
      accessPolicyHash: 'policy-boundary-hash',
      semanticUnits: [
        {
          unitId: 'unit-boundary-1',
          proofReceiptRoot: 'proof-boundary-1',
          dedupeReceiptRoot: 'dedupe-boundary-1',
          fitAccepted: true,
          normalizedUnits: 10_000n,
        },
      ],
      measureMintState: createBtdMeasureMintState({ curveParameter: 10_000n }),
      exchangeSequence: 1n,
      actorId: 'actor-boundary-1',
      issuedAt,
    });

    expect(draft.kind).toBe('btd_mint_draft');
    expect(draft.measureMint.tokenCount).toBe(10_500_000);
    expect(draft.terminalJournalEntry.transactionKind).toBe('asset_pack_mint');
    expect(draft.terminalJournalEntry.actorId).toBe('actor-boundary-1');
  });

  it('keeps route BigInt parsing and JSON-safe serialization in the package', () => {
    expect(parseBtdRequiredBigInt('42', 'exchangeSequence')).toBe(42n);
    expect(parseBtdRequiredBigInt(42, 'exchangeSequence')).toBe(42n);
    expect(parseBtdOptionalBigInt(null, 'exchangeSequence')).toBeUndefined();
    expect(() => parseBtdRequiredBigInt(1.25, 'exchangeSequence')).toThrow(
      'exchangeSequence must be a safe integer when supplied as a number.',
    );

    expect(toBtdJsonSafe({ count: 42n, nested: [{ value: 7n }] })).toEqual({
      count: '42',
      nested: [{ value: '7' }],
    });
  });

  it('builds registry snapshots without API route policy derivation', async () => {
    const snapshot = await buildBtdRegistrySnapshot({
      assetPackId: 'asset-pack-boundary-1',
      registry: {
        getSupplyState: async () => ({ total_minted: '10' }),
        listAssetPackRanges: async (assetPackId?: string) => [
          { asset_pack_id: assetPackId, range_start: 0, range_end_exclusive: 10 },
        ],
      },
    });

    expect(snapshot.kind).toBe('btd_registry_snapshot');
    expect(snapshot.activeCanonicalPointer).toBe('V29');
    expect(snapshot.draftTargetVersion).toBe('V30');
    expect(snapshot.routePosture).toMatchObject({
      canonicalUnit: 'asset_pack_range',
      feeAsset: 'BTC',
      btdSpendableAsFee: false,
    });
    expect(snapshot.ranges).toEqual([
      {
        asset_pack_id: 'asset-pack-boundary-1',
        range_start: 0,
        range_end_exclusive: 10,
      },
    ]);
  });

  it('returns package-owned read-access decisions for API route callers', () => {
    const decision = buildBtdReadAccessDecision({
      actorId: 'actor-boundary-1',
      walletId: 'wallet-boundary-reader',
      assetPackId: 'asset-pack-boundary-1',
      accessPolicy: {
        accessPolicyId: 'policy-boundary-1',
        accessPolicyHash: 'policy-boundary-hash',
        ownerRead: true,
        licensedRead: true,
        derivativeUse: false,
        redistributionAllowed: false,
        confidentiality: 'public_proof_private_source',
      },
      licenses: [
        {
          licenseId: 'license-boundary-1',
          walletId: 'wallet-boundary-reader',
          assetPackId: 'asset-pack-boundary-1',
          accessPolicyHash: 'policy-boundary-hash',
          validFrom: '2026-05-01T00:00:00.000Z',
          expiresAt: '2026-05-07T00:00:00.000Z',
        },
      ],
      at: issuedAt,
    });

    expect(decision.kind).toBe('btd_read_access_decision');
    expect(decision.decision.decision).toBe('licensed_read');
    expect(decision.policyDisclosure.accessPolicyHash).toBe('policy-boundary-hash');
  });
});
