// @ts-check

/**
 * @typedef {{
 *   authSessionId: string,
 *   authMechanism?: string | undefined,
 *   appId?: string | number | undefined,
 *   appSlug?: string | undefined,
 *   installationId?: string | number | undefined,
 *   installationAccountLogin?: string | undefined,
 *   installationAccountId?: string | number | undefined,
 *   installationAccountNodeId?: string | undefined,
 *   installationAccountType?: string | undefined,
 *   operatorLogin?: string | undefined,
 *   repo?: string | undefined,
 *   owner?: string | undefined,
 *   repoName?: string | undefined,
 *   repositoryId?: string | number | undefined,
 *   repositoryNodeId?: string | undefined,
 *   repositoryVisibility?: string | undefined,
 *   repositorySelection?: string | undefined,
 *   permissions?: Record<string, unknown> | undefined,
 *   permissionsRoot?: string | undefined,
 *   defaultRef?: string | undefined,
 *   defaultSignerAddress?: string | undefined,
 *   signingAlgorithm?: string | undefined,
 *   keySource?: string | undefined,
 *   sessionIssuedAt?: string | undefined,
 *   sessionExpiresAt?: string | undefined,
 *   tokenBoundary?: string | undefined,
 *   authPayloadHash?: string | undefined,
 *   localBoundary?: string | undefined,
 *   externalBoundary?: string | undefined,
 *   profileABoundary?: string | undefined,
 *   profileBBoundary?: string | undefined
 * }} SessionShape
 *
 * @typedef {{
 *   inventoryEntryId: string,
 *   repo?: string | undefined,
 *   artifactKind?: string | undefined,
 *   artifactType?: string | undefined,
 *   originKind?: string | undefined,
 *   title?: string | undefined,
 *   summary?: string | undefined,
 *   ref?: string | undefined,
 *   sourceCommit?: string | undefined,
 *   sourcePath?: string | undefined,
 *   sourcePaths?: string[] | undefined,
 *   workflowRunId?: string | undefined,
 *   workflowPath?: string | undefined,
 *   workflowJobName?: string | undefined,
 *   checkSuiteId?: string | undefined,
 *   artifactName?: string | undefined,
 *   tags?: string[] | undefined,
 *   declaredStacks?: string[] | undefined,
 *   declaredConstraints?: string[] | undefined,
 *   previewSurface?: string | undefined,
 *   signerAddress?: string | undefined,
 *   owner?: string | undefined,
 *   repoName?: string | undefined,
 *   repositoryId?: string | number | undefined,
 *   repositoryNodeId?: string | undefined,
 *   authSessionId?: string | undefined,
 *   installationId?: string | number | undefined,
 *   installationAccountLogin?: string | undefined,
 *   installationAccountId?: string | number | undefined,
 *   installationAccountNodeId?: string | undefined,
 *   contentRoot?: string | undefined,
 *   addressing?: unknown,
 *   authBinding?: unknown,
 *   provenance?: unknown
 * }} RepoArtifactInventoryEntryShape
 *
 * @typedef {{
 *   assetId: string,
 *   title: string,
 *   artifactKind: string,
 *   metadata: { summary?: string | undefined, tags?: string[] | undefined, issuerPolicyStatus?: string | undefined },
 *   attestations: Array<{ signerAddress?: string | undefined }>
 * }} AssetSummaryShape
 *
 * @typedef {{
 *   scenarioId: string,
 *   scenarioFamily?: string | undefined,
 *   coverageTags?: string[] | undefined,
 *   repo: string,
 *   baseRef: string,
 *   expectedTask?: string | undefined,
 *   realizationProfileId?: string | undefined,
 *   canonicalRunEvidence?: { extractedOutputs?: { parserKind?: string | undefined } | undefined } | undefined
 * }} NeedScenarioShape
 *
 * @typedef {{
 *   needId: string,
 *   repo: string,
 *   benchmarkRunId?: string | undefined,
 *   benchmarkHarnessPath?: string | undefined,
 *   benchmarkWorkflowPath?: string | undefined,
 *   benchmarkParserContract?: unknown,
 *   task?: string | undefined,
 *   failureModes?: string[] | undefined,
 *   constraints?: string[] | undefined,
 *   closureCriteria?: string[] | undefined,
 *   targetArtifactKinds?: string[] | undefined,
 *   touchedPaths?: string[] | undefined,
 *   failingCases?: string[] | undefined,
 *   weakDimensions?: string[] | undefined,
 *   fieldDerivations?: unknown,
 *   conformanceProfile?: string | undefined,
 *   productionIntentProfile?: string | undefined,
 *   realizationProfile?: unknown
 * }} NeedPreviewShape
 *
 * @typedef {{
 *   assetId: string,
 *   title: string,
 *   artifactKind: string,
 *   useTier: string,
 *   ranking: unknown,
 *   verification: unknown,
 *   rights: unknown
 * }} LatestRunCandidateShape
 *
 * @typedef {{
 *   createdAt?: string | undefined,
 *   scenarioId?: string | undefined,
 *   branchMode?: string | undefined,
 *   branchArtifacts?: { branchName?: string | undefined, branchMode?: string | undefined, confidentiality?: string | undefined, files?: Record<string, string> | undefined } | undefined,
 *   conformanceProfile?: string | undefined,
 *   productionIntentProfile?: string | undefined,
 *   realizationProfile?: unknown,
 *   needLifecycle?: unknown,
 *   need?: NeedPreviewShape | null | undefined,
 *   depositingSurface?: unknown,
 *   needingSurface?: unknown,
 *   depositingToNeedingSurface?: unknown,
 *   matchReport?: unknown,
 *   assetPack?: { assetPackId?: string | undefined, branchMode?: string | undefined, selectedAssets?: string[] | undefined } | undefined,
 *   evaluatedCandidates?: LatestRunCandidateShape[] | undefined,
 *   repoToSettlementSurface?: unknown,
 *   boundedPublicProof?: unknown,
 *   promptCompletenessProof?: unknown,
 *   codeAnalysisFactRegistry?: unknown,
 *   staticHeuristicsRegistry?: unknown,
 *   staticMeasurementReport?: unknown,
 *   staticMeasurementProof?: unknown,
 *   materializationProof?: unknown,
 *   materializationExclusions?: unknown,
 *   materializationVisibilityProof?: unknown,
 *   scenarioFixtureManifest?: unknown,
 *   testCoverageReport?: unknown,
 *   projectionPolicy?: { publicArtifactPaths?: string[] | undefined, privateArtifactPaths?: string[] | undefined } | undefined,
 *   redactionProof?: unknown,
 *   disclosureProof?: unknown,
 *   needMeasurement?: unknown,
 *   promptContracts?: unknown,
 *   promptSurfaces?: unknown,
 *   parsedCompletionEnvelopes?: unknown,
 *   parsedCompletionEnvelopeArtifact?: unknown,
 *   verificationReport?: unknown,
 *   identityAuthSpineSurface?: unknown,
 *   evalManifest?: unknown,
 *   assetPackLock?: unknown,
 *   identityBindings?: unknown,
 *   authorizationDecisions?: unknown,
 *   sensitiveDataFlowRecords?: unknown,
 *   githubBoundarySurface?: unknown,
 *   artifactUploadManifest?: unknown,
 *   profileCompositionSurface?: unknown,
 *   externalBoundaryManifest?: unknown,
 *   deliverablesManifest?: unknown,
 *   unitCatalog?: unknown,
 *   pipelineTelemetry?: unknown,
 *   measurementReceipts?: unknown,
 *   verificationReceipts?: unknown,
 *   proofWitnessManifest?: unknown,
 *   sourceToSharesArtifact?: unknown,
 *   settlementParticipationArtifact?: unknown,
 *   accountingPrecisionReport?: unknown,
 *   settlementPreview?: unknown,
 *   journalDiff?: unknown,
 *   systemProofBundle?: unknown
 * }} LatestRunShape
 *
 * @typedef {{
 *   specVersion?: string | undefined,
 *   buyers: unknown[],
 *   githubAppSessions?: SessionShape[] | undefined,
 *   repoArtifactInventory?: RepoArtifactInventoryEntryShape[] | undefined,
 *   needScenarios: NeedScenarioShape[],
 *   assets: AssetSummaryShape[],
 *   ledger: unknown,
 *   latestRun?: LatestRunShape | null | undefined,
 *   runHistory?: unknown[] | undefined,
 *   policyState?: unknown,
 *   conformanceProfiles?: {
 *     active?: string | undefined,
 *     productionIntent?: string | undefined,
 *     prototypeOnlyModeledControls?: boolean | undefined
 *   } | undefined
 * }} DemoStateShape
 *
 * @typedef {{
 *   ensureProjectionPrincipal: (principal: string) => string,
 *   buildRepoSupplySurface: (state: DemoStateShape) => unknown,
 *   buildBoundaryRealitySurface: () => unknown,
 *   buildPolicyState: () => unknown,
 *   buildPolicyRelease: (policyState: unknown) => unknown,
 *   buildNeedDescriptor: (scenario: NeedScenarioShape) => NeedPreviewShape,
 *   buildNeedingSurface: (needPreview: Record<string, unknown>) => unknown,
 *   nowIso: () => string
 * }} PublicStateBuilderOptions
 */

