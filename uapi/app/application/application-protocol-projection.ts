import { buildAgenticExecutionSummary, normalizeAgenticExecutionType } from '@bitcode/api/src/executions/agentic-execution';

import type { BitcodeApplicationShellSnapshot } from './application-shell-bridge';
import type { WorkspaceRun } from './application-run-data';
import type { ApplicationRepositoryContextState } from './application-repository-context';

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

  return 'agentic-execution:branch-artifact';
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
  };
}

export function mergeProtocolProjectedRun(runs: WorkspaceRun[], projectedRun: WorkspaceRun | null) {
  if (!projectedRun) return runs;
  return [projectedRun, ...runs.filter((run) => run.id !== projectedRun.id)];
}
