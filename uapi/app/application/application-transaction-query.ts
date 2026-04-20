import type {
  TransactionFilters,
  TransactionLens,
  TransactionOwnership,
  TransactionPagination,
  TransactionSort,
} from '@/components/base/bitcode/execution/bitcode-transaction-types';
import {
  BITCODE_TRANSACTION_PAGE_SIZES,
  DEFAULT_TRANSACTION_PAGINATION,
} from '@/components/base/bitcode/execution/bitcode-transaction-types';

import { buildApplicationTransactionFilters } from './application-transactions';

const SEARCH_PARAM_KEYS = {
  transactionId: 'transactionId',
  legacyRunId: 'runId',
  detailSection: 'transactionDetail',
  search: 'transactionSearch',
  status: 'transactionStatus',
  ownership: 'transactionOwnership',
  lens: 'transactionLens',
  repository: 'transactionRepository',
  participant: 'transactionParticipant',
  proofStatus: 'transactionProof',
  sort: 'transactionSort',
  page: 'transactionPage',
  pageSize: 'transactionPageSize',
} as const;

const TRANSACTION_OWNERSHIP_VALUES: TransactionOwnership[] = ['all', 'mine', 'network'];
const TRANSACTION_LENS_VALUES: TransactionLens[] = ['all', 'give', 'need', 'closure'];
const TRANSACTION_SORT_VALUES: TransactionSort[] = ['newest', 'oldest', 'most-tokens', 'highest-usd'];
export type ApplicationTransactionDetailSection =
  | 'deliverables'
  | 'transaction'
  | 'closure'
  | 'proofs'
  | 'history'
  | 'activity'
  | 'console';
const TRANSACTION_DETAIL_SECTION_VALUES: ApplicationTransactionDetailSection[] = [
  'deliverables',
  'transaction',
  'closure',
  'proofs',
  'history',
  'activity',
  'console',
];

function parseEnumValue<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  if (value && allowed.includes(value as T)) return value as T;
  return fallback;
}

function parseTextValue(value: string | null, fallback: string) {
  const normalized = value?.trim();
  return normalized ? normalized : fallback;
}

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value || '', 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return parsed;
}

export function readApplicationTransactionId(searchParams: URLSearchParams) {
  return (
    searchParams.get(SEARCH_PARAM_KEYS.transactionId)
    || searchParams.get(SEARCH_PARAM_KEYS.legacyRunId)
    || null
  );
}

export function readApplicationTransactionDetailSection(searchParams: URLSearchParams) {
  const rawValue = searchParams.get(SEARCH_PARAM_KEYS.detailSection);
  if (rawValue === 'identity') return 'transaction';
  return parseEnumValue(rawValue, TRANSACTION_DETAIL_SECTION_VALUES, 'deliverables');
}

export function readApplicationTransactionFilters(searchParams: URLSearchParams): TransactionFilters {
  const fallback = buildApplicationTransactionFilters();

  return {
    searchTerm: parseTextValue(searchParams.get(SEARCH_PARAM_KEYS.search), fallback.searchTerm),
    status: parseTextValue(searchParams.get(SEARCH_PARAM_KEYS.status), fallback.status),
    ownership: parseEnumValue(
      searchParams.get(SEARCH_PARAM_KEYS.ownership),
      TRANSACTION_OWNERSHIP_VALUES,
      fallback.ownership,
    ),
    transactionLens: parseEnumValue(
      searchParams.get(SEARCH_PARAM_KEYS.lens),
      TRANSACTION_LENS_VALUES,
      fallback.transactionLens,
    ),
    repository: parseTextValue(searchParams.get(SEARCH_PARAM_KEYS.repository), fallback.repository),
    participant: parseTextValue(searchParams.get(SEARCH_PARAM_KEYS.participant), fallback.participant),
    proofStatus: parseTextValue(searchParams.get(SEARCH_PARAM_KEYS.proofStatus), fallback.proofStatus),
    sort: parseEnumValue(searchParams.get(SEARCH_PARAM_KEYS.sort), TRANSACTION_SORT_VALUES, fallback.sort),
  };
}

