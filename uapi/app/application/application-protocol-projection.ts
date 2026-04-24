import { buildAgenticExecutionSummary, normalizeAgenticExecutionType } from '@bitcode/api/src/executions/agentic-execution';

import type { BitcodeApplicationShellSnapshot } from './application-shell-bridge';
import { normalizeApplicationGiveNeedWorkbench } from './application-give-need-workbench';
import { normalizeApplicationNeedScenarios } from './application-need-scenarios';
import type { ApplicationRepositoryContextState } from './application-repository-context';
import type { WorkspaceRun } from './application-run-data';
import { normalizeApplicationSupplySelection } from './application-supply-selection';
import type { ApplicationRunDetailSnapshot } from './application-transaction-detail-snapshot';

function normalizeWhitespace(value?: string | null) {
  return value?.trim() || '';
}

function parseRepository(value?: string | null) {
  const normalized = normalizeWhitespace(value);
  if (!normalized) return null;
  const candidate = normalized.split('·')[0]?.trim() || normalized;
  const [org, repo] = candidate.split('/', 2);
  if (!org || !repo) return null;
  return { fullName: `${org}/${repo}`, org, repo };
}

function readRepository(snapshot: BitcodeApplicationShellSnapshot, repositoryContext?: ApplicationRepositoryContextState | null) {
  return (
    parseRepository(repositoryContext?.selectedRepository?.fullName) ||
    parseRepository(snapshot?.authSession?.repo) ||
    parseRepository(snapshot?.scenario?.repo) ||
    parseRepository(snapshot?.depositingSurface?.repoSupplyRef)
  );
}

function readType(snapshot: BitcodeApplicationShellSnapshot) {
  if (snapshot?.closureSurface) {
    return 'agentic-execution:proof-refresh';
  }

  if (
    normalizeWhitespace(snapshot?.fitSurface?.fitSummary) ||
    normalizeWhitespace(snapshot?.fitSurface?.proofIntentSummary) ||
    normalizeWhitespace(snapshot?.fitSurface?.settlementIntentSummary)
  ) {
    return 'agentic-execution:proof-refresh';
  }

  if (
    normalizeWhitespace(snapshot?.needingSurface?.needSummary) ||
    normalizeWhitespace(snapshot?.needingSurface?.taskSummary) ||
    normalizeWhitespace(snapshot?.needingSurface?.parserKind)
  ) {
    return 'agentic-execution:need-measurement';
  }

  return 'agentic-execution:asset-pack';
}

function readSummary(snapshot: BitcodeApplicationShellSnapshot, repositoryLabel: string, scenarioLabel: string, canonicalType: string) {
  if (normalizeWhitespace(snapshot?.closureSurface?.settlement?.settlementIntentSummary)) {
    return normalizeWhitespace(snapshot?.closureSurface?.settlement?.settlementIntentSummary);
  }
  if (normalizeWhitespace(snapshot?.fitSurface?.fitSummary)) {
    return normalizeWhitespace(snapshot?.fitSurface?.fitSummary);
  }
  if (normalizeWhitespace(snapshot?.needingSurface?.needSummary)) {
    return normalizeWhitespace(snapshot?.needingSurface?.needSummary);
  }
  if (normalizeWhitespace(snapshot?.depositingSurface?.depositIntentSummary)) {
    return normalizeWhitespace(snapshot?.depositingSurface?.depositIntentSummary);
  }

  if (canonicalType === 'agentic-execution:need-measurement') {
    return `Live Bitcode need measurement for ${scenarioLabel}.`;
  }
  if (canonicalType === 'agentic-execution:proof-refresh') {
    return `Live Bitcode fit, proof, and settlement posture for ${scenarioLabel}.`;
  }
  return `Live Bitcode share-making posture for ${repositoryLabel}.`;
}

