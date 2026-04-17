import {
  readApplicationTransactionDetailSection,
  readApplicationTransactionFilters,
  readApplicationTransactionId,
  resetApplicationTransactionFilters,
  writeApplicationTransactionDetailSection,
  writeApplicationTransactionFilters,
  writeApplicationTransactionId,
} from '@/app/application/application-transaction-query';

describe('application-transaction-query', () => {
  it('reads transaction id from current or legacy query carriers', () => {
    expect(readApplicationTransactionId(new URLSearchParams('transactionId=tx-123'))).toBe('tx-123');
    expect(readApplicationTransactionId(new URLSearchParams('runId=legacy-run'))).toBe('legacy-run');
    expect(readApplicationTransactionId(new URLSearchParams(''))).toBeNull();
  });

  it('reads transaction filters from route query params', () => {
    const filters = readApplicationTransactionFilters(
      new URLSearchParams(
        'transactionSearch=proof%20ready&transactionStatus=completed&transactionOwnership=mine&transactionLens=give&transactionRepository=bitcode%2Fbitcode&transactionParticipant=garrett&transactionProof=bounded%20proof%20ready&transactionSort=highest-usd',
      ),
    );

    expect(filters).toEqual({
      searchTerm: 'proof ready',
      status: 'completed',
      ownership: 'mine',
      transactionLens: 'give',
      repository: 'bitcode/bitcode',
      participant: 'garrett',
      proofStatus: 'bounded proof ready',
      sort: 'highest-usd',
    });
  });

  it('reads and writes transaction detail focus through route query state', () => {
    expect(
      readApplicationTransactionDetailSection(new URLSearchParams('transactionDetail=activity')),
    ).toBe('activity');
    expect(readApplicationTransactionDetailSection(new URLSearchParams(''))).toBe('deliverables');

    const nextParams = writeApplicationTransactionDetailSection(
      new URLSearchParams('transactionId=tx-123'),
      'closure',
    );
    expect(nextParams.get('transactionDetail')).toBe('closure');

    const resetToDefault = writeApplicationTransactionDetailSection(nextParams, 'deliverables');
    expect(resetToDefault.get('transactionDetail')).toBeNull();
  });

  it('writes transaction id and removes legacy run id carrier', () => {
    const nextParams = writeApplicationTransactionId(
      new URLSearchParams('runId=legacy-run&provider=github'),
      'tx-456',
    );

    expect(nextParams.get('transactionId')).toBe('tx-456');
    expect(nextParams.get('runId')).toBeNull();
    expect(nextParams.get('provider')).toBe('github');
  });

  it('writes only non-default filters to route query params', () => {
    const nextParams = writeApplicationTransactionFilters(
      new URLSearchParams('transactionId=tx-789&provider=github'),
      {
        searchTerm: 'need pressure',
        status: 'running',
        ownership: 'network',
        transactionLens: 'need',
        repository: 'bitcode/research',
        participant: 'research-partner',
        proofStatus: 'verification in flight',
        sort: 'oldest',
      },
    );

    expect(nextParams.toString()).toContain('transactionId=tx-789');
    expect(nextParams.toString()).toContain('provider=github');
    expect(nextParams.toString()).toContain('transactionSearch=need+pressure');
    expect(nextParams.toString()).toContain('transactionStatus=running');
    expect(nextParams.toString()).toContain('transactionOwnership=network');
    expect(nextParams.toString()).toContain('transactionLens=need');
    expect(nextParams.toString()).toContain('transactionRepository=bitcode%2Fresearch');
    expect(nextParams.toString()).toContain('transactionParticipant=research-partner');
    expect(nextParams.toString()).toContain('transactionProof=verification+in+flight');
    expect(nextParams.toString()).toContain('transactionSort=oldest');
  });

  it('resets all transaction filter query params while preserving selection and external params', () => {
    const resetParams = resetApplicationTransactionFilters(
      new URLSearchParams(
        'transactionId=tx-123&transactionSearch=proof&transactionStatus=completed&transactionOwnership=mine&transactionLens=give&transactionRepository=bitcode%2Fbitcode&transactionParticipant=garrett&transactionProof=bounded%20proof%20ready&transactionSort=highest-usd&provider=github',
      ),
    );

    expect(resetParams.get('transactionId')).toBe('tx-123');
    expect(resetParams.get('provider')).toBe('github');
    expect(resetParams.get('transactionSearch')).toBeNull();
    expect(resetParams.get('transactionStatus')).toBeNull();
    expect(resetParams.get('transactionOwnership')).toBeNull();
    expect(resetParams.get('transactionLens')).toBeNull();
    expect(resetParams.get('transactionRepository')).toBeNull();
    expect(resetParams.get('transactionParticipant')).toBeNull();
    expect(resetParams.get('transactionProof')).toBeNull();
    expect(resetParams.get('transactionSort')).toBeNull();
  });
});
