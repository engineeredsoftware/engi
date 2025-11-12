# Tools Generics - TLDR

**Tools are type-safe wrappers around functions.**

```typescript
abstract class Tool<T extends ToolFunction> {
  abstract use: T;
}
```

## What Tools Are

- **Functions with documentation** - @doc-code-tool comments ARE prompts
- **Type-safe execution** - Full TypeScript generics
- **MCP compatible** - Wrap external tools seamlessly
- **Zero overhead** - Just functions at runtime

## Creating a Tool

```typescript
// 1. Define the function
async function searchCode(query: string, options?: { limit?: number }) {
  // Implementation
  return results;
}

// 2. Create Tool class
/**
 * @doc-code-tool
 * @purpose Search codebase using AST and regex patterns
 * @capabilities Pattern matching, file filtering, context extraction
 */
export class SearchCodeTool extends Tool<typeof searchCode> {
  use = searchCode;
}

// 3. Export instance
export const searchCodeTool = new SearchCodeTool();
```

## Doc-Code Pattern

The @doc-code-tool comment becomes the prompt:
- **@purpose** - What the tool does
- **@capabilities** - Specific features
- **@parameters** - Input description
- **@output** - Result description

This metadata is extracted at build time for LLM understanding.

## MCP Integration

Wrap Model Context Protocol tools:
```typescript
const mcpTool = wrapMCPTool({
  name: 'github-create-pr',
  description: 'Create pull request',
  inputSchema: z.object({ /* schema */ }),
  handler: async (params) => { /* implementation */ }
});
```

## Tool Flow in Agents

1. **Usable** - Tools available from registry
2. **Use** - Selected by Reason substep  
3. **Used** - Executed with results

## Key Principles

1. **Tools are functions** - Nothing more, nothing less
2. **Documentation IS the interface** - LLMs read @doc-code-tool
3. **Type safety throughout** - Catch errors at compile time
4. **Stateless execution** - Tools don't hold state
5. **Error returns** - Don't throw, return structured errors

## Why This Design

- **Simplicity** - Tools are just typed functions
- **Discovery** - Build-time extraction enables tool search
- **Composition** - Tools combine naturally as functions
- **Testing** - Mock any tool by replacing the function
- **Evolution** - Add capabilities without breaking changes

Tools bridge AI reasoning with concrete capabilities through type-safe, documented functions.