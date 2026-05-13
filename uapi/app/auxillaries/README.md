# `/auxillaries` canonical Bitcode Auxillaries routes

`/auxillaries/*` is the canonical direct-route family for focused Bitcode auxillary reads.
It preserves the four-ring auxillary system while keeping the merged-world naming target explicit in route, metadata, and user-facing copy.

## Canonical routes

- `/auxillaries/wallet`
- `/auxillaries/externals`
- `/auxillaries/interfaces`
- `/auxillaries/profile`

Legacy `/auxillaries/btd` and `/auxillaries/connects` links are accepted only as aliases and redirect to `/auxillaries/wallet` and `/auxillaries/externals`.
Former `/orbitals/*` links are redirect-only and should resolve here without rendering canonical HTML.

## Ownership

- `[pane]/page.tsx`
  Canonical direct-route owner, canonical metadata, and redirect normalization for pane aliases.
- `AuxillariesRouteClient.tsx`
  Canonical focused auxillary shell and direct-route owner for contained auxillary reads.
- `components/auxillary-pane-meta.ts`
  Canonical auxillary route builder, metadata owner, and support-path bridge.
- `components/AuxillariesProvider.tsx`
  Canonical fullscreen auxillary overlay provider, event bridge, and portal owner.
- `components/AuxillariesSurface.tsx`, `components/AuxillariesContent.tsx`, `components/AuxillariesLoginPane.tsx`
  Canonical auxillary shell, contained reading surface, and sign-in entry owners.
- `components/Auxillaries{Wallet,Externals,Profile,Interfaces}Pane.tsx`
  Canonical pane implementation owners imported by the auxillary surface. These files now hold the live pane logic and import canonical auxillary headers, shared carriers, explainer maps, data-share panels, and model sections directly.
- `components/headers/*`, `components/shared/*`, `components/models/*`, `components/AuxillariesDataSharingPanel.tsx`, `components/auxillary-pane-explainers.ts`, `components/profile-pane.module.css`
  Canonical auxillary lower-level implementation carriers for pane headers, onboarding overlays, preference/stat sections, model defaults, data-share posture, explainer copy, and profile styling.
- `../orbitals/components/*`
  Redirect-support route wrappers still being retired behind canonical auxillary ownership during fifth gate.
- `../api/auxillaries/*`
  Canonical auxillary API owners for profile, Externals, notifications, onboarding, model preferences, BTD balance history, BTD transaction history, API keys, and data-share posture.

## Canonical rule

User-facing route and HTML posture should prefer `/auxillaries/*`.
Active product code should also prefer `/api/auxillaries/*`.
`/orbitals/*` and `/api/orbitals/*` are redirect-support carriers only and should be retired entirely by full V26 closure.

## V28 prerequisite posture

Auxillaries is the V28 prerequisite control plane for Terminal:

- Wallet starts with Bitcoin wallet authentication. The wallet proof is the minimum identity origin for Supabase synchronization and local wallet readiness.
- Externals comes second and owns GitHub App installation/source-provider scope needed for Give and Need.
- Profile owns optional email/contact/admin data and must not appear as the primary identity requirement.
- Wallet also reflects BTD range/share posture after the shared auxillary data read settles.
- The top chrome must show a loading/readiness state until auxillary data determines whether a wallet exists; it must not briefly show `Connect Wallet` during unresolved connection reads.
- QA builds should enable `NEXT_PUBLIC_BITCODE_QA_VERBOSE=true` and `BITCODE_QA_VERBOSE=true` to trace client/server identity synchronization without logging secrets.

## Leather wallet contract

Leather is supported through the injected `window.LeatherProvider.request` API.
The active Wallet pane and wallet utilities must:

- detect Leather by `window.LeatherProvider.request`;
- call `getAddresses` and select BTC entries by `symbol`/`type`, never by array index;
- prefer `p2tr` for the Bitcode auth address and retain `p2wpkh` as the payment address when both are returned;
- derive the Leather account parameter from the BTC derivation path when available;
- call `signMessage` with explicit `paymentType`, `network`, and `account` for the Bitcode authentication challenge;
- keep `open`, `signPsbt`, and `sendTransfer` available as tested utilities for Terminal BTC/PSBT flows, without treating them as proof of wallet identity by themselves.

Leather's documented Bitcoin `network` values include `mainnet`, `testnet`, `signet`, `sbtcDevenv`, and `devnet`.
The V28 staging Testnet4 lane currently calls Leather with `testnet` because that is the documented Leather browser-provider enum.
