'use client';

import type { TransactionDataMode } from './bitcode-transaction-types';

export function isMockTransactionDataMode(mode: TransactionDataMode) {
  return mode !== 'live';
}

export function getTransactionDataModeLabel(mode: TransactionDataMode) {
  switch (mode) {
    case 'mock-review':
      return 'mock review';
    case 'review-fallback':
      return 'review fallback';
    default:
      return 'live detail';
  }
}

export function getTransactionDataModeDescription(mode: TransactionDataMode) {
  switch (mode) {
    case 'mock-review':
      return 'full transaction review is running against deterministic mock surfaces';
    case 'review-fallback':
      return 'live history is empty here, so bounded review transactions keep master detail interactive';
    default:
      return 'master detail is reading live Bitcode execution history';
  }
}
