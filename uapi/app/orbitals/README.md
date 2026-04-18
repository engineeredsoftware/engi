# `/orbitals`

The V26 orbital system is a fullscreen Bitcode workspace entered from `/application`.
It also supports direct focused routes for reading one orbital in a contained operator workspace.

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
- `components/OrbitalsProvider.tsx`
  Fullscreen overlay provider and portal/event bridge.
- `components/OrbitalsContent.tsx`
  Shared ring/contained-workspace content shell.
- `components/OrbitalsConnectsPane.tsx`
  Repository and external connection posture.
- `components/OrbitalsInterfacesPane.tsx`
  Master-detail, conversation, proof, and operator-default posture.
- `components/OrbitalsProfilePane.tsx`
  Wallet identity, roles, balances, membership, and authentication posture.
- `components/OrbitalsBTDPane.tsx`
  Share posture, `$BTD` defaults, and BTD-specific follow-through.

## UX rule

Orbitals are not generic settings/account furniture.
They are a Bitcode operator mode with four rings and clear responsibilities.

The contained orbital shell used inside the application and direct orbital routes should:
- stay visually stable,
- keep ring/background motion subordinate to reading,
- preserve the active pane in a contained workspace,
- keep a full-width contained operator shell instead of shrinking back to modal-width account furniture,
- read as orbitals access and contained operator workspaces rather than generic settings/account furniture,
- and remain aligned to the same operator atmosphere as `/application`.

## Related files

- `../application/README.md`
- `../../styles/orbital.css`
- `../../styles/orbital-rings.css`
