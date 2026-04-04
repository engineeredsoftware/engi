import crypto from 'node:crypto';
import { ExecutionReality, NormalizationPressure, RealizationStage } from './enums.js';
import { PROFILE_A, PROFILE_B, buildRealizationProfile } from '../realization-profile.js';

function sha256(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

function canonicalJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
}

function summarizeStrings(values) {
  return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
}

function countValues(values = []) {
  const counts = {};
  for (const value of values) {
    const key = String(value || '').trim();
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function topCountKeys(counts = {}, limit = 4) {
  return Object.entries(counts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([key]) => key);
}

function intersection(left, right) {
  const a = new Set(left || []);
  return [...new Set((right || []).filter((item) => a.has(item)))];
}

function aggregateRootRef(surfaceId, values = []) {
  const roots = summarizeStrings(values);
  if (!roots.length) return null;
  if (roots.length === 1) return roots[0];
  return `${surfaceId}_aggregate_${sha256(`${surfaceId}:${roots.join('|')}`).slice(0, 12)}`;
}

function buildBoundaryDescriptions(localBoundary, externalBoundary) {
  return {
    localBoundary,
    externalBoundary,
    profileABoundary: localBoundary,
    profileBBoundary: externalBoundary
  };
}

function buildBoundaryRealityStage({ stageId, label, localStatus, localDescription, externalRequirement }) {
  return {
    stageId,
    label,
    localStatus,
    localDescription,
    externalRequirement,
    profileAStatus: localStatus,
    profileADescription: localDescription,
    profileBRequirement: externalRequirement
  };
}

function buildRepoIdentity(repo) {
  const [owner = 'unknown', name = 'repo'] = String(repo || '').split('/');
  return {
    owner,
    name,
    repositoryId: `gh_repo_${sha256(repo || 'unknown').slice(0, 10)}`,
    repositoryNodeId: `R_${sha256(`node:${repo || 'unknown'}`).slice(0, 16)}`
  };
}

function buildRepoSupplySurface(state) {
  const sessions = state.githubAppSessions || [];
  const inventory = state.repoArtifactInventory || [];
  const scenarios = state.needScenarios || [];
  const repos = sessions.map((session) => {
    const repoInventory = inventory.filter((entry) => entry.repo === session.repo);
    const repoScenarios = scenarios.filter((scenario) => scenario.repo === session.repo);
    const artifactKindCounts = countValues(repoInventory.map((entry) => entry.artifactKind));
    const originKindCounts = countValues(repoInventory.map((entry) => entry.originKind));
    const stackCounts = countValues(repoInventory.flatMap((entry) => entry.declaredStacks || []));
    const constraintCounts = countValues(repoInventory.flatMap((entry) => entry.declaredConstraints || []));
    const realizationProfileCounts = countValues(repoScenarios.map((scenario) => buildRealizationProfile(scenario).shortLabel));
    return {
      repo: session.repo,
      authSessionId: session.authSessionId,
      installationId: session.installationId,
      defaultRef: session.defaultRef,
      inventoryEntryCount: repoInventory.length,
      scenarioCount: repoScenarios.length,
      scenarioIds: repoScenarios.map((scenario) => scenario.scenarioId),
      scenarioFamilies: repoScenarios.map((scenario) => scenario.scenarioFamily || scenario.scenarioId),
      realizationProfileCounts,
      artifactKindCounts,
      originKindCounts,
      dominantStacks: topCountKeys(stackCounts, 4),
      dominantConstraints: topCountKeys(constraintCounts, 4),
      ...buildBoundaryDescriptions(
        session.localBoundary || session.profileABoundary,
        session.externalBoundary || session.profileBBoundary
      )
    };
  });
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    repoCount: repos.length,
    inventoryEntryCount: inventory.length,
    scenarioCount: scenarios.length,
    realizationProfileCounts: countValues(scenarios.map((scenario) => buildRealizationProfile(scenario).shortLabel)),
    artifactKindCounts: countValues(inventory.map((entry) => entry.artifactKind)),
    originKindCounts: countValues(inventory.map((entry) => entry.originKind)),
    repos
  };
}

function buildDepositingSurface({ buyer, need, assetPack, selectedCandidates }) {
  const realizationProfile = need.realizationProfile || buildRealizationProfile('A');
  const selectedInventoryEntries = selectedCandidates.flatMap((candidate) => candidate.asset.artifactSelectionSurface?.selectedInventoryEntries || []);
  const selectedInventoryRefs = summarizeStrings(selectedInventoryEntries.map((entry) => entry.inventoryEntryId));
  const selectedArtifactKindCounts = countValues(selectedCandidates.map((candidate) => candidate.asset.artifactKind));
  const selectedOriginKindCounts = countValues(
    selectedInventoryEntries.length
      ? selectedInventoryEntries.map((entry) => entry.originKind)
      : selectedCandidates.map((candidate) => candidate.asset.artifactSelectionSurface?.intakeMode || 'raw-fallback')
  );
  const addressingRoots = selectedCandidates.map((candidate) => candidate.asset.addressingSurface?.addressingRoot).filter(Boolean);
  const signingRoots = selectedCandidates.map((candidate) => candidate.asset.signingSurface?.payloadHash).filter(Boolean);
  const authRoots = selectedCandidates.map((candidate) => candidate.asset.githubAppAuthSurface?.authPayloadHash).filter(Boolean);
  const authSessionIds = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset.githubAppAuthSurface?.authSessionId).filter(Boolean));
  const selectedKinds = Object.keys(selectedArtifactKindCounts);

  return {
    depositSessionId: `deposit_session_${sha256(`${assetPack.assetPackId}:${selectedCandidates.map((candidate) => candidate.assetId).join(':')}`).slice(0, 12)}`,
    depositProfile: realizationProfile.label,
    repoSupplyRef: `repo-supply:${buyer.repo}:${authSessionIds.join('+') || 'unbound'}`,
    selectedInventoryRefs: selectedInventoryRefs.length
      ? selectedInventoryRefs
      : selectedCandidates.map((candidate) => `asset:${candidate.assetId}`),
    selectedArtifactKindCounts,
    selectedOriginKindCounts,
    addressingRoot: aggregateRootRef('addressing', addressingRoots),
    signingRoot: aggregateRootRef('signing', signingRoots),
    authRoot: aggregateRootRef('auth', authRoots),
    depositIntentSummary: selectedCandidates.length
      ? `Deposit ${selectedCandidates.length} repo-authenticated ${selectedCandidates.length === 1 ? 'asset' : 'assets'} from ${buyer.repo} with ${selectedKinds.join(', ')} coverage so ENGI can ${realizationProfile.profileId === 'A' ? 'close a bounded need decisively.' : 'normalize overlapping contribution across a composite need.'}`
      : `No deposited assets are currently bound for ${buyer.repo}.`
  };
}

