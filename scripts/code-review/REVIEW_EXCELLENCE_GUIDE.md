# 🎯 REVIEW EXCELLENCE GUIDE

**CRITICAL**: The quality of review content is infinitely more important than script glue. This guide defines how to create amazing reviews that provide maximum feedback value.

## 1. FOCUS AREAS / SUB-REVIEWS OPTIMIZATION

### Min/Max Coverage Principle
- **Optimize for diversity**: If 5 patterns changed and percolated to 100 files in the same way, create 5 sub-reviews (not 100)
- **Cover all new/changing assumptions**: Each sub-review should address a distinct architectural assumption or pattern change
- **Fast but comprehensive**: Small enough to complete quickly, large enough to implicitly nail all issues or solve big problems

### Sub-Review Focus Strategy
1. **Pattern Changes**: Each major pattern change gets its own sub-review
2. **Assumption Validation**: New architectural assumptions need dedicated validation
3. **Cross-Cutting Concerns**: Issues that affect multiple systems get combined review
4. **Critical Path Analysis**: Focus on changes that affect the most important workflows

## 2. CONTENT QUALITY FOR SUB-REVIEWS

### The "Hard to Parse at a Glance" Problem
**BAD**: Showing massive prompt text walls that are hard to scan
**GOOD**: Extract key functions, types, interfaces, and architectural decisions

### Content Selection Principles
1. **Show the Changed Parts**: Focus on what actually changed, not entire files
2. **Extract Key Elements**: Pull out functions, types, interfaces, classes - the structural elements
3. **Provide Context**: Explain WHY this specific code section matters for the question
4. **Sufficient Coverage**: Must be enough to confidently answer the strategic questions

### Content Presentation Best Practices
```bash
# GOOD: Show specific changed functions/types
show_code "file.ts" 45 67 "New promptPrimitives metadata structure"

# BAD: Show entire massive prompt files
show_code "prompt.ts" 1 500 "Entire prompt file"
```

### Strategic Code Selection
- **Functions/Methods**: Show new function signatures and key implementations
- **Types/Interfaces**: Show new type definitions and their usage
- **Configuration**: Show metadata structures and integration patterns
- **Architecture**: Show how components connect and communicate

## 3. QUESTION QUALITY

### Strategic Question Design
Questions must:
1. **Address architectural decisions**: Not just "does this look good?"
2. **Guide remaining work**: Answers should inform the next 20+ tool evolutions
3. **Validate assumptions**: Test the core assumptions behind the pattern
4. **Cover edge cases**: What happens when this scales to 30+ packages?

### Question Categories
1. **Abstraction Level**: Is this the right level of abstraction for the use case?
2. **Scalability**: Will this approach work for the remaining N implementations?
3. **Integration**: How well does this integrate with existing Engi patterns?
4. **Maintainability**: Is this sustainable for long-term development?
5. **User Experience**: Will agents/developers have the right experience?

## 4. REVIEW STRUCTURE CLARITY

### Visual Hierarchy (CRITICAL FIX NEEDED)
```
SUB-REVIEW A: Clear Title
├── Question Overview (all questions for this sub-review)
├── Code Sections (multiple files/snippets per sub-review)
│   ├── ▶ File Group 1: Specific Purpose
│   ├── ▶ File Group 2: Different Purpose  
│   └── ▶ File Group 3: Related Purpose
└── Question-by-Question Flow
    ├── QUESTION 1 OF 3 - [exact question]
    ├── QUESTION 2 OF 3 - [exact question]
    └── QUESTION 3 OF 3 - [exact question]
```

### Progress Tracking Needs
- Clear sub-review boundaries (A, B, C, D, E)
- Question progress within sub-review (1 of 3, 2 of 3, 3 of 3)
- Overall review progress (Sub-review A of E)
- Visual indicators for completion status

## 5. INPUT HANDLING REQUIREMENTS

### No Length Limits
- **CRITICAL**: Remove any input length restrictions
- Allow full paragraph responses and detailed feedback
- Support multi-line input with proper handling
- Buffer large responses without truncation

### Input UX
- Clear indication of multi-line support
- Visual boundaries for input area
- Confirmation of response capture
- Easy editing/correction support

## 6. CONTENT EXAMPLES

### GOOD: Focused Function/Type Extraction
```typescript
// Show this: Key interface changes
interface ToolMetadata {
  promptPrimitives: string[];
  usageContexts: string[];
  toolChaining: ToolChaining;
}

// With explanation: This metadata enables agent tool selection
```

### BAD: Massive Prompt Walls
```typescript
// Don't show 100 lines of prompt text unless absolutely critical
```

### GOOD: Strategic Code Grouping
```
▶ Metadata Structure Evolution (3 files showing pattern)
▶ Prompt Integration Pattern (2 files showing implementation)  
▶ Tool Chaining Intelligence (1 file showing workflow)
```

## 7. REVIEW SCRIPT CHECKLIST

Before creating any review:
- [ ] Focus areas cover all changing patterns/assumptions
- [ ] Sub-reviews have clear, distinct purposes
- [ ] Code selection shows key structural changes (functions/types/interfaces)
- [ ] Questions are strategic and guide future work
- [ ] Visual hierarchy is clear (sub-review vs file-group vs question)
- [ ] Input handling supports detailed feedback
- [ ] Content is sufficient to answer questions confidently
- [ ] Review can be completed quickly but thoroughly

This guide should be consulted for EVERY review script to ensure maximum feedback value and optimal review experience.