jest.mock('../asset-packs-synthesis-pipeline', () => ({
  synthesizeAssetPackCandidatesFormal: jest.fn(),
}));
jest.mock('../runtime-inference-policy', () => ({
  isAssetPackRealInferenceEnabled: jest.fn(() => true),
}));

import { synthesizeAssetPackCandidatesFormal } from '../asset-packs-synthesis-pipeline';
import {
  applyExclusionsToInventory,
  isPathExcluded,
  normalizeProtectedIpExclusions,
  synthesizeAssetPackCandidates,
  DEPOSIT_MEASUREMENT_CATALOG,
} from '../asset-packs-synthesis';
import { buildRealDepositAssetPackOptionSynthesis } from '../deposit-option-real-synthesis';
import { assertDepositAssetPackOptionSynthesisSourceSafe } from '../deposit-asset-pack-options';

// The formal pipeline (PipelineExecution → factoryAgent → Failsafe ∘ Thricified)
// is mocked here; its own correctness is covered by the agent-generics suites.
// These tests cover the lens contract + fail-closed validation this module owns.
const mockInference = synthesizeAssetPackCandidatesFormal as jest.Mock;
const inferenceOutcome = (options: unknown[]) => ({
  options,
  provider: 'anthropic',
  model: 'claude-sonnet-4-6',
  totalTokens: 1234,
});

const INVENTORY = {
  paths: ['README.md', 'src/app.py', 'src/utils.py', 'secret/keys.py'],
  samples: [
    { path: 'README.md', excerpt: 'A demo python project.' },
    { path: 'secret/keys.py', excerpt: 'KEY = ...' },
  ],
};

function inferenceCandidate(overrides: Record<string, unknown> = {}) {
  return {
    kind: 'capability-slice',
    title: 'Demo Python capability slice',
    summary:
      'A source-safe slice describing the demo application capability, its entry points, and operational behavior for future reading demand.',
    coveredSourcePaths: ['README.md', 'src/app.py'],
    measurements: {
      'source-coverage': 0.6,
      'demand-alignment': 0.7,
      'reuse-likelihood': 0.5,
    },
    measurementRationale:
      'Covers the primary application path and documentation, aligning with demand for runnable demo knowledge.',
    confidence: 0.8,
    ...overrides,
  };
}

