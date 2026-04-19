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
- `../orbitals/OrbitalsRouteClient.tsx`
  Shared focused auxillary shell and contained read surface.
- `../orbitals/components/orbital-pane-meta.ts`
  Canonical auxillary route builder and compatibility path owner.
- `../orbitals/components/*`
  Shared pane implementations, tabs, panels, and fullscreen overlay content.

## Canonical rule

User-facing route and HTML posture should prefer `/auxillaries/*`.
`/orbitals/*` survives only as a redirect-only compatibility family until later cleanup removes the alias entirely.