import { PROFILE_A, PROFILE_B, buildRealizationProfile } from './realization-profile.js';

/**
 * @param {string | undefined} localBoundary
 * @param {string | undefined} externalBoundary
 * @returns {Record<string, string | undefined>}
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
 * @returns {Record<string, unknown>}
 */
export function buildProfileCompositions() {
  const profiles = ['A', 'B'].map((profileId) => {
    const profile = buildRealizationProfile(profileId);
    return {
      ...profile,
      switchableInDemo: true,
      metadata: {
        depositMode: profile.depositMode,
        needMode: profile.needMode,
        assetPackShape: profile.assetPackShape,
        settlementShape: profile.settlementShape,
        boundaryTruthNote: profile.boundaryRealityNote
      }
    };
  });

  return {
    activeProfile: 'A',
    distinctionBasis: 'deposit-and-need',
    demoOperatorGuidance: {
      audienceMeaning: 'The V15 profiles distinguish how ENGI deposits supply against need. They are not a local-vs-GitHub toggle.',
      boundaryTruthPlacement: 'Boundary reality, GitHub boundary, and external boundary surfaces keep live/not-live truth explicit. The profile headline now explains deposit mode, need mode, and fit first.',
      recommendedWalkthrough: [
        'Start with repo supply and pick a targeted-deposit scenario to show a bounded need.',
        'Deposit or inspect a small decisive asset set, then run the branch flow to show tight closure.',
        'Switch to a normalization-heavy scenario to show overlapping deposits and broader settlement logic.',
        'Use boundary reality and GitHub boundary surfaces only after the deposit/need contrast is clear.',
        'Close on proof bundle, source-to-shares, and settlement invariants.'
      ]
    },
    profiles,
    boundaryTruthSurfaces: ['boundaryRealitySurface', 'githubBoundarySurface', 'externalBoundaryManifest'],
    comparisonAxes: ['deposit mode', 'need mode', 'asset-pack shape', 'settlement shape', 'boundary hand-off']
  };
}

