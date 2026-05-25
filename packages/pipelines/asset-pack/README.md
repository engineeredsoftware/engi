# AssetPack Pipeline

Canonical package owner for the Bitcode phased pipeline corridor.
This package turns a measured Bitcode Read into AssetPack synthesis artifacts,
Exchange-stored AssetPack evidence, and optional connected-interface
delivery-mechanism artifacts.

Active route and payload seams use Bitcode nouns: `definitionOfRead`, `read`,
`writtenAssetType`, `writtenAssets`, `Finish`, `Delivering`, and `SDIVF`.
Compatibility payload keys are subordinate mirrors and do not define product
semantics.

## SDIVF Shape

1. **Preprocess** - normalize the Read, source revision, delivery semantics, and depository search/ranking evidence.
2. **Setup** - repository context, Read comprehension, LSP/static measurement, and danger-wall admission.
3. **Discovery** - source-grounded research, codebase search, file selection, and approach planning.
4. **Implementation** - AssetPack synthesis artifacts using Divide, Apply, and Correct agents.
5. **Validation** - Read satisfaction, proof posture, and readiness-to-Finish checks.
6. **Finish** - save result state, summarize AssetPack evidence, and run Delivering when requested.

The `Discovery -> Implementation -> Validation` loop may iterate up to the
configured limit before Finish.

## Runtime Structure

```text
AssetPackPipeline (SDIVF with DIV iteration)
├── Preprocess
│   ├── Read and source-revision normalization
│   ├── Depository Finding Fits discovery
│   ├── Source-bound ranking
│   └── Fit result-state evidence
├── Setup
│   ├── VCS repository context
│   ├── Read comprehension
│   ├── LSP/static measurement
│   └── Danger-wall admission
├── [DIV loop]
│   ├── Discovery
│   ├── Implementation
│   └── Validation
└── Finish
    ├── Save AssetPack synthesis artifacts and Exchange evidence
    ├── Produce AssetPack completion summary
    └── Deliver AssetPacks or AssetPackPartials to connected destinations
```

## Usage

```typescript
import { assetPackPipeline } from '@bitcode/pipeline-asset-pack';

const result = await assetPackPipeline({
  read: 'Add user authentication with JWT',
  repository: {
    url: 'https://github.com/acme/app',
    branch: 'main',
  },
  writtenAssetType: 'read-satisfaction-asset-pack',
  deliveryMechanismTemplate: 'pull-request',
}, execution);
```

## Depository Search

`runDepositorySearchForPipelineInput` is the package-level primitive for
commercial Read/Fit finding over deposited AssetPack supply. It normalizes
`depositoryAssets`, `depositCandidates`, or manifest-only `deposit` +
`sourceRevision` inputs, ranks candidates with deterministic lexical, unit,
repository, revision, artifact-kind, proof, and measurement signals, and stores:

- `depository/search.result`
- `depository/search.candidateRanking`
- `depository/search.selectedCandidates`
- `depository/search.embeddingPolicy`
- `fit.result`
- `fit.resultState`
- `fit.resultReasons`

Result states are fail-closed:

- `worthy_fit` only when a selected candidate is source-bound, semantically
  relevant, proof-bearing, and measurement-bearing.
- `no_worthy_fit` when searched deposits do not satisfy the Read.
- `blocked_readiness` when the Read is too broad, no depository assets are
  available, candidate evidence is missing proof/measurement, or mock/frontier
  leakage is detected.

Search providers can be added through the `DepositorySearchProvider` interface.
The default lexical provider is deterministic so QA can prove ranking and result
state without relying on model availability.

## Depository Supply Index

`buildDepositorySupplyIndex` is the source-safe package primitive that turns
deposited repository/material supply into searchable Depository records before
Finding Fits runs. A `DepositorySupplyIndex` contains `DepositorySupplyRecord`
entries with repository, branch, commit, proof root, measurement root,
reconciliation readback root, BTD range, depositor wallet boundary, source-safe
search documents, vector projection rows, storage readback posture, and repair
actions.

The index deliberately keeps protected source outside the serialized record.
Lexical, metadata, measurement, and vector search documents use source-safe
titles, summaries, paths, symbol names, stack tags, constraints, and roots.
Rows with missing or invalid embeddings remain visible as repair posture through
`sync-active-embedding-vector-rows`; they are not treated as a fully searchable
vector corpus.

`depositorySupplyAssetsFromIndex` converts indexed records into source-safe
`DepositoryAsset` candidates for `ReadFitsFindingSynthesis`. This handoff lets
Finding Fits rank Depository supply without importing raw source text, unpaid
AssetPack source, credentials, wallet private material, or private settlement
payloads before the settlement boundary.

## ReadNeed review runtime

`ReadNeedReviewResynthesisRuntime` is the source-safe package primitive that
turns `ReadNeedComprehensionSynthesis` output into review-loop storage and
telemetry records. It projects the Read Request, current synthesized Need,
feedback history, resynthesis attempts, Need measurement inputs,
accepted-Need admission, rejected-Need posture, and telemetry receipts into
PipelineExecution-compatible storage records.

Finding Fits is admitted only when `acceptReadNeed` has produced an accepted
Need. Rejected or still-unreviewed Needs emit blockers and preserve feedback
for resynthesis. The runtime never serializes protected source, raw protected
prompts, raw provider responses, unpaid AssetPack source, credentials, wallet
private material, or private settlement payloads.

### Vector Embedding Contract

Depository vector recall uses the shared AssetPack embedding contract:

- provider: OpenAI embeddings API
- default model: `text-embedding-3-small`
- request shape: `{ model, input, encoding_format: 'float', dimensions: 1536 }`
- storage dimensions: `1536`
- max input: `8192` tokens per embedding request
- vector store: `deliverable_vectors.embedding`
- match RPC: `match_deliverable_vectors`
- distance/index: cosine similarity through `ivfflat` with `vector_cosine_ops`

`BITCODE_ASSET_PACK_EVIDENCE_EMBEDDING_MODEL` and
`BITCODE_ASSET_PACK_EVIDENCE_EMBEDDING_DIMENSIONS` may override the model and
dimension only for a rebuilt vector space. Mixed model/dimension rows are not a
commercially admissible search corpus. The default remains dimension-compatible
with the existing Supabase `vector(1536)` schema.

## Canonical Boundary

The package root and `runSDIVFPipeline` are the active AssetPack entry points.
The active phase registry is SDIVF and Finish-owned; non-Finish phase aliases
are not active product semantics.
