import { z } from 'zod';

import { Execution } from '@bitcode/execution-generics/Execution';

import {
  synthesizeAssetPackCandidatesFormal,
  type FormalSynthesisRawOption,
} from './asset-packs-synthesis-pipeline';
import { isAssetPackRealInferenceEnabled } from './runtime-inference-policy';

/**
 * AssetPacksSynthesis — the single Bitcode synthesis/measurement pipeline
 * (V48 architecture law, QA ledger F12).
 *
 * Depositing and Reading are the same operation at the core: measuring
 * source knowledge into commercially legible AssetPack candidates. The
 * variance between them is carried entirely by the lens:
 *   - steering (depositor instructions vs. read Need),
 *   - the available measurement catalog (deposit: source-coverage /
 *     demand-alignment / reuse-likelihood; read adds need-fit and friends),
 *   - candidate framing (deposit options vs. need-fitting packs).
 *
 * Measurement is the heart of Bitcode's commodification capability, so this
 * module is the one place measurement synthesis happens. Lens adapters
 * (deposit-option-real-synthesis.ts today; the reading lens when Track 3
 * migrates) translate lens-specific contracts to and from this core.
 *
 * The measurement itself runs on the real Bitcode execution/agent/prompt
 * primitives (asset-packs-synthesis-pipeline.ts): PipelineExecution → phase →
 * factoryAgent → createFailsafeGenerationSequence (Failsafe ∘ Thricified). This
 * module owns the lens contract, the candidate schema, and the fail-closed
 * validation; the pipeline module owns the formal inference.
 *
 * Protected-IP exclusions are honored fail-closed at BOTH ends: excluded
 * paths are removed from the inventory before any prompt is built, and any
 * candidate whose covered paths violate the exclusions (or reference paths
 * outside the real inventory) is dropped after inference.
 */

export type AssetPacksSynthesisLens = 'deposit' | 'read';

export interface AssetPackMeasurementSpec {
  measurementKind: string;
  label: string;
  weight: number;
  guidance: string;
}

export const DEPOSIT_MEASUREMENT_CATALOG: AssetPackMeasurementSpec[] = [
  {
    measurementKind: 'source-coverage',
    label: 'Source coverage',
    weight: 0.36,
    guidance: 'How much of the meaningful source knowledge in the inventory this candidate covers.',
  },
  {
    measurementKind: 'demand-alignment',
    label: 'Demand alignment',
    weight: 0.4,
    guidance: 'Alignment with the demand context and depositor steering.',
  },
  {
    measurementKind: 'reuse-likelihood',
    label: 'Reuse likelihood',
    weight: 0.24,
    guidance: 'How reusable the covered knowledge is outside this repository.',
  },
];

// The reading lens extends the deposit catalog with Need-relative
// measurements; finalized when Track 3 migrates reading onto this core.
export const READ_MEASUREMENT_CATALOG: AssetPackMeasurementSpec[] = [
  {
    measurementKind: 'need-fit',
    label: 'Need fit',
    weight: 0.44,
    guidance: 'How directly the covered knowledge satisfies the reviewed read Need.',
  },
  {
    measurementKind: 'source-coverage',
    label: 'Source coverage',
    weight: 0.28,
    guidance: 'How much of the Need-relevant source knowledge this candidate covers.',
  },
  {
    measurementKind: 'reuse-likelihood',
    label: 'Reuse likelihood',
    weight: 0.28,
    guidance: 'How reusable the covered knowledge is in the buyer context beyond the immediate Need.',
  },
];

export function measurementCatalogForLens(lens: AssetPacksSynthesisLens): AssetPackMeasurementSpec[] {
  return lens === 'read' ? READ_MEASUREMENT_CATALOG : DEPOSIT_MEASUREMENT_CATALOG;
}

export interface AssetPacksSynthesisSourceSample {
  path: string;
  excerpt: string;
}

export interface AssetPacksSynthesisSourceInventory {
  paths: string[];
  samples: AssetPacksSynthesisSourceSample[];
  totalPathCount: number;
  excludedPathCount: number;
}

export interface AssetPacksSynthesisSteering {
  instructions: string | null;
  protectedIpExclusions: string[];
  demandContext: string[];
}

