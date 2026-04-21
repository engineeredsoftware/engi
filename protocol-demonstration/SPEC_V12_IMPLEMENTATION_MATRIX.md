# Spec V12 Implementation Matrix

## Status
- Repo: `protocol-demonstration`
- Spec draft target: `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V12.md`
- Historical root pointer at authoring time remained on: `V11`
- Baseline preserved: V11 is complete and remains in place
- V12 is a demonstration-purpose pass first, not a broad system-repair pass

## Purpose

This file is the authoritative V12 implementation-driving matrix for the local Bitcode package realization.

It translates the V12 demonstration charter into concrete repo work while preserving the now-strong core system shape from V11.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V11.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V11_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V12.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V12_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/SPEC_V11_IMPLEMENTATION_MATRIX.md`
- current `protocol-demonstration` implementation and UI

---

## V12 closure map

| Area | Current V11 state | V12 target | Priority |
|---|---|---|---|
| Depositing | strong repo-bound intake and inventory selection | deposit becomes the first-class opening operator action | P0 |
| Needing | strong measured-need surfaces | need becomes the first-class demand surface in the shell | P0 |
| Deposit-to-need fit | mostly inferable through existing surfaces | explicit fit surface shown before deep artifacts | P0 |
| Profile meaning | targeted vs normalization distinction is present | profile distinction becomes obvious from deposit/need/closure shape | P0 |
| Artifact-kind-native UX | improved but still mixed in general panels | kinds feel distinctly native in summaries and interactions | P1 |
| Identity/auth spine | strong and explicit | remains present but reads faster and more inevitably in-demo | P1 |
| Proof/settlement placement | strong and explicit | demonstrated as consequence/closure rather than early explanation burden | P1 |
| Boundary realism | honest and explicit | stays explicit but moves further into supporting role | P2 |

---

## Current first-pass source truth

The first real V12 implementation pass now lands these concrete repo facts:
- `src/bitcode-demo.js` emits `depositingSurface`, `needingSurface`, and `depositingToNeedingSurface` on `latestRun`
- the same V12 surfaces are emitted as branch artifacts:
  - `.bitcode/depositing-surface.json`
  - `.bitcode/needing-surface.json`
  - `.bitcode/depositing-to-needing-surface.json`
- `publicState()` now exposes a `needingSurface` per seeded scenario so the shell can foreground need before a run
- the repo-to-settlement stage order now starts:
  1. depositing
  2. needing
  3. deposit-to-need fit
- the browser shell now orders its main operator panels as:
  1. depositing
  2. needing
  3. deposit-to-need fit
  4. ranked candidates / verification
  5. branch artifacts
  6. settlement
  7. ledger / policy

This is the current implementation truth for the first V12 source/UI/test pass.

---

## Keep-together rule

For V12 in this repo:
- keep the demo mostly together,
- preserve the V11 operating surfaces,
- improve operator ordering and interaction quality before introducing new structural churn.

---

## Phase 1 — depositing foregrounding

### Goal
Make depositing the obvious beginning of the Bitcode story.

### Required changes
- foreground deposit mode in the shell
- surface selected deposit shape before deep inventory details
- summarize artifact-kind mix at the moment of deposit
- make deposit intent feel operator-driven, not form-driven

### Acceptance
- a user can explain what was deposited and why before opening raw artifacts

---

## Phase 2 — needing foregrounding

### Goal
Make needing feel like measured demand rather than background parser metadata.

### Required changes
- foreground task/failure/closure summaries in the shell
- make boundedness/compositeness obvious in the active profile
- render target artifact kinds and closure criteria as need-facing summaries

### Acceptance
- a user can explain what is needed and why before reading branch artifacts

---

## Phase 3 — depositing-to-needing fit surface

### Goal
Explicitly show why the current deposit matches the current need.

### Required changes
- add a depositing-to-needing fit surface to `src/bitcode-demo.js`
- project it into the main operator view
- summarize decisive kinds, overlap kinds, normalization pressure, and closure intent

### Acceptance
- the fit between supply and demand is directly visible before branch/proof inspection

---

## Phase 4 — profile A/B demonstration clarity

### Goal
Make the two profiles read as two different demonstration shapes, not as alternate labels.

### Required changes
- strengthen UI summaries for Profile A vs Profile B
- tie them explicitly to deposit mode, need mode, asset-pack shape, and settlement shape
- keep local/remote boundary truth secondary to this explanation

### Acceptance
- a viewer can describe why the current run is Profile A or Profile B in operational terms

---

## Phase 5 — artifact-kind-native summaries

### Goal
Make artifact kinds feel distinctly native in the demo.

### Required changes
- improve kind-specific summaries and preview framing
- make mixed bundles reveal their internal kind composition clearly
- make proof/patch/config/runbook/incident-note/benchmark-output affordances feel less generic

### Acceptance
- artifact kinds do not all feel like the same UI with different labels

---

## Phase 6 — proof and settlement downstream placement

### Goal
Keep proof and settlement strong while making them feel like closure.

### Required changes
- preserve proof and settlement richness
- adjust the shell and ordering so they land after deposit/need/fit are already understood
- keep source-to-shares strong where normalization-heavy profiles require it

### Acceptance
- proof and settlement read as necessary consequences, not as explanatory burden upfront

---

## Phase 7 — tests

### Goal
Keep V12 demonstrational improvements ratified.

### Required tests
- depositing-first shell assertions
- needing-first summary assertions
- deposit-to-need fit surface presence and coherence
- profile distinction assertions tied to deposit/need semantics
- artifact-kind-native summary assertions where testable
- preservation of green branch/proof/settlement behavior

### Acceptance
- `npm test` remains green throughout V12 work

---

## First V12 landing criteria

The first V12 pass is successful if:
1. V12 docs exist and are coherent,
2. depositing and needing are visibly foregrounded,
3. deposit-to-need fit is explicit,
4. profile A/B distinction is more intuitively demonstrational,
5. the demo feels more thesis-complete without reopening the system core,
6. tests pass.
