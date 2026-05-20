'use client';

import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { TransactionDataMode } from '@/components/base/bitcode/execution/bitcode-transaction-types';
import TerminalTransactionWorkspace from '@/app/terminal/TerminalTransactionWorkspace';
import {
  mapExecutionHistoryRunToWorkspaceRun,
} from '@/app/terminal/terminal-activity-history';
import { TerminalShellBridgeProvider } from '@/app/terminal/terminal-shell-bridge';
import {
  readTerminalTransactionDetailSection,
  readTerminalTransactionFilters,
  readTerminalTransactionId,
  readTerminalTransactionPagination,
  resetTerminalTransactionFilters,
  writeTerminalTransactionDetailSection,
  writeTerminalTransactionFilters,
  writeTerminalTransactionId,
  writeTerminalTransactionPagination,
} from '@/app/terminal/terminal-transaction-query';
import { resolveTerminalTransactionSource } from '@/app/terminal/terminal-transaction-source';
import type { WorkspaceRun } from '@/app/terminal/terminal-run-data';
import { isAuxillariesMockMode } from '@/lib/mock-review-mode';
import { fetchPipelineExecutionHistory } from '@/networking/api-client';

export default function ExchangePageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeSearchParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);
  const mockMode = isAuxillariesMockMode();
  const selectedTransactionId = useMemo(
    () => readTerminalTransactionId(routeSearchParams),
    [routeSearchParams],
  );
  const selectedTransactionDetailSection = useMemo(
    () => readTerminalTransactionDetailSection(routeSearchParams),
    [routeSearchParams],
  );
  const transactionFilters = useMemo(
    () => readTerminalTransactionFilters(routeSearchParams),
    [routeSearchParams],
  );
  const transactionPagination = useMemo(
    () => readTerminalTransactionPagination(routeSearchParams),
    [routeSearchParams],
  );
  const [liveRuns, setLiveRuns] = useState<WorkspaceRun[]>([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(!mockMode);
  const [runsLoadError, setRunsLoadError] = useState<string | null>(null);

  const transactionSource = useMemo(
    () =>
      resolveTerminalTransactionSource({
        liveRuns,
        mockMode,
        selectedTransactionId,
      }),
    [liveRuns, mockMode, selectedTransactionId],
  );
  const runs = transactionSource.runs;
  const transactionDataMode: TransactionDataMode = transactionSource.dataMode;
  const runsError = transactionDataMode === 'review-fallback' ? null : runsLoadError;

  const replaceExchangeSearchParams = useCallback(
    (nextParams: URLSearchParams) => {
      if (typeof window !== 'undefined' && window.location.pathname !== pathname) return;
      const nextQuery = nextParams.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    },
    [pathname, router],
  );
  const readCurrentExchangeSearchParams = useCallback(
    () =>
      typeof window !== 'undefined' && window.location.pathname === pathname
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams(searchParams.toString()),
    [pathname, searchParams],
  );

  const replaceExchangeRoute = useCallback(
    (transactionId: string, detailSection = selectedTransactionDetailSection) => {
      const nextParams = writeTerminalTransactionDetailSection(
        writeTerminalTransactionId(readCurrentExchangeSearchParams(), transactionId),
        detailSection,
      );
      replaceExchangeSearchParams(nextParams);
    },
    [readCurrentExchangeSearchParams, replaceExchangeSearchParams, selectedTransactionDetailSection],
  );

  const refreshLiveRuns = useCallback(async () => {
    if (mockMode) {
      setLiveRuns([]);
      setIsLoadingRuns(false);
      setRunsLoadError(null);
      return [];
    }

    setIsLoadingRuns(true);
    setRunsLoadError(null);

    try {
      const history = await fetchPipelineExecutionHistory();
      const nextRuns = history.map(mapExecutionHistoryRunToWorkspaceRun);
      setLiveRuns(nextRuns);
      return nextRuns;
    } catch (error) {
      setLiveRuns([]);
      setRunsLoadError(error instanceof Error ? error.message : 'Unable to load Exchange activity.');
      return [];
    } finally {
      setIsLoadingRuns(false);
    }
  }, [mockMode]);

  useEffect(() => {
    void refreshLiveRuns();
  }, [refreshLiveRuns]);

  const selectedRun = useMemo(
    () => runs.find((run) => run.id === selectedTransactionId) || runs[0] || null,
    [runs, selectedTransactionId],
  );

  const handleTransactionFiltersChange = (nextFilters: typeof transactionFilters) => {
    const nextParams = writeTerminalTransactionPagination(
      writeTerminalTransactionFilters(readCurrentExchangeSearchParams(), nextFilters),
      { page: 1, pageSize: transactionPagination.pageSize },
    );
    replaceExchangeSearchParams(nextParams);
  };

  const handleTransactionFiltersReset = () => {
    const nextParams = writeTerminalTransactionPagination(
      resetTerminalTransactionFilters(readCurrentExchangeSearchParams()),
      { page: 1, pageSize: transactionPagination.pageSize },
    );
    replaceExchangeSearchParams(nextParams);
  };

  const handleTransactionPaginationChange = (nextPagination: typeof transactionPagination) => {
    replaceExchangeSearchParams(writeTerminalTransactionPagination(readCurrentExchangeSearchParams(), nextPagination));
  };

  const handleTransactionDetailSectionChange = (detailSection: typeof selectedTransactionDetailSection) => {
    replaceExchangeSearchParams(writeTerminalTransactionDetailSection(readCurrentExchangeSearchParams(), detailSection));
  };

  return (
    <TerminalShellBridgeProvider>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(73,203,146,0.14),transparent_28%),linear-gradient(180deg,#050915_0%,#02050d_100%)] px-4 pb-24 pt-32 text-neutral-100 tablet:px-6 desktop:px-8">
        <div className="mx-auto flex w-full max-w-none flex-col gap-6">
          <section className="overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-[linear-gradient(135deg,rgba(7,14,26,0.96),rgba(4,9,18,0.92))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-4xl">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-emerald-300/80">Bitcode Exchange</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-4xl">
                  Search activity, select a row, and read Exchange state
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-300 tablet:text-base">
                  The Exchange is the durable activity layer behind Terminal and connected interfaces. Use this
                  surface to inspect activity rows, AssetPack evidence, proofs, history, and execution detail without
                  entering Terminal write controls.
                </p>
              </div>
              <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-3">
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Primary read</p>
                  <p className="mt-2 text-neutral-200">activity ledger</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Selected detail</p>
                  <p className="mt-2 text-neutral-200">AssetPack + proofs</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Terminal relation</p>
                  <p className="mt-2 text-neutral-200">same state, read-only here</p>
                </div>
              </div>
            </div>
          </section>

          <TerminalTransactionWorkspace
            runs={runs}
            selectedRun={selectedRun}
            routeSearchParams={routeSearchParams}
            isLoadingRuns={isLoadingRuns}
            runsError={runsError}
            transactionDataMode={transactionDataMode}
            onSelectTransaction={replaceExchangeRoute}
            filters={transactionFilters}
            onFiltersChange={handleTransactionFiltersChange}
            onResetFilters={handleTransactionFiltersReset}
            pagination={transactionPagination}
            onPaginationChange={handleTransactionPaginationChange}
            detailSection={selectedTransactionDetailSection}
            onDetailSectionChange={handleTransactionDetailSectionChange}
            surface="exchange"
          />
        </div>
      </main>
    </TerminalShellBridgeProvider>
  );
}