describe('AssetPacksSynthesis core', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('normalizes exclusions and filters inventory fail-closed before inference', () => {
    const exclusions = normalizeProtectedIpExclusions('secret/\n\n  secret/  ');
    expect(exclusions).toEqual(['secret/']);

    const filtered = applyExclusionsToInventory(INVENTORY, exclusions);
    expect(filtered.paths).toEqual(['README.md', 'src/app.py', 'src/utils.py']);
    expect(filtered.samples.map((sample) => sample.path)).toEqual(['README.md']);
    expect(filtered.excludedPathCount).toBe(1);
    expect(isPathExcluded('secret/keys.py', exclusions)).toBe(true);
    expect(isPathExcluded('src/app.py', exclusions)).toBe(false);
  });

  it('maps inference candidates through the lens measurement catalog', async () => {
    mockInference.mockResolvedValue(inferenceOutcome([inferenceCandidate()]));

    const result = await synthesizeAssetPackCandidates({
      lens: 'deposit',
      repositoryFullName: 'engineeredsoftware/demo-python',
      sourceBranch: 'main',
      sourceCommit: 'abc123',
      steering: { instructions: 'demo', protectedIpExclusions: [], demandContext: ['demand'] },
      inventory: { ...INVENTORY, totalPathCount: 4, excludedPathCount: 0 },
      candidateKinds: ['capability-slice', 'implementation-pattern', 'proof-operations-slice'],
    });

    expect(result.candidates).toHaveLength(1);
    const [candidate] = result.candidates;
    expect(candidate.measurements.map((m) => m.measurementKind)).toEqual(
      DEPOSIT_MEASUREMENT_CATALOG.map((spec) => spec.measurementKind),
    );
    expect(candidate.measurements.map((m) => m.weight)).toEqual([0.36, 0.4, 0.24]);
    expect(candidate.measurements[0].volume).toBe(0.6);
    expect(result.droppedCandidateCount).toBe(0);
  });

  it('drops candidates that violate exclusions or reference unknown paths, fail-closed', async () => {
    mockInference.mockResolvedValue(
      inferenceOutcome([
        inferenceCandidate(),
        inferenceCandidate({ title: 'Violates exclusion boundary now', coveredSourcePaths: ['secret/keys.py'] }),
        inferenceCandidate({ title: 'References unknown paths now', coveredSourcePaths: ['made/up.py'] }),
      ]),
    );

    const result = await synthesizeAssetPackCandidates({
      lens: 'deposit',
      repositoryFullName: 'engineeredsoftware/demo-python',
      sourceBranch: 'main',
      sourceCommit: 'abc123',
      steering: { instructions: null, protectedIpExclusions: ['secret/'], demandContext: [] },
      inventory: { ...INVENTORY, totalPathCount: 4, excludedPathCount: 0 },
      candidateKinds: ['capability-slice'],
    });

    expect(result.candidates).toHaveLength(1);
    expect(result.droppedCandidateCount).toBe(2);
    expect(result.exclusionViolations).toHaveLength(2);
  });

  it('throws when no admissible candidates survive', async () => {
    mockInference.mockResolvedValue(
      inferenceOutcome([inferenceCandidate({ coveredSourcePaths: ['secret/keys.py'] })]),
    );

    await expect(
      synthesizeAssetPackCandidates({
        lens: 'deposit',
        repositoryFullName: 'engineeredsoftware/demo-python',
        sourceBranch: 'main',
        sourceCommit: 'abc123',
        steering: { instructions: null, protectedIpExclusions: ['secret/'], demandContext: [] },
        inventory: { ...INVENTORY, totalPathCount: 4, excludedPathCount: 0 },
        candidateKinds: ['capability-slice'],
      }),
    ).rejects.toThrow(/no admissible candidates/);
  });
});

describe('deposit lens adapter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds a law-compatible synthesis with real measurements and exclusion posture', async () => {
    mockInference.mockResolvedValue(inferenceOutcome([inferenceCandidate()]));
    const inventory = { ...INVENTORY, totalPathCount: 4, excludedPathCount: 1 };
    const result = await synthesizeAssetPackCandidates({
      lens: 'deposit',
      repositoryFullName: 'engineeredsoftware/demo-python',
      sourceBranch: 'main',
      sourceCommit: 'abc123',
      steering: { instructions: 'demo', protectedIpExclusions: ['secret/'], demandContext: [] },
      inventory,
      candidateKinds: ['capability-slice'],
    });

    const { synthesis, reviewProjections } = buildRealDepositAssetPackOptionSynthesis(
      {
        repositoryFullName: 'engineeredsoftware/demo-python',
        sourceBranch: 'main',
        sourceCommit: 'abc123',
        obfuscations: 'demo',
        protectedIpExclusions: ['secret/'],
        createdAt: '2026-06-12T22:00:00.000Z',
      },
      result,
      inventory,
    );

    expect(synthesis.schema).toBe('bitcode.deposit.asset-pack-option-synthesis');
    expect(synthesis.pipeline).toBe('DepositAssetPackOptionSynthesis');
    expect(synthesis.synthesisMode).toBe('real-bounded-inference');
    expect(synthesis.pipelineCore).toBe('AssetPacksSynthesis');
    expect(synthesis.optionCount).toBe(1);
    expect(synthesis.options[0].measurements.map((m) => m.volume)).toEqual([0.6, 0.7, 0.5]);
    expect(synthesis.options[0].roots.optionRoot).toMatch(/^deposit-asset-pack-option:[0-9a-f]{8}$/);
    expect(synthesis.exclusionPosture.protectedIpExclusionCount).toBe(1);
    expect(synthesis.exclusionPosture.excludedPathCount).toBe(1);
    expect(reviewProjections[0].coveredSourcePaths).toEqual(['README.md', 'src/app.py']);

    const sourceSafety = assertDepositAssetPackOptionSynthesisSourceSafe(synthesis);
    expect(sourceSafety.admitted).toBe(true);
  });
});
