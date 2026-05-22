import { createHash } from 'crypto';

export const AUXILLARY_FLOW_STEPS = ['wallet', 'externals', 'profile', 'interfaces'] as const;
export const AUXILLARIES_CONTRACT_VERSION = 'v31-draft-auxillaries-contracts' as const;

export type ConcreteAuxillaryPane = (typeof AUXILLARY_FLOW_STEPS)[number];

type UnknownRecord = Record<string, unknown>;

export type AuxillariesReadinessState = 'ready' | 'degraded' | 'blocked' | 'unknown';
export type AuxillariesSourceSafetyClass =
  | 'source_safe'
  | 'secret_free_summary'
  | 'protected_source_redacted';
export type AuxillariesDiagnosticSeverity = 'info' | 'warning' | 'blocking';
export type AuxillariesRetryPolicy = 'manual_retry' | 'after_repair' | 'not_retryable';

const CANONICAL_AUXILLARY_PANES = new Set<string>(AUXILLARY_FLOW_STEPS);
const AUXILLARY_PANE_ALIASES: Record<string, ConcreteAuxillaryPane> = {
  btd: 'wallet',
  connects: 'externals',
  external: 'externals',
};

const REDACTED_VALUE = '[redacted]';
const PROTECTED_SOURCE_REDACTED_VALUE = '[protected-source-redacted]';
const SENSITIVE_KEY_PATTERN =
  /(?:secret|api[_-]?key|private[_-]?key|password|credential|authorization|access[_-]?token|refresh[_-]?token|oauth[_-]?token|bearer|openai|service[_-]?role|database[_-]?url|supabase[_-]?service)/iu;
const PROTECTED_SOURCE_KEY_PATTERN =
  /(?:protected[_-]?source|private[_-]?source|source[_-]?content|source[_-]?text|asset[_-]?pack[_-]?source|raw[_-]?prompt|private[_-]?prompt|interpolated[_-]?prompt)/iu;

export interface AuxillaryOnboardingPayload {
  completedPanes: ConcreteAuxillaryPane[];
  currentPane: ConcreteAuxillaryPane | null;
  completedSteps: ConcreteAuxillaryPane[];
  currentStep: ConcreteAuxillaryPane | null;
  isOnboardingComplete: boolean;
}

export interface AuxillaryOnboardingUpdatePayload {
  completedPane?: string;
}

export interface AuxillaryDataPayload {
  profile: unknown | null;
  githubConnection: unknown | null;
  walletConnectionStatus: unknown | null;
  repositoryConnectionStatus: unknown | null;
  repositories: unknown[];
  organizations: string[];
  repositoryInventorySource: string | null;
  btdBalance: number;
  btcFeeBalance: number | null;
  recentBtdAssetPacks: AuxillaryBtdAssetPackSummary[];
  modelPreferences: unknown | null;
  onboardedPanes: ConcreteAuxillaryPane[];
  onboarded_steps: ConcreteAuxillaryPane[];
  isOnboardingComplete: boolean;
  auxillariesContract: AuxillariesContractSnapshot;
  profileState: AuxillariesProfileState;
  connectionReadiness: AuxillariesConnectionReadiness[];
  interfaceAdmissions: AuxillariesInterfaceAdmission[];
  walletBtdPaneState: AuxillariesWalletBtdPaneState;
  organizationAuthority: OrganizationPolicyAuthority;
  readinessDiagnostics: AuxillariesReadinessDiagnostic[];
  recoveryRuns: AuxillariesRecoveryRun[];
}

export interface AuxillaryBtdAssetPackSummary {
  assetPackId: string;
  label?: string;
  rangeStart?: number;
  rangeEndExclusive?: number;
  acquiredAt?: string | null;
}

export interface AuxillariesProfileState {
  kind: 'AuxillariesProfileState';
  userId: string | null;
  username: string | null;
  displayName: string | null;
  email: string | null;
  companyName: string | null;
  role: string | null;
  accountReadiness: AuxillariesReadinessState;
  profileCompleteness: {
    complete: boolean;
    blockers: string[];
  };
  walletBinding: {
    address: string | null;
    provider: string | null;
    status: string | null;
    boundAt: string | null;
  } | null;
  modelPreferencesConfigured: boolean;
  templatePreferencesConfigured: boolean;
  sourceSafetyClass: AuxillariesSourceSafetyClass;
  profileCompletenessRoot: string;
}

export interface AuxillariesConnectionReadiness {
  kind: 'AuxillariesConnectionReadiness';
  provider: string;
  connected: boolean;
  valid: boolean;
  accountLabel: string | null;
  installationState: 'installed' | 'missing' | 'unknown';
  credentialPosture:
    | 'present_source_safe'
    | 'missing'
    | 'invalid'
    | 'unknown';
  requiredRepairAction:
    | 'none'
    | 'connect_provider'
    | 'reauthorize_provider'
    | 'repair_provider_inventory';
  sourceSafetyClass: AuxillariesSourceSafetyClass;
  metadata: Record<string, unknown>;
  providerReadinessRoot: string;
}

