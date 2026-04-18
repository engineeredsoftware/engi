# `uapi/` Bitcode Application

`uapi/` is the active application owner for Bitcode.
It carries the `/application` workspace, fullscreen conversations and orbitals, app-owned Bitcode API routes, and the shared UI systems used during V26 second-gate closure.

Active canon remains `V25`.
V26 work inside `uapi/` is draft-target implementation toward a first-and-second-gate checkpoint.

## Primary routes

- `/application`
  Main Bitcode workspace. Transactions master-detail is the primary reading surface; give and need are the primary write actions.
- `/conversations`
  Fullscreen conversation workspace entered from `/application`.
- `/orbitals/profile`
- `/orbitals/connects`
- `/orbitals/interfaces`
- `/orbitals/btd`
  Focused orbital routes for direct orbital reading without losing the application framing.

Compatibility orbital aliases such as `/orbitals/users`, `/orbitals/models`, and `/orbitals/credits` are convergence-only entry points and should not be treated as the enduring V26 naming model.
Focused orbital routes and contained orbital entry shells should also keep orbitals-first wording, read as contained operator workspaces, and avoid regressing to generic workspace/settings/account language.
The shared orbital metadata layer in `app/orbitals/components/orbital-pane-meta.ts` is the active owner for fullscreen orbital-entry wording such as `Open Orbitals fullscreen`, targeted orbital-open actions, and the direct-route return action `Open transactions terminal`.
Signed-in orbital reopen actions should flow through the shared `openOrbital('orbitals', step?)` contract rather than older account-named caller aliases.
Contained orbital rails should also converge on the shared panel-plus-tabs carriers in `app/orbitals/components/shared/` rather than reintroducing floating ring-label or sequence-only furniture per route or pane.

## Main route systems

- `app/application/`
  `/application` route-local composition, route-owned transaction query state, flow-guide/runtime bridge, give/need workbench, and transaction detail.
- `app/orbitals/`
  Fullscreen ring overlay plus focused orbital routes for `Connects`, `Interfaces`, `Profile`, and `$BTD`.
- `app/conversations/`
  Fullscreen conversation overlay/workspace.
- `app/api/`
  App-owned Bitcode JSON contracts, including history, conversations, VCS, orbital preferences, client-error intake, and preserved-runtime endpoints.
- `components/base/engi/`
  Shared operator chrome, execution carriers, explainers, notifications, and reusable app primitives.

## Public shell owners

Third-gate public-shell work is now explicitly carried by:

- `app/(root)/components/MarketingLandingPage.tsx`
  Mounted homepage shell.
- `app/(root)/components/MarketingEngiVideoCard.tsx`
  Stable recorded operator-guide card.
- `app/demo-video/page.tsx`
  Stable guide route that remains public while live Bitcode work happens in `/application`.
- `components/base/engi/layout/footer.tsx`
  Shared public footer CTA and public-route link posture.
- `components/base/engi/layout/bitcode-public-copy.ts`
  Shared public-shell vocabulary for `transactions terminal`, `operator guide`, `give`, `need`, and `orbitals`.

## Development

Install dependencies from the repo root, then use the app workspace for focused commands:

```bash
pnpm install
cd uapi
pnpm install
```

Local environment:

```bash
cd uapi
cp .env.example .env.local
```

Typical local variables for mock-mode review:

```text
NEXT_PUBLIC_ENABLE_MOCKS=true
NEXT_PUBLIC_MASTER_MOCK_MODE=true
NEXT_PUBLIC_MOCK_SCENARIO=demo
NEXT_PUBLIC_MOCK_USER_ORBITAL=true
NEXT_PUBLIC_MOCK_GITHUB_ACCOUNTS=true
NEXT_PUBLIC_MOCK_GITHUB_REPOS=true
```

Run the app:

```bash
cd uapi
HOST=127.0.0.1 PORT=3000 pnpm dev:remote
```

## Verification

Focused lint:

```bash
cd uapi
pnpm exec next lint --file app/application/ApplicationPageClient.tsx
```

Focused Jest examples:

```bash
cd uapi
pnpm exec jest --runInBand --testMatch '<rootDir>/tests/applicationTransactionQuery.test.ts'
pnpm exec jest --runInBand --testMatch '<rootDir>/tests/orbitalsProvider.test.tsx'
```

## README set required for second-gate closure

The active V26 checkpoint treats markdown/doc refurbishment as part of second-gate implementation, not as optional cleanup.
The current application doc set is:

- [README.md](../README.md)
- [app/application/README.md](app/application/README.md)
- [app/orbitals/README.md](app/orbitals/README.md)
- [components/base/engi/README.md](components/base/engi/README.md)
- [components/base/engi/execution/README.md](components/base/engi/execution/README.md)

Those markdown carriers are part of the second-gate implementation/proof boundary.
If the route/package/component owners change, this doc set is expected to move with them.

## Related docs

- [ENGI_SPEC_V26.md](../ENGI_SPEC_V26.md)
- [ENGI_SPEC_V26_DELTA.md](../ENGI_SPEC_V26_DELTA.md)
- [ENGI_SPEC_V26_PARITY_MATRIX.md](../ENGI_SPEC_V26_PARITY_MATRIX.md)
- [ENGI_SPEC_V26_NOTES.md](../ENGI_SPEC_V26_NOTES.md)
- [packages/bitcode/V26_APPLICATION_SYSTEMS.md](../packages/bitcode/V26_APPLICATION_SYSTEMS.md)
- [packages/bitcode/V26_PROOF_SURFACES.md](../packages/bitcode/V26_PROOF_SURFACES.md)
