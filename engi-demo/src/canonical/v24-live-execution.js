// @ts-check

import {
  buildV24ExternalRealizationProof,
  buildV24ContainerRealityProof,
  buildV24GithubLiveInterfaceProof
} from './v24-external-execution.js';
import { getV24LocalExecutorInterfaceId } from './v24-local-executors.js';
import { executeV24RemoteAdapter } from './v24-remote-adapters.js';

const V24_INTERFACE_ORDER = [
  'bitcoin-mainchain-execution',
  'sidechain-execution',
  'compute-container-execution',
  'storage-container-execution',
  'github-live-interface'
];

const V24_ACTIVE_BINDING_KEY_BY_INTERFACE = {
  'bitcoin-mainchain-execution': 'bitcoinMainchain',
  'sidechain-execution': 'sidechain',
  'compute-container-execution': 'compute',
  'storage-container-execution': 'storage',
  'github-live-interface': 'github'
};

const V24_BRANCH_ARTIFACT_PATH_BY_KEY = {
  externalEnvironmentProfile: '.engi/external-environment-profile.json',
  externalTelemetrySummary: '.engi/external-telemetry-summary.json',
  bitcoinNetworkIntent: '.engi/bitcoin-network-intent.json',
  bitcoinNetworkExecution: '.engi/bitcoin-network-execution.json',
  bitcoinNetworkObservation: '.engi/bitcoin-network-observation.json',
  sidechainExecutionReceipt: '.engi/sidechain-execution-receipt.json',
  computeContainerManifest: '.engi/compute-container-manifest.json',
  computeContainerExecution: '.engi/compute-container-execution.json',
  storageContainerManifest: '.engi/storage-container-manifest.json',
  storagePublicationReceipt: '.engi/storage-publication-receipt.json',
  storageRetrievalReceipt: '.engi/storage-retrieval-receipt.json',
  githubAppBinding: '.engi/github-app-binding.json',
  githubLiveSession: '.engi/github-live-session.json',
  githubInventoryFetchReceipt: '.engi/github-inventory-fetch-receipt.json',
  githubArtifactFetchReceipt: '.engi/github-artifact-fetch-receipt.json',
  githubBranchPublicationReceipt: '.engi/github-branch-publication-receipt.json',
  githubPrUpdateReceipt: '.engi/github-pr-update-receipt.json',
  externalRealizationProof: '.engi/external-realization-proof.json',
  containerRealityProof: '.engi/container-reality-proof.json',
  githubLiveInterfaceProof: '.engi/github-live-interface-proof.json'
};

const V24_SUPPORT_ARTIFACT_KEYS_BY_INTERFACE = {
  'bitcoin-mainchain-execution': [
    'bitcoinNetworkIntent',
    'bitcoinSettlementIntent',
    'bitcoinSettlementObservation',
    'bitcoinAnchor',
    'bitcoinTreasuryPolicy'
  ],
  'sidechain-execution': [
    'sidechainExecutionReceipt',
    'bitcoinSettlementIntent',
    'bitcoinSettlementObservation',
    'bitcoinTreasuryPolicy'
  ],
  'compute-container-execution': [
    'computeContainerManifest',
    'computeRealityManifest'
  ],
  'storage-container-execution': [
    'storageContainerManifest',
    'storageRealityManifest'
  ],
  'github-live-interface': [
    'githubAppBinding',
    'githubBoundarySurface'
  ]
};

const V24_ALLOWED_ARTIFACT_KEYS_BY_INTERFACE = {
  'bitcoin-mainchain-execution': [
    'bitcoinNetworkExecution',
    'bitcoinNetworkObservation'
  ],
  'sidechain-execution': [
    'sidechainExecutionReceipt'
  ],
  'compute-container-execution': [
    'computeContainerExecution'
  ],
  'storage-container-execution': [
    'storagePublicationReceipt',
    'storageRetrievalReceipt'
  ],
  'github-live-interface': [
    'githubLiveSession',
    'githubInventoryFetchReceipt',
    'githubArtifactFetchReceipt',
    'githubBranchPublicationReceipt',
    'githubPrUpdateReceipt'
  ]
};

