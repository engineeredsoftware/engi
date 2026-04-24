# Bitcode LLM Registry Notes

Status: non-canonical internal note.

## Purpose

LLM registry configuration selects model providers for Bitcode inference without letting provider details define product semantics.

## Current Environment Keys

Examples:
- `BITCODE_LLM_PROVIDER=google`
- `BITCODE_LLM_MODEL=gemini-2.5-flash`
- `BITCODE_LLM_PROVIDER=anthropic`
- `BITCODE_LLM_MODEL=opus-4.1`

## Rules

- Provider/model selection is execution infrastructure.
- Prompt and tool registries remain separate from provider defaults.
- Need measurement, fit review, AssetPack synthesis, and Finish semantics must not depend on provider-specific naming.
- Cost and token accounting should be captured as proof/receipt metadata where available.

