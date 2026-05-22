export type V32ReadinessRehearsalLaneId =
  | 'local'
  | 'staging-testnet'
  | 'production-mainnet'
  | 'offline-disabled';

export type V32ReadinessRehearsalState = 'ready' | 'review' | 'blocked' | 'disabled';

export type V32ReadinessRequirementCategory =
  | 'environment'
  | 'provider-connectivity'
  | 'ledger'
  | 'database'
  | 'object-storage'
  | 'btc-network'
  | 'rollback'
  | 'policy';

export type V32ReadinessSecretClass =
  | 'none'
  | 'sandbox-auth-token'
  | 'model-provider-key'
  | 'supabase-admin-credential'
  | 'database-admin-password'
  | 'vcs-installation-credential'
  | 'wallet-signer-capability'
  | 'production-operator-approval';

export interface V32ReadinessRequirement {
  requirementId: string;
  category: V32ReadinessRequirementCategory;
  label: string;
  required: boolean;
  present: boolean;
  secretClass: V32ReadinessSecretClass;
  valueSerialized: false;
  repairAction: string;
}

export interface V32ReadinessProviderPosture {
  providerId: string;
  state: V32ReadinessRehearsalState;
  sourceSafeSummary: string;
}

export interface V32ReadinessLaneRecord {
  laneId: V32ReadinessRehearsalLaneId;
  label: string;
  network: 'regtest' | 'testnet' | 'mainnet' | 'offline';
  ledgerNetwork: 'local' | 'testnet' | 'mainnet' | 'offline';
  state: V32ReadinessRehearsalState;
  valueBearingSettlementRequested: boolean;
  valueBearingSettlementAdmitted: boolean;
  protectedSourceBoundary: 'source-safe-only' | 'protected-source-locked' | 'offline-no-source';
  requiredApprovalState:
    | 'not-required'
    | 'staging-only'
    | 'blocked-until-future-launch-gate'
    | 'disabled';
  requirements: V32ReadinessRequirement[];
  providers: V32ReadinessProviderPosture[];
  ledgerPosture: string;
  databasePosture: string;
  objectStoragePosture: string;
  btcNetworkPosture: string;
  rollbackPosture: string;
  blockers: string[];
  repairActions: string[];
  readinessRoot: string;
}

export interface V32TestnetMainnetReadinessRehearsal {
  kind: 'btd.v32_testnet_mainnet_readiness_rehearsal';
  version: 'V32';
  currentTarget: 'V31';
  lanes: V32ReadinessLaneRecord[];
  sourceSafety: {
    secretValuesSerialized: false;
    protectedSourceSerialized: false;
    rawProviderPayloadsSerialized: false;
    readinessClass: 'secret-presence-only';
  };
  summary: {
    laneCount: number;
    readyLaneCount: number;
    blockedLaneCount: number;
    disabledLaneCount: number;
    productionMainnetValueBearingAdmitted: false;
  };
}

export interface BuildV32TestnetMainnetReadinessRehearsalInput {
  presentRequirementIds?: Partial<Record<V32ReadinessRehearsalLaneId, string[]>>;
}

interface LaneTemplate {
  laneId: V32ReadinessRehearsalLaneId;
  label: string;
  network: V32ReadinessLaneRecord['network'];
  ledgerNetwork: V32ReadinessLaneRecord['ledgerNetwork'];
  valueBearingSettlementRequested: boolean;
  protectedSourceBoundary: V32ReadinessLaneRecord['protectedSourceBoundary'];
  requiredApprovalState: V32ReadinessLaneRecord['requiredApprovalState'];
  requirements: Array<Omit<V32ReadinessRequirement, 'present' | 'valueSerialized'> & {
    defaultPresent: boolean;
  }>;
  providers: V32ReadinessProviderPosture[];
  ledgerPosture: string;
  databasePosture: string;
  objectStoragePosture: string;
  btcNetworkPosture: string;
  rollbackPosture: string;
}

