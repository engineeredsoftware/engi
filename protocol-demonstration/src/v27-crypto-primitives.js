// @ts-check

export const BTD_MAX_MINTABLE_SUPPLY = 21_000_000;
export const BTD_QUANTIZATION_Q = 1000n;
export const BITCODE_FEE_ASSET = 'BTC';
export const BITCODE_PUBLIC_BITCOIN_PROOF_NETWORK = 'signet';
export const BTD_MEASUREMINT_CURVE = 'hyperbolic_saturation';

/**
 * @param {{
 *   receiptId: string,
 *   assetPackId: string,
 *   units: Array<{
 *     unitId: string,
 *     proofReceiptRoot: string,
 *     dedupeReceiptRoot: string,
 *     fitAccepted: boolean,
 *     normalizedUnits: bigint,
 *     excludedReason?: string
 *   }>,
 *   issuedAt: string
 * }} input
 */
export function measureSemanticVolume(input) {
  const includedUnits = [];
  const excludedUnits = [];
  const unitIds = new Set();
  const proofRoots = new Set();
  let normalizedBitcodeVolume = 0n;

  for (const unit of input.units) {
    if (unit.excludedReason || !unit.fitAccepted || unit.normalizedUnits <= 0n) {
      excludedUnits.push({
        unitId: unit.unitId,
        excludedReason: unit.excludedReason || (!unit.fitAccepted ? 'fit_not_accepted' : 'non_positive_semantic_units')
      });
      continue;
    }

    if (unitIds.has(unit.unitId) || proofRoots.has(unit.proofReceiptRoot)) {
      throw new Error('duplicate included semantic unit');
    }

    unitIds.add(unit.unitId);
    proofRoots.add(unit.proofReceiptRoot);
    normalizedBitcodeVolume += unit.normalizedUnits;
    includedUnits.push({
      unitId: unit.unitId,
      proofReceiptRoot: unit.proofReceiptRoot,
      dedupeReceiptRoot: unit.dedupeReceiptRoot,
      normalizedUnits: unit.normalizedUnits.toString()
    });
  }

  return {
    type: 'btd_semantic_volume_measurement',
    receiptId: input.receiptId,
    assetPackId: input.assetPackId,
    normalizedBitcodeVolume: normalizedBitcodeVolume.toString(),
    tokenCount: Number(normalizedBitcodeVolume / BTD_QUANTIZATION_Q),
    includedUnits,
    excludedUnits,
    issuedAt: input.issuedAt
  };
}

/**
 * @param {{ totalMinted: number, tokenCount: number }} input
 */
export function allocateRange(input) {
  if (!Number.isSafeInteger(input.totalMinted) || input.totalMinted < 0) {
    throw new Error('totalMinted must be a non-negative safe integer');
  }
  if (!Number.isSafeInteger(input.tokenCount) || input.tokenCount <= 0) {
    throw new Error('tokenCount must be a positive safe integer');
  }
  if (input.totalMinted + input.tokenCount > BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error('BTD max supply exceeded');
  }

  return {
    rangeStart: input.totalMinted,
    rangeEndExclusive: input.totalMinted + input.tokenCount,
    totalMintedAfter: input.totalMinted + input.tokenCount
  };
}

/**
 * @param {{
 *   receiptId: string,
 *   assetPackId: string,
 *   rangeStart: number,
 *   rangeEndExclusive: number,
 *   totalMintedBefore: number,
 *   sourceManifestRoot: string,
 *   measurementReceiptRoot: string,
 *   fitReceiptRoot: string,
 *   proofRoot: string,
 *   dedupeReceiptRoot: string,
 *   settlementJournalRoot: string,
 *   exchangeReceiptRoot: string,
 *   accessPolicyId: string,
 *   accessPolicyHash: string,
 *   mintedAtExchangeSequence: bigint,
 *   issuedAt: string
 * }} input
 */
