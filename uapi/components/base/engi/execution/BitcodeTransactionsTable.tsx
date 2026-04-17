'use client';

type TransactionOwnership = 'all' | 'mine' | 'network';
type TransactionLens = 'all' | 'give' | 'need' | 'closure';

interface TransactionFilters {
  searchTerm: string;
  status: string;
  ownership: TransactionOwnership;
  transactionLens: TransactionLens;
  repository: string;
}

interface TransactionRecord {
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
  isOwnTransaction: boolean;
  transactionLens: Exclude<TransactionLens, 'all'>;
}

function formatTimestamp(value: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function formatTypeLabel(value: string) {
  return value.replace(/^pipeline:/, '').replace(/[-_]/g, ' ');
}

function statusTone(status: string) {
  if (status === 'completed') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200';
  if (status === 'error' || status === 'failed') return 'border-red-500/30 bg-red-500/10 text-red-200';
  return 'border-amber-500/30 bg-amber-500/10 text-amber-100';
}

interface BitcodeTransactionsTableProps {
  records: TransactionRecord[];
  selectedTransactionId: string | null;
  onSelectTransaction: (transactionId: string) => void;
  filters: TransactionFilters;
  onFiltersChange: (nextFilters: TransactionFilters) => void;
  statusOptions: string[];
  repositoryOptions: string[];
  isLoading: boolean;
  error: string | null;
  mockMode: boolean;
}

export default function BitcodeTransactionsTable({
  records,
  selectedTransactionId,
  onSelectTransaction,
  filters,
  onFiltersChange,
  statusOptions,
  repositoryOptions,
  isLoading,
  error,
  mockMode,
}: BitcodeTransactionsTableProps) {
  const updateFilter = <K extends keyof TransactionFilters>(key: K, value: TransactionFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <section className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Transaction master</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Rich Bitcode transactions table</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-300">
            Master detail is concretely a searchable, filterable table of Bitcode transactions. Select any row to load
            transaction detail, deliverables, proofs, history, and activity in the central workspace.
          </p>
        </div>
        <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-3">
          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
            <p className="text-emerald-300/85">Transactions</p>
            <p className="mt-2 text-neutral-100">{records.length}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
            <p className="text-emerald-300/85">Selected</p>
            <p className="mt-2 text-neutral-100">{selectedTransactionId ? '1 active' : 'none'}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
            <p className="text-emerald-300/85">Mode</p>
            <p className="mt-2 text-neutral-100">{mockMode ? 'mock review' : 'live detail'}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,0.8fr))]">
        <label className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">Search transactions</span>
          <input
            value={filters.searchTerm}
            onChange={(event) => updateFilter('searchTerm', event.target.value)}
            placeholder="Search ids, repos, branches, proof posture, participants…"
            className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
          />
        </label>

        <label className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">Status</span>
          <select
            value={filters.status}
            onChange={(event) => updateFilter('status', event.target.value)}
            className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
          >
            <option value="all">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">Ownership</span>
          <select
            value={filters.ownership}
            onChange={(event) => updateFilter('ownership', event.target.value as TransactionOwnership)}
            className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
          >
            <option value="all">All participants</option>
            <option value="mine">My transactions</option>
            <option value="network">Network transactions</option>
          </select>
        </label>

        <label className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">Action lens</span>
          <select
            value={filters.transactionLens}
            onChange={(event) => updateFilter('transactionLens', event.target.value as TransactionLens)}
            className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
          >
            <option value="all">All lenses</option>
            <option value="give">Give</option>
            <option value="need">Need</option>
            <option value="closure">Closure</option>
          </select>
        </label>

        <label className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">Repository</span>
          <select
            value={filters.repository}
            onChange={(event) => updateFilter('repository', event.target.value)}
            className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
          >
            <option value="all">All repositories</option>
            {repositoryOptions.map((repository) => (
              <option key={repository} value={repository}>
                {repository}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.35rem] border border-white/8 bg-[rgba(4,8,18,0.84)]">
        {isLoading ? (
          <div className="px-5 py-10 text-sm text-neutral-400">Loading Bitcode transactions…</div>
        ) : error ? (
          <div className="px-5 py-5 text-sm text-red-200">{error}</div>
        ) : records.length === 0 ? (
          <div className="px-5 py-10 text-sm text-neutral-400">No Bitcode transactions match the current filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="border-b border-white/8 bg-white/5 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Transaction</th>
                  <th className="px-4 py-3">Lens</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Participant</th>
                  <th className="px-4 py-3">Repository</th>
                  <th className="px-4 py-3">Proof</th>
                  <th className="px-4 py-3">Started</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => {
                  const isSelected = record.id === selectedTransactionId;
                  return (
                    <tr
                      key={record.id}
                      className={`border-t border-white/6 transition ${isSelected ? 'bg-emerald-400/10' : 'hover:bg-white/5'}`}
                    >
                      <td className="px-4 py-4 align-top">
                        <button type="button" onClick={() => onSelectTransaction(record.id)} className="w-full text-left">
                          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-neutral-500">{record.id}</p>
                          <p className="mt-2 text-sm font-medium text-white">{formatTypeLabel(record.type)}</p>
                          <p className="mt-1 max-w-[24rem] text-sm leading-6 text-neutral-300">{record.summary}</p>
                        </button>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-neutral-200">
                          {record.transactionLens}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span className={`rounded-full border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.18em] ${statusTone(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-neutral-200">
                        <p>{record.participant}</p>
                        <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-neutral-500">
                          {record.isOwnTransaction ? 'mine' : 'network'}
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-neutral-200">
                        <p>{record.repository}</p>
                        <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-neutral-500">{record.branch}</p>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-neutral-200">
                        <p>{record.proofStatus}</p>
                        <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-neutral-500">{record.closureFocus}</p>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-neutral-200">{formatTimestamp(record.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
