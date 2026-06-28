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
 * Legitimate sizes: the SIZE absolutes (functions / types / file-span) are MEASURED
 * by the SourceStaticAnalysisTool over the available source (real, deterministic
 * static analysis — not model guesses). The agent contributes only the JUDGMENT
 * absolutes (correctness-estimate, semantic-volume), grounded in the measured
 * counts + the Discovery comprehension.
 *
 * Source-safety: the static-analysis tool's `use` is called DIRECTLY with in-memory
 * samples (never `execute`, which persists raw args), so raw source never enters
 * telemetry; only the source-safe COUNT report grounds the agent. The agent itself
 * reasons over the patch descriptor + the counts — never raw source.
 *
 * Deterministic fallback: when real inference is disabled the absolutes are derived
 * from the static-analysis report alone — the no-network, source-safe preview path.
 */

import { factoryMeasureAgentAbsolutes, type MeasureAgent } from '@bitcode/agent-generics';

import {
  ASSET_PACK_ABSOLUTES_CATALOG,
  type AssetPackAbsoluteSpec,
  type AssetPackCandidateMeasurement,
  type AssetPacksSynthesisLens,
} from '../../asset-packs-synthesis';
import { isAssetPackRealInferenceEnabled } from '../../runtime-inference-policy';
import {
  analyzeStaticSource,
  registerSourceStaticAnalysisTool,
  resolveSourceStaticAnalysisTool,
  SourceStaticAnalysisTool,
  type StaticAnalysisReport,
  type StaticAnalysisSourceFile,
} from './source-static-analysis-tool';

/** The source-safe descriptor of a synthesized patch this agent measures. */
export interface MeasurableAssetPackPatch {
  title: string;
  summary: string;
  coveredSourcePaths: string[];
  fileChanges?: Array<{ path: string; op: string }>;
  confidence?: number;
  patchSummary?: string;
}

/** The size measurement kinds — authoritative from static analysis, not the agent. */
const SIZE_KINDS = new Set(['function-count', 'type-count', 'file-span']);

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

/** Build the source-safe descriptor the measure-agent reasons over (counts only). */
function toDescriptor(patch: MeasurableAssetPackPatch, report: StaticAnalysisReport) {
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
    // The MEASURED static-analysis counts (source-safe) — ground the correctness +
    // semantic-volume judgment. Sizes are already authoritative from these.
    staticAnalysis: {
      functionCount: report.estimatedFunctionCount,
      typeCount: report.estimatedTypeCount,
      fileCount: report.targetFileCount,
      symbolCount: report.symbolCount,
      configKeyCount: report.configKeyCount,
      lineCount: report.lineCount,
      tokenCount: report.tokenCount,
      coverageRatio: report.coverageRatio,
      measuredFromSamples: report.measuredFromSamples,
      languages: Object.keys(report.targetLanguageBreakdown),
    },
  };
}

/**
 * Absolutes from the static-analysis report. SIZES come from the measured report
 * (estimated counts; exact where the covered file was sampled). When no source was
 * available (measuredFromSamples=false), sizes fall back to a covered-path-span
 * heuristic so the preview is never empty. correctness = confidence; semantic-volume
 * is monotone in the sizes. This is both the deterministic fallback AND the size
 * source the agent path builds on.
 */
