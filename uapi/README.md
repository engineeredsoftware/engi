# `uapi/` Bitcode Application

`uapi/` is the active application owner for Bitcode.
It carries the `/application` transactions surface, fullscreen conversations, canonical `/auxillaries` reads, redirect-only `/orbitals` compatibility routes, app-owned Bitcode API routes, and the shared UI systems used during V26 second-gate and fourth-gate closure.

Active canon remains `V26`.
`uapi/` now carries promoted V26 route/application truth through fourth gate while `V27` remains the next draft target after this promotion.

## Primary routes

- `/`
- `/docs`
- `/demo-video`
  Mounted Bitcode public shell, docs hub, and compatibility walkthrough alias.
- `/application`
  Main Bitcode transactions surface. Transactions master-detail is the primary reading surface; give and need are the primary write actions.
- `/conversations`
  Fullscreen conversation mode entered from `/application`.
- `/executions`
  Retained compatibility route for Bitcode execution primitives, kept explicit as a fourth-gate promotion-boundary owner inside the broader activity family.
- `/edgetimes`
  Fourth-gate storage/schema/package ownership read mounted as a docs-branded Bitcode route.
- `/auxillaries/profile`
- `/auxillaries/connects`
- `/auxillaries/interfaces`
- `/auxillaries/btd`
  Canonical auxillary routes for direct auxillary reading without losing the application framing.

Compatibility orbital aliases such as `/orbitals/users`, `/orbitals/models`, and `/orbitals/btd` are redirect-only convergence entry points and should not be treated as the enduring V26 naming model.
Canonical `/auxillaries/*` routes and contained entry shells should teach auxillaries as the merged-world target, read as contained auxillary reads, and avoid regressing to generic workspace/settings/account language.
Selected `/application` and `/auxillaries` review surfaces should also keep live product wording on `Transactions` and `Auxillaries` instead of drifting back toward `workspace` or `transaction terminal`.
The shared auxillary metadata layer in `app/auxillaries/components/auxillary-pane-meta.ts` is the active owner for fullscreen auxillary-entry wording such as `Open Auxillaries fullscreen`, targeted auxillary-open actions, and the direct-route return action `Open transactions`.
Signed-in auxillary reopen actions should flow through the shared `openAuxillaries('auxillaries', step?)` contract rather than older account-named caller aliases.
Contained auxillary rails should converge on the shared panel-plus-tabs carriers in `app/auxillaries/components/shared/`, with retained `app/orbitals/components/*` imports treated as compatibility-only internals rather than active route ownership.

## Main route systems

- `app/application/`
  `/application` route-local composition, route-owned transaction query state, flow-guide/runtime bridge, give/need workbench, and transaction detail.
- `app/auxillaries/`
  Canonical focused auxillary routes for `Connects`, `Interfaces`, `Profile`, and `$BTD`.
- `app/orbitals/`
  Redirect-only compatibility route carriers preserving legacy deep links while `/auxillaries/*` remains canonical.
- `app/conversations/`
  Fullscreen conversation mode.
- `app/executions/`
  Retained runs, deliverables, and execution-detail route owners kept explicit during fourth-gate convergence and promotion-boundary proofing.
- `app/edgetimes/`
  Fourth-gate storage/schema/package ownership route and shared topology owner for `/edgetimes`.
- `app/api/`
  App-owned Bitcode JSON contracts, including executions, history, conversations, VCS, orbital preferences, client-error intake, preserved-runtime endpoints, and the `/api/edgetimes` storage/API witness.
- `components/base/bitcode/`
  Shared operator chrome, execution carriers, explainers, notifications, and reusable app primitives.

## Public shell owners

Third-gate public-shell work is now explicitly carried by:

- `app/(root)/components/PublicShellFrame.tsx`
  Mounted public-route provider shell for nav, auth, query, and auxillaries access.
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
  Stable docs-owned walkthrough card with user-facing fallback forward into `/application` when guide media is absent.
- `app/(root)/components/PublicDocsPageContent.tsx`
  Public docs hub content with route cards, inline widgets, walkthrough embedding, and public CTA posture.
- `app/docs/page.tsx`
  Real public docs route for the mounted Bitcode shell.
- `app/demo-video/page.tsx`
  Compatibility alias into the public docs hub and walkthrough content.
