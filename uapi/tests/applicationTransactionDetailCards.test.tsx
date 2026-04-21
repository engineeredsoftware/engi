import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import ApplicationTransactionClosureCard from '@/app/application/ApplicationTransactionClosureCard';
import ApplicationTransactionHistoryCard from '@/app/application/ApplicationTransactionHistoryCard';
import ApplicationTransactionIdentityCard from '@/app/application/ApplicationTransactionIdentityCard';
import ApplicationTransactionProofsCard from '@/app/application/ApplicationTransactionProofsCard';

describe('application transaction detail cards', () => {
  it('renders closure, proofs, and history as distinct transaction detail carriers', () => {
    const onOpenVerification = jest.fn();
    const onOpenBranch = jest.fn();
    const onOpenSettlement = jest.fn();
    const onOpenHistory = jest.fn();

    render(
      <div>
        <ApplicationTransactionClosureCard
          rows={[
            { label: 'Proof posture', value: 'proof witness ready' },
            { label: 'Closure focus', value: 'bounded disclosure' },
          ]}
          settlementMetrics={[
            { label: 'Credited assets', value: '2' },
            { label: 'Participating assets', value: '3' },
          ]}
          branchArtifacts={['BITCODE_NEED.md']}
          payload={{
            closure: {
              rows: [
                { label: 'Proof posture', value: 'proof witness ready' },
                { label: 'Closure focus', value: 'bounded disclosure' },
              ],
              settlementMetrics: [
                { label: 'Credited assets', value: '2' },
                { label: 'Participating assets', value: '3' },
              ],
              branchArtifacts: ['BITCODE_NEED.md'],
            },
          }}
          onOpenVerification={onOpenVerification}
          onOpenBranch={onOpenBranch}
          onOpenSettlement={onOpenSettlement}
        />
        <ApplicationTransactionIdentityCard
          startedAt="Apr 17, 10:45 AM"
          rows={[
            { label: 'Transaction id', value: 'txn-001' },
            { label: 'Status', value: 'completed' },
          ]}
          payload={{
            transaction: {
              id: 'txn-001',
              status: 'completed',
            },
          }}
        />
        <ApplicationTransactionProofsCard
          proofFamilies={[
            {
              label: 'selection-materialization',
              artifactPath: '.bitcode/selection-and-materialization-proof.json',
              theoremStatus: 'passed',
              replayArtifacts: '3',
            },
          ]}
          payload={{
            proofFamilies: [
              {
                label: 'selection-materialization',
                artifactPath: '.bitcode/selection-and-materialization-proof.json',
              },
            ],
          }}
          onOpenVerification={onOpenVerification}
          onOpenSettlement={onOpenSettlement}
        />
        <ApplicationTransactionHistoryCard
          recentHistory={[
            {
              label: 'run-001',
              summary: 'bitcode/bitcode · bitcode/auth-rollback · completed · credited 2',
            },
          ]}
          payload={{
            recentHistory: [
              {
                label: 'run-001',
                summary: 'bitcode/bitcode · bitcode/auth-rollback · completed · credited 2',
              },
            ],
          }}
          onOpenHistory={onOpenHistory}
        />
      </div>,
    );

    expect(screen.getByText('Closure posture')).toBeTruthy();
    expect(screen.getByText('Selected transaction')).toBeTruthy();
    expect(screen.getByText('Proof families')).toBeTruthy();
    expect(screen.getByText('History')).toBeTruthy();
    expect(screen.getAllByText('Structured payload shape').length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText('selection-materialization').length).toBeGreaterThan(0);
    expect(screen.getAllByText('run-001').length).toBeGreaterThan(0);

    const closureCard = screen
      .getByText('Closure summary, settlement, and branch follow-through')
      .closest('div.rounded-\\[1\\.5rem\\]');
    const proofsCard = screen
      .getByText('Bounded proof stays in transaction detail')
      .closest('div.rounded-\\[1\\.5rem\\]');

    expect(closureCard).toBeTruthy();
    expect(proofsCard).toBeTruthy();

    fireEvent.click(within(closureCard as HTMLElement).getByRole('button', { name: 'Raw JSON' }));
    expect(screen.getByText(/"settlementMetrics"/)).toBeTruthy();

    fireEvent.click(within(proofsCard as HTMLElement).getByRole('button', { name: 'Raw JSON' }));
    expect(screen.getByText(/"proofFamilies"/)).toBeTruthy();

    fireEvent.click(within(closureCard as HTMLElement).getByRole('button', { name: 'Visual' }));
    fireEvent.click(within(proofsCard as HTMLElement).getByRole('button', { name: 'Visual' }));

    fireEvent.click(screen.getAllByRole('button', { name: 'Open verification' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Open settlement' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Open history' }));
    fireEvent.click(screen.getByRole('button', { name: 'Open branch' }));

    expect(onOpenVerification).toHaveBeenCalled();
    expect(onOpenSettlement).toHaveBeenCalled();
    expect(onOpenHistory).toHaveBeenCalled();
    expect(onOpenBranch).toHaveBeenCalled();
  });
});
