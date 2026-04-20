# `/auxillaries` canonical Bitcode Auxillaries routes

`/auxillaries/*` is the canonical V26 direct-route family for focused Bitcode auxillary reads.
It preserves the four-ring auxillary system while keeping the merged-world naming target explicit in route, metadata, and user-facing copy.

## Canonical routes

- `/auxillaries/connects`
- `/auxillaries/interfaces`
- `/auxillaries/profile`
- `/auxillaries/btd`

Those routes are the enduring V26 naming model.
Legacy `/orbitals/*` links are compatibility-only and should redirect here without rendering canonical HTML.

## Ownership

- `[pane]/page.tsx`
  Canonical direct-route owner, canonical metadata, and redirect normalization for pane aliases.
- `AuxillariesRouteClient.tsx`
  Canonical focused auxillary shell and direct-route owner for contained auxillary reads.
- `components/auxillary-pane-meta.ts`
  Canonical auxillary route builder, metadata owner, and compatibility-path bridge.
- `components/AuxillariesProvider.tsx`
  Canonical fullscreen auxillary overlay provider, event bridge, and portal owner.
- `components/AuxillariesSurface.tsx`, `components/AuxillariesContent.tsx`, `components/AuxillariesLoginPane.tsx`
  Canonical auxillary shell, contained reading surface, and sign-in entry owners.
- `components/Auxillaries{Profile,Connects,Interfaces,BTD}Pane.tsx`
  Canonical pane owners imported by the auxillary surface; retained orbitals-pane implementations sit behind these wrappers until full fifth-gate retirement is complete.
- `components/shared/*`
  Canonical auxillary tabs and workspace-panel carriers for the focused route and contained overlay.
- `../orbitals/components/*`
  Compatibility route wrappers plus retained pane/header internals reused behind canonical auxillary pane owners while deeper fifth-gate retirement remains open.
- `../api/auxillaries/*`
  Canonical auxillary API owners for profile, Connects, notifications, onboarding, model preferences, BTD balance history, BTD transaction history, API keys, and data-share posture.

## Canonical rule

User-facing route and HTML posture should prefer `/auxillaries/*`.
Active product code should also prefer `/api/auxillaries/*`.
`/orbitals/*` and `/api/orbitals/*` are compatibility carriers only and should be retired entirely by full V26 closure.
