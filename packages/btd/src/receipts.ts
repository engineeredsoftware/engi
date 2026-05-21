import { createHash } from 'crypto';
import type { BtcFeeFinalityState } from './bitcoin-fees';
import {
  BITCODE_FEE_ASSET,
  BTD_MAX_MINTABLE_SUPPLY,
  BtdTokenId,
  assertNonEmptyString,
  assertNonNegativeSafeInteger,
  assertPositiveBigInt,
  assertPositiveSafeInteger,
  toBigIntAmount,
} from './constants';
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
  assertNonEmptyString(receipt.issuedAt, 'issuedAt');
  assertNonNegativeSafeInteger(receipt.rangeStart, 'rangeStart');
  assertPositiveSafeInteger(receipt.rangeEndExclusive, 'rangeEndExclusive');
  assertPositiveSafeInteger(receipt.tokenCount, 'tokenCount');
  assertNonNegativeSafeInteger(receipt.totalMintedBefore, 'totalMintedBefore');
  assertPositiveSafeInteger(receipt.totalMintedAfter, 'totalMintedAfter');

  if (receipt.maxSupply !== BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error(`maxSupply must be ${BTD_MAX_MINTABLE_SUPPLY}.`);
  }

  if (receipt.rangeEndExclusive <= receipt.rangeStart) {
    throw new Error('Mint receipt range must be non-empty.');
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

  if (typeof receipt.mintedAtExchangeSequence !== 'bigint' || receipt.mintedAtExchangeSequence <= 0n) {
    throw new Error('mintedAtExchangeSequence must be a positive bigint.');
  }

  return receipt;
}

export type BtdAssetPackDisclosureState =
  | 'blocked'
  | 'source_safe_preview'
  | 'paid_unlocked';

export type BtdReadRightState = 'none' | 'owner_read' | 'licensed_read';

export type BtdDeliveryAdmissionState = 'blocked' | 'admitted';

export interface BtdAssetPackMintReceiptInput {
  receiptId?: string;
  mintReceipt: BtdMintReceipt;
  readId: string;
  depositorWalletId: string;
  sourceSafePreviewRoot: string;
  findingFitsResultRoot?: string;
  settlementConservationRoot: string;
  ledgerProjectionRoot: string;
  paidUnlockRoot?: string | null;
  deliveryAdmissionRoot?: string | null;
  issuedAt?: string;
}

export interface BtdAssetPackMintReceipt {
  kind: 'btd.asset_pack_mint_receipt';
  receiptId: string;
  assetPackId: string;
  readId: string;
  depositorWalletId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount: number;
  totalMintedBefore: number;
  totalMintedAfter: number;
  maxSupply: typeof BTD_MAX_MINTABLE_SUPPLY;
  sourceManifestRoot: string;
  sourceSafePreviewRoot: string;
  measurementReceiptRoot: string;
  findingFitsResultRoot: string;
  proofRoot: string;
  settlementJournalRoot: string;
  settlementConservationRoot: string;
  dedupeReceiptRoot: string;
  exchangeReceiptRoot: string;
  accessPolicyId: string;
  accessPolicyHash: string;
  ledgerProjectionRoot: string;
  paidUnlockRoot: string | null;
  deliveryAdmissionRoot: string | null;
  disclosureState: Extract<BtdAssetPackDisclosureState, 'source_safe_preview'>;
  protectedSourceVisible: false;
  mintedAtExchangeSequence: bigint;
  receiptRoot: string;
  issuedAt: string;
}

export interface BtdReadReceiptInput {
  receiptId?: string;
  assetPackId: string;
  readId: string;
  readRequestId: string;
  acceptedNeedRoot: string;
  findingFitsResultRoot: string;
  readerWalletId: string;
  depositorWalletId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount?: number;
  sourceManifestRoot: string;
  sourceSafePreviewRoot: string;
  accessPolicyHash: string;
  disclosureState: BtdAssetPackDisclosureState;
  readRightState: BtdReadRightState;
  paidUnlockRoot?: string | null;
  deliveryAdmissionState: BtdDeliveryAdmissionState;
  deliveryAdmissionRoot?: string | null;
  ledgerProjectionRoot: string;
  protectedSourceVisible?: boolean;
  issuedAt?: string;
}

