export const BITCODE_PUBLIC_COPY = {
  eyebrow: 'Transactions terminal, conversations, and orbitals',
  headline: 'Bitcode is the transactions terminal for engineering value.',
  description:
    'Give contributes searchable supply. Need narrows measurable demand. Transactions keep proofs, history, conversations, and orbitals attached to one operational frame.',
  capabilityChips: [
    'TRANSACTIONS TERMINAL',
    'CONVERSATIONS',
    'ORBITALS',
    'PROOF CLOSURE',
  ],
  primaryCta: {
    href: '/application',
    label: 'Open transactions terminal',
  },
  secondaryCta: {
    href: '/demo-video',
    label: 'Review operator guide',
  },
  guide: {
    badge: 'Guide',
    title: 'Start with the transactions terminal',
    meta: 'resumable flow',
    body:
      'Give contributes supply, Need selects demand, and transactions keep proofs, history, conversations, and orbitals attached to the same operator frame.',
  },
  terminalPreview: {
    pill: 'Transactions terminal',
    kicker: 'operator frame',
    rail: ['give', 'need', 'settle'],
  },
  operatorFrame: {
    title: 'Operator frame',
    subtitle: 'transactions, conversations, and orbitals',
    badge: 'shared frame',
    modes: ['Transactions', 'Conversations', 'Orbitals', 'Give + Need'],
  },
  giveContribution: {
    title: 'Give contribution',
  },
  sourceToSettlement: {
    title: 'Source to settlement',
    subtitle: 'user-facing value path',
    badge: '6 stages',
    stages: [
      { number: '01', stage: 'give' },
      { number: '02', stage: 'measure' },
      { number: '03', stage: 'fit' },
      { number: '04', stage: 'prove' },
      { number: '05', stage: 'settle' },
      { number: '06', stage: 'issue' },
    ],
  },
  footer: {
    steps: ['Give', 'Need', 'Settle'],
    guestCta: 'Access Workspace',
    userCta: 'Open Orbitals fullscreen',
    links: {
      application: 'Transactions terminal',
      guide: 'Operator guide',
      bluesky: 'Bitcode on Bluesky',
    },
  },
  publicNav: {
    links: [
      { href: '/application', label: 'Transactions terminal' },
      { href: '/demo-video', label: 'Operator guide' },
    ],
    guestPrimaryCta: 'Access Workspace',
    guestSecondaryCta: 'Create Account',
  },
  guideRoute: {
    eyebrow: 'Recorded operator guide',
    heading: 'Review the Bitcode operator guide.',
    body:
      'This stable guide URL keeps the recorded operator walkthrough available while live transactions, conversations, and orbitals stay accessible through the Bitcode workspace.',
    checkingVideoTitle: 'Operator guide',
    checkingVideoBody:
      'Checking the recorded Bitcode operator guide for inline playback.',
    cardTitle: 'Review Bitcode operator flow',
    cardBody:
      'Give, need, transactions, conversations, orbitals, and shipping captured in one recorded operator session.',
    missingVideoTitle: 'Operator guide',
    missingVideoBody:
      'The recorded operator guide is being refreshed. Continue in the transactions terminal while the next captured walkthrough is published.',
    missingVideoCta: 'Open transactions terminal',
  },
} as const;
