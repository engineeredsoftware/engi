// @ts-check

/**
 * @typedef {any} LooseRecord
 * @typedef {any[]} LooseRecordArray
 * @typedef {import('../src/demo-shell-state.js').AssetSummaryShape & LooseRecord} AssetSummaryShape
 * @typedef {import('../src/demo-shell-state.js').NeedPreviewShape & {
 *   realizationProfile?: { shortLabel?: string, label?: string, profileId?: string } | undefined,
 *   targetArtifactKinds?: string[] | undefined,
 *   parserKind?: string | undefined
 * } & LooseRecord} NeedPreviewShape
 * @typedef {import('../src/demo-shell-state.js').NeedScenarioShape & {
 *   realizationProfile?: { shortLabel?: string, label?: string, profileId?: string } | undefined,
 *   needingSurface?: NeedPreviewShape | null | undefined
 * } & LooseRecord} ScenarioShape
 * @typedef {import('../src/demo-shell-state.js').SessionShape & {
 *   tokenBoundary?: {
 *     mintingState?: string | undefined,
 *     writableScopes?: string[] | undefined
 *   } | undefined
 * } & LooseRecord} SessionShape
 * @typedef {import('../src/demo-shell-state.js').RepoArtifactInventoryEntryShape & {
 *   addressing?: { addressingRoot?: string, addressingScope?: string } | undefined,
 *   authBinding?: { authPayloadHash?: string } | undefined,
 *   provenance?: { selectionLabel?: string } | undefined
 * } & LooseRecord} InventoryEntryShape
 * @typedef {import('../src/demo-shell-state.js').LatestRunCandidateShape} LatestRunCandidateShape
 * @typedef {import('../src/demo-shell-state.js').LatestRunShape & {
 *   buyer?: { installationId?: string | number | undefined, repo?: string | undefined } | undefined,
  *   branchName?: string | undefined,
 *   realizationProfile?: { shortLabel?: string, label?: string, profileId?: string } | undefined,
 *   boundedPublicProof?: { bundleId?: string | undefined } | undefined,
 *   journalDiff?: { bundleId?: string | undefined } | undefined,
 *   needingSurface?: NeedPreviewShape | null | undefined,
 *   evaluatedCandidates?: LatestRunCandidateShape[] | undefined
 * } & LooseRecord} LatestRunShape
 * @typedef {{
 *   repos?: Array<{
 *     repo?: string | undefined,
 *     inventoryEntryCount?: number | undefined,
 *     scenarioFamilies?: string[] | undefined,
 *     realizationProfileCounts?: Record<string, number> | undefined,
 *     artifactKindCounts?: Record<string, number> | undefined,
 *     originKindCounts?: Record<string, number> | undefined
 *   }> | undefined
 * } & LooseRecord} RepoSupplySurfaceShape
 * @typedef {{ profiles?: unknown[] | undefined }} ProfileCompositionShape
 * @typedef {{
 *   specVersion?: string | undefined,
 *   canonPosture?: Record<string, string> | undefined,
 *   projectionPrincipal?: string | undefined,
 *   conformanceProfiles?: {
 *     active?: string | undefined,
 *     productionIntent?: string | undefined,
 *     prototypeOnlyModeledControls?: boolean | undefined,
 *     profileCompositions?: ProfileCompositionShape | undefined
 *   } | undefined,
 *   profileCompositions?: ProfileCompositionShape | undefined,
 *   repoSupplySurface?: RepoSupplySurfaceShape | undefined,
 *   boundaryRealitySurface?: { stages?: unknown[] | undefined } | undefined,
 *   updatedAt?: string | undefined,
 *   buyers?: unknown[] | undefined,
 *   githubAppSessions?: SessionShape[] | undefined,
 *   repoArtifactInventory?: InventoryEntryShape[] | undefined,
 *   needScenarios?: ScenarioShape[] | undefined,
 *   assets?: AssetSummaryShape[] | undefined,
 *   ledger?: { accounts?: Record<string, string> | undefined, history?: unknown[] | undefined } | undefined,
 *   latestRun?: LatestRunShape | null | undefined,
 *   runHistory?: unknown[] | undefined
 * }} AppState
 * @typedef {{
 *   depositSessionId: string,
 *   depositProfile: string,
 *   repoSupplyRef: string,
 *   selectedInventoryRefs: string[],
 *   selectedArtifactKindCounts: Record<string, number>,
 *   selectedOriginKindCounts: Record<string, number>,
 *   addressingRoot: string | null,
 *   signingRoot: null,
 *   authRoot: string | null,
 *   depositIntentSummary: string
 * }} PreviewDepositingSurfaceShape
 * @typedef {{
 *   relationId: string,
 *   depositSessionId: string,
 *   needId: string,
 *   fitSummary: string,
 *   decisiveKinds: string[],
 *   overlapKinds: string[],
 *   normalizationPressure: string,
 *   branchIntentSummary: string,
 *   proofIntentSummary: string,
 *   settlementIntentSummary: string
 * }} PreviewDepositingToNeedingSurfaceShape
 * @typedef {{
 *   code?: string[] | undefined,
 *   spec?: string[] | undefined
 * }} ExplainerReferences
 * @typedef {{
 *   kicker?: string | undefined,
 *   title?: string | undefined,
 *   summary?: string | undefined,
 *   detail?: string | undefined,
 *   points?: string[] | undefined,
 *   references?: ExplainerReferences | undefined
 * }} ExplainerShape
 * @typedef {{ key: string, explainer: ExplainerShape | null }} ExplainerResolution
 * @typedef {{ allowDynamic?: boolean | undefined }} ResolveExplainerOptions
 * @typedef {{
 *   align?: 'left' | 'right' | 'center' | undefined,
 *   side?: 'top' | 'bottom' | undefined,
 *   ariaLabel?: string | undefined,
 *   label?: string | undefined
 * }} ExplainerBadgeOptions
 * @typedef {{
 *   html?: boolean | undefined,
 *   allowDynamic?: boolean | undefined,
 *   className?: string | undefined,
 *   badgeOptions?: ExplainerBadgeOptions | undefined
 * }} LabelWithExplainerOptions
 * @typedef {{
 *   className?: string | undefined,
 *   explainerKey?: string | undefined,
 *   allowDynamic?: boolean | undefined,
 *   ariaLabel?: string | undefined
 * }} BadgeWithExplainerOptions
 * @typedef {{
 *   tone?: string | undefined,
 *   title?: string | undefined,
 *   badge?: string | undefined
 * }} ExplainerCalloutOptions
 * @typedef {{ html?: boolean | undefined, explainerKey?: string | undefined }} ValueRenderOptions
 * @typedef {ValueRenderOptions & { className?: string | undefined }} MetricTileOptions
 * @typedef {{ allowDynamic?: boolean | undefined }} ChipListOptions
 * @typedef {{
 *   title: string,
 *   subtitle?: string | undefined,
 *   eyebrow?: string | undefined,
 *   eyebrowExplainerKey?: string | undefined,
 *   help?: string | undefined,
 *   explainerKey?: string | undefined,
 *   data: any,
 *   raw?: any,
 *   visual?: ((data: any) => string) | undefined,
 *   defaultMode?: string | undefined,
 *   accent?: string | undefined
 * }} JsonSurfaceOptions
 */

/**
 * @template {HTMLElement} T
 * @param {string} id
 * @returns {T}
 */
function requireElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing required element: ${id}`);
  }
  return /** @type {T} */ (element);
}

/**
 * @param {EventTarget | null} target
 * @param {string} selector
 * @returns {HTMLElement | null}
 */
function closestElement(target, selector) {
  if (!(target instanceof Element)) return null;
  const match = target.closest(selector);
  return match instanceof HTMLElement ? match : null;
}

/**
 * @param {unknown} error
 * @returns {string}
 */
function errorMessage(error) {
  return error instanceof Error ? error.message : String(error ?? 'Unknown error');
}

/**
 * @param {AppState | null | undefined} state
 * @returns {string}
 */
function activeProjectionPrincipal(state) {
  return selectedProjectionPrincipal || state?.projectionPrincipal || 'buyer';
}

/**
 * @param {AppState | null | undefined} state
 * @returns {string}
 */
function activeBranchMode(state) {
  return selectedBranchMode || state?.latestRun?.branchMode || 'patch';
}

/**
 * @param {AppState | null | undefined} state
 * @returns {Record<string, string>}
 */
function canonPosture(state) {
  const posture = state?.canonPosture;
  if (posture && typeof posture === 'object') {
    return /** @type {Record<string, string>} */ (posture);
  }
  return {
    operatorLabel: state?.specVersion || 'current canon posture',
    documentTitle: 'ENGI Demo',
    inheritedCanonSurfaceLabel: 'current inherited canon',
    heroEyebrow: 'ENGI deterministic local prototype',
    heroLede: 'Current canon posture is loading.',
    heroTip: 'Current generated appendix and report posture is loading.'
  };
}

/**
 * @param {AppState | null | undefined} state
 * @returns {string}
 */
function canonOperatorLabel(state) {
  return canonPosture(state)['operatorLabel'] || state?.specVersion || 'current canon posture';
}

/**
 * @param {AppState | null | undefined} state
 * @returns {string}
 */
function inheritedCanonSurfaceLabel(state) {
  return canonPosture(state)['inheritedCanonSurfaceLabel'] || 'current inherited canon';
}

/**
 * @param {AppState | null | undefined} state
 * @returns {void}
 */
function renderCanonPosture(state) {
  const posture = canonPosture(state);
  document.title = posture['documentTitle'] || `ENGI Demo — ${canonOperatorLabel(state)}`;
  heroEyebrowEl.textContent = posture['heroEyebrow'] || 'ENGI deterministic local prototype';
  heroLedeEl.textContent = posture['heroLede'] || canonOperatorLabel(state);
  heroTipEl.textContent = posture['heroTip'] || 'Current generated appendix and report posture is loading.';
}

/**
 * @param {unknown} data
 * @param {unknown} raw
 * @returns {boolean}
 */
function hasSurfaceContent(data, raw) {
  return (data !== undefined && data !== null) || (raw !== undefined && raw !== null);
}

const heroEyebrowEl = requireElement('heroEyebrow');
const heroLedeEl = requireElement('heroLede');
const heroTipEl = requireElement('heroTip');
const summaryEl = requireElement('summary');
const operatingPictureEl = requireElement('operatingPicture');
const scenarioEl = requireElement('scenario');
const assetsEl = requireElement('assets');
const fitEl = requireElement('fit');
const evaluationsEl = requireElement('evaluations');
const branchArtifactsEl = requireElement('branchArtifacts');
const settlementEl = requireElement('settlement');
const ledgerEl = requireElement('ledger');
const statusEl = requireElement('status');
/** @type {HTMLSelectElement} */
const scenarioPickerEl = requireElement('scenarioPicker');
/** @type {HTMLSelectElement} */
const projectionPickerEl = requireElement('projectionPicker');
/** @type {HTMLSelectElement} */
const branchModePickerEl = requireElement('branchModePicker');
/** @type {HTMLSelectElement} */
const authSessionPickerEl = requireElement('authSessionPicker');
/** @type {HTMLInputElement} */
const inventorySearchInputEl = requireElement('inventorySearchInput');
/** @type {HTMLSelectElement} */
const inventoryKindFilterEl = requireElement('inventoryKindFilter');
const repoInventoryListEl = requireElement('repoInventoryList');
const inventorySelectionSummaryEl = requireElement('inventorySelectionSummary');
const makeBranchButtonEl = requireElement('makeBranchButton');
const tutorialToggleButtonEl = requireElement('tutorialToggleButton');
const resetButtonEl = requireElement('resetButton');
/** @type {HTMLFormElement} */
const depositFormEl = requireElement('depositForm');
const tutorialLayerEl = requireElement('tutorialLayer');
const tutorialStepCounterEl = requireElement('tutorialStepCounter');
const tutorialKickerEl = requireElement('tutorialKicker');
const tutorialTitleEl = requireElement('tutorialTitle');
const tutorialBodyEl = requireElement('tutorialBody');
const tutorialTargetHintEl = requireElement('tutorialTargetHint');
const tutorialPrevButtonEl = requireElement('tutorialPrevButton');
const tutorialNextButtonEl = requireElement('tutorialNextButton');
const tutorialCloseButtonEl = requireElement('tutorialCloseButton');

const DEFAULT_SURFACE_MODE = 'visual';
const EXPLAINER_PANEL_MAX_WIDTH = 360;
const TUTORIAL_STORAGE_KEY = 'engi-demo:tutorial-overlay-dismissed:v22';
let surfaceCounter = 0;
let explainerCounter = 0;
let selectedScenarioId = '';
let selectedProjectionPrincipal = 'buyer';
let selectedBranchMode = 'patch';
let selectedAuthSessionId = '';
/** @type {Set<string>} */
let selectedInventoryEntryIds = new Set();
let inventorySearchTerm = '';
let selectedInventoryKind = 'all';
/** @type {AppState | null} */
let lastLoadedState = null;
let tutorialStepIndex = 0;
let tutorialOpen = true;
/** @type {HTMLElement | null} */
let tutorialHighlightedEl = null;

try {
  tutorialOpen = window.localStorage.getItem(TUTORIAL_STORAGE_KEY) !== '1';
} catch {
  tutorialOpen = true;
}

const EXPLAINERS = {
  'repo-supply': {
    kicker: 'Glossary',
    title: 'Repo supply',
    summary: 'The authenticated inventory ENGI can legally draw from for the current repository.',
    detail: 'Supply means "available to select", not "already proven useful". It becomes a deposit only after the operator binds selected artifacts to the active need.',
    points: [
      'Built from GitHub App sessions plus repo artifact inventory',
      'Can span multiple artifact kinds and origins inside one repo boundary'
    ]
  },
  depositing: {
    kicker: 'Glossary',
    title: 'Depositing',
    summary: 'Depositing is the operator act of presenting source material to ENGI as candidate supply for a need.',
    detail: 'A deposit says "these are the artifacts I want ENGI to consider". It does not by itself guarantee fit, proof, or settlement credit.',
    points: [
      'Starts from selected repo artifacts or raw fallback content',
      'Carries addressing, signing, and auth roots forward into later proofs'
    ]
  },
  needing: {
    kicker: 'Glossary',
    title: 'Need / needing',
    summary: 'The measured engineering demand ENGI is trying to close.',
    detail: 'A need is derived from benchmark evidence, parser rules, failure modes, and closure criteria. Deposits are judged against that measured surface.',
    points: [
      'Defines what must improve or be explained',
      'Determines which artifact kinds and proofs matter'
    ]
  },
  'deposit-fit': {
    kicker: 'Glossary',
    title: 'Deposit-to-need fit',
    summary: 'The explicit relation between the active deposit and the active need before deeper proof or settlement.',
    detail: 'This answers the first operator question: why should these selected artifacts matter for this measured demand at all?',
    points: [
      'Surfaces overlap in artifact kinds and evidence coverage',
      'Drives the branch, proof, and settlement intent that follows'
    ]
  },
  'targeted-deposit': {
    kicker: 'Profile A',
    title: 'Targeted deposit',
    summary: 'A narrow deposit meant to decisively close one bounded need.',
    detail: 'Profile A prefers fewer, high-signal artifacts whose relevance is easy to explain end to end.',
    points: [
      'Usually one tight repo slice or a small set of closely related artifacts',
      'Best when the need is narrow and the closure story should stay direct'
    ]
  },
  'bounded-need': {
    kicker: 'Profile A',
    title: 'Bounded need',
    summary: 'A need whose closure can be read as one crisp remediation target.',
    detail: 'The audience should understand what counts as fixed without needing a broad normalization story across many sources.',
    points: [
      'Closure criteria are narrow and legible',
      'Proof reads as decisive rather than compositional'
    ]
  },
  'normalization-deposit': {
    kicker: 'Profile B',
    title: 'Normalization deposit',
    summary: 'A broader deposit where multiple artifacts jointly contribute to a composite need.',
    detail: 'Profile B expects overlap, partial contributions, and a later normalization step to turn source contributions into final settlement shares.',
    points: [
      'Useful when one artifact alone is not enough',
      'Explains why several artifacts can participate but receive different credit'
    ]
  },
  'composite-need': {
    kicker: 'Profile B',
    title: 'Composite need',
    summary: 'A need with several coupled dimensions that must be satisfied together.',
    detail: 'Composite needs create pressure to normalize partial contributions across several artifacts instead of forcing a one-asset closure story.',
    points: [
      'Often spans multiple failure modes or target artifact kinds',
      'Settlement must stay source-to-shares aware'
    ]
  },
  'identity-auth-spine': {
    kicker: 'Glossary',
    title: 'Identity / auth spine',
    summary: 'The authority chain linking buyer identity, GitHub App session, signer authority, branch authority, and settlement authority.',
    detail: 'This is ENGI\'s answer to "who was allowed to do what, under which roots, at each stage?"',
    points: [
      'Makes auth legible as one path instead of scattered hashes',
      'Shows how repo-bound authority flows into proof and settlement'
    ]
  },
  'repo-to-settlement': {
    kicker: 'Glossary',
    title: 'Repo-to-settlement path',
    summary: 'The staged operating path from repo selection through branch artifacts, proof closure, and final accounting.',
    detail: 'This compresses the whole demo into one timeline so an operator can see where a run currently is and what each stage means.',
    points: [
      'Starts with deposit + need + fit',
      'Ends with proof-backed settlement and replayable accounting'
    ]
  },
  'operating-picture': {
    kicker: 'Canonical shell',
    title: 'Operating picture',
    summary: 'The top-level shell read that compresses repo supply, deposit, need, fit, proof, settlement, and boundary truth into one operating chain.',
    detail: 'This panel is not a separate feature. It is the high-level operator map for how the canonical demo is supposed to read end to end.',
    points: [
      'Keeps the thesis legible before deep artifacts',
      'Lets an operator place every later section in one chain'
    ]
  },
  'boundary-reality': {
    kicker: 'Glossary',
    title: 'Boundary reality',
    summary: 'The explicit split between what is modeled locally, what runs locally, and what remains a real external dependency.',
    detail: 'This keeps the demo honest. ENGI can center the operator story on deposit/need/fit without pretending the external world disappeared.',
    points: [
      'Prevents profile semantics from being confused with integration truth',
      'Shows where a live system would still need real external execution'
    ]
  },
  'external-realization': {
    kicker: 'V24 actuality',
    title: 'External realization',
    summary: 'The current execution posture of Bitcoin, sidechain, compute, storage, and GitHub interfaces for this run.',
    detail: 'This surface says which external dependencies are mock, stubbed, live-configured, live-observed, or blocked, and why. It keeps actual-system claims tied to configuration, receipts, and telemetry instead of to hopeful language.',
    points: [
      'Shows the exact readiness and observation state per external interface',
      'Separates missing configuration from observed live execution'
    ]
  },
  'proof-closure': {
    kicker: 'Glossary',
    title: 'Proof / proof closure',
    summary: 'The evidence-bound explanation that the selected artifacts, authorities, and accounting steps really close the need.',
    detail: 'Proof closure is where ENGI stops hand-waving and binds the story to artifacts, roots, theorem checks, and closure criteria.',
    points: [
      'Connects deposit, need, authorization, and settlement into one evidence chain',
      'Separates public bounded proof from deeper private artifacts'
    ]
  },
  settlement: {
    kicker: 'Glossary',
    title: 'Settlement',
    summary: 'The exact accounting step that turns proven participation into credited outcomes.',
    detail: 'Settlement is not just "who looked relevant". It is the deterministic conversion from selected and participating assets into credited shares and journal entries.',
    points: [
      'Can distinguish selected, participating, zero-credit, and credited assets',
      'Ends in replayable debits, credits, and bundle state'
    ]
  },
  'source-to-shares': {
    kicker: 'Glossary',
    title: 'Source-to-shares',
    summary: 'The deterministic path from source contribution evidence to final settlement share basis points.',
    detail: 'This surface explains how raw contribution units are clipped, normalized, tie-broken, and turned into credited shares.',
    points: [
      'Especially important for normalization-heavy Profile B flows',
      'Lets operators inspect why two participating assets received different credit'
    ]
  },
  addressing: {
    kicker: 'Glossary',
    title: 'Addressing',
    summary: 'The explicit repo-level references that say exactly which source material is being talked about.',
    detail: 'Addressing answers "where is it?" with repo, path, ref, commit, artifact name, or workflow run references.',
    points: [
      'Separate from signing and separate from GitHub App auth',
      'Feeds the addressing root carried through later proofs'
    ]
  },
  signing: {
    kicker: 'Glossary',
    title: 'Signing',
    summary: 'The attestation step that binds an issuer or signer to the selected material and its roots.',
    detail: 'Signing answers "who is standing behind this payload?" without redefining where the artifact lives or what auth session selected it.',
    points: [
      'Can sign addressing, selection, and auth roots together',
      'Produces hashes and attestations later consumed by proofs'
    ]
  },
  'github-app-auth': {
    kicker: 'Glossary',
    title: 'GitHub App auth payloads',
    summary: 'The modeled installation-scoped auth facts ENGI carries forward from the GitHub App session.',
    detail: 'These payload hashes stand in for the repo-bound authorization envelope: installation, account, repository, permissions, and token boundary.',
    points: [
      'Used to show repo-scoped authority without exposing live tokens',
      'Feeds the auth root and later identity/auth spine surfaces'
    ]
  },
  'artifact-kind': {
    kicker: 'Glossary',
    title: 'Artifact kind',
    summary: 'The ENGI category for what an artifact fundamentally is, such as code patch, runbook, config diff, or proof surface.',
    detail: 'Kinds matter because needs target kinds, ranking compares kinds, and fit often becomes legible first at the kind level.',
    points: [
      'Used for overlap between deposits and needs',
      'Different from origin kind, which describes where the artifact came from'
    ]
  },
  'origin-kind': {
    kicker: 'Glossary',
    title: 'Origin kind',
    summary: 'The source lineage of an artifact, such as repo file, workflow run output, benchmark evidence, or operator note.',
    detail: 'Origin kind explains provenance rather than functional role. Two artifacts can share an artifact kind but come from different origins.',
    points: [
      'Helps operators read supply diversity',
      'Useful when deciding how much trust or normalization pressure to apply'
    ]
  },
  'target-artifact-kind': {
    kicker: 'Glossary',
    title: 'Target artifact kind',
    summary: 'The artifact kinds the need expects to be relevant for closure.',
    detail: 'These are the first kinds ENGI looks for when asking whether a deposit plausibly addresses the active demand.',
    points: [
      'Creates the opening overlap test for fit',
      'Does not guarantee closure on its own'
    ]
  },
  'closure-criteria': {
    kicker: 'Glossary',
    title: 'Closure criteria',
    summary: 'The concrete conditions that must be satisfied before the need counts as closed.',
    detail: 'Closure criteria keep ENGI from settling on vibes. They say what the proof and settlement story must actually demonstrate.',
    points: [
      'Can include benchmark outcomes, policy gates, or evidence coverage',
      'Give proof closure a concrete finish line'
    ]
  },
  'normalization-pressure': {
    kicker: 'Glossary',
    title: 'Normalization pressure',
    summary: 'How much the current fit is pushing ENGI toward a compositional, source-to-shares settlement story.',
    detail: 'Low pressure usually means a targeted deposit can close the need directly. Higher pressure means several overlapping artifacts need to be normalized together.',
    points: [
      'Rises when multiple kinds or partial contributions overlap the need',
      'Signals whether Profile B-style settlement semantics are becoming important'
    ]
  },
  'profile-a': {
    kicker: 'Profile A',
    title: 'Profile A summary',
    summary: 'Targeted deposit plus bounded need. The story should read as direct closure with minimal normalization.',
    detail: 'Use Profile A when one artifact or a tight cluster can plainly fix the measured problem and proof should feel decisive.',
    points: [
      'Tight deposit',
      'Bounded need',
      'Direct settlement story'
    ]
  },
  'profile-b': {
    kicker: 'Profile B',
    title: 'Profile B summary',
    summary: 'Normalization deposit plus composite need. The story should explain partial contribution and deterministic share normalization.',
    detail: 'Use Profile B when the need spans several coupled dimensions and settlement has to justify why multiple sources participated or received different credit.',
    points: [
      'Broader deposit',
      'Composite need',
      'Source-to-shares aware settlement'
    ]
  },
  'inventory-entries': {
    kicker: 'Inventory',
    title: 'Inventory entries',
    summary: 'Selectable repo artifact snapshots available in supply under the current repo/auth boundary.',
    detail: 'An inventory entry is candidate supply, not a deposited asset yet. It becomes part of the deposit only after selection.',
    points: [
      'Counted per repo in the repo supply surface',
      'Selection roots and deposit previews are built from these entries'
    ]
  },
  'scenario-coverage': {
    kicker: 'Corpus',
    title: 'Scenario coverage',
    summary: 'Which seeded scenario families the current repo supply is meant to support in this demo corpus.',
    detail: 'This is derived from the scenario fixture set matched to the repo, not from the currently selected deposit.',
    points: [
      'Shows which need families are represented for this repo',
      'Useful for understanding why a repo appears in both targeted and normalization demos'
    ]
  },
  'profile-coverage': {
    kicker: 'Corpus',
    title: 'Profile coverage',
    summary: 'How the repo or corpus splits across targeted-deposit and normalization-deposit scenario profiles.',
    detail: 'These counts come from seeded scenario families associated with the repo. They do not mean both profiles are active at once.',
    points: [
      'Computed from realization profile counts in source',
      'Helps explain whether a repo mostly supports Profile A, Profile B, or both'
    ]
  },
  'dominant-stacks': {
    kicker: 'Repo inventory',
    title: 'Dominant stacks',
    summary: 'The most common declared stacks across inventory entries for the current repo.',
    detail: 'This is a top-count summary of stack tags declared on repo artifacts, used to make the supply shape legible at a glance.',
    points: [
      'Derived from inventory entry declaredStacks',
      'Signals the repo technologies most represented in current supply'
    ]
  },
  'auth-session': {
    kicker: 'GitHub auth',
    title: 'Auth session',
    summary: 'The modeled GitHub App installation session bound to the current repo selection.',
    detail: 'This session ID identifies which installation-scoped auth payload, permissions root, and token-boundary facts are being carried forward.',
    points: [
      'Separate from signer identity',
      'Feeds the GitHub auth surface and later identity/auth spine'
    ]
  },
  'account-id': {
    kicker: 'GitHub auth',
    title: 'Account ID',
    summary: 'Stable identifier for the GitHub installation account bound to the session.',
    detail: 'In source this ID is derived from the installation account login and carried inside auth payloads and GitHub-boundary surfaces.',
    points: [
      'Represents the account that owns the installation',
      'Distinct from repo ID and installation ID'
    ]
  },
  'installation-account': {
    kicker: 'GitHub auth',
    title: 'Installation account',
    summary: 'The GitHub user or organization that owns the bound App installation.',
    detail: 'This is the human-readable account login carried with the installation session. It tells you which account the repo-bound installation belongs to.',
    points: [
      'Shown alongside installation ID and account ID',
      'Distinct from the acting signer or operator note author'
    ]
  },
  'repository-id': {
    kicker: 'GitHub identity',
    title: 'Repository ID',
    summary: 'Stable repository identity bound into auth and addressing surfaces.',
    detail: 'This is the canonical repo identifier ENGI hashes into roots so the flow stays tied to one exact repository, not just owner/name text.',
    points: [
      'Shows up in GitHub auth, addressing, and buyer bindings',
      'Separate from installation account identity'
    ]
  },
  'installation-id': {
    kicker: 'GitHub auth',
    title: 'Installation ID',
    summary: 'The GitHub App installation bound to the repo session.',
    detail: 'Permissions, token-boundary facts, and live GitHub exchange semantics hang off this installation, not off a generic user token.',
    points: [
      'Installation-scoped authority is central to current ENGI GitHub auth',
      'Used to distinguish repo-bound app sessions from manual/unbound intake'
    ]
  },
  'github-permissions': {
    kicker: 'GitHub auth',
    title: 'Permissions and scopes',
    summary: 'The modeled GitHub App permissions ENGI carries from the installation session.',
    detail: 'Permissions are hashed into the permissions root and split into readable and writable scopes so later proof surfaces can reference the same envelope.',
    points: [
      'Modeled only in this demo; no live token is minted',
      'Writable scopes show what a live flow would be allowed to change'
    ]
  },
  'selection-root': {
    kicker: 'Selection proof',
    title: 'Selection root',
    summary: 'Hash root over the exact inventory snapshot selected at intake.',
    detail: 'This root is how ENGI later proves which repo entries were chosen, signed, and carried into deposit, proof, and settlement surfaces.',
    points: [
      'Built from selected inventory entry snapshots',
      'Keeps signing and proof tied to the same selection'
    ]
  },
  'selection-label': {
    kicker: 'Selection proof',
    title: 'Selection label',
    summary: 'Human-readable shorthand for what was selected at intake.',
    detail: 'In source this is built from the selected inventory count and repo, or marks the intake as raw fallback when no repo inventory backed it.',
    points: [
      'Readable summary only',
      'The authoritative binding is still the selection root and selected inventory IDs'
    ]
  },
  'proof-logs': {
    kicker: 'Proof evidence',
    title: 'Proof logs',
    summary: 'Formal or deterministic proof log artifacts emitted by validation runs.',
    detail: 'They support proof closure and verification sufficiency, but they are only one part of the broader proof bundle.',
    points: [
      'Often come from validator or theorem-check workflows',
      'Useful for replaying why a proof-bearing artifact was trusted'
    ]
  },
  'external-boundary': {
    kicker: 'Boundary reality',
    title: 'External boundary',
    summary: 'The live system contract that still sits outside this deterministic local demo.',
    detail: 'These are the steps that would require real GitHub APIs, remote evaluators, signer verification, or settlement networks in production.',
    points: [
      'Kept explicit so the demo stays honest',
      'Not the same thing as profile A/B semantics'
    ]
  },
  'local-boundary': {
    kicker: 'Boundary reality',
    title: 'Local boundary',
    summary: 'What the demo actually models or executes locally right now.',
    detail: 'This tells you which surfaces are already materialized here as deterministic artifacts before any live system hand-off happens.',
    points: [
      'Complements external boundary rather than replacing it',
      'Useful for understanding what is green in the worktree versus only specified for production'
    ]
  },
  'supporting-surfaces': {
    kicker: 'Canonical shell',
    title: 'Supporting surfaces',
    summary: 'Secondary boundary, policy, or lineage surfaces that support the main operator story without becoming the headline.',
    detail: 'The canonical shell keeps deposit, need, and fit primary. Supporting surfaces stay available so deeper truth does not get hidden.',
    points: [
      'Important for honesty and depth',
      'Intentionally downstream of the main deposit-to-need read'
    ]
  },
  'coverage-tags': {
    kicker: 'Corpus metadata',
    title: 'Coverage tags',
    summary: 'Tags describing the themes, stacks, or failure domains represented by a scenario or asset.',
    detail: 'In source these come from seeded corpus metadata and asset tags. They are descriptive signals, not ranking scores or rights decisions.',
    points: [
      'Useful for quickly spotting proof-heavy, privacy-boundary, or normalization scenarios',
      'Often overlap with stack or failure-domain vocabulary'
    ]
  },
  'benchmark-workflow': {
    kicker: 'Need measurement',
    title: 'Benchmark workflow',
    summary: 'The GitHub Actions workflow or run surface that produced benchmark evidence for the need.',
    detail: 'This ties the measured need back to a concrete parser and benchmark execution context.',
    points: [
      'Connects benchmark run ID, workflow path, and parser behavior',
      'Important when proof and verification need to bind back to a specific run'
    ]
  },
  'artifact-kind-filter': {
    kicker: 'Inventory control',
    title: 'Artifact kind filter',
    summary: 'Filters the visible repo inventory by ENGI artifact kind.',
    detail: 'This only narrows the selection UI. It does not change the underlying repo supply or what scenarios the repo can support.',
    points: [
      'Useful when a repo has mixed proof, patch, runbook, and config artifacts',
      'Selection still determines what becomes the active deposit'
    ]
  },
  'inventory-search': {
    kicker: 'Inventory control',
    title: 'Artifact inventory search',
    summary: 'Searches the current repo inventory by title, path, workflow run, or tag.',
    detail: 'This is a convenience filter over the active repo session inventory, not a semantic ranking step.',
    points: [
      'Bound to the current authenticated repo session',
      'Helps operators find supply entries before selection'
    ]
  },
  'deposit-title-override': {
    kicker: 'Deposit override',
    title: 'Asset title override',
    summary: 'Optional override for the deposited asset title shown in ENGI surfaces.',
    detail: 'If omitted, the title is inferred from selected inventory or the submitted content.',
    points: [
      'Changes the human-readable asset label',
      'Does not rewrite addressing or auth roots by itself'
    ]
  },
  'author-override': {
    kicker: 'Deposit override',
    title: 'Author override',
    summary: 'Optional display author or issuer label for the deposited asset.',
    detail: 'If omitted, the demo falls back to the bound session or derived author naming.',
    points: [
      'Useful for clarifying operator intent in demo surfaces',
      'Separate from signer address and attestation identity'
    ]
  },
  'artifact-type': {
    kicker: 'Artifact metadata',
    title: 'Artifact type',
    summary: 'The more specific subtype within an artifact kind.',
    detail: 'Kind drives broad ENGI behavior; type adds a finer-grained label for the deposited surface and ranking context.',
    points: [
      'Examples include patch, proof bundle, runbook page, or benchmark output subtype',
      'Can be inferred or explicitly overridden'
    ]
  },
  'source-repo-override': {
    kicker: 'Addressing override',
    title: 'Repo boundary override',
    summary: 'Optional explicit repo boundary for the deposited asset.',
    detail: 'Normally the repo is inferred from the authenticated session or selected inventory. Override only when the address must be forced.',
    points: [
      'Feeds addressing and GitHub-binding surfaces',
      'Should remain consistent with the auth boundary when inventory-backed'
    ]
  },
  'source-commit-override': {
    kicker: 'Addressing override',
    title: 'Commit / ref override',
    summary: 'Optional commit or ref override carried into addressing.',
    detail: 'If provided, it becomes part of the explicit repo address and later addressing root.',
    points: [
      'Useful when the relevant source version must be stated directly',
      'Can coexist with source paths or workflow-run addressing'
    ]
  },
  'workflow-run-override': {
    kicker: 'Addressing override',
    title: 'Workflow run override',
    summary: 'Optional workflow run ID used to bind the asset to a benchmark or artifact run.',
    detail: 'This matters for workflow-run and workflow-artifact addressing scopes in the current source model.',
    points: [
      'Useful for proof bundles and benchmark outputs',
      'Can become the primary address when no file path is available'
    ]
  },
  'visual-preview': {
    kicker: 'Deposit surface',
    title: 'Visual preview',
    summary: 'Human-readable summary text ENGI shows in visual surfaces.',
    detail: 'It makes the deposited asset legible at a glance without replacing raw content or proof-bearing metadata.',
    points: [
      'Optimized for operator readability',
      'Separate from raw fallback content and operator note'
    ]
  },
  'operator-note': {
    kicker: 'Deposit surface',
    title: 'Operator note',
    summary: 'Optional operator-authored note appended to selected repo artifacts at intake.',
    detail: 'When present, the intake mode becomes repo-artifact-selection-plus-note because the operator is adding new narrative context.',
    points: [
      'Useful for framing why a selection matters',
      'Does not replace the selected repo artifact evidence'
    ]
  },
  'raw-fallback': {
    kicker: 'Deposit surface',
    title: 'Raw fallback content',
    summary: 'Manual content deposited when repo inventory is not selected or needs supplementation.',
    detail: 'This is the escape hatch when authenticated repo supply is not sufficient on its own.',
    points: [
      'Can stand alone or supplement selected inventory',
      'Produces a different intake mode from plain repo-artifact selection'
    ]
  },
  'verification-rights': {
    kicker: 'Ranking support',
    title: 'Verification and rights',
    summary: 'The downstream-use gate that sits beside ranking rather than inside it.',
    detail: 'ENGI separates relevance scoring from whether a candidate may be used for branch materialization or settlement.',
    points: [
      'Explains recommended tier and policy caps',
      'Makes branch and settlement rights explicit'
    ]
  },
  'branch-artifacts': {
    kicker: 'Branch stack',
    title: 'Asset pack and branch artifacts',
    summary: 'The exact private artifact stack materialized behind the high-level deposit/need/fit story.',
    detail: 'This is where the canonical demo keeps the dense manifests, proofs, policy surfaces, and deterministic files that justify the run.',
    points: [
      'Materialized locally in this demo',
      'Carries the evidence behind branch, proof, and settlement'
    ]
  },
  'private-remediation-branch': {
    kicker: 'Branch capsule',
    title: 'Private remediation branch',
    summary: 'The run materializes its working artifacts on a private remediation branch before any bounded public proof is projected outward.',
    detail: 'In the current canon the branch stays a dense private evidence surface. Public proof is derived later and should not leak the private branch payloads.',
    points: [
      'Carries the exact branch artifact stack behind the higher-level story',
      'Separates private remediation work from bounded public proof'
    ]
  },
  'asset-pack': {
    kicker: 'Branch selection',
    title: 'Selected asset pack',
    summary: 'The locked set of selected assets and units that survived fit, ranking, verification, and policy gates for this run.',
    detail: 'The asset pack is the hand-off from candidate consideration into branch materialization and later settlement closure.',
    points: [
      'Locks the selected assets before branch materialization',
      'Provides the closed selection boundary for proof and settlement'
    ]
  },
  'selected-source-material': {
    kicker: 'Branch materialization',
    title: 'Selected source material',
    summary: 'The exact source material and unit bindings mounted into the remediation branch for the selected asset pack.',
    detail: 'This is where ENGI makes the selected assets operationally concrete inside the private branch rather than keeping them as abstract candidates.',
    points: [
      'Connects asset pack selection to mounted branch files',
      'Keeps unit refs and addressing roots visible for replay'
    ]
  },
  'branch-materialization': {
    kicker: 'Branch materialization',
    title: 'Branch materialization',
    summary: 'The deterministic step where ENGI materializes the selected asset pack into the private remediation branch and mounted source files.',
    detail: 'Materialization proofs explain which selected assets became branch artifacts, which stayed excluded, and why the public projection remains bounded.',
    points: [
      'Makes branch contents traceable back to selection and policy',
      'Supports later proof and bounded-public disclosure'
    ]
  },
  'ledger-policy': {
    kicker: 'Post-settlement',
    title: 'Ledger and policy surfaces',
    summary: 'Balances, run history, and policy-oriented surfaces that remain after settlement closes.',
    detail: 'These surfaces show durable consequences and governance context without reopening the primary deposit-to-need story.',
    points: [
      'Includes ledger state and prior run history',
      'Complements proof and settlement with downstream accounting context'
    ]
  },
  'ledger-accounts': {
    kicker: 'Ledger surface',
    title: 'Ledger accounts',
    summary: 'The current post-settlement balances for buyer pools and supplier pending-claims accounts in this local prototype.',
    detail: 'These accounts show durable state after settlement closes instead of replaying the whole proof and branch story again.',
    points: [
      'Shows the current account balances after the latest run',
      'Lets the operator inspect downstream accounting consequences quickly'
    ]
  },
  'run-history': {
    kicker: 'History surface',
    title: 'Run history',
    summary: 'The public projection of prior runs: which need closed, which branch was staged, and which bundle was produced.',
    detail: 'Run history is the durable record of what this demo has already materialized and settled, without reopening every private artifact.',
    points: [
      'Shows prior need lifecycle and bundle progression',
      'Keeps history readable without exposing private branch payloads'
    ]
  },
  'candidate-asset': {
    kicker: 'Deposit surface',
    title: 'Candidate asset',
    summary: 'A deposited asset ENGI is still evaluating for fit, ranking, verification, and eventual branch or settlement use.',
    detail: 'Candidate means the asset is in the deposit/evaluation flow. It is not yet guaranteed to survive into the selected asset pack or settlement.',
    points: [
      'Carries deposit, addressing, signing, and auth context forward',
      'May end up selected, context-only, or excluded depending on later steps'
    ]
  },
  'scenario-preview': {
    kicker: 'Scenario surface',
    title: 'Scenario preview',
    summary: 'The preview read of the active seeded scenario before a run materializes deeper branch, proof, and settlement artifacts.',
    detail: 'This preview is meant to make the demand surface and profile semantics consequential before the operator reads private branch artifacts.',
    points: [
      'Shows the active measured-demand shape before a run',
      'Keeps scenario meaning legible even without a latest run'
    ]
  },
  'detailed-need-surface': {
    kicker: 'Need surface',
    title: 'Detailed need surface',
    summary: 'The full need and measurement read that expands the compact needing surface into task, parser, failure, derivation, and closure detail.',
    detail: 'This is the deeper need-facing artifact for operators who want to inspect exactly how the active demand was measured.',
    points: [
      'Builds on the compact needing surface rather than replacing it',
      'Preserves the exact need object in raw mode for inspection'
    ]
  },
  'settlement-participation': {
    kicker: 'Settlement semantics',
    title: 'Settlement participation',
    summary: 'The explicit classification of assets as selected, participating, credited, zero-credit participating, or excluded during settlement.',
    detail: 'This surface keeps branch selection and economic credit distinct so operators can see why an asset mattered without assuming it always earned credit.',
    points: [
      'Separates branch selection from settlement participation',
      'Makes zero-credit participation explicit instead of implicit'
    ]
  },
  'journal-diff': {
    kicker: 'Accounting artifact',
    title: 'Journal diff',
    summary: 'The exact debit/credit event that closes the run into ledger state.',
    detail: 'This is the accounting event the operator can replay to confirm that shares, debits, credits, and balances all stay conserved.',
    points: [
      'Shows the before/after accounting consequence of settlement',
      'Carries the invariants behind exact-accounting closure'
    ]
  },
  'exact-accounting': {
    kicker: 'Settlement semantics',
    title: 'Exact accounting',
    summary: 'The fixed-point, replayable accounting discipline that turns normalized shares into conserved debits, credits, and balances.',
    detail: 'Exact accounting is the reason settlement can be explained precisely instead of as a fuzzy score summary. It keeps normalization, allocation, and journal closure deterministic.',
    points: [
      'Preserves conservation and normalization invariants',
      'Explains why a credited share can be audited all the way to micro-units'
    ]
  },
  'bounded-public-proof': {
    kicker: 'Disclosure surface',
    title: 'Bounded public proof',
    summary: 'The redacted public proof surface derived from the private proof bundle without leaking private branch artifacts.',
    detail: 'This is the operator-facing proof projection intended to remain public while the deeper private proof and branch materials stay bounded.',
    points: [
      'Separates public inspection from private branch payloads',
      'Depends on the private proof chain without exposing all of it'
    ]
  },
  'proof-term': {
    kicker: 'Term',
    title: 'Proof',
    summary: 'Marks an artifact or tag as proof-bearing or proof-oriented, not merely implementation code.',
    detail: 'In this demo proof surfaces include witness manifests, formal logs, redaction proofs, disclosure proofs, and settlement proof artifacts.',
    points: [
      'Proof closure binds deposit, need, rights, and settlement together',
      'A proof tag usually signals evidence-heavy rather than code-only material'
    ]
  },
  'validator-term': {
    kicker: 'Term',
    title: 'Validator',
    summary: 'Refers to validator-focused remediation and proof surfaces in the seeded corpus.',
    detail: 'Current source uses validator scenarios to stress replay safety, overflow checks, and proof/benchmark agreement.',
    points: [
      'Often appears with Rust, proof, or replay-window tags',
      'Important in the proof-heavy validator scenario family'
    ]
  },
  'replay-window-term': {
    kicker: 'Term',
    title: 'Replay window',
    summary: 'The nonce or time window a validator uses to reject stale or replayed actions.',
    detail: 'The validator scenarios explicitly target replay-window regressions and the proofs required to show they are fixed.',
    points: [
      'Tightly linked to validator overflow and nonce-bound checks',
      'A narrow but important failure domain in the current corpus'
    ]
  },
  'awaiting-run': {
    kicker: 'Run status',
    title: 'Awaiting run',
    summary: 'The repo-to-settlement closure path has not been materialized yet for the current selection.',
    detail: 'You can already inspect supply, deposit, need, and fit. Running the branch flow stages branch artifacts, proof, and settlement.',
    points: [
      'Pre-run state, not an error state',
      'Useful when the shell is ready but deeper closure artifacts do not exist yet'
    ]
  },
  'awaiting-selection': {
    kicker: 'Deposit status',
    title: 'Awaiting selection',
    summary: 'No repo inventory entries are currently bound into the deposit preview.',
    detail: 'Select inventory entries or provide raw fallback content to make the deposit surface concrete.',
    points: [
      'The deposit surface can still preview roots and profile semantics',
      'Selection is what turns supply into an actual deposit candidate'
    ]
  },
  'normalization-pressure-low': {
    kicker: 'Fit status',
    title: 'Low normalization pressure',
    summary: 'The current fit looks close to a targeted, bounded closure path.',
    detail: 'In current source this usually means a small Profile A-style selection that should settle directly once proof closure lands.',
    points: [
      'Usually paired with targeted deposit semantics',
      'Signals less need for multi-asset normalization'
    ]
  },
  'normalization-pressure-medium': {
    kicker: 'Fit status',
    title: 'Medium normalization pressure',
    summary: 'The fit is no longer a single crisp closure, but it is not fully normalization-heavy either.',
    detail: 'This is the middle state where overlap or asset count is starting to matter before settlement decides final crediting.',
    points: [
      'Often a transition zone between direct closure and heavy normalization',
      'Worth reading alongside overlap kinds and proof intent'
    ]
  },
  'normalization-pressure-high': {
    kicker: 'Fit status',
    title: 'High normalization pressure',
    summary: 'The fit strongly points toward a multi-asset, source-to-shares settlement story.',
    detail: 'In current source this is the expected posture for broader Profile B-style deposits against composite needs.',
    points: [
      'Usually means several overlapping artifacts matter',
      'Proof and settlement must explain normalization explicitly'
    ]
  }
};

const NEED_CAPSULE_REFERENCES = {
  code: [
    'public/app.js -> chipList()',
    'public/app.js -> renderNeedVisual()',
    'public/app.js -> renderScenarioCorpusVisual()'
  ],
  spec: ['V21 canon -> Needing and prompt/inference ownership', 'V21 canon -> Realization profiles and settlement shape', 'V21 canon -> Generated proof, branch, and settlement artifacts']
};

const ASSET_CAPSULE_REFERENCES = {
  code: [
    'public/app.js -> chipList()',
    'public/app.js -> renderAssetVisual()',
    'src/engi-demo.js -> makeCandidateAsset()'
  ],
  spec: ['V21 canon -> Depositing and asset supply', 'V21 canon -> Artifact kinds, inventory supply, and depositing overrides', 'V21 canon -> Identity, authority, signing, and addressing']
};

const EXTRA_EXPLAINERS = {
  'run-count': {
    kicker: 'History metric',
    title: 'Runs',
    summary: 'The total number of public run-history entries currently visible in the shell.',
    detail: 'This is the replayable public projection count, not the count of private branch artifacts or one repo inventory selection.',
    points: [
      'Lets an operator gauge how much prior closure history the demo already carries',
      'Pairs with settled runs to separate mere history from completed closure'
    ],
    references: {
      code: ['public/app.js -> renderRunHistoryVisual()'],
      spec: ['V21 canon -> Generated proof, branch, and settlement artifacts', 'V21 canon -> Validation, operator review, and canonical promotion']
    }
  },
  'settled-runs': {
    kicker: 'History metric',
    title: 'Settled runs',
    summary: 'The subset of run history that actually reached settled lifecycle closure.',
    detail: 'This metric helps the operator separate staged or partial history from runs whose proof and settlement path already closed.',
    points: [
      'Counts closed economic outcomes, not just attempted runs',
      'Useful for reading whether the demo has already demonstrated full closure'
    ],
    references: {
      code: ['public/app.js -> renderRunHistoryVisual()'],
      spec: ['V21 canon -> Generated proof, branch, and settlement artifacts', 'V21 canon -> Validation, operator review, and canonical promotion']
    }
  },
  'pre-proof-surface': {
    kicker: 'Closure staging',
    title: 'Before proof',
    summary: 'This surface is intentionally upstream of proof inspection.',
    detail: 'ENGI requires deposit-to-need fit to be legible before the operator is asked to read deeper proof bundles or exact accounting internals.',
    points: [
      'Makes the fit story obvious first',
      'Keeps proof and settlement as downstream closure rather than upfront burden'
    ],
    references: {
      code: ['public/app.js -> renderDepositingToNeedingVisual()'],
      spec: ['V21 canon -> Fit, recall, ranking, and verification', 'V21 canon -> Proof contract, witnesses, replay, and branch closure', 'V21 canon -> Generated proof, branch, and settlement artifacts']
    }
  },
  'closure-path-badge': {
    kicker: 'Closure staging',
    title: 'Branch -> proof -> settlement',
    summary: 'The intended closure chain after fit becomes persuasive.',
    detail: 'The branch carries the private artifact pack, proof closes the evidence story, and settlement turns that closed story into accounting consequences.',
    points: [
      'Explains the order of downstream surfaces',
      'Connects fit intent to later branch, proof, and settlement artifacts'
    ],
    references: {
      code: ['public/app.js -> renderDepositingToNeedingVisual()', 'public/app.js -> renderRepoToSettlementVisual()'],
      spec: ['V21 canon -> Proof contract, witnesses, replay, and branch closure', 'V21 canon -> Generated proof, branch, and settlement artifacts']
    }
  },
  'branch-intent': {
    kicker: 'Fit-to-closure',
    title: 'Branch intent',
    summary: 'Why the current deposit-to-need fit should materialize a private remediation branch at all.',
    detail: 'This is the forward-looking statement that turns a persuasive fit into a branch plan before any proof bundle or settlement report exists.',
    points: [
      'Upstream of proof closure',
      'Should read as a consequence of fit, not as separate infrastructure trivia'
    ],
    references: {
      code: ['public/app.js -> renderDepositingToNeedingVisual()', 'src/engi-demo.js -> buildDepositingToNeedingSurface()'],
      spec: ['V21 canon -> Fit, recall, ranking, and verification', 'V21 canon -> Proof contract, witnesses, replay, and branch closure', 'V21 canon -> Generated proof, branch, and settlement artifacts']
    }
  },
  'ref-commit': {
    kicker: 'Addressing field',
    title: 'Ref / commit',
    summary: 'The exact source ref and commit ENGI is binding into the current address.',
    detail: 'This is where the operator can see which branch, tag, or pinned commit the asset was taken from before later proofs hash it into roots.',
    points: [
      'Separates version identity from artifact title',
      'Feeds the explicit repo address carried through later proofs'
    ],
    references: {
      code: ['public/app.js -> renderAssetVisual()', 'src/engi-demo.js -> makeCandidateAsset()'],
      spec: ['V21 canon -> Depositing and asset supply', 'V21 canon -> Identity, authority, signing, and addressing']
    }
  },
  'source-paths': {
    kicker: 'Addressing field',
    title: 'Source paths',
    summary: 'The concrete repository paths ENGI believes this asset or deposit is drawing from.',
    detail: 'Paths matter because ENGI keeps kind-native supply and exact addressing legible before the operator opens raw content.',
    points: [
      'Useful for repo artifact bundles and mixed deposits',
      'Complements repo/ref identity with file-level scope'
    ],
    references: {
      code: ['public/app.js -> renderAssetVisual()', 'src/engi-demo.js -> makeCandidateAsset()'],
      spec: ['V21 canon -> Depositing and asset supply', 'V21 canon -> Artifact kinds, inventory supply, and depositing overrides', 'V21 canon -> Identity, authority, signing, and addressing']
    }
  },
  'content-root': {
    kicker: 'Content binding',
    title: 'Content root',
    summary: 'The deterministic content hash over the current asset payload.',
    detail: 'This is the compact content identity that lets ENGI keep previews, addressing, signing, and later proofs tied to the same payload.',
    points: [
      'Different from repo path or commit identity',
      'Becomes useful whenever operators need to confirm payload sameness'
    ],
    references: {
      code: ['public/app.js -> renderAssetVisual()', 'src/engi-demo.js -> makeCandidateAsset()'],
      spec: ['V21 canon -> Depositing and asset supply', 'V21 canon -> Identity, authority, signing, and addressing', 'V21 canon -> Generated proof, branch, and settlement artifacts']
    }
  },
  'upload-surfaces': {
    kicker: 'Asset surface',
    title: 'Upload surfaces',
    summary: 'The distinct renderable or derived surfaces ENGI produced for the deposited asset.',
    detail: 'A single asset can expose visual preview, raw content, selection metadata, and derived analysis surfaces without collapsing them into one generic blob.',
    points: [
      'Supports artifact-kind-native UX',
      'Helps operators see what parts of the asset are available for inspection'
    ],
    references: {
      code: ['public/app.js -> renderAssetVisual()', 'src/engi-demo.js -> makeCandidateAsset()'],
      spec: ['V21 canon -> Artifact kinds, inventory supply, and depositing overrides']
    }
  },
  constraints: {
    kicker: 'Need / asset guardrail',
    title: 'Constraints',
    summary: 'Hard rules the current asset or measured need expects ENGI to preserve while closing the scenario.',
    detail: 'Constraints keep the demo from reading like “fix it however you want.” They state what must stay true while the branch, proof, and settlement path proceeds.',
    points: [
      'Can be declared on assets or on the measured need',
      'Different from closure criteria, which describe what counts as closed'
    ],
    references: {
      code: ['public/app.js -> renderAssetVisual()', 'public/app.js -> renderNeedVisual()'],
      spec: ['V21 canon -> Needing and prompt/inference ownership', 'V21 canon -> Artifact kinds, inventory supply, and depositing overrides', 'V21 canon -> Generated proof, branch, and settlement artifacts']
    }
  },
  'signing-algorithm': {
    kicker: 'Signing field',
    title: 'Algorithm',
    summary: 'The signing algorithm used for the current attestation payload.',
    detail: 'This tells the operator what cryptographic mechanism is supposed to stand behind the signer and payload hash without requiring them to inspect raw attestation blobs.',
    points: [
      'Separate from who signed',
      'Separate from where the key material came from'
    ],
    references: {
      code: ['public/app.js -> renderAssetVisual()', 'src/engi-demo.js -> makeCandidateAsset()'],
      spec: ['V21 canon -> Identity, authority, signing, and addressing', 'V21 canon -> Generated proof, branch, and settlement artifacts']
    }
  },
  'key-source': {
    kicker: 'Signing field',
    title: 'Key source',
    summary: 'Where the signer key material is modeled as coming from in this demo.',
    detail: 'This is the provenance claim behind the signer, not the signer address itself and not the payload hash the signature covers.',
    points: [
      'Useful for demo honesty about signer provenance',
      'Complements signer address and algorithm rather than replacing them'
    ],
    references: {
      code: ['public/app.js -> renderAssetVisual()', 'src/engi-demo.js -> makeCandidateAsset()'],
      spec: ['V21 canon -> Identity, authority, signing, and addressing', 'V21 canon -> Disclosure, projection, and boundary reality']
    }
  },
  'payload-hash': {
    kicker: 'Signing field',
    title: 'Payload hash',
    summary: 'The hash over the payload the signer is attesting to.',
    detail: 'This is the compact integrity handle that later proof surfaces can reference when they need to show the attested payload has not drifted.',
    points: [
      'Different from content root and different from auth payload hash',
      'Lets later proofs bind back to one exact attested payload'
    ],
    references: {
      code: ['public/app.js -> renderAssetVisual()', 'src/engi-demo.js -> makeCandidateAsset()'],
      spec: ['V21 canon -> Identity, authority, signing, and addressing', 'V21 canon -> Generated proof, branch, and settlement artifacts']
    }
  },
  'settlement-shape': {
    kicker: 'Profile meaning',
    title: 'Settlement shape',
    summary: 'The characteristic economic closure pattern the active profile is supposed to produce.',
    detail: 'The current canon wants Profile A and Profile B to feel different first through deposit mode, need mode, and settlement shape rather than through infrastructure trivia.',
    points: [
      'Profile A should read as concentrated and direct',
      'Profile B should read as normalized and source-to-shares aware'
    ],
    references: {
      code: ['public/app.js -> renderProfileCompositionVisual()', 'public/app.js -> renderNeedVisual()'],
      spec: ['V21 canon -> Realization profiles and settlement shape', 'V21 canon -> Generated proof, branch, and settlement artifacts']
    }
  },
  'scenario-anchors': {
    kicker: 'Profile meaning',
    title: 'Scenario anchors',
    summary: 'The seeded scenario families that best anchor what a profile is trying to demonstrate.',
    detail: 'These anchors show which recurring need shapes in the corpus make a profile’s deposit, need, and closure posture easiest to understand.',
    points: [
      'Acts as corpus grounding for profile semantics',
      'Useful when one profile spans several scenario families'
    ],
    references: {
      code: ['public/app.js -> renderProfileCompositionVisual()', 'src/demo-shell-state.js -> buildProfileCompositions()'],
      spec: ['V21 canon -> Realization profiles and settlement shape', 'V21 canon -> Validation, operator review, and canonical promotion']
    }
  },
  'profile-composition': {
    kicker: 'Profile meaning',
    title: 'Composition',
    summary: 'The short list of characteristics that make the current profile operationally distinct.',
    detail: 'Composition is the compact operator read of why a profile exists: deposit shape, need posture, proof burden, and settlement story.',
    points: [
      'Should make Profile A and Profile B feel different immediately',
      'Keeps profile semantics readable without opening raw source fixtures'
    ],
    references: {
      code: ['public/app.js -> renderProfileCompositionVisual()', 'src/demo-shell-state.js -> buildProfileCompositions()'],
      spec: ['V21 canon -> Realization profiles and settlement shape', 'V21 canon -> Proof contract, witnesses, replay, and branch closure']
    }
  },
  'failing-cases': {
    kicker: 'Need measurement',
    title: 'Failing cases',
    summary: 'The concrete benchmark or parser failure slices the active need still carries.',
    detail: 'These chips are the exact visible failure names ENGI wants operators to understand before they start reading branch artifacts.',
    points: [
      'Upstream of proof closure',
      'One of the clearest ways needing stays consequential in the shell'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  'weak-dimensions': {
    kicker: 'Need measurement',
    title: 'Weak dimensions',
    summary: 'Cross-cutting quality dimensions where the current scenario remains weak even if one narrow failing case improves.',
    detail: 'Weak dimensions keep the need from collapsing into a single bug label when the real closure burden still spans safety, auditability, or resilience concerns.',
    points: [
      'Usually broader than one failing case',
      'Helpful for reading composite or normalization-heavy needs'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  'field-derivations': {
    kicker: 'Need lineage',
    title: 'Field derivations',
    summary: 'The source lineage for how the need object’s important fields were derived.',
    detail: 'This is the explanation layer that keeps measured demand from feeling like opaque parser magic.',
    points: [
      'Shows which fields came from seeded inputs versus deterministic synthesis',
      'Useful when validating why the need reads the way it does'
    ],
    references: {
      code: ['public/app.js -> renderNeedVisual()', 'src/engi-demo.js -> buildNeedDescriptor()'],
      spec: ['V21 canon -> Needing and prompt/inference ownership', 'V21 canon -> Identity, authority, signing, and addressing']
    }
  },
  'recall-channels': {
    kicker: 'Need hand-off',
    title: 'Recall channels + hand-offs',
    summary: 'The search and retrieval contracts that move measured demand into candidate recall and later ranking.',
    detail: 'These are the current need-to-recall bridge surfaces that explain how the need becomes search queries, channel contributions, and downstream evidence use.',
    points: [
      'Connects need measurement to retrieval behavior',
      'Useful for understanding why later ranking surfaces saw certain assets'
    ],
    references: {
      code: ['public/app.js -> renderNeedVisual()', 'src/engi-demo.js -> buildNeedDescriptor()', 'src/engi-demo.js -> recallCandidates()'],
      spec: ['V21 canon -> Needing and prompt/inference ownership', 'V21 canon -> Proof contract, witnesses, replay, and branch closure']
    }
  },
  'modeled-local-stages': {
    kicker: 'Boundary metric',
    title: 'Modeled local stages',
    summary: 'Stages the demo represents locally as deterministic models rather than executing as live external contracts.',
    detail: 'This count helps the operator see where the prototype is honest about modeling an interface locally while still preserving the production boundary story.',
    points: [
      'Part of boundary honesty, not profile semantics',
      'Different from executed-local stages'
    ],
    references: {
      code: ['public/app.js -> renderBoundaryRealityVisual()', 'src/engi-demo.js -> buildBoundaryRealitySurface()'],
      spec: ['V21 canon -> Disclosure, projection, and boundary reality']
    }
  },
  'executed-local-stages': {
    kicker: 'Boundary metric',
    title: 'Executed local stages',
    summary: 'Stages the demo actually executes here as deterministic local behavior.',
    detail: 'This count is the strongest quick read of how much of the repo-to-settlement path already runs inside the local prototype.',
    points: [
      'Useful for understanding prototype strength',
      'Still sits inside the explicit boundary reality surface'
    ],
    references: {
      code: ['public/app.js -> renderBoundaryRealityVisual()', 'src/engi-demo.js -> buildBoundaryRealitySurface()'],
      spec: ['V21 canon -> Disclosure, projection, and boundary reality']
    }
  },
  auth: {
    kicker: 'Capsule term',
    title: 'Auth',
    summary: 'Marks a scenario or asset as primarily about authorization, identity binding, installation-scoped access, or issuer/session correctness.',
    detail: 'In the current corpus auth capsules usually sit close to session validity, issuer compatibility, rollback safety, and GitHub App authority surfaces.',
    points: [
      'A demand or asset domain tag',
      'Often upstream of identity/auth spine and proof closure'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  'session-validity': {
    kicker: 'Capsule term',
    title: 'Session validity',
    summary: 'The requirement that remediation preserve correct session behavior while fixing the active failure.',
    detail: 'This tag appears when rollback, issuer compatibility, or replay safety could break real sessions if handled carelessly.',
    points: [
      'Common in auth rollback scenarios',
      'Often paired with rollback or issuer constraints'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  rollback: {
    kicker: 'Capsule term',
    title: 'Rollback',
    summary: 'Marks remediation work that must remain reversible, correctly ordered, and safe to back out.',
    detail: 'Rollback capsules matter because ENGI wants the operator to see not just the fix, but the safe closure path for deploying that fix.',
    points: [
      'Often paired with audit receipts or session-preservation constraints',
      'Common in both auth and deployment scenarios'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  auditability: {
    kicker: 'Capsule term',
    title: 'Auditability',
    summary: 'The requirement that remediation, proof, and settlement remain replayable and inspectable.',
    detail: 'Auditability capsules usually imply receipts, policy traces, or proof artifacts that must stay bound to the remediation path.',
    points: [
      'Useful for both need constraints and asset tags',
      'Often accompanies proof, policy, or receipt-binding surfaces'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  benchmark: {
    kicker: 'Capsule term',
    title: 'Benchmark',
    summary: 'Marks evidence that comes from or must remain tied to benchmark execution and measured outputs.',
    detail: 'Benchmark capsules keep the need grounded in observed failure or regression evidence instead of only narrative intent.',
    points: [
      'Central to measured needing',
      'Often paired with workflow-artifact or proof surfaces'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  'workflow-artifact': {
    kicker: 'Capsule term',
    title: 'Workflow artifact',
    summary: 'Marks content that originated from or is bound to a workflow run artifact rather than only a repo file path.',
    detail: 'This matters when the operator needs to trace proof or benchmark evidence back to one workflow execution context.',
    points: [
      'Common for proof logs and benchmark outputs',
      'Often pairs with workflow-run addressing'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  'workflow-binding': {
    kicker: 'Capsule term',
    title: 'Workflow binding',
    summary: 'Marks a requirement that the remediation or proof story stay explicitly bound to a workflow run or workflow-derived artifact.',
    detail: 'This is stronger than just mentioning a workflow path. It says workflow identity matters for trust or closure.',
    points: [
      'Useful when receipts must link back to one run',
      'Common in benchmark- and proof-heavy scenarios'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  'receipt-binding': {
    kicker: 'Capsule term',
    title: 'Receipt binding',
    summary: 'The requirement that evidence, remediation, or settlement stay attached to replayable receipts.',
    detail: 'Receipt-binding capsules matter whenever the demo must prove not just what happened, but which receipt trail proves it happened.',
    points: [
      'Often paired with auditability and workflow binding',
      'Can show up in both constraints and closure criteria'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  config: {
    kicker: 'Capsule term',
    title: 'Config',
    summary: 'Marks configuration-bearing source material or a need whose closure depends on configuration correctness.',
    detail: 'Config capsules usually point to policy files, environment declarations, or runtime settings that need to move in lockstep with code and proof.',
    points: [
      'Different from code patch semantics',
      'Important when policy or deployment drift is in scope'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  'compatibility-window': {
    kicker: 'Capsule term',
    title: 'Compatibility window',
    summary: 'A bounded time or nonce window in which compatibility, replay, or validator checks remain valid.',
    detail: 'This capsule shows up when the scenario cares about stale actions, issuer windows, or replay-safe ordering.',
    points: [
      'Often paired with session-validity or replay-window concerns',
      'Useful for validator- and auth-heavy flows'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  creusot: {
    kicker: 'Capsule term',
    title: 'Creusot',
    summary: 'Marks proof-oriented Rust material tied to formal verification style workflows.',
    detail: 'In the current corpus Creusot appears where validator or overflow scenarios lean on formal reasoning rather than only runtime tests.',
    points: [
      'A proof-heavy artifact signal',
      'Usually paired with validator or formal-methods tags'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  polyglot: {
    kicker: 'Capsule term',
    title: 'Polyglot',
    summary: 'Marks scenarios or assets that span several languages or runtime stacks at once.',
    detail: 'Polyglot capsules are a signal that cross-language parity and broader normalization pressures may matter.',
    points: [
      'Often pairs with TypeScript, Python, and Rust tags',
      'Useful for Profile B-style deposits'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  typescript: {
    kicker: 'Stack tag',
    title: 'TypeScript',
    summary: 'Marks TypeScript-bearing source material in the active asset or scenario corpus.',
    detail: 'In the polyglot scenarios this helps the operator see one language slice in a broader cross-language remediation story.',
    points: [
      'A stack lens, not a closure criterion by itself',
      'Often paired with Python or Rust in the same deposit'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  python: {
    kicker: 'Stack tag',
    title: 'Python',
    summary: 'Marks Python-bearing source material in the active asset or scenario corpus.',
    detail: 'Python capsules usually appear when workflow tooling, replay checks, or polyglot service boundaries matter.',
    points: [
      'A stack lens, not a closure criterion by itself',
      'Often paired with TypeScript or Rust in cross-language scenarios'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  rust: {
    kicker: 'Stack tag',
    title: 'Rust',
    summary: 'Marks Rust-bearing source material in the active asset or scenario corpus.',
    detail: 'Rust capsules are common in validator, formal-methods, or replay-safety scenarios where proof burden is heavier.',
    points: [
      'A stack lens, not a closure criterion by itself',
      'Often paired with validator or proof-heavy tags'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  'cross-language': {
    kicker: 'Capsule term',
    title: 'Cross-language parity',
    summary: 'Marks scenarios where several language or runtime slices have to stay aligned through the remediation.',
    detail: 'This is one of the clearest signals that the need is composite and may push toward normalization-heavy closure.',
    points: [
      'Often implies broader proof or settlement burden',
      'Common in Profile B demonstrations'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  deployment: {
    kicker: 'Capsule term',
    title: 'Deployment',
    summary: 'Marks remediation work whose closure depends on deployment sequencing, release safety, or environment parity.',
    detail: 'Deployment capsules matter because the demo has to show not only code changes, but safe rollout and rollback posture.',
    points: [
      'Often paired with infra, helm, terraform, or policy concerns',
      'Can shift the scenario toward broader operational proof'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  infra: {
    kicker: 'Capsule term',
    title: 'Infrastructure',
    summary: 'Marks scenarios or assets that depend on infrastructure state, provisioning, or deployment topology.',
    detail: 'Infra capsules usually mean the remediation is broader than one code patch and must keep environmental state consistent too.',
    points: [
      'Often paired with deployment or config work',
      'Common in rollout and parity scenarios'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  terraform: {
    kicker: 'Stack tag',
    title: 'Terraform',
    summary: 'Marks Terraform-bearing infrastructure material in the current corpus.',
    detail: 'Terraform tags usually show up where deployment drift or environment consistency matters.',
    points: [
      'A concrete infra artifact signal',
      'Often paired with Helm or deployment tags'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  helm: {
    kicker: 'Stack tag',
    title: 'Helm',
    summary: 'Marks Helm-bearing deployment or infrastructure material in the current corpus.',
    detail: 'Helm tags usually matter when deployment parity or version drift needs to stay explicit in the demo.',
    points: [
      'A concrete deployment artifact signal',
      'Often paired with Terraform or Kubernetes tags'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  kubernetes: {
    kicker: 'Stack tag',
    title: 'Kubernetes',
    summary: 'Marks Kubernetes-bearing deployment material in the current corpus.',
    detail: 'Kubernetes tags usually show up when environment topology or rollout safety is part of the need.',
    points: [
      'Signals live-system deployment context',
      'Often paired with infra or policy controls'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  'source-to-shares-tag': {
    kicker: 'Capsule term',
    title: 'Source-to-shares',
    summary: 'Marks scenarios or assets where contribution normalization into settlement shares is central.',
    detail: 'This capsule means the operator should expect settlement explanation to stay explicit rather than collapsing to a single decisive winner story.',
    points: [
      'Common in Profile B flows',
      'Directly connected to normalization pressure and settlement participation'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  normalization: {
    kicker: 'Capsule term',
    title: 'Normalization',
    summary: 'Marks scenarios where several overlapping contributions must be normalized together instead of treated as one decisive asset.',
    detail: 'Normalization capsules matter because they change the shape of proof and settlement even when the deposit still looks plausible at first glance.',
    points: [
      'Signals broader proof and settlement burden',
      'Often paired with source-to-shares and many-asset semantics'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  'many-asset': {
    kicker: 'Capsule term',
    title: 'Many-asset',
    summary: 'Marks a scenario where several assets are expected to participate in closure rather than one narrow decisive asset.',
    detail: 'This is one of the clearer signals that normalization-heavy settlement semantics may matter.',
    points: [
      'Common in Profile B flows',
      'Often pairs with source-to-shares explanation'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  privacy: {
    kicker: 'Capsule term',
    title: 'Privacy',
    summary: 'Marks scenarios or assets where disclosure boundaries and private artifact handling are first-class concerns.',
    detail: 'Privacy capsules matter because the canonical system keeps branch/proof richness while still requiring bounded public disclosure.',
    points: [
      'Often pairs with redaction or disclosure tags',
      'Lives close to bounded public proof surfaces'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  'privacy-boundary': {
    kicker: 'Capsule term',
    title: 'Privacy boundary',
    summary: 'Marks a scenario where the private/public split is central to closure quality.',
    detail: 'This capsule means the operator should expect explicit redaction, disclosure, or bounded-public-proof semantics.',
    points: [
      'A stronger signal than generic privacy',
      'Often paired with branch privacy and public proof boundaries'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  projection: {
    kicker: 'Capsule term',
    title: 'Projection',
    summary: 'Marks public-facing projections derived from deeper private artifacts.',
    detail: 'Projection capsules matter whenever the demo needs to show bounded public inspection without exposing the private branch payloads.',
    points: [
      'Closely tied to bounded public proof',
      'Useful for privacy-boundary scenarios'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  redaction: {
    kicker: 'Capsule term',
    title: 'Redaction',
    summary: 'Marks scenarios or assets where sensitive material must be withheld while still preserving a proof-bearing public story.',
    detail: 'Redaction capsules typically sit beside privacy, disclosure, and bounded-proof requirements.',
    points: [
      'Useful for understanding public/private proof splits',
      'Often paired with privacy-boundary tags'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  disclosure: {
    kicker: 'Capsule term',
    title: 'Disclosure',
    summary: 'Marks what can or cannot be projected outward from the private remediation branch.',
    detail: 'Disclosure capsules matter because ENGI wants public proof to stay legible without leaking private artifacts.',
    points: [
      'Close to privacy and bounded-public-proof concerns',
      'Useful in redaction-heavy scenarios'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  containment: {
    kicker: 'Capsule term',
    title: 'Containment',
    summary: 'Marks a requirement to keep remediation effects bounded rather than letting them spill across unrelated artifacts or disclosures.',
    detail: 'Containment capsules are especially useful in privacy or incident-response scenarios where scope discipline matters.',
    points: [
      'Signals bounded remediation scope',
      'Often pairs with disclosure or incident controls'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  governance: {
    kicker: 'Capsule term',
    title: 'Governance',
    summary: 'Marks policy, approval, or procedural control surfaces that the remediation path must respect.',
    detail: 'Governance capsules keep the demo focused on operator-quality closure instead of treating process controls as optional garnish.',
    points: [
      'Often pairs with policy, review, or auditability',
      'Can appear in both need constraints and asset metadata'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  issuer: {
    kicker: 'Capsule term',
    title: 'Issuer',
    summary: 'Marks scenarios where issuer identity, compatibility, or authority binding is central to closure.',
    detail: 'Issuer capsules usually show up with auth, session-validity, and rollback concerns in the current corpus.',
    points: [
      'A narrower auth-domain signal',
      'Useful in compatibility and rollback scenarios'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  gateway: {
    kicker: 'Capsule term',
    title: 'Gateway',
    summary: 'Marks gateway-facing code, infra, or policy material in the current corpus.',
    detail: 'Gateway capsules matter when the remediation spans API edge behavior, policy enforcement, or cross-language routing.',
    points: [
      'Common in polyglot scenarios',
      'Often pairs with config or deployment tags'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  'incident-response': {
    kicker: 'Capsule term',
    title: 'Incident response',
    summary: 'Marks material or scenarios oriented around responding to an incident rather than only shipping a planned feature change.',
    detail: 'Incident-response capsules usually imply stronger pressure on rollback safety, auditability, and bounded disclosure.',
    points: [
      'Useful for policy and privacy scenarios',
      'Often paired with governance and proof concerns'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  'formal-methods': {
    kicker: 'Capsule term',
    title: 'Formal methods',
    summary: 'Marks proof-heavy material that leans on formal reasoning rather than only runtime checks.',
    detail: 'Formal-methods capsules are a signal that the proof burden is higher and the operator may need to read theorem or validator surfaces.',
    points: [
      'Often paired with validator, Creusot, or Rust tags',
      'Important in proof-heavy ENGI demonstrations'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  policy: {
    kicker: 'Capsule term',
    title: 'Policy',
    summary: 'Marks material or constraints whose closure depends on explicit policy behavior, precedence, or auditability.',
    detail: 'Policy capsules matter because ENGI often has to prove not only that code changed, but that policy semantics now close correctly too.',
    points: [
      'Often paired with governance and config',
      'Common in incident and deployment scenarios'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  patch: {
    kicker: 'Capsule term',
    title: 'Patch',
    summary: 'Marks code-patch-bearing material or a need that expects code changes as part of closure.',
    detail: 'Patch capsules help operators distinguish implementation-carrying assets from proof-only or runbook-only deposits.',
    points: [
      'One of the core artifact-kind-native signals',
      'Can still require proof, policy, or deployment closure downstream'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  runbook: {
    kicker: 'Capsule term',
    title: 'Runbook',
    summary: 'Marks operational documentation or procedural remediation guidance in the current corpus.',
    detail: 'Runbook capsules matter when closure depends on operator execution steps, hand-offs, or governance discipline in addition to code changes.',
    points: [
      'Different from a code patch or proof log',
      'Useful in deployment, incident, and review scenarios'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  security: {
    kicker: 'Capsule term',
    title: 'Security',
    summary: 'Marks scenarios or assets where protection against unsafe behavior is part of the closure burden.',
    detail: 'Security capsules usually sit beside auth, proof, validator, or patch-safety concerns in the current corpus.',
    points: [
      'A broad risk-domain signal',
      'Often pairs with rollback or proof requirements'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  monorepo: {
    kicker: 'Capsule term',
    title: 'Monorepo',
    summary: 'Marks a scenario whose supply or closure path spans one multi-surface repository.',
    detail: 'Monorepo capsules matter because they often combine code, config, docs, and proofs inside one repo-bound deposit.',
    points: [
      'Useful for mixed-bundle demonstrations',
      'Can increase artifact-kind diversity and normalization pressure'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  migration: {
    kicker: 'Capsule term',
    title: 'Migration',
    summary: 'Marks scenarios or assets oriented around safe state transition rather than only steady-state correctness.',
    detail: 'Migration capsules often imply rollback discipline, sequencing, and auditability requirements.',
    points: [
      'Common in auth and deployment scenarios',
      'Usually paired with rollback or session-validity concerns'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  review: {
    kicker: 'Capsule term',
    title: 'Review',
    summary: 'Marks review posture, approval requirements, or code-review-bound evidence in the current corpus.',
    detail: 'Review capsules matter whenever ENGI needs to show why a change is allowed, explained, or justified before it closes.',
    points: [
      'Often pairs with governance or policy',
      'Can show up in constraints, failing cases, or asset tags'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  escalation: {
    kicker: 'Capsule term',
    title: 'Escalation',
    summary: 'Marks scenarios where operator escalation or hand-off posture is part of safe closure.',
    detail: 'Escalation capsules typically indicate that code or proof alone is not the whole story; operator workflow still matters.',
    points: [
      'Useful in incident and governance-heavy flows',
      'Can appear beside runbook or review material'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  drift: {
    kicker: 'Capsule term',
    title: 'Drift',
    summary: 'Marks parity or configuration drift that the remediation path has to close.',
    detail: 'Drift capsules matter when the need is about previously aligned surfaces falling out of sync across repos, stacks, or environments.',
    points: [
      'Often pairs with deployment, config, or cross-language signals',
      'A common reason Profile B-style normalization becomes relevant'
    ],
    references: NEED_CAPSULE_REFERENCES
  },
  enterprise: {
    kicker: 'Capsule term',
    title: 'Enterprise',
    summary: 'Marks material aimed at enterprise-facing operator concerns such as governance, proofability, and bounded disclosure.',
    detail: 'Enterprise capsules are a reminder that ENGI is trying to feel like the inevitable operating model for serious production use.',
    points: [
      'A product-context tag rather than one failure mode',
      'Often appears alongside governance or proof-heavy material'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  yaml: {
    kicker: 'Format tag',
    title: 'YAML',
    summary: 'Marks YAML-bearing source material in the current corpus.',
    detail: 'YAML tags usually signal configuration, workflow, deployment, or policy material rather than direct implementation code.',
    points: [
      'A format signal, not an artifact kind by itself',
      'Often paired with config, workflow, or policy tags'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  attestation: {
    kicker: 'Capsule term',
    title: 'Attestation',
    summary: 'Marks material that binds a signer or authority claim to payload identity.',
    detail: 'Attestation capsules are closely related to signing, auth roots, and later proof closure surfaces.',
    points: [
      'Useful for reading who stands behind a payload',
      'Often paired with proof or issuer semantics'
    ],
    references: ASSET_CAPSULE_REFERENCES
  },
  'bounded-proof': {
    kicker: 'Capsule term',
    title: 'Bounded proof',
    summary: 'Marks a proof posture that remains inspectable without exposing every private branch artifact.',
    detail: 'This capsule usually means the operator should expect bounded public proof semantics rather than full private artifact disclosure.',
    points: [
      'Lives close to privacy-boundary and disclosure concerns',
      'A useful tag for public inspection surfaces'
    ],
    references: NEED_CAPSULE_REFERENCES
  }
};

Object.assign(EXPLAINERS, EXTRA_EXPLAINERS);

const EXPLAINER_REFERENCE_GROUPS = {
  'repo-supply': ['repo-supply'],
  depositing: ['depositing'],
  needing: ['needing'],
  'deposit-fit': ['fit'],
  'targeted-deposit': ['depositing', 'profiles'],
  'bounded-need': ['needing', 'profiles'],
  'normalization-deposit': ['depositing', 'profiles'],
  'composite-need': ['needing', 'profiles'],
  'identity-auth-spine': ['identity'],
  'repo-to-settlement': ['operating-picture'],
  'operating-picture': ['operating-picture'],
  'boundary-reality': ['boundary'],
  'proof-closure': ['proof'],
  settlement: ['settlement'],
  'source-to-shares': ['source-to-shares'],
  addressing: ['identity'],
  signing: ['identity'],
  'github-app-auth': ['identity', 'repo-supply'],
  'artifact-kind': ['artifact-kinds'],
  'origin-kind': ['artifact-kinds'],
  'target-artifact-kind': ['artifact-kinds', 'needing'],
  'closure-criteria': ['needing'],
  'normalization-pressure': ['fit', 'profiles'],
  'profile-a': ['profiles'],
  'profile-b': ['profiles'],
  'inventory-entries': ['repo-supply', 'inventory'],
  'scenario-coverage': ['repo-supply', 'scenario-preview'],
  'profile-coverage': ['repo-supply', 'profiles'],
  'dominant-stacks': ['repo-supply', 'inventory'],
  'auth-session': ['repo-supply', 'identity'],
  'account-id': ['identity', 'repo-supply'],
  'installation-account': ['identity', 'repo-supply'],
  'repository-id': ['identity', 'repo-supply'],
  'installation-id': ['identity', 'repo-supply'],
  'github-permissions': ['identity', 'repo-supply'],
  'selection-root': ['depositing', 'identity'],
  'selection-label': ['depositing', 'inventory'],
  'proof-logs': ['proof'],
  'external-boundary': ['boundary'],
  'local-boundary': ['boundary'],
  'supporting-surfaces': ['boundary', 'operating-picture'],
  'coverage-tags': ['scenario-preview', 'candidate-asset'],
  'benchmark-workflow': ['needing', 'detailed-need'],
  'artifact-kind-filter': ['inventory', 'artifact-kinds'],
  'inventory-search': ['inventory'],
  'deposit-title-override': ['depositing', 'candidate-asset'],
  'author-override': ['depositing', 'candidate-asset'],
  'artifact-type': ['artifact-kinds', 'candidate-asset'],
  'source-repo-override': ['depositing', 'identity'],
  'source-commit-override': ['depositing', 'identity'],
  'workflow-run-override': ['depositing', 'detailed-need'],
  'visual-preview': ['candidate-asset'],
  'operator-note': ['candidate-asset', 'depositing'],
  'raw-fallback': ['candidate-asset', 'depositing'],
  'verification-rights': ['verification'],
  'branch-artifacts': ['branch'],
  'private-remediation-branch': ['branch', 'branch-materialization'],
  'asset-pack': ['branch'],
  'selected-source-material': ['branch-materialization'],
  'branch-materialization': ['branch-materialization'],
  'ledger-policy': ['ledger', 'boundary'],
  'ledger-accounts': ['ledger'],
  'run-history': ['run-history', 'ledger'],
  'candidate-asset': ['candidate-asset'],
  'scenario-preview': ['scenario-preview'],
  'detailed-need-surface': ['detailed-need'],
  'settlement-participation': ['settlement', 'exact-accounting'],
  'journal-diff': ['exact-accounting'],
  'exact-accounting': ['exact-accounting'],
  'bounded-public-proof': ['proof', 'boundary'],
  'proof-term': ['proof'],
  'validator-term': ['scenario-preview', 'proof'],
  'replay-window-term': ['scenario-preview', 'proof'],
  'awaiting-run': ['operating-picture', 'proof'],
  'awaiting-selection': ['depositing', 'inventory'],
  'normalization-pressure-low': ['fit', 'profiles'],
  'normalization-pressure-medium': ['fit', 'profiles'],
  'normalization-pressure-high': ['fit', 'profiles']
};

const EXPLAINER_REFERENCE_LIBRARY = {
  'repo-supply': {
    code: [
      'public/app.js -> renderRepoSupplyVisual()',
      'src/engi-demo.js -> buildRepoSupplySurface()'
    ],
    spec: ['V21 canon -> Proof contract, witnesses, replay, and branch closure', 'V21 canon -> Artifact kinds, inventory supply, and depositing overrides']
  },
  depositing: {
    code: [
      'public/app.js -> renderDepositingSurfaceVisual()',
      'src/engi-demo.js -> buildDepositingSurface()'
    ],
    spec: ['V21 canon -> Depositing and asset supply', 'V21 canon -> Proof contract, witnesses, replay, and branch closure']
  },
  needing: {
    code: [
      'public/app.js -> renderNeedingSurfaceVisual()',
      'src/engi-demo.js -> buildNeedingSurface()'
    ],
    spec: ['V21 canon -> Needing and prompt/inference ownership', 'V21 canon -> Proof contract, witnesses, replay, and branch closure']
  },
  fit: {
    code: [
      'public/app.js -> renderDepositingToNeedingVisual()',
      'src/engi-demo.js -> buildDepositingToNeedingSurface()'
    ],
    spec: ['V21 canon -> Fit, recall, ranking, and verification', 'V21 canon -> Proof contract, witnesses, replay, and branch closure']
  },
  profiles: {
    code: [
      'public/app.js -> renderProfileCompositionVisual()',
      'src/demo-shell-state.js -> buildProfileCompositions()'
    ],
    spec: ['V21 canon -> Profile A and targeted deposit semantics', 'V21 canon -> Profile B and source-to-shares semantics']
  },
  'operating-picture': {
    code: [
      'public/index.html -> section 0',
      'public/app.js -> renderOperatingPicture()',
      'src/engi-demo.js -> buildRepoToSettlementSurface()'
    ],
    spec: ['V21 canon -> Proof contract, witnesses, replay, and branch closure', 'V21 canon -> Validation, operator review, and canonical promotion']
  },
  identity: {
    code: [
      'public/app.js -> renderIdentityAuthSpineVisual()',
      'public/app.js -> renderGitHubBoundaryVisual()',
      'src/engi-demo.js -> buildIdentityAuthSpineSurface()',
      'src/engi-demo.js -> buildGithubBoundarySurface()'
    ],
    spec: ['V21 canon -> Identity, authority, signing, and addressing', 'V21 canon -> Disclosure, projection, and boundary reality']
  },
  'artifact-kinds': {
    code: [
      'public/app.js -> renderAssetVisual()',
      'public/app.js -> renderRepoInventory()'
    ],
    spec: ['V21 canon -> Artifact kinds, inventory supply, and depositing overrides', 'V21 canon -> Fit, recall, ranking, and verification']
  },
  inventory: {
    code: [
      'public/index.html -> inventory controls',
      'public/app.js -> renderRepoInventory()',
      'public/app.js -> syncInventoryKindFilter()'
    ],
    spec: ['V21 canon -> Depositing and asset supply', 'V21 canon -> Artifact kinds, inventory supply, and depositing overrides']
  },
  verification: {
    code: [
      'public/app.js -> renderVerificationReportVisual()',
      'public/app.js -> renderEvaluationVisual()'
    ],
    spec: ['V21 canon -> Proof contract, witnesses, replay, and branch closure', 'V21 canon -> Generated proof, branch, and settlement artifacts']
  },
  branch: {
    code: [
      'public/app.js -> renderBranchArtifacts()',
      'src/engi-demo.js -> assembleAssetPack()',
      'src/engi-demo.js -> buildBranchArtifacts()'
    ],
    spec: ['V21 canon -> Proof contract, witnesses, replay, and branch closure', 'V21 canon -> Generated proof, branch, and settlement artifacts']
  },
  'branch-materialization': {
    code: [
      'public/app.js -> renderMaterializationProofVisual()',
      'public/app.js -> renderSelectedSourceMaterialManifestVisual()',
      'src/engi-demo.js -> buildSelectedSourceMaterialManifest()',
      'src/engi-demo.js -> buildMaterializationProof()',
      'src/engi-demo.js -> buildMaterializationVisibilityProof()'
    ],
    spec: ['V21 canon -> Proof contract, witnesses, replay, and branch closure', 'V21 canon -> Generated proof, branch, and settlement artifacts']
  },
  proof: {
    code: [
      'public/app.js -> renderSystemProofBundleVisual()',
      'public/app.js -> renderBoundedProofVisual()',
      'src/engi-demo.js -> buildProofWitnessManifest()',
      'src/engi-demo.js -> buildBoundedPublicProofArtifact()'
    ],
    spec: ['V21 canon -> Generated proof, branch, and settlement artifacts', 'V21 canon -> Disclosure, projection, and boundary reality']
  },
  settlement: {
    code: [
      'public/app.js -> renderSettlementPreviewVisual()',
      'public/app.js -> renderSettlementParticipationVisual()',
      'src/engi-demo.js -> settleNeedEvent()',
      'src/engi-demo.js -> buildSettlementParticipationArtifact()'
    ],
    spec: ['V21 canon -> Generated proof, branch, and settlement artifacts', 'V21 canon -> Proof contract, witnesses, replay, and branch closure']
  },
  'source-to-shares': {
    code: [
      'public/app.js -> renderSourceToSharesVisual()',
      'src/engi-demo.js -> buildSourceToSharesArtifact()',
      'src/engi-demo.js -> buildAccountingPrecisionReport()'
    ],
    spec: ['V21 canon -> Profile B and source-to-shares semantics', 'V21 canon -> Generated proof, branch, and settlement artifacts']
  },
  'exact-accounting': {
    code: [
      'public/app.js -> renderAccountingPrecisionVisual()',
      'public/app.js -> renderJournalDiffVisual()',
      'src/engi-demo.js -> buildAccountingPrecisionReport()',
      'src/engi-demo.js -> settleNeedEvent()'
    ],
    spec: ['V21 canon -> Generated proof, branch, and settlement artifacts', 'V21 canon -> Validation, operator review, and canonical promotion']
  },
  ledger: {
    code: [
      'public/app.js -> renderLedger()',
      'public/app.js -> renderLedgerAccountsVisual()',
      'src/engi-demo.js -> publicState()'
    ],
    spec: ['V21 canon -> Generated proof, branch, and settlement artifacts', 'V21 canon -> Disclosure, projection, and boundary reality']
  },
  'run-history': {
    code: [
      'public/app.js -> renderRunHistoryVisual()',
      'src/engi-demo.js -> runMakeEngiBranch()',
      'src/engi-demo.js -> publicState()'
    ],
    spec: ['V21 canon -> Generated proof, branch, and settlement artifacts', 'V21 canon -> Validation, operator review, and canonical promotion']
  },
  boundary: {
    code: [
      'public/app.js -> renderBoundaryRealityVisual()',
      'src/engi-demo.js -> buildBoundaryRealitySurface()',
      'src/engi-demo.js -> buildExternalBoundaryManifest()'
    ],
    spec: ['V21 canon -> Disclosure, projection, and boundary reality', 'V21 canon -> Validation, operator review, and canonical promotion']
  },
  'candidate-asset': {
    code: [
      'public/app.js -> renderAssets()',
      'public/app.js -> renderAssetVisual()',
      'src/demo-shell-state.js -> buildPublicAssetSummary()'
    ],
    spec: ['V21 canon -> Depositing and asset supply', 'V21 canon -> Artifact kinds, inventory supply, and depositing overrides']
  },
  'scenario-preview': {
    code: [
      'public/app.js -> renderScenario()',
      'public/app.js -> renderScenarioCorpusVisual()',
      'src/engi-demo.js -> publicState()',
      'src/engi-demo.js -> buildNeedDescriptor()'
    ],
    spec: ['V21 canon -> Needing and prompt/inference ownership', 'V21 canon -> Realization profiles and settlement shape']
  },
  'detailed-need': {
    code: [
      'public/app.js -> renderNeedVisual()',
      'public/app.js -> renderNeedMeasurementVisual()',
      'src/engi-demo.js -> buildNeedDescriptor()'
    ],
    spec: ['V21 canon -> Needing and prompt/inference ownership', 'V21 canon -> Generated proof, branch, and settlement artifacts']
  }
};

/**
 * @param {readonly unknown[]} [values=[]]
 * @returns {string[]}
 */
function dedupeStrings(values = []) {
  return [...new Set(values.filter(Boolean).map((value) => String(value)))];
}

/**
 * @param {string} key
 * @param {ExplainerShape | null} [explainer=null]
 * @returns {{ code: string[], spec: string[] }}
 */
function explainerReferences(key, explainer = null) {
  const groupMap = /** @type {Record<string, string[]>} */ (EXPLAINER_REFERENCE_GROUPS);
  const library = /** @type {Record<string, ExplainerReferences>} */ (EXPLAINER_REFERENCE_LIBRARY);
  const groups = groupMap[key] || [];
  const merged = groups.reduce(
    /**
     * @param {{ code: string[], spec: string[] }} acc
     * @param {string} groupName
     */
    (acc, groupName) => {
    const group = library[groupName];
    if (!group) return acc;
    acc.code.push(...(group.code || []));
    acc.spec.push(...(group.spec || []));
    return acc;
  }, /** @type {{ code: string[], spec: string[] }} */ ({ code: [], spec: [] }));
  const overrides = explainer?.references || {};
  return {
    code: dedupeStrings([...merged.code, ...(overrides.code || [])]),
    spec: dedupeStrings([...merged.spec, ...(overrides.spec || [])])
  };
}

const LABEL_EXPLAINER_KEYS = {
  'Account': 'installation-account',
  'Account ID': 'account-id',
  'Accounts': 'ledger-accounts',
  'Allowed tiers': 'verification-rights',
  'Allocation preview': 'settlement',
  'Allocation rows': 'exact-accounting',
  'Artifact classes': 'ledger-policy',
  'Auth session': 'auth-session',
  'Asset pack ID': 'asset-pack',
  'Basis-point normalization': 'exact-accounting',
  'Branch mode': 'private-remediation-branch',
  'Buyer pools': 'ledger-accounts',
  'Bundle ID': 'settlement',
  'Clipped contribution units': 'source-to-shares',
  'Clipping receipt': 'source-to-shares',
  'Clipping receipts': 'exact-accounting',
  'Contribution basis': 'source-to-shares',
  'Contribution entries': 'source-to-shares',
  'Contribution inputs': 'exact-accounting',
  'Coverage tags': 'coverage-tags',
  'Credited': 'settlement-participation',
  'Credited assets': 'settlement-participation',
  'Credited micro-units': 'exact-accounting',
  'Credited settlement assets': 'settlement-participation',
  'Debited': 'journal-diff',
  'Debits': 'journal-diff',
  'Dominant stacks': 'dominant-stacks',
  'Exact accounting invariants': 'exact-accounting',
  'External boundary': 'external-boundary',
  'Final share bp': 'source-to-shares',
  'Floor share bp': 'source-to-shares',
  'Inventory entries': 'inventory-entries',
  'Inventory refs': 'inventory-entries',
  'Inventory root': 'selection-root',
  'Journal invariants': 'journal-diff',
  'Ledger accounts': 'ledger-accounts',
  'Lock integrity': 'asset-pack',
  'Locked assets': 'asset-pack',
  'Locked attestations': 'asset-pack',
  'Locked content roots': 'asset-pack',
  'Locked units': 'asset-pack',
  'Local boundary': 'local-boundary',
  'Micro-unit allocation': 'exact-accounting',
  'Normalization ledger': 'source-to-shares',
  'Operating picture': 'operating-picture',
  'Participating': 'settlement-participation',
  'Permissions': 'github-permissions',
  'Profile coverage': 'profile-coverage',
  'Raw contribution units': 'source-to-shares',
  'Raw share bp': 'source-to-shares',
  'Remainder units': 'source-to-shares',
  'Repository ID': 'repository-id',
  'Run history': 'run-history',
  'Scenario coverage': 'scenario-coverage',
  'Selected deposit refs': 'inventory-entries',
  'Selected asset pack': 'asset-pack',
  'Selected assets': 'asset-pack',
  'Selected branch assets': 'settlement-participation',
  'Selected inventory refs': 'inventory-entries',
  'Selected source material': 'selected-source-material',
  'Selection label': 'selection-label',
  'Selection semantics': 'settlement-participation',
  'Selection refs': 'selection-root',
  'Settlement participants': 'settlement-participation',
  'Signed selection root': 'selection-root',
  'Source material to shares closure': 'exact-accounting',
  'Source-to-shares closure rows': 'exact-accounting',
  'Supplier pending claims': 'ledger-accounts',
  'Tie-break order': 'source-to-shares',
  'Unique bundles': 'run-history',
  'Detailed need surface': 'detailed-need-surface',
  'Scenario preview': 'scenario-preview',
  'Proof logs': 'proof-logs',
  'Workflow': 'benchmark-workflow',
  'Workflow path': 'benchmark-workflow',
  'Writable scopes': 'github-permissions',
  'Zero-credit': 'settlement-participation',
  'Zero-credit participants': 'settlement-participation',
  'Installation ID': 'installation-id'
};

const TERM_EXPLAINER_KEYS = {
  'asset-pack-lock bound': 'asset-pack',
  'awaiting run': 'awaiting-run',
  'awaiting selection': 'awaiting-selection',
  'credited': 'settlement-participation',
  'explicit repo address': 'addressing',
  'exact accounting': 'exact-accounting',
  'exact settlement preview closed': 'exact-accounting',
  'executed-local': 'local-boundary',
  'executed local': 'local-boundary',
  'excluded': 'settlement-participation',
  'external boundary': 'external-boundary',
  'high': 'normalization-pressure-high',
  'live contract': 'external-boundary',
  'low': 'normalization-pressure-low',
  'medium': 'normalization-pressure-medium',
  'modeled-local': 'local-boundary',
  'modeled local': 'local-boundary',
  'normalization deposit': 'normalization-deposit',
  'participating': 'settlement-participation',
  'positively credited': 'settlement-participation',
  'proof': 'proof-term',
  'private remediation branch': 'private-remediation-branch',
  'private remediation branch staged': 'private-remediation-branch',
  'replay-window': 'replay-window-term',
  'settlement-eligible': 'verification-rights',
  'selected': 'settlement-participation',
  'selected assets materialized': 'branch-materialization',
  'patch-eligible': 'verification-rights',
  'public projection bounded': 'bounded-public-proof',
  'context-only': 'verification-rights',
  'supporting surfaces': 'supporting-surfaces',
  'targeted deposit': 'targeted-deposit',
  'validator': 'validator-term',
  'zero credited units': 'settlement-participation',
  'zero-credit participating': 'settlement-participation'
};

Object.assign(LABEL_EXPLAINER_KEYS, {
  'Algorithm': 'signing-algorithm',
  'Branch intent': 'branch-intent',
  'Composition': 'profile-composition',
  'Constraints': 'constraints',
  'Content root': 'content-root',
  'Executed local stages': 'executed-local-stages',
  'Failing cases': 'failing-cases',
  'Field derivations': 'field-derivations',
  'Key source': 'key-source',
  'Modeled local stages': 'modeled-local-stages',
  'Payload hash': 'payload-hash',
  'Recall channels + hand-offs': 'recall-channels',
  'Ref / commit': 'ref-commit',
  'Runs': 'run-count',
  'Scenario anchors': 'scenario-anchors',
  'Settlement shape': 'settlement-shape',
  'Settled runs': 'settled-runs',
  'Source paths': 'source-paths',
  'Upload surfaces': 'upload-surfaces',
  'Weak dimensions': 'weak-dimensions'
});

Object.assign(TERM_EXPLAINER_KEYS, {
  'attestation': 'attestation',
  'auth': 'auth',
  'auditability': 'auditability',
  'before proof': 'pre-proof-surface',
  'benchmark': 'benchmark',
  'bounded-proof': 'bounded-proof',
  'branch -> proof -> settlement': 'closure-path-badge',
  'code-review': 'review',
  'compatibility-window': 'compatibility-window',
  'config': 'config',
  'containment': 'containment',
  'cross-language': 'cross-language',
  'creusot': 'creusot',
  'deployment': 'deployment',
  'disclosure': 'disclosure',
  'drift': 'drift',
  'enterprise': 'enterprise',
  'escalation': 'escalation',
  'formal-methods': 'formal-methods',
  'gateway': 'gateway',
  'governance': 'governance',
  'helm': 'helm',
  'incident': 'incident-response',
  'incident-response': 'incident-response',
  'issuer': 'issuer',
  'kubernetes': 'kubernetes',
  'lineage': 'field-derivations',
  'many-asset': 'many-asset',
  'migration': 'migration',
  'monorepo': 'monorepo',
  'normalization': 'normalization',
  'patch': 'patch',
  'policy': 'policy',
  'polyglot': 'polyglot',
  'privacy': 'privacy',
  'privacy-boundary': 'privacy-boundary',
  'projection': 'projection',
  'python': 'python',
  'receipt-binding': 'receipt-binding',
  'redaction': 'redaction',
  'review': 'review',
  'rollback': 'rollback',
  'runbook': 'runbook',
  'rust': 'rust',
  'safety': 'security',
  'security': 'security',
  'session-validity': 'session-validity',
  'source-to-shares': 'source-to-shares-tag',
  'terraform': 'terraform',
  'typescript': 'typescript',
  'v8 contracts': 'recall-channels',
  'workflow-artifact': 'workflow-artifact',
  'workflow-binding': 'workflow-binding',
  'yaml': 'yaml'
});

/**
 * @param {unknown} value
 * @returns {string}
 */
function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function labelize(value) {
  return String(value ?? '')
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replaceAll(/[_./:-]+/g, ' ')
    .replace(/\bjson\b/gi, 'JSON')
    .replace(/\bid\b/gi, 'ID')
    .replace(/\burl\b/gi, 'URL')
    .replace(/\bttl\b/gi, 'TTL')
    .replace(/\bapi\b/gi, 'API')
    .replace(/\bgha\b/gi, 'GHA')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^./, (char) => char.toUpperCase());
}

/**
 * @param {unknown} value
 * @param {number} [max=120]
 * @returns {string}
 */
function truncate(value, max = 120) {
  const text = String(value ?? '');
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/**
 * @param {readonly unknown[]} [items=[]]
 * @param {string} [fallback='None']
 * @returns {string}
 */
function formatList(items = [], fallback = 'None') {
  return items.length ? items.map((item) => escapeHtml(item)).join(' • ') : `<span class="meta">${fallback}</span>`;
}

/**
 * @param {number} count
 * @param {string} singular
 * @param {string} [plural=`${singular}s`]
 * @returns {string}
 */
function formatCount(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

/**
 * @param {readonly unknown[]} [items=[]]
 * @returns {Record<string, number>}
 */
function countValues(items = []) {
  /** @type {Record<string, number>} */
  const counts = items.reduce(
    /**
     * @param {Record<string, number>} acc
     * @param {unknown} item
     */
    (acc, item) => {
    const key = String(item ?? '').trim();
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, /** @type {Record<string, number>} */ ({}));
  return counts;
}

/**
 * @param {Record<string, number>} [counts={}]
 * @param {string} [fallback='None']
 * @returns {string}
 */
function formatCountMap(counts = {}, fallback = 'None') {
  const entries = Object.entries(counts);
  return entries.length
    ? entries.map(([key, value]) => `${escapeHtml(key)} (${escapeHtml(value)})`).join(' • ')
    : `<span class="meta">${fallback}</span>`;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeExplainerLookup(value) {
  return String(value ?? '').trim().toLowerCase();
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizedExplainerPhrase(value) {
  return normalizeExplainerLookup(value)
    .replaceAll(/[_./:-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const DYNAMIC_TERM_DOMAIN_RULES = [
  { key: 'receipt-binding', pattern: /\breceipt\b/ },
  { key: 'workflow-binding', pattern: /\bworkflow\b/ },
  { key: 'replay-window-term', pattern: /\breplay\b/ },
  { key: 'rollback', pattern: /\brollback\b/ },
  { key: 'session-validity', pattern: /\bsession\b/ },
  { key: 'auth', pattern: /\bauth\b|\bissuer\b/ },
  { key: 'review', pattern: /\breview\b|\bapproval\b/ },
  { key: 'auditability', pattern: /\baudit\b|\bgovernance\b/ },
  { key: 'policy', pattern: /\bpolicy\b|\bprecedence\b/ },
  { key: 'validator-term', pattern: /\bvalidator\b|\boverflow\b|\bcreusot\b|\bformal\b/ },
  { key: 'patch', pattern: /\bpatch\b/ },
  { key: 'deployment', pattern: /\bdeployment\b|\bterraform\b|\bhelm\b|\bkubernetes\b|\brollout\b|\benv\b/ },
  { key: 'config', pattern: /\bconfig\b/ },
  { key: 'cross-language', pattern: /\bcross language\b|\bcross-language\b|\bpolyglot\b/ },
  { key: 'typescript', pattern: /\btypescript\b/ },
  { key: 'python', pattern: /\bpython\b/ },
  { key: 'rust', pattern: /\brust\b/ },
  { key: 'source-to-shares-tag', pattern: /\bsource to shares\b|\bsource-to-shares\b|\bnormalization\b|\bmany asset\b|\bmany-asset\b/ },
  { key: 'privacy-boundary', pattern: /\bprivacy\b|\bredaction\b|\bdisclosure\b|\bprojection\b|\bpublic proof\b|\bprivate artifact leak\b|\bbounded metadata\b/ },
  { key: 'benchmark', pattern: /\bbenchmark\b/ },
  { key: 'security', pattern: /\bsecurity\b|\bsafety\b/ },
  { key: 'monorepo', pattern: /\bmonorepo\b/ },
  { key: 'incident-response', pattern: /\bincident\b/ },
  { key: 'migration', pattern: /\bmigration\b/ },
  { key: 'gateway', pattern: /\bgateway\b/ },
  { key: 'drift', pattern: /\bdrift\b|\bmismatch\b|\bdivergence\b/ },
  { key: 'proof-term', pattern: /\bproof\b/ }
];

/**
 * @param {string} key
 * @returns {ExplainerShape | null}
 */
function explainerFor(key) {
  const explainers = /** @type {Record<string, ExplainerShape>} */ (EXPLAINERS);
  return explainers[key] || null;
}

/**
 * @param {string} [value='']
 * @returns {string}
 */
function inferDynamicTermKey(value = '') {
  const phrase = normalizedExplainerPhrase(value);
  for (const rule of DYNAMIC_TERM_DOMAIN_RULES) {
    if (rule.pattern.test(phrase)) return rule.key;
  }
  return '';
}

/**
 * @param {string} [label='']
 * @param {string} [domainKey='']
 * @returns {ExplainerShape | null}
 */
function buildDynamicExplainer(label = '', domainKey = '') {
  const base = explainerFor(domainKey);
  if (!base) return null;

  const normalized = normalizedExplainerPhrase(label);
  const title = labelize(label);
  const domainTitle = base.title || labelize(domainKey);
  let kicker = base.kicker || 'Capsule term';
  let summary = base.summary || '';
  let detail = base.detail || '';

  if (/^clear\b/.test(normalized)) {
    kicker = 'Closure target';
    summary = 'This capsule names an exact condition that must be satisfied before the active need counts as closed.';
    detail = `${domainTitle} is the main domain behind this closure target, so ENGI keeps the phrase specific while still grounding it in the broader scenario semantics.`;
  } else if (/^improve\b/.test(normalized)) {
    kicker = 'Weak dimension';
    summary = 'This capsule marks a quality dimension the remediation still has to improve before closure is convincing.';
    detail = `${domainTitle} is the underlying domain, but the chip stays phrase-specific so the operator can see exactly what is weak right now.`;
  } else if (/^(preserve|keep|require|block|emit|bind|rerun|restore|replay|no)\b/.test(normalized)) {
    kicker = 'Need constraint';
    summary = 'This capsule is a hard rule the remediation, proof, or settlement path must respect while the need closes.';
    detail = `${domainTitle} is the main domain this constraint belongs to, but the exact phrase stays visible because ENGI wants constraints to read concretely instead of abstractly.`;
  } else if (/\b(regression|gap|mismatch|bypass|drift|skip|divergence)\b/.test(normalized)) {
    kicker = 'Failing case';
    summary = 'This capsule names one concrete failing slice currently present in the measured need.';
    detail = `${domainTitle} is the primary domain behind the failing slice, which is why the phrase appears directly in the needing surface before deeper proof inspection.`;
  } else if (normalized.includes('-')) {
    kicker = 'Scenario / corpus capsule';
    summary = 'This capsule is part of the seeded ENGI corpus vocabulary used to keep the demo’s need and asset surfaces legible at a glance.';
    detail = `${domainTitle} is the closest domain anchor for this phrase in the current corpus.`;
  }

  return {
    ...base,
    kicker,
    title,
    summary,
    detail,
    points: [
      'Phrase-specific capsule from seeded need, profile, or asset metadata',
      `Domain focus: ${domainTitle}`
    ],
    references: base.references || {}
  };
}

/**
 * @param {string} [label='']
 * @param {string} [explainerKey='']
 * @param {ResolveExplainerOptions} [options={}]
 * @returns {ExplainerResolution}
 */
function resolveExplainer(label = '', explainerKey = '', options = {}) {
  if (explainerKey) {
    return {
      key: explainerKey,
      explainer: explainerFor(explainerKey)
    };
  }

  const trimmed = String(label ?? '').trim();
  const labelKeys = /** @type {Record<string, string>} */ (LABEL_EXPLAINER_KEYS);
  const termKeys = /** @type {Record<string, string>} */ (TERM_EXPLAINER_KEYS);
  const mappedLabelKey = labelKeys[trimmed] || '';
  if (mappedLabelKey) {
    return { key: mappedLabelKey, explainer: explainerFor(mappedLabelKey) };
  }

  const exactTermKey = termKeys[normalizeExplainerLookup(trimmed)] || '';
  if (exactTermKey) {
    return { key: exactTermKey, explainer: explainerFor(exactTermKey) };
  }

  if (options.allowDynamic) {
    const dynamicTermKey = inferDynamicTermKey(trimmed);
    if (dynamicTermKey) {
      return {
        key: dynamicTermKey,
        explainer: buildDynamicExplainer(trimmed, dynamicTermKey)
      };
    }
  }

  return { key: '', explainer: null };
}

/**
 * @param {string} label
 * @param {readonly string[]} [refs=[]]
 * @returns {string}
 */
function renderExplainerReferenceGroup(label, refs = []) {
  if (!refs.length) return '';
  return `
    <div class="explainer-reference-group">
      <span class="explainer-reference-label">${escapeHtml(label)}</span>
      <div class="explainer-reference-list">
        ${refs.map((ref) => `<span class="explainer-reference-chip">${escapeHtml(ref)}</span>`).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {string} key
 * @param {ExplainerShape | null} explainer
 * @returns {string}
 */
function renderExplainerFooter(key, explainer) {
  const references = explainerReferences(key, explainer);
  if (!references.code.length && !references.spec.length) return '';
  return `
    <div class="explainer-footer">
      ${renderExplainerReferenceGroup('Current source', references.code)}
      ${renderExplainerReferenceGroup('Current canon', references.spec)}
    </div>
  `;
}

/**
 * @param {string | ExplainerResolution | null} resolved
 * @param {ExplainerBadgeOptions} [options={}]
 * @returns {string}
 */
function explainerBadge(resolved, options = {}) {
  const descriptor = typeof resolved === 'string'
    ? { key: resolved, explainer: explainerFor(resolved) }
    : resolved;
  const key = descriptor?.key || '';
  const explainer = descriptor?.explainer || null;
  if (!explainer) return '';
  const tooltipId = `explainer-${++explainerCounter}`;
  const alignClass = options.align === 'center' ? ' align-center' : '';
  const sideClass = options.side === 'bottom' ? ' side-bottom' : '';
  const title = explainer.title || labelize(key);
  const points = explainer.points || [];
  return `
    <span class="explainer${alignClass}${sideClass}">
      <button type="button" class="info-badge" aria-label="${escapeHtml(options.ariaLabel || `Explain ${title}`)}" aria-describedby="${tooltipId}">
        ${escapeHtml(options.label || 'i')}
      </button>
      <span id="${tooltipId}" class="explainer-panel" role="tooltip">
        ${explainer.kicker ? `<span class="eyebrow meta-inline">${escapeHtml(explainer.kicker)}</span>` : ''}
        <strong>${escapeHtml(title)}</strong>
        ${explainer.summary ? `<span class="explainer-summary">${escapeHtml(explainer.summary)}</span>` : ''}
        ${explainer.detail ? `<span class="explainer-detail">${escapeHtml(explainer.detail)}</span>` : ''}
        ${points.length ? `<ul class="explainer-points">${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>` : ''}
        ${renderExplainerFooter(key, explainer)}
      </span>
    </span>
  `;
}

/**
 * @param {string} label
 * @param {string} [explainerKey='']
 * @param {LabelWithExplainerOptions} [options={}]
 * @returns {string}
 */
function labelWithExplainer(label, explainerKey, options = {}) {
  const text = options.html ? label : escapeHtml(label);
  const resolved = resolveExplainer(label, explainerKey, {
    allowDynamic: options.allowDynamic === true
  });
  if (!resolved.explainer) return text;
  return `
    <span class="label-with-info ${escapeHtml(options.className || '')}">
      <span>${text}</span>
      ${explainerBadge(resolved, options.badgeOptions)}
    </span>
  `;
}

/**
 * @param {unknown} value
 * @param {BadgeWithExplainerOptions} [options={}]
 * @returns {string}
 */
function badgeWithExplainer(value, options = {}) {
  const rendered = `<span class="badge ${escapeHtml(options.className || '')}">${escapeHtml(value || 'n/a')}</span>`;
  const resolved = resolveExplainer(String(value ?? ''), options.explainerKey, {
    allowDynamic: options.allowDynamic === true
  });
  if (!resolved.explainer) return rendered;
  return `
    <span class="badge-with-explainer">
      ${rendered}
      ${explainerBadge(resolved, {
        align: 'right',
        ariaLabel: options.ariaLabel || `Explain ${String(value || 'badge')}`
      })}
    </span>
  `;
}

/**
 * @param {string} key
 * @param {ExplainerCalloutOptions} [options={}]
 * @returns {string}
 */
function explainerCallout(key, options = {}) {
  const explainer = explainerFor(key);
  if (!explainer) return '';
  return `
    <div class="callout explainer-callout ${escapeHtml(options.tone || '')}">
      <div class="row wrap-gap">
        <strong>${escapeHtml(options.title || explainer.title || labelize(key))}</strong>
        <span class="badge">${escapeHtml(options.badge || explainer.kicker || 'Explainer')}</span>
      </div>
      ${explainer.summary ? `<p>${escapeHtml(explainer.summary)}</p>` : ''}
      ${explainer.detail ? `<p class="meta">${escapeHtml(explainer.detail)}</p>` : ''}
      ${renderExplainerFooter(key, explainer)}
    </div>
  `;
}

/**
 * @param {string | null | undefined} profileId
 * @returns {{ profile: string, deposit: string, need: string }}
 */
function profileModeExplainers(profileId) {
  return String(profileId || '').toUpperCase() === 'B'
    ? { profile: 'profile-b', deposit: 'normalization-deposit', need: 'composite-need' }
    : { profile: 'profile-a', deposit: 'targeted-deposit', need: 'bounded-need' };
}

const REPO_TO_SETTLEMENT_STAGE_EXPLAINERS = {
  depositing: 'depositing',
  needing: 'needing',
  'deposit-to-need-fit': 'deposit-fit',
  'asset-pack': 'asset-pack',
  branch: 'private-remediation-branch',
  proof: 'proof-closure',
  settlement: 'exact-accounting'
};

/**
 * @param {ParentNode} [root=document]
 * @returns {void}
 */
function decorateStaticExplainers(root = document) {
  root.querySelectorAll('[data-explainer-key]').forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.dataset['explainerDecorated'] === 'true') return;
    const explainerKey = node.dataset['explainerKey'];
    if (!explainerKey) return;
    node.classList.add('label-with-info');
    node.insertAdjacentHTML('beforeend', explainerBadge(explainerKey, {
      label: node.dataset['explainerLabel'] || 'i',
      align: /** @type {'left' | 'right' | 'center'} */ (node.dataset['explainerAlign'] || 'right'),
      side: /** @type {'top' | 'bottom'} */ (node.dataset['explainerSide'] || 'top'),
      ariaLabel: node.dataset['explainerAriaLabel'] || undefined
    }));
    node.dataset['explainerDecorated'] = 'true';
  });
}

