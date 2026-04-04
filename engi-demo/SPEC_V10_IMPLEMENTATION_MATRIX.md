# Spec V10 Implementation Matrix

## Status
- Repo: `engi-demo`
- Spec draft target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V10.md`
- Canonical pointer remains: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V8`
- Baseline preserved: V9 is complete and remains in place
- Current first-pass closure status:
  - modeled GitHub App sessions: implemented
  - seeded repo artifact inventory: implemented
  - selection-first intake UX: implemented
  - V10 selection/addressing/signing/GitHub App auth asset surfaces: implemented
  - stronger identity/auth proof checks for inventory-backed selections: implemented
  - live GitHub auth/network effects: explicitly still external

## Purpose

This file is the authoritative V10 implementation-driving matrix for the local ENGI demo.

It translates the V10 audit into concrete repo work without forcing a broad redesign.

## Audit basis

This matrix is grounded in:

- `/Users/garrettmaring/Developer/ENGI/ENGI_V10_PREP_MEMO.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V9.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V10.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V10_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/server.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/index.html`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/api.test.js`

---

## V10 closure map

| Area | Current V9 state | V10 target | Priority |
|---|---|---|---|
| Artifact intake UX | raw form + textarea dominates | selection-first intake from authenticated repo artifact inventory | P0 |
| Artifact-kind coverage | kinds exist in metadata, but not equally at intake time | all artifact kinds represented in inventory and selection surfaces | P0 |
| Addressing surface | repo/commit/run data spread across metadata | explicit addressing surface on selected assets/manifests | P0 |
| Signing surface | mostly signer address + attestation booleans | explicit signing surface with payload/signature semantics | P0 |
| GitHub App auth payload | installation id present but shallow | explicit installation-scoped GitHub App auth surface | P0 |
| Identity/auth proof | principals visible, but cluster not fully bound | proof/bindings include addressing + signing + installation-scoped auth | P1 |
| Profile A boundary honesty | external boundary described | modeled-vs-live boundary remains explicit while local surfaces get stronger | P1 |

---

## Keep-together rule

For V10 in this repo:

- keep the demo mostly together,
- extend `src/engi-demo.js` coherently,
- update the existing app shell rather than rebuilding it,
- add only the smallest extra structures necessary for repo inventory and auth payload clarity.

---

## Phase 1 — repo-authenticated artifact inventory

### Goal

Introduce local modeled authenticated repo sessions and seeded repo artifact inventory.

### Required changes

In `src/engi-demo.js`:

- seed repo auth sessions
- seed repo artifact inventory entries spanning multiple artifact kinds
- expose those surfaces through state/public state

### Acceptance

- the demo exposes repo-bound inventory data before any new deposit occurs
- inventory entries carry enough repo/workflow/file metadata to support selection provenance

---

## Phase 2 — selection-first deposit flow

### Goal

Upgrade deposit from raw textarea-first to selection-first.

### Required changes

In `public/index.html` and `public/app.js`:

- add authenticated repo/session picker
- add repo artifact inventory list/filter/selection UI
- keep raw/operator note fallback, but not as the only path

In `server.js`:

- allow deposits driven by selected inventory entries
- derive coherent payloads when inventory selection is used

### Acceptance

- a user can create a candidate asset from selected repo inventory entries without requiring a raw pasted payload
- raw fallback remains available and explicit

---

## Phase 3 — explicit address/signing/GitHub App auth surfaces

### Goal

Finalize the V10 identity/auth cluster on candidate assets and manifests.

### Required changes

In `src/engi-demo.js`:

- add artifact selection surface
- add addressing surface
- add signing surface
- add GitHub App auth surface
- thread them through candidate asset construction and public projections

### Acceptance

- selected assets expose the full cluster clearly
- installation id is part of the GitHub App auth surface
- address and signing are separate named surfaces

---

## Phase 4 — identity/auth proof and manifest strengthening

### Goal

Make the stronger auth payload shape visible in manifests and proofs.

### Required changes

In `src/engi-demo.js`:

- enrich identity bindings for installation-scoped auth principals where appropriate
- strengthen identity/auth proof checks
- enrich artifact upload manifest and GitHub boundary surface with V10 auth data

### Acceptance

- identity/auth proof no longer depends only on loose signer/buyer strings
- branch-facing manifests preserve selected inventory refs and auth payload structure

---

## Phase 5 — tests

### Required tests

Add or update tests for:

1. inventory-backed deposit without required raw textarea content
2. V10 auth session and repo inventory presence in public state
3. candidate asset carries selection/addressing/signing/GitHub App auth surfaces
4. identity/auth proof includes installation-scoped/auth-cluster checks
5. V10 UI shell renders the new selection-first language

### Acceptance

- `node --test` passes in `engi-demo`

---

## First-pass landing criteria

The first V10 pass is successful if:

1. V10 docs exist and match implementation direction
2. the intake UX is no longer effectively textarea-first
3. repo-bound artifact inventory is visible and usable
4. selected assets carry explicit address/signing/GitHub App auth surfaces
5. tests pass

---

## Work left after the first V10 pass

Expected next items after this pass:

- live GitHub inventory fetch
- installation-token exchange
- richer permission-specific authorization decisions
- live PR/branch delivery actions
- stronger signer/org verification
