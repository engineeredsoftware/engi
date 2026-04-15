// @ts-check

import crypto from 'node:crypto';

export const V24_EXTERNAL_ENVIRONMENT_MODES = ['production', 'staging', 'development', 'mock'];
export const V24_EXTERNAL_INTERFACE_IDS = [
  'bitcoin-mainchain-execution',
  'sidechain-execution',
  'compute-container-execution',
  'storage-container-execution',
  'github-live-interface'
];
const V24_INTERFACE_ARTIFACT_REFS = {
  'bitcoin-mainchain-execution': [
    '.engi/bitcoin-settlement-intent.json',
    '.engi/bitcoin-settlement-observation.json',
    '.engi/bitcoin-anchor.json',
    '.engi/bitcoin-bounded-public-anchor.json'
  ],
  'sidechain-execution': [
    '.engi/external-boundary-manifest.json',
    '.engi/external-execution-policy.json',
    '.engi/network-capability-manifest.json'
  ],
  'compute-container-execution': [
    '.engi/compute-reality-manifest.json',
    '.engi/external-environment-profile.json',
    '.engi/external-telemetry-summary.json'
  ],
  'storage-container-execution': [
    '.engi/storage-reality-manifest.json',
    '.engi/external-environment-profile.json',
    '.engi/external-telemetry-summary.json'
  ],
  'github-live-interface': [
    '.engi/github-app-binding.json',
    '.engi/external-environment-profile.json',
    '.engi/external-telemetry-summary.json'
  ]
};

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
 * @param {readonly unknown[]} values
 * @returns {string[]}
 */
function uniqueStrings(values) {
  return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
}

/**
 * @param {string} mode
 * @returns {Record<string, unknown>}
 */
function buildBitcoinMainchainBinding(mode) {
  if (mode === 'production') {
    return {
      interfaceId: 'bitcoin-mainchain-execution',
      environmentMode: mode,
      network: 'bitcoin-mainnet',
      accountRef: 'btc-mainchain-prod-account',
      addressRef: 'bc1qengi0prodmain0000000000000000000000x9',
      treasuryPolicyRef: 'treasury://engi/btc-mainchain-production',
      executionClass: 'real-network-execution',
      mockEquivalent: false
    };
  }
  if (mode === 'staging') {
    return {
      interfaceId: 'bitcoin-mainchain-execution',
      environmentMode: mode,
      network: 'bitcoin-testnet4',
      accountRef: 'btc-mainchain-stage-account',
      addressRef: 'tb1qengi0stagemain00000000000000000000m7',
      treasuryPolicyRef: 'treasury://engi/btc-mainchain-staging',
      executionClass: 'pre-production-network-execution',
      mockEquivalent: false
    };
  }
  if (mode === 'development') {
    return {
      interfaceId: 'bitcoin-mainchain-execution',
      environmentMode: mode,
      network: 'bitcoin-testnet4',
      accountRef: 'btc-mainchain-dev-account',
      addressRef: 'tb1qengi0devmain000000000000000000000k4',
      treasuryPolicyRef: 'treasury://engi/btc-mainchain-development',
      executionClass: 'developer-network-execution',
      mockEquivalent: false
    };
  }
  return {
    interfaceId: 'bitcoin-mainchain-execution',
    environmentMode: mode,
    network: 'bitcoin-mock',
    accountRef: 'btc-mainchain-mock-account',
    addressRef: 'mock:bitcoin-mainchain:engi',
    treasuryPolicyRef: 'treasury://engi/btc-mainchain-mock',
    executionClass: 'deterministic-nonbroadcast',
    mockEquivalent: true
  };
}

/**
 * @param {string} mode
 * @returns {Record<string, unknown>}
 */
