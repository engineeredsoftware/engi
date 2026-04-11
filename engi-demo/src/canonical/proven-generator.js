// @ts-check

import { buildInitialState, runMakeEngiBranch } from '../engi-demo.js';
import { buildV18Matrices, summarizeV18Matrix } from './v18-matrices.js';
import {
  buildV19DeterministicReplayReport,
  buildV19GeneratedArtifactContents,
  buildV19PositiveMatrices,
  buildV19Reports,
  summarizeArtifactContents
} from './v19-canon.js';
import {
  buildV20GeneratedArtifactContents,
  buildV20QualityReports
} from './v20-quality.js';
import {
  buildV21CanonicalInputReport,
  buildV21GeneratedArtifactContents,
  buildV21SpecFamilyReport
} from './v21-specifying.js';

export const DEFAULT_PROVEN_BRANCH_MODES = ['patch', 'context'];
export const PROVEN_GENERATOR_ID = 'engi-demo.proven-generator.v1';
const NON_DIGESTED_RECURSIVE_ARTIFACT_PATHS = ['.engi/system-proof-bundle.json', '.engi/proof-witness-manifest.json'];

/**
 * @param {unknown} value
 * @returns {string}
 */
function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  const record = /** @type {Record<string, unknown>} */ (value);
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(',')}}`;
}

/**
 * @param {readonly unknown[]} [values=[]]
 * @returns {string[]}
 */
function summarizeStrings(values = []) {
  return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
}

/**
 * @param {boolean} condition
 * @param {string} message
 */
function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

/**
 * @param {Record<string, string>} files
 * @param {string} artifactPath
 * @returns {any}
 */
function parseArtifactJson(files, artifactPath) {
  const serialized = files[artifactPath];
  invariant(typeof serialized === 'string' && serialized.length > 0, `Missing required artifact ${artifactPath}.`);
  try {
    return JSON.parse(/** @type {string} */ (serialized));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Artifact ${artifactPath} is not valid JSON: ${detail}`);
  }
}

/**
 * @param {readonly unknown[]} values
 * @returns {string}
 */
function stableListSignature(values) {
  return stableStringify(values);
}

/**
 * @param {any} replayStep
 * @returns {{ stepId: string, theoremIds: string[], requiredArtifactPaths: string[] }}
 */
function normalizeReplayStep(replayStep) {
  return {
    stepId: String(replayStep?.stepId || ''),
    theoremIds: summarizeStrings(replayStep?.theoremIds || []),
    requiredArtifactPaths: summarizeStrings(replayStep?.requiredArtifactPaths || [])
  };
}

/**
 * @param {any} theoremVerdict
 * @returns {{ theoremId: string, passed: boolean, witnessArtifactPaths: string[], replayArtifactPaths: string[], replayStepIds: string[], failureReasons: string[] }}
 */
function normalizeTheoremVerdict(theoremVerdict) {
  return {
    theoremId: String(theoremVerdict?.theoremId || ''),
    passed: theoremVerdict?.passed === true,
    witnessArtifactPaths: summarizeStrings(theoremVerdict?.witnessArtifactPaths || []),
    replayArtifactPaths: summarizeStrings(theoremVerdict?.replayArtifactPaths || []),
    replayStepIds: summarizeStrings(theoremVerdict?.replayStepIds || []),
    failureReasons: summarizeStrings(theoremVerdict?.failureReasons || [])
  };
}

/**
 * @param {any} memberVerdict
 * @param {number} index
 * @returns {string}
 */
function memberIdentifier(memberVerdict, index) {
  return String(memberVerdict?.memberId || memberVerdict?.field || `member-${index + 1}`);
}

/**
 * @param {any[]} memberVerdicts
 * @returns {string[]}
 */
function collectMemberIds(memberVerdicts) {
  return memberVerdicts.map((entry, index) => memberIdentifier(entry, index));
}

/**
 * @param {any} familyCatalogEntry
 * @returns {{
 *   proofFamily: string,
 *   proofArtifactPath: string,
 *   memberIds: string[],
 *   theoremIds: string[],
 *   witnessArtifactPaths: string[],
 *   replayArtifacts: string[],
 *   replaySteps: Array<{ stepId: string, theoremIds: string[], requiredArtifactPaths: string[] }>
 * }}
 */
function normalizeFamilyCatalogEntry(familyCatalogEntry) {
  return {
    proofFamily: String(familyCatalogEntry?.proofFamily || ''),
    proofArtifactPath: String(familyCatalogEntry?.proofArtifactPath || ''),
    memberIds: summarizeStrings(familyCatalogEntry?.memberIds || []),
    theoremIds: summarizeStrings(familyCatalogEntry?.theoremIds || []),
    witnessArtifactPaths: summarizeStrings(familyCatalogEntry?.witnessArtifactPaths || []),
    replayArtifacts: summarizeStrings(familyCatalogEntry?.replayArtifacts || []),
    replaySteps: (familyCatalogEntry?.replaySteps || []).map(normalizeReplayStep)
  };
}

/**
 * @param {string} version
 * @returns {string}
 */
export function defaultProvenOutputPath(version) {
  return `ENGI_SPEC_${version}_PROVEN.md`;
}

/**
 * @param {{
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeEngiBranchFn?: typeof runMakeEngiBranch,
 *   scenarioIds?: string[],
 *   branchModes?: string[]
 * }} [input={}]
 */
export function collectCanonicalProvenRuns({
  buildInitialStateFn = buildInitialState,
  runMakeEngiBranchFn = runMakeEngiBranch,
  scenarioIds,
  branchModes = DEFAULT_PROVEN_BRANCH_MODES
} = {}) {
  const seededState = buildInitialStateFn();
  const availableScenarioIds = seededState.needScenarios.map((/** @type {any} */ scenario) => String(scenario.scenarioId));
  const requestedScenarioIds = scenarioIds?.length ? scenarioIds : availableScenarioIds;
  for (const scenarioId of requestedScenarioIds) {
    invariant(availableScenarioIds.includes(scenarioId), `Unknown scenario id ${scenarioId}.`);
  }

  /** @type {any[]} */
  const runs = [];
  for (const scenarioId of requestedScenarioIds) {
    for (const branchMode of branchModes) {
      const { latestRun } = runMakeEngiBranchFn(buildInitialStateFn(), { scenarioId, branchMode });
      invariant(latestRun?.branchArtifacts?.files, `Run ${scenarioId}/${branchMode} did not produce branch artifacts.`);
      const files = /** @type {Record<string, string>} */ (latestRun.branchArtifacts.files);
      const bundle = parseArtifactJson(files, '.engi/system-proof-bundle.json');
      const witnessManifest = parseArtifactJson(files, '.engi/proof-witness-manifest.json');
      const deliverablesManifest = parseArtifactJson(files, '.engi/deliverables.json');
      const policyRelease = parseArtifactJson(files, '.engi/policy-release.json');
      const need = parseArtifactJson(files, '.engi/need.json');

      /** @type {Record<string, any>} */
      const familyProofsByName = {};
      for (const familyCatalogEntry of bundle.proofFamilies || []) {
        const proofFamily = String(familyCatalogEntry?.proofFamily || '');
        const proofArtifactPath = String(familyCatalogEntry?.proofArtifactPath || '');
        invariant(Boolean(proofFamily), `Run ${scenarioId}/${branchMode} contains a proof family entry without proofFamily.`);
        invariant(Boolean(proofArtifactPath), `Run ${scenarioId}/${branchMode} family ${proofFamily} is missing proofArtifactPath.`);
        familyProofsByName[proofFamily] = parseArtifactJson(files, proofArtifactPath);
      }

      runs.push({
        scenarioId,
        branchMode,
        branchName: String(deliverablesManifest?.branchName || latestRun?.branchName || ''),
        needId: String(bundle?.needId || need?.needId || ''),
        assetPackId: String(bundle?.assetPackId || latestRun?.assetPack?.assetPackId || ''),
        branchArtifacts: files,
        systemProofBundle: bundle,
        proofWitnessManifest: witnessManifest,
        deliverablesManifest,
        policyRelease,
        familyProofsByName
      });
    }
  }

  return {
    scenarioIds: requestedScenarioIds,
    branchModes: summarizeStrings(branchModes),
    runs
  };
}

