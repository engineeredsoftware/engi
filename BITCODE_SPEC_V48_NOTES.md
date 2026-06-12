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
- Full draft family (`BITCODE_SPEC_V48.md`, `BITCODE_SPEC_V48_DELTA.md`, `BITCODE_SPEC_V48_PARITY_MATRIX.md`) opens in a dedicated specification-authoring gate once the interactive QA tracks have accumulated the specification intent; Gate 1 closed as the identity/authentication QA-and-repairs gate

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

## V48 Gate 2 in progress: depositing interactive QA and the AssetPacksSynthesis refactor

Gate 2 (branch `v48/gate-2-depositing-interactive-qa`) is explicitly the
significant-refactoring gate and a critical gate for the commercial viability
of Bitcode: interactive depositing QA exposed that deposit AssetPack option
"synthesis" was deterministic blueprint scaffolding (`BITCODE_V48_QA.md`
F12), and the accepted repair is architectural, not cosmetic. Gate 2's
charter (Garrett, 2026-06-12): consolidate Bitcode's pipelines into the
single AssetPacksSynthesis pipeline (plural Packs — one run can create
multiple packs), clean all legacy terminal code, and correct the incomplete
pipeline-execution actualities (real data, the Vercel sandbox actually
running pipelines, real accounting) so V48 QA reaches real demonstrability
of information commoditization — the ability to exchange knowledge,
fundamentally unlocked by measurement. The implementation builds maturely on
the existing strong primitives (prompts, registries, executions) and
generics (agents, pipelines) rather than inventing parallel machinery.

Accepted V48 architecture law (decided 2026-06-12):

- Bitcode has a single synthesis/measurement pipeline: **AssetPacksSynthesis**
  (`packages/pipelines/asset-pack/src/asset-packs-synthesis.ts`). Depositing
  and Reading are the same operation at the core — measuring source knowledge
  into commercially legible AssetPack candidates — with variance carried
  entirely by the lens: steering prompts (depositor instructions versus read
  Need), the available measurement catalog (deposit: source-coverage /
  demand-alignment / reuse-likelihood; read adds need-fit), and candidate
  framing. Measurement is the heart of Bitcode's commodification capability,
  so it is centralized in this one pipeline; lens adapters translate
  lens-specific contracts to and from the core. The deposit lens shipped in
  Gate 2; the reading lens migrates onto the core when Track 3 opens.
- Deposit option synthesis is real: `POST /api/deposit/synthesize-options`
  builds an exclusion-filtered source inventory from the depositor's
  connected GitHub source, runs bounded structured inference, persists the
  execution with real token/duration accounting, and emits options that keep
  the promoted V43/V47 option law (schema, roots, review boundaries,
  source-safety posture) so policy and admission consume them unchanged.
- Protected-IP exclusions are first-class synthesis steering: excluded paths
  and concepts never enter measurement, prompts, or option summaries, and
  candidates that touch them are dropped fail-closed (F14).
- Legacy `/terminal` code is refactored out as it is encountered during gate
  work (rule accepted 2026-06-12), with the dedicated F8 sweep retiring the
  remainder.

## Non-goals during V48 opening

- Do not implement V48 product behavior from this notes-only opening.
- Do not rewrite V47 promoted canon except through an explicit addendum.
- Do not expose raw source, unpaid AssetPack source, secrets, wallet private
  material, private settlement payloads, raw prompts, or raw provider responses.
- Do not collapse estimate, quote, observed payment, final settlement,
  contributor allocation, delivery, compensation, and repair states.
- Do not launch value-bearing mainnet settlement in V48 opening work.
- Do not treat notes-only V48 material as stronger than active V47 protocol law.
