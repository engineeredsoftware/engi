# `@bitcode/pipeline-hosts`

This package owns host-runtime adapters for Bitcode pipeline QA. The first
adapter is the Vercel Sandbox harness used to prove that Read/Fit and
AssetPack pipeline work is running in an isolated host, emitting artifacts, and
leaving enough telemetry for SQL readback.

## Vercel Sandbox Host Capabilities

- Firecracker microVM isolation on Amazon Linux 2023.
- Default working directory: `/vercel/sandbox`.
- Default runtime: `node24`; stable documented runtime options are `node24`,
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

Only pass secrets through `BITCODE_SANDBOX_ENV_KEYS` when the sandbox code path
is trusted and its network policy is understood. Prefer credential brokering or
strict allowlists before running untrusted generated code.
