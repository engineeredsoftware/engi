# ADR: Auxillaries Overlay — Windows and Panes

Status: Accepted

Date: 2025-09-15

## Context

We standardized the user-facing Auxillaries overlay across the app. The canonical route and API family is now `/auxillaries/*`. The overlay has two top-level states that a user toggles between, and within one of those states it hosts four per-auxillary panels. Historically we used “mode” and singular “orbital” inconsistently, and this ADR records the Bitcode-side organization while compatibility residue is retired.

## Decision

1) Naming and Structure

- Experience: Auxillaries (user-facing), canonical `/auxillaries/*` route family
- Windows (overlay top-level):
  - `SignInWindow`: Authentication (login) surface.
  - `SignUpWindow`: Onboarding/account surface that contains the panes.
- Panes (inside SignUpWindow):
  - `profile`, `connects`, `interfaces`, `$BTD`
- Headers: a singular auxillary header per pane for consistent title/copy.
  Retained `uapi/app/orbitals/components/headers/*` files are now compatibility re-exports only; canonical header ownership lives under `uapi/app/auxillaries/components/headers/*`.

2) Component Placement

- Canonical route/overlay implementation now lives under: `uapi/app/auxillaries/components/*`
  - Overlay root: `AuxillariesSurface.tsx`, `AuxillariesContent.tsx`, `AuxillariesLoginPane.tsx`, `AuxillariesProvider.tsx`
  - Pane owners: `AuxillariesProfilePane.tsx`, `AuxillariesConnectsPane.tsx`, `AuxillariesInterfacesPane.tsx`, `AuxillariesBTDPane.tsx`
  - Lower-level pane owners: `headers/*`, `shared/*`, `models/*`, `AuxillariesDataSharingPanel.tsx`, `auxillary-pane-explainers.ts`, `profile-pane.module.css`
- Retained implementation internals still live under: `uapi/app/orbitals/components/*`
  - Compatibility wrappers and compatibility re-exports only; canonical pane logic and lower-level helper ownership now live under `uapi/app/auxillaries/components/*`
- Experience boundaries:
  - Marketing: `uapi/app/(root)/components/*`
  - Executions: `uapi/app/executions/components/*`
  - Conversations: `uapi/app/conversations/components/*`
  - Shared across experiences: `uapi/components/base/bitcode/*`

3) Events and API

- Global events:
  - Open: `window.dispatchEvent(new CustomEvent('open-auxillaries', { detail: { window: 'SignInWindow' | 'SignUpWindow', step?: AuxillaryPane } }))`
  - Close: `window.dispatchEvent(new CustomEvent('close-auxillaries'))`
- Types:
  - `type AuxillaryPane = 'profile' | 'connects' | 'interfaces' | 'btd' | null`
  - Overlay prop: `window?: 'SignInWindow' | 'SignUpWindow'`
- Deep links: canonical `/auxillaries/(profile|connects|interfaces|btd)` open the focused contained read.
- Provider API: `openAuxillaries(window?: 'SignInWindow' | 'SignUpWindow', step?: AuxillaryPane)`, `closeAuxillaries()`, `prefetchAuxillaries()`

4) HTTP and CSS Conventions

- API paths are canonicalized under `/api/auxillaries/*`.
- CSS Modules: animations declared via `:global { @keyframes ... }` (purity).
  Retained style prefixes like `orbitals-*` are internal compatibility residue that should keep shrinking until the full fifth-gate cut-over is complete.

## Consequences

- The left toggle in the overlay switches between `SignInWindow` and `SignUpWindow`.
- Per-auxillary panes remain as the right abstraction inside SignUpWindow.
- User-facing naming and canonical routes read as Auxillaries.
- Tests, stories, and fetchers should target `/auxillaries` owners first.
- Future work should place components according to the experience vs base boundary described above.

## Example Usage

```ts
import { openAuxillaries } from '@/app/auxillaries/components/AuxillariesProvider';

// Open onboarding (SignUp) directly to Connects pane
openAuxillaries('SignUpWindow', 'connects');

// Open SignIn window
openAuxillaries('SignInWindow');

// Global events (alternative)
window.dispatchEvent(new CustomEvent('open-auxillaries', { detail: { window: 'SignInWindow' } }));
```
