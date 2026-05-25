import {
  readTerminalConversationHandoffContext,
  readTerminalDebugEnabled,
  readTerminalEnvironmentMode,
  readTerminalTransactionDetailSection,
  readTerminalTransactionFilters,
  readTerminalTransactionId,
  readTerminalTransactionPagination,
  resetTerminalTransactionFilters,
  shouldRecoverTerminalTransactionRoute,
  writeTerminalDebugEnabled,
  writeTerminalEnvironmentMode,
  writeTerminalTransactionDetailSection,
  writeTerminalTransactionFilters,
  writeTerminalTransactionId,
  writeTerminalTransactionPagination,
} from '@/app/terminal/terminal-transaction-query';

describe('terminal-transaction-query', () => {
  it('reads transaction id from current or former query carriers', () => {
    expect(readTerminalTransactionId(new URLSearchParams('transactionId=tx-123'))).toBe('tx-123');
    expect(readTerminalTransactionId(new URLSearchParams('runId=former-run'))).toBe('former-run');
    expect(readTerminalTransactionId(new URLSearchParams(''))).toBeNull();
  });

  it('reads and writes environment-mode and debug route state', () => {
    expect(readTerminalEnvironmentMode(new URLSearchParams('environmentMode=staging'))).toBe('staging');
    expect(readTerminalEnvironmentMode(new URLSearchParams('environmentMode=invalid'))).toBeNull();
    expect(readTerminalDebugEnabled(new URLSearchParams('bitcodeDebug=1'))).toBe(true);
    expect(readTerminalDebugEnabled(new URLSearchParams(''))).toBe(false);

    const nextParams = writeTerminalEnvironmentMode(
      new URLSearchParams('transactionId=tx-123'),
      'development',
    );
    expect(nextParams.get('environmentMode')).toBe('development');

    const clearedMode = writeTerminalEnvironmentMode(nextParams, null);
    expect(clearedMode.get('environmentMode')).toBeNull();

    const debugParams = writeTerminalDebugEnabled(new URLSearchParams('transactionId=tx-123'), true);
    expect(debugParams.get('bitcodeDebug')).toBe('1');

    const clearedDebug = writeTerminalDebugEnabled(debugParams, false);
    expect(clearedDebug.get('bitcodeDebug')).toBeNull();
  });

  it('reads transaction filters from route query params', () => {
    const filters = readTerminalTransactionFilters(
      new URLSearchParams(
        'transactionSearch=proof%20ready&transactionStatus=completed&transactionOwnership=mine&transactionLens=deposit&transactionRepository=bitcode%2Fbitcode&transactionParticipant=garrett&transactionProof=bounded%20proof%20ready&transactionSort=highest-btc-fee-basis',
      ),
    );

    expect(filters).toEqual({
      searchTerm: 'proof ready',
      status: 'completed',
      ownership: 'mine',
      transactionLens: 'deposit',
      repository: 'bitcode/bitcode',
      participant: 'garrett',
      proofStatus: 'bounded proof ready',
      sort: 'highest-btc-fee-basis',
    });
  });

  it('reads and writes transaction detail focus through route query state', () => {
    expect(
      readTerminalTransactionDetailSection(new URLSearchParams('transactionDetail=activity')),
    ).toBe('activity');
    expect(
      readTerminalTransactionDetailSection(new URLSearchParams('transactionDetail=identity')),
    ).toBe('transaction');
    expect(
      readTerminalTransactionDetailSection(new URLSearchParams('transactionDetail=proofs')),
    ).toBe('proofs');
    expect(
      readTerminalTransactionDetailSection(new URLSearchParams('transactionDetail=history')),
    ).toBe('history');
    expect(
      readTerminalTransactionDetailSection(new URLSearchParams('transactionDetail=journal')),
    ).toBe('journal');
    expect(readTerminalTransactionDetailSection(new URLSearchParams(''))).toBe('shippables');

    const nextParams = writeTerminalTransactionDetailSection(
      new URLSearchParams('transactionId=tx-123'),
      'transaction',
    );
    expect(nextParams.get('transactionDetail')).toBe('transaction');

    const proofsParams = writeTerminalTransactionDetailSection(nextParams, 'proofs');
    expect(proofsParams.get('transactionDetail')).toBe('proofs');

    const journalParams = writeTerminalTransactionDetailSection(proofsParams, 'journal');
    expect(journalParams.get('transactionDetail')).toBe('journal');

    const resetToDefault = writeTerminalTransactionDetailSection(journalParams, 'shippables');
    expect(resetToDefault.get('transactionDetail')).toBeNull();
  });

  it('writes transaction id and removes former run id carrier', () => {
    const nextParams = writeTerminalTransactionId(
      new URLSearchParams('runId=former-run&provider=github'),
      'tx-456',
    );

    expect(nextParams.get('transactionId')).toBe('tx-456');
    expect(nextParams.get('runId')).toBeNull();
    expect(nextParams.get('provider')).toBe('github');
  });

  it('decides when Terminal should recover selected transaction route state', () => {
    expect(
      shouldRecoverTerminalTransactionRoute({
        transactionIds: ['tx-1', 'tx-2'],
        selectedTransactionId: null,
      }),
    ).toBe(true);
    expect(
      shouldRecoverTerminalTransactionRoute({
        transactionIds: ['tx-1', 'tx-2'],
        selectedTransactionId: 'tx-missing',
      }),
    ).toBe(true);
    expect(
      shouldRecoverTerminalTransactionRoute({
        transactionIds: ['tx-1', 'tx-2'],
        selectedTransactionId: 'tx-2',
      }),
    ).toBe(false);
    expect(
      shouldRecoverTerminalTransactionRoute({
        transactionIds: [],
        selectedTransactionId: null,
      }),
    ).toBe(false);
  });

  it('reads source-safe Conversation Terminal handoff route context', () => {
    const context = readTerminalConversationHandoffContext(
      new URLSearchParams(
        'conversationHandoff=1&conversationId=conversation-1&handoffWorkflow=finding_fits&handoffPolicy=allowed&handoffProofRoot=conversation-terminal-handoff%3Aabc123&handoffRepositoryAnchor=engineeredsoftware%2FENGI&handoffSourceSelectors=repository%3Aengineeredsoftware%2FENGI+%7C+commit%3A07de&handoffSummary=Find+fits+from+approved+Need.',
      ),
    );

    expect(context).toEqual({
      present: true,
      conversationId: 'conversation-1',
      workflow: 'finding_fits',
      policy: 'allowed',
      proofRoot: 'conversation-terminal-handoff:abc123',
      repositoryAnchor: 'engineeredsoftware/ENGI',
      sourceSelectors: ['repository:engineeredsoftware/ENGI', 'commit:07de'],
      summary: 'Find fits from approved Need.',
      readingStage: null,
    });
  });

  it('reads source-safe enterprise Reading stage from Conversation handoff route state', () => {
    const context = readTerminalConversationHandoffContext(
      new URLSearchParams(
        'conversationHandoff=1&handoffWorkflow=finding_fits&handoffPolicy=allowed&handoffProofRoot=conversation-terminal-handoff%3Aabc123&readingStage=request-fit',
      ),
    );

    expect(context.readingStage).toBe('request-fit');

    const fallback = readTerminalConversationHandoffContext(
      new URLSearchParams(
        'conversationHandoff=1&handoffWorkflow=finding_fits&handoffPolicy=allowed&handoffProofRoot=conversation-terminal-handoff%3Aabc123&readingStage=raw-source',
      ),
    );

    expect(fallback.readingStage).toBe('request-read');
  });

  it('reads and writes transaction pagination through route query state', () => {
    expect(
      readTerminalTransactionPagination(new URLSearchParams('transactionPage=3&transactionPageSize=25')),
    ).toEqual({
      page: 3,
      pageSize: 25,
    });

    expect(readTerminalTransactionPagination(new URLSearchParams('transactionPage=-1'))).toEqual({
      page: 1,
      pageSize: 10,
    });

    const pagedParams = writeTerminalTransactionPagination(
      new URLSearchParams('transactionId=tx-123&provider=github'),
      { page: 2, pageSize: 50 },
    );

    expect(pagedParams.get('transactionPage')).toBe('2');
    expect(pagedParams.get('transactionPageSize')).toBe('50');

    const resetToDefault = writeTerminalTransactionPagination(pagedParams, { page: 1, pageSize: 10 });
    expect(resetToDefault.get('transactionPage')).toBeNull();
    expect(resetToDefault.get('transactionPageSize')).toBeNull();
  });

  it('writes only non-default filters to route query params', () => {
    const nextParams = writeTerminalTransactionFilters(
      new URLSearchParams('transactionId=tx-789&provider=github'),
      {
        searchTerm: 'read pressure',
        status: 'running',
        ownership: 'network',
        transactionLens: 'read',
        repository: 'bitcode/research',
        participant: 'research-partner',
        proofStatus: 'verification in flight',
        sort: 'oldest',
      },
    );

    expect(nextParams.toString()).toContain('transactionId=tx-789');
    expect(nextParams.toString()).toContain('provider=github');
    expect(nextParams.toString()).toContain('transactionSearch=read+pressure');
    expect(nextParams.toString()).toContain('transactionStatus=running');
    expect(nextParams.toString()).toContain('transactionOwnership=network');
    expect(nextParams.toString()).toContain('transactionLens=read');
    expect(nextParams.toString()).toContain('transactionRepository=bitcode%2Fresearch');
    expect(nextParams.toString()).toContain('transactionParticipant=research-partner');
    expect(nextParams.toString()).toContain('transactionProof=verification+in+flight');
    expect(nextParams.toString()).toContain('transactionSort=oldest');
  });

  it('resets all transaction filter query params while preserving selection and external params', () => {
    const resetParams = resetTerminalTransactionFilters(
      new URLSearchParams(
        'transactionId=tx-123&transactionSearch=proof&transactionStatus=completed&transactionOwnership=mine&transactionLens=deposit&transactionRepository=bitcode%2Fbitcode&transactionParticipant=garrett&transactionProof=bounded%20proof%20ready&transactionSort=highest-btc-fee-basis&transactionPage=3&provider=github',
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
    expect(resetParams.get('transactionPage')).toBeNull();
  });
});
