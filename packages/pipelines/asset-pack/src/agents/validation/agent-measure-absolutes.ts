/**
 * agent-measure-absolutes — the asset-pack concrete absolutes measurer (V48 Gate 3).
 *
 * Bases the generic-agents factoryMeasureAgentAbsolutes with the asset-pack
 * ABSOLUTES catalog (sizes / correctness / semantic-volume), lens-parameterized
 * (deposit | read) so the Gate-4 read finalization only finalizes — it does not
 * restructure. Run in the Validation phase over each synthesized AssetPack patch:
 * an AssetPack is a measured patch = a patch (synthesized in Implementation)
 * MEASURED here. This replaces the synthesis agent's inline self-scoring of the
 * placeholder catalog with a formal, separate measurement.
 *
 * Source-safety: the measurer reasons over the SOURCE-SAFE patch descriptor
 * (fileChanges path+op, summaries, covered-path counts) and never raw source.
 * Size magnitudes are estimates/derivations, not AST reads of protected code.
 *
 * Deterministic fallback: when real inference is disabled the absolutes are
 * derived deterministically from the patch descriptor — the no-network,
 * source-safe test/preview path.
 */

import { factoryMeasureAgentAbsolutes, type MeasureAgent } from '@bitcode/agent-generics';

import {
  ASSET_PACK_ABSOLUTES_CATALOG,
  type AssetPackAbsoluteSpec,
  type AssetPackCandidateMeasurement,
  type AssetPacksSynthesisLens,
} from '../../asset-packs-synthesis';
import { isAssetPackRealInferenceEnabled } from '../../runtime-inference-policy';

/** The source-safe descriptor of a synthesized patch this agent measures. */
export interface MeasurableAssetPackPatch {
  title: string;
  summary: string;
  coveredSourcePaths: string[];
  fileChanges?: Array<{ path: string; op: string }>;
  confidence?: number;
  patchSummary?: string;
}

const LENS_SUBJECT: Record<AssetPacksSynthesisLens, string> = {
  deposit:
    'a synthesized source-safe deposit AssetPack patch the depositor will review and admit',
  read: 'a synthesized source-safe Need-fitting AssetPack the reader will review and buy',
};

/** Per-size normalizer: magnitude / divisor → 0..1 volume (saturates at the divisor). */
const SIZE_NORMALIZER: Record<string, number> = {
  'function-count': 40,
  'type-count': 24,
  'file-span': 10,
};

function clamp01(value: number): number {
  const n = Number.isFinite(value) ? value : 0;
  return Number(Math.max(0, Math.min(1, n)).toFixed(2));
}

/**
 * factoryAssetPackMeasureAbsolutesAgent — the lens-parameterized concrete
 * measurer. Bases factoryMeasureAgentAbsolutes with the absolutes catalog.
 */
export function factoryAssetPackMeasureAbsolutesAgent(
  lens: AssetPacksSynthesisLens,
): MeasureAgent {
  return factoryMeasureAgentAbsolutes({
    name: `AssetPackMeasureAbsolutesAgent:${lens}`,
    description: `Measures the absolutes (sizes, correctness, semantic volume) of ${LENS_SUBJECT[lens]}.`,
    subject: LENS_SUBJECT[lens],
    measurements: ASSET_PACK_ABSOLUTES_CATALOG,
    plan: { chunkThreshold: 1500 },
    try: { chunkThreshold: 3000 },
    refine: { maxAttempts: 2 },
    retry: { maxAttempts: 1 },
  });
}

/** Build the source-safe descriptor the measure-agent reasons over. */
function toDescriptor(patch: MeasurableAssetPackPatch) {
  const fileChanges = (patch.fileChanges || []).map((change) => ({
    path: String(change.path),
    op: String(change.op),
  }));
  return {
    title: patch.title,
    knowledgeSummary: patch.summary,
    patchSummary: patch.patchSummary ?? null,
    // Source-safe descriptor signals (counts + path/op only — never raw source).
    fileChanges,
    fileChangeCount: fileChanges.length || patch.coveredSourcePaths.length,
    coveredSourcePathCount: patch.coveredSourcePaths.length,
    confidenceHint: patch.confidence ?? null,
  };
}

/**
 * Deterministic absolutes from the patch descriptor (the fallback / preview).
 * file-span is exact; function/type counts are conservative estimates from the
 * covered-path span; correctness = confidence; semantic-volume is monotone in
 * the sizes.
 */
