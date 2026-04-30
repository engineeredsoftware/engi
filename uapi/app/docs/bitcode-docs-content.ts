import { APPLICATION_INLINE_EXPLAINERS, APPLICATION_WORKSPACE_EXPLAINERS } from '@/app/application/application-workspace-explainers';
import { BITCODE_PUBLIC_EXPLAINERS } from '@/components/base/bitcode/layout/bitcode-public-explainers';

type DocsGuideCard = {
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  points?: readonly string[];
};

export type BitcodeDocsPageSlug = 'source-shares' | 'terminal' | 'terminal-actions' | 'read-results';

export type BitcodeDocsPage = {
  slug: BitcodeDocsPageSlug;
  href: string;
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  primaryCta: {
    href: string;
    label: string;
  };
  sections: readonly DocsGuideCard[];
};

export type TerminalActionGuide = {
  id: string;
  action: string;
  location: string;
  write: string;
  expectedRead: string;
  proofSignal: string;
};

export type TerminalReadGuide = {
  id: string;
  read: string;
  location: string;
  tellsYou: string;
  expectedResult: string;
};

// Alias keeps the action page data visually grouped without exporting another surface name.
const APPLICATION_SURFACE_EXPLAINERS_ALIAS = APPLICATION_WORKSPACE_EXPLAINERS;

const sourceSharesSections = [
  {
    eyebrow: 'Source Shares',
    title: 'What Bitcode is measuring',
    summary:
      'Bitcode turns source material into tradable, measured technical intelligence rather than treating files as inert attachments.',
    detail:
      'Code, docs, diagrams, PDFs, notes, commits, citations, authorship, and metadata enter as source supply. The Exchange measures that supply against need, fit, quality, provenance, and proof posture so useful technical intelligence can become Source Shares.',
    points: [
      'Supply is deposited as give-side source',
      'Demand is expressed as measured Need',
      'Fit and proof decide whether the source can move toward settlement',
    ],
  },
  {
    eyebrow: 'Exchange',
    title: BITCODE_PUBLIC_EXPLAINERS.network.title,
    summary: BITCODE_PUBLIC_EXPLAINERS.network.summary,
    detail: BITCODE_PUBLIC_EXPLAINERS.network.detail ?? '',
    points: BITCODE_PUBLIC_EXPLAINERS.network.points,
  },
  {
    eyebrow: 'Value flow',
    title: 'Give -> Need -> Fit -> Prove -> Settle -> Issue',
    summary:
      'The market path is intentionally linear for a new reader: source is given, need is measured, fit is reviewed, proofs are produced, settlement is read, and $BTD issuance becomes attributable.',
    detail:
      'The Terminal exposes each stage so an operator can see both the write action that changes state and the read surface that proves what happened next.',
    points: [
      'Give writes searchable supply',
      'Need writes measured demand',
      'Settlement reads proof-backed attribution and issuance posture',
    ],
  },
] as const satisfies readonly DocsGuideCard[];

const terminalSections = [
  {
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.kicker ?? 'Terminal',
    title: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.detail ?? '',
    points: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.points,
  },
  {
    eyebrow: 'Read',
    title: APPLICATION_INLINE_EXPLAINERS.readWindow.title,
    summary: APPLICATION_INLINE_EXPLAINERS.readWindow.summary,
    detail: APPLICATION_INLINE_EXPLAINERS.readWindow.detail ?? '',
  },
  {
    eyebrow: 'Write',
    title: APPLICATION_INLINE_EXPLAINERS.writePosture.title,
    summary: APPLICATION_INLINE_EXPLAINERS.writePosture.summary,
    detail: APPLICATION_INLINE_EXPLAINERS.writePosture.detail ?? '',
  },
  {
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.railModes.kicker ?? 'Modes',
    title: APPLICATION_WORKSPACE_EXPLAINERS.railModes.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.railModes.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.railModes.detail ?? '',
    points: APPLICATION_WORKSPACE_EXPLAINERS.railModes.points,
  },
  {
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.kicker ?? 'Source',
    title: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.detail ?? '',
    points: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.points,
  },
] as const satisfies readonly DocsGuideCard[];

const terminalActionSections = [
  {
    eyebrow: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.kicker ?? 'Controls',
    title: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.title,
    summary: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.summary,
    detail: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.detail ?? '',
    points: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.points,
  },
  {
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.kicker ?? 'Supply',
    title: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.detail ?? '',
    points: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.points,
  },
  {
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.kicker ?? 'Deposit',
    title: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.detail ?? '',
    points: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.points,
  },
  {
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.kicker ?? 'Closure',
    title: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.detail ?? '',
    points: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.points,
  },
] as const satisfies readonly DocsGuideCard[];

