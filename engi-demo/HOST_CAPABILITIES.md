# ENGI Demo Host Capabilities

Last inspected: 2026-04-03 (America/Los_Angeles)
Host scope: local machine capabilities relevant to the ENGI Spec V8 demo implementation in this repo.

## Purpose

This document records what the local host can actually provide for the ENGI demo, what is absent, and what the demo intentionally models instead of executing live.

It exists so the V8 spec and demo can make concrete promises without quietly depending on unspoken workstation assumptions.

## System / runtime surfaces present

- OS: macOS / Darwin 25.4.0
- Architecture: arm64
- Node.js: v24.14.1
- npm: 11.11.0
- pnpm: 10.33.0
- Python: 3.13.12
- Rust: rustc 1.94.1 / cargo 1.94.1
- Java: `/usr/bin/java`

These are sufficient for the current local demo implementation, including:
- running the Node demo server
- running the Node test suite
- local deterministic ranking / settlement / artifact generation
- local source inspection and simple scripting

## Command-line / global programs present

Confirmed present on this machine during inspection:

- `git`
- `gh`
- `docker`
- `jq`
- `rg`
- `curl`
- `openclaw`
- `codex`
- `node`, `npm`, `pnpm`
- `python3`
- `rustc`, `cargo`

## Command-line / global programs absent at inspection time

Confirmed absent during inspection:

- `ollama`
- `claude`
- `uv`
- `bun`
- `go`

Implication for the V8 demo:
- the repo should not imply a local Ollama-backed inference path
- the repo should not imply a local Go toolchain requirement
- model execution in the demo remains deterministic/local stand-in logic, not a live local LLM runtime

## GitHub / remote connection assumptions

Observed locally:

- repo remote: `https://github.com/engineeredsoftware/ENGI.git`
- `gh auth status` reports an authenticated GitHub account for `garrettmaring`
- token scopes observed: `gist`, `read:org`, `repo`, `workflow`

Important V8 interpretation:
- this machine is capable of authenticated GitHub CLI operations in principle
- the current demo does **not** use those credentials to fake live GitHub App behavior
- Profile B boundaries remain external because live GitHub App installation auth, workflow artifact fetch, branch writes, PR writes, and review actions are intentionally not executed by the local prototype

## Inference / model needs

Present in this repo today:
- deterministic stand-in evaluator logic inside the demo implementation
- deterministic local vector/embedding stand-ins
- prompt/evaluator lineage artifacts and manifests

Not present / not claimed:
- local Ollama runtime
- production remote model orchestration inside the demo
- external vector database required for the local prototype

V8 interpretation:
- Profile A can fully demonstrate prompt surfaces, evaluator surfaces, and vector contracts without a live model backend
- Profile B still requires external model execution, trace capture, and potentially remote vector infrastructure

## What is present vs absent vs modeled

### Present and used directly
- local Node runtime
- local file system
- local deterministic ranking / recall / proof / settlement logic
- local browser-served demo UI
- local test runner

### Present on host but intentionally not used as live demo execution
- authenticated GitHub CLI access
- Docker
- Codex / OpenClaw CLIs

These exist on the machine, but the V8 demo keeps them out of the core flow so the repo does not overclaim live production behavior.

### Absent on host
- Ollama
- local Claude CLI
- Go toolchain
- Bun / uv

### Modeled in the demo rather than executed live
- GitHub App auth and installation token exchange
- workflow artifact fetch by run ID
- branch / PR / review writes
- remote prompt execution and model routing
- external vector-store read/write operations
- signer / identity verification against external authorities
- settlement network effects / external confirmations

## Network boundary assumptions

The local prototype assumes:
- internet-capable host is plausible
- GitHub auth exists locally
- remote production integrations are possible from this machine

But the prototype intentionally stops short of claiming:
- that a live GitHub App is configured for this repo
- that model-provider credentials are configured
- that external vector infra is provisioned
- that settlement/signer network backends are available

## Guidance for future Profile B work

Before claiming Profile B is live-switchable from this host, verify separately:

1. GitHub App installation auth and token issuance
2. workflow artifact fetch + verification
3. branch / PR write paths
4. model-provider credentials and trace capture
5. vector-store provisioning and schema compatibility
6. signer verification source of truth
7. settlement execution / confirmation backend

Until then, V8 should continue presenting those as concrete boundary interfaces, not as local working integrations.

## Inspection commands used

- `uname -a`
- `node -v`
- `npm -v`
- `pnpm -v`
- `python3 --version`
- `git --version`
- `gh --version`
- `docker --version`
- `rustc --version`
- `cargo --version`
- `jq --version`
- `rg --version`
- `curl --version`
- `which ...`
- `gh auth status`
- `git remote -v`
