export const TERMINAL_SURFACE_COPY = {
  frame: {
    kicker: 'Operating picture',
    title: 'Bitcode Terminal operating picture',
    summary:
      'Keep Give, Need, recent activity, proofs, and closure posture legible in one Terminal workflow.',
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
      'Select recent Terminal activity to load its asset pack, proofs, and history.',
    transactionSummaryFallback:
      'Inspect this Bitcode activity from the selected Terminal result.',
  },
  rail: {
    control: {
      kicker: 'Adjacent interfaces',
      title: 'Keep Terminal primary',
      summary:
        'Stay in the Bitcode Terminal by default; adjacent interfaces remain available without becoming part of the Terminal workflow.',
    },
    support: {
      kicker: 'Transaction support',
      title: 'Ledger support rail',
      summary:
        'Keep mode, count, and timing context close without pulling attention away from the selected execution and settlement result.',
    },
    focus: {
      kicker: 'Selected transaction focus',
      title: 'Current result anchor',
      summary:
        'Use the rail for orientation and quick facts. Keep deeper reading in the central activity result where asset packs, proofs, and history stay together.',
    },
  },
} as const;

export const TERMINAL_WORKSPACE_COPY = TERMINAL_SURFACE_COPY;
