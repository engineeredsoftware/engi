import { ENABLE_MOCKS } from '@/config/featureFlags';
import type { TransactionDataMode } from '@/components/base/bitcode/execution/bitcode-transaction-types';

import { isMockWorkspaceRunId, MOCK_RUNS, type WorkspaceRun } from './application-run-data';

export type ApplicationTransactionDataMode = TransactionDataMode;

type ReviewFallbackOptions = {
  liveHistoryCount: number;
  mockMode: boolean;
  selectedTransactionId?: string | null;
  mocksEnabled?: boolean;
};

export function shouldUseReviewFallbackTransactions({
  liveHistoryCount,
  mockMode,
  selectedTransactionId,
  mocksEnabled = ENABLE_MOCKS,
}: ReviewFallbackOptions) {
  return !mockMode && liveHistoryCount === 0 && (mocksEnabled || isMockWorkspaceRunId(selectedTransactionId));
}

type ResolveTransactionSourceOptions = {
  liveRuns: WorkspaceRun[];
  mockMode: boolean;
  selectedTransactionId?: string | null;
  mocksEnabled?: boolean;
};

export function resolveApplicationTransactionSource({
  liveRuns,
  mockMode,
  selectedTransactionId,
  mocksEnabled = ENABLE_MOCKS,
}: ResolveTransactionSourceOptions): {
  dataMode: ApplicationTransactionDataMode;
  runs: WorkspaceRun[];
} {
  if (mockMode) {
    return {
      dataMode: 'mock-review',
      runs: MOCK_RUNS,
    };
  }

  if (
    shouldUseReviewFallbackTransactions({
      liveHistoryCount: liveRuns.length,
      mockMode,
      selectedTransactionId,
      mocksEnabled,
    })
  ) {
    return {
      dataMode: 'review-fallback',
      runs: MOCK_RUNS,
    };
  }

  return {
    dataMode: 'live',
    runs: liveRuns,
  };
}
