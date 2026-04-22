import { buildAgenticExecutionSummary } from '@bitcode/api/src/executions/agentic-execution';

import type { PipelineExecution } from '@/types/api';

import type { ApplicationClosureState } from './application-closure-state';
import type { ApplicationGiveNeedWorkbench } from './application-give-need-workbench';
import type { ApplicationNeedScenariosState } from './application-need-scenarios';
import type { ApplicationExternalRuntimeSnapshot } from './application-external-runtime';
import type { WorkspaceRun } from './application-run-data';
import type { ApplicationRepositoryContextState } from './application-repository-context';
import type { ApplicationSupplySelectionState } from './application-supply-selection';
import type { ApplicationRunDetailSnapshot } from './application-transaction-detail-snapshot';
import type { ApplicationTransactionDetailSection } from './application-transaction-query';

export interface ApplicationActivityRecordDraft {
  type: string;
  summary: string;
  detailSection?: ApplicationTransactionDetailSection;
  status?: string;
  input?: Record<string, unknown> | null;
  output?: Record<string, unknown> | null;
  context?: Record<string, unknown> | null;
  items?: unknown[];
}

function buildBitcodeWorkbenchState(workbench: ApplicationGiveNeedWorkbench) {
  return {
    canonLabel: workbench.canonLabel,
    projectionPrincipal: workbench.projectionPrincipal,
    branchMode: workbench.branchMode,
    scenarioLabel: workbench.scenarioLabel,
    profileLabel: workbench.profileLabel,
    give: workbench.give,
    need: workbench.need,
    fit: workbench.fit,
  };
}

function buildNeedMeasurementState(
  needState: ApplicationNeedScenariosState,
  scenario: ApplicationNeedScenariosState['scenarios'][number],
) {
  return {
    scenario,
    parserKind: needState.parserKind,
    closureCriteriaCount: needState.closureCriteriaCount,
    targetKindCount: needState.targetKindCount,
  };
}

function buildSupplySelectionState(selection: ApplicationSupplySelectionState, authSessionLabel: string) {
  return {
    authSessionLabel,
    selectedAuthSessionId: selection.selectedAuthSessionId,
    selectedKind: selection.selectedKind,
    searchTerm: selection.searchTerm,
    selectedCount: selection.selectedCount,
    filteredCount: selection.filteredCount,
    totalFilteredEntries: selection.totalFilteredEntries,
    selectedEntries: selection.filteredEntries
      .filter((entry) => entry.selected)
      .map((entry) => ({
        id: entry.id,
        title: entry.title,
        kind: entry.kind,
        tags: entry.tags,
      })),
  };
}

function buildRepositoryAnchorState(repositoryContext: ApplicationRepositoryContextState, providerAccount: string) {
  const selectedRepository = repositoryContext.selectedRepository;
  const connectionStatus = repositoryContext.connectionStatus;
  return {
    provider: repositoryContext.provider,
    providerAccount,
    repository: selectedRepository
      ? {
          id: selectedRepository.id,
          fullName: selectedRepository.fullName,
          defaultBranch: selectedRepository.defaultBranch || 'main',
          private: Boolean(selectedRepository.private),
          language: selectedRepository.language || null,
          topics: selectedRepository.topics || [],
        }
      : null,
    connection: {
      connected: Boolean(connectionStatus?.connected),
      valid: Boolean(connectionStatus?.valid),
      mode: connectionStatus?.metadata?.mock_mode ? 'mock review' : 'live connection',
    },
  };
}

function normalizeWhitespace(value?: string | null) {
  return value?.trim() || '';
}

