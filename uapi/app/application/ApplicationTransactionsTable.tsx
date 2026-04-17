'use client';

import { useMemo, useState } from 'react';

import BitcodeTransactionsTable from '@/components/base/engi/execution/BitcodeTransactionsTable';

import {
  buildApplicationTransactionFilterOptions,
  buildApplicationTransactionFilters,
  filterApplicationTransactions,
  normalizeApplicationTransactions,
} from './application-transactions';
import type { WorkspaceRun } from './application-run-data';

interface ApplicationTransactionsTableProps {
  runs: WorkspaceRun[];
  selectedTransactionId: string | null;
  onSelectTransaction: (transactionId: string) => void;
  isLoadingRuns: boolean;
  runsError: string | null;
  mockMode: boolean;
}

export default function ApplicationTransactionsTable({
  runs,
  selectedTransactionId,
  onSelectTransaction,
  isLoadingRuns,
  runsError,
  mockMode,
}: ApplicationTransactionsTableProps) {
  const [filters, setFilters] = useState(buildApplicationTransactionFilters);
  const records = useMemo(() => normalizeApplicationTransactions(runs), [runs]);
  const options = useMemo(() => buildApplicationTransactionFilterOptions(records), [records]);
  const filteredRecords = useMemo(() => filterApplicationTransactions(records, filters), [filters, records]);

  return (
    <BitcodeTransactionsTable
      records={filteredRecords}
      selectedTransactionId={selectedTransactionId}
      onSelectTransaction={onSelectTransaction}
      filters={filters}
      onFiltersChange={setFilters}
      statusOptions={options.statuses}
      repositoryOptions={options.repositories}
      participantOptions={options.participants}
      proofStatusOptions={options.proofStatuses}
      isLoading={isLoadingRuns}
      error={runsError}
      mockMode={mockMode}
    />
  );
}
