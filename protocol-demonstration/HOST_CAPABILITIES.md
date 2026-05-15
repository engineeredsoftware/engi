# Bitcode Host Capabilities

Last inspected: 2026-04-16 (America/Sao_Paulo)
Host scope: local machine capabilities relevant to active V27 canon and V28 draft-target Terminal preparation.

## Canon status

- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V27`
- Current canonical/latest target: `V27`
- Current draft-target family: `V28`
- Current protocol owner: `protocol-demonstration` mounted through `uapi/app/terminal/*`

## Purpose

This document records what the host actually needs to run the current Bitcode Terminal expression, what remains optional, and what is still modeled rather than executed live.

The source of truth for this document is:

- live host inspection commands run on 2026-04-16,
- the current repo implementation in `protocol-demonstration/*` and `uapi/app/terminal/*`,
- the active V27 canonical family,
- and the V28 draft-target family.

## First-gate runtime truth

### Primary review path

The primary review path is the Terminal-owned route:

- `uapi/app/terminal/page.tsx`
- `uapi/app/terminal/TerminalPageClient.tsx`
- `uapi/app/api/*`

This is the route that carries the preserved Bitcode operator UX inside the app shell.
For interface review, the preferred posture is mock mode so Terminal can be reviewed without live external dependencies or real user data.

### Package-local validation path

`protocol-demonstration/server.js` remains useful for package-local validation of the preserved first-gate shell/runtime contract, but it is no longer the primary product review surface.

## Program usage truth

### Required for the current first-gate implementation

The repo needs:

- a local Node runtime,
- filesystem access to the working tree,
- the ability to bind the app server on a local port such as `3000`,
- and the ability to serve the package-owned Bitcode shell assets through the app route.

The current real local program usage includes:

- serving the Terminal-owned `/terminal` route,
- serving Terminal-owned JSON contract routes under `uapi/app/api/*`,
- deterministic read derivation and state transitions inside `protocol-demonstration`,
- proof/materialization/accounting artifact assembly,
- and the Node-based regression/test stack.

### Present on host but not required for core first-gate review

- `python3`
- `rustc`
- `cargo`
- `git`
- `docker`
- `jq`
- `rg`
- `curl`
- `openclaw`
- `codex`

These are useful for inspection, authoring, container work, or upstream experiments, but not required to review the Terminal route.

### Proof-program usage truth

The current first-gate implementation does not require external proof engines at runtime.

Instead it:

- models proof-bearing source material and logs,
- assembles witness-complete proof artifacts locally in Node,
- and treats external proof tooling as upstream evidence producers rather than mandatory runtime dependencies.

### GitHub / remote usage truth

Current first-gate review does not require live GitHub network effects.

Terminal can be reviewed in mock mode without:

- live GitHub App installation auth,
- live workflow artifact fetch,
- branch or PR writes,
- live model execution,
- or live settlement-network effects.

## Required host capability specification

### Hard requirements

- macOS or Linux host with a modern Node runtime
- ability to read and write the repo working tree
- ability to bind a local HTTP server on port `3000` or another chosen app port

### Repo-minimal runtime requirement

- Node.js `v24.14.1`
- npm `11.11.0`

Because the current first-gate review path is Terminal-owned, the practical runtime requirement is:

- `node`
- `npm` or `pnpm`

### Optional but useful local tooling

- `pnpm` for workspace/app commands
- `rg`, `jq`, `curl` for inspection
- `docker` for container validation
- `python3`, `rustc`, `cargo` for upstream experiments outside the core first-gate path
- `openclaw` for local completion notifications

## Available configurations

### `terminal-review-mock`

- working directory: `/Users/garrettmaring/Developer/ENGI/uapi`
- command:
  `NEXT_PUBLIC_MASTER_MOCK_MODE=true NEXT_PUBLIC_ENABLE_MOCKS=true NEXT_PUBLIC_MOCK_USER_ORBITAL=true NEXT_PUBLIC_MOCK_USER_ORBITAL_SCENARIO=demo NEXT_PUBLIC_MOCK_SCENARIO=demo NEXT_PUBLIC_MOCK_GITHUB_ACCOUNTS=true NEXT_PUBLIC_MOCK_GITHUB_REPOS=true NEXT_PUBLIC_MOCK_GITHUB_ISSUES=true NEXT_PUBLIC_MOCK_GITHUB_BRANCHES=true NEXT_PUBLIC_MOCK_GITHUB_COMMITS=true NEXT_PUBLIC_MOCK_GITHUB_FILES=true PORT=3000 pnpm dev:remote`
- purpose: primary first-gate review of the Terminal-owned Bitcode route at `/terminal`

### `terminal-review-liveish`

- working directory: `/Users/garrettmaring/Developer/ENGI/uapi`
- command: `PORT=3000 pnpm dev:remote`
- purpose: Terminal-owned route review against current non-mock environment posture

### `package-runtime-validation`

- working directory: `/Users/garrettmaring/Developer/ENGI/protocol-demonstration`
- command: `npm start`
- purpose: package-local validation of the preserved first-gate shell/runtime carrier

### `package-test`

- working directory: `/Users/garrettmaring/Developer/ENGI/protocol-demonstration`
- command: `npm test`
- purpose: deterministic regression validation of the package-owned Bitcode runtime

### `docker-runtime-validation`

- build command: `docker build -t bitcode-first-gate .`
- run command: `docker run --rm -p 4318:4318 -e HOST=0.0.0.0 bitcode-first-gate`
- purpose: containerized validation of the package-local runtime carrier

## Telemetry and safety

Current repo truth relevant to host safety:

- state writes are atomic via temp-file plus rename,
- request bodies are capped,
- path traversal is blocked,
- public/API projection defaults are explicit,
- private branch/source material remains withheld from public projection,
- and first-gate Terminal review can run entirely in mock mode without requiring production credentials.

Operational implication:

- the host does not read secret production credentials to review first-gate Terminal behavior,
- and the package-local runtime path should be described as validation posture rather than primary product carriage.

## Remote assumptions and boundaries

The current system still models, rather than fully executes live:

- GitHub App installation auth,
- workflow artifact fetch by run ID,
- branch / PR / review writes,
- remote model execution,
- external vector store operations,
- signer verification against external authorities,
- and settlement-network effects.

These remain explicit V26 hardening scope rather than first-gate closure requirements.

## Containerization

This package includes:

- `Dockerfile`
- `.dockerignore`

Container scope is intentionally narrow:

- run the package-local Node server,
- run the Node tests,
- and validate the preserved first-gate carrier.

Container scope does not imply:

- production deployment posture,
- live GitHub/App operations,
- external proof-engine execution,
- or promoted V26 closure.

## Inspection commands used

- `date +%Y-%m-%d`
- `uname -srmo`
- `node -v`
- `npm -v`
- `pnpm -v`
- `git remote get-url origin`
- `command -v docker`
- `command -v gh`
- `command -v openclaw`
