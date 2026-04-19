'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { mountBitcodeApplicationShell } from '@bitcode/bitcode/src/client-entry.js';
import type { TransactionDataMode } from '@/components/base/engi/execution/bitcode-transaction-types';
import ConversationsOverlay from '@/app/conversations/components/ConversationsOverlay';
import { fetchPipelineExecutionHistory } from '@/networking/api-client';
import { isUserOrbitalMockMode } from '@/lib/mock-review-mode';

import ApplicationCommandDeck from './ApplicationCommandDeck';
import ApplicationClosureControlDeck from './ApplicationClosureControlDeck';
import ApplicationClosureNativeSections from './ApplicationClosureNativeSections';
import ApplicationCoreNativeSections from './ApplicationCoreNativeSections';
import ApplicationDepositComposer from './ApplicationDepositComposer';
import ApplicationExperienceFrame from './ApplicationExperienceFrame';
import ApplicationExternalInterfacingPanel from './ApplicationExternalInterfacingPanel';
import ApplicationGiveNeedWorkbench from './ApplicationGiveNeedWorkbench';
import ApplicationLiveSummaryStrip from './ApplicationLiveSummaryStrip';
import ApplicationNeedScenarioPanel from './ApplicationNeedScenarioPanel';
import ApplicationPreservedShellSurface from './ApplicationPreservedShellSurface';
import ApplicationRepositoryContextPanel from './ApplicationRepositoryContextPanel';
import ApplicationSectionAtlas from './ApplicationSectionAtlas';
import ApplicationSurfaceSection from './ApplicationSurfaceSection';
import ApplicationSupplySelectionPanel from './ApplicationSupplySelectionPanel';
import ApplicationTransactionWorkspace from './ApplicationTransactionWorkspace';
import ApplicationWorkspaceRail from './ApplicationWorkspaceRail';
import { APPLICATION_WORKSPACE_COPY } from './application-workspace-copy';
import { ApplicationShellBridgeProvider } from './application-shell-bridge';
import type { ApplicationRepositoryContextState } from './application-repository-context';
import {
  readApplicationTransactionDetailSection,
  readApplicationTransactionFilters,
  readApplicationTransactionId,
  readApplicationTransactionPagination,
  writeApplicationTransactionDetailSection,
  resetApplicationTransactionFilters,
  writeApplicationTransactionFilters,
  writeApplicationTransactionId,
  writeApplicationTransactionPagination,
} from './application-transaction-query';
import { resolveApplicationTransactionSource } from './application-transaction-source';
import type { WorkspaceRun } from './application-run-data';

const FIRST_GATE_STYLESHEET_ID = 'bitcode-first-gate-stylesheet';
const FIRST_GATE_STYLESHEET_HREF = '/application/first-gate-styles';

function deriveClosureFocus(type?: string | null) {
  if (!type) return 'application closure';
  if (type.includes('deliverable')) return 'branch artifacts + deliverables';
  if (type.includes('measure')) return 'fit verification + measurement';
  if (type.includes('proof')) return 'proof-family refresh';
  return 'transaction detail + consequence reading';
}

function deriveProofStatus(type?: string | null, status?: string | null) {
  if (status === 'completed') {
    if (type?.includes('proof')) return 'proof witness ready';
    if (type?.includes('measure')) return 'verification witness ready';
    return 'closure bundle ready';
  }
  if (status === 'error' || status === 'failed') return 'proof posture failed closed';
  if (type?.includes('proof')) return 'proof witness in flight';
  return 'closure state in flight';
}

function deriveTransactionLens(type?: string | null): 'give' | 'need' | 'closure' {
  if (type?.includes('deliverable')) return 'give';
  if (type?.includes('measure')) return 'need';
  return 'closure';
}

