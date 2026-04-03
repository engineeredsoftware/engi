# ENGI Demo Script

This is the live presentation script for the current ENGI MVP demo.

---

## One-sentence thesis

ENGI is a depot where engineering knowledge is **openly writable**, **measurably readable**, **provable**, and **valuable**.

---

## Core claim

This demo shows that:

1. contributors can deposit engineering knowledge into the depot
2. a buyer can issue a licensed query against a real engineering need
3. the system can assemble a private, need-matched bundle and emit public proof artifacts
4. the licensed read can measurably improve the buyer's system on a concrete task

---

## Demo URL

Default local URL:

`http://127.0.0.1:4318`

---

## Recommended mode

Use **light mode** when presenting live unless someone explicitly wants to inspect internals.

- **Light mode** = story-first, proof group collapsed by default
- **Heavy mode** = inspection-first, proof group open inline

If someone asks "how does that actually work?" or "what proves this?", switch to **heavy mode** or expand the proof group.

---

## Gold-path story

### 0. Opening frame

Say something like:

> ENGI is a system for turning engineering knowledge into a measurable, licensable, and provable asset. This demo is intentionally minimal, but it shows the full loop end to end.

Then point at the top thesis strip:

- openly writable
- measurably readable
- provable
- valuable

---

## 1. Openly writable

### Where to look

- thesis strip
- summary cards
- **1. Public deposits**

### What to say

> First, the depot is openly writable. Contributors can deposit engineering knowledge into the system.
>
> What becomes public is not the entire corpus. What becomes public is the commitment surface: metadata, hashes, measurement state, and verification signals.
>
> So this is not just a public dump of files. It is a structured supply layer for engineering knowledge.

### Point out on screen

- deposited assets are visible
- each asset has:
  - title
  - author
  - tags
  - public commitment hash / asset root
  - measurement values
  - verification signals
- private content is still sealed at this stage

### Important line

> The key distinction is: the supply is openly writable, but the highest-value assembled output can still be licensed and selectively disclosed.

---

## 2. Measurably readable

### Where to look

- **2. Licensed read**

### What to say

> Next, the system is measurably readable. A buyer with a license can issue a real engineering query.
>
> In this demo, the buyer is facing a production auth incident: an enterprise auth migration rollback with an issuer mismatch.

### Use the seeded query

`enterprise auth migration rollback for monorepo services with issuer mismatch`

### What to do

- issue the query manually, or run the guided demo

### What to say after issuance

> The important thing is that the system does not just reveal everything. It assembles a private bundle matched to the need.
>
> The read is not "I have data in a database." The read is "for this concrete problem, I can retrieve the most relevant knowledge and package it for use."

### Point out on screen

- private bundle appears
- selected chunks are shown
- this is licensed output, not the full depot

### Important line

> The value is in assembling the right subset of knowledge for the task, not merely storing documents.

---

## 3. Provable

### Where to look

- collapsed or expanded **Proof and inspection surfaces**
- ranking explanation
- conservation check
- public receipts
- schemas
- policy release
- deployment / attestation
- proof log timeline

### What to say

> Third, the system is provable.
>
> The read event produces inspectable artifacts. You can see what was issued, how contribution was calculated, whether unit allocation conserved correctly, what schema each receipt follows, and what policy/deployment context is being claimed.

### If presenting in light mode

Start with the collapsed proof summary card.

### What to say in light mode

> Even collapsed, the proof layer still tells you whether receipts exist, whether allocation conserved, what policy version is bound, and what the latest proof event was.

### If expanding the proof group, walk in this order

#### A. Ranking explanation

> This shows why these chunks won. The read is not arbitrary — it reflects overlap with the query plus the measured value of the asset.

#### B. Conservation check

> This shows that metered units in equal allocated units out. In other words, the economic consequences are conserved rather than hand-waved.

#### C. Public receipts

> These are the public artifacts for issuance, allocation, deposit, and utility.

