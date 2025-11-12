# TLDR - Deliverable Pipeline

## What It Is

The **Deliverable Pipeline** transforms task descriptions into production-ready code through SDIVS pattern with DIV iteration.

## Architecture

```
DeliverablePipeline (SDIVS with DIV loop)
├── Setup (vcs → digester → tech-types → danger-wall)
├── [DIV Loop - up to 3 iterations]
│   ├── Discovery (web-researcher → code-searcher → file-pick)
│   ├── Implementation (Divide|Conquer|Correct with code-editor)
│   └── Validation (short-circuit tool used in readiness checks)
└── Shipping (vcs)
```

## Usage

```typescript
const result = await deliverablePipeline({
  taskDescription: 'Add JWT authentication',
  repository: { url: 'github.com/acme/app' },
  deliveryTarget: 'pr'
}, execution);
```

## Key Features

- **Actual Code Editing**: Implementation uses code-editor agent for real file modifications
- **SDIVS Pattern**: Setup → [Discovery → Implementation → Validation]* → Shipping
- **DIV Iteration**: Automatic iteration until validation passes (max 3)
- **Simplified Decisions**: No complex decision agents, just pass/fail checks
- **Transactional Edits**: All changes can be rolled back as a unit
- **Early Safety Checks**: Danger-wall in Setup phase before iteration

## Why It Matters

This is our first customer-facing pipeline that delivers real value - transforming natural language task descriptions into production code with PRs.
