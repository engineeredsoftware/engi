# Execution Generics - TLDR

**State = Execution. Sequence = Executors.**

Two primitives that enable agentic AI through hierarchical state management and function composition. Execution provides parent-child state containers with three powerful registries (prompts, tools, llms), enabling local and global scoped state where any substep can pull from the entire pipeline's accumulated knowledge.

## State (Execution)

A hierarchical container with parent-child relationships that:
- Stores discoveries: `execution.store('namespace', 'key', value)`
- Retrieves state: `execution.get('namespace', 'key')`
- Creates isolated child containers: `execution.child('operation-name')`
- Searches up parent hierarchy: `execution.findUp('namespace', 'key')`
- Holds three critical registries:
  - **prompts**: Hierarchical prompt accumulation
  - **tools**: Capability filtering by context
  - **llms**: Configuration cascading through hierarchy

## Sequence (Executors)

Async functions with this signature:
```typescript
type Executor<TInput, TOutput> = (input: TInput, execution: Execution) => Promise<TOutput>;
```

Combinators sequence executors:
- `sequential(e1, e2, e3)` - Run in order
- `parallel(e1, e2, e3)` - Run at same time
- `conditional(test, ifTrue, ifFalse)` - Branch
- `retry(executor, { times: 3 })` - Retry on failure

## Why This Matters

1. **State persists across operations** - Agent B can access Agent A's discoveries
2. **Sequences are just functions** - No framework, no magic, just function composition  
3. **Everything is an executor** - Agents, tools, phases, pipelines
4. **State isolation via children** - Each operation gets its own state bubble

## How Agentic Behavior Emerges

Parent-child execution relationships enable powerful patterns like PrepareConciseContext substeps that can automatically gather context from the entire pipeline hierarchy.

### The PTRR Pattern (How Agents Think)
```typescript
const agent = sequential(
  plan,    // Understand the task
  try,     // Execute with tools
  refine,  // Improve results
  retry    // Handle failures
);
```

### The SDIVF Pattern (How Pipelines Run Phases)
```typescript
const pipeline = sequential(
  setup,
  repeat(
    sequential(discovery, implementation, validation),
    { until: valid }
  ),
  finish
);
```

### Multiple Agents Working Together
```typescript
const phase = parallel(
  webSearchAgent,     // Search for solutions
  codeAnalysisAgent,  // Analyze codebase
  docsAgent          // Read documentation
);
// All agents work simultaneously, results aggregated
```

## The Execution Tree

Every AI operation creates a tree of state:

```
pipeline
├── discovery-phase
│   ├── web-search-agent
│   │   ├── plan (stores search strategy)
│   │   ├── try (stores search results)
│   │   └── refine (stores synthesized findings)
│   └── code-analysis-agent
│       ├── plan (stores analysis approach)
│       └── try (stores code patterns found)
└── implementation-phase
    └── code-generator-agent
        └── can access all discoveries above
```

## Why This Matters

1. **Agents build on each other's work** - Later agents access earlier discoveries through the execution tree

2. **Failures don't break everything** - Each operation is isolated, errors contained

3. **You can trace every decision** - Complete history of what each agent did and why

4. **Configuration cascades naturally** - Pipeline sets defaults, phases override, agents specialize

## The Power of Hierarchical Registries

### Prompts Build Progressively
```
Pipeline: "You are an AI assistant"
  + Phase: "working on implementation"
    + Agent: "specialized in TypeScript"
      = Full prompt with all context
```

### Tools Filter by Context
```
Phase has: [code-search, file-edit, terminal, git]
Agent sees: [code-search, file-edit]  // Only what it needs
```

### LLMs Configure Appropriately
```
Pipeline: claude-3-sonnet, temp=0.7
Code Agent: claude-3-opus, temp=0.2  // More powerful, more precise
```

## Common Patterns You'll Use

1. **Run agents in sequence**: `sequential(agent1, agent2, agent3)`
2. **Run agents in parallel**: `parallel(searchAgent, analyzeAgent)`
3. **Conditional execution**: `conditional(needsTools, useTools, skipTools)`
4. **Retry on failure**: `retry(riskyOperation, { times: 3 })`
5. **Store discoveries**: `execution.store('findings', 'key-insight', data)`
6. **Find context**: `execution.findUp('requirements', 'user-task')`

## When to Use

**Use execution-generics when building:**
- AI agents that read to remember and build on discoveries
- Multi-step operations that coordinate multiple agents
- Systems that read hierarchical configuration
- Fault-tolerant AI that gracefully handles failures

**You probably don't read it for:**
- Simple one-shot LLM calls
- Stateless transformations
- Non-AI sequential operations

## The Pattern in Action

```typescript
// State container
const pipeline = new Execution('my-pipeline');
pipeline.store('task', 'description', 'Add dark mode');

// Sequence of operations
const runPipeline = sequential(
  discoveryPhase,      // Searches for patterns
  implementationPhase, // Generates code
  validationPhase      // Tests the code
);

// Execute the sequence with state
const result = await runPipeline(input, pipeline);

// Later operations found earlier discoveries
const discoveries = pipeline.get('discoveries', 'patterns');
```

State + Sequence = How AI agents work in Bitcode.
