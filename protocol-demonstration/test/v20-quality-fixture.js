import {
  buildCanonicalProvenData,
  collectCanonicalProvenRuns,
  generateCanonicalProvenMarkdown
} from '../src/canonical/proven-generator.js';
import {
  buildV20GeneratedArtifactContents,
  buildV20QualityReports
} from '../src/canonical/v20-quality.js';

const fixtureContext = {
  version: 'V20',
  canonicalCommit: 'draft-v20',
  canonicalCommitRecordedAt: '2026-04-09T00:00:00.000Z',
  generatedAt: '2026-04-09T00:00:00.000Z',
  worktreeState: 'clean',
  generatorId: 'bitcode.proven-generator.v1'
};

/** @type {any} */
let cachedBaseData = null;
/** @type {any} */
let cachedQualityFixture = null;
/** @type {any} */
let cachedGeneratedFixture = null;

export function buildV20BaseData() {
  if (cachedBaseData) return cachedBaseData;
  const collected = collectCanonicalProvenRuns();
  cachedBaseData = buildCanonicalProvenData(collected, fixtureContext);
  return cachedBaseData;
}

export function buildV20QualityFixture() {
  if (cachedQualityFixture) return cachedQualityFixture;
  const data = buildV20BaseData();
  const reports = buildV20QualityReports({
    data,
    version: fixtureContext.version,
    generatedAt: fixtureContext.generatedAt,
    proofSourceCommit: fixtureContext.canonicalCommit,
    generatorId: fixtureContext.generatorId,
    worktreeState: fixtureContext.worktreeState,
    inheritedV19: {
      positiveMatrices: {
        inheritedPositiveBaseline: {
          cellCount: 1832
        }
      },
      negativeMutationMatrix: {
        cellCount: 10
      },
      deterministicReplayReport: {
        passed: true
      },
      volatilityInventory: {
        blockingFindings: [],
        passed: true
      },
      contractChangeLedger: {
        passed: true
      }
    }
  });
  const artifacts = buildV20GeneratedArtifactContents(reports);
  cachedQualityFixture = { data, reports, artifacts };
  return cachedQualityFixture;
}

export function buildV20GeneratedFixture() {
  if (cachedGeneratedFixture) return cachedGeneratedFixture;
  cachedGeneratedFixture = generateCanonicalProvenMarkdown(fixtureContext);
  return cachedGeneratedFixture;
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
export function collectObjectPaths(value) {
  /** @type {string[]} */
  const paths = [];
  /**
   * @param {unknown} current
   * @param {string} path
   */
  function walk(current, path) {
    if (current === null || current === undefined || typeof current !== 'object') return;
    if (Array.isArray(current)) {
      current.forEach((entry, index) => walk(entry, `${path}[${index}]`));
      return;
    }
    for (const [key, child] of Object.entries(/** @type {Record<string, unknown>} */ (current))) {
      const childPath = path ? `${path}.${key}` : key;
      paths.push(childPath);
      walk(child, childPath);
    }
  }
  walk(value, '');
  return paths;
}
