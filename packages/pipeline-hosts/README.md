# `@bitcode/pipeline-hosts`

This package owns host-runtime adapters for Bitcode pipeline QA. The first
adapter is the Vercel Sandbox harness used to prove that Read/Fit and
AssetPack pipeline work is running in an isolated host, emitting artifacts, and
leaving enough telemetry for SQL readback.

## Vercel Sandbox Host Capabilities

- Firecracker microVM isolation on Amazon Linux 2023.
- Default working directory: `/vercel/sandbox`.
- Default runtime: `node24`; documented runtime options are `node24`,
  `node22`, and `python3.13`.
- The sandbox user is `vercel-sandbox` and can use `sudo`.
- Filesystem state is ephemeral. Evidence must be exported before stop, then
  persisted to Bitcode storage or database projections.
- Command output, file upload/download, exposed ports, network policies, and
  snapshots are part of the host contract.
- Auth is through Vercel OIDC tokens from `vercel link && vercel env pull`, or
  through access-token variables for non-Vercel hosts.

## Harness Modes

`host_smoke` verifies the host lifecycle only. It creates a sandbox, writes a
manifest and runner, executes Node, writes `evidence.json` and
`telemetry.jsonl`, exports them, then stops the sandbox. The result is always
`blocked_readiness` because the AssetPack pipeline was not invoked.

`asset_pack_pipeline` clones or mounts a repository source, installs workspace
dependencies, builds a manifest depository asset from the pinned Deposit and
source revision, and runs the AssetPack pipeline runner in the sandbox. It still
requires SQL readback before any `worthy_fit`, settlement, range, BTC fee, or
ledger finality claim is commercially admissible. If the operator has already
verified proof and measurement posture for the manifest Deposit, set
`BITCODE_SANDBOX_DEPOSIT_HAS_PROOF=1` and
`BITCODE_SANDBOX_DEPOSIT_HAS_MEASUREMENT=1`; otherwise the pipeline should
return `blocked_readiness` rather than a worthy fit.
The exported evidence must include the AssetPack embedding policy
(`text-embedding-3-small`, `1536` dimensions, cosine
`match_deliverable_vectors`) so SQL readback can detect vector-space drift.
The harness prepares the repo-pinned `pnpm` runtime before installing so
Corepack's latest release cannot drift the frozen lockfile contract. Runtime
helpers used only by the harness are installed under `.bitcode/pipeline-harness`
so historical deposited source revisions do not need to carry newer harness
dependencies.

Structured database telemetry is part of the harness contract. A real Read/Fit
pipeline run must write the deliverable hierarchy:
`deliverable_pipeline_runs`, `deliverable_pipeline_events`,
`deliverable_pipeline_phase_delegations`,
`deliverable_pipeline_agent_steps`, `deliverable_pipeline_generations`, and
`deliverable_pipeline_tool_executions`. Generation rows should retain the
interpolated model messages when available, raw and parsed output, model
identity, token usage, and phase/agent/step context.
Failed runs must still export `evidence.json` with the execution tree and
last-known stream events so staging operators can see which SDIVF phase, PTRR
agent, generation, or tool last produced input/output evidence.
The runner subscribes to stream events for artifact telemetry even when database
streaming is disabled; database streaming adds persistence, not basic event
visibility.
The live runner also enforces `BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS`
(default `240000`) inside the sandbox so a heavyweight pipeline run records a
blocked-readiness artifact before the calling Vercel Function or local harness
process reaches its own timeout.