/**
 * @param {ParentNode} [root=document]
 * @returns {void}
 */
function syncExplainerAlignment(root = document) {
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
  root.querySelectorAll('.explainer').forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    node.classList.remove('align-left');
    if (node.classList.contains('align-center')) return;
    const rect = node.getBoundingClientRect();
    const spaceToLeft = rect.left;
    const estimatedPanelWidth = Math.min(EXPLAINER_PANEL_MAX_WIDTH, Math.max(220, viewportWidth - 48));
    if (spaceToLeft < estimatedPanelWidth - rect.width) {
      node.classList.add('align-left');
    }
  });
}

/**
 * @param {string} path
 * @param {RequestInit} [options={}]
 * @returns {Promise<Record<string, unknown>>}
 */
function api(path, options = {}) {
  return fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  }).then(async (response) => {
    const json = await response.json();
    if (!response.ok) throw new Error(json.error || 'Request failed');
    return json;
  });
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function syncScenarioPicker(state) {
  const scenarios = state.needScenarios || [];
  const firstScenario = scenarios[0];
  if (!firstScenario) return;
  const desiredScenarioId = state.latestRun?.scenarioId || selectedScenarioId || firstScenario.scenarioId;
  if (scenarioPickerEl.options.length !== scenarios.length) {
    scenarioPickerEl.innerHTML = scenarios.map((scenario) => `
      <option value="${escapeHtml(scenario.scenarioId)}">${escapeHtml([
        scenario.realizationProfile?.shortLabel,
        scenario.scenarioFamily,
        scenario.repo
      ].filter(Boolean).join(' · '))}</option>
    `).join('');
  }
  scenarioPickerEl.value = scenarios.some((scenario) => scenario.scenarioId === desiredScenarioId)
    ? desiredScenarioId
    : firstScenario.scenarioId;
  selectedScenarioId = scenarioPickerEl.value;
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function syncBranchModePicker(state) {
  const desiredBranchMode = activeBranchMode(state);
  branchModePickerEl.value = ['patch', 'context'].includes(desiredBranchMode) ? desiredBranchMode : 'patch';
  selectedBranchMode = branchModePickerEl.value;
}

/**
 * @param {AppState} state
 * @returns {ScenarioShape | null}
 */
function currentScenario(state) {
  const scenarios = state.needScenarios || [];
  return scenarios.find((scenario) => scenario.scenarioId === (selectedScenarioId || scenarioPickerEl?.value)) || scenarios[0] || null;
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function syncAuthSessionPicker(state) {
  const sessions = state.githubAppSessions || [];
  const firstSession = sessions[0];
  if (!firstSession) return;
  const scenario = currentScenario(state);
  const scenarioSession = sessions.find((session) => session.repo === scenario?.repo);
  const buyer = state.latestRun?.buyer;
  const desiredAuthSessionId = buyer?.installationId
    ? sessions.find((session) => session.installationId === buyer.installationId && session.repo === buyer.repo)?.authSessionId
    : selectedAuthSessionId || scenarioSession?.authSessionId || firstSession.authSessionId;
  if (authSessionPickerEl.options.length !== sessions.length) {
    authSessionPickerEl.innerHTML = sessions.map((session) => `
      <option value="${escapeHtml(session.authSessionId)}">${escapeHtml(`${session.repo} · ${session.installationId}`)}</option>
    `).join('');
  }
  authSessionPickerEl.value = sessions.some((session) => session.authSessionId === desiredAuthSessionId)
    ? desiredAuthSessionId
    : firstSession.authSessionId;
  selectedAuthSessionId = authSessionPickerEl.value;
  const activeSession = sessions.find((session) => session.authSessionId === selectedAuthSessionId);
  const validEntryIds = new Set((state.repoArtifactInventory || [])
    .filter((entry) => entry.repo === activeSession?.repo)
    .map((entry) => entry.inventoryEntryId));
  selectedInventoryEntryIds = new Set([...selectedInventoryEntryIds].filter((entryId) => validEntryIds.has(entryId)));
}

/**
 * @param {AppState} state
 * @returns {SessionShape | null}
 */
function activeAuthSession(state) {
  const sessions = state.githubAppSessions || [];
  return sessions.find((session) => session.authSessionId === selectedAuthSessionId) || sessions[0] || null;
}

/**
 * @param {AppState} state
 * @returns {InventoryEntryShape[]}
 */
function activeInventoryEntries(state) {
  const session = activeAuthSession(state);
  const entries = state.repoArtifactInventory || [];
  return session ? entries.filter((entry) => entry.repo === session.repo) : entries;
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function syncInventoryKindFilter(state) {
  const kinds = [
    'all',
    ...new Set(activeInventoryEntries(state)
      .map((entry) => String(entry.artifactKind || '').trim())
      .filter(Boolean))
  ];
  if (inventoryKindFilterEl.options.length !== kinds.length) {
    inventoryKindFilterEl.innerHTML = kinds.map((kind) => `<option value="${escapeHtml(kind)}">${escapeHtml(kind === 'all' ? 'All artifact kinds' : labelize(kind))}</option>`).join('');
  }
  inventoryKindFilterEl.value = kinds.includes(selectedInventoryKind) ? selectedInventoryKind : 'all';
  selectedInventoryKind = inventoryKindFilterEl.value;
}

/**
 * @param {AppState} state
 * @returns {InventoryEntryShape[]}
 */
function filteredInventoryEntries(state) {
  const search = inventorySearchTerm.trim().toLowerCase();
  return activeInventoryEntries(state).filter((entry) => {
    if (selectedInventoryKind !== 'all' && entry.artifactKind !== selectedInventoryKind) return false;
    if (!search) return true;
    const haystack = [
      entry.title,
      entry.summary,
      entry.sourcePath,
      ...(entry.sourcePaths || []),
      entry.workflowRunId,
      entry.workflowPath,
      entry.artifactName,
      ...(entry.tags || [])
    ].join(' ').toLowerCase();
    return haystack.includes(search);
  });
}

/**
 * @param {string} surfaceId
 * @param {readonly unknown[]} [values=[]]
 * @returns {string | null}
 */
function previewAggregateRoot(surfaceId, values = []) {
  const roots = [...new Set(values.map((value) => String(value || '').trim()).filter(Boolean))];
  if (!roots.length) return null;
  if (roots.length === 1) return roots[0] || null;
  return `${surfaceId} preview aggregate (${roots.length} roots)`;
}

/**
 * @param {AppState} state
 * @returns {InventoryEntryShape[]}
 */
function selectedInventoryEntries(state) {
  return activeInventoryEntries(state).filter((entry) => selectedInventoryEntryIds.has(entry.inventoryEntryId));
}

/**
 * @param {AppState} state
 * @returns {{
 *   depositSessionId: string,
 *   depositProfile: string,
 *   repoSupplyRef: string,
 *   selectedInventoryRefs: string[],
 *   selectedArtifactKindCounts: Record<string, number>,
 *   selectedOriginKindCounts: Record<string, number>,
 *   addressingRoot: string | null,
 *   signingRoot: null,
 *   authRoot: string | null,
 *   depositIntentSummary: string
 * }}
 */
function buildPreviewDepositingSurface(state) {
  const scenario = currentScenario(state);
  const session = activeAuthSession(state);
  const selectedEntries = selectedInventoryEntries(state);
  const selectedArtifactKindCounts = countValues(selectedEntries.map((entry) => entry.artifactKind));
  const selectedOriginKindCounts = countValues(selectedEntries.map((entry) => entry.originKind));
  const selectedKinds = Object.keys(selectedArtifactKindCounts);

  return {
    depositSessionId: `preview:${session?.authSessionId || 'no-session'}:${selectedEntries.length}`,
    depositProfile: scenario?.realizationProfile?.label || 'Pending deposit preview',
    repoSupplyRef: session ? `${session.repo} · ${session.authSessionId}` : 'No authenticated repo session',
    selectedInventoryRefs: selectedEntries.map((entry) => entry.inventoryEntryId),
    selectedArtifactKindCounts,
    selectedOriginKindCounts,
    addressingRoot: previewAggregateRoot('addressing', selectedEntries.map((entry) => entry.addressing?.addressingRoot)),
    signingRoot: null,
    authRoot: previewAggregateRoot('auth', [
      session?.authPayloadHash,
      ...selectedEntries.map((entry) => entry.authBinding?.authPayloadHash)
    ]),
    depositIntentSummary: selectedEntries.length
      ? `Previewing a ${scenario?.realizationProfile?.shortLabel?.toLowerCase() || 'selected'} deposit from ${session?.repo || 'the bound repo'} using ${selectedEntries.length} repo artifact${selectedEntries.length === 1 ? '' : 's'}.`
      : `Select repo artifacts to preview the ${scenario?.realizationProfile?.shortLabel?.toLowerCase() || 'active'} deposit.`
  };
}

/**
 * @param {AppState} state
 * @returns {NeedPreviewShape | null}
 */
function activeNeedingSurface(state) {
  return state.latestRun?.needingSurface || currentScenario(state)?.needingSurface || null;
}

/**
 * @param {AppState} state
 * @returns {LatestRunShape['depositingSurface'] | ReturnType<typeof buildPreviewDepositingSurface>}
 */
function activeDepositingSurface(state) {
  return state.latestRun?.depositingSurface || buildPreviewDepositingSurface(state);
}

/**
 * @param {AppState} state
 * @returns {{
 *   relationId: string,
 *   depositSessionId: string,
 *   needId: string,
 *   fitSummary: string,
 *   decisiveKinds: string[],
 *   overlapKinds: string[],
 *   normalizationPressure: string,
 *   branchIntentSummary: string,
 *   proofIntentSummary: string,
 *   settlementIntentSummary: string
 * } | null}
 */
function buildPreviewDepositingToNeedingSurface(state) {
  const depositingSurface = buildPreviewDepositingSurface(state);
  const needingSurface = activeNeedingSurface(state);
  if (!needingSurface) return null;
  const selectedKinds = Object.keys(depositingSurface.selectedArtifactKindCounts || {});
  const overlapKinds = selectedKinds.filter((kind) => (needingSurface.targetArtifactKinds || []).includes(kind));
  const profileId = needingSurface.realizationProfile?.profileId || 'A';
  const normalizationPressure = profileId === 'B'
    ? selectedKinds.length > 1 ? 'high' : 'medium'
    : 'low';
  const fitKinds = overlapKinds.length ? overlapKinds : selectedKinds;

  return {
    relationId: `preview-fit:${depositingSurface.depositSessionId}:${needingSurface.needId}`,
    depositSessionId: depositingSurface.depositSessionId,
    needId: needingSurface.needId,
    fitSummary: selectedKinds.length
      ? `Preview overlap in ${fitKinds.join(', ')} against the active need. Run the branch flow to prove the fit and close settlement.`
      : 'Select a deposit to make the active deposit-to-need fit visible before branch, proof, and settlement.',
    decisiveKinds: fitKinds,
    overlapKinds,
    normalizationPressure,
    branchIntentSummary: selectedKinds.length
      ? `The next branch run will materialize a ${profileId === 'B' ? 'normalization-aware' : 'tight'} closure path around ${fitKinds.join(', ')} coverage.`
      : 'No branch intent until a deposit is selected.',
    proofIntentSummary: profileId === 'B'
      ? 'Proof should explain how overlapping deposits normalize across the composite need.'
      : 'Proof should explain why the selected deposit is decisive for the bounded need.',
    settlementIntentSummary: profileId === 'B'
      ? 'Settlement should stay source-to-shares aware once the fit is proven.'
      : 'Settlement should read as the direct closure of the decisive fit.'
  };
}

/**
 * @param {AppState} state
 * @returns {LatestRunShape['depositingToNeedingSurface'] | ReturnType<typeof buildPreviewDepositingToNeedingSurface>}
 */
function activeDepositingToNeedingSurface(state) {
  return state.latestRun?.depositingToNeedingSurface || buildPreviewDepositingToNeedingSurface(state);
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderInventorySelectionSummary(state) {
  const session = activeAuthSession(state);
  const repoSupply = (state.repoSupplySurface?.repos || []).find((/** @type {any} */ entry) => entry.repo === session?.repo);
  const selectedEntries = activeInventoryEntries(state).filter((entry) => selectedInventoryEntryIds.has(entry.inventoryEntryId));
  const artifactKindCounts = countValues(selectedEntries.map((entry) => entry.artifactKind));
  const originKindCounts = countValues(selectedEntries.map((entry) => entry.originKind));
  inventorySelectionSummaryEl.innerHTML = session ? `
    <strong>${escapeHtml(session.repo)}</strong>
    <span class="meta">GitHub App ${escapeHtml(session.appSlug)} · installation ${escapeHtml(session.installationId)} · account ${escapeHtml(session.installationAccountLogin)}</span>
    <div class="kv-grid">
      ${kvRow('Auth session', session.authSessionId)}
      ${kvRow('Repository ID', session.repositoryId)}
      ${kvRow('Account ID', session.installationAccountId || '—')}
      ${kvRow('Repo supply entries', repoSupply?.inventoryEntryCount ?? '—', { explainerKey: 'repo-supply' })}
      ${kvRow('Scenario coverage', formatList(repoSupply?.scenarioFamilies || []), { html: true })}
      ${kvRow('Profile coverage', formatCountMap(repoSupply?.realizationProfileCounts || {}), { html: true })}
      ${kvRow('Permissions root', session.permissionsRoot || '—', { explainerKey: 'github-app-auth' })}
      ${kvRow('Token boundary', session.tokenBoundary?.mintingState || '—', { explainerKey: 'github-app-auth' })}
      ${kvRow('Writable scopes', formatList(session.tokenBoundary?.writableScopes || []), { html: true })}
    </div>
    <span class="meta">Selected ${selectedEntries.length} inventory ${selectedEntries.length === 1 ? 'artifact' : 'artifacts'}.</span>
    <span class="meta">Repo supply kinds: ${formatCountMap(repoSupply?.artifactKindCounts || {})}</span>
    <span class="meta">Repo supply origins: ${formatCountMap(repoSupply?.originKindCounts || {})}</span>
    <span class="meta">Artifact kinds: ${formatCountMap(artifactKindCounts)}</span>
    <span class="meta">Origin kinds: ${formatCountMap(originKindCounts)}</span>
  ` : '<span class="meta">No authenticated repo session available.</span>';
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderRepoInventory(state) {
  const entries = filteredInventoryEntries(state);
  if (!entries.length) {
    repoInventoryListEl.innerHTML = '<div class="card"><p class="meta">No repo artifacts match the current session/filter.</p></div>';
    renderInventorySelectionSummary(state);
    return;
  }
  repoInventoryListEl.innerHTML = entries.map((entry) => {
    const selected = selectedInventoryEntryIds.has(entry.inventoryEntryId);
    return `
      <button type="button" class="inventory-card ${selected ? 'selected' : ''}" data-inventory-entry-id="${escapeHtml(entry.inventoryEntryId)}">
        <div class="row wrap-gap">
          <div>
            <strong>${escapeHtml(entry.title)}</strong>
            <p class="meta">${escapeHtml(entry.originKind)} · ${escapeHtml(entry.artifactKind)} · ${escapeHtml(entry.artifactType)}</p>
          </div>
          <div class="badge-row">
            <span class="badge ${selected ? 'private' : ''}">${selected ? 'Selected' : 'Select'}</span>
            <span class="badge">${escapeHtml(entry.workflowRunId || entry.sourcePath || entry.artifactName || 'repo artifact')}</span>
          </div>
        </div>
        <p>${escapeHtml(entry.summary)}</p>
        <div class="badge-row">
          ${chipList(entry.tags || [])}
        </div>
        <div class="kv-grid">
          ${kvRow('Selection label', entry.provenance?.selectionLabel || '—')}
          ${kvRow('Address', formatList([entry.sourcePath, ...(entry.sourcePaths || []).filter((/** @type {string} */ path) => path !== entry.sourcePath), entry.artifactName, entry.workflowRunId].filter(Boolean)), { html: true, explainerKey: 'addressing' })}
          ${kvRow('Addressing scope', entry.addressing?.addressingScope || '—', { explainerKey: 'addressing' })}
          ${kvRow('Content root', entry.contentRoot || '—')}
          ${kvRow('Stacks', formatList(entry.declaredStacks || []), { html: true })}
          ${kvRow('Constraints', formatList(entry.declaredConstraints || []), { html: true })}
          ${kvRow('Signer', entry.signerAddress || '—', { explainerKey: 'signing' })}
          ${kvRow('Auth session', entry.authSessionId || '—', { explainerKey: 'github-app-auth' })}
          ${kvRow('Installation ID', entry.installationId || '—')}
        </div>
      </button>
    `;
  }).join('');
  renderInventorySelectionSummary(state);
}

/**
 * @param {unknown} text
 * @returns {void}
 */
function setStatus(text) {
  statusEl.textContent = String(text ?? '');
}

/**
 * @param {boolean} dismissed
 * @returns {void}
 */
function persistTutorialDismissal(dismissed) {
  try {
    window.localStorage.setItem(TUTORIAL_STORAGE_KEY, dismissed ? '1' : '0');
  } catch {
    // Tutorial persistence is best-effort only.
  }
}

/**
 * @param {AppState | null | undefined} state
 * @returns {Array<{ selector: string, kicker: string, title: string, body: string, targetHint: string }>}
 */
function tutorialSteps(state) {
  const scenario = currentScenario(state);
  const latestRun = state?.latestRun;
  const profileLabel = latestRun?.realizationProfile?.shortLabel || scenario?.realizationProfile?.shortLabel || 'Targeted deposit';
  const projectionLabel = activeProjectionPrincipal(state);
  const branchModeLabel = activeBranchMode(state);
  const bundleId = latestRun?.boundedPublicProof?.bundleId || latestRun?.journalDiff?.bundleId || null;
  const branchUnlocked = !!latestRun;

  return [
    {
      selector: '#hero',
      kicker: 'Step 1',
      title: 'Start from the active canon posture',
      body: `${canonOperatorLabel(state)} opens in the hero, not in the branch stack. Pick a scenario, projection, and branch mode here before you ask ENGI to realize anything. Right now the shell is framed as ${profileLabel} in ${projectionLabel} projection and ${branchModeLabel} branch mode.`,
      targetHint: 'Use the top controls to set the walkthrough context before you deposit or branch.'
    },
    {
      selector: '#summary',
      kicker: 'Step 2',
      title: 'Read the shell at a glance',
      body: bundleId
        ? `The summary cards tell you that the shell has already crossed into a realized run. The current bundle is ${bundleId}, so this row is your fastest “where are we now?” check.`
        : 'The summary row tells you whether you are still in preview or have crossed into a realized run. Before branching, treat it as the shell-wide instrument panel.',
      targetHint: 'Watch candidate count, selected deposit refs, visible proof families, and latest bundle as the shell advances.'
    },
    {
      selector: '#panelOperatingPicture',
      kicker: 'Step 3',
      title: 'Orient the operator story',
      body: 'This panel is the compressed V22 operating map: repo supply -> deposit -> need -> fit -> proof -> settlement. Use it to explain the whole ENGI path before you dive into any one artifact family.',
      targetHint: 'If someone is lost, come back here first and then continue stepwise.'
    },
    {
      selector: '#panelDepositing',
      kicker: 'Step 4',
      title: 'Bind supply into a deposit',
      body: 'The tutorial becomes real here. Choose an authenticated repo session, select inventory artifacts, add any operator note or raw fallback material, and deposit a candidate asset into the flow.',
      targetHint: 'This panel answers: what did we present to ENGI, from which repo/auth boundary, and in what artifact shape?'
    },
    {
      selector: '#panelNeeding',
      kicker: 'Step 5',
      title: 'Measure the need before proving anything',
      body: 'Need comes before proof. This panel is the measured demand surface: task, failure modes, closure criteria, parser contract, and scenario corpus.',
      targetHint: 'Use this step to explain why the problem is bounded or composite before you justify any candidate asset.'
    },
    {
      selector: '#panelFit',
      kicker: 'Step 6',
      title: 'Make deposit-to-need fit explicit',
      body: 'This is the first decisive checkpoint. ENGI should say why the active deposit matters for the active need before ranking, proof, or settlement start carrying weight.',
      targetHint: 'The fit panel should answer “why these artifacts for this need?” in one readable pass.'
    },
    {
      selector: '#panelEvaluations',
      kicker: 'Step 7',
      title: 'Separate ranking from verification',
      body: 'Here ENGI turns candidate recall into evaluated candidates, then separately binds use tiers and rights. Ranking strength alone is not enough to materialize or settle an asset.',
      targetHint: 'Use this panel to show why a high-signal candidate can still be context-only, patch-eligible, or fully rejected.'
    },
    {
      selector: '#panelBranchArtifacts',
      kicker: 'Step 8',
      title: 'Inspect the realized branch stack',
      body: branchUnlocked
        ? 'The branch panel is the artifact-heavy core of the demo: lockfiles, policy release, prompt/proof artifacts, projection policy, witness manifest, and deliverables.'
        : 'This panel stays intentionally thin until you run “Make ENGI branch”. Once realized, it becomes the artifact-heavy core of the demo.',
      targetHint: 'After a run, this is where you inspect the private remediation branch as a structured artifact system rather than a vague “output”.'
    },
    {
      selector: '#panelSettlement',
      kicker: 'Step 9',
      title: 'Close the value path',
      body: branchUnlocked
        ? 'Settlement is where ENGI explains contribution with exact accounting: source-to-shares, zero-credit participants, journal diff, bounded proof, and proof-family closure.'
        : 'Settlement is the payoff surface, but it only becomes meaningful after a realized run materializes bundle, proof, and accounting artifacts.',
      targetHint: 'Use this panel when you want to show that ENGI is not just selecting assets, but proving and accounting for them.'
    },
    {
      selector: '#panelLedger',
      kicker: 'Step 10',
      title: 'End on balances, policy, and history',
      body: 'Finish the tutorial here. Ledger and policy surfaces let you show account consequences, bounded metadata, and run history after the branch and settlement story is complete.',
      targetHint: 'This is the closing step: what changed, what remained bounded, and what prior runs are now part of the visible canon path?'
    }
  ];
}

/**
 * @returns {void}
 */
function clearTutorialHighlight() {
  if (tutorialHighlightedEl) {
    tutorialHighlightedEl.classList.remove('tutorial-focus-ring');
    tutorialHighlightedEl = null;
  }
}

/**
 * @param {{ selector: string }} step
 * @returns {HTMLElement | null}
 */
function resolveTutorialTarget(step) {
  const target = document.querySelector(step.selector);
  return target instanceof HTMLElement ? target : null;
}

/**
 * @param {HTMLElement | null} target
 * @param {boolean} [scrollTarget=false]
 * @returns {void}
 */
function highlightTutorialTarget(target, scrollTarget = false) {
  clearTutorialHighlight();
  if (!target) return;
  tutorialHighlightedEl = target;
  tutorialHighlightedEl.classList.add('tutorial-focus-ring');
  if (scrollTarget) {
    tutorialHighlightedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * @returns {void}
 */
function updateTutorialToggleButton() {
  tutorialToggleButtonEl.textContent = tutorialOpen ? 'Hide tutorial' : 'Show tutorial';
}

/**
 * @param {AppState | null | undefined} state
 * @param {{ scrollTarget?: boolean | undefined }} [options={}]
 * @returns {void}
 */
function renderTutorialOverlay(state, options = {}) {
  updateTutorialToggleButton();
  if (!state || !tutorialOpen) {
    tutorialLayerEl.hidden = true;
    clearTutorialHighlight();
    return;
  }

  const steps = tutorialSteps(state);
  if (!steps.length) {
    tutorialLayerEl.hidden = true;
    clearTutorialHighlight();
    return;
  }

  tutorialStepIndex = Math.max(0, Math.min(tutorialStepIndex, steps.length - 1));
  const step = steps[tutorialStepIndex];
  const target = resolveTutorialTarget(step);

  tutorialLayerEl.hidden = false;
  tutorialStepCounterEl.textContent = `Step ${tutorialStepIndex + 1} of ${steps.length}`;
  tutorialKickerEl.textContent = step.kicker;
  tutorialTitleEl.textContent = step.title;
  tutorialBodyEl.textContent = step.body;
  tutorialTargetHintEl.textContent = step.targetHint;
  tutorialPrevButtonEl.disabled = tutorialStepIndex === 0;
  tutorialNextButtonEl.textContent = tutorialStepIndex === steps.length - 1 ? 'Finish tutorial' : 'Next step';
  tutorialCloseButtonEl.textContent = tutorialStepIndex === steps.length - 1 ? 'Close' : 'Dismiss';
  highlightTutorialTarget(target, options.scrollTarget === true);
}

/**
 * @param {{ reset?: boolean | undefined, scrollTarget?: boolean | undefined }} [options={}]
 * @returns {void}
 */
function openTutorial(options = {}) {
  tutorialOpen = true;
  if (options.reset) tutorialStepIndex = 0;
  persistTutorialDismissal(false);
  renderTutorialOverlay(lastLoadedState, { scrollTarget: options.scrollTarget === true });
}

/**
 * @returns {void}
 */
function closeTutorial() {
  tutorialOpen = false;
  persistTutorialDismissal(true);
  renderTutorialOverlay(lastLoadedState);
}

/**
 * @param {unknown} tier
 * @returns {string}
 */
function tierBadge(tier) {
  const klass = tier === 'settlement-eligible'
    ? 'private'
    : tier === 'patch-eligible'
      ? ''
      : tier === 'context-only'
        ? 'warn'
        : 'bad';
  return badgeWithExplainer(tier, { className: klass, explainerKey: 'verification-rights' });
}

/**
 * @param {unknown} value
 * @param {string} [yes='Yes']
 * @param {string} [no='No']
 * @returns {string}
 */
function boolBadge(value, yes = 'Yes', no = 'No') {
  return `<span class="badge ${value ? 'private' : 'warn'}">${value ? yes : no}</span>`;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function statusBadge(value) {
  const normalized = String(value ?? '').toLowerCase();
  const klass = /(allow|active|settlement|pass|true|public|ready|traceable|replayable|satisfied)/.test(normalized)
    ? 'private'
    : /(warn|context|patch|review|partial|prototype|local)/.test(normalized)
      ? 'warn'
      : /(deny|reject|revoked|blocked|false|private-required|restricted|missing|bad)/.test(normalized)
        ? 'bad'
        : '';
  return badgeWithExplainer(value || 'n/a', { className: klass });
}

/**
 * @param {string} label
 * @param {unknown} value
 * @param {string} [tone='']
 * @param {MetricTileOptions} [options={}]
 * @returns {string}
 */
function metricTile(label, value, tone = '', options = {}) {
  const rendered = options.html ? value : escapeHtml(value);
  return `
    <div class="mini-card ${tone}">
      <span class="meta">${labelWithExplainer(label, options.explainerKey)}</span>
      <strong>${rendered}</strong>
    </div>
  `;
}

/**
 * @param {string} label
 * @param {unknown} value
 * @param {ValueRenderOptions} [options={}]
 * @returns {string}
 */
function kvRow(label, value, options = {}) {
  const rendered = options.html ? value : escapeHtml(value ?? '—');
  return `<div class="kv-row"><span class="meta">${labelWithExplainer(label, options.explainerKey)}</span><span>${rendered}</span></div>`;
}

/**
 * @param {string} label
 * @param {unknown} value
 * @param {string} [explainerKey='']
 * @param {ValueRenderOptions} [options={}]
 * @returns {string}
 */
function summaryTile(label, value, explainerKey = '', options = {}) {
  const rendered = options.html ? value : escapeHtml(value);
  return `<div class="summary-card"><span class="meta">${labelWithExplainer(label, explainerKey)}</span><strong>${rendered}</strong></div>`;
}

/**
 * @param {readonly unknown[]} [items=[]]
 * @param {string} [badgeClass='']
 * @param {ChipListOptions} [options={}]
 * @returns {string}
 */
function chipList(items = [], badgeClass = '', options = {}) {
  if (!items.length) return '<span class="meta">None</span>';
  return items.map((item) => badgeWithExplainer(item, {
    className: badgeClass,
    allowDynamic: options.allowDynamic === true
  })).join(' ');
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function scoreBar(value) {
  const numeric = Number(value || 0);
  const pct = Math.max(0, Math.min(100, Math.round(numeric * 100)));
  return `
    <div class="score-bar">
      <div class="score-bar-fill" style="width:${pct}%"></div>
      <span>${escapeHtml(numeric.toFixed(3))}</span>
    </div>
  `;
}

/**
 * @param {string} title
 * @param {string} body
 * @param {boolean} [open=false]
 * @returns {string}
 */
function detailsSection(title, body, open = false) {
  return `
    <details class="detail-block" ${open ? 'open' : ''}>
      <summary>${escapeHtml(title)}</summary>
      ${body}
    </details>
  `;
}

/**
 * @param {unknown} value
 * @returns {unknown | null}
 */
function tryParseJson(value) {
  if (typeof value !== 'string') return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * @param {unknown} data
 * @param {unknown} raw
 * @returns {string}
 */
function rawText(data, raw) {
  if (typeof raw === 'string') return raw;
  if (typeof data === 'string') return data;
  return JSON.stringify(data ?? null, null, 2);
}

/**
 * @param {unknown} data
 * @param {number} [depth=0]
 * @returns {string}
 */
function surfaceVisualFallback(data, depth = 0) {
  if (data == null) return '<p class="meta">No data.</p>';
  if (typeof data === 'string') return `<pre>${escapeHtml(data)}</pre>`;
  if (typeof data === 'number' || typeof data === 'boolean') return `<strong>${escapeHtml(data)}</strong>`;
  if (Array.isArray(data)) {
    if (!data.length) return '<p class="meta">Empty array.</p>';
    return `
      <div class="object-list ${depth ? 'nested' : ''}">
        ${data.map((item, index) => `
          <div class="mini-card">
            <div class="row"><strong>${escapeHtml(`Item ${index + 1}`)}</strong>${Array.isArray(item) ? `<span class="meta">${formatCount(item.length, 'entry')}</span>` : ''}</div>
            ${surfaceVisualFallback(item, depth + 1)}
          </div>
        `).join('')}
      </div>
    `;
  }

  const entries = Object.entries(/** @type {Record<string, unknown>} */ (data));
  if (!entries.length) return '<p class="meta">Empty object.</p>';

  const primitives = entries.filter(([, value]) => value == null || typeof value !== 'object');
  const nested = entries.filter(([, value]) => value && typeof value === 'object');

  return `
    ${primitives.length ? `<div class="kv-grid">${primitives.map(([key, value]) => kvRow(labelize(key), value)).join('')}</div>` : ''}
    ${nested.length ? `<div class="object-list ${depth ? 'nested' : ''}">${nested.map(([key, value]) => `
      <div class="mini-card">
        <div class="row"><strong>${escapeHtml(labelize(key))}</strong>${Array.isArray(value) ? `<span class="meta">${formatCount(value.length, 'entry')}</span>` : ''}</div>
        ${surfaceVisualFallback(value, depth + 1)}
      </div>
    `).join('')}</div>` : ''}
  `;
}

/**
 * @param {JsonSurfaceOptions} options
 * @returns {string}
 */
function renderJsonSurface({ title, subtitle = '', eyebrow = '', eyebrowExplainerKey = '', help = '', explainerKey = '', data, raw, visual, defaultMode = DEFAULT_SURFACE_MODE, accent = '' }) {
  const surfaceId = `surface-${++surfaceCounter}`;
  const rawContent = rawText(data, raw);
  const visualContent = (typeof visual === 'function' && data != null)
    ? visual(data)
    : surfaceVisualFallback(data);

  return `
    <article class="json-surface ${accent}">
      <div class="json-surface-head">
        <div>
          ${eyebrow ? `<p class="eyebrow meta-inline">${eyebrowExplainerKey ? labelWithExplainer(eyebrow, eyebrowExplainerKey) : escapeHtml(eyebrow)}</p>` : ''}
          <h3>${labelWithExplainer(title, explainerKey)}</h3>
          ${subtitle ? `<p class="meta">${escapeHtml(subtitle)}</p>` : ''}
        </div>
        <div class="surface-mode-toggle" role="tablist" aria-label="Toggle ${escapeHtml(title)} view">
          <button type="button" role="tab" aria-selected="${defaultMode === 'visual'}" aria-controls="${surfaceId}" class="surface-mode-button ${defaultMode === 'visual' ? 'active' : ''}" data-surface-target="${surfaceId}" data-mode="visual">Visual</button>
          <button type="button" role="tab" aria-selected="${defaultMode === 'raw'}" aria-controls="${surfaceId}" class="surface-mode-button ${defaultMode === 'raw' ? 'active' : ''}" data-surface-target="${surfaceId}" data-mode="raw">Raw</button>
        </div>
      </div>
      ${help ? `<p class="surface-help">${escapeHtml(help)}</p>` : ''}
      <div id="${surfaceId}" class="surface-body" data-mode="${defaultMode}">
        <div class="surface-panel surface-panel-visual ${defaultMode === 'visual' ? 'active' : ''}">${visualContent}</div>
        <div class="surface-panel surface-panel-raw ${defaultMode === 'raw' ? 'active' : ''}"><pre>${escapeHtml(rawContent)}</pre></div>
      </div>
    </article>
  `;
}

/**
 * @param {any[]} [promptSurfaces=[]]
 * @returns {string}
 */
function renderPromptSurfaceCollectionVisual(promptSurfaces = []) {
  return `
    <div class="visual-stack">
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Prompt templates', promptSurfaces.length)}
        ${metricTile('Output fields', new Set(promptSurfaces.flatMap((surface) => surface.lineage?.outputFields || [])).size)}
        ${metricTile('Downstream artifacts', new Set(promptSurfaces.flatMap((surface) => surface.lineage?.downstreamArtifacts || [])).size)}
      </div>
      <div class="object-list">
        ${promptSurfaces.map((surface) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(surface.promptId || 'Prompt')}</strong>
                <p class="meta">${escapeHtml(surface.purpose || '')}</p>
              </div>
              <div class="badge-row">${statusBadge(surface.evaluatorSurface?.mode || 'inferred')} ${statusBadge(surface.templateVersion || 'template')}</div>
            </div>
            <div class="callout">
              <strong>Interpolated prompt</strong>
              <pre>${escapeHtml(surface.interpolatedPrompt || '')}</pre>
            </div>
            <div class="mini-grid two-up">
              <div class="section-card">
                <div class="section-head"><h4>Context lineage</h4><span class="badge">${(surface.contextInputs || []).length} inputs</span></div>
                <div class="object-list nested">
                  ${(surface.contextInputs || []).map((/** @type {any} */ input) => `
                    <div class="mini-card">
                      <strong>${escapeHtml(input.field || 'field')}</strong>
                      <p class="meta wrap-anywhere">${escapeHtml(input.source || 'source')}</p>
                      <p>${escapeHtml(Array.isArray(input.value) ? input.value.join(' • ') : input.value ?? '—')}</p>
                      <p class="meta wrap-anywhere">Refs: ${escapeHtml((input.evidenceRefs || []).join(' • ') || '—')}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="section-card">
                <div class="section-head"><h4>Downstream lineage</h4><span class="badge">Output binding</span></div>
                <div class="kv-grid">
                  ${kvRow('Output fields', formatList(surface.lineage?.outputFields || []), { html: true })}
                  ${kvRow('Downstream artifacts', formatList(surface.lineage?.downstreamArtifacts || []), { html: true })}
                  ${kvRow('Evidence refs', formatList(surface.lineage?.evidenceRefs || []), { html: true })}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} manifest
 * @returns {string}
 */
function renderExternalBoundaryManifestVisual(manifest) {
  const interfaces = manifest?.interfaces || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Boundary interfaces', interfaces.length)}
        ${metricTile('Modeled local', interfaces.filter((/** @type {any} */ entry) => /modeled|local/i.test(entry.status || '')).length)}
        ${metricTile('Stand-in local', interfaces.filter((/** @type {any} */ entry) => /stand-in/i.test(entry.status || '')).length)}
        ${metricTile('Live external required', interfaces.filter((/** @type {any} */ entry) => (entry.externalBoundary || entry.profileB)?.requiredForLive).length)}
      </div>
      <div class="object-list">
        ${interfaces.map((/** @type {any} */ entry) => {
          const localPrototype = entry.localPrototype || entry.profileA || {};
          const externalBoundary = entry.externalBoundary || entry.profileB || {};
          return `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(entry.label || entry.interfaceId)}</strong>
                <p class="meta">${escapeHtml(entry.interfaceId || '')}</p>
              </div>
              <div class="badge-row">${statusBadge(entry.status)} ${boolBadge(externalBoundary.requiredForLive, 'Required live', 'Optional')}</div>
            </div>
            <div class="mini-grid two-up">
              <div class="section-card">
                <div class="section-head"><h4>${labelWithExplainer('Local prototype', 'local-boundary')}</h4><span class="badge">Implemented here</span></div>
                <div class="kv-grid">
                  ${kvRow('Surface', localPrototype.surface || '—')}
                  ${kvRow('Artifact refs', formatList(localPrototype.artifactRefs || []), { html: true })}
                </div>
              </div>
              <div class="section-card">
                <div class="section-head"><h4>${labelWithExplainer('External boundary', 'external-boundary')}</h4>${badgeWithExplainer('Live contract')}</div>
                <div class="kv-grid">
                  ${kvRow('Contract', formatList(externalBoundary.contract || []), { html: true })}
                  ${kvRow('Boundary artifacts', formatList(externalBoundary.boundaryArtifacts || []), { html: true })}
                </div>
              </div>
            </div>
          </div>
        `;
        }).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} summary
 * @returns {string}
 */
function renderExternalRealizationSummaryVisual(summary) {
  const interfaces = summary?.interfaceSummaries || summary?.interfaceStates || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Interfaces', interfaces.length, '', { explainerKey: 'external-realization' })}
        ${metricTile('Live observed', interfaces.filter((entry) => String(entry.runtimeState || '') === 'live-observed').length)}
        ${metricTile('Live configured', interfaces.filter((entry) => String(entry.runtimeState || '') === 'live-configured').length)}
        ${metricTile('Blocking', interfaces.filter((entry) => String(entry.runtimeState || '') === 'live-misconfigured').length)}
      </div>
      <div class="kv-grid">
        ${kvRow('Environment mode', summary?.configuredEnvironmentMode || '—', { explainerKey: 'external-realization' })}
        ${kvRow('Actuality disposition', summary?.actualityDisposition || '—', { explainerKey: 'external-realization' })}
        ${kvRow('Surfaced across', formatList(summary?.surfacedAcross || []), { html: true })}
        ${kvRow('Isolation posture', summary?.isolationDisposition || '—')}
      </div>
      <div class="object-list">
        ${interfaces.map((entry) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(entry.label || labelize(entry.interfaceId || 'interface'))}</strong>
                <p class="meta">${escapeHtml(entry.interfaceId || '')}</p>
              </div>
              <div class="badge-row">
                ${statusBadge(entry.runtimeState || 'n/a')}
                ${entry.executorKind ? statusBadge(entry.executorKind) : ''}
                ${entry.authMode ? statusBadge(entry.authMode) : ''}
              </div>
            </div>
            <div class="kv-grid">
              ${kvRow('Execution class', entry.executionClass || '—')}
              ${kvRow('Transport', entry.transportProtocol || '—')}
              ${kvRow('Auth mode', entry.authMode || '—')}
              ${kvRow('Remote auth exchanges', entry.remoteAuthExchangeCount ?? '—')}
              ${kvRow('Remote requests', entry.remoteRequestCount ?? '—')}
              ${kvRow('Continuity', entry.continuityState || '—')}
              ${kvRow('Observation sequence', entry.observationSequence ?? '—')}
              ${kvRow('Telemetry', entry.telemetryCoverageState || '—')}
              ${kvRow('Missing bindings', formatList(entry.missingBindingKeys || []), { html: true })}
              ${kvRow('Missing secrets', formatList(entry.missingSecretEnvKeys || []), { html: true })}
              ${entry.affectedArtifactRefs ? kvRow('Affected artifacts', formatList(entry.affectedArtifactRefs || []), { html: true }) : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {any[]} [bindings=[]]
 * @returns {string}
 */
function renderIdentityBindingsVisual(bindings = []) {
  const classCounts = countValues(bindings.map((binding) => binding.principalClass));
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Bindings', bindings.length, '', { explainerKey: 'identity-auth-spine' })}
        ${metricTile('Issuer principals', classCounts['issuer-principal'] || 0)}
        ${metricTile('GitHub sessions', classCounts['github-app-session-principal'] || 0, '', { explainerKey: 'github-app-auth' })}
        ${metricTile('Installations', classCounts['github-app-installation-principal'] || 0)}
      </div>
      <div class="object-list">
        ${bindings.map((binding) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(binding.principalId || 'principal')}</strong>
                <p class="meta">${escapeHtml(binding.principalClass || 'unknown')}</p>
              </div>
              <div class="badge-row">${statusBadge(binding.authSource)} <span class="badge">${escapeHtml(binding.bindingRoot || '—')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Bound refs', formatList(binding.boundRefs || []), { html: true })}
              ${kvRow('Selection refs', formatList(binding.selectedInventoryEntryIds || []), { html: true })}
              ${kvRow('Surface roots', formatList(Object.entries(binding.surfaceRoots || {}).filter(([, value]) => value).map(([key, value]) => `${key}:${value}`)), { html: true, explainerKey: 'identity-auth-spine' })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} surface
 * @returns {string}
 */
function renderGitHubBoundaryVisual(surface) {
  const selectedAuthSessions = surface?.selectedAuthSessions || [];
  const selectedInventoryProofs = surface?.selectedInventoryProofs || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected auth sessions', selectedAuthSessions.length, '', { explainerKey: 'github-app-auth' })}
        ${metricTile('Selected assets', selectedInventoryProofs.length)}
        ${metricTile('Buyer installation', surface?.modeledBindings?.buyerInstallationId || '—')}
        ${metricTile('Required auth fields', (surface?.authPayloadShape?.requiredFields || []).length, '', { explainerKey: 'github-app-auth' })}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Buyer binding', 'identity-auth-spine')}</h4><span class="badge">Repo boundary</span></div>
          <div class="kv-grid">
            ${kvRow('Repo', surface?.modeledBindings?.repo || '—')}
            ${kvRow('Repository ID', surface?.modeledBindings?.repositoryId || '—')}
            ${kvRow('Benchmark run', surface?.modeledBindings?.benchmarkRunId || '—')}
            ${kvRow('Workflow path', surface?.modeledBindings?.benchmarkWorkflowPath || '—')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Auth payload shape', 'github-app-auth')}</h4><span class="badge">Modeled only</span></div>
          <div class="kv-grid">
            ${kvRow('Mechanism', surface?.authPayloadShape?.authMechanism || '—', { explainerKey: 'github-app-auth' })}
            ${kvRow('Selection', surface?.authPayloadShape?.repositorySelection || '—')}
            ${kvRow('Required fields', formatList(surface?.authPayloadShape?.requiredFields || []), { html: true, explainerKey: 'github-app-auth' })}
          </div>
        </div>
      </div>
      <div class="object-list">
        ${selectedAuthSessions.map((/** @type {any} */ session) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(session.authSessionId || 'session')}</strong>
                <p class="meta">${escapeHtml(session.repo || '')}</p>
              </div>
              <div class="badge-row"><span class="badge">${escapeHtml(session.installationId || '—')}</span><span class="badge">${escapeHtml(session.tokenBoundary?.mintingState || '—')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Account', session.installationAccountLogin || '—')}
              ${kvRow('Repository ID', session.repositoryId || '—')}
              ${kvRow('Permissions root', session.permissionsRoot || '—', { explainerKey: 'github-app-auth' })}
              ${kvRow('Auth payload hash', session.authPayloadHash || '—', { explainerKey: 'github-app-auth' })}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="object-list">
        ${selectedInventoryProofs.map((/** @type {any} */ proof) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(proof.assetId || 'asset')}</strong>
                <p class="meta">${escapeHtml(proof.selectionLabel || '')}</p>
              </div>
              <div class="badge-row"><span class="badge">${escapeHtml(proof.selectedInventoryRoot || '—')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Inventory refs', formatList((proof.selectedInventoryEntries || []).map((/** @type {any} */ entry) => `${entry.inventoryEntryId}:${entry.primaryAddressRef}`)), { html: true })}
              ${kvRow('Addressing root', proof.addressingRoot || '—', { explainerKey: 'addressing' })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} manifest
 * @returns {string}
 */
function renderArtifactUploadManifestVisual(manifest) {
  const uploads = manifest?.uploads || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Uploads', manifest?.uploadCount ?? uploads.length)}
        ${metricTile('Inventory-backed', manifest?.inventoryBackedUploadCount ?? uploads.filter((/** @type {any} */ upload) => (upload.artifactSelectionSurface?.selectedInventoryEntryIds || []).length > 0).length)}
        ${metricTile('Artifact kinds', Object.keys(manifest?.artifactKindCounts || {}).length)}
        ${metricTile('Selection roots', uploads.filter((/** @type {any} */ upload) => upload.selectionRoot).length)}
      </div>
      <div class="callout">
        <strong>Artifact-kind coverage</strong>
        <span>${formatCountMap(manifest?.artifactKindCounts || {})}</span>
      </div>
      <div class="object-list">
        ${uploads.map((/** @type {any} */ upload) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(upload.title || upload.assetId)}</strong>
                <p class="meta">${escapeHtml(upload.artifactKind || '')} · ${escapeHtml(upload.artifactType || '')}</p>
              </div>
              <div class="badge-row"><span class="badge">${escapeHtml(upload.selectionRoot || 'raw-fallback')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Inventory refs', formatList(upload.artifactSelectionSurface?.selectedInventoryEntryIds || []), { html: true })}
              ${kvRow('Addressing root', upload.addressingRoot || '—')}
              ${kvRow('Auth payload hash', upload.authPayloadHash || '—')}
              ${kvRow('Signing payload hash', upload.signingSurface?.payloadHash || '—')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} manifest
 * @returns {string}
 */
function renderSelectedSourceMaterialManifestVisual(manifest) {
  const selectedSourceMaterial = manifest?.selectedSourceMaterial || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected assets', selectedSourceMaterial.length)}
        ${metricTile('Branch mode', manifest?.branchMode || '—')}
        ${metricTile('Inventory-backed', selectedSourceMaterial.filter((/** @type {any} */ entry) => (entry.selectedInventoryEntryIds || []).length > 0).length)}
        ${metricTile('Units', selectedSourceMaterial.reduce((/** @type {number} */ sum, /** @type {any} */ entry) => sum + (entry.selectedUnits || []).length, 0))}
      </div>
      <div class="object-list">
        ${selectedSourceMaterial.map((/** @type {any} */ entry) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(entry.title || entry.assetId)}</strong>
                <p class="meta">${escapeHtml(entry.useTier || '')} · ${escapeHtml(entry.artifactKind || '')}</p>
              </div>
              <div class="badge-row"><span class="badge">${escapeHtml(entry.selectionRoot || '—')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Selection label', entry.selectionLabel || '—')}
              ${kvRow('Inventory refs', formatList(entry.selectedInventoryEntryIds || []), { html: true })}
              ${kvRow('Addressing root', entry.addressingRoot || '—')}
              ${kvRow('Auth payload hash', entry.authPayloadHash || '—')}
              ${kvRow('Signing payload hash', entry.signingPayloadHash || '—')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} profileState
 * @returns {string}
 */
function renderProfileCompositionVisual(profileState) {
  const profiles = profileState?.profiles || profileState?.profileCompositions?.profiles || [];
  const guidance = profileState?.demoOperatorGuidance || {};
  const activeScenarioProfileId = profileState?.activeScenarioProfileId || '';
  return `
    <div class="visual-stack">
      <div class="mini-grid two-up">
        ${explainerCallout('profile-a', { title: 'Profile A in plain language', badge: 'Targeted deposit' })}
        ${explainerCallout('profile-b', { title: 'Profile B in plain language', badge: 'Normalization deposit' })}
      </div>
      <div class="callout">
        <strong>Operational profile semantics</strong>
        <span>${escapeHtml(guidance.audienceMeaning || 'The profiles distinguish how ENGI deposits supply against need, not whether GitHub is live.')}</span>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Operator walkthrough</h4><span class="badge">Demo script</span></div>
          <div class="badge-row">${chipList(guidance.recommendedWalkthrough || [])}</div>
          ${guidance.boundaryTruthPlacement ? `<p class="meta">${escapeHtml(guidance.boundaryTruthPlacement)}</p>` : ''}
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Boundary truth', 'boundary-reality')}</h4>${badgeWithExplainer('Supporting surfaces')}</div>
          <p>${escapeHtml(guidance.boundaryTruthPlacement || 'Boundary honesty still matters, but it belongs in the explicit boundary surfaces rather than in the profile headline.')}</p>
        </div>
      </div>
      <div class="mini-grid two-up">
        ${profiles.map((/** @type {any} */ profile) => `
          ${(() => {
            const modeExplainers = profileModeExplainers(profile.profileId);
            return `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${labelWithExplainer(profile.label || profile.profileId, modeExplainers.profile)}</strong>
              <div class="badge-row">${statusBadge(profile.profileId === activeScenarioProfileId ? 'selected scenario' : 'available in corpus')} <span class="badge">${escapeHtml(profile.shortLabel || profile.profileId)}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Who this is', profile.identity?.whoItIs || '—')}
              ${kvRow('How to demonstrate', profile.identity?.operatorRole || '—')}
              ${kvRow('Audience should understand', profile.identity?.audienceMeaning || '—')}
              ${kvRow('Deposit mode', profile.depositMode || profile.metadata?.depositMode || '—', { explainerKey: modeExplainers.deposit })}
              ${kvRow('Need mode', profile.needMode || profile.metadata?.needMode || '—', { explainerKey: modeExplainers.need })}
              ${kvRow('Asset-pack shape', profile.assetPackShape || profile.metadata?.assetPackShape || '—')}
              ${kvRow('Settlement shape', profile.settlementShape || profile.metadata?.settlementShape || '—')}
              ${kvRow('Scenario anchors', formatList(profile.scenarioFamilies || []), { html: true })}
              ${kvRow('Composition', formatList(profile.composition || []), { html: true })}
              ${kvRow('Boundary truth', profile.metadata?.boundaryTruthNote || profile.boundaryRealityNote || '—')}
            </div>
          </div>
        `;
          })()}
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} group
 * @param {string} [tone='']
 * @returns {string}
 */
function renderScoreGroupVisual(group, tone = '') {
  const accumulation = group?.accumulation || [];
  const sequence = group?.sequence || [];
  return `
    <div class="section-card ${tone}">
      <div class="row wrap-gap">
        <strong>${escapeHtml(labelize(group?.groupId || 'score-group'))}</strong>
        <div class="badge-row"><span class="badge">final ${escapeHtml(Number(group?.finalScore || 0).toFixed(3))}</span><span class="badge">${escapeHtml(formatCount(sequence.length, 'step'))}</span></div>
      </div>
      <div class="detail-table">
        ${sequence.map((/** @type {any} */ step) => `
          <div class="detail-row">
            <span class="meta">${escapeHtml(step.step)}</span>
            <strong>${escapeHtml(step.label)}</strong>
            <span>${escapeHtml(Number(step.value || 0).toFixed(3))}</span>
            <span class="meta wrap-anywhere">${escapeHtml((step.refs || []).slice(0, 4).join(' • ') || '—')}</span>
          </div>
        `).join('')}
      </div>
      ${accumulation.length ? `<div class="detail-block"><summary>Accumulation</summary><div class="detail-table">${accumulation.map((/** @type {any} */ step) => `<div class="detail-row"><span class="meta">${escapeHtml(step.label || step.code)}</span><strong>${escapeHtml(step.contribution ?? step.mass ?? '—')}</strong><span>cum ${escapeHtml(step.cumulative ?? '—')}</span><span class="meta">${escapeHtml(step.weight != null ? `weight ${step.weight}` : 'penalty')}</span></div>`).join('')}</div></div>` : ''}
      <div class="kv-grid">${Object.entries(group?.verifiedInputs || {}).slice(0, 6).map(([key, value]) => kvRow(labelize(key), Array.isArray(value) ? formatList(value.slice(0, 6), 'None') : value, { html: Array.isArray(value) })).join('')}</div>
    </div>
  `;
}

/**
 * @param {LooseRecord | PreviewDepositingSurfaceShape | null | undefined} surface
 * @returns {string}
 */
function renderDepositingSurfaceVisual(surface) {
  const selectedArtifactKindCounts = surface?.selectedArtifactKindCounts || {};
  const selectedOriginKindCounts = surface?.selectedOriginKindCounts || {};
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(surface?.depositProfile || 'Depositing surface')}</strong>
          <div class="badge-row">${statusBadge(surface?.selectedInventoryRefs?.length ? 'deposit selected' : 'awaiting selection')}</div>
        </div>
        <p>${escapeHtml(surface?.depositIntentSummary || 'No deposit intent summary available.')}</p>
      </div>
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Deposit session', surface?.depositSessionId || '—', '', { explainerKey: 'depositing' })}
        ${metricTile('Repo supply ref', surface?.repoSupplyRef || '—', '', { explainerKey: 'repo-supply' })}
        ${metricTile('Selected inventory refs', surface?.selectedInventoryRefs?.length || 0, '', { explainerKey: 'depositing' })}
        ${metricTile('Artifact kinds', Object.keys(selectedArtifactKindCounts).length, '', { explainerKey: 'artifact-kind' })}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Selected deposit shape', 'depositing')}</h4><span class="badge">Artifact-kind-native</span></div>
          <div class="kv-grid">
            ${kvRow('Artifact kinds', formatCountMap(selectedArtifactKindCounts), { html: true, explainerKey: 'artifact-kind' })}
            ${kvRow('Origin kinds', formatCountMap(selectedOriginKindCounts), { html: true, explainerKey: 'origin-kind' })}
            ${kvRow('Inventory refs', formatList(surface?.selectedInventoryRefs || []), { html: true })}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Bound roots', 'identity-auth-spine')}</h4><span class="badge">Address / sign / auth</span></div>
          <div class="kv-grid">
            ${kvRow('Addressing root', surface?.addressingRoot || '—', { explainerKey: 'addressing' })}
            ${kvRow('Signing root', surface?.signingRoot || '—', { explainerKey: 'signing' })}
            ${kvRow('Auth root', surface?.authRoot || '—', { explainerKey: 'github-app-auth' })}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {NeedPreviewShape | null | undefined} surface
 * @returns {string}
 */
function renderNeedingSurfaceVisual(surface) {
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(surface?.taskSummary || 'Measured need')}</strong>
          <div class="badge-row">${statusBadge(surface?.realizationProfile?.shortLabel || surface?.realizationProfile?.label || 'need')}</div>
        </div>
        <p>${escapeHtml(surface?.boundednessSummary || 'No boundedness summary available.')}</p>
      </div>
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Need ID', surface?.needId || '—', '', { explainerKey: 'needing' })}
        ${metricTile('Parser', surface?.parserKind || '—', '', { explainerKey: 'needing' })}
        ${metricTile('Failure modes', surface?.failureModeSummary?.length || 0, '', { explainerKey: 'needing' })}
        ${metricTile('Target kinds', surface?.targetArtifactKinds?.length || 0, '', { explainerKey: 'target-artifact-kind' })}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Demand shape', 'needing')}</h4><span class="badge">Measured need</span></div>
          <div class="kv-grid">
            ${kvRow('Failure modes', formatList(surface?.failureModeSummary || []), { html: true })}
            ${kvRow('Target artifact kinds', formatList(surface?.targetArtifactKinds || []), { html: true, explainerKey: 'target-artifact-kind' })}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Closure criteria', 'closure-criteria')}</h4><span class="badge">What counts as closed</span></div>
          <div class="badge-row">${chipList(surface?.closureCriteria || [])}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | PreviewDepositingToNeedingSurfaceShape | null | undefined} surface
 * @returns {string}
 */
function renderDepositingToNeedingVisual(surface) {
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(surface?.fitSummary || 'Depositing-to-needing fit')}</strong>
          <div class="badge-row">${statusBadge(surface?.normalizationPressure || 'pending')}</div>
        </div>
        <p class="meta">${escapeHtml(surface?.relationId || 'No fit relation yet.')}</p>
      </div>
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Decisive kinds', surface?.decisiveKinds?.length || 0, '', { explainerKey: 'deposit-fit' })}
        ${metricTile('Overlap kinds', surface?.overlapKinds?.length || 0, '', { explainerKey: 'artifact-kind' })}
        ${metricTile('Normalization pressure', surface?.normalizationPressure || 'pending', '', { explainerKey: 'normalization-pressure' })}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Kind fit', 'deposit-fit')}</h4>${badgeWithExplainer('Before proof', { explainerKey: 'pre-proof-surface' })}</div>
          <div class="kv-grid">
            ${kvRow('Decisive kinds', formatList(surface?.decisiveKinds || []), { html: true, explainerKey: 'deposit-fit' })}
            ${kvRow('Overlap kinds', formatList(surface?.overlapKinds || []), { html: true, explainerKey: 'artifact-kind' })}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Closure path', 'proof-closure')}</h4>${badgeWithExplainer('Branch -> proof -> settlement', { explainerKey: 'closure-path-badge' })}</div>
          <div class="kv-grid">
            ${kvRow('Branch intent', surface?.branchIntentSummary || '—', { explainerKey: 'branch-intent' })}
            ${kvRow('Proof intent', surface?.proofIntentSummary || '—', { explainerKey: 'proof-closure' })}
            ${kvRow('Settlement intent', surface?.settlementIntentSummary || '—', { explainerKey: 'settlement' })}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} need
 * @returns {string}
 */
function renderNeedVisual(need) {
  const parser = need.benchmarkParserContract || {};
  const parserFailure = parser.parserFailureContract || {};
  const benchmarkTarget = need.benchmarkTarget || {};
  const realizationProfile = need.realizationProfile || {};
  const modeExplainers = profileModeExplainers(realizationProfile.profileId);
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(need.task || need.taskSeed || 'Measured engineering need')}</strong>
          <div class="badge-row">
            ${statusBadge(realizationProfile.shortLabel || realizationProfile.label || need.conformanceProfile || need.profileAStatus)}
          </div>
        </div>
        <p class="meta">${escapeHtml(need.repo || '')} · buyer branch ${escapeHtml(need.baseRef || need.buyerBranch || '—')} · benchmark run ${escapeHtml(need.benchmarkRunId || benchmarkTarget.runId || '—')}</p>
      </div>
      <div class="mini-grid three-up">
        ${metricTile('Need ID', need.needId || '—')}
        ${metricTile('Workflow', need.benchmarkWorkflowPath || parser.expectedCanonicalOutputs?.workflowPath || '—')}
        ${metricTile('Parser', `${parser.parserKind || need.parserKind || '—'} ${parser.parserVersion || need.parserVersion || ''}`.trim())}
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Profile semantics', modeExplainers.profile)}</h4><span class="badge">${escapeHtml(realizationProfile.label || 'Scenario profile')}</span></div>
        <div class="kv-grid">
          ${kvRow('Deposit mode', realizationProfile.depositMode || '—', { explainerKey: modeExplainers.deposit })}
          ${kvRow('Need mode', realizationProfile.needMode || '—', { explainerKey: modeExplainers.need })}
          ${kvRow('Asset-pack shape', realizationProfile.assetPackShape || '—')}
          ${kvRow('Settlement shape', realizationProfile.settlementShape || '—')}
        </div>
      </div>
      <div class="section-card">
        <div class="section-head">
          <h4>${labelWithExplainer('Measured target', 'needing')}</h4>
          ${boolBadge(parserFailure.failClosed, 'Fail-closed', 'Open failure mode')}
        </div>
        <div class="kv-grid">
          ${kvRow('Benchmark harness', benchmarkTarget.harnessPath || need.benchmarkHarnessPath || '—')}
          ${kvRow('Parser on missing outputs', parserFailure.onMissingCanonicalOutputs || '—')}
          ${kvRow('Parser on malformed outputs', parserFailure.onMalformedOutputs || '—')}
          ${kvRow('Target artifact kinds', formatList(need.targetArtifactKinds || []), { html: true, explainerKey: 'target-artifact-kind' })}
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Failing cases', 'failing-cases')}</h4><span class="badge">${(need.failingCases || []).length}</span></div>
          <div class="badge-row">${chipList(need.failingCases || [], 'warn', { allowDynamic: true })}</div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Weak dimensions', 'weak-dimensions')}</h4><span class="badge">${(need.weakDimensions || []).length}</span></div>
          <div class="badge-row">${chipList(need.weakDimensions || [], 'warn', { allowDynamic: true })}</div>
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Constraints', 'constraints')}</h4>${badgeWithExplainer('Governance', { explainerKey: 'constraints' })}</div>
          <div class="badge-row">${chipList(need.constraints || [], '', { allowDynamic: true })}</div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Closure criteria', 'closure-criteria')}</h4><span class="badge">Need closure</span></div>
          <div class="badge-row">${chipList(need.closureCriteria || [], '', { allowDynamic: true })}</div>
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Field derivations', 'field-derivations')}</h4>${badgeWithExplainer('Lineage', { explainerKey: 'field-derivations' })}</div>
          <div class="object-list nested">
            ${Object.entries(need.fieldDerivations || {}).slice(0, 6).map(([field, spec]) => `
              <div class="mini-card">
                <strong>${escapeHtml(labelize(field))}</strong>
                <p class="meta wrap-anywhere">${escapeHtml(spec.source || 'derived')}</p>
                ${spec.policy ? `<p>${escapeHtml(spec.policy)}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Recall channels + hand-offs', 'recall-channels')}</h4>${badgeWithExplainer('V8 contracts', { explainerKey: 'recall-channels' })}</div>
        <div class="detail-table">
          ${(need.recallChannelContracts || []).map((/** @type {any} */ channel) => `
            <div class="detail-row">
              <strong>${escapeHtml(channel.channelId)}</strong>
              <span>${escapeHtml(channel.signalFamily)}</span>
              <span class="meta wrap-anywhere">${escapeHtml(channel.searchedBy || '—')}</span>
              <span class="meta wrap-anywhere">${escapeHtml((channel.downstreamUses || []).join(' • '))}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} payload
 * @returns {string}
 */
function renderNeedMeasurementVisual(payload) {
  return `
    <div class="visual-stack">
      <div class="section-card">
        <div class="section-head"><h4>Measurement package</h4><span class="badge">Need + parser validation</span></div>
        <div class="mini-grid three-up">
          ${metricTile('Inference proofs', (payload.inferenceProofs || []).length)}
          ${metricTile('Field derivations', Object.keys(payload.fieldDerivations || {}).length)}
          ${metricTile('Parser validation checks', Object.keys(payload.parserValidation || {}).length)}
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Benchmark target</h4><span class="badge">Verification evidence</span></div>
          ${surfaceVisualFallback(payload.benchmarkTarget || {})}
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Parser validation</h4><span class="badge">Fail-closed guardrails</span></div>
          ${surfaceVisualFallback(payload.parserValidation || {})}
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Inference proof surfaces', 'proof-closure')}</h4><span class="badge">${formatCount((payload.inferenceProofs || []).length, 'proof')}</span></div>
        ${surfaceVisualFallback(payload.inferenceProofs || [])}
      </div>
    </div>
  `;
}

/**
 * @param {AssetSummaryShape} asset
 * @returns {string}
 */
function renderAssetVisual(asset) {
  return `
    <div class="visual-stack">
      <div class="row wrap-gap">
        <div>
          <strong>${escapeHtml(asset.title)}</strong>
          <p class="meta">${escapeHtml(asset.author)} · ${escapeHtml(asset.artifactKind)} · ${escapeHtml(asset.artifactType || 'untyped')}</p>
        </div>
        <div class="badge-row">
          ${chipList(asset.tags || [])}
        </div>
      </div>
      <p>${escapeHtml(asset.summary || '')}</p>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Coverage', 'deposit-fit')}</h4><span class="badge">Repository fit</span></div>
          <div class="kv-grid">
            ${kvRow('Content root', asset.contentRoot || '—')}
            ${kvRow('Source paths', formatList(asset.sourcePaths || []), { html: true })}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Declared shape', 'artifact-kind')}</h4><span class="badge">Asset metadata</span></div>
          <div class="kv-grid">
            ${kvRow('Stacks', formatList(asset.declaredStacks || []), { html: true })}
            ${kvRow('Constraints', formatList(asset.declaredConstraints || []), { html: true })}
            ${kvRow('Upload kind/type', `${escapeHtml(asset.uploadSurface?.artifactKind || asset.artifactKind)} / ${escapeHtml(asset.uploadSurface?.artifactType || asset.artifactType || '—')}`, { html: true, explainerKey: 'artifact-kind' })}
            ${kvRow('Upload surfaces', formatList((asset.uploadSurface?.surfaces || []).map((/** @type {any} */ surface) => `${surface.role}:${surface.surfaceId}`), 'None'), { html: true })}
          </div>
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Artifact selection', 'depositing')}</h4><span class="badge">Current deposit source</span></div>
          <div class="kv-grid">
            ${kvRow('Intake mode', asset.artifactSelectionSurface?.intakeMode || '—')}
            ${kvRow('Selection label', asset.artifactSelectionSurface?.selectionLabel || '—')}
            ${kvRow('Auth session', asset.artifactSelectionSurface?.authSessionId || '—', { explainerKey: 'github-app-auth' })}
            ${kvRow('Inventory refs', formatList(asset.artifactSelectionSurface?.selectedInventoryEntryIds || []), { html: true })}
            ${kvRow('Inventory root', asset.artifactSelectionSurface?.selectedInventoryRoot || '—')}
            ${kvRow('Artifact kind counts', formatCountMap(asset.artifactSelectionSurface?.selectedArtifactKindCounts || {}), { html: true, explainerKey: 'artifact-kind' })}
            ${kvRow('Origin kinds', formatList(asset.artifactSelectionSurface?.selectedOriginKinds || []), { html: true, explainerKey: 'origin-kind' })}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Addressing', 'addressing')}</h4>${badgeWithExplainer('Explicit repo address')}</div>
          <div class="kv-grid">
            ${kvRow('Scope', asset.addressingSurface?.addressingScope || '—', { explainerKey: 'addressing' })}
            ${kvRow('Repo', asset.addressingSurface?.repo || asset.githubBoundary?.sourceRepo || '—')}
            ${kvRow('Repository ID', asset.addressingSurface?.repositoryId || '—')}
            ${kvRow('Primary address', asset.addressingSurface?.primaryAddressRef || '—', { explainerKey: 'addressing' })}
            ${kvRow('Ref / commit', [asset.addressingSurface?.ref, asset.addressingSurface?.commit].filter(Boolean).join(' @ ') || '—')}
            ${kvRow('Source paths', formatList(asset.addressingSurface?.sourcePaths || []), { html: true })}
            ${kvRow('Addressing root', asset.addressingSurface?.addressingRoot || '—', { explainerKey: 'addressing' })}
          </div>
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Signing', 'signing')}</h4><span class="badge">Address separate from signing</span></div>
          <div class="kv-grid">
            ${kvRow('Signer address', asset.signingSurface?.signerAddress || asset.identitySurface?.signerAddress || '—', { explainerKey: 'signing' })}
            ${kvRow('Algorithm', asset.signingSurface?.signingAlgorithm || '—')}
            ${kvRow('Key source', asset.signingSurface?.keySource || '—')}
            ${kvRow('Payload hash', asset.signingSurface?.payloadHash || '—')}
            ${kvRow('Signed addressing root', asset.signingSurface?.signedAddressingRoot || '—', { explainerKey: 'addressing' })}
            ${kvRow('Signed selection root', asset.signingSurface?.signedSelectionRoot || '—')}
            ${kvRow('Attestation hash', asset.signingSurface?.attestationHash || '—')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('GitHub App auth', 'github-app-auth')}</h4><span class="badge">Installation-scoped</span></div>
          <div class="kv-grid">
            ${kvRow('Mechanism', asset.githubAppAuthSurface?.authMechanism || '—', { explainerKey: 'github-app-auth' })}
            ${kvRow('Auth session', asset.githubAppAuthSurface?.authSessionId || '—', { explainerKey: 'github-app-auth' })}
            ${kvRow('Installation ID', asset.githubAppAuthSurface?.installationId || '—')}
            ${kvRow('Account', asset.githubAppAuthSurface?.installationAccountLogin || '—')}
            ${kvRow('Account ID', asset.githubAppAuthSurface?.installationAccountId || '—')}
            ${kvRow('Repository ID', asset.githubAppAuthSurface?.repositoryId || '—')}
            ${kvRow('Permissions root', asset.githubAppAuthSurface?.permissionsRoot || '—', { explainerKey: 'github-app-auth' })}
            ${kvRow('Auth payload hash', asset.githubAppAuthSurface?.authPayloadHash || '—', { explainerKey: 'github-app-auth' })}
            ${kvRow('Token boundary', asset.githubAppAuthSurface?.tokenBoundary?.mintingState || '—', { explainerKey: 'github-app-auth' })}
            ${kvRow('Permissions', formatList(Object.entries(asset.githubAppAuthSurface?.permissions || {}).map(([key, value]) => `${key}:${value}`)), { html: true })}
            ${kvRow('Local boundary', asset.githubAppAuthSurface?.localBoundary || asset.githubAppAuthSurface?.profileABoundary || '—')}
            ${kvRow('External boundary', asset.githubAppAuthSurface?.externalBoundary || asset.githubAppAuthSurface?.profileBBoundary || '—')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord} item
 * @returns {string}
 */
function renderEvaluationVisual(item) {
  const verification = item.verification || {};
  const sufficiency = verification.verificationSufficiency || {};
  const rights = item.rights || {};
  const strongestScoreDrivers = item.ranking?.explainability?.strongestScoreDrivers || [];
  const penalties = item.ranking?.rankingPenalties || [];

  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p class="meta">${escapeHtml(item.assetId)} · ${escapeHtml(item.artifactKind || '')}</p>
          </div>
          <div class="badge-row">
            ${tierBadge(item.useTier)}
            <span class="badge">score ${escapeHtml(item.ranking.finalRankingScore)}</span>
          </div>
        </div>
        <p>${escapeHtml((strongestScoreDrivers[0]?.label || 'Top driver') + (strongestScoreDrivers[0] ? `: ${strongestScoreDrivers[0].value}` : ''))}</p>
      </div>
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Need match', scoreBar(item.ranking.needMatch.finalScore), 'metric', { html: true })}
        ${metricTile('Benchmark impact', scoreBar(item.ranking.benchmarkImpact.finalScore), 'metric', { html: true })}
        ${metricTile('Actionability', scoreBar(item.ranking.actionability.finalScore), 'metric', { html: true })}
        ${metricTile('Penalty mass', scoreBar(item.ranking.penaltyMass || 0), penalties.length ? 'warn' : '', { html: true })}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Recall + strongest signals</h4><span class="badge">Why it ranked</span></div>
          <div class="kv-grid">
            ${kvRow('Recall score', item.recall?.recallScore ?? '—')}
            ${kvRow('Whole asset need score', item.ranking.wholeAssetNeedScore ?? '—')}
            ${kvRow('Recall channels', formatList((item.recall?.fusion?.contributingChannels || []).map((/** @type {any} */ entry) => entry.channelId || entry)), { html: true })}
            ${kvRow('Artifact type', item.uploadSurface?.artifactType || item.artifactType || '—')}
          </div>
          <div class="badge-row">${strongestScoreDrivers.map((/** @type {any} */ signal) => `<span class="badge">${escapeHtml(signal.label)} ${escapeHtml(signal.value)}</span>`).join(' ') || '<span class="meta">No strongest score drivers recorded.</span>'}</div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Verification + rights</h4><span class="badge">Use-tier gate</span></div>
          <div class="kv-grid">
            ${kvRow('Proof logs', sufficiency.evidenceCoverage?.proofLogCount ?? '—')}
            ${kvRow('Benchmark bound to GitHub run', boolBadge(sufficiency.benchmarkEvidenceBoundToGitHubRun, 'Bound', 'Unbound'), { html: true })}
            ${kvRow('Recommended tier', statusBadge(sufficiency.recommendedUseTier), { html: true })}
            ${kvRow('Policy tier cap', statusBadge(verification.issuerPolicyStatus?.policyTierCap), { html: true })}
            ${kvRow('Branch materialization', boolBadge(rights.branchMaterializationAllowed, 'Allowed', 'Blocked'), { html: true })}
            ${kvRow('Settlement allowed', boolBadge(rights.settlementAllowed, 'Allowed', 'Blocked'), { html: true })}
          </div>
        </div>
      </div>
      <div class="mini-grid three-up">
        ${renderScoreGroupVisual(item.ranking.scoreGroups?.needMatch, 'accent-blue')}
        ${renderScoreGroupVisual(item.ranking.scoreGroups?.benchmarkImpact, 'accent-green')}
        ${renderScoreGroupVisual(item.ranking.scoreGroups?.penaltyMass, penalties.length ? 'accent-orange' : 'accent-slate')}
      </div>
      ${penalties.length ? `<div class="callout warn"><strong>Penalty reasons</strong><div class="badge-row">${penalties.map((/** @type {any} */ penalty) => `<span class="badge warn">${escapeHtml(penalty.code || penalty)}</span>`).join(' ')}</div></div>` : '<div class="callout"><strong>No ranking penalties</strong><span class="meta">This candidate kept a clean ranking path.</span></div>'}
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} report
 * @returns {string}
 */
function renderVerificationReportVisual(report) {
  const entries = report.assetVerification || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Verified assets', entries.length)}
        ${metricTile('Settlement eligible', entries.filter((/** @type {any} */ entry) => entry.useTier === 'settlement-eligible').length)}
        ${metricTile('Context only', entries.filter((/** @type {any} */ entry) => entry.useTier === 'context-only').length)}
        ${metricTile('Rejected', entries.filter((/** @type {any} */ entry) => entry.useTier === 'reject').length)}
      </div>
      <div class="object-list">
        ${entries.map((/** @type {any} */ entry) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(entry.title)}</strong>
              <div class="badge-row">${tierBadge(entry.useTier)} ${statusBadge(entry.issuerPolicyStatus?.status)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Issuance verification', entry.issuanceVerification?.status || entry.issuanceVerification?.testsPassed || 'see raw')}
              ${kvRow('Provenance verification', entry.provenanceVerification?.status || 'see raw')}
              ${kvRow('Recommended use tier', statusBadge(entry.verificationSufficiency?.recommendedUseTier), { html: true })}
              ${kvRow('Verification receipts', formatCount((entry.receiptRefs || []).length, 'receipt'))}
              ${kvRow('Policy tier cap', statusBadge(entry.policyRestrictions?.policyTierCap || entry.issuerPolicyStatus?.policyTierCap), { html: true })}
              ${kvRow('Settlement allowed', boolBadge(entry.rights?.settlementAllowed, 'Allowed', 'Blocked'), { html: true })}
            </div>
            <div class="badge-row">${chipList(entry.verificationSufficiency?.reasons || [], 'warn')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} lock
 * @returns {string}
 */
function renderAssetPackVisual(lock) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Asset pack ID', lock.assetPackId || '—')}
        ${metricTile('Branch mode', lock.branchMode || '—')}
        ${metricTile('Locked assets', (lock.assets || []).length)}
        ${metricTile('Locked units', (lock.units || []).length)}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Selected assets', 'asset-pack')}</h4><span class="badge">Locked for branch</span></div>
          <div class="object-list nested">
            ${(lock.assets || []).map((/** @type {any} */ asset) => `
              <div class="mini-card">
                <div class="row"><strong>${escapeHtml(asset.title || asset.assetId)}</strong>${tierBadge(asset.useTier || 'selected')}</div>
                <p class="meta">${escapeHtml(asset.assetId)}</p>
                <p>${escapeHtml(asset.materializationRoot || asset.contentRoot || '')}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Lock integrity', 'asset-pack')}</h4><span class="badge">Roots + attestations</span></div>
          <div class="kv-grid">
            ${kvRow('Locked content roots', formatCount((lock.lockedContentRoots || []).length, 'root'))}
            ${kvRow('Locked attestations', formatCount((lock.lockedAttestationHashes || []).length, 'hash'))}
            ${kvRow('Need ID', lock.needId || '—')}
            ${kvRow('Allowed tiers', formatList(lock.allowedUseTiers || []), { html: true })}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {any[]} decisions
 * @returns {string}
 */
function renderAuthorizationVisual(decisions) {
  const allowCount = decisions.filter((decision) => decision.decision === 'allow').length;
  const denyCount = decisions.filter((decision) => decision.decision !== 'allow').length;
  return `
    <div class="visual-stack">
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Decisions', decisions.length)}
        ${metricTile('Allows', allowCount, allowCount ? 'private' : '')}
        ${metricTile('Non-allows', denyCount, denyCount ? 'warn' : '')}
      </div>
      <div class="object-list">
        ${decisions.map((decision) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(decision.action)}</strong>
              <div class="badge-row">${statusBadge(decision.decision)} ${statusBadge(decision.principalId)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Principal', decision.principalId || '—')}
              ${kvRow('Resource', decision.resourceRef || '—')}
              ${kvRow('Policy', decision.policyRef || '—')}
            </div>
            ${decision.reasons?.length ? `<div class="callout"><strong>Why</strong><span>${escapeHtml(truncate(decision.reasons.join(' • '), 220))}</span></div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {any[]} records
 * @returns {string}
 */
function renderSensitiveFlowVisual(records) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Flow records', records.length)}
        ${metricTile('Data classes', new Set(records.map((record) => record.dataClass)).size)}
        ${metricTile('Authorized principals', new Set(records.flatMap((record) => record.authorizedPrincipals || [])).size)}
        ${metricTile('Proof refs', new Set(records.flatMap((record) => record.proofRefs || [])).size)}
      </div>
      <div class="object-list">
        ${records.map((record) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(record.transformation || record.recordId)}</strong>
              <div class="badge-row">${statusBadge(record.dataClass)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('From', record.fromSurface || '—')}
              ${kvRow('To', record.toSurface || '—')}
              ${kvRow('Policy', record.policyRef || '—')}
              ${kvRow('Authorized principals', formatList(record.authorizedPrincipals || []), { html: true })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} policy
 * @returns {string}
 */
function renderPolicyReleaseVisual(policy) {
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(policy.releaseId || 'Policy release')}</strong>
          <div class="badge-row">${statusBadge(policy.confidentialityDefault)} ${statusBadge(policy.conformanceProfile)}</div>
        </div>
        <p>${escapeHtml(policy.policyRef || '')}</p>
      </div>
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Artifact classes', (policy.artifactClasses || []).length)}
        ${metricTile('Retention rules', (policy.retentionRules || []).length)}
        ${metricTile('Selected assets', (policy.selectedAssets || []).length)}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Artifact classes</h4><span class="badge">Confidentiality map</span></div>
          <div class="object-list nested">
            ${(policy.artifactClasses || []).map((/** @type {any} */ entry) => `
              <div class="mini-card">
                <strong>${escapeHtml(entry.path)}</strong>
                <p class="meta">${escapeHtml(entry.sensitiveDataClass)}</p>
                <div class="badge-row">${boolBadge(entry.disclosable, 'Disclosable', 'Private')}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Revocation + retention</h4><span class="badge">Safety controls</span></div>
          <div class="kv-grid">
            ${kvRow('Settlement blocked on revoked issuer', boolBadge(policy.revocationRules?.revokedIssuerBlocksNewSettlement, 'Blocked', 'Open'), { html: true })}
            ${kvRow('Delivery blocked on revoked issuer', boolBadge(policy.revocationRules?.revokedIssuerBlocksNewDelivery, 'Blocked', 'Open'), { html: true })}
          </div>
          <div class="object-list nested">
            ${(policy.retentionRules || []).map((/** @type {any} */ rule) => `
              <div class="mini-card">
                <strong>${escapeHtml(rule.retentionPolicyId)}</strong>
                <p class="meta">TTL ${escapeHtml(rule.ttlDays)} days</p>
                <p>${escapeHtml((rule.appliesTo || []).join(' • '))}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} catalog
 * @returns {string}
 */
function renderUnitCatalogVisual(catalog) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Units', (catalog.units || []).length)}
        ${metricTile('Assets represented', new Set((catalog.units || []).map((/** @type {any} */ unit) => unit.assetId)).size)}
        ${metricTile('Profiles', [catalog.conformanceProfile, catalog.productionIntentProfile].filter(Boolean).length)}
        ${metricTile('Kinds', new Set((catalog.units || []).map((/** @type {any} */ unit) => unit.unitKind)).size)}
      </div>
      <div class="object-list">
        ${(catalog.units || []).map((/** @type {any} */ unit) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(unit.unitId)}</strong>
              <div class="badge-row">${statusBadge(unit.unitKind)} ${statusBadge(unit.useTier)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Asset ID', unit.assetId || '—')}
              ${kvRow('Semantic summary', truncate(unit.semanticSummary || '—', 140))}
              ${kvRow('Embedding hand-off ready', boolBadge(unit.semanticInterfaces?.embeddingHandOffReady, 'Ready', 'Not ready'), { html: true })}
              ${kvRow('Unit hash', unit.unitHash || '—')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} telemetry
 * @returns {string}
 */
function renderTelemetryVisual(telemetry) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Telemetry events', (telemetry.events || []).length)}
        ${metricTile('Stages', new Set((telemetry.events || []).map((/** @type {any} */ event) => event.stage)).size)}
        ${metricTile('Primary profile', telemetry.conformanceProfile || '—')}
        ${metricTile('Contrast profile', telemetry.productionIntentProfile || '—')}
      </div>
      <div class="timeline">
        ${(telemetry.events || []).map((/** @type {any} */ event, /** @type {number} */ index) => `
          <div class="timeline-item">
            <div class="timeline-index">${index + 1}</div>
            <div class="timeline-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(labelize(event.stage || `Event ${index + 1}`))}</strong>
                <span class="badge">${escapeHtml(event.stage || 'event')}</span>
              </div>
              <p class="meta">${escapeHtml(truncate(JSON.stringify(event.details || {}), 180))}</p>
              ${surfaceVisualFallback(event.details || {})}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} preview
 * @returns {string}
 */
function renderSettlementPreviewVisual(preview) {
  const selectedAssetIds = preview.selectedAssetIds || [];
  const participatingAssetIds = preview.settlementParticipatingAssetIds || [];
  const creditedAssetIds = preview.creditedAssetIds || [];
  const zeroCreditAssetIds = preview.zeroCreditAssetIds || [];
  const allocations = preview.allocations || [];
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(preview.bundleId || 'Settlement preview')}</strong>
          <div class="badge-row">${statusBadge(preview.branchMode)} ${statusBadge(preview.assetPackLockHash ? 'asset-pack-lock bound' : 'unbound')}</div>
        </div>
        <p class="meta">Need ${escapeHtml(preview.needId || '—')} · ${formatCount(participatingAssetIds.length, 'participating asset')} · ${formatCount(creditedAssetIds.length, 'credited asset')}</p>
      </div>
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Metered micro-units', preview.meteredMicroUnits || '—', '', { explainerKey: 'settlement' })}
        ${metricTile('Selected branch assets', selectedAssetIds.length)}
        ${metricTile('Settlement participants', participatingAssetIds.length)}
        ${metricTile('Credited assets', creditedAssetIds.length)}
        ${metricTile('Zero-credit participants', zeroCreditAssetIds.length, zeroCreditAssetIds.length ? 'warn' : '')}
      </div>
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Preview allocations', allocations.length)}
        ${metricTile('Lock hash', preview.assetPackLockHash ? truncate(preview.assetPackLockHash, 18) : '—')}
        ${metricTile('Branch mode', preview.branchMode || '—')}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Selection semantics', 'settlement')}</h4><span class="badge">Branch vs settlement</span></div>
          <div class="kv-grid">
            ${kvRow('Selected branch assets', formatList(selectedAssetIds), { html: true })}
            ${kvRow('Settlement participants', formatList(participatingAssetIds), { html: true })}
            ${kvRow('Credited settlement assets', formatList(creditedAssetIds), { html: true })}
            ${kvRow('Zero-credit participants', formatList(zeroCreditAssetIds, 'None'), { html: true })}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Operator meaning', 'settlement')}</h4><span class="badge">Intentional distinction</span></div>
          <p>${escapeHtml(preview.semanticsNote || 'Selected assets, settlement participants, and credited assets can differ.')}</p>
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Allocation preview', 'settlement')}</h4><span class="badge">Bundle shares</span></div>
        <div class="object-list nested">
          ${allocations.map((/** @type {any} */ allocation) => `
            <div class="mini-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(allocation.title || allocation.assetId || 'Asset')}</strong>
                <div class="badge-row">
                  <span class="badge">${escapeHtml(allocation.settledShareBp ?? allocation.shareBp ?? '—')} bp</span>
                  ${statusBadge(allocation.creditedMicroUnits === '0' ? 'zero credited units' : 'credited')}
                </div>
              </div>
              <p class="meta wrap-anywhere">${escapeHtml(allocation.assetId || '')}</p>
              <div class="kv-grid">
                ${kvRow('Use tier', allocation.useTier || '—')}
                ${kvRow('Credited micro-units', allocation.creditedMicroUnits || '0')}
              </div>
              <p class="meta">${escapeHtml((allocation.rationale || []).join(' • '))}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} sourceToShares
 * @returns {string}
 */
function renderSourceToSharesVisual(sourceToShares) {
  const entries = sourceToShares?.sourceContributionEntries || [];
  const normalizationLedger = sourceToShares?.normalizationLedger || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Contribution entries', entries.length)}
        ${metricTile('Bundle share score', sourceToShares?.bundleShareScore?.bundleShareScore || '—')}
        ${metricTile('Normalization', sourceToShares?.basisPointNormalization?.method || '—', '', { explainerKey: 'normalization-pressure' })}
        ${metricTile('Tie-break order', (sourceToShares?.basisPointNormalization?.remainderDistributionOrder || []).length)}
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Contribution basis', 'source-to-shares')}</h4><span class="badge">Source to shares</span></div>
        <div class="object-list nested">
          ${entries.map((/** @type {any} */ entry) => `
            <div class="mini-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(entry.title || entry.assetId || 'Asset')}</strong>
                <div class="badge-row">
                  <span class="badge">${escapeHtml(`${entry.rawShareBp ?? 0} bp`)}</span>
                  ${statusBadge(entry.clipped ? 'clipped to zero' : 'positive contribution')}
                </div>
              </div>
              <p class="meta wrap-anywhere">${escapeHtml(entry.assetId || '')}</p>
              <div class="kv-grid">
                ${kvRow('Raw contribution units', entry.rawContributionUnits || '0')}
                ${kvRow('Clipped contribution units', entry.clippedContributionUnits || '0')}
                ${kvRow('Clipping receipt', entry.clippingReceiptId || '—')}
                ${kvRow('Selected unit refs', formatList(entry.selectedUnitRefs || []), { html: true })}
                ${kvRow('Need evidence', formatList([...(entry.coveredNeedEvidence?.failureModes || []), ...(entry.coveredNeedEvidence?.constraints || []), ...(entry.coveredNeedEvidence?.touchedPaths || [])], 'None'), { html: true })}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Normalization ledger', 'source-to-shares')}</h4><span class="badge">Deterministic tie-break</span></div>
        <div class="object-list nested">
          ${normalizationLedger.map((/** @type {any} */ entry) => `
            <div class="mini-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(entry.assetId || 'Asset')}</strong>
                <span class="badge">${escapeHtml(`rank ${entry.tieBreakRank ?? '—'}`)}</span>
              </div>
              <div class="kv-grid">
                ${kvRow('Floor share bp', entry.floorShareBp ?? '—')}
                ${kvRow('Remainder units', entry.remainderUnits || '0')}
                ${kvRow('Awarded remainder bp', entry.remainderAwardedBp ?? 0)}
                ${kvRow('Final share bp', entry.finalShareBp ?? '—')}
              </div>
            </div>
          `).join('') || '<p class="meta">No normalization ledger.</p>'}
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} participation
 * @returns {string}
 */
function renderSettlementParticipationVisual(participation) {
  const records = participation?.records || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected', participation?.selectedAssetCount || 0)}
        ${metricTile('Participating', participation?.settlementParticipatingCount || 0)}
        ${metricTile('Credited', participation?.positivelyCreditedCount || 0)}
        ${metricTile('Zero-credit', participation?.zeroCreditParticipatingCount || 0, (participation?.zeroCreditParticipatingCount || 0) ? 'warn' : '')}
      </div>
      <div class="object-list">
        ${records.map((/** @type {any} */ record) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(record.title || record.assetId || 'Asset')}</strong>
                <p class="meta wrap-anywhere">${escapeHtml(record.assetId || '')}</p>
              </div>
              <div class="badge-row">
                ${statusBadge(record.selected ? 'selected' : 'excluded')}
                ${statusBadge(record.zeroCreditParticipating ? 'zero-credit participating' : record.positivelyCredited ? 'positively credited' : record.settlementParticipating ? 'participating' : 'excluded')}
              </div>
            </div>
            <div class="kv-grid">
              ${kvRow('Use tier', record.useTier || '—')}
              ${kvRow('Raw share bp', record.rawShareBp ?? 0)}
              ${kvRow('Settled share bp', record.settledShareBp ?? 0)}
              ${kvRow('Credited micro-units', record.creditedMicroUnits || '0')}
            </div>
            ${record.exclusionReason ? `<p class="meta">${escapeHtml(record.exclusionReason)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} report
 * @returns {string}
 */
function renderAccountingPrecisionVisual(report) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Contribution inputs', (report?.contributionInputs || []).length)}
        ${metricTile('Clipping receipts', (report?.clippingDecisions || []).length)}
        ${metricTile('Allocation rows', (report?.microUnitAllocation?.allocations || []).length)}
        ${metricTile('Source-to-shares closure rows', (report?.sourceMaterialToSharesClosure || []).length)}
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Exact accounting invariants', 'settlement')}</h4><span class="badge">Replayable</span></div>
        <div class="badge-row">
          ${Object.entries(report?.exactAccountingInvariants || {}).map(([key, value]) => `<span class="badge ${value ? 'private' : 'bad'}">${escapeHtml(labelize(key))}: ${escapeHtml(value)}</span>`).join(' ')}
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Basis-point normalization', 'exact-accounting')}</h4><span class="badge">Source to shares</span></div>
          ${surfaceVisualFallback(report?.basisPointNormalization || {})}
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Micro-unit allocation', 'exact-accounting')}</h4><span class="badge">Exact remainder order</span></div>
          ${surfaceVisualFallback(report?.microUnitAllocation || {})}
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Source material to shares closure', 'source-to-shares')}</h4><span class="badge">Unit refs to credited micro-units</span></div>
        ${surfaceVisualFallback(report?.sourceMaterialToSharesClosure || [])}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} proof
 * @returns {string}
 */
function renderMaterializationProofVisual(proof) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected assets', (proof?.witnessRefs?.selectedAssetIds || []).length)}
        ${metricTile('Materialized assets', (proof?.witnessRefs?.materializedAssetIds || []).length)}
        ${metricTile('Excluded assets', (proof?.witnessRefs?.excludedAssetIds || []).length)}
        ${metricTile('Locked units', (proof?.witnessRefs?.lockedUnitRefs || []).length)}
      </div>
      <div class="badge-row">
        ${statusBadge(proof?.allSelectedAssetsMaterialized ? 'selected assets materialized' : 'selected assets missing')}
        ${statusBadge(proof?.allExclusionsExplained ? 'exclusions explained' : 'unexplained exclusions')}
      </div>
      ${surfaceVisualFallback(proof || {})}
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} proof
 * @returns {string}
 */
function renderMaterializationVisibilityVisual(proof) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected assets', (proof?.witnessRefs?.selectedAssetIds || []).length)}
        ${metricTile('Materialized assets', (proof?.witnessRefs?.materializedSourceAssetIds || []).length)}
        ${metricTile('Unit refs', (proof?.witnessRefs?.materializedUnitRefs || []).length)}
        ${metricTile('Public artifacts', (proof?.witnessRefs?.publicArtifactPaths || []).length)}
      </div>
      <div class="badge-row">
        ${statusBadge(proof?.allSelectedAssetsHaveMaterializedSourceBindings ? 'selected assets materialized' : 'selected assets missing')}
        ${statusBadge(proof?.noUnexpectedMaterializedSourceBindings ? 'no unexpected materialization' : 'unexpected materialization')}
        ${statusBadge(proof?.allMaterializedUnitsClosedOverLock ? 'unit refs closed' : 'unit refs open')}
        ${statusBadge(proof?.noPrivateArtifactsLeakIntoPublicProjection ? 'public projection bounded' : 'public projection leaked')}
      </div>
      ${surfaceVisualFallback(proof || {})}
    </div>
  `;
}

/**
 * @param {ScenarioShape[]} [scenarios=[]]
 * @param {string} [activeScenarioId='']
 * @returns {string}
 */
function renderScenarioCorpusVisual(scenarios = [], activeScenarioId = '') {
  return `
    <div class="object-list">
      ${scenarios.map((scenario) => {
        const modeExplainers = profileModeExplainers(scenario.realizationProfile?.profileId);
        return `
        <div class="section-card">
          <div class="row wrap-gap">
            <div>
              <strong>${escapeHtml(scenario.scenarioFamily || scenario.scenarioId || 'Scenario')}</strong>
              <p class="meta">${escapeHtml(scenario.repo || '')}</p>
            </div>
            <div class="badge-row">
              ${statusBadge(scenario.scenarioId === activeScenarioId ? 'active scenario' : 'seeded scenario')}
              <span class="badge">${escapeHtml(scenario.realizationProfile?.shortLabel || 'Profile')}</span>
              <span class="badge">${escapeHtml(scenario.parserKind || 'parser')}</span>
            </div>
          </div>
          <p>${escapeHtml(scenario.taskSeed || '—')}</p>
          <div class="kv-grid">
            ${kvRow('Deposit mode', scenario.realizationProfile?.depositMode || '—', { explainerKey: modeExplainers.deposit })}
            ${kvRow('Need mode', scenario.realizationProfile?.needMode || '—', { explainerKey: modeExplainers.need })}
            ${kvRow('Coverage tags', chipList(scenario.coverageTags || []), { html: true })}
            ${kvRow('Failing cases', formatList(scenario.failingCases || []), { html: true })}
            ${kvRow('Weak dimensions', formatList(scenario.weakDimensions || []), { html: true })}
          </div>
        </div>
      `;
      }).join('')}
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} diff
 * @returns {string}
 */
function renderJournalDiffVisual(diff) {
  const invariants = diff.invariants || {};
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Bundle ID', diff.bundleId || '—')}
        ${metricTile('Event ID', diff.eventId || '—')}
        ${metricTile('Debited', diff.totals?.debited || '—')}
        ${metricTile('Credited', diff.totals?.credited || '—')}
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Journal invariants', 'settlement')}</h4><span class="badge">Exact accounting</span></div>
        <div class="badge-row">
          ${Object.entries(invariants).map(([key, value]) => `<span class="badge ${value ? 'private' : 'bad'}">${escapeHtml(labelize(key))}: ${escapeHtml(value)}</span>`).join(' ')}
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Debits', 'journal-diff')}</h4><span class="badge">${(diff.debits || []).length}</span></div>
          ${surfaceVisualFallback(diff.debits || [])}
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Credits', 'journal-diff')}</h4><span class="badge">${(diff.credits || []).length}</span></div>
          ${surfaceVisualFallback(diff.credits || [])}
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} bundle
 * @returns {string}
 */
function renderSystemProofBundleVisual(bundle) {
  const proofContract = bundle.proofContract || {};
  const theoremChecks = bundle.settlementProof?.theoremChecks || {};
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Need ID', bundle.needId || '—')}
        ${metricTile('Asset pack ID', bundle.assetPackId || '—')}
        ${metricTile('Measurement proofs', (bundle.assetMeasurementProofs || []).length)}
        ${metricTile('Inferred outputs', (bundle.promptImplementationSurface?.inferredOutputs || []).length)}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Proof contract + evidence chain', 'proof-closure')}</h4><span class="badge">Final closure</span></div>
          <div class="kv-grid">
            ${kvRow('Contract ID', proofContract.contractId || '—')}
            ${kvRow('Theorem checks declared', formatList(proofContract.theoremChecks || []), { html: true })}
          </div>
          <div class="object-list nested">
            ${(proofContract.evidenceChain || []).map((/** @type {any} */ entry) => `
              <div class="mini-card">
                <strong>${escapeHtml(entry.stage || 'stage')}</strong>
                <p>${escapeHtml(entry.claim || '')}</p>
                <p class="meta wrap-anywhere">${escapeHtml((entry.artifactRefs || []).join(' • '))}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Theorem / invariant checks', 'proof-closure')}</h4><span class="badge">Evidence-bound</span></div>
          <div class="badge-row">
            ${Object.entries(theoremChecks).map(([key, value]) => `<span class="badge ${value ? 'private' : 'bad'}">${escapeHtml(labelize(key))}: ${escapeHtml(value)}</span>`).join(' ')}
          </div>
          <div class="kv-grid">
            ${kvRow('Prompt templates', (bundle.promptImplementationSurface?.promptTemplates || []).length)}
            ${kvRow('Prompt lineage rows', (bundle.promptImplementationSurface?.promptLineage || []).length)}
            ${kvRow('Asset bindings', (proofContract.artifactBindings?.selectedAssets || []).length)}
          </div>
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>${labelWithExplainer('Prompt / evaluator surface', 'proof-closure')}</h4><span class="badge">External hand-off</span></div>
        ${surfaceVisualFallback(bundle.promptImplementationSurface || {})}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} bundle
 * @returns {LooseRecord}
 */
function buildProofFamilyCatalogSummary(bundle) {
  if (!bundle) return null;
  const proofFamilies = /** @type {LooseRecordArray} */ (bundle?.proofFamilies || []);
  const verifierEntrypoint = /** @type {LooseRecord} */ (bundle?.verifierEntrypoint || {});
  return {
    proofFamilyCount: proofFamilies.length,
    replayArtifactCount: (verifierEntrypoint.replayArtifacts || []).length,
    requiredArtifactCount: (verifierEntrypoint.requiredArtifactPaths || []).length,
    proofFamilies: proofFamilies.map((entry) => ({
      proofFamily: entry.proofFamily,
      proofArtifactPath: entry.proofArtifactPath,
      allTheoremsPassed: entry.allTheoremsPassed === true,
      memberCount: Array.isArray(entry.memberIds) ? entry.memberIds.length : 0,
      theoremCount: Array.isArray(entry.theoremIds) ? entry.theoremIds.length : 0,
      witnessArtifactCount: Array.isArray(entry.witnessArtifactPaths) ? entry.witnessArtifactPaths.length : 0,
      replayArtifactCount: Array.isArray(entry.replayArtifacts) ? entry.replayArtifacts.length : 0,
      replayStepCount: Array.isArray(entry.replaySteps) ? entry.replaySteps.length : 0
    })),
    proofFamilyReplayCatalog: verifierEntrypoint.proofFamilyReplayCatalog || []
  };
}

/**
 * @param {LooseRecord | null | undefined} catalog
 * @returns {string}
 */
function renderProofFamilyCatalogVisual(catalog) {
  const proofFamilies = /** @type {LooseRecordArray} */ (catalog?.proofFamilies || []);
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Proof families', catalog?.proofFamilyCount || 0, '', { explainerKey: 'proof-closure' })}
        ${metricTile('Replay artifacts', catalog?.replayArtifactCount || 0)}
        ${metricTile('Required artifacts', catalog?.requiredArtifactCount || 0)}
        ${metricTile('All theorem-closed', proofFamilies.every((entry) => entry.allTheoremsPassed === true) ? 'yes' : 'no')}
      </div>
      <div class="object-list nested">
        ${proofFamilies.map((entry) => `
          <div class="mini-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(entry.proofFamily || 'proof-family')}</strong>
              <span class="badge ${entry.allTheoremsPassed ? 'private' : 'bad'}">${escapeHtml(entry.allTheoremsPassed ? 'theorems passed' : 'theorem drift')}</span>
            </div>
            <div class="kv-grid">
              ${kvRow('Proof artifact', entry.proofArtifactPath || '—')}
              ${kvRow('Members', entry.memberCount || 0)}
              ${kvRow('Theorems', entry.theoremCount || 0)}
              ${kvRow('Witness artifacts', entry.witnessArtifactCount || 0)}
              ${kvRow('Replay artifacts', entry.replayArtifactCount || 0)}
              ${kvRow('Replay steps', entry.replayStepCount || 0)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {AppState} state
 * @returns {LooseRecord}
 */
function buildProjectionVisibilitySummary(state) {
  const run = state.latestRun || {};
  const rawFiles = /** @type {Record<string, string>} */ (run.branchArtifacts?.files || {});
  const publicFiles = /** @type {Record<string, string>} */ (run.branchArtifacts?.publicFiles || {});
  const projectionPrincipal = activeProjectionPrincipal(state);
  const visibleArtifactPaths = /** @type {string[]} */ (run.branchArtifacts?.files
    ? Object.keys(rawFiles)
    : run.branchArtifacts?.visibleFileInventory || Object.keys(publicFiles));
  const publicArtifactPaths = /** @type {string[]} */ (run.projectionPolicy?.publicArtifactPaths || []);
  const privateArtifactPaths = /** @type {string[]} */ (run.projectionPolicy?.privateArtifactPaths || []);
  const visiblePathSet = new Set(visibleArtifactPaths);
  const hiddenPrivateArtifactPaths = privateArtifactPaths.filter((/** @type {string} */ path) => !visiblePathSet.has(path));
  const hiddenSourceMaterialPathCount = hiddenPrivateArtifactPaths.filter((/** @type {string} */ path) => path.startsWith('.engi/source-material/')).length;
  const exposedHiddenPrivateArtifactPaths = projectionPrincipal === 'internal'
    ? hiddenPrivateArtifactPaths
    : hiddenPrivateArtifactPaths.filter((/** @type {string} */ path) => !path.startsWith('.engi/source-material/'));
  return {
    projectionPrincipal,
    visibleArtifactPathCount: visibleArtifactPaths.length,
    publicArtifactPathCount: publicArtifactPaths.length,
    privateArtifactPathCount: privateArtifactPaths.length,
    hiddenPrivateArtifactCount: hiddenPrivateArtifactPaths.length,
    hiddenSourceMaterialPathCount,
    sourceMaterialVisible: visibleArtifactPaths.some((/** @type {string} */ path) => path.startsWith('.engi/source-material/')),
    rawBranchFilesAvailable: Boolean(run.branchArtifacts?.files),
    proofFamilyCount: (run.systemProofBundle?.proofFamilies || []).length,
    replayArtifactCount: (run.systemProofBundle?.verifierEntrypoint?.replayArtifacts || []).length,
    visibleArtifactPaths,
    publicArtifactPaths,
    hiddenPrivateArtifactPaths: exposedHiddenPrivateArtifactPaths
  };
}

/**
 * @param {LooseRecord | null | undefined} summary
 * @returns {string}
 */
function renderProjectionVisibilityVisual(summary) {
  const visibleArtifactPaths = /** @type {string[]} */ (summary?.visibleArtifactPaths || []);
  const hiddenPrivateArtifactPaths = /** @type {string[]} */ (summary?.hiddenPrivateArtifactPaths || []);
  const canEnumerateHiddenPaths = summary?.projectionPrincipal && summary.projectionPrincipal !== 'public';
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Projection', summary?.projectionPrincipal || '—', '', { explainerKey: 'projection' })}
        ${metricTile('Visible artifact paths', summary?.visibleArtifactPathCount || 0, '', { explainerKey: 'branch-artifacts' })}
        ${metricTile('Hidden private artifacts', summary?.hiddenPrivateArtifactCount || 0, '', { explainerKey: 'bounded-public-proof' })}
        ${metricTile('Visible proof families', summary?.proofFamilyCount || 0, '', { explainerKey: 'proof-closure' })}
      </div>
      <div class="badge-row">
        ${statusBadge(summary?.rawBranchFilesAvailable ? 'raw branch files available' : 'bounded projection only')}
        ${statusBadge(summary?.sourceMaterialVisible ? 'source material visible' : 'source material hidden')}
        ${statusBadge(`replay artifacts: ${summary?.replayArtifactCount || 0}`)}
      </div>
      <div class="split">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Visible artifact paths', 'branch-artifacts')}</h4><span class="badge">${escapeHtml(summary?.visibleArtifactPathCount || 0)}</span></div>
          <div class="badge-row">
            ${visibleArtifactPaths.map((/** @type {string} */ path) => `<span class="badge">${escapeHtml(path)}</span>`).join(' ')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Hidden private paths', 'bounded-public-proof')}</h4><span class="badge">${escapeHtml(summary?.hiddenPrivateArtifactCount || 0)}</span></div>
          ${canEnumerateHiddenPaths
            ? `
              <div class="badge-row">
                ${hiddenPrivateArtifactPaths.slice(0, 18).map((/** @type {string} */ path) => `<span class="badge warn">${escapeHtml(path)}</span>`).join(' ')}
                ${hiddenPrivateArtifactPaths.length > 18 ? `<span class="badge">+${escapeHtml(hiddenPrivateArtifactPaths.length - 18)} more</span>` : ''}
                ${summary?.hiddenSourceMaterialPathCount > 0 ? `<span class="badge">+${escapeHtml(summary.hiddenSourceMaterialPathCount)} source-material paths suppressed</span>` : ''}
              </div>
            `
            : `<p class="meta">Public projection exposes bounded counts only; hidden private artifact paths are not enumerated here.</p>`}
        </div>
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} proof
 * @returns {string}
 */
function renderBoundedProofVisual(proof) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Need ID', proof.needId || '—', '', { explainerKey: 'proof-closure' })}
        ${metricTile('Bundle ID', proof.bundleId || '—', '', { explainerKey: 'settlement' })}
        ${metricTile('Selected assets', (proof.selectedAssets || []).length)}
        ${metricTile('Redaction status', proof.redactionStatus || '—')}
      </div>
      <div class="callout">
        <strong>${labelWithExplainer('Bounded public proof', 'proof-closure')}</strong>
        <span>${escapeHtml('This is the redacted inspection surface intended to remain public while private proof artifacts stay private.')}</span>
      </div>
      ${surfaceVisualFallback(proof)}
    </div>
  `;
}

/**
 * @param {Record<string, unknown> | null | undefined} accounts
 * @returns {string}
 */
function renderLedgerAccountsVisual(accounts) {
  const entries = Object.entries(accounts || {});
  return `
    <div class="visual-stack">
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Accounts', entries.length)}
        ${metricTile('Buyer pools', entries.filter(([name]) => name.startsWith('buyer:')).length)}
        ${metricTile('Supplier pending claims', entries.filter(([name]) => name.includes(':pending_claims')).length)}
      </div>
      <div class="object-list nested">
        ${entries.map(([account, balance]) => `
          <div class="mini-card">
            <strong>${escapeHtml(account)}</strong>
            <p class="meta">Balance</p>
            <p>${escapeHtml(balance)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {any[]} history
 * @returns {string}
 */
function renderRunHistoryVisual(history) {
  return `
    <div class="visual-stack">
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Runs', history.length)}
        ${metricTile('Settled runs', history.filter((entry) => entry.needLifecycle === 'settled').length)}
        ${metricTile('Unique bundles', new Set(history.map((entry) => entry.bundleId).filter(Boolean)).size)}
      </div>
      <div class="object-list">
        ${history.map((entry) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(entry.branchName || 'Run')}</strong>
              <div class="badge-row">${statusBadge(entry.needLifecycle)} ${statusBadge(entry.redactionStatus)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Need ID', entry.needId || '—')}
              ${kvRow('Bundle ID', entry.bundleId || '—')}
              ${kvRow('Selected assets', formatList(entry.selectedAssets || []), { html: true })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {RepoSupplySurfaceShape | null | undefined} surface
 * @returns {string}
 */
function renderRepoSupplyVisual(surface) {
  const repos = surface?.repos || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Authenticated repos', surface?.repoCount ?? repos.length, '', { explainerKey: 'repo-supply' })}
        ${metricTile('Supply entries', surface?.inventoryEntryCount ?? 0, '', { explainerKey: 'repo-supply' })}
        ${metricTile('Scenario families', surface?.scenarioCount ?? 0)}
        ${metricTile('Artifact kinds', Object.keys(surface?.artifactKindCounts || {}).length, '', { explainerKey: 'artifact-kind' })}
      </div>
      <div class="callout">
        <strong>${labelWithExplainer('Supply parity', 'repo-supply')}</strong>
        <span>Artifact kinds: ${formatCountMap(surface?.artifactKindCounts || {})}</span>
        <span>Origin kinds: ${formatCountMap(surface?.originKindCounts || {})}</span>
        <span>Profile coverage: ${formatCountMap(surface?.realizationProfileCounts || {})}</span>
      </div>
      <div class="object-list">
        ${repos.map((/** @type {any} */ repo) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(repo.repo)}</strong>
                <p class="meta">${escapeHtml(repo.authSessionId)} · default ref ${escapeHtml(repo.defaultRef || '—')}</p>
              </div>
              <div class="badge-row">${statusBadge((repo.localBoundary || repo.profileABoundary) ? 'modeled local' : 'unknown')} <span class="badge">${escapeHtml(repo.installationId || '—')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Inventory entries', repo.inventoryEntryCount ?? '—')}
              ${kvRow('Scenario coverage', formatList(repo.scenarioFamilies || []), { html: true })}
              ${kvRow('Profile coverage', formatCountMap(repo.realizationProfileCounts || {}), { html: true })}
              ${kvRow('Artifact kinds', formatCountMap(repo.artifactKindCounts || {}), { html: true, explainerKey: 'artifact-kind' })}
              ${kvRow('Origin kinds', formatCountMap(repo.originKindCounts || {}), { html: true, explainerKey: 'origin-kind' })}
              ${kvRow('Dominant stacks', formatList(repo.dominantStacks || []), { html: true })}
              ${kvRow('Dominant constraints', formatList(repo.dominantConstraints || []), { html: true })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} surface
 * @returns {string}
 */
function renderRepoToSettlementVisual(surface) {
  const stages = surface?.stages || [];
  const realizationProfile = surface?.realizationProfile || {};
  const modeExplainers = profileModeExplainers(realizationProfile.profileId);
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(surface?.branchName || 'Repo-to-settlement path')}</strong>
          <div class="badge-row">${statusBadge(realizationProfile.shortLabel || surface?.scenarioId || 'scenario')} ${statusBadge(stages.at(-1)?.status || 'ready')}</div>
        </div>
        <p class="meta">${escapeHtml(realizationProfile.label || 'Repo selection -> need -> asset -> branch -> proof -> settlement')}.</p>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Deposit mode', modeExplainers.deposit)}</h4><span class="badge">Profile</span></div>
          <p>${escapeHtml(surface?.depositMode || realizationProfile.depositMode || '—')}</p>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>${labelWithExplainer('Need mode', modeExplainers.need)}</h4><span class="badge">Profile</span></div>
          <p>${escapeHtml(surface?.needMode || realizationProfile.needMode || '—')}</p>
        </div>
      </div>
      <div class="timeline">
        ${stages.map((/** @type {any} */ stage, /** @type {number} */ index) => `
          <div class="timeline-item">
            <div class="timeline-index">${index + 1}</div>
            <div class="timeline-card">
              <div class="row wrap-gap">
                <strong>${labelWithExplainer(stage.label, (/** @type {Record<string, string>} */ (REPO_TO_SETTLEMENT_STAGE_EXPLAINERS))[String(stage.stageId || '')] || '')}</strong>
                <div class="badge-row">${statusBadge(stage.status)} ${statusBadge(stage.boundaryClass)}</div>
              </div>
              <p>${escapeHtml(stage.summary || '')}</p>
              <div class="kv-grid">
                ${Object.entries(stage.metrics || {}).map(([key, value]) => kvRow(labelize(key), value)).join('')}
                ${kvRow('Refs', formatList(stage.refs || []), { html: true })}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} surface
 * @returns {string}
 */
function renderIdentityAuthSpineVisual(surface) {
  const hops = surface?.hops || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Spine hops', hops.length, '', { explainerKey: 'identity-auth-spine' })}
        ${metricTile('Buyer principal', surface?.buyerPrincipalId || '—')}
        ${metricTile('Installation principal', surface?.installationPrincipalId || '—')}
        ${metricTile('Settlement bundle', surface?.settlementBundleId || '—')}
      </div>
      <div class="timeline">
        ${hops.map((/** @type {any} */ hop, /** @type {number} */ index) => `
          <div class="timeline-item">
            <div class="timeline-index">${index + 1}</div>
            <div class="timeline-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(hop.label)}</strong>
                <div class="badge-row">${statusBadge(hop.boundaryClass)}</div>
              </div>
              <p>${escapeHtml(hop.authoritySummary || '')}</p>
              <div class="kv-grid">
                ${kvRow('Principals', formatList(hop.principalRefs || []), { html: true })}
                ${kvRow('Stage refs', formatList(hop.stageRefs || []), { html: true })}
                ${kvRow('Root refs', formatList(hop.rootRefs || []), { html: true, explainerKey: 'identity-auth-spine' })}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {LooseRecord | null | undefined} surface
 * @returns {string}
 */
function renderBoundaryRealityVisual(surface) {
  const stages = surface?.stages || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Boundary posture', surface?.posture || '—', '', { explainerKey: 'boundary-reality' })}
        ${metricTile('Modeled local stages', stages.filter((/** @type {any} */ stage) => (stage.localStatus || stage.profileAStatus) === 'modeled-local').length)}
        ${metricTile('Executed local stages', stages.filter((/** @type {any} */ stage) => (stage.localStatus || stage.profileAStatus) === 'executed-local').length)}
      </div>
      <div class="object-list">
        ${stages.map((/** @type {any} */ stage) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(stage.label)}</strong>
              <div class="badge-row">${statusBadge(stage.localStatus || stage.profileAStatus)} ${badgeWithExplainer('External boundary', { explainerKey: 'external-boundary' })}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Local here', stage.localDescription || stage.profileADescription || '—')}
              ${kvRow('External next', stage.externalRequirement || stage.profileBRequirement || '—')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderOperatingPicture(state) {
  if (!operatingPictureEl) return;
  const surfaces = [];
  const depositingSurface = activeDepositingSurface(state);
  const needingSurface = activeNeedingSurface(state);
  const fitSurface = activeDepositingToNeedingSurface(state);

  surfaces.push(renderJsonSurface({
    title: 'Repo supply',
    subtitle: 'Authenticated repo sessions and artifact-kind-native supply',
    eyebrow: 'Canonical shell surface',
    help: 'The canonical shell starts from repo supply, then immediately reads the active deposit, need, and fit before deeper closure surfaces.',
    explainerKey: 'repo-supply',
    data: state.repoSupplySurface,
    visual: renderRepoSupplyVisual,
    accent: 'accent-blue'
  }));
  if (depositingSurface) {
    surfaces.push(renderJsonSurface({
      title: 'Depositing surface',
      subtitle: 'The active repo-authenticated deposit, before branch/proof/settlement detail',
      eyebrow: state.latestRun?.depositingSurface ? 'Run surface' : 'Shell preview',
      help: 'This is the opening operator action in the canonical system: what was deposited, from where, and with which bound roots.',
      explainerKey: 'depositing',
      data: depositingSurface,
      visual: renderDepositingSurfaceVisual,
      accent: 'accent-green'
    }));
  }
  if (needingSurface) {
    surfaces.push(renderJsonSurface({
      title: 'Needing surface',
      subtitle: 'The active measured demand surface',
      eyebrow: state.latestRun?.needingSurface ? 'Run surface' : 'Scenario preview',
      help: 'This is the measured need that the deposit has to justify before proof and settlement carry the story forward.',
      explainerKey: 'needing',
      data: needingSurface,
      visual: renderNeedingSurfaceVisual,
      accent: 'accent-blue'
    }));
  }
  if (fitSurface) {
    surfaces.push(renderJsonSurface({
      title: 'Depositing-to-needing surface',
      subtitle: 'Why this deposit fits this need before deeper closure inspection',
      eyebrow: state.latestRun?.depositingToNeedingSurface ? 'Run surface' : 'Shell preview',
      help: 'The canonical system makes the deposit-to-need fit explicit before deeper proof and settlement sections.',
      explainerKey: 'deposit-fit',
      data: fitSurface,
      visual: renderDepositingToNeedingVisual,
      accent: 'accent-orange'
    }));
  }
  if (state.latestRun?.repoToSettlementSurface) {
    surfaces.push(renderJsonSurface({
      title: 'Repo-to-settlement path',
      subtitle: 'Depositing to settlement as one staged operating path',
      eyebrow: 'Run surface',
      help: 'Once deposit, need, and fit are legible, this surface walks the closure path through asset pack, branch, proof, and settlement.',
      explainerKey: 'repo-to-settlement',
      data: state.latestRun.repoToSettlementSurface,
      visual: renderRepoToSettlementVisual,
      accent: 'accent-green'
    }));
  } else {
    surfaces.push(`
      <div class="card intro-card">
        <div class="row wrap-gap">
          <strong>Repo-to-settlement path is ready to execute</strong>
          <div class="badge-row">${statusBadge('awaiting run')}</div>
        </div>
        <p class="meta">Pick repo artifacts from authenticated supply, confirm the measured need, inspect the deposit-to-need fit, then run the branch flow to stage proof and settlement.</p>
      </div>
    `);
  }
  if (state.latestRun?.identityAuthSpineSurface) {
    surfaces.push(renderJsonSurface({
      title: 'Identity and auth spine',
      subtitle: 'Repo auth, signer authority, branch authority, proof authority, and settlement authority',
      eyebrow: 'Support surface',
      help: 'This surface turns the existing auth artifacts into one legible authority chain.',
      explainerKey: 'identity-auth-spine',
      data: state.latestRun.identityAuthSpineSurface,
      visual: renderIdentityAuthSpineVisual,
      accent: 'accent-orange'
    }));
  }
  surfaces.push(renderJsonSurface({
    title: 'Boundary reality',
    subtitle: 'What is modeled here, what executes here, and what remains external',
    eyebrow: 'Support surface',
    help: 'Boundary truth stays explicit here so the primary story can stay centered on depositing, needing, and their fit.',
    explainerKey: 'boundary-reality',
    data: state.boundaryRealitySurface,
    visual: renderBoundaryRealityVisual,
    accent: 'accent-slate'
  }));
  if (state.latestRun?.externalRealizationSummary) {
    surfaces.push(renderJsonSurface({
      title: 'External realization',
      subtitle: 'Which external interfaces are actually configured, observed, or blocked in this run',
      eyebrow: 'V24 actuality surface',
      help: 'This is the quickest operator read of whether Bitcoin, sidechain, compute, storage, and GitHub are still modeled, configured, observed, or blocked.',
      explainerKey: 'external-realization',
      data: state.latestRun.externalRealizationSummary,
      raw: JSON.stringify(state.latestRun.externalRealizationSummary, null, 2),
      visual: renderExternalRealizationSummaryVisual,
      accent: 'accent-slate'
    }));
  }
  operatingPictureEl.innerHTML = surfaces.join('');
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderSummary(state) {
  const latestRun = state.latestRun;
  const selected = latestRun?.assetPack?.selectedAssets?.length || 0;
  const settled = latestRun?.settlementPreview?.creditedAssetIds?.length
    ?? latestRun?.journalDiff?.credits?.filter((/** @type {any} */ entry) => entry.delta !== '0').length
    ?? 0;
  const visibleArtifacts = latestRun?.branchArtifacts?.files
    ? Object.keys(latestRun.branchArtifacts.files).length
    : latestRun?.branchArtifacts?.visibleFileInventory?.length || Object.keys(latestRun?.branchArtifacts?.publicFiles || {}).length;
  const proofFamilies = latestRun?.systemProofBundle?.proofFamilies?.length || 0;
  const repoCount = state.repoSupplySurface?.repoCount || 0;
  const supplyEntries = state.repoSupplySurface?.inventoryEntryCount || 0;
  const depositSurface = activeDepositingSurface(state);
  const needingSurface = activeNeedingSurface(state);
  const fitSurface = activeDepositingToNeedingSurface(state);
  const boundaryStages = (state.boundaryRealitySurface?.stages || []).length;
  const externalInterfaces = latestRun?.externalRealizationSummary?.interfaceSummaries || latestRun?.externalRealizationSummary?.interfaceStates || [];
  const liveObservedInterfaces = externalInterfaces.filter((entry) => String(entry.runtimeState || '') === 'live-observed').length;
  const blockingExternalInterfaces = externalInterfaces.filter((entry) => String(entry.runtimeState || '') === 'live-misconfigured').length;
  const bundleId = latestRun?.settlementPreview?.bundleId
    || latestRun?.boundedPublicProof?.bundleId
    || latestRun?.journalDiff?.bundleId
    || 'No run yet';
  const activeScenario = currentScenario(state);
  const activeProfile = latestRun?.realizationProfile || activeScenario?.realizationProfile;

  summaryEl.innerHTML = [
    summaryTile('Authenticated repos', repoCount, 'repo-supply'),
    summaryTile('Repo supply entries', supplyEntries, 'repo-supply'),
    summaryTile('Active deposit profile', activeProfile?.shortLabel || activeProfile?.label || '—', activeProfile?.profileId === 'B' ? 'profile-b' : 'profile-a'),
    summaryTile('Candidate assets', state.assets?.length || 0, 'candidate-asset'),
    summaryTile('Need scenarios', state.needScenarios?.length || 0, 'needing'),
    summaryTile('Need parser', needingSurface?.parserKind || '—', 'needing'),
    summaryTile('Active scenario', activeScenario?.scenarioFamily || '—', 'scenario-preview'),
    summaryTile('Branch mode', activeBranchMode(state), 'branch-artifacts'),
    summaryTile('Projection', activeProjectionPrincipal(state), 'projection'),
    summaryTile('Selected deposit refs', depositSurface?.selectedInventoryRefs?.length || 0, 'depositing'),
    summaryTile('Fit pressure', fitSurface?.normalizationPressure || 'pending', 'normalization-pressure'),
    summaryTile('Visible branch artifacts', visibleArtifacts || 0, 'branch-artifacts'),
    summaryTile('Visible proof families', proofFamilies || 0, 'proof-closure'),
    summaryTile('Selected assets in latest pack', selected, 'asset-pack'),
    summaryTile('Settlement-credited assets', settled, 'settlement'),
    summaryTile('Latest bundle', bundleId, 'settlement'),
    summaryTile('Boundary stages', boundaryStages, 'boundary-reality'),
    summaryTile('Live-observed external interfaces', liveObservedInterfaces, 'external-realization'),
    summaryTile('Blocking external interfaces', blockingExternalInterfaces, 'external-realization')
  ].join('');
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderScenario(state) {
  const scenarios = state.needScenarios || [];
  const activeScenarioId = selectedScenarioId || state.latestRun?.scenarioId || scenarios[0]?.scenarioId;
  const scenario = scenarios.find((entry) => entry.scenarioId === activeScenarioId) || scenarios[0] || null;
  const latestNeed = state.latestRun?.need;
  const source = /** @type {LooseRecord} */ (latestNeed || scenario || {});
  const needingSurface = activeNeedingSurface(state);
  const measurementPayload = state.latestRun?.needMeasurement ? {
    ...state.latestRun.needMeasurement,
    benchmarkTarget: state.latestRun.benchmarkTarget,
    parserValidation: state.latestRun.parserValidation,
    inferenceProofs: state.latestRun.inferenceProofs,
    fieldDerivations: state.latestRun.need?.fieldDerivations
  } : null;

  scenarioEl.innerHTML = `
    <div class="card intro-card">
      <div class="row wrap-gap">
        <strong>${escapeHtml(source.repo)}</strong>
      <div class="badge-row">
          ${statusBadge(source.realizationProfile?.shortLabel || source.conformanceProfile || source.profileAStatus)}
          ${source.benchmarkRunId ? `<span class="badge">${escapeHtml(source.benchmarkRunId)}</span>` : ''}
        </div>
      </div>
      <p>${escapeHtml(source.task || source.taskSeed || '')}</p>
      <p class="meta">${escapeHtml(canonOperatorLabel(state))} foregrounds measured needing before the deeper branch, proof, and settlement artifacts. The point is to make the demand surface feel consequential on its own.</p>
    </div>
    ${needingSurface ? renderJsonSurface({
      title: 'Needing surface',
      subtitle: 'Measured demand before deeper proof and settlement inspection',
      eyebrow: state.latestRun?.needingSurface ? 'Run surface' : 'Scenario preview',
      eyebrowExplainerKey: state.latestRun?.needingSurface ? 'needing' : 'scenario-preview',
      help: 'This is the compact canonical read of what is needed, why it matters, and what closure should look like.',
      explainerKey: 'needing',
      data: needingSurface,
      visual: renderNeedingSurfaceVisual,
      accent: 'accent-blue'
    }) : ''}
    ${renderJsonSurface({
      title: latestNeed ? 'Measured need' : 'Seed need scenario',
      subtitle: 'Need / measurement / benchmark target surface',
      eyebrow: 'Detailed need surface',
      eyebrowExplainerKey: 'detailed-need-surface',
      help: 'Visual groups the GitHub-bound need into task, parser, failure-mode, and derivation sections. Raw shows the exact pretty-printed object.',
      explainerKey: 'needing',
      data: source,
      visual: renderNeedVisual,
      accent: 'accent-blue'
    })}
    ${renderJsonSurface({
      title: 'Scenario corpus',
      subtitle: 'Seeded GitHub-shaped scenario families available in this demo',
      eyebrow: 'Corpus surface',
      help: 'The corpus now covers auth rollback, proof-heavy Rust, config policy, unsafe review, deployment drift, privacy-boundary proof export, a polyglot gateway rollback, and a normalization-heavy auth scenario for source-to-shares replay.',
      data: scenarios,
      visual: (scenarios) => renderScenarioCorpusVisual(scenarios, activeScenarioId),
      accent: 'accent-green'
    })}
    ${renderJsonSurface({
      title: 'Operational profiles + demo semantics',
      subtitle: 'Targeted deposit versus normalization deposit',
      eyebrow: 'Profile surface',
      help: 'The profile distinction is about how ENGI deposits against need. Boundary reality remains explicit in the supporting boundary surfaces.',
      explainerKey: source.realizationProfile?.profileId === 'B' ? 'profile-b' : 'profile-a',
      data: {
        ...(state.profileCompositions || state.conformanceProfiles?.profileCompositions || {}),
        activeScenarioProfileId: source.realizationProfile?.profileId
      },
      visual: renderProfileCompositionVisual,
      accent: 'accent-orange'
    })}
    ${source.promptSurfaces?.length ? renderJsonSurface({
      title: 'Prompt surfaces + lineage',
      subtitle: 'Templates, interpolated context, and downstream derivation bindings',
      eyebrow: 'Prompt artifact',
      help: 'The canonical system keeps prompts first-class, but they now support the deposit/need/fit story instead of competing with it.',
      data: source.promptSurfaces,
      visual: renderPromptSurfaceCollectionVisual,
      accent: 'accent-purple'
    }) : ''}
    ${measurementPayload ? renderJsonSurface({
      title: 'Need derivation + parser validation',
      subtitle: 'Benchmark target, parser validation, and inference proof package',
      eyebrow: 'Measurement artifact',
      help: 'This is where fail-closed parsing, benchmark targeting, and derivation proofs become legible without losing access to the underlying JSON.',
      data: measurementPayload,
      visual: renderNeedMeasurementVisual,
      accent: 'accent-purple'
    }) : ''}
    ${state.latestRun?.canonicalRunEvidence ? renderJsonSurface({
      title: 'Canonical run evidence',
      subtitle: 'Normalized benchmark evidence bound to the GitHub run',
      eyebrow: 'Verification evidence',
      data: state.latestRun.canonicalRunEvidence,
      visual: surfaceVisualFallback,
      accent: 'accent-slate'
    }) : ''}
  `;
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderAssets(state) {
  const depositingSurface = activeDepositingSurface(state);
  assetsEl.innerHTML = `
    ${depositingSurface ? renderJsonSurface({
      title: 'Depositing surface',
      subtitle: 'What the operator has deposited or is previewing right now',
      eyebrow: state.latestRun?.depositingSurface ? 'Run surface' : 'Shell preview',
      help: 'The canonical system treats depositing as the beginning of the operator story, not as a side form.',
      explainerKey: 'depositing',
      data: depositingSurface,
      visual: renderDepositingSurfaceVisual,
      accent: 'accent-green'
    }) : ''}
    ${(state.assets || []).map((asset) => renderJsonSurface({
      title: asset.title,
      subtitle: `${asset.artifactKind} deposited by ${asset.author}`,
      eyebrow: 'Candidate asset',
      eyebrowExplainerKey: 'candidate-asset',
      help: 'Visual mode lifts out the repo fit, stacks, constraints, and tags. Raw mode preserves the exact public projection for inspection.',
      explainerKey: 'candidate-asset',
      data: asset,
      visual: renderAssetVisual
    })).join('')}
  `;
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderFit(state) {
  if (!fitEl) return;
  const fitSurface = activeDepositingToNeedingSurface(state);
  if (!fitSurface) {
    fitEl.innerHTML = '<div class="card"><p class="meta">No deposit-to-need fit surface is available yet.</p></div>';
    return;
  }

  const sections = [
    renderJsonSurface({
      title: 'Depositing-to-needing surface',
      subtitle: 'Why the active deposit fits the active need before deeper proof/settlement sections',
      eyebrow: state.latestRun?.depositingToNeedingSurface ? 'Run surface' : 'Shell preview',
      help: 'This is the primary deposit-to-need relation surface. It should answer why the selected deposit is right for the measured need.',
      explainerKey: 'deposit-fit',
      data: fitSurface,
      visual: renderDepositingToNeedingVisual,
      accent: 'accent-orange'
    })
  ];

  if (state.latestRun?.assetPack) {
    sections.push(renderJsonSurface({
      title: 'Selected asset pack',
      subtitle: 'What survived fit, ranking, and verification',
      eyebrow: 'Asset-pack surface',
      explainerKey: 'asset-pack',
      data: state.latestRun.assetPack,
      visual: renderAssetPackVisual,
      accent: 'accent-green'
    }));
  }

  if (state.latestRun?.matchReport) {
    sections.push(renderJsonSurface({
      title: 'Match report',
      subtitle: 'Selected versus rejected assets after the fit becomes explicit',
      eyebrow: 'Selection artifact',
      data: state.latestRun.matchReport,
      visual: surfaceVisualFallback,
      accent: 'accent-green'
    }));
  }

  fitEl.innerHTML = sections.join('');
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderEvaluations(state) {
  const items = state.latestRun?.evaluatedCandidates || [];
  if (!items.length) {
    evaluationsEl.innerHTML = '<div class="card"><p class="meta">Run “Make ENGI branch” to compute ranking, verification determinisms, and use tiers.</p></div>';
    return;
  }

  const verificationReport = state.latestRun?.verificationReport;

  evaluationsEl.innerHTML = `
    ${verificationReport ? renderJsonSurface({
      title: 'Verification report',
      subtitle: 'Ranking is separate from verification and rights propagation',
      eyebrow: 'Support surface',
      help: 'Visual mode emphasizes allowed downstream use rather than making you read a wall of nested booleans.',
      data: verificationReport,
      visual: renderVerificationReportVisual,
      accent: 'accent-green'
    }) : ''}
    ${items.map((/** @type {any} */ item) => renderJsonSurface({
      title: item.title,
      subtitle: `${item.assetId} · ${item.artifactKind}`,
      eyebrow: 'Evaluated candidate',
      help: 'Visual mode highlights scores, strongest signals, penalties, verification, and branch/settlement rights. Raw preserves the exact candidate evaluation object.',
      data: item,
      visual: renderEvaluationVisual
    })).join('')}
  `;
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderBranchArtifacts(state) {
  const run = state.latestRun;
  if (!run) {
    branchArtifactsEl.innerHTML = '<div class="card"><p class="meta">No remediation branch staged yet.</p></div>';
    return;
  }

  const branchFiles = run.branchArtifacts?.files || run.branchArtifacts?.publicFiles || {};
  const projectionVisibilitySummary = buildProjectionVisibilitySummary(state);
  const visibleFileInventory = run.branchArtifacts?.files
    ? Object.keys(run.branchArtifacts.files)
    : run.branchArtifacts?.visibleFileInventory || Object.keys(run.branchArtifacts?.publicFiles || {});
  const artifactDefs = [
    {
      title: 'Projection visibility summary',
      subtitle: 'Derived from projection policy and visible artifact inventory',
      explainerKey: 'bounded-public-proof',
      data: projectionVisibilitySummary,
      raw: JSON.stringify(projectionVisibilitySummary, null, 2),
      visual: renderProjectionVisibilityVisual,
      accent: 'accent-slate'
    },
    {
      title: 'Depositing surface',
      subtitle: '.engi/depositing-surface.json',
      explainerKey: 'depositing',
      data: run.depositingSurface,
      raw: branchFiles['.engi/depositing-surface.json'],
      visual: renderDepositingSurfaceVisual,
      accent: 'accent-green'
    },
    {
      title: 'Needing surface',
      subtitle: '.engi/needing-surface.json',
      explainerKey: 'needing',
      data: run.needingSurface,
      raw: branchFiles['.engi/needing-surface.json'],
      visual: renderNeedingSurfaceVisual,
      accent: 'accent-blue'
    },
    {
      title: 'Depositing-to-needing surface',
      subtitle: '.engi/depositing-to-needing-surface.json',
      explainerKey: 'deposit-fit',
      data: run.depositingToNeedingSurface,
      raw: branchFiles['.engi/depositing-to-needing-surface.json'],
      visual: renderDepositingToNeedingVisual,
      accent: 'accent-orange'
    },
    {
      title: 'Asset pack lock',
      subtitle: '.engi/asset-pack.lock.json',
      explainerKey: 'asset-pack',
      data: run.assetPackLock,
      raw: branchFiles['.engi/asset-pack.lock.json'],
      visual: renderAssetPackVisual,
      accent: 'accent-green'
    },
    {
      title: 'Authorization decisions',
      subtitle: '.engi/authorization-decisions.json',
      explainerKey: 'verification-rights',
      data: run.authorizationDecisions,
      raw: branchFiles['.engi/authorization-decisions.json'],
      visual: renderAuthorizationVisual,
      accent: 'accent-orange'
    },
    {
      title: 'Sensitive data flow',
      subtitle: '.engi/sensitive-data-flow.json',
      data: run.sensitiveDataFlowRecords,
      raw: branchFiles['.engi/sensitive-data-flow.json'],
      visual: renderSensitiveFlowVisual,
      accent: 'accent-orange'
    },
    {
      title: 'Policy release',
      subtitle: '.engi/policy-release.json',
      explainerKey: 'ledger-policy',
      data: run.policyRelease,
      raw: branchFiles['.engi/policy-release.json'],
      visual: renderPolicyReleaseVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Identity bindings',
      subtitle: '.engi/identity-bindings.json',
      explainerKey: 'identity-auth-spine',
      data: run.identityBindings,
      raw: branchFiles['.engi/identity-bindings.json'],
      visual: renderIdentityBindingsVisual,
      accent: 'accent-orange'
    },
    {
      title: 'GitHub boundary surface',
      subtitle: '.engi/github-boundary.json',
      explainerKey: 'github-app-auth',
      data: run.githubBoundarySurface,
      raw: branchFiles['.engi/github-boundary.json'],
      visual: renderGitHubBoundaryVisual,
      accent: 'accent-slate'
    },
    {
      title: 'Artifact upload manifest',
      subtitle: '.engi/artifact-upload-manifest.json',
      data: run.artifactUploadManifest,
      raw: branchFiles['.engi/artifact-upload-manifest.json'],
      visual: renderArtifactUploadManifestVisual,
      accent: 'accent-slate'
    },
    {
      title: 'Profile composition surface',
      subtitle: '.engi/profile-composition.json',
      explainerKey: run.realizationProfile?.profileId === 'B' ? 'profile-b' : 'profile-a',
      data: run.profileCompositionSurface,
      raw: branchFiles['.engi/profile-composition.json'],
      visual: renderProfileCompositionVisual,
      accent: 'accent-orange'
    },
    {
      title: 'Prompt surfaces',
      subtitle: '.engi/prompt-surfaces.json',
      data: run.promptSurfaces,
      raw: branchFiles['.engi/prompt-surfaces.json'],
      visual: renderPromptSurfaceCollectionVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Prompt family registry',
      subtitle: '.engi/prompt-family-registry.json',
      explainerKey: 'proof-closure',
      data: run.promptFamilyRegistry,
      raw: branchFiles['.engi/prompt-family-registry.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Prompt contracts',
      subtitle: '.engi/prompt-contracts.json',
      explainerKey: 'proof-closure',
      data: run.promptContracts,
      raw: branchFiles['.engi/prompt-contracts.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Inference moment contracts',
      subtitle: '.engi/inference-moment-contracts.json',
      explainerKey: 'proof-closure',
      data: run.inferenceMomentContracts,
      raw: branchFiles['.engi/inference-moment-contracts.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Inference proofs',
      subtitle: '.engi/inference-proofs.json',
      explainerKey: 'proof-closure',
      data: run.inferenceProofs,
      raw: branchFiles['.engi/inference-proofs.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Parsed completion envelopes',
      subtitle: '.engi/parsed-completion-envelopes.json',
      explainerKey: 'proof-closure',
      data: run.parsedCompletionEnvelopeArtifact || run.parsedCompletionEnvelopes,
      raw: branchFiles['.engi/parsed-completion-envelopes.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Prompt implementation surface',
      subtitle: '.engi/prompt-implementation-surface.json',
      explainerKey: 'proof-closure',
      data: run.promptImplementationSurface,
      raw: branchFiles['.engi/prompt-implementation-surface.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Prompt completeness family proof',
      subtitle: '.engi/prompt-completeness-proof.json',
      explainerKey: 'proof-closure',
      data: run.promptCompletenessProof,
      raw: branchFiles['.engi/prompt-completeness-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Inference synthesis family proof',
      subtitle: '.engi/inference-synthesis-proof.json',
      explainerKey: 'proof-closure',
      data: run.inferenceSynthesisProof,
      raw: branchFiles['.engi/inference-synthesis-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Code analysis / static heuristics registry',
      subtitle: '.engi/static-heuristics-registry.json',
      data: run.staticHeuristicsRegistry || run.codeAnalysisFactRegistry,
      raw: branchFiles['.engi/static-heuristics-registry.json'] || branchFiles['.engi/code-analysis-fact-registry.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-blue'
    },
    {
      title: 'Static measurement report',
      subtitle: '.engi/static-measurement-report.json',
      explainerKey: 'proof-closure',
      data: run.staticMeasurementReport,
      raw: branchFiles['.engi/static-measurement-report.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-blue'
    },
    {
      title: 'Verification receipts',
      subtitle: '.engi/verification-receipts.json',
      data: run.verificationReceipts,
      raw: branchFiles['.engi/verification-receipts.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-orange'
    },
    {
      title: 'Static code-analysis closure proof',
      subtitle: '.engi/static-measurement-proof.json',
      data: run.staticMeasurementProof,
      raw: branchFiles['.engi/static-measurement-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Verification decisions family proof',
      subtitle: '.engi/verification-decisions-proof.json',
      explainerKey: 'proof-closure',
      data: run.verificationDecisionsProof,
      raw: branchFiles['.engi/verification-decisions-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Materialization proof',
      subtitle: '.engi/materialization-proof.json',
      explainerKey: 'branch-materialization',
      data: run.materializationProof,
      raw: branchFiles['.engi/materialization-proof.json'],
      visual: renderMaterializationProofVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Materialization visibility proof',
      subtitle: '.engi/materialization-visibility-proof.json',
      explainerKey: 'branch-materialization',
      data: run.materializationVisibilityProof,
      raw: branchFiles['.engi/materialization-visibility-proof.json'],
      visual: renderMaterializationVisibilityVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Selection consistency proof',
      subtitle: '.engi/selection-consistency-proof.json',
      explainerKey: 'branch-materialization',
      data: run.selectionConsistencyProof,
      raw: branchFiles['.engi/selection-consistency-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Materialization exclusions',
      subtitle: '.engi/materialization-exclusions.json',
      explainerKey: 'branch-materialization',
      data: run.materializationExclusions,
      raw: branchFiles['.engi/materialization-exclusions.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-slate'
    },
    {
      title: 'Selection and materialization family proof',
      subtitle: '.engi/selection-and-materialization-proof.json',
      explainerKey: 'proof-closure',
      data: run.selectionAndMaterializationProof,
      raw: branchFiles['.engi/selection-and-materialization-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Authorization and sensitive-flow family proof',
      subtitle: '.engi/authorization-and-sensitive-flow-proof.json',
      explainerKey: 'proof-closure',
      data: run.authorizationAndSensitiveFlowProof,
      raw: branchFiles['.engi/authorization-and-sensitive-flow-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Projection policy',
      subtitle: '.engi/projection-policy.json',
      explainerKey: 'projection',
      data: run.projectionPolicy,
      raw: branchFiles['.engi/projection-policy.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-slate'
    },
    {
      title: 'Proof witness manifest',
      subtitle: '.engi/proof-witness-manifest.json',
      explainerKey: 'proof-closure',
      data: run.proofWitnessManifest,
      raw: branchFiles['.engi/proof-witness-manifest.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Scenario corpus manifest',
      subtitle: '.engi/scenario-fixture-manifest.json',
      data: run.scenarioFixtureManifest,
      raw: branchFiles['.engi/scenario-fixture-manifest.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-green'
    },
    {
      title: 'Test coverage report',
      subtitle: '.engi/test-coverage-report.json',
      data: run.testCoverageReport,
      raw: branchFiles['.engi/test-coverage-report.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-green'
    },
    {
      title: 'External boundary manifest',
      subtitle: '.engi/external-boundary-manifest.json',
      explainerKey: 'boundary-reality',
      data: run.externalBoundaryManifest,
      raw: branchFiles['.engi/external-boundary-manifest.json'],
      visual: renderExternalBoundaryManifestVisual,
      accent: 'accent-slate'
    },
    {
      title: 'External realization summary',
      subtitle: 'Projected V24 actuality and readiness summary',
      explainerKey: 'external-realization',
      data: run.externalRealizationSummary,
      raw: JSON.stringify(run.externalRealizationSummary || null, null, 2),
      visual: renderExternalRealizationSummaryVisual,
      accent: 'accent-slate'
    },
    {
      title: 'Unit catalog',
      subtitle: '.engi/unit-catalog.json',
      data: run.unitCatalog,
      raw: branchFiles['.engi/unit-catalog.json'],
      visual: renderUnitCatalogVisual,
      accent: 'accent-slate'
    },
    {
      title: 'Pipeline telemetry',
      subtitle: '.engi/pipeline-telemetry.json',
      data: run.pipelineTelemetry,
      raw: branchFiles['.engi/pipeline-telemetry.json'],
      visual: renderTelemetryVisual,
      accent: 'accent-slate'
    },
    {
      title: 'Selected source material manifest',
      subtitle: '.engi/selected-source-material.json',
      explainerKey: 'selected-source-material',
      data: tryParseJson(branchFiles['.engi/selected-source-material.json']) || run.selectedSourceMaterialManifest || {},
      raw: branchFiles['.engi/selected-source-material.json'],
      visual: renderSelectedSourceMaterialManifestVisual
    },
    {
      title: 'Deliverables manifest',
      subtitle: '.engi/deliverables.json',
      explainerKey: 'branch-artifacts',
      data: run.deliverablesManifest,
      raw: branchFiles['.engi/deliverables.json'],
      visual: surfaceVisualFallback
    },
    {
      title: 'Branch file inventory',
      subtitle: 'Materialized artifact paths',
      data: visibleFileInventory,
      raw: JSON.stringify(visibleFileInventory, null, 2),
      visual: (
        /**
         * @param {unknown[]} items
         * @returns {string}
         */
        (items) => `<div class="badge-row">${items.map((item) => `<span class="badge">${escapeHtml(item)}</span>`).join(' ')}</div>`
      )
    }
  ];

  branchArtifactsEl.innerHTML = `
    <div class="card intro-card">
      <div class="row wrap-gap">
        <strong>${escapeHtml(run.branchArtifacts.branchName)}</strong>
        <div class="badge-row">
          ${statusBadge(run.branchMode)}
          ${statusBadge(run.needLifecycle)}
          ${statusBadge(`projection ${activeProjectionPrincipal(state)}`)}
          <span class="badge private">${escapeHtml(run.branchArtifacts.confidentiality)}</span>
        </div>
      </div>
      <p class="meta">This is the artifact-heavy heart of the ${escapeHtml(canonOperatorLabel(state))} demo. The operating surfaces tell the story first, and this branch stack still carries the exact artifacts visible to the active projection behind that story.</p>
    </div>
    ${artifactDefs.filter((artifact) => hasSurfaceContent(artifact.data, artifact.raw)).map((artifact) => renderJsonSurface({
      title: artifact.title,
      subtitle: artifact.subtitle,
      eyebrow: 'Branch artifact',
      help: 'Visual mode is tuned for demo readability; Raw preserves the exact artifact JSON.',
      explainerKey: artifact.explainerKey,
      data: artifact.data,
      raw: artifact.raw,
      visual: artifact.visual,
      accent: artifact.accent || ''
    })).join('')}
    ${(branchFiles['ENGI_NEED.md'] || Object.keys(branchFiles).some((path) => path.startsWith('.engi/source-material/'))) ? `<div class="card">
      <div class="section-head"><h3>Materialized markdown artifacts</h3><span class="badge">Non-JSON reference</span></div>
      ${detailsSection('ENGI_NEED.md', `<pre>${escapeHtml(branchFiles['ENGI_NEED.md'] || '')}</pre>`, true)}
      ${Object.entries(branchFiles).filter(([path]) => path.startsWith('.engi/source-material/')).map(([path, content]) => detailsSection(path, `<pre>${escapeHtml(content)}</pre>`)).join('')}
    </div>` : ''}
  `;
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderSettlement(state) {
  const run = state.latestRun;
  if (!run) {
    settlementEl.innerHTML = '<div class="card"><p class="meta">No settlement has executed yet.</p></div>';
    return;
  }

  const branchFiles = run.branchArtifacts?.files || run.branchArtifacts?.publicFiles || {};
  const proofFamilyCatalog = run.systemProofBundle ? buildProofFamilyCatalogSummary(run.systemProofBundle) : null;
  const settlementSurfaces = [
    {
      title: 'Settlement preview',
      subtitle: '.engi/settlement-preview.json',
      eyebrow: 'Settlement artifact',
      help: 'Visual mode calls out bundle identity, lock binding, participating assets, and allocation preview.',
      explainerKey: 'settlement',
      data: run.settlementPreview,
      raw: branchFiles['.engi/settlement-preview.json'],
      visual: renderSettlementPreviewVisual,
      accent: 'accent-green'
    },
    {
      title: 'Source-to-shares chain',
      subtitle: '.engi/source-to-shares.json',
      eyebrow: 'Accounting artifact',
      help: 'This is the explicit path from source contribution basis to raw share basis points, including clipping receipts and normalization order.',
      explainerKey: 'source-to-shares',
      data: run.sourceToSharesArtifact,
      raw: branchFiles['.engi/source-to-shares.json'],
      visual: renderSourceToSharesVisual,
      accent: 'accent-green'
    },
    {
      title: 'Settlement participation',
      subtitle: '.engi/settlement-participation.json',
      eyebrow: 'Accounting artifact',
      help: 'Every evaluated asset is classified as selected, settlement-participating, credited, zero-credit participating, or excluded.',
      explainerKey: 'settlement-participation',
      data: run.settlementParticipationArtifact,
      raw: branchFiles['.engi/settlement-participation.json'],
      visual: renderSettlementParticipationVisual,
      accent: 'accent-green'
    },
    {
      title: 'Journal diff',
      subtitle: '.engi/journal-diff.json',
      eyebrow: 'Accounting artifact',
      help: 'The visual read emphasizes exact accounting invariants and the debit/credit structure before you dive into raw JSON.',
      explainerKey: 'journal-diff',
      data: run.journalDiff,
      raw: branchFiles['.engi/journal-diff.json'],
      visual: renderJournalDiffVisual,
      accent: 'accent-green'
    },
    {
      title: 'Accounting precision report',
      subtitle: '.engi/accounting-precision-report.json',
      eyebrow: 'Accounting artifact',
      help: 'The canonical system keeps exact accounting replayable while making settlement read as the final operational stage rather than a side artifact.',
      explainerKey: 'exact-accounting',
      data: run.accountingPrecisionReport,
      raw: branchFiles['.engi/accounting-precision-report.json'],
      visual: renderAccountingPrecisionVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Settlement proof',
      subtitle: '.engi/settlement-proof.json',
      eyebrow: 'Proof artifact',
      explainerKey: 'proof-closure',
      data: tryParseJson(branchFiles['.engi/settlement-proof.json']) || run.systemProofBundle?.settlementProof || {},
      raw: branchFiles['.engi/settlement-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Proof family catalog',
      subtitle: 'Proof-family closure, witness, and replay inventory',
      eyebrow: 'Proof bundle',
      explainerKey: 'proof-closure',
      data: proofFamilyCatalog,
      raw: proofFamilyCatalog ? JSON.stringify(proofFamilyCatalog, null, 2) : null,
      visual: renderProofFamilyCatalogVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Proof contract',
      subtitle: '.engi/proof-contract.json',
      eyebrow: 'Proof artifact',
      explainerKey: 'proof-closure',
      data: run.proofContract,
      raw: branchFiles['.engi/proof-contract.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'System proof bundle',
      subtitle: '.engi/system-proof-bundle.json',
      eyebrow: 'Proof bundle',
      help: 'Visual mode summarizes selection, authorization, disclosure, and settlement closure without hiding the exact proof graph.',
      explainerKey: 'proof-closure',
      data: run.systemProofBundle,
      raw: branchFiles['.engi/system-proof-bundle.json'],
      visual: renderSystemProofBundleVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Bounded public proof',
      subtitle: 'Redacted proof surface',
      eyebrow: 'Public proof metadata',
      explainerKey: 'bounded-public-proof',
      data: run.boundedPublicProof,
      visual: renderBoundedProofVisual,
      accent: 'accent-slate'
    },
    {
      title: 'Redaction proof',
      subtitle: '.engi/redaction-proof.json',
      eyebrow: 'Proof artifact',
      explainerKey: 'bounded-public-proof',
      data: run.redactionProof,
      raw: branchFiles['.engi/redaction-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Disclosure proof',
      subtitle: '.engi/disclosure-proof.json',
      eyebrow: 'Proof artifact',
      explainerKey: 'bounded-public-proof',
      data: run.disclosureProof,
      raw: branchFiles['.engi/disclosure-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Settlement source-to-shares family proof',
      subtitle: '.engi/settlement-source-to-shares-proof.json',
      eyebrow: 'Proof artifact',
      explainerKey: 'proof-closure',
      data: run.settlementSourceToSharesProof,
      raw: branchFiles['.engi/settlement-source-to-shares-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Disclosure boundary family proof',
      subtitle: '.engi/disclosure-boundary-proof.json',
      eyebrow: 'Proof artifact',
      explainerKey: 'proof-closure',
      data: run.disclosureBoundaryProof,
      raw: branchFiles['.engi/disclosure-boundary-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    }
  ];

  settlementEl.innerHTML = settlementSurfaces
    .filter((surface) => hasSurfaceContent(surface.data, surface.raw))
    .map((surface) => renderJsonSurface(surface))
    .join('');
}

/**
 * @param {AppState} state
 * @returns {void}
 */
function renderLedger(state) {
  ledgerEl.innerHTML = `
    ${renderJsonSurface({
      title: 'Ledger accounts',
      subtitle: 'Current balances after the latest settlement',
      eyebrow: 'Ledger surface',
      explainerKey: 'ledger-accounts',
      data: state.ledger?.accounts || {},
      visual: renderLedgerAccountsVisual,
      accent: 'accent-slate'
    })}
    ${renderJsonSurface({
      title: 'Run history',
      subtitle: 'Public projection of prior runs',
      eyebrow: 'History surface',
      explainerKey: 'run-history',
      data: state.runHistory || [],
      visual: renderRunHistoryVisual,
      accent: 'accent-slate'
    })}
  `;
}

/**
 * @returns {Promise<AppState>}
 */
async function refresh() {
  surfaceCounter = 0;
  const principal = encodeURIComponent(activeProjectionPrincipal(lastLoadedState));
  const state = /** @type {AppState} */ (await api(`/api/state?principal=${principal}`));
  projectionPickerEl.value = activeProjectionPrincipal(state);
  lastLoadedState = state;
  renderCanonPosture(state);
  syncScenarioPicker(state);
  syncBranchModePicker(state);
  syncAuthSessionPicker(state);
  syncInventoryKindFilter(state);
  renderRepoInventory(state);
  renderSummary(state);
  renderOperatingPicture(state);
  renderScenario(state);
  renderAssets(state);
  renderFit(state);
  renderEvaluations(state);
  renderBranchArtifacts(state);
  renderSettlement(state);
  renderLedger(state);
  decorateStaticExplainers();
  syncExplainerAlignment();
  renderTutorialOverlay(state);
  return state;
}

document.addEventListener('click', (event) => {
  const toggle = closestElement(event.target, '.surface-mode-button');
  if (!toggle) return;
  const surfaceTarget = toggle.dataset['surfaceTarget'];
  if (!surfaceTarget) return;
  const target = document.getElementById(surfaceTarget);
  if (!target) return;
  const mode = toggle.dataset['mode'];
  if (!mode) return;
  target.dataset['mode'] = mode;
  target.querySelectorAll('.surface-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.classList.contains(`surface-panel-${mode}`));
  });
  if (!(toggle.parentElement instanceof HTMLElement)) return;
  toggle.parentElement.querySelectorAll('.surface-mode-button').forEach((button) => {
    const selected = button === toggle;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
  });
});

makeBranchButtonEl.addEventListener('click', async () => {
  try {
    setStatus('Measuring need, resolving the active deposit/need profile, staging branch artifacts, and settling journal diff…');
    const result = /** @type {AppState} */ (await api('/api/make-engi-branch', {
      method: 'POST',
      body: JSON.stringify({
        principal: activeProjectionPrincipal(lastLoadedState),
        scenarioId: selectedScenarioId || scenarioPickerEl?.value || undefined,
        branchMode: activeBranchMode(lastLoadedState)
      })
    }));
    const latestRun = result.latestRun;
    await refresh();
    setStatus(`Created ${latestRun?.branchName || latestRun?.branchArtifacts?.branchName} in ${latestRun?.realizationProfile?.shortLabel || 'the selected profile'} and settled bundle ${latestRun?.boundedPublicProof?.bundleId || latestRun?.journalDiff?.bundleId}.`);
  } catch (error) {
    setStatus(errorMessage(error));
  }
});

projectionPickerEl?.addEventListener('change', async () => {
  selectedProjectionPrincipal = projectionPickerEl.value || 'buyer';
  try {
    await refresh();
    setStatus(`Viewing ${selectedProjectionPrincipal} projection.`);
  } catch (error) {
    setStatus(errorMessage(error));
  }
});

branchModePickerEl?.addEventListener('change', () => {
  selectedBranchMode = branchModePickerEl.value || 'patch';
  if (lastLoadedState) {
    renderSummary(lastLoadedState);
    renderOperatingPicture(lastLoadedState);
    renderFit(lastLoadedState);
    decorateStaticExplainers();
    syncExplainerAlignment();
    renderTutorialOverlay(lastLoadedState);
  }
  setStatus(`Selected branch mode ${selectedBranchMode}.`);
});

scenarioPickerEl?.addEventListener('change', () => {
  selectedScenarioId = scenarioPickerEl.value;
  if (lastLoadedState) {
    syncAuthSessionPicker(lastLoadedState);
    syncInventoryKindFilter(lastLoadedState);
    renderRepoInventory(lastLoadedState);
    renderSummary(lastLoadedState);
    renderOperatingPicture(lastLoadedState);
    renderScenario(lastLoadedState);
    renderAssets(lastLoadedState);
    renderFit(lastLoadedState);
    decorateStaticExplainers();
    syncExplainerAlignment();
    renderTutorialOverlay(lastLoadedState);
  }
  const selectedScenario = lastLoadedState?.needScenarios?.find((entry) => entry.scenarioId === selectedScenarioId);
  setStatus(`Selected scenario ${selectedScenarioId} (${selectedScenario?.realizationProfile?.shortLabel || 'profile pending'}).`);
});

authSessionPickerEl?.addEventListener('change', () => {
  selectedAuthSessionId = authSessionPickerEl.value;
  if (lastLoadedState) {
    syncInventoryKindFilter(lastLoadedState);
    renderRepoInventory(lastLoadedState);
    renderSummary(lastLoadedState);
    renderOperatingPicture(lastLoadedState);
    renderAssets(lastLoadedState);
    renderFit(lastLoadedState);
    decorateStaticExplainers();
    syncExplainerAlignment();
    renderTutorialOverlay(lastLoadedState);
  }
  setStatus(`Bound intake to authenticated repo session ${selectedAuthSessionId}.`);
});

inventoryKindFilterEl?.addEventListener('change', () => {
  selectedInventoryKind = inventoryKindFilterEl.value;
  if (lastLoadedState) {
    renderRepoInventory(lastLoadedState);
    decorateStaticExplainers();
    syncExplainerAlignment();
    renderTutorialOverlay(lastLoadedState);
  }
});

inventorySearchInputEl?.addEventListener('input', () => {
  inventorySearchTerm = inventorySearchInputEl.value || '';
  if (lastLoadedState) {
    renderRepoInventory(lastLoadedState);
    decorateStaticExplainers();
    syncExplainerAlignment();
    renderTutorialOverlay(lastLoadedState);
  }
});

resetButtonEl.addEventListener('click', async () => {
  try {
    selectedInventoryEntryIds = new Set();
    await api('/api/reset', { method: 'POST', body: '{}' });
    await refresh();
    setStatus(`Demo reset to the seeded ${canonOperatorLabel(lastLoadedState)} scenario state.`);
  } catch (error) {
    setStatus(errorMessage(error));
  }
});

document.addEventListener('click', (event) => {
  const inventoryCard = closestElement(event.target, '[data-inventory-entry-id]');
  if (!inventoryCard) return;
  const entryId = inventoryCard.dataset['inventoryEntryId'];
  if (!entryId) return;
  if (selectedInventoryEntryIds.has(entryId)) selectedInventoryEntryIds.delete(entryId);
  else selectedInventoryEntryIds.add(entryId);
  if (lastLoadedState) {
    renderRepoInventory(lastLoadedState);
    renderSummary(lastLoadedState);
    renderOperatingPicture(lastLoadedState);
    renderAssets(lastLoadedState);
    renderFit(lastLoadedState);
    decorateStaticExplainers();
    syncExplainerAlignment();
    renderTutorialOverlay(lastLoadedState);
  }
});

tutorialToggleButtonEl.addEventListener('click', () => {
  if (tutorialOpen) closeTutorial();
  else openTutorial({ scrollTarget: true });
});

tutorialPrevButtonEl.addEventListener('click', () => {
  if (!tutorialOpen || tutorialStepIndex === 0) return;
  tutorialStepIndex -= 1;
  renderTutorialOverlay(lastLoadedState, { scrollTarget: true });
});

tutorialNextButtonEl.addEventListener('click', () => {
  if (!tutorialOpen || !lastLoadedState) return;
  const steps = tutorialSteps(lastLoadedState);
  if (tutorialStepIndex >= steps.length - 1) {
    closeTutorial();
    return;
  }
  tutorialStepIndex += 1;
  renderTutorialOverlay(lastLoadedState, { scrollTarget: true });
});

tutorialCloseButtonEl.addEventListener('click', () => closeTutorial());

document.addEventListener('keydown', (event) => {
  if (!tutorialOpen) return;
  if (event.key === 'Escape') {
    closeTutorial();
    return;
  }
  if (event.key === 'ArrowLeft' && tutorialStepIndex > 0) {
    tutorialStepIndex -= 1;
    renderTutorialOverlay(lastLoadedState, { scrollTarget: true });
    return;
  }
  if (event.key === 'ArrowRight') {
    const steps = tutorialSteps(lastLoadedState);
    if (tutorialStepIndex >= steps.length - 1) {
      closeTutorial();
      return;
    }
    tutorialStepIndex += 1;
    renderTutorialOverlay(lastLoadedState, { scrollTarget: true });
  }
});

depositFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formEl = /** @type {HTMLFormElement} */ (event.currentTarget);
  const form = new FormData(formEl);
  try {
    await api('/api/deposits', {
      method: 'POST',
      body: JSON.stringify({
        title: form.get('title'),
        author: form.get('author'),
        artifactKind: form.get('artifactKind'),
        artifactType: form.get('artifactType'),
        authSessionId: authSessionPickerEl?.value || form.get('authSessionId'),
        inventoryEntryIds: [...selectedInventoryEntryIds],
        sourceRepo: form.get('sourceRepo'),
        sourceCommit: form.get('sourceCommit'),
        workflowRunId: form.get('workflowRunId'),
        signerAddress: form.get('signerAddress'),
        visualPreview: form.get('visualPreview'),
        operatorNote: form.get('operatorNote'),
        tags: String(form.get('tags') || '').split(',').map((entry) => entry.trim()).filter(Boolean),
        content: form.get('content')
      })
    });
    selectedInventoryEntryIds = new Set();
    inventorySearchTerm = '';
    selectedInventoryKind = 'all';
    formEl.reset();
    await refresh();
    setStatus(`Candidate asset deposited into the ${canonOperatorLabel(lastLoadedState)} repo-authenticated flow. Re-run “Make ENGI branch” to see whether it sharpens a bounded need or broadens normalization for a composite one.`);
  } catch (error) {
    setStatus(errorMessage(error));
  }
});

decorateStaticExplainers();
syncExplainerAlignment();
window.addEventListener('resize', () => {
  syncExplainerAlignment();
  renderTutorialOverlay(lastLoadedState);
});

refresh().then(() => {
  syncExplainerAlignment();
  setStatus(`Ready. Start from repo supply, choose a scenario profile, deposit authenticated repo artifacts or use raw fallback, then run “Make ENGI branch” to execute the ${canonOperatorLabel(lastLoadedState)} deposit-to-need closure path. Inherited surfaces: ${inheritedCanonSurfaceLabel(lastLoadedState)}. Artifact surfaces default to Visual mode and can flip to Raw JSON at any time.`);
}).catch((error) => {
  document.body.innerHTML = `<pre>${escapeHtml(error.message)}</pre>`;
});
