'use client';

export type TransactionOwnership = 'all' | 'mine' | 'network';
export type TransactionLens = 'all' | 'give' | 'need' | 'closure';
export type TransactionSort = 'newest' | 'oldest' | 'most-tokens' | 'highest-usd';

export interface TransactionFilters {
  searchTerm: string;
  status: string;
  ownership: TransactionOwnership;
  transactionLens: TransactionLens;
  repository: string;
  participant: string;
  proofStatus: string;
  sort: TransactionSort;
}

export interface TransactionRecord {
  id: string;
  summary: string;
  type: string;
  status: string;
  participant: string;
  repository: string;
  branch: string;
  proofStatus: string;
  closureFocus: string;
  createdAt: string;
  tokenTotal?: number | null;
  isOwnTransaction: boolean;
  transactionLens: Exclude<TransactionLens, 'all'>;
}