export function computeAbsolutesFromReport(
  report: StaticAnalysisReport,
  patch: MeasurableAssetPackPatch,
): AssetPackCandidateMeasurement[] {
  const measured = report.measuredFromSamples;
  const functionCount = measured
    ? Math.max(0, report.estimatedFunctionCount)
    : Math.max(1, Math.round(patch.coveredSourcePaths.length * 3));
  const typeCount = measured
    ? Math.max(0, report.estimatedTypeCount)
    : Math.max(1, Math.round(patch.coveredSourcePaths.length * 1.5));
  const fileSpan = (patch.fileChanges?.length ?? 0) || report.targetFileCount || patch.coveredSourcePaths.length;
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

/**
 * Deterministic absolutes from the patch descriptor alone (no source). Thin wrapper
 * over computeAbsolutesFromReport with an empty report — the path-only preview.
 */
export function computeDeterministicAbsolutes(
  patch: MeasurableAssetPackPatch,
): AssetPackCandidateMeasurement[] {
  const report = analyzeStaticSource({ files: [], targetPaths: patch.coveredSourcePaths });
  return computeAbsolutesFromReport(report, patch);
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
 * Merge the measured report-based absolutes with the agent's readings: SIZES stay
 * authoritative from the static analysis; the JUDGMENT measures (correctness,
 * semantic-volume) take the agent's reading when valid, else the report value.
 */
export function mergeReportAndReadings(
  reportAbsolutes: AssetPackCandidateMeasurement[],
  readings: Array<{ measurementKind?: string; volume?: unknown }>,
): AssetPackCandidateMeasurement[] {
  const byKind = new Map<string, { volume?: unknown }>();
  for (const reading of readings || []) {
    if (reading && typeof reading.measurementKind === 'string') byKind.set(reading.measurementKind, reading);
  }
  return reportAbsolutes.map((measurement) => {
    if (SIZE_KINDS.has(measurement.measurementKind)) return measurement; // tool-authoritative
    const reading = byKind.get(measurement.measurementKind);
    const volume = Number(reading?.volume);
    if (reading && Number.isFinite(volume)) return { ...measurement, volume: clamp01(volume) };
    return measurement;
  });
}

/** Resolve (or register) the static-analysis tool and measure the report. */
async function measureStaticAnalysis(
  patch: MeasurableAssetPackPatch,
  context: { execution?: any; sources?: StaticAnalysisSourceFile[] },
): Promise<StaticAnalysisReport> {
  const files = Array.isArray(context.sources) ? context.sources : [];
  // Register the base analyzer (priority 0; honors add/replace + parent override),
  // resolve local-then-parent, and call use() DIRECTLY (no raw-arg persistence).
  const tool = context.execution
    ? resolveSourceStaticAnalysisTool(context.execution) ?? registerSourceStaticAnalysisTool(context.execution)
    : new SourceStaticAnalysisTool();
  try {
    return await tool.use({ files, targetPaths: patch.coveredSourcePaths });
  } catch {
    return analyzeStaticSource({ files, targetPaths: patch.coveredSourcePaths });
  }
}

/**
 * Measure the absolutes of ONE synthesized patch. The SIZES are MEASURED by the
 * static-analysis tool over the available source; the real path additionally runs
 * the measure-agent for the judgment measures (correctness, semantic-volume),
 * grounded in the measured counts (its PTRR substeps render in the SDIVF telemetry,
 * content withheld). The deterministic path returns the report-derived absolutes.
 * Always returns the complete absolutes set.
 */
export async function measureAssetPackAbsolutes(
  patch: MeasurableAssetPackPatch,
  context: { lens: AssetPacksSynthesisLens; execution?: any; sources?: StaticAnalysisSourceFile[] },
): Promise<AssetPackCandidateMeasurement[]> {
  const report = await measureStaticAnalysis(patch, context);
  const reportAbsolutes = computeAbsolutesFromReport(report, patch);

  if (!isAssetPackRealInferenceEnabled() || !context.execution) {
    return reportAbsolutes;
  }
  try {
    const agent = factoryAssetPackMeasureAbsolutesAgent(context.lens);
    const raw = await agent(toDescriptor(patch, report) as any, context.execution);
    // factoryAgentWithPTRR returns an envelope ({ context, output, finalOutput }) — unwrap (F27).
    const result = (raw as any)?.finalOutput ?? (raw as any)?.output ?? raw;
    const readings = Array.isArray((result as any)?.measurements) ? (result as any).measurements : [];
    if (readings.length === 0) return reportAbsolutes;
    return mergeReportAndReadings(reportAbsolutes, readings);
  } catch {
    return reportAbsolutes;
  }
}