const readResultSections = [
  {
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.kicker ?? 'Closure',
    title: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.detail ?? '',
    points: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.points,
  },
  {
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.kicker ?? 'Signals',
    title: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.detail ?? '',
    points: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.points,
  },
  {
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.kicker ?? 'Readiness',
    title: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.detail ?? '',
    points: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.points,
  },
  {
    eyebrow: 'Signed transaction posture',
    title: APPLICATION_INLINE_EXPLAINERS.transactionReadiness.title,
    summary: APPLICATION_INLINE_EXPLAINERS.transactionReadiness.summary,
    detail: APPLICATION_INLINE_EXPLAINERS.transactionReadiness.detail ?? '',
  },
] as const satisfies readonly DocsGuideCard[];

export const TERMINAL_ACTION_GUIDES = [
  {
    id: 'scenario',
    action: 'Choose the active scenario',
    location: 'Command deck',
    write:
      'Select the measured need or operating frame the Terminal should honor before fit, branch, and closure work continues.',
    expectedRead:
      'The Terminal rereads give, need, fit, and closure against the selected scenario rather than treating it as a cosmetic filter.',
    proofSignal: APPLICATION_INLINE_EXPLAINERS.scenario.summary,
  },
  {
    id: 'projection',
    action: 'Set projection',
    location: 'Command deck',
    write:
      'Choose whether the current flow is previewing, staging, or readying a stronger materialized posture.',
    expectedRead:
      'The rest of the Terminal should make clear which posture is being read before any state-changing work is trusted.',
    proofSignal: APPLICATION_INLINE_EXPLAINERS.projection.summary,
  },
  {
    id: 'branch-mode',
    action: 'Set branch mode',
    location: 'Command deck and closure controls',
    write:
      'Select the AssetPack execution posture that branch materialization should use when closure runs.',
    expectedRead:
      'Branch, settlement, and proof panels should reflect the selected mode as an operator-visible Bitcode decision.',
    proofSignal: APPLICATION_INLINE_EXPLAINERS.branchMode.summary,
  },
  {
    id: 'provider-repository',
    action: 'Select provider and repository',
    location: 'Repository context',
    write:
      'Bind the give-side boundary to the provider and repository whose source supply the Terminal may search and cite.',
    expectedRead:
      'Repository supply, deposit provenance, and later closure reads should all stay attached to that selected source perimeter.',
    proofSignal: APPLICATION_INLINE_EXPLAINERS.providerRepository.summary,
  },
  {
    id: 'repository-anchor',
    action: 'Record repository anchor',
    location: 'Repository context',
    write:
      'Write the selected source perimeter into Bitcode activity so it survives navigation and later rereads.',
    expectedRead:
      'The master-detail ledger shows repository posture beside give, need, proof, and settlement records.',
    proofSignal: APPLICATION_INLINE_EXPLAINERS.repositoryAnchor.summary,
  },
  {
    id: 'supply-selection',
    action: 'Search, filter, and select supply',
    location: 'Give-side supply',
    write:
      'Use auth session, artifact kind, and inventory search to narrow the supply set before drafting a deposit.',
    expectedRead:
      'Selected inventory remains explicit and can be carried directly into give, deposit, fit, and closure.',
    proofSignal: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.summary,
  },
  {
    id: 'give-posture',
    action: 'Record give-side posture',
    location: 'Give + need workbench',
    write:
      'Record the current give-side summary into the Bitcode activity ledger when supply posture is ready to be reread.',
    expectedRead:
      'The selected activity can show what was offered, where it came from, and how it relates to later fit.',
    proofSignal: APPLICATION_WORKSPACE_EXPLAINERS.giveNeedChain.summary,
  },
  {
    id: 'active-need',
    action: 'Record active Need',
    location: 'Need measurement',
    write:
      'Write the currently measured demand frame into the Bitcode activity ledger before fit and closure read against it.',
    expectedRead:
      'The master-detail view can reopen the exact need frame with parser posture, scenario, and review state intact.',
    proofSignal: APPLICATION_INLINE_EXPLAINERS.activeNeed.summary,
  },
  {
    id: 'need-review',
    action: 'Accept, reject, or remeasure Need',
    location: 'Need measurement',
    write:
      'Choose whether the measured Need is admitted for fit search, rejected, or sent back for remeasurement with feedback.',
    expectedRead:
      'Fit search stays blocked until Need review is accepted, and the closure map shows the current review posture.',
    proofSignal: APPLICATION_WORKSPACE_EXPLAINERS.needScenarios.summary,
  },
  {
    id: 'deposit-draft',
    action: 'Complete deposit provenance',
    location: 'Give intake',
    write:
      'Set source repo, source commit or ref, signer address, selected supply, and optional raw content where exact provenance is required.',
    expectedRead:
      'The deposit draft reads as source-backed supply rather than loose metadata, with readiness blockers visible before submit.',
    proofSignal: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.summary,
  },
  {
    id: 'deposit-submit',
    action: 'Deposit into Bitcode',
    location: 'Give intake',
    write:
      'Submit selected supply, provenance, and content into the Bitcode activity chain.',
    expectedRead:
      'A ledger row should be rereadable immediately and should carry forward into fit, proof, settlement, and history.',
    proofSignal: APPLICATION_INLINE_EXPLAINERS.depositSubmission.summary,
  },
  {
    id: 'external-readiness',
    action: 'Record external interface readiness',
    location: 'External interface readiness',
    write:
      'Record whether connections, attachments, repository scope, and boundary services are live, modeled, blocked, or review-only.',
    expectedRead:
      'The Terminal shows boundary truth before downstream asset packs or settlement are trusted.',
    proofSignal: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.summary,
  },
  {
    id: 'closure-run',
    action: 'Run closure and branch follow-through',
    location: 'Closure controls',
    write:
      'Run the closure path from Need review through verification, branch materialization, settlement, and proof.',
    expectedRead:
      'Verification, branch artifacts, asset-pack settlement, ledger continuity, and history should read as one consequence chain.',
    proofSignal: APPLICATION_INLINE_EXPLAINERS.closureAction.summary,
  },
  {
    id: 'closure-refresh-reset',
    action: 'Refresh or reset closure state',
    location: 'Closure controls',
    write:
      'Refresh the current closure read or reset closure state when the operator needs to rebuild the exact follow-through path.',
    expectedRead:
      'The Terminal should make runtime status, visible artifacts, proof families, credited assets, and flow continuity explicit.',
    proofSignal: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.summary,
  },
  {
    id: 'conversations-mode',
    action: 'Open Conversations',
    location: 'Support rail and experience map',
    write:
      'Open natural-language drafting and coordination without losing the current Bitcode activity context.',
    expectedRead:
      'The Terminal remains the primary ledger, while conversation output can assist drafting and follow-through.',
    proofSignal: 'Conversations are a deliberate mode change, not a competing destination.',
  },
  {
    id: 'auxillaries-mode',
    action: 'Open Auxillaries',
    location: 'Support rail and navigation',
    write:
      'Open profile, connects, interface defaults, wallet posture, and $BTD state when identity or interface posture must change.',
    expectedRead:
      'The Terminal keeps its selected activity context while Auxillaries changes readiness and account posture.',
    proofSignal: BITCODE_PUBLIC_EXPLAINERS.openOrbitals.summary,
  },
] as const satisfies readonly TerminalActionGuide[];

