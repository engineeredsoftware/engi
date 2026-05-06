import {
  BitcoinNetwork,
  LedgerNetwork,
  assertBitcoinNetwork,
  assertLedgerNetwork,
  assertNonEmptyString,
} from './constants';

export type V27CryptoDeploymentLaneKind =
  | 'local'
  | 'regtest'
  | 'signet'
  | 'testnet'
  | 'mainnet-ready'
  | 'mainnet-value-bearing';

export const V27_CRYPTO_DEPLOYMENT_ENVIRONMENT_KEYS = [
  'BITCODE_CRYPTO_LANE',
  'BITCODE_BITCOIN_NETWORK',
  'BITCODE_LEDGER_NETWORK',
  'BITCODE_BTC_RPC_URL',
  'BITCODE_BTC_FEE_WALLET_CONNECTOR',
  'BITCODE_LEDGER_ANCHOR_PROVIDER',
  'BITCODE_CRYPTO_TELEMETRY_SINK',
  'BITCODE_ROLLBACK_PLAN_ROOT',
] as const;

export interface V27CryptoDeploymentLane {
  lane: V27CryptoDeploymentLaneKind;
  bitcoinNetwork: BitcoinNetwork;
  ledgerNetwork: LedgerNetwork;
  valueBearing: boolean;
  signetProofRequired: boolean;
  operationalApprovalRoot?: string;
  telemetryRequired: boolean;
  rollbackPlanRoot: string;
}

export interface V27CryptoDeploymentReadinessReceipt {
  kind: 'btd.v27_crypto_deployment_readiness';
  readinessId: string;
  lane: V27CryptoDeploymentLane;
  requiredEnvironmentKeys: string[];
  presentEnvironmentKeys: string[];
  missingEnvironmentKeys: string[];
  mainnetValueBearingBlocked: boolean;
  blocking: boolean;
  issuedAt: string;
}

export function buildV27CryptoDeploymentLane(input: {
  lane: V27CryptoDeploymentLaneKind;
  bitcoinNetwork: BitcoinNetwork;
  ledgerNetwork: LedgerNetwork;
  rollbackPlanRoot: string;
  operationalApprovalRoot?: string;
}): V27CryptoDeploymentLane {
  const bitcoinNetwork = assertBitcoinNetwork(input.bitcoinNetwork);
  const ledgerNetwork = assertLedgerNetwork(input.ledgerNetwork);
  const valueBearing = input.lane === 'mainnet-value-bearing';

  if (valueBearing && !input.operationalApprovalRoot) {
    throw new Error('Value-bearing mainnet V27 lane requires operational approval root.');
  }

  if (input.lane === 'mainnet-ready' && bitcoinNetwork !== 'mainnet') {
    throw new Error('mainnet-ready lane must target the Bitcoin mainnet network.');
  }

  if (input.lane === 'mainnet-value-bearing' && bitcoinNetwork !== 'mainnet') {
    throw new Error('mainnet-value-bearing lane must target the Bitcoin mainnet network.');
  }

  if (input.lane === 'signet' && bitcoinNetwork !== 'signet') {
    throw new Error('signet lane must target signet.');
  }

  if (input.lane === 'regtest' && bitcoinNetwork !== 'regtest') {
    throw new Error('regtest lane must target regtest.');
  }

  return {
    lane: input.lane,
    bitcoinNetwork,
    ledgerNetwork,
    valueBearing,
    signetProofRequired:
      input.lane === 'signet' ||
      input.lane === 'mainnet-ready' ||
      input.lane === 'mainnet-value-bearing',
    operationalApprovalRoot: input.operationalApprovalRoot
      ? assertNonEmptyString(input.operationalApprovalRoot, 'operationalApprovalRoot')
      : undefined,
    telemetryRequired: input.lane !== 'local',
    rollbackPlanRoot: assertNonEmptyString(input.rollbackPlanRoot, 'rollbackPlanRoot'),
  };
}

export function buildV27CryptoDeploymentReadinessReceipt(input: {
  readinessId: string;
  lane: V27CryptoDeploymentLane;
  presentEnvironmentKeys: string[];
  requiredEnvironmentKeys?: readonly string[];
  issuedAt?: string;
}): V27CryptoDeploymentReadinessReceipt {
  const requiredEnvironmentKeys = [
    ...(input.requiredEnvironmentKeys ?? V27_CRYPTO_DEPLOYMENT_ENVIRONMENT_KEYS),
  ];
  const present = new Set(input.presentEnvironmentKeys);
  const missingEnvironmentKeys = requiredEnvironmentKeys.filter((key) => !present.has(key));
  const mainnetValueBearingBlocked =
    input.lane.lane === 'mainnet-value-bearing' && !input.lane.operationalApprovalRoot;

  return {
    kind: 'btd.v27_crypto_deployment_readiness',
    readinessId: assertNonEmptyString(input.readinessId, 'readinessId'),
    lane: input.lane,
    requiredEnvironmentKeys,
    presentEnvironmentKeys: input.presentEnvironmentKeys,
    missingEnvironmentKeys,
    mainnetValueBearingBlocked,
    blocking: missingEnvironmentKeys.length > 0 || mainnetValueBearingBlocked,
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}
