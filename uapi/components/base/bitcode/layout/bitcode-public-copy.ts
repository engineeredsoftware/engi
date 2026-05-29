export const BITCODE_PUBLIC_COPY = {
  eyebrow: 'Source Shares for measured technical intelligence',
  headline: 'Bitcode is auditable market infrastructure for technical knowledge.',
  description:
    'Bitcode turns code, docs, diagrams, and technical context into Source Shares: tradable, measured intelligence. Contributors deposit source, demand measures value, and proof-backed settlement can allocate $BTD to the people and rights behind useful work.',
  capabilityChips: [
    'SOURCE SHARES',
    'TERMINAL',
    'DOCS',
    'MOCKED TERMINAL',
  ],
  primaryCta: {
    href: '/read',
    label: 'Request Read',
  },
  secondaryCta: {
    href: '/docs',
    label: 'Read docs',
  },
  guide: {
    posts: [
      {
        id: 'april-2026',
        tab: 'April',
        title: '$BTD: Shares of Source Technical Knowledge',
        meta: 'April 2026 * Garrett Maring',
        body:
          "April launched the Bitcode Protocol. It is available at our open-source repository which includes a commercially-ready whole-system specification (auditable, reproducible). The website now includes the first pieces of the $BTD Terminal along with documentation on the internals and interfaces of the ecosystem.",
        highlights: ['$BTD', 'Bitcode Protocol', 'Terminal'],
      },
      {
        id: 'march-2026',
        tab: 'March',
        title: "Bitcode's source-to-shares protocol, now",
        meta: 'March 2026 * Garrett Maring',
        body:
          "$BTD's purpose is to hoard valuable technical information and compensate contributors fairly. Provable knowledge measuring algorithms build the foundations for collection and issuance. Ideal long-term partnerships for asset management and infrastructure will be finalized to empower the secure and thriving future of $BTD.",
        highlights: ['$BTD'],
      },
    ],
  },
  terminalPreview: {
    pill: 'Packs',
    kicker: 'Terminal preview',
    rail: ['deposit', 'read', 'settle'],
  },
  operatorFrame: {
    title: 'Bitcode Terminal',
    subtitle: 'proofs, conversations, and auxillaries around one flow',
    badge: 'full detail',
    modes: ['Proofs', 'Conversations', 'Auxillaries', 'Deposit + Read'],
  },
  giveContribution: {
    title: 'Pack supply',
  },
  sourceToSettlement: {
    title: 'Source to settlement',
    subtitle: 'auditable market path',
    badge: '6 stages',
    stages: [
      { number: '01', stage: 'deposit' },
      { number: '02', stage: 'read' },
      { number: '03', stage: 'fit' },
      { number: '04', stage: 'prove' },
      { number: '05', stage: 'settle' },
      { number: '06', stage: 'issue' },
    ],
  },
  footer: {
    steps: ['Deposit', 'Read', 'Settle'],
    guestCta: 'Open Auxillaries',
    userCta: 'Open Auxillaries',
    links: {
      network: 'Packs',
      deposit: 'Deposit',
      read: 'Read',
      transactions: 'Terminal',
      docs: 'Docs',
      github: 'Bitcode on GitHub',
    },
  },
  publicNav: {
    links: [
      { href: '/packs', label: 'Packs' },
      { href: '/deposit', label: 'Deposit' },
      { href: '/read', label: 'Read' },
      { href: '/terminal', label: 'Terminal' },
      { href: '/docs', label: 'Docs' },
    ],
    guestPrimaryCta: 'Open Auxillaries',
    guestSecondaryCta: 'Connect Wallet',
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
