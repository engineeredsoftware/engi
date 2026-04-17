# PROMPT ENGINEERING - The Complete Engi Prompt System

**The Single Source of Truth**

## Executive Summary

The Engi prompt system is a two-layer architecture built on PromptParts and hierarchical Prompts. At its core:
- **PromptParts are granular semantic units** - meaningful phrases that can be versioned and benchmarked
- **Prompts are Registry-based formatted structures** - pseudo-strongly typed prompt strings with requirements and hierarchy

This document represents the complete prompt engineering system for Engi.

## Core Architecture - Two Layers Only

```
┌─────────────────────────────────────────────────────────┐
│                  PromptPart Layer                        │
│     Granular semantic units: meaningful phrases          │
│    Reality: 10,000+ parts at scale (not a target)       │
│              Type: string & { __brand: 'PromptPart' }    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Prompt Layer                          │
│      Pseudo-strongly typed prompt string structures      │
│      Registry-based with required parts & hierarchy      │
│         Format method produces final strings             │
└─────────────────────────────────────────────────────────┘
```

**Key Understanding**: Prompts ARE implementations. A `SpecificAgentPrompt` might extend a `GenericAgentPrompt` to leverage repeatable consistency through Registry inheritance - but there are only TWO fundamental layers.

## Core Primitives

### PromptPart - The Fundamental Unit

PromptParts are branded strings representing semantic units - the smallest meaningful phrases that can be versioned and optimized:

```typescript
// Type definition - zero runtime overhead
export type PromptPart = string & { readonly __brand: 'PromptPart' };

// Factory function
export function createPromptPart(value: string): PromptPart {
  return value as PromptPart;
}
```

### Prompt - Registry-Based Structures

Prompts are pseudo-strongly typed prompt strings built using the Registry pattern:

```typescript
// Prompt extends Registry for hierarchical organization
class Prompt extends RegistryImpl<PromptPart> {
  set(path: string, part: PromptPart): void;
  format(formatter?: PromptFormatter): string;
  require(path: string): this;
  requirePattern(pattern: string): this;
  requireHierarchy(): this;
}
```

## Granularity Rules - The Foundation

### What Makes a Good PromptPart?

**✅ CORRECT Granularity - Semantic Units**:
```typescript
// Meaningful phrases that can be optimized
'You are' // Standard AI greeting
'Given the following' // Common instruction prefix
'Based on this analysis,' // Transition phrase
'Execute the following steps:' // List introduction

// Complete field values
'Search codebase using semantic pattern matching' // Tool purpose
'Analyze and validate input parameters' // Agent mission
'Follow PTRR methodology: Plan, Try, Refine, Retry' // Methodology statement

// Reusable patterns
'Important: ' // Warning prefix
'Note: ' // Information prefix
```

**❌ WRONG Granularity - Not Semantic Units**:
```typescript
// Too small - single words have no optimization value
'and', 'the', 'with', 'of', 'in'

// Too small - punctuation can't be versioned
',', '.', ':', ';', '!'

// Too large - full paragraphs can't be granularly optimized
'This comprehensive tool performs advanced analysis of your codebase using pattern matching, AST parsing, and semantic understanding to identify issues and suggest improvements based on industry best practices and your specific coding standards'
```

**Why Semantic Units?**
- Each unit can be independently versioned through PBV
- Benchmarking provides meaningful metrics at this granularity
- A/B testing different phrasings makes sense
- Maintains readability while enabling optimization
- Natural boundaries for translation/localization

## Directory Structure - Absolute Rules

```
/packages/prompts/
├── src/
│   ├── parts/              # PromptPart type definition
│   ├── prompt.ts           # Prompt class (Registry-based)
│   ├── formatters/         # Formatters (hierarchical, default)
│   ├── benchmarking/       # Benchmark runner infrastructure
│   ├── developing/         # Doc-comment plugins
│   ├── dryrunning/         # Dry run system
│   └── raw/                # ALL PromptParts live here
│       ├── generic/        # Universal semantic units (FLAT - NO SUBDIRS)
│       └── specific/       # Domain semantic units (FLAT - NO SUBDIRS)
```

