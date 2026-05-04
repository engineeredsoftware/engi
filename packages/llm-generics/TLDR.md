# LLM Generics - TLDR

**LLMs are async functions. Configuration cascades through registries.**

```typescript
type LLM = (input: LLMInput) => Promise<LLMOutput>;
```

## The Primitive

That's it. LLMs transform messages to responses. Zero framework awareness.

## LLM Registry

Uses the Registry pattern for hierarchical configuration:

```typescript
const registry = new LLMRegistry();

// Register providers
registry.registerProvider({
  name: 'openai',
  createLLM: (config) => async (input) => { /* call API */ }
});

// Configure hierarchically  
registry.configure('pipeline:asset-pack', { model: 'gpt-4' });
registry.configure('agent:coder', { temperature: 0.2 });

// Get LLM with cascading config
const llm = registry.getLLM(['pipeline:asset-pack', 'agent:coder']);
```

## Provider Pattern

Different providers implement the same interface:
- OpenAI
- Anthropic  
- Google
- Local models
- Mock (for testing)

## Configuration Cascades

```
Global (*) → Pipeline → Phase → Agent → Sequence
```

More specific paths override general ones.

## What This Package IS

- **LLM type definition** - The fundamental primitive
- **Provider interface** - How to implement LLMs
- **Configuration registry** - Hierarchical config management
- **Pure functions** - No execution awareness

## What This Package IS NOT

- **NOT an execution system** - That's ExecutionLLMRegistry
- **NOT provider implementations** - Those live in generic-llms
- **NOT prompt handling** - Just message in/out
- **NOT intelligence** - Just text transformation

## Integration Points

This package provides primitives that:
- **execution-generics** wraps in ExecutionLLMRegistry
- **generic-llms** implements actual providers
- **agent-generics** uses through execution
- **pipelines-generics** configures through hierarchy

## Why This Design

1. **Zero coupling** - LLMs know nothing about the system
2. **Provider agnostic** - Same interface for all
3. **Configuration flexibility** - Change behavior without code
4. **Testability** - Mock LLMs are trivial
5. **Simplicity** - Just async functions

The intelligence emerges from how these simple functions are orchestrated, not from the functions themselves.
