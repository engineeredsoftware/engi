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
  selectedRunId: string | null;
  onSelectRun: (runId: string) => void;
  isLoadingRuns: boolean;
  runsError: string | null;
  mockMode: boolean;
}

export default function ApplicationTransactionsTable({
  runs,
  selectedRunId,
  onSelectRun,
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
      selectedTransactionId={selectedRunId}
      onSelectTransaction={onSelectRun}
      filters={filters}
      onFiltersChange={setFilters}
      statusOptions={options.statuses}
      repositoryOptions={options.repositories}
      isLoading={isLoadingRuns}
      error={runsError}
      mockMode={mockMode}
    />
  );
}
