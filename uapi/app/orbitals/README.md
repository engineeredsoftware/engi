# `/orbitals` retained Bitcode Auxillaries route

The V26 `/orbitals` path is a retained compatibility route converging on Bitcode `Auxillaries`.
It remains a fullscreen Bitcode surface entered from `/application`, and it also supports direct focused routes for reading one auxillary in a contained auxillary read.

The active orbital ring model is fixed:
- `Connects`
- `Interfaces`
- `Profile`
- `$BTD`

## Route model

Preferred direct routes:
- `/orbitals/connects`
- `/orbitals/interfaces`
- `/orbitals/profile`
- `/orbitals/btd`

Compatibility aliases may still exist for convergence:
- `/orbitals/users` -> `profile`
- `/orbitals/models` -> `interfaces`
- `/orbitals/credits` -> `btd`

Those aliases are not the enduring V26 naming model.

## Ownership

- `OrbitalsRouteClient.tsx`
  Focused direct-route shell.
- `components/orbital-pane-meta.ts`
  Shared orbital naming, route, and user-facing copy owner for entry buttons and direct-route return actions.
- `components/OrbitalsProvider.tsx`
  Fullscreen overlay provider and portal/event bridge.
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
- `../api/orbitals/user/data-share/route.ts`
  Fail-closed repository knowledge-sharing carrier used by the Profile orbital.
- `components/OrbitalsBTDPane.tsx`
  Share posture, `$BTD` defaults, and BTD-specific follow-through.

## UX rule

Auxillaries are not generic settings/account furniture.
They are Bitcode’s extra-network, non-transactional, still-proven companion surfaces around the core network and transaction system.
The retained `/orbitals` route continues to carry the four-ring presentation during convergence, but the merged-world naming target is `Auxillaries`.

The contained auxillary shell used inside the application and direct orbital routes should:
- stay visually stable,
- keep ring/background motion subordinate to reading,
- preserve the active pane in a contained auxillary read,
- route contained navigation through shared orbital panels plus tabs instead of floating sequence cards and free-position ring labels,
- keep a full-width contained operator shell instead of shrinking back to modal-width account furniture,
- read as retained auxillaries access and contained auxillary reads rather than generic settings/account furniture,
- keep shared entry labels such as `Open Auxillaries fullscreen`, targeted actions such as `Open Connects fullscreen`, and the direct-route return action `Open transactions` aligned across the application,
- reopen signed-in orbital overlays through `openOrbital('orbitals', step?)` instead of older account-named active callers,
- and remain aligned to the same operator atmosphere as `/application`.

## Related files

- `../application/README.md`
- `../../styles/orbital.css`
- `../../styles/orbital-rings.css`
