# Bitcode Repository

Active canon is `V26`.
`BITCODE_SPEC.txt` is the only canonical pointer and currently resolves to `V26`.
`V27` is the next draft target after V26 through-fourth-gate promotion.

## Current product posture

Bitcode now centers on one primary application route:
- `/application`

V26 defines three main experiences:
- `master detail`
- `conversations`
- `auxillaries`

V26 defines two main operator actions:
- `give`
- `need`

The active auxillary model is fixed as:
- `Connects`
- `Interfaces`
- `Profile`
- `$BTD`

Second-gate closure also requires the live product and docs to stay aligned:
- operator-facing copy is user-referencing and Bitcode-first
- canonical auxillary routes now live at `/auxillaries/*`
- retained `/orbitals/*` entry surfaces now act as redirect-only compatibility carriers converging on Bitcode auxillaries, not generic settings/account furniture
- application-opened orbitals hold a contained operator shell rather than collapsing back to modal-width account furniture
- the README and markdown set for root, packages, routes, and shared systems is treated as required implementation scope

## Repository rules

- Always ground new work from `BITCODE_SPEC.txt` and the active canonical spec family first.
- Treat `_legacy/` as non-canonical. Do not use it as an implementation source unless explicitly forward-porting.
- V26 is the only active canon until a later promotion deliberately reopens the pointer.
- V26 second-gate closure includes markdown/readme refurbishment for the active product surfaces, preserved protocol owner, and package owners, not just code changes.

## Key surfaces

- [BITCODE_SPEC.txt](BITCODE_SPEC.txt)
  Canonical version pointer.
- [BITCODE_SPEC_V26.md](BITCODE_SPEC_V26.md)
  Active canonical full-system specification.
- [BITCODE_SPEC_V26_PROVEN.md](BITCODE_SPEC_V26_PROVEN.md)
  Active generated proof appendix.
- [uapi/README.md](uapi/README.md)
  Application, routes, local development, and verification.
- [protocol-demonstration/README.md](protocol-demonstration/README.md)
  Preserved runtime package, bridge surfaces, and proof artifacts.
- [uapi/app/application/README.md](uapi/app/application/README.md)
  `/application` master-detail, give/need, and flow-guide ownership.
- [uapi/app/orbitals/README.md](uapi/app/orbitals/README.md)
  Orbitals compatibility owner, overlay behavior, ring model, and redirect-only aliases.
- [uapi/app/auxillaries/README.md](uapi/app/auxillaries/README.md)
  Canonical auxillary routes, direct-route metadata, and compatibility redirect posture.
- [uapi/components/base/bitcode/execution/README.md](uapi/components/base/bitcode/execution/README.md)
  Shared execution carriers for transactions, payloads, explainers, and detail panels.

## Repository map

- `uapi/`
  Next.js application, app routes, API routes, auxillaries, conversations, and shared UI systems.
- `protocol-demonstration/`
  Preserved Bitcode protocol implementation, deterministic state engine, public runtime shell, and canonical proof generator inputs.
- `packages/*`
  Retained package owners being converged upward into Bitcode-grade proof, packaging, and API/storage discipline during V26.
- `.engi/`
  Generated proof, checkpoint, and spec-family artifacts.

## Common commands

Mock-mode application review:

```bash
cd uapi
NEXT_PUBLIC_MASTER_MOCK_MODE=true \
NEXT_PUBLIC_ENABLE_MOCKS=true \
NEXT_PUBLIC_MOCK_USER_ORBITAL=true \
NEXT_PUBLIC_MOCK_USER_ORBITAL_SCENARIO=demo \
NEXT_PUBLIC_MOCK_SCENARIO=demo \
NEXT_PUBLIC_MOCK_GITHUB_ACCOUNTS=true \
NEXT_PUBLIC_MOCK_GITHUB_REPOS=true \
HOST=127.0.0.1 PORT=3000 pnpm dev:remote
```

Focused application verification:

```bash
cd uapi
pnpm exec next lint --file app/application/ApplicationPageClient.tsx
pnpm exec jest --runInBand --testMatch '<rootDir>/tests/applicationTransactionDetail.test.ts'
```

V26 canonical proof/checkpoint regeneration:

