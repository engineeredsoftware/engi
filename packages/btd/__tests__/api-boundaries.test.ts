import {
  buildBtdAssetPackExchangeSettlement,
  buildBtdMintDraft,
  buildBtdReadAccessDecision,
  buildBtdReadReceiptBoundarySettlement,
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
      depositorWalletId: 'wallet-depositor-boundary',
      sourceSafePreviewRoot: 'source-safe-preview-root-boundary',
      findingFitsResultRoot: 'finding-fits-root-boundary',
      settlementConservationRoot: 'settlement-conservation-root-boundary',
      ledgerProjectionRoot: 'ledger-projection-root-boundary',
    });

    expect(draft.kind).toBe('btd_mint_draft');
    expect(draft.measureMint.tokenCount).toBe(10_500_000);
    expect(draft.assetPackMintReceipt).toMatchObject({
      kind: 'btd.asset_pack_mint_receipt',
      depositorWalletId: 'wallet-depositor-boundary',
      sourceSafePreviewRoot: 'source-safe-preview-root-boundary',
      findingFitsResultRoot: 'finding-fits-root-boundary',
      ledgerProjectionRoot: 'ledger-projection-root-boundary',
      protectedSourceVisible: false,
    });
    expect(draft.terminalJournalEntry.receiptRoots).toContain(
      draft.assetPackMintReceipt?.receiptRoot,
    );
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

  it('binds source-safe read receipts and paid rights-transfer receipts at package boundaries', () => {
    const preview = buildBtdReadReceiptBoundarySettlement({
      actorId: 'actor-boundary-1',
      assetPackId: 'asset-pack-boundary-1',
      readId: 'read-boundary-1',
      readRequestId: 'read-request-boundary-1',
      acceptedNeedRoot: 'accepted-need-root-boundary',
      findingFitsResultRoot: 'finding-fits-root-boundary',
      readerWalletId: 'wallet-reader-boundary',
      depositorWalletId: 'wallet-depositor-boundary',
      rangeStart: 0,
      rangeEndExclusive: 10,
      sourceManifestRoot: 'source-root-boundary',
      sourceSafePreviewRoot: 'source-safe-preview-root-boundary',
      accessPolicyHash: 'policy-boundary-hash',
      disclosureState: 'source_safe_preview',
      readRightState: 'none',
      deliveryAdmissionState: 'blocked',
      ledgerProjectionRoot: 'ledger-projection-root-boundary',
      exchangeSequence: 4n,
      issuedAt,
    });

    expect(preview.readReceipt).toMatchObject({
      kind: 'btd.read_receipt',
      disclosureState: 'source_safe_preview',
      deliveryAdmissionState: 'blocked',
      protectedSourceVisible: false,
      paidUnlockRoot: null,
    });
    expect(preview.terminalJournalEntry.transactionKind).toBe('read_submission');
    expect(preview.terminalJournalEntry.receiptRoots).toContain(preview.readReceipt.receiptRoot);

    expect(() =>
      buildBtdReadReceiptBoundarySettlement({
        ...preview.readReceipt,
        actorId: 'actor-boundary-1',
        exchangeSequence: 5n,
        protectedSourceVisible: true,
      }),
    ).toThrow('Protected source cannot be visible before paid unlock.');

    const created = buildBtdAssetPackExchangeSettlement({
      action: 'create_order',
      orderId: 'order-boundary-1',
      orderKind: 'sell',
      assetPackId: 'asset-pack-boundary-1',
      rangeStart: 0,
      rangeEndExclusive: 10,
      makerWalletId: 'wallet-depositor-boundary',
      priceSats: '1200',
      accessPolicyHash: 'policy-boundary-hash',
      createdAtExchangeSequence: 6n,
      actorId: 'actor-boundary-1',
      issuedAt,
    });
    const accepted = buildBtdAssetPackExchangeSettlement({
      action: 'accept_order',
      previousOrder: created.order,
      takerWalletId: 'wallet-reader-boundary',
      actorId: 'actor-boundary-1',
      issuedAt,
    });
    const settled = buildBtdAssetPackExchangeSettlement({
      action: 'settle_order',
      previousOrder: accepted.order,
      settledAtExchangeSequence: 7n,
      ledgerAnchorId: 'ledger-anchor-boundary-1',
      actorId: 'actor-boundary-1',
      issuedAt,
    });
    const transferred = buildBtdAssetPackExchangeSettlement({
      action: 'transfer_rights',
      previousOrder: settled.order,
      receiptId: 'legacy-transfer-boundary-1',
      fromWalletId: 'wallet-depositor-boundary',
      toWalletId: 'wallet-reader-boundary',
      btcFeeReceiptId: 'btc-fee-boundary-1',
      btcFeeFinalityState: 'confirmed',
      readLicenseId: 'read-license-boundary-1',
      sourceSafePreviewRoot: 'source-safe-preview-root-boundary',
      paidUnlockRoot: 'paid-unlock-root-boundary',
      deliveryAdmissionRoot: 'delivery-admission-root-boundary',
      ledgerProjectionRoot: 'ledger-projection-root-boundary',
      actorId: 'actor-boundary-1',
      issuedAt,
    });

    expect(transferred.btdRightsTransferReceipt).toMatchObject({
      kind: 'btd.rights_transfer_receipt',
      readerWalletId: 'wallet-reader-boundary',
      depositorWalletId: 'wallet-depositor-boundary',
      btcFeeFinalityState: 'confirmed',
      deliveryAdmissionState: 'admitted',
      protectedSourceVisible: true,
    });
    expect(transferred.terminalJournalEntry.receiptRoots).toContain(
      transferred.btdRightsTransferReceipt?.receiptRoot,
    );

    expect(() =>
      buildBtdAssetPackExchangeSettlement({
        action: 'transfer_rights',
        previousOrder: settled.order,
        receiptId: 'legacy-transfer-boundary-2',
        fromWalletId: 'wallet-depositor-boundary',
        toWalletId: 'wallet-reader-boundary',
        btcFeeReceiptId: 'btc-fee-boundary-2',
        btcFeeFinalityState: 'broadcast',
        readLicenseId: 'read-license-boundary-2',
        sourceSafePreviewRoot: 'source-safe-preview-root-boundary',
        paidUnlockRoot: 'paid-unlock-root-boundary',
        deliveryAdmissionRoot: 'delivery-admission-root-boundary',
        ledgerProjectionRoot: 'ledger-projection-root-boundary',
        actorId: 'actor-boundary-1',
        issuedAt,
      }),
    ).toThrow('Rights transfer receipt requires confirmed BTC fee finality.');
  });
});
