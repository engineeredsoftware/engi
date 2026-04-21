# `/orbitals` redirect-only Bitcode Auxillaries compatibility route

The V26 `/orbitals` path is a redirect-only compatibility route converging on Bitcode `Auxillaries`.
It no longer acts as the canonical direct-route family. Canonical focused auxillary reads now live at `/auxillaries/*`, while `/orbitals/*` preserves legacy deep links through redirects only.

The active orbital ring model is fixed:
- `Connects`
- `Interfaces`
- `Profile`
- `$BTD`

## Route model

Canonical direct routes:
- `/auxillaries/connects`
- `/auxillaries/interfaces`
- `/auxillaries/profile`
- `/auxillaries/btd`

Compatibility redirects may still exist for convergence:
- `/orbitals/users` -> `profile`
- `/orbitals/models` -> `interfaces`
- `/orbitals/btd` -> `btd`

Those aliases are not the enduring V26 naming model.

## Ownership

- `../auxillaries/[pane]/page.tsx`
  Canonical focused direct-route shell owner.
- `page.tsx` plus focused `*/page.tsx`
  Redirect-only compatibility carriers from `/orbitals/*` into `/auxillaries/*`.
- `components/orbital-pane-meta.ts`
  Shared orbital naming, canonical auxillary route building, compatibility detection, and user-facing copy owner for entry buttons and direct-route return actions.
- `components/OrbitalsProvider.tsx`
  Compatibility wrapper over the canonical fullscreen auxillary provider and portal/event bridge.
- `components/OrbitalsContent.tsx`
  Shared ring/contained-orbital content shell.
- `components/shared/OrbitalsWorkspacePanels.tsx`
  Shared contained-orbital rail for the application overlay and direct orbital routes.
- `components/shared/OrbitalsPaneTabs.tsx`
  Shared contained-orbital tabs for direct and overlay reading.
- `components/OrbitalsConnectsPane.tsx`
  Repository and external connection posture.
- `components/OrbitalsInterfacesPane.tsx`
  Master-detail, conversation, proof, and operator-default posture.
- `components/OrbitalsProfilePane.tsx`
  Wallet identity, roles, balances, membership, and authentication posture.
- `../api/auxillaries/user/data-share/route.ts`
  Fail-closed repository knowledge-sharing carrier now surfaced from the `$BTD` auxillary.
- `components/OrbitalsBTDPane.tsx`
  Share posture, `$BTD` defaults, and BTD-specific follow-through.

## UX rule

Auxillaries are not generic settings/account furniture.
They are Bitcode’s extra-network, non-transactional, still-proven companion surfaces around the core network and transaction system.
The retained `/orbitals` route family survives only as redirect-only compatibility. The merged-world naming target and canonical direct-route family are `Auxillaries` at `/auxillaries/*`.

The contained auxillary shell used inside the application and direct orbital routes should:
- stay visually stable,
- keep ring/background motion subordinate to reading,
- preserve the active pane in a contained auxillary read,
- route contained navigation through shared orbital panels plus tabs instead of floating sequence cards and free-position ring labels,
- keep a full-width contained operator shell instead of shrinking back to modal-width account furniture,
- read as retained auxillaries access and contained auxillary reads rather than generic settings/account furniture,
- keep shared entry labels such as `Open Auxillaries fullscreen`, targeted actions such as `Open Connects fullscreen`, and the direct-route return action `Open transactions` aligned across the application,
- reopen signed-in overlays through `openAuxillaries('auxillaries', step?)` from active callers,
- and remain aligned to the same operator atmosphere as `/application`.

## Related files

- `../auxillaries/README.md`
- `../application/README.md`
- `../../styles/orbital.css`
- `../../styles/orbital-rings.css`
