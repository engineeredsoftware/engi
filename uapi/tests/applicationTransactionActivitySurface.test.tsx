import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationTransactionActivitySurface from '@/app/application/ApplicationTransactionActivitySurface';
import type { WorkspaceRun } from '@/app/application/application-run-data';
import type { ApplicationRunDetailSnapshot } from '@/app/application/application-transaction-detail-snapshot';

jest.mock('@/components/base/bitcode/execution/BitcodeExecutionStreamPanel', () => ({
  __esModule: true,
  default: () => <div data-testid="execution-stream-panel">execution stream</div>,
}));

jest.mock('@/hooks/usePipelineExecution', () => ({
  usePipelineExecution: () => ({
    execution: null,
    events: [],
    latestWorkUpdate: null,
    iterationUpdates: [],
    isLoading: false,
    error: null,
  }),
}));

const selectedRun: WorkspaceRun = {
  id: 'tx-activity-001',
  created_at: '2026-04-16T12:00:00.000Z',
  type: 'agentic-execution:need-measurement',
  status: 'completed',
};

const detail: ApplicationRunDetailSnapshot = {
  summary: 'Normalized detail summary.',
  shippables: null,
  repoSnapshot: null,
  processingStats: null,
  proofStatus: 'proof witness ready',
  closureFocus: 'bounded disclosure',
  closureFollowThrough: null,
  closureState: null,
  bitcodeActivityState: {
    repositoryAnchor: {
      provider: 'github',
      providerAccount: 'bitcode',
      repository: {
        id: 'repo-1',
        fullName: 'bitcode/bitcode',
        defaultBranch: 'main',
        private: true,
        language: 'TypeScript',
        topics: ['bitcode'],
      },
      connection: {
        connected: true,
        valid: true,
        mode: 'live connection',
      },
    },
    giveWorkbench: {
      canonLabel: 'Bitcode active posture',
      projectionPrincipal: 'giver',
      branchMode: 'patch',
      scenarioLabel: 'auth-remediation',
      profileLabel: 'Targeted deposit',
      give: {
        summary: 'Give summary.',
        metrics: [],
        rows: [],
        selectedEntries: [{ id: 'entry-1', label: 'rollback runbook' }],
        artifactKinds: ['runbook (1)'],
      },
      need: {
        summary: 'Need summary.',
        metrics: [],
        rows: [],
        closureCriteria: ['bound issuer auth'],
        targetKinds: ['runbook'],
      },
      fit: {
        summary: 'Fit summary.',
        metrics: [],
        rows: [],
      },
    },
    needMeasurement: {
      scenario: {
        id: 'scenario-1',
        label: 'auth-remediation',
        repo: 'bitcode/bitcode',
        profile: 'Targeted deposit',
        selected: true,
      },
      parserKind: 'benchmark-parser',
      closureCriteriaCount: 2,
      targetKindCount: 3,
    },
    supplySelection: {
      authSessionLabel: 'bitcode/bitcode · 42',
      selectedAuthSessionId: 'session-1',
      selectedKind: 'all',
      searchTerm: 'auth',
      selectedCount: 2,
      filteredCount: 4,
      totalFilteredEntries: 12,
      selectedEntries: [{ id: 'entry-1', title: 'rollback runbook', kind: 'runbook', tags: ['auth'] }],
    },
  },
  historyItemCount: 0,
  eventCount: 0,
};

describe('ApplicationTransactionActivitySurface', () => {
  it('falls back to persisted Bitcode posture when no live stream activity is available', () => {
    render(
      <ApplicationTransactionActivitySurface
        selectedRun={selectedRun}
        detail={detail}
        transactionDataMode="live"
      />,
    );

    expect(screen.getByText('Persisted Bitcode posture')).toBeTruthy();
    expect(screen.getByText('Repository anchor')).toBeTruthy();
    expect(screen.getByText('bitcode/bitcode')).toBeTruthy();
    expect(screen.getByText('Give posture')).toBeTruthy();
    expect(screen.getByText('Give summary.')).toBeTruthy();
    expect(screen.getByText('runbook (1)')).toBeTruthy();
    expect(screen.queryByText('Execution activity and work updates')).toBeNull();
  });
});
