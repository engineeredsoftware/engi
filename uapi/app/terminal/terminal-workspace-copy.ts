export const TERMINAL_SURFACE_COPY = {
  frame: {
    kicker: 'Overview',
    title: 'Overview and recent activity',
    summary:
      'Start from recent Terminal activity, readiness, and adjacent interfaces before moving into Giving, Needing, proofs, and finalities.',
  },
  supply: {
    kicker: 'Giving',
    title: 'Giving: source supply and deposit',
    summary:
      'Bind the live GitHub repository inventory, choose the source supply, and compose the give-side deposit before any Need match is evaluated.',
  },
  need: {
    kicker: 'Needing',
    title: 'Needing: measured demand and fit',
    summary:
      'Select the need frame after Giving is explicit, then read fit posture against the current repository supply.',
  },
  closure: {
    kicker: 'Proofs, finalities, and misc.',
    title: 'Proofs, finalities, and provenance',
    summary:
      'Review verification, branch artifacts, asset-pack settlement, ledger continuity, and deeper witness detail only after Giving and Needing are in place.',
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
