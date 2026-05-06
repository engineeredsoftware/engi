import { BTD_MAX_MINTABLE_SUPPLY, BtdTokenId, assertNonEmptyString } from './constants';
import { BtdRangeAllocationResult } from './range';

export interface BtdMintReceipt {
  kind: 'btd.asset_pack_mint';
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount: number;
  totalMintedBefore: number;
  totalMintedAfter: number;
  maxSupply: typeof BTD_MAX_MINTABLE_SUPPLY;
  sourceManifestRoot: string;
  measurementReceiptRoot: string;
  fitReceiptRoot: string;
  proofRoot: string;
  settlementJournalRoot: string;
  dedupeReceiptRoot: string;
  exchangeReceiptRoot: string;
  accessPolicyId: string;
  accessPolicyHash: string;
  mintedAtExchangeSequence: bigint;
  issuedAt: string;
}

export function buildBtdMintReceipt(
  allocation: BtdRangeAllocationResult,
  issuedAt = new Date().toISOString(),
): BtdMintReceipt {
  const { range } = allocation;

  return {
    kind: 'btd.asset_pack_mint',
    assetPackId: range.assetPackId,
    rangeStart: range.rangeStart,
    rangeEndExclusive: range.rangeEndExclusive,
    tokenCount: range.tokenCount,
    totalMintedBefore: allocation.previousSupply.totalMinted,
    totalMintedAfter: allocation.nextSupply.totalMinted,
    maxSupply: BTD_MAX_MINTABLE_SUPPLY,
    sourceManifestRoot: range.sourceManifestRoot,
    measurementReceiptRoot: allocation.measurementReceiptRoot,
    fitReceiptRoot: range.fitReceiptRoot,
    proofRoot: range.proofRoot,
    settlementJournalRoot: range.settlementJournalRoot,
    dedupeReceiptRoot: range.dedupeReceiptRoot,
    exchangeReceiptRoot: allocation.exchangeReceiptRoot,
    accessPolicyId: allocation.accessPolicyId,
    accessPolicyHash: allocation.accessPolicyHash,
    mintedAtExchangeSequence: range.mintedAtExchangeSequence,
    issuedAt,
  };
}

export function assertBtdMintReceipt(receipt: BtdMintReceipt): BtdMintReceipt {
  if (receipt.kind !== 'btd.asset_pack_mint') {
    throw new Error('Invalid BTD mint receipt kind.');
  }

  assertNonEmptyString(receipt.assetPackId, 'assetPackId');
  assertNonEmptyString(receipt.sourceManifestRoot, 'sourceManifestRoot');
  assertNonEmptyString(receipt.measurementReceiptRoot, 'measurementReceiptRoot');
  assertNonEmptyString(receipt.fitReceiptRoot, 'fitReceiptRoot');
  assertNonEmptyString(receipt.proofRoot, 'proofRoot');
  assertNonEmptyString(receipt.settlementJournalRoot, 'settlementJournalRoot');
  assertNonEmptyString(receipt.dedupeReceiptRoot, 'dedupeReceiptRoot');
  assertNonEmptyString(receipt.exchangeReceiptRoot, 'exchangeReceiptRoot');
  assertNonEmptyString(receipt.accessPolicyId, 'accessPolicyId');
  assertNonEmptyString(receipt.accessPolicyHash, 'accessPolicyHash');

  if (receipt.maxSupply !== BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error(`maxSupply must be ${BTD_MAX_MINTABLE_SUPPLY}.`);
  }

  if (receipt.tokenCount !== receipt.rangeEndExclusive - receipt.rangeStart) {
    throw new Error('Mint receipt tokenCount does not match range boundaries.');
  }

  if (receipt.totalMintedAfter !== receipt.totalMintedBefore + receipt.tokenCount) {
    throw new Error('Mint receipt does not conserve supply.');
  }

  if (receipt.totalMintedAfter > receipt.maxSupply) {
    throw new Error('Mint receipt exceeds maxSupply.');
  }

  return receipt;
}
