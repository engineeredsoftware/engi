# Bitcode Investor Memo

> Bitcode is auditable market infrastructure for engineering knowledge.

Engineering knowledge is valuable, but today it is still difficult to measure, difficult to permission, and difficult to compensate with auditability. Bitcode is building auditable market infrastructure for engineering knowledge: a proof-bearing operating system for engineering assetizing that ingests repo-authenticated technical supply, measures it against concrete engineering need, selects and verifies asset packs, discloses outputs by principal, and settles contribution consequences through exact source-to-shares accounting.

Legacy V22 already carried that system through a proof-bearing runtime, API, browser shell, tests, generated proof artifacts, and source promotion workflow. The V22 package-local realization identified itself as the `V22 canonical deterministic local prototype`, and the historical V22 canon said runtime, API, browser shell, tests, demo-local docs, and generated canon had to stay aligned. ([GitHub][1])

---

## 0. Framing block

**Writing note**

Use the opening page to define Bitcode as infrastructure first. Keep the ladder simple and repeatable.

**Useable facts to write from**

- the legacy V22 package-local realization under `protocol-demonstration/` identified itself as the `V22 canonical deterministic local prototype` and the deterministic local realization of the full Bitcode operating chain. ([GitHub][1])
- V22 says Bitcode "remains a proof-bearing operating system for engineering assetizing." ([GitHub][2])
- `src/canon-posture.js` sets `ACTIVE_CANON_VERSION = 'V22'` and `DRAFT_TARGET_VERSION = 'V23'`, and its hero posture says runtime, API, browser shell, tests, and demo-local docs must stay aligned so canon drift fails closed. ([GitHub][3])

**Suggested ladder**

- Bitcode
- *Auditable market infrastructure for engineering knowledge.*
- *A proof-bearing operating system for engineering assetizing.*
- *A system that turns repo-authenticated technical assets into measured, verified, permissioned, and settlement-ready artifact supply.* ([GitHub][2])

**Optional line to add**

Bitcode is not simply a software tool for generating engineering outputs; it is infrastructure for making engineering assets measurable, reviewable, permissioned, and settleable. ([GitHub][2])

---

## 1. Why this market should exist

**Writing note**

Frame the problem as missing market structure, not missing productivity software.

**Useable facts to write from**

- V22's canonical chain starts with authenticated repo supply and candidate deposits, then measured need, explicit deposit-to-need fit, recall/ranking/verification, artifact materialization, projection/disclosure policy, and exact source-to-shares settlement. ([GitHub][2])
- The demo README says the prototype is intentionally centered on depositing, needing, fit, identity/auth as spine, repo-to-settlement closure, proof and settlement as necessary consequences, and explicit boundary honesty. ([GitHub][1])
- V22 names fail-closed states rather than hiding them: public projection overexposure is blocking, settlement conservation drift is blocking, and canon-posture drift is explicitly audited. ([GitHub][2])

**Drafting cues**

- "The problem is not only producing engineering artifacts. It is making them measurable against need, disclosable by right, and compensable with auditability."
- "Bitcode closes those functions into one operating system."

---

## 2. What Bitcode is

**Writing note**

Define Bitcode first as infrastructure, then mention the product wedge later.

**Useable facts to write from**

- V22 says Bitcode remains a `proof-bearing operating system for engineering assetizing`. ([GitHub][2])
- V22 names a seven-layer system: deterministic primitives, canonical runtime builders, whole-run composition, projection shaping, HTTP/API and persistence shell, operator browser shell, and validation/promotion. ([GitHub][2])
- The README says the main implementation surfaces already cover core state, need measurement, evaluation, proof, settlement, projection, branch artifact builders, deterministic API, and operator shell. ([GitHub][1])

**Drafting cues**

- "Bitcode is not merely an application for producing engineering outputs."
- "It is infrastructure for how technical assets become measurable, reviewable, disclosable, and economically legible."

---

## 3. How the Bitcode protocol works

**Writing note**