function buildNeedingSurface(need) {
  const realizationProfile = need.realizationProfile || buildRealizationProfile('A');
  return {
    needId: need.needId,
    realizationProfile,
    parserKind: need.benchmarkParserContract?.parserKind || 'unknown-parser',
    taskSummary: need.task,
    failureModeSummary: need.failureModes || [],
    targetArtifactKinds: need.targetArtifactKinds || [],
    boundednessSummary: realizationProfile.needMode || 'Need boundedness not specified.',
    closureCriteria: need.closureCriteria?.length
      ? need.closureCriteria
      : summarizeStrings([
        ...(need.failingCases || []).slice(0, 2).map((item) => `clear ${item.replace(/-/g, ' ')}`),
        ...(need.constraints || []).slice(0, 2)
      ])
  };
}

function buildDepositingToNeedingSurface({ depositingSurface, needingSurface, selectedCandidates, assetPack, settlementPreview }) {
  const selectedKinds = Object.keys(depositingSurface.selectedArtifactKindCounts || {});
  const overlapKinds = intersection(selectedKinds, needingSurface.targetArtifactKinds || []);
  const decisiveKinds = summarizeStrings(
    selectedCandidates
      .slice()
      .sort((left, right) => right.ranking.finalRankingScore - left.ranking.finalRankingScore || left.assetId.localeCompare(right.assetId))
      .map((candidate) => candidate.asset.artifactKind)
  ).slice(0, 3);
  const profileId = needingSurface.realizationProfile?.profileId || 'A';
  const normalizationPressure = profileId === 'B'
    ? selectedCandidates.length > 1 ? NormalizationPressure.HIGH : NormalizationPressure.MEDIUM
    : selectedCandidates.length > 2 ? NormalizationPressure.MEDIUM : NormalizationPressure.LOW;
  const fitKinds = overlapKinds.length ? overlapKinds.join(', ') : selectedKinds.join(', ');
  const failureFocus = needingSurface.failureModeSummary.slice(0, 2).join('; ') || needingSurface.taskSummary;
  const settlementParticipants = settlementPreview?.settlementParticipatingAssetIds?.length || selectedCandidates.length;
  const creditedAssets = settlementPreview?.creditedAssetIds?.length || selectedCandidates.length;

  return {
    relationId: `deposit_need_fit_${sha256(`${depositingSurface.depositSessionId}:${needingSurface.needId}:${assetPack.assetPackId}`).slice(0, 12)}`,
    depositSessionId: depositingSurface.depositSessionId,
    needId: needingSurface.needId,
    fitSummary: profileId === 'B'
      ? `Deposited ${selectedKinds.length} artifact kind${selectedKinds.length === 1 ? '' : 's'} against a composite need; overlap in ${fitKinds || 'selected coverage'} keeps normalization pressure ${normalizationPressure} before proof and settlement.`
      : `Deposited ${fitKinds || 'selected coverage'} fits a bounded need: ${failureFocus}.`,
    decisiveKinds: decisiveKinds.length ? decisiveKinds : overlapKinds,
    overlapKinds,
    normalizationPressure,
    branchIntentSummary: `Materialize a ${assetPack.branchMode} branch around ${selectedCandidates.length} selected ${selectedCandidates.length === 1 ? 'asset' : 'assets'} so ${fitKinds || 'the deposited coverage'} can close the active need.`,
    proofIntentSummary: profileId === 'B'
      ? `Proof must show that overlapping ${fitKinds || 'selected'} deposits normalize cleanly across the composite need without losing provenance.`
      : `Proof must show that the decisive ${fitKinds || 'selected'} deposit closes ${failureFocus}.`,
    settlementIntentSummary: normalizationPressure === NormalizationPressure.HIGH
      ? `Settlement should replay source-to-shares normalization across ${settlementParticipants} participating assets before final crediting.`
      : `Settlement should credit the decisive deposit once proof closure lands across ${creditedAssets} credited ${creditedAssets === 1 ? 'asset' : 'assets'}.`
  };
}

