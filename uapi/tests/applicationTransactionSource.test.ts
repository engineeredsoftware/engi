jest.mock('@/config/featureFlags', () => ({
  ENABLE_MOCKS: true,
}));

import {
  resolveApplicationTransactionSource,
  shouldUseReviewFallbackTransactions,
} from '@/app/application/application-transaction-source';
import type { WorkspaceRun } from '@/app/application/application-run-data';

describe('application-transaction-source', () => {
  it('enables review fallback only when live history is empty outside full mock review', () => {
    expect(
      shouldUseReviewFallbackTransactions({
        liveHistoryCount: 0,
        mockMode: false,
      }),
    ).toBe(true);

    expect(
      shouldUseReviewFallbackTransactions({
        liveHistoryCount: 2,
        mockMode: false,
      }),
    ).toBe(false);

    expect(
      shouldUseReviewFallbackTransactions({
        liveHistoryCount: 0,
        mockMode: true,
      }),
    ).toBe(false);
  });

  it('allows explicit mock transaction selection to trigger review fallback even when global mocks are disabled', () => {
    expect(
      shouldUseReviewFallbackTransactions({
        liveHistoryCount: 0,
        mockMode: false,
        selectedTransactionId: 'mock-run-branch-remediation',
        mocksEnabled: false,
      }),
    ).toBe(true);

    expect(
      shouldUseReviewFallbackTransactions({
        liveHistoryCount: 0,
        mockMode: false,
        selectedTransactionId: 'live-run-123',
        mocksEnabled: false,
      }),
    ).toBe(false);
  });

  it('resolves live, review-fallback, and mock-review transaction sources distinctly', () => {
    const liveRuns: WorkspaceRun[] = [
      {
        id: 'live-run-123',
        created_at: '2026-04-16T12:00:00.000Z',
        type: 'pipeline:deliverables',
        status: 'completed',
      },
    ];

    expect(
      resolveApplicationTransactionSource({
        liveRuns,
        mockMode: false,
        selectedTransactionId: null,
        mocksEnabled: false,
      }),
    ).toEqual({
      dataMode: 'live',
      runs: liveRuns,
    });

    expect(
      resolveApplicationTransactionSource({
        liveRuns: [],
        mockMode: false,
        selectedTransactionId: 'mock-run-branch-remediation',
        mocksEnabled: false,
      }),
    ).toMatchObject({
      dataMode: 'review-fallback',
    });

    expect(
      resolveApplicationTransactionSource({
        liveRuns,
        mockMode: true,
        selectedTransactionId: null,
        mocksEnabled: false,
      }),
    ).toMatchObject({
      dataMode: 'mock-review',
    });
  });
});
