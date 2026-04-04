import { PROFILE_A, PROFILE_B, buildRealizationProfile } from './realization-profile.js';

function buildBoundaryDescriptions(localBoundary, externalBoundary) {
  return {
    localBoundary,
    externalBoundary,
    profileABoundary: localBoundary,
    profileBBoundary: externalBoundary
  };
}

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

export function buildProjectedLatestRun(latestRun, principal = 'public', { ensureProjectionPrincipal } = {}) {
  const resolvedPrincipal = ensureProjectionPrincipal ? ensureProjectionPrincipal(principal) : principal;
  if (!latestRun) return null;
  if (resolvedPrincipal === 'internal') return latestRun;
  if (resolvedPrincipal === 'buyer') return buildBuyerProjection(latestRun);
  if (resolvedPrincipal === 'reviewer') return buildReviewerProjection(latestRun);
  return buildPublicProjection(latestRun);
}

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
  }
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