function buildSidechainBinding(mode) {
  if (mode === 'production') {
    return {
      interfaceId: 'sidechain-execution',
      environmentMode: mode,
      network: 'liquid-mainnet',
      accountRef: 'sidechain-prod-account',
      addressRef: 'ex1qengi0prodsidechain0000000000000002',
      treasuryPolicyRef: 'treasury://engi/sidechain-production',
      executionClass: 'real-sidechain-execution',
      mockEquivalent: false
    };
  }
  if (mode === 'staging') {
    return {
      interfaceId: 'sidechain-execution',
      environmentMode: mode,
      network: 'liquid-testnet',
      accountRef: 'sidechain-stage-account',
      addressRef: 'tex1qengi0stagesidechain000000000000007',
      treasuryPolicyRef: 'treasury://engi/sidechain-staging',
      executionClass: 'pre-production-sidechain-execution',
      mockEquivalent: false
    };
  }
  if (mode === 'development') {
    return {
      interfaceId: 'sidechain-execution',
      environmentMode: mode,
      network: 'liquid-testnet',
      accountRef: 'sidechain-dev-account',
      addressRef: 'tex1qengi0devsidechain000000000000000a',
      treasuryPolicyRef: 'treasury://engi/sidechain-development',
      executionClass: 'developer-sidechain-execution',
      mockEquivalent: false
    };
  }
  return {
    interfaceId: 'sidechain-execution',
    environmentMode: mode,
    network: 'sidechain-mock',
    accountRef: 'sidechain-mock-account',
    addressRef: 'mock:sidechain:engi',
    treasuryPolicyRef: 'treasury://engi/sidechain-mock',
    executionClass: 'deterministic-nonbroadcast',
    mockEquivalent: true
  };
}

/**
 * @param {string} mode
 * @returns {Record<string, unknown>}
 */
function buildComputeBinding(mode) {
  return {
    interfaceId: 'compute-container-execution',
    environmentMode: mode,
    registryRef: `registry://engi/${mode}/compute`,
    executionIdentityRef: `compute://${mode}/engi-runner`,
    queueRef: `queue://engi/${mode}/compute`,
    attestationScopeRef: `attestation://engi/${mode}/compute`,
    executionClass: mode === 'mock' ? 'deterministic-emulated-container' : 'containerized-execution'
  };
}

/**
 * @param {string} mode
 * @returns {Record<string, unknown>}
 */
function buildStorageBinding(mode) {
  return {
    interfaceId: 'storage-container-execution',
    environmentMode: mode,
    namespaceRef: `storage://engi/${mode}/artifacts`,
    bucketRef: `bucket://engi-${mode}-artifacts`,
    publicationEndpointRef: `publish://engi/${mode}/artifacts`,
    retentionPolicyRef: `retention://engi/${mode}/artifacts`,
    retrievalCredentialRef: `credential://engi/${mode}/storage-reader`,
    executionClass: mode === 'mock' ? 'deterministic-emulated-storage' : 'durable-storage-execution'
  };
}

/**
 * @param {string} mode
 * @param {string[]} repos
 * @returns {Record<string, unknown>}
 */
function buildGithubBinding(mode, repos) {
  return {
    interfaceId: 'github-live-interface',
    environmentMode: mode,
    appRef: `github-app://engi/${mode}`,
    appId: `engi-${mode}-github-app`,
    installationTargetRef: `github-installation://engi/${mode}`,
    webhookRef: `webhook://engi/${mode}/github`,
    mutationPolicyRef: `policy://engi/${mode}/github-mutations`,
    executionClass: mode === 'mock' ? 'deterministic-nonmutating-github-emulation' : 'github-app-execution',
    targetedRepos: repos.map((repo) => ({
      repo,
      installationId: `inst_${mode}_${shortId(repo, 10)}`,
      repositoryRef: `github://${mode}/${repo}`
    }))
  };
}

/**
 * @param {string[]} repos
 * @returns {Record<string, unknown>[]}
 */
function buildEnvironmentProfiles(repos) {
  return V24_EXTERNAL_ENVIRONMENT_MODES.map((environmentMode) => ({
    environmentMode,
    releaseDisposition: environmentMode === 'production' ? 'customer-facing' : environmentMode === 'mock' ? 'non-broadcasting' : 'pre-production',
    externalBindings: {
      bitcoinMainchain: buildBitcoinMainchainBinding(environmentMode),
      sidechain: buildSidechainBinding(environmentMode),
      compute: buildComputeBinding(environmentMode),
      storage: buildStorageBinding(environmentMode),
      github: buildGithubBinding(environmentMode, repos)
    }
  }));
}

/**
 * @param {Record<string, unknown>[]} environmentProfiles
 * @returns {Record<string, unknown>}
 */
