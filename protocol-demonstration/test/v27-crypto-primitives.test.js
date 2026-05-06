import test from 'node:test';
import assert from 'node:assert/strict';

import { schemaForReceipt } from '../src/receipt-schemas.js';
import {
  BITCODE_FEE_ASSET,
  BITCODE_PUBLIC_BITCOIN_PROOF_NETWORK,
  buildAncestryReviewReceipt,
  allocateRange,
  buildBitcoinAnchorReceipt,
  buildContributorAllocationReceipt,
  buildLicensedReadRevenueRouteReceipt,
  buildPreparedBtcFeeReceipt,
  buildProtocolUpgradeReceipt,
  buildReconciliationReceipt,
  confirmBtcFeeReceipt,
  measureMint,
  measureSemanticVolume
} from '../src/v27-crypto-primitives.js';

const issuedAt = '2026-05-06T00:00:00.000Z';

test('V27 demonstration schemas expose crypto receipt families', () => {
  assert.equal(schemaForReceipt('btd_semantic_volume_measurement').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btd_asset_pack_mint').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btd_measure_mint').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btc_fee_transaction').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btd_asset_pack_ledger_anchor').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btd_asset_pack_rights_transfer').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btd_ledger_database_reconciliation').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btd_contributor_allocation').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btd_ancestry_review').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btd_licensed_read_revenue_route').predicateType.endsWith('/v27'), true);
  assert.equal(schemaForReceipt('btd_protocol_upgrade').predicateType.endsWith('/v27'), true);
});

test('V27 demonstration semantic volume is proof-addressable and range-allocatable', () => {
  const measurement = measureSemanticVolume({
    receiptId: 'semantic-volume-1',
    assetPackId: 'asset-pack-1',
    issuedAt,
    units: [
      {
        unitId: 'unit-a',
        proofReceiptRoot: 'proof-a',
        dedupeReceiptRoot: 'dedupe-a',
        fitAccepted: true,
        normalizedUnits: 1400n
      },
      {
        unitId: 'unit-b',
        proofReceiptRoot: 'proof-b',
        dedupeReceiptRoot: 'dedupe-b',
        fitAccepted: true,
        normalizedUnits: 700n
      },
      {
        unitId: 'unit-c',
        proofReceiptRoot: 'proof-c',
        dedupeReceiptRoot: 'dedupe-c',
        fitAccepted: false,
        normalizedUnits: 9999n
      }
    ]
  });

  assert.equal(measurement.normalizedBitcodeVolume, '2100');
  assert.equal(measurement.tokenCount, 2);
  assert.equal(measurement.excludedUnits[0].excludedReason, 'fit_not_accepted');

  const range = allocateRange({ totalMinted: 0, tokenCount: measurement.tokenCount });
  assert.deepEqual(range, {
    rangeStart: 0,
    rangeEndExclusive: 2,
    totalMintedAfter: 2
  });
});

test('V27 demonstration measureminting decays issuance and supports zero-cell tail receipts', () => {
  const first = measureMint({
    receiptId: 'measuremint-1',
    assetPackId: 'asset-pack-1',
    normalizedBitcodeVolume: 10_000n,
    cumulativeMeasurementBefore: 0n,
    totalMintedBefore: 0,
    curveParameter: 10_000n,
    proofRoot: 'proof-root',
    settlementJournalRoot: 'settlement-root',
    accessPolicyHash: 'policy-hash',
    issuedAt
  });

  const second = measureMint({
    receiptId: 'measuremint-2',
    assetPackId: 'asset-pack-2',
    normalizedBitcodeVolume: 10_000n,
    cumulativeMeasurementBefore: 10_000n,
    totalMintedBefore: first.totalMintedAfter,
    curveParameter: 10_000n,
    proofRoot: 'proof-root-2',
    settlementJournalRoot: 'settlement-root-2',
    accessPolicyHash: 'policy-hash-2',
    issuedAt
  });

  assert.equal(first.tokenCount, 10_500_000);
  assert.equal(second.tokenCount, 3_500_000);

  const tail = measureMint({
    receiptId: 'measuremint-tail',
    assetPackId: 'asset-pack-tail',
    normalizedBitcodeVolume: 1n,
    cumulativeMeasurementBefore: 209_999_990_000_000n,
    totalMintedBefore: 20_999_999,
    curveParameter: 10_000n,
    proofRoot: 'proof-root-tail',
    settlementJournalRoot: 'settlement-root-tail',
    accessPolicyHash: 'policy-hash-tail',
    issuedAt
  });

  assert.equal(tail.tokenCount, 0);
  assert.equal(tail.zeroCellReason, 'below_integer_threshold');
});

