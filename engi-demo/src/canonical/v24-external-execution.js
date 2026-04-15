// @ts-check

import crypto from 'node:crypto';
import {
  buildArtifactBinding,
  buildReplayStep,
  buildTheoremVerdict,
  allTheoremsPassed as aggregateTheoremVerdicts,
  summarizeStrings
} from './proof-annotations.js';

const BITCOIN_INTERFACE_ID = 'bitcoin-mainchain-execution';
const SIDECHAIN_INTERFACE_ID = 'sidechain-execution';
const COMPUTE_INTERFACE_ID = 'compute-container-execution';
const STORAGE_INTERFACE_ID = 'storage-container-execution';
const GITHUB_INTERFACE_ID = 'github-live-interface';

/**
 * @param {unknown} value
 * @returns {string}
 */
function sha256(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

/**
 * @param {string} value
 * @param {number} [size=12]
 * @returns {string}
 */
function shortId(value, size = 12) {
  return sha256(value).slice(0, size);
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
 * @param {Record<string, unknown> | null | undefined} summary
 * @returns {Record<string, unknown>}
 */
function ensureSummary(summary) {
  return /** @type {Record<string, unknown>} */ (summary || {});
}

/**
 * @param {Record<string, unknown> | null | undefined} profile
 * @param {string} key
 * @returns {Record<string, unknown>}
 */
function activeBinding(profile, key) {
  return ensureSummary(ensureSummary(profile).activeBindings)[key] && typeof ensureSummary(profile).activeBindings === 'object'
    ? /** @type {Record<string, unknown>} */ (ensureSummary(ensureSummary(profile).activeBindings)[key])
    : {};
}

/**
 * @param {Record<string, unknown> | null | undefined} telemetrySummary
 * @param {string} interfaceId
 * @returns {Record<string, unknown>}
 */
function interfaceSummary(telemetrySummary, interfaceId) {
  const summaries = /** @type {Array<Record<string, unknown>>} */ (ensureSummary(telemetrySummary).interfaceSummaries || []);
  return summaries.find((entry) => entry.interfaceId === interfaceId) || {};
}

/**
 * @param {{
 *   externalEnvironmentProfile: Record<string, unknown>,
 *   externalTelemetrySummary: Record<string, unknown>,
 *   bitcoinTreasuryPolicy?: Record<string, unknown> | null,
 *   bitcoinSettlementIntent?: Record<string, unknown> | null,
 *   bitcoinSettlementObservation?: Record<string, unknown> | null,
 *   bitcoinAnchor?: Record<string, unknown> | null,
 *   settlementPreview: Record<string, unknown>,
 *   assetPack: { assetPackId: string },
 *   branchName: string,
 *   paymentMode?: string | null | undefined
 * }} input
 */
export function buildV24BitcoinNetworkArtifacts({
  externalEnvironmentProfile,
  externalTelemetrySummary,
  bitcoinTreasuryPolicy = null,
  bitcoinSettlementIntent = null,
  bitcoinSettlementObservation = null,
  bitcoinAnchor = null,
  settlementPreview,
  assetPack,
  branchName,
  paymentMode
}) {
  const configuredEnvironmentMode = String(externalEnvironmentProfile.configuredEnvironmentMode || 'mock');
  const actualityDisposition = String(externalEnvironmentProfile.actualityDisposition || 'deterministic-mock-only');
  const mainchainBinding = activeBinding(externalEnvironmentProfile, 'bitcoinMainchain');
  const sidechainBinding = activeBinding(externalEnvironmentProfile, 'sidechain');
  const mainchainSummary = interfaceSummary(externalTelemetrySummary, BITCOIN_INTERFACE_ID);
  const sidechainSummary = interfaceSummary(externalTelemetrySummary, SIDECHAIN_INTERFACE_ID);
  const activePaymentMode = String(paymentMode || '');
  const mainchainActive = !!bitcoinSettlementIntent && !!bitcoinSettlementObservation;
  const sidechainActive = activePaymentMode === 'checkpointed-sidechain-bridge';

  const bitcoinNetworkIntent = {
    artifactId: `v24_bitcoin_network_intent_${shortId(`${branchName}:${activePaymentMode || 'none'}`, 16)}`,
    interfaceId: BITCOIN_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    paymentMode: activePaymentMode || null,
    modeApplicability: mainchainActive ? 'active' : 'inactive-no-payment-mode',
    bundleId: settlementPreview.bundleId || null,
    needId: settlementPreview.needId || null,
    assetPackId: assetPack.assetPackId,
    unitDenomination: bitcoinSettlementIntent?.unitDenomination || 'NGI',
    meteredMicroUnits: bitcoinSettlementIntent?.meteredMicroUnits || settlementPreview.meteredMicroUnits || null,
    treasuryPolicyRef: bitcoinTreasuryPolicy?.policyId || null,
    requestId: mainchainSummary.requestId || null,
    intentRef: bitcoinSettlementIntent?.intentId || null,
    carrierType: bitcoinSettlementIntent?.carrierType || null,
    transportNetwork: bitcoinSettlementIntent?.transportNetwork || mainchainBinding.network || null,
    environmentIdentityRef: mainchainSummary.environmentIdentityRef || mainchainBinding.accountRef || null,
    environmentResourceRef: mainchainSummary.environmentResourceRef || mainchainBinding.addressRef || null,
    affectedArtifactRefs: summarizeStrings(mainchainSummary.affectedArtifactRefs || [])
  };

  const bitcoinNetworkExecution = {
    artifactId: `v24_bitcoin_network_execution_${shortId(`${branchName}:${configuredEnvironmentMode}`, 16)}`,
    interfaceId: BITCOIN_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    executionId: mainchainSummary.executionId || null,
    requestId: mainchainSummary.requestId || null,
    observationId: bitcoinSettlementObservation?.observationId || mainchainSummary.observationId || null,
    executionClass: mainchainSummary.executionClass || mainchainBinding.executionClass || null,
    executionState: mainchainActive ? 'stubbed-network-carrier-assembled' : 'inactive-no-payment-mode',
    settlementIntentRef: bitcoinSettlementIntent?.intentId || null,
    networkRef: bitcoinSettlementObservation?.networkRef || null,
    anchorRef: bitcoinAnchor?.anchorRef || null,
    environmentIdentityRef: mainchainSummary.environmentIdentityRef || mainchainBinding.accountRef || null,
    environmentResourceRef: mainchainSummary.environmentResourceRef || mainchainBinding.addressRef || null,
    affectedArtifactRefs: summarizeStrings(mainchainSummary.affectedArtifactRefs || []),
    serviceMode: bitcoinSettlementIntent?.serviceMode || null
  };

  const bitcoinNetworkObservation = {
    artifactId: `v24_bitcoin_network_observation_${shortId(`${branchName}:${activePaymentMode || 'none'}`, 16)}`,
    interfaceId: BITCOIN_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    bundleId: settlementPreview.bundleId || null,
    needId: settlementPreview.needId || null,
    observationId: bitcoinSettlementObservation?.observationId || mainchainSummary.observationId || null,
    executionId: mainchainSummary.executionId || null,
    observationState: mainchainActive ? 'observed-from-demonstration-service' : 'not-requested',
    networkState: bitcoinSettlementObservation?.networkState || 'not-requested',
    confirmationState: bitcoinSettlementObservation?.confirmationState || 'not-requested',
    confirmations: bitcoinSettlementObservation?.confirmations ?? 0,
    networkRef: bitcoinSettlementObservation?.networkRef || null,
    anchorRef: bitcoinAnchor?.anchorRef || null,
    observedValue: bitcoinSettlementObservation?.observedValue || settlementPreview.meteredMicroUnits || null,
    journalBindingState: bitcoinSettlementObservation?.journalBindingState || 'not-applicable',
    serviceReceipt: bitcoinSettlementObservation?.serviceReceipt || null,
    affectedArtifactRefs: summarizeStrings(mainchainSummary.affectedArtifactRefs || [])
  };

  const sidechainExecutionReceipt = {
    artifactId: `v24_sidechain_execution_receipt_${shortId(`${branchName}:${activePaymentMode || 'none'}`, 16)}`,
    interfaceId: SIDECHAIN_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    paymentMode: activePaymentMode || null,
    modeApplicability: sidechainActive ? 'active' : 'inactive-for-mode',
    executionId: sidechainSummary.executionId || null,
    requestId: sidechainSummary.requestId || null,
    observationId: sidechainSummary.observationId || null,
    executionClass: sidechainSummary.executionClass || sidechainBinding.executionClass || null,
    executionState: sidechainActive ? 'stubbed-sidechain-checkpoint-observed' : 'inactive-for-mode',
    sidechainNetwork: sidechainBinding.network || null,
    checkpointRef: sidechainActive ? bitcoinSettlementObservation?.networkRef || null : null,
    environmentIdentityRef: sidechainSummary.environmentIdentityRef || sidechainBinding.accountRef || null,
    environmentResourceRef: sidechainSummary.environmentResourceRef || sidechainBinding.addressRef || null,
    treasuryPolicyRef: bitcoinTreasuryPolicy?.policyId || null,
    affectedArtifactRefs: summarizeStrings(sidechainSummary.affectedArtifactRefs || [])
  };

  return {
    bitcoinNetworkIntent,
    bitcoinNetworkExecution,
    bitcoinNetworkObservation,
    sidechainExecutionReceipt
  };
}

/**
 * @param {{
 *   externalEnvironmentProfile: Record<string, unknown>,
 *   externalTelemetrySummary: Record<string, unknown>,
 *   computeRealityManifest?: Record<string, unknown> | null,
 *   storageRealityManifest?: Record<string, unknown> | null,
 *   branchName: string,
 *   need: { needId: string },
 *   assetPack: { assetPackId: string }
 * }} input
 */
export function buildV24ContainerArtifacts({
  externalEnvironmentProfile,
  externalTelemetrySummary,
  computeRealityManifest = null,
  storageRealityManifest = null,
  branchName,
  need,
  assetPack
}) {
  const configuredEnvironmentMode = String(externalEnvironmentProfile.configuredEnvironmentMode || 'mock');
  const actualityDisposition = String(externalEnvironmentProfile.actualityDisposition || 'deterministic-mock-only');
  const computeBinding = activeBinding(externalEnvironmentProfile, 'compute');
  const storageBinding = activeBinding(externalEnvironmentProfile, 'storage');
  const computeSummary = interfaceSummary(externalTelemetrySummary, COMPUTE_INTERFACE_ID);
  const storageSummary = interfaceSummary(externalTelemetrySummary, STORAGE_INTERFACE_ID);

  const computeContainerManifest = {
    manifestId: `v24_compute_container_manifest_${shortId(`${branchName}:${need.needId}`, 16)}`,
    interfaceId: COMPUTE_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    branchName,
    needId: need.needId,
    assetPackId: assetPack.assetPackId,
    registryRef: computeBinding.registryRef || null,
    executionIdentityRef: computeBinding.executionIdentityRef || null,
    attestationScopeRef: computeBinding.attestationScopeRef || null,
    queueRef: computeBinding.queueRef || null,
    sourceRealityRef: computeRealityManifest?.realityId || null,
    proofArtifactRefs: summarizeStrings(computeRealityManifest?.proofArtifactRefs || []),
    settlementArtifactRefs: summarizeStrings(computeRealityManifest?.settlementArtifactRefs || computeRealityManifest?.replayBasis?.settlementArtifactRefs || [])
  };

  const computeContainerExecution = {
    executionId: computeSummary.executionId || `exec_${shortId(computeContainerManifest.manifestId, 16)}`,
    interfaceId: COMPUTE_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    requestId: computeSummary.requestId || null,
    observationId: computeSummary.observationId || null,
    manifestRef: computeContainerManifest.manifestId,
    executionClass: computeSummary.executionClass || computeBinding.executionClass || null,
    executionState: configuredEnvironmentMode === 'mock' ? 'mock-container-emulation' : 'deterministic-container-standin',
    attestationRef: `attest_${shortId(`${computeContainerManifest.manifestId}:${configuredEnvironmentMode}`, 16)}`,
    imageDigest: stableHashObject({
      registryRef: computeBinding.registryRef || null,
      executionIdentityRef: computeBinding.executionIdentityRef || null,
      branchName,
      needId: need.needId
    }),
    environmentIdentityRef: computeSummary.environmentIdentityRef || computeBinding.executionIdentityRef || null,
    environmentResourceRef: computeSummary.environmentResourceRef || computeBinding.registryRef || null,
    outputArtifactRefs: summarizeStrings([
      ...computeContainerManifest.proofArtifactRefs,
      ...computeContainerManifest.settlementArtifactRefs
    ])
  };

  const storageContainerManifest = {
    manifestId: `v24_storage_container_manifest_${shortId(`${branchName}:${assetPack.assetPackId}`, 16)}`,
    interfaceId: STORAGE_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    branchName,
    needId: need.needId,
    assetPackId: assetPack.assetPackId,
    namespaceRef: storageBinding.namespaceRef || null,
    bucketRef: storageBinding.bucketRef || null,
    publicationEndpointRef: storageBinding.publicationEndpointRef || null,
    retentionPolicyRef: storageBinding.retentionPolicyRef || null,
    retrievalCredentialRef: storageBinding.retrievalCredentialRef || null,
    sourceRealityRef: storageRealityManifest?.realityId || null,
    scopeStorageBindings: storageRealityManifest?.scopeStorageBindings || []
  };

  const publishedArtifactCount = (storageContainerManifest.scopeStorageBindings || [])
    .reduce((sum, entry) => sum + summarizeStrings(entry?.artifactPaths || []).length, 0);

  const storagePublicationReceipt = {
    receiptId: `storage_pub_${shortId(storageContainerManifest.manifestId, 16)}`,
    interfaceId: STORAGE_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    requestId: storageSummary.requestId || null,
    executionId: storageSummary.executionId || null,
    observationId: storageSummary.observationId || null,
    manifestRef: storageContainerManifest.manifestId,
    publicationState: configuredEnvironmentMode === 'mock' ? 'mock-storage-publication' : 'deterministic-storage-publication',
    environmentIdentityRef: storageSummary.environmentIdentityRef || storageBinding.namespaceRef || null,
    environmentResourceRef: storageSummary.environmentResourceRef || storageBinding.bucketRef || null,
    publishedArtifactCount,
    publishedScopeIds: summarizeStrings((storageContainerManifest.scopeStorageBindings || []).map((entry) => entry.scopeId))
  };

  const storageRetrievalReceipt = {
    receiptId: `storage_get_${shortId(storageContainerManifest.manifestId, 16)}`,
    interfaceId: STORAGE_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    requestId: storageSummary.requestId || null,
    executionId: storageSummary.executionId || null,
    observationId: storageSummary.observationId || null,
    manifestRef: storageContainerManifest.manifestId,
    retrievalState: configuredEnvironmentMode === 'mock' ? 'mock-storage-retrieval' : 'deterministic-storage-retrieval',
    environmentIdentityRef: storageSummary.environmentIdentityRef || storageBinding.retrievalCredentialRef || null,
    environmentResourceRef: storageSummary.environmentResourceRef || storageBinding.bucketRef || null,
    retrievableArtifactCount: publishedArtifactCount,
    retrievalScopeIds: storagePublicationReceipt.publishedScopeIds
  };

  return {
    computeContainerManifest,
    computeContainerExecution,
    storageContainerManifest,
    storagePublicationReceipt,
    storageRetrievalReceipt
  };
}

/**
 * @param {{
 *   externalEnvironmentProfile: Record<string, unknown>,
 *   externalTelemetrySummary: Record<string, unknown>,
 *   githubAppBinding: Record<string, unknown>,
 *   githubBoundarySurface: Record<string, unknown>,
 *   selectedCandidates: Array<{ assetId: string, asset?: { githubBoundary?: Record<string, unknown> } | undefined }>,
 *   buyer: { repo: string },
 *   branchName: string,
 *   assetPack: { assetPackId: string }
 * }} input
 */
export function buildV24GithubArtifacts({
  externalEnvironmentProfile,
  externalTelemetrySummary,
  githubAppBinding,
  githubBoundarySurface,
  selectedCandidates,
  buyer,
  branchName,
  assetPack
}) {
  const configuredEnvironmentMode = String(externalEnvironmentProfile.configuredEnvironmentMode || 'mock');
  const actualityDisposition = String(externalEnvironmentProfile.actualityDisposition || 'deterministic-mock-only');
  const githubBinding = activeBinding(externalEnvironmentProfile, 'github');
  const githubSummary = interfaceSummary(externalTelemetrySummary, GITHUB_INTERFACE_ID);
  const selectedSession = /** @type {Array<Record<string, unknown>>} */ (githubBoundarySurface.selectedAuthSessions || [])[0] || {};
  const workflowRunIds = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset?.githubBoundary?.workflowRunId));
  const sourceCommits = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset?.githubBoundary?.sourceCommit));

  const githubLiveSession = {
    sessionId: `v24_github_live_session_${shortId(`${branchName}:${buyer.repo}`, 16)}`,
    interfaceId: GITHUB_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    repo: buyer.repo,
    branchName,
    appRef: githubBinding.appRef || githubAppBinding.activeBinding?.appRef || null,
    appId: githubBinding.appId || githubAppBinding.activeBinding?.appId || null,
    installationTargetRef: githubBinding.installationTargetRef || githubAppBinding.activeBinding?.installationTargetRef || null,
    authSessionId: selectedSession.authSessionId || null,
    authPayloadHash: selectedSession.authPayloadHash || null,
    permissionsRoot: selectedSession.permissionsRoot || null,
    requestId: githubSummary.requestId || null,
    executionId: githubSummary.executionId || null,
    observationId: githubSummary.observationId || null
  };

  const githubInventoryFetchReceipt = {
    receiptId: `v24_github_inventory_fetch_${shortId(`${buyer.repo}:${assetPack.assetPackId}`, 16)}`,
    interfaceId: GITHUB_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    sessionRef: githubLiveSession.sessionId,
    fetchState: configuredEnvironmentMode === 'mock' ? 'mock-seeded-inventory' : 'deterministic-repo-inventory-fetch',
    targetedRepoCount: Number(githubAppBinding.targetedRepoCount || 0),
    selectedBindingCount: Number((githubBoundarySurface.selectedInventoryProofs || []).length || 0)
  };

  const githubArtifactFetchReceipt = {
    receiptId: `v24_github_artifact_fetch_${shortId(`${branchName}:${workflowRunIds.join(':') || 'none'}`, 16)}`,
    interfaceId: GITHUB_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    sessionRef: githubLiveSession.sessionId,
    fetchState: configuredEnvironmentMode === 'mock' ? 'mock-seeded-artifact-fetch' : 'deterministic-artifact-fetch',
    workflowRunIds,
    sourceCommits,
    selectedAssetIds: summarizeStrings(selectedCandidates.map((candidate) => candidate.assetId))
  };

  const githubBranchPublicationReceipt = {
    receiptId: `v24_github_branch_publication_${shortId(`${buyer.repo}:${branchName}`, 16)}`,
    interfaceId: GITHUB_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    sessionRef: githubLiveSession.sessionId,
    mutationState: configuredEnvironmentMode === 'mock' ? 'mock-nonmutating' : 'stubbed-nonmutating-branch-publication',
    targetRepo: buyer.repo,
    branchName,
    assetPackId: assetPack.assetPackId
  };

  const githubPrUpdateReceipt = {
    receiptId: `v24_github_pr_update_${shortId(`${branchName}:${assetPack.assetPackId}`, 16)}`,
    interfaceId: GITHUB_INTERFACE_ID,
    configuredEnvironmentMode,
    actualityDisposition,
    sessionRef: githubLiveSession.sessionId,
    mutationState: configuredEnvironmentMode === 'mock' ? 'mock-nonmutating' : 'stubbed-nonmutating-pr-update',
    targetRepo: buyer.repo,
    branchName,
    prNumber: null,
    reviewUpdateState: 'not-opened-in-draft-target'
  };

  return {
    githubLiveSession,
    githubInventoryFetchReceipt,
    githubArtifactFetchReceipt,
    githubBranchPublicationReceipt,
    githubPrUpdateReceipt
  };
}

