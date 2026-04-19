export const BITCODE_PUBLIC_COPY = {
  eyebrow: 'Network, transactions, docs, and orbitals',
  headline: 'Bitcode is auditable market infrastructure for technical knowledge.',
  description:
    'Bitcode turns repositories, documents, measurements, rights, proofs, and settlement into one auditable market for technical knowledge. Network reads live activity, Transactions follows full give-to-settle detail, Docs teaches the system step by step, and Orbitals shapes interface, identity, and $BTD posture.',
  capabilityChips: [
    'NETWORK',
    'TRANSACTIONS',
    'DOCS',
    'ORBITALS',
  ],
  primaryCta: {
    href: '/application',
    label: 'Open transactions',
  },
  secondaryCta: {
    href: '/docs',
    label: 'Read docs',
  },
  guide: {
    badge: 'Docs',
    title: 'Study the docs before you transact',
    meta: 'Docs hub',
    body:
      'Docs teaches Bitcode step by step with route maps, inline widgets, the walkthrough, and direct links into Network, Transactions, and Orbitals.',
  },
  terminalPreview: {
    pill: 'Network',
    kicker: 'live Bitcode activity',
    rail: ['give', 'need', 'settle'],
  },
  operatorFrame: {
    title: 'Transactions',
    subtitle: 'proofs, conversations, and orbitals around one flow',
    badge: 'full detail',
    modes: ['Proofs', 'Conversations', 'Orbitals', 'Give + Need'],
  },
  giveContribution: {
    title: 'Network supply',
  },
  sourceToSettlement: {
    title: 'Source to settlement',
    subtitle: 'auditable market path',
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
    guestCta: 'Open Orbitals',
    userCta: 'Open Orbitals',
    links: {
      network: 'Network',
      transactions: 'Transactions',
      docs: 'Docs',
      bluesky: 'Bitcode on Bluesky',
    },
  },
  publicNav: {
    links: [
      { href: '/', label: 'Network' },
      { href: '/application', label: 'Transactions' },
      { href: '/docs', label: 'Docs' },
    ],
    guestPrimaryCta: 'Open Orbitals',
    guestSecondaryCta: 'Create Account',
  },
  guideRoute: {
    eyebrow: 'Bitcode docs',
    heading: 'Study Bitcode step by step.',
    body:
      'Docs teaches the system step by step with route maps, inline widgets, the recorded walkthrough, and direct links into live Network, Transactions, and Orbitals.',
    checkingVideoTitle: 'Recorded walkthrough',
    checkingVideoBody:
      'Checking the recorded Bitcode walkthrough for inline playback inside the docs.',
    cardTitle: 'Recorded operator walkthrough',
    cardBody:
      'Use the walkthrough when you want the Bitcode flow narrated before you move into live transactions.',
    missingVideoTitle: 'Walkthrough',
    missingVideoBody:
      'The recorded walkthrough is being refreshed. Use the docs panels and the transactions surface while the next capture is published.',
    missingVideoCta: 'Open transactions',
  },
} as const;