export function buildAssetPackMintReceipt(input) {
  const tokenCount = input.rangeEndExclusive - input.rangeStart;
  if (tokenCount <= 0) {
    throw new Error('mint receipt range must be non-empty');
  }
  if (input.totalMintedBefore !== input.rangeStart) {
    throw new Error('mint receipt totalMintedBefore must equal rangeStart');
  }

  return {
    type: 'btd_asset_pack_mint',
    receiptId: input.receiptId,
    assetPackId: input.assetPackId,
    rangeStart: input.rangeStart,
    rangeEndExclusive: input.rangeEndExclusive,
    tokenCount,
    totalMintedBefore: input.totalMintedBefore,
    totalMintedAfter: input.totalMintedBefore + tokenCount,
    maxSupply: BTD_MAX_MINTABLE_SUPPLY,
    sourceManifestRoot: input.sourceManifestRoot,
    measurementReceiptRoot: input.measurementReceiptRoot,
    fitReceiptRoot: input.fitReceiptRoot,
    proofRoot: input.proofRoot,
    dedupeReceiptRoot: input.dedupeReceiptRoot,
    settlementJournalRoot: input.settlementJournalRoot,
    exchangeReceiptRoot: input.exchangeReceiptRoot,
    accessPolicyId: input.accessPolicyId,
    accessPolicyHash: input.accessPolicyHash,
    mintedAtExchangeSequence: input.mintedAtExchangeSequence.toString(),
    issuedAt: input.issuedAt
  };
}

/**
 * @param {{ mintReceipts: any[], allocationReceipts?: any[] }} input
 */
export function replayAssetPackMintReceipts(input) {
  const errors = [];
  let totalMinted = 0;
  const ranges = [];
  const allocationByAssetPackId = new Map();

  for (const allocation of input.allocationReceipts || []) {
    const allocated = allocation.allocations.reduce((sum, item) => sum + item.tokenCount, 0);
    if (allocated !== allocation.tokenCount) {
      errors.push(`allocation ${allocation.assetPackId}: tokenCount drift`);
    }
    allocationByAssetPackId.set(allocation.assetPackId, allocation);
  }

  for (const receipt of input.mintReceipts) {
    if (receipt.maxSupply !== BTD_MAX_MINTABLE_SUPPLY) {
      errors.push(`mint ${receipt.assetPackId}: invalid maxSupply`);
    }
    for (const rootKey of ['sourceManifestRoot', 'measurementReceiptRoot', 'fitReceiptRoot', 'proofRoot', 'dedupeReceiptRoot', 'settlementJournalRoot', 'exchangeReceiptRoot', 'accessPolicyId', 'accessPolicyHash']) {
      if (!receipt[rootKey]) {
        errors.push(`mint ${receipt.assetPackId}: missing ${rootKey}`);
      }
    }
    if (receipt.rangeStart !== totalMinted || receipt.totalMintedBefore !== totalMinted) {
      errors.push(`mint ${receipt.assetPackId}: supply/range drift`);
    }
    if (receipt.tokenCount !== receipt.rangeEndExclusive - receipt.rangeStart) {
      errors.push(`mint ${receipt.assetPackId}: tokenCount drift`);
    }
    if (receipt.totalMintedAfter !== receipt.totalMintedBefore + receipt.tokenCount) {
      errors.push(`mint ${receipt.assetPackId}: totalMintedAfter drift`);
    }
    const allocation = allocationByAssetPackId.get(receipt.assetPackId);
    if (allocation && (
      allocation.rangeStart !== receipt.rangeStart ||
      allocation.rangeEndExclusive !== receipt.rangeEndExclusive ||
      allocation.tokenCount !== receipt.tokenCount
    )) {
      errors.push(`allocation ${receipt.assetPackId}: range drift`);
    }
    ranges.push({
      assetPackId: receipt.assetPackId,
      rangeStart: receipt.rangeStart,
      rangeEndExclusive: receipt.rangeEndExclusive
    });
    totalMinted = receipt.totalMintedAfter;
  }

  return {
    blocking: errors.length > 0,
    errors,
    totalMinted,
    nextTokenId: totalMinted,
    ranges,
    allocationCount: allocationByAssetPackId.size
  };
}

/**
 * @param {{
 *   receiptId: string,
 *   assetPackId: string,
 *   normalizedBitcodeVolume: bigint,
 *   cumulativeMeasurementBefore: bigint,
 *   totalMintedBefore: number,
 *   curveParameter: bigint,
 *   proofRoot: string,
 *   settlementJournalRoot: string,
 *   accessPolicyHash: string,
 *   issuedAt: string
 * }} input
 */
