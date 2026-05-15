import type { ShippablesDoc } from '@/components/base/bitcode/execution/ShippablesDocPanel';
import type { PipelineExecution } from '@/types/api';

import type {
  TerminalClosureCandidate,
  TerminalClosureHistoryEntry,
  TerminalClosurePanel,
  TerminalClosureProofFamily,
  TerminalClosureState,
} from './terminal-closure-state';
import type { TerminalDepositReadWorkbench } from './terminal-deposit-read-workbench';
import type { TerminalRepositoryContextState } from './terminal-repository-context';
import type { WorkspaceRun } from './terminal-run-data';

export type TerminalRunDetailClosureFollowThrough = {
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
  measuredBtd: number | null;
  btcFeeUsdEquivalent: number | null;
  averageLatencyMs: number | null;
};

export interface TerminalRunDetailSnapshot {
  summary: string | null;
  shippables: ShippablesDoc | null;
  assetPackSynthesisArtifacts?: ShippablesDoc | null;
  writtenAssets?: ShippablesDoc | null;
  deliveryMechanism?: ShippablesDoc | null;
  repoSnapshot: RepoSnapshot | null;
  processingStats: ProcessingStats;
  proofStatus: string | null;
  closureFocus: string | null;
  closureFollowThrough: TerminalRunDetailClosureFollowThrough | null;
  closureState: TerminalClosureState | null;
  bitcodeActivityState: {
    depositWorkbench?: TerminalDepositReadWorkbench | null;
    fitWorkbench?: TerminalDepositReadWorkbench | null;
    readMeasurement?: {
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
      provider: TerminalRepositoryContextState['provider'];
      providerAccount: string;
      repository: {
        id: string;
        fullName: string;
        defaultBranch: string;
        selectedBranch?: string | null;
        selectedCommit?: string | null;
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

type TerminalRunHistoryPayload = {
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
      measuredBtd: null,
      btcFeeUsdEquivalent: null,
      averageLatencyMs: null,
    };
  }

  const tokens = isRecord(value.tokens) ? value.tokens : null;

  return {
    time: coerceString(value.time),
    tokenTotal: coerceNumber(tokens?.total),
    measuredBtd: coerceNumber(value.measuredBtd),
    btcFeeUsdEquivalent: coerceNumber(value.btcFeeUsdEquivalent),
    averageLatencyMs: coerceNumber(value.averageLatencyMs),
  };
}

function coerceShippableSurface(value: unknown): ShippablesDoc | null {
  if (!isRecord(value)) return null;

  const pullRequest = isRecord(value.pullRequest) ? (value.pullRequest as ShippablesDoc['pullRequest']) : null;
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

  if (!pullRequest && !summary && !fileChanges) {
    return null;
  }

  return {
    pullRequest,
    fileChanges,
    summary,
  };
}

function buildWrittenAssetSurface(surface?: ShippablesDoc | null): ShippablesDoc | null {
  if (!surface) return null;

  const summary = surface.summary || null;
  const fileChanges = surface.fileChanges || null;
  if (!summary && !fileChanges) return null;

  return {
    pullRequest: null,
    fileChanges,
    summary,
  };
}

function buildDeliverySurface(surface?: ShippablesDoc | null): ShippablesDoc | null {
  if (!surface) return null;

  const pullRequest = surface.pullRequest || null;
  const summary = surface.summary || null;
  if (!pullRequest && !summary) return null;

  return {
    pullRequest,
    fileChanges: null,
    summary,
  };
}

function buildPullRequestShippableSurface(surface?: ShippablesDoc | null): ShippablesDoc | null {
  const deliverySurface = buildDeliverySurface(surface);
  if (!deliverySurface?.pullRequest) return null;
  return deliverySurface;
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

function coerceCandidates(value: unknown): TerminalClosureCandidate[] | undefined {
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

function coerceProofFamilies(value: unknown): TerminalClosureProofFamily[] | undefined {
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

function coerceRecentHistory(value: unknown): TerminalClosureHistoryEntry[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter(isRecord)
    .map((entry) => ({
      label: coerceString(entry.label) || 'Activity',
      summary: coerceString(entry.summary) || 'n/a',
    }));
}

function coerceClosurePanel(value: unknown): TerminalClosurePanel | null {
  if (!isRecord(value)) return null;
  const id = coerceString(value.id);
  if (id !== 'read-review' && id !== 'verification' && id !== 'branch' && id !== 'settlement' && id !== 'ledger') return null;

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

function coerceFitQualities(value: unknown): TerminalClosurePanel['fitQualities'] {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter(isRecord)
    .map((entry) => ({
      label: coerceString(entry.label) || 'Source-to-shares fit quality',
      value: coerceString(entry.value) || '0',
      detail: coerceString(entry.detail) || 'n/a',
    }));
}

function coerceClosureFollowThrough(value: unknown): TerminalRunDetailClosureFollowThrough | null {
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

function coerceClosureState(value: unknown): TerminalClosureState | null {
  if (!isRecord(value)) return null;
  const verification = coerceClosurePanel(value.verification);
  const readReview = coerceClosurePanel(value.readReview) || {
    id: 'read-review' as const,
    label: 'Read review before fit search',
    summary: 'Read review was not persisted on this older closure snapshot.',
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
    readReview,
    verification,
    branch,
    settlement,
    ledger,
  };
}

function coerceDepositReadWorkbenchState(value: unknown): TerminalDepositReadWorkbench | null {
  if (!isRecord(value)) return null;
  const legacyDepositKey = ['gi', 've'].join('');
  const legacyReadKey = ['ne', 'ed'].join('');
  const deposit = isRecord(value.deposit) ? value.deposit : isRecord(value[legacyDepositKey]) ? value[legacyDepositKey] : null;
  const read = isRecord(value.read) ? value.read : isRecord(value[legacyReadKey]) ? value[legacyReadKey] : null;
  const fit = isRecord(value.fit) ? value.fit : null;
  if (!deposit || !read || !fit) return null;

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
    deposit: {
      summary: coerceString(deposit.summary) || 'n/a',
      metrics: coerceMetrics(deposit.metrics),
      rows: coerceRows(deposit.rows),
      selectedEntries: coerceSelectionEntries(deposit.selectedEntries),
      artifactKinds: coerceChips(deposit.artifactKinds),
    },
    read: {
      summary: coerceString(read.summary) || 'n/a',
      metrics: coerceMetrics(read.metrics),
      rows: coerceRows(read.rows),
      closureCriteria: coerceChips(read.closureCriteria),
      targetKinds: coerceChips(read.targetKinds),
    },
    fit: {
      summary: coerceString(fit.summary) || 'n/a',
      metrics: coerceMetrics(fit.metrics),
      rows: coerceRows(fit.rows),
    },
  };
}

function coerceBitcodeActivityState(value: unknown): TerminalRunDetailSnapshot['bitcodeActivityState'] {
  if (!isRecord(value)) return null;

  const readMeasurement = isRecord(value.readMeasurement)
    ? {
        scenario: isRecord(value.readMeasurement.scenario)
          ? {
              id: coerceString(value.readMeasurement.scenario.id) || 'unselected-scenario',
              label: coerceString(value.readMeasurement.scenario.label) || 'Unselected scenario',
              repo: coerceString(value.readMeasurement.scenario.repo) || '—',
              profile: coerceString(value.readMeasurement.scenario.profile) || 'profile pending',
              selected: Boolean(value.readMeasurement.scenario.selected),
            }
          : {
              id: 'unselected-scenario',
              label: 'Unselected scenario',
              repo: '—',
              profile: 'profile pending',
              selected: false,
            },
        parserKind: coerceString(value.readMeasurement.parserKind) || '—',
        closureCriteriaCount: coerceNumber(value.readMeasurement.closureCriteriaCount) || 0,
        targetKindCount: coerceNumber(value.readMeasurement.targetKindCount) || 0,
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
            ? (coerceString(value.repositoryAnchor.provider) as TerminalRepositoryContextState['provider'])
            : 'github',
        providerAccount: coerceString(value.repositoryAnchor.providerAccount) || 'connected account',
        repository: isRecord(value.repositoryAnchor.repository)
          ? {
              id: coerceString(value.repositoryAnchor.repository.id) || '',
              fullName: coerceString(value.repositoryAnchor.repository.fullName) || '',
              defaultBranch: coerceString(value.repositoryAnchor.repository.defaultBranch) || 'main',
              selectedBranch: coerceString(value.repositoryAnchor.repository.selectedBranch),
              selectedCommit: coerceString(value.repositoryAnchor.repository.selectedCommit),
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

  const legacyDepositWorkbenchKey = `${['gi', 've'].join('')}Workbench`;
  const depositWorkbench =
    coerceDepositReadWorkbenchState(value.depositWorkbench) ||
    coerceDepositReadWorkbenchState(value[legacyDepositWorkbenchKey]);
  const fitWorkbench = coerceDepositReadWorkbenchState(value.fitWorkbench);

  if (!depositWorkbench && !fitWorkbench && !readMeasurement && !supplySelection && !repositoryAnchor) {
    return null;
  }

  return {
    ...(depositWorkbench ? { depositWorkbench } : {}),
    ...(fitWorkbench ? { fitWorkbench } : {}),
    ...(readMeasurement ? { readMeasurement } : {}),
    ...(supplySelection ? { supplySelection } : {}),
    ...(repositoryAnchor ? { repositoryAnchor } : {}),
  };
}

function readAssetPackCompletion(run: Record<string, unknown>) {
  if (isRecord(run.output) && isRecord(run.output.asset_pack_completion)) return run.output.asset_pack_completion;
  if (isRecord(run.output_data) && isRecord(run.output_data.asset_pack_completion)) return run.output_data.asset_pack_completion;
  if (isRecord(run.asset_pack_completion)) return run.asset_pack_completion;
  return null;
}

export function buildTerminalRunDetailFromSelectedRun(
  selectedRun: WorkspaceRun,
  fallbackShippables?: ShippablesDoc | null,
): TerminalRunDetailSnapshot {
  if (selectedRun.sourceModel === 'protocol-projection' && selectedRun.protocolProjectionDetail) {
    return selectedRun.protocolProjectionDetail;
  }

  const fallbackWrittenAssets = buildWrittenAssetSurface(fallbackShippables);
  const fallbackDeliveryMechanism = buildDeliverySurface(fallbackShippables);
  const fallbackPrShippables = buildPullRequestShippableSurface(fallbackShippables);

  return {
    summary: selectedRun.summary || fallbackShippables?.summary || null,
    assetPackSynthesisArtifacts: null,
    writtenAssets: fallbackWrittenAssets,
    shippables: fallbackPrShippables,
    deliveryMechanism: fallbackDeliveryMechanism,
    repoSnapshot: parseRepository(selectedRun.repository, selectedRun.branch),
    processingStats: {
      time: null,
      tokenTotal: selectedRun.tokenTotal ?? null,
      measuredBtd: selectedRun.measuredBtd ?? null,
      btcFeeUsdEquivalent: selectedRun.btcFeeUsdEquivalent ?? null,
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

export function normalizeTerminalRunDetailPayload(
  payload: unknown,
  selectedRun: WorkspaceRun,
  fallbackShippables?: ShippablesDoc | null,
): TerminalRunDetailSnapshot {
  if (!isRecord(payload) || (!isRecord(payload.run) && payload.run !== null)) {
    throw new Error('Invalid run history payload');
  }

  const base = buildTerminalRunDetailFromSelectedRun(selectedRun, fallbackShippables);
  const run = isRecord(payload.run) ? payload.run : null;
  if (!run) return base;

  const assetPackCompletion = readAssetPackCompletion(run);
  const assetPackSynthesisArtifacts =
    coerceShippableSurface(assetPackCompletion?.assetPackSynthesisArtifacts) ||
    coerceShippableSurface(run.asset_pack_synthesis_artifacts) ||
    coerceShippableSurface(run.assetPackSynthesisArtifacts);
  const writtenAssets =
    coerceShippableSurface(assetPackCompletion?.writtenAssets) ||
    assetPackSynthesisArtifacts ||
    coerceShippableSurface(run.written_assets) ||
    base.writtenAssets;
  const deliveryMechanism =
    coerceShippableSurface(assetPackCompletion?.deliveryMechanism) ||
    coerceShippableSurface(run.delivery_mechanism) ||
    coerceShippableSurface(assetPackCompletion?.shippables) ||
    coerceShippableSurface(run.shippables) ||
    base.deliveryMechanism;
  const shippables =
    buildPullRequestShippableSurface(coerceShippableSurface(assetPackCompletion?.shippables)) ||
    buildPullRequestShippableSurface(coerceShippableSurface(run.shippables)) ||
    buildPullRequestShippableSurface(deliveryMechanism) ||
    base.shippables ||
    null;
  const repoSnapshot =
    coerceRepoSnapshot(run.repo_snapshot) || coerceRepoSnapshot(assetPackCompletion?.repoSnapshot) || base.repoSnapshot;
  const closureFollowThrough =
    coerceClosureFollowThrough(assetPackCompletion?.closureFollowThrough) || base.closureFollowThrough;
  const closureState = coerceClosureState(assetPackCompletion?.closurePanels) || base.closureState;
  const bitcodeActivityState =
    coerceBitcodeActivityState(assetPackCompletion?.bitcodeActivityState) || base.bitcodeActivityState;
  const runProcessingStats = coerceProcessingStats(run.processing_stats);
  const assetPackCompletionProcessingStats = coerceProcessingStats(assetPackCompletion?.processingStats);
  const hasRunProcessingStats =
    runProcessingStats.time ||
    runProcessingStats.tokenTotal !== null ||
    runProcessingStats.measuredBtd !== null ||
    runProcessingStats.btcFeeUsdEquivalent !== null ||
    runProcessingStats.averageLatencyMs !== null;
  const processingStats = hasRunProcessingStats ? runProcessingStats : assetPackCompletionProcessingStats;

  return {
    summary:
      coerceString(run.summary) ||
      coerceString(assetPackCompletion?.summary) ||
      base.summary ||
      assetPackSynthesisArtifacts?.summary ||
      writtenAssets?.summary ||
      shippables?.summary ||
      null,
    assetPackSynthesisArtifacts,
    writtenAssets,
    shippables,
    deliveryMechanism,
    repoSnapshot,
    processingStats: {
      time: processingStats.time || base.processingStats.time,
      tokenTotal: processingStats.tokenTotal ?? base.processingStats.tokenTotal,
      measuredBtd: processingStats.measuredBtd ?? base.processingStats.measuredBtd,
      btcFeeUsdEquivalent: processingStats.btcFeeUsdEquivalent ?? base.processingStats.btcFeeUsdEquivalent,
      averageLatencyMs: processingStats.averageLatencyMs ?? base.processingStats.averageLatencyMs,
    },
    proofStatus: base.proofStatus,
    closureFocus: base.closureFocus,
    closureFollowThrough,
    closureState,
    bitcodeActivityState,
    historyItemCount: Array.isArray(run.items) ? run.items.length : base.historyItemCount,
    eventCount: Array.isArray((payload as TerminalRunHistoryPayload).events)
      ? (payload as TerminalRunHistoryPayload).events!.length
      : 0,
  };
}
