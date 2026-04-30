import type { BitcodeExplainer } from '@/components/base/bitcode/execution/bitcode-transaction-types';
import { APPLICATION_INLINE_EXPLAINERS, APPLICATION_WORKSPACE_EXPLAINERS } from '@/app/application/application-workspace-explainers';
import { BITCODE_PUBLIC_EXPLAINERS } from '@/components/base/bitcode/layout/bitcode-public-explainers';

type DocsGuideCard = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  reason?: string;
  points?: readonly string[];
  steps?: readonly string[];
};

export type DocsEmbeddedUiSpecimen = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  explainer: BitcodeExplainer;
  signals?: readonly {
    label: string;
    value: string;
    tone?: 'default' | 'emerald' | 'amber' | 'cyan';
  }[];
  steps?: readonly {
    label: string;
    body: string;
  }[];
};

export type DocsInterfaceApiFeature = {
  name: string;
  method?: string;
  packagePath: string;
  useWhen: string;
  howToUse: string;
  inputs: readonly string[];
  outputs: readonly string[];
  verifyInTerminal?: string;
  failureModes?: readonly string[];
  requiresConfirmation?: boolean;
};

export type DocsInterfaceApiSection = {
  id: string;
  title: string;
  summary: string;
  packagePath: string;
  features: readonly DocsInterfaceApiFeature[];
};

export type BitcodeDocsPageSlug = string;

export type BitcodeDocsPage = {
  slug: BitcodeDocsPageSlug;
  href: string;
  chapterId: string;
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  learningOutcome: string;
  primaryCta: {
    href: string;
    label: string;
  };
  sections: readonly DocsGuideCard[];
  embeddedUi?: readonly DocsEmbeddedUiSpecimen[];
  apiReference?: readonly DocsInterfaceApiSection[];
};