/**
 * @param {NeedPreviewShape | null | undefined} need
 * @returns {NeedPreviewShape | null}
 */
function minimalNeedProjection(need) {
  if (!need) return null;
  return {
    needId: need.needId,
    repo: need.repo,
    benchmarkRunId: need.benchmarkRunId,
    benchmarkHarnessPath: need.benchmarkHarnessPath,
    benchmarkWorkflowPath: need.benchmarkWorkflowPath,
    benchmarkParserContract: need.benchmarkParserContract,
    task: need.task,
    failureModes: need.failureModes,
    constraints: need.constraints,
    closureCriteria: need.closureCriteria,
    targetArtifactKinds: need.targetArtifactKinds,
    touchedPaths: need.touchedPaths,
    failingCases: need.failingCases,
    weakDimensions: need.weakDimensions,
    fieldDerivations: need.fieldDerivations,
    conformanceProfile: need.conformanceProfile,
    productionIntentProfile: need.productionIntentProfile,
    realizationProfile: need.realizationProfile
  };
}

/**
 * @param {LatestRunCandidateShape} candidate
 * @returns {LatestRunCandidateShape}
 */
function minimalCandidateProjection(candidate) {
  return {
    assetId: candidate.assetId,
    title: candidate.title,
    artifactKind: candidate.artifactKind,
    useTier: candidate.useTier,
    ranking: candidate.ranking,
    verification: candidate.verification,
    rights: candidate.rights
  };
}

