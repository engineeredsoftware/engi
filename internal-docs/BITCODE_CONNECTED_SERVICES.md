# Bitcode Connected Services Notes

Status: non-canonical internal note.

## Purpose

Connected services are provider, source, and delivery mechanisms attached to Bitcode Exchange state.

Examples:
- GitHub and other VCS providers,
- Supabase/Postgres,
- Stripe or credit/payment systems,
- Figma and design-context providers,
- Jira and issue systems,
- MCP servers,
- ChatGPT App connectors,
- deployment and observability providers.

## Rules

- Connected services are not separate products.
- Source providers bind evidence and repository scope.
- Delivery providers receive AssetPacks or AssetPack partials.
- Every write-capable connected interface must fail closed without readiness and admission receipts.
- Provider payloads must normalize toward Need, fit, AssetPack, settlement, proof, or delivery-mechanism semantics.

## Current Source Examples

- `uapi/app/api/vcs/*`
- `packages/vcs/*`
- `packages/github/*`
- `packages/jira/*`
- `packages/chatgptapp/*`
- `packages/executions-mcp/*`
- `packages/api/src/routes/*`

