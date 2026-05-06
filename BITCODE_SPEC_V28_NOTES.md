# Bitcode Spec V28 Notes

## Status

- Scope: draft-target notes for V28 Terminal productization and promotion-tail cleanup after V27 `$BTD` tokenomics and cryptographic-commercialization closure.
- Active canonical pointer: `BITCODE_SPEC.txt` -> `V27`.
- Draft target: `V28`.
- Primary V28 focus: the Terminal as the operator-facing place where Need submission, Fit review, measureminting posture, wallet authorization, BTC fees, AssetPack range reads, licensed reads, journal diffs, and reconciliation become coherent product workflows.
- Adjacent later-version focus: V29 owns broader Exchange market depth; V30 owns external connections and interfaces; V31 owns the proven protocol V0.

This NOTES file does not promote V28.
It records the deep-review handoff from V26 and V27 promotion so V28 starts with known source/spec/proof issues rather than rediscovering them during implementation.

## Promotion Review Basis

The V28 handoff is grounded in:

- `BITCODE_SPEC.txt` now pointing to `V27`.
- V27 promoted family: `BITCODE_SPEC_V27.md`, `BITCODE_SPEC_V27_DELTA.md`, `BITCODE_SPEC_V27_NOTES.md`, `BITCODE_SPEC_V27_PARITY_MATRIX.md`, and `BITCODE_SPEC_V27_PROVEN.md`.
- V27 closure proofs under `.bitcode/v27-*`.
- V26 promoted family: `BITCODE_SPEC_V26.md`, `BITCODE_SPEC_V26_DELTA.md`, `BITCODE_SPEC_V26_NOTES.md`, `BITCODE_SPEC_V26_PARITY_MATRIX.md`, and `BITCODE_SPEC_V26_PROVEN.md`.
- V26 supplementary protocol-demonstration docs such as `V26_APPLICATION_SYSTEMS.md`, `V26_PROOF_SURFACES.md`, and `V26_REFORM_STRATEGY.md`.
- Active source excluding `_legacy/**`.

## Review Findings Deferred To V28

These findings do not reopen V27.
They are V28 inputs because V27 closed the protocol law and minimum crypto-commercial rails, while V28 must make those rails feel complete inside the Terminal.

| Finding | Why it does not block V27 | V28 action |
| --- | --- | --- |
| V26 historical docs still cite old version-prefixed external-realization routes | V27 source routes are now unversioned and the V26 family is historical promotion evidence | Refresh or annotate V26 supplementary docs so current implementation references do not teach retired route paths |
| Active demonstration internals still carry `V24` names and environment variables around external realization | Route paths are unversioned and tests prove behavior; names are historical primitive identifiers, not current public API routes | Decide whether to repurpose/rename those primitives into versionless external-realization terminology or preserve them as historical witness modules with explicit notes |
| The V27 registry migration has not been applied in a live Supabase environment and generated DB types have not been refreshed | V27 proves migration/schema/ORM boundary and route behavior, not production DB application | Run migration in a controlled environment, regenerate Supabase/database types, and replace hand-shaped registry table types where possible |
| Live wallet adapter UX is still below the package/API signer-session law | V27 proves fail-closed signer sessions and BTC fee receipt lifecycle | Build Terminal wallet connection, network choice, PSBT handoff, signature review, and signer-session recovery UX |
| BTC broadcaster/observer credentials and signet/mainnet operational harnesses are not deployed | V27 proves readiness receipts, lanes, telemetry, and approval gates | Implement the Terminal-facing regtest/signet broadcaster observer, confirmation/replacement/reorg reads, and operator diagnostics |
| Mainnet value-bearing launch is still separate operational approval | V27 intentionally blocks value-bearing mainnet without approval root | Keep V28 testnet/signet by default; prepare but do not silently enable value-bearing mainnet |
| Terminal journal and reconciliation primitives are implemented but not yet the ordinary operator workflow | V27 proves receipt and API boundaries | Make journal diffs, stale projections, private/metaphysical facts, and repair receipts readable in Terminal transaction detail |
| Organization BTD usage remains outside core tokenomics | V27 closed tokenomics law without broad organization product usage | Define organization read-license usage, team wallet posture, treasury reads, and role-based Terminal decisions |
| MCP holding gates still need registry-derived read-right checks | V27 bounded the aggregate compatibility carrier and closed core registry law | Replace aggregate holding gates with AssetPack range/read-license/policy checks when Terminal work touches MCP-triggered actions |
| Physical compatibility carriers such as `user_credits`, `user_credit_usages`, and storage-edge `deliverables` still exist | V27 bounds them as noncanonical storage/read corridors | Hide them behind registry/AssetPack/Need/Fit abstractions in Terminal-facing routes and generated types |
| `shippable` remains as a Finish-delivered PR/asset-pack-output term in some UI/tests/stories | V27 route/tokenomics work does not require renaming every UI/styling/test fixture term | Reconfirm in V28 whether Terminal product language should keep `Shippable` for PR delivery only or replace it with AssetPack delivery/range language |
| Legal/access-policy templates remain incomplete | V27 proves policy id/hash and rights separation, not final legal forms | Draft Terminal-visible access-policy templates for owner-read, licensed-read, derivative use, redistribution, confidentiality, dispute, and takedown posture |
| Product telemetry sinks are configured as receipt/event boundaries, not production alert dashboards | V27 closes taxonomy and persistence | Add operator-facing Terminal health panels and alert sink integration for wallet, fee, ledger, journal, database, access, settlement, and upgrade failures |
| External VCS providers beyond GitHub remain incomplete or not started | V27 does not require broad third-party provider completion, and V30 owns external connections and interfaces | Keep V28 Terminal provider UX honest about GitHub-only readiness and hand off Bitbucket, GitLab, Azure DevOps, generic Git, webhooks, and provider-feature detection to the V30 external-connections scope |
| V26 proof generator and older promotion scripts still contain version-specific historical logic | V27 accepted generated-equivalent proof artifacts rather than fully modernizing promotion automation | Decide whether V28 should update proof generation for V28+ families or leave older promotion scripts as historical tooling |

