# Bitcode V48 QA Ledger

## Status

- Version: `V48`
- Active canon during QA: `V47`
- Posture: interactive local experiential QA of the first live commercial (testnet) experience; app runs locally (`pnpm -C uapi dev:remote`) against the staging Supabase project; wallet network testnet4
- Source-safety posture: source-safe evidence only; no secrets, protected source, provider payloads, wallet material, service-role keys, database credentials, or raw private prompts are serialized here.

## Testnet BTC resources

- Faucet (testnet4): https://coinfaucet.eu/en/btc-testnet4/
- Faucet/exchange (testnet coins): https://altquick.com/exchange/
- Explorer (testnet4): https://mempool.space/testnet4 — tx view at `…/testnet4/tx/<txid>`, address view at `…/testnet4/address/<address>`
- The in-app "BTC in wallet" card reads the bound address via `/api/wallet/btc-balance` (mempool.space, testnet4-first with testnet3 fallback for the ambiguous `testnet` binding label).

## QA scripts (committed at `supabase/queries/v48_qa_*.sql`)

Run in the Supabase SQL editor; all auto-target the most recent `custom:bitcode-bitcoin` user (purge-proof, no UUID editing). Run-after map:

| Script | Run after |
|---|---|
| `v48_qa_01_auth_user_identity` | wallet sign-up / sign-in |
| `v48_qa_02_profile_wallet_binding` | first sessioned page load (bridge mount) or any wallet persist |
| `v48_qa_03_user_connections_token_safe` | wallet binding write or GitHub install callback |
| `v48_qa_04_repository_inventory` | Externals pane load post-GitHub-connect (repo sync) |
| `v48_qa_05_track1_readiness_rollup` | anytime — one-row Track 1 summary |
| `v48_qa_06_deposit_activity` | each /deposit action (connect, synthesize, approve, deposit) |
| `v48_qa_07_depository_admission_evidence` | deposit approval (Depository admission roots/index state) |
| `v48_qa_08_recent_errors` | whenever a flow misbehaves or qa06 shows has_error |

Track 3-4 scripts (BTD ledger, settlement, pack journaling) get added when those tracks open; the `v28_qa_terminal_*` set remains the historical reference.

## QA Tracks

1. Identity, authentication, sign up/in, Auxillaries (GitHub, wallet connections)
2. Depositing (connect knowledge, request AssetPack syntheses, review, deposit)
3. Reading (connect knowledge, request Read, review Need, review Fits, buy Fits)
4. Ledgerized journaling (replayability, auditability, `/packs` UX/UI, Auxillaries history)

## Findings

### F1 — doc-code build broken on clean checkout (pre-existing)