export interface AuxillariesInterfaceAdmission {
  kind: 'AuxillariesInterfaceAdmission';
  interfaceId: string;
  surface: 'terminal' | 'api' | 'mcp' | 'chatgpt_app' | 'exchange' | 'future_hook';
  authMode: 'session' | 'api_key' | 'provider_oauth' | 'wallet_signature' | 'not_admitted';
  readiness: AuxillariesReadinessState;
  policyConstraints: string[];
  allowedActions: string[];
  blockers: string[];
  sourceSafetyClass: AuxillariesSourceSafetyClass;
  interfaceAdmissionRoot: string;
}

export interface AuxillariesWalletBtdPaneState {
  kind: 'AuxillariesWalletBtdPaneState';
  walletCapability: {
    hasBinding: boolean;
    provider: string | null;
    address: string | null;
    verificationState: string | null;
    noCustody: true;
  };
  signerPosture: {
    ready: boolean;
    state: 'verified' | 'manual' | 'pending' | 'missing' | 'invalid';
    requiredAction: 'none' | 'connect_wallet' | 'verify_wallet_signature' | 'repair_wallet_binding';
  };
  btdReadRightSummary: {
    aggregateBtd: number;
    assetPackCount: number;
    recentAssetPackIds: string[];
  };
  treasurySummary: {
    btcFeeBalance: number | null;
    feeAsset: 'BTC';
    noCustody: true;
  };
  settlementReadiness: AuxillariesReadinessState;
  sourceSafetyClass: AuxillariesSourceSafetyClass;
  btdSupportRoot: string;
}

export interface OrganizationPolicyAuthority {
  kind: 'OrganizationPolicyAuthority';
  organizationId: string | null;
  actorId: string | null;
  role: string | null;
  permissionGrants: string[];
  walletBindingRequired: boolean;
  policyDecision: 'allowed' | 'denied';
  denialReason: string | null;
  sourceSafetyClass: AuxillariesSourceSafetyClass;
  authorityRoot: string;
}

export interface AuxillariesReadinessDiagnostic {
  kind: 'AuxillariesReadinessDiagnostic';
  pane: ConcreteAuxillaryPane;
  blockerId: string;
  severity: AuxillariesDiagnosticSeverity;
  summary: string;
  requiredAction: string;
  repairRoute: string;
  retryPolicy: AuxillariesRetryPolicy;
  proofRoot: string;
}

export interface AuxillariesRecoveryRun {
  kind: 'AuxillariesRecoveryRun';
  targetPane: ConcreteAuxillaryPane;
  repairAction: string;
  beforeReadinessRoot: string;
  afterReadinessRoot: string | null;
  executionId: string | null;
  outcome: 'not_started' | 'running' | 'succeeded' | 'failed';
  sourceSafetyClass: AuxillariesSourceSafetyClass;
  recoveryRoot: string;
}

export interface AuxillariesContractSnapshot {
  kind: 'auxillaries_contract_snapshot';
  contractVersion: typeof AUXILLARIES_CONTRACT_VERSION;
  sourceSafetyClass: AuxillariesSourceSafetyClass;
  profileState: AuxillariesProfileState;
  connectionReadiness: AuxillariesConnectionReadiness[];
  interfaceAdmissions: AuxillariesInterfaceAdmission[];
  walletBtdPaneState: AuxillariesWalletBtdPaneState;
  organizationAuthority: OrganizationPolicyAuthority;
  readinessDiagnostics: AuxillariesReadinessDiagnostic[];
  recoveryRuns: AuxillariesRecoveryRun[];
  contractRoot: string;
}

export interface AuxillariesContractValidationResult {
  valid: boolean;
  errors: string[];
}

export interface BuildAuxillariesContractSnapshotInput {
  profile: unknown | null;
  githubConnection: unknown | null;
  walletConnectionStatus?: unknown | null;
  repositoryConnectionStatus?: unknown | null;
  repositories?: unknown[] | null;
  organizations?: string[] | null;
  btdBalance?: number;
  btcFeeBalance?: number | null;
  recentBtdAssetPacks?: AuxillaryBtdAssetPackSummary[] | null;
  modelPreferences?: unknown | null;
  templatePreferences?: unknown | null;
  recoveryRuns?: AuxillariesRecoveryRun[] | null;
}

export function normalizeAuxillaryPane(value: string | null | undefined): ConcreteAuxillaryPane | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  const alias = AUXILLARY_PANE_ALIASES[normalized];
  if (alias) return alias;
  return CANONICAL_AUXILLARY_PANES.has(normalized) ? (normalized as ConcreteAuxillaryPane) : null;
}

export function normalizeAuxillarySteps(value: unknown): ConcreteAuxillaryPane[] {
  if (!Array.isArray(value)) return [];

  const normalized = value
    .map((entry) => normalizeAuxillaryPane(String(entry || '')))
    .filter((entry): entry is ConcreteAuxillaryPane => Boolean(entry));

  return Array.from(new Set(normalized));
}

export function parseStoredAuxillarySteps(value: unknown): ConcreteAuxillaryPane[] {
  if (Array.isArray(value)) {
    return normalizeAuxillarySteps(value);
  }

  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalizeAuxillarySteps(parsed);
      }
    } catch {
      const normalized = normalizeAuxillarySteps([value]);
      if (normalized.length) {
        return normalized;
      }
    }
  }

  return [];
}

