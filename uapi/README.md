# `uapi/` Bitcode Application

`uapi/` is the active application owner for Bitcode.
It carries the `/application` transactions surface, fullscreen conversations and orbitals, app-owned Bitcode API routes, and the shared UI systems used during V26 second-gate closure.

Active canon remains `V25`.
V26 work inside `uapi/` is draft-target implementation toward a first-and-second-gate checkpoint.

## Primary routes

- `/application`
  Main Bitcode transactions surface. Transactions master-detail is the primary reading surface; give and need are the primary write actions.
- `/conversations`
  Fullscreen conversation mode entered from `/application`.
- `/orbitals/profile`
- `/orbitals/connects`
- `/orbitals/interfaces`
- `/orbitals/btd`
  Focused orbital routes for direct orbital reading without losing the application framing.

Compatibility orbital aliases such as `/orbitals/users`, `/orbitals/models`, and `/orbitals/credits` are convergence-only entry points and should not be treated as the enduring V26 naming model.
Focused orbital routes and contained orbital entry shells should also keep orbitals-first wording, read as contained orbital reads, and avoid regressing to generic workspace/settings/account language.
Selected `/application` and `/orbitals` review surfaces should also keep live product wording on `Transactions` and `Orbitals` instead of drifting back toward `workspace` or `transaction terminal`.
The shared orbital metadata layer in `app/orbitals/components/orbital-pane-meta.ts` is the active owner for fullscreen orbital-entry wording such as `Open Orbitals fullscreen`, targeted orbital-open actions, and the direct-route return action `Open transactions`.
Signed-in orbital reopen actions should flow through the shared `openOrbital('orbitals', step?)` contract rather than older account-named caller aliases.
Contained orbital rails should also converge on the shared panel-plus-tabs carriers in `app/orbitals/components/shared/` rather than reintroducing floating ring-label or sequence-only furniture per route or pane.

## Main route systems

- `app/application/`
  `/application` route-local composition, route-owned transaction query state, flow-guide/runtime bridge, give/need workbench, and transaction detail.
- `app/orbitals/`
  Fullscreen ring overlay plus focused orbital routes for `Connects`, `Interfaces`, `Profile`, and `$BTD`.
- `app/conversations/`
  Fullscreen conversation mode.
- `app/api/`
  App-owned Bitcode JSON contracts, including history, conversations, VCS, orbital preferences, client-error intake, and preserved-runtime endpoints.
- `components/base/engi/`
  Shared operator chrome, execution carriers, explainers, notifications, and reusable app primitives.

## Public shell owners

Third-gate public-shell work is now explicitly carried by:

- `app/(root)/components/PublicShellFrame.tsx`
  Mounted public-route provider shell for nav, auth, query, and orbitals access.
- `app/(root)/components/MarketingLandingPage.tsx`
  Mounted homepage shell coordinator.
- `app/(root)/components/landing/MarketingLandingHero.tsx`
  Hero copy, pillar cards, and primary public entry actions.
- `app/(root)/components/landing/MarketingLandingPillarCard.tsx`
  Individual Bitcode give/measure/$BTD pillar card owner.
- `app/(root)/components/landing/MarketingLandingGuideCard.tsx`
  Resumable guide posture card inside the landing hero.
- `app/(root)/components/landing/MarketingLandingTerminalPreview.tsx`
  Public transactions-terminal preview surface.
- `app/(root)/components/landing/marketing-landing-shared.tsx`
  Shared landing-shell constants and visual helpers for the mounted public shell.
- `app/(root)/components/MarketingOperatorGuideCard.tsx`
  Stable recorded walkthrough card with user-facing fallback back into `/application` when guide media is absent.
- `app/(root)/components/PublicDocsPageContent.tsx`
  Public docs hub content with route cards, inline widgets, walkthrough embedding, and public CTA posture.
- `app/docs/page.tsx`
  Real public docs route for the mounted Bitcode shell.
- `app/demo-video/page.tsx`
  Compatibility alias into the public docs hub and walkthrough content.
- `components/base/engi/layout/nav.tsx`
  Public-route navigation and access CTA chrome shared with product surfaces.
- `components/base/engi/layout/NavBrand.tsx`
  Bitcode public-route brand posture and Network/public surface naming.
- `components/base/engi/layout/footer.tsx`
  Shared public footer CTA and public-route link posture.
- `components/base/engi/layout/bitcode-public-copy.ts`
  Shared public-shell vocabulary for `Network`, `Transactions`, `Docs`, `Orbitals`, and give/need teaching posture.
- `components/base/engi/layout/bitcode-public-explainers.ts`
  Shared public-shell explainer content for key entry links and the protocol reference.

Those owners should not reintroduce live `ComingSoon*` component naming, `coming-soon-*` stylesheet imports, or dormant access-gate code inside the mounted Bitcode public shell.
They should also keep landing hero, guide, preview, and shared public-shell data split into clearer carriers once those sections stabilize rather than regressing to one oversized owner file.
They should preserve rich help posture on those public entry points instead of falling back to thin browser `title` tooltips.
They should keep the stable docs walkthrough on one Bitcode-owned guide asset instead of preserving ordered demo-era media compatibility.
They should keep `/docs` as the real public teaching surface and `/demo-video` only as a compatibility alias into that docs-owned content.
They should also keep primary public entry links and guest access actions directly visible on smaller screens rather than adding another menu-only discovery layer.
They should keep footer entry links and protocol/version metadata progressive on smaller shells, using card/chip presentation instead of compressed inline microcopy.

## Development

Install dependencies from the repo root, then use the app directory for focused commands:

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
