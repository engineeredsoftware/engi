# Spec V11 Implementation Matrix

## Status
- Repo: `packages/bitcode`
- Spec draft target: `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V11.md`
- Historical root pointer at authoring time remained on: `V8`
- Baseline preserved: V10 is complete and remains in place
- This matrix is intended to track the **current V11 worktree truth**, not just the original V11 plan.
- Current first-pass closure status in the V11 worktree:
  - repo supply surface: implemented
  - operational profile distinction by deposit mode and need mode: implemented
  - repo-to-settlement surface: implemented
  - identity/auth spine surface: implemented
  - boundary reality surface: implemented
  - V11 UI recentering around operational flow: implemented
  - live GitHub/network effects: explicitly still external

## Purpose

This file is the authoritative V11 implementation-driving matrix for the local Bitcode package realization.

It translates the V11 audit into concrete repo work without forcing a broad redesign.
It also serves as the current-source sync document for the active V11 worktree so the spec/docs layer stays aligned with implementation as the pass evolves.

## Audit basis

This matrix is grounded in:

- `/Users/garrettmaring/Developer/ENGI/BITCODE_V11_PREP_MEMO.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V10.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V10_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V11.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V11_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/src/bitcode-demo.js`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/server.js`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/public/index.html`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/test/api.test.js`

---

## Current worktree implementation refs

The current V11 worktree already exposes these first-pass surfaces directly:

- `repoSupplySurface`
  - built in `src/bitcode-demo.js`
  - projected from `publicState(...)`
  - rendered in `public/app.js`
  - covered in API/core tests
- `repoToSettlementSurface`
  - built in `src/bitcode-demo.js`
  - attached to `latestRun`
  - projected into public/reviewer outputs
  - rendered in `public/app.js`
  - covered in API/core tests
- `identityAuthSpineSurface`
  - built in `src/bitcode-demo.js`
  - attached to `latestRun`
  - projected into richer outputs
  - rendered in `public/app.js`
  - covered in core tests
- `boundaryRealitySurface`
  - built in `src/bitcode-demo.js`
  - projected from `publicState(...)`
  - rendered in `public/app.js`
  - covered in API/core tests
- V11 shell recentering
  - `public/index.html`
  - `public/app.js`
  - V11 copy assertions in `test/api.test.js`

## Current profile truth

The current V11 worktree now treats the two profiles as operational demo profiles:

- Profile A = targeted deposit against a bounded need
- Profile B = normalization-heavy deposit against a composite need

The local/external honesty story remains explicit,
but it now lives in:

- `boundaryRealitySurface`
- `githubBoundarySurface`
- `externalBoundaryManifest`

rather than being the main headline difference between Profile A and Profile B.

## V11 closure map

| Area | Current V10 state | V11 target | Priority |
|---|---|---|---|
| Repo supply | inventory exists as seeded entries | repo-level supply summary tied to auth session, scenario, kind, and origin | P0 |
| Artifact-kind parity | kinds are explicit per entry and asset | kinds are legible as first-class supply categories | P0 |
| Repo-to-settlement path | end-to-end path exists across panels | explicit stage-by-stage flow from repo selection to settlement | P0 |
| Demo profiles | local-vs-external framing dominates | profiles distinguish targeted deposit / bounded need vs normalization deposit / composite need | P0 |
| Identity/auth | precise but dispersed surfaces | one coherent identity/auth spine with authority handoff | P0 |
| Boundary honesty | explicit but mostly buried in artifacts | concise boundary reality surface near the main flow | P1 |
| Demo UX shape | detail-first / inspect-y | operational summary first, deep artifacts still available | P1 |

---

## Keep-together rule

For V11 in this repo:

- keep the demo mostly together,
- extend `src/bitcode-demo.js` coherently,
- update the existing app shell rather than rebuilding it,
- add only the smallest extra structures necessary to surface repo supply, flow, identity/auth, and boundaries clearly.

---

## Phase 1 — repo supply surface

### Current worktree state
Already implemented in the active V11 worktree and visible in projections/UI/tests.

### Goal

Expose repo supply as a first-class authenticated surface rather than only a list of entries.

### Required changes

In `src/bitcode-demo.js`:

- derive a repo supply surface from seeded sessions, inventory, and scenarios
- include artifact-kind and origin-kind counts
- expose dominant stacks and constraints per repo
- expose profile coverage so repo supply hints whether the repo is better for targeted deposit or normalization-heavy runs

In `public/app.js`:

- render the repo supply surface near the top of the demo
- keep the current per-entry inventory list as the detailed selection surface

### Acceptance

- the operator can understand repo supply before reading individual inventory cards
- artifact-kind parity is obvious at repo scope

---

## Phase 2 — repo-to-settlement surface

### Current worktree state
Already implemented in the active V11 worktree and surfaced on `latestRun`, in projections, in the V11 shell, and in tests.

### Goal

Make the repo selection -> need -> asset -> branch -> proof -> settlement path explicit.

### Required changes

In `src/bitcode-demo.js`:

- derive a repo-to-settlement surface from the latest run
- classify each stage as modeled-local, executed-local, or external-required
- attach the active deposit mode and need mode to the surface so the profile meaning is visible in the main flow

In `public/app.js`:

- render the flow as the main operating story

### Acceptance

- the operator can understand the end-to-end flow without first opening deep JSON artifacts

---

## Phase 3 — identity/auth spine

### Current worktree state
Already implemented in the active V11 worktree and visible as an operator-facing sequence rather than only dispersed identity/auth artifacts.

### Goal

Make identity/auth read as the system backbone.

### Required changes

In `src/bitcode-demo.js`:

- derive an identity/auth spine from buyer bindings, GitHub session bindings, signer attestations, authorization, proof, and settlement surfaces

In `public/app.js`:

- render the identity/auth spine as one operator-readable sequence

### Acceptance

- repo auth, signer attestation, branch authority, proof authority, and settlement authority are visibly connected

---

## Phase 4 — boundary reality surface

### Current worktree state
Already implemented in the active V11 worktree and used to distinguish modeled-local, executed-local, and still-external requirements near the main operating story.

### Goal

Make local-vs-remote realism simpler and more prominent.

Important refinement:
boundary surfaces should explain local versus external truth without being mistaken for the main profile distinction.

### Required changes

In `src/bitcode-demo.js`:

- derive a boundary reality surface that separates:
  - modeled local structure,
  - executed local effects,
  - external production-required interfaces

In `public/app.js`:

- render this surface near the main flow and identity spine

### Acceptance

- the demo stays honest without feeling incomplete or evasive

---

## Phase 5 — UI recentering

### Current worktree state
Already underway in the active V11 worktree: the shell now foregrounds repo supply, the repo-to-settlement path, identity/auth spine, and boundary reality ahead of deep artifact inspection.

### Goal

Make the V11 shell read operationally first and inspectably second.

### Required changes

In `public/index.html` and `public/app.js`:

- update hero, section framing, and top-level summaries to V11 language
- place repo supply and operating surfaces ahead of deep artifacts
- preserve the existing detailed artifact and proof inspection capability

### Acceptance

- the V11 shell feels like an operator control plane for a deterministic local prototype

---

## Phase 6 — tests

### Current worktree state
Tests have already been updated in the V11 worktree to cover repo supply, the repo-to-settlement path, the identity/auth spine, boundary reality, and V11 shell copy. The remaining requirement is to keep the suite green as the pass finishes.

### Required tests

Add or update tests for:

1. repo supply surface presence and repo-level counts
2. repo-to-settlement surface presence on latest run
3. identity/auth spine presence and stage coverage
4. boundary reality surface presence and stage classification
5. V11 UI shell rendering updated copy

### Acceptance

- `node --test` passes in `packages/bitcode`

---

## First-pass landing criteria

The first V11 pass is successful if:

1. V11 docs exist and match implementation direction
2. repo supply is visible as a first-class surface
3. the repo-to-settlement path is visible as a first-class surface
4. identity/auth reads as a coherent spine
5. local/remote boundary realism is easier to understand
6. tests pass

## What landed in this first V11 pass

This pass landed:

- `repoSupplySurface` in the public state model,
- `repoToSettlementSurface` and `identityAuthSpineSurface` in the latest run model,
- `boundaryRealitySurface` in the public state model,
- V11 operator framing in `public/index.html` and `public/app.js`,
- updated V11 tests for public state, latest run surfaces, and UI shell copy,
- a lazy HTTP import path in `server.js` so API tests can run cleanly in this sandboxed environment.

---

## Work left after the first V11 pass

Expected next items after this pass:

- live GitHub inventory refresh
- installation-token exchange
- richer permission-specific authorization decisions
- live branch and PR actions
- stronger signer/org verification
- network-backed settlement
