/*
 * Lightweight unit tests for `$BTD` measurement and BTC fee-basis logic.
 * **NOTE** – These tests use Jest’s fake timers and a stub Supabase client so
 * they never touch a real database.  They are intended as documentation as
 * much as validation – CI may stub `@bitcode/supabase` with a local fake.
 */

import {
  BtdFungibleMutationRejectedError,
  BTD_MAX_MINTABLE_SUPPLY,
  BITCODE_FEE_ASSET,
  applyAssetPackSettlementUnlockToPreview,
  assertBtdAccessPolicyTemplateCoverage,
  assertBtdMintableSupplyLimit,
  buildAssetPackSettlementUnlock,
  buildBtdReadAccessProjectionFromRegistryRows,
  calculateLlmBtcFeeEstimate,
  calculateMeasuredBtdFromTokens,
  evaluateBtdReadAccess,
  listBtdAccessPolicyTemplates,
} from '../src';

describe('calculateLlmBtcFeeEstimate', () => {
  const table: Array<[
    model: string,
    input: number,
    output: number,
    expectedUsd: number,
  ]> = [
    ['gemini-2.5-flash', 1000, 0, 0.00035],
    ['gemini-2.5-flash', 0, 1000, 0.0014],
    ['sonnet-4', 1_000_000, 0, 3],
  ];

  it.each(table)('%s in=%i out=%i', (model, input, output, expected) => {
    const estimate = calculateLlmBtcFeeEstimate(model, { inputTokens: input, outputTokens: output });
    expect(estimate.feeAsset).toBe(BITCODE_FEE_ASSET);
    expect(estimate.btcFeesPaid).toBeNull();
    expect(estimate.btcFeeUsdEquivalent).toBe(expected);
  });

  it('throws on unknown model', () => {
    expect(() =>
      calculateLlmBtcFeeEstimate('unknown-model', { inputTokens: 10, outputTokens: 10 }),
    ).toThrow();
  });
});

describe('AssetPack settlement unlock', () => {
  const completeReadback = {
    semanticMeasurement: true,
    measureMintReceipt: true,
    assetPackRange: true,
    btdCell: true,
    ownershipEvent: true,
    readLicense: true,
    mintReceipt: true,
    btcFeeTransaction: true,
    ledgerAnchor: true,
    terminalJournal: true,
    cryptoTelemetry: true,
  };

  it('unlocks protected source only after settlement, readback, license, and delivery agree', () => {
    const unlock = buildAssetPackSettlementUnlock({
      ledgerSettlement: {
        status: 'settled',
        settlementAdmissible: true,
        assetPackId: 'asset-pack-1',
        ledgerAnchorId: 'ledger-anchor-1',
        btcFeeReceiptId: 'btc-fee-1',
        ownershipEventId: 'ownership-1',
        readLicenseId: 'license-1',
        depositorWalletId: 'wallet-depositor',
        readerWalletId: 'wallet-reader',
        readback: completeReadback,
      },
      pullRequestTarget: 'https://github.com/engineeredsoftware/ENGI/pull/42',
    });

    expect(unlock).toMatchObject({
      schema: 'bitcode.asset-pack.settlement-unlock',
      state: 'licensed_read',
      sourceAvailable: true,
      settlementAdmissible: true,
      deliveryAvailable: true,
      assetPackId: 'asset-pack-1',
      readLicenseId: 'license-1',
      btcFeeReceiptId: 'btc-fee-1',
      missingReadbackKeys: [],
    });

    const preview = applyAssetPackSettlementUnlockToPreview(
      {
        accessPolicy: { readRightState: 'pending_settlement' },
        unlock: { state: 'pending_settlement', sourceAvailable: false },
        delivery: { pullRequestTarget: null, availableAfterSettlement: true },
      },
      unlock,
    );

    expect(preview).toMatchObject({
      accessPolicy: { readRightState: 'licensed_read' },
      unlock: {
        state: 'licensed_read',
        sourceAvailable: true,
      },
      delivery: {
        pullRequestTarget: 'https://github.com/engineeredsoftware/ENGI/pull/42',
      },
      settlementUnlock: unlock,
    });
  });

  it('keeps protected source withheld when any settlement readback key is missing', () => {
    const unlock = buildAssetPackSettlementUnlock({
      ledgerSettlement: {
        status: 'settled',
        settlementAdmissible: true,
        assetPackId: 'asset-pack-1',
        readLicenseId: 'license-1',
        readback: {
          ...completeReadback,
          readLicense: false,
        },
      },
      pullRequestTarget: 'https://github.com/engineeredsoftware/ENGI/pull/42',
    });

    expect(unlock).toMatchObject({
      state: 'pending_settlement',
      sourceAvailable: false,
      settlementAdmissible: false,
      missingReadbackKeys: ['readLicense'],
    });
    expect(unlock.reason).toContain('readLicense');
  });
});

