import type { BitcodeExplainer } from '@/components/base/bitcode/execution/bitcode-transaction-types';

function buildExplainer(explainer: BitcodeExplainer): BitcodeExplainer {
  return explainer;
}

export const APPLICATION_SURFACE_EXPLAINERS = {
  experienceMap: buildExplainer({
    kicker: 'Bitcode Terminal read model',
    title: 'Bitcode Terminal experience map',
    summary:
      'The Bitcode Terminal is organized around one central ledger window, with dedicated writing and auxillary modes available only when deeper action is needed.',
    detail:
      'Use this map to keep the main Bitcode Terminal reading surface stable: transactions and selected detail stay primary, while conversations and Auxillaries remain deliberate mode changes instead of parallel destinations.',
    points: [
      'Keeps the ledger and selected transaction central',
      'Treats conversations and Auxillaries as deliberate follow-through modes',
      'Keeps Give and Need legible as the two primary actions',
    ],
  }),
  controls: buildExplainer({
    kicker: 'Flow control posture',
    title: 'Controls, flow guide, and working posture',
    summary:
      'Scenario, projection, branch mode, guide progress, and closure controls stay in one shared control surface.',
    detail:
      'This card is where the working flow becomes resumable. You should be able to see the current posture, reopen the guide, and continue without reconstructing context.',
    points: [
      'Guide progress is resumable instead of one-shot',
      'Scenario, projection, and branch mode remain explicit',
      'Closure control stays adjacent to the active working posture',
    ],
  }),
  needScenarios: buildExplainer({
    kicker: 'Demand framing',
    title: 'Need scenario selection',
    summary:
      'The active demand frame should be explicit and switchable before you judge fit, proof, or settlement posture.',
    detail:
      'This surface keeps the currently measured demand visible as a first-class transaction choice. You should be able to change the scenario, review parser and target posture, and keep moving without dropping into execution plumbing.',
    points: [
      'Keeps the active demand frame explicit',
      'Makes scenario switching part of the Bitcode Terminal',
      'Preserves continuity into fit and closure reading',
    ],
  }),
  supplyInventory: buildExplainer({
    kicker: 'Give-side inventory',
    title: 'Search and select supply',
    summary:
      'Give-side supply should be searchable, reviewable, and selectable without turning transactions into an infrastructure note.',
    detail:
      'Use this surface to bind the current auth session, narrow the inventory, and keep only the supply you want in the active give draft before moving into deposit, fit, and closure.',
    points: [
      'Keeps searchable supply inside the Bitcode Terminal',
      'Makes selected inventory explicit before deposit drafting',
      'Preserves continuity into the give draft instead of forcing context rebuilds',
    ],
  }),
  depositComposer: buildExplainer({
    kicker: 'Give-side intake',
    title: 'Deposit flow and submission',
    summary:
      'A give-side deposit should read like a resumable working draft built from selected supply, not like infrastructure plumbing.',
    detail:
      'Use this surface to bind selected supply, add issuer and provenance overrides where needed, and submit a deposit while keeping the rest of the working chain coherent.',
    points: [
      'Treats deposit as a resumable working draft',
      'Keeps selected supply and issuer continuity visible',
      'Feeds directly into fit, proof, and settlement follow-through',
    ],
  }),
  giveNeedChain: buildExplainer({
    kicker: 'Operating chain',
    title: 'Give, need, and fit in one read',
    summary:
      'Supply, demand, and fit should read as one operating chain so you can judge why the current transaction is or is not moving forward.',
    detail:
      'The Bitcode Terminal is the short path for understanding what is being offered, what is being measured, and what still blocks a strong fit before closure work begins.',
    points: [
      'Keeps give and need in one transactions read',
      'Makes fit legible before proof and settlement',
      'Supports quick orientation before opening the exact proof view',
    ],
  }),
  closureControls: buildExplainer({
    kicker: 'Closure operation',
    title: 'Run and review closure follow-through',
    summary:
      'Closure work should stay adjacent to the active transaction detail so verification, branch execution, settlement, and ledger follow-through are one continuous operation.',
    detail:
      'This surface is where you run closure, refresh the current state, and reopen the exact follow-through path without rebuilding context.',
    points: [
      'Keeps closure controls near the active transaction',
      'Makes refresh and reset explicit instead of hidden',
      'Preserves continuity into verification, branch, settlement, and ledger reads',
    ],
  }),
  closureMap: buildExplainer({
    kicker: 'Closure reading',
    title: 'Verification, branch, settlement, and ledger map',
    summary:
      'Closure should read as one sequence from verification through ledger continuity rather than as isolated panels.',
    detail:
      'Use this map to preview the closure sequence, inspect the strongest metrics and rows for each stage, and open the exact proof view only when you need deeper proof.',
    points: [
      'Keeps closure stages in one readable sequence',
      'Brings proof and history closer to the Bitcode Terminal',
      'Makes exact-detail reads deliberate instead of mandatory',
    ],
  }),
  ledgerPulse: buildExplainer({
    kicker: 'At-a-glance read',
    title: 'Pinned operating signals',
    summary:
      'Keep the few live signals that most quickly change your judgment visible without reopening the exact proof view.',
    detail:
      'These signals should help answer whether the current transaction chain is moving, blocked, proving, or ready for closure before you open proofs, history, or source-path detail.',
    points: [
      'Keeps high-signal posture close to the ledger',
      'Separates quick reading from deep inspection',
    ],
  }),
  boundaryRuntime: buildExplainer({
    kicker: 'Boundary honesty',
    title: 'External interface readiness',
    summary:
      'Bitcode should show what is live, modeled, boundary-only, or blocked without making you infer that state from failures later in the flow.',
    detail:
      'Use this read before trusting downstream deliverables or settlement. A healthy Bitcode Terminal keeps boundary truth visible and fail-closed.',
    points: [
      'Shows blocked interfaces early',
      'Keeps modeled and live states separate',
      'Supports trust before deeper review',
    ],
  }),
  activityMap: buildExplainer({
    kicker: 'Section navigation',
    title: 'Bitcode Terminal activity map',
    summary:
      'Preview the deeper give, need, fit, verification, artifact, settlement, and ledger sections before opening them in the exact proof view.',
    detail:
      'The map should act like a readable table of contents for the lower Bitcode Terminal flow, not like an internal engineering note.',
    points: [
      'Supports quick section discovery',
      'Keeps exact-detail navigation legible',
    ],
  }),
  repositorySupply: buildExplainer({
    kicker: 'Give-side source',
    title: 'Repository supply connection',
    summary:
      'Repository connection and selection make searchable supply explicit before deposit, fit, and closure read the rest of the chain.',
    detail:
      'This is where you set the boundary for give-side supply. It should read as a clean source selection surface, not as infrastructure plumbing.',
    points: [
      'Anchors give-side supply to one repository boundary',
      'Keeps provider posture visible',
      'Supports continuing straight into deposit and need',
    ],
  }),
  supplyFit: buildExplainer({
    kicker: 'Give and need map',
    title: 'Supply, need, and fit overview',
    summary:
      'You should be able to read the live give-side source, measured need, and fit posture without dropping immediately into the exact proof view.',
    detail:
      'This is the high-level map of why a repository, demand frame, and fit posture belong together in the active Bitcode Terminal.',
    points: [
      'Give stays tied to searchable supply',
      'Need stays tied to measured demand',
      'Fit stays explicit before proof and settlement',
    ],
  }),
  sourcePath: buildExplainer({
    kicker: 'Closure runtime',
    title: 'Proof and settlement runtime',
    summary:
      'Open the runtime when you need the dense give-to-settlement follow-through, proofs, or replay detail.',
    detail:
      'This runtime remains available for inspection, but it should feel like a deliberate follow-through surface rather than the main product experience.',
    points: [
      'Supports deep proof and flow inspection',
      'Keeps the Bitcode Terminal uncluttered',
    ],
  }),
  railModes: buildExplainer({
    kicker: 'Reading modes',
    title: 'Read here, open deeper modes when needed',
    summary:
      'The right rail should keep mode changes obvious without competing with the central transaction window.',
    detail:
      'Use the rail to open conversations or Auxillaries deliberately, while the ledger and selected transaction remain the primary read surface.',
    points: [
      'Keeps deeper drafting deliberate',
      'Avoids splitting attention away from the transaction window',
      'Preserves orientation when switching modes',
    ],
  }),
  railSupport: buildExplainer({
    kicker: 'Support context',
    title: 'Keep key transaction context close',
    summary:
      'Mode, count, timing, and selected-transaction support should stay nearby without replacing the central reading work.',
    detail:
      'The support rail is for quick orientation only. It should keep you anchored while deeper proof, deliverable, and history reading stays in the main detail surface.',
    points: [
      'Supports quick orientation without duplication',
      'Keeps the main reading surface primary',
      'Makes selected transaction context easy to recover',
    ],
  }),
  railFocus: buildExplainer({
    kicker: 'Selected detail anchor',
    title: 'Reconfirm the active transaction',
    summary:
      'The rail should make it easy to confirm which transaction is active before you continue reading or switch into a dedicated mode.',
    detail:
      'This card keeps the transaction id and short summary close at hand so you can safely resume work after changing filters, modes, or detail tabs.',
    points: [
      'Prevents context loss while moving around the Bitcode Terminal',
      'Keeps the active transaction obvious',
      'Supports resumable work',
    ],
  }),
} as const;

export const APPLICATION_WORKSPACE_EXPLAINERS = APPLICATION_SURFACE_EXPLAINERS;