export const TERMINAL_READ_GUIDES = [
  {
    id: 'activity-ledger',
    read: 'Activity ledger',
    location: 'Master-detail Terminal',
    tellsYou:
      'Which Bitcode activity is selected, how it is typed, and whether it reads as give, need, closure, proof, or history posture.',
    expectedResult:
      'You can search, filter, page, and reopen activity without losing the selected detail read.',
  },
  {
    id: 'selected-detail',
    read: 'Selected activity detail',
    location: 'Master-detail Terminal',
    tellsYou:
      'The selected activity identity, source posture, asset packs, proof rows, closure state, and related history.',
    expectedResult:
      'You can decide whether to stay at summary level or open exact proof, branch, settlement, or ledger detail.',
  },
  {
    id: 'read-window',
    read: APPLICATION_INLINE_EXPLAINERS.readWindow.title,
    location: 'Experience frame',
    tellsYou: APPLICATION_INLINE_EXPLAINERS.readWindow.summary,
    expectedResult:
      'The central ledger remains primary while deeper modes and proof views are deliberate follow-through.',
  },
  {
    id: 'transaction-readiness',
    read: APPLICATION_INLINE_EXPLAINERS.transactionReadiness.title,
    location: 'Command deck, deposit, and closure controls',
    tellsYou: APPLICATION_INLINE_EXPLAINERS.transactionReadiness.summary,
    expectedResult:
      'If readiness is incomplete, branch, deposit, signed settlement, and closure stay fail-closed while review can continue.',
  },
  {
    id: 'boundary-runtime',
    read: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.title,
    location: 'External interface readiness',
    tellsYou: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.summary,
    expectedResult:
      'Live, modeled, boundary-only, and blocked states are visible before downstream proof or settlement work is trusted.',
  },
  {
    id: 'supply-fit',
    read: APPLICATION_WORKSPACE_EXPLAINERS.supplyFit.title,
    location: 'Give and need overview',
    tellsYou: APPLICATION_WORKSPACE_EXPLAINERS.supplyFit.summary,
    expectedResult:
      'Repository supply, measured Need, and fit posture can be read together before exact proof inspection.',
  },
  {
    id: 'closure-map',
    read: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.title,
    location: 'Closure and provenance',
    tellsYou: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.summary,
    expectedResult:
      'Need review, verification, branch artifacts, asset-pack settlement, and ledger continuity read as one sequence.',
  },
  {
    id: 'proof-runtime',
    read: APPLICATION_WORKSPACE_EXPLAINERS.sourcePath.title,
    location: 'Lower runtime detail',
    tellsYou: APPLICATION_WORKSPACE_EXPLAINERS.sourcePath.summary,
    expectedResult:
      'Dense replay, proof, and settlement detail stays available without making the main Terminal feel like plumbing.',
  },
  {
    id: 'ledger-pulse',
    read: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.title,
    location: 'Pinned operating signals',
    tellsYou: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.summary,
    expectedResult:
      'You can judge whether activity is moving, blocked, proving, or ready for closure before opening exact detail.',
  },
] as const satisfies readonly TerminalReadGuide[];