function splitRepositoryFullName(value?: string | null) {
  const fullName = normalizeWhitespace(value);
  if (!fullName.includes('/')) return null;
  const [org, repo] = fullName.split('/', 2);
  if (!org || !repo) return null;
  return { org, repo };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readRowValue(rows: Array<{ label: string; value: string }>, label: string) {
  return rows.find((row) => row.label === label)?.value || '—';
}

function buildRepoSnapshot(
  repositoryContext?: ApplicationRepositoryContextState | null,
  fallbackRun?: WorkspaceRun | null,
) {
  const selectedRepository = repositoryContext?.selectedRepository || null;
  const selectedRepositoryParts = splitRepositoryFullName(selectedRepository?.fullName);
  if (selectedRepository && selectedRepositoryParts) {
    return {
      org: selectedRepositoryParts.org,
      repo: selectedRepositoryParts.repo,
      branch: normalizeWhitespace(selectedRepository.defaultBranch) || 'main',
      commit: '',
    };
  }

  const fallbackRepository = splitRepositoryFullName(fallbackRun?.repository);
  if (!fallbackRepository) return null;

  return {
    org: fallbackRepository.org,
    repo: fallbackRepository.repo,
    branch: normalizeWhitespace(fallbackRun?.branch) || 'n/a',
    commit: '',
  };
}

export function buildApplicationExecutionHistoryRequest(
  draft: ApplicationActivityRecordDraft,
  options: {
    repositoryContext?: ApplicationRepositoryContextState | null;
    fallbackRun?: WorkspaceRun | null;
  },
) {
  const summary = normalizeWhitespace(draft.summary) || 'Bitcode activity recorded from the Bitcode Terminal.';
  const repoSnapshot = buildRepoSnapshot(options.repositoryContext, options.fallbackRun);
  const draftOutput = isRecord(draft.output) ? draft.output : null;
  const finalWorkSummaryPatch = isRecord(draftOutput?.finalWorkSummary) ? draftOutput.finalWorkSummary : null;
  const outputWithoutFinalWorkSummary = draftOutput
    ? Object.fromEntries(Object.entries(draftOutput).filter(([key]) => key !== 'finalWorkSummary'))
    : null;
  const output = {
    summary,
    ...(repoSnapshot ? { repo_snapshot: repoSnapshot } : {}),
    final_work_summary: {
      summary,
      ...(repoSnapshot ? { repoSnapshot } : {}),
      ...(finalWorkSummaryPatch || {}),
    },
    ...(outputWithoutFinalWorkSummary || {}),
  };
  const context = {
    source: 'application-terminal',
    surface: 'Bitcode Terminal',
    summary,
    ...(repoSnapshot ? { repoSnapshot } : {}),
    ...(draft.context || {}),
  };

  return {
    pipeline_type: draft.type,
    status: draft.status || 'completed',
    input: draft.input || null,
    output,
    context,
    items: draft.items || [],
  };
}

function serializeProcessingStats(
  processingStats?: Pick<ApplicationRunDetailSnapshot, 'processingStats'>['processingStats'] | null,
) {
  if (!processingStats) return null;

  return {
    ...(processingStats.time ? { time: processingStats.time } : {}),
    ...(typeof processingStats.tokenTotal === 'number'
      ? { tokens: { total: processingStats.tokenTotal } }
      : {}),
    ...(typeof processingStats.btdUsed === 'number' ? { btdUsed: processingStats.btdUsed } : {}),
    ...(typeof processingStats.usdTotal === 'number' ? { usdTotal: processingStats.usdTotal } : {}),
    ...(typeof processingStats.averageLatencyMs === 'number'
      ? { averageLatencyMs: processingStats.averageLatencyMs }
      : {}),
  };
}

export function buildApplicationClosureFinalWorkSummary(
  closureState: ApplicationClosureState | null,
  detail?: Pick<ApplicationRunDetailSnapshot, 'summary' | 'processingStats'> | null,
) {
  const closureFollowThrough = closureState
    ? {
        canonLabel: closureState.canonLabel,
        settlementMetrics: closureState.settlement.metrics.slice(0, 4),
        branchArtifacts: closureState.branch.chips.slice(0, 6),
        proofFamilies: closureState.settlement.proofFamilies?.slice(0, 4) || [],
        recentHistory: closureState.ledger.recentRuns?.slice(0, 4) || [],
      }
    : null;
  const processingStats = serializeProcessingStats(detail?.processingStats);

  if (!closureFollowThrough && !processingStats && !normalizeWhitespace(detail?.summary)) {
    return null;
  }

  return {
    ...(normalizeWhitespace(detail?.summary) ? { summary: normalizeWhitespace(detail?.summary) } : {}),
    ...(processingStats ? { processingStats } : {}),
    ...(closureState
      ? {
          closurePanels: {
            canonLabel: closureState.canonLabel,
            verification: closureState.verification,
            branch: closureState.branch,
            settlement: closureState.settlement,
            ledger: closureState.ledger,
          },
        }
      : {}),
    ...(closureFollowThrough ? { closureFollowThrough } : {}),
  };
}

export function buildApplicationGiveWorkbenchDraft(
  workbench: ApplicationGiveNeedWorkbench,
): ApplicationActivityRecordDraft {
  const repository = readRowValue(workbench.give.rows, 'Repository');
  const selectedEntryLabels = workbench.give.selectedEntries.map((entry) => entry.label);

  return {
    type: 'agentic-execution:branch-artifact',
    detailSection: 'transaction',
    summary: `Recorded give-side share posture for ${repository}.`,
    input: {
      selectedEntryLabels,
      artifactKinds: workbench.give.artifactKinds,
    },
    output: {
      give: {
        summary: workbench.give.summary,
        metrics: workbench.give.metrics,
        rows: workbench.give.rows,
      },
      finalWorkSummary: {
        bitcodeActivityState: {
          giveWorkbench: buildBitcodeWorkbenchState(workbench),
        },
      },
    },
    context: {
      source: 'application-give-need-workbench',
      workbench: 'give',
      canonLabel: workbench.canonLabel,
      projectionPrincipal: workbench.projectionPrincipal,
      branchMode: workbench.branchMode,
      scenarioLabel: workbench.scenarioLabel,
      profileLabel: workbench.profileLabel,
      repository,
    },
  };
}

export function buildApplicationNeedMeasurementDraft(
  needState: ApplicationNeedScenariosState,
  scenarioOverride?: ApplicationNeedScenariosState['scenarios'][number],
): ApplicationActivityRecordDraft {
  const scenario =
    scenarioOverride ||
    needState.scenarios.find((entry) => entry.selected) ||
    needState.scenarios.find((entry) => entry.id === needState.selectedScenarioId) ||
    needState.scenarios[0] || {
      id: 'unselected-scenario',
      label: 'Unselected scenario',
      repo: '—',
      profile: 'profile pending',
      selected: false,
    };

  return {
    type: 'agentic-execution:need-measurement',
    detailSection: 'activity',
    summary: `Recorded need measurement for ${scenario.label}.`,
    output: {
      needMeasurement: {
        parserKind: needState.parserKind,
        closureCriteriaCount: needState.closureCriteriaCount,
        targetKindCount: needState.targetKindCount,
        scenario,
      },
      finalWorkSummary: {
        bitcodeActivityState: {
          needMeasurement: buildNeedMeasurementState(needState, scenario),
        },
      },
    },
    context: {
      source: 'application-need-scenario-panel',
      scenarioId: scenario.id,
      scenarioLabel: scenario.label,
      scenarioRepository: scenario.repo,
      scenarioProfile: scenario.profile,
    },
  };
}

export function buildApplicationSupplySelectionDraft(
  selection: ApplicationSupplySelectionState,
): ApplicationActivityRecordDraft {
  const selectedEntries = selection.filteredEntries
    .filter((entry) => entry.selected)
    .map((entry) => ({
      id: entry.id,
      title: entry.title,
      kind: entry.kind,
      tags: entry.tags,
    }));
  const authSessionLabel =
    selection.authSessions.find((entry) => entry.value === selection.selectedAuthSessionId)?.label || 'No auth session';

  return {
    type: 'agentic-execution:branch-artifact',
    detailSection: 'transaction',
    summary: `Recorded give-side selection with ${selection.selectedCount} supply reference${selection.selectedCount === 1 ? '' : 's'}.`,
    input: {
      selectedCount: selection.selectedCount,
      selectedEntries,
      selectedKind: selection.selectedKind,
      searchTerm: selection.searchTerm,
    },
    output: {
      giveSelection: {
        authSessionLabel,
        filteredCount: selection.filteredCount,
        totalFilteredEntries: selection.totalFilteredEntries,
      },
      finalWorkSummary: {
        bitcodeActivityState: {
          supplySelection: buildSupplySelectionState(selection, authSessionLabel),
        },
      },
    },
    context: {
      source: 'application-supply-selection-panel',
      authSessionId: selection.selectedAuthSessionId,
      selectedKind: selection.selectedKind,
      searchTerm: selection.searchTerm || null,
    },
  };
}

export function buildApplicationFitWorkbenchDraft(
  workbench: ApplicationGiveNeedWorkbench,
): ApplicationActivityRecordDraft {
  return {
    type: 'agentic-execution:proof-refresh',
    detailSection: 'closure',
    summary: `Recorded asset-pack fit and settlement posture for ${workbench.scenarioLabel}.`,
    output: {
      fit: {
        summary: workbench.fit.summary,
        metrics: workbench.fit.metrics,
        rows: workbench.fit.rows,
      },
      finalWorkSummary: {
        bitcodeActivityState: {
          fitWorkbench: buildBitcodeWorkbenchState(workbench),
        },
      },
    },
    context: {
      source: 'application-give-need-workbench',
      workbench: 'fit',
      projectionPrincipal: workbench.projectionPrincipal,
      branchMode: workbench.branchMode,
      scenarioLabel: workbench.scenarioLabel,
      profileLabel: workbench.profileLabel,
    },
  };
}

export function buildApplicationRepositoryAnchorDraft(
  repositoryContext: ApplicationRepositoryContextState,
): ApplicationActivityRecordDraft {
  const selectedRepository = repositoryContext.selectedRepository;
  const connectionStatus = repositoryContext.connectionStatus;
  const providerAccount =
    connectionStatus?.username || connectionStatus?.metadata?.account || selectedRepository?.owner.username || 'connected account';

  return {
    type: 'agentic-execution:branch-artifact',
    detailSection: 'transaction',
    summary: `Recorded repository anchor for ${selectedRepository?.fullName || 'the current Bitcode supply boundary'}.`,
    output: {
      repositoryAnchor: {
        provider: repositoryContext.provider,
        repository: selectedRepository
          ? {
              id: selectedRepository.id,
              fullName: selectedRepository.fullName,
              defaultBranch: selectedRepository.defaultBranch || 'main',
              private: Boolean(selectedRepository.private),
              language: selectedRepository.language || null,
              topics: selectedRepository.topics || [],
            }
          : null,
        connection: {
          connected: Boolean(connectionStatus?.connected),
          valid: Boolean(connectionStatus?.valid),
          mode: connectionStatus?.metadata?.mock_mode ? 'mock review' : 'live connection',
        },
      },
      finalWorkSummary: {
        bitcodeActivityState: {
          repositoryAnchor: buildRepositoryAnchorState(repositoryContext, providerAccount),
        },
      },
    },
    context: {
      source: 'application-repository-context-panel',
      provider: repositoryContext.provider,
      providerAccount,
      repositoryFullName: selectedRepository?.fullName || null,
    },
  };
}

export function buildApplicationExternalInterfacingDraft(
  snapshot: ApplicationExternalRuntimeSnapshot,
): ApplicationActivityRecordDraft {
  return {
    type: 'agentic-execution:proof-refresh',
    detailSection: 'closure',
    summary: `Recorded external interface readiness for ${snapshot.configuredEnvironmentMode} Bitcode posture.`,
    output: {
      externalInterfacing: {
        configuredEnvironmentMode: snapshot.configuredEnvironmentMode,
        actualityDisposition: snapshot.actualityDisposition,
        counts: snapshot.counts,
        interfaces: snapshot.interfaces.map((entry) => ({
          interfaceId: entry.interfaceId,
          runtimeState: entry.runtimeState,
          resultClass: entry.resultClass,
          reconciliationState: entry.reconciliationState,
          blocking: entry.blocking,
        })),
      },
    },
    context: {
      source: 'application-external-interfacing-panel',
      configuredEnvironmentMode: snapshot.configuredEnvironmentMode,
      actualityDisposition: snapshot.actualityDisposition,
      blockingInterfaces: snapshot.counts.blocking,
      liveConfiguredInterfaces: snapshot.counts.liveConfigured,
    },
  };
}

export function mapExecutionHistoryRunToWorkspaceRun(run: PipelineExecution): WorkspaceRun {
  const agenticExecution =
    run.agentic_execution ||
    buildAgenticExecutionSummary({
      type: run.type,
      status: run.status,
    });

  return {
    id: run.id,
    created_at: run.created_at,
    status: run.status,
    type: agenticExecution.canonicalType,
    agentic_execution: agenticExecution,
    sourceModel: 'execution-history',
    summary:
      run.summary ||
      run.final_work_summary?.summary ||
      run.final_work_summary?.writtenAssets?.summary ||
      run.final_work_summary?.deliverables?.summary ||
      null,
    repository:
      run.repo_snapshot || run.final_work_summary?.repoSnapshot
        ? `${(run.repo_snapshot || run.final_work_summary?.repoSnapshot)?.org}/${(run.repo_snapshot || run.final_work_summary?.repoSnapshot)?.repo}`
        : null,
    branch: (run.repo_snapshot || run.final_work_summary?.repoSnapshot)?.branch || null,
    participant: (run.repo_snapshot || run.final_work_summary?.repoSnapshot)?.org || 'connected account',
    isOwnTransaction: true,
    transactionLens: agenticExecution.lens,
    itemCount: run.items?.length || 0,
    tokenTotal:
      run.processing_stats?.tokens?.total ?? run.final_work_summary?.processingStats?.tokens?.total ?? null,
    btdUsed: run.processing_stats?.btdUsed ?? run.final_work_summary?.processingStats?.btdUsed ?? null,
    usdTotal: run.processing_stats?.usdTotal ?? run.final_work_summary?.processingStats?.usdTotal ?? null,
    averageLatencyMs:
      run.processing_stats?.averageLatencyMs ?? run.final_work_summary?.processingStats?.averageLatencyMs ?? null,
    proofStatus: agenticExecution.proofStatus,
    closureFocus: agenticExecution.closureFocus,
  };
}

export function upsertWorkspaceRun(runs: WorkspaceRun[], nextRun: WorkspaceRun) {
  const dedupedRuns = [nextRun, ...runs.filter((run) => run.id !== nextRun.id)];
  return dedupedRuns.sort(
    (left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime(),
  );
}

export async function readApplicationRouteError(response: Response, fallback: string) {
  try {
    const payload = (await response.json()) as Record<string, unknown>;
    const message = typeof payload.error === 'string' ? payload.error : payload.message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  } catch {}

  return fallback;
}