function allowedActionsForPrincipal(authorizationDecisions = [], principalId) {
  return authorizationDecisions
    .filter((decision) => decision.principalId === principalId && decision.decision === 'allow')
    .map((decision) => decision.action);
}

function buildRepoToSettlementSurface({
  scenarioId,
  depositingSurface,
  needingSurface,
  depositingToNeedingSurface,
  assetPack,
  branchArtifacts,
  selectedCandidates,
  proofWitnessManifest,
  boundedPublicProof,
  settlementPreview
}) {
  const selectedArtifactKindCounts = countValues(selectedCandidates.map((candidate) => candidate.asset.artifactKind));
  const visibleBranchFiles = Object.keys(branchArtifacts?.files || {}).filter((path) => !path.startsWith('.engi/source-material/'));
  const selectedSourceFiles = Object.keys(branchArtifacts?.files || {}).filter((path) => path.startsWith('.engi/source-material/'));
  const proofFamilyCount = proofWitnessManifest?.proofFamilies?.length || 0;
  const settlementParticipantCount = settlementPreview?.settlementParticipatingAssetIds?.length || 0;
  const creditedAssetCount = settlementPreview?.creditedAssetIds?.length || 0;
  const realizationProfile = needingSurface.realizationProfile || buildRealizationProfile('A');

  return {
    flowId: `flow_${sha256(`${scenarioId}:${assetPack.assetPackId}:${settlementPreview?.bundleId || 'pending'}`).slice(0, 12)}`,
    scenarioId,
    branchName: branchArtifacts?.branchName || null,
    realizationProfile,
    depositMode: realizationProfile.depositMode,
    needMode: realizationProfile.needMode,
    stages: [
      {
        stageId: RealizationStage.DEPOSITING,
        label: 'Depositing',
        status: 'repo-authenticated deposit staged',
        boundaryClass: ExecutionReality.EXECUTED_LOCAL,
        summary: depositingSurface.depositIntentSummary,
        refs: [depositingSurface.depositSessionId, depositingSurface.repoSupplyRef, ...depositingSurface.selectedInventoryRefs],
        metrics: {
          repoSupplyRef: depositingSurface.repoSupplyRef,
          inventoryEntries: depositingSurface.selectedInventoryRefs.length,
          selectedAssets: selectedCandidates.length,
          artifactKinds: Object.keys(selectedArtifactKindCounts).length
        }
      },
      {
        stageId: RealizationStage.NEEDING,
        label: 'Needing',
        status: 'measured from benchmark evidence',
        boundaryClass: ExecutionReality.EXECUTED_LOCAL,
        summary: `Need ${needingSurface.needId} was measured as ${needingSurface.taskSummary}`,
        refs: [needingSurface.needId, needingSurface.parserKind, ...needingSurface.targetArtifactKinds].filter(Boolean),
        metrics: {
          parserKind: needingSurface.parserKind,
          failureModes: needingSurface.failureModeSummary.length,
          closureCriteria: needingSurface.closureCriteria.length,
          targetArtifactKinds: needingSurface.targetArtifactKinds.length
        }
      },
      {
        stageId: RealizationStage.DEPOSIT_TO_NEED_FIT,
        label: 'Deposit-to-need fit',
        status: 'fit surfaced before deeper closure',
        boundaryClass: ExecutionReality.EXECUTED_LOCAL,
        summary: depositingToNeedingSurface.fitSummary,
        refs: [
          depositingToNeedingSurface.relationId,
          ...depositingToNeedingSurface.decisiveKinds,
          ...depositingToNeedingSurface.overlapKinds
        ],
        metrics: {
          decisiveKinds: depositingToNeedingSurface.decisiveKinds.length,
          overlapKinds: depositingToNeedingSurface.overlapKinds.length,
          normalizationPressure: depositingToNeedingSurface.normalizationPressure
        }
      },
      {
        stageId: RealizationStage.ASSET_PACK,
        label: 'Selected asset pack',
        status: 'selected into asset pack',
        boundaryClass: ExecutionReality.EXECUTED_LOCAL,
        summary: `${assetPack.selectedAssets.length} asset${assetPack.selectedAssets.length === 1 ? '' : 's'} survived ranking and verification into asset pack ${assetPack.assetPackId}.`,
        refs: [assetPack.assetPackId, ...assetPack.selectedAssets],
        metrics: {
          assetPackId: assetPack.assetPackId,
          selectedAssets: assetPack.selectedAssets.length,
          selectedArtifactKinds: Object.keys(selectedArtifactKindCounts).length,
          settlementEligibleAssets: selectedCandidates.filter((candidate) => candidate.useTier === 'settlement-eligible').length
        }
      },
      {
        stageId: 'branch',
        label: 'Branch',
        status: 'private remediation branch staged',
        boundaryClass: ExecutionReality.EXECUTED_LOCAL,
        summary: `Branch ${branchArtifacts?.branchName || 'pending'} materialized ${visibleBranchFiles.length} visible branch artifact${visibleBranchFiles.length === 1 ? '' : 's'} and ${selectedSourceFiles.length} mounted source file${selectedSourceFiles.length === 1 ? '' : 's'}.`,
        refs: [branchArtifacts?.branchName, ...visibleBranchFiles.slice(0, 8)].filter(Boolean),
        metrics: {
          branchName: branchArtifacts?.branchName || 'pending',
          visibleFiles: visibleBranchFiles.length,
          selectedSourceFiles: selectedSourceFiles.length,
          confidentiality: branchArtifacts?.confidentiality || 'private-required'
        }
      },
      {
        stageId: RealizationStage.PROOF,
        label: 'Proof',
        status: 'proof closure assembled',
        boundaryClass: ExecutionReality.EXECUTED_LOCAL,
        summary: `${proofFamilyCount} proof family${proofFamilyCount === 1 ? '' : 'ies'} were digested into the witness manifest and projected into bounded public proof ${boundedPublicProof?.bundleId || 'pending'}.`,
        refs: [proofWitnessManifest?.proofHash, boundedPublicProof?.bundleId, boundedPublicProof?.redactionStatus].filter(Boolean),
        metrics: {
          witnessFamilies: proofFamilyCount,
          proofHash: proofWitnessManifest?.proofHash || 'pending',
          bundleId: boundedPublicProof?.bundleId || 'pending',
          redactionStatus: boundedPublicProof?.redactionStatus || 'pending'
        }
      },
      {
        stageId: RealizationStage.SETTLEMENT,
        label: 'Settlement',
        status: 'exact settlement preview closed',
        boundaryClass: ExecutionReality.EXECUTED_LOCAL,
        summary: `Bundle ${settlementPreview?.bundleId || 'pending'} classifies ${settlementParticipantCount} settlement participant${settlementParticipantCount === 1 ? '' : 's'} and credits ${creditedAssetCount} asset${creditedAssetCount === 1 ? '' : 's'} in exact micro-units.`,
        refs: [settlementPreview?.bundleId, settlementPreview?.sourceToSharesRef, settlementPreview?.settlementParticipationRef].filter(Boolean),
        metrics: {
          bundleId: settlementPreview?.bundleId || 'pending',
          settlementParticipants: settlementParticipantCount,
          creditedAssets: creditedAssetCount,
          zeroCreditParticipants: settlementPreview?.zeroCreditAssetIds?.length || 0
        }
      }
    ]
  };
}