export function computeDeterministicAbsolutes(
  patch: MeasurableAssetPackPatch,
): AssetPackCandidateMeasurement[] {
  const fileSpan = (patch.fileChanges?.length ?? 0) || patch.coveredSourcePaths.length;
  const functionCount = Math.max(1, Math.round(patch.coveredSourcePaths.length * 3));
  const typeCount = Math.max(1, Math.round(patch.coveredSourcePaths.length * 1.5));
  const correctness = clamp01(patch.confidence ?? 0.6);
  const semanticVolume = clamp01((functionCount + typeCount * 1.5 + fileSpan * 2) / 80);

  const magnitudeByKind: Record<string, number> = {
    'function-count': functionCount,
    'type-count': typeCount,
    'file-span': fileSpan,
  };
  const volumeByKind: Record<string, number> = {
    'function-count': clamp01(functionCount / SIZE_NORMALIZER['function-count']),
    'type-count': clamp01(typeCount / SIZE_NORMALIZER['type-count']),
    'file-span': clamp01(fileSpan / SIZE_NORMALIZER['file-span']),
    'correctness-estimate': correctness,
    'semantic-volume': semanticVolume,
  };

  return ASSET_PACK_ABSOLUTES_CATALOG.map((spec) => buildMeasurement(spec, {
    volume: volumeByKind[spec.measurementKind] ?? 0,
    magnitude: magnitudeByKind[spec.measurementKind],
  }));
}

function buildMeasurement(
  spec: AssetPackAbsoluteSpec,
  reading: { volume: number; magnitude?: number },
): AssetPackCandidateMeasurement {
  const measurement: AssetPackCandidateMeasurement = {
    measurementKind: spec.measurementKind,
    label: spec.label,
    weight: spec.weight,
    volume: clamp01(reading.volume),
    category: 'absolute',
    unit: spec.unit,
  };
  if (spec.hasMagnitude && Number.isFinite(reading.magnitude)) {
    measurement.magnitude = Math.max(0, Math.round(Number(reading.magnitude)));
  }
  return measurement;
}

/**
 * Map measure-agent readings onto the absolutes catalog (one measurement per spec,
 * in catalog order). Missing/invalid readings fall back to the deterministic value
 * so the absolutes set is always complete.
 */
export function mapReadingsToAbsoluteMeasurements(
  readings: Array<{ measurementKind?: string; volume?: unknown; magnitude?: unknown }>,
  patch: MeasurableAssetPackPatch,
): AssetPackCandidateMeasurement[] {
  const byKind = new Map<string, { volume?: unknown; magnitude?: unknown }>();
  for (const reading of readings || []) {
    if (reading && typeof reading.measurementKind === 'string') {
      byKind.set(reading.measurementKind, reading);
    }
  }
  const deterministic = new Map(
    computeDeterministicAbsolutes(patch).map((m) => [m.measurementKind, m]),
  );
  return ASSET_PACK_ABSOLUTES_CATALOG.map((spec) => {
    const reading = byKind.get(spec.measurementKind);
    const volumeNum = Number(reading?.volume);
    if (!reading || !Number.isFinite(volumeNum)) {
      // Fall back to the deterministic reading for this measurement.
      return deterministic.get(spec.measurementKind)!;
    }
    return buildMeasurement(spec, {
      volume: volumeNum,
      magnitude: spec.hasMagnitude ? Number(reading.magnitude) : undefined,
    });
  });
}

/**
 * Measure the absolutes of ONE synthesized patch. Real path runs the formal
 * measure-agent (its PTRR substeps render in the SDIVF telemetry, content
 * withheld); the deterministic fallback runs when real inference is disabled or
 * the agent returns nothing usable. Always returns the complete absolutes set.
 */
export async function measureAssetPackAbsolutes(
  patch: MeasurableAssetPackPatch,
  context: { lens: AssetPacksSynthesisLens; execution?: any },
): Promise<AssetPackCandidateMeasurement[]> {
  if (!isAssetPackRealInferenceEnabled() || !context.execution) {
    return computeDeterministicAbsolutes(patch);
  }
  try {
    const agent = factoryAssetPackMeasureAbsolutesAgent(context.lens);
    const raw = await agent(toDescriptor(patch) as any, context.execution);
    // factoryAgentWithPTRR returns an envelope ({ context, output, finalOutput }) — unwrap (F27).
    const result = (raw as any)?.finalOutput ?? (raw as any)?.output ?? raw;
    const readings = Array.isArray((result as any)?.measurements)
      ? (result as any).measurements
      : [];
    if (readings.length === 0) return computeDeterministicAbsolutes(patch);
    return mapReadingsToAbsoluteMeasurements(readings, patch);
  } catch {
    return computeDeterministicAbsolutes(patch);
  }
}