function readItemCount(snapshot: BitcodeApplicationShellSnapshot) {
  if (typeof snapshot?.inventory?.selectedCount === 'number' && snapshot.inventory.selectedCount > 0) {
    return snapshot.inventory.selectedCount;
  }
  if (typeof snapshot?.closureSurface?.settlement?.proofFamilyCount === 'number') {
    return snapshot.closureSurface.settlement.proofFamilyCount;
  }
  if (typeof snapshot?.repoSupplySummary?.candidateAssetCount === 'number') {
    return snapshot.repoSupplySummary.candidateAssetCount;
  }
  return 0;
}

export function buildProtocolProjectedWorkspaceRun(
  snapshot: BitcodeApplicationShellSnapshot,
  repositoryContext?: ApplicationRepositoryContextState | null,
): WorkspaceRun | null {
  if (!snapshot) return null;

  const projectedDetail = buildProtocolProjectedRunDetail(snapshot, repositoryContext);
  if (!projectedDetail) return null;

  const repository = readRepository(snapshot, repositoryContext);
  const scenarioLabel =
    normalizeWhitespace(snapshot?.scenario?.scenarioFamily) ||
    normalizeWhitespace(snapshot?.scenario?.scenarioId) ||
    'current Bitcode scenario';
  const repositoryLabel = repository?.fullName || 'current Bitcode supply boundary';
  const canonicalType = normalizeAgenticExecutionType(readType(snapshot));
  const agenticExecution = buildAgenticExecutionSummary({ type: canonicalType, status: 'running' });
  const providerAccount =
    normalizeWhitespace(repositoryContext?.connectionStatus?.username) ||
    normalizeWhitespace(repositoryContext?.connectionStatus?.metadata?.account) ||
    normalizeWhitespace(snapshot?.authSession?.installationAccountLogin) ||
    'connected account';
  const branch =
    normalizeWhitespace(repositoryContext?.selectedRepository?.defaultBranch) ||
    normalizeWhitespace(snapshot?.authSession?.defaultRef) ||
    'main';
  const projectionSeed = [repositoryLabel, scenarioLabel, canonicalType].join('::').replace(/[^a-zA-Z0-9:_-]+/g, '-');

  return {
    id: `protocol-live-posture::${projectionSeed}`,
    created_at: new Date().toISOString(),
    type: canonicalType,
    agentic_execution: agenticExecution,
    status: 'running',
    sourceModel: 'protocol-projection',
    summary: readSummary(snapshot, repositoryLabel, scenarioLabel, canonicalType),
    repository: repository?.fullName || null,
    branch,
    participant: providerAccount,
    isOwnTransaction: true,
    transactionLens: agenticExecution.lens,
    itemCount: readItemCount(snapshot),
    proofStatus: agenticExecution.proofStatus,
    closureFocus: agenticExecution.closureFocus,
    protocolProjectionDetail: projectedDetail,
  };
}

