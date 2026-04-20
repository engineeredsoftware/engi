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
- Headers: a singular auxillary header per pane for consistent title/copy:
  - Base: `OrbitalsOrbitalHeader`
  - Specialized: `OrbitalsUsersOrbitalHeader`, `OrbitalsConnectsOrbitalHeader`, `OrbitalsModelsOrbitalHeader`, `OrbitalsCreditsOrbitalHeader`

2) Component Placement

- Retained implementation code currently lives under: `uapi/app/orbitals/components/*`
  - Overlay root: `index.tsx`, Provider: `provider.tsx`, `OrbitalsProvider.tsx`
  - Panes and helpers: `profile-pane.tsx`, `connects-pane.tsx`, `models-pane.tsx`, `credits-pane.tsx`
  - Headers: `headers/*`, Shared atoms: `shared/*`, Models helpers: `models/*`
- Experience boundaries:
  - Marketing: `uapi/app/(root)/components/*`
  - Executions: `uapi/app/executions/components/*`
  - Conversations: `uapi/app/conversations/components/*`
  - Shared across experiences: `uapi/components/base/engi/*`

3) Events and API

- Global events:
  - Open: `window.dispatchEvent(new CustomEvent('open-auxillaries', { detail: { window: 'SignInWindow' | 'SignUpWindow', step?: OrbitalPane } }))`
  - Close: `window.dispatchEvent(new CustomEvent('close-auxillaries'))`
- Types:
  - `type OrbitalPane = 'profile' | 'connects' | 'models' | 'credits' | null`
  - Overlay prop: `window?: 'SignInWindow' | 'SignUpWindow'`
- Deep links: canonical `/auxillaries/(profile|connects|interfaces|btd)` open the focused contained read.
- Provider API: `openAuxillaries(window?: 'SignInWindow' | 'SignUpWindow', step?: OrbitalPane)`, `closeAuxillaries()`, `prefetchAuxillaries()`

4) HTTP and CSS Conventions

- API paths are canonicalized under `/api/auxillaries/*`.
- CSS Modules: animations declared via `:global { @keyframes ... }` (purity). Prefixes:
  - Experience: `orbitals-*`
  - Per-orbital: `orbitals-users-*`, `orbitals-connects-*`, `orbitals-models-*`, `orbitals-credits-*`

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