export function serializeAuxillarySteps(steps: readonly ConcreteAuxillaryPane[]) {
  return JSON.stringify(normalizeAuxillarySteps([...steps]));
}

export function isAuxillaryOnboardingComplete(steps: readonly ConcreteAuxillaryPane[]) {
  return normalizeAuxillarySteps([...steps]).length === AUXILLARY_FLOW_STEPS.length;
}

export function buildAuxillaryOnboardingPayload(
  completedSteps: readonly ConcreteAuxillaryPane[],
): AuxillaryOnboardingPayload {
  const completedPanes = normalizeAuxillarySteps([...completedSteps]);
  const currentPane = AUXILLARY_FLOW_STEPS.find((step) => !completedPanes.includes(step)) || null;

  return {
    completedPanes,
    currentPane,
    completedSteps: completedPanes,
    currentStep: currentPane,
    isOnboardingComplete: isAuxillaryOnboardingComplete(completedPanes),
  };
}

export function buildAnonymousAuxillaryData(): AuxillaryDataPayload {
  return buildAuxillaryDataPayload({
    profile: null,
    githubConnection: null,
    walletConnectionStatus: null,
    repositoryConnectionStatus: null,
    repositories: [],
    repositoryInventorySource: null,
    btdBalance: 0,
    btcFeeBalance: null,
    recentBtdAssetPacks: [],
    modelPreferences: null,
    onboardedSteps: [],
  });
}

export function buildAuxillaryDataPayloadFromUnknown(value: unknown): AuxillaryDataPayload {
  const record = asRecord(value);
  if (!record) {
    return buildAnonymousAuxillaryData();
  }

  return buildAuxillaryDataPayload({
    profile: record.profile ?? null,
    githubConnection: record.githubConnection ?? null,
    walletConnectionStatus: record.walletConnectionStatus ?? null,
    repositoryConnectionStatus: record.repositoryConnectionStatus ?? null,
    repositories: Array.isArray(record.repositories) ? record.repositories : [],
    repositoryInventorySource: readString(record.repositoryInventorySource),
    btdBalance: typeof record.btdBalance === 'number' ? record.btdBalance : 0,
    btcFeeBalance: typeof record.btcFeeBalance === 'number' ? record.btcFeeBalance : null,
    recentBtdAssetPacks: Array.isArray(record.recentBtdAssetPacks)
      ? record.recentBtdAssetPacks as AuxillaryBtdAssetPackSummary[]
      : [],
    modelPreferences: record.modelPreferences ?? null,
    onboardedSteps: record.onboardedPanes ?? record.onboarded_steps ?? [],
  });
}

export function buildAuxillaryDataPayload({
  profile,
  githubConnection,
  walletConnectionStatus,
  repositoryConnectionStatus,
  repositories,
  repositoryInventorySource,
  btdBalance,
  btcFeeBalance,
  recentBtdAssetPacks,
  modelPreferences,
  onboardedSteps,
}: {
  profile: unknown | null;
  githubConnection: unknown | null;
  walletConnectionStatus?: unknown | null;
  repositoryConnectionStatus?: unknown | null;
  repositories?: unknown[] | null;
  repositoryInventorySource?: string | null;
  btdBalance?: number;
  btcFeeBalance?: number | null;
  recentBtdAssetPacks?: AuxillaryBtdAssetPackSummary[] | null;
  modelPreferences: unknown | null;
  onboardedSteps: unknown;
}): AuxillaryDataPayload {
  const onboardedPanes = parseStoredAuxillarySteps(onboardedSteps);
  const resolvedBtdBalance = typeof btdBalance === 'number' ? btdBalance : 0;
  const resolvedBtcFeeBalance = typeof btcFeeBalance === 'number' && Number.isFinite(btcFeeBalance)
    ? btcFeeBalance
    : null;
  const safeRepositories = Array.isArray(repositories)
    ? repositories.map((repository) => toAuxillariesJsonSafe(repository))
    : [];
  const organizations = deriveOrganizationsFromRepositories(safeRepositories);
  const safeRecentAssetPacks = Array.isArray(recentBtdAssetPacks) ? recentBtdAssetPacks : [];
  const auxillariesContract = buildAuxillariesContractSnapshot({
    profile,
    githubConnection,
    walletConnectionStatus,
    repositoryConnectionStatus,
    repositories: safeRepositories,
    organizations,
    btdBalance: resolvedBtdBalance,
    btcFeeBalance: resolvedBtcFeeBalance,
    recentBtdAssetPacks: safeRecentAssetPacks,
    modelPreferences,
  });

  return {
    profile: toAuxillariesJsonSafe(profile),
    githubConnection: toAuxillariesJsonSafe(githubConnection),
    walletConnectionStatus: toAuxillariesJsonSafe(walletConnectionStatus ?? null),
    repositoryConnectionStatus: toAuxillariesJsonSafe(repositoryConnectionStatus ?? null),
    repositories: safeRepositories,
    organizations,
    repositoryInventorySource:
      typeof repositoryInventorySource === 'string' && repositoryInventorySource.trim()
        ? repositoryInventorySource
        : null,
    btdBalance: resolvedBtdBalance,
    btcFeeBalance: resolvedBtcFeeBalance,
    recentBtdAssetPacks: safeRecentAssetPacks,
    modelPreferences: toAuxillariesJsonSafe(modelPreferences),
    onboardedPanes,
    onboarded_steps: onboardedPanes,
    isOnboardingComplete: isAuxillaryOnboardingComplete(onboardedPanes),
    auxillariesContract,
    profileState: auxillariesContract.profileState,
    connectionReadiness: auxillariesContract.connectionReadiness,
    interfaceAdmissions: auxillariesContract.interfaceAdmissions,
    walletBtdPaneState: auxillariesContract.walletBtdPaneState,
    organizationAuthority: auxillariesContract.organizationAuthority,
    readinessDiagnostics: auxillariesContract.readinessDiagnostics,
    recoveryRuns: auxillariesContract.recoveryRuns,
  };
}

