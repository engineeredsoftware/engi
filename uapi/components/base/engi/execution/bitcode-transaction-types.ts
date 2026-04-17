'use client';

export type TransactionOwnership = 'all' | 'mine' | 'network';
export type TransactionLens = 'all' | 'give' | 'need' | 'closure';
export type TransactionSort = 'newest' | 'oldest' | 'most-tokens' | 'highest-usd';
export const BITCODE_TRANSACTION_PAGE_SIZES = [10, 25, 50] as const;
export type TransactionPageSize = typeof BITCODE_TRANSACTION_PAGE_SIZES[number];

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

export interface TransactionPagination {
  page: number;
  pageSize: TransactionPageSize;
}

export interface TransactionPaginationSummary extends TransactionPagination {
  totalRecords: number;
  totalPages: number;
  startRecord: number;
  endRecord: number;
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