export type BitcodeDocsChapter = {
  id: string;
  number: string;
  title: string;
  summary: string;
  pages: readonly BitcodeDocsPage[];
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

function docsPage(page: Omit<BitcodeDocsPage, 'href'>): BitcodeDocsPage {
  return {
    ...page,
    href: `/docs/${page.slug}`,
  };
}

const APPLICATION_SURFACE_EXPLAINERS_ALIAS = APPLICATION_WORKSPACE_EXPLAINERS;

const whatIsBitcodeSections = [
  {
    id: 'plain-model',
    eyebrow: 'Plain model',
    title: 'Bitcode is a market system for source-backed technical intelligence',
    summary:
      'A Source Share is not a file upload, a tokenized repo, or a generic AI answer. It is a measured claim that a piece of technical source can satisfy a Need under auditable proof and settlement rules.',
    detail:
      'Bitcode starts with source: code, docs, diagrams, architecture notes, issue context, commits, proofs, and metadata. The Exchange measures that source against demand, keeps the evidence, and lets the Terminal operator read what happened before trusting a result.',
    reason:
      'This framing keeps first-time readers from thinking Bitcode is only a developer tool. The product is the measured market path from source to accepted shares.',
    points: [
      'Give means placing source-backed supply into the Bitcode operating chain.',
      'Need means making demand measurable before source is selected or settled.',
      'Proof and settlement decide whether the source can become attributable value.',
    ],
  },
  {
    id: 'product-map',
    eyebrow: 'Product map',
    title: 'Exchange, Terminal, Protocol, and interfaces are one system',
    summary:
      'Exchange is the state and market layer. Terminal is the operator experience. Protocol is the rulebook and proof contract. Interfaces such as MCP, ChatGPT App, GitHub, and webhooks are admitted ways to read or write against that same system.',
    detail:
      'The important rule is that none of the interfaces become separate products. They must read and write the same Exchange state, follow the same Protocol boundaries, and leave the same proof posture that Terminal can reread.',
    reason:
      'New users need one map before learning details. Otherwise Exchange, Terminal, MCP, ChatGPT App, and Auxillaries can look like separate applications instead of coordinated surfaces over Source Shares.',
    points: [
      'Exchange owns persisted activity, ledger, proof, interface, and settlement state.',
      'Terminal owns the give, need, read, write, proof, and history experience.',
      'Protocol owns semantics, proof families, fail-closed rules, and promotion truth.',
    ],
  },
  {
    id: 'operator-path',
    eyebrow: 'Operator path',
    title: 'The simplest path is give, need, fit, prove, settle, issue',
    summary:
      'A first-time operator should understand Bitcode as a short path: give source, measure Need, inspect fit, produce proof, settle attribution, and issue/read Source Shares.',
    detail:
      'The Terminal keeps the path visible as a master-detail read/write loop. You write only when a bounded state change is intended, then read the result before moving deeper into proof, settlement, or connected-interface delivery.',
    reason:
      'The product becomes easier to learn when every button is read as part of the value path rather than as miscellaneous dashboard furniture.',
    steps: [
      'Start with Source Shares so the market object is clear.',
      'Open the Terminal map so the product surface is familiar.',
      'Read the action guide before trusting write controls.',
      'Use the proof and interface chapters when operating against real integrations.',
    ],
  },
] as const satisfies readonly DocsGuideCard[];

const sourceSharesSections = [
  {
    id: 'share-object',
    eyebrow: 'Source Shares',
    title: 'What Bitcode is measuring',
    summary:
      'Bitcode turns source material into tradable, measured technical intelligence rather than treating files as inert attachments.',
    detail:
      'Code, docs, diagrams, PDFs, notes, commits, citations, authorship, and metadata enter as source supply. The Exchange measures that supply against Need, fit, quality, provenance, and proof posture so useful technical intelligence can become Source Shares.',
    reason:
      'The share is only credible when the source, demand, proof, and settlement can be reread together.',
    points: [
      'Supply is deposited as give-side source.',
      'Demand is expressed as a measured Need.',
      'Fit and proof decide whether source can move toward settlement.',
    ],
  },
  {
    id: 'market-frame',
    eyebrow: 'Exchange',
    title: BITCODE_PUBLIC_EXPLAINERS.network.title,
    summary: BITCODE_PUBLIC_EXPLAINERS.network.summary,
    detail: BITCODE_PUBLIC_EXPLAINERS.network.detail ?? '',
    reason:
      'The public Exchange view introduces the market without forcing a first-time reader into proof detail too early.',
    points: BITCODE_PUBLIC_EXPLAINERS.network.points,
  },
  {
    id: 'value-flow',
    eyebrow: 'Value flow',
    title: 'Give -> Need -> Fit -> Prove -> Settle -> Issue',
    summary:
      'The market path is intentionally linear for a new reader: source is given, Need is measured, fit is reviewed, proofs are produced, settlement is read, and $BTD issuance becomes attributable.',
    detail:
      'The Terminal exposes each stage so an operator can see both the write action that changes state and the read surface that proves what happened next.',
    reason:
      'The linear path is a teaching model. The under-the-hood system remains richer, but every advanced interface still has to preserve this chain.',
    points: [
      'Give writes searchable supply.',
      'Need writes measured demand.',
      'Settlement reads proof-backed attribution and issuance posture.',
    ],
  },
] as const satisfies readonly DocsGuideCard[];

const exchangeSections = [
  {
    id: 'exchange-role',
    eyebrow: 'Exchange',
    title: 'Exchange is the state, API, persistence, and market-reading layer',
    summary:
      'The Exchange is where Bitcode activity becomes durable: repository scope, Need measurement, fit review, AssetPack evidence, proof rows, settlement receipts, and interface admissions all land here.',
    detail:
      'Terminal is the main operator product, but it should not own the source of truth by itself. Exchange state is what the Terminal, connected apps, MCP, ChatGPT App, and future commercial surfaces must reread.',
    reason:
      'This separation lets Bitcode support multiple commercial interfaces without creating multiple inconsistent product centers.',
    points: [
      'Activity and selected detail must survive navigation and reread.',
      'Write paths must create durable Exchange records.',
      'Read paths must expose the same state to Terminal and admitted interfaces.',
    ],
  },
  {
    id: 'activity-ledger',
    eyebrow: 'Ledger',
    title: 'The activity ledger is the main Exchange read window',
    summary:
      'Exchange activity records give-side deposits, measured Needs, AssetPack executions, proof posture, settlement, and history in one searchable ledger.',
    detail:
      'The ledger is not just a table. It is the readable index of what happened, why it happened, and which exact detail surface should be opened next.',
    reason:
      'If a write cannot be reread from the ledger, the product cannot prove a source-to-shares path to a user.',
    points: [
      'Search and filters keep large activity sets usable.',
      'Selected detail carries proofs, branch artifacts, settlement, and history.',
      'Route-owned query state makes activity review shareable and recoverable.',
    ],
  },
  {
    id: 'persistence',
    eyebrow: 'Persistence',
    title: 'Exchange reread is what turns actions into evidence',
    summary:
      'A Terminal write is not trusted merely because a button returned success. The expected result is a durable Exchange reread with the right proof, readiness, and state posture.',
    detail:
      'V26 treats persistence, schema, route-owned state, execution history, and final work summaries as part of the product truth rather than incidental backend storage.',
    reason:
      'Source Shares require state that can be audited later by a different surface, not just local UI continuity.',
    steps: [
      'Write through Terminal, conversation, MCP, or another admitted interface.',
      'Persist normalized evidence and activity context into Exchange state.',
      'Reread the activity and selected detail before trusting fit, proof, or settlement.',
    ],
  },
] as const satisfies readonly DocsGuideCard[];

const terminalSections = [
  {
    id: 'experience-map',
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.kicker ?? 'Terminal',
    title: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.detail ?? '',
    reason:
      'The Terminal keeps the product understandable by making the activity ledger primary and treating deeper modes as deliberate follow-through.',
    points: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap.points,
  },
  {
    id: 'read-window',
    eyebrow: 'Read',
    title: APPLICATION_INLINE_EXPLAINERS.readWindow.title,
    summary: APPLICATION_INLINE_EXPLAINERS.readWindow.summary,
    detail: APPLICATION_INLINE_EXPLAINERS.readWindow.detail ?? '',
    reason:
      'The read window is where users learn whether a Bitcode action actually changed state.',
  },
  {
    id: 'write-posture',
    eyebrow: 'Write',
    title: APPLICATION_INLINE_EXPLAINERS.writePosture.title,
    summary: APPLICATION_INLINE_EXPLAINERS.writePosture.summary,
    detail: APPLICATION_INLINE_EXPLAINERS.writePosture.detail ?? '',
    reason:
      'Writes must stay bounded because Bitcode has proof, wallet, repository, and disclosure consequences.',
  },
  {
    id: 'mode-rail',
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.railModes.kicker ?? 'Modes',
    title: APPLICATION_WORKSPACE_EXPLAINERS.railModes.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.railModes.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.railModes.detail ?? '',
    reason:
      'Mode changes are useful only when the reader never loses the active Exchange activity context.',
    points: APPLICATION_WORKSPACE_EXPLAINERS.railModes.points,
  },
  {
    id: 'repository-supply',
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.kicker ?? 'Source',
    title: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.detail ?? '',
    reason:
      'Repository scope is the give-side boundary; every deposit and downstream proof depends on it staying explicit.',
    points: APPLICATION_WORKSPACE_EXPLAINERS.repositorySupply.points,
  },
] as const satisfies readonly DocsGuideCard[];

const terminalActionSections = [
  {
    id: 'controls',
    eyebrow: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.kicker ?? 'Controls',
    title: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.title,
    summary: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.summary,
    detail: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.detail ?? '',
    reason:
      'Controls are not generic preferences. Scenario, projection, branch mode, and guide state decide what Bitcode will measure, materialize, and prove.',
    points: APPLICATION_SURFACE_EXPLAINERS_ALIAS.controls.points,
  },
  {
    id: 'supply',
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.kicker ?? 'Supply',
    title: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.detail ?? '',
    reason:
      'Supply search is the first filter on what source can become share-bearing intelligence.',
    points: APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory.points,
  },
  {
    id: 'deposit',
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.kicker ?? 'Deposit',
    title: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.detail ?? '',
    reason:
      'Deposit provenance is what prevents useful source from becoming anonymous or unauditable.',
    points: APPLICATION_WORKSPACE_EXPLAINERS.depositComposer.points,
  },
  {
    id: 'closure',
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.kicker ?? 'Closure',
    title: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.detail ?? '',
    reason:
      'Closure is where reviewable Need, verification, branch materialization, proof, and settlement become one consequence chain.',
    points: APPLICATION_WORKSPACE_EXPLAINERS.closureControls.points,
  },
] as const satisfies readonly DocsGuideCard[];

const readResultSections = [
  {
    id: 'closure-map',
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.kicker ?? 'Closure',
    title: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.detail ?? '',
    reason:
      'Closure reads let experienced users decide whether a Bitcode activity is ready for deeper proof or settlement trust.',
    points: APPLICATION_WORKSPACE_EXPLAINERS.closureMap.points,
  },
  {
    id: 'ledger-pulse',
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.kicker ?? 'Signals',
    title: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.detail ?? '',
    reason:
      'Pinned signals prevent users from opening dense proof detail just to answer whether work is blocked, proving, or ready.',
    points: APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse.points,
  },
  {
    id: 'boundary-runtime',
    eyebrow: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.kicker ?? 'Readiness',
    title: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.title,
    summary: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.summary,
    detail: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.detail ?? '',
    reason:
      'Boundary honesty is what keeps launch-mode mocks, live connections, blocked interfaces, and proof readiness from being conflated.',
    points: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.points,
  },
  {
    id: 'signed-posture',
    eyebrow: 'Signed transaction posture',
    title: APPLICATION_INLINE_EXPLAINERS.transactionReadiness.title,
    summary: APPLICATION_INLINE_EXPLAINERS.transactionReadiness.summary,
    detail: APPLICATION_INLINE_EXPLAINERS.transactionReadiness.detail ?? '',
    reason:
      'Bitcode can teach and stage work before every production connection is live, but it must fail closed before signed settlement when readiness is incomplete.',
  },
] as const satisfies readonly DocsGuideCard[];

const auxillariesSections = [
  {
    id: 'auxillary-model',
    eyebrow: 'Auxillaries',
    title: 'Auxillaries are the identity, connection, interface, and $BTD layer',
    summary:
      'Auxillaries hold the context that changes how Terminal and Exchange can operate: connected repositories, interface defaults, profile identity, wallet posture, roles, and $BTD preferences.',
    detail:
      'The auxillary shell should feel adjacent to Terminal, not detached from it. Opening Auxillaries changes readiness and configuration while the selected Terminal activity remains recoverable.',
    reason:
      'Configuration is commercially important only when users can understand which operational capability it unlocks or blocks.',
    points: [
      'Connects owns repository and third-party bindings.',
      'Interfaces owns default behavior and visual/product posture.',
      'Profile and $BTD own identity, wallet, roles, and share-specific settings.',
    ],
  },
  {
    id: 'connects-profile-btd',
    eyebrow: 'Readiness',
    title: 'Connects, Profile, Interfaces, and $BTD are readiness surfaces',
    summary:
      'Repository scope, wallet identity, profile roles, interface defaults, and $BTD controls determine which writes can move from review to signed or connected execution.',
    detail:
      'A user may still learn or draft in launch mode, but production execution must keep blockers clear before deposit, branch, settlement, delivery, or connected-interface writes proceed.',
    reason:
      'This lets Bitcode ship a strong Terminal experience with mocked data while preserving the production direction toward real connectivity.',
    steps: [
      'Connect source and integration boundaries.',
      'Set profile identity, signer, organization, and role posture.',
      'Choose interface defaults for Terminal and connected surfaces.',
      'Review $BTD and wallet-adjacent controls before settlement.',
    ],
  },
  {
    id: 'third-party-connections',
    eyebrow: 'Connects',
    title: 'Third-party connections are source-bearing ingress, not hidden account settings',
    summary:
      'Connects owns GitHub and future provider bindings because repository scope becomes source-bearing input for Need measurement, AssetPack synthesis, proof follow-through, and settlement readiness.',
    detail:
      'A healthy connection read tells the user whether the provider is pending, connected, reconnect-required, or available only from stored inventory. It also explains that wallet identity stays in Profile while repository attachment and provider scope stay in Connects.',
    reason:
      'New users need to understand why a missing GitHub or wallet connection blocks live writes without blocking learning-mode Terminal review.',
    points: [
      'GitHub scope defines which repositories Bitcode can read for source supply.',
      'Stored inventory can support reread, but live write admission fails closed until the provider is restored.',
      'GitHub plus wallet posture are the minimum live prerequisites before settlement or signed delivery.',
    ],
  },
  {
    id: 'interface-defaults',
    eyebrow: 'Interfaces',
    title: 'Interface defaults shape how Terminal, conversations, and proofs open',
    summary:
      'Interfaces owns global model selection, system prompt posture, master-detail density, conversation launch behavior, proof read mode, instruction tone, and execution bias.',
    detail:
      'These are not cosmetic preferences. They change how much detail Terminal opens with, how conversations re-enter the product, which model family anchors work by default, and whether proof readers see visual, mixed, or raw evidence first.',
    reason:
      'Configuration becomes teachable when every preference says what operational consequence it has.',
    points: [
      'Master-detail density controls how much activity detail opens by default.',
      'Conversation launch controls whether chat appears as overlay, focused work, or continuity-preserving mode.',
      'Proof mode controls whether evidence opens visually, mixed with structured payloads, or raw first.',
    ],
  },
] as const satisfies readonly DocsGuideCard[];

const conversationsSections = [
  {
    id: 'conversations-role',
    eyebrow: 'Conversations',
    title: 'Conversations are the rich write surface, not a separate product',
    summary:
      'The conversational workspace lets users draft Needs, attach source context, reference AssetPacks, choose destinations, and coordinate outputs while still writing back into Exchange state.',
    detail:
      'V26 treats conversations as a first-class interface because many high-quality technical Needs begin in natural language. The important boundary is that messages must normalize into Exchange evidence rather than remaining unstructured chat history.',
    reason:
      'This is how Bitcode can support ChatGPT-like workflows without losing protocol-grade auditability.',
    points: [
      'Source attachments, output destinations, AssetPack references, and Need-measurement intent should be structured.',
      'Conversation-started executions should become Exchange-readable rows.',
      'Branching should preserve attachments and execution references.',
    ],
  },
  {
    id: 'history-and-branching',
    eyebrow: 'Continuity',
    title: 'Conversation history must remain persisted and branchable',
    summary:
      'A conversation that changes Need, source context, or AssetPack intent must be recoverable by later Terminal and Exchange reads.',
    detail:
      'The user should be able to start a conversation, attach source, receive a response, continue later, branch the thread, and still have the resulting execution evidence appear in the activity system.',
    reason:
      'Without persistence and branch continuity, chat would be a helpful drafting area but not a Bitcode interface.',
  },
] as const satisfies readonly DocsGuideCard[];

const protocolSections = [
  {
    id: 'v26-gates',
    eyebrow: 'V26',
    title: 'V26 is the productization canon for Bitcode',
    summary:
      'V26 turns the retained repository into a Bitcode-owned product system through eight gates: ownership migration, application hardening, public teaching, retained-system convergence, minimum-functional Exchange and Terminal closure, MVP, commercial testnet readiness, and whole-repository provation.',
    detail:
      'The docs do not replace the canon. They teach it in product order, using the same object flow: source supply, measured Need, fit, proof, settlement, reads, interfaces, and promotion evidence.',
    reason:
      'New users need a simpler path, while experienced readers need to know where the simplified story maps back to V26.',
    points: [
      'Fifth gate is still open until minimum-functional Exchange and Terminal closure is proven.',
      'Sixth through eighth gates remain later V26 work.',
      'Public docs should not overclaim closure that the canon keeps open.',
    ],
  },
  {
    id: 'domain-model',
    eyebrow: 'Domain model',
    title: 'Every V26 subsystem must be learnable from source to proof',
    summary:
      'The protocol covers repo supply, depositing, Need measurement, prompt and inference ownership, fit, recall, verification, selection, AssetPacks, identity, disclosure, settlement, proof families, telemetry, persistence, live interfaces, validation, and generated artifacts.',
    detail:
      'Docs readers should be able to move from the high-level product story into any subsystem and understand what it owns, what can fail closed, and what evidence proves it.',
    reason:
      'This is the path toward documenting the whole V26 spec without forcing every user to start in canonical prose.',
  },
  {
    id: 'operator-chain',
    eyebrow: 'Operator chain',
    title: 'The whole operator chain ends in validation and promotion',
    summary:
      'Bitcode does not end at a successful workflow. It reconciles telemetry, persistence, state, failure semantics, validation, generated artifacts, and promotion truth.',
    detail:
      'This is why docs must teach proof and generated evidence alongside product actions. The commercial value claim depends on the user being able to audit what happened after the system acts.',
    reason:
      'A protocol-backed product has to teach both the experience and the proof system under it.',
  },
] as const satisfies readonly DocsGuideCard[];

const proofSections = [
  {
    id: 'proof-families',
    eyebrow: 'Proof families',
    title: 'Proof families are the replayable evidence contracts behind Source Shares',
    summary:
      'V26 carries proof-family canon for inference synthesis, prompt completeness, static code analysis, verification decisions, selection and materialization, authorization and sensitive flow, settlement source-to-shares, disclosure boundary, and proof contract closure.',
    detail:
      'Each family has members, theorem IDs, replay step IDs, witness artifact paths, artifact bindings, and fail-closed conditions. The product hides most of that detail until the user needs an exact read.',
    reason:
      'The docs need enough proof vocabulary that users understand why a green result is stronger than a UI success state.',
    points: [
      'Families explain what kind of claim was proven.',
      'Witness artifacts explain what evidence backs the claim.',
      'Replay steps explain how the claim can be checked again.',
    ],
  },
  {
    id: 'projection-redaction',
    eyebrow: 'Disclosure',
    title: 'Projection and redaction keep proof useful without leaking private source',
    summary:
      'Public, reviewer, buyer, and internal projections can expose different proof views while preserving a single underlying artifact set.',
    detail:
      'Docs and product copy must never imply that public proofs contain licensed source by default. Bounded-public proof is a separate projection from private proof payloads.',
    reason:
      'A Source Share market only works if value is measurable without casually disclosing the source that gives it value.',
  },
  {
    id: 'generated-appendix',
    eyebrow: 'Generated evidence',
    title: 'Generated appendices and proof artifacts are part of the system',
    summary:
      'V26 generated evidence includes spec-family reports, canonical input reports, gate checkpoints, proof appendices, application composition proof, conversations continuity, persistence/schema totality, retained package admissibility, and later closure witnesses.',
    detail:
      'When evidence is stale, missing, or inconsistent, Bitcode must fail closed rather than letting product language outrun proof truth.',
    reason:
      'This keeps commercial claims auditable as the repository moves from launch-mode demonstration state toward production readiness.',
  },
] as const satisfies readonly DocsGuideCard[];

const settlementSections = [
  {
    id: 'btd-accounting',
    eyebrow: '$BTD',
    title: 'Settlement converts accepted source-to-shares evidence into exact accounting',
    summary:
      'Bitcode allocates BTD-denominated accounting from contribution, fit, participation, and proof posture. It must preserve exactness, normalization, journal completeness, and payment-observation coherence.',
    detail:
      'The user-facing idea is simple: useful measured source can become attributable value. The protocol detail is strict: allocation conservation, quantized fit-quality receipting, journals, receipts, and policy-bound execution all have to agree.',
    reason:
      'Settlement is where Source Shares become economically meaningful instead of just technically interesting.',
    points: [
      'Fit quality affects settlement posture.',
      'Journals and receipts make allocation rereadable.',
      'Wallet and signer readiness decide whether settlement can move beyond staged review.',
    ],
  },
  {
    id: 'payment-modes',
    eyebrow: 'Payment modes',
    title: 'Base-layer, repeated-read, and sidechain modes are interface postures',
    summary:
      'V26 records bitcoin mainchain execution, repeated-read payment execution, and sidechain execution as hardened interface responsibilities, not marketing labels.',
    detail:
      'In launch mode these may be mocked or boundary-only. The product must still teach what the modes mean, which receipts would prove them, and which blockers prevent live settlement.',
    reason:
      'Commercial credibility depends on users seeing the difference between modeled readiness and live execution.',
  },
] as const satisfies readonly DocsGuideCard[];

const commercialInterfaceSections = [
  {
    id: 'interface-model',
    eyebrow: 'Interfaces',
    title: 'Commercial interfaces read and write Exchange state under Protocol rules',
    summary:
      'GitHub, webhooks, ChatGPT App, Bitcode MCP, storage, compute, and future partner surfaces can admit inputs or deliver outputs, but they must not become parallel product owners.',
    detail:
      'An interface is healthy when its write admission is explicit, its read result can be found in Exchange, and its boundary posture is visible in Terminal.',
    reason:
      'This prevents interface sprawl from diluting the Bitcode source-to-shares contract.',
    points: [
      'Ingress surfaces attach source, Need, or destination context.',
      'Delivery surfaces provide Shippables backed by AssetPack evidence.',
      'Every interface must preserve proof, disclosure, and fail-closed boundaries.',
    ],
  },
  {
    id: 'github-webhooks',
    eyebrow: 'GitHub + webhooks',
    title: 'GitHub and webhooks are connected-interface delivery and ingress surfaces',
    summary:
      'GitHub can bind repository supply and deliver Shippables such as pull requests, comments, issues, or reviews. Webhooks can schedule AssetPack automation and record ingress basis.',
    detail:
      'Neither GitHub nor webhooks own product canon. Their job is to feed or receive Bitcode-controlled state and leave evidence behind.',
    reason:
      'This keeps repository automation commercially useful without turning external provider behavior into unprovable product truth.',
  },
  {
    id: 'compute-storage',
    eyebrow: 'Runtime',
    title: 'Compute and storage are hardened runtime surfaces',
    summary:
      'Compute-container execution, storage publication/retrieval, telemetry, and reconciliation must be visible when they affect proof, source, settlement, or disclosure posture.',
    detail:
      'Users do not need every runtime detail by default. They do need to know what is live, what is modeled, what is boundary-only, and what is blocked.',
    reason:
      'Runtime honesty is the difference between a trusted commercial interface and a black-box automation demo.',
  },
] as const satisfies readonly DocsGuideCard[];

const mcpSections = [
  {
    id: 'mcp-role',
    eyebrow: 'MCP',
    title: 'Bitcode MCP is a connected Exchange interface',
    summary:
      'MCP tools should expose current Bitcode actions and reads: attach source, express Need, admit AssetPack intent, read activity, inspect proof posture, and return write-admission evidence.',
    detail:
      'The MCP surface should be narrow and explicit. Non-admitted generic tools are support or reference surfaces until the Protocol, Exchange, and Terminal can read their effects.',
    reason:
      'MCP makes Bitcode programmable, but programmability is only valuable if it keeps source-to-shares proof parity.',
    points: [
      'Tool calls must be confirmation-gated when they write.',
      'Tool results must point back to Exchange-readable activity.',
      'PromptPart and attachment structures preserve source and Need context.',
    ],
  },
  {
    id: 'api-read-write',
    eyebrow: 'API',
    title: 'The API contract is write, reread, and prove',
    summary:
      'A useful API action writes bounded intent, returns admission evidence, and gives the caller a way to reread the resulting Exchange state.',
    detail:
      'Docs for MCP should therefore teach request shape, expected result, failure posture, and which Terminal read confirms the write.',
    reason:
      'This mirrors the Terminal action manual for external developers and agentic clients.',
  },
] as const satisfies readonly DocsGuideCard[];

const chatGptAppSections = [
  {
    id: 'chatgpt-role',
    eyebrow: 'ChatGPT App',
    title: 'The ChatGPT App is a guided Bitcode interface, not a separate assistant',
    summary:
      'A ChatGPT App can help users express Needs, attach source, ask for proof explanations, draft Shippables, and operate through confirmation-gated writes.',
    detail:
      'Its answers should map back to Exchange records and Terminal reads. The app may be conversational, but the proof and state contract remains Bitcode.',
    reason:
      'This keeps a familiar commercial interface aligned with Protocol-grade evidence instead of drifting into untracked chat output.',
    points: [
      'Confirm writes before changing Exchange state.',
      'Attach source, output destinations, Need intent, and AssetPack references as structured context.',
      'Return Terminal links or activity IDs for reread.',
    ],
  },
  {
    id: 'safe-results',
    eyebrow: 'Results',
    title: 'Chat results should teach where to verify',
    summary:
      'A good ChatGPT App response should say what it did, what is staged, what is blocked, and where the user can verify the result in Terminal.',
    detail:
      'This is the same write/read discipline as the Terminal action guide, adapted for conversational operation.',
    reason:
      'Users should never have to trust a chat transcript when Exchange and Terminal can show the actual state.',
  },
] as const satisfies readonly DocsGuideCard[];

const chatGptAppApiReference = [
  {
    id: 'chatgpt-app-tools',
    title: 'ChatGPT App MCP tools',
    summary:
      'These are the canonical tools exported by packages/chatgptapp. Read tools gather evidence; write tools require confirmed: true and return write-admission metadata.',
    packagePath: 'packages/chatgptapp/src/tools.ts',
    features: [
      {
        name: 'answer_codebase_query',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Ask a targeted question about the current repository or find existing implementation points.',
        howToUse:
          'Call with a regex-friendly query and optional cwd/maxResults. Use the returned file lines to decide whether to extend existing behavior or introduce new behavior.',
        inputs: [
          'query: required search pattern.',
          'cwd: optional working directory scope.',
          'maxResults: optional 1-500 cap, default 100.',
          'ignoreCase: optional boolean, default false.',
        ],
        outputs: [
          'answer: plain-language summary plus file:line hits.',
          'metadata.matches: structured match objects.',
          'metadata.matchCount and guidance: count and next-step framing.',
        ],
        verifyInTerminal: 'Use the resulting files as source context before a Terminal or connected-interface write.',
      },
      {
        name: 'answer_codeweb_query',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Research external technical references, examples, or documentation for a product or implementation decision.',
        howToUse:
          'Call with a focused query. Keep the result as external reference evidence, not Exchange state, until it is attached to a real Bitcode action.',
        inputs: [
          'query: required web research query.',
          'numResults: optional 1-20 cap, default 8.',
          'useAutoprompt: optional provider refinement toggle, default true.',
        ],
        outputs: [
          'answer: numbered reading list or no-source guidance.',
          'metadata.provider: exa.',
          'metadata.results: normalized title, url, and summary records.',
        ],
      },
      {
        name: 'depict_design_asset',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Turn a screenshot, diagram, or wireframe into text that later tools can reference.',
        howToUse:
          'Pass base64 or text asset data with an optional focus. Use the depiction as context for design_code or code_design.',
        inputs: [
          'assetData: required base64 or UTF-8 asset representation.',
          'focus: optional analysis emphasis.',
          'notes: optional author hints.',
        ],
        outputs: [
          'depiction: textual description of the asset.',
          'metadata.focus: requested emphasis.',
          'metadata.bytes: decoded/estimated asset size.',
        ],
      },
      {
        name: 'design_code',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Capture conversational product intent into .ai/PRODUCT.md before planning implementation.',
        howToUse:
          'Pass raw ideas. Optionally include current PRODUCT.md or request digest regeneration before appending proposed updates.',
        inputs: [
          'ideas: required raw ideas or requirements.',
          'currentProductMd: optional current .ai/PRODUCT.md snapshot.',
          'regenerateFromDigest: optional boolean to rebuild the baseline from digest.',
        ],
        outputs: [
          'update: proposed update block.',
          'latest_design: full latest PRODUCT.md content.',
          'metadata.aiDocument, guidance, digestUsed, and prepared context stats.',
        ],
        verifyInTerminal: 'Treat this as design context until a later write creates Exchange-readable activity.',
      },
      {
        name: 'code_design',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Translate accepted design intent into tasks and patch scaffolds before code changes.',
        howToUse:
          'Pass the design update and optional target files. Review the generated implementation actions before executing any write.',
        inputs: [
          'update: required implementation update or summary.',
          'latest_design: optional PRODUCT.md content.',
          'files: optional array of { path, intent } targets.',
        ],
        outputs: [
          'update: numbered implementation actions plus diff scaffold.',
          'latest_design: design basis used for the plan.',
          'metadata.taskCount, fileCount, guidance, and prepared context stats.',
        ],
      },
      {
        name: 'read_code_changes_from_vcs',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Summarize recent GitHub activity before deciding what changed or what to build next.',
        howToUse:
          'Pass a GitHub token, owner, repo, and optional branch/limit. Use the result as VCS read evidence.',
        inputs: [
          'accessToken: required GitHub repo-scoped token.',
          'owner and repo: required repository coordinates.',
          'branch: optional branch ref.',
          'limit: optional 1-50 commit cap, default 10.',
        ],
        outputs: [
          'changes: human-readable commit summary.',
          'metadata.branch and commitCount.',
          'metadata.urlSamples: source URLs for follow-up.',
        ],
      },
      {
        name: 'write_code_changes_to_vcs',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Create a GitHub repository or write file contents after explicit user confirmation.',
        howToUse:
          'Set confirmed: true. For createRepository, pass name/description/private. For createOrUpdateFile, pass owner/repo/path/content/message/branch.',
        inputs: [
          'operation: createRepository or createOrUpdateFile.',
          'confirmed: required true.',
          'accessToken: required GitHub repo-scoped token.',
          'name, description, private: repository creation inputs.',
          'owner, repo, path, content, message, branch: file-write inputs.',
        ],
        outputs: [
          'result: GitHub repository or commit response.',
          'metadata.operation and optional sha.',
          'metadata.writeAdmission: interfaceSurface, permission basis, operation, and targetAnchor.',
        ],
        verifyInTerminal: 'Reread the connected-interface result as a delivery mechanism, not independent Exchange truth.',
        failureModes: [
          'Throws if confirmed is not true.',
          'Throws if createOrUpdateFile lacks owner, repo, or path.',
        ],
        requiresConfirmation: true,
      },
      {
        name: 'improve_developing_behavior',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Record collaboration rules or agent behavior preferences into .ai/AGENTS.md.',
        howToUse:
          'Pass improvement_betterment and optional current AGENTS.md. Use regenerateFromDigest when the baseline should be rebuilt first.',
        inputs: [
          'improvement_betterment: optional behavior note.',
          'currentAgentsMd: optional current AGENTS.md snapshot.',
          'regenerateFromDigest: optional boolean.',
        ],
        outputs: [
          'thennnowevolution: appended behavior block.',
          'concretelatestgreatestapproach and latest_behavior: latest AGENTS.md.',
          'metadata.aiDocument, guidance, digestUsed, and prepared context stats.',
        ],
      },
      {
        name: 'use_vercel_read_external_mcp',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Read Vercel teams, projects, deployments, build logs, events, or docs from ChatGPT.',
        howToUse:
          'Set request to the Vercel read operation and pass provider-specific arguments in payload.',
        inputs: [
          'request: list_teams, list_projects, get_project, list_deployments, get_deployment, get_deployment_events, get_deployment_build_logs, or search_documentation.',
          'payload: optional Vercel arguments such as teamId, projectId, idOrUrl, limit, topic, or tokens.',
        ],
        outputs: [
          'answer: Vercel tool response.',
          'metadata.provider: vercel.',
          'metadata.request, aiDocument, and guidance.',
        ],
      },
      {
        name: 'use_vercel_write_external_mcp',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Request Vercel delivery actions after explicit user confirmation.',
        howToUse:
          'Set confirmed: true and request deploy_to_vercel, buy_domain, or check_domain_availability with provider arguments in payload.',
        inputs: [
          'request: deploy_to_vercel, buy_domain, or check_domain_availability.',
          'confirmed: required true.',
          'payload: projectId/teamId/message, domain names/contact, or availability names.',
        ],
        outputs: [
          'result: Vercel write or availability result.',
          'metadata.provider, request, guidance, and aiDocument.',
          'metadata.writeAdmission with connectedInterface vercel and targetAnchor.',
        ],
        failureModes: ['Throws if confirmed is not true.'],
        requiresConfirmation: true,
      },
      {
        name: 'use_aws_read_external_mcp',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Read AWS runtime state from ChatGPT for health checks or configuration confirmation.',
        howToUse:
          'Set request to the AWS read action and pass the raw AWS-style payload through to the underlying tool.',
        inputs: [
          'request: lambda.invoke, s3.getObject, dynamo.getItem, or cloudwatch.log.',
          'payload: raw function, bucket/key, table/key, or log query arguments.',
        ],
        outputs: [
          'answer: AWS read result.',
          'metadata.provider: aws.',
          'metadata.request, aiDocument, and guidance.',
        ],
      },
      {
        name: 'use_aws_write_external_mcp',
        method: 'tools/call',
        packagePath: 'packages/chatgptapp/src/tools.ts',
        useWhen: 'Write scoped AWS delivery/configuration outputs after explicit user confirmation.',
        howToUse:
          'Set confirmed: true and request s3.putObject or dynamo.putItem with the underlying AWS payload.',
        inputs: [
          'request: s3.putObject or dynamo.putItem.',
          'confirmed: required true.',
          'payload: bucket/key/body or table/item style arguments.',
        ],
        outputs: [
          'result: AWS write result.',
          'metadata.provider, request, guidance, and aiDocument.',
          'metadata.writeAdmission with connectedInterface aws and targetAnchor.',
        ],
        failureModes: ['Throws if confirmed is not true.'],
        requiresConfirmation: true,
      },
    ],
  },
] as const satisfies readonly DocsInterfaceApiSection[];

const mcpApiReference = [
  {
    id: 'mcp-call-lifecycle',
    title: 'MCP call lifecycle',
    summary:
      'The Exchange-facing MCP server exposes tools/list and tools/call over the Model Context Protocol, authenticates each call, applies rate/resource limits, and dispatches by bitcode:// prefix.',
    packagePath: 'packages/executions-mcp/src/mcp-server/src/server.ts',
    features: [
      {
        name: 'tools/list',
        method: 'MCP request',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/server.ts',
        useWhen: 'Discover the active default Bitcode MCP tools available to a client.',
        howToUse:
          'Call tools/list after connecting. The default server registers pipeline, analysis, intelligence, enterprise, LSP, and observability categories.',
        inputs: ['No body is required for discovery.'],
        outputs: [
          'tools: array of { name, description, inputSchema } records.',
          'Server logs include count and failed category count.',
        ],
      },
      {
        name: 'tools/call',
        method: 'MCP request',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/server.ts',
        useWhen: 'Execute one Exchange-facing MCP feature.',
        howToUse:
          'Pass name and arguments. Include request params _meta.authorization when auth is required. Local repositories are prepared before execution when repository.provider is local.',
        inputs: [
          'name: required bitcode:// tool identifier.',
          'arguments: tool-specific validated input object.',
          '_meta.authorization: optional auth header used by authenticateMCPRequest.',
        ],
        outputs: [
          'Tool-specific result object.',
          'Execution passes through auth, rate limits, resource limits, and circuit breaker handling.',
        ],
        failureModes: [
          'Authentication failure rejects the call.',
          'Invalid schema arguments return validation errors.',
          'Unknown tool names fail closed.',
        ],
      },
    ],
  },
  {
    id: 'mcp-pipeline-tools',
    title: 'Pipeline tools',
    summary:
      'Pipeline tools write bounded AssetPack intent into Exchange-facing execution, require pipeline create permission, and return rereadable run/admission metadata.',
    packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/pipeline-tools.ts',
    features: [
      {
        name: 'bitcode://pipelines/asset-pack/create',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/pipeline-tools.ts',
        useWhen: 'Create an AssetPack pipeline for implementation, review, issue work, docs, diagrams, API specs, scaffolding, planning, or refactoring.',
        howToUse:
          'Pass task, repository, subtype, and optional attachments/connections. Use streaming for queued run reread or wait for completion when streaming is false.',
        inputs: [
          'task: required detailed task, minimum 10 characters.',
          'repository: required RepositoryContext, including provider/owner/name/branch or local path.',
          'subtype: pull_request, pr_review, issue, comment, blog_post, diagram, api_spec, frontend_scaffolder, scope_analysis, implementation_plan, or refactor_proposal.',
          'attachments: optional multimodal source context.',
          'connections: optional repository/provider ingress context.',
          'mcpConfig, streaming, organizationId, modelPreferences, and options.',
        ],
        outputs: [
          'runId and shippableCompatibilityId.',
          'status, interfaceSurface, inputContext, writeAdmission, and outputMeaning.',
          'When completed: result, assetPacks/deliverables, btdUsed, timestamps, and events.',
        ],
        verifyInTerminal: 'Open the returned run/activity and inspect AssetPack, proof, delivery, and settlement posture.',
        failureModes: [
          'Requires pipelines.create permission.',
          'Rejects incoherent repository_connection ingress.',
          'Rejects non-local providers without matching connection or provider credential.',
        ],
        requiresConfirmation: true,
      },
    ],
  },
  {
    id: 'mcp-analysis-tools',
    title: 'Analysis tools',
    summary:
      'Analysis tools read repository, dependency, pattern, and trend evidence for Exchange and Terminal users.',
    packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/analysis-tools.ts',
    features: [
      {
        name: 'bitcode://analysis/repository/analyze',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/analysis-tools.ts',
        useWhen: 'Analyze one repository for architecture, dependencies, security, performance, quality, complexity, patterns, or technical debt.',
        howToUse: 'Pass repository coordinates, analysisType, and optional depth/output controls.',
        inputs: [
          'repository: { owner, name, branch? }.',
          'analysisType: architecture, dependencies, security, performance, quality, complexity, patterns, or technical_debt.',
          'depth: surface, medium, or deep.',
          'includeMetrics and outputFormat.',
        ],
        outputs: ['repository, branch, analysisType, timestamp, analyst.', 'results and metadata with analysisId, duration, confidence, lines/files analyzed.'],
      },
      {
        name: 'bitcode://analysis/intelligence/synthesize',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/analysis-tools.ts',
        useWhen: 'Synthesize trends across repository, organization, or user scope.',
        howToUse: 'Pass scope/timeframe and optional repositories, analysisTypes, recommendation, and confidence settings.',
        inputs: [
          'scope: repository, organization, or user.',
          'timeframe: 7d, 30d, 90d, or all.',
          'repositories and analysisTypes.',
          'includeRecommendations and confidenceThreshold.',
        ],
        outputs: ['insights, recommendations, trends, and metadata.', 'Confidence-scored strategic guidance for engineering decisions.'],
      },
      {
        name: 'bitcode://analysis/patterns/detect',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/analysis-tools.ts',
        useWhen: 'Find design patterns, anti-patterns, architecture patterns, testing patterns, security patterns, or performance patterns.',
        howToUse: 'Pass repository/path plus pattern type filters and severity.',
        inputs: [
          'repository: { owner, name, path? }.',
          'patternTypes: optional array.',
          'language, includeExamples, and severity.',
        ],
        outputs: ['patterns with type, name, confidence, locations, examples, severity, and recommendations.', 'summary totals and average confidence.'],
      },
      {
        name: 'bitcode://analysis/dependencies/analyze',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/analysis-tools.ts',
        useWhen: 'Analyze dependency graph, vulnerabilities, licenses, updates, and dependency risk.',
        howToUse: 'Pass repository plus depth and inclusion toggles.',
        inputs: [
          'repository: { owner, name }.',
          'analysisDepth: direct, transitive, or full.',
          'includeVulnerabilities, includeLicenses, includeUpdates.',
          'outputFormat: json, graph, or report.',
        ],
        outputs: ['dependency counts, vulnerabilities, license summary, update recommendations, and risk posture.'],
      },
    ],
  },
  {
    id: 'mcp-intelligence-tools',
    title: 'Intelligence tools',
    summary:
      'Intelligence tools turn measured code, repositories, research, and attachments into higher-level recommendations.',
    packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/intelligence-tools.ts',
    features: [
      {
        name: 'bitcode://intelligence/effectiveness/track',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/intelligence-tools.ts',
        useWhen: 'Measure, predict, learn, or optimize code-change effectiveness.',
        howToUse: 'Choose operation and provide the matching metrics, proposedChanges, outcomes, or targetMetrics.',
        inputs: ['operation: measure, predict, learn, or optimize.', 'pipelineId, beforeMetrics, afterMetrics, repository, proposedChanges, outcomes, targetMetrics, constraints, timeframe, includeConfidence.'],
        outputs: ['Effectiveness scores, predictions, learning results, or optimization recommendations with confidence data.'],
      },
      {
        name: 'bitcode://intelligence/cross-repo/learn',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/intelligence-tools.ts',
        useWhen: 'Extract, propagate, analyze, or recommend cross-repository patterns.',
        howToUse: 'Choose operation and provide source repositories, patterns, targets, analysisType, or repositoryContext.',
        inputs: ['operation: extract, propagate, analyze, or recommend.', 'sourceRepositories, patterns, targetRepositories, analysisType, repositoryContext, includeVisualization, maxResults.'],
        outputs: ['Extracted patterns, propagation results, cross-repo insights, visualization data, and recommendations.'],
      },
      {
        name: 'bitcode://intelligence/research/advanced',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/intelligence-tools.ts',
        useWhen: 'Run multi-provider research with URL credibility and synthesis.',
        howToUse: 'Pass a detailed query, researchType, provider list, filters, and synthesis options.',
        inputs: ['query, researchType, providers, filters, synthesisType, maxResults, includeUrlIntelligence, contextAware.'],
        outputs: ['research_results, synthesis, url_intelligence, and credibility_scores.'],
      },
      {
        name: 'bitcode://intelligence/multimodal/process',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/intelligence-tools.ts',
        useWhen: 'Process images, audio, video, documents, Figma files, or URLs into engineering intelligence.',
        howToUse: 'Pass at least one attachment, a processingType, and desired output format/synthesis settings.',
        inputs: ['attachments: array of { type, content, metadata? }.', 'processingType, outputFormat, crossModalSynthesis, includeImplementationGuidance, contextRepository, qualityThreshold.'],
        outputs: ['processed_attachments, synthesis, implementation_guidance, and quality_scores.'],
      },
      {
        name: 'bitcode://intelligence/enterprise/orchestrate',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/intelligence-tools.ts',
        useWhen: 'Analyze team, organization, knowledge, skill-gap, collaboration, innovation, risk, or strategy posture.',
        howToUse: 'Pass operation, organizationId, scope, time horizon, depth, recommendation, benchmarking, and confidentiality settings.',
        inputs: ['operation, organizationId, scope, timeHorizon, analysisDepth, includeRecommendations, includeBenchmarking, confidentialityLevel.'],
        outputs: ['analysis, strategic_insights, benchmarking, and recommendations.'],
      },
      {
        name: 'bitcode://intelligence/marketplace/analyze',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/intelligence-tools.ts',
        useWhen: 'Discover, assess, price, or risk-review marketplace solutions and providers.',
        howToUse: 'Choose marketplace operation and provide requirements, listing/provider IDs, search query, filters, and risk settings.',
        inputs: ['operation, requirements, listingId, providerId, searchQuery, filters, includeCompetitiveAnalysis, riskTolerance.'],
        outputs: ['solutions, quality_assessment, provider_analysis, and recommendations.'],
      },
    ],
  },
  {
    id: 'mcp-enterprise-tools',
    title: 'Enterprise interface tools',
    summary:
      'Enterprise tools configure webhooks, managed APIs, integration marketplace connectors, and observability surfaces.',
    packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/enterprise-tools.ts',
    features: [
      {
        name: 'bitcode://enterprise/webhook/orchestrate',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/enterprise-tools.ts',
        useWhen: 'Create, update, delete, test, route, batch, or inspect enterprise webhooks.',
        howToUse: 'Pass operation and the webhook/routing/test/analytics payload that matches it.',
        inputs: ['operation plus webhook config, testPayload, analyticsTimeRange, webhookIds, or routingRules.'],
        outputs: ['Webhook operation result, analytics, delivery status, routing results, or audit-ready recommendations.'],
      },
      {
        name: 'bitcode://enterprise/api/manage',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/enterprise-tools.ts',
        useWhen: 'Manage API lifecycle: create, version, deploy, govern, document, rate-limit, monitor, or test APIs.',
        howToUse: 'Pass operation and API config, environment, versioning strategy, governance rules, or test suite.',
        inputs: ['operation plus api, versioningStrategy, environment, governanceRules, or testSuite.'],
        outputs: ['API operation result, governance score, documentation output, analytics, or test report.'],
      },
      {
        name: 'bitcode://enterprise/integration/marketplace',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/enterprise-tools.ts',
        useWhen: 'Browse, install, configure, update, uninstall, analyze, develop, or publish enterprise integrations.',
        howToUse: 'Pass operation and the relevant marketplace, integration, connector, or filter payload.',
        inputs: ['operation plus filters, integration config, connector config, dataMapping, triggers, schedule, or tests.'],
        outputs: ['integrations, marketplace_analytics, installation_status, and custom_connectors.'],
      },
      {
        name: 'bitcode://enterprise/observability/configure',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/enterprise-tools.ts',
        useWhen: 'Configure metrics, traces, logs, alerts, dashboards, and analysis settings for enterprise observability.',
        howToUse: 'Pass monitoringConfig, alerts, dashboard, and analysisConfig.',
        inputs: ['monitoringConfig, alerts, dashboard, analysisConfig.'],
        outputs: ['monitoring_status, dashboards, alerts, telemetry_endpoints, and related configuration results.'],
      },
    ],
  },
  {
    id: 'mcp-lsp-tools',
    title: 'LSP and code-intelligence tools',
    summary:
      'LSP tools provide semantic analysis, navigation/refactoring, diagnostics, and workspace-wide intelligence.',
    packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/lsp-tools.ts',
    features: [
      {
        name: 'bitcode://lsp/semantic/analyze',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/lsp-tools.ts',
        useWhen: 'Analyze symbols, types, dependency graphs, call graphs, semantic search, hover, or signatures.',
        howToUse: 'Pass repository, targets, optional position, analysisConfig, and filters.',
        inputs: ['repository, targets, position, analysisConfig, filters.'],
        outputs: ['Semantic analysis, symbol relationships, dependency/call graph data, and contextual code intelligence.'],
      },
      {
        name: 'bitcode://lsp/intelligence/navigate',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/lsp-tools.ts',
        useWhen: 'Find references, rename symbols, extract methods, find implementations, get actions, or organize imports.',
        howToUse: 'Pass repository, symbol target, refactoring config, optional range, and formatting options.',
        inputs: ['repository, symbol, refactoringConfig, range, formattingOptions.'],
        outputs: ['references, rename or refactor previews, implementations, code actions, quick fixes, and source actions.'],
      },
      {
        name: 'bitcode://lsp/diagnostic/analyze',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/lsp-tools.ts',
        useWhen: 'Run diagnostics across syntax, semantics, performance, security, complexity, tests, or dependencies.',
        howToUse: 'Pass repository, scope, diagnosticConfig, thresholds, preferences, and outputConfig.',
        inputs: ['repository, scope, diagnosticConfig, qualityThresholds, analysisPreferences, outputConfig.'],
        outputs: ['diagnostics, quality_score, recommendations, and metrics.'],
      },
      {
        name: 'bitcode://lsp/workspace/intelligence',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/lsp-tools.ts',
        useWhen: 'Understand architecture, module dependencies, API surface, change impact, technical debt, and knowledge graph.',
        howToUse: 'Pass repository, analysisScope, changeAnalysis, architectureConfig, knowledgeGraphConfig, migrationConfig, and visualizationConfig.',
        inputs: ['repository, analysisScope, changeAnalysis, architectureConfig, knowledgeGraphConfig, migrationConfig, visualizationConfig.'],
        outputs: ['workspace_analysis, architecture_insights, knowledge_graph, and recommendations.'],
      },
    ],
  },
  {
    id: 'mcp-observability-tools',
    title: 'Observability tools',
    summary:
      'Observability tools read and configure metrics, traces, business intelligence, and log analytics.',
    packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/observability-tools.ts',
    features: [
      {
        name: 'bitcode://observability/metrics/realtime',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/observability-tools.ts',
        useWhen: 'Collect/query metrics, configure alerts, build dashboards, or stream real-time data.',
        howToUse: 'Pass metrics, query, alert, dashboard, and streamConfig depending on the operation.',
        inputs: ['metrics, query, alert, dashboard, streamConfig.'],
        outputs: ['metrics result, alert status, dashboard data, stream configuration, anomalies, and benchmarks.'],
      },
      {
        name: 'bitcode://observability/tracing/distributed',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/observability-tools.ts',
        useWhen: 'Analyze distributed traces, spans, service maps, profiling, bottlenecks, and request flow.',
        howToUse: 'Pass trace/span data and analysis, profiling, and service-map config.',
        inputs: ['trace, span, analysisConfig, profilingConfig, serviceMapConfig.'],
        outputs: ['trace analysis, bottlenecks, dependencies, health, and visualization data.'],
      },
      {
        name: 'bitcode://observability/intelligence/business',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/observability-tools.ts',
        useWhen: 'Read engineering productivity, ROI, technical debt cost, velocity, quality, innovation, and benchmark metrics.',
        howToUse: 'Pass scope, metricsConfig, analysisPreferences, outputConfig, and benchmarkConfig.',
        inputs: ['scope, metricsConfig, analysisPreferences, outputConfig, benchmarkConfig.'],
        outputs: ['metrics, insights, recommendations, and forecasts.'],
      },
      {
        name: 'bitcode://observability/logs/analytics',
        method: 'tools/call',
        packagePath: 'packages/executions-mcp/src/mcp-server/src/tools/observability-tools.ts',
        useWhen: 'Run log search, pattern detection, anomaly analysis, security analysis, or compliance reporting.',
        howToUse: 'Pass logs or searchQuery with analysis, pattern, anomaly, and compliance config.',
        inputs: ['logs, analysisConfig, searchQuery, patternConfig, anomalyConfig, complianceConfig.'],
        outputs: ['analysis, patterns, anomalies, compliance, and correlated log intelligence.'],
      },
    ],
  },
] as const satisfies readonly DocsInterfaceApiSection[];

const configurationSections = [
  {
    id: 'environment-modes',
    eyebrow: 'Modes',
    title: 'Environment mode, feature flags, and boundary state explain what is live',
    summary:
      'Production, staging, development, and mock postures must stay explicit. Feature flags can keep launch-mode controls visible but disabled until the connected implementation is ready.',
    detail:
      'A disabled control should still teach what it will do. That keeps users oriented and avoids implying that missing connectivity is accidental breakage.',
    reason:
      'This is especially important while Terminal is active and shipping with mocked state toward commercial readiness.',
    points: [
      'Disabled controls remain visible with clear tooltip copy.',
      'Terminal is active; Exchange and Auxillaries can remain gated by launch flags.',
      'Boundary truth should be readable before any proof or settlement trust decision.',
    ],
  },
  {
    id: 'preferences',
    eyebrow: 'Preferences',
    title: 'Configuration should be rich but consequence-oriented',
    summary:
      'Auxillary configuration includes repository connections, interface defaults, profile identity, wallet posture, organization roles, $BTD settings, and future connected-interface options.',
    detail:
      'Each preference should explain the operational consequence: what it changes in Terminal, Exchange, settlement, delivery, or proof visibility.',
    reason:
      'Configuration is not a settings dump; it is the user-facing control plane around Source Shares.',
  },
  {
    id: 'fail-closed',
    eyebrow: 'Safety',
    title: 'Every blocked configuration path should fail closed',
    summary:
      'Wallet verification drift, missing repository scope, stale connection state, projection overexposure, or unadmitted interface writes should block the risky action while preserving safe reads and learning.',
    detail:
      'The product can still show mocked or review-only state, but it must be honest about what cannot yet transact or deliver.',
    reason:
      'Fail-closed behavior makes launch-mode UX useful without weakening the production standard.',
  },
] as const satisfies readonly DocsGuideCard[];

export const TERMINAL_ACTION_GUIDES = [
  {
    id: 'scenario',
    action: 'Choose the active scenario',
    location: 'Command deck',
    write:
      'Select the measured Need or operating frame the Terminal should honor before fit, branch, and closure work continues.',
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
      'The master-detail view can reopen the exact Need frame with parser posture, scenario, and review state intact.',
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
      'The Terminal shows boundary truth before downstream AssetPacks or settlement are trusted.',
    proofSignal: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime.summary,
  },
  {
    id: 'closure-run',
    action: 'Run closure and branch follow-through',
    location: 'Closure controls',
    write:
      'Run the closure path from Need review through verification, branch materialization, settlement, and proof.',
    expectedRead:
      'Verification, branch artifacts, AssetPack settlement, ledger continuity, and history should read as one consequence chain.',
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
      'Which Bitcode activity is selected, how it is typed, and whether it reads as give, Need, closure, proof, or history posture.',
    expectedResult:
      'You can search, filter, page, and reopen activity without losing the selected detail read.',
  },
  {
    id: 'selected-detail',
    read: 'Selected activity detail',
    location: 'Master-detail Terminal',
    tellsYou:
      'The selected activity identity, source posture, AssetPacks, proof rows, closure state, and related history.',
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
      'Need review, verification, branch artifacts, AssetPack settlement, and ledger continuity read as one sequence.',
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
  docsPage({
    slug: 'what-is-bitcode',
    chapterId: 'start',
    eyebrow: 'Start here',
    title: 'What Bitcode is',
    summary:
      'Begin with the zero-to-hero map: what Source Shares are, why the Exchange exists, how Terminal users operate, and where the Protocol and interfaces fit.',
    detail:
      'This is the first page for readers who know nothing about Bitcode. It keeps the model plain before introducing the deeper Terminal, Exchange, proof, and interface pages.',
    learningOutcome:
      'You can explain Bitcode as source-to-shares market infrastructure and name the major product surfaces without needing implementation history.',
    primaryCta: { href: '/docs/source-shares', label: 'Continue to Source Shares' },
    sections: whatIsBitcodeSections,
    embeddedUi: [
      {
        id: 'product-surfaces',
        eyebrow: 'Component vocabulary',
        title: 'Exchange, Terminal, Protocol, interfaces',
        summary:
          'The docs use the same card and explainer pattern as Terminal so the mental model transfers into the application.',
        explainer: APPLICATION_WORKSPACE_EXPLAINERS.experienceMap,
        signals: [
          { label: 'Exchange', value: 'State, APIs, ledger', tone: 'emerald' },
          { label: 'Terminal', value: 'Operator read/write UX', tone: 'cyan' },
          { label: 'Protocol', value: 'Rules and proofs', tone: 'amber' },
        ],
        steps: [
          { label: 'Give', body: 'Source enters with provenance and repository context.' },
          { label: 'Need', body: 'Demand becomes measurable before fit or settlement.' },
          { label: 'Read', body: 'Every write must produce an Exchange-readable result.' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'source-shares',
    chapterId: 'start',
    eyebrow: 'Source Shares',
    title: 'Source Shares and the Bitcode Exchange',
    summary:
      'Learn the value model first: Bitcode measures technical source into Source Shares, then lets Terminal users read and operate the market path.',
    detail:
      'This guide is for first-time readers who need the simple model before using Terminal: source supply comes in, demand is measured, fit and proofs decide what can move, and settlement makes attribution readable.',
    learningOutcome:
      'You can describe a Source Share, identify what gets measured, and understand why proof-backed settlement matters.',
    primaryCta: { href: '/docs/exchange', label: 'Read Exchange guide' },
    sections: sourceSharesSections,
    embeddedUi: [
      {
        id: 'source-share-flow',
        eyebrow: 'Terminal specimen',
        title: 'Source-to-shares status card',
        summary:
          'This mirrors the compact status cards used around Terminal: a reader should see supply, Need, fit, and proof as related signals.',
        explainer: APPLICATION_WORKSPACE_EXPLAINERS.supplyFit,
        signals: [
          { label: 'Supply', value: 'Repository-backed', tone: 'emerald' },
          { label: 'Need', value: 'Measured and reviewable', tone: 'cyan' },
          { label: 'Settlement', value: '$BTD attribution staged', tone: 'amber' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'exchange',
    chapterId: 'experiences',
    eyebrow: 'Exchange',
    title: 'Understand the Bitcode Exchange',
    summary:
      'Exchange is the durable state, activity, persistence, proof, API, and market-reading layer behind Terminal and connected interfaces.',
    detail:
      'Use this page after Source Shares are clear. It explains why Terminal actions must reread Exchange state before users trust the result.',
    learningOutcome:
      'You can separate Exchange responsibilities from Terminal UX and explain why rereadable state is central to Bitcode.',
    primaryCta: { href: '/docs/terminal', label: 'Open Terminal map' },
    sections: exchangeSections,
    embeddedUi: [
      {
        id: 'exchange-ledger',
        eyebrow: 'Embedded Terminal card',
        title: 'Activity ledger read window',
        summary:
          'The real Terminal uses a master-detail pattern. This specimen teaches what the ledger must make visible before a user opens exact detail.',
        explainer: APPLICATION_INLINE_EXPLAINERS.readWindow,
        signals: [
          { label: 'Search', value: 'Query-owned ledger', tone: 'default' },
          { label: 'Selected detail', value: 'Proof + history', tone: 'emerald' },
          { label: 'Reread', value: 'Durable Exchange state', tone: 'cyan' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'terminal',
    chapterId: 'experiences',
    eyebrow: 'Terminal map',
    title: 'Orient inside the Bitcode Terminal',
    summary:
      'Understand the Terminal as one master-detail ledger with deliberate write modes, support rails, and exact proof follow-through.',
    detail:
      'Use this page when you need to know where to read, where to write, and when to open deeper modes such as Conversations or Auxillaries.',
    learningOutcome:
      'You can open Terminal and identify the read window, write posture, repository supply, support rail, and deeper modes.',
    primaryCta: { href: '/docs/terminal-actions', label: 'Read action guide' },
    sections: terminalSections,
    embeddedUi: [
      {
        id: 'command-deck',
        eyebrow: 'Actual card grammar',
        title: 'Command deck signals',
        summary:
          'Terminal control cards pair plain labels with explainers because every control changes how the Exchange interprets work.',
        explainer: APPLICATION_WORKSPACE_EXPLAINERS.controls,
        signals: [
          { label: 'Scenario', value: 'Need frame', tone: 'emerald' },
          { label: 'Projection', value: 'Read posture', tone: 'cyan' },
          { label: 'Branch mode', value: 'AssetPack execution', tone: 'amber' },
        ],
        steps: [
          { label: 'Set', body: 'Choose the operating frame before closure.' },
          { label: 'Write', body: 'Run a bounded action only when readiness is clear.' },
          { label: 'Read', body: 'Verify the expected Exchange result.' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'terminal-actions',
    chapterId: 'experiences',
    eyebrow: 'Write guide',
    title: 'Terminal actions: what writes and what should read back',
    summary:
      'Every Terminal write should have an expected read result. This guide lists the operator actions and the state they should make visible.',
    detail:
      'Use this as the practical manual for Terminal operation. It follows the same model as the exhaustive tooltips: write deliberately, then verify the resulting read surface before moving deeper.',
    learningOutcome:
      'You can identify the write, the expected read, and the proof signal for each major Terminal action.',
    primaryCta: { href: '/application', label: 'Use Terminal' },
    sections: terminalActionSections,
    embeddedUi: [
      {
        id: 'write-read-loop',
        eyebrow: 'Write/read loop',
        title: 'Action cards are bounded state changes',
        summary:
          'The action guide mirrors Terminal controls: each write has a location, an expected read, and a proof signal.',
        explainer: APPLICATION_INLINE_EXPLAINERS.closureAction,
        signals: [
          { label: 'Write', value: 'Operator action', tone: 'emerald' },
          { label: 'Read', value: 'Exchange state', tone: 'cyan' },
          { label: 'Proof', value: 'Closure signal', tone: 'amber' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'read-results',
    chapterId: 'experiences',
    eyebrow: 'Read guide',
    title: 'Terminal reads, proofs, readiness, and expected results',
    summary:
      'Know what each read surface is supposed to prove before you trust a Bitcode activity, AssetPack, settlement, or ledger state.',
    detail:
      'This page is for experienced users auditing the result of Terminal work. It separates quick operating signals from exact proof and closure follow-through.',
    learningOutcome:
      'You can tell which read surface answers orientation, readiness, proof, settlement, and history questions.',
    primaryCta: { href: '/docs/terminal-actions', label: 'Compare write actions' },
    sections: readResultSections,
    embeddedUi: [
      {
        id: 'readiness-card',
        eyebrow: 'Readiness specimen',
        title: 'Boundary and signed-transaction readiness',
        summary:
          'Readiness cards teach whether a flow is live, modeled, blocked, review-only, or ready for signed follow-through.',
        explainer: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime,
        signals: [
          { label: 'Repository', value: 'Scoped', tone: 'emerald' },
          { label: 'Wallet', value: 'Staged', tone: 'amber' },
          { label: 'External runtime', value: 'Launch-mode mocked', tone: 'cyan' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'auxillaries',
    chapterId: 'modes',
    eyebrow: 'Auxillaries',
    title: 'Configure Auxillaries for identity, interfaces, and $BTD',
    summary:
      'Auxillaries explain the optional but commercially important configuration layer around Terminal: Connects, Interfaces, Profile, and $BTD.',
    detail:
      'Use this page to understand what each auxillary pane changes and why Terminal may stay fail-closed until a connection, identity, or wallet posture is complete.',
    learningOutcome:
      'You can identify each auxillary pane and understand which Terminal or Exchange capability it unlocks.',
    primaryCta: { href: '/docs/configuration', label: 'Read configuration guide' },
    sections: auxillariesSections,
    embeddedUi: [
      {
        id: 'auxillary-ring',
        eyebrow: 'Auxillary shell',
        title: 'Connects, Interfaces, Profile, $BTD',
        summary:
          'The auxillary ring is configuration with product consequences: each pane changes readiness or defaults for Terminal and Exchange.',
        explainer: BITCODE_PUBLIC_EXPLAINERS.openOrbitals,
        signals: [
          { label: 'Connects', value: 'Repository + providers', tone: 'emerald' },
          { label: 'Profile', value: 'Identity + roles', tone: 'cyan' },
          { label: '$BTD', value: 'Wallet-adjacent posture', tone: 'amber' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'conversations',
    chapterId: 'modes',
    eyebrow: 'Conversations',
    title: 'Use Conversations as a rich Bitcode write surface',
    summary:
      'Conversations provide ChatGPT-like drafting and coordination while preserving Exchange-backed source attachments, output destinations, AssetPack references, and Need-measurement intent.',
    detail:
      'This page explains how natural-language work stays compatible with source-to-shares proof instead of becoming untracked chat residue.',
    learningOutcome:
      'You can explain how conversation writes become Exchange-readable evidence and why attachments must be structured.',
    primaryCta: { href: '/docs/chatgpt-app', label: 'Compare ChatGPT App interface' },
    sections: conversationsSections,
    embeddedUi: [
      {
        id: 'conversation-evidence',
        eyebrow: 'Rich input',
        title: 'Conversation input should become Exchange evidence',
        summary:
          'Chat can be expressive, but Bitcode needs normalized context so Terminal can reread the outcome.',
        explainer: APPLICATION_INLINE_EXPLAINERS.writePosture,
        signals: [
          { label: 'Source', value: 'Attachment tokens', tone: 'emerald' },
          { label: 'Need', value: 'Measurement intent', tone: 'cyan' },
          { label: 'Output', value: 'Destination refs', tone: 'amber' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'configuration',
    chapterId: 'modes',
    eyebrow: 'Configuration',
    title: 'Read launch-mode, environment, and feature configuration clearly',
    summary:
      'Configuration docs explain feature flags, environment modes, disabled controls, optional preferences, and fail-closed readiness so launch-mode Terminal remains honest.',
    detail:
      'Use this page when a control is visible but disabled, when an interface is mocked or boundary-only, or when a setting has a settlement or delivery consequence.',
    learningOutcome:
      'You can tell the difference between disabled launch controls, mocked Terminal state, review-only posture, and live-ready configuration.',
    primaryCta: { href: '/docs/read-results', label: 'Review readiness reads' },
    sections: configurationSections,
  }),
  docsPage({
    slug: 'protocol-v26',
    chapterId: 'protocol',
    eyebrow: 'Protocol',
    title: 'Map the V26 Protocol canon',
    summary:
      'A guided version of the V26 canon: gates, object flow, domain model, operator chain, source map, validation, and promotion posture.',
    detail:
      'Use this page to connect product docs to the canonical specification without reading every formal section first.',
    learningOutcome:
      'You can navigate from public docs into V26 canon and understand which areas remain open by design.',
    primaryCta: { href: '/docs/proofs', label: 'Read proof system' },
    sections: protocolSections,
    embeddedUi: [
      {
        id: 'canon-map',
        eyebrow: 'Protocol map',
        title: 'V26 teaches product, proof, packages, and promotion together',
        summary:
          'The Protocol is not a whitepaper beside the app. It is the operating contract Terminal and Exchange must satisfy.',
        explainer: BITCODE_PUBLIC_EXPLAINERS.protocolSpec,
        signals: [
          { label: 'Gates', value: '1-8', tone: 'emerald' },
          { label: 'Domain model', value: 'Source to proof', tone: 'cyan' },
          { label: 'Generated evidence', value: 'Fail-closed', tone: 'amber' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'proofs',
    chapterId: 'protocol',
    eyebrow: 'Proofs',
    title: 'Understand Bitcode proofs, witnesses, and replay',
    summary:
      'Proof docs explain the families, witness artifacts, replay steps, projection rules, generated appendices, and fail-closed posture behind Source Shares.',
    detail:
      'Use this page when you need to understand why a Terminal read is proof-bearing and how V26 prevents stale or missing evidence from becoming product truth.',
    learningOutcome:
      'You can name the proof families and explain why witness artifacts, replay, and projection boundaries matter.',
    primaryCta: { href: '/docs/settlement-btd', label: 'Read settlement guide' },
    sections: proofSections,
    embeddedUi: [
      {
        id: 'proof-family-card',
        eyebrow: 'Proof runtime',
        title: 'Proof families become readable product signals',
        summary:
          'Terminal can keep dense proof detail available without forcing every user to start in raw artifacts.',
        explainer: APPLICATION_WORKSPACE_EXPLAINERS.sourcePath,
        signals: [
          { label: 'Witness', value: 'Artifact-bound', tone: 'emerald' },
          { label: 'Replay', value: 'Step-bound', tone: 'cyan' },
          { label: 'Projection', value: 'Disclosure-bound', tone: 'amber' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'settlement-btd',
    chapterId: 'protocol',
    eyebrow: '$BTD',
    title: 'Read settlement, $BTD, and exact accounting',
    summary:
      'Settlement docs connect Source Shares to $BTD-denominated accounting, fit-quality receipts, journal completeness, wallet readiness, and payment-mode posture.',
    detail:
      'Use this page when you need to understand how accepted source-to-shares evidence becomes attributable settlement rather than just a successful analysis run.',
    learningOutcome:
      'You can explain how Bitcode moves from measured source and fit into exact accounting and staged or live payment posture.',
    primaryCta: { href: '/docs/commercial-interfaces', label: 'Read interface guide' },
    sections: settlementSections,
  }),
  docsPage({
    slug: 'commercial-interfaces',
    chapterId: 'interfaces',
    eyebrow: 'Interfaces',
    title: 'Understand commercial Bitcode interfaces',
    summary:
      'Commercial interface docs cover GitHub, webhooks, storage, compute, connected delivery mechanisms, and why every admitted interface must read/write Exchange state under Protocol rules.',
    detail:
      'Use this page before MCP or ChatGPT App if you want the general interface contract first.',
    learningOutcome:
      'You can tell which surfaces are ingress, delivery, storage, compute, or proof support and why none of them own Bitcode state independently.',
    primaryCta: { href: '/docs/mcp-api', label: 'Read MCP guide' },
    sections: commercialInterfaceSections,
    embeddedUi: [
      {
        id: 'interface-readiness',
        eyebrow: 'Boundary specimen',
        title: 'Connected interfaces need admission and reread',
        summary:
          'Interface cards should tell users what is connected, what is staged, and where to verify effects in Terminal.',
        explainer: APPLICATION_WORKSPACE_EXPLAINERS.boundaryRuntime,
        signals: [
          { label: 'GitHub', value: 'Ingress + delivery', tone: 'emerald' },
          { label: 'Webhook', value: 'Automation trigger', tone: 'cyan' },
          { label: 'Storage', value: 'Proof publication', tone: 'amber' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'mcp-api',
    chapterId: 'interfaces',
    eyebrow: 'MCP/API',
    title: 'Operate Bitcode through MCP and API surfaces',
    summary:
      'MCP/API docs explain how programmable clients should attach context, write bounded intent, receive admission evidence, and reread Exchange results.',
    detail:
      'Use this page when building external tools, agentic clients, or automation around the same Source Shares state that Terminal reads.',
    learningOutcome:
      'You can design an MCP or API interaction that mirrors Terminal write/read/proof discipline.',
    primaryCta: { href: '/docs/chatgpt-app', label: 'Read ChatGPT App guide' },
    sections: mcpSections,
    apiReference: mcpApiReference,
    embeddedUi: [
      {
        id: 'mcp-result',
        eyebrow: 'API result',
        title: 'A good tool result points back to Terminal',
        summary:
          'Programmable writes should never strand users in a tool transcript; the Exchange activity should be rereadable in Terminal.',
        explainer: APPLICATION_INLINE_EXPLAINERS.repositoryAnchor,
        signals: [
          { label: 'Write admission', value: 'Confirmed', tone: 'emerald' },
          { label: 'Activity ID', value: 'Rereadable', tone: 'cyan' },
          { label: 'Proof posture', value: 'Pending/closed', tone: 'amber' },
        ],
      },
    ],
  }),
  docsPage({
    slug: 'chatgpt-app',
    chapterId: 'interfaces',
    eyebrow: 'ChatGPT App',
    title: 'Use the ChatGPT App as a connected Bitcode interface',
    summary:
      'ChatGPT App docs explain conversational Bitcode operation: expressing Needs, attaching source, confirming writes, returning Terminal links, and preserving proof boundaries.',
    detail:
      'Use this page when the user experience is conversational but the outcome still has to be Exchange-readable and Protocol-bound.',
    learningOutcome:
      'You can explain how a ChatGPT App can feel natural while still preserving Bitcode write admission and proof reread.',
    primaryCta: { href: '/docs/what-is-bitcode', label: 'Restart from overview' },
    sections: chatGptAppSections,
    apiReference: chatGptAppApiReference,
    embeddedUi: [
      {
        id: 'chat-confirmation',
        eyebrow: 'Confirmation',
        title: 'Conversational writes still need proof-aware confirmation',
        summary:
          'The app can help a user draft, but state changes should clearly say what will be written and where to verify it.',
        explainer: APPLICATION_INLINE_EXPLAINERS.writePosture,
        signals: [
          { label: 'Draft', value: 'Natural language', tone: 'default' },
          { label: 'Confirm', value: 'Bounded write', tone: 'amber' },
          { label: 'Verify', value: 'Terminal reread', tone: 'emerald' },
        ],
      },
    ],
  }),
] as const satisfies readonly BitcodeDocsPage[];

function docsPagesFor(slugs: readonly string[]) {
  return slugs.map((slug) => {
    const page = BITCODE_DOCS_PAGES.find((candidate) => candidate.slug === slug);
    if (!page) {
      throw new Error(`Missing Bitcode docs page for slug: ${slug}`);
    }
    return page;
  });
}

export const BITCODE_DOCS_CHAPTERS = [
  {
    id: 'start',
    number: '00',
    title: 'Start Here',
    summary: 'A zero-to-hero introduction to Source Shares, Exchange, Terminal, and the V26 product map.',
    pages: docsPagesFor(['what-is-bitcode', 'source-shares']),
  },
  {
    id: 'experiences',
    number: '01',
    title: 'Exchange And Terminal',
    summary: 'The product experiences: market state, master-detail Terminal, write actions, and proof-bearing reads.',
    pages: docsPagesFor(['exchange', 'terminal', 'terminal-actions', 'read-results']),
  },
  {
    id: 'modes',
    number: '02',
    title: 'Operator Modes',
    summary: 'Auxillaries, conversations, configuration, feature flags, launch mode, and readiness posture.',
    pages: docsPagesFor(['auxillaries', 'conversations', 'configuration']),
  },
  {
    id: 'protocol',
    number: '03',
    title: 'Protocol And Proof',
    summary: 'V26 canon, proof families, generated evidence, settlement, $BTD, disclosure, and fail-closed rules.',
    pages: docsPagesFor(['protocol-v26', 'proofs', 'settlement-btd']),
  },
  {
    id: 'interfaces',
    number: '04',
    title: 'Commercial Interfaces',
    summary: 'GitHub, webhooks, MCP/API, ChatGPT App, compute, storage, and connected-interface admission.',
    pages: docsPagesFor(['commercial-interfaces', 'mcp-api', 'chatgpt-app']),
  },
] as const satisfies readonly BitcodeDocsChapter[];

export const BITCODE_DOCS_PAGE_SLUGS = BITCODE_DOCS_PAGES.map((page) => page.slug);

export function getBitcodeDocsPage(slug: string | undefined): BitcodeDocsPage | null {
  return BITCODE_DOCS_PAGES.find((page) => page.slug === slug) ?? null;
}
