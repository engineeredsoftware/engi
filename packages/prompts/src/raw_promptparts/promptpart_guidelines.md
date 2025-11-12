# PromptPart Guidelines

## What Should Be a PromptPart

PromptParts are **meaningful semantic units** - the smallest meaningful phrases that can be versioned and optimized.

### ✅ CORRECT PromptParts:

1. **Meaningful phrases**: 
   - "You are" 
   - "Given the following"
   - "Based on this analysis,"

2. **Complete field values (with industrial language)**:
   - Purpose statements: "Execute AST parsing and LSP symbol resolution for code pattern matching"
   - Capability descriptions: "Complete file editing with transactional safety and rollback capability"
   - Parameter explanations: "filePath (string) - absolute path to file, content (string) - new content"

3. **Reusable patterns**:
   - "Execute the following steps:"
   - "Analyze and determine:"

4. **Examples** (actual usage examples with meaningful content)

### ❌ NEVER Make These PromptParts:

1. **Single words**: "and", "the", "with"
2. **Punctuation**: ",", ".", ":"
3. **Metadata values**: 
   - Version numbers: "1.0.0", "2.3.4"
   - Priority levels: "high", "medium", "low"
   - Stability indicators: "stable", "beta", "experimental"
   - Category names: "file-system", "web-search"
4. **Full paragraphs** (can't be granularly optimized)

## Why This Matters

- Each PromptPart can be independently versioned and benchmarked
- Performance tracking of semantic chunks
- A/B testing different phrasings
- Build-time intelligence on meaningful units

## Metadata Handling

Metadata (version, priority, stability, etc.) should be handled directly in Prompt classes:

```typescript
// ✅ CORRECT - metadata as direct values
this.set('metadata:version', '1.0.0' as PromptPart);
this.set('metadata:priority', 'high' as PromptPart);

// ❌ WRONG - metadata as PromptParts
import { PROMPTPART_SPECIFIC_TOOL_MYTOOL_VERSION } from '...';
```

Remember: If it's not a meaningful phrase that could be optimized through benchmarking, it's not a PromptPart!