export const BITCODE_DOCS_PAGES = [
  {
    slug: 'source-shares',
    href: '/docs/source-shares',
    eyebrow: 'Start here',
    title: 'Source Shares and the Bitcode Exchange',
    summary:
      'Learn the value model first: Bitcode measures technical source into Source Shares, then lets Terminal users read and operate the market path.',
    detail:
      'This guide is for first-time readers who need the simple model before using Terminal: source supply comes in, demand is measured, fit and proofs decide what can move, and settlement makes attribution readable.',
    primaryCta: { href: '/application', label: 'Open Terminal' },
    sections: sourceSharesSections,
  },
  {
    slug: 'terminal',
    href: '/docs/terminal',
    eyebrow: 'Terminal map',
    title: 'Orient inside the Bitcode Terminal',
    summary:
      'Understand the Terminal as one master-detail ledger with deliberate write modes, support rails, and exact proof follow-through.',
    detail:
      'Use this page when you need to know where to read, where to write, and when to open deeper modes such as Conversations or Auxillaries.',
    primaryCta: { href: '/docs/terminal-actions', label: 'Read action guide' },
    sections: terminalSections,
  },
  {
    slug: 'terminal-actions',
    href: '/docs/terminal-actions',
    eyebrow: 'Write guide',
    title: 'Terminal actions: what writes and what should read back',
    summary:
      'Every Terminal write should have an expected read result. This guide lists the operator actions and the state they should make visible.',
    detail:
      'Use this as the practical manual for Terminal operation. It follows the same model as the exhaustive tooltips: write deliberately, then verify the resulting read surface before moving deeper.',
    primaryCta: { href: '/application', label: 'Use Terminal' },
    sections: terminalActionSections,
  },
  {
    slug: 'read-results',
    href: '/docs/read-results',
    eyebrow: 'Read guide',
    title: 'Terminal reads, proofs, readiness, and expected results',
    summary:
      'Know what each read surface is supposed to prove before you trust a Bitcode activity, asset pack, settlement, or ledger state.',
    detail:
      'This page is for experienced users auditing the result of Terminal work. It separates quick operating signals from exact proof and closure follow-through.',
    primaryCta: { href: '/docs/terminal-actions', label: 'Compare write actions' },
    sections: readResultSections,
  },
] as const satisfies readonly BitcodeDocsPage[];

export const BITCODE_DOCS_PAGE_SLUGS = BITCODE_DOCS_PAGES.map((page) => page.slug);

export function getBitcodeDocsPage(slug: string | undefined): BitcodeDocsPage | null {
  return BITCODE_DOCS_PAGES.find((page) => page.slug === slug) ?? null;
}