export function measureMint(input) {
  const before = targetMinted(input.cumulativeMeasurementBefore, input.curveParameter);
  const cumulativeMeasurementAfter = input.cumulativeMeasurementBefore + input.normalizedBitcodeVolume;
  const after = targetMinted(cumulativeMeasurementAfter, input.curveParameter);
  const availableCells = BTD_MAX_MINTABLE_SUPPLY - input.totalMintedBefore;
  const tokenCount = Math.max(0, Math.min(after.targetMinted - before.targetMinted, availableCells));
  const rangeStart = tokenCount > 0 ? input.totalMintedBefore : undefined;
  const rangeEndExclusive = tokenCount > 0 ? input.totalMintedBefore + tokenCount : undefined;

  return {
    type: 'btd_measure_mint',
    receiptId: input.receiptId,
    assetPackId: input.assetPackId,
    curve: BTD_MEASUREMINT_CURVE,
    normalizedBitcodeVolume: input.normalizedBitcodeVolume.toString(),
    cumulativeMeasurementBefore: input.cumulativeMeasurementBefore.toString(),
    cumulativeMeasurementAfter: cumulativeMeasurementAfter.toString(),
    targetMintedBefore: before.targetMinted,
    targetMintedAfter: after.targetMinted,
    residualMintCreditBefore: before.residualMintCredit.toString(),
    residualMintCreditAfter: after.residualMintCredit.toString(),
    tokenCount,
    rangeStart,
    rangeEndExclusive,
    zeroCellReason: tokenCount === 0 ? (availableCells <= 0 ? 'tail_exhausted' : 'below_integer_threshold') : undefined,
    totalMintedBefore: input.totalMintedBefore,
    totalMintedAfter: input.totalMintedBefore + tokenCount,
    maxSupply: BTD_MAX_MINTABLE_SUPPLY,
    proofRoot: input.proofRoot,
    settlementJournalRoot: input.settlementJournalRoot,
    accessPolicyHash: input.accessPolicyHash,
    issuedAt: input.issuedAt
  };
}

/**
 * @param {bigint} cumulativeMeasurement
 * @param {bigint} curveParameter
 */
function targetMinted(cumulativeMeasurement, curveParameter) {
  if (cumulativeMeasurement === 0n) {
    return { targetMinted: 0, residualMintCredit: 0n };
  }

  const denominator = cumulativeMeasurement + curveParameter;
  const numerator = BigInt(BTD_MAX_MINTABLE_SUPPLY) * cumulativeMeasurement;
  return {
    targetMinted: Number(numerator / denominator),
    residualMintCredit: numerator % denominator
  };
}

/**
 * @param {{
 *   receiptId: string,
 *   assetPackId: string,
 *   rangeStart: number,
 *   rangeEndExclusive: number,
 *   contributors: Array<{ contributorId: string, walletId: string, weight: bigint }>,
 *   issuedAt: string
 * }} input
 */
export function buildContributorAllocationReceipt(input) {
  const tokenCount = input.rangeEndExclusive - input.rangeStart;
  if (tokenCount <= 0) {
    throw new Error('contributor allocation range must be non-empty');
  }

  const totalWeight = input.contributors.reduce((sum, contributor) => sum + contributor.weight, 0n);
  if (totalWeight <= 0n) {
    throw new Error('contributor allocation requires positive total weight');
  }

  const preliminary = input.contributors.map((contributor) => {
    const numerator = BigInt(tokenCount) * contributor.weight;
    return {
      ...contributor,
      base: Number(numerator / totalWeight),
      remainder: numerator % totalWeight
    };
  });
  let remaining = tokenCount - preliminary.reduce((sum, contributor) => sum + contributor.base, 0);
  const extras = new Set();
  for (const contributor of preliminary.slice().sort((left, right) => {
    if (left.remainder === right.remainder) {
      return left.contributorId.localeCompare(right.contributorId);
    }
    return left.remainder > right.remainder ? -1 : 1;
  })) {
    if (remaining <= 0) break;
    extras.add(contributor.contributorId);
    remaining -= 1;
  }

  let cursor = input.rangeStart;
  const allocations = preliminary
    .slice()
    .sort((left, right) => left.contributorId.localeCompare(right.contributorId))
    .map((contributor) => {
      const count = contributor.base + (extras.has(contributor.contributorId) ? 1 : 0);
      const rangeStart = count > 0 ? cursor : undefined;
      const rangeEndExclusive = count > 0 ? cursor + count : undefined;
      cursor += count;
      return {
        contributorId: contributor.contributorId,
        walletId: contributor.walletId,
        tokenCount: count,
        rangeStart,
        rangeEndExclusive,
        weight: contributor.weight.toString()
      };
    });

  return {
    type: 'btd_contributor_allocation',
    receiptId: input.receiptId,
    assetPackId: input.assetPackId,
    rangeStart: input.rangeStart,
    rangeEndExclusive: input.rangeEndExclusive,
    tokenCount,
    allocationMethod: 'hare_niemeyer_weighted_fit',
    allocations,
    issuedAt: input.issuedAt
  };
}