export function normalizeCompletedAuxillaryPane(value: string | null | undefined) {
  return normalizeAuxillaryPane(value);
}

export function buildAuxillariesContractSnapshot(
  input: BuildAuxillariesContractSnapshotInput,
): AuxillariesContractSnapshot {
  const profile = toAuxillariesJsonSafe(input.profile);
  const githubConnection = toAuxillariesJsonSafe(input.githubConnection);
  const walletConnectionStatus = toAuxillariesJsonSafe(input.walletConnectionStatus ?? null);
  const repositoryConnectionStatus = toAuxillariesJsonSafe(input.repositoryConnectionStatus ?? null);
  const repositories = Array.isArray(input.repositories)
    ? input.repositories.map((repository) => toAuxillariesJsonSafe(repository))
    : [];
  const organizations = input.organizations?.length
    ? input.organizations
    : deriveOrganizationsFromRepositories(repositories);
  const profileState = buildAuxillariesProfileState({
    profile,
    modelPreferences: input.modelPreferences ?? null,
    templatePreferences: input.templatePreferences ?? null,
  });
  const connectionReadiness = [
    buildAuxillariesConnectionReadiness({
      provider: 'github',
      connection: githubConnection,
      connectionStatus: repositoryConnectionStatus,
      repositories,
    }),
  ];
  const walletBtdPaneState = buildAuxillariesWalletBtdPaneState({
    profileState,
    walletConnectionStatus,
    btdBalance: input.btdBalance,
    btcFeeBalance: input.btcFeeBalance,
    recentBtdAssetPacks: input.recentBtdAssetPacks,
  });
  const organizationAuthority = buildOrganizationPolicyAuthority({
    profileState,
    organizations,
    walletBtdPaneState,
  });
  const interfaceAdmissions = buildAuxillariesInterfaceAdmissions({
    profileState,
    connectionReadiness,
    walletBtdPaneState,
    organizationAuthority,
  });
  const readinessDiagnostics = buildAuxillariesReadinessDiagnostics({
    profileState,
    connectionReadiness,
    walletBtdPaneState,
    interfaceAdmissions,
    organizationAuthority,
  });
  const recoveryRuns = Array.isArray(input.recoveryRuns)
    ? input.recoveryRuns.map((run) => buildAuxillariesRecoveryRun(run))
    : [];
  const withoutRoot = {
    kind: 'auxillaries_contract_snapshot' as const,
    contractVersion: AUXILLARIES_CONTRACT_VERSION,
    sourceSafetyClass: 'source_safe' as AuxillariesSourceSafetyClass,
    profileState,
    connectionReadiness,
    interfaceAdmissions,
    walletBtdPaneState,
    organizationAuthority,
    readinessDiagnostics,
    recoveryRuns,
  };

  return {
    ...withoutRoot,
    contractRoot: stableProofRoot('auxillaries-contract-snapshot', withoutRoot),
  };
}

export function buildAuxillariesProfileState(input: {
  profile: unknown | null;
  modelPreferences?: unknown | null;
  templatePreferences?: unknown | null;
}): AuxillariesProfileState {
  const profile = asRecord(toAuxillariesJsonSafe(input.profile));
  const walletBinding = readWalletBinding(profile);
  const username = readString(profile?.username);
  const displayName = readString(profile?.display_name) ?? readString(profile?.displayName);
  const userId = readString(profile?.id) ?? readString(profile?.user_id) ?? readString(profile?.userId);
  const blockers = [
    !profile ? 'profile.missing' : null,
    !username && !displayName ? 'profile.identity_missing' : null,
  ].filter((entry): entry is string => Boolean(entry));
  const accountReadiness: AuxillariesReadinessState = blockers.length ? 'blocked' : 'ready';
  const withoutRoot = {
    kind: 'AuxillariesProfileState' as const,
    userId,
    username,
    displayName,
    email: readString(profile?.email),
    companyName: readString(profile?.company_name) ?? readString(profile?.companyName),
    role: readString(profile?.role),
    accountReadiness,
    profileCompleteness: {
      complete: blockers.length === 0,
      blockers,
    },
    walletBinding,
    modelPreferencesConfigured: isNonEmptyRecord(input.modelPreferences),
    templatePreferencesConfigured: isNonEmptyRecord(input.templatePreferences),
    sourceSafetyClass: 'source_safe' as AuxillariesSourceSafetyClass,
  };

  return {
    ...withoutRoot,
    profileCompletenessRoot: stableProofRoot('auxillaries-profile-state', withoutRoot),
  };
}

