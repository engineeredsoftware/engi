# AssetPack Pipeline

Canonical V26 package owner for the retained Bitcode phased pipeline corridor.
This package turns a measured Bitcode Need into stable written assets and
AssetPack evidence, then optionally hands those assets to connected-interface
delivery mechanisms.

Active route and payload seams use Bitcode nouns: `definitionOfNeed`, `need`,
`writtenAssetType`, `writtenAssets`, `Finish`, `Delivering`, and `SDIVF`.
Former retained-system terms are tracked in V26 NOTES/DELTA rather than taught
as product semantics here.

## SDIVF Shape

1. **Setup** - repository context, Need comprehension, LSP/static measurement, and danger-wall admission.
2. **Discovery** - source-grounded research, codebase search, file selection, and approach planning.
3. **Implementation** - written-asset synthesis using Divide, Conquer, and Correct agents.
4. **Validation** - Need satisfaction, proof posture, and readiness-to-Finish checks.
5. **Finish** - save result state, summarize AssetPack evidence, and run Delivering when requested.

The `Discovery -> Implementation -> Validation` loop may iterate up to the
configured limit before Finish.

## Runtime Structure

```text
AssetPackPipeline (SDIVF with DIV iteration)
├── Setup
│   ├── VCS repository context
│   ├── Need comprehension
│   ├── LSP/static measurement
│   └── Danger-wall admission
├── [DIV loop]
│   ├── Discovery
│   ├── Implementation
│   └── Validation
└── Finish
    ├── Save written-asset / AssetPack evidence
    ├── Produce final work summary
    └── Deliver AssetPacks or AssetPackPartials to connected destinations
```

## Usage

```typescript
import { assetPackPipeline } from '@bitcode/pipeline-asset-pack';

const result = await assetPackPipeline({
  need: 'Add user authentication with JWT',
  repository: {
    url: 'https://github.com/acme/app',
    branch: 'main',
  },
  writtenAssetType: 'code-change',
  deliveryTarget: 'github-pull-request',
}, execution);
```

## Compatibility Boundary

`deliverablePipeline`, `runSDIVSPipeline`, and `shipping` phase names remain
available only to keep fifth-gate callers stable while downstream imports are
reformed. They must forward to the same AssetPack / SDIVF / Finish behavior and
must not define new Bitcode product semantics.
