'use client';

import type { TransactionFilters, TransactionOwnership, TransactionSort } from './bitcode-transaction-types';

interface BitcodeTransactionsFilterBarProps {
  filters: TransactionFilters;
  onFiltersChange: (nextFilters: TransactionFilters) => void;
  statusOptions: string[];
  repositoryOptions: string[];
  participantOptions: string[];
  proofStatusOptions: string[];
}

export default function BitcodeTransactionsFilterBar({
  filters,
  onFiltersChange,
  statusOptions,
  repositoryOptions,
  participantOptions,
  proofStatusOptions,
}: BitcodeTransactionsFilterBarProps) {
  const updateFilter = <K extends keyof TransactionFilters>(key: K, value: TransactionFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_repeat(6,minmax(0,0.76fr))]">
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
          onChange={(event) => updateFilter('transactionLens', event.target.value as TransactionFilters['transactionLens'])}
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

      <label className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
        <span className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">Participant</span>
        <select
          value={filters.participant}
          onChange={(event) => updateFilter('participant', event.target.value)}
          className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="all">All participants</option>
          {participantOptions.map((participant) => (
            <option key={participant} value={participant}>
              {participant}
            </option>
          ))}
        </select>
      </label>

      <label className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
        <span className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">Proof posture</span>
        <select
          value={filters.proofStatus}
          onChange={(event) => updateFilter('proofStatus', event.target.value)}
          className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="all">All proof states</option>
          {proofStatusOptions.map((proofStatus) => (
            <option key={proofStatus} value={proofStatus}>
              {proofStatus}
            </option>
          ))}
        </select>
      </label>

      <label className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4 xl:col-start-7">
        <span className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">Sort</span>
        <select
          value={filters.sort}
          onChange={(event) => updateFilter('sort', event.target.value as TransactionSort)}
          className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="most-tokens">Most tokens</option>
          <option value="highest-usd">Highest USD</option>
        </select>
      </label>
    </div>
  );
}