export function buildAuxillariesConnectionReadiness(input: {
  provider: string;
  connection?: unknown | null;
  connectionStatus?: unknown | null;
  repositories?: unknown[] | null;
}): AuxillariesConnectionReadiness {
  const connection = asRecord(toAuxillariesJsonSafe(input.connection ?? null));
  const status = asRecord(toAuxillariesJsonSafe(input.connectionStatus ?? null));
  const connected = readBoolean(status?.connected) ?? Boolean(connection);
  const valid = readBoolean(status?.valid) ?? connected;
  const provider = readString(status?.provider) ?? readString(connection?.provider) ?? input.provider;
  const accountLabel =
    readString(status?.username) ??
    readString(connection?.login) ??
    readString(connection?.account) ??
    readString(connection?.provider_username) ??
    null;
  const repositories = Array.isArray(input.repositories) ? input.repositories : [];
  const credentialPosture: AuxillariesConnectionReadiness['credentialPosture'] = !connected
    ? 'missing'
    : valid
      ? 'present_source_safe'
      : 'invalid';
  const requiredRepairAction: AuxillariesConnectionReadiness['requiredRepairAction'] = !connected
    ? 'connect_provider'
    : !valid
      ? 'reauthorize_provider'
      : repositories.length === 0
        ? 'repair_provider_inventory'
        : 'none';
  const withoutRoot = {
    kind: 'AuxillariesConnectionReadiness' as const,
    provider,
    connected,
    valid,
    accountLabel,
    installationState: connected ? 'installed' as const : 'missing' as const,
    credentialPosture,
    requiredRepairAction,
    sourceSafetyClass: 'secret_free_summary' as AuxillariesSourceSafetyClass,
    metadata: {
      repositories: repositories.length,
      instanceUrl: readString(status?.instanceUrl),
      expiresAt: readString(status?.expiresAt),
    },
  };

  return {
    ...withoutRoot,
    providerReadinessRoot: stableProofRoot('auxillaries-connection-readiness', withoutRoot),
  };
}

export function buildAuxillariesInterfaceAdmissions(input: {
  profileState: AuxillariesProfileState;
  connectionReadiness: AuxillariesConnectionReadiness[];
  walletBtdPaneState: AuxillariesWalletBtdPaneState;
  organizationAuthority: OrganizationPolicyAuthority;
}): AuxillariesInterfaceAdmission[] {
  const githubReady = input.connectionReadiness.some(
    (connection) => connection.provider === 'github' && connection.connected && connection.valid,
  );
  const walletReady = input.walletBtdPaneState.walletCapability.hasBinding;
  const profileReady = input.profileState.accountReadiness === 'ready';

  return [
    buildAuxillariesInterfaceAdmission({
      interfaceId: 'terminal',
      surface: 'terminal',
      authMode: 'session',
      readiness: profileReady ? 'ready' : 'blocked',
      policyConstraints: ['session_required', 'source_safe_preview_by_default'],
      allowedActions: profileReady
        ? ['read_auxillaries', 'request_read', 'review_need', 'request_finding_fits']
        : ['read_public_terminal'],
      blockers: profileReady ? [] : ['profile.identity_required'],
    }),
    buildAuxillariesInterfaceAdmission({
      interfaceId: 'api',
      surface: 'api',
      authMode: 'api_key',
      readiness: profileReady && githubReady ? 'ready' : 'degraded',
      policyConstraints: ['api_key_required', 'provider_scope_required'],
      allowedActions: profileReady && githubReady ? ['read_support_state', 'request_read'] : ['read_support_state'],
      blockers: githubReady ? [] : ['connects.github_provider_required'],
    }),
    buildAuxillariesInterfaceAdmission({
      interfaceId: 'mcp',
      surface: 'mcp',
      authMode: 'provider_oauth',
      readiness: githubReady && walletReady ? 'ready' : 'degraded',
      policyConstraints: ['provider_oauth_required', 'wallet_binding_recommended'],
      allowedActions: githubReady ? ['read_repository_context'] : [],
      blockers: [
        githubReady ? null : 'connects.github_provider_required',
        walletReady ? null : 'wallet.binding_recommended',
      ].filter((entry): entry is string => Boolean(entry)),
    }),
    buildAuxillariesInterfaceAdmission({
      interfaceId: 'chatgpt-app',
      surface: 'chatgpt_app',
      authMode: 'session',
      readiness: profileReady ? 'ready' : 'blocked',
      policyConstraints: ['session_required', 'protected_source_never_embedded_before_paid_unlock'],
      allowedActions: profileReady ? ['review_source_safe_preview'] : [],
      blockers: profileReady ? [] : ['profile.identity_required'],
    }),
    buildAuxillariesInterfaceAdmission({
      interfaceId: 'exchange',
      surface: 'exchange',
      authMode: 'wallet_signature',
      readiness: input.organizationAuthority.policyDecision === 'allowed' && walletReady ? 'degraded' : 'blocked',
      policyConstraints: ['future_exchange_law_deferred', 'wallet_signature_required'],
      allowedActions: [],
      blockers: ['exchange.market_depth_deferred_to_future_version'],
    }),
  ];
}