const LANE_TEMPLATES: LaneTemplate[] = [
  {
    laneId: 'local',
    label: 'Local proof lane',
    network: 'regtest',
    ledgerNetwork: 'local',
    valueBearingSettlementRequested: false,
    protectedSourceBoundary: 'source-safe-only',
    requiredApprovalState: 'not-required',
    requirements: [
      requirement('local-env-file', 'environment', 'Local env file or explicit test env is present.', 'none', true, 'Create a local env file or pass test env through the shell.'),
      requirement('local-regtest-ledger', 'ledger', 'Regtest/local ledger harness is available.', 'none', true, 'Start the local proof ledger harness.'),
      requirement('local-rollback-root', 'rollback', 'Rollback root is declared for destructive local rehearsal rollback.', 'none', true, 'Declare a rollback root before local rehearsal.'),
    ],
    providers: [
      provider('local-fixtures', 'ready', 'Local fixture providers avoid external value-bearing calls.'),
      provider('sandbox-host', 'review', 'Sandbox execution is optional locally; absence is not a launch blocker.'),
    ],
    ledgerPosture: 'local ledger receipt projection is source-safe and non-value-bearing',
    databasePosture: 'local database projection may use fixture rows and never proves mainnet launch',
    objectStoragePosture: 'local object-storage proof uses source-safe artifacts only',
    btcNetworkPosture: 'regtest/non-value BTC posture',
    rollbackPosture: 'local rollback root required before destructive rehearsal',
  },
  {
    laneId: 'staging-testnet',
    label: 'Staging testnet proof lane',
    network: 'testnet',
    ledgerNetwork: 'testnet',
    valueBearingSettlementRequested: false,
    protectedSourceBoundary: 'protected-source-locked',
    requiredApprovalState: 'staging-only',
    requirements: [
      requirement('staging-supabase-project', 'database', 'Staging-testnet project reference tkpyosihuouusyaxtbau is configured.', 'supabase-admin-credential', true, 'Restore staging-testnet database projection credentials.'),
      requirement('staging-database-readback', 'database', 'Database readback can prove execution, ledger, and BTD projection rows.', 'database-admin-password', true, 'Repair staging-testnet database readback before settlement QA.'),
      requirement('staging-sandbox-auth', 'provider-connectivity', 'Sandbox host authentication is present as a secret-presence class.', 'sandbox-auth-token', true, 'Refresh Sandbox authentication without recording token values.'),
      requirement('staging-model-provider', 'provider-connectivity', 'Model-provider key presence is available for real inference QA.', 'model-provider-key', true, 'Restore model-provider key presence without serializing the key.'),
      requirement('staging-vcs-delivery', 'provider-connectivity', 'VCS installation credential presence is available for PR delivery rehearsal.', 'vcs-installation-credential', true, 'Reconnect the VCS installation before delivery rehearsal.'),
      requirement('staging-object-storage', 'object-storage', 'Source-safe proof artifacts and protected-source encrypted artifacts have storage posture.', 'none', true, 'Repair object-storage bucket or artifact policy.'),
      requirement('staging-rollback-root', 'rollback', 'Staging rollback root is declared.', 'none', true, 'Declare staging rollback root before live QA.'),
    ],
    providers: [
      provider('vercel-sandbox', 'ready', 'Sandbox execution is admitted for staging-testnet QA with secret-presence authentication only.'),
      provider('supabase-staging-testnet', 'ready', 'Supabase staging-testnet readback is represented by project reference and row posture, not secret values.'),
      provider('github-delivery', 'ready', 'GitHub PR delivery rehearsal is admitted after settlement unlock in staging-testnet.'),
      provider('model-inference', 'ready', 'Real inference is admitted when model-provider key presence is true.'),
    ],
    ledgerPosture: 'staging-testnet ledger/database/object-storage readback is rehearsal-admitted',
    databasePosture: 'staging-testnet uses tkpyosihuouusyaxtbau and records presence classes only',
    objectStoragePosture: 'protected AssetPack source remains encrypted and locked until paid unlock',
    btcNetworkPosture: 'testnet/signet BTC fee and Taproot/PSBT posture only',
    rollbackPosture: 'staging rollback root required and repair actions are retryable',
  },
  {
    laneId: 'production-mainnet',
    label: 'Production mainnet blocked proof lane',
    network: 'mainnet',
    ledgerNetwork: 'mainnet',
    valueBearingSettlementRequested: true,
    protectedSourceBoundary: 'protected-source-locked',
    requiredApprovalState: 'blocked-until-future-launch-gate',
    requirements: [
      requirement('production-project-reference', 'database', 'Production-mainnet project reference rinalyjfecxnmyczrpzo is known.', 'supabase-admin-credential', true, 'Repair production-mainnet project reference before non-value readiness review.'),
      requirement('production-wallet-signer-policy', 'btc-network', 'Wallet signer capability is present as a policy class only.', 'wallet-signer-capability', false, 'Complete future signer-policy proof before value-bearing launch.'),
      requirement('production-operational-approval', 'policy', 'Future launch gate operational approval root is absent in V32.', 'production-operator-approval', false, 'Open a future explicit launch gate before admitting value-bearing mainnet.'),
      requirement('production-rollback-root', 'rollback', 'Production rollback root is reviewed before any launch consideration.', 'none', true, 'Declare and review production rollback root.'),
    ],
    providers: [
      provider('supabase-production-mainnet', 'review', 'Production database projection can be represented, but value-bearing writes are not admitted.'),
      provider('bitcoin-mainnet-observer', 'review', 'Mainnet observation may be reviewed; broadcast is blocked in V32.'),
      provider('github-delivery', 'blocked', 'Protected-source delivery remains blocked until paid settlement and future launch admission agree.'),
    ],
    ledgerPosture: 'production-mainnet ledger posture is represented but value-bearing writes are blocked',
    databasePosture: 'production-mainnet uses rinalyjfecxnmyczrpzo for non-value readiness only',
    objectStoragePosture: 'protected source remains locked and delivery is blocked',
    btcNetworkPosture: 'mainnet broadcast/value-bearing settlement blocked in V32',
    rollbackPosture: 'future launch requires explicit approval, rollback, and repair roots',
  },
  {
    laneId: 'offline-disabled',
    label: 'Offline disabled proof lane',
    network: 'offline',
    ledgerNetwork: 'offline',
    valueBearingSettlementRequested: false,
    protectedSourceBoundary: 'offline-no-source',
    requiredApprovalState: 'disabled',
    requirements: [
      requirement('offline-fixture-mode', 'environment', 'Offline fixture mode is available for deterministic checks.', 'none', true, 'Use source-safe fixtures when external providers are unavailable.'),
      requirement('offline-no-external-secrets', 'provider-connectivity', 'No external secret presence is required in disabled mode.', 'none', true, 'Keep disabled/offline checks fixture-only.'),
    ],
    providers: [
      provider('external-network', 'disabled', 'External calls are disabled; proofs must use committed source-safe fixtures.'),
      provider('wallet-broadcast', 'disabled', 'Wallet broadcast is disabled in offline rehearsal.'),
    ],
    ledgerPosture: 'offline lane carries no live ledger writes',
    databasePosture: 'offline lane carries no live database readback',
    objectStoragePosture: 'offline lane carries no live object-storage writes',
    btcNetworkPosture: 'offline lane cannot broadcast BTC transactions',
    rollbackPosture: 'no destructive operation is admitted in disabled/offline lane',
  },
];

