# Bitcode / ENGI Repository

Active canon is `V25`.
`ENGI_SPEC.txt` is the only canonical pointer and currently resolves to `V25`.
`V26` is the active draft target for productionizing hardening, with the near-term checkpoint focused on fully closing first and second gates while keeping third-gate marketing work explicitly separate.

## Current product posture

Bitcode now centers on one primary application route:
- `/application`

V26 defines three main experiences:
- `master detail`
- `conversations`
- `orbitals`

V26 defines two main operator actions:
- `give`
- `need`

The active orbital model is fixed as:
- `Connects`
- `Interfaces`
- `Profile`
- `$BTD`

Second-gate closure also requires the live product and docs to stay aligned:
- operator-facing copy is user-referencing and Bitcode-first
- orbitals entry surfaces read as orbitals access, not generic settings/account furniture
- application-opened orbitals hold a contained operator shell rather than collapsing back to modal-width account furniture
- the README and markdown set for root, packages, routes, and shared systems is treated as required implementation scope

## Repository rules

- Always ground new work from `ENGI_SPEC.txt` and the active canonical spec family first.
- Treat `_legacy/` as non-canonical. Do not use it as an implementation source unless explicitly forward-porting.
- V25 remains the only active canon until V26 promotion is deliberate and proven.
- V26 second-gate closure includes markdown/readme refurbishment for the active product surfaces and package owners, not just code changes.

## Key surfaces

- [ENGI_SPEC.txt](ENGI_SPEC.txt)
  Canonical version pointer.
- [ENGI_SPEC_V25.md](ENGI_SPEC_V25.md)
  Active canonical full-system specification.
- [ENGI_SPEC_V25_PROVEN.md](ENGI_SPEC_V25_PROVEN.md)
  Active generated proof appendix.
- [ENGI_SPEC_V26.md](ENGI_SPEC_V26.md)
  Draft-target full-system specification for V26.
- [uapi/README.md](uapi/README.md)
  Application, routes, local development, and verification.
- [packages/bitcode/README.md](packages/bitcode/README.md)
  Preserved runtime package, bridge surfaces, and proof artifacts.
- [uapi/app/application/README.md](uapi/app/application/README.md)
  `/application` master-detail, give/need, and flow-guide ownership.
- [uapi/app/orbitals/README.md](uapi/app/orbitals/README.md)
  Orbitals routes, overlay behavior, ring model, and compatibility aliases.
- [uapi/components/base/engi/execution/README.md](uapi/components/base/engi/execution/README.md)
  Shared execution carriers for transactions, payloads, explainers, and detail panels.

## Repository map

- `uapi/`
  Next.js application, app routes, API routes, orbitals, conversations, and shared UI systems.
- `packages/bitcode/`
  Preserved Bitcode runtime, deterministic state engine, public runtime shell, and canonical proof generator inputs.
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

V26 draft-target proof/checkpoint regeneration:

```bash
node scripts/check-engi-spec-family.mjs --version V26
node scripts/generate-engi-proven.mjs --version V26 --allow-dirty
```

## V26 checkpoint objective

The current V26 checkpoint is not full promotion.
It is a deliberate first-and-second-gate closure boundary with:
- application-native `/application` ownership,
- hardened operator workspace UX/UI,
- cleaned orbital naming and contained-shell behavior,
- preserved-runtime help and telemetry labeling cleaned to Bitcode-facing operator language,
- route/package documentation refreshed to current Bitcode reality,
- generated checkpoint/proof artifacts reflecting that closure,
- and explicit third-gate marketing preparation still left open on purpose.

Current post-checkpoint third-gate start is intentionally narrow:
- the mounted public shell now converges through shared public-copy ownership in `uapi/components/base/engi/layout/bitcode-public-copy.ts`
- the live public shell now mounts Bitcode nav through `uapi/app/(root)/components/PublicShellFrame.tsx`
- the live landing, nav, footer, and stable `/demo-video` guide route now use `transactions terminal`, `operator guide`, `give`, `need`, and `orbitals` vocabulary
- broader marketing-surface refurbishment still remains separate from the second-gate checkpoint boundary