function buildNetworkCapabilityManifest(environmentProfiles) {
  return {
    manifestId: 'v24_network_capability_manifest_v1',
    supportedEnvironmentModes: [...V24_EXTERNAL_ENVIRONMENT_MODES],
    interfaceIds: [...V24_EXTERNAL_INTERFACE_IDS],
    interfaces: V24_EXTERNAL_INTERFACE_IDS.map((interfaceId) => ({
      interfaceId,
      supportedModes: [...V24_EXTERNAL_ENVIRONMENT_MODES],
      bindingsByMode: environmentProfiles.map((profile) => {
        const record = /** @type {{ environmentMode?: string, externalBindings?: Record<string, unknown> }} */ (profile);
        const bindings = record.externalBindings || {};
        const binding =
          interfaceId === 'bitcoin-mainchain-execution' ? bindings.bitcoinMainchain
            : interfaceId === 'sidechain-execution' ? bindings.sidechain
              : interfaceId === 'compute-container-execution' ? bindings.compute
                : interfaceId === 'storage-container-execution' ? bindings.storage
                  : bindings.github;
        return {
          environmentMode: record.environmentMode,
          binding
        };
      })
    }))
  };
}

/**
 * @returns {Record<string, unknown>}
 */
function buildExternalExecutionPolicy() {
  return {
    policyId: 'v24_external_execution_policy_v1',
    requiredEnvironmentModes: [...V24_EXTERNAL_ENVIRONMENT_MODES],
    isolationDisposition: 'blocking-on-cross-mode-resource-reuse',
    mockParityRule: 'mock-preserves-artifact-and-receipt-shapes-without-live-side-effects',
    interfaceRequirements: [
      {
        interfaceId: 'bitcoin-mainchain-execution',
        requiredBindings: ['network', 'accountRef', 'addressRef', 'treasuryPolicyRef'],
        requiredReceiptStages: ['intent', 'execution', 'observation']
      },
      {
        interfaceId: 'sidechain-execution',
        requiredBindings: ['network', 'accountRef', 'addressRef', 'treasuryPolicyRef'],
        requiredReceiptStages: ['intent', 'execution', 'observation']
      },
      {
        interfaceId: 'compute-container-execution',
        requiredBindings: ['registryRef', 'executionIdentityRef', 'attestationScopeRef'],
        requiredReceiptStages: ['intent', 'execution', 'observation']
      },
      {
        interfaceId: 'storage-container-execution',
        requiredBindings: ['namespaceRef', 'bucketRef', 'retentionPolicyRef', 'retrievalCredentialRef'],
        requiredReceiptStages: ['intent', 'execution', 'observation']
      },
      {
        interfaceId: 'github-live-interface',
        requiredBindings: ['appRef', 'installationTargetRef', 'webhookRef', 'mutationPolicyRef'],
        requiredReceiptStages: ['intent', 'execution', 'observation']
      }
    ]
  };
}

/**
 * @returns {Record<string, unknown>}
 */
function buildExternalTelemetryPolicy() {
  return {
    policyId: 'v24_external_telemetry_policy_v1',
    requiredFields: [
      'environmentMode',
      'interfaceId',
      'environmentIdentityRef',
      'environmentResourceRef',
      'requestId',
      'executionId',
      'observationId',
      'resultClass',
      'reconciliationState',
      'affectedArtifactRefs'
    ],
    coverageExpectation: {
      modes: [...V24_EXTERNAL_ENVIRONMENT_MODES],
      requiredPathClasses: ['positive', 'fail-closed'],
      missingTelemetryDisposition: 'blocking'
    },
    interfaceTelemetry: [
      {
        interfaceId: 'bitcoin-mainchain-execution',
        requiredEventClasses: ['spend-intent', 'signer-coordination', 'broadcast-attempt', 'confirmation-observation', 'publication-reconciliation']
      },
      {
        interfaceId: 'sidechain-execution',
        requiredEventClasses: ['bridge-intent', 'execution-attempt', 'checkpoint-observation', 'publication-reconciliation']
      },
      {
        interfaceId: 'compute-container-execution',
        requiredEventClasses: ['image-selection', 'attestation', 'execution-start', 'execution-finish', 'output-sealing']
      },
      {
        interfaceId: 'storage-container-execution',
        requiredEventClasses: ['publication-targeting', 'retrieval-attempt', 'retention-evaluation', 'deletion-or-expiry']
      },
      {
        interfaceId: 'github-live-interface',
        requiredEventClasses: ['app-authentication', 'installation-binding', 'fetch-attempt', 'mutation-attempt', 'remote-reconciliation']
      }
    ]
  };
}

