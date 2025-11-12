LLM Registry and Model Catalog
================================

Scope
- Centralizes supported providers/models and defaults.
- Explains how default LLM selection works in Deliverables pipeline.
- Documents environment variables and how future granular overrides fit in.

Single Source of Truth
- Catalog file: `packages/models/src/pricing.ts` (import via alias `@/utils/model-pricing` in uapi)
  - Providers: `openai`, `google`, `anthropic`.
  - Models: includes OpenAI GPT‑5 Standard/Mini, Google Gemini 2.5 Pro/Flash/Flash‑Lite, Anthropic Claude Opus 4.1/Sonnet 4.
  - Exposes pricing and token limits per model, plus helper getters.

Defaults and Env Variables
- Defaults: local development defaults to Google Gemini Flash.
  - `ENGI_LLM_PROVIDER=google`
  - `ENGI_LLM_MODEL=gemini-2.5-flash`
- Production can override via env, e.g. Anthropic Opus:
  - `ENGI_LLM_PROVIDER=anthropic`
  - `ENGI_LLM_MODEL=opus-4.1`

Pipeline Integration
- Deliverables bootstrap: `packages/pipelines/deliverable/src/initialize.ts`
  - Builds an `LLMRegistry` with providers from `@engi/generic-llms`.
  - Sets default provider/model from env (falls back to Gemini Flash).
  - Configures global model at path `*` so `ExecutionLLMRegistry.getDefaultLLM(execution)` resolves without per‑phase overrides.

Granular Overrides (Supported, not required now)
- The `ExecutionLLMRegistry` supports hierarchical configuration.
  - Per‑phase/agent/sequence overrides can be set during a “setup” step/agent by calling `execution.llms.configure(path, config)` or equivalent API.
  - If unset, lookups inherit from global `*` path + default provider.

Pricing
- Pricing and token limits are stored on each model spec in `packages/models/src/pricing.ts`.
- Credits now read pricing from the centralized catalog with a legacy fallback map retained for older models.

Tests
- `packages/generic-llms/tests/unit/registry.test.ts` validates the Google provider is registered and used by default when env is unset.