- `components/base/bitcode/layout/nav.tsx`
  Public-route navigation and access CTA chrome shared with product surfaces.
- `components/base/bitcode/layout/NavBrand.tsx`
  Bitcode public-route brand posture and explicit `network` / `docs` route naming.
- `components/base/bitcode/layout/footer.tsx`
  Shared public footer CTA and public-route link posture.
- `components/base/bitcode/layout/bitcode-public-copy.ts`
  Shared public-shell vocabulary for `Network`, `Transactions`, `Docs`, `Auxillaries`, and give/need teaching posture.
- `components/base/bitcode/layout/bitcode-public-explainers.ts`
  Shared public-shell explainer content for key entry links and the protocol reference.

Those owners should not reintroduce live `ComingSoon*` component naming, `coming-soon-*` stylesheet imports, or dormant access-gate code inside the mounted Bitcode public shell.
They should also keep landing hero, guide, preview, and shared public-shell data split into clearer carriers once those sections stabilize rather than regressing to one oversized owner file.
They should preserve rich help posture on those public entry points instead of falling back to thin browser `title` tooltips.
They should keep the stable docs walkthrough on one Bitcode-owned guide asset instead of preserving ordered demo-era media compatibility.
They should keep `/docs` as the real public teaching surface and `/demo-video` only as a compatibility alias into that docs-owned content.
They should also keep primary public entry links and guest access actions directly visible on smaller screens rather than adding another menu-only discovery layer.
They should keep footer entry links and protocol/version metadata progressive on smaller shells, using card/chip presentation instead of compressed inline microcopy.
They should now also keep `/edgetimes` aligned with the docs-branded public shell while treating it as a fourth-gate retained-system owner rather than brochure content.

Fourth-gate retained `/executions` health also now depends on explicit compatibility API carriers:

- `app/api/vcs/route.ts`
  Reader-first VCS compatibility carrier for retained execution selectors and repo context.
- `app/api/templates/deliverables/route.ts`
  Deliverable-template compatibility carrier for retained execution composition.
- `app/api/auxillaries/template-preferences/route.ts`
  Saved template-preference compatibility carrier for retained execution personalization.
- `app/api/auxillaries/profile/route.ts`, `app/api/auxillaries/connections/github/route.ts`, `app/api/auxillaries/btd/route.ts`, `app/api/auxillaries/usage/route.ts`, `app/api/auxillaries/transactions/route.ts`, `app/api/auxillaries/api-keys/route.ts`
  Canonical auxillary API owners for profile, Connects, $BTD balance history, BTD transaction history, and API-key management; active product code should prefer these over compatibility `orbitals` API aliases.

Those routes are not brochure compatibility leftovers.
They are current fourth-gate promotion-boundary owners and should stay fail-closed, tested, and documented until inward convergence removes the retained dependency.

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
pnpm exec jest --runInBand --testMatch '<rootDir>/tests/auxillariesProvider.test.tsx'
```

## README set required for second-gate closure

The active V26 checkpoint treats markdown/doc refurbishment as part of second-gate implementation, not as optional cleanup.
The current application doc set is:

- [README.md](../README.md)
- [app/application/README.md](app/application/README.md)
- [app/auxillaries/README.md](app/auxillaries/README.md)
- [app/orbitals/README.md](app/orbitals/README.md)
- [components/base/bitcode/README.md](components/base/bitcode/README.md)
- [components/base/bitcode/execution/README.md](components/base/bitcode/execution/README.md)

Those markdown carriers are part of the second-gate implementation/proof boundary.
If the route/package/component owners change, this doc set is expected to move with them.

## Related docs

- [BITCODE_SPEC_V26.md](../BITCODE_SPEC_V26.md)
- [BITCODE_SPEC_V26_DELTA.md](../BITCODE_SPEC_V26_DELTA.md)
- [BITCODE_SPEC_V26_PARITY_MATRIX.md](../BITCODE_SPEC_V26_PARITY_MATRIX.md)
- [BITCODE_SPEC_V26_NOTES.md](../BITCODE_SPEC_V26_NOTES.md)
- [protocol-demonstration/V26_APPLICATION_SYSTEMS.md](../protocol-demonstration/V26_APPLICATION_SYSTEMS.md)
- [protocol-demonstration/V26_PROOF_SURFACES.md](../protocol-demonstration/V26_PROOF_SURFACES.md)