/**
 * @param {LatestRunShape | null | undefined} latestRun
 * @returns {Record<string, unknown> | null}
 */
function buildPublicProjection(latestRun) {
  if (!latestRun) return null;
  return {
    projectionPrincipal: 'public',
    createdAt: latestRun.createdAt,
    scenarioId: latestRun.scenarioId,
    branchMode: latestRun.branchMode,
    branchName: latestRun.branchArtifacts?.branchName,
    conformanceProfile: latestRun.conformanceProfile,
    productionIntentProfile: latestRun.productionIntentProfile,
    realizationProfile: latestRun.realizationProfile,
    needLifecycle: latestRun.needLifecycle,
    need: minimalNeedProjection(latestRun.need),
    depositingSurface: latestRun.depositingSurface,
    needingSurface: latestRun.needingSurface,
    depositingToNeedingSurface: latestRun.depositingToNeedingSurface,
    matchReport: latestRun.matchReport,
    assetPack: {
      assetPackId: latestRun.assetPack?.assetPackId,
      branchMode: latestRun.assetPack?.branchMode,
      selectedAssets: latestRun.assetPack?.selectedAssets || []
    },
    evaluatedCandidates: (latestRun.evaluatedCandidates || []).map(minimalCandidateProjection),
    repoToSettlementSurface: latestRun.repoToSettlementSurface,
    boundedPublicProof: latestRun.boundedPublicProof,
    promptCompletenessProof: latestRun.promptCompletenessProof,
    codeAnalysisFactRegistry: latestRun.codeAnalysisFactRegistry,
    staticHeuristicsRegistry: latestRun.staticHeuristicsRegistry,
    staticMeasurementReport: latestRun.staticMeasurementReport,
    staticMeasurementProof: latestRun.staticMeasurementProof,
    materializationProof: latestRun.materializationProof,
    materializationVisibilityProof: latestRun.materializationVisibilityProof,
    scenarioFixtureManifest: latestRun.scenarioFixtureManifest,
    testCoverageReport: latestRun.testCoverageReport,
    projectionPolicy: latestRun.projectionPolicy,
    redactionProof: latestRun.redactionProof,
    disclosureProof: latestRun.disclosureProof,
    branchArtifacts: {
      branchName: latestRun.branchArtifacts?.branchName,
      branchMode: latestRun.branchArtifacts?.branchMode,
      confidentiality: latestRun.branchArtifacts?.confidentiality,
      publicFiles: Object.fromEntries(Object.entries(latestRun.branchArtifacts?.files || {}).filter(([path]) => latestRun.projectionPolicy?.publicArtifactPaths?.includes(path)))
    },
    publicArtifacts: {
      '.engi/bounded-public-proof.json': latestRun.boundedPublicProof,
      '.engi/needing-surface.json': latestRun.needingSurface,
      '.engi/depositing-to-needing-surface.json': latestRun.depositingToNeedingSurface,
      '.engi/prompt-completeness-proof.json': latestRun.promptCompletenessProof,
      '.engi/code-analysis-fact-registry.json': latestRun.codeAnalysisFactRegistry,
      '.engi/static-heuristics-registry.json': latestRun.staticHeuristicsRegistry,
      '.engi/static-measurement-report.json': latestRun.staticMeasurementReport,
      '.engi/static-measurement-proof.json': latestRun.staticMeasurementProof,
      '.engi/materialization-proof.json': latestRun.materializationProof,
      '.engi/materialization-visibility-proof.json': latestRun.materializationVisibilityProof,
      '.engi/scenario-fixture-manifest.json': latestRun.scenarioFixtureManifest,
      '.engi/test-coverage-report.json': latestRun.testCoverageReport,
      '.engi/projection-policy.json': latestRun.projectionPolicy,
      '.engi/redaction-proof.json': latestRun.redactionProof,
      '.engi/disclosure-proof.json': latestRun.disclosureProof
    }
  };
}

