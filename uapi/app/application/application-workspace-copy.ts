export const APPLICATION_SURFACE_COPY = {
  frame: {
    kicker: 'Operating picture',
    title: 'Bitcode Terminal, modes, and orchestration',
    summary:
      'Keep the Bitcode Terminal centered while orchestration, runtime posture, and navigation stay visible in shared Bitcode surfaces around it.',
  },
  supply: {
    kicker: 'Give and need systems',
    title: 'Supply, need, and asset-pack posture',
    summary:
      'Move from searchable supply into measured need, fit, and asset-pack settlement posture without leaving the Bitcode Terminal.',
  },
  closure: {
    kicker: 'Closure and provenance',
    title: 'Closure, proofs, and provenance',
    summary:
      'Review verification, branch artifacts, asset-pack settlement, and ledger continuity in one place, then continue into the exact closure stage only when you need deeper proof.',
  },
  detail: {
    emptySelection:
      'Select Bitcode activity from the ledger to load its asset pack, proofs, and history.',
    transactionSummaryFallback:
      'Inspect this Bitcode activity from the central Bitcode Terminal detail.',
  },
  rail: {
    control: {
      kicker: 'Reading modes',
      title: 'Read here, open deeper modes when needed',
      summary:
        'Stay in the Bitcode Terminal by default, then open conversations or Auxillaries when you need deeper writing or interface changes.',
    },
    support: {
      kicker: 'Transaction support',
      title: 'Ledger support rail',
      summary:
        'Keep mode, count, and timing context close to the ledger without pulling attention away from the central execution and settlement detail.',
    },
    focus: {
      kicker: 'Selected transaction focus',
      title: 'Current detail anchor',
      summary:
        'Use the rail for orientation and quick facts. Keep the deeper reading work in the central activity detail where asset packs, proofs, and history stay together.',
    },
  },
} as const;

export const APPLICATION_WORKSPACE_COPY = APPLICATION_SURFACE_COPY;