export function readApplicationTransactionPagination(searchParams: URLSearchParams): TransactionPagination {
  const parsedPageSize = parsePositiveInteger(
    searchParams.get(SEARCH_PARAM_KEYS.pageSize),
    DEFAULT_TRANSACTION_PAGINATION.pageSize,
  );
  const pageSize = BITCODE_TRANSACTION_PAGE_SIZES.includes(parsedPageSize as (typeof BITCODE_TRANSACTION_PAGE_SIZES)[number])
    ? (parsedPageSize as TransactionPagination['pageSize'])
    : DEFAULT_TRANSACTION_PAGINATION.pageSize;

  return {
    page: parsePositiveInteger(searchParams.get(SEARCH_PARAM_KEYS.page), DEFAULT_TRANSACTION_PAGINATION.page),
    pageSize,
  };
}

export function writeApplicationTransactionId(searchParams: URLSearchParams, transactionId: string) {
  const nextParams = new URLSearchParams(searchParams.toString());
  nextParams.set(SEARCH_PARAM_KEYS.transactionId, transactionId);
  nextParams.delete(SEARCH_PARAM_KEYS.legacyRunId);
  return nextParams;
}

export function writeApplicationTransactionDetailSection(
  searchParams: URLSearchParams,
  detailSection: ApplicationTransactionDetailSection,
) {
  const nextParams = new URLSearchParams(searchParams.toString());
  if (detailSection === 'deliverables') {
    nextParams.delete(SEARCH_PARAM_KEYS.detailSection);
  } else {
    nextParams.set(SEARCH_PARAM_KEYS.detailSection, detailSection);
  }
  return nextParams;
}

export function writeApplicationTransactionFilters(
  searchParams: URLSearchParams,
  filters: TransactionFilters,
) {
  const nextParams = new URLSearchParams(searchParams.toString());
  const defaults = buildApplicationTransactionFilters();

  const writeValue = (key: string, value: string, defaultValue: string) => {
    if (value === defaultValue) {
      nextParams.delete(key);
      return;
    }
    nextParams.set(key, value);
  };

  writeValue(SEARCH_PARAM_KEYS.search, filters.searchTerm.trim(), defaults.searchTerm);
  writeValue(SEARCH_PARAM_KEYS.status, filters.status, defaults.status);
  writeValue(SEARCH_PARAM_KEYS.ownership, filters.ownership, defaults.ownership);
  writeValue(SEARCH_PARAM_KEYS.lens, filters.transactionLens, defaults.transactionLens);
  writeValue(SEARCH_PARAM_KEYS.repository, filters.repository, defaults.repository);
  writeValue(SEARCH_PARAM_KEYS.participant, filters.participant, defaults.participant);
  writeValue(SEARCH_PARAM_KEYS.proofStatus, filters.proofStatus, defaults.proofStatus);
  writeValue(SEARCH_PARAM_KEYS.sort, filters.sort, defaults.sort);

  return nextParams;
}

export function writeApplicationTransactionPagination(
  searchParams: URLSearchParams,
  pagination: TransactionPagination,
) {
  const nextParams = new URLSearchParams(searchParams.toString());

  if (pagination.page <= DEFAULT_TRANSACTION_PAGINATION.page) {
    nextParams.delete(SEARCH_PARAM_KEYS.page);
  } else {
    nextParams.set(SEARCH_PARAM_KEYS.page, String(pagination.page));
  }

  if (pagination.pageSize === DEFAULT_TRANSACTION_PAGINATION.pageSize) {
    nextParams.delete(SEARCH_PARAM_KEYS.pageSize);
  } else {
    nextParams.set(SEARCH_PARAM_KEYS.pageSize, String(pagination.pageSize));
  }

  return nextParams;
}

export function resetApplicationTransactionFilters(searchParams: URLSearchParams) {
  const nextParams = new URLSearchParams(searchParams.toString());
  nextParams.delete(SEARCH_PARAM_KEYS.search);
  nextParams.delete(SEARCH_PARAM_KEYS.status);
  nextParams.delete(SEARCH_PARAM_KEYS.ownership);
  nextParams.delete(SEARCH_PARAM_KEYS.lens);
  nextParams.delete(SEARCH_PARAM_KEYS.repository);
  nextParams.delete(SEARCH_PARAM_KEYS.participant);
  nextParams.delete(SEARCH_PARAM_KEYS.proofStatus);
  nextParams.delete(SEARCH_PARAM_KEYS.sort);
  nextParams.delete(SEARCH_PARAM_KEYS.page);
  return nextParams;
}
