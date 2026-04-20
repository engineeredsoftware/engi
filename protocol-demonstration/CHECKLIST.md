# Bitcode Demo Checklist — Spec V8

Use this before an interactive V8 demo, QA pass, or live walkthrough.

---

## 0. Server / environment

- [ ] Start the demo:

```bash
cd /Users/garrettmaring/Developer/ENGI/protocol-demonstration
npm start
```

- [ ] Open: `http://127.0.0.1:4318`
- [ ] Confirm the page loads
- [ ] Confirm the hero says **Spec V8**
- [ ] Confirm the primary CTA is **Make Bitcode branch**
- [ ] Confirm no stale V6/query-era language is visible in the main flow
- [ ] Confirm JSON-heavy surfaces default to **Visual** mode and can be flipped to **Raw**

---

## 1. Clean seeded state

- [ ] Click **Reset demo** before starting
- [ ] Confirm seeded state is clean:
  - [ ] 3 assets
  - [ ] 1 need scenario
  - [ ] no latest run yet
- [ ] Confirm the active conformance profile shows **Profile A**
- [ ] Confirm the seeded scenario is the auth rollback case

Expected seeded scenario cues:
- buyer: `Frontier Code Systems`
- repo: `frontier/demo-auth`
- branch: `BITCODE-auth-issuer-rollback`
- benchmark workflow / GitHub Actions evidence present

---

## 2. V8 gold-path interactive run

### A. Need measurement

- [ ] Show that the need is GitHub-bound, not a free-text-only query
- [ ] Point out:
  - [ ] parser contract
  - [ ] canonical run evidence
  - [ ] field derivations / normalization closure
  - [ ] conformance profile labels

What should be visible after the run:
- [ ] measured `needId`
- [ ] parser fail-closed framing
- [ ] need derivation / provenance surface

### B. Candidate recall + ranking

- [ ] Run **Make Bitcode branch**
- [ ] Confirm evaluated candidates render
- [ ] Confirm the top asset is still the rollback/auth material
- [ ] Show:
  - [ ] multi-channel recall / fusion
  - [ ] need match
  - [ ] benchmark impact
  - [ ] actionability
  - [ ] penalties
  - [ ] whole-asset score / explainability

### C. Verification + use tiers

- [ ] Confirm verification is separate from ranking
- [ ] Show:
  - [ ] issuance verification
  - [ ] provenance verification
  - [ ] verification sufficiency
  - [ ] issuer policy status
- [ ] Confirm use tiers are visible
- [ ] Confirm branch-mode rights are visible / inferable

### D. Asset pack + branch artifacts

- [ ] Confirm an `assetPackId` is generated
- [ ] Confirm branch artifacts include at least:
  - [ ] `.engi/need.json`
  - [ ] `.engi/verification-report.json`
  - [ ] `.engi/asset-pack.lock.json`
  - [ ] `.engi/authorization-decisions.json`
  - [ ] `.engi/sensitive-data-flow.json`
  - [ ] `.engi/policy-release.json`
  - [ ] `.engi/unit-catalog.json`
  - [ ] `.engi/pipeline-telemetry.json`
  - [ ] `.engi/system-proof-bundle.json`
  - [ ] `BITCODE_NEED.md`

### E. Settlement / proof closure

- [ ] Confirm settlement preview exists
- [ ] Confirm journal diff exists
- [ ] Confirm `debitsEqualCredits = true`
- [ ] Confirm asset-pack-lock binding is visible in settlement/proof surfaces
- [ ] Confirm participating assets and shares are visible

---

## 3. Advanced V8 surfaces

### Content-unit semantics / vector interfaces

- [ ] Confirm unit catalog exists
- [ ] Confirm content units expose:
  - [ ] semantic summary
  - [ ] embedding / vector contract metadata
  - [ ] provenance / unit hash
- [ ] Confirm these are framed as **Profile A deterministic stand-ins** for richer Profile B embeddings

### Static vs inferred evaluator boundaries

- [ ] Confirm eval/proof surfaces distinguish between:
  - [ ] static analysis / deterministic measurement
  - [ ] inferred measurement / evaluator surfaces
  - [ ] stand-in vs production-boundary behavior

### Telemetry / harness

- [ ] Confirm pipeline telemetry artifact exists
- [ ] Confirm telemetry explains:
  - [ ] unit extraction
  - [ ] recall channels / fusion
  - [ ] score composition
  - [ ] verification decisions
  - [ ] use-tier propagation
  - [ ] artifact materialization
  - [ ] settlement / shares
  - [ ] fail-closed behavior when relevant

---

## 4. E2E QA verdict

Call the demo **interactive V8 E2E-QA ready** only if all of the following are true:

- [ ] page loads cleanly
- [ ] reset works
- [ ] make-bitcode-branch gold path works end-to-end
- [ ] V8 profile/derivation/rights/telemetry surfaces are visible
- [ ] settlement invariants hold
- [ ] no stale query-first story is required to understand the demo
- [ ] docs/checklist match the actual UI/runtime behavior

---

## 5. If something is wrong

### If state looks dirty
- [ ] Click **Reset demo**
- [ ] Re-run the gold path

### If the UI seems stale
- [ ] Hard refresh browser
- [ ] Verify `data/state.json` was regenerated from the current V8 model if needed

### If the server is not responding

```bash
cd /Users/garrettmaring/Developer/ENGI/protocol-demonstration
npm start
```

### If invariants fail
- [ ] stop the demo
- [ ] run `npm test`
- [ ] do not present the prototype as QA-ready until the failure is understood

---

## Final reminder

Do not present the demo as:
- a live GitHub-integrated production system
- a real embedding/LLM evaluator deployment
- a real policy publication / authz enforcement plane

Present it as:
- a **Spec V8 Profile A deterministic prototype**
- with explicit **Profile B production-boundary intent**
- and with strong inspectability across ranking, verification, artifacts, telemetry, and settlement
