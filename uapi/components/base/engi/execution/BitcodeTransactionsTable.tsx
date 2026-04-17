'use client';

import BitcodeTransactionsDataTable from './BitcodeTransactionsDataTable';
import BitcodeTransactionsFilterBar from './BitcodeTransactionsFilterBar';
import BitcodeTransactionsOverview from './BitcodeTransactionsOverview';
import type { TransactionFilters, TransactionRecord } from './bitcode-transaction-types';

interface BitcodeTransactionsTableProps {
  records: TransactionRecord[];
  selectedTransactionId: string | null;
  onSelectTransaction: (transactionId: string) => void;
  filters: TransactionFilters;
  onFiltersChange: (nextFilters: TransactionFilters) => void;
  statusOptions: string[];
  repositoryOptions: string[];
  participantOptions: string[];
  proofStatusOptions: string[];
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
  participantOptions,
  proofStatusOptions,
  isLoading,
  error,
  mockMode,
}: BitcodeTransactionsTableProps) {
  const ownTransactionCount = records.filter((record) => record.isOwnTransaction).length;
  const visibleTokenTotal = records.reduce((total, record) => total + (record.tokenTotal ?? 0), 0);

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

        <BitcodeTransactionsOverview
          recordCount={records.length}
          ownTransactionCount={ownTransactionCount}
          visibleTokenTotal={visibleTokenTotal}
          selectedTransactionId={selectedTransactionId}
          mockMode={mockMode}
        />
      </div>

      <BitcodeTransactionsFilterBar
        filters={filters}
        onFiltersChange={onFiltersChange}
        statusOptions={statusOptions}
        repositoryOptions={repositoryOptions}
        participantOptions={participantOptions}
        proofStatusOptions={proofStatusOptions}
      />

      <BitcodeTransactionsDataTable
        records={records}
        selectedTransactionId={selectedTransactionId}
        onSelectTransaction={onSelectTransaction}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