export interface BtdReadReceipt {
  kind: 'btd.read_receipt';
  receiptId: string;
  assetPackId: string;
  readId: string;
  readRequestId: string;
  acceptedNeedRoot: string;
  findingFitsResultRoot: string;
  readerWalletId: string;
  depositorWalletId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount: number;
  sourceManifestRoot: string;
  sourceSafePreviewRoot: string;
  accessPolicyHash: string;
  disclosureState: BtdAssetPackDisclosureState;
  readRightState: BtdReadRightState;
  paidUnlockRoot: string | null;
  deliveryAdmissionState: BtdDeliveryAdmissionState;
  deliveryAdmissionRoot: string | null;
  ledgerProjectionRoot: string;
  protectedSourceVisible: boolean;
  receiptRoot: string;
  issuedAt: string;
}

export interface BtdRightsTransferReceiptInput {
  receiptId?: string;
  orderId: string;
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount?: number;
  fromWalletId: string;
  toWalletId: string;
  readerWalletId: string;
  depositorWalletId: string;
  priceSats: bigint | number | string;
  accessPolicyHash: string;
  btcFeeReceiptId: string;
  btcFeeFinalityState: BtcFeeFinalityState;
  readLicenseId: string;
  sourceSafePreviewRoot: string;
  paidUnlockRoot: string;
  deliveryAdmissionRoot: string;
  ledgerAnchorId: string;
  ledgerProjectionRoot: string;
  exchangeSequence: bigint;
  protectedSourceVisible?: boolean;
  issuedAt?: string;
}

export interface BtdRightsTransferReceipt {
  kind: 'btd.rights_transfer_receipt';
  receiptId: string;
  orderId: string;
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount: number;
  fromWalletId: string;
  toWalletId: string;
  readerWalletId: string;
  depositorWalletId: string;
  priceAsset: typeof BITCODE_FEE_ASSET;
  priceSats: bigint;
  accessPolicyHash: string;
  btcFeeReceiptId: string;
  btcFeeFinalityState: Extract<BtcFeeFinalityState, 'confirmed'>;
  readLicenseId: string;
  sourceSafePreviewRoot: string;
  paidUnlockRoot: string;
  deliveryAdmissionState: Extract<BtdDeliveryAdmissionState, 'admitted'>;
  deliveryAdmissionRoot: string;
  ledgerAnchorId: string;
  ledgerProjectionRoot: string;
  protectedSourceVisible: boolean;
  exchangeSequence: bigint;
  receiptRoot: string;
  issuedAt: string;
}