```bash
node scripts/check-bitcode-spec-family.mjs --version V26
node scripts/generate-bitcode-proven.mjs --version V26 --allow-dirty
```

## V26 promotion posture

V26 is now promoted through fourth gate.
The promoted boundary carries:
- application-native `/application` ownership,
- hardened application UX/UI,
- cleaned orbital naming and contained-shell behavior,
- preserved-runtime help and telemetry labeling cleaned to Bitcode-facing operator language,
- route/package documentation refreshed to current Bitcode reality,
- generated checkpoint/proof artifacts reflecting that closure,
- and explicit third-gate marketing preparation still left open on purpose.

Current post-checkpoint third-gate start is intentionally narrow:
- the mounted public shell now converges through shared public-copy ownership in `uapi/components/base/bitcode/layout/bitcode-public-copy.ts`
- the live public shell now mounts Bitcode nav through `uapi/app/(root)/components/PublicShellFrame.tsx`
- the live landing, nav, footer, `/docs`, and compatibility `/demo-video` route now use `Network`, `Transactions`, `Docs`, `Auxillaries`, and give/need teaching vocabulary
- the live landing shell no longer carries active `ComingSoon*` owners or `coming-soon-*` stylesheet imports
- the live landing owner now breaks hero, guide, preview, and shared public-shell data into `uapi/app/(root)/components/landing/*` carriers instead of one oversized mixed-surface file
- the public shell now owns a real `/docs` hub with route cards, inline widgets, and the recorded walkthrough, while `/demo-video` remains only a compatibility alias into that docs-owned content
- the mounted public routes now identify themselves explicitly as `Bitcode Network`, `Bitcode Docs`, and `Bitcode Transactions` instead of inheriting the older global `$BTD` shell title
- the live public nav now stays progressive on small screens by stacking visible entry links and guest actions instead of hiding them behind a separate menu layer
- the live public shell now uses shared inline explainers for its key entry links and protocol reference instead of a thin footer browser-tooltip fallback
- the stable docs walkthrough now resolves one Bitcode-owned guide asset instead of carrying ordered demo-era media compatibility
- the live public footer now resolves the docs walkthrough URL through Bitcode-owned route/env ownership instead of falling back to the removed legacy docs-walkthrough env fallback
- the live public footer now links `Protocol spec` through the stable canonical pointer `BITCODE_SPEC.txt` instead of hard-linking a version-specific public spec path
- the live terminal preview is now progressive by default, with a compact public/mobile summary and the denser operator-grade preview only on wider shells
- the live landing ambience now hides orbital rings, pointer glow, and the large ambient blur on smaller or reduced-motion shells instead of forcing the full animated backdrop everywhere
- the live public footer now collapses its route links into mobile-first cards and presents protocol/version metadata as explicit product chips instead of cramped inline microcopy on narrow shells
- broader marketing-surface refurbishment was kept separate from the earlier second-gate checkpoint boundary

Current fourth-gate promotion boundary is now explicit too:
- `/conversations` is now a direct fullscreen application-mode route instead of only an embedded overlay entry
- `/executions` remains the retained direct compatibility route for Bitcode execution primitives inside the broader activity family, with `/api/executions` mounted from the canonical deliverables business-logic owner
- `/api/vcs`, `/api/templates/deliverables`, and `/api/auxillaries/template-preferences` are now explicit retained compatibility carriers that keep `/executions` healthy while run/pipeline patterns continue porting inward to `/application`
- `/edgetimes` is a live Bitcode docs-branded storage/schema/package ownership route rather than draft-only intent
- `/api/edgetimes` is the JSON witness for that same fourth-gate storage/API topology
- `.engi/conversations-continuity-proof.json`, `.engi/runs-pipelines-totality-proof.json`, `.engi/persistence-schema-totality-proof.json`, `.engi/prompt-system-totality-proof.json`, and `.engi/retained-package-admissibility-proof.json` are the current generated fourth-gate promotion proofs
- retained Jira and GitHub old-world ports are now explicitly admitted only under Bitcode-owned fourth-gate roles: Jira as reader-first need ingestion and Git/GH as the initial settle-write boundary
- the retained persistence, conversations, runs/pipelines, and old-world port basis is now surfaced through explicit route/API/package owners instead of living only in spec prose while fifth-gate proving remains open