export interface AssetPacksSynthesisRequest {
  lens: AssetPacksSynthesisLens;
  repositoryFullName: string;
  sourceBranch: string | null;
  sourceCommit: string | null;
  steering: AssetPacksSynthesisSteering;
  inventory: AssetPacksSynthesisSourceInventory;
  candidateKinds: string[];
  maxCandidates?: number;
  /**
   * Optional execution-generics Execution node. When provided (the deposit
   * route passes a streaming Execution), the formal AssetPacksSynthesis
   * pipeline runs as REAL nested child nodes under it (Pipeline → Phase →
   * Agent → Step → Failsafe → Thricified) and source-safe telemetry streams
   * live. Prompt and response CONTENT is withheld universally by the streaming
   * layer (sourceSafeStreamEvent), keeping rawPromptVisible /
   * rawProviderResponseVisible false by law. When absent, a detached root
   * Execution is created so synthesis still runs (without streaming).
   */
  execution?: Execution | null;
}

export interface AssetPackCandidateMeasurement {
  measurementKind: string;
  label: string;
  weight: number;
  volume: number;
}

export interface AssetPackCandidate {
  kind: string;
  title: string;
  summary: string;
  coveredSourcePaths: string[];
  measurements: AssetPackCandidateMeasurement[];
  measurementRationale: string;
  confidence: number;
}

export interface AssetPacksSynthesisInferenceAccounting {
  provider: string | null;
  model: string | null;
  totalTokens: number | null;
  durationMs: number | null;
}

export interface AssetPacksSynthesisResult {
  lens: AssetPacksSynthesisLens;
  candidates: AssetPackCandidate[];
  droppedCandidateCount: number;
  exclusionViolations: string[];
  inference: AssetPacksSynthesisInferenceAccounting;
}

export function normalizeProtectedIpExclusions(value: string[] | string | null | undefined): string[] {
  const entries = Array.isArray(value) ? value : typeof value === 'string' ? value.split(/\r?\n/) : [];
  return [...new Set(entries.map((entry) => entry.trim()).filter(Boolean))].sort();
}