export function buildBtdAssetPackMintReceipt(
  input: BtdAssetPackMintReceiptInput,
): BtdAssetPackMintReceipt {
  const mintReceipt = assertBtdMintReceipt(input.mintReceipt);
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const findingFitsResultRoot = assertNonEmptyString(
    input.findingFitsResultRoot ?? mintReceipt.fitReceiptRoot,
    'findingFitsResultRoot',
  );
  const paidUnlockRoot = normalizeOptionalRoot(input.paidUnlockRoot, 'paidUnlockRoot');
  const deliveryAdmissionRoot = normalizeOptionalRoot(
    input.deliveryAdmissionRoot,
    'deliveryAdmissionRoot',
  );
  const receiptId =
    input.receiptId ??
    buildBtdReceiptStableId('btd-asset-pack-mint-receipt', [
      mintReceipt.assetPackId,
      input.readId,
      mintReceipt.rangeStart,
      mintReceipt.rangeEndExclusive,
      mintReceipt.mintedAtExchangeSequence,
    ]);
  const receiptRoot = buildBtdReceiptStableId('btd-asset-pack-mint-root', [
    receiptId,
    mintReceipt.sourceManifestRoot,
    input.sourceSafePreviewRoot,
    findingFitsResultRoot,
    input.ledgerProjectionRoot,
  ]);

  return assertBtdAssetPackMintReceipt({
    kind: 'btd.asset_pack_mint_receipt',
    receiptId,
    assetPackId: mintReceipt.assetPackId,
    readId: assertNonEmptyString(input.readId, 'readId'),
    depositorWalletId: assertNonEmptyString(input.depositorWalletId, 'depositorWalletId'),
    rangeStart: mintReceipt.rangeStart,
    rangeEndExclusive: mintReceipt.rangeEndExclusive,
    tokenCount: mintReceipt.tokenCount,
    totalMintedBefore: mintReceipt.totalMintedBefore,
    totalMintedAfter: mintReceipt.totalMintedAfter,
    maxSupply: mintReceipt.maxSupply,
    sourceManifestRoot: mintReceipt.sourceManifestRoot,
    sourceSafePreviewRoot: assertNonEmptyString(input.sourceSafePreviewRoot, 'sourceSafePreviewRoot'),
    measurementReceiptRoot: mintReceipt.measurementReceiptRoot,
    findingFitsResultRoot,
    proofRoot: mintReceipt.proofRoot,
    settlementJournalRoot: mintReceipt.settlementJournalRoot,
    settlementConservationRoot: assertNonEmptyString(
      input.settlementConservationRoot,
      'settlementConservationRoot',
    ),
    dedupeReceiptRoot: mintReceipt.dedupeReceiptRoot,
    exchangeReceiptRoot: mintReceipt.exchangeReceiptRoot,
    accessPolicyId: mintReceipt.accessPolicyId,
    accessPolicyHash: mintReceipt.accessPolicyHash,
    ledgerProjectionRoot: assertNonEmptyString(input.ledgerProjectionRoot, 'ledgerProjectionRoot'),
    paidUnlockRoot,
    deliveryAdmissionRoot,
    disclosureState: 'source_safe_preview',
    protectedSourceVisible: false,
    mintedAtExchangeSequence: mintReceipt.mintedAtExchangeSequence,
    receiptRoot,
    issuedAt,
  });
}

export function assertBtdAssetPackMintReceipt(
  receipt: BtdAssetPackMintReceipt,
): BtdAssetPackMintReceipt {
  if (receipt.kind !== 'btd.asset_pack_mint_receipt') {
    throw new Error('Invalid BTD AssetPack mint receipt kind.');
  }
  assertCommonAssetPackReceiptFields(receipt);
  assertNonEmptyString(receipt.readId, 'readId');
  assertNonEmptyString(receipt.depositorWalletId, 'depositorWalletId');
  assertNonEmptyString(receipt.sourceManifestRoot, 'sourceManifestRoot');
  assertNonEmptyString(receipt.sourceSafePreviewRoot, 'sourceSafePreviewRoot');
  assertNonEmptyString(receipt.measurementReceiptRoot, 'measurementReceiptRoot');
  assertNonEmptyString(receipt.findingFitsResultRoot, 'findingFitsResultRoot');
  assertNonEmptyString(receipt.proofRoot, 'proofRoot');
  assertNonEmptyString(receipt.settlementJournalRoot, 'settlementJournalRoot');
  assertNonEmptyString(receipt.settlementConservationRoot, 'settlementConservationRoot');
  assertNonEmptyString(receipt.dedupeReceiptRoot, 'dedupeReceiptRoot');
  assertNonEmptyString(receipt.exchangeReceiptRoot, 'exchangeReceiptRoot');
  assertNonEmptyString(receipt.accessPolicyId, 'accessPolicyId');
  assertNonEmptyString(receipt.accessPolicyHash, 'accessPolicyHash');
  assertNonEmptyString(receipt.ledgerProjectionRoot, 'ledgerProjectionRoot');
  assertNonEmptyString(receipt.receiptRoot, 'receiptRoot');
  assertNonEmptyString(receipt.issuedAt, 'issuedAt');
  assertReceiptRange(receipt);
  assertNonNegativeSafeInteger(receipt.totalMintedBefore, 'totalMintedBefore');
  assertPositiveSafeInteger(receipt.totalMintedAfter, 'totalMintedAfter');
  if (receipt.maxSupply !== BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error(`AssetPack mint receipt maxSupply must be ${BTD_MAX_MINTABLE_SUPPLY}.`);
  }
  if (receipt.totalMintedAfter !== receipt.totalMintedBefore + receipt.tokenCount) {
    throw new Error('AssetPack mint receipt does not conserve supply.');
  }
  if (receipt.disclosureState !== 'source_safe_preview' || receipt.protectedSourceVisible !== false) {
    throw new Error('AssetPack mint receipt must remain source-safe before settlement.');
  }
  assertPositiveBigInt(receipt.mintedAtExchangeSequence, 'mintedAtExchangeSequence');
  return receipt;
}