For live model execution, the sandbox runner also needs `OPENAI_API_KEY` in the
trusted command environment. For local Vercel Sandbox creation, either pull
`VERCEL_OIDC_TOKEN` with `vercel link && vercel env pull`, or provide the access
token tuple `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, and `VERCEL_PROJECT_ID`. Deployed
Vercel code should use automatic OIDC rather than storing a Vercel token when
possible.
`BITCODE_LLM_PROVIDER` and `BITCODE_LLM_MODEL` may pin the generation model.
When they are absent, the commercial runtime chooses OpenAI if `OPENAI_API_KEY`
is the only model credential present. A provider pin is forwarded only when the
matching provider credential is also forwarded; stale pins without credentials
are stripped so staging does not silently require an unavailable model service.
Database streaming requires a real Supabase URL and service-role key; placeholder
`.env.local` values fail preflight before a sandbox is created.

## Live QA

Link a Vercel project and pull local OIDC credentials:

```bash
vercel link
vercel env pull
```

Run the low-cost host smoke:

```bash
BITCODE_RUN_VERCEL_SANDBOX_HARNESS=1 \
BITCODE_SANDBOX_MODE=host_smoke \
BITCODE_SANDBOX_REPOSITORY=engineeredsoftware/ENGI \
BITCODE_SANDBOX_SOURCE_BRANCH=main \
BITCODE_SANDBOX_SOURCE_COMMIT=31bbc0c5227b6b3aed5d107fd8507d35ec22970a \
pnpm -C packages/pipeline-hosts run qa:asset-pack:sandbox
```

Run the repository pipeline path after source access and credentials are ready:

```bash
BITCODE_RUN_VERCEL_SANDBOX_HARNESS=1 \
BITCODE_SANDBOX_MODE=asset_pack_pipeline \
BITCODE_SANDBOX_SOURCE_GIT_URL=https://github.com/engineeredsoftware/ENGI.git \
BITCODE_SANDBOX_SOURCE_BRANCH=main \
BITCODE_SANDBOX_SOURCE_COMMIT=31bbc0c5227b6b3aed5d107fd8507d35ec22970a \
BITCODE_SANDBOX_SOURCE_REVISION=31bbc0c5227b6b3aed5d107fd8507d35ec22970a \
BITCODE_SANDBOX_DEPOSIT_HAS_PROOF=1 \
BITCODE_SANDBOX_DEPOSIT_HAS_MEASUREMENT=1 \
pnpm -C packages/pipeline-hosts run qa:asset-pack:sandbox
```

When validating local harness changes before the pinned source revision has been
promoted, add `BITCODE_SANDBOX_APPLY_LOCAL_PATCH=1`. The runner uploads
`git diff --binary $BITCODE_SANDBOX_SOURCE_REVISION` as a source overlay and
applies it before dependency installation. Overlay runs are QA-only: evidence records
`sourceOverlay.commercialAdmissibility=qa-only-not-source-revision-evidence`,
and the harness must not be used as settlement or source-revision finality
evidence until the same changes exist at the deposited revision.

On a deployed Vercel preview/staging runtime, trigger the same harness through
the authenticated streaming route so the server can use Vercel's automatic
Sandbox OIDC. The route also reuses the authenticated user's GitHub installation
token for private repository clone credentials when no explicit source token is
configured:

```bash
curl -N "$BITCODE_UAPI_URL/api/pipeline-harness/asset-pack" \
  -H "Content-Type: application/json" \
  -H "Cookie: $BITCODE_STAGING_SESSION_COOKIE" \
  --data '{
    "repositoryFullName": "engineeredsoftware/ENGI",
    "sourceBranch": "main",
    "sourceCommit": "31bbc0c5227b6b3aed5d107fd8507d35ec22970a",
    "sourceGitUrl": "https://github.com/engineeredsoftware/ENGI.git",
    "readId": "1c4f1f50-ac8b-4d83-8d2d-dc9c96d238b0",
    "depositId": "3f68d845-d910-41ef-835a-89cf0103ac0a",
    "depositAssetId": "asset_repository-revision-deposit-engineeredsoftware-engi_aece31322e",
    "depositHasWalletOrAttestationProof": true,
    "depositHasAssetMeasurementEvidence": true
  }'
```

After the run, execute:

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 \
  -f supabase/queries/v28_qa_terminal_07_pipeline_harness_after_fit.sql
```

The harness is not commercially reviewable until this query reports pipeline
run/event/phase/agent/generation/tool visibility rather than a blocker state.

Only pass secrets through `BITCODE_SANDBOX_ENV_KEYS` when the sandbox code path
is trusted and its network policy is understood. Prefer credential brokering or
strict allowlists before running untrusted generated code.
