import type { BitcodeExplainer } from '@/components/base/engi/execution/bitcode-transaction-types';

function buildExplainer(explainer: BitcodeExplainer): BitcodeExplainer {
  return explainer;
}

export const BITCODE_PUBLIC_EXPLAINERS = {
  network: buildExplainer({
    kicker: 'Live network',
    title: 'Network',
    summary: 'Read the live Bitcode network frame where Give, Need, settlement posture, and public teaching surfaces meet.',
    detail:
      'Use this route when you want the highest-level public view of how Bitcode is behaving before you dive into full transaction detail.',
    points: [
      'Frames Bitcode as the live market surface rather than a detached landing page',
      'Connects public narrative directly to transactions, docs, and Auxillaries',
    ],
  }),
  transactions: buildExplainer({
    kicker: 'Live application',
    title: 'Transactions',
    summary: 'Open the full Bitcode transactions surface for proofs, history, conversations, and give-to-settle detail.',
    detail:
      'This is the main operator-grade surface. Use it when you want the real master-detail ledger instead of the public network read.',
    points: [
      'Loads selected transaction detail, proofs, history, and closure posture',
      'Keeps Auxillaries and conversations available around the same transaction flow',
    ],
  }),
  docs: buildExplainer({
    kicker: 'Teaching surface',
    title: 'Docs',
    summary: 'Read the public Bitcode docs for stepwise explanations, inline widgets, route maps, and the recorded walkthrough.',
    detail:
      'Use this when you want the system taught clearly before moving into the live transactions route.',
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
      'Keeps Auxillaries distinct from Network, Transactions, and Docs',
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
