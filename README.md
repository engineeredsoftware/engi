# Bitcode Repository

`BITCODE_SPEC.txt` is the canonical pointer for active-system work. It currently
resolves to `V34`; V35 is the active draft target for telemetry and
documentation depth after the promoted deployment canon.

## Current Product Posture

Bitcode is the protocol and the commercial source tree implements it in-place.
The primary operator routes are:

- `/terminal` for depositing, reading, transaction work, and protocol follow-through.
- `/auxillaries` for Wallet, Externals, Profile, and Interfaces support surfaces.

Exchange and website Conversations remain in source as deferred commercial work.
V35 closure focuses on telemetry and documentation depth over promoted V34:
internal codebase docs, public `/docs`, telemetry taxonomy, dashboards, alert
runbooks, incident response, operator escalation, documentation QA, developer
onboarding, operator guides, and testnet-rollout readiness.
V35 Gate 2 now anchors documentation surfaces through the package-owned
`DocumentationSurfaceCatalog` and the source-safe generated artifact
`.bitcode/v35-documentation-surface-catalog.json`.

The protocol demonstration remains the minimal deterministic reference for the
same protocol. Commercial code may mount or compare against demonstration
runtime facts, but commercial source should name the owning product surface
directly: Terminal, Exchange, Auxillaries, Conversations, API, MCP, or ChatGPT
App.

## Repository Rules

- Ground new work in `BITCODE_SPEC.txt` and the active specification family.
- Treat `_legacy/` as non-canonical.
- Do not add explicit versioned source routes or compatibility source names.
- Update source in-place to match the active canon and current draft target.
- Keep specification notes, QA ledgers, tests, and implementation synchronized.

## Contributor Workflow

The default branch is protected by the active `Bitcode Core Contributions`
ruleset. Direct pushes to `main` are not part of the normal workflow; expect
them to be rejected because changes must arrive through pull requests and
verified signatures.

Use a version branch and gate-numbered branches:

1. Create one base branch per draft target, such as `version/v35`.
2. Create scoped gate branches from the version branch. Prefix every gate branch
   with the gate number, for example `v35/gate-1-telemetry-docs-roadmap-opening` or
   `v35/gate-6-documentation-qa-alignment-proofs`.
3. Group related work into clear commits with quality commit messages whose
   titles and bodies describe the proof, implementation, or documentation
   change.
4. Continue on the gate branch until that gate's acceptance criteria are
   implemented, specified, tested, documented, committed, pushed, and ready for
   closure review.
5. Open pull requests from gate branches into the version branch as gates close.
   Title gate PRs with the uppercase version and gate prefix plus a topical
   title, for example `V35 Gate 5: Dashboards Alerts Runbooks Incident Escalation`.
6. Open the version branch back into `main` only after all gates close and the
   version is formally promoted as canon.

Gate pull requests into `version/**` run the Bitcode gate-quality workflow:
active/draft canon checks, casing/import checks, relevant package typechecks and
Jest suites, protocol-demonstration QA, and diff hygiene. The repository-wide
canon quality workflow stays green during draft work by checking active/draft
posture and promoted-spec proof posture, while full promoted-suite closure is
reserved for the version promotion workflow. Version pull requests into `main`
run the version promotion workflow. For V35, promotion work must validate the
telemetry/documentation posture, generate `BITCODE_SPEC_V35_PROVEN.md`, and
commit promotion artifacts plus the `BITCODE_SPEC.txt` pointer change from
`V34` to `V35` on the version branch.
Gate 10 is the promotion-readiness gate. V35 Gate 10 will be wired through
`pnpm run check:v35-gate10`, backed by source-safe telemetry/documentation
artifacts, a promotion readiness report, and a V35 canon-promotion workflow.
The promoted V34 closure remains reproducible through `pnpm run check:v34-gate10`
and [v34-canon-promotion.yml](.github/workflows/v34-canon-promotion.yml).
The application CI workflow uses the root pnpm workspace install, runs uapi
lint/typecheck/build plus mocked Jest coverage, and keeps heavier legacy scans
explicitly opt-in until their catalogs are refurbished: set
`ENABLE_FULL_DB_E2E`, `ENABLE_STORYBOOK_BUILD`, `ENABLE_SUPER_LINTER`, or
`ENABLE_ADVANCED_CODEQL` when those checks are intentionally part of a branch
or promotion validation.

## Key Surfaces

- [BITCODE_SPEC.txt](BITCODE_SPEC.txt) is the canonical version pointer.
- [BITCODE_SPEC_V34.md](BITCODE_SPEC_V34.md) is the active promoted spec family.
- [BITCODE_SPEC_V35.md](BITCODE_SPEC_V35.md) is the active draft target.
- [BITCODE_SPEC_V35_PARITY_MATRIX.md](BITCODE_SPEC_V35_PARITY_MATRIX.md) tracks V35 gate parity.
- [uapi/README.md](uapi/README.md) documents the commercial website/API surface.
- [uapi/app/terminal/README.md](uapi/app/terminal/README.md) documents Terminal.
- [uapi/app/exchange/README.md](uapi/app/exchange/README.md) documents Exchange.
- [uapi/app/auxillaries/README.md](uapi/app/auxillaries/README.md) documents Auxillaries.
- [protocol-demonstration/README.md](protocol-demonstration/README.md) documents
  the deterministic demonstration.

## Repository Map

- `uapi/`: commercial website, API routes, Terminal, Exchange, Auxillaries,
  Conversations, public docs, and shared UI systems.
- `protocol-demonstration/`: deterministic Bitcode demonstration, proof
  generator inputs, and standalone validation runtime.
- `packages/*`: protocol, storage, inference, conversation, BTD, API, MCP,
  ChatGPT App, and integration package owners.
- `.bitcode/`: generated proof, checkpoint, and spec-family artifacts.

## Common Commands

Mock-mode commercial review:

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

Commercial verification:

```bash
cd uapi
pnpm exec tsc --noEmit --pretty false
pnpm run test:e2e:commercial-mvp
```

Demonstration verification:

```bash
cd protocol-demonstration
pnpm test:integration
pnpm test:v28-mvp-qa
```