/**
 * @param {Record<string, any>} deliverablesByPath
 * @param {Record<string, any>} classificationsByPath
 * @param {string} artifactPath
 * @param {string} contextLabel
 */
function assertArtifactMetadata(deliverablesByPath, classificationsByPath, artifactPath, contextLabel) {
  invariant(!!deliverablesByPath[artifactPath], `${contextLabel} is missing deliverables metadata for ${artifactPath}.`);
  invariant(!!classificationsByPath[artifactPath], `${contextLabel} is missing policy-release classification for ${artifactPath}.`);
}

/**
 * @param {any} run
 * @returns {any}
 */
function validateAndNormalizeRun(run) {
  const runLabel = `${run.scenarioId}/${run.branchMode}`;
  const bundle = run.systemProofBundle;
  const witnessManifest = run.proofWitnessManifest;
  const deliverablesByPath = Object.fromEntries((run.deliverablesManifest?.deliverables || []).map((/** @type {any} */ entry) => [String(entry?.path || ''), entry]));
  const classificationsByPath = Object.fromEntries((run.policyRelease?.artifactClasses || []).map((/** @type {any} */ entry) => [String(entry?.path || ''), entry]));
  const artifactDigestByPath = /** @type {Record<string, any>} */ (witnessManifest?.artifactDigestByPath || {});
  const proofFamiliesByName = /** @type {Record<string, any>} */ (witnessManifest?.proofFamiliesByName || {});
  const replayCatalogByName = Object.fromEntries((bundle?.verifierEntrypoint?.proofFamilyReplayCatalog || []).map((/** @type {any} */ entry) => [String(entry?.proofFamily || ''), entry]));
  const requiredArtifactPaths = summarizeStrings(bundle?.verifierEntrypoint?.requiredArtifactPaths || []);

  invariant(Array.isArray(bundle?.proofFamilies) && bundle.proofFamilies.length > 0, `Run ${runLabel} is missing a proof-family catalog.`);
  invariant(Array.isArray(bundle?.verifierEntrypoint?.proofFamilyReplayCatalog), `Run ${runLabel} is missing a verifier replay catalog.`);
  invariant(Array.isArray(witnessManifest?.artifactDigests), `Run ${runLabel} is missing witness-manifest artifact digests.`);
  invariant(typeof witnessManifest?.artifactDigestByPath === 'object' && witnessManifest?.artifactDigestByPath !== null, `Run ${runLabel} is missing witness-manifest keyed artifact digests.`);
  invariant(typeof witnessManifest?.proofFamiliesByName === 'object' && witnessManifest?.proofFamiliesByName !== null, `Run ${runLabel} is missing witness-manifest keyed proof families.`);

  const normalizedFamilies = /** @type {any[]} */ ((bundle.proofFamilies || []).map((/** @type {any} */ familyCatalogEntry) => {
    const catalog = normalizeFamilyCatalogEntry(familyCatalogEntry);
    const proof = run.familyProofsByName[catalog.proofFamily];
    const replayCatalogEntry = replayCatalogByName[catalog.proofFamily];
    const witnessFamilyIndex = proofFamiliesByName[catalog.proofFamily];
    const theoremVerdicts = (proof?.theoremVerdicts || []).map(normalizeTheoremVerdict);
    const memberVerdicts = proof?.memberVerdicts || [];
    const proofMemberIds = collectMemberIds(memberVerdicts);
    const proofReplaySteps = (proof?.replaySteps || []).map(normalizeReplayStep);
    const proofTheoremIds = theoremVerdicts.map((/** @type {any} */ entry) => entry.theoremId);
    const proofWitnessArtifactPaths = summarizeStrings(proof?.witnessArtifactPaths || []);
    const proofReplayArtifacts = summarizeStrings(proof?.replayArtifacts || []);

    invariant(!!proof, `Run ${runLabel} is missing proof object for family ${catalog.proofFamily}.`);
    invariant(typeof proof?.proofHash === 'string' && proof.proofHash.length > 0, `Run ${runLabel} family ${catalog.proofFamily} is missing proofHash.`);
    invariant(proof.proofHash === familyCatalogEntry?.proofHash, `Run ${runLabel} family ${catalog.proofFamily} proofHash does not match the proof-family catalog.`);
    invariant(stableListSignature(catalog.theoremIds) === stableListSignature(proofTheoremIds), `Run ${runLabel} family ${catalog.proofFamily} theorem ids do not match the proof object.`);
    invariant(stableListSignature(catalog.memberIds) === stableListSignature(proofMemberIds), `Run ${runLabel} family ${catalog.proofFamily} member ids do not match the proof object.`);
    invariant(stableListSignature(catalog.witnessArtifactPaths) === stableListSignature(proofWitnessArtifactPaths), `Run ${runLabel} family ${catalog.proofFamily} witness artifact paths do not match the proof object.`);
    invariant(stableListSignature(catalog.replayArtifacts) === stableListSignature(proofReplayArtifacts), `Run ${runLabel} family ${catalog.proofFamily} replay artifact paths do not match the proof object.`);
    invariant(stableListSignature(catalog.replaySteps) === stableListSignature(proofReplaySteps), `Run ${runLabel} family ${catalog.proofFamily} replay steps do not match the proof object.`);

    invariant(!!replayCatalogEntry, `Run ${runLabel} family ${catalog.proofFamily} is missing a verifier replay catalog entry.`);
    invariant(stableListSignature(catalog.theoremIds) === stableListSignature(replayCatalogEntry?.theoremIds || []), `Run ${runLabel} family ${catalog.proofFamily} theorem ids do not match the verifier replay catalog.`);
    invariant(stableListSignature(catalog.replayArtifacts) === stableListSignature(replayCatalogEntry?.replayArtifacts || []), `Run ${runLabel} family ${catalog.proofFamily} replay artifacts do not match the verifier replay catalog.`);
    invariant(stableListSignature(catalog.replaySteps) === stableListSignature((replayCatalogEntry?.replaySteps || []).map(normalizeReplayStep)), `Run ${runLabel} family ${catalog.proofFamily} replay steps do not match the verifier replay catalog.`);

    invariant(!!witnessFamilyIndex, `Run ${runLabel} family ${catalog.proofFamily} is missing from the witness-manifest family index.`);
    const witnessFamilyPaths = summarizeStrings(witnessFamilyIndex?.witnessArtifactPaths || []);
    invariant(proofWitnessArtifactPaths.every((artifactPath) => witnessFamilyPaths.includes(artifactPath)), `Run ${runLabel} family ${catalog.proofFamily} witness-manifest family index does not include all catalog witness artifacts.`);

    for (const artifactPath of catalog.witnessArtifactPaths) {
      invariant(!!run.branchArtifacts[artifactPath], `Run ${runLabel} family ${catalog.proofFamily} is missing witness artifact ${artifactPath}.`);
      invariant(
        NON_DIGESTED_RECURSIVE_ARTIFACT_PATHS.includes(artifactPath) || !!artifactDigestByPath[artifactPath],
        `Run ${runLabel} family ${catalog.proofFamily} is missing witness digest for ${artifactPath}.`
      );
      assertArtifactMetadata(deliverablesByPath, classificationsByPath, artifactPath, `Run ${runLabel} family ${catalog.proofFamily}`);
    }

    invariant(!!run.branchArtifacts[catalog.proofArtifactPath], `Run ${runLabel} family ${catalog.proofFamily} is missing its proof artifact ${catalog.proofArtifactPath}.`);
    assertArtifactMetadata(deliverablesByPath, classificationsByPath, catalog.proofArtifactPath, `Run ${runLabel} family ${catalog.proofFamily}`);

    for (const artifactPath of catalog.replayArtifacts) {
      invariant(!!run.branchArtifacts[artifactPath], `Run ${runLabel} family ${catalog.proofFamily} is missing replay artifact ${artifactPath}.`);
    }
    for (const replayStep of catalog.replaySteps) {
      for (const artifactPath of replayStep.requiredArtifactPaths) {
        invariant(requiredArtifactPaths.includes(artifactPath), `Run ${runLabel} family ${catalog.proofFamily} replay step ${replayStep.stepId} requires ${artifactPath}, but the verifier entrypoint does not.`);
        invariant(!!run.branchArtifacts[artifactPath], `Run ${runLabel} family ${catalog.proofFamily} replay step ${replayStep.stepId} is missing ${artifactPath}.`);
      }
    }

    return {
      proofFamily: catalog.proofFamily,
      proofArtifactPath: catalog.proofArtifactPath,
      proofHash: String(proof.proofHash),
      allTheoremsPassed: proof.allTheoremsPassed === true,
      memberIds: catalog.memberIds,
      memberVerdicts: memberVerdicts.map((/** @type {any} */ entry, /** @type {number} */ index) => ({
        id: memberIdentifier(entry, index),
        fields: Object.keys(entry || {}).sort(),
        payload: entry,
        passed: entry?.passed === true
      })),
      theoremIds: catalog.theoremIds,
      theoremVerdicts,
      witnessArtifactPaths: catalog.witnessArtifactPaths,
      replayArtifacts: catalog.replayArtifacts,
      replaySteps: catalog.replaySteps
    };
  }));

  const proofArtifactPaths = summarizeStrings(normalizedFamilies.flatMap((family) => [family.proofArtifactPath, ...family.witnessArtifactPaths]));
  for (const artifactPath of proofArtifactPaths) {
    assertArtifactMetadata(deliverablesByPath, classificationsByPath, artifactPath, `Run ${runLabel}`);
  }

  return {
    scenarioId: run.scenarioId,
    branchMode: run.branchMode,
    branchName: run.branchName,
    needId: run.needId,
    assetPackId: run.assetPackId,
    bundleProofHash: String(bundle?.proofContract?.proofHash || bundle?.proofHash || ''),
    proofContractHash: String(run.familyProofsByName['proof-contract']?.proofHash || ''),
    proofContractPassed: run.familyProofsByName['proof-contract']?.allTheoremsPassed === true,
    familyCount: normalizedFamilies.length,
    allFamiliesPassed: normalizedFamilies.every((/** @type {any} */ family) => family.allTheoremsPassed),
    requiredArtifactPaths,
    artifactDigestEntries: /** @type {any[]} */ (witnessManifest.artifactDigests || [])
      .map((entry) => ({
        path: String(entry?.path || ''),
        digest: String(entry?.digest || ''),
        proofFamilies: summarizeStrings(entry?.proofFamilies || []),
        classification: classificationsByPath[String(entry?.path || '')] || null,
        deliverable: deliverablesByPath[String(entry?.path || '')] || null
      }))
      .sort((left, right) => left.path.localeCompare(right.path)),
    proofArtifacts: proofArtifactPaths.sort((left, right) => left.localeCompare(right)).map((artifactPath) => ({
      path: artifactPath,
      classification: classificationsByPath[artifactPath] || null,
      deliverable: deliverablesByPath[artifactPath] || null
    })),
    families: normalizedFamilies
  };
}

