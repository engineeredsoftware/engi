import type { BitcodeExplainer } from '@/components/base/engi/execution/bitcode-transaction-types';

function buildExplainer(explainer: BitcodeExplainer): BitcodeExplainer {
  return explainer;
}

export const BITCODE_PUBLIC_EXPLAINERS = {
  transactionsTerminal: buildExplainer({
    kicker: 'Public entry',
    title: 'Transactions terminal',
    summary: 'Open the live Bitcode operator workspace for Give, Need, transactions, conversations, proofs, and Orbitals.',
    detail:
      'This is the main operating surface. Use it when you want the real master-detail frame instead of a recorded walkthrough.',
    points: [
      'Opens the shared operator workspace',
      'Keeps transactions, conversations, proofs, and Orbitals in one frame',
    ],
  }),
  operatorGuide: buildExplainer({
    kicker: 'Recorded walkthrough',
    title: 'Operator guide',
    summary: 'Review the captured Bitcode operator flow before you step into the live transactions terminal.',
    detail:
      'The guide is resumable and public. It is useful when you want the sequence explained first and the live workspace second.',
    points: [
      'Shows Give, Need, transactions, and Orbitals in one walkthrough',
      'Falls back cleanly when refreshed media is not yet bundled',
    ],
  }),
  accessWorkspace: buildExplainer({
    kicker: 'Guest entry',
    title: 'Access Workspace',
    summary: 'Open the Bitcode access shell and continue into the live operator workspace.',
    detail:
      'Use this when you want the application directly. Create Account is for first-time onboarding; Access Workspace is for entering the operating shell.',
    points: [
      'Opens the contained access shell',
      'Keeps the public route lightweight while preserving live entry',
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