**Critical Rules**:
1. `/raw_promptparts/generic/` and `/raw_promptparts/specific/` are COMPLETELY FLAT - no subdirectories ever
2. ALL PromptParts MUST live in `/raw_promptparts/` - no exceptions
3. One PromptPart per file, always
4. NO formatters, NO Prompts in `/raw_promptparts/` - only PromptParts
5. Import PromptParts directly - no re-exports or barrel files

## Overlaying AI Documents Into Prompts (SDIVS + Iterations)

`.ai/` documents (AGENTS.md / PRODUCT.md / MCPS.md) provide the knowledge overlay for every prompt. Instead of hardcoding that knowledge into every prompt, use the agent-level overlay util:

- Pipelines populate the `ai_documents/list` store with AI Document deltas — each item contains `title` + `content`.
- The overlay util reads this store and injects two preprocess parts available to all LLM calls:
  - `ai_documents:list` – numbered titles (acts as the “what changed” index)
  - `ai_documents:details` – truncated content blocks used as contextual hints

This keeps step prompts minimal and lets SDIVS pipelines refresh AI Document context at the start of each DIV iteration without modifying core prompt scaffolding.

Implementation reference:
- Overlay util: `packages/agent-generics/src/execution/prompt-overlays.ts`
- Deliverables iteration hook: `factorySDIVSExecutorPipeline` optional `iterationPreprocess`

## Naming Convention - FINAL PRECISE PATTERN

### Critical Understanding: PromptParts Are PARTS of Prompts

Every PromptPart is a component that will be assembled into a larger Prompt class. The naming pattern MUST reflect:
1. Which Prompt class it belongs to
2. What semantic content it contains
3. WHERE in the prompt structure it appears

### File Naming Pattern - NO DEVIATIONS ALLOWED

All files follow this EXACT pattern:
```
promptpart_[generic|specific]_[domain]_[PROMPTCLASSNAME]_[semanticcontext]_[POSITION].ts
```

**MANDATORY COMPONENTS** (in exact order):

1. **`promptpart`** - Literal prefix (always lowercase)
   - Standard PromptPart containing text
   - For templated parts: `templatedpromptpart` (rare, requires approval)

2. **`[generic|specific]`** - Reusability scope
   - `generic`: Used across MANY prompts and/or other PromptParts
   - `specific`: Tied to one specific Prompt class
   - Note: PromptParts can use generic PromptParts when needed

3. **`[domain]`** - Semantic domain (ONLY these values allowed):
   - `tool` - Tool-related prompts (Tools MUST have DocCodeToolPrompt)
   - `agent` - Agent-related prompts (NO @doc-code-agent - LEGACY)
   - `pipeline` - Pipeline-related prompts
   - `phase` - Phase-related prompts
   - `formatting` - Formatting/structure prompts
   - `validation` - Validation-related prompts
   - `system` - System-level prompts

**CRITICAL DISTINCTION**:
- **TOOLS**: MUST have `DocCodeToolPrompt` class with @doc-code-tool
- **AGENTS**: Use `Prompt` class with PromptParts - NO DocCode (legacy)

4. **`[PROMPTCLASSNAME]`** - Prompt class name WITHOUT "Prompt" suffix (lowercase)
   - Drop "Prompt" from class name: `EngiSystemPrompt` → `engisystem`
   - Examples: `engisystem`, `codesearchagent`, `webtool`
   - For generic parts: use primary semantic descriptor

5. **`[semanticcontext]`** - What the content is about
   - NO underscores within this component (use concatenation)
   - Examples: `inherentknowledgeidentity`, `constructinvestigation`, `errorhandling`

6. **`[POSITION]`** - WHERE in the prompt this appears
   - Semantic positions with clear meaning:
     - `opener` - Opening statement/greeting
     - `closer` - Closing statement/sign-off
     - `header` - Section header text
     - `footer` - Section footer text
     - `corestatement` - Main statement/claim
     - `detailcontent` - Detailed explanation content
     - `list` - Complete list
     - `listitem` - Individual list item
     - `instruction` - Instruction text
     - `example` - Example content

**CORRECT Examples**:
```
promptpart_specific_system_engisystem_inherentknowledgeidentity_opener.ts
promptpart_specific_agent_codesearchagent_capabilities_list.ts
promptpart_specific_tool_webtool_purpose_corestatement.ts
promptpart_generic_formatting_section_header.ts
promptpart_specific_agent_codesearchagent_methodology_detailcontent.ts
```