export function buildBtdReadReceipt(input: BtdReadReceiptInput): BtdReadReceipt {
  const range = normalizeReceiptRange(input);
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const paidUnlockRoot = normalizeOptionalRoot(input.paidUnlockRoot, 'paidUnlockRoot');
  const deliveryAdmissionRoot = normalizeOptionalRoot(
    input.deliveryAdmissionRoot,
    'deliveryAdmissionRoot',
  );
  const protectedSourceVisible = Boolean(input.protectedSourceVisible);
  assertReadDisclosureBoundary({
    disclosureState: input.disclosureState,
    readRightState: input.readRightState,
    paidUnlockRoot,
    deliveryAdmissionState: input.deliveryAdmissionState,
    deliveryAdmissionRoot,
    protectedSourceVisible,
  });
  const receiptId =
    input.receiptId ??
    buildBtdReceiptStableId('btd-read-receipt', [
      input.assetPackId,
      input.readId,
      input.readRequestId,
      input.readerWalletId,
      range.rangeStart,
      range.rangeEndExclusive,
      input.disclosureState,
    ]);
  const receiptRoot = buildBtdReceiptStableId('btd-read-receipt-root', [
    receiptId,
    input.acceptedNeedRoot,
    input.findingFitsResultRoot,
    input.sourceSafePreviewRoot,
    paidUnlockRoot ?? 'unpaid',
    input.ledgerProjectionRoot,
  ]);

  return assertBtdReadReceipt({
    kind: 'btd.read_receipt',
    receiptId,
    assetPackId: assertNonEmptyString(input.assetPackId, 'assetPackId'),
    readId: assertNonEmptyString(input.readId, 'readId'),
    readRequestId: assertNonEmptyString(input.readRequestId, 'readRequestId'),
    acceptedNeedRoot: assertNonEmptyString(input.acceptedNeedRoot, 'acceptedNeedRoot'),
    findingFitsResultRoot: assertNonEmptyString(input.findingFitsResultRoot, 'findingFitsResultRoot'),
    readerWalletId: assertNonEmptyString(input.readerWalletId, 'readerWalletId'),
    depositorWalletId: assertNonEmptyString(input.depositorWalletId, 'depositorWalletId'),
    rangeStart: range.rangeStart,
    rangeEndExclusive: range.rangeEndExclusive,
    tokenCount: range.tokenCount,
    sourceManifestRoot: assertNonEmptyString(input.sourceManifestRoot, 'sourceManifestRoot'),
    sourceSafePreviewRoot: assertNonEmptyString(input.sourceSafePreviewRoot, 'sourceSafePreviewRoot'),
    accessPolicyHash: assertNonEmptyString(input.accessPolicyHash, 'accessPolicyHash'),
    disclosureState: input.disclosureState,
    readRightState: input.readRightState,
    paidUnlockRoot,
    deliveryAdmissionState: input.deliveryAdmissionState,
    deliveryAdmissionRoot,
    ledgerProjectionRoot: assertNonEmptyString(input.ledgerProjectionRoot, 'ledgerProjectionRoot'),
    protectedSourceVisible,
    receiptRoot,
    issuedAt,
  });
}