/**
 * @param {ReturnType<typeof collectCanonicalProvenRuns>} collected
 * @param {{
 *   version: string,
 *   canonicalCommit: string,
 *   canonicalCommitRecordedAt?: string | null,
 *   generatedAt: string,
 *   worktreeState?: string,
 *   generatorId?: string
 * }} input
 */
export function buildCanonicalProvenData(collected, {
  version,
  canonicalCommit,
  canonicalCommitRecordedAt = null,
  generatedAt,
  worktreeState = 'clean',
  generatorId = PROVEN_GENERATOR_ID
}) {
  invariant(/^V\d+$/.test(version), `Canonical version must look like VN. Received ${version}.`);
  invariant(typeof canonicalCommit === 'string' && canonicalCommit.trim().length > 0, 'Canonical commit is required.');
  invariant(typeof generatedAt === 'string' && generatedAt.trim().length > 0, 'generatedAt is required.');

  const normalizedRuns = collected.runs.map(validateAndNormalizeRun);
  invariant(normalizedRuns.length > 0, 'At least one proof run is required to build _PROVEN_.');

  const baseline = normalizedRuns[0];
  const baselineFamilySignatures = Object.fromEntries(baseline.families.map((/** @type {any} */ family) => [
    family.proofFamily,
    stableStringify({
      proofFamily: family.proofFamily,
      proofArtifactPath: family.proofArtifactPath,
      memberIds: family.memberIds,
      theoremIds: family.theoremIds,
      witnessArtifactPaths: family.witnessArtifactPaths,
      replayArtifacts: family.replayArtifacts,
      replaySteps: family.replaySteps
    })
  ]));

  for (const run of normalizedRuns.slice(1)) {
    invariant(baseline.familyCount === run.familyCount, `Run ${run.scenarioId}/${run.branchMode} proof-family count differs from the baseline.`);
    for (const family of run.families) {
      const baselineSignature = baselineFamilySignatures[family.proofFamily];
      invariant(!!baselineSignature, `Run ${run.scenarioId}/${run.branchMode} introduced unexpected proof family ${family.proofFamily}.`);
      const runSignature = stableStringify({
        proofFamily: family.proofFamily,
        proofArtifactPath: family.proofArtifactPath,
        memberIds: family.memberIds,
        theoremIds: family.theoremIds,
        witnessArtifactPaths: family.witnessArtifactPaths,
        replayArtifacts: family.replayArtifacts,
        replaySteps: family.replaySteps
      });
      invariant(baselineSignature === runSignature, `Run ${run.scenarioId}/${run.branchMode} changed the structural catalog for ${family.proofFamily}.`);
    }
    invariant(stableListSignature(baseline.requiredArtifactPaths) === stableListSignature(run.requiredArtifactPaths), `Run ${run.scenarioId}/${run.branchMode} changed verifier required artifact paths.`);
  }

  const familySummaries = baseline.families.map((/** @type {any} */ baselineFamily) => {
    const perRunFamily = normalizedRuns.map((/** @type {any} */ run) => run.families.find((/** @type {any} */ family) => family.proofFamily === baselineFamily.proofFamily));
    const theoremSummaries = baselineFamily.theoremIds.map((/** @type {string} */ theoremId) => {
      const theoremRuns = perRunFamily.map((/** @type {any} */ family, /** @type {number} */ index) => {
        const verdict = family?.theoremVerdicts.find((/** @type {any} */ entry) => entry.theoremId === theoremId);
        invariant(!!verdict, `Run ${normalizedRuns[index].scenarioId}/${normalizedRuns[index].branchMode} is missing theorem ${theoremId} for ${baselineFamily.proofFamily}.`);
        return {
          run: normalizedRuns[index],
          verdict
        };
      });
      return {
        theoremId,
        passedRuns: theoremRuns.filter((/** @type {any} */ entry) => entry.verdict.passed).length,
        totalRuns: theoremRuns.length,
        failingRuns: theoremRuns.filter((/** @type {any} */ entry) => !entry.verdict.passed).map((/** @type {any} */ entry) => `${entry.run.scenarioId}/${entry.run.branchMode}`),
        replayStepIds: summarizeStrings(theoremRuns.flatMap((/** @type {any} */ entry) => entry.verdict.replayStepIds)),
        witnessArtifactPaths: summarizeStrings(theoremRuns.flatMap((/** @type {any} */ entry) => entry.verdict.witnessArtifactPaths)),
        replayArtifactPaths: summarizeStrings(theoremRuns.flatMap((/** @type {any} */ entry) => entry.verdict.replayArtifactPaths)),
        failureReasons: summarizeStrings(theoremRuns.flatMap((/** @type {any} */ entry) => entry.verdict.failureReasons))
      };
    });
    const memberSummaries = baselineFamily.memberIds.map((/** @type {string} */ memberId) => {
      const memberRuns = perRunFamily.map((/** @type {any} */ family, /** @type {number} */ index) => {
        const verdict = family?.memberVerdicts.find((/** @type {any} */ entry) => entry.id === memberId);
        invariant(!!verdict, `Run ${normalizedRuns[index].scenarioId}/${normalizedRuns[index].branchMode} is missing member ${memberId} for ${baselineFamily.proofFamily}.`);
        return {
          run: normalizedRuns[index],
          verdict
        };
      });
      return {
        memberId,
        passedRuns: memberRuns.filter((/** @type {any} */ entry) => entry.verdict.passed).length,
        totalRuns: memberRuns.length,
        failingRuns: memberRuns.filter((/** @type {any} */ entry) => !entry.verdict.passed).map((/** @type {any} */ entry) => `${entry.run.scenarioId}/${entry.run.branchMode}`),
        fieldShape: summarizeStrings(memberRuns.flatMap((/** @type {any} */ entry) => entry.verdict.fields))
      };
    });
    return {
      proofFamily: baselineFamily.proofFamily,
      proofArtifactPath: baselineFamily.proofArtifactPath,
      theoremIds: baselineFamily.theoremIds,
      memberIds: baselineFamily.memberIds,
      witnessArtifactPaths: baselineFamily.witnessArtifactPaths,
      replayArtifacts: baselineFamily.replayArtifacts,
      replaySteps: baselineFamily.replaySteps,
      theoremSummaries,
      memberSummaries
    };
  });

  const runMatrix = normalizedRuns.map((run) => ({
    scenarioId: run.scenarioId,
    branchMode: run.branchMode,
    branchName: run.branchName,
    needId: run.needId,
    assetPackId: run.assetPackId,
    familyCount: run.familyCount,
    allFamiliesPassed: run.allFamiliesPassed,
    proofContractPassed: run.proofContractPassed,
    requiredArtifactPathCount: run.requiredArtifactPaths.length,
    artifactDigestCount: run.artifactDigestEntries.length,
    fullyProven: run.allFamiliesPassed && run.proofContractPassed,
    familyProofHashes: Object.fromEntries(run.families.map((/** @type {any} */ family) => [family.proofFamily, family.proofHash]))
  }));

  const incompleteVerdicts = [
    ...familySummaries.flatMap((/** @type {any} */ family) => family.theoremSummaries.filter((/** @type {any} */ entry) => entry.passedRuns !== entry.totalRuns).map((/** @type {any} */ entry) => ({
      scope: 'theorem',
      proofFamily: family.proofFamily,
      id: entry.theoremId,
      failingRuns: entry.failingRuns,
      failureReasons: entry.failureReasons
    }))),
    ...familySummaries.flatMap((/** @type {any} */ family) => family.memberSummaries.filter((/** @type {any} */ entry) => entry.passedRuns !== entry.totalRuns).map((/** @type {any} */ entry) => ({
      scope: 'member',
      proofFamily: family.proofFamily,
      id: entry.memberId,
      failingRuns: entry.failingRuns,
      failureReasons: []
    })))
  ];

  return {
    version,
    outputPath: defaultProvenOutputPath(version),
    canonicalCommit,
    canonicalCommitRecordedAt,
    worktreeState,
    generatorId,
    generatedAt,
    scenarioIds: collected.scenarioIds,
    branchModes: collected.branchModes,
    familySummaries,
    runMatrix,
    runDetails: normalizedRuns,
    aggregate: {
      fullyProven: incompleteVerdicts.length === 0 && runMatrix.every((entry) => entry.fullyProven),
      runCount: normalizedRuns.length,
      familyCount: familySummaries.length,
      theoremCount: familySummaries.reduce((/** @type {number} */ sum, /** @type {any} */ family) => sum + family.theoremIds.length, 0),
      memberCount: familySummaries.reduce((/** @type {number} */ sum, /** @type {any} */ family) => sum + family.memberIds.length, 0),
      artifactDigestCount: normalizedRuns.reduce((/** @type {number} */ sum, /** @type {any} */ run) => sum + run.artifactDigestEntries.length, 0)
    },
    incompleteVerdicts
  };
}

