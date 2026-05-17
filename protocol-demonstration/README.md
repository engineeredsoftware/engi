# Bitcode Protocol Demonstration

This package is the deterministic demonstration of Bitcode. It is not the
commercial website, and within this package the correct name is demonstration.

`BITCODE_SPEC.txt` is the canonical pointer for active-system work. It currently
resolves to `V27`; V28 is the active draft target for commercial MVP QA.

## What This Demonstration Carries

- deterministic Bitcode state, settlement, proof, and branch-materialization logic
- a minimal local fit-finding loop that ranks demonstration deposits for a Read
  and synthesizes a proof-rooted demonstration AssetPack only when the source
  fixture is worthy
- standalone browser/runtime shell under `public/`
- Terminal-facing mount, snapshot, and control bridge through `src/client-entry.js`
- local validation server through `server.js`
- proof/checkpoint generation inputs used by the active specification family

Commercial surfaces may mount or compare against demonstration runtime facts,
but the commercial owners are Terminal, Exchange, Auxillaries, Conversations,
API, MCP, and ChatGPT App.

## Main Files

- `src/bitcode-demo.js`: deterministic state engine and local Bitcode chain modeling.
- `src/client-entry.js`: demonstration mount/snapshot/control bridge.
- `src/local-fit-finding.js`: standalone local Read/Fit witness. It deliberately
  avoids commercial pipeline, registry, prompt, agent, Vercel, Supabase, and UAPI
  imports.
- `src/canonical/proven-generator.js`: generated proof and checkpoint appendix builder.
- `public/app.js`: standalone demonstration behavior.
- `public/index.html`: direct demonstration shell for local validation and parity checks.
- `public/styles.css`: demonstration styling, flow-guide, payload, and help layers.
- `public/telemetry.js`: demonstration diagnostics and operator-visible telemetry labeling.
- `server.js`: local standalone runtime.

## Relationship To Terminal

The primary commercial review surface is `/terminal`.

The demonstration remains essential because Terminal can mount and read:

- demonstration runtime markup,
- flow-guide/runtime semantics,
- closure/detail snapshot data,
- deterministic controls used for parity checks.

Direct package validation remains useful for runtime parity checks, bridge
debugging, proof generation confidence, demonstration copy/style verification,
and telemetry-label verification.

## Local Commands

Run the standalone demonstration:

```bash
cd protocol-demonstration
npm start
```

Run package tests:

```bash
cd protocol-demonstration
npm test
pnpm test:fit-finding
pnpm test:integration
pnpm test:v28-commercial-mvp-qa
```

## Required Doc Companions

- [../README.md](../README.md)
- [../uapi/README.md](../uapi/README.md)
- [../uapi/app/terminal/README.md](../uapi/app/terminal/README.md)
- [../uapi/app/exchange/README.md](../uapi/app/exchange/README.md)
- [../uapi/app/auxillaries/README.md](../uapi/app/auxillaries/README.md)
