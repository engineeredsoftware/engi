# TLDR - Deliverable Pipeline

## What It Is

The retained **Deliverable Pipeline** is the compatibility path for a Bitcode agentic pipeline run:
- the run satisfies a need
- the run synthesizes stable written assets / asset-packs
- shipping emits `deliverables` only as connected-interface delivery mechanisms

## Architecture

```
DeliverablePipeline (Bitcode agentic pipeline run with SDIVS + DIV loop)
├── Setup (vcs → digester → tech-types → danger-wall)
├── [DIV Loop - up to 3 iterations]
│   ├── Discovery (web-researcher → code-searcher → file-pick)
│   ├── Implementation (Divide|Conquer|Correct with code-editor)
│   └── Validation (short-circuit tool used in readiness checks)
└── Shipping (vcs / delivery mechanism handling)
```

## Usage

```typescript
const result = await deliverablePipeline({
  definitionOfDone: 'Add JWT authentication',
  repository: { url: 'github.com/acme/app' },
  deliveryTarget: 'pr'
}, execution);
```

## Key Features

- **Need-Satisfying Pipeline Runs**: Each run is an inference corridor that satisfies a Bitcode need
- **Stable Written Assets**: The primary output is a written asset / asset-pack, not a third-party wrapper
- **Delivery Mechanisms**: Shipping creates connected-interface deliverables such as PRs or comments on top of those assets
- **Actual Code Editing**: Implementation uses code-editor agent for real file modifications
- **SDIVS Pattern**: Setup → [Discovery → Implementation → Validation]* → Shipping
- **DIV Iteration**: Automatic iteration until validation passes (max 3)
- **Simplified Decisions**: No complex decision agents, just pass/fail checks
- **Transactional Edits**: All changes can be rolled back as a unit
- **Early Safety Checks**: Danger-wall in Setup phase before iteration

## Why It Matters

This is an early retained corridor for Bitcode productized inference: it turns need / definition-of-done input into stable assets, then delivers them through interface-specific mechanisms like PRs.
