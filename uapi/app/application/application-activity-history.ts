import { buildAgenticExecutionSummary } from '@bitcode/api/src/executions/agentic-execution';

import type { PipelineExecution } from '@/types/api';

import type { ApplicationGiveNeedWorkbench } from './application-give-need-workbench';
import type { ApplicationNeedScenariosState } from './application-need-scenarios';
import type { WorkspaceRun } from './application-run-data';
import type { ApplicationRepositoryContextState } from './application-repository-context';
import type { ApplicationSupplySelectionState } from './application-supply-selection';
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
  const output = {
    summary,
    ...(repoSnapshot ? { repo_snapshot: repoSnapshot } : {}),
    final_work_summary: {
      summary,
      ...(repoSnapshot ? { repoSnapshot } : {}),
    },
    ...(draft.output || {}),
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
    summary:
      run.summary || run.final_work_summary?.summary || run.final_work_summary?.deliverables?.summary || null,
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
