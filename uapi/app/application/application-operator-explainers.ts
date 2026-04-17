import type { BitcodeExplainer } from '@/components/base/engi/execution/bitcode-transaction-types';

function buildExplainer(explainer: BitcodeExplainer): BitcodeExplainer {
  return explainer;
}

export const APPLICATION_OPERATOR_EXPLAINERS = {
  experienceMap: buildExplainer({
    kicker: 'Operator read model',
    title: 'Workspace experience map',
    summary:
      'The operator workspace is organized around one central ledger window, with fullscreen writing and configuration available only when deeper action is needed.',
    detail:
      'Use this map to keep the main reading surface stable: transactions and selected detail stay primary, while conversations and orbitals remain deliberate mode changes instead of parallel destinations.',
    points: [
      'Keeps the ledger and selected transaction central',
      'Treats conversations and orbitals as fullscreen follow-through modes',
      'Keeps Give and Need legible as the two primary actions',
    ],
  }),
  controls: buildExplainer({
    kicker: 'Operator control posture',
    title: 'Controls, guide, and draft state',
    summary:
      'Scenario, projection, branch mode, guide progress, and closure controls stay in one shared operator control surface.',
    detail:
      'This card is where working draft posture becomes resumable. The operator should be able to see the current configuration, reopen the guide, and continue the flow without reconstructing context.',
    points: [
      'Guide progress is resumable instead of one-shot',
      'Scenario, projection, and branch mode remain explicit',
      'Closure control stays adjacent to the active draft state',
    ],
  }),
  needScenarios: buildExplainer({
    kicker: 'Demand framing',
    title: 'Need scenario selection',
    summary:
      'The active demand frame should be explicit and switchable before the operator judges fit, proof, or settlement posture.',
    detail:
      'This surface keeps the currently measured demand visible as a first-class workspace choice. The operator should be able to change the scenario, review parser and target posture, and keep moving without dropping into implementation detail.',
    points: [
      'Keeps the active demand frame explicit',
      'Makes scenario switching part of the main workspace',
      'Preserves continuity into fit and closure reading',
    ],
  }),
  supplyInventory: buildExplainer({
    kicker: 'Give-side inventory',
    title: 'Search and select supply',
    summary:
      'Give-side supply should be searchable, reviewable, and selectable without turning the operator terminal into an infrastructure note.',
    detail:
      'Use this surface to bind the current auth session, narrow the inventory, and keep only the supply you want in the active give draft before moving into deposit, fit, and closure.',
    points: [
      'Keeps searchable supply inside the main operator terminal',
      'Makes selected inventory explicit before deposit drafting',
      'Preserves continuity into the give draft instead of forcing context rebuilds',
    ],
  }),
  depositComposer: buildExplainer({
    kicker: 'Give-side intake',
    title: 'Deposit drafting and submission',
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
      'Supply, demand, and fit should read as one operating chain so the operator can judge why the current transaction is or is not moving forward.',
    detail:
      'This workspace is the short path for understanding what is being offered, what is being measured, and what still blocks a strong fit before closure work begins.',
    points: [
      'Keeps give and need in one workspace read',
      'Makes fit legible before proof and settlement',
      'Supports quick orientation before deeper source-path reading',
    ],
  }),
  closureControls: buildExplainer({
    kicker: 'Closure operation',
    title: 'Run and review closure follow-through',
    summary:
      'Closure work should stay adjacent to the active transaction detail so verification, branch execution, settlement, and ledger follow-through are one continuous operation.',
    detail:
      'This surface is where the operator runs closure, refreshes the current state, and reopens the exact follow-through path without rebuilding context.',
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
      'Use this map to preview the closure sequence, inspect the strongest metrics and rows for each stage, and open the lower runtime detail only when you need deeper proof.',
    points: [
      'Keeps closure stages in one readable sequence',
      'Brings proof and history closer to the operator workspace',
      'Makes exact source-path reads deliberate instead of mandatory',
    ],
  }),
  ledgerPulse: buildExplainer({
    kicker: 'At-a-glance read',
    title: 'Pinned operating signals',
    summary:
      'Keep the few live signals that most quickly change operator judgment visible without reopening the lower runtime detail.',
    detail:
      'These signals should help answer whether the current workspace is moving, blocked, proving, or ready for closure before the operator opens proofs, history, or source-path detail.',
    points: [
      'Keeps high-signal posture close to the ledger',
      'Separates quick reading from deep inspection',
    ],
  }),
  boundaryRuntime: buildExplainer({
    kicker: 'Boundary honesty',
    title: 'External interface readiness',
    summary:
      'Bitcode should show what is live, modeled, boundary-only, or blocked without making operators infer that state from failures later in the flow.',
    detail:
      'Use this read before trusting downstream deliverables or settlement. A healthy operator workspace keeps boundary truth visible and fail-closed.',
    points: [
      'Shows blocked interfaces early',
      'Keeps modeled and live states separate',
      'Supports trust before deeper review',
    ],
  }),
  workspaceMap: buildExplainer({
    kicker: 'Section navigation',
    title: 'Workspace body map',
    summary:
      'Preview the deeper give, need, fit, verification, artifact, settlement, and ledger sections before opening them in the lower runtime detail.',
    detail:
      'The map should act like a readable table of contents for the lower flow, not like an engineering note about implementation layers.',
    points: [
      'Supports quick section discovery',
      'Keeps lower source-path navigation legible',
    ],
  }),
  repositorySupply: buildExplainer({
    kicker: 'Give-side source',
    title: 'Repository supply connection',
    summary:
      'Repository connection and selection make searchable supply explicit before deposit, fit, and closure read the rest of the chain.',
    detail:
      'This is where the operator sets the boundary for give-side supply. It should read as a clean source selection surface, not as infrastructure plumbing.',
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
      'The operator should be able to read the live give-side source, measured need, and fit posture without dropping immediately into lower source-path detail.',
    detail:
      'This is the high-level map of why a repository, demand frame, and fit posture belong together in the active workspace.',
    points: [
      'Give stays tied to searchable supply',
      'Need stays tied to measured demand',
      'Fit stays explicit before proof and settlement',
    ],
  }),
  sourcePath: buildExplainer({
    kicker: 'Lower runtime detail',
    title: 'Deterministic runtime follow-through',
    summary:
      'Open the mounted runtime when you need the dense give-to-settlement follow-through, proofs, or replay detail.',
    detail:
      'This lower runtime remains available for exact inspection, but it should feel like a deliberate follow-through surface rather than the main product experience.',
    points: [
      'Supports deep proof and flow inspection',
      'Keeps the main operator workspace uncluttered',
    ],
  }),
  railModes: buildExplainer({
    kicker: 'Workspace modes',
    title: 'Read here, draft in fullscreen',
    summary:
      'The right rail should keep mode changes obvious without competing with the central transaction window.',
    detail:
      'Use the rail to open conversations or orbitals deliberately, while the ledger and selected transaction remain the primary read surface.',
    points: [
      'Keeps fullscreen drafting deliberate',
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
      'The support rail is for quick orientation only. It should keep the operator anchored while deeper proof, deliverable, and history reading stays in the main detail surface.',
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
      'The rail should make it easy to confirm which transaction is active before you continue reading or switch into a fullscreen mode.',
    detail:
      'This card keeps the transaction id and short summary close at hand so the operator can safely resume work after changing filters, modes, or detail tabs.',
    points: [
      'Prevents context loss while moving around the workspace',
      'Keeps the active transaction obvious',
      'Supports resumable operator work',
    ],
  }),
} as const;