export function buildAuxillariesInterfaceAdmission(input: Omit<AuxillariesInterfaceAdmission, 'kind' | 'sourceSafetyClass' | 'interfaceAdmissionRoot'>): AuxillariesInterfaceAdmission {
  const withoutRoot = {
    kind: 'AuxillariesInterfaceAdmission' as const,
    ...input,
    sourceSafetyClass: 'source_safe' as AuxillariesSourceSafetyClass,
  };

  return {
    ...withoutRoot,
    interfaceAdmissionRoot: stableProofRoot('auxillaries-interface-admission', withoutRoot),
  };
}

export function buildAuxillariesWalletBtdPaneState(input: {
  profileState: AuxillariesProfileState;
  walletConnectionStatus?: unknown | null;
  btdBalance?: number;
  btcFeeBalance?: number | null;
  recentBtdAssetPacks?: AuxillaryBtdAssetPackSummary[] | null;
}): AuxillariesWalletBtdPaneState {
  const walletStatus = asRecord(toAuxillariesJsonSafe(input.walletConnectionStatus ?? null));
  const binding = input.profileState.walletBinding;
  const address = readString(walletStatus?.address) ?? binding?.address ?? null;
  const provider = readString(walletStatus?.provider) ?? binding?.provider ?? null;
  const verificationState = readString(walletStatus?.verificationState) ?? binding?.status ?? null;
  const connected = readBoolean(walletStatus?.connected) ?? Boolean(address);
  const valid = readBoolean(walletStatus?.valid) ?? verificationState === 'verified';
  const signerState: AuxillariesWalletBtdPaneState['signerPosture']['state'] = !address
    ? 'missing'
    : valid || verificationState === 'verified'
      ? 'verified'
      : verificationState === 'pending'
        ? 'pending'
        : verificationState === 'manual'
          ? 'manual'
          : connected
            ? 'invalid'
            : 'missing';
  const recentAssetPacks = Array.isArray(input.recentBtdAssetPacks) ? input.recentBtdAssetPacks : [];
  const aggregateBtd = typeof input.btdBalance === 'number' && Number.isFinite(input.btdBalance)
    ? input.btdBalance
    : 0;
  const withoutRoot = {
    kind: 'AuxillariesWalletBtdPaneState' as const,
    walletCapability: {
      hasBinding: Boolean(address),
      provider,
      address,
      verificationState,
      noCustody: true as const,
    },
    signerPosture: {
      ready: signerState === 'verified',
      state: signerState,
      requiredAction:
        signerState === 'verified'
          ? 'none' as const
          : signerState === 'missing'
            ? 'connect_wallet' as const
            : signerState === 'manual' || signerState === 'pending'
              ? 'verify_wallet_signature' as const
              : 'repair_wallet_binding' as const,
    },
    btdReadRightSummary: {
      aggregateBtd,
      assetPackCount: recentAssetPacks.length,
      recentAssetPackIds: recentAssetPacks.map((assetPack) => assetPack.assetPackId).filter(Boolean),
    },
    treasurySummary: {
      btcFeeBalance: typeof input.btcFeeBalance === 'number' && Number.isFinite(input.btcFeeBalance)
        ? input.btcFeeBalance
        : null,
      feeAsset: 'BTC' as const,
      noCustody: true as const,
    },
    settlementReadiness: signerState === 'verified' ? 'ready' as const : 'degraded' as const,
    sourceSafetyClass: 'source_safe' as AuxillariesSourceSafetyClass,
  };

  return {
    ...withoutRoot,
    btdSupportRoot: stableProofRoot('auxillaries-wallet-btd-pane-state', withoutRoot),
  };
}

export function buildOrganizationPolicyAuthority(input: {
  profileState: AuxillariesProfileState;
  organizations?: string[] | null;
  walletBtdPaneState?: AuxillariesWalletBtdPaneState;
}): OrganizationPolicyAuthority {
  const organizationId =
    input.organizations?.[0] ??
    input.profileState.companyName ??
    null;
  const role = input.profileState.role;
  const hasWallet = Boolean(input.walletBtdPaneState?.walletCapability.hasBinding);
  const allowedByRole = role === 'admin' || role === 'owner' || role === 'lead';
  const denied = !organizationId
    ? 'organization.missing'
    : !role
      ? 'organization.role_missing'
      : !allowedByRole
        ? 'organization.role_insufficient'
        : !hasWallet
          ? 'wallet.binding_missing'
          : null;
  const withoutRoot = {
    kind: 'OrganizationPolicyAuthority' as const,
    organizationId,
    actorId: input.profileState.userId,
    role,
    permissionGrants: allowedByRole ? ['auxillaries:read', 'terminal:request_read'] : ['auxillaries:read'],
    walletBindingRequired: true,
    policyDecision: denied ? 'denied' as const : 'allowed' as const,
    denialReason: denied,
    sourceSafetyClass: 'source_safe' as AuxillariesSourceSafetyClass,
  };

  return {
    ...withoutRoot,
    authorityRoot: stableProofRoot('organization-policy-authority', withoutRoot),
  };
}

