import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import ApplicationTransactionClosureCard from '@/app/application/ApplicationTransactionClosureCard';
import ApplicationTransactionHistoryCard from '@/app/application/ApplicationTransactionHistoryCard';
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
          onOpenVerification={onOpenVerification}
          onOpenBranch={onOpenBranch}
          onOpenSettlement={onOpenSettlement}
        />
        <ApplicationTransactionProofsCard
          proofFamilies={[
            {
              label: 'selection-materialization',
              artifactPath: '.engi/selection-and-materialization-proof.json',
              theoremStatus: 'passed',
              replayArtifacts: '3',
            },
          ]}
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
          onOpenHistory={onOpenHistory}
        />
      </div>,
    );

    expect(screen.getByText('Closure posture')).toBeTruthy();
    expect(screen.getByText('Proof families')).toBeTruthy();
    expect(screen.getByText('History')).toBeTruthy();
    expect(screen.getByText('selection-materialization')).toBeTruthy();
    expect(screen.getByText('run-001')).toBeTruthy();

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
