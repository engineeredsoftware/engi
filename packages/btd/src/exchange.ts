import {
  BITCODE_FEE_ASSET,
  BtdTokenId,
  assertNonEmptyString,
  assertPositiveSafeInteger,
  toBigIntAmount,
} from './constants';

export type AssetPackExchangeOrderKind = 'sell' | 'buy' | 'bid' | 'ask';
export type AssetPackExchangeOrderState =
  | 'open'
  | 'accepted'
  | 'cancelled'
  | 'expired'
  | 'settled'
  | 'failed';

export interface AssetPackExchangeOrder {
  orderId: string;
  orderKind: AssetPackExchangeOrderKind;
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  makerWalletId: string;
  takerWalletId?: string;
  priceAsset: typeof BITCODE_FEE_ASSET;
  priceSats: bigint;
  accessPolicyHash: string;
  orderState: AssetPackExchangeOrderState;
  createdAtExchangeSequence: bigint;
  settledAtExchangeSequence?: bigint;
  ledgerAnchorId?: string;
}

export interface AssetPackRightsTransferReceipt {
  kind: 'btd.asset_pack_rights_transfer';
  receiptId: string;
  orderId: string;
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  fromWalletId: string;
  toWalletId: string;
  priceAsset: typeof BITCODE_FEE_ASSET;
  priceSats: bigint;
  accessPolicyHash: string;
  btcFeeReceiptId: string;
  ledgerAnchorId?: string;
  exchangeSequence: bigint;
  issuedAt: string;
}

export function createAssetPackExchangeOrder(input: {
  orderId: string;
  orderKind: AssetPackExchangeOrderKind;
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  makerWalletId: string;
  priceSats: bigint | number | string;
  accessPolicyHash: string;
  createdAtExchangeSequence: bigint;
}): AssetPackExchangeOrder {
  const rangeStart = assertRangeStart(input.rangeStart);
  const rangeEndExclusive = assertPositiveSafeInteger(
    input.rangeEndExclusive,
    'rangeEndExclusive',
  );
  if (rangeEndExclusive <= rangeStart) {
    throw new Error('Exchange order range must be non-empty.');
  }

  const priceSats = toBigIntAmount(input.priceSats, 'priceSats');
  if (priceSats <= 0n) {
    throw new Error('Exchange order priceSats must be positive.');
  }

  return {
    orderId: assertNonEmptyString(input.orderId, 'orderId'),
    orderKind: input.orderKind,
    assetPackId: assertNonEmptyString(input.assetPackId, 'assetPackId'),
    rangeStart,
    rangeEndExclusive,
    makerWalletId: assertNonEmptyString(input.makerWalletId, 'makerWalletId'),
    priceAsset: BITCODE_FEE_ASSET,
    priceSats,
    accessPolicyHash: assertNonEmptyString(input.accessPolicyHash, 'accessPolicyHash'),
    orderState: 'open',
    createdAtExchangeSequence: input.createdAtExchangeSequence,
  };
}

export function acceptAssetPackExchangeOrder(
  order: AssetPackExchangeOrder,
  takerWalletId: string,
): AssetPackExchangeOrder {
  assertOpenOrder(order);

  return {
    ...order,
    takerWalletId: assertNonEmptyString(takerWalletId, 'takerWalletId'),
    orderState: 'accepted',
  };
}

export function cancelAssetPackExchangeOrder(order: AssetPackExchangeOrder): AssetPackExchangeOrder {
  assertOpenOrder(order);

  return {
    ...order,
    orderState: 'cancelled',
  };
}

export function settleAssetPackExchangeOrder(
  order: AssetPackExchangeOrder,
  input: {
    settledAtExchangeSequence: bigint;
    ledgerAnchorId?: string;
  },
): AssetPackExchangeOrder {
  if (order.orderState !== 'accepted') {
    throw new Error('Only accepted Exchange orders can settle.');
  }

  if (!order.takerWalletId) {
    throw new Error('Accepted Exchange order is missing taker wallet.');
  }

  return {
    ...order,
    orderState: 'settled',
    settledAtExchangeSequence: input.settledAtExchangeSequence,
    ledgerAnchorId: input.ledgerAnchorId,
  };
}

export function buildAssetPackRightsTransferReceipt(input: {
  receiptId: string;
  settledOrder: AssetPackExchangeOrder;
  fromWalletId: string;
  toWalletId: string;
  btcFeeReceiptId: string;
  issuedAt?: string;
}): AssetPackRightsTransferReceipt {
  const { settledOrder } = input;
  if (settledOrder.orderState !== 'settled' || settledOrder.settledAtExchangeSequence === undefined) {
    throw new Error('Rights transfer requires a settled Exchange order.');
  }

  return {
    kind: 'btd.asset_pack_rights_transfer',
    receiptId: assertNonEmptyString(input.receiptId, 'receiptId'),
    orderId: settledOrder.orderId,
    assetPackId: settledOrder.assetPackId,
    rangeStart: settledOrder.rangeStart,
    rangeEndExclusive: settledOrder.rangeEndExclusive,
    fromWalletId: assertNonEmptyString(input.fromWalletId, 'fromWalletId'),
    toWalletId: assertNonEmptyString(input.toWalletId, 'toWalletId'),
    priceAsset: BITCODE_FEE_ASSET,
    priceSats: settledOrder.priceSats,
    accessPolicyHash: settledOrder.accessPolicyHash,
    btcFeeReceiptId: assertNonEmptyString(input.btcFeeReceiptId, 'btcFeeReceiptId'),
    ledgerAnchorId: settledOrder.ledgerAnchorId,
    exchangeSequence: settledOrder.settledAtExchangeSequence,
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}

function assertOpenOrder(order: AssetPackExchangeOrder): void {
  if (order.priceAsset !== BITCODE_FEE_ASSET) {
    throw new Error('AssetPack Exchange order price asset must be BTC.');
  }

  if (order.orderState !== 'open') {
    throw new Error(`Exchange order is not open: ${order.orderState}.`);
  }
}

function assertRangeStart(value: number): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error('rangeStart must be a non-negative safe integer.');
  }

  return value;
}
