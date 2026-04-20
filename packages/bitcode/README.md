# Bitcode Demo - V26 canonical deterministic local prototype

This demo is governed by the active V26 canonical spec.

- `BITCODE_SPEC.txt -> V26`
- current generated appendix: `BITCODE_SPEC_V26_PROVEN.md`

`packages/bitcode` is the preserved Bitcode runtime package that survived first-gate ownership migration and now feeds the application-owned V26 transactions and auxillary surfaces.

Active canon remains `V26`.
V27 is the next draft target after this promotion.
V26 uses this package as:
- the deterministic runtime/state owner,
- the preserved lower runtime mounted inside `/application`,
- the semantic shell snapshot/control bridge,
- and one of the generators of proof artifacts used to judge through-fourth-gate closure and later fifth-gate completion.

## What this package owns

- deterministic Bitcode state, settlement, proof, and branch-materialization logic
- the preserved runtime shell under `public/`
- the browser bridge consumed by `uapi/app/application/application-shell-bridge.tsx`
- standalone local validation runtime via `server.js`
- proof/checkpoint generation inputs used by the active V26 spec family

## Main files

- `src/bitcode-demo.js`
  Deterministic state engine and local Bitcode chain modeling.
- `src/client-entry.js`
  App-facing mount/snapshot/control bridge.
- `src/canonical/proven-generator.js`
  Generated proof and checkpoint appendix builder.
- `public/app.js`
  Preserved runtime behavior mounted inside `/application`.
- `public/index.html`
  Direct package runtime shell for local validation and parity checks.
- `public/styles.css`
  Preserved runtime styling, including flow-guide and payload/help layers.
- `public/telemetry.js`
  Preserved runtime diagnostics and operator-visible telemetry labeling.
- `server.js`
  Local standalone runtime for direct package validation.

## Relationship to `/application`

The primary review surface is no longer the package-local standalone runtime.
The primary review surface is:
- `/application`

`packages/bitcode` remains essential because `/application` still mounts and reads:
- preserved runtime markup,
- flow-guide/runtime semantics,
- closure/detail snapshot data,
- and deterministic controls needed during second-gate convergence.

Direct package validation remains useful for:
- lower runtime parity checks,
- bridge debugging,
- proof/checkpoint generation confidence,
- preserved-runtime copy/style verification,
- and preserved-runtime telemetry-label verification.

## Local commands

Run the package-local validation runtime:

```bash
cd packages/bitcode
npm start
```

Run package tests:

```bash
cd packages/bitcode
npm test
node --test test/v26-public-copy.test.js
```

Run V26 proof/checkpoint generation from the repo root:

```bash
node scripts/check-engi-spec-family.mjs --version V26
node scripts/generate-engi-proven.mjs --version V26 --allow-dirty
```

## External-reality posture

This package intentionally distinguishes:
- deterministic local Bitcode modeling,
- explicit preserved-runtime review surfaces,
- and later live external integrations that V26 continues to harden.

It should not silently imply that GitHub, wallet, bitcoin, storage, or settlement effects are already fully live just because lower runtime surfaces are readable.
V26 keeps those boundaries explicit and provable.

## Required doc companions

Second-gate closure now expects this package readme to stay aligned with:

- [../../README.md](../../README.md)
- [../../uapi/README.md](../../uapi/README.md)
- [../../uapi/app/application/README.md](../../uapi/app/application/README.md)
- [V26_APPLICATION_SYSTEMS.md](V26_APPLICATION_SYSTEMS.md)
- [V26_PROOF_SURFACES.md](V26_PROOF_SURFACES.md)
