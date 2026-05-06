import {
  BtdTokenId,
  LedgerChain,
  LedgerNetwork,
  assertLedgerNetwork,
  assertNonEmptyString,
  assertPositiveSafeInteger,
} from './constants';

export type LedgerFinalityState = 'prepared' | 'broadcast' | 'confirmed' | 'reorged' | 'failed';
export type BitcoinCommitmentMethod = 'taproot' | 'op_return' | 'standard_output_commitment';

export interface AssetPackLedgerAnchor {
  anchorId: string;
  assetPackId: string;
  chain: LedgerChain;
  network: LedgerNetwork;
  txidOrHash: string | null;
  outputIndex?: number;
  contractAddress?: string;
  tokenId?: string;
  commitmentMethod?: BitcoinCommitmentMethod | 'ethereum_registry_event' | 'internal_journal';
  commitmentRoot: string;
  sourceManifestRoot: string;
  proofRoot: string;
  accessPolicyHash: string;
  btdRangeStart: BtdTokenId;
  btdRangeEndExclusive: BtdTokenId;
  finalityState: LedgerFinalityState;
  confirmations: number;
  anchoredAt?: string;
}

const ALLOWED_ANCHOR_TRANSITIONS: Record<LedgerFinalityState, LedgerFinalityState[]> = {
  prepared: ['broadcast', 'failed'],
  broadcast: ['confirmed', 'reorged', 'failed'],
  confirmed: [],
  reorged: [],
  failed: [],
};

export function buildPreparedAssetPackLedgerAnchor(input: {
  anchorId: string;
  assetPackId: string;
  chain?: LedgerChain;
  network: LedgerNetwork;
  commitmentMethod?: AssetPackLedgerAnchor['commitmentMethod'];
  commitmentRoot: string;
  sourceManifestRoot: string;
  proofRoot: string;
  accessPolicyHash: string;
  btdRangeStart: BtdTokenId;
  btdRangeEndExclusive: BtdTokenId;
  contractAddress?: string;
  tokenId?: string;
}): AssetPackLedgerAnchor {
  const chain = input.chain ?? 'bitcoin';

  if (chain === 'ethereum' && !input.commitmentMethod) {
    throw new Error('Ethereum anchors must declare the registry/event commitment method.');
  }

  if (chain === 'bitcoin' && input.network !== 'regtest' && input.network !== 'signet' && input.network !== 'mainnet' && input.network !== 'testnet') {
    throw new Error('Bitcoin anchors require a Bitcoin network.');
  }

  const btdRangeStart = assertPositiveOrZero(input.btdRangeStart, 'btdRangeStart');
  const btdRangeEndExclusive = assertPositiveSafeInteger(
    input.btdRangeEndExclusive,
    'btdRangeEndExclusive',
  );

  if (btdRangeEndExclusive <= btdRangeStart) {
    throw new Error('AssetPack ledger anchor range must be non-empty.');
  }

  return {
    anchorId: assertNonEmptyString(input.anchorId, 'anchorId'),
    assetPackId: assertNonEmptyString(input.assetPackId, 'assetPackId'),
    chain,
    network: assertLedgerNetwork(input.network),
    txidOrHash: null,
    contractAddress: input.contractAddress,
    tokenId: input.tokenId,
    commitmentMethod:
      input.commitmentMethod ??
      (chain === 'bitcoin' ? 'standard_output_commitment' : 'internal_journal'),
    commitmentRoot: assertNonEmptyString(input.commitmentRoot, 'commitmentRoot'),
    sourceManifestRoot: assertNonEmptyString(input.sourceManifestRoot, 'sourceManifestRoot'),
    proofRoot: assertNonEmptyString(input.proofRoot, 'proofRoot'),
    accessPolicyHash: assertNonEmptyString(input.accessPolicyHash, 'accessPolicyHash'),
    btdRangeStart,
    btdRangeEndExclusive,
    finalityState: 'prepared',
    confirmations: 0,
  };
}

export function advanceAssetPackLedgerAnchor(
  anchor: AssetPackLedgerAnchor,
  next: {
    finalityState: Exclude<LedgerFinalityState, 'prepared'>;
    txidOrHash?: string;
    confirmations?: number;
    outputIndex?: number;
    anchoredAt?: string;
  },
): AssetPackLedgerAnchor {
  assertAssetPackLedgerAnchor(anchor);
  const allowed = ALLOWED_ANCHOR_TRANSITIONS[anchor.finalityState];
  if (!allowed.includes(next.finalityState)) {
    throw new Error(`Invalid ledger anchor transition: ${anchor.finalityState} -> ${next.finalityState}.`);
  }

  const txidOrHash = next.txidOrHash ?? anchor.txidOrHash;
  if (['broadcast', 'confirmed', 'reorged'].includes(next.finalityState)) {
    assertNonEmptyString(txidOrHash, 'txidOrHash');
  }

  const confirmations = next.confirmations ?? anchor.confirmations;
  if (next.finalityState === 'confirmed' && confirmations <= 0) {
    throw new Error('Confirmed ledger anchor requires confirmations.');
  }

  return {
    ...anchor,
    txidOrHash: txidOrHash ?? null,
    outputIndex: next.outputIndex ?? anchor.outputIndex,
    finalityState: next.finalityState,
    confirmations,
    anchoredAt: next.anchoredAt ?? anchor.anchoredAt,
  };
}

export function assertAssetPackLedgerAnchor(anchor: AssetPackLedgerAnchor): AssetPackLedgerAnchor {
  assertNonEmptyString(anchor.anchorId, 'anchorId');
  assertNonEmptyString(anchor.assetPackId, 'assetPackId');
  assertLedgerNetwork(anchor.network);
  assertNonEmptyString(anchor.commitmentRoot, 'commitmentRoot');
  assertNonEmptyString(anchor.sourceManifestRoot, 'sourceManifestRoot');
  assertNonEmptyString(anchor.proofRoot, 'proofRoot');
  assertNonEmptyString(anchor.accessPolicyHash, 'accessPolicyHash');

  if (anchor.btdRangeEndExclusive <= anchor.btdRangeStart) {
    throw new Error('AssetPack ledger anchor range must be non-empty.');
  }

  if (anchor.confirmations < 0) {
    throw new Error('Ledger anchor confirmations cannot be negative.');
  }

  if (['broadcast', 'confirmed', 'reorged'].includes(anchor.finalityState)) {
    assertNonEmptyString(anchor.txidOrHash, 'txidOrHash');
  }

  if (anchor.finalityState === 'confirmed' && anchor.confirmations <= 0) {
    throw new Error('Confirmed ledger anchor requires confirmations.');
  }

  return anchor;
}

function assertPositiveOrZero(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative safe integer.`);
  }

  return value;
}
