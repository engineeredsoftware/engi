'use client';

import React from 'react';

import BitcodeInlineExplainer from './BitcodeInlineExplainer';
import { BITCODE_TRANSACTION_FILTER_EXPLAINERS } from './bitcode-transaction-explainers';
import type { TransactionFilters, TransactionOwnership, TransactionSort } from './bitcode-transaction-types';

interface BitcodeTransactionsFilterBarProps {
  filters: TransactionFilters;
  onFiltersChange: (nextFilters: TransactionFilters) => void;
  onResetFilters?: () => void;
  statusOptions: string[];
  repositoryOptions: string[];
  participantOptions: string[];
  proofStatusOptions: string[];
}

export default function BitcodeTransactionsFilterBar({
  filters,
  onFiltersChange,
  onResetFilters,
  statusOptions,
  repositoryOptions,
  participantOptions,
  proofStatusOptions,
}: BitcodeTransactionsFilterBarProps) {
  const [searchValue, setSearchValue] = React.useState(filters.searchTerm);

  React.useEffect(() => {
    setSearchValue(filters.searchTerm);
  }, [filters.searchTerm]);

  const updateFilter = <K extends keyof TransactionFilters>(key: K, value: TransactionFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="mt-4 grid gap-2 xl:grid-cols-[minmax(0,1.4fr)_repeat(6,minmax(0,0.76fr))]">
      <label className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-2.5">
        <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">
          <span>Search transactions</span>
          <BitcodeInlineExplainer explainer={BITCODE_TRANSACTION_FILTER_EXPLAINERS.search} />
        </span>
        <input
          aria-label="Search transactions"
          value={searchValue}
          onChange={(event) => {
            const nextValue = event.target.value;
            setSearchValue(nextValue);
            updateFilter('searchTerm', nextValue);
          }}
          placeholder="Search ids, repos, branches, proof posture, participants…"
          className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-2 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
        />
      </label>

      <label className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-2.5">
        <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">
          <span>Status</span>
          <BitcodeInlineExplainer explainer={BITCODE_TRANSACTION_FILTER_EXPLAINERS.status} />
        </span>
        <select
          aria-label="Status"
          value={filters.status}
          onChange={(event) => updateFilter('status', event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="all">All statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-2.5">
        <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">
          <span>Ownership</span>
          <BitcodeInlineExplainer explainer={BITCODE_TRANSACTION_FILTER_EXPLAINERS.ownership} />
        </span>
        <select
          aria-label="Ownership"
          value={filters.ownership}
          onChange={(event) => updateFilter('ownership', event.target.value as TransactionOwnership)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="all">All participants</option>
          <option value="mine">My transactions</option>
          <option value="network">Exchange transactions</option>
        </select>
      </label>

      <label className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-2.5">
        <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">
          <span>Action lens</span>
          <BitcodeInlineExplainer explainer={BITCODE_TRANSACTION_FILTER_EXPLAINERS.transactionLens} />
        </span>
        <select
          aria-label="Action lens"
          value={filters.transactionLens}
          onChange={(event) => updateFilter('transactionLens', event.target.value as TransactionFilters['transactionLens'])}
          className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="all">All lenses</option>
          <option value="deposit">Deposit</option>
          <option value="read">Read</option>
          <option value="closure">Closure</option>
        </select>
      </label>

      <label className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-2.5">
        <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">
          <span>Repository</span>
          <BitcodeInlineExplainer explainer={BITCODE_TRANSACTION_FILTER_EXPLAINERS.repository} />
        </span>
        <select
          aria-label="Repository"
          value={filters.repository}
          onChange={(event) => updateFilter('repository', event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="all">All repositories</option>
          {repositoryOptions.map((repository) => (
            <option key={repository} value={repository}>
              {repository}
            </option>
          ))}
        </select>
      </label>

      <label className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-2.5">
        <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">
          <span>Participant</span>
          <BitcodeInlineExplainer explainer={BITCODE_TRANSACTION_FILTER_EXPLAINERS.participant} />
        </span>
        <select
          aria-label="Participant"
          value={filters.participant}
          onChange={(event) => updateFilter('participant', event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="all">All participants</option>
          {participantOptions.map((participant) => (
            <option key={participant} value={participant}>
              {participant}
            </option>
          ))}
        </select>
      </label>

      <label className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-2.5">
        <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">
          <span>Proof posture</span>
          <BitcodeInlineExplainer explainer={BITCODE_TRANSACTION_FILTER_EXPLAINERS.proofStatus} />
        </span>
        <select
          aria-label="Proof posture"
          value={filters.proofStatus}
          onChange={(event) => updateFilter('proofStatus', event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="all">All proof states</option>
          {proofStatusOptions.map((proofStatus) => (
            <option key={proofStatus} value={proofStatus}>
              {proofStatus}
            </option>
          ))}
        </select>
      </label>

      <label className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-2.5 xl:col-start-7">
        <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">
          <span>Sort</span>
          <BitcodeInlineExplainer explainer={BITCODE_TRANSACTION_FILTER_EXPLAINERS.sort} />
        </span>
        <select
          aria-label="Sort"
          value={filters.sort}
          onChange={(event) => updateFilter('sort', event.target.value as TransactionSort)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400/40"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="most-tokens">Most tokens</option>
          <option value="highest-btc-fee-basis">Highest BTC Fee Basis</option>
        </select>
      </label>

      {onResetFilters ? (
        <div className="xl:col-span-full">
          <button
            type="button"
            onClick={onResetFilters}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.64rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
          >
            Reset transaction filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
