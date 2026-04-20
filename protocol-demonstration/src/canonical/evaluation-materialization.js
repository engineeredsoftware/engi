// @ts-check
// @ts-nocheck

/**
 * @typedef {import('./type-contracts.js').BuiltPromptSurface} BuiltPromptSurface
 * @typedef {import('./type-contracts.js').ParsedCompletionEnvelope} ParsedCompletionEnvelope
 *
 * @typedef {{ receiptId: string, stageId: string }} StaticExecutionReceipt
 * @typedef {{ evidenceRefs: string[] } & Record<string, unknown>} MeasurementDetailShape
 * @typedef {{ spec: string }} EmbeddingArtifact
 *
 * @typedef {{
 *   parserKind: string,
 *   parserVersion: string,
 *   parserFailureContract: { failClosed: boolean }
 * }} BenchmarkParserContract
 *
 * @typedef {{
 *   needId: string,
 *   repo: string,
 *   benchmarkRunId: string,
 *   benchmarkWorkflowPath: string,
 *   task: string,
 *   failureModes: string[],
 *   constraints: string[],
 *   weakDimensions: string[],
 *   failingCases: string[],
 *   touchedPaths: string[],
 *   extractedSymbols: string[],
 *   configKeys: string[],
 *   stackHints: string[],
 *   targetArtifactKinds: string[],
 *   closureCriteria?: string[] | undefined,
 *   baselineMetrics: Record<string, unknown>,
 *   benchmarkParserContract: BenchmarkParserContract
 * }} NeedShape
 *
 * @typedef {{
 *   symbols: string[],
 *   paths: string[],
 *   configKeys: string[],
 *   stackTags: string[],
 *   constraints: string[]
 * }} CodeAnalysisFacts
 *
 * @typedef {{
 *   taskVector: EmbeddingArtifact,
 *   failureModeVector: EmbeddingArtifact,
 *   technicalContextVector: EmbeddingArtifact
 * }} UnitEmbeddings
 *
 * @typedef {{
 *   unitId: string,
 *   unitHash: string,
 *   unitKind: string,
 *   text: string,
 *   codeAnalysisFacts: CodeAnalysisFacts,
 *   embeddings: UnitEmbeddings
 * }} ContentUnit
 *
 * @typedef {{
 *   summary?: string | undefined,
 *   privateContent?: string | undefined,
 *   tags?: string[] | undefined,
 *   declaredStacks?: string[] | undefined,
 *   declaredConstraints?: string[] | undefined,
 *   sourcePaths?: string[] | undefined,
 *   issuerPolicyStatus?: string | undefined,
 *   sourceCommit?: string | undefined,
 *   sourceRepo?: string | undefined,
 *   organization?: string | undefined
 * }} AssetMetadata
 *
 * @typedef {{
 *   attestationHash?: string | undefined,
 *   signerAddress?: string | undefined,
 *   signatureChecksPass?: boolean | undefined,
 *   signedPayloadHashMatchesContentRoot?: boolean | undefined,
 *   cosignSatisfied?: boolean | undefined
 * }} AttestationShape
 *
 * @typedef {{
 *   repo?: string | undefined,
 *   workflowRunId?: string | undefined,
 *   sourceProvider?: string | undefined,
 *   commit?: string | undefined,
 *   paths?: string[] | undefined,
 *   workflowPath?: string | undefined
 * }} ProvenanceBinding
 *
 * @typedef {{
 *   reproSteps?: string[] | undefined,
 *   pinnedEnvironment?: boolean | undefined,
 *   testsPassed?: boolean | undefined,
 *   benchmarkRan?: boolean | undefined,
 *   typecheckPassed?: boolean | undefined,
 *   staticAnalysisPassed?: boolean | undefined,
 *   benchmarkRunId?: string | undefined,
 *   proofLogs?: string[] | undefined
 * }} VerificationEvidence
 *
 * @typedef {{
 *   mode: string,
 *   materializationRoot: string,
 *   mutableInBranch: boolean,
 *   confidentiality: string
 * }} SourceMaterialBinding
 *
 * @typedef {{
 *   selectedInventoryRoot?: string | undefined,
 *   selectedInventoryEntryIds?: string[] | undefined,
 *   selectedInventoryEntries?: unknown[] | undefined,
 *   selectionLabel?: string | undefined
 * }} ArtifactSelectionSurface
 *
 * @typedef {{ addressingRoot?: string | undefined }} AddressingSurface
 * @typedef {{ authPayloadHash?: string | undefined }} GithubAppAuthSurface
 * @typedef {{ payloadHash?: string | undefined }} SigningSurface
 *
 * @typedef {{
 *   assetId: string,
 *   title: string,
 *   artifactKind: string,
 *   artifactType?: string | undefined,
 *   contentRoot: string,
 *   metadata: AssetMetadata,
 *   contentUnits: ContentUnit[],
 *   verificationEvidence: VerificationEvidence,
 *   attestations: AttestationShape[],
 *   provenanceBinding: ProvenanceBinding,
 *   sourceMaterialBinding: SourceMaterialBinding,
 *   artifactSelectionSurface?: ArtifactSelectionSurface | undefined,
 *   addressingSurface?: AddressingSurface | undefined,
 *   githubAppAuthSurface?: GithubAppAuthSurface | undefined,
 *   signingSurface?: SigningSurface | undefined,
 *   githubBoundary?: Record<string, unknown> | undefined,
 *   identitySurface?: Record<string, unknown> | undefined,
 *   uploadSurface?: Record<string, unknown> | undefined,
 *   assetMeasurement?: { contentUnitSemantics?: unknown[] | undefined } | undefined
 * }} AssetShape
 *
 * @typedef {{
 *   allowed: string[],
 *   restricted: string[],
 *   revoked: string[]
 * }} IssuerPolicyRegistry
 *
 * @typedef {{
 *   issuers: IssuerPolicyRegistry,
 *   issuerHistory: Record<string, { accepted: number, revoked: number }>
 * }} PolicyState
 *
 * @typedef {{
 *   assetId: string,
 *   unitIds: string[],
 *   recallProvenance: Array<Record<string, unknown>>,
 *   queryRepresentations: Record<string, string>,
 *   lexicalTerms: string[],
 *   recallChannelContracts: Array<Record<string, unknown>>,
 *   recallScore: number,
 *   fusion: {
 *     contributingChannels: string[],
 *     totalUnits: number,
 *     maxChannelScore: number,
 *     perChannelCounts: Record<string, number>
 *   }
 * }} RecallEntry
 *
 * @typedef {{
 *   channelId: string,
 *   assetId: string,
 *   unitId: string,
 *   unitKey: string,
 *   score: number,
 *   evidenceRefs: string[],
 *   matchedValues: string[]
 * }} RecallChannelEntry
 *
 * @typedef {{
 *   assetPackId: string,
 *   needId: string,
 *   branchMode: string,
 *   acceptedUseTiers: string[],
 *   selectedAssets: string[]
 * }} AssetPackShape
 *
 * @typedef {{
 *   assetId: string,
 *   asset: AssetShape,
 *   recall: RecallEntry,
  *   githubBoundary?: Record<string, unknown> | undefined,
  *   identitySurface?: Record<string, unknown> | undefined,
  *   uploadSurface?: Record<string, unknown> | undefined,
 *   ranking: Record<string, unknown> & { finalRankingScore: number, needMatch: { finalScore: number }, benchmarkImpact: { finalScore: number }, actionability: { finalScore: number }, scoreGroups?: ScoreGroups | undefined },
 *   verification: CandidateVerification,
  *   useTier: string,
  *   rights: Record<string, unknown>,
 *   measurementProvenance: Array<Record<string, unknown>>,
 *   staticExecutionReceipts: StaticExecutionReceipt[]
 * }} EvaluatedCandidate
 *
 * @typedef {{
 *   taskSemanticFit: number,
 *   failureModeFit: number,
 *   symbolFit: number,
 *   pathFit: number,
 *   stackFit: number,
 *   constraintFit: number,
 *   artifactKindFit: number,
 *   lexicalSupport: number,
 *   finalScore: number,
 *   matchedPaths: string[],
 *   matchedMentionedPaths: string[],
 *   pathFitDetail: Record<string, unknown>,
 *   detail: {
 *     taskSemanticFit: MeasurementDetailShape,
 *     failureModeFit: MeasurementDetailShape,
 *     symbolFit: MeasurementDetailShape,
 *     pathFit: MeasurementDetailShape,
 *     stackFit: MeasurementDetailShape,
 *     constraintFit: MeasurementDetailShape,
 *     artifactKindFit: MeasurementDetailShape,
 *     lexicalSupport: MeasurementDetailShape
 *   }
 * }} NeedMatchShape
 *
 * @typedef {{
 *   likelyImprovesFailingCases: number,
 *   likelyImprovesWeakDimensions: number,
 *   likelyGeneralizesToRepoContext: number,
 *   finalScore: number,
 *   detail: {
 *     likelyImprovesFailingCases: MeasurementDetailShape,
 *     likelyImprovesWeakDimensions: MeasurementDetailShape,
 *     likelyGeneralizesToRepoContext: MeasurementDetailShape
 *   }
 * }} BenchmarkImpactShape
 *
 * @typedef {{
 *   remediationSpecificity: number,
 *   implementationSpecificity: number,
 *   operationalUsability: number,
 *   finalScore: number,
 *   detail: {
 *     remediationSpecificity: MeasurementDetailShape,
 *     implementationSpecificity: MeasurementDetailShape,
 *     operationalUsability: MeasurementDetailShape
 *   }
 * }} ActionabilityShape
 *
 * @typedef {{
 *   claimedEvidence: Record<string, unknown>,
 *   measuredEvidence: Record<string, unknown>,
 *   policyRestrictions: { policyTierCap: string, status: string, additionalRequirements: string[], blockedByPolicy: boolean },
 *   receiptRefs: string[],
 *   missingChecks: string[],
 *   finalUseTier: string
 * }} VerificationDecisionSurface
 *
 * @typedef {{
 *   code: string,
 *   mass: number,
 *   evidenceRefs: string[],
 *   mode: string,
 *   gateInStrictDebug: boolean,
 *   subtractiveOnly: boolean
 * }} RankingPenalty
 *
 * @typedef {{
 *   rankingPenalties: RankingPenalty[],
 *   penaltyMass: number
 * }} PenaltyInfo
 *
 * @typedef {{
 *   hasSignerAddresses: boolean,
 *   signatureChecksPass: boolean,
 *   signedPayloadHashMatchesContentRoot: boolean,
 *   cosignRequirementSatisfied: boolean,
 *   reasons: string[]
 * }} IssuanceVerification
 *
 * @typedef {{
 *   sourceProviderIsGitHub: boolean,
 *   repoBindingPresent: boolean,
 *   commitBindingPresent: boolean,
 *   pathBindingPresent: boolean,
 *   workflowBindingPresent: boolean,
 *   workflowRunVerifiable: boolean,
 *   metadataCoherent: boolean,
 *   contradictions: string[],
 *   reasons: string[]
 * }} ProvenanceVerification
 *
 * @typedef {{
 *   hasTestEvidence: boolean,
 *   hasTypecheckEvidence: boolean,
 *   hasStaticAnalysisEvidence: boolean,
 *   hasBenchmarkEvidence: boolean,
 *   benchmarkEvidenceBoundToGitHubRun: boolean,
 *   hasReproSteps: boolean,
 *   hasPinnedEnvironment: boolean,
 *   scoreTrace: { score: number, thresholdApplied: number },
 *   recommendedUseTier: string,
 *   evidenceCoverage: { matchedNeedRun: boolean, proofLogCount: number, reproStepCount: number },
 *   reasons: string[]
 * }} VerificationSufficiency
 *
 * @typedef {{
 *   issuerKey: string,
 *   status: string,
 *   allowlisted: boolean,
 *   orgBound: boolean,
 *   requiredCosignSatisfied: boolean,
 *   priorAcceptedIssuanceCount: number,
 *   priorRevokedIssuanceCount: number,
 *   policyTierCap: string,
 *   additionalRequirements: string[],
 *   reasons: string[]
 * }} IssuerPolicyStatus
 *
 * @typedef {{
 *   issuanceVerification: IssuanceVerification,
 *   provenanceVerification: ProvenanceVerification,
 *   verificationSufficiency: VerificationSufficiency,
 *   issuerPolicyStatus: IssuerPolicyStatus,
 *   decisionSurface?: VerificationDecisionSurface | undefined
 * }} CandidateVerification
 *
 * @typedef {{
 *   needMatch: {
 *     groupId: string,
 *     finalScore: number,
 *     verifiedInputs: Record<string, unknown>,
 *     sequence: Array<{ step: number, label: string, value: number, refs: string[] }>,
 *     accumulation: Array<Record<string, unknown>>,
 *     references: string[]
 *   },
 *   benchmarkImpact: {
 *     groupId: string,
 *     finalScore: number,
 *     verifiedInputs: Record<string, unknown>,
 *     sequence: Array<{ step: number, label: string, value: number, refs: string[] }>,
 *     accumulation: Array<Record<string, unknown>>,
 *     references: string[]
 *   },
 *   penaltyMass: {
 *     groupId: string,
 *     finalScore: number,
 *     verifiedInputs: Record<string, unknown>,
 *     sequence: Array<{ step: number, label: string, value: number, refs: string[] }>,
 *     accumulation: Array<Record<string, unknown>>,
 *     references: string[]
 *   },
 *   finalRank: { prePenalty: number, penaltyMass: number, finalRankingScore: number }
 * }} ScoreGroups
 *
 * @typedef {{ files: Record<string, string> }} BranchArtifacts
 *
 * @typedef {{
 *   need: NeedShape,
 *   needMeasurement: unknown,
 *   benchmarkTarget: unknown,
 *   branchMode: string,
 *   branchName: string,
 *   depositingSurface: unknown,
 *   needingSurface: unknown,
 *   depositingToNeedingSurface: unknown,
 *   matchReport: unknown,
 *   verificationReport: unknown,
 *   evalManifest: unknown,
 *   assetPack: AssetPackShape,
 *   assetPackLock: unknown,
 *   selectedSourceMaterialManifest: unknown,
 *   settlementPreview: unknown,
 *   settlementProof: unknown,
 *   systemProofBundle: unknown,
 *   authorizationDecisions: unknown,
 *   sensitiveDataFlowRecords: unknown,
 *   policyRelease: { releaseId?: string | undefined, releasePolicyId?: string | undefined } & Record<string, unknown>,
 *   deliverablesManifest: unknown,
 *   unitCatalog: unknown,
 *   pipelineTelemetry: unknown,
 *   selectedCandidates: EvaluatedCandidate[],
 *   journalDiff: {
 *     bundleId: string,
 *     totals: { debited: string, credited: string },
 *     rawShares: Array<{ shareBp: number }>,
 *     credits: Array<{ delta: string }>
 *   } & Record<string, unknown>,
 *   identityBindings: unknown,
 *   githubBoundarySurface: unknown,
 *   artifactUploadManifest: unknown,
 *   profileCompositionSurface: unknown,
 *   promptFamilyRegistry: unknown,
 *   promptSurfaces: BuiltPromptSurface[],
 *   promptContracts: unknown,
 *   inferenceProofs?: unknown,
 *   inferenceMomentContracts?: unknown,
 *   promptImplementationSurface?: unknown,
 *   inferenceSynthesisProof?: unknown,
 *   promptCompletenessProof: unknown,
 *   parsedCompletionEnvelopes: ParsedCompletionEnvelope[],
  *   parsedCompletionEnvelopeArtifact: unknown,
 *   externalBoundaryManifest: unknown,
 *   measurementReceipts: unknown,
 *   staticMeasurementReport: unknown,
 *   staticMeasurementProof: unknown,
 *   codeAnalysisFactRegistry: unknown,
 *   staticHeuristicsRegistry: unknown,
 *   verificationReceiptsArtifact: unknown,
 *   verificationDecisionsProof?: unknown,
 *   proofWitnessManifest: unknown,
 *   selectionConsistencyProof?: unknown,
 *   selectionAndMaterializationProof?: unknown,
 *   identityAuthorizationProof?: unknown,
 *   sensitiveDataFlowProof?: unknown,
 *   authorizationAndSensitiveFlowProof?: unknown,
 *   materializationProof: unknown,
 *   materializationExclusions: unknown,
 *   materializationVisibilityProof: unknown,
  *   sourceToSharesArtifact: unknown,
  *   settlementParticipationArtifact: unknown,
  *   accountingPrecisionReport: unknown,
 *   journalCompletenessProof?: unknown,
 *   settlementSourceToSharesProof?: unknown,
 *   scenarioFixtureManifest: unknown,
  *   testCoverageReport: unknown,
  *   projectionPolicy: unknown,
  *   boundedPublicProof: unknown,
  *   redactionProof: unknown,
 *   disclosureProof: unknown,
 *   disclosureBoundaryProof?: unknown,
 *   proofContract?: unknown
 * }} BuildBranchArtifactsInput
 */