export function buildAuxillariesReadinessDiagnostics(input: {
  profileState: AuxillariesProfileState;
  connectionReadiness: AuxillariesConnectionReadiness[];
  walletBtdPaneState: AuxillariesWalletBtdPaneState;
  interfaceAdmissions: AuxillariesInterfaceAdmission[];
  organizationAuthority: OrganizationPolicyAuthority;
}): AuxillariesReadinessDiagnostic[] {
  const diagnostics: AuxillariesReadinessDiagnostic[] = [];

  for (const blocker of input.profileState.profileCompleteness.blockers) {
    diagnostics.push(buildAuxillariesReadinessDiagnostic({
      pane: 'profile',
      blockerId: blocker,
      severity: 'blocking',
      summary: 'Profile identity is required before Auxillaries can admit support actions.',
      requiredAction: 'Complete the profile identity fields.',
      repairRoute: '/terminal?auxillary-open-to=profile',
      retryPolicy: 'after_repair',
    }));
  }

  for (const readiness of input.connectionReadiness) {
    if (readiness.requiredRepairAction !== 'none') {
      diagnostics.push(buildAuxillariesReadinessDiagnostic({
        pane: 'externals',
        blockerId: `connects.${readiness.provider}.${readiness.requiredRepairAction}`,
        severity: readiness.connected ? 'warning' : 'blocking',
        summary: `${readiness.provider} provider readiness requires repair.`,
        requiredAction: readiness.requiredRepairAction,
        repairRoute: '/terminal?auxillary-open-to=externals',
        retryPolicy: 'after_repair',
      }));
    }
  }

  if (!input.walletBtdPaneState.walletCapability.hasBinding) {
    diagnostics.push(buildAuxillariesReadinessDiagnostic({
      pane: 'wallet',
      blockerId: 'wallet.binding_missing',
      severity: 'blocking',
      summary: 'Wallet binding is missing for settlement-adjacent support actions.',
      requiredAction: 'Connect and verify a Bitcoin wallet.',
      repairRoute: '/terminal?auxillary-open-to=wallet',
      retryPolicy: 'after_repair',
    }));
  } else if (!input.walletBtdPaneState.signerPosture.ready) {
    diagnostics.push(buildAuxillariesReadinessDiagnostic({
      pane: 'wallet',
      blockerId: 'wallet.signature_verification_required',
      severity: 'warning',
      summary: 'Wallet binding exists but signer posture is not verified.',
      requiredAction: input.walletBtdPaneState.signerPosture.requiredAction,
      repairRoute: '/terminal?auxillary-open-to=wallet',
      retryPolicy: 'after_repair',
    }));
  }

  const blockedInterface = input.interfaceAdmissions.find((admission) => admission.readiness === 'blocked');
  if (blockedInterface) {
    diagnostics.push(buildAuxillariesReadinessDiagnostic({
      pane: 'interfaces',
      blockerId: `interfaces.${blockedInterface.interfaceId}.blocked`,
      severity: 'warning',
      summary: `${blockedInterface.interfaceId} is not admitted for the requested support surface.`,
      requiredAction: blockedInterface.blockers.join(', ') || 'Review interface policy.',
      repairRoute: '/terminal?auxillary-open-to=interfaces',
      retryPolicy: 'after_repair',
    }));
  }

  if (input.organizationAuthority.policyDecision === 'denied') {
    diagnostics.push(buildAuxillariesReadinessDiagnostic({
      pane: 'profile',
      blockerId: input.organizationAuthority.denialReason ?? 'organization.policy_denied',
      severity: 'warning',
      summary: 'Organization authority is not admitted for settlement-adjacent actions.',
      requiredAction: 'Review organization role, grants, and wallet binding.',
      repairRoute: '/terminal?auxillary-open-to=profile',
      retryPolicy: 'after_repair',
    }));
  }

  return diagnostics;
}

export function buildAuxillariesReadinessDiagnostic(
  input: Omit<AuxillariesReadinessDiagnostic, 'kind' | 'proofRoot'>,
): AuxillariesReadinessDiagnostic {
  const withoutRoot = {
    kind: 'AuxillariesReadinessDiagnostic' as const,
    ...input,
  };

  return {
    ...withoutRoot,
    proofRoot: stableProofRoot('auxillaries-readiness-diagnostic', withoutRoot),
  };
}

export function buildAuxillariesRecoveryRun(
  input: Omit<AuxillariesRecoveryRun, 'kind' | 'sourceSafetyClass' | 'recoveryRoot'>,
): AuxillariesRecoveryRun {
  const withoutRoot = {
    kind: 'AuxillariesRecoveryRun' as const,
    ...input,
    sourceSafetyClass: 'source_safe' as AuxillariesSourceSafetyClass,
  };

  return {
    ...withoutRoot,
    recoveryRoot: stableProofRoot('auxillaries-recovery-run', withoutRoot),
  };
}