/**
 * @param {string} interfaceId
 * @returns {string[]}
 */
function buildAffectedArtifactRefs(interfaceId) {
  return [...(V24_INTERFACE_ARTIFACT_REFS[/** @type {keyof typeof V24_INTERFACE_ARTIFACT_REFS} */ (interfaceId)] || [])];
}

/**
 * @param {{
 *   githubAppSessions?: Array<{ repo?: string | undefined }> | undefined,
 *   branchName?: string | undefined,
 *   branchMode?: string | undefined,
 *   paymentMode?: string | null | undefined,
 *   scenarioId?: string | undefined,
 *   pipelineTelemetry?: { events?: Array<{ stageId?: string | undefined }> } | undefined
 * }} [input]
 * @returns {{
 *   externalEnvironmentProfile: Record<string, unknown>,
 *   externalExecutionPolicy: Record<string, unknown>,
 *   externalTelemetryPolicy: Record<string, unknown>,
 *   externalTelemetrySummary: Record<string, unknown>,
 *   networkCapabilityManifest: Record<string, unknown>,
 *   githubAppBinding: Record<string, unknown>
 * }}
 */
export function buildV24ExternalRealizationArtifacts(input = {}) {
  const descriptor = buildV24ExternalRealizationDescriptor(input);
  const configuredEnvironmentMode = input.paymentMode ? 'development' : 'mock';
  const activeProfile = /** @type {any[]} */ (descriptor.environmentProfiles || []).find((profile) => profile.environmentMode === configuredEnvironmentMode)
    || /** @type {any[]} */ (descriptor.environmentProfiles || [])[0]
    || {};
  const activeBindings = activeProfile.externalBindings || {};
  const activeGithubBinding = /** @type {any[]} */ (descriptor.githubAppBindings || []).find((binding) => binding.environmentMode === configuredEnvironmentMode)
    || /** @type {any[]} */ (descriptor.githubAppBindings || [])[0]
    || {};
  const branchName = String(input.branchName || '');
  const branchMode = String(input.branchMode || '');
  const scenarioId = String(input.scenarioId || '');
  const pipelineStages = uniqueStrings((input.pipelineTelemetry?.events || []).map((event) => event.stage || event.stageId));
  const actualityDisposition = input.paymentMode ? 'stubbed-external-demonstration' : 'deterministic-mock-only';

  const externalEnvironmentProfile = {
    profileId: `v24_external_environment_profile_${shortId(`${configuredEnvironmentMode}:${branchName || 'default'}`, 16)}`,
    draftTargetVersion: 'V24',
    configuredEnvironmentMode,
    supportedEnvironmentModes: [...V24_EXTERNAL_ENVIRONMENT_MODES],
    actualityDisposition,
    demonstrationToggleState: {
      configuredEnvironmentMode,
      paymentMode: input.paymentMode || null,
      shapeStableArtifactContract: true,
      allowModeSwitchingWithoutArtifactShapeDrift: true
    },
    activeBindings,
    environmentProfiles: descriptor.environmentProfiles,
    networkCapabilityManifestRef: /** @type {any} */ (descriptor.networkCapabilityManifest || {}).manifestId || null
  };

  const externalExecutionPolicy = {
    ...(/** @type {any} */ (descriptor.externalExecutionPolicy || {})),
    configuredEnvironmentMode,
    actualityDisposition,
    branchBinding: {
      branchName: branchName || null,
      branchMode: branchMode || null,
      scenarioId: scenarioId || null
    }
  };

  const externalTelemetryPolicy = {
    ...(/** @type {any} */ (descriptor.externalTelemetryPolicy || {})),
    surfacedAcross: ['core', 'demonstration', 'api', 'branch-artifacts']
  };

  const externalTelemetrySummary = {
    summaryId: `v24_external_telemetry_summary_${shortId(`${configuredEnvironmentMode}:${scenarioId || branchName || 'default'}`, 16)}`,
    configuredEnvironmentMode,
    actualityDisposition,
    branchName: branchName || null,
    branchMode: branchMode || null,
    scenarioId: scenarioId || null,
    paymentMode: input.paymentMode || null,
    coreTelemetryRefs: ['.engi/pipeline-telemetry.json'],
    surfacedAcross: ['core', 'demonstration', 'api', 'branch-artifacts'],
    pipelineStageIds: pipelineStages,
    interfaceSummaries: V24_EXTERNAL_INTERFACE_IDS.map((interfaceId) => {
      const binding =
        interfaceId === 'bitcoin-mainchain-execution' ? activeBindings.bitcoinMainchain
          : interfaceId === 'sidechain-execution' ? activeBindings.sidechain
            : interfaceId === 'compute-container-execution' ? activeBindings.compute
              : interfaceId === 'storage-container-execution' ? activeBindings.storage
                : activeGithubBinding;
      return {
        interfaceId,
        configuredEnvironmentMode,
        requestId: `req_${shortId(`${configuredEnvironmentMode}:${interfaceId}:${branchName || scenarioId || 'default'}`, 16)}`,
        executionId: `exec_${shortId(`${interfaceId}:${branchMode || 'default'}:${input.paymentMode || 'none'}`, 16)}`,
        observationId: `obs_${shortId(`${interfaceId}:${actualityDisposition}:${scenarioId || 'default'}`, 16)}`,
        executionClass: binding?.executionClass || null,
        environmentIdentityRef: binding?.accountRef || binding?.executionIdentityRef || binding?.appRef || null,
        environmentResourceRef: binding?.addressRef || binding?.bucketRef || binding?.namespaceRef || binding?.installationTargetRef || null,
        reconciliationState: 'draft-target-artifact-emission-only',
        resultClass: actualityDisposition,
        telemetryCoverageState: 'shape-complete-implementation-pending',
        affectedArtifactRefs: buildAffectedArtifactRefs(interfaceId)
      };
    }),
    coverageExpectation: /** @type {any} */ (descriptor.externalTelemetryPolicy || {}).coverageExpectation || null
  };

  const githubAppBinding = {
    bindingId: `v24_github_app_binding_${shortId(`${configuredEnvironmentMode}:${String(activeGithubBinding.appId || 'none')}`, 16)}`,
    configuredEnvironmentMode,
    activeBinding: activeGithubBinding,
    allBindings: descriptor.githubAppBindings,
    targetedRepoCount: Array.isArray(activeGithubBinding.targetedRepos) ? activeGithubBinding.targetedRepos.length : 0
  };

  return {
    externalEnvironmentProfile,
    externalExecutionPolicy,
    externalTelemetryPolicy,
    externalTelemetrySummary,
    networkCapabilityManifest: /** @type {any} */ (descriptor.networkCapabilityManifest || {}),
    githubAppBinding
  };
}

