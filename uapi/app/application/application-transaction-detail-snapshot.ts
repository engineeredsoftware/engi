import type { ShippablesDoc } from '@/components/base/bitcode/execution/ShippablesDocPanel';
import type { PipelineExecution } from '@/types/api';

import type {
  ApplicationClosureCandidate,
  ApplicationClosureHistoryEntry,
  ApplicationClosurePanel,
  ApplicationClosureProofFamily,
  ApplicationClosureState,
} from './application-closure-state';
import type { ApplicationGiveNeedWorkbench } from './application-give-need-workbench';
import type { ApplicationRepositoryContextState } from './application-repository-context';
import type { WorkspaceRun } from './application-run-data';

export type ApplicationRunDetailClosureFollowThrough = {
  canonLabel: string | null;
  settlementMetrics: Array<{ label: string; value: string }>;
  branchArtifacts: string[];
  proofFamilies: Array<{
    label: string;
    artifactPath: string;
    theoremStatus: string;
    replayArtifacts: string;
  }>;
  recentHistory: Array<{ label: string; summary: string }>;
};

type RepoSnapshot = {
  org: string;
  repo: string;
  branch: string;
  commit: string;
};

type ProcessingStats = {
  time: string | null;
  tokenTotal: number | null;
  btdUsed: number | null;
  usdTotal: number | null;
  averageLatencyMs: number | null;
};

export interface ApplicationRunDetailSnapshot {
  summary: string | null;
  shippables: ShippablesDoc | null;
  assetPackSynthesisArtifacts?: ShippablesDoc | null;
  writtenAssets?: ShippablesDoc | null;
  deliveryMechanism?: ShippablesDoc | null;
  /** Compatibility mirror for retained payload rows that still store Shippables under the old key. */
  deliverables?: ShippablesDoc | null;
  repoSnapshot: RepoSnapshot | null;
  processingStats: ProcessingStats;
  proofStatus: string | null;
  closureFocus: string | null;
  closureFollowThrough: ApplicationRunDetailClosureFollowThrough | null;
  closureState: ApplicationClosureState | null;
  bitcodeActivityState: {
    giveWorkbench?: ApplicationGiveNeedWorkbench | null;
    fitWorkbench?: ApplicationGiveNeedWorkbench | null;
    needMeasurement?: {
      scenario: { id: string; label: string; repo: string; profile: string; selected: boolean };
      parserKind: string;
      closureCriteriaCount: number;
      targetKindCount: number;
    } | null;
    supplySelection?: {
      authSessionLabel: string;
      selectedAuthSessionId: string;
      selectedKind: string;
      searchTerm: string;
      selectedCount: number;
      filteredCount: number;
      totalFilteredEntries: number;
      selectedEntries: Array<{ id: string; title: string; kind: string; tags: string[] }>;
    } | null;
    repositoryAnchor?: {
      provider: ApplicationRepositoryContextState['provider'];
      providerAccount: string;
      repository: {
        id: string;
        fullName: string;
        defaultBranch: string;
        private: boolean;
        language: string | null;
        topics: string[];
      } | null;
      connection: {
        connected: boolean;
        valid: boolean;
        mode: string;
        inventorySource?: string | null;
      };
    } | null;
  } | null;
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
      btdUsed: null,
      usdTotal: null,
      averageLatencyMs: null,
    };
  }

  const tokens = isRecord(value.tokens) ? value.tokens : null;

  return {
    time: coerceString(value.time),
    tokenTotal: coerceNumber(tokens?.total),
    btdUsed: coerceNumber(value.btdUsed),
    usdTotal: coerceNumber(value.usdTotal),
    averageLatencyMs: coerceNumber(value.averageLatencyMs),
  };
}