/**
 * @param {unknown} value
 * @returns {any}
 */
function cloneValue(value) {
  if (typeof globalThis.structuredClone === 'function') return globalThis.structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function ensureRecord(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? /** @type {Record<string, any>} */ (value) : {};
}

/**
 * @param {readonly unknown[]} values
 * @returns {string[]}
 */
function uniqueStrings(values) {
  return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
}

/**
 * @param {Record<string, any>} latestRun
 * @param {string} interfaceId
 * @returns {Record<string, any>}
 */
function activeBinding(latestRun, interfaceId) {
  const activeBindings = ensureRecord(latestRun.externalEnvironmentProfile?.activeBindings);
  return ensureRecord(activeBindings[V24_ACTIVE_BINDING_KEY_BY_INTERFACE[interfaceId]]);
}

/**
 * @param {Record<string, any>} latestRun
 * @param {string} interfaceId
 * @returns {Record<string, any>}
 */
function interfaceSummary(latestRun, interfaceId) {
  const summaries = /** @type {Array<Record<string, any>>} */ (latestRun.externalTelemetrySummary?.interfaceSummaries || []);
  return summaries.find((entry) => entry.interfaceId === interfaceId) || {};
}

/**
 * @param {Record<string, any>} latestRun
 * @param {string} interfaceId
 * @returns {boolean}
 */
function interfaceApplicable(latestRun, interfaceId) {
  if (interfaceId === 'bitcoin-mainchain-execution') {
    return String(latestRun.bitcoinNetworkIntent?.modeApplicability || '') === 'active';
  }
  if (interfaceId === 'sidechain-execution') {
    return String(latestRun.sidechainExecutionReceipt?.modeApplicability || '') === 'active';
  }
  return true;
}

/**
 * @param {Record<string, any>} latestRun
 * @param {string} interfaceId
 * @returns {Record<string, any>}
 */
function buildExecutionRequestPayload(latestRun, interfaceId) {
  const binding = activeBinding(latestRun, interfaceId);
  const telemetry = interfaceSummary(latestRun, interfaceId);
  const artifactKeys = V24_ALLOWED_ARTIFACT_KEYS_BY_INTERFACE[interfaceId] || [];
  const artifacts = Object.fromEntries(
    artifactKeys
      .filter((key) => latestRun[key])
      .map((key) => [key, cloneValue(latestRun[key])])
  );
  const supportArtifactKeys = V24_SUPPORT_ARTIFACT_KEYS_BY_INTERFACE[interfaceId] || [];
  const supportArtifacts = Object.fromEntries(
    supportArtifactKeys
      .filter((key) => latestRun[key])
      .map((key) => [key, cloneValue(latestRun[key])])
  );
  return {
    interfaceId,
    configuredEnvironmentMode: latestRun.externalEnvironmentProfile?.configuredEnvironmentMode || null,
    actualityDisposition: latestRun.externalEnvironmentProfile?.actualityDisposition || null,
    scenarioId: latestRun.scenarioId || null,
    branchName: latestRun.branchArtifacts?.branchName || null,
    branchMode: latestRun.branchMode || null,
    paymentMode: latestRun.paymentMode || null,
    needId: latestRun.need?.needId || latestRun.needMeasurement?.needId || null,
    bundleId: latestRun.settlementPreview?.bundleId || null,
    assetPackId: latestRun.assetPack?.assetPackId || null,
    runtimeState: telemetry.runtimeState || null,
    binding,
    telemetry,
    artifacts,
    supportArtifacts
  };
}

/**
 * @param {string} executorUrl
 * @param {Record<string, any>} payload
 * @param {Record<string, any>} binding
 * @param {typeof fetch} fetchImpl
 * @param {Record<string, (payload: Record<string, any>) => Promise<Record<string, any>> | Record<string, any>>} executorHandlers
 * @returns {Promise<Record<string, any>>}
 */
async function callExecutor(executorUrl, payload, binding, fetchImpl, executorHandlers) {
  const localExecutorInterfaceId = getV24LocalExecutorInterfaceId(executorUrl);
  if (localExecutorInterfaceId) {
    const handler =
      executorHandlers[localExecutorInterfaceId]
      || executorHandlers[payload.interfaceId]
      || executorHandlers[executorUrl];
    if (typeof handler !== 'function') {
      throw new Error(`V24 local executor handler missing for ${payload.interfaceId}.`);
    }
    return ensureRecord(await handler(payload));
  }
  if (binding?.executorKind && binding.executorKind !== 'http-json-patch') {
    return ensureRecord(await executeV24RemoteAdapter(payload.interfaceId, binding, payload, fetchImpl));
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetchImpl(executorUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`V24 external executor ${payload.interfaceId} failed with ${response.status}.`);
    }
    return ensureRecord(await response.json());
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * @param {string} interfaceId
 * @param {Record<string, any>} response
 * @returns {{ artifacts: Record<string, any>, telemetry: Record<string, any> }}
 */
function validateExecutorResponse(interfaceId, response) {
  const responseInterfaceId = String(response.interfaceId || interfaceId);
  if (responseInterfaceId !== interfaceId) {
    throw new Error(`V24 external executor returned interface drift for ${interfaceId}.`);
  }
  const artifacts = ensureRecord(response.artifacts);
  const telemetry = ensureRecord(response.telemetry);
  const allowedArtifactKeys = new Set(V24_ALLOWED_ARTIFACT_KEYS_BY_INTERFACE[interfaceId] || []);
  const artifactKeys = Object.keys(artifacts);
  if (!artifactKeys.length) {
    throw new Error(`V24 external executor returned no artifact patches for ${interfaceId}.`);
  }
  for (const key of artifactKeys) {
    if (!allowedArtifactKeys.has(key)) {
      throw new Error(`V24 external executor returned unsupported artifact patch ${key} for ${interfaceId}.`);
    }
  }
  if (!Object.keys(telemetry).length) {
    throw new Error(`V24 external executor returned no telemetry patch for ${interfaceId}.`);
  }
  return { artifacts, telemetry };
}

/**
 * @param {Record<string, any>} latestRun
 * @param {string} key
 * @param {unknown} value
 * @returns {void}
 */
function patchArtifact(latestRun, key, value) {
  latestRun[key] = cloneValue(value);
  const artifactPath = V24_BRANCH_ARTIFACT_PATH_BY_KEY[key];
  if (artifactPath && latestRun.branchArtifacts?.files) {
    latestRun.branchArtifacts.files[artifactPath] = JSON.stringify(latestRun[key], null, 2);
  }
}

/**
 * @param {Record<string, any>} latestRun
 * @param {string} interfaceId
 * @param {Record<string, any>} telemetryPatch
 * @param {string[]} patchedArtifactPaths
 * @returns {void}
 */
function patchInterfaceTelemetry(latestRun, interfaceId, telemetryPatch, patchedArtifactPaths) {
  const summaries = /** @type {Array<Record<string, any>>} */ (latestRun.externalTelemetrySummary?.interfaceSummaries || []);
  const index = summaries.findIndex((entry) => entry.interfaceId === interfaceId);
  if (index < 0) {
    throw new Error(`V24 external telemetry summary missing interface ${interfaceId}.`);
  }
  const prior = summaries[index];
  const binding = activeBinding(latestRun, interfaceId);
  const merged = {
    ...prior,
    ...telemetryPatch,
    interfaceId,
    runtimeState: telemetryPatch.runtimeState || 'live-observed',
    resultClass: telemetryPatch.resultClass || 'live-executed',
    reconciliationState: telemetryPatch.reconciliationState || 'live-remote-reconciled',
    telemetryCoverageState: telemetryPatch.telemetryCoverageState || 'shape-complete-live-observed',
    executionClass: telemetryPatch.executionClass || prior.executionClass || binding.executionClass || null,
    requestId: telemetryPatch.requestId || prior.requestId || null,
    executionId: telemetryPatch.executionId || prior.executionId || null,
    observationId: telemetryPatch.observationId || prior.observationId || null,
    environmentIdentityRef:
      telemetryPatch.environmentIdentityRef
      || prior.environmentIdentityRef
      || binding.accountRef
      || binding.executionIdentityRef
      || binding.appRef
      || null,
    environmentResourceRef:
      telemetryPatch.environmentResourceRef
      || prior.environmentResourceRef
      || binding.addressRef
      || binding.bucketRef
      || binding.namespaceRef
      || binding.installationTargetRef
      || null,
    affectedArtifactRefs: uniqueStrings([
      ...(prior.affectedArtifactRefs || []),
      ...(telemetryPatch.affectedArtifactRefs || []),
      ...patchedArtifactPaths
    ])
  };
  summaries[index] = merged;
  latestRun.externalTelemetrySummary.interfaceSummaries = summaries;
  patchArtifact(latestRun, 'externalTelemetrySummary', latestRun.externalTelemetrySummary);
  if (interfaceId === 'github-live-interface' && latestRun.githubAppBinding) {
    latestRun.githubAppBinding.runtimeState = merged.runtimeState;
    patchArtifact(latestRun, 'githubAppBinding', latestRun.githubAppBinding);
  }
}

/**
 * @param {Record<string, any>} latestRun
 * @param {string} interfaceId
 * @param {Record<string, any>} telemetryPatch
 * @returns {void}
 */
function patchEnvironmentRuntimeState(latestRun, interfaceId, telemetryPatch) {
  if (!latestRun.externalEnvironmentProfile) return;
  const activeRuntimeStates = /** @type {Array<Record<string, any>>} */ (latestRun.externalEnvironmentProfile.activeRuntimeStates || []);
  const runtimeState = telemetryPatch.runtimeState || 'live-observed';
  const missingBindingKeys = uniqueStrings(telemetryPatch.missingBindingKeys || []);
  const nextEntry = {
    ...ensureRecord(latestRun.externalEnvironmentProfile.interfaceRuntimeStateById?.[interfaceId]),
    interfaceId,
    runtimeState,
    liveEnabled: true,
    missingBindingKeys,
    resultClass: telemetryPatch.resultClass || 'live-executed',
    reconciliationState: telemetryPatch.reconciliationState || 'live-remote-reconciled',
    telemetryCoverageState: telemetryPatch.telemetryCoverageState || 'shape-complete-live-observed'
  };
  const entryIndex = activeRuntimeStates.findIndex((entry) => entry.interfaceId === interfaceId);
  if (entryIndex >= 0) {
    activeRuntimeStates[entryIndex] = nextEntry;
  } else {
    activeRuntimeStates.push(nextEntry);
  }
  latestRun.externalEnvironmentProfile.activeRuntimeStates = activeRuntimeStates;
  latestRun.externalEnvironmentProfile.interfaceRuntimeStateById = {
    ...ensureRecord(latestRun.externalEnvironmentProfile.interfaceRuntimeStateById),
    [interfaceId]: nextEntry
  };
  patchArtifact(latestRun, 'externalEnvironmentProfile', latestRun.externalEnvironmentProfile);
}

/**
 * @param {Record<string, any>} latestRun
 * @returns {void}
 */
function rebuildV24Proofs(latestRun) {
  latestRun.externalRealizationProof = buildV24ExternalRealizationProof({
    externalEnvironmentProfile: latestRun.externalEnvironmentProfile,
    externalExecutionPolicy: latestRun.externalExecutionPolicy,
    externalTelemetrySummary: latestRun.externalTelemetrySummary,
    bitcoinNetworkIntent: latestRun.bitcoinNetworkIntent,
    bitcoinNetworkExecution: latestRun.bitcoinNetworkExecution,
    bitcoinNetworkObservation: latestRun.bitcoinNetworkObservation,
    sidechainExecutionReceipt: latestRun.sidechainExecutionReceipt
  });
  latestRun.containerRealityProof = buildV24ContainerRealityProof({
    externalEnvironmentProfile: latestRun.externalEnvironmentProfile,
    computeContainerManifest: latestRun.computeContainerManifest,
    computeContainerExecution: latestRun.computeContainerExecution,
    storageContainerManifest: latestRun.storageContainerManifest,
    storagePublicationReceipt: latestRun.storagePublicationReceipt,
    storageRetrievalReceipt: latestRun.storageRetrievalReceipt
  });
  latestRun.githubLiveInterfaceProof = buildV24GithubLiveInterfaceProof({
    externalEnvironmentProfile: latestRun.externalEnvironmentProfile,
    githubAppBinding: latestRun.githubAppBinding,
    githubLiveSession: latestRun.githubLiveSession,
    githubInventoryFetchReceipt: latestRun.githubInventoryFetchReceipt,
    githubArtifactFetchReceipt: latestRun.githubArtifactFetchReceipt,
    githubBranchPublicationReceipt: latestRun.githubBranchPublicationReceipt,
    githubPrUpdateReceipt: latestRun.githubPrUpdateReceipt
  });
  patchArtifact(latestRun, 'externalRealizationProof', latestRun.externalRealizationProof);
  patchArtifact(latestRun, 'containerRealityProof', latestRun.containerRealityProof);
  patchArtifact(latestRun, 'githubLiveInterfaceProof', latestRun.githubLiveInterfaceProof);
}

/**
 * @param {Record<string, any>} latestRun
 * @param {{
 *   fetchImpl?: typeof fetch | undefined,
 *   executorHandlers?: Record<string, (payload: Record<string, any>) => Promise<Record<string, any>> | Record<string, any>> | undefined
 * }} [options]
 * @returns {Promise<Record<string, any>>}
 */
export async function realizeV24LiveExternalExecution(latestRun, options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const executorHandlers = options.executorHandlers || {};
  if (typeof fetchImpl !== 'function') {
    throw new Error('V24 live external execution requires fetch support.');
  }
  if (!latestRun?.externalEnvironmentProfile || !latestRun?.externalTelemetrySummary) {
    return latestRun;
  }

  const realizedRun = cloneValue(latestRun);
  let realizedAnyInterface = false;

  for (const interfaceId of V24_INTERFACE_ORDER) {
    const summary = interfaceSummary(realizedRun, interfaceId);
    const binding = activeBinding(realizedRun, interfaceId);
    if (String(summary.runtimeState || '') !== 'live-configured') continue;
    if (!interfaceApplicable(realizedRun, interfaceId)) continue;
    if (!binding.executorUrl) {
      throw new Error(`V24 external interface ${interfaceId} is live-configured without an executorUrl.`);
    }

    const requestPayload = buildExecutionRequestPayload(realizedRun, interfaceId);
    const response = await callExecutor(String(binding.executorUrl), requestPayload, binding, fetchImpl, executorHandlers);
    const { artifacts, telemetry } = validateExecutorResponse(interfaceId, response);

    for (const [key, value] of Object.entries(artifacts)) {
      patchArtifact(realizedRun, key, value);
    }

    const patchedArtifactPaths = Object.keys(artifacts)
      .map((key) => V24_BRANCH_ARTIFACT_PATH_BY_KEY[key])
      .filter(Boolean);
    patchInterfaceTelemetry(realizedRun, interfaceId, telemetry, patchedArtifactPaths);
    patchEnvironmentRuntimeState(realizedRun, interfaceId, telemetry);
    realizedAnyInterface = true;
  }

  if (!realizedAnyInterface) {
    return latestRun;
  }

  rebuildV24Proofs(realizedRun);
  return realizedRun;
}