test('V27 demonstration BTC fee and anchor receipts use signet and BTC', () => {
  const preparedFee = buildPreparedBtcFeeReceipt({
    receiptId: 'fee-1',
    payerWalletId: 'wallet-1',
    walletSessionId: 'session-1',
    network: 'signet',
    satsPaid: 1200n,
    terminalJournalRoot: 'journal-root',
    exchangeSequence: 1n,
    issuedAt
  });

  assert.equal(preparedFee.feeAsset, BITCODE_FEE_ASSET);
  assert.equal(preparedFee.serverCustody, false);
  assert.equal(preparedFee.finalityState, 'prepared');

  const confirmedFee = confirmBtcFeeReceipt(preparedFee, {
    txid: 'txid-1',
    confirmations: 2
  });
  assert.equal(confirmedFee.finalityState, 'confirmed');
  assert.equal(confirmedFee.txid, 'txid-1');

  const anchor = buildBitcoinAnchorReceipt({
    receiptId: 'anchor-1',
    assetPackId: 'asset-pack-1',
    rangeStart: 0,
    rangeEndExclusive: 2,
    commitmentRoot: 'commitment-root',
    sourceManifestRoot: 'source-root',
    proofRoot: 'proof-root',
    accessPolicyHash: 'policy-hash',
    issuedAt
  });

  assert.equal(anchor.chain, 'bitcoin');
  assert.equal(anchor.network, BITCODE_PUBLIC_BITCOIN_PROOF_NETWORK);
});

test('V27 demonstration allocation, ancestry, and revenue receipts conserve protocol value', () => {
  const allocation = buildContributorAllocationReceipt({
    receiptId: 'allocation-1',
    assetPackId: 'asset-pack-1',
    rangeStart: 0,
    rangeEndExclusive: 5,
    contributors: [
      { contributorId: 'contributor-b', walletId: 'wallet-b', weight: 1n },
      { contributorId: 'contributor-a', walletId: 'wallet-a', weight: 3n }
    ],
    issuedAt
  });
  assert.equal(allocation.allocations.reduce((sum, item) => sum + item.tokenCount, 0), 5);

  const ancestry = buildAncestryReviewReceipt({
    receiptId: 'ancestry-1',
    childAssetPackId: 'asset-pack-child',
    edges: [
      {
        parentAssetPackId: 'asset-pack-parent',
        edgeKind: 'implementation_dependency',
        confidenceBps: 8000,
        timelessnessBps: 7500,
        depth: 1,
        evidenceRoot: 'evidence-root'
      },
      {
        parentAssetPackId: 'asset-pack-citation',
        edgeKind: 'citation_only',
        confidenceBps: 8000,
        timelessnessBps: 7500,
        depth: 1,
        evidenceRoot: 'citation-root'
      }
    ],
    issuedAt
  });
  assert.equal(ancestry.edges[0].status, 'payable');
  assert.equal(ancestry.edges[1].status, 'recorded_unpaid');

  const route = buildLicensedReadRevenueRouteReceipt({
    receiptId: 'revenue-1',
    paymentId: 'payment-1',
    assetPackId: 'asset-pack-1',
    grossSats: 10_001n,
    directWalletId: 'wallet-a',
    ancestorWalletId: 'wallet-parent',
    treasuryWalletId: 'wallet-treasury',
    exchangeSequence: 2n,
    issuedAt
  });
  assert.equal(
    BigInt(route.directSats) + BigInt(route.ancestorSats) + BigInt(route.treasurySats),
    BigInt(route.grossSats)
  );
});

test('V27 demonstration reconciliation receipts block projection drift', () => {
  const reconciliation = buildReconciliationReceipt({
    receiptId: 'reconciliation-1',
    repairs: [{ repairId: 'repair-1', blocking: true }],
    issuedAt
  });

  assert.equal(reconciliation.blocking, true);
});

test('V27 demonstration protocol upgrade receipts keep deployment changes auditable', () => {
  const upgrade = buildProtocolUpgradeReceipt({
    receiptId: 'upgrade-1',
    upgradeId: 'v27-upgrade-1',
    fromVersion: 'V26',
    toVersion: 'V27',
    network: 'signet',
    migrationRoot: 'migration-root',
    preStateRoot: 'pre-root',
    approvalReceiptRoot: 'approval-root',
    rollbackPlanRoot: 'rollback-root',
    issuedAt
  });

  assert.equal(upgrade.upgradeState, 'planned');
  assert.equal(upgrade.network, 'signet');
});