/**
 * @param {LatestRunShape | null | undefined} latestRun
 * @returns {Record<string, unknown> | null}
 */
function buildBuyerProjection(latestRun) {
  if (!latestRun) return null;
  return {
    ...buildPublicProjection(latestRun),
    projectionPrincipal: 'buyer',
    needMeasurement: latestRun.needMeasurement,
    promptContracts: latestRun.promptContracts,
    promptSurfaces: latestRun.promptSurfaces,
    parsedCompletionEnvelopes: latestRun.parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact: latestRun.parsedCompletionEnvelopeArtifact,
    verificationReport: latestRun.verificationReport,
    identityAuthSpineSurface: latestRun.identityAuthSpineSurface,
    evalManifest: latestRun.evalManifest,
    assetPackLock: latestRun.assetPackLock,
    identityBindings: latestRun.identityBindings,
    authorizationDecisions: latestRun.authorizationDecisions,
    sensitiveDataFlowRecords: latestRun.sensitiveDataFlowRecords,
    githubBoundarySurface: latestRun.githubBoundarySurface,
    artifactUploadManifest: latestRun.artifactUploadManifest,
    profileCompositionSurface: latestRun.profileCompositionSurface,
    externalBoundaryManifest: latestRun.externalBoundaryManifest,
    deliverablesManifest: latestRun.deliverablesManifest,
    unitCatalog: latestRun.unitCatalog,
    pipelineTelemetry: latestRun.pipelineTelemetry,
    measurementReceipts: latestRun.measurementReceipts,
    verificationReceipts: latestRun.verificationReceipts,
    materializationProof: latestRun.materializationProof,
    materializationExclusions: latestRun.materializationExclusions,
    materializationVisibilityProof: latestRun.materializationVisibilityProof,
    proofWitnessManifest: latestRun.proofWitnessManifest,
    sourceToSharesArtifact: latestRun.sourceToSharesArtifact,
    settlementParticipationArtifact: latestRun.settlementParticipationArtifact,
    accountingPrecisionReport: latestRun.accountingPrecisionReport,
    scenarioFixtureManifest: latestRun.scenarioFixtureManifest,
    testCoverageReport: latestRun.testCoverageReport,
    settlementPreview: latestRun.settlementPreview,
    journalDiff: latestRun.journalDiff,
    systemProofBundle: latestRun.systemProofBundle,
    branchArtifacts: {
      branchName: latestRun.branchArtifacts?.branchName,
      branchMode: latestRun.branchArtifacts?.branchMode,
      confidentiality: latestRun.branchArtifacts?.confidentiality,
      visibleFileInventory: Object.keys(latestRun.branchArtifacts?.files || {}).filter((path) => !path.startsWith('.engi/source-material/'))
    }
  };
}

/**
 * @param {LatestRunShape | null | undefined} latestRun
 * @returns {Record<string, unknown> | null}
 */
function buildReviewerProjection(latestRun) {
  if (!latestRun) return null;
  return {
    ...buildPublicProjection(latestRun),
    projectionPrincipal: 'reviewer',
    verificationReport: latestRun.verificationReport,
    parsedCompletionEnvelopes: latestRun.parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact: latestRun.parsedCompletionEnvelopeArtifact,
    repoToSettlementSurface: latestRun.repoToSettlementSurface,
    verificationReceipts: latestRun.verificationReceipts,
    evalManifest: latestRun.evalManifest,
    promptCompletenessProof: latestRun.promptCompletenessProof,
    codeAnalysisFactRegistry: latestRun.codeAnalysisFactRegistry,
    staticMeasurementReport: latestRun.staticMeasurementReport,
    staticMeasurementProof: latestRun.staticMeasurementProof,
    materializationProof: latestRun.materializationProof,
    materializationVisibilityProof: latestRun.materializationVisibilityProof,
    externalBoundaryManifest: latestRun.externalBoundaryManifest,
    systemProofBundle: latestRun.systemProofBundle,
    proofWitnessManifest: latestRun.proofWitnessManifest,
    scenarioFixtureManifest: latestRun.scenarioFixtureManifest,
    testCoverageReport: latestRun.testCoverageReport,
    branchArtifacts: {
      branchName: latestRun.branchArtifacts?.branchName,
      branchMode: latestRun.branchArtifacts?.branchMode,
      confidentiality: latestRun.branchArtifacts?.confidentiality,
      visibleFileInventory: latestRun.projectionPolicy?.privateArtifactPaths?.filter((path) => !path.startsWith('.engi/source-material/')) || []
    }
  };
}