**WRONG Examples** (with explanations):
```
❌ promptpart_generic_formatting_youare.ts
   Missing: PROMPTCLASSNAME and POSITION

❌ promptpart_specific_tool_webresearch_purpose.ts  
   Missing: Full PROMPTCLASSNAME and POSITION

❌ promptpart_generic_formatting_prompt_section_header.ts
   Wrong: Contains word "prompt" in semantic context

❌ promptpart_specific_agent_agentfactory_action_purpose_statement.ts
   Wrong: Underscores in semanticcontext, should be one of the standard positions
   Should be: promptpart_specific_agent_agentfactory_actionpurpose_corestatement.ts
```

### Constant Naming Pattern

The exported constant MUST match the file name exactly in SCREAMING_SNAKE_CASE:

```typescript
// File: promptpart_specific_system_engisystem_inherentknowledgeidentity_opener.ts
export const PROMPTPART_SPECIFIC_SYSTEM_ENGISYSTEM_INHERENTKNOWLEDGEIDENTITY_OPENER: PromptPart = 
  'You are Engi, an advanced AI engineering system' as PromptPart;
```

### Why This Pattern Is Sacred

1. **Grepability**: Can find all parts for a specific Prompt class instantly
2. **Structure Clarity**: The POSITION tells you exactly where this part goes
3. **No Ambiguity**: Every component has one meaning
4. **Self-Documenting**: The filename tells the complete story
5. **Enforces Structure**: Can't create orphaned PromptParts

### Migration Requirement

ALL existing PromptParts that violate this pattern MUST be renamed immediately. No legacy patterns are acceptable.

## Performance-Based Versioning (PBV)

### Version Format

All versions follow the PBV pattern:
```
GA<generation>.<quality_score>.<variant>
```

- **Generation**: Major approach change (GA1, GA2, GA3...)
- **Quality Score**: Benchmark score 0-100  
- **Variant**: Different phrasings at same generation/quality

**Examples**:
- `GA1.00.0`: Generation 1, unbenchmarked, original
- `GA1.85.0`: Generation 1, quality variant, original phrasing
- `GA1.85.1`: Generation 1, quality variant, alternative phrasing
- `GA1.92.0`: Generation 1, quality variant (evolved from GA1.85.0)
- `GA2.78.0`: Generation 2, quality variant, new approach

**Format**: All versions follow the GA<generation>.<quality_index>.<variant> pattern.

### Why Not SemVer?

- Version numbers directly reflect measured performance
- Quality improvements are immediately visible in version
- Enables data-driven dependency management
- Supports performance-based evolution decisions
- No ambiguity about "breaking changes" - only quality matters

### Version History Best Practices

- **Full version preservation**: Store complete old content for accurate reproduction
- **Clear reasoning**: Document why versions changed with specific technical reasons
- **Quality tracking**: Each version's benchmarks preserved for comparison

## Integrated Benchmarking System

### Standard Benchmarks

Every PromptPart is automatically benchmarked on:

1. **Intent Match** (0-1): How well it achieves its stated purpose
2. **Semantic Clarity** (0-1): How clearly LLMs understand it
3. **Token Efficiency** (0-1): Efficiency of token usage  
4. **Model Stability** (0-1): Consistency across different models

Full Prompts get additional benchmarks:

5. **Task Success** (0-1): Likelihood of achieving the task
6. **Response Quality** (0-1): Expected quality of AI responses

### Custom Benchmarks

Domain-specific benchmarks can be added:

```typescript
benchmarks: [
  {
    "name": "technical_accuracy",
    "type": "custom",
    "description": "Validates technical terminology",
    "test": "Rate the technical accuracy of '{{content}}' for a developer audience (0-1)"
  }
]
```

### Quality Thresholds

Evolution triggers when:
- Overall score falls below threshold
- Intent match falls below threshold
- Semantic clarity falls below threshold
- Model stability falls below threshold

### Benchmark Commands

