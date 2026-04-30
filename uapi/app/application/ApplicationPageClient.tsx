'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { readBitcodeApplicationShellSnapshot } from '@bitcode/protocol-demonstration/src/client-entry.js';
import type { TransactionDataMode } from '@/components/base/bitcode/execution/bitcode-transaction-types';
import { useAuth } from '@/components/base/bitcode/auth/AuthProvider';
import ConversationsOverlay from '@/app/conversations/components/ConversationsOverlay';
import { useUserData } from '@/hooks/useUserData';
import { fetchPipelineExecutionHistory } from '@/networking/api-client';
import { isUserOrbitalMockMode } from '@/lib/mock-review-mode';
import type { PipelineExecution } from '@/types/api';

import ApplicationCommandDeck from './ApplicationCommandDeck';
import ApplicationClosureControlDeck from './ApplicationClosureControlDeck';
import ApplicationClosureNativeSections from './ApplicationClosureNativeSections';
import ApplicationCoreNativeSections from './ApplicationCoreNativeSections';
import ApplicationDepositComposer from './ApplicationDepositComposer';
import ApplicationExperienceFrame from './ApplicationExperienceFrame';
import ApplicationExternalInterfacingPanel from './ApplicationExternalInterfacingPanel';
import ApplicationFloatingDebugWidget from './ApplicationFloatingDebugWidget';
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
import {
  buildApplicationExecutionHistoryRequest,
  mapExecutionHistoryRunToWorkspaceRun,
  readApplicationRouteError,
  type ApplicationActivityRecordDraft,
  upsertWorkspaceRun,
} from './application-activity-history';
import { APPLICATION_SURFACE_COPY } from './application-workspace-copy';
import { ApplicationShellBridgeProvider } from './application-shell-bridge';
import type { ApplicationRepositoryContextState } from './application-repository-context';
import {
  readApplicationDebugEnabled,
  readApplicationEnvironmentMode,
  readApplicationTransactionDetailSection,
  readApplicationTransactionFilters,
  readApplicationTransactionId,
  readApplicationTransactionPagination,
  writeApplicationTransactionDetailSection,
  writeApplicationDebugEnabled,
  writeApplicationEnvironmentMode,
  resetApplicationTransactionFilters,
  writeApplicationTransactionFilters,
  writeApplicationTransactionId,
  writeApplicationTransactionPagination,
} from './application-transaction-query';
import { deriveApplicationTransactionReadiness } from './application-transaction-readiness-source';
import { resolveApplicationTransactionSource } from './application-transaction-source';
import type { WorkspaceRun } from './application-run-data';
import { buildProtocolProjectedWorkspaceRun } from './application-protocol-projection';