/**
 * @param {SessionShape} session
 * @returns {Record<string, unknown>}
 */
export function buildPublicGitHubAppSession(session) {
  return {
    authSessionId: session.authSessionId,
    authMechanism: session.authMechanism,
    appId: session.appId,
    appSlug: session.appSlug,
    installationId: session.installationId,
    installationAccountLogin: session.installationAccountLogin,
    installationAccountId: session.installationAccountId,
    installationAccountNodeId: session.installationAccountNodeId,
    installationAccountType: session.installationAccountType,
    operatorLogin: session.operatorLogin,
    repo: session.repo,
    owner: session.owner,
    repoName: session.repoName,
    repositoryId: session.repositoryId,
    repositoryNodeId: session.repositoryNodeId,
    repositoryVisibility: session.repositoryVisibility,
    repositorySelection: session.repositorySelection,
    permissions: session.permissions,
    permissionsRoot: session.permissionsRoot,
    defaultRef: session.defaultRef,
    defaultSignerAddress: session.defaultSignerAddress,
    signingAlgorithm: session.signingAlgorithm,
    keySource: session.keySource,
    sessionIssuedAt: session.sessionIssuedAt,
    sessionExpiresAt: session.sessionExpiresAt,
    tokenBoundary: session.tokenBoundary,
    authPayloadHash: session.authPayloadHash,
    ...buildBoundaryDescriptions(
      session.localBoundary || session.profileABoundary,
      session.externalBoundary || session.profileBBoundary
    )
  };
}

/**
 * @param {RepoArtifactInventoryEntryShape} entry
 * @returns {Record<string, unknown>}
 */
export function buildPublicRepoArtifactInventoryEntry(entry) {
  return {
    inventoryEntryId: entry.inventoryEntryId,
    repo: entry.repo,
    artifactKind: entry.artifactKind,
    artifactType: entry.artifactType,
    originKind: entry.originKind,
    title: entry.title,
    summary: entry.summary,
    ref: entry.ref,
    sourceCommit: entry.sourceCommit,
    sourcePath: entry.sourcePath,
    sourcePaths: entry.sourcePaths,
    workflowRunId: entry.workflowRunId,
    workflowPath: entry.workflowPath,
    workflowJobName: entry.workflowJobName,
    checkSuiteId: entry.checkSuiteId,
    artifactName: entry.artifactName,
    tags: entry.tags,
    declaredStacks: entry.declaredStacks,
    declaredConstraints: entry.declaredConstraints,
    previewSurface: entry.previewSurface,
    signerAddress: entry.signerAddress,
    owner: entry.owner,
    repoName: entry.repoName,
    repositoryId: entry.repositoryId,
    repositoryNodeId: entry.repositoryNodeId,
    authSessionId: entry.authSessionId,
    installationId: entry.installationId,
    installationAccountLogin: entry.installationAccountLogin,
    installationAccountId: entry.installationAccountId,
    installationAccountNodeId: entry.installationAccountNodeId,
    contentRoot: entry.contentRoot,
    addressing: entry.addressing,
    authBinding: entry.authBinding,
    provenance: entry.provenance
  };
}

/**
 * @param {AssetSummaryShape} asset
 * @returns {Record<string, unknown>}
 */
