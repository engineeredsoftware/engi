import { z } from 'zod';

import { runBoundedStructuredInference } from './bounded-structured-inference';
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

type UsageRecorder = {
  store: (section: string, key: string, value: unknown) => void;
};

function createUsageRecorder() {
  const captured: { usage: Record<string, number> | null; provider: string | null; model: string | null } = {
    usage: null,
    provider: null,
    model: null,
  };
  const recorder: UsageRecorder = {
    store(section, key, value) {
      if (section === 'llm' && key === 'usage' && value && typeof value === 'object') {
        captured.usage = value as Record<string, number>;
      }
      if (section === 'bounded-inference' && key === 'provider' && value && typeof value === 'object') {
        const record = value as Record<string, unknown>;
        captured.provider = typeof record.provider === 'string' ? record.provider : captured.provider;
        captured.model = typeof record.model === 'string' ? record.model : captured.model;
      }
    },
  };
  return { recorder, captured };
}

function createRecorderExecution(recorder: UsageRecorder) {
  const node = {
    store: recorder.store,
    child: () => node,
  };
  return node;
}

function readTotalTokens(usage: Record<string, number> | null): number | null {
  if (!usage) return null;
  if (typeof usage.totalTokens === 'number') return usage.totalTokens;
  if (typeof usage.total_tokens === 'number') return usage.total_tokens;
  const prompt = usage.promptTokens ?? usage.prompt_tokens ?? usage.inputTokens ?? usage.input_tokens ?? 0;
  const completion =
    usage.completionTokens ?? usage.completion_tokens ?? usage.outputTokens ?? usage.output_tokens ?? 0;
  const total = prompt + completion;
  return total > 0 ? total : null;
}

function clampVolume(value: number) {
  return Number(Math.max(0, Math.min(1, value)).toFixed(2));
}

const LENS_FRAMING: Record<AssetPacksSynthesisLens, { role: string; candidateNoun: string }> = {
  deposit: {
    role: 'Depositors supply AssetPacks (bounded, source-safe slices of repository knowledge) into a Depository where future buyers find Need-fitting packs.',
    candidateNoun: 'deposit AssetPack options the depositor can review and admit',
  },
  read: {
    role: 'Readers ask Bitcode to satisfy a reviewed Need by finding and synthesizing Need-fitting AssetPacks from Depository source.',
    candidateNoun: 'Need-fitting AssetPack candidates the reader can review and buy',
  },
};

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
  const framing = LENS_FRAMING[request.lens];
  const startedAt = Date.now();
  const { recorder, captured } = createUsageRecorder();

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

  const systemPrompt = [
    'You are AssetPacksSynthesis, the single Bitcode synthesis and measurement pipeline.',
    `Lens: ${request.lens}. ${framing.role}`,
    `Synthesize 2-${maxCandidates} DISTINCT ${framing.candidateNoun} from the repository inventory.`,
    'Rules, all mandatory:',
    '- Source-safe outputs only: never quote source code, secrets, or file contents in titles, summaries, or rationale. Describe knowledge and capability, not text.',
    '- coveredSourcePaths must be chosen ONLY from the provided inventory paths, exactly as written.',
    '- Honor the protected-IP exclusions absolutely: never cover, reference, or describe excluded material.',
    '- Each candidate is a distinct knowledge slice (different kind and coverage), commercially legible to a buyer deciding what to buy.',
    `- candidate kind must be one of: ${request.candidateKinds.join(', ')}.`,
    '- measurements is an object with EXACTLY these keys, each an honest 0..1 volume:',
    ...catalog.map((spec) => `    ${spec.measurementKind}: ${spec.guidance}`),
    '- Justify every measurement in measurementRationale.',
    'Return only the requested typed JSON.',
  ].join('\n');

  const sampleBlock = request.inventory.samples
    .map((sample) => `--- ${sample.path} ---\n${sample.excerpt}`)
    .join('\n');
  const userPrompt = [
    `Repository: ${request.repositoryFullName}`,
    `Branch: ${request.sourceBranch || 'unknown'} Commit: ${request.sourceCommit || 'unknown'}`,
    request.steering.instructions
      ? `Steering instructions: ${request.steering.instructions}`
      : 'Steering instructions: none provided.',
    request.steering.protectedIpExclusions.length
      ? `Protected-IP exclusions (never cover or describe): ${request.steering.protectedIpExclusions.join('; ')}`
      : 'Protected-IP exclusions: none declared.',
    request.steering.demandContext.length
      ? `Demand context:\n${request.steering.demandContext.map((entry) => `- ${entry}`).join('\n')}`
      : 'Demand context: none provided.',
    `Inventory paths (${request.inventory.paths.length} of ${request.inventory.totalPathCount} total; ${request.inventory.excludedPathCount} excluded):`,
    request.inventory.paths.join('\n'),
    'Representative file excerpts (already exclusion-filtered; for comprehension only, never to be quoted):',
    sampleBlock || '(no excerpts available)',
  ].join('\n\n');

  const parsed = await runBoundedStructuredInference({
    agentName: 'asset-packs-synthesis',
    phase: `asset-packs-synthesis:${request.lens}`,
    step: 'bounded',
    systemPrompt,
    userPrompt,
    schema: candidateSetSchema,
    fallback: () => ({ options: [] }),
    execution: createRecorderExecution(recorder),
  });

  const inventoryPathSet = new Set(request.inventory.paths);
  const allowedKinds = new Set(request.candidateKinds);
  const exclusionViolations: string[] = [];
  const candidates: AssetPackCandidate[] = [];
  for (const option of parsed.options) {
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

  return {
    lens: request.lens,
    candidates,
    droppedCandidateCount: parsed.options.length - candidates.length,
    exclusionViolations,
    inference: {
      provider: captured.provider,
      model: captured.model,
      totalTokens: readTotalTokens(captured.usage),
      durationMs: Date.now() - startedAt,
    },
  };
}