```bash
# Benchmark single file
npm run benchmark src/raw_promptparts/generic/promptpart_generic_formatting_youare.ts

# Benchmark all prompts
npm run benchmark:all

# Benchmark and evolve if quality is low
npm run benchmark:evolve src/raw_promptparts/specific/promptpart_specific_tool_search.ts

# Generate benchmark report
npm run benchmark:report
```

## Doc-Comment Requirements

### PromptPart Documentation

Every PromptPart MUST have this minimal doc-comment structure:

```typescript
/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Standard AI greeting prefix"
 * current_version: "GA1.00.0"  // Always start at GA1.00.0 for unbenchmarked
 * versions: []                   // Empty for new PromptParts
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement this?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_GENERIC_FORMATTING_YOUARE: PromptPart = 'You are' as PromptPart;
```

**Required Fields**:
- `domain`: One of: tool, agent, pipeline, phase, formatting, validation, system
- `intent`: Clear description of what this semantic unit achieves
- `current_version`: PBV version (generation.quality_score.variant)
  - Start at "GA1.00.0" for new, unbenchmarked PromptParts
  - Quality score updates after benchmarking (e.g., "GA1.85.0" = 85% quality)
  - NEVER use legacy formats like "2.0.0" - only PBV format GA1.XX.0 is acceptable
- `versions`: Version history (empty array for first version)

**Optional Fields**:
- `benchmarks`: Array of test definitions (see below)
- `category`: Sub-classification within domain
- `priority`: Importance level (low, medium, high, critical)

### Optional Benchmark Test Definitions

For PromptParts that need specific quality tests, add a `benchmarks` array:

```typescript
/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Define web search capabilities"
 * current_version: "1.0.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Does '{{content}}' comprehensively list search capabilities? Rate 0-1" },
 *   { "name": "technical_clarity", "test": "Is '{{content}}' technically accurate? Rate 0-1" }
 * ]
 */
```

**Important**: 
- `benchmarks` field defines TEST QUESTIONS, not results
- Tests are run by the benchmarking system to generate scores
- Only add benchmarks for PromptParts that need specific quality validation
- Most simple PromptParts don't need custom benchmarks

### Version History with Benchmark Results

When a PromptPart evolves, the `versions` array tracks history with benchmark scores:

```typescript
/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Standard AI greeting prefix"
 * current_version: "1.95.0"
 * versions: [
 *   {
 *     "version": "1.85.0",
 *     "content": "You are",
 *     "timestamp": "2024-01-15T10:00:00Z",
 *     "benchmarks": {
 *       "intent_match": { "score": 0.85, "timestamp": "2024-01-15T10:30:00Z" },
 *       "semantic_clarity": { "score": 0.98, "timestamp": "2024-01-15T10:30:00Z" },
 *       "token_efficiency": { "score": 1.0, "timestamp": "2024-01-15T10:30:00Z" },
 *       "model_stability": { "score": 0.96, "timestamp": "2024-01-15T10:30:00Z" }
 *     },
 *     "evolved_to": "1.95.0",
 *     "reason": "Improved intent match score"
 *   }
 * ]
 */
```

**Key Distinction**:
- `benchmarks` field = TEST DEFINITIONS (optional)
- `versions[].benchmarks` = TEST RESULTS from past runs

### Industrial Language Requirements

Every PromptPart MUST use industrial language - concrete, technical, implementable:

**❌ NON-INDUSTRIAL (Never Use)**:
- "transcendent", "consciousness", "quantum", "omniscient"
- "multiversal", "dimensional", "reality-bending", "infinite" 
- "manifest", "elevated", "paradigm-transcending"
- Abstract concepts without concrete implementation

**✅ INDUSTRIAL (Always Use)**:
- Specific algorithms: "TF-IDF", "BM25", "cosine similarity"
- Concrete operations: "Execute", "Parse", "Analyze", "Generate"
- Technical specifications: "HTTP/2", "WebSocket", "gRPC"
- Explicit SLOs (latency, uptime, accuracy) stated concretely per context

### Prompt Documentation

Full Prompts use this structure:

```typescript
/**
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Format code analysis agent prompt"
 * current_version: "1.88.0"
 * versions: []
 * dependencies: {
 *   "PROMPTPART_GENERIC_FORMATTING_YOUARE": "1.95.0",
 *   "PROMPTPART_SPECIFIC_AGENT_CODEANALYZER_MISSION": "1.82.0"
 * }
 */
export class CodeAnalysisAgentPrompt extends Prompt {
  // Implementation
}
```

