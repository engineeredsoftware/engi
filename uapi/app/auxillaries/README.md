# `/auxillaries` canonical Bitcode Auxillaries routes

`/auxillaries/*` is the canonical V26 direct-route family for focused Bitcode auxillary reads.
It preserves the four-ring auxillary system while keeping the merged-world naming target explicit in route, metadata, and user-facing copy.

## Canonical routes

- `/auxillaries/connects`
- `/auxillaries/interfaces`
- `/auxillaries/profile`
- `/auxillaries/btd`

Those routes are the enduring V26 naming model.
Former `/orbitals/*` links are redirect-only and should resolve here without rendering canonical HTML.

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
  Canonical pane implementation owners imported by the auxillary surface. These files now hold the live pane logic and import canonical auxillary headers, shared carriers, explainer maps, data-share panels, and model sections directly.
- `components/headers/*`, `components/shared/*`, `components/models/*`, `components/AuxillariesDataSharingPanel.tsx`, `components/auxillary-pane-explainers.ts`, `components/profile-pane.module.css`
  Canonical auxillary lower-level implementation carriers for pane headers, onboarding overlays, preference/stat sections, model defaults, data-share posture, explainer copy, and profile styling.
- `../orbitals/components/*`
  Redirect-support route wrappers still being retired behind canonical auxillary ownership during fifth gate.
- `../api/auxillaries/*`
  Canonical auxillary API owners for profile, Connects, notifications, onboarding, model preferences, BTD balance history, BTD transaction history, API keys, and data-share posture.

## Canonical rule

User-facing route and HTML posture should prefer `/auxillaries/*`.
Active product code should also prefer `/api/auxillaries/*`.
`/orbitals/*` and `/api/orbitals/*` are redirect-support carriers only and should be retired entirely by full V26 closure.