/**
 * @param {{
 *   receiptId: string,
 *   childAssetPackId: string,
 *   edges: Array<{ parentAssetPackId: string, edgeKind: string, confidenceBps: number, timelessnessBps: number, depth: number, evidenceRoot: string }>,
 *   issuedAt: string
 * }} input
 */
export function buildAncestryReviewReceipt(input) {
  const minConfidenceBps = 2500;
  return {
    type: 'btd_ancestry_review',
    receiptId: input.receiptId,
    childAssetPackId: input.childAssetPackId,
    minConfidenceBps,
    edges: input.edges.map((edge) => {
      const payable = edge.edgeKind !== 'citation_only' && edge.confidenceBps >= minConfidenceBps;
      return {
        ...edge,
        childAssetPackId: input.childAssetPackId,
        createdAfterChildFit: true,
        status: payable ? 'payable' : 'recorded_unpaid',
        routeWeight: payable
          ? String((BigInt(edge.confidenceBps) * BigInt(edge.timelessnessBps)) / BigInt((1 + edge.depth) ** 2))
          : '0'
      };
    }),
    issuedAt: input.issuedAt
  };
}

/**
 * @param {{
 *   receiptId: string,
 *   paymentId: string,
 *   assetPackId: string,
 *   grossSats: bigint,
 *   directWalletId: string,
 *   ancestorWalletId: string,
 *   treasuryWalletId: string,
 *   exchangeSequence: bigint,
 *   issuedAt: string
 * }} input
 */
export function buildLicensedReadRevenueRouteReceipt(input) {
  const directSats = (input.grossSats * 8000n) / 10000n;
  const ancestorSats = (input.grossSats * 1200n) / 10000n;
  const treasurySats = input.grossSats - directSats - ancestorSats;

  return {
    type: 'btd_licensed_read_revenue_route',
    receiptId: input.receiptId,
    paymentId: input.paymentId,
    assetPackId: input.assetPackId,
    priceAsset: BITCODE_FEE_ASSET,
    grossSats: input.grossSats.toString(),
    directSats: directSats.toString(),
    ancestorSats: ancestorSats.toString(),
    treasurySats: treasurySats.toString(),
    directRoutes: [{ walletId: input.directWalletId, sats: directSats.toString(), weight: '1' }],
    ancestorRoutes: [{ walletId: input.ancestorWalletId, sats: ancestorSats.toString(), weight: '1' }],
    treasuryWalletId: input.treasuryWalletId,
    exchangeSequence: input.exchangeSequence.toString(),
    issuedAt: input.issuedAt
  };
}

/**
 * @param {{
 *   receiptId: string,
 *   payerWalletId: string,
 *   walletSessionId: string,
 *   network: 'regtest' | 'signet' | 'testnet' | 'mainnet',
 *   satsPaid: bigint,
 *   terminalJournalRoot: string,
 *   exchangeSequence: bigint,
 *   issuedAt: string
 * }} input
 */
