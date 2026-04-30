import type { BitcodeExplainer } from '@/components/base/bitcode/execution/bitcode-transaction-types';

function buildExplainer(explainer: BitcodeExplainer): BitcodeExplainer {
  return explainer;
}

export const BITCODE_PUBLIC_EXPLAINERS = {
  network: buildExplainer({
    kicker: 'Bitcode Exchange',
    title: 'Exchange',
    summary: 'Read the public Bitcode exchange frame where source supply, measured need, settlement posture, and teaching surfaces meet.',
    detail:
      'Use this route when you want the highest-level public view of how Source Shares become measurable technical intelligence before you dive into full detail.',
    points: [
      'Frames Bitcode as the exchange for source-backed technical value',
      'Connects public narrative directly to the mock demo, docs, and full Terminal',
    ],
  }),
  transactions: buildExplainer({
    kicker: 'Live application',
    title: 'Terminal',
    summary: 'Open the full Terminal for proofs, history, and give-to-settle demonstration detail.',
    detail:
      'This is the main operator-grade surface. Use it when you want the full master-detail ledger instead of the public exchange read.',
    points: [
      'Loads selected execution detail, proofs, history, and closure posture',
      'Keeps the mock demonstration readable without requiring live external connectivity',
    ],
  }),
  docs: buildExplainer({
    kicker: 'Teaching surface',
    title: 'Docs',
    summary: 'Read the public Bitcode docs for stepwise explanations, inline widgets, route maps, and the recorded walkthrough.',
    detail:
      'Use this when you want the system taught clearly before moving into the full Terminal route.',
    points: [
      'Keeps walkthroughs and explainers under one documentation area',
      'Preserves pedagogical prose instead of flattening the system into a brochure',
    ],
  }),
  openOrbitals: buildExplainer({
    kicker: 'Identity + interface',
    title: 'Open Auxillaries',
    summary: 'Open the Bitcode auxillary shell for access, profile, interface defaults, and $BTD posture.',
    detail:
      'Use this when you want the auxillary access layer directly. Create Account is for first-time onboarding; Open Auxillaries is for entering the contained shell.',
    points: [
      'Opens the contained auxillary shell',
      'Keeps Auxillaries distinct from Exchange, Terminal, and Docs',
    ],
  }),
  protocolSpec: buildExplainer({
    kicker: 'Protocol reference',
    title: 'Protocol specification',
    summary: 'Read the public Bitcode protocol specification for system semantics, value flow, proofs, and operating posture.',
    detail:
      'This is the reference document for how Bitcode works. It is meant for readers who want the precise model behind the application.',
    points: [
      'Covers system semantics and proof-bearing posture',
      'Useful for partners, researchers, and implementation review',
    ],
  }),
} as const;