export default function ApplicationPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mockMode = isUserOrbitalMockMode();
  const selectedTransactionId = useMemo(() => readApplicationTransactionId(searchParams), [searchParams]);
  const selectedTransactionDetailSection = useMemo(
    () => readApplicationTransactionDetailSection(searchParams),
    [searchParams],
  );
  const transactionFilters = useMemo(() => readApplicationTransactionFilters(searchParams), [searchParams]);
  const transactionPagination = useMemo(() => readApplicationTransactionPagination(searchParams), [searchParams]);
  const [isConversationOverlayOpen, setIsConversationOverlayOpen] = useState(false);
  const [liveRuns, setLiveRuns] = useState<WorkspaceRun[]>([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(!mockMode);
  const [runsLoadError, setRunsLoadError] = useState<string | null>(null);
  const [repositoryContext, setRepositoryContext] = useState<ApplicationRepositoryContextState | null>(null);

  const transactionSource = useMemo(
    () =>
      resolveApplicationTransactionSource({
        liveRuns,
        mockMode,
        selectedTransactionId,
      }),
    [liveRuns, mockMode, selectedTransactionId],
  );
  const runs = transactionSource.runs;
  const transactionDataMode: TransactionDataMode = transactionSource.dataMode;
  const runsError = transactionDataMode === 'review-fallback' ? null : runsLoadError;

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    let stylesheet = document.getElementById(FIRST_GATE_STYLESHEET_ID) as HTMLLinkElement | null;
    if (!stylesheet) {
      stylesheet = document.createElement('link');
      stylesheet.id = FIRST_GATE_STYLESHEET_ID;
      stylesheet.rel = 'stylesheet';
      stylesheet.href = FIRST_GATE_STYLESHEET_HREF;
      document.head.appendChild(stylesheet);
    }

    void mountBitcodeApplicationShell()
      .then((dispose) => {
        if (disposed) {
          dispose?.();
          return;
        }
        cleanup = dispose;
      })
      .catch((error) => {
        console.error('Failed to mount Bitcode application shell', error);
      });

    return () => {
      disposed = true;
      cleanup?.();
      stylesheet?.remove();
    };
  }, []);

  useEffect(() => {
    let disposed = false;

    if (mockMode) {
      setLiveRuns([]);
      setIsLoadingRuns(false);
      setRunsLoadError(null);
      return () => {
        disposed = true;
      };
    }

    setIsLoadingRuns(true);
    setRunsLoadError(null);

    fetchPipelineExecutionHistory()
      .then((history) => {
        if (disposed) return;
        setLiveRuns(
          history.map((run) => ({
            id: run.id,
            created_at: run.created_at,
            status: run.status,
            type: run.type,
            summary: run.summary || run.final_work_summary?.summary || run.final_work_summary?.deliverables?.summary || null,
            repository:
              run.repo_snapshot || run.final_work_summary?.repoSnapshot
                ? `${(run.repo_snapshot || run.final_work_summary?.repoSnapshot)?.org}/${(run.repo_snapshot || run.final_work_summary?.repoSnapshot)?.repo}`
                : null,
            branch: (run.repo_snapshot || run.final_work_summary?.repoSnapshot)?.branch || null,
            participant:
              (run.repo_snapshot || run.final_work_summary?.repoSnapshot)?.org || 'connected account',
            isOwnTransaction: true,
            transactionLens: deriveTransactionLens(run.type),
            itemCount: run.items?.length || 0,
            tokenTotal:
              run.processing_stats?.tokens?.total ?? run.final_work_summary?.processingStats?.tokens?.total ?? null,
            creditsTotal: run.processing_stats?.credits ?? run.final_work_summary?.processingStats?.credits ?? null,
            usdTotal: run.processing_stats?.usdTotal ?? run.final_work_summary?.processingStats?.usdTotal ?? null,
            averageLatencyMs:
              run.processing_stats?.averageLatencyMs ?? run.final_work_summary?.processingStats?.averageLatencyMs ?? null,
            proofStatus: deriveProofStatus(run.type, run.status),
            closureFocus: deriveClosureFocus(run.type),
          })),
        );
      })
      .catch((error) => {
        if (disposed) return;
        setLiveRuns([]);
        setRunsLoadError(error instanceof Error ? error.message : 'Unable to load recent runs.');
      })
      .finally(() => {
        if (!disposed) setIsLoadingRuns(false);
      });

    return () => {
      disposed = true;
    };
  }, [mockMode]);

  useEffect(() => {
    if (!runs.length) return;
    if (selectedTransactionId && runs.some((run) => run.id === selectedTransactionId)) return;
    const nextParams = writeApplicationTransactionId(searchParams, runs[0].id);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  }, [pathname, router, runs, searchParams, selectedTransactionId]);

  const selectedRun = useMemo(
    () => runs.find((run) => run.id === selectedTransactionId) || runs[0] || null,
    [runs, selectedTransactionId],
  );

  const handleSelectTransaction = (transactionId: string) => {
    const nextParams = writeApplicationTransactionId(searchParams, transactionId);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const handleTransactionFiltersChange = (nextFilters: typeof transactionFilters) => {
    const nextParams = writeApplicationTransactionPagination(
      writeApplicationTransactionFilters(searchParams, nextFilters),
      { page: 1, pageSize: transactionPagination.pageSize },
    );
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const handleTransactionFiltersReset = () => {
    const nextParams = writeApplicationTransactionPagination(
      resetApplicationTransactionFilters(searchParams),
      { page: 1, pageSize: transactionPagination.pageSize },
    );
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const handleTransactionPaginationChange = (nextPagination: typeof transactionPagination) => {
    const nextParams = writeApplicationTransactionPagination(searchParams, nextPagination);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const handleTransactionDetailSectionChange = (detailSection: typeof selectedTransactionDetailSection) => {
    const nextParams = writeApplicationTransactionDetailSection(searchParams, detailSection);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  return (
    <>
      <ConversationsOverlay
        forceOpen={isConversationOverlayOpen}
        forceFullscreen={isConversationOverlayOpen}
        onCloseRequest={() => setIsConversationOverlayOpen(false)}
        showFloatingOrb={false}
      />
      <ApplicationShellBridgeProvider>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(73,203,146,0.16),transparent_26%),linear-gradient(180deg,#050915_0%,#02050d_100%)] text-neutral-100">
          <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-6 px-4 pb-24 pt-10 tablet:px-6 desktop:px-8">
          <section className="overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-[linear-gradient(135deg,rgba(7,14,26,0.96),rgba(4,9,18,0.92))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-4xl">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-emerald-300/80">Bitcode transactions</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-4xl">
                  Read transactions, then move deeper only when you need to
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-300 tablet:text-base">
                  Search and filter Bitcode transactions in one ledger window, open the selected
                  transaction into deliverables, proofs, and history, and move into conversations
                  or Auxillaries without losing your place.
                </p>
              </div>
              <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-3">
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Primary experience</p>
                  <p className="mt-2 text-neutral-200">transactions master detail</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Deeper modes</p>
                  <p className="mt-2 text-neutral-200">conversations + Auxillaries</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Primary actions</p>
                  <p className="mt-2 text-neutral-200">give + need flows</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_24rem] 2xl:items-start">
            <div className="min-w-0">
              <ApplicationTransactionWorkspace
                runs={runs}
                selectedRun={selectedRun}
                isLoadingRuns={isLoadingRuns}
                runsError={runsError}
                transactionDataMode={transactionDataMode}
                onSelectTransaction={handleSelectTransaction}
                filters={transactionFilters}
                onFiltersChange={handleTransactionFiltersChange}
                onResetFilters={handleTransactionFiltersReset}
                pagination={transactionPagination}
                onPaginationChange={handleTransactionPaginationChange}
                detailSection={selectedTransactionDetailSection}
                onDetailSectionChange={handleTransactionDetailSectionChange}
              />
            </div>
            <aside className="min-w-0">
              <ApplicationWorkspaceRail
                onOpenConversations={() => setIsConversationOverlayOpen(true)}
                runs={runs}
                isLoadingRuns={isLoadingRuns}
                runsError={runsError}
                selectedRun={selectedRun}
                transactionDataMode={transactionDataMode}
              />
            </aside>
          </div>

          <div className="grid gap-6">
            <div className="min-w-0">
              <ApplicationSurfaceSection
                id="applicationFrameSurface"
                kicker={APPLICATION_WORKSPACE_COPY.frame.kicker}
                title={APPLICATION_WORKSPACE_COPY.frame.title}
                summary={APPLICATION_WORKSPACE_COPY.frame.summary}
              >
                <ApplicationExperienceFrame onOpenConversations={() => setIsConversationOverlayOpen(true)} />
                <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
                  <div className="space-y-6">
                    <ApplicationCommandDeck />
                    <ApplicationLiveSummaryStrip />
                  </div>
                  <div className="space-y-6">
                    <ApplicationExternalInterfacingPanel />
                    <ApplicationSectionAtlas />
                  </div>
                </div>
              </ApplicationSurfaceSection>

              <ApplicationSurfaceSection
                id="applicationSupplySurface"
                kicker={APPLICATION_WORKSPACE_COPY.supply.kicker}
                title={APPLICATION_WORKSPACE_COPY.supply.title}
                summary={APPLICATION_WORKSPACE_COPY.supply.summary}
                tone="emerald"
              >
                <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
                  <div className="space-y-6">
                    <ApplicationRepositoryContextPanel
                      preferredRepository={selectedRun?.repository || null}
                      onContextChange={setRepositoryContext}
                    />
                    <ApplicationSupplySelectionPanel />
                    <ApplicationDepositComposer />
                  </div>
                  <div className="space-y-6">
                    <ApplicationNeedScenarioPanel />
                    <ApplicationGiveNeedWorkbench repositoryContext={repositoryContext} />
                    <ApplicationCoreNativeSections repositoryContext={repositoryContext} />
                  </div>
                </div>
              </ApplicationSurfaceSection>

              <ApplicationSurfaceSection
                id="applicationClosureSurface"
                kicker={APPLICATION_WORKSPACE_COPY.closure.kicker}
                title={APPLICATION_WORKSPACE_COPY.closure.title}
                summary={APPLICATION_WORKSPACE_COPY.closure.summary}
              >
                <ApplicationClosureControlDeck />
                <ApplicationClosureNativeSections />
                <ApplicationPreservedShellSurface />
              </ApplicationSurfaceSection>
            </div>
          </div>
          </div>
        </div>
      </ApplicationShellBridgeProvider>
    </>
  );
}
