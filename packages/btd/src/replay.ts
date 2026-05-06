import { BTD_MAX_MINTABLE_SUPPLY } from './constants';
import { BtdMeasureMintReceipt, BtdMeasureMintState } from './measuremint';
import { BtdMintReceipt, assertBtdMintReceipt } from './receipts';

export interface BtdReplayReport {
  totalMinted: number;
  nextTokenId: number;
  cumulativeAdmittedMeasurement: bigint;
  blocking: boolean;
  errors: string[];
}

export function replayBtdMintReceipts(receipts: BtdMintReceipt[]): BtdReplayReport {
  const errors: string[] = [];
  let totalMinted = 0;

  for (const receipt of receipts) {
    try {
      assertBtdMintReceipt(receipt);

      if (receipt.totalMintedBefore !== totalMinted) {
        errors.push(`mint ${receipt.assetPackId}: totalMintedBefore drift`);
      }

      if (receipt.rangeStart !== totalMinted) {
        errors.push(`mint ${receipt.assetPackId}: rangeStart drift`);
      }

      totalMinted = receipt.totalMintedAfter;
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  return {
    totalMinted,
    nextTokenId: totalMinted,
    cumulativeAdmittedMeasurement: 0n,
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
