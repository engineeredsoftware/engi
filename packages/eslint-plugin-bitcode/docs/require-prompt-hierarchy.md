# require-prompt-hierarchy

Enforces GA-1 prompt wiring for agents:

- factoryAgentWithPTRR configs must include `prompt` (AgentPrompt) and `stepPrompts` with all four steps (plan, try, refine, retry).
- Forbids manual assignment to `execution.prompt = ...` anywhere; prompts must be passed via factory.

Why: Ensures hierarchical prompts are assembled from Agent → Step → Substep automatically so all LLM calls include complete system context.

Examples of incorrect code:

```
factoryAgentWithPTRR({ name: 'x', outputSchema }) // missing prompt and stepPrompts
```

```
execution.prompt = somePrompt // not allowed
```

Correct code:

```
factoryAgentWithPTRR({
  name: 'x',
  outputSchema,
  prompt: agentPrompt,
  stepPrompts: {
    plan: () => stepPrompts.plan,
    try: () => stepPrompts.try,
    refine: () => stepPrompts.refine,
    retry: () => stepPrompts.retry,
  }
})
```
