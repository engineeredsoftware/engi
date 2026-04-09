// @ts-check

/**
 * @typedef {import('./type-contracts.js').BuiltPromptSurface} BuiltPromptSurface
 * @typedef {import('./type-contracts.js').ParsedCompletionEnvelope} ParsedCompletionEnvelope
 *
 * @typedef {{ artifactId: string, artifactHash: string, envelopeCount: number }} ParsedCompletionEnvelopeArtifact
 * @typedef {{ outputField: string, evaluatorSurface: Record<string, unknown>, fieldProofId?: string | undefined, momentContractId?: string | undefined, evidenceRefs?: string[] | undefined }} InferenceProof
 * @typedef {{ proofHash: string, proofFamilies?: unknown[] | undefined }} ProofWitnessManifestShape
 * @typedef {{ reportHash: string }} ReportHashShape
 * @typedef {{ proofHash: string }} ProofHashShape
 * @typedef {{ proofHash: string, exclusions?: Array<{ assetId: string, exclusionClass?: string | undefined, exclusionReason?: string | undefined }> | undefined }} MaterializationExclusionsShape
 * @typedef {{ bundleId: string, boundedPublicProofHash: string, redactionStatus?: string | undefined, projectionPolicyRef?: string | undefined }} BoundedPublicProofShape
 * @typedef {{ releaseId: string }} PolicyReleaseShape
 * @typedef {{ units: unknown[] }} UnitCatalogShape
 * @typedef {{ selectedSourceMaterial: unknown[] }} SelectedSourceMaterialManifestShape
 * @typedef {{ events: unknown[] }} PipelineTelemetryShape
 * @typedef {{ uploads: unknown[] }} ArtifactUploadManifestShape
 * @typedef {{ profiles: unknown[] }} ProfileCompositionSurfaceShape
 * @typedef {{ interfaces: unknown[] }} ExternalBoundaryManifestShape
 * @typedef {{ modeledBindings: { selectedAssetGithubBindings: unknown[] }, selectedAuthSessions?: Array<{ authSessionId?: string | undefined, authPayloadHash?: string | undefined, permissionsRoot?: string | undefined }> | undefined }} GithubBoundarySurfaceShape
 * @typedef {{ records?: Array<{ zeroCreditParticipating?: boolean | undefined }> | undefined, settlementParticipatingCount?: number | undefined, zeroCreditParticipatingCount?: number | undefined }} SettlementParticipationArtifactShape
 * @typedef {{ bundleId: string, creditedAssetIds?: string[] | undefined, settlementParticipatingAssetIds?: string[] | undefined, zeroCreditAssetIds?: string[] | undefined, sourceToSharesRef?: string | undefined, settlementParticipationRef?: string | undefined }} SettlementPreviewShape
 * @typedef {{ rawShares: unknown, settledShares: unknown, totals: unknown }} JournalDiffShape
 * @typedef {{
 *   assetId: string,
 *   asset: {
 *     title: string,
 *     artifactKind: string,
 *     artifactType?: string | undefined,
 *     contentUnits: unknown[],
 *     uploadSurface?: unknown,
 *     artifactSelectionSurface?: { selectedInventoryRoot?: string | undefined, selectedInventoryEntryIds?: string[] | undefined } | undefined,
 *     addressingSurface?: { addressingRoot?: string | undefined } | undefined,
 *     signingSurface?: { payloadHash?: string | undefined } | undefined,
 *     githubAppAuthSurface?: { authPayloadHash?: string | undefined } | undefined,
 *     githubBoundary?: unknown,
 *     identitySurface?: unknown
 *   },
 *   recall: { recallScore: number, queryRepresentations: Record<string, string> },
 *   ranking: { finalRankingScore: number, explainability?: { strongestScoreDrivers?: unknown } | undefined },
 *   verification?: unknown
 * }} EvaluatedCandidate
 * @typedef {{ assetPackId: string, branchMode: string, acceptedUseTiers: string[], selectedAssets: string[] }} AssetPackShape
 * @typedef {{ assetVerification: Array<{ assetId: string, useTier: string, rights: unknown, verificationSufficiency: { recommendedUseTier: string } }> }} VerificationReportShape
 * @typedef {{ needId: string, fieldDerivations?: Record<string, unknown> | undefined, failingCases?: string[] | undefined, weakDimensions?: string[] | undefined }} NeedShape
 * @typedef {{
 *   scenarioId: string,
 *   scenarioFamily?: string | undefined,
 *   coverageTags?: string[] | undefined,
 *   repo: string,
 *   benchmarkRunId: string,
 *   benchmarkWorkflowPath?: string | undefined,
 *   benchmarkHarnessPath?: string | undefined,
 *   repoContext?: { repoTree?: unknown[] | undefined, stackHints?: string[] | undefined } | undefined,
 *   expectedTargetArtifactKinds?: string[] | undefined,
 *   canonicalRunEvidence?: {
 *     artifacts?: unknown[] | undefined,
 *     checks?: unknown[] | undefined,
 *     extractedOutputs?: {
 *       parserKind?: string | undefined,
 *       failingCases?: string[] | undefined,
 *       weakDimensions?: string[] | undefined
 *     } | undefined
 *   } | undefined
 * }} NeedScenarioShape
 * @typedef {{ needScenarios: NeedScenarioShape[], assets: Array<{ assetId: string }> }} DemoStateShape
 */

