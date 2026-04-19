# `uapi/components/base/engi`

This directory holds the shared Bitcode operator component systems used by `/application`, orbitals, conversations, and the retained route chrome.

In V26 second-gate work, this directory is not a grab-bag.
It is the reusable carrier layer for:
- route chrome,
- shared activity vocabulary,
- notifications and menus,
- execution/master-detail components,
- and the supporting primitives needed to keep `/application` cleanly componentized.

## Main system areas

- `layout/`
  Navbar, user menu, route-surface classification, and related chrome carriers.
- `activity/`
  Shared activity vocabulary bridging transactions-first execution streams and later notification/public/personal activity classes.
- `notifications/`
  Operator notification surfaces tied to the transactions and orbital shell.
- `execution/`
  Shared transaction tables, payload readers, detail panels, explainers, activity streams, and field/metric carriers.
- `orbitals/`
  Shared orbital visual and ring-adjacent primitives reused by app-owned orbitals.

## V26 second-gate rule

New product behavior should prefer this shared layer when the result is:
- reusable across `/application`, `/orbitals`, and `/conversations`,
- typed and provable,
- cleaner than page-local duplication,
- and aligned to Bitcode operator UX rather than marketing or demo posture.

Do not use this directory to hide page-local uncertainty.
If a concern is only meaningful for one route and has not stabilized, keep it route-local until the abstraction is real.

This shared layer is also part of the second-gate markdown/refurbishment requirement.
If shared operator chrome or execution carriers change materially, their README carriers are expected to stay current in the same checkpoint.

## Key docs

- [activity/README.md](activity/README.md)
  Shared Bitcode activity vocabulary and convergence intent.
- [execution/README.md](execution/README.md)
  Shared transaction/detail/payload carrier map.
- [../../../app/application/README.md](../../../app/application/README.md)
  Route-local `/application` ownership.
- [../../../app/orbitals/README.md](../../../app/orbitals/README.md)
  Orbitals route and overlay ownership.