function coerceShippableSurface(value: unknown): ShippablesDoc | null {
  if (!isRecord(value)) return null;

  const pullRequest = isRecord(value.pullRequest) ? (value.pullRequest as ShippablesDoc['pullRequest']) : null;
  const pullRequestReviews = Array.isArray(value.pullRequestReviews)
    ? (value.pullRequestReviews as NonNullable<ShippablesDoc['pullRequestReviews']>)
    : null;
  const comments = Array.isArray(value.comments) ? (value.comments as NonNullable<ShippablesDoc['comments']>) : null;
  const issues = Array.isArray(value.issues) ? (value.issues as NonNullable<ShippablesDoc['issues']>) : null;
  const fileChanges = isRecord(value.fileChanges)
    ? {
        edited: coerceNumber(value.fileChanges.edited) || 0,
        created: coerceNumber(value.fileChanges.created) || 0,
        deleted: coerceNumber(value.fileChanges.deleted) || 0,
        paths: Array.isArray(value.fileChanges.paths)
          ? value.fileChanges.paths.filter((path): path is string => typeof path === 'string')
          : [],
        fileDiffs: Array.isArray(value.fileChanges.fileDiffs)
          ? (value.fileChanges.fileDiffs as NonNullable<NonNullable<ShippablesDoc['fileChanges']>['fileDiffs']>)
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

function coerceRows(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter(isRecord)
    .map((entry) => ({
      label: coerceString(entry.label) || '—',
      value: coerceString(entry.value) || '—',
    }));
}

function coerceMetrics(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter(isRecord)
    .map((entry) => ({
      label: coerceString(entry.label) || '—',
      value: coerceString(entry.value) || '—',
    }));
}

function coerceChips(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0);
}

function coerceCandidates(value: unknown): ApplicationClosureCandidate[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter(isRecord)
    .map((entry) => ({
      title: coerceString(entry.title) || 'Evaluated candidate',
      artifactKind: coerceString(entry.artifactKind) || 'n/a',
      score: coerceString(entry.score) || 'n/a',
      rights: coerceString(entry.rights) || 'n/a',
      strongestSignals: Array.isArray(entry.strongestSignals)
        ? entry.strongestSignals.filter((signal): signal is string => typeof signal === 'string' && signal.trim().length > 0)
        : [],
    }));
}

function coerceProofFamilies(value: unknown): ApplicationClosureProofFamily[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter(isRecord)
    .map((entry) => ({
      label: coerceString(entry.label) || 'Proof family',
      artifactPath: coerceString(entry.artifactPath) || 'n/a',
      theoremStatus: coerceString(entry.theoremStatus) || 'n/a',
      replayArtifacts: coerceString(entry.replayArtifacts) || 'n/a',
    }));
}

function coerceRecentHistory(value: unknown): ApplicationClosureHistoryEntry[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter(isRecord)
    .map((entry) => ({
      label: coerceString(entry.label) || 'Activity',
      summary: coerceString(entry.summary) || 'n/a',
    }));
}

function coerceClosurePanel(value: unknown): ApplicationClosurePanel | null {
  if (!isRecord(value)) return null;
  const id = coerceString(value.id);
  if (id !== 'need-review' && id !== 'verification' && id !== 'branch' && id !== 'settlement' && id !== 'ledger') return null;

  return {
    id,
    label: coerceString(value.label) || 'Panel',
    summary: coerceString(value.summary) || 'n/a',
    metrics: coerceMetrics(value.metrics),
    rows: coerceRows(value.rows),
    chips: coerceChips(value.chips),
    candidates: coerceCandidates(value.candidates),
    proofFamilies: coerceProofFamilies(value.proofFamilies),
    fitQualities: coerceFitQualities(value.fitQualities),
    recentRuns: coerceRecentHistory(value.recentRuns),
  };
}

function coerceFitQualities(value: unknown): ApplicationClosurePanel['fitQualities'] {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter(isRecord)
    .map((entry) => ({
      label: coerceString(entry.label) || 'Source-to-shares fit quality',
      value: coerceString(entry.value) || '0',
      detail: coerceString(entry.detail) || 'n/a',
    }));
}

function coerceClosureFollowThrough(value: unknown): ApplicationRunDetailClosureFollowThrough | null {
  if (!isRecord(value)) return null;

  const settlementMetrics = coerceRows(value.settlementMetrics);
  const branchArtifacts = Array.isArray(value.branchArtifacts)
    ? value.branchArtifacts.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0)
    : [];
  const proofFamilies = Array.isArray(value.proofFamilies)
    ? value.proofFamilies
        .filter(isRecord)
        .map((entry) => ({
          label: coerceString(entry.label) || 'Proof family',
          artifactPath: coerceString(entry.artifactPath) || 'n/a',
          theoremStatus: coerceString(entry.theoremStatus) || 'n/a',
          replayArtifacts: coerceString(entry.replayArtifacts) || 'n/a',
        }))
    : [];
  const recentHistory = Array.isArray(value.recentHistory)
    ? value.recentHistory
        .filter(isRecord)
        .map((entry) => ({
          label: coerceString(entry.label) || 'Activity',
          summary: coerceString(entry.summary) || 'n/a',
        }))
    : [];

  if (!settlementMetrics.length && !branchArtifacts.length && !proofFamilies.length && !recentHistory.length) {
    return null;
  }

  return {
    canonLabel: coerceString(value.canonLabel),
    settlementMetrics,
    branchArtifacts,
    proofFamilies,
    recentHistory,
  };
}