export function buildPreparedBtcFeeReceipt(input) {
  if (input.network !== 'regtest' && input.network !== 'signet') {
    throw new Error('V27 demonstration fee proof uses regtest or signet');
  }
  if (input.satsPaid <= 0n) {
    throw new Error('satsPaid must be positive');
  }

  return {
    type: 'btc_fee_transaction',
    receiptId: input.receiptId,
    feePurpose: 'asset_pack_anchor',
    payerWalletId: input.payerWalletId,
    walletSessionId: input.walletSessionId,
    network: input.network,
    txid: null,
    psbt: 'demo-psbt',
    satsPaid: input.satsPaid.toString(),
    exchangeSequence: input.exchangeSequence.toString(),
    terminalJournalRoot: input.terminalJournalRoot,
    finalityState: 'prepared',
    confirmations: 0,
    feeAsset: BITCODE_FEE_ASSET,
    serverCustody: false,
    issuedAt: input.issuedAt
  };
}

/**
 * @param {ReturnType<typeof buildPreparedBtcFeeReceipt>} receipt
 * @param {{ txid: string, confirmations: number }} confirmation
 */
export function confirmBtcFeeReceipt(receipt, confirmation) {
  if (!confirmation.txid) {
    throw new Error('confirmed BTC fee receipt requires txid');
  }
  if (confirmation.confirmations <= 0) {
    throw new Error('confirmed BTC fee receipt requires confirmations');
  }

  return {
    ...receipt,
    txid: confirmation.txid,
    psbt: null,
    finalityState: 'confirmed',
    confirmations: confirmation.confirmations
  };
}

/**
 * @param {{
 *   receiptId: string,
 *   assetPackId: string,
 *   rangeStart: number,
 *   rangeEndExclusive: number,
 *   commitmentRoot: string,
 *   sourceManifestRoot: string,
 *   proofRoot: string,
 *   accessPolicyHash: string,
 *   issuedAt: string
 * }} input
 */
export function buildBitcoinAnchorReceipt(input) {
  if (input.rangeEndExclusive <= input.rangeStart) {
    throw new Error('anchor range must be non-empty');
  }

  return {
    type: 'btd_asset_pack_ledger_anchor',
    receiptId: input.receiptId,
    assetPackId: input.assetPackId,
    chain: 'bitcoin',
    network: BITCODE_PUBLIC_BITCOIN_PROOF_NETWORK,
    commitmentRoot: input.commitmentRoot,
    sourceManifestRoot: input.sourceManifestRoot,
    proofRoot: input.proofRoot,
    accessPolicyHash: input.accessPolicyHash,
    btdRangeStart: input.rangeStart,
    btdRangeEndExclusive: input.rangeEndExclusive,
    finalityState: 'prepared',
    confirmations: 0,
    issuedAt: input.issuedAt
  };
}

/**
 * @param {{
 *   receiptId: string,
 *   repairs: Array<{ repairId: string, blocking: boolean }>,
 *   issuedAt: string
 * }} input
 */
export function buildReconciliationReceipt(input) {
  return {
    type: 'btd_ledger_database_reconciliation',
    receiptId: input.receiptId,
    repairs: input.repairs,
    blocking: input.repairs.some((repair) => repair.blocking),
    issuedAt: input.issuedAt
  };
}

/**
 * @param {{
 *   receiptId: string,
 *   upgradeId: string,
 *   fromVersion: string,
 *   toVersion: string,
 *   network: 'regtest' | 'signet' | 'testnet' | 'mainnet',
 *   migrationRoot: string,
 *   preStateRoot: string,
 *   approvalReceiptRoot: string,
 *   rollbackPlanRoot: string,
 *   issuedAt: string
 * }} input
 */
export function buildProtocolUpgradeReceipt(input) {
  return {
    type: 'btd_protocol_upgrade',
    receiptId: input.receiptId,
    upgradeId: input.upgradeId,
    fromVersion: input.fromVersion,
    toVersion: input.toVersion,
    network: input.network,
    migrationRoot: input.migrationRoot,
    preStateRoot: input.preStateRoot,
    postStateRoot: null,
    approvalReceiptRoot: input.approvalReceiptRoot,
    rollbackPlanRoot: input.rollbackPlanRoot,
    upgradeState: 'planned',
    issuedAt: input.issuedAt
  };
}