export default function ApplicationPageClient() {
  const { user } = useAuth();
  const {
    hasGitHubConnection,
    hasValidGitHubConnection = hasGitHubConnection,
    hasWalletConnection,
    hasStoredVerifiedWalletConnection = false,
    hasVerifiedWalletConnection,
    repositoryConnectionStatus,
  } = useUserData();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeSearchParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);
  const mockMode = isUserOrbitalMockMode();
  const selectedTransactionId = useMemo(
    () => readApplicationTransactionId(routeSearchParams),
    [routeSearchParams],
  );
  const selectedTransactionDetailSection = useMemo(
    () => readApplicationTransactionDetailSection(routeSearchParams),
    [routeSearchParams],
  );
  const transactionFilters = useMemo(
    () => readApplicationTransactionFilters(routeSearchParams),
    [routeSearchParams],
  );
  const transactionPagination = useMemo(
    () => readApplicationTransactionPagination(routeSearchParams),
    [routeSearchParams],
  );
  const environmentMode = useMemo(
    () => readApplicationEnvironmentMode(routeSearchParams),
    [routeSearchParams],
  );
  const debugEnabled = useMemo(
    () => readApplicationDebugEnabled(routeSearchParams),
    [routeSearchParams],
  );
  const [isConversationOverlayOpen, setIsConversationOverlayOpen] = useState(false);
  const [liveRuns, setLiveRuns] = useState<WorkspaceRun[]>([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(!mockMode);
  const [runsLoadError, setRunsLoadError] = useState<string | null>(null);
  const [repositoryContext, setRepositoryContext] = useState<ApplicationRepositoryContextState | null>(null);
  const [projectedProtocolRun, setProjectedProtocolRun] = useState<WorkspaceRun | null>(null);

  const transactionSource = useMemo(
    () =>
      resolveApplicationTransactionSource({
        liveRuns,
        mockMode,
        selectedTransactionId,
        projectedRun: projectedProtocolRun,
      }),
    [liveRuns, mockMode, projectedProtocolRun, selectedTransactionId],
  );
  const runs = transactionSource.runs;
  const transactionDataMode: TransactionDataMode = transactionSource.dataMode;
  const runsError = transactionDataMode === 'review-fallback' ? null : runsLoadError;
  const transactionReadiness = useMemo(
    () =>
      deriveApplicationTransactionReadiness({
        signedIn: Boolean(user),
        repositoryContext,
        repositoryConnectionStatus,
        hasRepositoryProviderAttachment: hasGitHubConnection,
        hasValidRepositoryProviderAttachment: hasValidGitHubConnection,
        hasWalletBinding: hasWalletConnection,
        hasVerifiedWalletBinding: hasVerifiedWalletConnection,
        hasStoredVerifiedWalletBinding: hasStoredVerifiedWalletConnection,
      }).readiness,
    [
      hasGitHubConnection,
      hasValidGitHubConnection,
      hasStoredVerifiedWalletConnection,
      hasVerifiedWalletConnection,
      hasWalletConnection,
      repositoryContext,
      repositoryConnectionStatus,
      user,
    ],
  );
  const replaceApplicationSearchParams = useCallback(
    (nextParams: URLSearchParams) => {
      const nextQuery = nextParams.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    },
    [pathname, router],
  );
  const replaceApplicationRoute = useCallback(
    (transactionId: string, detailSection = selectedTransactionDetailSection) => {
      const nextParams = writeApplicationTransactionDetailSection(
        writeApplicationTransactionId(routeSearchParams, transactionId),
        detailSection,
      );
      replaceApplicationSearchParams(nextParams);
    },
    [replaceApplicationSearchParams, routeSearchParams, selectedTransactionDetailSection],
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
      setRunsLoadError(error instanceof Error ? error.message : 'Unable to load recent runs.');
      return [];
    } finally {
      setIsLoadingRuns(false);
    }
  }, [mockMode]);

  useEffect(() => {
    void refreshLiveRuns();
  }, [refreshLiveRuns]);

  useEffect(() => {
    let disposed = false;

    if (mockMode) {
      setProjectedProtocolRun(null);
      return () => {
        disposed = true;
      };
    }

    const refreshProjectedRun = async () => {
      try {
        const snapshot = await readBitcodeApplicationShellSnapshot();
        if (disposed) return;
        setProjectedProtocolRun(buildProtocolProjectedWorkspaceRun(snapshot, repositoryContext));
      } catch {
        if (!disposed) {
          setProjectedProtocolRun(null);
        }
      }
    };

    void refreshProjectedRun();
    const intervalId = window.setInterval(() => {
      void refreshProjectedRun();
    }, 1200);

    return () => {
      disposed = true;
      window.clearInterval(intervalId);
    };
  }, [mockMode, repositoryContext]);

  useEffect(() => {
    if (!runs.length) return;
    if (selectedTransactionId && runs.some((run) => run.id === selectedTransactionId)) return;
    const nextParams = writeApplicationTransactionId(routeSearchParams, runs[0].id);
    replaceApplicationSearchParams(nextParams);
  }, [replaceApplicationSearchParams, routeSearchParams, runs, selectedTransactionId]);

  const selectedRun = useMemo(
    () => runs.find((run) => run.id === selectedTransactionId) || runs[0] || null,
    [runs, selectedTransactionId],
  );

  const handleSelectTransaction = (transactionId: string) => {
    replaceApplicationRoute(transactionId);
  };

  const handleRecordActivity = useCallback(
    async (draft: ApplicationActivityRecordDraft) => {
      if (mockMode) return null;

      const response = await fetch('/api/executions/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          buildApplicationExecutionHistoryRequest(draft, {
            repositoryContext,
            fallbackRun: selectedRun,
          }),
        ),
      });

      if (!response.ok) {
        throw new Error(
          await readApplicationRouteError(response, 'Unable to record Bitcode activity into the ledger.'),
        );
      }

      const payload = (await response.json()) as { execution?: PipelineExecution };
      if (!payload.execution) {
        throw new Error('Bitcode activity response did not include an execution row.');
      }

      const nextRun = mapExecutionHistoryRunToWorkspaceRun(payload.execution);
      setLiveRuns((currentRuns) => upsertWorkspaceRun(currentRuns, nextRun));
      replaceApplicationRoute(nextRun.id, draft.detailSection || 'activity');
      void refreshLiveRuns();
      return nextRun;
    },
    [mockMode, refreshLiveRuns, replaceApplicationRoute, repositoryContext, selectedRun],
  );

  const handleTransactionFiltersChange = (nextFilters: typeof transactionFilters) => {
    const nextParams = writeApplicationTransactionPagination(
      writeApplicationTransactionFilters(routeSearchParams, nextFilters),
      { page: 1, pageSize: transactionPagination.pageSize },
    );
    replaceApplicationSearchParams(nextParams);
  };

  const handleTransactionFiltersReset = () => {
    const nextParams = writeApplicationTransactionPagination(
      resetApplicationTransactionFilters(routeSearchParams),
      { page: 1, pageSize: transactionPagination.pageSize },
    );
    replaceApplicationSearchParams(nextParams);
  };

  const handleTransactionPaginationChange = (nextPagination: typeof transactionPagination) => {
    const nextParams = writeApplicationTransactionPagination(routeSearchParams, nextPagination);
    replaceApplicationSearchParams(nextParams);
  };

  const handleTransactionDetailSectionChange = (detailSection: typeof selectedTransactionDetailSection) => {
    const nextParams = writeApplicationTransactionDetailSection(routeSearchParams, detailSection);
    replaceApplicationSearchParams(nextParams);
  };

  const handleEnvironmentModeChange = useCallback(
    (nextEnvironmentMode: ReturnType<typeof readApplicationEnvironmentMode>) => {
      replaceApplicationSearchParams(writeApplicationEnvironmentMode(routeSearchParams, nextEnvironmentMode));
    },
    [replaceApplicationSearchParams, routeSearchParams],
  );

  const handleDebugEnabledChange = useCallback(
    (enabled: boolean) => {
      replaceApplicationSearchParams(writeApplicationDebugEnabled(routeSearchParams, enabled));
    },
    [replaceApplicationSearchParams, routeSearchParams],
  );

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
          <div className="mx-auto flex w-full max-w-none flex-col gap-6 px-4 pb-24 pt-10 tablet:px-6 desktop:px-8">
          <section className="overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-[linear-gradient(135deg,rgba(7,14,26,0.96),rgba(4,9,18,0.92))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-4xl">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-emerald-300/80">Bitcode Terminal</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-4xl">
                  Read agentic executions, then move deeper only when you need to
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-300 tablet:text-base">
                  The Bitcode Terminal keeps AssetPack execution, need measurement,
                  proof refresh, and closure reading in one ledger window. Open the selected
                  activity into asset packs, proofs, and history, then move into conversations
                  or Auxillaries without losing your place.
                </p>
              </div>
              <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-3">
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Primary experience</p>
                  <p className="mt-2 text-neutral-200">Bitcode Terminal ledger</p>
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

          <div className="grid gap-6">
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
                onRecordActivity={handleRecordActivity}
              />
            </div>
            <aside className="min-w-0" aria-label="Terminal support controls">
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
                kicker={APPLICATION_SURFACE_COPY.frame.kicker}
                title={APPLICATION_SURFACE_COPY.frame.title}
                summary={APPLICATION_SURFACE_COPY.frame.summary}
              >
                <ApplicationExperienceFrame onOpenConversations={() => setIsConversationOverlayOpen(true)} />
                <div className="grid gap-6">
                  <div className="space-y-6">
                    <ApplicationCommandDeck
                      onRecordActivity={handleRecordActivity}
                      repositoryAnchor={repositoryContext?.selectedRepository?.fullName || null}
                      repositoryProvider={repositoryContext?.provider || null}
                      transactionReadiness={transactionReadiness}
                    />
                    <ApplicationLiveSummaryStrip
                      transactionReadiness={transactionReadiness}
                      repositoryContext={repositoryContext}
                    />
                  </div>
                  <div className="space-y-6">
                    <ApplicationExternalInterfacingPanel
                      environmentMode={environmentMode}
                      onRecordActivity={handleRecordActivity}
                    />
                    <ApplicationSectionAtlas />
                  </div>
                </div>
              </ApplicationSurfaceSection>

              <ApplicationSurfaceSection
                id="applicationSupplySurface"
                kicker={APPLICATION_SURFACE_COPY.supply.kicker}
                title={APPLICATION_SURFACE_COPY.supply.title}
                summary={APPLICATION_SURFACE_COPY.supply.summary}
                tone="emerald"
              >
                <div className="grid gap-6">
                  <div className="space-y-6">
                    <ApplicationRepositoryContextPanel
                      preferredRepository={selectedRun?.repository || null}
                      onContextChange={setRepositoryContext}
                      onRecordActivity={handleRecordActivity}
                    />
                    <ApplicationSupplySelectionPanel onRecordActivity={handleRecordActivity} />
                    <ApplicationDepositComposer
                      onRecordActivity={handleRecordActivity}
                      repositoryAnchor={repositoryContext?.selectedRepository?.fullName || null}
                      repositoryProvider={repositoryContext?.provider || null}
                      transactionReadiness={transactionReadiness}
                    />
                  </div>
                  <div className="space-y-6">
                    <ApplicationNeedScenarioPanel onRecordActivity={handleRecordActivity} />
                    <ApplicationGiveNeedWorkbench
                      repositoryContext={repositoryContext}
                      onRecordActivity={handleRecordActivity}
                    />
                    <ApplicationCoreNativeSections repositoryContext={repositoryContext} />
                  </div>
                </div>
              </ApplicationSurfaceSection>

              <ApplicationSurfaceSection
                id="applicationClosureSurface"
                kicker={APPLICATION_SURFACE_COPY.closure.kicker}
                title={APPLICATION_SURFACE_COPY.closure.title}
                summary={APPLICATION_SURFACE_COPY.closure.summary}
              >
                <ApplicationClosureControlDeck
                  onRecordActivity={handleRecordActivity}
                  transactionReadiness={transactionReadiness}
                />
                <ApplicationClosureNativeSections />
                <ApplicationPreservedShellSurface />
              </ApplicationSurfaceSection>
            </div>
          </div>
          </div>
        </div>
        <ApplicationFloatingDebugWidget
          debugEnabled={debugEnabled}
          environmentMode={environmentMode}
          transactionDataMode={transactionDataMode}
          selectedTransactionId={selectedRun?.id || null}
          hasRepositoryAnchor={Boolean(repositoryContext?.selectedRepository)}
          hasVerifiedWalletBinding={hasVerifiedWalletConnection}
          onDebugEnabledChange={handleDebugEnabledChange}
          onEnvironmentModeChange={handleEnvironmentModeChange}
        />
      </ApplicationShellBridgeProvider>
    </>
  );
}
