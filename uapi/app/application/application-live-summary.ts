import type { ApplicationRepositoryContextState } from './application-repository-context';
import { getProviderLabel, getRepositoryInventorySourceLabel } from './application-repository-context';
import type { BitcodeTransactionReadiness } from './bitcode-transaction-readiness';

export type ApplicationLiveSummaryItem = {
  label: string;
  value: string;
};

type SummarySurfaceItem = {
  label?: string | null;
  value?: string | null;
};

type ShellSnapshot = {
  summarySurface?: SummarySurfaceItem[] | null;
} | null;

type ApplicationLiveSummaryInput = {
  transactionReadiness?: Pick<BitcodeTransactionReadiness, 'label' | 'canSettle' | 'canTransact'> | null;
  repositoryContext?: Pick<
    ApplicationRepositoryContextState,
    'provider' | 'connectionStatus' | 'inventorySource' | 'selectedRepository'
  > | null;
};

export function normalizeApplicationLiveSummary(snapshot: ShellSnapshot): ApplicationLiveSummaryItem[] {
  return (snapshot?.summarySurface || [])
    .map((item) => {
      const label = String(item?.label || '').trim();
      const value = String(item?.value || '').trim();
      if (!label) return null;
      return {
        label,
        value: value || '—',
      };
    })
    .filter((item): item is ApplicationLiveSummaryItem => Boolean(item));
}

function buildSettlementPostureValue(
  transactionReadiness?: ApplicationLiveSummaryInput['transactionReadiness'],
) {
  if (!transactionReadiness) return 'syncing';
  if (transactionReadiness.canSettle) return 'signed settlement ready';
  if (transactionReadiness.label === 'repository reconnect required') return 'repository reconnect required';
  if (transactionReadiness.label === 'wallet reconnect required') return 'wallet reconnect required';
  if (transactionReadiness.canTransact) return 'draft-only';
  return 'review-only';
}

function buildRepositoryPostureValue(
  repositoryContext?: ApplicationLiveSummaryInput['repositoryContext'],
) {
  if (!repositoryContext) return 'syncing';

  const providerLabel = getProviderLabel(repositoryContext.provider);
  const inventoryLabel = getRepositoryInventorySourceLabel(repositoryContext.inventorySource);

  if (!repositoryContext.connectionStatus?.connected) {
    return `${providerLabel} pending`;
  }

  if (!repositoryContext.connectionStatus.valid) {
    return `${providerLabel} reconnect required · ${inventoryLabel}`;
  }

  return `${providerLabel} connected · ${inventoryLabel}`;
}

function buildRepositoryAnchorValue(
  repositoryContext?: ApplicationLiveSummaryInput['repositoryContext'],
) {
  if (!repositoryContext) return 'syncing';
  return repositoryContext.selectedRepository?.fullName || 'anchor pending';
}

export function buildApplicationReadinessSummary(
  input: ApplicationLiveSummaryInput,
): ApplicationLiveSummaryItem[] {
  return [
    {
      label: 'Settlement posture',
      value: buildSettlementPostureValue(input.transactionReadiness),
    },
    {
      label: 'Repository posture',
      value: buildRepositoryPostureValue(input.repositoryContext),
    },
    {
      label: 'Repository anchor',
      value: buildRepositoryAnchorValue(input.repositoryContext),
    },
  ];
}

export function buildApplicationLiveSummary(
  snapshot: ShellSnapshot,
  input: ApplicationLiveSummaryInput,
): ApplicationLiveSummaryItem[] {
  const readinessItems = buildApplicationReadinessSummary(input);
  const summaryItems = normalizeApplicationLiveSummary(snapshot);
  const merged = [...readinessItems];

  for (const item of summaryItems) {
    if (merged.some((existingItem) => existingItem.label === item.label)) {
      continue;
    }
    merged.push(item);
  }

  return merged;
}