/**
 * @param {{
 *   externalEnvironmentProfile: Record<string, unknown>,
 *   externalExecutionPolicy: Record<string, unknown>,
 *   externalTelemetrySummary: Record<string, unknown>,
 *   bitcoinNetworkIntent: Record<string, unknown>,
 *   bitcoinNetworkExecution: Record<string, unknown>,
 *   bitcoinNetworkObservation: Record<string, unknown>,
 *   sidechainExecutionReceipt: Record<string, unknown>
 * }} input
 */
export function buildV24ExternalRealizationProof({
  externalEnvironmentProfile,
  externalExecutionPolicy,
  externalTelemetrySummary,
  bitcoinNetworkIntent,
  bitcoinNetworkExecution,
  bitcoinNetworkObservation,
  sidechainExecutionReceipt
}) {
  const witnessArtifactPaths = [
    '.engi/external-environment-profile.json',
    '.engi/external-execution-policy.json',
    '.engi/external-telemetry-summary.json',
    '.engi/bitcoin-network-intent.json',
    '.engi/bitcoin-network-execution.json',
    '.engi/bitcoin-network-observation.json',
    '.engi/sidechain-execution-receipt.json'
  ];
  const replayArtifacts = witnessArtifactPaths.slice();
  const replaySteps = [
    buildReplayStep({
      stepId: 'external-realization-execution.intent',
      theoremIds: ['external_realization_execution.intent_binding', 'external_realization_execution.mode_isolation_closure'],
      requiredArtifactPaths: ['.engi/external-environment-profile.json', '.engi/bitcoin-network-intent.json', '.engi/external-telemetry-summary.json'],
      instruction: 'Replay the external environment and mainchain intent against mode and identity bindings.'
    }),
    buildReplayStep({
      stepId: 'external-realization-execution.execution',
      theoremIds: ['external_realization_execution.execution_closure'],
      requiredArtifactPaths: ['.engi/bitcoin-network-intent.json', '.engi/bitcoin-network-execution.json', '.engi/external-execution-policy.json'],
      instruction: 'Replay execution closure between declared intent, execution carrier, and execution policy.'
    }),
    buildReplayStep({
      stepId: 'external-realization-execution.observation',
      theoremIds: ['external_realization_execution.observation_closure'],
      requiredArtifactPaths: ['.engi/bitcoin-network-observation.json', '.engi/sidechain-execution-receipt.json', '.engi/external-telemetry-summary.json'],
      instruction: 'Replay observation closure across mainchain observation, sidechain receipt, and telemetry summaries.'
    })
  ];

  const configuredEnvironmentMode = externalEnvironmentProfile.configuredEnvironmentMode;
  const sameMode =
    bitcoinNetworkIntent.configuredEnvironmentMode === configuredEnvironmentMode
    && bitcoinNetworkExecution.configuredEnvironmentMode === configuredEnvironmentMode
    && bitcoinNetworkObservation.configuredEnvironmentMode === configuredEnvironmentMode
    && sidechainExecutionReceipt.configuredEnvironmentMode === configuredEnvironmentMode;
  const intentBindingClosed = bitcoinNetworkIntent.interfaceId === BITCOIN_INTERFACE_ID
    && bitcoinNetworkIntent.bundleId === bitcoinNetworkObservation.bundleId
    && bitcoinNetworkIntent.requestId === bitcoinNetworkExecution.requestId;
  const executionClosed = bitcoinNetworkExecution.interfaceId === BITCOIN_INTERFACE_ID
    && bitcoinNetworkExecution.observationId === bitcoinNetworkObservation.observationId
    && bitcoinNetworkExecution.executionState !== null;
  const observationClosed = bitcoinNetworkObservation.interfaceId === BITCOIN_INTERFACE_ID
    && bitcoinNetworkObservation.affectedArtifactRefs.length >= 1
    && String(externalTelemetrySummary.configuredEnvironmentMode || '') === String(configuredEnvironmentMode || '');
  const sidechainClosed = sidechainExecutionReceipt.interfaceId === SIDECHAIN_INTERFACE_ID
    && (sidechainExecutionReceipt.modeApplicability === 'inactive-for-mode'
      || sidechainExecutionReceipt.executionState === 'stubbed-sidechain-checkpoint-observed');

  const theoremVerdicts = [
    buildTheoremVerdict({
      theoremId: 'external_realization_execution.intent_binding',
      passed: intentBindingClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['external-realization-execution.intent'],
      failureReasons: intentBindingClosed ? [] : ['bitcoin network intent does not bind to the same bundle and request surface']
    }),
    buildTheoremVerdict({
      theoremId: 'external_realization_execution.execution_closure',
      passed: executionClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['external-realization-execution.execution'],
      failureReasons: executionClosed ? [] : ['bitcoin network execution does not close over the declared intent and observation ids']
    }),
    buildTheoremVerdict({
      theoremId: 'external_realization_execution.observation_closure',
      passed: observationClosed && sidechainClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['external-realization-execution.observation'],
      failureReasons: observationClosed && sidechainClosed ? [] : ['network observation or sidechain receipt closure drifted from telemetry and mode policy']
    }),
    buildTheoremVerdict({
      theoremId: 'external_realization_execution.mode_isolation_closure',
      passed: sameMode && externalExecutionPolicy.isolationDisposition === 'blocking-on-cross-mode-resource-reuse',
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['external-realization-execution.intent'],
      failureReasons: sameMode ? [] : ['external execution artifacts do not reconcile to one configured environment mode']
    })
  ];

  return {
    proofFamily: 'external-realization-execution',
    memberVerdicts: [
      { memberId: 'mainchain-intent-binding', passed: intentBindingClosed },
      { memberId: 'network-execution-binding', passed: executionClosed },
      { memberId: 'network-observation-binding', passed: observationClosed },
      { memberId: 'sidechain-observation-binding', passed: sidechainClosed },
      { memberId: 'mode-isolation-closure', passed: sameMode }
    ],
    theoremVerdicts,
    artifactBindings: [
      buildArtifactBinding({ artifactPath: '.engi/external-environment-profile.json', role: 'environment-profile', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/external-execution-policy.json', role: 'execution-policy', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/external-telemetry-summary.json', role: 'telemetry-summary', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/bitcoin-network-intent.json', role: 'mainchain-intent', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/bitcoin-network-execution.json', role: 'mainchain-execution', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/bitcoin-network-observation.json', role: 'mainchain-observation', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/sidechain-execution-receipt.json', role: 'sidechain-receipt', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) })
    ],
    replaySteps,
    witnessArtifactPaths,
    replayArtifacts,
    replayInstructions: replaySteps.map((entry) => entry.instruction),
    allCasesPassed: intentBindingClosed && executionClosed && observationClosed && sidechainClosed && sameMode,
    allTheoremsPassed: aggregateTheoremVerdicts(theoremVerdicts),
    proofHash: stableHashObject({
      configuredEnvironmentMode,
      intentRef: bitcoinNetworkIntent.intentRef,
      executionId: bitcoinNetworkExecution.executionId,
      observationId: bitcoinNetworkObservation.observationId,
      sidechainModeApplicability: sidechainExecutionReceipt.modeApplicability
    })
  };
}