function buildIdentityAuthSpineSurface({
  buyer,
  branchName,
  selectedCandidates,
  identityBindings,
  authorizationDecisions,
  githubBoundarySurface,
  proofWitnessManifest,
  settlementPreview
}) {
  const installationPrincipalId = buyer.installationId ? `github-app-installation:${buyer.installationId}` : null;
  const buyerPrincipalId = `buyer:${buyer.buyerId}`;
  const sessionBindings = identityBindings.filter((binding) => binding.principalClass === 'github-app-session-principal');
  const signerBindings = identityBindings.filter((binding) => binding.principalClass === 'issuer-principal');
  const selectionRoots = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset.artifactSelectionSurface?.selectedInventoryRoot).filter(Boolean));
  const addressingRoots = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset.addressingSurface?.addressingRoot).filter(Boolean));
  const authPayloadRoots = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset.githubAppAuthSurface?.authPayloadHash).filter(Boolean));
  const signingRoots = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset.signingSurface?.payloadHash).filter(Boolean));

  return {
    spineId: `spine_${sha256(`${buyer.buyerId}:${branchName}:${settlementPreview?.bundleId || 'pending'}`).slice(0, 12)}`,
    buyerPrincipalId,
    installationPrincipalId,
    branchName: branchName || null,
    settlementBundleId: settlementPreview?.bundleId || null,
    hops: [
      {
        hopId: 'github-installation',
        label: 'GitHub App installation authority',
        principalRefs: [installationPrincipalId].filter(Boolean),
        authoritySummary: `Installation-scoped repo auth anchors intake for ${buyer.repo}.`,
        stageRefs: [buyer.repo, buyer.buyerBranch, ...summarizeStrings(githubBoundarySurface?.selectedAuthSessions?.map((session) => session.authSessionId) || [])],
        rootRefs: summarizeStrings(githubBoundarySurface?.selectedAuthSessions?.flatMap((session) => [session.authPayloadHash, session.permissionsRoot]).filter(Boolean) || []),
        boundaryClass: ExecutionReality.MODELED_LOCAL
      },
      {
        hopId: 'repo-supply-selection',
        label: 'Repo supply selection',
        principalRefs: sessionBindings.map((binding) => binding.principalId),
        authoritySummary: 'Selected repo artifacts stay bound to authenticated session payloads and inventory roots.',
        stageRefs: summarizeStrings(selectedCandidates.flatMap((candidate) => candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || [])),
        rootRefs: selectionRoots,
        boundaryClass: ExecutionReality.MODELED_LOCAL
      },
      {
        hopId: 'signer-attestation',
        label: 'Signer attestation',
        principalRefs: signerBindings.map((binding) => binding.principalId),
        authoritySummary: 'Signer payloads bind selection roots, addressing roots, and GitHub App auth roots to each selected asset.',
        stageRefs: selectedCandidates.map((candidate) => candidate.assetId),
        rootRefs: summarizeStrings([...addressingRoots, ...authPayloadRoots, ...signingRoots]),
        boundaryClass: ExecutionReality.EXECUTED_LOCAL
      },
      {
        hopId: 'buyer-authority',
        label: 'Buyer authority',
        principalRefs: [buyerPrincipalId],
        authoritySummary: `Buyer is allowed to ${allowedActionsForPrincipal(authorizationDecisions, buyerPrincipalId).join(', ') || 'inspect the run under policy constraints'}.`,
        stageRefs: [branchName, settlementPreview?.bundleId].filter(Boolean),
        rootRefs: identityBindings.filter((binding) => binding.principalId === buyerPrincipalId).map((binding) => binding.bindingRoot),
        boundaryClass: ExecutionReality.EXECUTED_LOCAL
      },
      {
        hopId: 'branch-authority',
        label: 'ENGI branch authority',
        principalRefs: ['engi-system:branch-materializer'],
        authoritySummary: 'ENGI materializes the private remediation branch and mounted source material under policy release controls.',
        stageRefs: [branchName, `${branchName}/.engi/source-material`].filter(Boolean),
        rootRefs: identityBindings.filter((binding) => binding.principalId === 'engi-system:branch-materializer').map((binding) => binding.bindingRoot),
        boundaryClass: ExecutionReality.EXECUTED_LOCAL
      },
      {
        hopId: 'proof-authority',
        label: 'ENGI proof authority',
        principalRefs: ['engi-system:proof-publisher'],
        authoritySummary: 'ENGI proof publishing authority derives bounded public proof from the private proof closure.',
        stageRefs: [proofWitnessManifest?.proofHash, `${branchName}#bounded-proof`].filter(Boolean),
        rootRefs: identityBindings.filter((binding) => binding.principalId === 'engi-system:proof-publisher').map((binding) => binding.bindingRoot),
        boundaryClass: ExecutionReality.EXECUTED_LOCAL
      },
      {
        hopId: 'settlement-authority',
        label: 'ENGI settlement authority',
        principalRefs: ['engi-system:settlement-engine'],
        authoritySummary: 'ENGI settlement authority closes the exact-accounting journal event for the selected bundle.',
        stageRefs: [settlementPreview?.bundleId, settlementPreview?.sourceToSharesRef, settlementPreview?.settlementParticipationRef].filter(Boolean),
        rootRefs: identityBindings.filter((binding) => binding.principalId === 'engi-system:settlement-engine').map((binding) => binding.bindingRoot),
        boundaryClass: ExecutionReality.EXECUTED_LOCAL
      }
    ]
  };
}