export function isPathExcluded(path: string, exclusions: string[]): boolean {
  const normalizedPath = path.trim().toLowerCase();
  return exclusions.some((exclusion) => {
    const normalized = exclusion.trim().toLowerCase().replace(/^\.\//, '');
    if (!normalized) return false;
    const withoutGlob = normalized.replace(/\*+/g, '');
    if (!withoutGlob) return false;
    return normalizedPath.includes(withoutGlob);
  });
}

export function applyExclusionsToInventory(
  inventory: { paths: string[]; samples: AssetPacksSynthesisSourceSample[] },
  exclusions: string[],
): AssetPacksSynthesisSourceInventory {
  const keptPaths = inventory.paths.filter((path) => !isPathExcluded(path, exclusions));
  const keptSamples = inventory.samples.filter((sample) => !isPathExcluded(sample.path, exclusions));
  return {
    paths: keptPaths,
    samples: keptSamples,
    totalPathCount: inventory.paths.length,
    excludedPathCount: inventory.paths.length - keptPaths.length,
  };
}

function clampVolume(value: number) {
  return Number(Math.max(0, Math.min(1, value)).toFixed(2));
}

/**
 * Defense-in-depth source-safety assertion (Garrett's "keep local assert"):
 * the universal streaming filter (sourceSafeStreamEvent) withholds raw
 * prompt/response content from telemetry, and this local check guarantees the
 * returned candidates themselves carry no verbatim source. A candidate is
 * commercially legible metadata, never raw text — if any non-trivial source
 * line (>= 40 chars) from the excerpts appears verbatim in a candidate's
 * prose, source leaked and synthesis fails closed.
 */
function assertSourceSafeCandidates(
  candidates: AssetPackCandidate[],
  inventory: AssetPacksSynthesisSourceInventory,
): void {
  const needles = [
    ...new Set(
      inventory.samples
        .flatMap((sample) => sample.excerpt.split(/\r?\n/))
        .map((line) => line.trim())
        .filter((line) => line.length >= 40),
    ),
  ];
  if (needles.length === 0) return;
  for (const candidate of candidates) {
    const haystack = `${candidate.title}\n${candidate.summary}\n${candidate.measurementRationale}`;
    for (const needle of needles) {
      if (haystack.includes(needle)) {
        throw new Error(
          `AssetPacksSynthesis source-safety assertion failed: candidate "${candidate.title}" leaked raw source.`,
        );
      }
    }
  }
}

export async function synthesizeAssetPackCandidates(
  request: AssetPacksSynthesisRequest,
): Promise<AssetPacksSynthesisResult> {
  if (!isAssetPackRealInferenceEnabled()) {
    throw new Error(
      'AssetPacksSynthesis requires BITCODE_ASSET_PACK_REAL_INFERENCE so candidates carry real measurements.',
    );
  }
  if (request.inventory.paths.length === 0) {
    throw new Error('Repository inventory is empty after protected-IP exclusions; nothing to synthesize.');
  }

  const catalog = measurementCatalogForLens(request.lens);
  const maxCandidates = Math.max(1, Math.min(4, request.maxCandidates ?? 4));
  const startedAt = Date.now();

  const candidateSchema = z.object({
    kind: z.string().min(1),
    title: z.string().min(8).max(160),
    summary: z.string().min(40).max(900),
    coveredSourcePaths: z.array(z.string().min(1)).min(1).max(40),
    measurements: z.record(z.string(), z.coerce.number().min(0).max(1)),
    measurementRationale: z.string().min(20).max(700),
    confidence: z.coerce.number().min(0).max(1),
  });
  const candidateSetSchema = z.object({
    options: z.array(candidateSchema).min(1).max(maxCandidates),
  });

  // Run the formal AssetPacksSynthesis pipeline on the real primitives. The
  // layered system prompt (pipeline identity + source-safety law, phase
  // lens-role, agent measurement-catalog + rules, step candidate-shape) is
  // composed inside the pipeline from the execution prompt registry; the
  // exclusion-filtered inventory context becomes the generation user prompt.
  const execution = request.execution ?? new Execution('asset-packs-synthesis');
  const outcome = await synthesizeAssetPackCandidatesFormal(
    {
      lens: request.lens,
      repositoryFullName: request.repositoryFullName,
      sourceBranch: request.sourceBranch,
      sourceCommit: request.sourceCommit,
      steering: request.steering,
      inventory: request.inventory,
      candidateKinds: request.candidateKinds,
      maxCandidates,
    },
    candidateSetSchema as unknown as z.ZodType<{ options: FormalSynthesisRawOption[] }>,
    execution,
  );

  const inventoryPathSet = new Set(request.inventory.paths);
  const allowedKinds = new Set(request.candidateKinds);
  const exclusionViolations: string[] = [];
  const candidates: AssetPackCandidate[] = [];
  for (const option of outcome.options) {
    const coveredSourcePaths = [...new Set(option.coveredSourcePaths.map((path) => path.trim()).filter(Boolean))];
    const unknownPaths = coveredSourcePaths.filter((path) => !inventoryPathSet.has(path));
    const excludedPaths = coveredSourcePaths.filter((path) =>
      isPathExcluded(path, request.steering.protectedIpExclusions),
    );
    if (unknownPaths.length > 0 || excludedPaths.length > 0 || coveredSourcePaths.length === 0) {
      exclusionViolations.push(
        `${option.title}: ${excludedPaths.length ? `excluded paths ${excludedPaths.join(', ')}` : ''}${
          unknownPaths.length ? ` unknown paths ${unknownPaths.join(', ')}` : ''
        }`.trim(),
      );
      continue;
    }

    const measurements = catalog.map((spec) => ({
      measurementKind: spec.measurementKind,
      label: spec.label,
      weight: spec.weight,
      volume: clampVolume(option.measurements[spec.measurementKind] ?? 0),
    }));

    candidates.push({
      kind: allowedKinds.has(option.kind) ? option.kind : request.candidateKinds[0],
      title: option.title.trim(),
      summary: option.summary.trim(),
      coveredSourcePaths,
      measurements,
      measurementRationale: option.measurementRationale.trim(),
      confidence: clampVolume(option.confidence),
    });
  }

  if (candidates.length === 0) {
    throw new Error(
      `AssetPacksSynthesis produced no admissible candidates${
        exclusionViolations.length ? ` (violations: ${exclusionViolations.join(' | ')})` : ''
      }.`,
    );
  }

  // Defense-in-depth: never return source-bearing candidates.
  assertSourceSafeCandidates(candidates, request.inventory);

  return {
    lens: request.lens,
    candidates,
    droppedCandidateCount: outcome.options.length - candidates.length,
    exclusionViolations,
    inference: {
      provider: outcome.provider,
      model: outcome.model,
      totalTokens: outcome.totalTokens,
      durationMs: Date.now() - startedAt,
    },
  };
}