import { buildEvaluatorSurface as evaluatorSurface } from './prompting.js';
import { PROFILE_A, PROFILE_B } from '../realization-profile.js';

/**
 * @param {{
 *   DEFAULT_BRANCH_MODE: string,
 *   DEFAULT_MODEL_ID: string,
 *   RECALL_CHANNEL_BUDGETS: Record<string, number>,
 *   RECALL_CHANNEL_SPECS: Record<string, { signalFamily?: string | undefined }>,
 *   measurementTrace: (mode: 'inferred' | 'static' | 'hybrid', toolOrPromptId: string, evidenceRefs: string[], options?: Record<string, unknown>) => Record<string, unknown>,
 *   buildRecallChannelContracts: () => Array<Record<string, unknown>>,
 *   summarizeStrings: (values?: readonly unknown[]) => string[],
 *   uniqueTokens: (value: string) => string[],
 *   union: (left: string[], right: string[]) => string[],
 *   intersection: (left: string[], right: string[]) => string[],
 *   buildEmbeddingArtifact: (spaceId: string, value: string) => EmbeddingArtifact,
 *   cosineSimilarity: (left: EmbeddingArtifact, right: EmbeddingArtifact) => number,
 *   overlapScore: (left: unknown, right: unknown) => number,
 *   clamp01: (value: number) => number,
 *   summarizeScore: (value: number) => number,
 *   measurementDetail: (input: Record<string, unknown>) => MeasurementDetailShape,
 *   rankingEvidenceRefs: (need: NeedShape, asset: AssetShape, refs: readonly unknown[]) => string[],
 *   CODE_ANALYSIS_CONSUMERS: Record<string, unknown>,
 *   buildStaticExecutionReceipt: (input: Record<string, unknown>) => StaticExecutionReceipt,
 *   countValues: (values: string[]) => Record<string, number>,
 *   sha256: (value: unknown) => string,
 *   stableHashObject: (value: unknown) => string
 * }} input
 * @returns {{
 *   allowedUseTiersForBranchMode: (branchMode?: string) => Set<string>,
 *   useTierRights: (useTier: string, branchMode: string) => Record<string, unknown>,
 *   recallCandidates: (need: NeedShape, assets: AssetShape[]) => RecallEntry[],
 *   evaluateCandidates: (need: NeedShape, assets: AssetShape[], policyState: PolicyState) => EvaluatedCandidate[],
 *   assembleAssetPack: (need: NeedShape, evaluatedCandidates: EvaluatedCandidate[], branchMode?: string) => AssetPackShape & Record<string, unknown>,
 *   buildMatchReport: (need: NeedShape, evaluatedCandidates: EvaluatedCandidate[], assetPack: AssetPackShape) => Record<string, unknown>,
 *   buildVerificationReport: (need: NeedShape, evaluatedCandidates: EvaluatedCandidate[], branchMode?: string) => Record<string, unknown>,
 *   buildVerificationReceiptsArtifact: (need: NeedShape, evaluatedCandidates?: EvaluatedCandidate[]) => Record<string, unknown>,
 *   buildEvalManifest: (need: NeedShape, evaluatedCandidates: EvaluatedCandidate[], promptSurfaces?: BuiltPromptSurface[], parsedCompletionEnvelopes?: ParsedCompletionEnvelope[]) => Record<string, unknown>,
 *   buildAssetPackLock: (assetPack: AssetPackShape, selectedCandidates: EvaluatedCandidate[]) => Record<string, unknown>,
 *   buildSelectedSourceMaterialManifest: (assetPack: AssetPackShape, selectedCandidates: EvaluatedCandidate[]) => Record<string, unknown>,
 *   assertRequiredBranchArtifacts: (branchArtifacts: { files: Record<string, string> }) => void,
 *   buildBranchArtifacts: (input: BuildBranchArtifactsInput) => { branchName: string, branchMode: string, confidentiality: string, files: Record<string, string> }
 * }}
 */