function buildBoundaryRealitySurface() {
  return {
    posture: 'honest-local-prototype',
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    stages: [
      buildBoundaryRealityStage({
        stageId: 'repo-auth-and-supply',
        label: 'Repo auth + supply',
        localStatus: ExecutionReality.MODELED_LOCAL,
        localDescription: 'GitHub App sessions, installation payloads, and repo supply are seeded and hash-bound locally. No live installation token is minted.',
        externalRequirement: 'Exchange a real GitHub App JWT for an installation token and refresh repo supply directly from GitHub APIs.'
      }),
      buildBoundaryRealityStage({
        stageId: 'need-measurement-and-ranking',
        label: 'Need + ranking',
        localStatus: ExecutionReality.EXECUTED_LOCAL,
        localDescription: 'Need measurement, prompt lineage, ranking, and verification execute deterministically inside this repository.',
        externalRequirement: 'Bind those same stages to live repo evidence refresh, remote evaluators as needed, and production policy controls.'
      }),
      buildBoundaryRealityStage({
        stageId: RealizationStage.BRANCH,
        label: 'Branch materialization',
        localStatus: ExecutionReality.EXECUTED_LOCAL,
        localDescription: 'Branch artifacts are materialized locally as deterministic files and manifests. No live Git branch or PR write occurs.',
        externalRequirement: 'Create or update the remediation branch, push artifacts, and open or update the buyer-facing PR.'
      }),
      buildBoundaryRealityStage({
        stageId: 'proof-and-disclosure',
        label: 'Proof + disclosure',
        localStatus: ExecutionReality.EXECUTED_LOCAL,
        localDescription: 'Proof bundling, bounded public proof, redaction proof, and disclosure proof are computed locally from deterministic artifacts.',
        externalRequirement: 'Verify signer and org identity chains and publish bounded proof outputs against the live disclosure boundary.'
      }),
      buildBoundaryRealityStage({
        stageId: 'settlement-effects',
        label: 'Settlement effects',
        localStatus: ExecutionReality.EXECUTED_LOCAL,
        localDescription: 'Settlement preview, participation, source-to-shares, and exact journal diff close locally without network effects.',
        externalRequirement: 'Submit the settlement transaction or equivalent network effect, wait for confirmation, and publish the live receipt.'
      })
    ]
  };
}