## V28 Gate Sketch

V28 should not start by widening the Exchange.
The minimum useful V28 gate plan is Terminal-first:

1. **Gate 1: V28 Draft Opening And Promotion Review**
   - Confirm `BITCODE_SPEC.txt` points to `V27`.
   - Read V26 and V27 promoted families.
   - Convert this NOTES file into SPEC, DELTA, and PARITY only after source audit.

2. **Gate 2: Terminal Wallet And BTC Fee UX**
   - Terminal wallet connection and signer-session review.
   - BTC fee preparation, PSBT handoff, signature status, broadcast status, confirmation/replacement/reorg readout.

3. **Gate 3: Terminal Need-Fit-Measuremint Workflow**
   - Need submission and Fit closure make measuremint entitlement, zero-cell/refit receipt, source roots, proof roots, and access policy visible.

4. **Gate 4: Terminal AssetPack Range Detail**
   - AssetPack range pages and Terminal transaction detail read registry-derived range, cells, ownership, policy hash, owner-read, licensed-read, and proof state.

5. **Gate 5: Terminal Journal Diff And Reconciliation**
   - Operator can see journal/ledger/database drift, blocking repairs, private canonical facts, and repair receipt history without reading raw JSON.

6. **Gate 6: Terminal Organization And Access Policy**
   - Organization holdings, team roles, read-license usage, policy templates, and MCP authorization checks become registry-derived.

7. **Gate 7: Terminal Operations And Testnet Readiness**
   - Regtest/signet harness, telemetry sinks, alert panels, upgrade readiness, and rollback posture become Terminal-operated.

8. **Gate 8: V28 Promotion Proof**
   - SPEC, DELTA, NOTES, PARITY, and PROVEN exist.
   - Terminal tests, package/API tests, route tests, UAPI build, and demonstration tests pass.
   - V29 Exchange depth is explicitly staged rather than mixed into V28.

## Non-Goals For V28

- V28 does not implement broad order-book depth, external market routing, wrapper liquidity, or third-party marketplace integration. Those belong to V29 unless Terminal correctness requires a narrow hook.
- V28 does not approve value-bearing mainnet launch.
- V28 does not redefine `$BTD` supply, measureminting, access-right, or ancestry law except through explicit V27 supersession.
- V28 does not treat storage-edge compatibility table names as product vocabulary.

## Required V28 Review Commands

Before V28 implementation closes, rerun at minimum:

- `cat BITCODE_SPEC.txt`
- `find uapi/app/api -path '*v[0-9]*' -print | sort`
- `rg -n 'gap blocking|partial blocking|not started|not promoted|not generated yet' BITCODE_SPEC_V28*`
- `pnpm -C packages/api build`
- `pnpm -C packages/orm build`
- `pnpm -C protocol-demonstration test:v27-crypto`
- Terminal-specific Jest/Playwright coverage once added
- `pnpm -C uapi build`
- `git diff --check`
