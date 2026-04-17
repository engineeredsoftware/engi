import type { BitcodeExplainer } from '@/components/base/engi/execution/bitcode-transaction-types';

const sourceReferences = [
  'uapi/app/application/*',
  'uapi/components/base/engi/execution/*',
  'packages/bitcode/public/app.js',
] as const;

const canonReferences = [
  'ENGI_SPEC_V26.md',
  'ENGI_SPEC_V26_DELTA.md',
  'packages/bitcode/V26_APPLICATION_SYSTEMS.md',
] as const;

function buildExplainer(explainer: BitcodeExplainer): BitcodeExplainer {
  return {
    references: {
      source: [...sourceReferences],
      canon: [...canonReferences],
      ...explainer.references,
    },
    ...explainer,
  };
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
  ledgerPulse: buildExplainer({
    kicker: 'At-a-glance read',
    title: 'Pinned operating signals',
    summary:
      'Keep the few live signals that most quickly change operator judgment visible without reopening the deeper source path.',
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
      'Preview the deeper give, need, fit, verification, artifact, settlement, and ledger sections before opening them in the exact source path.',
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
    kicker: 'Exact source path',
    title: 'Lower deterministic flow',
    summary:
      'Open the exact source path when you need the dense deterministic flow from give through settlement, proofs, and ledger continuity.',
    detail:
      'The source path remains available for deep inspection, but it should feel like a deliberate lower-level read rather than the main product surface.',
    points: [
      'Supports deep proof and flow inspection',
      'Keeps the main operator workspace uncluttered',
    ],
  }),
} as const;