/**
 * @param {string} value
 * @returns {string}
 */
function markdownCode(value) {
  return `\`${String(value || '')}\``;
}

/**
 * @param {string[]} headers
 * @param {Array<Array<string | number | boolean>>} rows
 * @returns {string}
 */
function renderMarkdownTable(headers, rows) {
  /** @param {string | number | boolean} value */
  const escapeCell = (value) => String(value).replace(/\|/g, '\\|').replace(/\n/g, '<br>');
  const headerRow = `| ${headers.map(escapeCell).join(' | ')} |`;
  const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
  const bodyRows = rows.map((row) => `| ${row.map(escapeCell).join(' | ')} |`);
  return [headerRow, separatorRow, ...bodyRows].join('\n');
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} data
 * @returns {string}
 */
export function renderCanonicalProvenMarkdown(data) {
  const v18Matrices = /** @type {any} */ (data).v18Matrices || null;
  const v19 = /** @type {any} */ (data).v19 || null;
  const v20 = /** @type {any} */ (data).v20 || null;
  const v21 = /** @type {any} */ (data).v21 || null;
  const lines = [];
  lines.push(`# ENGI Spec ${data.version} Proven`);
  lines.push('');
  lines.push(`- canonicalVersion: ${markdownCode(data.version)}`);
  lines.push(`- canonicalCommit: ${markdownCode(data.canonicalCommit)}`);
  lines.push(`- canonicalCommitRecordedAt: ${markdownCode(data.canonicalCommitRecordedAt || 'unknown')}`);
  lines.push(`- worktreeState: ${markdownCode(data.worktreeState)}`);
  lines.push(`- generatorId: ${markdownCode(data.generatorId)}`);
  lines.push(`- generatedAt: ${markdownCode(data.generatedAt)}`);
  lines.push(`- outputPath: ${markdownCode(data.outputPath)}`);
  lines.push(`- scenarioIds: ${data.scenarioIds.map(markdownCode).join(', ')}`);
  lines.push(`- branchModes: ${data.branchModes.map(markdownCode).join(', ')}`);
  lines.push('');
  lines.push('## Aggregate Verdict');
  lines.push('');
  lines.push(`- fullyProven: ${markdownCode(String(data.aggregate.fullyProven))}`);
  lines.push(`- runCount: ${markdownCode(String(data.aggregate.runCount))}`);
  lines.push(`- familyCount: ${markdownCode(String(data.aggregate.familyCount))}`);
  lines.push(`- theoremCount: ${markdownCode(String(data.aggregate.theoremCount))}`);
  lines.push(`- memberCount: ${markdownCode(String(data.aggregate.memberCount))}`);
  lines.push(`- artifactDigestCount: ${markdownCode(String(data.aggregate.artifactDigestCount))}`);
  if (v18Matrices) {
    lines.push(`- v18MatrixCount: ${markdownCode(String(v18Matrices.summaries.length))}`);
    lines.push(`- v18MatrixCellCount: ${markdownCode(String(v18Matrices.summaries.reduce((/** @type {number} */ sum, /** @type {any} */ summary) => sum + summary.cellCount, 0)))}`);
    lines.push(`- v18MatricesFullyProven: ${markdownCode(String(v18Matrices.fullyProven))}`);
  }
  if (v19) {
    lines.push(`- v19PositiveMatrixCellCount: ${markdownCode(String(v19.positiveMatrices.inheritedPositiveBaseline.cellCount))}`);
    lines.push(`- v19MutationCellCount: ${markdownCode(String(v19.negativeMutationMatrix.cellCount))}`);
    lines.push(`- v19MutationCoverageMode: ${markdownCode(v19.negativeMutationMatrix.coverageMode)}`);
    lines.push(`- v19VolatilityBlockingFindings: ${markdownCode(String(v19.volatilityInventory.blockingFindings.length))}`);
    lines.push(`- v19ReplayDeterministic: ${markdownCode(String(v19.deterministicReplayReport?.passed === true))}`);
    lines.push(`- v19ContractLedgerPassed: ${markdownCode(String(v19.contractChangeLedger.passed === true))}`);
  }
  if (v20) {
    lines.push(`- v20QualityPassed: ${markdownCode(String(v20.qualitySummary.passed === true))}`);
    lines.push(`- v20QualityReportCount: ${markdownCode(String(v20.qualitySummary.qualityReportCount))}`);
    lines.push(`- v20GeneratedQualityArtifactCount: ${markdownCode(String(v20.qualitySummary.generatedArtifactCount))}`);
    lines.push(`- v20QualityBlockingFailures: ${markdownCode(String(v20.qualitySummary.blockingFailures.length))}`);
    lines.push(`- v20ProjectionSmokeCells: ${markdownCode(String(v20.projectionQualitySmokeMatrix.cellCount))}`);
  }
  if (v21) {
    lines.push(`- v21SpecFamilyPassed: ${markdownCode(String(v21.specFamilyReport.passed === true))}`);
    lines.push(`- v21CanonicalInputsPassed: ${markdownCode(String(v21.canonicalInputReport.passed === true))}`);
    lines.push(`- v21GeneratedArtifactCount: ${markdownCode(String((v21.artifactSummaries || []).length))}`);
  }
  lines.push('');
  if (v18Matrices) {
    lines.push('## V18 Generated Matrix Summaries');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['matrixId', 'sourceRunCount', 'cellCount', 'passedCellCount', 'failedCellCount', 'acceptedExclusionCount'],
      v18Matrices.summaries.map((/** @type {any} */ summary) => [
        markdownCode(summary.matrixId),
        summary.sourceRunCount,
        summary.cellCount,
        summary.passedCellCount,
        summary.failedCellCount,
        summary.acceptedExclusionCount
      ])
    ));
    lines.push('');
    lines.push('### V18 State-Machine Group Counts');
    lines.push('');
    const stateSummary = summarizeV18Matrix(v18Matrices.stateMachineMatrix);
    lines.push(renderMarkdownTable(
      ['matrixGroup', 'cellCount'],
      Object.entries(stateSummary.groupCounts).map(([group, count]) => [markdownCode(group), /** @type {number} */ (count)])
    ));
    lines.push('');
    lines.push('### V18 Matrix Failures');
    lines.push('');
    const failedCells = [
      ...v18Matrices.proofMemberSemanticMatrix.failedCells,
      ...v18Matrices.theoremEvidenceMatrix.failedCells,
      ...v18Matrices.stateMachineMatrix.failedCells
    ];
    if (!failedCells.length) {
      lines.push('- none');
    } else {
      for (const cell of failedCells) {
        lines.push(`- matrix=${markdownCode(cell.matrixId || 'unknown')} scenario=${markdownCode(cell.scenarioId)} branchMode=${markdownCode(cell.branchMode || 'none')} predicate=${markdownCode(cell.predicateId || cell.evidencePredicateId || 'unknown')} failure=${markdownCode(cell.failureReason || 'unknown')}`);
      }
    }
    lines.push('');
  }
  if (v19) {
    lines.push('## V19 Reproducible Canon Reports');
    lines.push('');
    lines.push('### V19 Generated Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v19.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V19 Inherited Positive Matrix Summaries');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['matrixId', 'sourceRunCount', 'cellCount', 'passedCellCount', 'failedCellCount', 'acceptedExclusionCount'],
      v19.positiveMatrices.summaries.map((/** @type {any} */ summary) => [
        markdownCode(summary.matrixId),
        summary.sourceRunCount,
        summary.cellCount,
        summary.passedCellCount,
        summary.failedCellCount,
        summary.acceptedExclusionCount
      ])
    ));
    lines.push('');
    lines.push('### V19 Deterministic Replay');
    lines.push('');
    const replayReport = v19.deterministicReplayReport || null;
    if (!replayReport) {
      lines.push('- replay report not attached');
    } else {
      lines.push(`- reportId: ${markdownCode(replayReport.reportId)}`);
      lines.push(`- runCount: ${markdownCode(String(replayReport.runCount))}`);
      lines.push(`- passed: ${markdownCode(String(replayReport.passed))}`);
      lines.push(`- failureReason: ${markdownCode(replayReport.failureReason || 'none')}`);
      lines.push('');
      lines.push(renderMarkdownTable(
        ['artifactPath', 'firstDigest', 'secondDigest', 'byteEqual'],
        replayReport.artifactComparisons.map((/** @type {any} */ comparison) => [
          markdownCode(comparison.artifactPath),
          markdownCode(comparison.firstDigest),
          markdownCode(comparison.secondDigest),
          markdownCode(String(comparison.byteEqual))
        ])
      ));
    }
    lines.push('');
    lines.push('### V19 Volatility Inventory');
    lines.push('');
    lines.push(`- inventoryId: ${markdownCode(v19.volatilityInventory.inventoryId)}`);
    lines.push(`- scannedArtifactCount: ${markdownCode(String(v19.volatilityInventory.scannedArtifactCount))}`);
    lines.push(`- findingCount: ${markdownCode(String(v19.volatilityInventory.findingCount))}`);
    lines.push(`- blockingFindingCount: ${markdownCode(String(v19.volatilityInventory.blockingFindings.length))}`);
    lines.push(`- passed: ${markdownCode(String(v19.volatilityInventory.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['classification', 'count'],
      Object.entries(v19.volatilityInventory.classificationCounts).map(([classification, count]) => [
        markdownCode(classification),
        /** @type {number} */ (count)
      ])
    ));
    lines.push('');
    lines.push('### V19 Negative Proof Mutation Matrix');
    lines.push('');
    lines.push(`- matrixId: ${markdownCode(v19.negativeMutationMatrix.matrixId)}`);
    lines.push(`- coverageMode: ${markdownCode(v19.negativeMutationMatrix.coverageMode)}`);
    lines.push(`- mutationClassCount: ${markdownCode(String(v19.negativeMutationMatrix.mutationClassCount))}`);
    lines.push(`- cellCount: ${markdownCode(String(v19.negativeMutationMatrix.cellCount))}`);
    lines.push(`- rejectedCellCount: ${markdownCode(String(v19.negativeMutationMatrix.rejectedCellCount))}`);
    lines.push(`- unexpectedPassCount: ${markdownCode(String(v19.negativeMutationMatrix.unexpectedPassCells.length))}`);
    lines.push(`- unexpectedErrorCount: ${markdownCode(String(v19.negativeMutationMatrix.unexpectedErrorCells.length))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['mutationClass', 'expectedErrorClass', 'actualErrorClass', 'rejectedAsExpected'],
      v19.negativeMutationMatrix.cells.map((/** @type {any} */ cell) => [
        markdownCode(cell.mutationClass),
        markdownCode(cell.expectedErrorClass),
        markdownCode(cell.actualErrorClass),
        markdownCode(String(cell.rejectedAsExpected))
      ])
    ));
    lines.push('');
    lines.push('### V19 Omitted Mutation Cross-Products');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['omittedPermutation', 'reason', 'reopenCondition'],
      v19.negativeMutationMatrix.omittedCrossProducts.map((/** @type {any} */ entry) => [
        markdownCode(entry.omittedPermutation),
        entry.reason,
        entry.reopenCondition
      ])
    ));
    lines.push('');
    lines.push('### V19 Contract-Change Ledger');
    lines.push('');
    lines.push(`- ledgerId: ${markdownCode(v19.contractChangeLedger.ledgerId)}`);
    lines.push(`- fromVersion: ${markdownCode(v19.contractChangeLedger.fromVersion)}`);
    lines.push(`- toVersion: ${markdownCode(v19.contractChangeLedger.toVersion)}`);
    lines.push(`- passed: ${markdownCode(String(v19.contractChangeLedger.passed))}`);
    lines.push(`- proofCatalogDelta: ${markdownCode(v19.contractChangeLedger.proofCatalogDelta.status)}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['changeType', 'fromMatrixId', 'toMatrixId', 'cellCount'],
      v19.contractChangeLedger.matrixDeltas.map((/** @type {any} */ delta) => [
        markdownCode(delta.changeType),
        markdownCode(delta.fromMatrixId),
        markdownCode(delta.toMatrixId),
        delta.cellCount
      ])
    ));
    lines.push('');
  }
  if (v20) {
    lines.push('## V20 Operator Quality Reports');
    lines.push('');
    lines.push('### V20 Generated Quality Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v20.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V20 Quality Summary');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.qualitySummary.reportId)}`);
    lines.push(`- passed: ${markdownCode(String(v20.qualitySummary.passed))}`);
    lines.push(`- qualityReportCount: ${markdownCode(String(v20.qualitySummary.qualityReportCount))}`);
    lines.push(`- generatedArtifactCount: ${markdownCode(String(v20.qualitySummary.generatedArtifactCount))}`);
    lines.push(`- inheritedPositiveMatrixCellCount: ${markdownCode(String(v20.qualitySummary.inheritedProofClosure.positiveMatrixCellCount))}`);
    lines.push(`- inheritedNegativeMutationCellCount: ${markdownCode(String(v20.qualitySummary.inheritedProofClosure.negativeMutationCellCount))}`);
    lines.push(`- inheritedDeterministicReplayPassed: ${markdownCode(String(v20.qualitySummary.inheritedProofClosure.deterministicReplayPassed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['reportId', 'artifactPath', 'passed', 'blockingFailures', 'acceptedExclusions'],
      v20.qualitySummary.reportSummaries.map((/** @type {any} */ report) => [
        markdownCode(report.reportId),
        markdownCode(report.artifactPath),
        markdownCode(String(report.passed)),
        report.blockingFailureCount,
        report.acceptedExclusionCount
      ])
    ));
    lines.push('');
    lines.push('### V20 Operator Acceptance Transcript');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.operatorAcceptanceTranscript.reportId)}`);
    lines.push(`- transcriptMode: ${markdownCode(v20.operatorAcceptanceTranscript.transcriptMode)}`);
    lines.push(`- flowCount: ${markdownCode(String(v20.operatorAcceptanceTranscript.flowCount))}`);
    lines.push(`- stepCount: ${markdownCode(String(v20.operatorAcceptanceTranscript.stepCount))}`);
    lines.push(`- passed: ${markdownCode(String(v20.operatorAcceptanceTranscript.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['flowId', 'stepId', 'scenarioId', 'branchMode', 'principal', 'passed'],
      v20.operatorAcceptanceTranscript.steps.map((/** @type {any} */ step) => [
        markdownCode(step.flowId),
        markdownCode(step.stepId),
        markdownCode(step.scenarioId),
        markdownCode(step.branchMode),
        markdownCode(step.projectionPrincipal),
        markdownCode(String(step.passed))
      ])
    ));
    lines.push('');
    lines.push('### V20 Visual Regression Budget');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.visualRegressionReport.reportId)}`);
    lines.push(`- signatureMode: ${markdownCode(v20.visualRegressionReport.signatureMode)}`);
    lines.push(`- screenshotMode: ${markdownCode(v20.visualRegressionReport.screenshotMode)}`);
    lines.push(`- stateCount: ${markdownCode(String(v20.visualRegressionReport.stateCount))}`);
    lines.push(`- passed: ${markdownCode(String(v20.visualRegressionReport.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['stateId', 'scenarioId', 'branchMode', 'principal', 'signatureDigest', 'passed'],
      v20.visualRegressionReport.states.map((/** @type {any} */ state) => [
        markdownCode(state.stateId),
        markdownCode(state.scenarioId),
        markdownCode(state.branchMode),
        markdownCode(state.projectionPrincipal),
        markdownCode(state.signatureDigest),
        markdownCode(String(state.passed))
      ])
    ));
    lines.push('');
    lines.push('### V20 Accessibility Budget');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.accessibilityReport.reportId)}`);
    lines.push(`- engine: ${markdownCode(v20.accessibilityReport.engine)}`);
    lines.push(`- checkCount: ${markdownCode(String(v20.accessibilityReport.checkCount))}`);
    lines.push(`- normalTextContrast: ${markdownCode(String(v20.accessibilityReport.contrastThresholds.normalTextRatio))}`);
    lines.push(`- nonTextUiContrast: ${markdownCode(String(v20.accessibilityReport.contrastThresholds.nonTextUiRatio))}`);
    lines.push(`- passed: ${markdownCode(String(v20.accessibilityReport.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'assertionCount'],
      v20.accessibilityReport.checks.map((/** @type {any} */ check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.assertions.length
      ])
    ));
    lines.push('');
    lines.push('### V20 Performance Budget');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.performanceBudgetReport.reportId)}`);
    lines.push(`- measurementMode: ${markdownCode(v20.performanceBudgetReport.measurementMode)}`);
    lines.push(`- operationCount: ${markdownCode(String(v20.performanceBudgetReport.operationCount))}`);
    lines.push(`- passed: ${markdownCode(String(v20.performanceBudgetReport.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['operationId', 'budgetMs', 'hardGate', 'normalizedElapsedClass', 'passed'],
      v20.performanceBudgetReport.operations.map((/** @type {any} */ operation) => [
        markdownCode(operation.operationId),
        operation.budgetMs === null ? markdownCode('report-only') : operation.budgetMs,
        markdownCode(String(operation.hardGate)),
        markdownCode(operation.normalizedElapsedClass),
        markdownCode(String(operation.passed))
      ])
    ));
    lines.push('');
    lines.push('### V20 Projection Quality Smoke Matrix');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.projectionQualitySmokeMatrix.reportId)}`);
    lines.push(`- matrixMode: ${markdownCode(v20.projectionQualitySmokeMatrix.matrixMode)}`);
    lines.push(`- cellCount: ${markdownCode(String(v20.projectionQualitySmokeMatrix.cellCount))}`);
    lines.push(`- inheritedBrowserMatrixCells: ${markdownCode(String(v20.projectionQualitySmokeMatrix.inheritedBrowserMatrix.cellCount))}`);
    lines.push(`- passed: ${markdownCode(String(v20.projectionQualitySmokeMatrix.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['principal', 'scenarioId', 'rawFiles', 'sourceVisible', 'authVisible', 'qualityRequiresForbidden', 'passed'],
      v20.projectionQualitySmokeMatrix.cells.map((/** @type {any} */ cell) => [
        markdownCode(cell.principal),
        markdownCode(cell.scenarioId),
        markdownCode(String(cell.rawBranchFilesAvailable)),
        markdownCode(String(cell.sourceMaterialVisible)),
        markdownCode(String(cell.authorizationDecisionsVisible)),
        markdownCode(String(cell.qualityChecksDependOnForbiddenSurface)),
        markdownCode(String(cell.passed))
      ])
    ));
    lines.push('');
  }
  if (v21) {
    lines.push('## V21 Specifying Reports');
    lines.push('');
    lines.push('### V21 Generated Specifying Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v21.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V21 Spec-Family Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v21.specFamilyReport.reportId)}`);
    lines.push(`- mode: ${markdownCode(v21.specFamilyReport.mode)}`);
    lines.push(`- currentTarget: ${markdownCode(v21.specFamilyReport.currentTarget)}`);
    lines.push(`- passed: ${markdownCode(String(v21.specFamilyReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v21.specFamilyReport.failureCount))}`);
    lines.push(`- requiredSpecSectionCount: ${markdownCode(String(v21.specFamilyReport.requiredSpecSectionCount))}`);
    lines.push(`- requiredAppendixSectionCount: ${markdownCode(String(v21.specFamilyReport.requiredAppendixSectionCount))}`);
    lines.push(`- requiredProofFamilyCount: ${markdownCode(String(v21.specFamilyReport.requiredProofFamilyCount))}`);
    lines.push(`- requiredSubsystemCoverageCount: ${markdownCode(String(v21.specFamilyReport.requiredSubsystemCoverageCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['requiredFile', 'supportFile'],
      v21.specFamilyReport.requiredFiles.map((/** @type {string} */ file, /** @type {number} */ index) => [
        markdownCode(file),
        markdownCode(v21.specFamilyReport.supportFiles[index] || 'none')
      ])
    ));
    lines.push('');
    lines.push('### V21 Canonical-Input Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v21.canonicalInputReport.reportId)}`);
    lines.push(`- checkedTargetVersion: ${markdownCode(v21.canonicalInputReport.checkedTargetVersion)}`);
    lines.push(`- parityPath: ${markdownCode(String(v21.canonicalInputReport.parityPath || 'missing'))}`);
    lines.push(`- passed: ${markdownCode(String(v21.canonicalInputReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v21.canonicalInputReport.failureCount))}`);
    lines.push(`- requiredGeneratedArtifactCount: ${markdownCode(String(v21.canonicalInputReport.requiredGeneratedArtifactCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['specPath', 'provenPath', 'requiredGeneratedArtifactPaths'],
      [[
        markdownCode(v21.canonicalInputReport.specPath),
        markdownCode(v21.canonicalInputReport.provenPath),
        v21.canonicalInputReport.requiredGeneratedArtifactPaths.map(markdownCode).join(', ')
      ]]
    ));
    lines.push('');
  }
  lines.push('## Proof Family Inventory');
  lines.push('');
  lines.push(renderMarkdownTable(
    ['proofFamily', 'proofArtifactPath', 'memberCount', 'theoremCount', 'witnessArtifactCount', 'replayArtifactCount', 'replayStepCount'],
    data.familySummaries.map((/** @type {any} */ family) => [
      markdownCode(family.proofFamily),
      markdownCode(family.proofArtifactPath),
      family.memberIds.length,
      family.theoremIds.length,
      family.witnessArtifactPaths.length,
      family.replayArtifacts.length,
      family.replaySteps.length
    ])
  ));
  lines.push('');
  lines.push('## Family Details');
  for (const family of data.familySummaries) {
    lines.push('');
    lines.push(`### ${family.proofFamily}`);
    lines.push('');
    lines.push(`- proofArtifactPath: ${markdownCode(family.proofArtifactPath)}`);
    lines.push(`- witnessArtifactPaths: ${family.witnessArtifactPaths.map(markdownCode).join(', ')}`);
    lines.push(`- replayArtifacts: ${family.replayArtifacts.map(markdownCode).join(', ')}`);
    lines.push(`- replayStepIds: ${family.replaySteps.map((/** @type {any} */ entry) => markdownCode(entry.stepId)).join(', ')}`);
    lines.push('');
    lines.push('#### Members');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['memberId', 'passedRuns', 'totalRuns', 'fieldShape', 'failingRuns'],
      family.memberSummaries.map((/** @type {any} */ member) => [
        markdownCode(member.memberId),
        member.passedRuns,
        member.totalRuns,
        member.fieldShape.map(markdownCode).join(', '),
        member.failingRuns.length ? member.failingRuns.map(markdownCode).join(', ') : markdownCode('none')
      ])
    ));
    lines.push('');
    lines.push('#### Theorems');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['theoremId', 'passedRuns', 'totalRuns', 'replayStepIds', 'failureReasons', 'failingRuns'],
      family.theoremSummaries.map((/** @type {any} */ theorem) => [
        markdownCode(theorem.theoremId),
        theorem.passedRuns,
        theorem.totalRuns,
        theorem.replayStepIds.map(markdownCode).join(', '),
        theorem.failureReasons.length ? theorem.failureReasons.map(markdownCode).join(', ') : markdownCode('none'),
        theorem.failingRuns.length ? theorem.failingRuns.map(markdownCode).join(', ') : markdownCode('none')
      ])
    ));
    lines.push('');
    lines.push('#### Replay Steps');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['stepId', 'theoremIds', 'requiredArtifactPaths'],
      family.replaySteps.map((/** @type {any} */ step) => [
        markdownCode(step.stepId),
        step.theoremIds.map(markdownCode).join(', '),
        step.requiredArtifactPaths.map(markdownCode).join(', ')
      ])
    ));
  }
  lines.push('');
  lines.push('## Scenario and Run Matrix');
  lines.push('');
  lines.push(renderMarkdownTable(
    ['scenarioId', 'branchMode', 'needId', 'branchName', 'assetPackId', 'familyCount', 'allFamiliesPassed', 'proofContractPassed', 'requiredArtifactPathCount', 'artifactDigestCount', 'fullyProven'],
    data.runMatrix.map((run) => [
      markdownCode(run.scenarioId),
      markdownCode(run.branchMode),
      markdownCode(run.needId),
      markdownCode(run.branchName),
      markdownCode(run.assetPackId),
      run.familyCount,
      markdownCode(String(run.allFamiliesPassed)),
      markdownCode(String(run.proofContractPassed)),
      run.requiredArtifactPathCount,
      run.artifactDigestCount,
      markdownCode(String(run.fullyProven))
    ])
  ));
  lines.push('');
  lines.push('## Incomplete Verdicts');
  lines.push('');
  if (!data.incompleteVerdicts.length) {
    lines.push('- none');
  } else {
    for (const verdict of data.incompleteVerdicts) {
      lines.push(`- scope=${markdownCode(verdict.scope)} family=${markdownCode(verdict.proofFamily)} id=${markdownCode(verdict.id)} failingRuns=${verdict.failingRuns.map(markdownCode).join(', ') || markdownCode('none')} failureReasons=${verdict.failureReasons.map(markdownCode).join(', ') || markdownCode('none')}`);
    }
  }
  lines.push('');
  lines.push('## Run Details');
  for (const run of data.runDetails) {
    lines.push('');
    lines.push(`### ${run.scenarioId} / ${run.branchMode}`);
    lines.push('');
    lines.push(`- branchName: ${markdownCode(run.branchName)}`);
    lines.push(`- needId: ${markdownCode(run.needId)}`);
    lines.push(`- assetPackId: ${markdownCode(run.assetPackId)}`);
    lines.push(`- proofContractHash: ${markdownCode(run.proofContractHash)}`);
    lines.push(`- allFamiliesPassed: ${markdownCode(String(run.allFamiliesPassed))}`);
    lines.push(`- proofContractPassed: ${markdownCode(String(run.proofContractPassed))}`);
    lines.push('');
    lines.push('#### Family Proof Hashes');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['proofFamily', 'proofHash', 'proofArtifactPath'],
      run.families.map((/** @type {any} */ family) => [markdownCode(family.proofFamily), markdownCode(family.proofHash), markdownCode(family.proofArtifactPath)])
    ));
    lines.push('');
    lines.push('#### Proof Artifact Disclosure Classification');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['path', 'sensitiveDataClass', 'disclosable', 'deliverableConfidentiality', 'potentiallyDisclosable'],
      run.proofArtifacts.map((/** @type {any} */ artifact) => [
        markdownCode(artifact.path),
        markdownCode(String(artifact.classification?.sensitiveDataClass || 'missing')),
        markdownCode(String(artifact.classification?.disclosable === true)),
        markdownCode(String(artifact.deliverable?.confidentialityClass || 'missing')),
        markdownCode(String(artifact.deliverable?.potentiallyDisclosable === true))
      ])
    ));
    lines.push('');
    lines.push('#### Witness Artifact Digest Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['path', 'digest', 'proofFamilies', 'sensitiveDataClass', 'disclosable'],
      run.artifactDigestEntries.map((/** @type {any} */ artifact) => [
        markdownCode(artifact.path),
        markdownCode(artifact.digest),
        artifact.proofFamilies.map(markdownCode).join(', '),
        markdownCode(String(artifact.classification?.sensitiveDataClass || 'missing')),
        markdownCode(String(artifact.classification?.disclosable === true))
      ])
    ));
  }
  lines.push('');
  return `${lines.join('\n')}\n`;
}

