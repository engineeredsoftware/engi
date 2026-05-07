import type { BitcodeExplainer } from '@/components/base/bitcode/execution/bitcode-transaction-types';

function buildExplainer(explainer: BitcodeExplainer): BitcodeExplainer {
  return explainer;
}

const APPLICATION_CANON_REFS = [
  'BITCODE_SPEC_V26.md § Fifth-gate exhaustive acceptance matrix',
  'BITCODE_SPEC_V26.md § Fifth-gate closure work packages',
  'BITCODE_SPEC_V26_PARITY_MATRIX.md § Fifth-gate exhaustive acceptance parity matrix',
] as const;

const TERMINAL_SOURCE_REFS = [
  'uapi/app/application/ApplicationPageClient.tsx',
  'uapi/app/application/application-activity-history.ts',
  'uapi/components/base/bitcode/execution/BitcodeInlineExplainer.tsx',
  'protocol-demonstration/public/app.js',
] as const;

export const APPLICATION_SURFACE_EXPLAINERS = {
  experienceMap: buildExplainer({
    kicker: 'Bitcode Terminal operator model',
    title: 'Bitcode Terminal experience map',
    summary:
      'The Bitcode Terminal is the primary operator surface for Give, Need, closure, and recent activity results, while Exchange owns the market-wide master-detail view.',
    detail:
      'Use this map to keep the main Bitcode Terminal working surface stable: Give, Need, recent activity, and selected results stay primary, while conversations and Auxillaries remain deliberate mode changes instead of parallel destinations, and every one of those reads stays grounded in Bitcode Exchange state and Bitcode Protocol canon.',
    points: [
      'Keeps the ledger and selected activity central',
      'Treats conversations and Auxillaries as deliberate follow-through modes',
      'Keeps Give and Need legible as the two primary actions',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationExperienceFrame.tsx',
      ],
      canon: [
        ...APPLICATION_CANON_REFS,
        'BITCODE_SPEC_V26.md § Fifth-gate minimum-functional north star',
      ],
    },
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
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationCommandDeck.tsx',
        'uapi/app/application/ApplicationFlowGuideCard.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  needScenarios: buildExplainer({
    kicker: 'Need measurement',
    title: 'Need measurement selection',
    summary:
      'The active needer demand frame should be explicit and switchable before you judge fit, proof, or settlement posture.',
    detail:
      'This surface keeps the currently measured demand visible as a first-class Bitcode choice. You should be able to change the scenario, review parser and target posture, and keep moving without dropping into execution plumbing.',
    points: [
      'Keeps the active demand frame explicit',
      'Makes scenario switching part of the Bitcode Terminal',
      'Preserves continuity into fit and closure reading',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationNeedScenarioPanel.tsx',
        'uapi/app/application/application-need-scenarios.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
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
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationSupplySelectionPanel.tsx',
        'uapi/app/application/application-supply-selection.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
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
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationDepositComposer.tsx',
        'uapi/app/api/deposits/route.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  giveNeedChain: buildExplainer({
    kicker: 'Operating chain',
    title: 'Give, need, and fit in one read',
    summary:
      'Supply, need measurement, and fit should read as one operating chain so you can judge why the current Bitcode activity is or is not moving forward.',
    detail:
      'The Bitcode Terminal is the short path for understanding what is being offered, what is being measured, and what still blocks a strong fit before closure work begins.',
    points: [
      'Keeps give and need in one Bitcode Terminal read',
      'Makes asset-pack fit legible before proof and settlement',
      'Supports quick orientation before opening the exact proof view',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationGiveNeedWorkbench.tsx',
        'uapi/app/application/ApplicationActionWorkbenchCard.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  closureControls: buildExplainer({
    kicker: 'Closure operation',
    title: 'Run and review closure follow-through',
    summary:
      'Closure work should stay adjacent to the active Bitcode activity detail so verification, branch execution, settlement, and ledger follow-through are one continuous operation.',
    detail:
      'This surface is where you run closure, refresh the current state, and reopen the exact follow-through path without rebuilding context.',
    points: [
      'Keeps closure controls near the active activity',
      'Makes refresh and reset explicit instead of hidden',
      'Preserves continuity into Need review, verification, branch, settlement, and ledger reads',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationClosureControlDeck.tsx',
        'uapi/app/application/application-closure-controls.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  closureMap: buildExplainer({
    kicker: 'Closure reading',
    title: 'Need review, branch, settlement, and ledger map',
    summary:
      'Closure should read as one sequence from reviewable Need admission through source-to-shares settlement and ledger continuity rather than as isolated panels.',
    detail:
      'Use this map to preview the review-to-settlement sequence, inspect the strongest metrics and rows for each stage, and open the exact proof view only when you need deeper proof.',
    points: [
      'Keeps Need review and closure stages in one readable sequence',
      'Brings proof and history closer to the Bitcode Terminal',
      'Makes fit-quality and exact-detail reads deliberate instead of mandatory',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationTransactionDetailSurface.tsx',
        'uapi/app/application/application-transaction-detail-snapshot.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  ledgerPulse: buildExplainer({
    kicker: 'At-a-glance read',
    title: 'Pinned operating signals',
    summary:
      'Keep the few live signals that most quickly change your judgment visible without reopening the exact proof view.',
    detail:
      'These signals should help answer whether the current Bitcode activity chain is moving, blocked, proving, or ready for closure before you open proofs, history, or source-path detail.',
    points: [
      'Keeps high-signal posture close to the ledger',
      'Separates quick reading from deep inspection',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationTransactionActivitySurface.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  boundaryRuntime: buildExplainer({
    kicker: 'Boundary honesty',
    title: 'External interface readiness',
    summary:
      'Bitcode should show what is live, modeled, boundary-only, or blocked without making you infer that state from failures later in the flow.',
    detail:
      'Use this read before trusting downstream asset packs or settlement. A healthy Bitcode Terminal keeps Bitcode Exchange boundary truth visible, makes third-party connections and attachments legible as ingress/input context, and stays aligned with Bitcode Protocol fail-closed rules.',
    points: [
      'Shows blocked interfaces early',
      'Keeps modeled and live states separate',
      'Supports trust before deeper review',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationExternalInterfacingPanel.tsx',
        'uapi/app/auxillaries/components/AuxillariesConnectsPane.tsx',
      ],
      canon: [
        ...APPLICATION_CANON_REFS,
        'BITCODE_SPEC_V26.md § Auxillaries transactional readiness',
      ],
    },
  }),
  activityMap: buildExplainer({
    kicker: 'Section navigation',
    title: 'Bitcode Terminal activity map',
    summary:
      'Preview the deeper give, need, fit, verification, artifact, settlement, and ledger sections before opening them in the exact proof view.',
    detail:
      'The map should act like a readable table of contents for the lower Bitcode Terminal flow so you can move from recent activity results into Bitcode Protocol proof without losing context, not like an internal engineering note.',
    points: [
      'Supports quick section discovery',
      'Keeps exact-detail navigation legible',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationTransactionWorkspace.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
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
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationRepositoryContextPanel.tsx',
        'uapi/app/application/application-repository-context.ts',
      ],
      canon: [
        ...APPLICATION_CANON_REFS,
        'BITCODE_SPEC_V26.md § Repository and VCS boundary',
      ],
    },
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
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationGiveNeedWorkbench.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
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
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationTransactionDetailSurface.tsx',
        'uapi/app/application/ApplicationSourcePathPanel.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  railModes: buildExplainer({
    kicker: 'Reading modes',
    title: 'Read here, open deeper modes when needed',
    summary:
      'The right rail should keep mode changes obvious without competing with the recent activity result window.',
    detail:
      'Use the rail to open conversations or Auxillaries deliberately, while recent activity and the selected result remain the primary Terminal read surface.',
    points: [
      'Keeps deeper drafting deliberate',
      'Avoids splitting attention away from recent activity results',
      'Preserves orientation when switching modes',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationSupportRail.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  railSupport: buildExplainer({
    kicker: 'Support context',
    title: 'Keep key activity context close',
    summary:
      'Mode, count, timing, and selected-activity support should stay nearby without replacing the central reading work.',
    detail:
      'The support rail is for quick orientation only. It should keep you anchored while deeper proof, asset-pack, and history reading stays in the main detail surface.',
    points: [
      'Supports quick orientation without duplication',
      'Keeps the main reading surface primary',
      'Makes selected activity context easy to recover',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationSupportRail.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  railFocus: buildExplainer({
    kicker: 'Selected detail anchor',
    title: 'Reconfirm the active activity',
    summary:
      'The rail should make it easy to confirm which activity is active before you continue reading or switch into a dedicated mode.',
    detail:
      'This card keeps the activity id and short summary close at hand so you can safely resume work after changing filters, modes, or detail tabs.',
    points: [
      'Prevents context loss while moving around the Bitcode Terminal',
      'Keeps the active activity obvious',
      'Supports resumable work',
    ],
    references: {
      source: [
        ...TERMINAL_SOURCE_REFS,
        'uapi/app/application/ApplicationSupportRail.tsx',
        'uapi/app/application/ApplicationSelectedActivityCard.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
} as const;

export const APPLICATION_WORKSPACE_EXPLAINERS = APPLICATION_SURFACE_EXPLAINERS;

export const APPLICATION_INLINE_EXPLAINERS = {
  readWindow: buildExplainer({
    title: 'Read window',
    summary:
      'The main Bitcode Terminal read window is recent activity plus the selected Terminal result, not the Exchange master-detail table.',
    detail:
      'Exchange owns the market-wide master-detail loop. Terminal keeps a focused read/write loop for recent Give, Need, proof, and closure results; deeper proof, conversation, and auxillary surfaces should remain deliberate follow-through rather than parallel primaries.',
    references: {
      source: [
        'uapi/app/application/ApplicationExperienceFrame.tsx',
        ...TERMINAL_SOURCE_REFS,
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  writePosture: buildExplainer({
    title: 'Write posture',
    summary:
      'Give, need, and transactional follow-through are the active write posture of the Bitcode Terminal.',
    detail:
      'This is where click-based and chat-based write paths meet. Conversations can draft, but the ledger-facing write posture still belongs to give, need, deposit, branch, and closure so writes land in Bitcode Exchange and remain auditable against Bitcode Protocol canon.',
    references: {
      source: [
        'uapi/app/application/ApplicationExperienceFrame.tsx',
        'uapi/app/conversations/components/ConversationsOverlay.tsx',
        ...TERMINAL_SOURCE_REFS,
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  scenario: buildExplainer({
    title: 'Scenario',
    summary:
      'Scenario chooses the currently measured need or operating frame that the rest of the Bitcode flow should honor.',
    detail:
      'Changing the scenario should immediately change what give, fit, branch, and closure are reasoning against. It is not a cosmetic filter.',
    references: {
      source: [
        'uapi/app/application/ApplicationCommandDeck.tsx',
        'uapi/app/application/ApplicationNeedScenarioPanel.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  projection: buildExplainer({
    title: 'Projection',
    summary:
      'Projection determines how the current Bitcode flow is read and staged before materialization.',
    detail:
      'It keeps the operator honest about whether the terminal is previewing, staging, or readying a stronger materialized posture.',
    references: {
      source: ['uapi/app/application/ApplicationCommandDeck.tsx'],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  branchMode: buildExplainer({
    title: 'Branch mode',
    summary:
      'Branch mode sets the exact AssetPack execution posture that the terminal will materialize when you commit the flow.',
    detail:
      'This keeps branch creation as a visible Bitcode decision with direct settlement and proof consequences instead of a hidden runtime default.',
    references: {
      source: [
        'uapi/app/application/ApplicationCommandDeck.tsx',
        'uapi/app/application/ApplicationClosureControlDeck.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  transactionReadiness: buildExplainer({
    title: 'Transaction readiness',
    summary:
      'Transaction readiness is the shared operator contract for wallet identity, verified signing access, repository scope, and anchor posture.',
    detail:
      'When readiness is incomplete, review continuity can stay open but branch, deposit, and closure should fail closed. Manual wallet identity can still support drafting, but signed settlement stays staged until verified wallet-provider access is present. This explainer should always describe the exact blocker set because signed-transaction posture is a Bitcode Exchange precondition taught by Bitcode Protocol canon.',
    references: {
      source: [
        'uapi/app/application/bitcode-transaction-readiness.ts',
        'uapi/app/application/ApplicationCommandDeck.tsx',
        'uapi/app/application/ApplicationDepositComposer.tsx',
        'uapi/app/application/ApplicationClosureControlDeck.tsx',
        'uapi/app/auxillaries/components/AuxillariesConnectsPane.tsx',
      ],
      canon: [
        ...APPLICATION_CANON_REFS,
        'BITCODE_SPEC_V26.md § Wallet and signed transaction posture',
      ],
    },
  }),
  providerRepository: buildExplainer({
    title: 'Provider and repository',
    summary:
      'This is the give-side boundary selector for the repository supply that Bitcode can actually work against.',
    detail:
      'Provider and repository are not incidental settings. They determine the source perimeter for searchable supply, deposit provenance, and later signed transaction follow-through, while third-party connections and attachments enter here as ingress/input context rather than redefining Bitcode outputs.',
    references: {
      source: [
        'uapi/app/application/ApplicationRepositoryContextPanel.tsx',
        'uapi/app/application/application-repository-context.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  repositoryAnchor: buildExplainer({
    title: 'Record repository anchor',
    summary:
      'Recording the repository anchor writes the selected source perimeter into recent Bitcode Terminal activity.',
    detail:
      'This keeps source posture rereadable in recent Terminal activity alongside give, need, proof, and settlement instead of leaving the repository choice as ephemeral UI state.',
    references: {
      source: [
        'uapi/app/application/ApplicationRepositoryContextPanel.tsx',
        'uapi/app/application/application-activity-history.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  authSession: buildExplainer({
    title: 'Auth session',
    summary:
      'The auth session is the current repo-bound execution identity for give-side supply selection.',
    detail:
      'Changing the session changes which authenticated inventory Bitcode can read and later cite in deposit and branch records.',
    references: {
      source: [
        'uapi/app/application/ApplicationSupplySelectionPanel.tsx',
        'uapi/app/application/application-supply-selection.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  artifactKind: buildExplainer({
    title: 'Artifact kind',
    summary:
      'Artifact kind narrows the give-side inventory to the kinds of share candidates you actually want to work with.',
    detail:
      'It should help the operator shape the selected supply set before deposit, not act as hidden backend filtering.',
    references: {
      source: [
        'uapi/app/application/ApplicationSupplySelectionPanel.tsx',
        'uapi/app/application/ApplicationDepositComposer.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  inventorySearch: buildExplainer({
    title: 'Inventory search',
    summary:
      'Inventory search is the fast path for narrowing repository supply inside the Bitcode Terminal.',
    detail:
      'It should preserve continuity with repository anchor and selected supply so the operator can move from search straight into give without rebuilding context.',
    references: {
      source: [
        'uapi/app/application/ApplicationSupplySelectionPanel.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  activeNeed: buildExplainer({
    title: 'Record active need',
    summary:
      'Recording the active need writes the currently measured demand frame into recent Bitcode Terminal activity.',
    detail:
      'This makes the selected need rereadable from the same Terminal activity result path that later shows fit, proof, and settlement.',
    references: {
      source: [
        'uapi/app/application/ApplicationNeedScenarioPanel.tsx',
        'uapi/app/application/application-activity-history.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  sourceRepo: buildExplainer({
    title: 'Source repo',
    summary:
      'Source repo keeps deposit provenance and repository anchor aligned when a draft needs an explicit repo override.',
    detail:
      'Use it only when the deposit must name a more exact repo boundary than the current selection already provides.',
    references: {
      source: [
        'uapi/app/application/ApplicationDepositComposer.tsx',
        'uapi/app/application/ApplicationRepositoryContextPanel.tsx',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  sourceCommit: buildExplainer({
    title: 'Source commit / ref',
    summary:
      'Source commit or ref pins the give-side deposit to a concrete revision when provenance must be exact.',
    detail:
      'This is one of the operator-visible bridges between repository posture, deposit materialization, and later proof or settlement follow-through.',
    references: {
      source: ['uapi/app/application/ApplicationDepositComposer.tsx'],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  signerAddress: buildExplainer({
    title: 'Signer address',
    summary:
      'Signer address ties the deposit posture to the wallet-connected identity expected for signed Bitcode transactions.',
    detail:
      'It is a readiness-bearing field, not free metadata. Once signed transaction closure lands fully, this field remains part of the operator-visible provenance chain.',
    references: {
      source: [
        'uapi/app/application/ApplicationDepositComposer.tsx',
        'uapi/app/application/bitcode-transaction-readiness.ts',
      ],
      canon: [
        ...APPLICATION_CANON_REFS,
        'BITCODE_SPEC_V26.md § Wallet and signed transaction posture',
      ],
    },
  }),
  depositSubmission: buildExplainer({
    title: 'Deposit into Bitcode',
    summary:
      'Deposit submission should bind selected supply, provenance, and optional raw content into the same Bitcode activity chain.',
    detail:
      'The operator should be able to submit, reread the ledger row, and continue into fit and closure without leaving the Bitcode Terminal model.',
    references: {
      source: [
        'uapi/app/application/ApplicationDepositComposer.tsx',
        'uapi/app/api/deposits/route.ts',
        'uapi/app/application/application-activity-history.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
  closureAction: buildExplainer({
    title: 'Closure action',
    summary:
      'Closure action is the visible bridge from Need-review posture into verification, branch, settlement, and ledger follow-through.',
    detail:
      'It should remain adjacent to status, readiness, and closure follow-through links so the operator always understands what the next write will do.',
    references: {
      source: [
        'uapi/app/application/ApplicationClosureControlDeck.tsx',
        'uapi/app/application/application-closure-controls.ts',
      ],
      canon: APPLICATION_CANON_REFS,
    },
  }),
} as const;
