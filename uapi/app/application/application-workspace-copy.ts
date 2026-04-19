export const APPLICATION_WORKSPACE_COPY = {
  frame: {
    kicker: 'Operating picture',
    title: 'Transactions, modes, and orchestration',
    summary:
      'Keep transactions centered while orchestration, runtime posture, and navigation stay visible in shared Bitcode surfaces around them.',
  },
  supply: {
    kicker: 'Give and need systems',
    title: 'Supply, need, and transaction posture',
    summary:
      'Move from searchable supply into measured need, fit, and transaction posture without leaving the main transactions surface.',
  },
  closure: {
    kicker: 'Closure and provenance',
    title: 'Closure, proofs, and provenance',
    summary:
      'Review verification, branch artifacts, settlement, and ledger continuity in one place, then continue into the exact closure stage only when you need deeper proof.',
  },
  workspace: {
    emptySelection:
      'Select a Bitcode transaction from the ledger to load its deliverables, proofs, and history.',
    transactionSummaryFallback:
      'Inspect this Bitcode transaction from the central transaction detail.',
  },
  rail: {
    control: {
      kicker: 'Reading modes',
      title: 'Read here, open deeper modes when needed',
      summary:
        'Stay in transactions by default, then open conversations or Orbitals when you need deeper writing or interface changes.',
    },
    support: {
      kicker: 'Transaction support',
      title: 'Ledger support rail',
      summary:
        'Keep mode, count, and timing context close to the ledger without pulling attention away from the central transaction detail.',
    },
    focus: {
      kicker: 'Selected transaction focus',
      title: 'Current detail anchor',
      summary:
        'Use the rail for orientation and quick facts. Keep the deeper reading work in the central transaction detail where deliverables, proofs, and history stay together.',
    },
  },
} as const;
