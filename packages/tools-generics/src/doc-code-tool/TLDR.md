# Doc-Code-Tool TLDR

**What**: Pattern for attaching prompts to Tool instances

**Pattern**:
```typescript
/**
 * @doc-code-tool
 * @prompt PROMPT_NAME
 */
class MyTool extends Tool { }
```

**Rule**: ONLY `@prompt` field allowed in comment

**Where**: All descriptive fields go in DocCodeToolPrompt class

**Result**: `tool.__docCodePrompt = PROMPT_NAME` and `tool.__promptParts = PROMPT_NAME` injected at build time

**Usage**: Automatic via webpack - no manual steps
