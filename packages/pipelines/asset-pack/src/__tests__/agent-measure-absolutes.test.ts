// @ts-nocheck
import {
  computeDeterministicAbsolutes,
  mapReadingsToAbsoluteMeasurements,
  factoryAssetPackMeasureAbsolutesAgent,
  type MeasurableAssetPackPatch,
} from '../agents/validation/agent-measure-absolutes';
import {
  ASSET_PACK_ABSOLUTES_CATALOG,
  ASSET_PACK_ABSOLUTE_KINDS,
} from '../asset-packs-synthesis';

const PATCH: MeasurableAssetPackPatch = {
  title: 'Auth capability slice',
  summary: 'A bounded capability covering session auth and token refresh.',
  coveredSourcePaths: ['src/auth/session.ts', 'src/auth/token.ts', 'src/auth/index.ts'],
  fileChanges: [
    { path: 'src/auth/session.ts', op: 'modify' },
    { path: 'src/auth/token.ts', op: 'create' },
  ],
  confidence: 0.82,
};

describe('agent-measure-absolutes', () => {
  it('absolutes catalog weights sum to 1', () => {
    const total = ASSET_PACK_ABSOLUTES_CATALOG.reduce((sum, spec) => sum + spec.weight, 0);
    expect(Number(total.toFixed(4))).toBe(1);
  });

  it('deterministic absolutes return the full catalog, category=absolute, sizes carry magnitudes', () => {
    const measurements = computeDeterministicAbsolutes(PATCH);
    expect(measurements.map((m) => m.measurementKind).sort()).toEqual([...ASSET_PACK_ABSOLUTE_KINDS].sort());
    for (const m of measurements) {
      expect(m.category).toBe('absolute');
      expect(m.volume).toBeGreaterThanOrEqual(0);
      expect(m.volume).toBeLessThanOrEqual(1);
    }
    const fileSpan = measurements.find((m) => m.measurementKind === 'file-span');
    expect(fileSpan?.magnitude).toBe(2); // two fileChanges
    expect(fileSpan?.unit).toBe('files');
    const correctness = measurements.find((m) => m.measurementKind === 'correctness-estimate');
    expect(correctness?.volume).toBe(0.82); // = confidence
    expect(correctness?.magnitude).toBeUndefined(); // estimate unit carries no magnitude
  });

  it('maps agent readings onto the catalog and falls back per-missing-reading', () => {
    const readings = [
      { measurementKind: 'function-count', volume: 0.5, magnitude: 20 },
      { measurementKind: 'semantic-volume', volume: 0.66 },
      // type-count, file-span, correctness-estimate omitted -> deterministic fallback
    ];
    const measurements = mapReadingsToAbsoluteMeasurements(readings, PATCH);
    expect(measurements).toHaveLength(ASSET_PACK_ABSOLUTES_CATALOG.length);
    const fn = measurements.find((m) => m.measurementKind === 'function-count');
    expect(fn?.volume).toBe(0.5);
    expect(fn?.magnitude).toBe(20);
    const sem = measurements.find((m) => m.measurementKind === 'semantic-volume');
    expect(sem?.volume).toBe(0.66);
    // omitted file-span falls back to the deterministic exact count (2)
    const fileSpan = measurements.find((m) => m.measurementKind === 'file-span');
    expect(fileSpan?.magnitude).toBe(2);
  });

  it('builds a lens-parameterized measurer agent', () => {
    const deposit = factoryAssetPackMeasureAbsolutesAgent('deposit');
    const read = factoryAssetPackMeasureAbsolutesAgent('read');
    expect(deposit.name).toBe('AssetPackMeasureAbsolutesAgent:deposit');
    expect(read.name).toBe('AssetPackMeasureAbsolutesAgent:read');
    expect(deposit.measurementCategory).toBe('absolute');
    expect(deposit.measurementSpecs).toHaveLength(ASSET_PACK_ABSOLUTES_CATALOG.length);
  });
});