This is the memo's main systems page. Keep the sequence stable each time you explain Bitcode.

### 3.1 Repo-authenticated supply

**Useable facts to write from**

- The operator shell starts with `Repo supply`, described as "authenticated repo sessions and artifact-kind-native supply." ([GitHub][4])
- The shell summary tracks authenticated repos, repo supply entries, active deposit profile, need scenarios, selected assets, settlement-credited assets, and visible proof families. ([GitHub][4])

### 3.2 Measured need

**Useable facts to write from**

- The shell describes the `Needing surface` as "the active measured demand surface" and says the deposit has to justify itself against that measured need before proof and settlement carry the story forward. ([GitHub][4])
- The README defines needing as `benchmark/parser/repo-derived demand`. ([GitHub][1])

### 3.3 Explicit fit before deeper closure

**Useable facts to write from**

- The shell renders a `Depositing-to-needing surface` and says the canonical system makes deposit-to-need fit explicit before deeper proof and settlement sections. ([GitHub][4])
- The README lists explicit deposit-to-need fit before deep proof inspection as one of the prototype's demonstrated behaviors. ([GitHub][1])

### 3.4 Recall, ranking, verification, and use-tiering

**Useable facts to write from**

- V22 says recall, ranking, verification, and use-tiering are distinct stages in selecting an asset pack. ([GitHub][2])
- The README explicitly lists "ranked candidates plus separate verification and use-tiering." ([GitHub][1])

### 3.5 Asset-pack assembly and branch materialization

**Useable facts to write from**

- The README says the prototype already demonstrates asset-pack assembly and private branch artifact materialization. ([GitHub][1])
- V22's selection-and-materialization proof family binds to `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-proof.json`, and related visibility proofs. ([GitHub][2])

### 3.6 Principal-scoped disclosure

**Useable facts to write from**

- V22 says public projection remains bounded metadata only, while reviewer, buyer, and internal projections expose progressively richer surfaces. ([GitHub][2])
- The projection-quality matrix requires:

  - `public`: projection visibility summary, bounded public proof
  - `reviewer`: projection visibility summary, proof-family catalog, theorem/invariant checks
  - `buyer`: projection visibility summary, selected asset pack, settlement preview
  - `internal`: projection visibility summary, selected source material manifest, authorization decisions. ([GitHub][2])
- The operator shell calls the public proof surface "the redacted inspection surface intended to remain public while private proof artifacts stay private." ([GitHub][4])

### 3.7 Exact settlement

**Useable facts to write from**

- The README says the prototype already demonstrates `exact source-to-shares settlement with journal diff conservation`. ([GitHub][1])
- V22 says settlement artifacts include source-to-shares, settlement participation, accounting precision, settlement proof, and journal completeness proof, and that allocations conserve exact micro-units. ([GitHub][2])
- The shell renders `metered micro-units`, raw and settled share basis points, credited micro-units, exact accounting invariants, basis-point normalization, and source material to shares closure. ([GitHub][4])

**Exhibit to pair**

Supply -> need -> fit -> ranking/verification -> asset pack -> branch/proof/witness artifacts -> principal-scoped disclosure -> source-to-shares settlement. ([GitHub][2])

---

## 4. Why Legacy V22 Matters

**Writing note**

Present legacy V22 as a truth-alignment and hardening release.

**Useable facts to write from**

- V22 calls itself a `system-facing` version rather than a specifying-centered version. ([GitHub][2])
- V22 says `protocol-demonstration/src/canon-posture.js` is now the executable canon-posture source, and that runtime, API, browser shell, README posture, and tests derive from that source. ([GitHub][2])
- V22 adds `.engi/v22-canon-posture-drift-report.json` and promotion-time runtime posture preparation so canonical promotion cannot silently leave the runtime or operator shell behind. ([GitHub][2])

**Drafting cues**

- "V22 closes the gap between canonical specification and operating implementation."
- "Canon is no longer only stated. It is executable inside Bitcode itself."

---

## 5. Why this is credible now

**Writing note**