function coerceClosureState(value: unknown): ApplicationClosureState | null {
  if (!isRecord(value)) return null;
  const verification = coerceClosurePanel(value.verification);
  const needReview = coerceClosurePanel(value.needReview) || {
    id: 'need-review' as const,
    label: 'Need review before fit search',
    summary: 'Need review was not persisted on this older closure snapshot.',
    metrics: [],
    rows: [],
    chips: [],
  };
  const branch = coerceClosurePanel(value.branch);
  const settlement = coerceClosurePanel(value.settlement);
  const ledger = coerceClosurePanel(value.ledger);

  if (!verification || !branch || !settlement || !ledger) return null;

  return {
    canonLabel: coerceString(value.canonLabel) || 'Bitcode active posture',
    needReview,
    verification,
    branch,
    settlement,
    ledger,
  };
}

function coerceGiveNeedWorkbenchState(value: unknown): ApplicationGiveNeedWorkbench | null {
  if (!isRecord(value)) return null;
  const give = isRecord(value.give) ? value.give : null;
  const need = isRecord(value.need) ? value.need : null;
  const fit = isRecord(value.fit) ? value.fit : null;
  if (!give || !need || !fit) return null;

  const coerceSelectionEntries = (entries: unknown) =>
    Array.isArray(entries)
      ? entries
          .filter(isRecord)
          .map((entry) => ({
            id: coerceString(entry.id) || '',
            label: coerceString(entry.label) || '',
          }))
          .filter((entry) => entry.id && entry.label)
      : [];

  return {
    canonLabel: coerceString(value.canonLabel) || 'Bitcode active posture',
    projectionPrincipal: coerceString(value.projectionPrincipal) || 'buyer',
    branchMode: coerceString(value.branchMode) || 'patch',
    scenarioLabel: coerceString(value.scenarioLabel) || 'No active scenario',
    profileLabel: coerceString(value.profileLabel) || 'Pending profile',
    give: {
      summary: coerceString(give.summary) || 'n/a',
      metrics: coerceMetrics(give.metrics),
      rows: coerceRows(give.rows),
      selectedEntries: coerceSelectionEntries(give.selectedEntries),
      artifactKinds: coerceChips(give.artifactKinds),
    },
    need: {
      summary: coerceString(need.summary) || 'n/a',
      metrics: coerceMetrics(need.metrics),
      rows: coerceRows(need.rows),
      closureCriteria: coerceChips(need.closureCriteria),
      targetKinds: coerceChips(need.targetKinds),
    },
    fit: {
      summary: coerceString(fit.summary) || 'n/a',
      metrics: coerceMetrics(fit.metrics),
      rows: coerceRows(fit.rows),
    },
  };
}