import crypto from 'node:crypto';
import { RealizationStage } from './enums.js';
import { PROFILE_A, PROFILE_B } from '../realization-profile.js';

/**
 * @param {unknown} value
 * @returns {string}
 */
function sha256(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

/**
 * @returns {string}
 */
function nowIso() {
  return new Date().toISOString();
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function canonicalJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  const record = /** @type {Record<string, unknown>} */ (value);
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(',')}}`;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function stableHashObject(value) {
  return `sha256:${sha256(canonicalJson(value))}`;
}

/**
 * @param {readonly unknown[]} [values=[]]
 * @returns {string[]}
 */
function summarizeStrings(values = []) {
  return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
}

/**
 * @param {string} proofFamily
 * @param {string} proofArtifactPath
 * @param {Record<string, unknown> | null | undefined} proof
 * @returns {{
 *   proofFamily: string,
 *   proofArtifactPath: string,
 *   proofHash: string | null,
 *   allTheoremsPassed: boolean,
 *   memberIds: string[],
 *   theoremIds: string[],
 *   witnessArtifactPaths: string[],
 *   replayArtifacts: string[],
 *   replaySteps: Array<{ stepId: string, theoremIds: string[], requiredArtifactPaths: string[] }>
 * }}
 */
function buildProofFamilyCatalogEntry(proofFamily, proofArtifactPath, proof) {
  const normalizedProof = /** @type {any} */ (proof || {});
  return {
    proofFamily,
    proofArtifactPath,
    proofHash: normalizedProof['proofHash'] || null,
    allTheoremsPassed: normalizedProof['allTheoremsPassed'] === true,
    memberIds: summarizeStrings((normalizedProof['memberVerdicts'] || []).map((/** @type {any} */ entry, /** @type {number} */ index) => entry?.memberId || entry?.field || `member-${index + 1}`)),
    theoremIds: summarizeStrings((normalizedProof['theoremVerdicts'] || []).map((/** @type {any} */ entry) => entry?.theoremId)),
    witnessArtifactPaths: summarizeStrings(normalizedProof['witnessArtifactPaths'] || []),
    replayArtifacts: summarizeStrings(normalizedProof['replayArtifacts'] || []),
    replaySteps: (normalizedProof['replaySteps'] || []).map((/** @type {any} */ step) => ({
      stepId: String(step?.stepId || ''),
      theoremIds: summarizeStrings(step?.theoremIds || []),
      requiredArtifactPaths: summarizeStrings(step?.requiredArtifactPaths || [])
    }))
  };
}

/**
 * @param {string} stage
 * @param {Record<string, unknown>} [payload={}]
 * @returns {{ eventId: string, stage: string, createdAt: string, profile: string, payload: Record<string, unknown> }}
 */
function telemetryEvent(stage, payload = {}) {
  return {
    eventId: `evt_${sha256(`${stage}:${canonicalJson(payload)}`).slice(0, 12)}`,
    stage,
    createdAt: nowIso(),
    profile: PROFILE_A,
    payload
  };
}

/**
 * @param {string | undefined | null} localBoundary
 * @param {string | undefined | null} externalBoundary
 */
function buildBoundaryDescriptions(localBoundary, externalBoundary) {
  return {
    localBoundary,
    externalBoundary,
    profileABoundary: localBoundary,
    profileBBoundary: externalBoundary
  };
}

/**
 * @param {readonly unknown[]} [values=[]]
 * @returns {Record<string, number>}
 */
function countValues(values = []) {
  /** @type {Record<string, number>} */
  const counts = {};
  for (const value of values) {
    const key = String(value || '').trim();
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

/**
 * @param {{
 *   need: NeedShape,
 *   evaluatedCandidates: EvaluatedCandidate[],
 *   assetPack: AssetPackShape,
 *   selectedCandidates: EvaluatedCandidate[],
 *   verificationReport: VerificationReportShape,
 *   settlementPreview: SettlementPreviewShape,
 *   journalDiff: JournalDiffShape
 * }} input
 */
function buildPipelineTelemetry({ need, evaluatedCandidates, assetPack, selectedCandidates, verificationReport, settlementPreview, journalDiff }) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    events: [
      telemetryEvent('need-measurement', {
        needId: need.needId,
        derivationFields: Object.keys(need.fieldDerivations || {}),
        failingCases: need.failingCases,
        weakDimensions: need.weakDimensions
      }),
      telemetryEvent('content-unit-semantics', {
        assetCount: selectedCandidates.length,
        unitCount: selectedCandidates.reduce((sum, candidate) => sum + candidate.asset.contentUnits.length, 0),
        vectorSpaces: ['task-semantic-space.v8', 'failure-mode-space.v8', 'technical-context-space.v8']
      }),
      telemetryEvent('recall-and-ranking', {
        rankedAssets: evaluatedCandidates.map((candidate) => ({
          assetId: candidate.assetId,
          recallScore: candidate.recall.recallScore,
          finalRankingScore: Number(candidate.ranking.finalRankingScore.toFixed(4)),
          strongestScoreDrivers: candidate.ranking.explainability?.strongestScoreDrivers,
          queryRepresentations: candidate.recall.queryRepresentations
        }))
      }),
      telemetryEvent('verification-and-use-tier', {
        assetVerification: verificationReport.assetVerification.map((entry) => ({
          assetId: entry.assetId,
          useTier: entry.useTier,
          rights: entry.rights,
          recommendedUseTier: entry.verificationSufficiency.recommendedUseTier
        }))
      }),
      telemetryEvent('artifact-materialization', {
        assetPackId: assetPack.assetPackId,
        branchMode: assetPack.branchMode,
        selectedAssets: assetPack.selectedAssets,
        acceptedUseTiers: assetPack.acceptedUseTiers
      }),
      telemetryEvent('settlement-and-shares', {
        bundleId: settlementPreview.bundleId,
        rawShares: journalDiff.rawShares,
        settledShares: journalDiff.settledShares,
        totals: journalDiff.totals
      })
    ]
  };
}

/**
 * @param {InferenceProof[]} inferenceProofs
 * @param {BuiltPromptSurface[]} [promptSurfaces=[]]
 * @param {ParsedCompletionEnvelope[]} [parsedCompletionEnvelopes=[]]
 * @param {ParsedCompletionEnvelopeArtifact | null} [parsedCompletionEnvelopeArtifact=null]
 */
function buildPromptImplementationSurface(
  inferenceProofs,
  promptSurfaces = [],
  parsedCompletionEnvelopes = [],
  parsedCompletionEnvelopeArtifact = null
) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    promptTemplates: promptSurfaces.map((surface) => ({
      promptId: surface.promptId,
      purpose: surface.purpose,
      templateVersion: surface.templateVersion,
      templateHash: surface.promptContract?.templateHash,
      contextSchemaHash: surface.promptContract?.contextSchemaHash,
      outputSchemaHash: surface.promptContract?.outputSchemaHash,
      parseContractId: surface.promptContract?.parseContractId,
      expectedOutputSchema: surface.promptContract?.expectedOutputSchema || [],
      contextInputCount: surface.contextInputs.length,
      downstreamArtifacts: surface.lineage.downstreamArtifacts,
      completenessOk: surface.promptContract?.completeness?.ok ?? false
    })),
    promptLineage: promptSurfaces.map((surface) => ({
      promptId: surface.promptId,
      derivedFrom: surface.lineage.derivedFrom,
      evidenceRefs: surface.lineage.evidenceRefs,
      outputFields: surface.lineage.outputFields,
      downstreamArtifacts: surface.lineage.downstreamArtifacts,
      placeholderSet: surface.promptContract?.placeholderSet || [],
      missingPlaceholderBindings: surface.promptContract?.missingPlaceholderBindings || [],
      nonRenderedContextFields: surface.promptContract?.nonRenderedContextFields || []
    })),
    inferredOutputs: inferenceProofs.map((proof) => ({
      outputField: proof.outputField,
      fieldProofId: proof.fieldProofId || null,
      momentContractId: proof.momentContractId || null,
      evidenceRefs: proof.evidenceRefs || [],
      evaluatorSurface: proof.evaluatorSurface
    })),
    parsedCompletionEnvelopes: parsedCompletionEnvelopes.map((envelope) => ({
      envelopeId: envelope.envelopeId,
      parseContractId: envelope.parseContractId,
      promptId: envelope.promptId,
      ownedOutputFields: envelope.ownedOutputFields,
      payloadHash: envelope.payloadHash,
      envelopeHash: envelope.envelopeHash
    })),
    parsedCompletionEnvelopeArtifact: parsedCompletionEnvelopeArtifact
      ? {
        artifactId: parsedCompletionEnvelopeArtifact.artifactId,
        artifactHash: parsedCompletionEnvelopeArtifact.artifactHash,
        envelopeCount: parsedCompletionEnvelopeArtifact.envelopeCount
      }
      : null,
    ...buildBoundaryDescriptions(
      'Deterministic/local stand-ins emulate prompt/evaluator contracts and replayability metadata.',
      'Production prompt execution, model routing, and remote trace capture remain external.'
    )
  };
}

/**
 * @param {string} needId
 * @param {string} assetPackId
 * @param {InferenceProof[]} inferenceProofs
 * @param {Record<string, unknown>} promptFamilyRegistry
 * @param {unknown[]} inferenceMomentContracts
 * @param {Record<string, unknown>} inferenceSynthesisProof
 * @param {ParsedCompletionEnvelope[]} parsedCompletionEnvelopes
 * @param {ParsedCompletionEnvelopeArtifact | null} parsedCompletionEnvelopeArtifact
 * @param {unknown} assetMeasurementProofs
 * @param {ProofHashShape} selectionConsistencyProof
 * @param {Record<string, unknown>} selectionAndMaterializationProof
 * @param {ProofHashShape} journalCompletenessProof
 * @param {ProofHashShape} identityAuthorizationProof
 * @param {ProofHashShape} sensitiveDataFlowProof
 * @param {Record<string, unknown>} authorizationAndSensitiveFlowProof
 * @param {ProofHashShape} settlementProof
 * @param {Record<string, unknown>} settlementSourceToSharesProof
 * @param {Record<string, unknown>} promptImplementationSurface
 * @param {Record<string, unknown>} promptCompletenessProof
 * @param {ProofHashShape} staticMeasurementProof
 * @param {ProofHashShape} materializationProof
 * @param {MaterializationExclusionsShape} materializationExclusions
 * @param {ProofHashShape} materializationVisibilityProof
 * @param {unknown} verificationReceiptsArtifact
 * @param {Record<string, unknown>} verificationDecisionsProof
 * @param {unknown} sourceToSharesArtifact
 * @param {SettlementParticipationArtifactShape} settlementParticipationArtifact
 * @param {ReportHashShape} accountingPrecisionReport
 * @param {ProofHashShape} redactionProof
 * @param {ProofHashShape} disclosureProof
 * @param {Record<string, unknown>} disclosureBoundaryProof
 * @param {ProofWitnessManifestShape} proofWitnessManifest
 * @param {Record<string, unknown>} proofContract
 */
function buildSystemProofBundle(
  needId,
  assetPackId,
  inferenceProofs,
  promptFamilyRegistry,
  inferenceMomentContracts,
  inferenceSynthesisProof,
  parsedCompletionEnvelopes,
  parsedCompletionEnvelopeArtifact,
  assetMeasurementProofs,
  selectionConsistencyProof,
  selectionAndMaterializationProof,
  journalCompletenessProof,
  identityAuthorizationProof,
  sensitiveDataFlowProof,
  authorizationAndSensitiveFlowProof,
  settlementProof,
  settlementSourceToSharesProof,
  promptImplementationSurface,
  promptCompletenessProof,
  staticMeasurementProof,
  materializationProof,
  materializationExclusions,
  materializationVisibilityProof,
  verificationReceiptsArtifact,
  verificationDecisionsProof,
  sourceToSharesArtifact,
  settlementParticipationArtifact,
  accountingPrecisionReport,
  redactionProof,
  disclosureProof,
  disclosureBoundaryProof,
  proofWitnessManifest,
  proofContract
) {
  const proofFamilies = [
    buildProofFamilyCatalogEntry('inference-synthesis', '.engi/inference-synthesis-proof.json', /** @type {any} */ (inferenceSynthesisProof)),
    buildProofFamilyCatalogEntry('prompt-completeness', '.engi/prompt-completeness-proof.json', /** @type {any} */ (promptCompletenessProof)),
    buildProofFamilyCatalogEntry('static-code-analysis', '.engi/static-measurement-proof.json', /** @type {any} */ (staticMeasurementProof)),
    buildProofFamilyCatalogEntry('verification-decisions', '.engi/verification-decisions-proof.json', /** @type {any} */ (verificationDecisionsProof)),
    buildProofFamilyCatalogEntry('selection-and-materialization', '.engi/selection-and-materialization-proof.json', /** @type {any} */ (selectionAndMaterializationProof)),
    buildProofFamilyCatalogEntry('authorization-and-sensitive-flow', '.engi/authorization-and-sensitive-flow-proof.json', /** @type {any} */ (authorizationAndSensitiveFlowProof)),
    buildProofFamilyCatalogEntry('settlement-source-to-shares', '.engi/settlement-source-to-shares-proof.json', /** @type {any} */ (settlementSourceToSharesProof)),
    buildProofFamilyCatalogEntry('disclosure-boundary', '.engi/disclosure-boundary-proof.json', /** @type {any} */ (disclosureBoundaryProof)),
    buildProofFamilyCatalogEntry('proof-contract', '.engi/proof-contract.json', /** @type {any} */ (proofContract))
  ];
  const verifierReplayArtifacts = summarizeStrings(proofFamilies.flatMap((entry) => entry.replayArtifacts || []));
  const verifierRequiredArtifactPaths = summarizeStrings(proofFamilies.flatMap((entry) => [
    ...(entry.replayArtifacts || []),
    ...((entry.replaySteps || []).flatMap((step) => step.requiredArtifactPaths || []))
  ]));
  return {
    needId,
    assetPackId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    prototypeOnlyModeledControls: true,
    proofContract,
    inferenceProofs,
    promptFamilyRegistry,
    inferenceMomentContracts,
    inferenceSynthesisProof,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    assetMeasurementProofs,
    promptImplementationSurface,
    promptCompletenessProof,
    staticMeasurementProof,
    selectionConsistencyProof,
    selectionAndMaterializationProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    authorizationAndSensitiveFlowProof,
    materializationProof,
    materializationExclusions,
    materializationVisibilityProof,
    verificationReceiptsArtifact,
    verificationDecisionsProof,
    sourceToSharesArtifact,
    settlementParticipationArtifact,
    accountingPrecisionReport,
    redactionProof,
    disclosureProof,
    disclosureBoundaryProof,
    proofWitnessManifest,
    settlementProof,
    settlementSourceToSharesProof,
    proofFamilies,
    verifierEntrypoint: {
      replayArtifacts: verifierReplayArtifacts,
      requiredArtifactPaths: verifierRequiredArtifactPaths,
      proofFamilyReplayCatalog: proofFamilies.map((entry) => ({
        proofFamily: entry.proofFamily,
        theoremIds: entry.theoremIds,
        replayArtifacts: entry.replayArtifacts,
        replaySteps: entry.replaySteps
      })),
      replayInstructions: [
        'Replay inference-synthesis from moment contracts, field proofs, prompt implementation, prompt surfaces, parsed envelopes, and evaluator manifest truth.',
        'Recompute prompt completeness from the prompt family registry, prompt contracts, and parsed envelopes, then compare the proof hash.',
        'Recompute parsed completion envelopes from the prompt contracts and deterministic outputs, then compare the artifact hash.',
        'Recompute code-analysis facts and static heuristics from the code-analysis registries, then resolve all static receipt refs against the receipt artifacts.',
        'Replay verification decision closure from verification receipts into report-facing use-tier consequences.',
        'Recompute selected-vs-materialized-vs-excluded asset sets from the materialization artifacts and compare the proof hashes.',
        'Replay identity authorization and sensitive-data-flow closure from the authorization proof artifacts.',
        'Replay source-to-shares marginal contribution clipping, basis-point normalization, journal completeness, and exact micro-unit allocation from the settlement artifacts.',
        'Replay projection policy, bounded-public proof, redaction, and disclosure alignment.',
        'Replay proof-contract closure across the proof contract, witness manifest, and system proof bundle.'
      ]
    }
  };
}

/**
 * @param {EvaluatedCandidate[]} selectedCandidates
 */
function buildArtifactUploadManifest(selectedCandidates) {
  const uploads = selectedCandidates.map((candidate) => ({
    assetId: candidate.assetId,
    title: candidate.asset.title,
    artifactKind: candidate.asset.artifactKind,
    artifactType: candidate.asset.artifactType,
    uploadSurface: candidate.asset.uploadSurface,
    artifactSelectionSurface: candidate.asset.artifactSelectionSurface,
    selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
    addressingSurface: candidate.asset.addressingSurface,
    addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
    signingSurface: candidate.asset.signingSurface,
    githubAppAuthSurface: candidate.asset.githubAppAuthSurface,
    authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
    githubBoundary: candidate.asset.githubBoundary,
    identitySurface: candidate.asset.identitySurface
  }));
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    uploadCount: uploads.length,
    inventoryBackedUploadCount: uploads.filter((upload) => (upload.artifactSelectionSurface?.selectedInventoryEntryIds || []).length > 0).length,
    artifactKindCounts: countValues(uploads.map((upload) => upload.artifactKind)),
    uploads
  };
}

/**
 * @param {{
 *   branchName: string,
 *   need: NeedShape,
 *   benchmarkTarget: unknown,
 *   depositingSurface: unknown,
 *   needingSurface: unknown,
 *   depositingToNeedingSurface: unknown,
 *   assetPack: AssetPackShape,
 *   assetPackLock: { assets: unknown[] },
 *   settlementPreview: SettlementPreviewShape,
 *   settlementProof: unknown,
 *   selectedSourceMaterialManifest: SelectedSourceMaterialManifestShape,
 *   policyRelease: PolicyReleaseShape,
 *   unitCatalog: UnitCatalogShape,
 *   pipelineTelemetry: PipelineTelemetryShape,
 *   identityBindings: unknown[],
 *   githubBoundarySurface: GithubBoundarySurfaceShape,
 *   artifactUploadManifest: ArtifactUploadManifestShape,
 *   profileCompositionSurface: ProfileCompositionSurfaceShape,
 *   externalBoundaryManifest: ExternalBoundaryManifestShape,
 *   promptFamilyRegistry: Record<string, unknown>,
 *   inferenceMomentContracts: unknown[],
 *   inferenceProofs: InferenceProof[],
 *   promptImplementationSurface: Record<string, unknown>,
 *   promptSurfaces: BuiltPromptSurface[],
 *   parsedCompletionEnvelopeArtifact: ParsedCompletionEnvelopeArtifact | null
 * }} input
 */
function buildDeliverablesManifest({
  branchName,
  need,
  benchmarkTarget,
  depositingSurface,
  needingSurface,
  depositingToNeedingSurface,
  assetPack,
  assetPackLock,
  settlementPreview,
  settlementProof,
  selectedSourceMaterialManifest,
  policyRelease,
  unitCatalog,
  pipelineTelemetry,
  identityBindings,
  githubBoundarySurface,
  artifactUploadManifest,
  profileCompositionSurface,
  externalBoundaryManifest,
  promptFamilyRegistry,
  inferenceMomentContracts,
  inferenceProofs,
  promptImplementationSurface,
  promptSurfaces,
  parsedCompletionEnvelopeArtifact
}) {
  return {
    branchName,
    needId: need.needId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    deliverables: [
      {
        path: '.engi/need.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-branch-derived-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['need-measurement', 'benchmark-parser']
      },
      {
        path: '.engi/need-measurement.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['need-measurement', 'prompt-lineage', 'static-measurement']
      },
      {
        path: '.engi/depositing-surface.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['repo-supply-selection', 'github-binding']
      },
      {
        path: '.engi/needing-surface.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['need-measurement', 'benchmark-parser']
      },
      {
        path: '.engi/depositing-to-needing-surface.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['repo-supply-selection', 'need-measurement', 'asset-pack-assembly']
      },
      {
        path: '.engi/benchmark-target.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'verification-evidence',
        potentiallyDisclosable: false,
        dependsOn: ['benchmark-parser']
      },
      {
        path: '.engi/match-report.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['ranking', 'candidate-recall']
      },
      {
        path: '.engi/verification-report.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'verification-evidence',
        potentiallyDisclosable: false,
        dependsOn: ['verification-determinisms', 'issuer-policy']
      },
      {
        path: '.engi/eval-manifest.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['candidate-recall', 'ranking', 'verification-determinisms', 'prompt-lineage']
      },
      {
        path: '.engi/asset-pack.lock.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['asset-pack-assembly']
      },
      {
        path: '.engi/selected-source-material.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'licensed-source-material',
        potentiallyDisclosable: false,
        dependsOn: ['asset-pack-assembly', 'source-material-binding']
      },
      {
        path: '.engi/authorization-decisions.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['identity-authorization', 'policy-release']
      },
      {
        path: '.engi/sensitive-data-flow.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['sensitive-data-flow', 'policy-release']
      },
      {
        path: '.engi/policy-release.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['policy-release']
      },
      {
        path: '.engi/identity-bindings.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['identity-authorization']
      },
      {
        path: '.engi/github-boundary.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['benchmark-parser', 'github-binding']
      },
      {
        path: '.engi/artifact-upload-manifest.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'licensed-source-material',
        potentiallyDisclosable: false,
        dependsOn: ['artifact-upload', 'content-unit-semantics']
      },
      {
        path: '.engi/profile-composition.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['profile-semantics']
      },
      {
        path: '.engi/prompt-family-registry.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'prompt-completeness']
      },
      {
        path: '.engi/prompt-surfaces.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'model-execution']
      },
      {
        path: '.engi/prompt-contracts.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'prompt-completeness']
      },
      {
        path: '.engi/inference-moment-contracts.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'inference-synthesis']
      },
      {
        path: '.engi/inference-proofs.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'inference-synthesis']
      },
      {
        path: '.engi/inference-synthesis-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'inference-synthesis']
      },
      {
        path: '.engi/prompt-implementation-surface.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'inference-synthesis', 'prompt-completeness']
      },
      {
        path: '.engi/prompt-completeness-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['prompt-lineage', 'prompt-completeness']
      },
      {
        path: '.engi/parsed-completion-envelopes.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'prompt-completeness']
      },
      {
        path: '.engi/code-analysis-fact-registry.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['need-measurement', 'ranking', 'verification']
      },
      {
        path: '.engi/static-heuristics-registry.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['need-measurement', 'ranking', 'verification']
      },
      {
        path: '.engi/external-boundary-manifest.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['github-binding', 'profile-semantics', 'external-boundaries']
      },
      {
        path: '.engi/measurement-receipts.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['static-measurement', 'verification-determinisms']
      },
      {
        path: '.engi/static-measurement-report.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['static-measurement', 'verification-determinisms']
      },
      {
        path: '.engi/static-measurement-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['measurement-receipts', 'static-measurement-report']
      },
      {
        path: '.engi/verification-receipts.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['verification-determinisms', 'issuer-policy']
      },
      {
        path: '.engi/verification-decisions-proof.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['verification-report', 'verification-receipts']
      },
      {
        path: '.engi/selection-consistency-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['asset-pack-assembly', 'selected-source-material']
      },
      {
        path: '.engi/materialization-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['asset-pack.lock', 'selected-source-material', 'materialization-visibility-proof']
      },
      {
        path: '.engi/selection-and-materialization-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['selection-consistency-proof', 'materialization-proof']
      },
      {
        path: '.engi/materialization-exclusions.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['ranking', 'asset-pack-assembly', 'materialization-proof']
      },
      {
        path: '.engi/proof-witness-manifest.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['proof-bundle', 'prompt-completeness', 'verification-determinisms', 'projection-policy']
      },
      {
        path: '.engi/materialization-visibility-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['asset-pack.lock', 'selected-source-material', 'projection-policy']
      },
      {
        path: '.engi/identity-authorization-proof.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['identity-bindings', 'authorization-decisions']
      },
      {
        path: '.engi/sensitive-data-flow-proof.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['sensitive-data-flow', 'policy-release']
      },
      {
        path: '.engi/authorization-and-sensitive-flow-proof.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['identity-authorization-proof', 'sensitive-data-flow-proof']
      },
      {
        path: '.engi/settlement-preview.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'settlement-preview',
        potentiallyDisclosable: false,
        dependsOn: ['asset-shares', RealizationStage.SETTLEMENT]
      },
      {
        path: '.engi/source-to-shares.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['ranking', 'asset-pack.lock', RealizationStage.SETTLEMENT]
      },
      {
        path: '.engi/settlement-participation.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'settlement-preview',
        potentiallyDisclosable: false,
        dependsOn: ['source-to-shares', 'asset-pack.lock', RealizationStage.SETTLEMENT]
      },
      {
        path: '.engi/accounting-precision-report.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['source-to-shares', 'settlement-participation', 'journal-diff']
      },
      {
        path: '.engi/journal-completeness-proof.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['journal-diff', RealizationStage.SETTLEMENT]
      },
      {
        path: '.engi/settlement-proof.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['journal-diff', 'asset-pack.lock']
      },
      {
        path: '.engi/settlement-source-to-shares-proof.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['source-to-shares', 'settlement-participation', 'journal-completeness-proof', 'settlement-proof']
      },
      {
        path: '.engi/journal-diff.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: [RealizationStage.SETTLEMENT, 'asset-pack.lock']
      },
      {
        path: '.engi/system-proof-bundle.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['selection-proof', 'identity-authorization', 'sensitive-data-flow', 'settlement-proof']
      },
      {
        path: '.engi/unit-catalog.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['content-unit-semantics', 'asset-measurement']
      },
      {
        path: '.engi/pipeline-telemetry.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['need-measurement', 'candidate-recall', 'ranking', 'verification', RealizationStage.SETTLEMENT]
      },
      {
        path: '.engi/projection-policy.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['policy-release', 'bounded-public-proof']
      },
      {
        path: '.engi/bounded-public-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['proof-bundle', 'bounded-public-proof']
      },
      {
        path: '.engi/redaction-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['projection-policy', 'bounded-public-proof']
      },
      {
        path: '.engi/disclosure-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['projection-policy', 'bounded-public-proof']
      },
      {
        path: '.engi/disclosure-boundary-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['projection-policy', 'bounded-public-proof', 'redaction-proof', 'disclosure-proof']
      },
      {
        path: '.engi/proof-contract.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['proof-bundle', 'proof-witness-manifest']
      },
      {
        path: '.engi/scenario-fixture-manifest.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['need-measurement', 'profile-semantics']
      },
      {
        path: '.engi/test-coverage-report.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['scenario-fixture-manifest', 'proof-bundle', RealizationStage.SETTLEMENT]
      },
      {
        path: '.engi/deliverables.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['deliverables-manifest', RealizationStage.BRANCH]
      },
      {
        path: 'ENGI_NEED.md',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-branch-derived-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['need.json', 'match-report.json', 'verification-report.json']
      }
    ],
    summary: {
      benchmarkTarget,
      assetPackId: assetPack.assetPackId,
      lockedAssetCount: assetPackLock.assets.length,
      settlementBundleId: settlementPreview.bundleId,
      policyReleaseId: policyRelease.releaseId,
      settlementProofHash: stableHashObject(settlementProof),
      selectedSourceMaterialCount: selectedSourceMaterialManifest.selectedSourceMaterial.length,
      unitCatalogCount: unitCatalog.units.length,
      telemetryEventCount: pipelineTelemetry.events.length,
      identityBindingCount: identityBindings.length,
      uploadCount: artifactUploadManifest.uploads.length,
      githubBindingCount: githubBoundarySurface.modeledBindings.selectedAssetGithubBindings.length,
      profileCount: profileCompositionSurface.profiles.length,
      promptFamilyMemberCount: Array.isArray((/** @type {any} */ (promptFamilyRegistry))?.['promptMembers']) ? (/** @type {any} */ (promptFamilyRegistry))['promptMembers'].length : 0,
      inferenceMomentContractCount: inferenceMomentContracts.length,
      inferenceProofCount: inferenceProofs.length,
      promptSurfaceCount: promptSurfaces.length,
      promptImplementationPromptCount: Array.isArray((/** @type {any} */ (promptImplementationSurface))?.['promptTemplates']) ? (/** @type {any} */ (promptImplementationSurface))['promptTemplates'].length : 0,
      parsedCompletionEnvelopeCount: parsedCompletionEnvelopeArtifact?.envelopeCount || 0,
      externalBoundaryInterfaceCount: externalBoundaryManifest.interfaces.length
    }
  };
}

/**
 * @param {DemoStateShape} state
 * @param {string | null} [activeScenarioId=null]
 */
function buildScenarioFixtureManifest(state, activeScenarioId = null) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    activeScenarioId,
    selectableScenarioCount: state.needScenarios.length,
    candidateAssetCount: state.assets.length,
    fixtureFamilies: [
      'GitHub workflow run envelopes',
      'GitHub artifact manifests',
      'GitHub check suites',
      'Repo trees',
      'Parser outputs',
      'Projection-safe artifact inventories',
      'Cross-language repo slices',
      'Source-to-shares normalization ledgers'
    ],
    scenarioFamilies: state.needScenarios.map((scenario) => ({
      scenarioId: scenario.scenarioId,
      scenarioFamily: scenario.scenarioFamily || 'unspecified',
      coverageTags: scenario.coverageTags || [],
      repo: scenario.repo,
      benchmarkRunId: scenario.benchmarkRunId,
      parserKind: scenario.canonicalRunEvidence?.extractedOutputs?.parserKind || 'github-actions.auth-remediation.v3',
      benchmarkWorkflowPath: scenario.benchmarkWorkflowPath,
      benchmarkHarnessPath: scenario.benchmarkHarnessPath,
      repoTreeSize: scenario.repoContext?.repoTree?.length || 0,
      stackHints: scenario.repoContext?.stackHints || [],
      targetArtifactKinds: scenario.expectedTargetArtifactKinds || [],
      artifactCount: scenario.canonicalRunEvidence?.artifacts?.length || 0,
      checkCount: scenario.canonicalRunEvidence?.checks?.length || 0,
      failingCases: scenario.canonicalRunEvidence?.extractedOutputs?.failingCases || [],
      weakDimensions: scenario.canonicalRunEvidence?.extractedOutputs?.weakDimensions || []
    })),
    negativeFixtures: [
      {
        fixtureId: 'malformed-canonical-benchmark-output',
        expectedOutcome: 'parser validation fails closed before need materialization',
        basedOnScenarioId: 'auth-issuer-rollback'
      },
      {
        fixtureId: 'restricted-or-revoked-issuer-asset',
        expectedOutcome: 'restricted assets never settle and revoked assets reject outright',
        basedOnScenarioId: 'auth-issuer-rollback'
      },
      {
        fixtureId: 'zero-credit-source-to-shares',
        expectedOutcome: 'zero-credit participation remains explicit and receipt-backed',
        basedOnScenarioId: activeScenarioId || state.needScenarios[0]?.scenarioId
      },
      {
        fixtureId: 'polyglot-cross-language-parity-gap',
        expectedOutcome: 'cross-language rollback evidence stays repo-bound and replayable across TypeScript, Python, and Rust slices',
        basedOnScenarioId: 'polyglot-gateway-benchmark-remediation'
      },
      {
        fixtureId: 'many-asset-normalization-ledger',
        expectedOutcome: 'source-to-shares tie-break and normalization ledgers remain deterministic across repeated runs',
        basedOnScenarioId: 'auth-many-asset-normalization'
      }
    ],
    proofHash: stableHashObject({
      activeScenarioId,
      scenarioIds: state.needScenarios.map((scenario) => scenario.scenarioId),
      candidateAssetIds: state.assets.map((asset) => asset.assetId)
    })
  };
}

/**
 * @param {{
 *   state: DemoStateShape,
 *   scenarioFixtureManifest: ReturnType<typeof buildScenarioFixtureManifest>,
 *   activeScenarioId: string | null,
 *   selectedCandidates: EvaluatedCandidate[],
 *   settlementParticipationArtifact: SettlementParticipationArtifactShape | null | undefined
 * }} input
 */
function buildTestCoverageReport({ state, scenarioFixtureManifest, activeScenarioId, selectedCandidates, settlementParticipationArtifact }) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    activeScenarioId,
    declaredCoverageTargets: [
      'layered unit, integration, and e2e validation stays explicit in emitted runtime coverage',
      'prompt completeness mismatches fail closed',
      'static code analysis and verification receipts resolve',
      'projection policy enforces bounded public proof surfaces',
      'proof witness manifest digests proof-relevant artifacts',
      'source-to-shares precision stays replayable through journal settlement',
      'scenario corpus covers GitHub-shaped, privacy, issuer-policy, and deployment stress cases'
    ],
    suiteCoverage: {
      unit: {
        entrypoints: ['test/core.test.js', 'test/proven-generator.test.js'],
        runner: 'node --test',
        validates: [
          'core surface contracts and deterministic invariants',
          'asset-pack, proof, projection, and settlement consistency',
          'canonical appendix generator and proof-family catalog stability',
          'deliverables and branch artifact completeness'
        ]
      },
      integration: {
        entrypoints: ['test/api.test.js', 'test/workflow.integration.test.js'],
        runner: 'node --test',
        validates: [
          'HTTP boundary behavior, malformed input handling, and persistence safety',
          'repo-authenticated deposit to branch-realization workflow composition',
          'projection-sensitive and normalization-heavy multi-step run behavior'
        ]
      },
      e2e: {
        entrypoint: 'test/e2e.test.js',
        runner: 'node --test',
        browserHarness: 'playwright/chromium',
        requiredForDemoCanon: true,
        validates: [
          'canonical panel ordering from repo supply through settlement',
          'repo-authenticated deposit flow to targeted settlement',
          'normalization-heavy scenario switching and source-to-shares visibility'
        ]
      }
    },
    adversarialCoverage: {
      malformedGithubArtifactFixturePresent: scenarioFixtureManifest.negativeFixtures.some((fixture) => fixture.fixtureId === 'malformed-canonical-benchmark-output'),
      privacyBoundaryScenarioPresent: state.needScenarios.some((scenario) => (scenario.coverageTags || []).includes('privacy-boundary') || scenario.scenarioFamily === 'privacy-boundary-stress'),
      proofHeavyScenarioPresent: state.needScenarios.some((scenario) => scenario.scenarioFamily === 'proof-heavy-rust-validator'),
      polyglotRepoScenarioPresent: state.needScenarios.some((scenario) => scenario.scenarioFamily === 'polyglot-repo-benchmark-remediation'),
      manyAssetNormalizationScenarioPresent: state.needScenarios.some((scenario) => scenario.scenarioFamily === 'many-asset-settlement-normalization'),
      manyAssetSettlementCorpusPresent: state.assets.length >= 6,
      zeroCreditParticipationObservedInLatestRun: (settlementParticipationArtifact?.records || []).some((record) => record.zeroCreditParticipating)
    },
    latestRunCoverage: {
      selectedAssetCount: selectedCandidates.length,
      settlementParticipatingCount: settlementParticipationArtifact?.settlementParticipatingCount || 0,
      zeroCreditParticipatingCount: settlementParticipationArtifact?.zeroCreditParticipatingCount || 0,
      scenarioFamilyCount: scenarioFixtureManifest.scenarioFamilies.length,
      coverageTagCount: new Set(state.needScenarios.flatMap((scenario) => scenario.coverageTags || [])).size
    },
    reportHash: stableHashObject({
      activeScenarioId,
      scenarioFamilyCount: scenarioFixtureManifest.scenarioFamilies.length,
      selectedAssetCount: selectedCandidates.length,
      settlementParticipatingCount: settlementParticipationArtifact?.settlementParticipatingCount || 0
    })
  };
}

export {
  buildPipelineTelemetry,
  buildPromptImplementationSurface,
  buildSystemProofBundle,
  buildArtifactUploadManifest,
  buildDeliverablesManifest,
  buildScenarioFixtureManifest,
  buildTestCoverageReport
};