/**
 * @param {{
 *   version: string,
 *   canonicalCommit: string,
 *   canonicalCommitRecordedAt?: string | null,
 *   generatedAt: string,
 *   worktreeState?: string,
 *   generatorId?: string,
 *   scenarioIds?: string[],
 *   branchModes?: string[],
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeEngiBranchFn?: typeof runMakeEngiBranch
 * }} input
 * @returns {ReturnType<typeof buildCanonicalProvenData>}
 */
function buildBaseCanonicalProvenData({
  version,
  canonicalCommit,
  canonicalCommitRecordedAt = null,
  generatedAt,
  worktreeState = 'clean',
  generatorId = PROVEN_GENERATOR_ID,
  scenarioIds,
  branchModes = DEFAULT_PROVEN_BRANCH_MODES,
  buildInitialStateFn = buildInitialState,
  runMakeEngiBranchFn = runMakeEngiBranch
}) {
  const collected = collectCanonicalProvenRuns({
    buildInitialStateFn,
    runMakeEngiBranchFn,
    branchModes,
    ...(scenarioIds ? { scenarioIds } : {})
  });
  return buildCanonicalProvenData(collected, {
    version,
    canonicalCommit,
    canonicalCommitRecordedAt,
    generatedAt,
    worktreeState,
    generatorId
  });
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   version: string,
 *   generatedAt: string,
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeEngiBranchFn?: typeof runMakeEngiBranch,
 *   deterministicReplayReport?: any
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV19ProvenPackage(baseData, {
  version,
  generatedAt,
  buildInitialStateFn = buildInitialState,
  runMakeEngiBranchFn = runMakeEngiBranch,
  deterministicReplayReport = null
}) {
  const positiveMatrices = buildV19PositiveMatrices(baseData, {
    version,
    generatedAt,
    buildInitialStateFn,
    runMakeEngiBranchFn
  });
  const reports = buildV19Reports({
    data: baseData,
    positiveMatrices,
    version,
    generatedAt
  });
  const v19 = {
    positiveMatrices,
    ...reports,
    ...(deterministicReplayReport ? { deterministicReplayReport } : {})
  };
  const artifacts = buildV19GeneratedArtifactContents(v19);
  const artifactSummaries = summarizeArtifactContents(artifacts);
  const data = {
    ...baseData,
    v19: {
      ...v19,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && positiveMatrices.fullyProven
        && reports.volatilityInventory.passed
        && reports.negativeMutationMatrix.unexpectedPassCells.length === 0
        && reports.negativeMutationMatrix.unexpectedErrorCells.length === 0
        && reports.contractChangeLedger.passed
        && (!deterministicReplayReport || deterministicReplayReport.passed === true)
    }
  };
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts: buildV19GeneratedArtifactContents(data.v19)
  };
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   version: string,
 *   canonicalCommit: string,
 *   canonicalCommitRecordedAt?: string | null,
 *   generatedAt: string,
 *   worktreeState?: string,
 *   generatorId?: string,
 *   scenarioIds?: string[],
 *   branchModes?: string[],
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeEngiBranchFn?: typeof runMakeEngiBranch
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV19DeterministicProvenPackage(baseData, {
  version,
  canonicalCommit,
  canonicalCommitRecordedAt = null,
  generatedAt,
  worktreeState = 'clean',
  generatorId = PROVEN_GENERATOR_ID,
  scenarioIds,
  branchModes = DEFAULT_PROVEN_BRANCH_MODES,
  buildInitialStateFn = buildInitialState,
  runMakeEngiBranchFn = runMakeEngiBranch
}) {
  const firstPackage = buildV19ProvenPackage(baseData, {
    version,
    generatedAt,
    buildInitialStateFn,
    runMakeEngiBranchFn
  });
  const secondBaseData = buildBaseCanonicalProvenData({
    version,
    canonicalCommit,
    canonicalCommitRecordedAt,
    generatedAt,
    worktreeState,
    generatorId,
    branchModes,
    buildInitialStateFn,
    runMakeEngiBranchFn,
    ...(scenarioIds ? { scenarioIds } : {})
  });
  const secondPackage = buildV19ProvenPackage(secondBaseData, {
    version,
    generatedAt,
    buildInitialStateFn,
    runMakeEngiBranchFn
  });
  const firstReplayArtifacts = {
    [baseData.outputPath]: firstPackage.markdown,
    ...firstPackage.artifacts
  };
  const secondReplayArtifacts = {
    [secondBaseData.outputPath]: secondPackage.markdown,
    ...secondPackage.artifacts
  };
  const deterministicReplayReport = buildV19DeterministicReplayReport({
    version,
    proofSourceCommit: canonicalCommit,
    generatorId,
    generatedAt,
    firstArtifacts: firstReplayArtifacts,
    secondArtifacts: secondReplayArtifacts,
    volatileFieldFindings: firstPackage.data.v19.volatilityInventory.findings
  });
  return buildV19ProvenPackage(baseData, {
    version,
    generatedAt,
    buildInitialStateFn,
    runMakeEngiBranchFn,
    deterministicReplayReport
  });
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   version: string,
 *   generatedAt: string,
 *   inheritedV19: any
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV20ProvenPackage(baseData, {
  version,
  generatedAt,
  inheritedV19
}) {
  const qualityReports = buildV20QualityReports({
    data: baseData,
    version,
    generatedAt,
    proofSourceCommit: baseData.canonicalCommit,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    inheritedV19
  });
  const artifactSummaries = summarizeArtifactContents(buildV20GeneratedArtifactContents(qualityReports));
  const data = {
    ...baseData,
    v19: inheritedV19,
    v20: {
      ...qualityReports,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && inheritedV19?.deterministicReplayReport?.passed === true
        && inheritedV19?.volatilityInventory?.passed === true
        && inheritedV19?.contractChangeLedger?.passed === true
        && qualityReports.qualitySummary.passed === true
    }
  };
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts: buildV20GeneratedArtifactContents(data.v20)
  };
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   inheritedV19: any,
 *   inheritedV20: any
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV21ProvenPackage(baseData, {
  generatedAt,
  inheritedV19,
  inheritedV20
}) {
  const specFamilyReport = buildV21SpecFamilyReport({
    version: 'V21',
    mode: 'draft',
    currentTarget: 'V20'
  });
  const canonicalInputReport = buildV21CanonicalInputReport({
    currentTarget: 'V20'
  });
  const artifacts = buildV21GeneratedArtifactContents({
    version: 'V21',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    specFamilyReport,
    canonicalInputReport
  });
  const artifactSummaries = summarizeArtifactContents(artifacts);
  const data = {
    ...baseData,
    v19: inheritedV19,
    v20: inheritedV20,
    v21: {
      specFamilyReport,
      canonicalInputReport,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && inheritedV19?.deterministicReplayReport?.passed === true
        && inheritedV19?.volatilityInventory?.passed === true
        && inheritedV19?.contractChangeLedger?.passed === true
        && inheritedV20?.qualitySummary?.passed === true
        && specFamilyReport.passed === true
        && canonicalInputReport.passed === true
    }
  };
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts
  };
}

/**
 * @param {{
 *   version: string,
 *   canonicalCommit: string,
 *   canonicalCommitRecordedAt?: string | null,
 *   generatedAt?: string,
 *   worktreeState?: string,
 *   generatorId?: string,
 *   scenarioIds?: string[],
 *   branchModes?: string[],
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeEngiBranchFn?: typeof runMakeEngiBranch
 * }} input
 */
export function generateCanonicalProvenMarkdown({
  version,
  canonicalCommit,
  canonicalCommitRecordedAt = null,
  generatedAt = canonicalCommitRecordedAt || new Date().toISOString(),
  worktreeState = 'clean',
  generatorId = PROVEN_GENERATOR_ID,
  scenarioIds,
  branchModes = DEFAULT_PROVEN_BRANCH_MODES,
  buildInitialStateFn = buildInitialState,
  runMakeEngiBranchFn = runMakeEngiBranch
}) {
  const baseData = buildBaseCanonicalProvenData({
    version,
    canonicalCommit,
    canonicalCommitRecordedAt,
    generatedAt,
    worktreeState,
    generatorId,
    branchModes,
    buildInitialStateFn,
    runMakeEngiBranchFn,
    ...(scenarioIds ? { scenarioIds } : {})
  });
  if (version === 'V19') {
    return buildV19DeterministicProvenPackage(baseData, {
      version,
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeEngiBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
  }
  if (version === 'V20') {
    const inheritedV19BaseData = buildBaseCanonicalProvenData({
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeEngiBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV19Package = buildV19DeterministicProvenPackage(inheritedV19BaseData, {
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeEngiBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    return buildV20ProvenPackage(baseData, {
      version,
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19
    });
  }
  if (version === 'V21') {
    const inheritedV19BaseData = buildBaseCanonicalProvenData({
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeEngiBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV19Package = buildV19DeterministicProvenPackage(inheritedV19BaseData, {
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeEngiBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20BaseData = buildBaseCanonicalProvenData({
      version: 'V20',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeEngiBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20Package = buildV20ProvenPackage(inheritedV20BaseData, {
      version: 'V20',
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19
    });
    return buildV21ProvenPackage(baseData, {
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      inheritedV20: inheritedV20Package.data.v20
    });
  }
  const v18Matrices = version === 'V18'
    ? buildV18Matrices(baseData, {
        version,
        generatedAt,
        buildInitialStateFn,
        runMakeEngiBranchFn
      })
    : null;
  const data = v18Matrices
    ? {
        ...baseData,
        v18Matrices,
        aggregate: {
          ...baseData.aggregate,
          fullyProven: baseData.aggregate.fullyProven && v18Matrices.fullyProven
        }
      }
    : baseData;
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts: {}
  };
}
