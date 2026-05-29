import type { BitcodeExplainer } from '@/components/base/bitcode/execution/bitcode-transaction-types';

function buildExplainer(explainer: BitcodeExplainer): BitcodeExplainer {
  return explainer;
}

export const BITCODE_PUBLIC_EXPLAINERS = {
  network: buildExplainer({
    kicker: 'Bitcode Packs',
    title: 'Packs',
    summary: 'Read pack activity where source supply, measured reads, settlement posture, compensation, delivery, and repair state meet.',
    detail:
      'Use this route when you need the activity master-detail view for AssetPack proposals, admitted packs, previews, proof roots, settlement, and delivery state.',
    points: [
      'Searches and filters source-safe pack activity',
      'Keeps proof and settlement detail expandable without exposing unpaid source',
    ],
  }),
  transactions: buildExplainer({
    kicker: 'Live Terminal',
    title: 'Terminal',
    summary: 'Open the full Terminal for proofs, history, and deposit-to-settle detail.',
    detail:
      'This is the main operator-grade surface. Use it when you want to prepare Deposit and Read work, then read recent Terminal activity results, proofs, and history.',
    points: [
      'Loads selected execution detail, proofs, history, and closure posture',
      'Keeps mocked launch-mode state readable without requiring live external connectivity',
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
      'Use this when you want the auxillary access layer directly. Connect Wallet is for first-time wallet identity and onboarding; Open Auxillaries is for entering the contained shell.',
    points: [
      'Opens the contained auxillary shell',
      'Keeps Auxillaries distinct from Packs, Terminal, and Docs',
    ],
  }),
  protocolSpec: buildExplainer({
    kicker: 'Protocol reference',
    title: 'Protocol specification',
    summary: 'Read the public Bitcode protocol specification for system semantics, value flow, proofs, and operating posture.',
    detail:
      'This is the reference document for how Bitcode works. It is meant for readers who want the precise model behind the protocol and commercial interfaces.',
    points: [
      'Covers system semantics and proof-bearing posture',
      'Useful for partners, researchers, and implementation review',
    ],
  }),
} as const;