export function assertBtdReadReceipt(receipt: BtdReadReceipt): BtdReadReceipt {
  if (receipt.kind !== 'btd.read_receipt') {
    throw new Error('Invalid BTD read receipt kind.');
  }
  assertCommonAssetPackReceiptFields(receipt);
  assertNonEmptyString(receipt.readId, 'readId');
  assertNonEmptyString(receipt.readRequestId, 'readRequestId');
  assertNonEmptyString(receipt.acceptedNeedRoot, 'acceptedNeedRoot');
  assertNonEmptyString(receipt.findingFitsResultRoot, 'findingFitsResultRoot');
  assertNonEmptyString(receipt.readerWalletId, 'readerWalletId');
  assertNonEmptyString(receipt.depositorWalletId, 'depositorWalletId');
  assertNonEmptyString(receipt.sourceManifestRoot, 'sourceManifestRoot');
  assertNonEmptyString(receipt.sourceSafePreviewRoot, 'sourceSafePreviewRoot');
  assertNonEmptyString(receipt.accessPolicyHash, 'accessPolicyHash');
  assertNonEmptyString(receipt.ledgerProjectionRoot, 'ledgerProjectionRoot');
  assertNonEmptyString(receipt.receiptRoot, 'receiptRoot');
  assertNonEmptyString(receipt.issuedAt, 'issuedAt');
  assertReceiptRange(receipt);
  assertReadDisclosureBoundary(receipt);
  return receipt;
}

export function buildBtdRightsTransferReceipt(
  input: BtdRightsTransferReceiptInput,
): BtdRightsTransferReceipt {
  const range = normalizeReceiptRange(input);
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const priceSats = toBigIntAmount(input.priceSats, 'priceSats');
  if (priceSats <= 0n) {
    throw new Error('Rights transfer receipt priceSats must be positive.');
  }
  if (input.btcFeeFinalityState !== 'confirmed') {
    throw new Error('Rights transfer receipt requires confirmed BTC fee finality.');
  }
  const receiptId =
    input.receiptId ??
    buildBtdReceiptStableId('btd-rights-transfer-receipt', [
      input.orderId,
      input.assetPackId,
      input.fromWalletId,
      input.toWalletId,
      input.exchangeSequence,
    ]);
  const receiptRoot = buildBtdReceiptStableId('btd-rights-transfer-receipt-root', [
    receiptId,
    input.btcFeeReceiptId,
    input.readLicenseId,
    input.paidUnlockRoot,
    input.deliveryAdmissionRoot,
    input.ledgerProjectionRoot,
  ]);

  return assertBtdRightsTransferReceipt({
    kind: 'btd.rights_transfer_receipt',
    receiptId,
    orderId: assertNonEmptyString(input.orderId, 'orderId'),
    assetPackId: assertNonEmptyString(input.assetPackId, 'assetPackId'),
    rangeStart: range.rangeStart,
    rangeEndExclusive: range.rangeEndExclusive,
    tokenCount: range.tokenCount,
    fromWalletId: assertNonEmptyString(input.fromWalletId, 'fromWalletId'),
    toWalletId: assertNonEmptyString(input.toWalletId, 'toWalletId'),
    readerWalletId: assertNonEmptyString(input.readerWalletId, 'readerWalletId'),
    depositorWalletId: assertNonEmptyString(input.depositorWalletId, 'depositorWalletId'),
    priceAsset: BITCODE_FEE_ASSET,
    priceSats,
    accessPolicyHash: assertNonEmptyString(input.accessPolicyHash, 'accessPolicyHash'),
    btcFeeReceiptId: assertNonEmptyString(input.btcFeeReceiptId, 'btcFeeReceiptId'),
    btcFeeFinalityState: input.btcFeeFinalityState,
    readLicenseId: assertNonEmptyString(input.readLicenseId, 'readLicenseId'),
    sourceSafePreviewRoot: assertNonEmptyString(input.sourceSafePreviewRoot, 'sourceSafePreviewRoot'),
    paidUnlockRoot: assertNonEmptyString(input.paidUnlockRoot, 'paidUnlockRoot'),
    deliveryAdmissionState: 'admitted',
    deliveryAdmissionRoot: assertNonEmptyString(input.deliveryAdmissionRoot, 'deliveryAdmissionRoot'),
    ledgerAnchorId: assertNonEmptyString(input.ledgerAnchorId, 'ledgerAnchorId'),
    ledgerProjectionRoot: assertNonEmptyString(input.ledgerProjectionRoot, 'ledgerProjectionRoot'),
    protectedSourceVisible: input.protectedSourceVisible ?? true,
    exchangeSequence: assertPositiveBigInt(input.exchangeSequence, 'exchangeSequence'),
    receiptRoot,
    issuedAt,
  });
}