Use sober, specific evidence.

**Useable facts to write from**

- V22's current proof-run basis is: `familyCount = 9`, `memberCount = 45`, `theoremCount = 57`, `runCount = 16`, `scenarioCount = 8`, `branchModeCount = 2`, `fullyProven = true`. ([GitHub][2])
- The nine proof families are inference-synthesis, prompt-completeness, static-code-analysis, verification-decisions, selection-and-materialization, authorization-and-sensitive-flow, settlement-source-to-shares, disclosure-boundary, and proof-contract. ([GitHub][2])
- V22's current scenario inventory includes `auth-issuer-rollback`, `rust-validator-proof-gap`, `config-policy-precedence-incident`, `unsafe-patch-review-recovery`, `infra-deployment-mismatch`, `privacy-boundary-proof-export`, `polyglot-gateway-benchmark-remediation`, and `auth-many-asset-normalization`. ([GitHub][2])
- V22 requires cross-product coverage over `8 scenarios x 2 branch modes`, `2 realization profiles x 8 scenarios`, and `4 projection principals x required disclosure surfaces`. ([GitHub][2])

**Readiness scoreboard**

- Proof families: 9
- Proof members: 45
- Theorems: 57
- Runs: 16
- Scenarios: 8
- Branch modes: 2
- Fully proven: true. ([GitHub][2])

---

## 6. Bitcoin-backed deployment: prover, spend rail, and provable ledger

**Writing note**

This section should do four things:

1. Explain **why Bitcoin belongs in Bitcode's deployment architecture**.
2. Make **auditability** the core reason, not "crypto optionality."
3. Separate **current Bitcode implementation** from **BTC deployment architecture**.
4. Show that Bitcoin is strongest for Bitcode at three layers: **computation settlement/dispute**, **storage anchoring**, and **BTC-native payment flows**. ([Bitcoin Developer Documentation][5])

**Bridge sentence to use**

Bitcode's local V22 system already emits exact accounting, bounded public proof, projection policy, source-to-shares closure, and generated audit artifacts. The Bitcoin thesis is that these same proof-bearing surfaces can become **BTC-payable, BTC-auditable, and ultimately Bitcoin-anchored** in deployment. ([GitHub][2])

### 6.1 Why Bitcoin belongs here

**Writing note**

Lead with auditability, not speculation.

**Useable facts to write from**

- Bitcoin block headers store the Merkle root of transaction data and the hash of the previous block's header; the developer guide says this chaining ensures a transaction cannot be modified without modifying the block that records it and all following blocks. ([Bitcoin Developer Documentation][5])
- Bitcoin's transaction model is UTXO-based: each input spends a previous output, and each output becomes an Unspent Transaction Output until later spent. ([Bitcoin Developer Documentation][6])
- Bitcode already emits auditable runtime and proof artifacts such as `.engi/asset-pack.lock.json`, `.engi/source-to-shares.json`, `.engi/projection-policy.json`, `.engi/system-proof-bundle.json`, and `.engi/v22-canon-posture-drift-report.json`. ([GitHub][2])

**Drafting cue**

- "Bitcoin matters to Bitcode first as an audit substrate: a spend ledger, a commitment ledger, and a dispute-verifiable public clock."

### 6.2 Bitcoin as prover

**Writing note**

Be precise here: Bitcoin base layer is not where Bitcode should run bulk proof computation today. It is where Bitcode should **anchor**, **challenge**, and eventually **verify** compact commitments and dispute paths.

**Useable facts to write from**

- Taproot (BIP341) defines a SegWit v1 output type based on Taproot, Schnorr signatures, and Merkle branches. It allows only the actually executed script branch to be revealed, and makes outputs spendable by either a key or, optionally, a script, while remaining indistinguishable if the key path is used. ([BIPs][7])
- Tapscript (BIP342) adds Schnorr-aware script semantics and `OP_CHECKSIGADD`, which can express multisignature policies in a batch-verifiable way. ([BIPs][8])
- BitVM's own whitepaper and project site describe a model where arbitrary computation is performed off-chain and **verified** on Bitcoin through a prover/verifier and fraud-proof style mechanism; it is a proposal/research path rather than a deployed Bitcoin base-layer standard. ([BitVM][9])

