# ADR: Auxillaries Overlay — Windows and Panes

Status: Accepted

Date: 2025-09-15

## Context

We standardized the retained `/orbitals` compatibility experience as the user-facing Auxillaries overlay used across the app. The overlay has two top-level states that a user toggles between, and within one of those states it hosts four per-auxillary panels. Historically we used “mode” and singular “orbital” inconsistently (and event names used `open-orbital`).

## Decision

1) Naming and Structure

- Experience: Auxillaries (user-facing), retained `/orbitals` path and event compatibility
- Windows (overlay top-level):
  - `SignInWindow`: Authentication (login) surface.
  - `SignUpWindow`: Onboarding/account surface that contains the panes.
- Panes (inside SignUpWindow):
  - `profile`, `connects`, `interfaces`, `$BTD`
- Headers: a singular auxillary header per pane for consistent title/copy:
  - Base: `OrbitalsOrbitalHeader`
  - Specialized: `OrbitalsUsersOrbitalHeader`, `OrbitalsConnectsOrbitalHeader`, `OrbitalsModelsOrbitalHeader`, `OrbitalsCreditsOrbitalHeader`

2) Component Placement

- Retained `/orbitals` experience code lives under: `uapi/app/orbitals/components/*`
  - Overlay root: `index.tsx`, Provider: `provider.tsx`, `OrbitalsProvider.tsx`
  - Panes and helpers: `profile-pane.tsx`, `connects-pane.tsx`, `models-pane.tsx`, `credits-pane.tsx`
  - Headers: `headers/*`, Shared atoms: `shared/*`, Models helpers: `models/*`
- Experience boundaries:
  - Marketing: `uapi/app/(root)/components/*`
  - Executions: `uapi/app/executions/components/*`
  - Conversations: `uapi/app/conversations/components/*`
  - Shared across experiences: `uapi/components/base/engi/*`

3) Events and API

- Global events (pluralized):
  - Open: `window.dispatchEvent(new CustomEvent('open-orbitals', { detail: { window: 'SignInWindow' | 'SignUpWindow', step?: OrbitalPane } }))`
  - Close: `window.dispatchEvent(new CustomEvent('close-orbitals'))`
  - The provider listens to both new (plural) and legacy (singular) names for back‑compat.
- Types:
  - `type OrbitalPane = 'profile' | 'connects' | 'models' | 'credits' | null`
  - Overlay prop: `window?: 'SignInWindow' | 'SignUpWindow'`
- Deep links: `/orbitals/(users|connects|models|credits)` open `SignUpWindow` with the corresponding pane (users → profile).
- Provider API: `openOrbital(window?: 'SignInWindow' | 'SignUpWindow', step?: OrbitalPane)`, `closeOrbital()`, `prefetchOrbital()`

4) HTTP and CSS Conventions

- API paths remain `/api/orbitals/*` as the retained compatibility boundary while user-facing product naming converges on Auxillaries.
- CSS Modules: animations declared via `:global { @keyframes ... }` (purity). Prefixes:
  - Experience: `orbitals-*`
  - Per-orbital: `orbitals-users-*`, `orbitals-connects-*`, `orbitals-models-*`, `orbitals-credits-*`

## Consequences

- The left toggle in the overlay switches between `SignInWindow` and `SignUpWindow`.
- Per-auxillary panes remain as the right abstraction inside SignUpWindow.
- Global events and docs keep retained `/orbitals` compatibility where needed, but user-facing naming should read as Auxillaries.
- Tests, stories, and fetchers use retained plural API paths and `/orbitals` imports until the compatibility layer is retired.
- Future work should place components according to the experience vs base boundary described above.

## Example Usage

```ts
import { openOrbital } from '@/app/orbitals/components/OrbitalsProvider';

// Open onboarding (SignUp) directly to Connects pane
openOrbital('SignUpWindow', 'connects');

// Open SignIn window
openOrbital('SignInWindow');

// Global events (alternative)
window.dispatchEvent(new CustomEvent('open-orbitals', { detail: { window: 'SignInWindow' } }));
```