#### D. Receipt schemas

> Each receipt has a defined claim shape, so the proof surface is not just ad hoc JSON.

#### E. Policy + attestation

> This binds the behavior to a policy release and a deployment/provenance story.

#### F. Proof log timeline

> This gives a readable event history of what happened.

### Important line

> The system is not only generating output — it is generating inspectable evidence about how that output was produced and how value was allocated.

---

## 4. Valuable

### Where to look

- **3. Utility proof**
- benchmark panel

### What to say

> Finally, the system is valuable.
>
> This is the most important part of the demo. The system should not stop at proving that a licensed bundle was issued. It should end by showing that the read improved the buyer's system on a real task.

### Point out on screen

- benchmark task
- baseline score
- treatment score
- uplift
- baseline outcome
- treatment outcome
- why the bundle helped
- buyer impact

### Say this clearly

> Without the licensed bundle, the remediation system proposes a more generic rollback and misses critical issuer-compatibility sequencing and audit guardrails.
>
> With the licensed bundle, it restores verifier configuration in the right order, preserves session invariants, and follows the expected recovery path.

### Then land the business point

> So the claim is not just that knowledge was stored, and not just that knowledge was read. The claim is that licensed engineering knowledge improved remediation performance on a production auth incident.

### Important line

> This is the payoff of the entire system: the read was useful.

---

## Recommended exact close

> ENGI makes engineering knowledge openly writable, selectively and measurably readable, publicly provable, and economically valuable.
>
> In this demo, that means contributors deposit knowledge, a buyer facing a real production problem licenses the right bundle, the system emits proof artifacts around that read, and the final benchmark shows that the read improved the buyer's system.

---

## Recommended presenter flow

### Short version (~2 minutes)

1. opening frame
2. point to thesis strip
3. show deposits
4. issue query / show private bundle
5. briefly mention proof group
6. end on benchmark and buyer impact

### Medium version (~5 minutes)

1. opening frame
2. openly writable
3. measurably readable
4. expand proof group
5. show ranking + conservation + receipts
6. end on utility proof and buyer impact

### Longer version (~8-10 minutes)

1. opening frame
2. deposits and commitment structure
3. licensed read and bundle assembly
4. ranking explanation
5. conservation and allocation
6. receipt schemas and proof log
7. policy release and attestation
8. benchmark task, baseline, treatment, why it helped, buyer impact
9. closing thesis

---

## Recommended answers to likely questions

### "Why not just use a vector database?"

> A vector database gives retrieval. ENGI is trying to give retrieval plus measurement, licensing, proof artifacts, and value allocation.

### "What is actually public versus private?"

> Public: commitments, hashes, metadata, measurement state, and receipts. Private: the licensed bundle payload and sealed corpus content until issuance.

### "What is being measured?"

> In the current MVP, a deterministic blend of quantity, quality, valence, and query relevance. It is a prototype policy, not the final measurement system.

### "What makes it provable?"

> The system emits structured receipts, ranking explanations, conservation checks, policy binding, and provenance surfaces. In the MVP this is modeled and deterministic; later versions can strengthen the trusted kernel.

### "What proves value?"

> The final utility proof. The demo ends on a concrete benchmark where the licensed bundle improves the buyer's remediation outcome.

---

## Operator reminders

- default to **light mode** for live demoing
- only expand proof surfaces when needed
- do **not** get stuck explaining every panel before landing the benchmark ending
- the final benchmark panel is the payoff — spend the most emphasis there
- keep repeating the four-part thesis:
  - openly writable
  - measurably readable
  - provable
  - valuable

---

## Current seeded scenario

### Buyer

`Frontier Code Systems`

### Problem

`enterprise auth migration rollback for monorepo services with issuer mismatch`

### Expected top asset

`Enterprise auth migration rollback playbook`

### Expected value claim

The licensed read improves the buyer's remediation system, increasing confidence and reducing the risk of shipping an auth fix that breaks live sessions.
