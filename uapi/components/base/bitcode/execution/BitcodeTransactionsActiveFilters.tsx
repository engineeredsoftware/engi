'use client';

import React from 'react';

import {
  buildBitcodeTransactionActiveFilterChips,
  clearBitcodeTransactionFilter,
} from './bitcode-transaction-active-filters';
import type { TransactionFilters } from './bitcode-transaction-types';

interface BitcodeTransactionsActiveFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (nextFilters: TransactionFilters) => void;
  onResetFilters?: () => void;
}

export default function BitcodeTransactionsActiveFilters({
  filters,
  onFiltersChange,
  onResetFilters,
}: BitcodeTransactionsActiveFiltersProps) {
  const activeChips = buildBitcodeTransactionActiveFilterChips(filters);

  if (!activeChips.length) return null;

  return (
    <div className="mt-4 rounded-[1.25rem] border border-white/8 bg-white/5 px-4 py-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-neutral-500">Active filter posture</p>
          <p className="mt-2 text-sm text-neutral-200">
            {activeChips.length} active {activeChips.length === 1 ? 'filter' : 'filters'} shaping the Bitcode activity window.
          </p>
        </div>

        {onResetFilters ? (
          <button
            type="button"
            onClick={onResetFilters}
            className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
          >
            Clear all filters
          </button>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {activeChips.map((chip) => (
          <button
            key={`${chip.key}-${chip.value}`}
            type="button"
            onClick={() => onFiltersChange(clearBitcodeTransactionFilter(filters, chip.key))}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-left text-[0.68rem] uppercase tracking-[0.16em] text-neutral-100 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
          >
            {chip.label}: {chip.value} ×
          </button>
        ))}
      </div>
    </div>
  );
}
