# @bitcode/generic-llms

LLM provider implementations that conform to the pure LLM interface from `@bitcode/llm-generics`.

## What it provides

Concrete implementations for:
- OpenAI
- Anthropic  
- Google
- Cohere
- Local models

## Usage

```typescript
import { createOpenAIProvider } from '@bitcode/generic-llms';

const llm = createOpenAIProvider({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4'
});

const response = await llm({
  messages: [{ role: 'user', content: 'Hello' }]
});
```

## Key principle

All providers implement the same pure `LLM` interface:
```typescript
type LLM = (input: LLMInput) => Promise<LLMOutput>;
```

## Principles & Integration

- Always integrate LLMs through the Execution LLM registry; do not call providers directly from UI or route code.
- Pipelines ensure a default provider/model is configured; phases/agents may override contextually.
- Provider/model and stop reasons should be surfaced in step logs and prompt I/O sidecars (see agent‑generics diagnostics).
- See `internal-docs/EXECUTABLE-PIPELINES.md` for how prompts, tools, and LLM registries compose in SDIVS and PTRR.
