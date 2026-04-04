# ENGI Demo Host Capabilities

Last inspected: 2026-04-03 (America/Los_Angeles)
Host scope: local machine capabilities relevant to the ENGI Spec V14 canonical target over the current deterministic demo implementation in this repo.

## Canon status

- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt -> V14`
- Current canonical/latest target: `V14`
- Last fully realized canon preserved in the demo source: `V12`

## Purpose

This document records what the host actually needs to run the current deterministic demo implementation, what it can optionally support, what remains modeled instead of executed, and how the repo can be furnished natively or in a container without overclaiming production readiness.

The source of truth for this document is:

- live host inspection commands run on 2026-04-03
- the current repo implementation in `server.js`, `src/engi-demo.js`, `public/app.js`, and `test/`
- the current V14-canonical / V12-realized artifact and proof flow, not older V8/V9 framing

## Program usage truth

### Required for the current demo implementation

The repo needs only a local Node runtime plus filesystem access to execute its real control-plane behavior:

- serve the demo UI and JSON API
- run the deterministic need-derivation flow
- execute local static code-analysis receipts implemented in-process
- assemble proof/materialization/accounting artifacts
- run the Node test suite

In the current implementation, the following stages are real local program usage, but they are all executed by deterministic in-process Node logic rather than external commands:

- benchmark parser normalization: `github-actions.benchmark-parser.v9`
- repo code-analysis derivation: `github.repo-context.extract.v9`
- content-unit code analysis: `content-unit.extract-static-code-analysis.v9`
- asset code-analysis derivation: `asset.measurement.extract.v9`
- verification determinisms: `verification.*.v9`
- source-to-shares replay, exact allocation, journal settlement, and proof assembly

### Present on host but not required for the core V9 path

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

These are useful for inspection, authoring, proof-log generation outside the core demo path, or container work, but the demo does not require them to complete its main run.

### Proof-program usage truth

The current demo does **not** execute external proof engines as part of the core flow.

Instead it:

- models proof-bearing assets and proof logs as evidence-bearing source material
- assembles witness-complete proof artifacts locally in Node
- treats Rust / Creusot / other proof tooling as optional upstream producers of evidence, not mandatory runtime dependencies for demo execution

So:

- proof bundle assembly is local and real
- proof-program execution is modeled as upstream evidence, not required live host behavior

### GitHub / remote usage truth

Observed on this host:

- repo remote: `https://github.com/engineeredsoftware/ENGI.git`
- `gh` is installed
- `gh auth status` currently reports the default token as invalid for `garrettmaring`

Current interpretation:

- GitHub CLI presence is real
- GitHub CLI authorization is **not** currently healthy
- the demo must continue treating GitHub/App actions as modeled Profile B boundaries rather than host-ready live operations

## Required host capability specification

### Hard requirements

- macOS or Linux host with a modern Node runtime
- ability to read and write the repo working tree
- ability to bind a local HTTP server on port `4318` or another chosen port

### Repo-minimal runtime requirement

- Node.js `v24.14.1` observed on this host
- npm `11.11.0` observed on this host

Because the repo currently has no third-party npm dependencies, the practical runtime requirement is:

- `node`
- `npm`

### Optional but useful local tooling

- `pnpm` for parity with broader workstation habits
- `rg`, `jq`, `curl` for inspection
- `docker` for the container configuration provided in this repo
- `python3`, `rustc`, `cargo` for upstream proof/code-analysis experiments outside the core demo path
- `openclaw` for the completion notification command used at the end of local work

## Install / bootstrap / furnishing

This repo intentionally stays light, but if the machine needs broader furnishing the recommended pattern is the existing Casa bootstrap layout at `~/Developer/casa`.

Relevant Casa references:

- bootstrap entrypoint: `/Users/garrettmaring/Developer/casa/scripts/bootstrap.sh`
- package installer: `/Users/garrettmaring/Developer/casa/scripts/install-packages.sh`
- bootstrap overview: `/Users/garrettmaring/Developer/casa/README.md`

Casa’s useful patterns for this repo are:

- manifest-driven package installation instead of ad hoc shell history
- one bootstrap entrypoint
- separate install, app, and config-linking phases

For this repo specifically, furnishing is simpler:

1. ensure `node` and `npm` are present
2. optionally ensure `docker` is present if using the container configuration
3. optionally ensure `openclaw` is present if you want the local completion notification command

## Available configurations

### `native-runtime`

- start command: `npm start`
- bind address default: `127.0.0.1`
- purpose: local interactive UI + API walkthrough

### `native-test`

- test command: `npm test`
- purpose: deterministic API/core regression suite

### `docker-runtime`

- build command: `docker build -t engi-demo-v14 .`
- run command: `docker run --rm -p 4318:4318 -e HOST=0.0.0.0 engi-demo-v14`
- purpose: containerized local serving with no host Node requirement beyond Docker

### `docker-test`

- build command: `docker build -t engi-demo-v14 .`
- run command: `docker run --rm engi-demo-v14 npm test`
- purpose: containerized regression check using the same image contents

## Telemetry and safety

The current repo truth relevant to host safety:

- state writes are atomic via temp-file + rename
- request bodies are capped at 1 MB
- static path traversal is blocked
- public/API projection defaults to `public`
- buyer/reviewer/internal projections are explicit
- no remote network access is required for the core flow
- private branch files and source material remain withheld from public projection

Operational implication:

- the host does not need secret production credentials to run the demo safely
- the container configuration should remain local-demo scoped and must not be described as a production deployment path

## Remote assumptions and boundaries

The repo still models, rather than executes live:

- GitHub App installation auth
- workflow artifact fetch by run ID
- branch / PR / review writes
- remote model execution
- external vector store operations
- signer verification against external authorities
- settlement network effects

These remain Profile B boundaries even if the host later gains the necessary credentials or tools.

## Containerization

This repo now includes:

- `Dockerfile`
- `.dockerignore`

Container scope is intentionally narrow:

- run the Node server
- run the Node tests
- keep the same deterministic V9 behavior as native execution

Container scope does **not** imply:

- GitHub CLI auth inside the container
- live GitHub/App operations
- proof-engine execution inside the container
- a production-grade deployment posture

## Inspection commands used

- `uname -srmo`
- `node -v`
- `npm -v`
- `pnpm -v`
- `python3 --version`
- `rustc --version`
- `cargo --version`
- `git --version`
- `docker --version`
- `gh auth status`
- `git remote get-url origin`
- `command -v openclaw`
- `command -v codex`
- `command -v rg`
- `command -v jq`
- `command -v curl`