## Usage Patterns

### Creating PromptParts

```typescript
// File: promptpart_generic_formatting_basedonanalysis.ts

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Transition phrase after analysis section"
 * current_version: "1.0.0"
 * versions: []
 */
export const PROMPTPART_GENERIC_FORMATTING_BASEDONANALYSIS: PromptPart = 
  'Based on this analysis,' as PromptPart;
```

### Building Prompts

```typescript
import { Prompt, createPrompt } from '@bitcode/prompts';
import { hierarchicalFormatter } from '@bitcode/prompts/formatters';

// Import specific PromptParts directly
import { PROMPTPART_GENERIC_FORMATTING_YOUARE } 
  from '@bitcode/prompts';
import { PROMPTPART_SPECIFIC_TOOL_CODESEARCH_PURPOSE } 
  from '@bitcode/prompts';

export function buildCodeSearchToolPrompt(): Prompt {
  const prompt = createPrompt();
  
  // Set hierarchical parts
  prompt.set('tool:identity:prefix', PROMPTPART_GENERIC_FORMATTING_YOUARE);
  prompt.set('tool:identity:role', 'an expert code search tool' as PromptPart);
  prompt.set('tool:purpose', PROMPTPART_SPECIFIC_TOOL_CODESEARCH_PURPOSE);
  
  // Add requirements
  prompt.require('tool:identity');
  prompt.require('tool:purpose');
  
  return prompt;
}

// Format the prompt
const formatted = prompt.format(hierarchicalFormatter);
```

### Never Use String Interpolation

```typescript
// ❌ WRONG - Never inject runtime values into prompts
const bad = `Hello ${userName}, today is ${date}`;

// ✅ CORRECT - Use proper hierarchical keys with semantic units
const prompt = new Prompt();
prompt.set('greeting:prefix', PROMPTPART_GENERIC_GREETING_HELLO);
prompt.set('greeting:name', createPromptPart(userName)); 
prompt.set('date:prefix', PROMPTPART_GENERIC_TODAYIS);
prompt.set('date:value', createPromptPart(date));
```

### Pattern: List Templates

```typescript
const prompt = createPrompt();

// List header
prompt.set('instructions:header', 
  'Execute the following steps:' as PromptPart);

// List items (can be dynamic)
steps.forEach((step, i) => {
  prompt.set(`instructions:step:${i}`, 
    createPromptPart(`${i + 1}. ${step}`));
});
```

### Pattern: Conditional Formatting

```typescript
export function buildAgentPrompt(context: AgentContext): Prompt {
  const prompt = createPrompt();
  
  // Always include core identity
  prompt.set('agent:identity', PROMPTPART_AGENT_IDENTITY);
  
  // Conditional based on context
  if (context.complexity === 'high') {
    prompt.set('agent:guidance', 
      'Apply advanced analysis techniques' as PromptPart);
  }
  
  if (context.hasTools) {
    prompt.set('agent:tools:header', 
      'You have access to these tools:' as PromptPart);
    // Add tool descriptions...
  }
  
  return prompt;
}
```

## Dry Run System

The dry run system enables mocking LLM responses for testing:

### Doc-Comment Structure

```typescript
/**
 * TOOL DISCOVERY PROMPT
 * 
 * @doc-comment-promptdryrun
 * scenario: "basic_tool_discovery"
 * response: {
 *   "thought": "I need to discover available tools",
 *   "tools_found": ["text-editor", "file-search", "terminal"],
 *   "confidence": 0.95
 * }
 * 
 * @doc-comment-promptdryrun
 * scenario: "complex_tool_discovery"
 * context: { "environment": "production" }
 * response: {
 *   "thought": "Multiple tool categories detected",
 *   "tools_found": {
 *     "editing": ["text-editor", "code-formatter"],
 *     "search": ["file-search", "grep"],
 *     "execution": ["terminal", "compiler"]
 *   },
 *   "confidence": 0.88
 * }
 * metadata: {
 *   "tokens": 1250,
 *   "latency": 2500,
 *   "model": "gpt-4"
 * }
 */
```

