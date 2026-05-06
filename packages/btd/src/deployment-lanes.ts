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
