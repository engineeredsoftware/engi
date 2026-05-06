import { BTD_MAX_MINTABLE_SUPPLY } from './constants';
import {
  BtdContributorAllocationReceipt,
  assertBtdContributorAllocationReceipt,
} from './allocation';
import { BtdMeasureMintReceipt, BtdMeasureMintState } from './measuremint';
import { BtdMintReceipt, assertBtdMintReceipt } from './receipts';
import { AssetPackRange, assertAssetPackRangePlacement } from './range';

export interface BtdReplayReport {
  totalMinted: number;
  nextTokenId: number;
  cumulativeAdmittedMeasurement: bigint;
  supplyCheckpoints: Array<{
    assetPackId: string;
    totalMintedBefore: number;
    totalMintedAfter: number;
    rangeStart: number;
    rangeEndExclusive: number;
  }>;
  ranges: AssetPackRange[];
  allocations: BtdContributorAllocationReceipt[];
  blocking: boolean;
  errors: string[];
}

export function replayBtdMintReceipts(
  receipts: BtdMintReceipt[],
  allocationReceipts: BtdContributorAllocationReceipt[] = [],
): BtdReplayReport {
  const errors: string[] = [];
  let totalMinted = 0;
  const supplyCheckpoints: BtdReplayReport['supplyCheckpoints'] = [];
  const ranges: AssetPackRange[] = [];
  const allocationsByAssetPackId = new Map<string, BtdContributorAllocationReceipt>();

  for (const allocationReceipt of allocationReceipts) {
    try {
      const allocation = assertBtdContributorAllocationReceipt(allocationReceipt);
      if (allocationsByAssetPackId.has(allocation.assetPackId)) {
        errors.push(`allocation ${allocation.assetPackId}: duplicate allocation receipt`);
      }
      allocationsByAssetPackId.set(allocation.assetPackId, allocation);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  for (const receipt of receipts) {
    try {
      assertBtdMintReceipt(receipt);

      if (receipt.totalMintedBefore !== totalMinted) {
        errors.push(`mint ${receipt.assetPackId}: totalMintedBefore drift`);
      }

      if (receipt.rangeStart !== totalMinted) {
        errors.push(`mint ${receipt.assetPackId}: rangeStart drift`);
      }

      const reconstructedRange: AssetPackRange = {
        assetPackId: receipt.assetPackId,
        rangeStart: receipt.rangeStart,
        rangeEndExclusive: receipt.rangeEndExclusive,
        tokenCount: receipt.tokenCount,
        normalizedBitcodeVolume: BigInt(receipt.tokenCount),
        needId: receipt.assetPackId,
        fitReceiptRoot: receipt.fitReceiptRoot,
        proofRoot: receipt.proofRoot,
        sourceManifestRoot: receipt.sourceManifestRoot,
        settlementJournalRoot: receipt.settlementJournalRoot,
        dedupeReceiptRoot: receipt.dedupeReceiptRoot,
        mintedAtExchangeSequence: receipt.mintedAtExchangeSequence,
      };
      try {
        assertAssetPackRangePlacement(ranges, reconstructedRange);
        ranges.push(reconstructedRange);
      } catch (error) {
        errors.push(error instanceof Error ? error.message : String(error));
      }

      const allocation = allocationsByAssetPackId.get(receipt.assetPackId);
      if (allocation) {
        if (allocation.rangeStart !== receipt.rangeStart) {
          errors.push(`allocation ${receipt.assetPackId}: rangeStart drift`);
        }

        if (allocation.rangeEndExclusive !== receipt.rangeEndExclusive) {
          errors.push(`allocation ${receipt.assetPackId}: rangeEndExclusive drift`);
        }

        if (allocation.tokenCount !== receipt.tokenCount) {
          errors.push(`allocation ${receipt.assetPackId}: tokenCount drift`);
        }
      }

      supplyCheckpoints.push({
        assetPackId: receipt.assetPackId,
        totalMintedBefore: receipt.totalMintedBefore,
        totalMintedAfter: receipt.totalMintedAfter,
        rangeStart: receipt.rangeStart,
        rangeEndExclusive: receipt.rangeEndExclusive,
      });
      totalMinted = receipt.totalMintedAfter;
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  return {
    totalMinted,
    nextTokenId: totalMinted,
    cumulativeAdmittedMeasurement: 0n,
    supplyCheckpoints,
    ranges,
    allocations: [...allocationsByAssetPackId.values()],
    blocking: errors.length > 0,
    errors,
  };
}

export function replayBtdMeasureMintReceipts(
  receipts: BtdMeasureMintReceipt[],
): BtdMeasureMintState & { blocking: boolean; errors: string[] } {
  const errors: string[] = [];
  let totalMinted = 0;
  let cumulativeAdmittedMeasurement = 0n;
  let residualMintCredit = 0n;

  for (const receipt of receipts) {
    if (receipt.maxSupply !== BTD_MAX_MINTABLE_SUPPLY) {
      errors.push(`measuremint ${receipt.assetPackId}: invalid maxSupply`);
    }

    if (receipt.totalMintedBefore !== totalMinted) {
      errors.push(`measuremint ${receipt.assetPackId}: totalMintedBefore drift`);
    }

    if (receipt.cumulativeMeasurementBefore !== cumulativeAdmittedMeasurement) {
      errors.push(`measuremint ${receipt.assetPackId}: cumulativeMeasurementBefore drift`);
    }

    if (receipt.tokenCount > 0) {
      if (receipt.rangeStart !== totalMinted) {
        errors.push(`measuremint ${receipt.assetPackId}: rangeStart drift`);
      }

      if (receipt.rangeEndExclusive !== totalMinted + receipt.tokenCount) {
        errors.push(`measuremint ${receipt.assetPackId}: rangeEndExclusive drift`);
      }
    }

    if (receipt.tokenCount === 0 && !receipt.zeroCellReason) {
      errors.push(`measuremint ${receipt.assetPackId}: missing zeroCellReason`);
    }

    totalMinted = receipt.totalMintedAfter;
    cumulativeAdmittedMeasurement = receipt.cumulativeMeasurementAfter;
    residualMintCredit = receipt.residualMintCreditAfter;
  }

  return {
    maxSupply: BTD_MAX_MINTABLE_SUPPLY,
    totalMinted,
    nextTokenId: totalMinted,
    cumulativeAdmittedMeasurement,
    residualMintCredit,
    curve: 'hyperbolic_saturation',
    curveParameter: 1n,
    tailPolicy: 'zero_cell_receipt_then_refit_only',
    blocking: errors.length > 0,
    errors,
  };
}
