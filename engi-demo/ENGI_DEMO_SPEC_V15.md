# ENGI Demo Spec V15

Status: V15 draft demo-realization companion; not the active canonical pointer target
Scope: current deterministic local prototype under `engi-demo/`
Canonical pointer remains: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V14`
Current canonical/latest target remains: `V14`
Last fully realized canon preserved in source: `V12`
System-spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
Demo matrix companion: `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15_IMPLEMENTATION_MATRIX.md`

---

# 1. Demo-spec role

This file does not define ENGI system canon.

Its job is narrower:
- describe the current deterministic local prototype honestly,
- define the demo-local operator shell and persistence behavior,
- record how the current repo realizes the ENGI operating chain,
- and separate that realization truth from root-level system canon.

If this demo ever diverges from system canon, system canon wins.
If the system spec is broader than this demo, that does not make the demo spec wrong.
It means the demo is one realization rather than the whole system.

---

# 2. What this demo currently realizes

The local deterministic prototype realizes the ENGI operating chain as:
1. repo supply and modeled GitHub App-authenticated inventory,
2. depositing candidate supply against a measured need,
3. needing as benchmark/parser/repo-derived demand,
4. explicit deposit-to-need fit before deep proof inspection,
5. ranked candidates plus separate verification and use-tiering,
6. asset-pack assembly and private branch artifact materialization,
7. proof closure, bounded public proof, and disclosure/redaction policy,
8. exact source-to-shares settlement with journal diff conservation.

The demo is intentionally centered on:
- depositing,
- needing,
- fit,
- identity/auth as spine,
- repo-to-settlement closure,
- proof and settlement as necessary consequences,
- and explicit boundary honesty.

---

# 3. What remains modeled rather than live

This repo does not:
- mint live GitHub installation tokens,
- fetch live workflow artifacts from the network,
- push real remediation branches or PR updates,
- run live LLM evaluators,
- publish proof artifacts to an external system,
- execute real networked settlement effects.

Those surfaces are represented deterministically in local state and called out explicitly in boundary surfaces.

---

# 4. Demo-local operator shell

The current browser shell organizes operator understanding through the following panel order:
1. Operating picture
2. Depositing plus candidate assets
3. Needing plus measured demand
4. Depositing-to-needing fit
5. Ranked candidates plus verification determinisms
6. Asset pack plus branch artifacts
7. Settlement plus journal diff
8. Ledger plus policy surfaces

This ordering is demo-canonical for the current realization.
It is not automatically a universal system requirement for every future implementation.

Explainers, tooltips, visual/raw renderings, and panel summaries are demo-canonical whenever they summarize system truth without contradiction.

---

# 5. Demo-local source surfaces

Primary implementation files:
- `src/engi-demo.js`
- `server.js`
- `public/app.js`
- `public/index.html`

Primary tests:
- `test/core.test.js`
- `test/api.test.js`
- `test/e2e.test.js`

Primary adjunct docs:
- `HOST_CAPABILITIES.md`
- `HOST_CAPABILITIES.json`
- `ARCHITECTURE_MAP.md`

These files define the current realization.
They do not, by themselves, define the whole of system canon.

---

# 6. Host and runtime truth for the current demo

Current demo-host truth is recorded in:
- `HOST_CAPABILITIES.md`
- `HOST_CAPABILITIES.json`
- `Dockerfile`
- `.dockerignore`

For the current realization:
- `node` and filesystem access are the hard runtime requirements,
- many measurement and proof-relevant stages are deterministic in-process Node logic,
- `python3`, `rustc`, `cargo`, `git`, `docker`, `jq`, `rg`, `curl`, `openclaw`, and `codex` are optional machine-local tools rather than core-path requirements,
- native runtime/test and container runtime/test are the supported execution configurations,
- containerization remains local-demo scoped and does not erase remote-boundary truth.

This host truth is demo-canonical for the current prototype.
The root system spec carries the broader host/execution model.

---

# 7. Persistence and failure semantics

The current local realization is expected to preserve the following:
1. atomic JSON state writes,
2. explicit client-error handling for malformed input,
3. fail-closed parser behavior,
4. predictable reset to seeded deterministic state,
5. blocked path traversal,
6. predictable unknown-route failure.

These are realization requirements for this repo.

---

# 8. Demo validation expectations

The current demo realization is only in good shape when it keeps:
- unit and core invariant coverage,
- API route and projection coverage,
- browser e2e coverage for operator ordering and end-to-end flow,
- scenario-family coverage,
- proof and settlement coverage,
- zero-credit participation visibility where applicable,
- explainer and visual/raw parity where operator interpretation depends on them.

Browser e2e matters here because this demo uses ordered panels as part of the operator story.

---

# 9. Run and test

Run:

```bash
cd /Users/garrettmaring/Developer/ENGI/engi-demo
npm start
```

Test:

```bash
cd /Users/garrettmaring/Developer/ENGI/engi-demo
npm test
```

Main API:
- `GET /api/state`
- `POST /api/deposits`
- `POST /api/make-engi-branch`
- `POST /api/reset`

---

# 10. Demo-local artifact families

The latest run emits branch-scoped artifacts under `.engi/`, including:
- need and need-measurement artifacts,
- depositing, needing, and fit surfaces,
- match, verification, and eval manifests,
- asset-pack lock and selected source material manifest,
- identity, policy, authz, and GitHub boundary artifacts,
- prompt, measurement, verification, and proof artifacts,
- materialization proof and exclusions,
- source-to-shares, settlement participation, accounting precision, settlement proof, and journal diff,
- projection policy, bounded public proof, redaction proof, and disclosure proof,
- deliverables manifest,
- `ENGI_NEED.md`.

These artifacts are current demo-realization output.
The root system spec defines the broader canonical meaning of those families.

---

# 11. Demo-spec completion condition

The V15 demo spec is in good shape for this pass when:
1. it describes the current deterministic prototype honestly,
2. it does not pretend to define root system canon,
3. it preserves the current operator shell and validation story,
4. it states modeled-versus-live boundaries explicitly,
5. it points back to the root V15 system spec for system-canonical meaning.

This condition is satisfied for the current drafting pass.