export function buildPublicAssetSummary(asset) {
  return {
    assetId: asset.assetId,
    title: asset.title,
    artifactKind: asset.artifactKind,
    summary: asset.metadata.summary,
    tags: asset.metadata.tags,
    issuerPolicyStatus: asset.metadata.issuerPolicyStatus,
    signerAddress: asset.attestations[0]?.signerAddress
  };
}

/**
 * @param {LatestRunShape | null | undefined} latestRun
 * @param {string} [principal='public']
 * @param {{ ensureProjectionPrincipal?: ((principal: string) => string) | undefined }} [options={}]
 * @returns {Record<string, unknown> | LatestRunShape | null}
 */
export function buildProjectedLatestRun(latestRun, principal = 'public', { ensureProjectionPrincipal } = {}) {
  const resolvedPrincipal = ensureProjectionPrincipal ? ensureProjectionPrincipal(principal) : principal;
  if (!latestRun) return null;
  if (resolvedPrincipal === 'internal') return latestRun;
  if (resolvedPrincipal === 'buyer') return buildBuyerProjection(latestRun);
  if (resolvedPrincipal === 'reviewer') return buildReviewerProjection(latestRun);
  return buildPublicProjection(latestRun);
}

/**
 * @param {DemoStateShape} state
 * @param {string} [principal='public']
 * @param {PublicStateBuilderOptions} options
 * @returns {Record<string, unknown>}
 */
export function buildPublicState(
  state,
  principal = 'public',
  {
    ensureProjectionPrincipal,
    buildRepoSupplySurface,
    buildBoundaryRealitySurface,
    buildPolicyState,
    buildPolicyRelease,
    buildNeedDescriptor,
    buildNeedingSurface,
    nowIso
  } = /** @type {PublicStateBuilderOptions} */ ({})
) {
  const resolvedPrincipal = ensureProjectionPrincipal(principal);
  const repoSupplySurface = buildRepoSupplySurface(state);
  const boundaryRealitySurface = buildBoundaryRealitySurface();
  const profileCompositions = buildProfileCompositions();
  const conformanceProfiles = state.conformanceProfiles
    ? {
        ...state.conformanceProfiles,
        active: state.conformanceProfiles.active || PROFILE_A,
        productionIntent: state.conformanceProfiles.productionIntent || PROFILE_B,
        prototypeOnlyModeledControls: state.conformanceProfiles.prototypeOnlyModeledControls ?? true,
        profileCompositions
      }
    : {
        active: PROFILE_A,
        productionIntent: PROFILE_B,
        prototypeOnlyModeledControls: true,
        profileCompositions
      };

  return {
    specVersion: state.specVersion,
    projectionPrincipal: resolvedPrincipal,
    conformanceProfiles,
    profileCompositions,
    repoSupplySurface,
    boundaryRealitySurface,
    updatedAt: nowIso(),
    buyers: state.buyers,
    githubAppSessions: (state.githubAppSessions || []).map(buildPublicGitHubAppSession),
    repoArtifactInventory: (state.repoArtifactInventory || []).map(buildPublicRepoArtifactInventoryEntry),
    policyRelease: buildPolicyRelease(state.policyState || buildPolicyState()),
    needScenarios: state.needScenarios.map((scenario) => {
      const needPreview = buildNeedDescriptor(scenario);
      const needingSurface = buildNeedingSurface(needPreview);
      const realizationProfile = buildRealizationProfile(scenario);
      return {
        realizationProfile,
        needId: needPreview.needId,
        needingSurface,
        scenarioId: scenario.scenarioId,
        scenarioFamily: scenario.scenarioFamily || 'unspecified',
        coverageTags: scenario.coverageTags || [],
        repo: scenario.repo,
        buyerBranch: scenario.baseRef,
        taskSeed: scenario.expectedTask,
        parserKind: scenario.canonicalRunEvidence?.extractedOutputs?.parserKind || 'github-actions.auth-remediation.v3',
        profileAStatus: PROFILE_A,
        profileBStatus: PROFILE_B
      };
    }),
    assets: state.assets.map(buildPublicAssetSummary),
    ledger: state.ledger,
    latestRun: buildProjectedLatestRun(state.latestRun, resolvedPrincipal, { ensureProjectionPrincipal }),
    runHistory: state.runHistory || []
  };
}
