# TLDR - AssetPack Pipeline

## What It Is

The **AssetPack Pipeline** is the Bitcode phased pipeline corridor:
- the run satisfies a measured Need
- the run synthesizes stable written assets and AssetPack evidence
- Finish saves results and Delivering optionally provides AssetPacks or AssetPackPartials to connected-interface destinations

## Architecture

```
AssetPackPipeline (Bitcode agentic pipeline run with SDIVF + DIV loop)
├── Setup (vcs → digester → tech-types → danger-wall)
├── [DIV Loop - up to 3 iterations]
│   ├── Discovery (web-researcher → code-searcher → file-pick)
│   ├── Implementation (Divide|Conquer|Correct with code-editor)
│   └── Validation (short-circuit tool used in readiness checks)
└── Finish (save AssetPack evidence → delivery mechanism handling)
```

## Usage

```typescript
const result = await assetPackPipeline({
  need: 'Add JWT authentication',
  repository: { url: 'github.com/acme/app' },
  writtenAssetType: 'need-satisfaction-asset-pack',
  deliveryMechanismTemplate: 'pull-request',
}, execution);
```

## Key Features

- **Need-Satisfying Pipeline Runs**: Each run is an inference corridor that satisfies a Bitcode Need
- **Stable Written Assets**: The primary output is written assets and AssetPack evidence, not a third-party wrapper
- **Delivery Mechanisms**: Delivering creates connected-interface handoffs such as PRs or comments on top of those assets
- **Actual Code Editing**: Implementation uses code-editor agent for real file modifications
- **SDIVF Pattern**: Setup → [Discovery → Implementation → Validation]* → Finish
- **DIV Iteration**: Automatic iteration until validation passes (max 3)
- **Simplified Decisions**: No complex decision agents, just pass/fail checks
- **Transactional Edits**: All changes can be rolled back as a unit
- **Early Safety Checks**: Danger-wall in Setup phase before iteration

## Why It Matters

This is an early Bitcode productized inference corridor: it turns Need input into stable assets, then delivers them through interface-specific mechanisms like pull requests.