- Severity: low (no runtime consumers; only the `uapi dev` script's prebuild chain invokes it)
- Observed: `pnpm -w --filter @bitcode/doc-code build` fails with TS6059/TS6307 rootDir violations — the package extends the root tsconfig whose `paths` map `@bitcode/*` to package source trees, so `tsc -b` pulls `agent-generics/src` into the program.
- Disposition: candidate for repair or retirement in a V48 gate; `dev:remote` unaffected.

### F2 — Triplicated Supabase browser clients (GoTrueClient warning)

- Severity: medium (Supabase: "may produce undefined behavior when used concurrently under the same storage key" — credible source of auth/session flakiness)
- Observed on first page load (`/`): three `GoTrueClient` constructions —
  1. `packages/supabase/src/index.ts:87` module-level client, reaching the browser bundle via `packages/btd` → `packages/api/src/routes/auxillaries-contract.ts` → `auxillary-pane-meta.ts` → `hooks/useUserData.ts` → `WalletSessionPersistenceBridge`.
  2. `packages/artifacts/src/artifacts.ts:29` module-level client, via `packages/logger` → `packages/orm` models → `useUserData` (note: ORM in the client bundle at all is a packaging smell).
  3. `uapi` `AuthProvider` → `createBrowserClient` (the legitimate one).
- Disposition: V48 fix candidate — single browser client (or lazy/server-only module-level clients) and pruning server-only packages from the client graph.

### F3 — Wallet-extension console noise on page load (benign, external)

- Observed: `contentscript.js`/`inpage.js` MaxListenersExceededWarning, ObjectMultiplex orphaned-stream warnings, `Unable to set StacksProvider` — emitted by browser wallet extensions (provider injection collisions), not by the app.
- Disposition: no action; QA hygiene note — run with a single wallet extension enabled to keep sats-connect provider selection deterministic.

### F4 — Legacy email/phone authentication residue contradicts wallet-first identity

- Severity: medium (user-facing identity confusion; canonical law is "a Bitcoin wallet is the minimum identity/authentication path for staging; email remains optional notification and recovery contact after wallet identity exists")
- Canonical path (calibrated): nav "Connect Wallet" guest CTA (gated by `DISABLE_CREATE_ACCOUNT`, default-open in dev/QA) → Auxillaries SignUpWindow → Wallet pane → sats-connect signature (testnet4) → `signInWithOAuth({ provider: 'custom:bitcode-bitcoin' })` → Supabase session → `/tps/supabase/callback`.
- Residue inventory (eradication candidates for a V48 gate):
  1. `uapi/app/login/` route family (page, head, magic-link `actions.ts`, `callback/LoginCallbackClient.tsx`) — live legacy email-first sign-in surface at `/login`.
  2. `AuxillariesLoginPane.tsx:76` mounts legacy email-OTP `LoginForm` inside the canonical wallet-first pane.
  3. `components/base/bitcode/auth/PhoneSSO.tsx` — phone-OTP sign-in, routes to `/login`.
  4. `AuxillariesProfilePane.tsx:283-289` — `signInWithOtp` used for the optional-email flow; needs disambiguation from authentication semantics.
  5. `SocialAccountLinker.tsx` — generic `signInWithOAuth`; keep only if scoped to account linking, not session minting.
  6. Root cause: `/login` was never classified by the V47 Gate 2 feature-excess audit (absent from `.bitcode/v47-feature-excess-alignment-audit.json`), so it escaped the launch freeze.
- Production note: deployed launch requires `NEXT_PUBLIC_BITCODE_ENV=testnet` (or explicit flag) or `DISABLE_CREATE_ACCOUNT` defaults ON and the Connect Wallet CTA is disabled.

### F5 — Query string on `redirect_to` defeats GoTrue allow-list matching; auth code strands on the Site URL origin; no session is ever minted (FIXED in code)

- Severity: high (track-1 blocker; also breaks production sign-in from `www.bitcode.exchange`, not just localhost)
- Observed (two attempts): Connect Wallet → Leather signature OK → Supabase created the auth user (`custom:bitcode-bitcoin`, sub `bitcoin:testnet:tb1p6x7…`) → both callbacks landed on `bitcode.exchange` instead of localhost; `auth.users.last_sign_in_at: null` both times; `user_profiles` trigger-created with all-null binding fields; localhost showed sessionless "connected" chrome.
- Root cause (proven by curl probes against staging GoTrue, no wallet needed — `/auth/v1/authorize` to capture flow `state`, then `/auth/v1/callback?code=garbage&state=…` to reveal the stored redirect):
  - `http://localhost:3000/tps/supabase/callback` (exact allow-list entry) → honored.
  - The same URL with `?next=%2Fauxillaries%2Fwallet` (what the app actually sent) → rejected → Site URL fallback (`https://bitcode.exchange`).
  - `https://www.bitcode.exchange/tps/supabase/callback?next=…` → also rejected → apex fallback (production sign-in equally broken).
  - The dashboard glob `http://localhost:3000/**` matches nothing (bare root rejected too); the Site-URL hostname (apex) is exempt from matching entirely, which is why only apex "worked".
  - GoTrue allow-list matching is exact-string against entries; any query string defeats the match. The first-attempt diagnosis (missing allow-list entry) was wrong — the entries were present and correct.
- Failure chain after fallback: auth code lands on apex root → `uapi/app/page.tsx:40` forwards stray `?code` to `/tps/supabase/callback` → `exchangeCodeForSession` fails because the PKCE `code_verifier` lives in the initiating origin's storage → `LoginCallbackClient.tsx` emits `/?loginError=server_error&loginErrorDescription=…code verifier should be non-empty`. All observed symptoms reproduce from this one defect.
- Fix (code, implemented): `uapi/lib/supabase-auth-redirect.ts` — `redirect_to` is now always the query-free `${origin}/tps/supabase/callback`; the post-auth destination travels via origin-local storage and is consumed once by `LoginCallbackClient` (explicit `?next=` still wins for back-compat). Call sites converted: `AuxillariesWalletConnectionPanel`, `SocialAccountLinker`, `SocialLoginButton`. Regression-pinned by `uapi/tests/supabaseAuthRedirect.test.ts`.
- Dashboard: no change required — exact entries for localhost and www callbacks already exist and exact matching now applies; glob entries can stay but are ineffective.
- Code-hardening candidates (still open): (a) the app renders "connected" wallet chrome from client-side wallet-session persistence even when `hasUser: false` — sessionless state should not look signed-in; (b) `loginError`/`loginErrorDescription` query params surfaced only as raw URL params — no visible error UI; (c) callback flow should fail loudly when the PKCE verifier is absent.
- Retest (local, 2026-06-12): VERIFIED — session minted (`auth.users.last_sign_in_at` set ~3s after creation, user `267ccb92…`), callback returned to `localhost:3000`, signed-in nav chrome with Sign out renders. Post-auth landing initially hit `/terminal` because `buildAuxillariesRoutePath` targets the legacy overlay root (see F8); destination now pinned to `/packs`.
- Note on the production `/tps/wallet/authorize` hop: expected and correct even for localhost sessions. The custom provider's authorize/token endpoints are registered once per Supabase project (project-level config, one URL), so every client transits the registered production origin. The hop is PKCE-safe: the verifier never leaves the initiating origin; the provider page only ferries `code`+`state` back to GoTrue, which then redirects to the initiating origin's callback. A localhost authorize URL would require a separate Supabase project (or local GoTrue) — unnecessary.
- Residual (FIXED in code — F5a): `user_profiles` binding fields remained all-null after sign-in; Wallet Auxillary showed "No Bitcoin wallet connected"/"Binding repairable" and Profile readiness Blocked.
  - Trace: the canonical binding write is `POST /api/wallet/authenticate` → `settings.walletBinding` (hydrated into the virtual `wallet_*` fields by `hydrateBitcodeProfile`; the raw columns staying null is expected). That route was never called in the canonical sign-up: it 401s without a session, the wallet signature happens on the prod `/tps/wallet/authorize` page (not the initiating origin), so `WalletSessionPersistenceBridge` finds no locally staged proof to replay after the session lands. GoTrue also drops the provider's custom `bitcoin_*` userinfo claims from `identity_data` (only `sub`/`name`/`preferred_username` survive), so the rich proof material is not recoverable client-side.
  - Fix: `/api/wallet/authenticate` gains an `source: 'oauth-identity'` mode that derives the binding server-side from the session's GoTrue-verified `custom:bitcode-bitcoin` identity (address+network parsed from the identity `sub`, provider from the userinfo label, no client-trusted wallet fields), writes `settings.walletBinding` (`proofKind: 'provider_session'`, status `pending`) + `user_connections` (`auth_source: 'bitcoin_wallet_oauth_identity'`), sets `username` (clears the blocking `profile.identity_missing`), and no-ops idempotently when the binding already matches. `WalletSessionPersistenceBridge` triggers it whenever a wallet-backed session exists with nothing replayable staged locally, then mirrors the result into the local wallet identity so the Wallet Auxillary shows the connection. Tests: `tests/api/walletAuthenticateRoute.test.ts`, `tests/walletSessionPersistenceBridge.test.tsx`.
  - Retest: refresh localhost while signed in → bridge fires on mount → QA script 03 should show `username` + `settings.bitcodeProfile.walletBinding` populated (raw `wallet_*` columns stay null by design), Wallet Auxillary shows the bound address, Profile readiness no longer lists "Display identity is missing" / "Wallet binding is missing".

### F6 — Auxillaries readiness blockers render authentication-shaped errors in a sessionless state

- Severity: medium (misleading; says "Profile row is missing" / "Wallet binding is missing" when the actual condition is "not signed in")
- Cause: `packages/api/src/routes/auxillaries-contract.ts:765` emits `profile.missing` whenever the contract receives no profile; an unauthenticated request gets no profile via RLS, so all blockers fire. The readiness contract should distinguish "no session" from "session with incomplete profile" and lead with the wallet sign-in action.

### F7 — React hydration errors (#418/#423) on production landing (www.bitcode.exchange)

- Severity: low/medium (prod console errors on first paint; minified — needs dev reproduction to attribute; suspects: client-only state rendered during SSR in nav/landing chrome)

### F8 — Legacy `/terminal` route still live; auxillaries plumbing routes to it

- Severity: medium (legacy surface reachable post-launch; post-auth callback landed there until pinned to `/packs`)
- Observed: first successful wallet sign-in landed on `/terminal` — `buildAuxillariesRoutePath` builds `/terminal?auxillary-open-to=…` via `AUXILLARY_OVERLAY_ROUTE_ROOT = '/terminal'` (`uapi/app/auxillaries/components/auxillary-pane-meta.ts:18`), and the legacy terminal page still renders.
- Canon: `/terminal` functionality was split into `/packs`, `/read`, and `/deposit`. A V48 gate should (a) verify each terminal capability was properly ported to the three routes, (b) retarget or remove `AUXILLARY_OVERLAY_ROUTE_ROOT` and remaining `/terminal` links, and (c) remove the unused terminal page/code (relates to F4 — another surface the V47 feature-excess audit never classified).
- Interim fix: wallet sign-in post-auth destination pinned to `/packs` in `AuxillariesWalletConnectionPanel`; GitHub connect redirect retargeted to `/packs?auxillary-open-to=externals` in `tps/github/_callback-handler.ts`; all seven `auxillaries-contract.ts` repair/recovery routes retargeted from `/terminal?auxillary-open-to=…` to `/packs?auxillary-open-to=…` after "Add Email" landed on the legacy terminal page with no email experience (the `AuxillariesProvider` reads the open-to param on any route, so panes open over `/packs`; the v40 browser-proof checker pins only `bitcode-browser-proof.ts` route states, untouched). Remaining `/terminal` consumers (orbitals links, browser-proof paths, `AUXILLARY_OVERLAY_ROUTE_ROOT`/`buildAuxillariesRoutePath` itself) stay for the F8 gate.

### F9 — Organization Authority permanently Denied for solo operators; no bootstrap path exists

- Severity: medium now (misleading pane UX), high later (blocker the moment enforcement lands)
- Observed: fresh wallet-identity account shows Organization Authority **Denied** for `pay_btc_fee via terminal` (organization `n/a`, explicit grants `none`) despite wallet binding `bound`.
- Law trace (`packages/btd/src/authority.ts` `buildBtdOrganizationPolicyAuthority`): `pay_btc_fee` requires organizationId + normalized role + explicit `settlement:pay_btc_fee` grant + policy id/hash. Denial reasons fired: `organization_missing`, `role_missing` (profile role `user` normalizes to null — only viewer/member/admin/owner/lead/dev count), `explicit_permission_grant_required`, `policy_missing`. The decision is correct fail-closed law.
- Gap: no writer exists anywhere in the product for `organization_id`, `organization_permission_grants`, organization-grade roles, or `organization_policy_confirmed` — the only organizationId sources are GitHub-org repos or Profile companyName, and neither supplies role/grants. Every solo operator therefore reads Denied permanently.
- Enforcement status: display-only today — `buildBtdOrganizationPolicyAuthority` feeds only the Auxillaries pane, and `postBtdOrganizationInterfaceAuthority` (`/api/btd/organization-interface-authority`) has no callers; the V47 ip-exchange e2e proof ran deposit→read→settle without org config. Tracks 2–3 QA are not blocked.
- V48 gate decision needed (spec law, not a hotfix): either (a) personal-organization bootstrap at wallet sign-up (organization = operator, role `owner`, default grants including `settlement:pay_btc_fee`, policy confirmed) so solo commerce is allowed-by-law, or (b) the pane renders "no organization configured" as a neutral state instead of Denied until organization features ship — paired with deciding where enforcement actually attaches before mainnet.

### F11 — GitHub App webhook URL points at a route with no POST handler (deliveries 404)

- Severity: medium (all GitHub webhook deliveries lost; `POST /api/webhook` drives asset-pack pipeline automation from GitHub events)
- Observed: the App registration's Webhook URL is `https://bitcode.exchange/github`, but the only routes there are GET-only 308 shims (`/github/callback`, `/github/setup`); the live receiver is `POST /api/webhook` (signature-verified via `GITHUB_WEBHOOK_SECRET`). GitHub does not follow redirects on webhook POSTs, so a shim cannot fix this.
- Fix (dashboard): Webhook URL → `https://bitcode.exchange/api/webhook`; verify via App Advanced → Recent Deliveries (history should show the 404s; redeliver one to confirm 2xx).

### F10 — GitHub App sessionless install staging is a dead end (cookie has no consumer)

- Severity: medium (drops real installations whenever the post-install redirect lands on an origin without a session — e.g. the registered Setup URL origin differs from where the user signed in)
- Trace: `uapi/app/tps/github/_callback-handler.ts` — with a session, the installation persists to `user_connections` correctly; without one, it writes a `bitcode_github_installation_pending` cookie (15 min) and redirects with `vcsConnection=installation_staged`, but no code anywhere reads that cookie. Staged installations are silently dropped.
- Structural note: GitHub Apps have a single registered Setup URL (no per-request redirect override), so the post-install origin is fixed at registration — same origin-hop class as F5. The grace path was clearly designed for this and needs completing: on next authenticated load, claim the pending cookie (verify the installation's account/visibility) and persist the connection; or replace the cookie with a server-side staged row keyed to the installation id.
- Local QA workaround: the App has "Request user authorization (OAuth) during installation" enabled, which disables the Setup URL — GitHub instead redirects post-install to the FIRST registered Callback URL with `code` + `installation_id`. The handler dispatches on `installation_id` before the OAuth-code branch, so the install leg needs only `GITHUB_APP_ID` + `GITHUB_PRIVATE_KEY` (present locally). For QA: add `http://localhost:3000/tps/github/callback` as the first Callback URL and enable "Redirect on update"; reorder back after.
- Adjacent residue (F4-class): a legacy OAuth App registration still points at `https://engi.software/api/auth/github/callback` (pre-Bitcode domain). Not part of the App install flow; check whether its client id backs `SUPABASE_AUTH_GITHUB_CLIENT_ID` or `GITHUB_CLIENT_ID`, then retire or rotate.
- Env preparation (2026-06-12): local `GITHUB_APP_ID`/`GITHUB_PRIVATE_KEY` were template placeholders (`YOUR_GITHUB_APP_ID`; JWT signing failed with `DECODER routines::unsupported`); the install callback otherwise reached localhost and dispatched correctly. Fix: real App ID + base64-encoded PEM (the JWT helper accepts base64/`\n`-escaped/quoted PEMs). Also verify the prod deployment env carries real values — placeholders there break the prod install path identically. Re-running the flow after an env fix does not need a fresh install: the installation branch ignores the single-use `code`, so re-visiting the callback URL with `installation_id` suffices.
- Related: post-connect redirect builds `/terminal?auxillary-open-to=externals` — another F8 legacy-route consumer.

### F12 — Deposit AssetPack option "synthesis" is deterministic blueprints; the measurement pipeline never runs

- Severity: high (Track 2 core; the commercial deposit experience is not real)
- Observed: options appeared instantly after connect+notes; every execution row has `total_tokens: null`, `duration_ms: null`, `created_at == completed_at`; the three option titles are fixed archetypes.
- Trace: `/deposit` option synthesis runs `deposit-route-model.ts` → `buildDepositAssetPackOptions` (`packages/pipelines/asset-pack/src/deposit-asset-pack-options.ts`) — three hardcoded `OPTION_BLUEPRINTS` with constant `measurementBias` (0.72/0.66/0.61) and FNV-hash pseudo-roots; the file still carries `approvedOptionsAdmittedBy: 'future-gate7-deposit-option-review'` scaffolding markers from an earlier version. `BITCODE_ASSET_PACK_REAL_INFERENCE` reaches only the pipeline-harness QA routes (`/api/pipeline-harness/asset-pack`), never the `/deposit` flow — the env flags change nothing for depositing. Admission/rejection rows are journal writes over the blueprints; the qa7 sha256 roots are the composer execution's deterministic evidence.
- Gate 2 core work: wire `/deposit` option synthesis to the real asset-pack measurement pipeline under the bounded real-inference profile, producing measured options (real measurement vectors, token/cost/duration accounting, depositor-notes-conditioned synthesis) with the blueprint path retained only as an explicit mock/bring-up mode.
- IMPLEMENTED (first increment, 2026-06-12): the **AssetPacksSynthesis** pipeline core (`packages/pipelines/asset-pack/src/asset-packs-synthesis.ts`) — Bitcode's single synthesis/measurement pipeline, lens-parameterized (deposit | read) per the accepted V48 architecture law (steering prompts + measurement catalogs carry the variance; one run creates multiple packs). The deposit lens adapter (`deposit-option-real-synthesis.ts`) translates candidates into the promoted V43/V47 option law (same schema/roots/review boundaries, so policy + admission consume them unchanged). `POST /api/deposit/synthesize-options` builds an exclusion-filtered source inventory from the connected GitHub source (session + repo-ownership checked, server-derived token), runs bounded structured inference fail-closed (`real_inference_required` without the flags), persists the execution with REAL `total_tokens`/`duration_ms`, and the `/deposit` UI now requests synthesis from it (async with status; blueprint path unreachable from the surface). Gate 2 charter elevation: consolidate remaining pipelines onto AssetPacksSynthesis, clean all legacy terminal code, correct pipeline-execution actualities (data, Vercel sandbox actually running pipelines) — reading lens migration lands with Track 3.

### F13 — Deposit option decision semantics: approve is irreversibly final with no confirmation; reject should be archive

- Severity: medium (spec intent for the V48 family + UX gate work)
- Law intent (Garrett, 2026-06-12): approve = permanent Depository admission — correct that it is final, wrong that one click does it with no explicit confirmation boundary; toggling an admission back is NOT correct. Reject is semantically "archive": re-depositable at any time, with the caveat that measurements go stale over time — re-deposit triggers resynthesis/remeasurement.
- Work: explicit confirm step (or staged "ready to admit" state) before admission; rename/restyle reject to archive; archived options carry measurement-staleness posture and a resynthesize action.
- IMPLEMENTED (2026-06-12): approval is a one-time armed-confirmation flow ("Approve for Depository" → "Confirm permanent deposit"); an admitted option locks permanently ("Admitted to Depository — permanent", no further decisions accepted by the handler). Reject renders and records as **Archive**: re-depositable anytime, visible in the depositor's packs (personal scope), with the staleness/resynthesis note; the `'rejected-by-depositor'` contract value is unchanged so admission law and the V47 checker pins hold.

### F14 — No protected-IP exclusion instructions for deposit synthesis

- Severity: medium-high (source-safety law surface)
- Gap: the deposit composer accepts depositor notes but offers no way to declare which IP in the connected source must be protected and excluded from AssetPack knowledge synthesis. The synthesis pipeline (once real, F12) must accept and honor exclusion instructions as a fail-closed boundary (excluded paths/concepts never enter measurement, prompts, or option summaries).
- IMPLEMENTED (2026-06-12): "Protected IP exclusions" field on `/deposit`; exclusions are honored fail-closed at both ends of AssetPacksSynthesis — excluded paths removed from the source inventory before any prompt is built, and candidates whose covered paths violate exclusions (or cite paths outside the real inventory) dropped after inference. Exclusion roots + withheld-path counts surface in the synthesis exclusion posture and the executions row.

### F16 — Depository state persists into a git-tracked repo file, not the database

- Severity: high (Gate 2 charter: pipeline-execution actualities — data)
- Observed: the live deposit QA session wrote ~1,200 lines of runtime depository state (assets, options, roots for the "Some Python" deposit) into `packages/protocol/data/state.json`, a tracked file that historically changes only at canonical promotions. Runtime commerce state does not belong in git: it cannot serve concurrent users, deployments reset it, and QA sessions dirty the working tree (one such mutation was accidentally committed in `569c6e19` and reverted immediately after).
- Gate 2 work: move depository/ledger runtime state to the database (executions/ledger tables + object storage roots already exist for this), keeping `state.json` as promotion-managed demonstration canon only.

### F15 — Packs master-detail rows are not selectable; type taxonomy unclear

- Severity: medium (Track 4 UX, surfaced during Track 2)
- Observed: pack activity rows render but cannot be selected to open their detail view (the master-detail contract's most critical interaction). The TYPE column shows generic "Executions" for everything; the conceptual taxonomy should read as: Deposit Request ("Some Python" — parity with Read Request) → synthesized AssetPack options → per-option decisions (admitted/archived).
- Work: row selection opens the per-activity detail page (clean full readback); type column gains the deposit-request/option/decision taxonomy.
- PARTIAL (2026-06-12) — scope taxonomy implemented: execution activity now derives scope by specification (admitted Depository AssetPacks and settled/read APs = `network`, globally visible; deposit requests, syntheses, review decisions including archived options, connected sources = `personal`) instead of hardcoding everything `network`; `/api/packs/activity` merges a global Depository feed (admitted APs across all accounts, source-safe projections, dedupe against own rows); `/packs` gains a Visibility scope filter (All / Network — deposited and read AssetPacks / Mine — archived options, sources, requests). Remaining: live-verify row→detail selection (the detailId mechanism exists and is test-covered — widen the click target if the live miss reproduces) and the clearer type-column taxonomy.

- Environment note (by design, not a finding): `www.bitcode.exchange` and localhost both point at the staging-testnet Supabase project — the testnet launch IS the production deployment. QA users/data therefore land in live data; keep QA to dedicated testnet wallets.

## Track 1 — Identity / Authentication / Auxillaries — COMPLETE 2026-06-12 (email deferred by decision; F2/F9 and legacy eradication queued for gates)

- [x] Sign up / sign in via Connect Wallet (nav CTA → SignUpWindow → wallet signature on testnet4 → `custom:bitcode-bitcoin` session → `/tps/supabase/callback`) — verified 2026-06-12 after F5 fix; lands on `/packs`. Re-verified from fully nuked state (purged user + cleared site data): created 19:29:21 → session 19:29:25 → binding auto-written 19:29:29 by the bridge on `/packs` mount with no Auxillaries visit; UI consistent across nav, Wallet, and Profile panes.
- [x] Wallet binding persisted after sign-in — verified 2026-06-12: identity-derived bind populated `username` (`wallet_tb1p6x70u8ag`) and the full `walletBinding` (address, provider `leather`, network `testnet`, status `pending`, `proofKind: provider_session`, `boundAt` stamped on bridge mount). `payment_address`/`addressType` stay null in identity-derived binds (GoTrue drops the custom claims); they backfill via the in-panel signature flow, which settlement-adjacent actions require anyway.
- [x] Session persists across refresh — verified 2026-06-12 across many refreshes, dev-server restarts, and pane navigation in one session with no re-auth; F2 (triplicated GoTrueClient) produced no observable flakiness but stays open as a packaging fix.
- [~] Profile pane readback (optional email binding) — deferred by decision 2026-06-12: wallet (plus GitHub) is the root of identity; email is optional contact only and not required for Track 1 closure. The "Add Email" repair CTA routing was fixed regardless (contract repair routes → `/packs`). The `signInWithOtp` contact-binding semantics check moves to the F4 legacy-auth eradication gate, where the email path gets disambiguated from authentication wholesale.
- [x] Externals: GitHub App connect + repository inventory — verified 2026-06-12: installation `139922918` (`engineeredsoftware`, repository_selection `all`), provider readiness "succeeded" with source-safe token posture, 46 repositories synced into `vcs_repositories` with full metadata. Post-connect redirect retargeted from the legacy `/terminal` overlay to `/packs?auxillary-open-to=externals`. Connected Scope pill list was hard-capped at 8 (`repositories.slice(0, 8)`) — now renders all in a scrollable wrap.
- QA evidence hygiene note: ad-hoc `user_connections` dumps that select `connection_data` wholesale expose the GitHub installation `access_token` (short-lived, 1h expiry — the one pasted on 2026-06-12 expired 21:08Z; no rotation needed). Use `v48_qa_03_user_connections_token_safe.sql` instead; never paste raw `connection_data`.
- [x] Wallet pane: fauceted testnet4 balance visible — verified 2026-06-12: "BTC in wallet" shows 0.00763373 BTC live from mempool.space testnet4 (faucet tx `fff98a94…ec6d` paid the payment address `tb1q8whq…s7d8t2`, 263,373 sats + follow-up). The identity-derived bind initially showed 0 because it carried only the taproot auth address; Reconnect Leather (signed-in panel flow) backfilled `paymentAddress`/`addressType` and upgraded proofKind to `bitcoin_message_signature` — the F5a payment-address residual repair path is verified. Binding status stays `pending` by design until signature verification ships. Nav chip wiring to the live source is a follow-up.
- [x] Organization/team + treasury panes render — verified 2026-06-12: Organization Authority and treasury/wallet-posture surfaces render without errors; the Denied content posture is the parked F9 decision, not a render defect.

## Track 2 — Depositing (Gate 2, opened 2026-06-12 on `v48/gate-2-depositing-interactive-qa`)

- Environment: add to `uapi/.env.local` and restart `dev:remote` — `BITCODE_ASSET_PACK_REAL_INFERENCE=true` and `BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE=bounded` (provider keys already present; without the flags, synthesis runs deterministic bring-up branches, and the pipeline harness preflight rejects Read/Fit QA). `BITCODE_ENABLE_PIPELINE_HARNESS_API` is unnecessary locally (the harness route is open on non-production deployments).

- [ ] Connect repository on /deposit
- [ ] Synthesize AssetPack options (real inference if enabled)
- [ ] Source-safe measurement review renders
- [ ] Approve → Depository admission readback
- [ ] /packs?type=depository-assetpack shows the admission

## Track 3 — Reading

- [ ] Read request on /read
- [ ] Need synthesis + review
- [ ] Finding Fits + fit measurement review + BTC-testnet quote
- [ ] Settle (testnet) → observation → finality → BTD rights readback
- [ ] Repository PR delivery readback

## Track 4 — Ledgerized Journaling

- [ ] /packs master-detail: states, proof roots, repair surface
- [ ] Replay/audit: journaled rows match actions taken
- [ ] Auxillaries personal history readback
