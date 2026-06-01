export const BITCODE_PUBLIC_COPY = {
  eyebrow: 'AssetPacks for measured technical intelligence',
  headline: 'Bitcode is auditable market infrastructure for technical knowledge.',
  description:
    'Bitcode turns code, docs, diagrams, and technical context into source-safe AssetPack commodities. BTD records scalar knowledge volume and rights, BTC settles value transfer, and proof readback keeps deposit, Reading, delivery, and compensation auditable.',
  capabilityChips: [
    'ASSETPACKS',
    'BTD VOLUME',
    'BTC SETTLEMENT',
    'DOCS',
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
        title: '$BTD: Scalar Volume And Rights For Technical Knowledge',
        meta: 'April 2026 * Garrett Maring',
        body:
          "April launched the Bitcode Protocol. It is available at our open-source repository with auditable, reproducible specification. The website now centers Packs, Deposit, Read, and proof-backed docs for AssetPack commerce.",
        highlights: ['$BTD', 'Bitcode Protocol', 'AssetPacks'],
      },
      {
        id: 'march-2026',
        tab: 'March',
        title: "Bitcode's source-to-AssetPack protocol, now",
        meta: 'March 2026 * Garrett Maring',
        body:
          "$BTD's purpose is to measure technical knowledge volume and rights while BTC settlement compensates contributors fairly. Provable knowledge measuring algorithms build the foundation for source-safe AssetPack deposit, Reading, settlement, and delivery.",
        highlights: ['$BTD', 'BTC settlement'],
      },
    ],
  },
  terminalPreview: {
    pill: 'Packs',
    kicker: 'Activity preview',
    rail: ['deposit', 'read', 'settle'],
  },
  operatorFrame: {
    title: 'Bitcode Reading',
    subtitle: 'deposit, read, proof, settlement, and delivery around one flow',
    badge: 'full detail',
    modes: ['Packs', 'Deposit', 'Read', 'Proofs'],
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
      transactions: 'Packs',
      docs: 'Docs',
      github: 'Bitcode on GitHub',
    },
  },
  publicNav: {
    links: [
      { href: '/packs', label: 'Packs' },
      { href: '/deposit', label: 'Deposit' },
      { href: '/read', label: 'Read' },
      { href: '/docs', label: 'Docs' },
    ],
    guestPrimaryCta: 'Open Auxillaries',
    guestSecondaryCta: 'Connect Wallet',
  },
  guideRoute: {
    eyebrow: 'Bitcode docs',
    heading: 'Learn Bitcode from AssetPacks to proof.',
    body:
      'Docs teaches the complete system in user order: AssetPacks, BTD scalar volume and rights, BTC settlement money, proof readback authority, /deposit, /read, /packs, MCP/API, ChatGPT App, Bitcode Chat, and connected interfaces.',
    checkingVideoTitle: 'Recorded walkthrough',
    checkingVideoBody:
      'Checking the recorded Bitcode walkthrough for inline playback inside the docs.',
    cardTitle: 'Recorded operator walkthrough',
    cardBody:
      'Use the walkthrough when you want the Bitcode flow narrated before you move into Deposit, Read, and Packs.',
    missingVideoTitle: 'Walkthrough',
    missingVideoBody:
      'The recorded walkthrough is being refreshed. Use the docs panels and the Packs activity route while the next capture is published.',
    missingVideoCta: 'Open Packs',
  },
} as const;
