# Bitcode Spec V48 Notes

## Status

- Version: `V48`
- Canonical pointer: `BITCODE_SPEC.txt` -> `V47`
- Active canonical anchor: `BITCODE_SPEC_V47.md`
- Active generated proof appendix: `BITCODE_SPEC_V47_PROVEN.md`
- Current canonical/latest target: `V47`
- Prior canonical anchor: `BITCODE_SPEC_V46.md`
- Prior generated proof appendix: `BITCODE_SPEC_V46_PROVEN.md`
- V48 state: notes-only draft opening
- Scope: V48 starts as the interactive local experiential QA target over promoted V47 commercial website testnet launch canon.
- QA findings ledger: `BITCODE_V48_QA.md` (the running record of accepted V48 findings and repairs)
- Gate 1 (in progress): identity and authentication interactive QA on branch `v48/gate-1-identity-auth-interactive-qa`
- Full draft family (`BITCODE_SPEC_V48.md`, `BITCODE_SPEC_V48_DELTA.md`, `BITCODE_SPEC_V48_PARITY_MATRIX.md`) opens at Gate 1 closure, per the V47 Gate 1 precedent

## Notes-only draft rule

These notes make the V48 draft target visible to strict spec-quality checks
after V47 promotion. They are not first-gate implementation authority, not a
full V48 specification family, and not permission to bypass the V47 canon. V48
work must continue by exercising the live commercial testnet experience
interactively, recording accepted findings, creating an explicit parity
matrix, and then opening scoped gate branches only after the QA-driven
specification intent is clear.

## Deferred from V47

V47 promoted commercial website testnet launch readiness. It launch-froze
`/deposit`, `/read`, `/packs`, and Auxillaries, made measurement law and the
IP seller/buyer state machines exact, completed the depositor and reader
websites, the packs/Auxillaries commercial dashboard, browser-proven E2E IP
selling and buying, landing/public launch messaging, the staging-testnet
deployment rehearsal, and promotion readiness — all over the preserved
Bitcoin/BTC settlement language, BTD scalar-volume and rights language,
GitHub delivery boundaries, compute constraints, storage boundaries, and
build/process validation carried from the promoted V46 comprehension canon.

V48 begins from the remaining question: what does the first live commercial
(testnet) experience still need before real users can walk every core step
without friction. The opening posture is intentionally experiential: run the
deployed staging-testnet system end to end, step by step, and fix what breaks.

## Candidate V48 workstreams

- Environment preparation: staging Supabase database readiness, wallet-fauceted
  testnet BTC, local telemetry expectations, and a step-by-step debugging
  experience that validates each core user step.
- Identity and authentication: sign up/in, and Auxillaries readiness for
  connecting GitHub, wallet(s), and other external surfaces.
- Depositing: connecting knowledge, requesting AssetPack syntheses to review,
  reviewing, and depositing.
- Reading: connecting knowledge, requesting a Read, reviewing the synthesized
  Need, reviewing potential Fits, and buying Fit(s).
- Ledgerized journaling: replayability, auditability, `/packs` page UX/UI, and
  the personal (Auxillaries) history of work.

## V48 Gate 1 in progress: identity and authentication interactive QA

Gate 1 exercises the live commercial testnet experience exactly as the
notes-only rule directs: interactively, recording accepted findings in
`BITCODE_V48_QA.md` (F1-F10 so far), and landing fail-closed repairs on the
gate branch. The full draft family is authored at Gate 1 closure from this
QA-driven specification intent.

Accepted findings converted to repairs so far:

- Supabase `redirect_to` law: GoTrue validates the Auth redirect allow-list by
  exact string match, so `redirect_to` must stay query-free. The post-auth
  destination travels through origin-local storage
  (`uapi/lib/supabase-auth-redirect.ts`) and is consumed once by the callback.
  This repaired wallet sign-in from both localhost and production www, which
  previously stranded the PKCE verifier and never minted a session.
- Identity-derived wallet binding: the canonical wallet sign-up signs on the
  OAuth provider authorize page, so nothing is staged client-side to replay.
  `/api/wallet/authenticate` now derives the binding server-side from the
  session's GoTrue-verified `custom:bitcode-bitcoin` identity
  (`source: 'oauth-identity'`), and `WalletSessionPersistenceBridge` triggers
  it whenever a wallet-backed session has no replayable local proof.
- Post-auth landing is `/packs`, not the legacy `/terminal` overlay route.

Specification intent surfaced for the eventual V48 family (decisions, not yet
law): eradicate legacy email/phone authentication residue (`/login`,
`LoginForm`, PhoneSSO) and the legacy `/terminal` route after verifying its
capabilities ported to `/packs`, `/read`, and `/deposit`; decide the
solo-operator organization-authority posture (personal-organization bootstrap
at wallet sign-up versus a neutral unconfigured state); complete the GitHub
App sessionless install staging path, whose pending-installation cookie
currently has no consumer.

## Non-goals during V48 opening

- Do not implement V48 product behavior from this notes-only opening.
- Do not rewrite V47 promoted canon except through an explicit addendum.
- Do not expose raw source, unpaid AssetPack source, secrets, wallet private
  material, private settlement payloads, raw prompts, or raw provider responses.
- Do not collapse estimate, quote, observed payment, final settlement,
  contributor allocation, delivery, compensation, and repair states.
- Do not launch value-bearing mainnet settlement in V48 opening work.
- Do not treat notes-only V48 material as stronger than active V47 protocol law.
