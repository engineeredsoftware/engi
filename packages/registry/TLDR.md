# Registry - TLDR

Hierarchical storage that makes configuration dynamic in Bitcode.

## What It Does

Registry enables:
- **Dynamic configuration** that changes based on context
- **Capability filtering** so agents only access appropriate tools
- **Progressive enhancement** where prompts build from general to specific
- **Priority-based overrides** with clear, predictable rules

## The Problem It Solves

Traditional inheritance creates rigid hierarchies:
```typescript
class BaseAgent { }
class SearchAgent extends BaseAgent { }
class WebSearchAgent extends SearchAgent { }
// Locked in stone at compile time
```

Registry enables flexible configuration:
```typescript
registry.set('base', baseConfig);
registry.set('search', searchConfig);  
registry.set('web', webConfig);
// Build dynamically at runtime
```

## How Bitcode Uses Registry

### 1. Prompts That Build Themselves
```typescript
// Prompts ARE registries of PromptParts
class Prompt extends RegistryImpl<PromptPart> { }

// Pipeline sets foundation
pipeline.prompt.set('identity', 'You are an AI assistant');

// Phase adds context
phase.prompt.set('task', 'implementing new features');

// Agent adds specialization
agent.prompt.set('expertise', 'specialized in React and TypeScript');

// Result: Complete prompt with all context
const systemPrompt = agent.prompt.format();
// "You are an AI assistant implementing new features specialized in React and TypeScript"
```

### 2. Tools That Know Their Place
```typescript
// Phase registers all available tools
phase.tools.set('code-search', codeSearchTool);
phase.tools.set('file-edit', fileEditTool);
phase.tools.set('terminal', terminalTool);
phase.tools.set('git', gitTool);

// Agent only gets subset it should use
agent.tools.set('code-search', codeSearchTool);
agent.tools.set('file-edit', fileEditTool);
// No terminal or git access for safety

// Agent cannot access unregistered tools
agent.tools.getTool('terminal', agent); // undefined
```

### 3. LLM Configs That Cascade
```typescript
// Global defaults
llms.set('default', { 
  model: 'claude-3-sonnet',
  temperature: 0.7 
});

// Code generation needs precision
codeAgent.llms.set('default', { 
  temperature: 0.2,  // Override for precise output
  stopSequences: ['```']  // Add code-specific config
});

// Each context gets appropriate config
const llm = agent.llms.getDefaultLLM(agent);
```

## The Key Concepts

### Paths Create Hierarchy
```
'pipeline:asset-pack:phase:implementation:agent:coder'
```
Each colon (`:`) adds a level, creating natural namespaces.

### Priorities Determine Winners
```typescript
registry.set('config', { temp: 0.7 }, 0);    // Base priority
registry.set('config', { temp: 0.2 }, 20);   // Wins with higher priority
```

### Cascading Combines Values
```typescript
const final = registry.get([
  'global',      // Start with defaults
  'pipeline',    // Apply pipeline overrides
  'agent'        // Apply agent specialization
]);
// Values merge with later paths overriding earlier
```

## Real Power: Dynamic Behavior

### Context-Aware Capabilities
Same agent, different contexts, different tools:
```typescript
// In exploration phase
explorationPhase.tools.set('web-search', webSearchTool);
explorationPhase.tools.set('docs-reader', docsReaderTool);

// In implementation phase  
implementationPhase.tools.set('file-edit', fileEditTool);
implementationPhase.tools.set('terminal', terminalTool);

// Agent automatically gets phase-appropriate tools
```

### Runtime Composition
Build configurations from multiple sources:
```typescript
const config = registry.get([
  'base',              // Foundation
  `env:${process.env.NODE_ENV}`,  // Environment-specific
  `user:${userId}`,    // User preferences
  `feature:${flag}`    // Feature flags
]);
```

## Why Not Just Use Objects?

1. **Priority resolution** - Registry handles conflicts predictably
2. **Hierarchical lookup** - Natural parent-child relationships
3. **Metadata tracking** - Know where each value came from
4. **Type safety** - Generic constraints prevent errors
5. **Method chaining** - Clean, fluent API

## Common Patterns

1. **Simple storage**: `registry.set('key', value)`
2. **Priority override**: `registry.set('key', value, 100)`
3. **Path building**: `RegistryPathBuilder.from('a', 'b').add('c')`
4. **Cascading get**: `registry.get(['default', 'override'])`
5. **Pattern matching**: `prompt.requirePattern('system:*')`

## When to Use

**Use Registry when you need:**
- Configuration that varies by context
- Capabilities that filter based on hierarchy
- Values that build progressively
- Clear override precedence

**Regular objects work fine for:**
- Simple key-value storage
- Data without hierarchy
- Static configuration

## The Mental Model

Think of Registry as a **priority queue of namespaced values**:
- **Path** = the namespace (`agent:coder`)
- **Value** = what you're storing
- **Priority** = who wins conflicts
- **Cascade** = how values combine

This simple pattern powers all of Bitcode's dynamic configuration.