function buildGithubBoundarySurface(buyer, need, selectedCandidates) {
  const selectedSessionBindings = [...new Map(
    selectedCandidates
      .filter((candidate) => candidate.asset.githubAppAuthSurface?.authSessionId)
      .map((candidate) => [candidate.asset.githubAppAuthSurface.authSessionId, {
        authSessionId: candidate.asset.githubAppAuthSurface.authSessionId,
        repo: candidate.asset.addressingSurface?.repo,
        installationId: candidate.asset.githubAppAuthSurface.installationId,
        installationAccountLogin: candidate.asset.githubAppAuthSurface.installationAccountLogin,
        installationAccountId: candidate.asset.githubAppAuthSurface.installationAccountId,
        repositoryId: candidate.asset.githubAppAuthSurface.repositoryId,
        repositoryNodeId: candidate.asset.githubAppAuthSurface.repositoryNodeId,
        permissionsRoot: candidate.asset.githubAppAuthSurface.permissionsRoot,
        authPayloadHash: candidate.asset.githubAppAuthSurface.authPayloadHash,
        tokenBoundary: candidate.asset.githubAppAuthSurface.tokenBoundary
      }])
  ).values()];
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    modeledBindings: {
      buyerInstallationId: buyer.installationId,
      repo: buyer.repo,
      repositoryId: buildRepoIdentity(buyer.repo).repositoryId,
      repositoryNodeId: buildRepoIdentity(buyer.repo).repositoryNodeId,
      benchmarkRunId: need.benchmarkRunId,
      benchmarkWorkflowPath: need.benchmarkWorkflowPath,
      selectedAssetGithubBindings: selectedCandidates.map((candidate) => candidate.asset.githubBoundary),
      selectedAssetAuthBindings: selectedCandidates.map((candidate) => ({
        assetId: candidate.assetId,
        authSessionId: candidate.asset.githubAppAuthSurface?.authSessionId,
        installationId: candidate.asset.githubAppAuthSurface?.installationId,
        permissions: candidate.asset.githubAppAuthSurface?.permissions,
        permissionsRoot: candidate.asset.githubAppAuthSurface?.permissionsRoot,
        addressingScope: candidate.asset.addressingSurface?.addressingScope,
        addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
        selectedInventoryEntryIds: candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || [],
        selectedInventoryRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
        authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
        signedPayloadHash: candidate.asset.signingSurface?.payloadHash
      }))
    },
    selectedAuthSessions: selectedSessionBindings,
    selectedInventoryProofs: selectedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      selectionLabel: candidate.asset.artifactSelectionSurface?.selectionLabel,
      selectedInventoryEntries: candidate.asset.artifactSelectionSurface?.selectedInventoryEntries || [],
      selectedInventoryRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
      addressingRoot: candidate.asset.addressingSurface?.addressingRoot
    })),
    authPayloadShape: {
      authMechanism: 'github-app-installation',
      installationId: buyer.installationId,
      repositorySelection: 'selected',
      requiredFields: ['authSessionId', 'appId', 'appSlug', 'installationId', 'installationAccountLogin', 'installationAccountId', 'installationAccountType', 'repositoryId', 'repositoryNodeId', 'permissions', 'permissionsRoot', 'tokenBoundary', 'authPayloadHash']
    },
    ...buildBoundaryDescriptions(
      'Demo stores GitHub/App auth payloads and repo bindings locally but never mints or uses a live installation token.',
      'Live GitHub App installation auth, workflow fetches, PR writes, and branch operations remain external.'
    )
  };
}

export {
  buildRepoSupplySurface,
  buildDepositingSurface,
  buildNeedingSurface,
  buildDepositingToNeedingSurface,
  buildRepoToSettlementSurface,
  buildIdentityAuthSpineSurface,
  buildBoundaryRealitySurface,
  buildGithubBoundarySurface
};