/**
 * @param {{
 *   externalEnvironmentProfile: Record<string, unknown>,
 *   computeContainerManifest: Record<string, unknown>,
 *   computeContainerExecution: Record<string, unknown>,
 *   storageContainerManifest: Record<string, unknown>,
 *   storagePublicationReceipt: Record<string, unknown>,
 *   storageRetrievalReceipt: Record<string, unknown>
 * }} input
 */
export function buildV24ContainerRealityProof({
  externalEnvironmentProfile,
  computeContainerManifest,
  computeContainerExecution,
  storageContainerManifest,
  storagePublicationReceipt,
  storageRetrievalReceipt
}) {
  const witnessArtifactPaths = [
    '.engi/external-environment-profile.json',
    '.engi/compute-container-manifest.json',
    '.engi/compute-container-execution.json',
    '.engi/storage-container-manifest.json',
    '.engi/storage-publication-receipt.json',
    '.engi/storage-retrieval-receipt.json'
  ];
  const replayArtifacts = witnessArtifactPaths.slice();
  const replaySteps = [
    buildReplayStep({
      stepId: 'containerized-reality.compute-execution',
      theoremIds: ['containerized_reality.compute_manifest_closure', 'containerized_reality.compute_attestation_closure'],
      requiredArtifactPaths: ['.engi/external-environment-profile.json', '.engi/compute-container-manifest.json', '.engi/compute-container-execution.json'],
      instruction: 'Replay compute container manifest closure and attestation binding.'
    }),
    buildReplayStep({
      stepId: 'containerized-reality.storage-publication',
      theoremIds: ['containerized_reality.storage_publication_closure'],
      requiredArtifactPaths: ['.engi/storage-container-manifest.json', '.engi/storage-publication-receipt.json'],
      instruction: 'Replay storage publication closure against the declared storage manifest.'
    }),
    buildReplayStep({
      stepId: 'containerized-reality.storage-retrieval',
      theoremIds: ['containerized_reality.storage_policy_closure'],
      requiredArtifactPaths: ['.engi/storage-container-manifest.json', '.engi/storage-retrieval-receipt.json'],
      instruction: 'Replay storage retrieval closure against the declared storage manifest.'
    })
  ];

  const configuredEnvironmentMode = externalEnvironmentProfile.configuredEnvironmentMode;
  const computeClosed = computeContainerManifest.configuredEnvironmentMode === configuredEnvironmentMode
    && computeContainerExecution.manifestRef === computeContainerManifest.manifestId
    && summarizeStrings(computeContainerExecution.outputArtifactRefs || []).length >= 1;
  const storagePublicationClosed = storageContainerManifest.configuredEnvironmentMode === configuredEnvironmentMode
    && storagePublicationReceipt.manifestRef === storageContainerManifest.manifestId
    && Number(storagePublicationReceipt.publishedArtifactCount || 0) >= 1;
  const storageRetrievalClosed = storageRetrievalReceipt.manifestRef === storageContainerManifest.manifestId
    && Number(storageRetrievalReceipt.retrievableArtifactCount || 0) === Number(storagePublicationReceipt.publishedArtifactCount || 0);

  const theoremVerdicts = [
    buildTheoremVerdict({
      theoremId: 'containerized_reality.compute_manifest_closure',
      passed: computeClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['containerized-reality.compute-execution'],
      failureReasons: computeClosed ? [] : ['compute container manifest and execution do not reconcile']
    }),
    buildTheoremVerdict({
      theoremId: 'containerized_reality.compute_attestation_closure',
      passed: !!computeContainerExecution.attestationRef && !!computeContainerExecution.imageDigest,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['containerized-reality.compute-execution'],
      failureReasons: computeContainerExecution.attestationRef && computeContainerExecution.imageDigest ? [] : ['compute container execution is missing attestation or image digest']
    }),
    buildTheoremVerdict({
      theoremId: 'containerized_reality.storage_publication_closure',
      passed: storagePublicationClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['containerized-reality.storage-publication'],
      failureReasons: storagePublicationClosed ? [] : ['storage publication receipt does not reconcile to the storage manifest']
    }),
    buildTheoremVerdict({
      theoremId: 'containerized_reality.storage_policy_closure',
      passed: storageRetrievalClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['containerized-reality.storage-retrieval'],
      failureReasons: storageRetrievalClosed ? [] : ['storage retrieval receipt diverges from the publication contract']
    })
  ];

  return {
    proofFamily: 'containerized-reality',
    memberVerdicts: [
      { memberId: 'compute-manifest-binding', passed: computeClosed },
      { memberId: 'compute-attestation-binding', passed: !!computeContainerExecution.attestationRef && !!computeContainerExecution.imageDigest },
      { memberId: 'storage-manifest-binding', passed: storageContainerManifest.configuredEnvironmentMode === configuredEnvironmentMode },
      { memberId: 'storage-publication-binding', passed: storagePublicationClosed },
      { memberId: 'storage-retrieval-binding', passed: storageRetrievalClosed }
    ],
    theoremVerdicts,
    artifactBindings: [
      buildArtifactBinding({ artifactPath: '.engi/external-environment-profile.json', role: 'environment-profile', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/compute-container-manifest.json', role: 'compute-manifest', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/compute-container-execution.json', role: 'compute-execution', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/storage-container-manifest.json', role: 'storage-manifest', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/storage-publication-receipt.json', role: 'storage-publication', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/storage-retrieval-receipt.json', role: 'storage-retrieval', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) })
    ],
    replaySteps,
    witnessArtifactPaths,
    replayArtifacts,
    replayInstructions: replaySteps.map((entry) => entry.instruction),
    allCasesPassed: computeClosed && storagePublicationClosed && storageRetrievalClosed,
    allTheoremsPassed: aggregateTheoremVerdicts(theoremVerdicts),
    proofHash: stableHashObject({
      configuredEnvironmentMode,
      computeManifestRef: computeContainerManifest.manifestId,
      storageManifestRef: storageContainerManifest.manifestId,
      publicationReceiptId: storagePublicationReceipt.receiptId,
      retrievalReceiptId: storageRetrievalReceipt.receiptId
    })
  };
}

/**
 * @param {{
 *   externalEnvironmentProfile: Record<string, unknown>,
 *   githubAppBinding: Record<string, unknown>,
 *   githubLiveSession: Record<string, unknown>,
 *   githubInventoryFetchReceipt: Record<string, unknown>,
 *   githubArtifactFetchReceipt: Record<string, unknown>,
 *   githubBranchPublicationReceipt: Record<string, unknown>,
 *   githubPrUpdateReceipt: Record<string, unknown>
 * }} input
 */
export function buildV24GithubLiveInterfaceProof({
  externalEnvironmentProfile,
  githubAppBinding,
  githubLiveSession,
  githubInventoryFetchReceipt,
  githubArtifactFetchReceipt,
  githubBranchPublicationReceipt,
  githubPrUpdateReceipt
}) {
  const witnessArtifactPaths = [
    '.engi/external-environment-profile.json',
    '.engi/github-app-binding.json',
    '.engi/github-live-session.json',
    '.engi/github-inventory-fetch-receipt.json',
    '.engi/github-artifact-fetch-receipt.json',
    '.engi/github-branch-publication-receipt.json',
    '.engi/github-pr-update-receipt.json'
  ];
  const replayArtifacts = witnessArtifactPaths.slice();
  const replaySteps = [
    buildReplayStep({
      stepId: 'github-live-interface.session',
      theoremIds: ['github_live_interface.app_binding_closure', 'github_live_interface.session_closure', 'github_live_interface.mode_isolation_closure'],
      requiredArtifactPaths: ['.engi/external-environment-profile.json', '.engi/github-app-binding.json', '.engi/github-live-session.json'],
      instruction: 'Replay GitHub app binding and live session closure against the environment profile.'
    }),
    buildReplayStep({
      stepId: 'github-live-interface.fetch',
      theoremIds: ['github_live_interface.fetch_closure'],
      requiredArtifactPaths: ['.engi/github-live-session.json', '.engi/github-inventory-fetch-receipt.json', '.engi/github-artifact-fetch-receipt.json'],
      instruction: 'Replay GitHub inventory and artifact fetch closure against the live session.'
    }),
    buildReplayStep({
      stepId: 'github-live-interface.branch-publication',
      theoremIds: ['github_live_interface.mutation_closure'],
      requiredArtifactPaths: ['.engi/github-branch-publication-receipt.json', '.engi/github-pr-update-receipt.json'],
      instruction: 'Replay branch publication and PR update closure against the live session and bound repo.'
    })
  ];

  const configuredEnvironmentMode = externalEnvironmentProfile.configuredEnvironmentMode;
  const appBindingClosed = githubLiveSession.configuredEnvironmentMode === configuredEnvironmentMode
    && githubLiveSession.appRef === githubAppBinding.activeBinding?.appRef;
  const sessionClosed = !!githubLiveSession.authSessionId && !!githubLiveSession.authPayloadHash;
  const fetchClosed = githubInventoryFetchReceipt.sessionRef === githubLiveSession.sessionId
    && githubArtifactFetchReceipt.sessionRef === githubLiveSession.sessionId;
  const mutationClosed = githubBranchPublicationReceipt.sessionRef === githubLiveSession.sessionId
    && githubPrUpdateReceipt.sessionRef === githubLiveSession.sessionId
    && githubBranchPublicationReceipt.branchName === githubPrUpdateReceipt.branchName;

  const theoremVerdicts = [
    buildTheoremVerdict({
      theoremId: 'github_live_interface.app_binding_closure',
      passed: appBindingClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['github-live-interface.session'],
      failureReasons: appBindingClosed ? [] : ['github app binding does not reconcile to the emitted live session']
    }),
    buildTheoremVerdict({
      theoremId: 'github_live_interface.session_closure',
      passed: sessionClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['github-live-interface.session'],
      failureReasons: sessionClosed ? [] : ['github live session is missing auth roots']
    }),
    buildTheoremVerdict({
      theoremId: 'github_live_interface.fetch_closure',
      passed: fetchClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['github-live-interface.fetch'],
      failureReasons: fetchClosed ? [] : ['github inventory or artifact fetch receipt diverges from the live session']
    }),
    buildTheoremVerdict({
      theoremId: 'github_live_interface.mutation_closure',
      passed: mutationClosed,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['github-live-interface.branch-publication'],
      failureReasons: mutationClosed ? [] : ['GitHub mutation receipts do not reconcile to one session and branch']
    }),
    buildTheoremVerdict({
      theoremId: 'github_live_interface.mode_isolation_closure',
      passed: githubLiveSession.configuredEnvironmentMode === configuredEnvironmentMode,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replayStepIds: ['github-live-interface.session'],
      failureReasons: githubLiveSession.configuredEnvironmentMode === configuredEnvironmentMode ? [] : ['GitHub live interface drifted across environment modes']
    })
  ];

  return {
    proofFamily: 'github-live-interface',
    memberVerdicts: [
      { memberId: 'app-binding-closure', passed: appBindingClosed },
      { memberId: 'live-session-closure', passed: sessionClosed },
      { memberId: 'inventory-fetch-closure', passed: fetchClosed },
      { memberId: 'artifact-fetch-closure', passed: fetchClosed },
      { memberId: 'branch-publication-closure', passed: mutationClosed },
      { memberId: 'pr-mutation-closure', passed: mutationClosed }
    ],
    theoremVerdicts,
    artifactBindings: [
      buildArtifactBinding({ artifactPath: '.engi/external-environment-profile.json', role: 'environment-profile', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/github-app-binding.json', role: 'github-app-binding', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/github-live-session.json', role: 'github-live-session', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/github-inventory-fetch-receipt.json', role: 'github-inventory-fetch', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/github-artifact-fetch-receipt.json', role: 'github-artifact-fetch', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/github-branch-publication-receipt.json', role: 'github-branch-publication', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) }),
      buildArtifactBinding({ artifactPath: '.engi/github-pr-update-receipt.json', role: 'github-pr-update', theoremIds: theoremVerdicts.map((entry) => entry.theoremId) })
    ],
    replaySteps,
    witnessArtifactPaths,
    replayArtifacts,
    replayInstructions: replaySteps.map((entry) => entry.instruction),
    allCasesPassed: appBindingClosed && sessionClosed && fetchClosed && mutationClosed,
    allTheoremsPassed: aggregateTheoremVerdicts(theoremVerdicts),
    proofHash: stableHashObject({
      configuredEnvironmentMode,
      sessionRef: githubLiveSession.sessionId,
      inventoryFetchRef: githubInventoryFetchReceipt.receiptId,
      artifactFetchRef: githubArtifactFetchReceipt.receiptId,
      branchPublicationRef: githubBranchPublicationReceipt.receiptId,
      prUpdateRef: githubPrUpdateReceipt.receiptId
    })
  };
}