### Using Dry Run Mode

```typescript
import { DryRunManager } from '@bitcode/prompts/dry-run';

// Enable dry run mode
const dryRun = new DryRunManager();
dryRun.enable();

// LLM calls will now use mocked responses
const response = await llm.generate(prompt); // Returns dry run response

// Disable for production
dryRun.disable();
```

## Critical Rules and Best Practices

### DO - Always

1. ✅ Create semantic units that can be meaningfully versioned
2. ✅ Use exact naming conventions - no variations
3. ✅ Document with complete doc-comments including intent
4. ✅ Import PromptParts directly from their file paths
5. ✅ Use Prompt Registry for all formatting
6. ✅ Set requirements on Prompts before formatting
7. ✅ Benchmark every PromptPart and Prompt
8. ✅ Version using PBV pattern

### DON'T - Never

1. ❌ Create single-word or punctuation PromptParts
2. ❌ Use string concatenation or template literals
3. ❌ Create subdirectories in `/raw_promptparts/generic/` or `/raw_promptparts/specific/`
4. ❌ Re-export PromptParts or create barrel files
5. ❌ Skip doc-comment documentation
6. ❌ Hard-code full prompts as strings
7. ❌ Mix formatting logic with PromptPart definitions
8. ❌ Describe prompts as “assembled/combined”; prompts are formatted from PromptParts

### Critical: No String Formatting

```typescript
// ❌ NEVER DO THIS - violates the entire architecture
function formatPromptPart(parts: PromptPart[]): PromptPart {
  return parts.join(' ') as PromptPart; // WRONG!
}

// ✅ ALWAYS DO THIS - use Prompt Registry
const prompt = new Prompt();
parts.forEach((part, i) => prompt.set(`part:${i}`, part));
const formatted = prompt.format();
```

## Migration from Legacy Patterns

### From String Concatenation

```typescript
// ❌ OLD: String concatenation
const prompt = identity + '\n\n' + mission + '\n\n' + instructions;

// ✅ NEW: Registry-based
const prompt = createPrompt();
prompt.set('system:identity', identity);
prompt.set('system:mission', mission);
prompt.set('system:instructions', instructions);
const formatted = prompt.format();
```

### From Template Strings

```typescript
// ❌ OLD: Template strings
const prompt = `You are ${role}. Your mission is ${mission}.`;

// ✅ NEW: Semantic units
prompt.set('identity:prefix', PROMPTPART_GENERIC_FORMATTING_YOUARE);
prompt.set('identity:role', createPromptPart(role));
prompt.set('mission:prefix', 'Your mission is' as PromptPart);
prompt.set('mission:value', createPromptPart(mission));
```

## Custom Formatters

Create specialized formatters for different contexts:

```typescript
// Hierarchical formatter (built-in) - recommended default
const hierarchicalFormatter: PromptFormatter = (prompt) => {
  // Groups by path depth with markdown headers
  // # System
  // ## System > Identity
  // Content...
};

// XML formatter
const xmlFormatter: PromptFormatter = (prompt) => {
  const xml: string[] = ['<prompts>'];
  
  prompt.getPaths().forEach(path => {
    const part = prompt.get(path);
    if (part) {
      xml.push(`  <prompt path="${path}">${part}</prompt>`);
    }
  });
  
  xml.push('</prompts>');
  return xml.join('\n');
};

// JSON formatter
const jsonFormatter: PromptFormatter = (prompt) => {
  const obj: Record<string, string> = {};
  
  prompt.getPaths().forEach(path => {
    const part = prompt.get(path);
    if (part) obj[path] = part;
  });
  
  return JSON.stringify(obj, null, 2);
};
```

## Performance-Based Evolution

The system supports performance-based prompt evolution:

### Evolution Process

1. **Continuous Benchmarking**: Every PromptPart measured regularly
2. **Threshold Monitoring**: Quality scores tracked against minimums
3. **Variant Generation**: AI creates alternative phrasings
4. **Competitive Benchmarking**: Variants tested against current
5. **Automatic Promotion**: Best performer becomes new version
6. **History Preservation**: All versions kept with benchmarks

### Evolution Example