export function assertBtdRightsTransferReceipt(
  receipt: BtdRightsTransferReceipt,
): BtdRightsTransferReceipt {
  if (receipt.kind !== 'btd.rights_transfer_receipt') {
    throw new Error('Invalid BTD rights transfer receipt kind.');
  }
  assertCommonAssetPackReceiptFields(receipt);
  assertNonEmptyString(receipt.orderId, 'orderId');
  assertNonEmptyString(receipt.fromWalletId, 'fromWalletId');
  assertNonEmptyString(receipt.toWalletId, 'toWalletId');
  assertNonEmptyString(receipt.readerWalletId, 'readerWalletId');
  assertNonEmptyString(receipt.depositorWalletId, 'depositorWalletId');
  assertNonEmptyString(receipt.accessPolicyHash, 'accessPolicyHash');
  assertNonEmptyString(receipt.btcFeeReceiptId, 'btcFeeReceiptId');
  assertNonEmptyString(receipt.readLicenseId, 'readLicenseId');
  assertNonEmptyString(receipt.sourceSafePreviewRoot, 'sourceSafePreviewRoot');
  assertNonEmptyString(receipt.paidUnlockRoot, 'paidUnlockRoot');
  assertNonEmptyString(receipt.deliveryAdmissionRoot, 'deliveryAdmissionRoot');
  assertNonEmptyString(receipt.ledgerAnchorId, 'ledgerAnchorId');
  assertNonEmptyString(receipt.ledgerProjectionRoot, 'ledgerProjectionRoot');
  assertNonEmptyString(receipt.receiptRoot, 'receiptRoot');
  assertNonEmptyString(receipt.issuedAt, 'issuedAt');
  assertReceiptRange(receipt);
  if (receipt.priceAsset !== BITCODE_FEE_ASSET) {
    throw new Error('Rights transfer receipt must price in BTC.');
  }
  if (receipt.priceSats <= 0n) {
    throw new Error('Rights transfer receipt priceSats must be positive.');
  }
  if (receipt.btcFeeFinalityState !== 'confirmed') {
    throw new Error('Rights transfer receipt requires confirmed BTC fee finality.');
  }
  if (receipt.deliveryAdmissionState !== 'admitted') {
    throw new Error('Rights transfer receipt requires delivery admission.');
  }
  if (!receipt.protectedSourceVisible) {
    throw new Error('Rights transfer receipt must unlock protected source after settlement.');
  }
  assertPositiveBigInt(receipt.exchangeSequence, 'exchangeSequence');
  return receipt;
}

type ReceiptRangeInput = {
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount?: number;
};