function coerceBitcodeActivityState(value: unknown): ApplicationRunDetailSnapshot['bitcodeActivityState'] {
  if (!isRecord(value)) return null;

  const needMeasurement = isRecord(value.needMeasurement)
    ? {
        scenario: isRecord(value.needMeasurement.scenario)
          ? {
              id: coerceString(value.needMeasurement.scenario.id) || 'unselected-scenario',
              label: coerceString(value.needMeasurement.scenario.label) || 'Unselected scenario',
              repo: coerceString(value.needMeasurement.scenario.repo) || '—',
              profile: coerceString(value.needMeasurement.scenario.profile) || 'profile pending',
              selected: Boolean(value.needMeasurement.scenario.selected),
            }
          : {
              id: 'unselected-scenario',
              label: 'Unselected scenario',
              repo: '—',
              profile: 'profile pending',
              selected: false,
            },
        parserKind: coerceString(value.needMeasurement.parserKind) || '—',
        closureCriteriaCount: coerceNumber(value.needMeasurement.closureCriteriaCount) || 0,
        targetKindCount: coerceNumber(value.needMeasurement.targetKindCount) || 0,
      }
    : null;

  const supplySelection = isRecord(value.supplySelection)
    ? {
        authSessionLabel: coerceString(value.supplySelection.authSessionLabel) || 'No auth session',
        selectedAuthSessionId: coerceString(value.supplySelection.selectedAuthSessionId) || '',
        selectedKind: coerceString(value.supplySelection.selectedKind) || 'all',
        searchTerm: coerceString(value.supplySelection.searchTerm) || '',
        selectedCount: coerceNumber(value.supplySelection.selectedCount) || 0,
        filteredCount: coerceNumber(value.supplySelection.filteredCount) || 0,
        totalFilteredEntries: coerceNumber(value.supplySelection.totalFilteredEntries) || 0,
        selectedEntries: Array.isArray(value.supplySelection.selectedEntries)
          ? value.supplySelection.selectedEntries
              .filter(isRecord)
              .map((entry) => ({
                id: coerceString(entry.id) || '',
                title: coerceString(entry.title) || '',
                kind: coerceString(entry.kind) || 'artifact',
                tags: coerceChips(entry.tags),
              }))
              .filter((entry) => entry.id && entry.title)
          : [],
      }
    : null;

  const repositoryAnchor = isRecord(value.repositoryAnchor)
    ? {
        provider:
          coerceString(value.repositoryAnchor.provider) === 'gitlab' ||
          coerceString(value.repositoryAnchor.provider) === 'bitbucket'
            ? (coerceString(value.repositoryAnchor.provider) as ApplicationRepositoryContextState['provider'])
            : 'github',
        providerAccount: coerceString(value.repositoryAnchor.providerAccount) || 'connected account',
        repository: isRecord(value.repositoryAnchor.repository)
          ? {
              id: coerceString(value.repositoryAnchor.repository.id) || '',
              fullName: coerceString(value.repositoryAnchor.repository.fullName) || '',
              defaultBranch: coerceString(value.repositoryAnchor.repository.defaultBranch) || 'main',
              private: Boolean(value.repositoryAnchor.repository.private),
              language: coerceString(value.repositoryAnchor.repository.language),
              topics: coerceChips(value.repositoryAnchor.repository.topics),
            }
          : null,
        connection: isRecord(value.repositoryAnchor.connection)
          ? {
              connected: Boolean(value.repositoryAnchor.connection.connected),
              valid: Boolean(value.repositoryAnchor.connection.valid),
              mode: coerceString(value.repositoryAnchor.connection.mode) || 'live connection',
              inventorySource: coerceString(value.repositoryAnchor.connection.inventorySource),
            }
          : { connected: false, valid: false, mode: 'live connection', inventorySource: null },
      }
    : null;

  const giveWorkbench = coerceGiveNeedWorkbenchState(value.giveWorkbench);
  const fitWorkbench = coerceGiveNeedWorkbenchState(value.fitWorkbench);

  if (!giveWorkbench && !fitWorkbench && !needMeasurement && !supplySelection && !repositoryAnchor) {
    return null;
  }

  return {
    ...(giveWorkbench ? { giveWorkbench } : {}),
    ...(fitWorkbench ? { fitWorkbench } : {}),
    ...(needMeasurement ? { needMeasurement } : {}),
    ...(supplySelection ? { supplySelection } : {}),
    ...(repositoryAnchor ? { repositoryAnchor } : {}),
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
  fallbackShippables?: ShippablesDoc | null,
): ApplicationRunDetailSnapshot {
  if (selectedRun.sourceModel === 'protocol-projection' && selectedRun.protocolProjectionDetail) {
    return selectedRun.protocolProjectionDetail;
  }

  return {
    summary: selectedRun.summary || fallbackShippables?.summary || null,
    assetPackSynthesisArtifacts: null,
    writtenAssets: fallbackShippables || null,
    shippables: fallbackShippables || null,
    deliveryMechanism: fallbackShippables || null,
    deliverables: fallbackShippables || null,
    repoSnapshot: parseRepository(selectedRun.repository, selectedRun.branch),
    processingStats: {
      time: null,
      tokenTotal: selectedRun.tokenTotal ?? null,
      btdUsed: selectedRun.btdUsed ?? null,
      usdTotal: selectedRun.usdTotal ?? null,
      averageLatencyMs: selectedRun.averageLatencyMs ?? null,
    },
    proofStatus: selectedRun.proofStatus || null,
    closureFocus: selectedRun.closureFocus || null,
    closureFollowThrough: null,
    closureState: null,
    bitcodeActivityState: null,
    historyItemCount: selectedRun.itemCount || 0,
    eventCount: 0,
  };
}

export function normalizeApplicationRunDetailPayload(
  payload: unknown,
  selectedRun: WorkspaceRun,
  fallbackShippables?: ShippablesDoc | null,
): ApplicationRunDetailSnapshot {
  if (!isRecord(payload) || (!isRecord(payload.run) && payload.run !== null)) {
    throw new Error('Invalid run history payload');
  }

  const base = buildApplicationRunDetailFromSelectedRun(selectedRun, fallbackShippables);
  const run = isRecord(payload.run) ? payload.run : null;
  if (!run) return base;

  const finalWorkSummary = readFinalWorkSummary(run);
  const assetPackSynthesisArtifacts =
    coerceShippableSurface(finalWorkSummary?.assetPackSynthesisArtifacts) ||
    coerceShippableSurface(run.asset_pack_synthesis_artifacts) ||
    coerceShippableSurface(run.assetPackSynthesisArtifacts);
  const writtenAssets =
    coerceShippableSurface(finalWorkSummary?.writtenAssets) ||
    assetPackSynthesisArtifacts ||
    coerceShippableSurface(run.written_assets) ||
    coerceShippableSurface(finalWorkSummary?.deliverables) ||
    base.writtenAssets ||
    base.deliverables;
  const deliveryMechanism =
    coerceShippableSurface(finalWorkSummary?.deliveryMechanism) ||
    coerceShippableSurface(run.delivery_mechanism) ||
    coerceShippableSurface(finalWorkSummary?.shippables) ||
    coerceShippableSurface(run.shippables) ||
    coerceShippableSurface(finalWorkSummary?.deliverables) ||
    base.deliveryMechanism ||
    base.deliverables ||
    writtenAssets;
  const shippables =
    coerceShippableSurface(finalWorkSummary?.shippables) ||
    coerceShippableSurface(run.shippables) ||
    deliveryMechanism ||
    base.shippables ||
    null;
  const compatibilityDeliverables =
    coerceShippableSurface(finalWorkSummary?.deliverables) ||
    shippables ||
    deliveryMechanism ||
    writtenAssets ||
    base.deliverables;
  const repoSnapshot =
    coerceRepoSnapshot(run.repo_snapshot) || coerceRepoSnapshot(finalWorkSummary?.repoSnapshot) || base.repoSnapshot;
  const closureFollowThrough =
    coerceClosureFollowThrough(finalWorkSummary?.closureFollowThrough) || base.closureFollowThrough;
  const closureState = coerceClosureState(finalWorkSummary?.closurePanels) || base.closureState;
  const bitcodeActivityState =
    coerceBitcodeActivityState(finalWorkSummary?.bitcodeActivityState) || base.bitcodeActivityState;
  const runProcessingStats = coerceProcessingStats(run.processing_stats);
  const finalWorkSummaryProcessingStats = coerceProcessingStats(finalWorkSummary?.processingStats);
  const hasRunProcessingStats =
    runProcessingStats.time ||
    runProcessingStats.tokenTotal !== null ||
    runProcessingStats.btdUsed !== null ||
    runProcessingStats.usdTotal !== null ||
    runProcessingStats.averageLatencyMs !== null;
  const processingStats = hasRunProcessingStats ? runProcessingStats : finalWorkSummaryProcessingStats;

  return {
    summary:
      coerceString(run.summary) ||
      coerceString(finalWorkSummary?.summary) ||
      base.summary ||
      assetPackSynthesisArtifacts?.summary ||
      writtenAssets?.summary ||
      shippables?.summary ||
      compatibilityDeliverables?.summary ||
      null,
    assetPackSynthesisArtifacts,
    writtenAssets,
    shippables,
    deliveryMechanism,
    deliverables: compatibilityDeliverables,
    repoSnapshot,
    processingStats: {
      time: processingStats.time || base.processingStats.time,
      tokenTotal: processingStats.tokenTotal ?? base.processingStats.tokenTotal,
      btdUsed: processingStats.btdUsed ?? base.processingStats.btdUsed,
      usdTotal: processingStats.usdTotal ?? base.processingStats.usdTotal,
      averageLatencyMs: processingStats.averageLatencyMs ?? base.processingStats.averageLatencyMs,
    },
    proofStatus: base.proofStatus,
    closureFocus: base.closureFocus,
    closureFollowThrough,
    closureState,
    bitcodeActivityState,
    historyItemCount: Array.isArray(run.items) ? run.items.length : base.historyItemCount,
    eventCount: Array.isArray((payload as ApplicationRunHistoryPayload).events)
      ? (payload as ApplicationRunHistoryPayload).events!.length
      : 0,
  };
}