function requirement(
  requirementId: string,
  category: V32ReadinessRequirementCategory,
  label: string,
  secretClass: V32ReadinessSecretClass,
  defaultPresent: boolean,
  repairAction: string,
): LaneTemplate['requirements'][number] {
  return {
    requirementId,
    category,
    label,
    required: true,
    secretClass,
    defaultPresent,
    repairAction,
  };
}

function provider(
  providerId: string,
  state: V32ReadinessRehearsalState,
  sourceSafeSummary: string,
): V32ReadinessProviderPosture {
  return { providerId, state, sourceSafeSummary };
}

export function buildV32TestnetMainnetReadinessRehearsal(
  input: BuildV32TestnetMainnetReadinessRehearsalInput = {},
): V32TestnetMainnetReadinessRehearsal {
  const lanes = LANE_TEMPLATES.map((template) =>
    buildLaneRecord(template, input.presentRequirementIds?.[template.laneId]),
  );
  const readyLaneCount = lanes.filter((lane) => lane.state === 'ready').length;
  const blockedLaneCount = lanes.filter((lane) => lane.state === 'blocked').length;
  const disabledLaneCount = lanes.filter((lane) => lane.state === 'disabled').length;

  return {
    kind: 'btd.v32_testnet_mainnet_readiness_rehearsal',
    version: 'V32',
    currentTarget: 'V31',
    lanes,
    sourceSafety: {
      secretValuesSerialized: false,
      protectedSourceSerialized: false,
      rawProviderPayloadsSerialized: false,
      readinessClass: 'secret-presence-only',
    },
    summary: {
      laneCount: lanes.length,
      readyLaneCount,
      blockedLaneCount,
      disabledLaneCount,
      productionMainnetValueBearingAdmitted: false,
    },
  };
}

