import type { WorkspaceRun } from './application-run-data';

export type ApplicationTransactionOwnership = 'all' | 'mine' | 'network';
export type ApplicationTransactionLens = 'all' | 'give' | 'need' | 'closure';

export interface ApplicationTransactionRecord {
  id: string;
  summary: string;
  type: string;
  status: string;
  repository: string;
  branch: string;
  participant: string;
  proofStatus: string;
  closureFocus: string;
  createdAt: string;
  tokenTotal: number | null;
  usdTotal: number | null;
  creditsTotal: number | null;
  itemCount: number;
  isOwnTransaction: boolean;
  transactionLens: Exclude<ApplicationTransactionLens, 'all'>;
  searchableText: string;
}

export interface ApplicationTransactionFilters {
  searchTerm: string;
  status: string;
  ownership: ApplicationTransactionOwnership;
  transactionLens: ApplicationTransactionLens;
  repository: string;
}

function normalizeWhitespace(value?: string | null) {
  return value?.trim() || '';
}

function normalizeRunType(value?: string | null) {
  return normalizeWhitespace(value) || 'pipeline:deliverables';
}

function normalizeStatus(value?: string | null) {
  return normalizeWhitespace(value) || 'running';
}

function inferTransactionLens(run: WorkspaceRun): ApplicationTransactionRecord['transactionLens'] {
  if (run.transactionLens === 'give' || run.transactionLens === 'need' || run.transactionLens === 'closure') {
    return run.transactionLens;
  }

  const type = normalizeRunType(run.type).toLowerCase();
  if (type.includes('deliverable')) return 'give';
  if (type.includes('measure')) return 'need';
  return 'closure';
}

export function normalizeApplicationTransactions(runs: WorkspaceRun[]): ApplicationTransactionRecord[] {
  return runs.map((run) => {
    const repository = normalizeWhitespace(run.repository) || 'bitcode/bitcode';
    const branch = normalizeWhitespace(run.branch) || 'n/a';
    const participant = normalizeWhitespace(run.participant) || repository.split('/')[0] || 'connected operator';
    const summary =
      normalizeWhitespace(run.summary) || 'Inspect this Bitcode transaction inside the application-owned detail surface.';
    const status = normalizeStatus(run.status);
    const proofStatus = normalizeWhitespace(run.proofStatus) || 'closure state in flight';
    const closureFocus = normalizeWhitespace(run.closureFocus) || 'application consequence reading';
    const transactionLens = inferTransactionLens(run);
    const type = normalizeRunType(run.type);
    const searchableText = [
      run.id,
      summary,
      type,
      status,
      repository,
      branch,
      participant,
      proofStatus,
      closureFocus,
      transactionLens,
    ]
      .join(' ')
      .toLowerCase();

    return {
      id: run.id,
      summary,
      type,
      status,
      repository,
      branch,
      participant,
      proofStatus,
      closureFocus,
      createdAt: run.created_at,
      tokenTotal: run.tokenTotal ?? null,
      usdTotal: run.usdTotal ?? null,
      creditsTotal: run.creditsTotal ?? null,
      itemCount: run.itemCount || 0,
      isOwnTransaction: Boolean(run.isOwnTransaction),
      transactionLens,
      searchableText,
    };
  });
}

export function buildApplicationTransactionFilters(): ApplicationTransactionFilters {
  return {
    searchTerm: '',
    status: 'all',
    ownership: 'all',
    transactionLens: 'all',
    repository: 'all',
  };
}

export function filterApplicationTransactions(
  records: ApplicationTransactionRecord[],
  filters: ApplicationTransactionFilters,
) {
  const searchTerm = filters.searchTerm.trim().toLowerCase();

  return records.filter((record) => {
    if (searchTerm && !record.searchableText.includes(searchTerm)) return false;
    if (filters.status !== 'all' && record.status !== filters.status) return false;
    if (filters.transactionLens !== 'all' && record.transactionLens !== filters.transactionLens) return false;
    if (filters.repository !== 'all' && record.repository !== filters.repository) return false;
    if (filters.ownership === 'mine' && !record.isOwnTransaction) return false;
    if (filters.ownership === 'network' && record.isOwnTransaction) return false;
    return true;
  });
}

export function buildApplicationTransactionFilterOptions(records: ApplicationTransactionRecord[]) {
  return {
    statuses: Array.from(new Set(records.map((record) => record.status))).sort(),
    repositories: Array.from(new Set(records.map((record) => record.repository))).sort(),
  };
}