describe('calculateMeasuredBtdFromTokens', () => {
  it('measures content amount without implying spend', () => {
    expect(calculateMeasuredBtdFromTokens({ inputTokens: 1200, outputTokens: 50 })).toBe(2);
  });
});

describe('BTD mintable supply ceiling', () => {
  it('records the V27+ fixed measured BTD mint ceiling', () => {
    expect(BTD_MAX_MINTABLE_SUPPLY).toBe(21_000_000);
  });

  it('fails closed when a proposed mint would exceed the ceiling', () => {
    expect(assertBtdMintableSupplyLimit(20_999_999, 1)).toBe(21_000_000);
    expect(() => assertBtdMintableSupplyLimit(21_000_000, 1)).toThrow(/21,000,000/);
  });
});

describe('BtdFungibleMutationRejectedError', () => {
  it('makes fungible BTD mutation attempts fail closed', () => {
    const err = new BtdFungibleMutationRejectedError('nope');
    expect(err.code).toBe('BTD_IS_NON_FUNGIBLE');
  });
});

describe('BTD access policy templates', () => {
  it('covers owner-read, licensed-read, policy, dispute, and takedown posture', () => {
    const templates = assertBtdAccessPolicyTemplateCoverage(listBtdAccessPolicyTemplates());

    expect(templates.map((template) => template.kind)).toEqual(
      expect.arrayContaining([
        'owner_read',
        'licensed_read',
        'derivative_use',
        'redistribution',
        'confidentiality',
        'dispute',
        'takedown',
      ]),
    );
    expect(templates.flatMap((template) => template.prohibitedClaims)).toEqual(
      expect.arrayContaining([
        'price appreciation',
        'dividend',
        'copyright transfer',
        'marketplace royalty',
      ]),
    );
  });
});

describe('registry-derived read access projection', () => {
  it('maps range, ownership, and read-license rows into owner-read decisions', () => {
    const projection = buildBtdReadAccessProjectionFromRegistryRows({
      assetPackId: 'asset-pack-1',
      range: {
        asset_pack_id: 'asset-pack-1',
        range_start: 10,
        range_end_exclusive: 15,
        token_count: 5,
        access_policy_id: 'policy-1',
        access_policy_hash: 'policy-hash',
      },
      ownershipRows: [
        {
          to_wallet_id: 'wallet-owner',
          asset_pack_id: 'asset-pack-1',
          range_start: 10,
          range_end_exclusive: 15,
          access_policy_hash: 'policy-hash',
        },
      ],
    });

    const decision = evaluateBtdReadAccess({
      walletId: 'wallet-owner',
      assetPackId: 'asset-pack-1',
      accessPolicy: projection.accessPolicy,
      ownershipClaims: projection.ownershipClaims,
      licenses: projection.licenses,
      at: '2026-05-19T00:00:00.000Z',
    });

    expect(projection.range.tokenCount).toBe(5);
    expect(decision.decision).toBe('owner_read');
  });

  it('maps registry read-license rows into licensed-read decisions', () => {
    const projection = buildBtdReadAccessProjectionFromRegistryRows({
      assetPackId: 'asset-pack-1',
      range: {
        asset_pack_id: 'asset-pack-1',
        range_start: 10,
        range_end_exclusive: 15,
        token_count: 5,
        access_policy_id: 'policy-1',
        access_policy_hash: 'policy-hash',
      },
      licenseRows: [
        {
          license_id: 'license-1',
          wallet_id: 'wallet-reader',
          asset_pack_id: 'asset-pack-1',
          access_policy_hash: 'policy-hash',
          valid_from: '2026-05-01T00:00:00.000Z',
          expires_at: '2026-06-01T00:00:00.000Z',
        },
      ],
    });

    const decision = evaluateBtdReadAccess({
      walletId: 'wallet-reader',
      assetPackId: 'asset-pack-1',
      accessPolicy: projection.accessPolicy,
      ownershipClaims: projection.ownershipClaims,
      licenses: projection.licenses,
      at: '2026-05-19T00:00:00.000Z',
    });

    expect(decision.decision).toBe('licensed_read');
  });
});