export function createEvaluationMaterializationRuntime({
  DEFAULT_BRANCH_MODE,
  DEFAULT_MODEL_ID,
  RECALL_CHANNEL_BUDGETS,
  RECALL_CHANNEL_SPECS,
  measurementTrace,
  buildRecallChannelContracts,
  summarizeStrings,
  uniqueTokens,
  union,
  intersection,
  buildEmbeddingArtifact,
  cosineSimilarity,
  overlapScore,
  clamp01,
  summarizeScore,
  measurementDetail,
  rankingEvidenceRefs,
  CODE_ANALYSIS_CONSUMERS,
  buildStaticExecutionReceipt,
  countValues,
  sha256,
  stableHashObject
}) {
  /**
   * @param {AssetShape} asset
   * @returns {string[]}
   */
  function buildAssetCorpus(asset) {
    return uniqueTokens([
      asset.title,
      asset.metadata.summary,
      asset.metadata.privateContent,
      ...(asset.metadata.tags || []),
      ...(asset.metadata.declaredStacks || []),
      ...(asset.metadata.declaredConstraints || []),
      ...(asset.metadata.sourcePaths || []),
      ...(asset.contentUnits || []).map((unit) => unit.text)
    ].join(' '));
  }

  /**
   * @param {NeedShape} need
   * @param {AssetShape[]} assets
   * @returns {RecallEntry[]}
   */
  function recallCandidates(need, assets) {
    const queryRepresentations = {
      task: buildEmbeddingArtifact('task-semantic-space.v8', need.task),
      failureModes: buildEmbeddingArtifact('failure-mode-space.v8', need.failureModes.join(' ')),
      technicalContext: buildEmbeddingArtifact('technical-context-space.v8', [
        ...need.touchedPaths,
        ...need.extractedSymbols,
        ...need.configKeys,
        ...need.stackHints
      ].join(' '))
    };
    const lexicalTerms = uniqueTokens([
      need.task,
      ...need.failureModes,
      ...need.constraints,
      ...need.weakDimensions
    ].join(' '));

    const channelEntries = {
      semanticTaskSearch: /** @type {RecallChannelEntry[]} */ ([]),
      failureModeSearch: /** @type {RecallChannelEntry[]} */ ([]),
      technicalContextSearch: /** @type {RecallChannelEntry[]} */ ([]),
      lexicalSearch: /** @type {RecallChannelEntry[]} */ ([]),
      symbolSearch: /** @type {RecallChannelEntry[]} */ ([]),
      pathSearch: /** @type {RecallChannelEntry[]} */ ([]),
      configKeySearch: /** @type {RecallChannelEntry[]} */ ([]),
      artifactKindFilteredSearch: /** @type {RecallChannelEntry[]} */ ([])
    };
    /** @type {Record<string, number>} */
    const channelCounts = {};

    for (const asset of assets) {
      for (const unit of asset.contentUnits) {
        const unitKey = `${asset.assetId}:${unit.unitId}`;
        const lexicalHits = intersection(lexicalTerms, uniqueTokens(unit.text));
        const symbolHits = intersection(need.extractedSymbols, unit.codeAnalysisFacts.symbols);
        const pathHits = intersection(need.touchedPaths, union(asset.metadata.sourcePaths || [], unit.codeAnalysisFacts.paths));
        const configHits = intersection(need.configKeys, unit.codeAnalysisFacts.configKeys);
        const artifactKindMatch = need.targetArtifactKinds.includes(asset.artifactKind) ? 1 : 0;

        channelEntries.semanticTaskSearch.push({
          channelId: 'semanticTaskSearch',
          assetId: asset.assetId,
          unitId: unit.unitId,
          unitKey,
          score: cosineSimilarity(queryRepresentations.task, unit.embeddings.taskVector),
          evidenceRefs: [need.needId, asset.contentRoot, unit.unitHash],
          matchedValues: lexicalHits
        });
        channelEntries.failureModeSearch.push({
          channelId: 'failureModeSearch',
          assetId: asset.assetId,
          unitId: unit.unitId,
          unitKey,
          score: cosineSimilarity(queryRepresentations.failureModes, unit.embeddings.failureModeVector),
          evidenceRefs: [need.needId, ...need.failingCases, unit.unitHash],
          matchedValues: intersection(need.failureModes, uniqueTokens(unit.text))
        });
        channelEntries.technicalContextSearch.push({
          channelId: 'technicalContextSearch',
          assetId: asset.assetId,
          unitId: unit.unitId,
          unitKey,
          score: cosineSimilarity(queryRepresentations.technicalContext, unit.embeddings.technicalContextVector),
          evidenceRefs: [need.needId, ...(asset.metadata.sourcePaths || []), unit.unitHash],
          matchedValues: union(pathHits, configHits)
        });
        channelEntries.lexicalSearch.push({
          channelId: 'lexicalSearch',
          assetId: asset.assetId,
          unitId: unit.unitId,
          unitKey,
          score: lexicalHits.length / Math.max(1, lexicalTerms.length),
          evidenceRefs: [need.needId, unit.unitHash],
          matchedValues: lexicalHits
        });
        channelEntries.symbolSearch.push({
          channelId: 'symbolSearch',
          assetId: asset.assetId,
          unitId: unit.unitId,
          unitKey,
          score: symbolHits.length ? 1 : 0,
          evidenceRefs: [...symbolHits, unit.unitHash],
          matchedValues: symbolHits
        });
        channelEntries.pathSearch.push({
          channelId: 'pathSearch',
          assetId: asset.assetId,
          unitId: unit.unitId,
          unitKey,
          score: pathHits.length ? 1 : 0,
          evidenceRefs: [...pathHits, unit.unitHash],
          matchedValues: pathHits
        });
        channelEntries.configKeySearch.push({
          channelId: 'configKeySearch',
          assetId: asset.assetId,
          unitId: unit.unitId,
          unitKey,
          score: configHits.length ? 1 : 0,
          evidenceRefs: [...configHits, unit.unitHash],
          matchedValues: configHits
        });
        channelEntries.artifactKindFilteredSearch.push({
          channelId: 'artifactKindFilteredSearch',
          assetId: asset.assetId,
          unitId: unit.unitId,
          unitKey,
          score: artifactKindMatch,
          evidenceRefs: [need.needId, asset.assetId, asset.artifactKind],
          matchedValues: artifactKindMatch ? [asset.artifactKind] : []
        });
      }
    }

    const deduped = new Map();
    for (const [channelId, entries] of Object.entries(channelEntries)) {
      const sorted = entries
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score || a.unitKey.localeCompare(b.unitKey))
        .slice(0, RECALL_CHANNEL_BUDGETS[channelId]);
      channelCounts[channelId] = sorted.length;
      for (const entry of sorted) {
        const current = deduped.get(entry.unitKey) || {
          assetId: entry.assetId,
          unitId: entry.unitId,
          recallProvenance: [],
          fusionTrace: {
            channels: [],
            channelScoreMax: 0,
            channelCount: 0
          }
        };
        current.recallProvenance.push({
          channelId,
          signalFamily: RECALL_CHANNEL_SPECS[channelId]?.signalFamily || 'unknown',
          score: summarizeScore(entry.score),
          evidenceRefs: entry.evidenceRefs,
          matchedValues: entry.matchedValues
        });
        current.fusionTrace.channels.push(channelId);
        current.fusionTrace.channelScoreMax = Math.max(current.fusionTrace.channelScoreMax, entry.score);
        current.fusionTrace.channelCount += 1;
        deduped.set(entry.unitKey, current);
      }
    }

    const byAsset = new Map();
    for (const item of deduped.values()) {
      const existing = byAsset.get(item.assetId) || {
        assetId: item.assetId,
        unitIds: [],
        recallProvenance: [],
        recallScore: 0,
        fusion: {
          contributingChannels: [],
          totalUnits: 0,
          maxChannelScore: 0,
          perChannelCounts: channelCounts
        }
      };
      existing.unitIds.push(item.unitId);
      existing.recallProvenance.push(...item.recallProvenance);
      existing.recallScore += item.fusionTrace.channelScoreMax + (item.fusionTrace.channelCount * 0.1);
      existing.fusion.totalUnits += 1;
      existing.fusion.maxChannelScore = Math.max(existing.fusion.maxChannelScore, item.fusionTrace.channelScoreMax);
      existing.fusion.contributingChannels = summarizeStrings(union(existing.fusion.contributingChannels, item.fusionTrace.channels));
      byAsset.set(item.assetId, existing);
    }

    return [...byAsset.values()]
      .map((entry) => ({
        ...entry,
        queryRepresentations: Object.fromEntries(Object.entries(queryRepresentations).map(([key, artifact]) => [key, artifact.spec])),
        lexicalTerms,
        recallChannelContracts: buildRecallChannelContracts(),
        recallScore: Number(entry.recallScore.toFixed(4)),
        fusion: {
          ...entry.fusion,
          maxChannelScore: summarizeScore(entry.fusion.maxChannelScore)
        }
      }))
      .sort((a, b) => b.recallScore - a.recallScore || a.assetId.localeCompare(b.assetId));
  }

  /**
   * @param {NeedShape} need
   * @param {AssetShape} asset
   * @param {RecallEntry} recall
   * @returns {NeedMatchShape}
   */
  function computeNeedMatch(need, asset, recall) {
    const corpus = buildAssetCorpus(asset);
    const unitSignals = asset.contentUnits.flatMap((unit) => [
      ...unit.codeAnalysisFacts.symbols,
      ...unit.codeAnalysisFacts.paths,
      ...unit.codeAnalysisFacts.configKeys,
      ...unit.codeAnalysisFacts.stackTags,
      ...unit.codeAnalysisFacts.constraints
    ]);
    const matchedPaths = intersection(need.touchedPaths, asset.metadata.sourcePaths || []);
    const matchedMentionedPaths = intersection(need.touchedPaths, asset.contentUnits.flatMap((unit) => unit.codeAnalysisFacts.paths));
    const sourcePathPrecision = overlapScore(need.touchedPaths, asset.metadata.sourcePaths || []);
    const mentionedPathSupport = overlapScore(need.touchedPaths, asset.contentUnits.flatMap((unit) => unit.codeAnalysisFacts.paths));
    const subsystemAlignment = clamp01(Math.max(
      overlapScore(need.extractedSymbols, unitSignals),
      overlapScore(need.configKeys, unitSignals),
      overlapScore(need.stackHints, [...(asset.metadata.declaredStacks || []), ...(asset.metadata.tags || [])])
    ));
    const pathFit = clamp01((0.50 * sourcePathPrecision) + (0.25 * mentionedPathSupport) + (0.25 * subsystemAlignment));
    const taskSemanticFit = overlapScore(need.task, corpus);
    const failureModeFit = overlapScore(need.failureModes, corpus);
    const symbolFit = clamp01(Math.max(overlapScore(need.extractedSymbols, unitSignals), overlapScore(need.extractedSymbols, corpus)));
    const stackFit = overlapScore(need.stackHints, [...(asset.metadata.declaredStacks || []), ...(asset.metadata.tags || [])]);
    const constraintFit = clamp01(Math.max(overlapScore(need.constraints, corpus), overlapScore(need.constraints, asset.metadata.declaredConstraints)));
    const artifactKindFit = need.targetArtifactKinds.includes(asset.artifactKind)
      ? 1
      : (asset.artifactKind === 'incident-note' && need.targetArtifactKinds.includes('runbook'))
        ? 0.62
        : (asset.artifactKind === 'mixed' ? 0.72 : 0.18);
    const lexicalSupport = overlapScore(uniqueTokens(need.task).slice(0, 12), corpus);

    const score = (
      0.22 * taskSemanticFit +
      0.18 * failureModeFit +
      0.16 * symbolFit +
      0.10 * pathFit +
      0.10 * stackFit +
      0.12 * constraintFit +
      0.07 * artifactKindFit +
      0.05 * lexicalSupport
    );

    const detail = {
      taskSemanticFit: measurementDetail({
        value: taskSemanticFit,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.need-match.task-semantic-fit.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, [need.task]),
        unitRefs: recall?.unitIds || [],
        explanation: 'Deterministic semantic overlap over task text with recall-conditioned unit support.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.task-semantic-fit.v2']
      }),
      failureModeFit: measurementDetail({
        value: failureModeFit,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.need-match.failure-mode-fit.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.failureModes),
        unitRefs: recall?.unitIds || [],
        explanation: 'Failure-mode fit uses benchmark failing cases, weak dimensions, and recalled unit text.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.failure-mode-fit.v2']
      }),
      symbolFit: measurementDetail({
        value: symbolFit,
        mode: 'static',
        toolOrPromptId: 'ranking.need-match.symbol-fit.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.extractedSymbols),
        unitRefs: recall?.unitIds || [],
        explanation: 'Exact or aliased symbol overlap from extracted repo symbols against asset units.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.symbol-fit.v2']
      }),
      pathFit: measurementDetail({
        value: pathFit,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.need-match.path-fit.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.touchedPaths),
        unitRefs: recall?.unitIds || [],
        explanation: 'Path fit blends provenance-bound source paths, mentioned paths, and subsystem alignment.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.path-fit.v2']
      }),
      stackFit: measurementDetail({
        value: stackFit,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.need-match.stack-fit.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.stackHints),
        unitRefs: recall?.unitIds || [],
        explanation: 'Stack fit normalizes declared stack hints, tags, and inferred technical context.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.stack-fit.v2']
      }),
      constraintFit: measurementDetail({
        value: constraintFit,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.need-match.constraint-fit.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.constraints),
        unitRefs: recall?.unitIds || [],
        explanation: 'Constraint fit checks whether the asset preserves buyer safety and remediation constraints.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.constraint-fit.v2']
      }),
      artifactKindFit: measurementDetail({
        value: artifactKindFit,
        mode: 'static',
        toolOrPromptId: 'ranking.need-match.artifact-kind-fit.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.targetArtifactKinds),
        unitRefs: recall?.unitIds || [],
        explanation: 'Artifact-kind fit keeps need match grounded in the required remediation format.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.artifact-kind-fit.v2']
      }),
      lexicalSupport: measurementDetail({
        value: lexicalSupport,
        mode: 'static',
        toolOrPromptId: 'ranking.need-match.lexical-support.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, uniqueTokens(need.task).slice(0, 12)),
        unitRefs: recall?.unitIds || [],
        explanation: 'Lexical support is retained as a support-only signal, never the primary rank driver.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.lexical-support.v2']
      })
    };

    return {
      taskSemanticFit,
      failureModeFit,
      symbolFit,
      pathFit,
      stackFit,
      constraintFit,
      artifactKindFit,
      lexicalSupport,
      finalScore: clamp01(score),
      matchedPaths,
      matchedMentionedPaths,
      pathFitDetail: {
        sourcePathPrecision: summarizeScore(sourcePathPrecision),
        mentionedPathSupport: summarizeScore(mentionedPathSupport),
        subsystemAlignment: summarizeScore(subsystemAlignment)
      },
      detail
    };
  }

  /**
   * @param {NeedShape} need
   * @param {AssetShape} asset
   * @param {NeedMatchShape} needMatch
   * @param {RecallEntry} recall
   * @returns {BenchmarkImpactShape}
   */
  function computeBenchmarkImpact(need, asset, needMatch, recall) {
    const corpus = buildAssetCorpus(asset);
    const likelyImprovesFailingCases = clamp01(Math.max(overlapScore(need.failingCases, corpus), needMatch.failureModeFit * 0.95));
    const likelyImprovesWeakDimensions = clamp01(Math.max(overlapScore(need.weakDimensions, corpus), (needMatch.taskSemanticFit + needMatch.constraintFit) / 2));
    const likelyGeneralizesToRepoContext = clamp01((needMatch.pathFit * 0.45) + (needMatch.stackFit * 0.30) + (needMatch.constraintFit * 0.25));
    const score = (
      0.45 * likelyImprovesFailingCases +
      0.35 * likelyImprovesWeakDimensions +
      0.20 * likelyGeneralizesToRepoContext
    );

    return {
      likelyImprovesFailingCases,
      likelyImprovesWeakDimensions,
      likelyGeneralizesToRepoContext,
      finalScore: clamp01(score),
      detail: {
        likelyImprovesFailingCases: measurementDetail({
          value: likelyImprovesFailingCases,
          mode: 'hybrid',
          toolOrPromptId: 'ranking.benchmark-impact.failing-cases.v2',
          evidenceRefs: rankingEvidenceRefs(need, asset, need.failingCases),
          unitRefs: recall?.unitIds || [],
          explanation: 'Measures exact failing-case remediation likelihood against benchmark-linked cases.',
          consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.benchmark-impact.failing-cases.v2']
        }),
        likelyImprovesWeakDimensions: measurementDetail({
          value: likelyImprovesWeakDimensions,
          mode: 'hybrid',
          toolOrPromptId: 'ranking.benchmark-impact.weak-dimensions.v2',
          evidenceRefs: rankingEvidenceRefs(need, asset, need.weakDimensions),
          unitRefs: recall?.unitIds || [],
          explanation: 'Measures likely improvement across weak benchmark dimensions, not just single cases.',
          consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.benchmark-impact.weak-dimensions.v2']
        }),
        likelyGeneralizesToRepoContext: measurementDetail({
          value: likelyGeneralizesToRepoContext,
          mode: 'hybrid',
          toolOrPromptId: 'ranking.benchmark-impact.repo-context.v2',
          evidenceRefs: rankingEvidenceRefs(need, asset, need.touchedPaths),
          unitRefs: recall?.unitIds || [],
          explanation: 'Measures whether the candidate generalizes safely to the buyer repo context.',
          consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.benchmark-impact.repo-context.v2']
        })
      }
    };
  }

  /**
   * @param {string} text
   * @returns {number}
   */
  function countImperatives(text) {
    let hits = 0;
    for (const term of ['freeze', 'capture', 'validate', 'restore', 'replay', 'rerun', 'prove', 'ship', 'add', 'reject']) {
      if (String(text).toLowerCase().includes(term)) hits += 1;
    }
    return hits;
  }

  /**
   * @param {NeedShape} need
   * @param {AssetShape} asset
   * @param {NeedMatchShape} needMatch
   * @param {RecallEntry} recall
   * @returns {ActionabilityShape}
   */
  function computeActionability(need, asset, needMatch, recall) {
    const source = `${asset.title}\n${asset.metadata.privateContent}`;
    const remediationSpecificity = clamp01((countImperatives(source) / 8) * 0.7 + needMatch.failureModeFit * 0.3);
    const implementationSpecificity = clamp01(((asset.metadata.sourcePaths?.length || 0) / 3) * 0.45 + ((asset.contentUnits.flatMap((unit) => unit.codeAnalysisFacts.symbols).length) / 10) * 0.25 + ((asset.contentUnits.flatMap((unit) => unit.codeAnalysisFacts.configKeys).length) / 5) * 0.30);
    const operationalUsability = clamp01((asset.verificationEvidence.reproSteps?.length ? 0.45 : 0) + (asset.verificationEvidence.pinnedEnvironment ? 0.20 : 0) + (asset.verificationEvidence.testsPassed ? 0.20 : 0) + (asset.verificationEvidence.benchmarkRan ? 0.15 : 0));
    const score = (
      0.40 * remediationSpecificity +
      0.35 * implementationSpecificity +
      0.25 * operationalUsability
    );

    return {
      remediationSpecificity,
      implementationSpecificity,
      operationalUsability,
      finalScore: clamp01(score),
      detail: {
        remediationSpecificity: measurementDetail({
          value: remediationSpecificity,
          mode: 'hybrid',
          toolOrPromptId: 'ranking.actionability.remediation-specificity.v2',
          evidenceRefs: rankingEvidenceRefs(need, asset, need.failureModes),
          unitRefs: recall?.unitIds || [],
          explanation: 'Measures whether the asset presents concrete corrective steps for the measured need.',
          consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.actionability.remediation-specificity.v2']
        }),
        implementationSpecificity: measurementDetail({
          value: implementationSpecificity,
          mode: 'static',
          toolOrPromptId: 'ranking.actionability.implementation-specificity.v2',
          evidenceRefs: rankingEvidenceRefs(need, asset, asset.metadata.sourcePaths || []),
          unitRefs: recall?.unitIds || [],
          explanation: 'Measures concrete code/config surface area: paths, symbols, config keys, and test targets.',
          consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.actionability.implementation-specificity.v2']
        }),
        operationalUsability: measurementDetail({
          value: operationalUsability,
          mode: 'hybrid',
          toolOrPromptId: 'ranking.actionability.operational-usability.v2',
          evidenceRefs: rankingEvidenceRefs(need, asset, asset.verificationEvidence.reproSteps || []),
          unitRefs: recall?.unitIds || [],
          explanation: 'Measures bounded-scope usability inside a remediation branch and rerun workflow.',
          consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.actionability.operational-usability.v2']
        })
      }
    };
  }

  /**
   * @param {NeedShape} need
   * @param {AssetShape} asset
   * @param {{ needMatch: NeedMatchShape, benchmarkImpact: BenchmarkImpactShape, actionability: ActionabilityShape }} ranking
   * @returns {PenaltyInfo}
   */
  function computePenaltyMass(need, asset, ranking) {
    /** @type {RankingPenalty[]} */
    const penalties = [];
    let penaltyMass = 0;

    /**
     * @param {string} code
     * @param {number} mass
     * @param {string[]} evidenceRefs
     * @param {boolean} [gate=false]
     * @returns {void}
     */
    function addPenalty(code, mass, evidenceRefs, gate = false) {
      penaltyMass += mass;
      penalties.push({
        code,
        mass,
        evidenceRefs,
        mode: code === 'artifact-kind-mismatch' ? 'static' : 'hybrid',
        gateInStrictDebug: gate,
        subtractiveOnly: !gate
      });
    }

    if (ranking.needMatch.artifactKindFit < 0.4) addPenalty('artifact-kind-mismatch', 0.04, [asset.assetId, asset.title]);
    if (ranking.needMatch.pathFit < 0.25 && asset.artifactKind !== 'runbook' && asset.artifactKind !== 'incident-note') addPenalty('repo-context-mismatch', 0.05, [asset.assetId, ...(asset.metadata.sourcePaths || [])], true);
    if (ranking.benchmarkImpact.likelyImprovesFailingCases < 0.35) addPenalty('weak-benchmark-linkage', 0.03, [need.needId, asset.assetId]);
    if (ranking.actionability.implementationSpecificity < 0.30) addPenalty('generic-content', 0.04, [asset.assetId]);
    if (asset.metadata.sourceCommit && asset.metadata.sourceCommit.startsWith('legacy-')) addPenalty('stale-version-mismatch', 0.03, [asset.metadata.sourceCommit]);
    if ((asset.metadata.declaredConstraints || []).includes('public disclosure allowed') && need.constraints.some((constraint) => /private/i.test(constraint))) addPenalty('constraint-conflict', 0.07, [asset.assetId], true);

    return {
      rankingPenalties: penalties,
      penaltyMass: Math.min(0.30, penaltyMass)
    };
  }

  /**
   * @param {AssetShape} asset
   * @returns {IssuanceVerification}
   */
  function checkIssuanceVerification(asset) {
    const attestation = asset.attestations[0] || {};
    /** @type {string[]} */
    const reasons = [];
    const verification = {
      hasSignerAddresses: !!attestation.signerAddress,
      signatureChecksPass: !!attestation.signatureChecksPass,
      signedPayloadHashMatchesContentRoot: !!attestation.signedPayloadHashMatchesContentRoot,
      cosignRequirementSatisfied: !!attestation.cosignSatisfied,
      reasons
    };

    if (!verification.hasSignerAddresses) verification.reasons.push('missing signer binding');
    if (!verification.signatureChecksPass) verification.reasons.push('signature check failed');
    if (!verification.signedPayloadHashMatchesContentRoot) verification.reasons.push('payload hash does not match content root');
    if (!verification.cosignRequirementSatisfied) verification.reasons.push('required cosign missing');
    if (!verification.reasons.length) verification.reasons.push('issuance checks passed');
    return verification;
  }

  /**
   * @param {IssuanceVerification} verification
   * @returns {boolean}
   */
  function shouldRejectIssuance(verification) {
    return !verification.hasSignerAddresses || !verification.signatureChecksPass || !verification.signedPayloadHashMatchesContentRoot;
  }

  /**
   * @param {AssetShape} asset
   * @param {NeedShape} need
   * @returns {ProvenanceVerification}
   */
  function checkProvenanceVerification(asset, need) {
    const provenance = asset.provenanceBinding || {};
    const repoBindingPresent = !!provenance.repo;
    const workflowRunVerifiable = provenance.workflowRunId ? provenance.workflowRunId === need.benchmarkRunId : false;
    /** @type {string[]} */
    const contradictions = [];
    if (provenance.sourceProvider && provenance.sourceProvider !== 'github') contradictions.push('source provider is not GitHub');
    if (repoBindingPresent && provenance.repo !== need.repo) contradictions.push('repo binding does not match buyer repo');
    if (provenance.workflowRunId && !workflowRunVerifiable) contradictions.push('workflow run does not bind to benchmark run');
    if (asset.metadata.sourceRepo && provenance.repo && asset.metadata.sourceRepo !== provenance.repo) contradictions.push('metadata/provenance mismatch');
    /** @type {string[]} */
    const reasons = [];
    const verification = {
      sourceProviderIsGitHub: provenance.sourceProvider === 'github',
      repoBindingPresent,
      commitBindingPresent: !!provenance.commit,
      pathBindingPresent: Array.isArray(provenance.paths) && provenance.paths.length > 0,
      workflowBindingPresent: !!provenance.workflowPath,
      workflowRunVerifiable,
      metadataCoherent: !contradictions.includes('metadata/provenance mismatch'),
      contradictions,
      reasons
    };

    if (!verification.sourceProviderIsGitHub) verification.reasons.push('source provider missing or non-GitHub');
    if (!verification.repoBindingPresent) verification.reasons.push('repo binding missing');
    if (!verification.commitBindingPresent) verification.reasons.push('commit binding missing');
    if (!verification.pathBindingPresent) verification.reasons.push('path binding missing');
    if (!verification.workflowBindingPresent) verification.reasons.push('workflow binding missing');
    if (provenance.workflowRunId && !verification.workflowRunVerifiable) verification.reasons.push('workflow run does not bind to benchmark run');
    if (!verification.metadataCoherent) verification.reasons.push('metadata/provenance mismatch');
    if (!verification.reasons.length) verification.reasons.push('provenance checks passed');
    return verification;
  }

  /**
   * @param {ProvenanceVerification} verification
   * @returns {boolean}
   */
  function shouldRejectProvenance(verification) {
    return (verification.contradictions || []).length > 0;
  }

  /**
   * @param {number} score
   * @returns {string}
   */
  function decideVerificationUseTier(score) {
    if (score < 0.25) return 'insufficient-for-use';
    if (score < 0.60) return 'context-only';
    return 'patch-eligible';
  }

  /**
   * @param {AssetShape} asset
   * @param {NeedShape} need
   * @returns {VerificationSufficiency}
   */
  function checkVerificationSufficiency(asset, need) {
    const evidence = asset.verificationEvidence || {};
    const benchmarkEvidenceBoundToGitHubRun = !!evidence.benchmarkRunId && evidence.benchmarkRunId === need.benchmarkRunId;
    const score = (
      (evidence.testsPassed ? 0.20 : 0) +
      (evidence.typecheckPassed ? 0.15 : 0) +
      (evidence.staticAnalysisPassed ? 0.10 : 0) +
      (evidence.benchmarkRan ? 0.20 : 0) +
      (benchmarkEvidenceBoundToGitHubRun ? 0.15 : 0) +
      (evidence.reproSteps?.length ? 0.10 : 0) +
      (evidence.pinnedEnvironment ? 0.10 : 0)
    );
    const recommendedUseTier = decideVerificationUseTier(score);
    const thresholdApplied = score < 0.25 ? 0.25 : (score < 0.60 ? 0.60 : 1.0);

    /** @type {string[]} */
    const reasons = [];
    const verification = {
      hasTestEvidence: !!evidence.testsPassed,
      hasTypecheckEvidence: !!evidence.typecheckPassed,
      hasStaticAnalysisEvidence: !!evidence.staticAnalysisPassed,
      hasBenchmarkEvidence: !!evidence.benchmarkRan,
      benchmarkEvidenceBoundToGitHubRun,
      hasReproSteps: !!evidence.reproSteps?.length,
      hasPinnedEnvironment: !!evidence.pinnedEnvironment,
      scoreTrace: {
        score: Number(score.toFixed(4)),
        thresholdApplied
      },
      recommendedUseTier,
      evidenceCoverage: {
        matchedNeedRun: benchmarkEvidenceBoundToGitHubRun,
        proofLogCount: evidence.proofLogs?.length || 0,
        reproStepCount: evidence.reproSteps?.length || 0
      },
      reasons
    };

    if (verification.hasTestEvidence) verification.reasons.push('test evidence present');
    if (verification.hasTypecheckEvidence) verification.reasons.push('typecheck evidence present');
    if (verification.hasStaticAnalysisEvidence) verification.reasons.push('static analysis evidence present');
    if (verification.hasBenchmarkEvidence) verification.reasons.push('benchmark evidence present');
    if (verification.benchmarkEvidenceBoundToGitHubRun) verification.reasons.push('benchmark evidence bound to buyer GitHub run');
    if (verification.hasReproSteps) verification.reasons.push('repro steps present');
    if (verification.hasPinnedEnvironment) verification.reasons.push('environment pinned');
    if (!verification.reasons.length) verification.reasons.push('insufficient evidence for branch use');

    return verification;
  }

  /**
   * @param {AssetShape} asset
   * @param {PolicyState} policyState
   * @returns {IssuerPolicyStatus}
   */
  function checkIssuerPolicyStatus(asset, policyState) {
    const issuerKey = asset.attestations[0]?.signerAddress || `issuer:${asset.assetId}`;
    let status = asset.metadata.issuerPolicyStatus || 'unknown';
    if (policyState.issuers.revoked.includes(issuerKey)) status = 'revoked';
    else if (policyState.issuers.restricted.includes(issuerKey)) status = 'restricted';
    else if (policyState.issuers.allowed.includes(issuerKey)) status = 'allowed';
    const history = policyState.issuerHistory[issuerKey] || { accepted: 0, revoked: 0 };
    return {
      issuerKey,
      status,
      allowlisted: status === 'allowed',
      orgBound: !!asset.metadata.organization,
      requiredCosignSatisfied: !!asset.attestations[0]?.cosignSatisfied,
      priorAcceptedIssuanceCount: Math.min(25, history.accepted),
      priorRevokedIssuanceCount: Math.min(25, history.revoked),
      policyTierCap: status === 'restricted' ? 'context-only' : (status === 'unknown' ? 'patch-eligible' : 'settlement-eligible'),
      additionalRequirements: status === 'restricted'
        ? ['extra reviewer approval', 'no settlement participation']
        : status === 'unknown'
          ? ['no automatic settlement upgrade']
          : [],
      reasons: status === 'allowed'
        ? ['issuer allowlisted for settlement-grade use']
        : status === 'restricted'
          ? ['issuer restricted to context or patch analysis without settlement']
          : status === 'revoked'
            ? ['issuer revoked']
            : ['issuer unknown; do not upgrade to settlement eligibility']
    };
  }

  /**
   * @param {IssuerPolicyStatus} status
   * @returns {boolean}
   */
  function shouldRejectIssuerPolicy(status) {
    return status.status === 'revoked';
  }

  /**
   * @param {CandidateVerification} verification
   * @returns {string}
   */
  function decideCandidateUseTier(verification) {
    if (shouldRejectIssuance(verification.issuanceVerification)) return 'reject';
    if (shouldRejectProvenance(verification.provenanceVerification)) return 'reject';
    if (shouldRejectIssuerPolicy(verification.issuerPolicyStatus)) return 'reject';

    const tier = verification.verificationSufficiency.recommendedUseTier;
    if (tier === 'insufficient-for-use') return 'rank-only';
    if (tier === 'context-only') return 'context-only';
    return 'patch-eligible';
  }

  /**
   * @param {string} tier
   * @param {CandidateVerification} verification
   * @returns {string}
   */
  function upgradeToSettlementEligible(tier, verification) {
    if (tier !== 'patch-eligible') return tier;
    const issuerAllowed = verification.issuerPolicyStatus.status === 'allowed';
    if (!shouldRejectIssuance(verification.issuanceVerification) && !shouldRejectProvenance(verification.provenanceVerification) && issuerAllowed) {
      return 'settlement-eligible';
    }
    return tier;
  }

  /**
   * @param {NeedShape} need
   * @param {AssetShape} asset
   * @param {RecallEntry} recall
   * @param {NeedMatchShape} needMatch
   * @param {BenchmarkImpactShape} benchmarkImpact
   * @param {ActionabilityShape} actionability
   * @param {PenaltyInfo} penaltyInfo
   * @param {number} finalRankingScore
   * @returns {ScoreGroups}
   */
  function buildScoreGroups(need, asset, recall, needMatch, benchmarkImpact, actionability, penaltyInfo, finalRankingScore) {
    const running = [];
    let cumulative = 0;
    const steps = [
      { groupId: 'need-match', label: 'Need match', value: needMatch.finalScore, weight: 0.65, refs: rankingEvidenceRefs(need, asset, [need.task, ...need.touchedPaths.slice(0, 3)]) },
      { groupId: 'benchmark-impact', label: 'Benchmark impact', value: benchmarkImpact.finalScore, weight: 0.25, refs: rankingEvidenceRefs(need, asset, [...need.failingCases.slice(0, 3), ...need.weakDimensions.slice(0, 2)]) },
      { groupId: 'actionability', label: 'Actionability', value: actionability.finalScore, weight: 0.10, refs: rankingEvidenceRefs(need, asset, asset.metadata.sourcePaths || []) }
    ];
    for (const step of steps) {
      const contribution = Number((step.value * step.weight).toFixed(4));
      cumulative = Number((cumulative + contribution).toFixed(4));
      running.push({ ...step, contribution, cumulative });
    }
    const penaltyRunning = [];
    let penaltyCumulative = 0;
    for (const penalty of penaltyInfo.rankingPenalties) {
      penaltyCumulative = Number((penaltyCumulative + penalty.mass).toFixed(4));
      penaltyRunning.push({
        code: penalty.code,
        mass: penalty.mass,
        cumulative: penaltyCumulative,
        evidenceRefs: penalty.evidenceRefs
      });
    }
    return {
      needMatch: {
        groupId: 'need-match',
        finalScore: needMatch.finalScore,
        verifiedInputs: {
          task: need.task,
          failureModes: need.failureModes,
          touchedPaths: need.touchedPaths,
          extractedSymbols: need.extractedSymbols,
          configKeys: need.configKeys,
          stackHints: need.stackHints,
          targetArtifactKinds: need.targetArtifactKinds,
          recallUnitIds: recall.unitIds
        },
        sequence: [
          { step: 1, label: 'Task semantic fit', value: needMatch.taskSemanticFit, refs: needMatch.detail['taskSemanticFit'].evidenceRefs },
          { step: 2, label: 'Failure mode fit', value: needMatch.failureModeFit, refs: needMatch.detail['failureModeFit'].evidenceRefs },
          { step: 3, label: 'Symbol fit', value: needMatch.symbolFit, refs: needMatch.detail['symbolFit'].evidenceRefs },
          { step: 4, label: 'Path fit', value: needMatch.pathFit, refs: needMatch.detail['pathFit'].evidenceRefs },
          { step: 5, label: 'Constraint + artifact precision', value: Number(((needMatch.constraintFit + needMatch.artifactKindFit) / 2).toFixed(4)), refs: [...needMatch.detail['constraintFit'].evidenceRefs, ...needMatch.detail['artifactKindFit'].evidenceRefs] }
        ],
        accumulation: running.filter((entry) => entry.groupId === 'need-match'),
        references: rankingEvidenceRefs(need, asset, recall.unitIds)
      },
      benchmarkImpact: {
        groupId: 'benchmark-impact',
        finalScore: benchmarkImpact.finalScore,
        verifiedInputs: { failingCases: need.failingCases, weakDimensions: need.weakDimensions, baselineMetrics: need.baselineMetrics, recallChannels: recall.fusion.contributingChannels },
        sequence: [
          { step: 1, label: 'Improves failing cases', value: benchmarkImpact.likelyImprovesFailingCases, refs: benchmarkImpact.detail['likelyImprovesFailingCases'].evidenceRefs },
          { step: 2, label: 'Improves weak dimensions', value: benchmarkImpact.likelyImprovesWeakDimensions, refs: benchmarkImpact.detail['likelyImprovesWeakDimensions'].evidenceRefs },
          { step: 3, label: 'Generalizes to repo context', value: benchmarkImpact.likelyGeneralizesToRepoContext, refs: benchmarkImpact.detail['likelyGeneralizesToRepoContext'].evidenceRefs }
        ],
        accumulation: running.filter((entry) => entry.groupId === 'benchmark-impact'),
        references: rankingEvidenceRefs(need, asset, [...need.failingCases, ...need.weakDimensions])
      },
      penaltyMass: {
        groupId: 'penalty-mass',
        finalScore: penaltyInfo.penaltyMass,
        verifiedInputs: { penalties: penaltyInfo.rankingPenalties.map((p) => p.code), artifactKind: asset.artifactKind, artifactType: asset.artifactType, sourcePaths: asset.metadata.sourcePaths },
        sequence: penaltyRunning.map((entry, index) => ({ step: index + 1, label: entry.code, value: entry.mass, refs: entry.evidenceRefs })),
        accumulation: penaltyRunning,
        references: rankingEvidenceRefs(need, asset, penaltyInfo.rankingPenalties.flatMap((penalty) => penalty.evidenceRefs || []))
      },
      finalRank: { prePenalty: cumulative, penaltyMass: penaltyInfo.penaltyMass, finalRankingScore }
    };
  }

  /**
   * @param {AssetShape} asset
   * @returns {VerificationDecisionSurface['claimedEvidence']}
   */
  function verificationClaimedEvidence(asset) {
    return {
      signerAddress: asset.attestations?.[0]?.signerAddress || null,
      claimedSourceRepo: asset.provenanceBinding?.repo || null,
      claimedWorkflowRunId: asset.provenanceBinding?.workflowRunId || null,
      declaredSourcePaths: asset.metadata?.sourcePaths || [],
      declaredProofLogs: asset.verificationEvidence?.proofLogs || [],
      declaredReproSteps: asset.verificationEvidence?.reproSteps || []
    };
  }

  /**
   * @param {AssetShape} asset
   * @param {CandidateVerification} verification
   * @returns {VerificationDecisionSurface['measuredEvidence']}
   */
  function verificationMeasuredEvidence(asset, verification) {
    return {
      issuanceChecksPassed: !shouldRejectIssuance(verification.issuanceVerification),
      provenanceChecksPassed: !shouldRejectProvenance(verification.provenanceVerification),
      verificationScore: verification.verificationSufficiency?.scoreTrace?.score ?? 0,
      benchmarkEvidenceBoundToGitHubRun: verification.verificationSufficiency?.benchmarkEvidenceBoundToGitHubRun ?? false,
      matchedProofLogCount: verification.verificationSufficiency?.evidenceCoverage?.proofLogCount ?? 0,
      matchedReproStepCount: verification.verificationSufficiency?.evidenceCoverage?.reproStepCount ?? 0,
      policyStatus: verification.issuerPolicyStatus?.status || 'unknown'
    };
  }

  /**
   * @param {CandidateVerification} verification
   * @returns {VerificationDecisionSurface['policyRestrictions']}
   */
  function verificationPolicyRestrictions(verification) {
    return {
      policyTierCap: verification.issuerPolicyStatus?.policyTierCap || 'rank-only',
      status: verification.issuerPolicyStatus?.status || 'unknown',
      additionalRequirements: verification.issuerPolicyStatus?.additionalRequirements || [],
      blockedByPolicy: verification.issuerPolicyStatus?.status === 'revoked'
    };
  }

  /**
   * @param {{
   *   need: NeedShape,
   *   asset: AssetShape,
   *   verification: CandidateVerification,
   *   useTier: string,
   *   policyState: PolicyState
   * }} input
   * @returns {{ receipts: StaticExecutionReceipt[], decisionSurface: VerificationDecisionSurface }}
   */
  function buildVerificationDecisionReceipts({ need, asset, verification, useTier, policyState }) {
    const claimedEvidence = verificationClaimedEvidence(asset);
    const measuredEvidence = verificationMeasuredEvidence(asset, verification);
    const policyRestrictions = verificationPolicyRestrictions(verification);
    const receiptInputs = {
      needId: need.needId,
      assetId: asset.assetId,
      contentRoot: asset.contentRoot
    };
    const issuanceReceipt = buildStaticExecutionReceipt({
      receiptKind: 'verification-issuance-check',
      stageId: 'verification.issuance-checks.v15',
      toolId: 'verification.issuance-checks.v15',
      inputs: { ...receiptInputs, attestation: asset.attestations?.[0] || null },
      normalizedOutputEnvelope: {
        status: shouldRejectIssuance(verification.issuanceVerification) ? 'fail' : 'pass',
        issuanceVerification: verification.issuanceVerification
      },
      evidenceRefs: [need.needId, asset.assetId, asset.attestations?.[0]?.attestationHash].filter(Boolean),
      replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
    });
    const provenanceReceipt = buildStaticExecutionReceipt({
      receiptKind: 'verification-provenance-check',
      stageId: 'verification.provenance-checks.v15',
      toolId: 'verification.provenance-checks.v15',
      inputs: { ...receiptInputs, provenanceBinding: asset.provenanceBinding, repo: need.repo, benchmarkRunId: need.benchmarkRunId },
      normalizedOutputEnvelope: {
        status: shouldRejectProvenance(verification.provenanceVerification) ? 'fail' : 'pass',
        provenanceVerification: verification.provenanceVerification
      },
      evidenceRefs: [need.repo, need.benchmarkRunId, asset.assetId, ...(asset.metadata?.sourcePaths || [])],
      replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
    });
    const sufficiencyReceipt = buildStaticExecutionReceipt({
      receiptKind: 'verification-sufficiency-check',
      stageId: 'verification.sufficiency-checks.v15',
      toolId: 'verification.sufficiency-checks.v15',
      inputs: { ...receiptInputs, verificationEvidence: asset.verificationEvidence, benchmarkRunId: need.benchmarkRunId },
      normalizedOutputEnvelope: {
        recommendedUseTier: verification.verificationSufficiency.recommendedUseTier,
        verificationSufficiency: verification.verificationSufficiency
      },
      evidenceRefs: [need.needId, asset.assetId, need.benchmarkRunId, ...(asset.verificationEvidence?.reproSteps || [])],
      replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
    });
    const policyReceipt = buildStaticExecutionReceipt({
      receiptKind: 'verification-policy-check',
      stageId: 'verification.issuer-policy-checks.v15',
      toolId: 'verification.issuer-policy-checks.v15',
      inputs: { ...receiptInputs, policyState: policyState?.issuers || {}, issuerStatus: asset.metadata?.issuerPolicyStatus || 'unknown' },
      normalizedOutputEnvelope: {
        status: verification.issuerPolicyStatus.status,
        policyRestrictions,
        finalUseTier: useTier
      },
      evidenceRefs: [asset.attestations?.[0]?.signerAddress, asset.metadata?.issuerPolicyStatus].filter(Boolean),
      replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
    });

    return {
      receipts: [issuanceReceipt, provenanceReceipt, sufficiencyReceipt, policyReceipt],
      decisionSurface: {
        claimedEvidence,
        measuredEvidence,
        policyRestrictions,
        receiptRefs: [issuanceReceipt.receiptId, provenanceReceipt.receiptId, sufficiencyReceipt.receiptId, policyReceipt.receiptId],
        missingChecks: summarizeStrings([
          ...(verification.issuanceVerification?.reasons || []).filter((reason) => !/passed/i.test(reason)),
          ...(verification.provenanceVerification?.reasons || []).filter((reason) => !/passed/i.test(reason)),
          ...(verification.verificationSufficiency?.reasons || []).filter((reason) => !/present|bound/i.test(reason)),
          ...policyRestrictions['additionalRequirements']
        ]),
        finalUseTier: useTier
      }
    };
  }

  /**
   * @param {string} [branchMode=DEFAULT_BRANCH_MODE]
   * @returns {Set<string>}
   */
  function allowedUseTiersForBranchMode(branchMode) {
    return branchMode === 'context'
      ? new Set(['context-only', 'patch-eligible', 'settlement-eligible'])
      : new Set(['patch-eligible', 'settlement-eligible']);
  }

  /**
   * @param {string} useTier
   * @param {string} branchMode
   * @returns {Record<string, unknown>}
   */
  function useTierRights(useTier, branchMode) {
    const allowedTiers = allowedUseTiersForBranchMode(branchMode);
    return {
      useTier,
      branchMode,
      reportVisible: useTier !== 'reject',
      branchMaterializationAllowed: allowedTiers.has(useTier),
      settlementAllowed: useTier === 'settlement-eligible',
      sourceMaterialMode: allowedTiers.has(useTier) ? branchMode : 'not-materialized'
    };
  }

  /**
   * @param {NeedShape} need
   * @param {AssetShape[]} assets
   * @param {PolicyState} policyState
   * @returns {EvaluatedCandidate[]}
   */
  function evaluateCandidates(need, assets, policyState) {
    const recalled = recallCandidates(need, assets);
    const recallByAssetId = new Map(recalled.map((entry) => [entry.assetId, entry]));

    return assets
      .filter((asset) => recallByAssetId.has(asset.assetId))
      .map((asset) => {
        const recall = recallByAssetId.get(asset.assetId);
        if (!recall) {
          throw new Error(`Bitcode recall closure failed for ${asset.assetId}.`);
        }
        const needMatch = computeNeedMatch(need, asset, recall);
        const benchmarkImpact = computeBenchmarkImpact(need, asset, needMatch, recall);
        const actionability = computeActionability(need, asset, needMatch, recall);
        const wholeAssetNeedScore = clamp01((0.72 * needMatch.finalScore) + (0.18 * actionability.implementationSpecificity) + (0.10 * Math.min(1, recall.recallScore / 6)));
        const penaltyInfo = computePenaltyMass(need, asset, { needMatch, benchmarkImpact, actionability });
        const finalRankingScore = clamp01((0.65 * needMatch.finalScore) + (0.25 * benchmarkImpact.finalScore) + (0.10 * actionability.finalScore) - penaltyInfo.penaltyMass);
        /** @type {CandidateVerification} */
        const verification = {
          issuanceVerification: checkIssuanceVerification(asset),
          provenanceVerification: checkProvenanceVerification(asset, need),
          verificationSufficiency: checkVerificationSufficiency(asset, need),
          issuerPolicyStatus: checkIssuerPolicyStatus(asset, policyState)
        };
        let useTier = decideCandidateUseTier(verification);
        if (verification.issuerPolicyStatus.policyTierCap === 'context-only' && useTier === 'patch-eligible') useTier = 'context-only';
        useTier = upgradeToSettlementEligible(useTier, verification);
        const verificationReceipt = buildStaticExecutionReceipt({
          receiptKind: 'verification-static-check',
          stageId: 'verification.determinisms.v15',
          toolId: 'verification.determinisms.v15',
          inputs: {
            needId: need.needId,
            assetId: asset.assetId,
            verificationEvidence: asset.verificationEvidence,
            issuerPolicyStatus: verification.issuerPolicyStatus
          },
          normalizedOutputEnvelope: {
            issuanceVerification: verification.issuanceVerification,
            provenanceVerification: verification.provenanceVerification,
            verificationSufficiency: verification.verificationSufficiency,
            issuerPolicyStatus: verification.issuerPolicyStatus,
            useTier
          },
          evidenceRefs: rankingEvidenceRefs(need, asset, recall.unitIds),
          replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
        });
        const verificationDecision = buildVerificationDecisionReceipts({ need, asset, verification, useTier, policyState });
        verification.decisionSurface = verificationDecision.decisionSurface;

        const scoreGroups = buildScoreGroups(need, asset, recall, needMatch, benchmarkImpact, actionability, penaltyInfo, finalRankingScore);

        return {
          assetId: asset.assetId,
          asset,
          recall,
          githubBoundary: asset.githubBoundary,
          identitySurface: asset.identitySurface,
          uploadSurface: asset.uploadSurface,
          ranking: {
            wholeAssetNeedScore,
            needMatch,
            benchmarkImpact,
            actionability,
            rankingPenalties: penaltyInfo.rankingPenalties,
            penaltyMass: penaltyInfo.penaltyMass,
            finalRankingScore,
            scoreGroups,
            explainability: {
              strongestScoreDrivers: [
                { label: 'taskSemanticFit', value: Number(needMatch.taskSemanticFit.toFixed(4)) },
                { label: 'failureModeFit', value: Number(needMatch.failureModeFit.toFixed(4)) },
                { label: 'likelyImprovesFailingCases', value: Number(benchmarkImpact.likelyImprovesFailingCases.toFixed(4)) },
                { label: 'implementationSpecificity', value: Number(actionability.implementationSpecificity.toFixed(4)) }
              ].sort((a, b) => b.value - a.value),
              penaltiesApplied: penaltyInfo.rankingPenalties.map((penalty) => penalty.code),
              recallFusion: recall.fusion,
              finalRank: scoreGroups.finalRank
            }
          },
          verification,
          useTier,
          rights: useTierRights(useTier, DEFAULT_BRANCH_MODE),
          measurementProvenance: [
            measurementTrace('hybrid', 'ranking.recall-fusion.v2', rankingEvidenceRefs(need, asset, recall.unitIds)),
            measurementTrace('hybrid', 'ranking.need-match.v2', rankingEvidenceRefs(need, asset, recall.unitIds)),
            measurementTrace('hybrid', 'ranking.benchmark-impact.v2', rankingEvidenceRefs(need, asset, recall.unitIds)),
            measurementTrace('hybrid', 'ranking.actionability.v2', rankingEvidenceRefs(need, asset, recall.unitIds)),
            measurementTrace('static', 'verification.determinisms.v2', rankingEvidenceRefs(need, asset, recall.unitIds), { receiptRefs: [verificationReceipt.receiptId] })
          ],
          staticExecutionReceipts: [verificationReceipt, ...verificationDecision.receipts]
        };
      })
      .sort((a, b) => b.ranking.finalRankingScore - a.ranking.finalRankingScore || a.assetId.localeCompare(b.assetId));
  }

  /**
   * @param {NeedShape} need
   * @param {EvaluatedCandidate[]} evaluatedCandidates
   * @param {string} [branchMode=DEFAULT_BRANCH_MODE]
   * @returns {AssetPackShape & Record<string, unknown>}
   */
  function assembleAssetPack(need, evaluatedCandidates, branchMode = DEFAULT_BRANCH_MODE) {
    const allowedTiers = allowedUseTiersForBranchMode(branchMode);

    const selected = evaluatedCandidates
      .filter((candidate) => allowedTiers.has(candidate.useTier))
      .slice(0, 3);

    const selectedAssets = selected.map((candidate) => candidate.assetId);
    const selectedUnits = selected.flatMap((candidate) => candidate.asset.contentUnits.slice(0, 2).map((unit) => unit.unitId));
    const lockedContentRoots = selected.map((candidate) => candidate.asset.contentRoot);
    const lockedAttestationHashes = selected.map((candidate) => candidate.asset.attestations[0]?.attestationHash).filter(Boolean);
    const estimatedBundleScore = Number((selected.reduce((sum, candidate) => sum + candidate.ranking.finalRankingScore, 0) / Math.max(1, selected.length)).toFixed(4));

    return {
      assetPackId: `asset_pack_${sha256(`${need.needId}:${selectedAssets.join(':')}`).slice(0, 12)}`,
      needId: need.needId,
      conformanceProfile: PROFILE_A,
      productionIntentProfile: PROFILE_B,
      selectedAssets,
      selectedUnits,
      lockedContentRoots,
      lockedAttestationHashes,
      estimatedBundleScore,
      branchMode,
      acceptedUseTiers: [...allowedTiers],
      coverage: {
        failingCasesCovered: summarizeStrings(selected.flatMap((candidate) => intersection(need.failingCases, uniqueTokens(String(candidate.asset.metadata.privateContent || ''))))),
        weakDimensionsCovered: summarizeStrings(selected.flatMap((candidate) => intersection(need.weakDimensions, uniqueTokens(String(candidate.asset.metadata.privateContent || ''))))),
        touchedPathsCovered: summarizeStrings(selected.flatMap((candidate) => intersection(need.touchedPaths, candidate.asset.metadata.sourcePaths || [])))
      }
    };
  }

  /**
   * @param {NeedShape} need
   * @param {EvaluatedCandidate[]} evaluatedCandidates
   * @param {AssetPackShape} assetPack
   * @returns {Record<string, unknown>}
   */
  function buildMatchReport(need, evaluatedCandidates, assetPack) {
    const selectedSet = new Set(assetPack.selectedAssets);
    return {
      needId: need.needId,
      conformanceProfile: PROFILE_A,
      productionIntentProfile: PROFILE_B,
      branchMode: assetPack.branchMode,
      selectedAssets: evaluatedCandidates
        .filter((candidate) => selectedSet.has(candidate.assetId))
        .map((candidate) => ({
          assetId: candidate.assetId,
          finalRankingScore: Number(candidate.ranking.finalRankingScore.toFixed(4)),
          useTier: candidate.useTier,
          rights: useTierRights(candidate.useTier, assetPack.branchMode),
          reasons: [
            `needMatch=${candidate.ranking.needMatch.finalScore.toFixed(4)}`,
            `benchmarkImpact=${candidate.ranking.benchmarkImpact.finalScore.toFixed(4)}`,
            `actionability=${candidate.ranking.actionability.finalScore.toFixed(4)}`
          ]
        })),
      rejectedAssets: evaluatedCandidates
        .filter((candidate) => !selectedSet.has(candidate.assetId))
        .map((candidate) => ({
          assetId: candidate.assetId,
          useTier: candidate.useTier,
          rights: useTierRights(candidate.useTier, assetPack.branchMode),
          rejectionReason: `Not materialized into ${assetPack.branchMode} branch at tier ${candidate.useTier}.`
        }))
    };
  }

  /**
   * @param {NeedShape} need
   * @param {EvaluatedCandidate[]} evaluatedCandidates
   * @param {string} [branchMode=DEFAULT_BRANCH_MODE]
   * @returns {Record<string, unknown>}
   */
  function buildVerificationReport(need, evaluatedCandidates, branchMode = DEFAULT_BRANCH_MODE) {
    const assetVerification = evaluatedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      title: candidate.asset.title,
      issuanceVerification: candidate.verification.issuanceVerification,
      provenanceVerification: candidate.verification.provenanceVerification,
      verificationSufficiency: candidate.verification.verificationSufficiency,
      issuerPolicyStatus: candidate.verification.issuerPolicyStatus,
      verificationDecisionSurface: candidate.verification.decisionSurface,
      claimedEvidence: candidate.verification.decisionSurface?.claimedEvidence || {},
      measuredEvidence: candidate.verification.decisionSurface?.measuredEvidence || {},
      policyRestrictions: candidate.verification.decisionSurface?.policyRestrictions || {},
      useTier: candidate.useTier,
      rights: useTierRights(candidate.useTier, branchMode),
      receiptRefs: summarizeStrings((candidate.staticExecutionReceipts || []).filter((receipt) => receipt.stageId.startsWith('verification.')).map((receipt) => receipt.receiptId))
    }));
    return {
      needId: need.needId,
      conformanceProfile: PROFILE_A,
      productionIntentProfile: PROFILE_B,
      branchMode,
      assetVerification,
      verificationReceiptCount: assetVerification.reduce((sum, entry) => sum + entry.receiptRefs.length, 0),
      verificationFamilies: ['issuance', 'provenance', 'sufficiency', 'issuer-policy', 'use-tier-consequence']
    };
  }

  /**
   * @param {NeedShape} need
   * @param {EvaluatedCandidate[]} [evaluatedCandidates=[]]
   * @returns {Record<string, unknown>}
   */
  function buildVerificationReceiptsArtifact(need, evaluatedCandidates = []) {
    return {
      needId: need.needId,
      conformanceProfile: PROFILE_A,
      productionIntentProfile: PROFILE_B,
      verificationReceipts: evaluatedCandidates.flatMap((candidate) => (candidate.staticExecutionReceipts || []).filter((receipt) => receipt.stageId.startsWith('verification.'))),
      verificationDecisionSurfaces: evaluatedCandidates.map((candidate) => ({
        assetId: candidate.assetId,
        title: candidate.asset.title,
        useTier: candidate.useTier,
        ...(candidate.verification.decisionSurface || {})
      }))
    };
  }

  /**
   * @param {NeedShape} need
   * @param {EvaluatedCandidate[]} evaluatedCandidates
   * @param {BuiltPromptSurface[]} [promptSurfaces=[]]
   * @param {ParsedCompletionEnvelope[]} [parsedCompletionEnvelopes=[]]
   * @returns {Record<string, unknown>}
   */
  function buildEvalManifest(need, evaluatedCandidates, promptSurfaces = [], parsedCompletionEnvelopes = []) {
    const evaluatorInterfaces = [
      evaluatorSurface({ evaluatorId: 'need-measurement.task.v2', evaluatorKind: 'inferred-evaluator', measurementClass: 'inferred-measurement', mode: 'inferred', promptId: 'need-measurement.task.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId, need.benchmarkRunId], standIn: true }),
      evaluatorSurface({ evaluatorId: 'need-measurement.failure-modes.v2', evaluatorKind: 'inferred-evaluator', measurementClass: 'inferred-measurement', mode: 'inferred', promptId: 'need-measurement.failure-modes.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: true }),
      evaluatorSurface({ evaluatorId: 'need-measurement.constraints.v2', evaluatorKind: 'inferred-evaluator', measurementClass: 'inferred-measurement', mode: 'inferred', promptId: 'need-measurement.constraints.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: true }),
      evaluatorSurface({ evaluatorId: 'need-measurement.target-artifact-kinds.v2', evaluatorKind: 'inferred-evaluator', measurementClass: 'inferred-measurement', mode: 'inferred', promptId: 'need-measurement.target-artifact-kinds.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: true }),
      evaluatorSurface({ evaluatorId: 'need-measurement.closure-criteria.v2', evaluatorKind: 'inferred-evaluator', measurementClass: 'inferred-measurement', mode: 'inferred', promptId: 'need-measurement.closure-criteria.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: true }),
      evaluatorSurface({ evaluatorId: 'candidate-recall.hybrid.v2', evaluatorKind: 'hybrid-pipeline-stage', measurementClass: 'hybrid-evaluation', mode: 'hybrid', toolId: 'candidate-recall.hybrid.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: true }),
      evaluatorSurface({ evaluatorId: 'verification.determinisms.v2', evaluatorKind: 'deterministic-static-command', measurementClass: 'static-analysis', mode: 'static', toolId: 'verification.determinisms.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: false })
    ];

    return {
      needId: need.needId,
      benchmarkRunId: need.benchmarkRunId,
      promptsVersion: 'spec-v15-demo-deterministic.v1',
      modelsUsed: [DEFAULT_MODEL_ID],
      deterministicFeatureVersion: 'spec-v15-demo-static.v1',
      evaluatorInterfaces,
      evaluatorBoundaryNotes: {
        profileA: 'Deterministic/local stand-ins satisfy the evaluator and embedding contracts for demo use.',
        profileB: 'Real embedding providers, prompt execution, and external evaluator services can replace the stand-ins without changing artifact schema.'
      },
      vectorSpaces: ['task-semantic-space.v8', 'failure-mode-space.v8', 'technical-context-space.v8'],
      promptSurfaces,
      promptContracts: promptSurfaces.map((surface) => surface.promptContract),
      parsedCompletionEnvelopes,
      evaluatorsUsed: evaluatorInterfaces.map((entry) => entry.evaluatorId),
      assetMeasurementProvenance: evaluatedCandidates.map((candidate) => ({
        assetId: candidate.assetId,
        provenance: candidate.measurementProvenance,
        contentUnitSemantics: candidate.asset.assetMeasurement?.contentUnitSemantics || []
      }))
    };
  }

  /**
   * @param {AssetPackShape} assetPack
   * @param {EvaluatedCandidate[]} selectedCandidates
   * @returns {Record<string, unknown>}
   */
  function buildAssetPackLock(assetPack, selectedCandidates) {
    return {
      assetPackId: assetPack.assetPackId,
      needId: assetPack.needId,
      conformanceProfile: PROFILE_A,
      productionIntentProfile: PROFILE_B,
      branchMode: assetPack.branchMode,
      acceptedUseTiers: assetPack.acceptedUseTiers,
      assets: selectedCandidates.map((candidate) => ({
        assetId: candidate.assetId,
        contentRoot: candidate.asset.contentRoot,
        attestationHash: candidate.asset.attestations[0]?.attestationHash,
        useTier: candidate.useTier,
        sourceMaterialBinding: candidate.asset.sourceMaterialBinding,
        selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
        addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
        authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
        signedPayloadHash: candidate.asset.signingSurface?.payloadHash,
        selectedInventoryEntryIds: candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || []
      })),
      units: selectedCandidates.flatMap((candidate) => candidate.asset.contentUnits.slice(0, 2).map((unit) => ({
        assetId: candidate.assetId,
        unitId: unit.unitId,
        unitHash: unit.unitHash
      }))),
      selectedSourceMaterial: selectedCandidates.map((candidate) => ({
        assetId: candidate.assetId,
        selectedUnitIds: candidate.asset.contentUnits.slice(0, 2).map((unit) => unit.unitId),
        materializationRoot: candidate.asset.sourceMaterialBinding.materializationRoot,
        mutableInBranch: candidate.asset.sourceMaterialBinding.mutableInBranch,
        confidentiality: candidate.asset.sourceMaterialBinding.confidentiality,
        selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
        addressingRoot: candidate.asset.addressingSurface?.addressingRoot
      }))
    };
  }

  /**
   * @param {AssetPackShape} assetPack
   * @param {EvaluatedCandidate[]} selectedCandidates
   * @returns {Record<string, unknown>}
   */
  function buildSelectedSourceMaterialManifest(assetPack, selectedCandidates) {
    return {
      assetPackId: assetPack.assetPackId,
      branchMode: assetPack.branchMode,
      conformanceProfile: PROFILE_A,
      productionIntentProfile: PROFILE_B,
      selectedSourceMaterial: selectedCandidates.map((candidate) => ({
        assetId: candidate.assetId,
        title: candidate.asset.title,
        useTier: candidate.useTier,
        artifactKind: candidate.asset.artifactKind,
        sourceMaterialBinding: candidate.asset.sourceMaterialBinding,
        rights: useTierRights(candidate.useTier, assetPack.branchMode),
        selectionLabel: candidate.asset.artifactSelectionSurface?.selectionLabel,
        selectedInventoryEntryIds: candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || [],
        selectedInventoryEntries: candidate.asset.artifactSelectionSurface?.selectedInventoryEntries || [],
        selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
        addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
        authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
        signingPayloadHash: candidate.asset.signingSurface?.payloadHash,
        selectedUnits: candidate.asset.contentUnits.slice(0, 2).map((unit) => ({
          assetId: candidate.assetId,
          unitId: unit.unitId,
          unitKind: unit.unitKind,
          unitHash: unit.unitHash
        }))
      }))
    };
  }

  /**
   * @param {EvaluatedCandidate[]} selectedCandidates
   * @param {string} branchMode
   * @returns {Record<string, string>}
   */
  function materializeSelectedSourceMaterial(selectedCandidates, branchMode) {
    const allowedTiers = allowedUseTiersForBranchMode(branchMode);

    /** @type {Record<string, string>} */
    const files = {};
    for (const candidate of selectedCandidates) {
      if (!allowedTiers.has(candidate.useTier)) continue;
      const sections = candidate.asset.contentUnits.slice(0, 2).map((unit) => `## ${unit.unitId}\n\n- unitHash: ${unit.unitHash}\n- unitKind: ${unit.unitKind}\n\n${unit.text}`).join('\n\n');
      files[`.engi/source-material/${candidate.assetId}.md`] = `# ${candidate.asset.title}\n\n- assetId: ${candidate.assetId}\n- useTier: ${candidate.useTier}\n- artifactKind: ${candidate.asset.artifactKind}\n- contentRoot: ${candidate.asset.contentRoot}\n- materializationMode: ${candidate.asset.sourceMaterialBinding.mode}\n- confidentiality: ${candidate.asset.sourceMaterialBinding.confidentiality}\n\n${sections}`;
    }
    return files;
  }

  /**
   * @param {NeedShape} need
   * @param {AssetPackShape} assetPack
   * @param {EvaluatedCandidate[]} selectedCandidates
   * @param {{ bundleId: string, totals: { debited: string, credited: string }, rawShares: Array<{ shareBp: number }>, credits: Array<{ delta: string }> }} journalDiff
   * @param {{ releaseId?: string | undefined, releasePolicyId?: string | undefined }} policyRelease
   * @returns {string}
   */
  function buildNeedMarkdown(need, assetPack, selectedCandidates, journalDiff, policyRelease) {
    const selectedList = selectedCandidates.map((candidate) => `- ${candidate.asset.title} (${candidate.useTier}) — score ${candidate.ranking.finalRankingScore.toFixed(4)}`).join('\n');
    const creditedAssetCount = journalDiff.credits.filter((entry) => BigInt(entry.delta) > 0n).length;
    const zeroCreditAssetCount = journalDiff.credits.filter((entry) => BigInt(entry.delta) === 0n).length;
    return `# Bitcode Need\n\n## Conformance profiles\n- Active prototype: ${PROFILE_A}\n- Production intent: ${PROFILE_B}\n\n## Failing benchmark slices\n- ${need.failingCases.join('\n- ')}\n\n## Measured need\n${need.task}\n\n## Failure modes\n- ${need.failureModes.join('\n- ')}\n\n## Constraints\n- ${need.constraints.join('\n- ')}\n\n## Benchmark parser contract\n- parserKind: ${need.benchmarkParserContract.parserKind}\n- parserVersion: ${need.benchmarkParserContract.parserVersion}\n- failClosed: ${need.benchmarkParserContract.parserFailureContract.failClosed}\n\n## Target artifact kinds\n- ${need.targetArtifactKinds.join('\n- ')}\n\n## Closure criteria\n- ${(need.closureCriteria || []).join('\n- ')}\n\n## Selected assets and reasons\n${selectedList}\n\n## Verification / risk summary\n- Private remediation branch only; no public delivery before settlement.\n- Settlement consumes settlement-eligible assets only.\n- Restricted or weakly evidenced assets remain report-only or context-only.\n- Policy release: ${policyRelease.releaseId || policyRelease.releasePolicyId}\n\n## Expected touched files / areas\n- ${need.touchedPaths.join('\n- ')}\n\n## Validation / rerun instructions\n- Rerun ${need.benchmarkWorkflowPath}\n- Re-run failing cases: ${need.failingCases.join(', ')}\n- Recheck weak dimensions: ${need.weakDimensions.join(', ')}\n\n## Settlement preview summary\n- bundleId: ${journalDiff.bundleId}\n- debited micro-units: ${journalDiff.totals.debited}\n- credited micro-units: ${journalDiff.totals.credited}\n- raw share asset count: ${journalDiff.rawShares.length}\n- credited settlement asset count: ${creditedAssetCount}\n- zero-credit settlement asset count: ${zeroCreditAssetCount}`;
  }

  /**
   * @param {BranchArtifacts} branchArtifacts
   * @returns {void}
   */
  function assertRequiredBranchArtifacts(branchArtifacts) {
    const requiredPaths = [
      '.engi/need.json',
      '.engi/need-measurement.json',
      '.engi/depositing-surface.json',
      '.engi/needing-surface.json',
      '.engi/depositing-to-needing-surface.json',
      '.engi/match-report.json',
      '.engi/verification-report.json',
      '.engi/eval-manifest.json',
      '.engi/asset-pack.lock.json',
      '.engi/settlement-preview.json',
      '.engi/system-proof-bundle.json',
      '.engi/authorization-decisions.json',
      '.engi/sensitive-data-flow.json',
      '.engi/policy-release.json',
      '.engi/identity-bindings.json',
      '.engi/github-boundary.json',
      '.engi/artifact-upload-manifest.json',
      '.engi/profile-composition.json',
      '.engi/prompt-family-registry.json',
      '.engi/prompt-surfaces.json',
      '.engi/prompt-contracts.json',
      '.engi/inference-moment-contracts.json',
      '.engi/inference-proofs.json',
      '.engi/inference-synthesis-proof.json',
      '.engi/prompt-implementation-surface.json',
      '.engi/prompt-completeness-proof.json',
      '.engi/parsed-completion-envelopes.json',
      '.engi/code-analysis-fact-registry.json',
      '.engi/static-heuristics-registry.json',
      '.engi/external-boundary-manifest.json',
      '.engi/measurement-receipts.json',
      '.engi/static-measurement-report.json',
      '.engi/static-measurement-proof.json',
      '.engi/verification-receipts.json',
      '.engi/verification-decisions-proof.json',
      '.engi/materialization-proof.json',
      '.engi/selection-consistency-proof.json',
      '.engi/selection-and-materialization-proof.json',
      '.engi/materialization-exclusions.json',
      '.engi/proof-witness-manifest.json',
      '.engi/materialization-visibility-proof.json',
      '.engi/identity-authorization-proof.json',
      '.engi/sensitive-data-flow-proof.json',
      '.engi/authorization-and-sensitive-flow-proof.json',
      '.engi/source-to-shares.json',
      '.engi/settlement-participation.json',
      '.engi/accounting-precision-report.json',
      '.engi/journal-completeness-proof.json',
      '.engi/settlement-source-to-shares-proof.json',
      '.engi/journal-diff.json',
      '.engi/scenario-fixture-manifest.json',
      '.engi/test-coverage-report.json',
      '.engi/unit-catalog.json',
      '.engi/pipeline-telemetry.json',
      '.engi/projection-policy.json',
      '.engi/bounded-public-proof.json',
      '.engi/redaction-proof.json',
      '.engi/disclosure-proof.json',
      '.engi/disclosure-boundary-proof.json',
      '.engi/proof-contract.json',
      '.engi/deliverables.json',
      'BITCODE_NEED.md'
    ];
    if (branchArtifacts.files['.engi/bitcoin-settlement-intent.json']) {
      requiredPaths.push(
        '.engi/compute-reality-manifest.json',
        '.engi/storage-reality-manifest.json',
        '.engi/bitcoin-commitment-manifest.json',
        '.engi/bitcoin-treasury-policy.json',
        '.engi/bitcoin-anchor.json',
        '.engi/bitcoin-bounded-public-anchor.json',
        '.engi/bitcoin-settlement-intent.json',
        '.engi/bitcoin-settlement-observation.json',
        '.engi/bitcoin-audit-anchor-proof.json',
        '.engi/bitcoin-settlement-interface-proof.json'
      );
    }
    if (branchArtifacts.files['.engi/external-environment-profile.json']) {
      requiredPaths.push(
        '.engi/external-environment-profile.json',
        '.engi/external-execution-policy.json',
        '.engi/external-telemetry-policy.json',
        '.engi/external-telemetry-summary.json',
        '.engi/network-capability-manifest.json',
        '.engi/github-app-binding.json',
        '.engi/bitcoin-network-intent.json',
        '.engi/bitcoin-network-execution.json',
        '.engi/bitcoin-network-observation.json',
        '.engi/sidechain-execution-receipt.json',
        '.engi/compute-container-manifest.json',
        '.engi/compute-container-execution.json',
        '.engi/storage-container-manifest.json',
        '.engi/storage-publication-receipt.json',
        '.engi/storage-retrieval-receipt.json',
        '.engi/github-live-session.json',
        '.engi/github-inventory-fetch-receipt.json',
        '.engi/github-artifact-fetch-receipt.json',
        '.engi/github-branch-publication-receipt.json',
        '.engi/github-pr-update-receipt.json',
        '.engi/external-realization-proof.json',
        '.engi/container-reality-proof.json',
        '.engi/github-live-interface-proof.json'
      );
    }
    for (const requiredPath of requiredPaths) {
      if (!branchArtifacts.files[requiredPath]) {
        throw new Error(`Bitcode branch artifact contract failed: missing ${requiredPath}.`);
      }
    }
  }

  /**
   * @param {BuildBranchArtifactsInput} input
   * @returns {{ branchName: string, branchMode: string, confidentiality: string, files: Record<string, string> }}
   */
  function buildBranchArtifacts({ need, needMeasurement, benchmarkTarget, branchMode, branchName, depositingSurface, needingSurface, depositingToNeedingSurface, matchReport, verificationReport, evalManifest, assetPack, assetPackLock, selectedSourceMaterialManifest, settlementPreview, settlementProof, systemProofBundle, authorizationDecisions, sensitiveDataFlowRecords, policyRelease, deliverablesManifest, unitCatalog, pipelineTelemetry, selectedCandidates, journalDiff, identityBindings, githubBoundarySurface, artifactUploadManifest, profileCompositionSurface, promptFamilyRegistry, promptSurfaces, promptContracts, inferenceProofs, inferenceMomentContracts, promptImplementationSurface, inferenceSynthesisProof, promptCompletenessProof, parsedCompletionEnvelopes, parsedCompletionEnvelopeArtifact, externalBoundaryManifest, measurementReceipts, staticMeasurementReport, staticMeasurementProof, codeAnalysisFactRegistry, staticHeuristicsRegistry, verificationReceiptsArtifact, verificationDecisionsProof, proofWitnessManifest, selectionConsistencyProof, selectionAndMaterializationProof, identityAuthorizationProof, sensitiveDataFlowProof, authorizationAndSensitiveFlowProof, materializationProof, materializationExclusions, materializationVisibilityProof, sourceToSharesArtifact, settlementParticipationArtifact, accountingPrecisionReport, journalCompletenessProof, settlementSourceToSharesProof, scenarioFixtureManifest, testCoverageReport, projectionPolicy, boundedPublicProof, redactionProof, disclosureProof, disclosureBoundaryProof, proofContract, computeRealityManifest, storageRealityManifest, bitcoinCommitmentManifest, bitcoinTreasuryPolicy, bitcoinAnchor, bitcoinBoundedPublicAnchor, bitcoinSettlementIntent, bitcoinSettlementObservation, bitcoinAuditAnchorProof, bitcoinSettlementInterfaceProof, externalEnvironmentProfile, externalExecutionPolicy, externalTelemetryPolicy, externalTelemetrySummary, networkCapabilityManifest, githubAppBinding, bitcoinNetworkIntent, bitcoinNetworkExecution, bitcoinNetworkObservation, repeatedReadPaymentIntent, repeatedReadPaymentExecution, repeatedReadPaymentObservation, sidechainExecutionReceipt, computeContainerManifest, computeContainerExecution, storageContainerManifest, storagePublicationReceipt, storageRetrievalReceipt, githubLiveSession, githubInventoryFetchReceipt, githubArtifactFetchReceipt, githubBranchPublicationReceipt, githubPrUpdateReceipt, externalRealizationProof, containerRealityProof, githubLiveInterfaceProof }) {
    const files = {
      '.engi/need.json': JSON.stringify(need, null, 2),
      '.engi/need-measurement.json': JSON.stringify(needMeasurement, null, 2),
      '.engi/benchmark-target.json': JSON.stringify(benchmarkTarget, null, 2),
      '.engi/depositing-surface.json': JSON.stringify(depositingSurface, null, 2),
      '.engi/needing-surface.json': JSON.stringify(needingSurface, null, 2),
      '.engi/depositing-to-needing-surface.json': JSON.stringify(depositingToNeedingSurface, null, 2),
      '.engi/match-report.json': JSON.stringify(matchReport, null, 2),
      '.engi/verification-report.json': JSON.stringify(verificationReport, null, 2),
      '.engi/eval-manifest.json': JSON.stringify(evalManifest, null, 2),
      '.engi/asset-pack.lock.json': JSON.stringify(assetPackLock, null, 2),
      '.engi/selected-source-material.json': JSON.stringify(selectedSourceMaterialManifest, null, 2),
      '.engi/settlement-preview.json': JSON.stringify(settlementPreview, null, 2),
      '.engi/settlement-proof.json': JSON.stringify(settlementProof, null, 2),
      '.engi/journal-diff.json': JSON.stringify(journalDiff, null, 2),
      '.engi/system-proof-bundle.json': JSON.stringify(systemProofBundle, null, 2),
      '.engi/authorization-decisions.json': JSON.stringify(authorizationDecisions, null, 2),
      '.engi/sensitive-data-flow.json': JSON.stringify(sensitiveDataFlowRecords, null, 2),
      '.engi/policy-release.json': JSON.stringify(policyRelease, null, 2),
      '.engi/identity-bindings.json': JSON.stringify(identityBindings, null, 2),
      '.engi/github-boundary.json': JSON.stringify(githubBoundarySurface, null, 2),
      '.engi/artifact-upload-manifest.json': JSON.stringify(artifactUploadManifest, null, 2),
      '.engi/profile-composition.json': JSON.stringify(profileCompositionSurface, null, 2),
      '.engi/prompt-family-registry.json': JSON.stringify(promptFamilyRegistry, null, 2),
      '.engi/prompt-surfaces.json': JSON.stringify(promptSurfaces, null, 2),
      '.engi/prompt-contracts.json': JSON.stringify(promptContracts, null, 2),
      '.engi/inference-moment-contracts.json': JSON.stringify(inferenceMomentContracts, null, 2),
      '.engi/inference-proofs.json': JSON.stringify(inferenceProofs || [], null, 2),
      '.engi/inference-synthesis-proof.json': JSON.stringify(inferenceSynthesisProof, null, 2),
      '.engi/prompt-implementation-surface.json': JSON.stringify(promptImplementationSurface, null, 2),
      '.engi/prompt-completeness-proof.json': JSON.stringify(promptCompletenessProof, null, 2),
      '.engi/parsed-completion-envelopes.json': JSON.stringify(parsedCompletionEnvelopeArtifact || { envelopes: parsedCompletionEnvelopes || [] }, null, 2),
      '.engi/code-analysis-fact-registry.json': JSON.stringify(codeAnalysisFactRegistry, null, 2),
      '.engi/static-heuristics-registry.json': JSON.stringify(staticHeuristicsRegistry, null, 2),
      '.engi/external-boundary-manifest.json': JSON.stringify(externalBoundaryManifest, null, 2),
      '.engi/measurement-receipts.json': JSON.stringify(measurementReceipts, null, 2),
      '.engi/static-measurement-report.json': JSON.stringify(staticMeasurementReport, null, 2),
      '.engi/static-measurement-proof.json': JSON.stringify(staticMeasurementProof, null, 2),
      '.engi/verification-receipts.json': JSON.stringify(verificationReceiptsArtifact, null, 2),
      '.engi/verification-decisions-proof.json': JSON.stringify(verificationDecisionsProof, null, 2),
      '.engi/selection-consistency-proof.json': JSON.stringify(selectionConsistencyProof, null, 2),
      '.engi/selection-and-materialization-proof.json': JSON.stringify(selectionAndMaterializationProof, null, 2),
      '.engi/identity-authorization-proof.json': JSON.stringify(identityAuthorizationProof, null, 2),
      '.engi/sensitive-data-flow-proof.json': JSON.stringify(sensitiveDataFlowProof, null, 2),
      '.engi/authorization-and-sensitive-flow-proof.json': JSON.stringify(authorizationAndSensitiveFlowProof, null, 2),
      '.engi/materialization-proof.json': JSON.stringify(materializationProof, null, 2),
      '.engi/materialization-exclusions.json': JSON.stringify(materializationExclusions, null, 2),
      '.engi/proof-witness-manifest.json': JSON.stringify(proofWitnessManifest, null, 2),
      '.engi/materialization-visibility-proof.json': JSON.stringify(materializationVisibilityProof, null, 2),
      '.engi/source-to-shares.json': JSON.stringify(sourceToSharesArtifact, null, 2),
      '.engi/settlement-participation.json': JSON.stringify(settlementParticipationArtifact, null, 2),
      '.engi/accounting-precision-report.json': JSON.stringify(accountingPrecisionReport, null, 2),
      '.engi/journal-completeness-proof.json': JSON.stringify(journalCompletenessProof, null, 2),
      '.engi/settlement-source-to-shares-proof.json': JSON.stringify(settlementSourceToSharesProof, null, 2),
      '.engi/scenario-fixture-manifest.json': JSON.stringify(scenarioFixtureManifest, null, 2),
      '.engi/test-coverage-report.json': JSON.stringify(testCoverageReport, null, 2),
      '.engi/unit-catalog.json': JSON.stringify(unitCatalog, null, 2),
      '.engi/pipeline-telemetry.json': JSON.stringify(pipelineTelemetry, null, 2),
      '.engi/projection-policy.json': JSON.stringify(projectionPolicy, null, 2),
      '.engi/bounded-public-proof.json': JSON.stringify(boundedPublicProof, null, 2),
      '.engi/redaction-proof.json': JSON.stringify(redactionProof, null, 2),
      '.engi/disclosure-proof.json': JSON.stringify(disclosureProof, null, 2),
      '.engi/disclosure-boundary-proof.json': JSON.stringify(disclosureBoundaryProof, null, 2),
      '.engi/proof-contract.json': JSON.stringify(proofContract, null, 2),
      '.engi/deliverables.json': JSON.stringify(deliverablesManifest, null, 2),
      ...(computeRealityManifest ? { '.engi/compute-reality-manifest.json': JSON.stringify(computeRealityManifest, null, 2) } : {}),
      ...(storageRealityManifest ? { '.engi/storage-reality-manifest.json': JSON.stringify(storageRealityManifest, null, 2) } : {}),
      ...(bitcoinCommitmentManifest ? { '.engi/bitcoin-commitment-manifest.json': JSON.stringify(bitcoinCommitmentManifest, null, 2) } : {}),
      ...(bitcoinTreasuryPolicy ? { '.engi/bitcoin-treasury-policy.json': JSON.stringify(bitcoinTreasuryPolicy, null, 2) } : {}),
      ...(bitcoinAnchor ? { '.engi/bitcoin-anchor.json': JSON.stringify(bitcoinAnchor, null, 2) } : {}),
      ...(bitcoinBoundedPublicAnchor ? { '.engi/bitcoin-bounded-public-anchor.json': JSON.stringify(bitcoinBoundedPublicAnchor, null, 2) } : {}),
      ...(bitcoinSettlementIntent ? { '.engi/bitcoin-settlement-intent.json': JSON.stringify(bitcoinSettlementIntent, null, 2) } : {}),
      ...(bitcoinSettlementObservation ? { '.engi/bitcoin-settlement-observation.json': JSON.stringify(bitcoinSettlementObservation, null, 2) } : {}),
      ...(bitcoinAuditAnchorProof ? { '.engi/bitcoin-audit-anchor-proof.json': JSON.stringify(bitcoinAuditAnchorProof, null, 2) } : {}),
      ...(bitcoinSettlementInterfaceProof ? { '.engi/bitcoin-settlement-interface-proof.json': JSON.stringify(bitcoinSettlementInterfaceProof, null, 2) } : {}),
      ...(externalEnvironmentProfile ? { '.engi/external-environment-profile.json': JSON.stringify(externalEnvironmentProfile, null, 2) } : {}),
      ...(externalExecutionPolicy ? { '.engi/external-execution-policy.json': JSON.stringify(externalExecutionPolicy, null, 2) } : {}),
      ...(externalTelemetryPolicy ? { '.engi/external-telemetry-policy.json': JSON.stringify(externalTelemetryPolicy, null, 2) } : {}),
      ...(externalTelemetrySummary ? { '.engi/external-telemetry-summary.json': JSON.stringify(externalTelemetrySummary, null, 2) } : {}),
      ...(networkCapabilityManifest ? { '.engi/network-capability-manifest.json': JSON.stringify(networkCapabilityManifest, null, 2) } : {}),
      ...(githubAppBinding ? { '.engi/github-app-binding.json': JSON.stringify(githubAppBinding, null, 2) } : {}),
      ...(bitcoinNetworkIntent ? { '.engi/bitcoin-network-intent.json': JSON.stringify(bitcoinNetworkIntent, null, 2) } : {}),
      ...(bitcoinNetworkExecution ? { '.engi/bitcoin-network-execution.json': JSON.stringify(bitcoinNetworkExecution, null, 2) } : {}),
      ...(bitcoinNetworkObservation ? { '.engi/bitcoin-network-observation.json': JSON.stringify(bitcoinNetworkObservation, null, 2) } : {}),
      ...(repeatedReadPaymentIntent ? { '.engi/repeated-read-payment-intent.json': JSON.stringify(repeatedReadPaymentIntent, null, 2) } : {}),
      ...(repeatedReadPaymentExecution ? { '.engi/repeated-read-payment-execution.json': JSON.stringify(repeatedReadPaymentExecution, null, 2) } : {}),
      ...(repeatedReadPaymentObservation ? { '.engi/repeated-read-payment-observation.json': JSON.stringify(repeatedReadPaymentObservation, null, 2) } : {}),
      ...(sidechainExecutionReceipt ? { '.engi/sidechain-execution-receipt.json': JSON.stringify(sidechainExecutionReceipt, null, 2) } : {}),
      ...(computeContainerManifest ? { '.engi/compute-container-manifest.json': JSON.stringify(computeContainerManifest, null, 2) } : {}),
      ...(computeContainerExecution ? { '.engi/compute-container-execution.json': JSON.stringify(computeContainerExecution, null, 2) } : {}),
      ...(storageContainerManifest ? { '.engi/storage-container-manifest.json': JSON.stringify(storageContainerManifest, null, 2) } : {}),
      ...(storagePublicationReceipt ? { '.engi/storage-publication-receipt.json': JSON.stringify(storagePublicationReceipt, null, 2) } : {}),
      ...(storageRetrievalReceipt ? { '.engi/storage-retrieval-receipt.json': JSON.stringify(storageRetrievalReceipt, null, 2) } : {}),
      ...(githubLiveSession ? { '.engi/github-live-session.json': JSON.stringify(githubLiveSession, null, 2) } : {}),
      ...(githubInventoryFetchReceipt ? { '.engi/github-inventory-fetch-receipt.json': JSON.stringify(githubInventoryFetchReceipt, null, 2) } : {}),
      ...(githubArtifactFetchReceipt ? { '.engi/github-artifact-fetch-receipt.json': JSON.stringify(githubArtifactFetchReceipt, null, 2) } : {}),
      ...(githubBranchPublicationReceipt ? { '.engi/github-branch-publication-receipt.json': JSON.stringify(githubBranchPublicationReceipt, null, 2) } : {}),
      ...(githubPrUpdateReceipt ? { '.engi/github-pr-update-receipt.json': JSON.stringify(githubPrUpdateReceipt, null, 2) } : {}),
      ...(externalRealizationProof ? { '.engi/external-realization-proof.json': JSON.stringify(externalRealizationProof, null, 2) } : {}),
      ...(containerRealityProof ? { '.engi/container-reality-proof.json': JSON.stringify(containerRealityProof, null, 2) } : {}),
      ...(githubLiveInterfaceProof ? { '.engi/github-live-interface-proof.json': JSON.stringify(githubLiveInterfaceProof, null, 2) } : {}),
      'BITCODE_NEED.md': buildNeedMarkdown(need, assetPack, selectedCandidates, journalDiff, policyRelease)
    };

    return {
      branchName,
      branchMode,
      confidentiality: 'private-required',
      files: {
        ...files,
        ...materializeSelectedSourceMaterial(selectedCandidates, branchMode)
      }
    };
  }

  return {
    allowedUseTiersForBranchMode,
    useTierRights,
    recallCandidates,
    evaluateCandidates,
    assembleAssetPack,
    buildMatchReport,
    buildVerificationReport,
    buildVerificationReceiptsArtifact,
    buildEvalManifest,
    buildAssetPackLock,
    buildSelectedSourceMaterialManifest,
    assertRequiredBranchArtifacts,
    buildBranchArtifacts
  };
}