/**
 * @param {{ githubAppSessions?: Array<{ repo?: string | undefined }> | undefined }} [input]
 * @returns {Record<string, unknown>}
 */
export function buildV24ExternalRealizationDescriptor(input = {}) {
  const repos = uniqueStrings((input.githubAppSessions || []).map((session) => session.repo));
  const environmentProfiles = buildEnvironmentProfiles(repos);
  const githubAppBindings = environmentProfiles.map((profile) => /** @type {any} */ (profile).externalBindings.github);
  const executionPolicy = buildExternalExecutionPolicy();
  const telemetryPolicy = buildExternalTelemetryPolicy();
  return {
    descriptorId: `v24_external_realization_${shortId(repos.join(':') || 'default', 16)}`,
    draftTargetVersion: 'V24',
    environmentModes: [...V24_EXTERNAL_ENVIRONMENT_MODES],
    environmentProfiles,
    networkCapabilityManifest: buildNetworkCapabilityManifest(environmentProfiles),
    externalExecutionPolicy: executionPolicy,
    externalTelemetryPolicy: telemetryPolicy,
    githubAppBindings,
    implementationStatus: {
      sourceSlice: 'draft-target descriptor and API exposure',
      realNetworkExecution: false,
      realGitHubMutationExecution: false,
      realContainerExecution: false
    }
  };
}
