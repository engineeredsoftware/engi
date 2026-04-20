import type { DeliverablesDoc } from '@/components/base/bitcode/execution/DeliverablesDocPanel';
import type { PipelineExecution } from '@/types/api';

import type { WorkspaceRun } from './application-run-data';

type RepoSnapshot = {
  org: string;
  repo: string;
  branch: string;
  commit: string;
};

type ProcessingStats = {
  time: string | null;
  tokenTotal: number | null;
  credits: number | null;
  usdTotal: number | null;
  averageLatencyMs: number | null;
};

export interface ApplicationRunDetailSnapshot {
  summary: string | null;
  deliverables: DeliverablesDoc | null;
  repoSnapshot: RepoSnapshot | null;
  processingStats: ProcessingStats;
  proofStatus: string | null;
  closureFocus: string | null;
  historyItemCount: number;
  eventCount: number;
}

type ApplicationRunHistoryPayload = {
  run?: PipelineExecution | null;
  events?: unknown[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function coerceString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : null;
}

function coerceNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function parseRepository(value?: string | null, branch?: string | null): RepoSnapshot | null {
  if (!value) return null;
  const [org, repo] = value.split('/');
  if (!org || !repo) return null;
  return {
    org,
    repo,
    branch: branch || 'n/a',
    commit: '',
  };
}

function coerceRepoSnapshot(value: unknown): RepoSnapshot | null {
  if (!isRecord(value)) return null;
  const org = coerceString(value.org);
  const repo = coerceString(value.repo);
  if (!org || !repo) return null;
  return {
    org,
    repo,
    branch: coerceString(value.branch) || 'n/a',
    commit: coerceString(value.commit) || '',
  };
}

function coerceProcessingStats(value: unknown): ProcessingStats {
  if (!isRecord(value)) {
    return {
      time: null,
      tokenTotal: null,
      credits: null,
      usdTotal: null,
      averageLatencyMs: null,
    };
  }

  const tokens = isRecord(value.tokens) ? value.tokens : null;

  return {
    time: coerceString(value.time),
    tokenTotal: coerceNumber(tokens?.total),
    credits: coerceNumber(value.credits),
    usdTotal: coerceNumber(value.usdTotal),
    averageLatencyMs: coerceNumber(value.averageLatencyMs),
  };
}

function coerceDeliverables(value: unknown): DeliverablesDoc | null {
  if (!isRecord(value)) return null;

  const pullRequest = isRecord(value.pullRequest) ? (value.pullRequest as DeliverablesDoc['pullRequest']) : null;
  const pullRequestReviews = Array.isArray(value.pullRequestReviews)
    ? (value.pullRequestReviews as NonNullable<DeliverablesDoc['pullRequestReviews']>)
    : null;
  const comments = Array.isArray(value.comments) ? (value.comments as NonNullable<DeliverablesDoc['comments']>) : null;
  const issues = Array.isArray(value.issues) ? (value.issues as NonNullable<DeliverablesDoc['issues']>) : null;
  const fileChanges = isRecord(value.fileChanges)
    ? {
        edited: coerceNumber(value.fileChanges.edited) || 0,
        created: coerceNumber(value.fileChanges.created) || 0,
        deleted: coerceNumber(value.fileChanges.deleted) || 0,
        paths: Array.isArray(value.fileChanges.paths)
          ? value.fileChanges.paths.filter((path): path is string => typeof path === 'string')
          : [],
        fileDiffs: Array.isArray(value.fileChanges.fileDiffs)
          ? (value.fileChanges.fileDiffs as NonNullable<NonNullable<DeliverablesDoc['fileChanges']>['fileDiffs']>)
          : undefined,
      }
    : null;
  const summary = coerceString(value.summary);

  if (!pullRequest && !pullRequestReviews?.length && !comments?.length && !issues?.length && !summary && !fileChanges) {
    return null;
  }

  return {
    pullRequest,
    pullRequestReviews,
    comments,
    issues,
    fileChanges,
    summary,
  };
}

function readFinalWorkSummary(run: Record<string, unknown>) {
  if (isRecord(run.output) && isRecord(run.output.final_work_summary)) return run.output.final_work_summary;
  if (isRecord(run.output_data) && isRecord(run.output_data.final_work_summary)) return run.output_data.final_work_summary;
  if (isRecord(run.final_work_summary)) return run.final_work_summary;
  return null;
}

export function buildApplicationRunDetailFromSelectedRun(
  selectedRun: WorkspaceRun,
  fallbackDeliverables?: DeliverablesDoc | null,
): ApplicationRunDetailSnapshot {
  return {
    summary: selectedRun.summary || fallbackDeliverables?.summary || null,
    deliverables: fallbackDeliverables || null,
    repoSnapshot: parseRepository(selectedRun.repository, selectedRun.branch),
    processingStats: {
      time: null,
      tokenTotal: selectedRun.tokenTotal ?? null,
      credits: selectedRun.creditsTotal ?? null,
      usdTotal: selectedRun.usdTotal ?? null,
      averageLatencyMs: selectedRun.averageLatencyMs ?? null,
    },
    proofStatus: selectedRun.proofStatus || null,
    closureFocus: selectedRun.closureFocus || null,
    historyItemCount: selectedRun.itemCount || 0,
    eventCount: 0,
  };
}

export function normalizeApplicationRunDetailPayload(
  payload: unknown,
  selectedRun: WorkspaceRun,
  fallbackDeliverables?: DeliverablesDoc | null,
): ApplicationRunDetailSnapshot {
  if (!isRecord(payload) || (!isRecord(payload.run) && payload.run !== null)) {
    throw new Error('Invalid run history payload');
  }

  const base = buildApplicationRunDetailFromSelectedRun(selectedRun, fallbackDeliverables);
  const run = isRecord(payload.run) ? payload.run : null;
  if (!run) return base;

  const finalWorkSummary = readFinalWorkSummary(run);
  const deliverables = coerceDeliverables(finalWorkSummary?.deliverables) || base.deliverables;
  const repoSnapshot =
    coerceRepoSnapshot(run.repo_snapshot) || coerceRepoSnapshot(finalWorkSummary?.repoSnapshot) || base.repoSnapshot;
  const runProcessingStats = coerceProcessingStats(run.processing_stats);
  const finalWorkSummaryProcessingStats = coerceProcessingStats(finalWorkSummary?.processingStats);
  const hasRunProcessingStats =
    runProcessingStats.time ||
    runProcessingStats.tokenTotal !== null ||
    runProcessingStats.credits !== null ||
    runProcessingStats.usdTotal !== null ||
    runProcessingStats.averageLatencyMs !== null;
  const processingStats = hasRunProcessingStats ? runProcessingStats : finalWorkSummaryProcessingStats;

  return {
    summary: coerceString(run.summary) || coerceString(finalWorkSummary?.summary) || base.summary || deliverables?.summary,
    deliverables,
    repoSnapshot,
    processingStats: {
      time: processingStats.time || base.processingStats.time,
      tokenTotal: processingStats.tokenTotal ?? base.processingStats.tokenTotal,
      credits: processingStats.credits ?? base.processingStats.credits,
      usdTotal: processingStats.usdTotal ?? base.processingStats.usdTotal,
      averageLatencyMs: processingStats.averageLatencyMs ?? base.processingStats.averageLatencyMs,
    },
    proofStatus: base.proofStatus,
    closureFocus: base.closureFocus,
    historyItemCount: Array.isArray(run.items) ? run.items.length : base.historyItemCount,
    eventCount: Array.isArray((payload as ApplicationRunHistoryPayload).events)
      ? (payload as ApplicationRunHistoryPayload).events!.length
      : 0,
  };
}