```typescript
// Current: v1.85.0
"You are" // Intent match: 0.85

// System generates variants:
"You are an" // Intent match: 0.92 ✅ Promoted to v1.92.0
"You're" // Intent match: 0.78 ❌ Rejected
"You represent" // Intent match: 0.82 ❌ Rejected
```

## Troubleshooting

### Common Issues and Solutions

**Issue**: "PromptPart too granular (single word)"  
**Solution**: Combine into meaningful semantic unit

**Issue**: "Can't find PromptPart import"  
**Solution**: Check naming convention matches file exactly

**Issue**: "Prompt formatting looks wrong"  
**Solution**: Use hierarchicalFormatter for structured output

**Issue**: "Benchmarks failing"  
**Solution**: Check intent description matches actual content

**Issue**: "Version not incrementing"  
**Solution**: Ensure benchmarks show meaningful improvement

## System Capabilities

### Infrastructure
- ✅ Core infrastructure complete
- ✅ PBV system operational 
- ✅ Benchmarking infrastructure ready
- ✅ Dry run system implemented
- ✅ Doc-comment plugins working
- ✅ Registry pattern proven

### Production Indicators
- Large PromptPart library: Natural scale for a complete AI system
- High quality scores across parts
- Full benchmarking coverage
- Fast runtime formatting
- Low regression rate

## Philosophy

This system represents prompt engineering through elegant simplicity:

- **PromptParts are semantic units**: Meaningful phrases that can be versioned
- **Prompts format hierarchically**: Registry pattern enables structure  
- **Performance drives evolution**: PBV makes quality visible
- **Simplicity enables scale**: Two layers support 10,000s of parts
- **Industrial language enables reliability**: Concrete specifications over abstract concepts

An AI system like Engi is fundamentally prompts and types with minimal infrastructure. At GA-1, performance gains come from the precise formatting of benchmarked semantic units, each measured and optimized based on empirical performance data.

The prompt system is not just infrastructure - it is the core system through which all functionality operates.

---

*"From semantic units, we format universes of capability."*
## GA‑1 Prompt Scaffolding Requirements (Registry Keys)

All agent prompts for system/plan/try/refine/retry must set the following registry keys to ensure consistent, reliable LLM behavior:

- generation:json_only_header — Instructs JSON‑only output
- generation:use_this_structure — Provides schema/shape hint
- generation:if_unknown_empty — For try/retry steps, prefer empty over hallucination
- generation:reason — First generation substep (Reason)
- generation:judge — Second substep (Judge)
- generation:structured_output — Third substep (StructuredOutput)
- failsafe:prepare_context — Parent failsafe to prepare concise context

These are PromptParts imported from `@bitcode/prompts` (generic raw_promptparts). The same keys are used across Generic Agents and Deliverable overlays. Keys are added to each Prompt registry via `.set(key, PromptPart)` calls.

Validation scripts:
- `bash scripts/generate-prompts-report.sh` — master inventory
- `bash scripts/analyze-prompts-gaps.sh` — gaps (doc‑comments, PBV, composition, inline)
- `bash scripts/verify-prompt-scaffolding.sh` — verifies the above keys exist in updated prompts
## Execution Prompt Preprocessor

We inject two execution-aware sections into the system prompt at every LLM call:

- Preprocess (system:preprocess): normalized intent — Deliverables (multi, compute). The AI Documents overlay populates the keys `ai_documents:sync` / `ai_documents:spawn` and the same data will extend to the Measure pipeline. Sourced from `execution.get('route/preprocessed', ...)`.
- On‑The‑Fly Instructions (system:otf): concise list of latest OTF instructions for the run (last 5).

Implementation:

- `ExecutionPrompt` gains helpers: `setPreprocess(path, part)` and `setOnTheFly(path, part)`.
- `applyPromptOverlays(execution, prompt)` reads from the execution store and sets the appropriate PromptParts.
- `ExecutionLLMRegistry.getDefaultLLM()` calls the injector prior to wrapping the LLM, so agents don’t need to set these manually.

Formatting:

- Keep sections concise. Use bullet lists for OTF, and simple labels for preprocess (e.g., “Compute: enabled”).
- This plays nicely with hierarchical prompts — no string concatenation, only PromptParts.
