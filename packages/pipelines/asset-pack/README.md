# AssetPack Pipeline

Canonical V26 package owner for the Bitcode phased pipeline corridor.
This package turns a measured Bitcode Need into stable written assets and
AssetPack evidence, then optionally hands those assets to connected-interface
delivery mechanisms.

Active route and payload seams use Bitcode nouns: `definitionOfNeed`, `need`,
`writtenAssetType`, `writtenAssets`, `Finish`, `Delivering`, and `SDIVF`.
Compatibility payload keys are subordinate mirrors and do not define product
semantics.

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
  writtenAssetType: 'need-satisfaction-asset-pack',
  deliveryMechanismTemplate: 'pull-request',
}, execution);
```

## Canonical Boundary

The package root and `runSDIVFPipeline` are the active AssetPack entry points.
The active phase registry is SDIVF and Finish-owned; non-Finish phase aliases
are not active product semantics.