function buildLaneRecord(
  template: LaneTemplate,
  overridePresentRequirementIds?: string[],
): V32ReadinessLaneRecord {
  const override = overridePresentRequirementIds ? new Set(overridePresentRequirementIds) : null;
  const requirements = template.requirements.map<V32ReadinessRequirement>((entry) => ({
    requirementId: entry.requirementId,
    category: entry.category,
    label: entry.label,
    required: entry.required,
    present: override ? override.has(entry.requirementId) : entry.defaultPresent,
    secretClass: entry.secretClass,
    valueSerialized: false,
    repairAction: entry.repairAction,
  }));
  const missingRequirements = requirements
    .filter((entry) => entry.required && !entry.present)
    .map((entry) => entry.requirementId);
  const productionMainnetBlocked = template.laneId === 'production-mainnet';
  const disabled = template.laneId === 'offline-disabled';
  const blockers = [
    ...missingRequirements.map((id) => `missing:${id}`),
    ...(productionMainnetBlocked ? ['production-mainnet-value-bearing-not-admitted-in-v32'] : []),
  ];
  const state: V32ReadinessRehearsalState = disabled
    ? 'disabled'
    : blockers.length > 0
      ? 'blocked'
      : 'ready';
  const repairActions = Array.from(
    new Set(
      requirements
        .filter((entry) => !entry.present || productionMainnetBlocked)
        .map((entry) => entry.repairAction),
    ),
  );

  return {
    laneId: template.laneId,
    label: template.label,
    network: template.network,
    ledgerNetwork: template.ledgerNetwork,
    state,
    valueBearingSettlementRequested: template.valueBearingSettlementRequested,
    valueBearingSettlementAdmitted: false,
    protectedSourceBoundary: template.protectedSourceBoundary,
    requiredApprovalState: template.requiredApprovalState,
    requirements,
    providers: template.providers,
    ledgerPosture: template.ledgerPosture,
    databasePosture: template.databasePosture,
    objectStoragePosture: template.objectStoragePosture,
    btcNetworkPosture: template.btcNetworkPosture,
    rollbackPosture: template.rollbackPosture,
    blockers,
    repairActions,
    readinessRoot: hashRoot({
      laneId: template.laneId,
      state,
      missingRequirements,
      productionMainnetBlocked,
      protectedSourceBoundary: template.protectedSourceBoundary,
    }),
  };
}

function hashRoot(value: unknown): string {
  const serialized = stableJson(value);
  let hash = 2166136261;
  for (let index = 0; index < serialized.length; index += 1) {
    hash ^= serialized.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `source-safe-root:${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (!value || typeof value !== 'object') return JSON.stringify(value);
  return `{${Object.entries(value as Record<string, unknown>)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, entry]) => `${JSON.stringify(key)}:${stableJson(entry)}`)
    .join(',')}}`;
}