export function buildProtocolProjectedRunDetail(
  snapshot: BitcodeApplicationShellSnapshot,
  repositoryContext?: ApplicationRepositoryContextState | null,
): ApplicationRunDetailSnapshot | null {
  if (!snapshot) return null;

  const repository = readRepository(snapshot, repositoryContext);
  const scenarioLabel =
    normalizeWhitespace(snapshot?.scenario?.scenarioFamily) ||
    normalizeWhitespace(snapshot?.scenario?.scenarioId) ||
    'current Bitcode scenario';
  const repositoryLabel = repository?.fullName || 'current Bitcode supply boundary';
  const canonicalType = normalizeAgenticExecutionType(readType(snapshot));
  const agenticExecution = buildAgenticExecutionSummary({ type: canonicalType, status: 'running' });
  const providerAccount =
    normalizeWhitespace(repositoryContext?.connectionStatus?.username) ||
    normalizeWhitespace(repositoryContext?.connectionStatus?.metadata?.account) ||
    normalizeWhitespace(snapshot?.authSession?.installationAccountLogin) ||
    'connected account';
  const branch =
    normalizeWhitespace(repositoryContext?.selectedRepository?.defaultBranch) ||
    normalizeWhitespace(snapshot?.authSession?.defaultRef) ||
    'main';
  const workbench = normalizeApplicationGiveNeedWorkbench(snapshot, repositoryContext);
  const needScenarios = normalizeApplicationNeedScenarios(snapshot);
  const activeScenario =
    needScenarios?.scenarios.find((scenario) => scenario.selected) || needScenarios?.scenarios[0] || null;
  const supplySelection = normalizeApplicationSupplySelection(snapshot);
  const selectedAuthSession =
    supplySelection?.authSessions.find((session) => session.selected) || supplySelection?.authSessions[0] || null;

  return {
    summary: readSummary(snapshot, repositoryLabel, scenarioLabel, canonicalType),
    deliverables: null,
    writtenAssets: null,
    deliveryMechanism: null,
    repoSnapshot: repository
      ? {
          org: repository.org,
          repo: repository.repo,
          branch,
          commit: '',
        }
      : null,
    processingStats: {
      time: null,
      tokenTotal: null,
      btdUsed: null,
      usdTotal: null,
      averageLatencyMs: null,
    },
    proofStatus: agenticExecution.proofStatus,
    closureFocus: agenticExecution.closureFocus,
    closureFollowThrough: null,
    closureState: null,
    bitcodeActivityState:
      workbench || activeScenario || supplySelection || repository
        ? {
            ...(workbench && canonicalType === 'agentic-execution:proof-refresh' ? { fitWorkbench: workbench } : {}),
            ...(workbench && canonicalType !== 'agentic-execution:proof-refresh' ? { giveWorkbench: workbench } : {}),
            ...(needScenarios && activeScenario
              ? {
                  needMeasurement: {
                    scenario: activeScenario,
                    parserKind: needScenarios.parserKind,
                    closureCriteriaCount: needScenarios.closureCriteriaCount,
                    targetKindCount: needScenarios.targetKindCount,
                  },
                }
              : {}),
            ...(supplySelection
              ? {
                  supplySelection: {
                    authSessionLabel: selectedAuthSession?.label || 'No auth session',
                    selectedAuthSessionId: supplySelection.selectedAuthSessionId,
                    selectedKind: supplySelection.selectedKind,
                    searchTerm: supplySelection.searchTerm,
                    selectedCount: supplySelection.selectedCount,
                    filteredCount: supplySelection.filteredCount,
                    totalFilteredEntries: supplySelection.totalFilteredEntries,
                    selectedEntries: supplySelection.filteredEntries
                      .filter((entry) => entry.selected)
                      .map((entry) => ({
                        id: entry.id,
                        title: entry.title,
                        kind: entry.kind,
                        tags: entry.tags,
                      })),
                  },
                }
              : {}),
            ...(repository || repositoryContext || providerAccount
              ? {
                  repositoryAnchor: {
                    provider: repositoryContext?.provider || 'github',
                    providerAccount,
                    repository: repository
                      ? {
                          id: repositoryContext?.selectedRepository?.id || repository.fullName,
                          fullName: repository.fullName,
                          defaultBranch: branch,
                          private: Boolean(repositoryContext?.selectedRepository?.private),
                          language: repositoryContext?.selectedRepository?.language || null,
                          topics: repositoryContext?.selectedRepository?.topics || [],
                        }
                      : null,
                    connection: {
                      connected: Boolean(repositoryContext?.connectionStatus?.connected),
                      valid: Boolean(repositoryContext?.connectionStatus?.valid),
                      mode: repositoryContext?.connectionStatus?.metadata?.mock_mode ? 'mock review' : 'live connection',
                    },
                  },
                }
              : {}),
          }
        : null,
    historyItemCount: readItemCount(snapshot),
    eventCount: 0,
  };
}

export function mergeProtocolProjectedRun(runs: WorkspaceRun[], projectedRun: WorkspaceRun | null) {
  if (!projectedRun) return runs;
  return [projectedRun, ...runs.filter((run) => run.id !== projectedRun.id)];
}