export function validateAuxillariesContractSnapshot(value: unknown): AuxillariesContractValidationResult {
  const record = asRecord(value);
  const errors: string[] = [];

  if (!record) {
    return { valid: false, errors: ['snapshot must be an object'] };
  }

  if (record.kind !== 'auxillaries_contract_snapshot') errors.push('kind must be auxillaries_contract_snapshot');
  if (record.contractVersion !== AUXILLARIES_CONTRACT_VERSION) errors.push('contractVersion is not current');
  if (!asRecord(record.profileState)) errors.push('profileState is required');
  if (!Array.isArray(record.connectionReadiness)) errors.push('connectionReadiness must be an array');
  if (!Array.isArray(record.interfaceAdmissions)) errors.push('interfaceAdmissions must be an array');
  if (!asRecord(record.walletBtdPaneState)) errors.push('walletBtdPaneState is required');
  if (!asRecord(record.organizationAuthority)) errors.push('organizationAuthority is required');
  if (!Array.isArray(record.readinessDiagnostics)) errors.push('readinessDiagnostics must be an array');
  if (!Array.isArray(record.recoveryRuns)) errors.push('recoveryRuns must be an array');
  if (!readString(record.contractRoot)) errors.push('contractRoot is required');

  return { valid: errors.length === 0, errors };
}

export function parseAuxillariesContractSnapshot(value: unknown): AuxillariesContractSnapshot {
  const validation = validateAuxillariesContractSnapshot(value);
  if (!validation.valid) {
    throw new Error(`Invalid Auxillaries contract snapshot: ${validation.errors.join('; ')}`);
  }

  return value as AuxillariesContractSnapshot;
}

export function toAuxillariesJsonSafe(value: unknown): unknown {
  return sanitizeAuxillariesJsonValue(value);
}

export function assertAuxillariesJsonSafe(value: unknown): void {
  const failures: string[] = [];
  visitJsonSafety(value, '$', failures);
  if (failures.length) {
    throw new Error(`Auxillaries value is not JSON-safe: ${failures.join('; ')}`);
  }
}

function sanitizeAuxillariesJsonValue(value: unknown, key = ''): unknown {
  if (key && PROTECTED_SOURCE_KEY_PATTERN.test(key)) {
    return PROTECTED_SOURCE_REDACTED_VALUE;
  }

  if (key && SENSITIVE_KEY_PATTERN.test(key)) {
    return REDACTED_VALUE;
  }

  if (value === null) return null;
  if (value === undefined) return null;
  if (typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'bigint') return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map((entry) => sanitizeAuxillariesJsonValue(entry));
  if (typeof value !== 'object') return null;

  const result: Record<string, unknown> = {};
  for (const [entryKey, entryValue] of Object.entries(value as UnknownRecord)) {
    if (entryValue === undefined) continue;
    result[entryKey] = sanitizeAuxillariesJsonValue(entryValue, entryKey);
  }

  return result;
}

function visitJsonSafety(value: unknown, path: string, failures: string[]) {
  if (value === null) return;
  if (typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) failures.push(`${path} must be finite number`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => visitJsonSafety(entry, `${path}[${index}]`, failures));
    return;
  }
  if (typeof value === 'object') {
    for (const [key, entry] of Object.entries(value as UnknownRecord)) {
      visitJsonSafety(entry, `${path}.${key}`, failures);
    }
    return;
  }

  failures.push(`${path} has non-JSON type ${typeof value}`);
}

function deriveOrganizationsFromRepositories(repositories: unknown[]) {
  const organizations = repositories
    .map((repository) => {
      const repoRecord = asRecord(repository);
      const owner = asRecord(repoRecord?.owner);
      const ownerType = readString(owner?.type);
      if (ownerType !== 'organization') return null;
      return readString(owner?.username) ?? readString(repoRecord?.repo_owner);
    })
    .filter((entry): entry is string => Boolean(entry));

  return Array.from(new Set(organizations));
}

function readWalletBinding(profile: UnknownRecord | null): AuxillariesProfileState['walletBinding'] {
  const nested = asRecord(profile?.wallet_binding);
  const address =
    readString(nested?.address) ??
    readString(profile?.wallet_address) ??
    readString(profile?.walletAddress);
  const provider =
    readString(nested?.provider) ??
    readString(profile?.wallet_provider) ??
    readString(profile?.walletProvider);
  const status =
    readString(nested?.status) ??
    readString(profile?.wallet_binding_status) ??
    readString(profile?.walletBindingStatus);
  const boundAt =
    readString(nested?.boundAt) ??
    readString(nested?.bound_at) ??
    readString(profile?.wallet_bound_at) ??
    readString(profile?.walletBoundAt);

  if (!address && !provider && !status && !boundAt) return null;

  return {
    address: address ?? null,
    provider: provider ?? null,
    status: status ?? null,
    boundAt: boundAt ?? null,
  };
}

function asRecord(value: unknown): UnknownRecord | null {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
    ? value as UnknownRecord
    : null;
}

function readString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function readBoolean(value: unknown) {
  return typeof value === 'boolean' ? value : null;
}

function isNonEmptyRecord(value: unknown) {
  const record = asRecord(value);
  return Boolean(record && Object.keys(record).length > 0);
}

function stableProofRoot(label: string, value: unknown) {
  return createHash('sha256')
    .update(`${label}:${stableStringify(toAuxillariesJsonSafe(value))}`)
    .digest('hex');
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((entry) => stableStringify(entry)).join(',')}]`;

  const record = value as UnknownRecord;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(',')}}`;
}