**Recommended memo position**

Near term, Bitcode proof computations should execute off-chain or on a sidechain/L2, while Bitcoin holds the strongest public commitments and settlement receipts. Longer term, BitVM-class designs are relevant because they align with Bitcode's goal of keeping heavy computation off-chain while making correctness challengeable and publicly auditable on Bitcoin. This is an architectural recommendation based on Bitcoin's current primitives and proposal landscape. ([BitVM][9])

**Suggested phased language**

- **Phase 1:** Compute Bitcode proofs off-chain; anchor proof-bundle and settlement roots to Bitcoin.
- **Phase 2:** Use sidechain/L2 execution for higher-frequency proof and settlement activity, with periodic Bitcoin anchoring.
- **Phase 3:** Adopt more direct Bitcoin verification or challenge-based proving only as BitVM-style systems mature. ([BitVM][9])

### 6.3 BTC spend interface

**Writing note**

This is where you explain how buyers actually pay and how Bitcode share/read flows stay auditable.

**Useable facts to write from**

- BIP174 standardizes PSBT and defines Creator, Updater, and Signer roles. The Signer role is explicitly constrained to sign only against the UTXO and script data carried in the PSBT. ([BIPs][10])
- Bitcoin Core exposes `createpsbt`, `walletcreatefundedpsbt`, `combinepsbt`, `analyzepsbt`, and `finalizepsbt`, which makes PSBT a practical spend interface for audited transaction assembly and review. ([Bitcoin Developer Documentation][11])
- MuSig2 (BIP327) allows multiple signers to create one aggregate public key and one ordinary Schnorr signature. It supports tweaking for BIP32 derivation and Taproot outputs, and its Taproot outputs are indistinguishable from single-signer outputs, but MuSig2 is explicitly **n-of-n**, not t-of-n threshold signing. ([BIPs][12])
- For refund, expiry, and dispute windows, BIP65 `OP_CHECKLOCKTIMEVERIFY` and BIP112 `CHECKSEQUENCEVERIFY` provide absolute and relative timelocks. ([BIPs][13])
- Lightning uses payment channels anchored on Bitcoin to enable near-instant, low-cost bitcoin settlement between participants. ([Builder's Guide to the LND Galaxy][14])

**Drafting cues**

- "Base-layer BTC + PSBT is the right interface for larger, reviewable Bitcode purchases and treasury-governed settlement."
- "Lightning is the right interface for smaller, repeated, read-like payments."
- "MuSig2 is attractive for compact joint control, while Miniscript/tapscript policies are better when Bitcode needs richer threshold, fallback, or timeout logic." ([BIPs][12])

### 6.4 Ledger provability

**Writing note**

This section should explain **what** Bitcode anchors to Bitcoin, **what it does not**, and **why**.

**Useable facts to write from**

- Bitcoin developer docs say null-data outputs are provably unspendable and do not have to be stored in the UTXO set, but also say it is usually preferable to store data outside transactions if possible. ([Bitcoin Developer Documentation][15])
- Taproot lets a spend commit to a Merkle tree of scripts and reveal only the executed branch when needed. ([BIPs][7])
- Bitcode's settlement proof family binds to `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/settlement-proof.json`, and `.engi/settlement-source-to-shares-proof.json`, and V22 requires those surfaces to remain exact and replayable. ([GitHub][2])
- Bitcode's disclosure-boundary proof family binds to `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, and `.engi/disclosure-proof.json`, and V22 makes public overexposure a blocking failure. ([GitHub][2])
- Bitcode's proof-contract family binds to `.engi/system-proof-bundle.json` and `.engi/proof-witness-manifest.json`; V22 also requires `_legacy/ENGI_SPEC_V22_PROVEN.md` and `.engi/v22-canon-posture-drift-report.json` as generated audit surfaces. ([GitHub][2])

**Recommended memo position**

For Bitcode, Bitcoin should anchor **content-addressed roots and audit receipts**, not bulky private payloads. A clean design is to hash and commit roots for the asset-pack lock, system proof bundle, source-to-shares set, settlement proof chain, disclosure policy, and canon-posture drift report, while leaving private branch artifacts and sensitive source material off-chain. That recommendation follows directly from Bitcoin's commitment strengths, Taproot's selective reveal model, and Bitcoin Core's own warning that bulk data belongs outside transactions. ([Bitcoin Developer Documentation][15])

**Good contrast to write explicitly**

- **OP_RETURN / null-data style anchor:** best for simple public receipt roots.
- **Taproot commitment:** best when Bitcode wants hidden branches, selective reveal, or multi-party spending conditions around the commitment.
  This is an architectural inference from Bitcoin's documented data-carrier and Taproot properties. ([Bitcoin Developer Documentation][15])

### 6.5 Tokenomics and BTC-settled reads

**Writing note**

This section should stay disciplined. Use Bitcode's own settlement language first, then layer BTC-denominated purchasing and issuance on top.

**Useable facts to write from**

- V22's workflow-stage catalog already distinguishes `Openly writable`, `Measurably readable`, `Provable`, and `Valuable`, and says the `Measurably readable` stage runs the licensed query for the buyer need and shows measured bundle assembly. ([GitHub][2])
- The shell already renders `metered micro-units`, preview allocations, settled share basis points, credited micro-units, and bundle IDs inside the settlement preview. ([GitHub][4])
- V22 requires normalized shares to preserve exact micro-units and makes journal completeness and settlement-proof coherence theorem-level obligations. ([GitHub][2])
- Liquid is a Bitcoin sidechain that offers LBTC via a verifiable 1:1 peg, one-minute blocks, issued assets, and asset issuance support, but it is a sidechain with its own federation/trust model rather than Bitcoin mainchain itself. ([Liquid Developer Docs][16])

**Drafting cues**

- "Bitcode's tokenomic primitive does not need to begin as a generic token. It can begin as a BTC-settled read right over a proof-bearing bundle."
- "The first economic unit in Bitcode can be the metered, provable read: a BTC-denominated purchase that yields a licensed bundle access event, a bundle ID, a proof receipt, and exact downstream source-to-shares settlement."
- "Transferable or sidechain-issued units can come later, but the core claim is stronger if it begins with auditable BTC spend and auditable BTC-anchored receipts." ([GitHub][2])

**Optional model split**

- **Phase 1 tokenomics:** BTC pays for reads; Bitcode issues a metered read receipt and settles contributors internally with exact source-to-shares accounting.
- **Phase 2 tokenomics:** optional Liquid-issued unit or sidechain-native claim instrument if Bitcode wants faster programmable issuance and transferability on Bitcoin-adjacent rails.
- **Phase 3 tokenomics:** tighter Bitcoin-mainchain anchoring or challenge-verifiable computation as economics and tooling mature. ([GitHub][4])

**Important honesty sentence to keep**

The current V22 demo does **not** yet execute networked settlement effects or publish proof artifacts externally, so the Bitcoin section should be framed as Bitcode's next deployment architecture rather than a claim that BTC integration is already live in the current prototype. ([GitHub][1])

---

## 7. What exists today, versus what remains modeled

**Writing note**

Keep this section explicit. It protects credibility.

### 7.1 Demonstrated today

**Useable facts to write from**

- The README says the prototype already demonstrates repo supply and modeled GitHub App-authenticated inventory, depositing against a measured need, needing as benchmark/parser/repo-derived demand, explicit fit, ranked candidates plus separate verification and use-tiering, asset-pack assembly and private branch artifact materialization, proof closure and bounded public proof, disclosure/redaction policy, and exact source-to-shares settlement with journal diff conservation. ([GitHub][1])

### 7.2 Still modeled rather than live

**Useable facts to write from**

- The README says the repo does not yet mint live GitHub installation tokens, fetch live workflow artifacts, push real remediation branches or PR updates, run live LLM evaluators, publish proof artifacts to an external system, or execute real networked settlement effects. ([GitHub][1])

**Drafting cue**

- "The system is already audit-shaped. Deployment rails remain the next layer."

---

## 8. Why Bitcode is not just another AI engineering tool

**Writing note**

Keep this structural.

**Useable facts to write from**

- Bitcode's shell is organized around repo supply, deposit, need, fit, repo-to-settlement path, identity/auth spine, boundary reality, proof, and settlement. ([GitHub][4])
- V22's disclosure model enforces principal-bounded surfaces and blocks public overexposure. ([GitHub][2])
- Settlement is canonically exact and replayable, not a vague attribution layer. ([GitHub][2])
- With Bitcoin added as infrastructure, Bitcode's distinction becomes even sharper: BTC is not there for branding; it is there to harden receipts, payment flows, and public verifiability. ([Bitcoin Developer Documentation][5])

**Drafting cue**

- "What differentiates Bitcode is not generation alone, but the integration of proof, disclosure, settlement, and eventually BTC-audited deployment into one operating system."

---

## 9. The remaining work is explicit and bounded

**Writing note**

Turn unfinished work into bounded roadmap.

**Useable facts to write from**

- V22 explicitly keeps projection-matrix expansion, mutation cross-product expansion, and screenshot-backed visual closure deferred beyond the first gate. ([GitHub][2])
- The README is explicit that networked settlement and external proof publication are still modeled rather than live. ([GitHub][1])
- On the Bitcoin side, BitVM-style proving should be described as a research-aligned future direction, not as present production capability. ([BitVM][9])

**Drafting cue**

- "The unfinished work is named, sequenced, and honest on both sides: in Bitcode's canon and in Bitcoin's current deployment landscape."

---

## 10. Investment case

**Writing note**

This section still needs your market, demand, and financing specifics, but the technical thesis is now stronger.

**Useable facts to write from**

- Bitcode already joins authenticated supply, measured need, explicit fit, ranked/verified selection, artifact materialization, principal-scoped disclosure, and exact settlement in one system. ([GitHub][2])
- Bitcoin gives Bitcode a credible path for public anchoring, auditable spend, and staged proof verification without pretending Bitcoin is a bulk compute or bulk storage layer. ([Bitcoin Developer Documentation][5])
- Lightning and Liquid give Bitcode practical near-term rails for low-friction BTC payments and, if needed later, Bitcoin-adjacent issued assets with different trust/performance trade-offs. ([Builder's Guide to the LND Galaxy][14])

**Drafting cue**

- "Bitcode is building the audit layer for engineering knowledge markets, and Bitcoin is the strongest available infrastructure for making that audit layer publicly durable and economically native."

---

## 11. Closing

**Writing note**

End on inevitability and category.

**Suggested direction**

Engineering knowledge becomes more valuable when it can be measured. It becomes market-bearing when it can be disclosed safely, verified rigorously, and settled exactly. Bitcode is building the infrastructure that makes that possible - and Bitcoin gives that infrastructure its strongest path to public auditability, spend-native access, and durable proof anchoring. ([GitHub][2])

---

## Appendix / exhibit scaffold

### A. Core protocol diagram

Use:

- repo-authenticated supply
- measured need
- explicit fit
- ranking and verification
- asset-pack assembly
- branch/proof/witness artifacts
- principal-scoped disclosure
- source-to-shares settlement. ([GitHub][2])

### B. Readiness scoreboard

Use:

- 9 proof families
- 45 proof members
- 57 theorems
- 16 runs
- 8 scenarios
- 2 branch modes
- fullyProven = true. ([GitHub][2])

### C. Projection matrix

Use:

- public: bounded public proof only
- reviewer: proof-family and theorem/invariant surfaces
- buyer: selected asset pack and settlement preview
- internal: selected source material manifest and authorization decisions. ([GitHub][2])

### D. BTC architecture exhibit

Use three layers:

- **Computational implementation:** off-chain / sidechain-L2 proof execution, future challenge-verifiable Bitcoin proving. ([BitVM][9])
- **Storage reality:** Bitcoin block commitments for Bitcode proof roots, settlement roots, and canon/audit receipts. ([Bitcoin Developer Documentation][5])
- **Fee payment interface:** PSBT for larger purchases, Lightning for small reads, optional Liquid for Bitcoin-adjacent issued assets and faster settlement. ([BIPs][10])

### E. Bitcode artifacts to anchor

Use:

- `.engi/asset-pack.lock.json`
- `.engi/source-to-shares.json`
- `.engi/projection-policy.json`
- `.engi/system-proof-bundle.json`
- `.engi/settlement-proof.json`
- `.engi/v22-canon-posture-drift-report.json`
- `_legacy/ENGI_SPEC_V22_PROVEN.md`. ([GitHub][2])

### F. Spend flow exhibit

Use:

1. buyer opens a licensed read / bundle purchase
2. BTC payment assembled via PSBT or Lightning
3. Bitcode issues bundle ID + read receipt + metered micro-units
4. Bitcode settles contributors via exact source-to-shares
5. Bitcode anchors public-safe receipt/commitment root to Bitcoin.

Steps 2, 4, and 5 are grounded in current Bitcoin/Bitcode primitives; the overall flow is the recommended deployment path rather than a description of a live V22 integration. ([BIPs][10])

The cleanest next move is drafting the new Section 6 in finished prose first, because that will lock the Bitcoin narrative before it leaks into the rest of the memo in a looser, less disciplined way.

[1]: https://raw.githubusercontent.com/engineeredsoftware/bitcode/main/protocol-demonstration/README.md "https://raw.githubusercontent.com/engineeredsoftware/bitcode/main/protocol-demonstration/README.md"
[2]: https://raw.githubusercontent.com/engineeredsoftware/bitcode/main/_legacy/ENGI_SPEC_V22.md "https://raw.githubusercontent.com/engineeredsoftware/bitcode/main/_legacy/ENGI_SPEC_V22.md"
[3]: https://raw.githubusercontent.com/engineeredsoftware/bitcode/main/protocol-demonstration/src/canon-posture.js "https://raw.githubusercontent.com/engineeredsoftware/bitcode/main/protocol-demonstration/src/canon-posture.js"
[4]: https://raw.githubusercontent.com/engineeredsoftware/bitcode/main/protocol-demonstration/public/app.js "https://raw.githubusercontent.com/engineeredsoftware/bitcode/main/protocol-demonstration/public/app.js"
[5]: https://developer.bitcoin.org/devguide/block_chain.html?highlight=consensus "https://developer.bitcoin.org/devguide/block_chain.html?highlight=consensus"
[6]: https://developer.bitcoin.org/devguide/transactions.html?highlight=p2pkh "https://developer.bitcoin.org/devguide/transactions.html?highlight=p2pkh"
[7]: https://bips.dev/341 "https://bips.dev/341"
[8]: https://bips.dev/342/ "https://bips.dev/342/"
[9]: https://bitvm.org/ "https://bitvm.org/"
[10]: https://bips.dev/174/ "https://bips.dev/174/"
[11]: https://developer.bitcoin.org/reference/rpc/createpsbt.html "https://developer.bitcoin.org/reference/rpc/createpsbt.html"
[12]: https://bips.dev/327/ "https://bips.dev/327/"
[13]: https://bips.dev/65/ "https://bips.dev/65/"
[14]: https://docs.lightning.engineering/the-lightning-network/overview "https://docs.lightning.engineering/the-lightning-network/overview"
[15]: https://developer.bitcoin.org/devguide/transactions.html?highlight=script "https://developer.bitcoin.org/devguide/transactions.html?highlight=script"
[16]: https://docs.liquid.net/docs/technical-overview "https://docs.liquid.net/docs/technical-overview"
