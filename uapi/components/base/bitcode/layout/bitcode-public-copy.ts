export const BITCODE_PUBLIC_COPY = {
  eyebrow: 'Source Shares for measured technical intelligence',
  headline: 'Bitcode is auditable market infrastructure for engineering knowledge.',
  description:
    'Bitcode turns code, docs, diagrams, and technical context into Source Shares: tradable, measured intelligence. Contributors deposit source, demand measures value, and proof-backed settlement can allocate $BTD to the people and rights behind useful work.',
  capabilityChips: [
    'SOURCE SHARES',
    'TERMINAL',
    'DOCS',
    'MOCKED TERMINAL',
  ],
  primaryCta: {
    href: '/application',
    label: 'Open Terminal',
  },
  secondaryCta: {
    href: '/docs',
    label: 'Read docs',
  },
  guide: {
    badge: 'Docs',
    title: 'Study Bitcode before you operate',
    meta: 'Docs hub',
    body:
      'Docs teaches Bitcode from zero to hero: Source Shares, Exchange state, Terminal actions, proofs, settlement, interfaces, and launch-mode readiness.',
  },
  terminalPreview: {
    pill: 'Exchange',
    kicker: 'Terminal preview',
    rail: ['give', 'need', 'settle'],
  },
  operatorFrame: {
    title: 'Bitcode Terminal',
    subtitle: 'proofs, conversations, and auxillaries around one flow',
    badge: 'full detail',
    modes: ['Proofs', 'Conversations', 'Auxillaries', 'Give + Need'],
  },
  giveContribution: {
    title: 'Exchange supply',
  },
  sourceToSettlement: {
    title: 'Source to settlement',
    subtitle: 'auditable market path',
    badge: '6 stages',
    stages: [
      { number: '01', stage: 'give' },
      { number: '02', stage: 'need' },
      { number: '03', stage: 'fit' },
      { number: '04', stage: 'prove' },
      { number: '05', stage: 'settle' },
      { number: '06', stage: 'issue' },
    ],
  },
  footer: {
    steps: ['Give', 'Need', 'Settle'],
    guestCta: 'Open Auxillaries',
    userCta: 'Open Auxillaries',
    links: {
      network: 'Exchange',
      transactions: 'Terminal',
      docs: 'Docs',
      github: 'Bitcode on GitHub',
    },
  },
  publicNav: {
    links: [
      { href: '/', label: 'Exchange' },
      { href: '/application', label: 'Terminal' },
      { href: '/docs', label: 'Docs' },
    ],
    guestPrimaryCta: 'Open Auxillaries',
    guestSecondaryCta: 'Create Account',
  },
  guideRoute: {
    eyebrow: 'Bitcode docs',
    heading: 'Learn Bitcode from Source Shares to proof.',
    body:
      'Docs teaches the complete system in user order: Source Shares, Exchange, Terminal, proofs, settlement, Auxillaries, MCP/API, ChatGPT App, and connected interfaces.',
    checkingVideoTitle: 'Recorded walkthrough',
    checkingVideoBody:
      'Checking the recorded Bitcode walkthrough for inline playback inside the docs.',
    cardTitle: 'Recorded operator walkthrough',
    cardBody:
      'Use the walkthrough when you want the Bitcode flow narrated before you move into the Bitcode Terminal.',
    missingVideoTitle: 'Walkthrough',
    missingVideoBody:
      'The recorded walkthrough is being refreshed. Use the docs panels and the Bitcode Terminal while the next capture is published.',
    missingVideoCta: 'Open Bitcode Terminal',
  },
} as const;
