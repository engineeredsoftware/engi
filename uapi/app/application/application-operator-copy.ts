export const APPLICATION_SURFACE_COPY = {
  frame: {
    kicker: 'Frame and orchestration',
    title: 'Operator frame and orchestration',
    summary:
      'Keep the transaction terminal centered while orchestration, runtime posture, and navigation stay visible in shared operator surfaces around it.',
  },
  supply: {
    kicker: 'Give and need systems',
    title: 'Supply, need, and transaction configuration',
    summary:
      'Move from searchable supply into measured need, fit, and transaction configuration without leaving the operator workspace.',
  },
  closure: {
    kicker: 'Closure and provenance',
    title: 'Closure, proofs, and provenance',
    summary:
      'Review verification, branch artifacts, settlement, and ledger continuity in one place, then open the exact source path only when you need it.',
  },
  workspace: {
    emptySelection:
      'Select a Bitcode transaction from the ledger to load its deliverables, proofs, and history.',
    transactionSummaryFallback:
      'Inspect this Bitcode transaction from the central workspace detail.',
  },
  rail: {
    control: {
      kicker: 'Workspace modes',
      title: 'Read here, write in fullscreen',
      summary:
        'Stay in the transaction workspace by default, then open conversations or orbitals when you need fullscreen writing or configuration.',
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