function normalizeReceiptRange(input: ReceiptRangeInput) {
  const rangeStart = assertNonNegativeSafeInteger(input.rangeStart, 'rangeStart') as BtdTokenId;
  const rangeEndExclusive = assertPositiveSafeInteger(
    input.rangeEndExclusive,
    'rangeEndExclusive',
  ) as BtdTokenId;
  if (rangeEndExclusive <= rangeStart) {
    throw new Error('BTD receipt range must be non-empty.');
  }
  const tokenCount = input.tokenCount ?? rangeEndExclusive - rangeStart;
  assertPositiveSafeInteger(tokenCount, 'tokenCount');
  if (tokenCount !== rangeEndExclusive - rangeStart) {
    throw new Error('BTD receipt tokenCount does not match range boundaries.');
  }
  return { rangeStart, rangeEndExclusive, tokenCount };
}

function assertReceiptRange(receipt: ReceiptRangeInput): void {
  normalizeReceiptRange(receipt);
}

function assertCommonAssetPackReceiptFields(receipt: {
  receiptId: string;
  assetPackId: string;
}): void {
  assertNonEmptyString(receipt.receiptId, 'receiptId');
  assertNonEmptyString(receipt.assetPackId, 'assetPackId');
}

function normalizeOptionalRoot(value: string | null | undefined, label: string): string | null {
  return value === undefined || value === null ? null : assertNonEmptyString(value, label);
}

function assertReadDisclosureBoundary(input: {
  disclosureState: BtdAssetPackDisclosureState;
  readRightState: BtdReadRightState;
  paidUnlockRoot: string | null;
  deliveryAdmissionState: BtdDeliveryAdmissionState;
  deliveryAdmissionRoot: string | null;
  protectedSourceVisible: boolean;
}): void {
  assertDisclosureState(input.disclosureState);
  assertReadRightState(input.readRightState);
  assertDeliveryAdmissionState(input.deliveryAdmissionState);

  if (input.protectedSourceVisible && input.disclosureState !== 'paid_unlocked') {
    throw new Error('Protected source cannot be visible before paid unlock.');
  }

  if (input.disclosureState === 'paid_unlocked' && !input.paidUnlockRoot) {
    throw new Error('Paid-unlocked read receipt requires paidUnlockRoot.');
  }

  if (input.deliveryAdmissionState === 'admitted') {
    if (!input.deliveryAdmissionRoot) {
      throw new Error('Delivery-admitted read receipt requires deliveryAdmissionRoot.');
    }
    if (!input.paidUnlockRoot) {
      throw new Error('Delivery-admitted read receipt requires paidUnlockRoot.');
    }
    if (input.readRightState === 'none') {
      throw new Error('Delivery-admitted read receipt requires a read right.');
    }
    if (input.disclosureState !== 'paid_unlocked') {
      throw new Error('Delivery-admitted read receipt requires paid unlock.');
    }
  }
}

function assertDisclosureState(state: BtdAssetPackDisclosureState): void {
  if (state !== 'blocked' && state !== 'source_safe_preview' && state !== 'paid_unlocked') {
    throw new Error(`Unsupported BTD disclosure state: ${state}.`);
  }
}

function assertReadRightState(state: BtdReadRightState): void {
  if (state !== 'none' && state !== 'owner_read' && state !== 'licensed_read') {
    throw new Error(`Unsupported BTD read right state: ${state}.`);
  }
}

function assertDeliveryAdmissionState(state: BtdDeliveryAdmissionState): void {
  if (state !== 'blocked' && state !== 'admitted') {
    throw new Error(`Unsupported BTD delivery admission state: ${state}.`);
  }
}

function buildBtdReceiptStableId(
  prefix: string,
  parts: Array<string | number | bigint | null | undefined>,
): string {
  const normalizedParts = parts.map((part) => (part === null || part === undefined ? '' : String(part)));
  const hash = createHash('sha256').update(normalizedParts.join('\u001f')).digest('hex').slice(0, 16);
  return `${prefix}_${hash}`;
}
