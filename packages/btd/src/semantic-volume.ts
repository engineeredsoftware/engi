import {
  BTD_QUANTIZATION_Q,
  assertNonEmptyString,
  assertPositiveBigInt,
  toBigIntAmount,
} from './constants';

export interface SemanticVolumeUnitInput {
  unitId: string;
  proofReceiptRoot: string;
  fitAccepted: boolean;
  dedupeReceiptRoot: string;
  normalizedUnits: bigint | number | string;
  excludedReason?: string;
}

export interface SemanticVolumeIncludedUnit {
  unitId: string;
  proofReceiptRoot: string;
  dedupeReceiptRoot: string;
  normalizedUnits: string;
}

export interface SemanticVolumeExcludedUnit {
  unitId: string;
  proofReceiptRoot?: string;
  dedupeReceiptRoot?: string;
  excludedReason: string;
}

export interface SemanticVolumeMeasurementReceipt {
  kind: 'btd.semantic_volume_measurement';
  measurementId: string;
  assetPackId: string;
  quantization: string;
  normalizedBitcodeVolume: bigint;
  tokenCount: number;
  includedUnits: SemanticVolumeIncludedUnit[];
  excludedUnits: SemanticVolumeExcludedUnit[];
  issuedAt: string;
}

export function quantizeSemanticVolume(
  normalizedBitcodeVolume: bigint,
  quantization = BTD_QUANTIZATION_Q,
): number {
  if (normalizedBitcodeVolume < 0n) {
    throw new Error('normalizedBitcodeVolume cannot be negative.');
  }

  assertPositiveBigInt(quantization, 'quantization');
  const tokenCount = normalizedBitcodeVolume / quantization;

  if (tokenCount > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error('tokenCount exceeds JavaScript safe integer range.');
  }

  return Number(tokenCount);
}

export function measureProofAddressableSemanticVolume(input: {
  measurementId: string;
  assetPackId: string;
  units: SemanticVolumeUnitInput[];
  issuedAt?: string;
  quantization?: bigint;
}): SemanticVolumeMeasurementReceipt {
  const measurementId = assertNonEmptyString(input.measurementId, 'measurementId');
  const assetPackId = assertNonEmptyString(input.assetPackId, 'assetPackId');
  const quantization = input.quantization ?? BTD_QUANTIZATION_Q;
  assertPositiveBigInt(quantization, 'quantization');

  const includedUnits: SemanticVolumeIncludedUnit[] = [];
  const excludedUnits: SemanticVolumeExcludedUnit[] = [];
  const includedUnitIds = new Set<string>();
  const proofReceiptRoots = new Set<string>();
  let normalizedBitcodeVolume = 0n;

  for (const unit of input.units) {
    const unitId = assertNonEmptyString(unit.unitId, 'unitId');

    if (unit.excludedReason) {
      excludedUnits.push({
        unitId,
        proofReceiptRoot: unit.proofReceiptRoot || undefined,
        dedupeReceiptRoot: unit.dedupeReceiptRoot || undefined,
        excludedReason: unit.excludedReason,
      });
      continue;
    }

    const proofReceiptRoot = assertNonEmptyString(unit.proofReceiptRoot, 'proofReceiptRoot');
    const dedupeReceiptRoot = assertNonEmptyString(unit.dedupeReceiptRoot, 'dedupeReceiptRoot');

    if (!unit.fitAccepted) {
      excludedUnits.push({
        unitId,
        proofReceiptRoot,
        dedupeReceiptRoot,
        excludedReason: 'fit_not_accepted',
      });
      continue;
    }

    const normalizedUnits = toBigIntAmount(unit.normalizedUnits, 'normalizedUnits');
    if (normalizedUnits <= 0n) {
      excludedUnits.push({
        unitId,
        proofReceiptRoot,
        dedupeReceiptRoot,
        excludedReason: 'non_positive_semantic_units',
      });
      continue;
    }

    if (includedUnitIds.has(unitId)) {
      throw new Error(`Duplicate included semantic unit id: ${unitId}.`);
    }

    if (proofReceiptRoots.has(proofReceiptRoot)) {
      throw new Error(`Duplicate included proof receipt root: ${proofReceiptRoot}.`);
    }

    includedUnitIds.add(unitId);
    proofReceiptRoots.add(proofReceiptRoot);
    normalizedBitcodeVolume += normalizedUnits;
    includedUnits.push({
      unitId,
      proofReceiptRoot,
      dedupeReceiptRoot,
      normalizedUnits: normalizedUnits.toString(),
    });
  }

  return {
    kind: 'btd.semantic_volume_measurement',
    measurementId,
    assetPackId,
    quantization: quantization.toString(),
    normalizedBitcodeVolume,
    tokenCount: quantizeSemanticVolume(normalizedBitcodeVolume, quantization),
    includedUnits,
    excludedUnits,
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}
