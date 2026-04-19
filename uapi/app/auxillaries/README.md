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
- `../orbitals/components/*`
  Retained pane implementations, tabs, panels, and fullscreen content reused by the canonical auxillary shell during the V26 convergence period.

## Canonical rule

User-facing route and HTML posture should prefer `/auxillaries/*`.
`/orbitals/*` survives only as a redirect-only compatibility family until later cleanup removes the alias entirely.
