# ENGI Spec V11 Notes

## What V11 changes relative to V10

V11 is not a repudiation of V10.
It is a system-shape upgrade.

V10 made repo-bound intake and identity/auth payload structure explicit.
V11 makes those surfaces feel native and operational.

## The most important V11 shift

The key shift is:

- from inspectable boundary surfaces
- to an explicit operating picture

That means:

- repo supply is summarized as first-class system input,
- artifact kinds read as supply categories,
- identity/auth reads as one coherent spine,
- local-vs-remote reality is legible near the flow,
- the repo-to-settlement path from repo selection to settlement stages itself.

## Why this matters

ENGI claims:

- authenticated repo-bound intake,
- proof-bearing asset selection,
- authority-aware branch materialization,
- bounded public proof,
- and exact settlement.

If the demo only proves those claims in many separate artifacts, the system still feels assembled.
V11 fixes that mismatch.

## Naming cleanup V11 prefers

Prefer these names:

- repo supply surface
- repo-to-settlement surface
- identity/auth spine
- boundary reality surface

Keep the V10 names too where they remain precise:

- artifact selection surface
- addressing surface
- signing surface
- GitHub App auth surface

V11 adds composition.
It does not collapse the precise V10 surfaces into vague umbrellas.

## Local demo truthing

The V11 local demo now supports both demo profiles inside the same honest local prototype:

- Profile A is targeted deposit against a bounded need.
- Profile B is normalization-heavy deposit against a composite need.

The important rule is still honesty:

- seeded repo supply must read as seeded,
- modeled GitHub App auth must read as modeled,
- executed local branch/proof/settlement effects must read as local execution,
- live GitHub/network effects must remain external.

That honesty now belongs primarily in the boundary reality, GitHub boundary, and external boundary surfaces.
It should not be the main headline difference between Profile A and Profile B.

## Likely first V11 implementation slice

The highest-value first slice is:

1. repo supply summary above entry-by-entry selection,
2. repo-to-settlement surface across the whole operator path,
3. identity/auth spine surface across auth, branch, proof, and settlement,
4. stronger boundary reality readout,
5. UI recentering around those V11 surfaces.

## What landed in this first V11 implementation pass

The initial V11 repo pass now includes:

- a repo supply surface derived from authenticated repo sessions, seeded inventory, and scenario coverage,
- operational profile composition that distinguishes targeted deposit / bounded need from normalization deposit / composite need,
- a repo-to-settlement surface that stages repo selection, need, asset pack, branch, proof, and settlement,
- an identity/auth spine surface that connects installation auth, repo selection, signer attestation, buyer authority, branch authority, proof authority, and settlement authority,
- a boundary reality surface that separates modeled-local structure from executed-local effects and external-required work,
- a V11 UI shell that puts operating surfaces ahead of deep branch artifact inspection,
- refreshed demo and API/test versioning to V11,
- a lazy `node:http` import in `engi-demo/server.js` so app-context tests run in this sandbox without tripping the blocked HTTP runtime path at module import time.

## Frontier work V11 exposes next

After the first V11 slice, the next obvious steps are:

- live repo inventory refresh semantics,
- real GitHub App token exchange,
- stronger installation-permission-specific authorization,
- real branch and PR delivery payloads,
- stronger signer/org verification,
- remote settlement integration.

## Versioning note

V11 lives in new V11 files.
It does not overwrite V10.
It does not repoint `ENGI_SPEC.txt`.
