# CHAT.md - Bitcode Conversational Experience

**Last Updated**: 2025-08-18  
**Status**: Foundation Architecture Document (Conversations Temporarily Disabled)  

## Core Vision

Bitcode is complete. The conversational experience is chat-based engineering that can optionally run pipelines. The Conversations experience provides the interface between human intent and engineering excellence.

## Current Status

**Conversations overlay is temporarily disabled** (`NEXT_PUBLIC_CONVERSATIONS_WIDGET=false`) while we focus on streaming and pages architecture. The refactoring is complete and the system is ready for re-enablement.

### Conversations Experience Architecture

**Location**: Overlay component accessible from any page via floating orb
- **Path**: `/app/conversations/components/ConversationsOverlay.tsx`
- **Entry Point**: Floating orb (bottom-right) or keyboard shortcut (Cmd+K)

**Key Components**:
- `ConversationsOverlay`: Main container with multiple view modes
  - Floating mode (default)
  - Sidebar mode (19rem width)
  - Fullscreen mode
  - Split-screen mode
- `ConversationsChat`: Chat interface with SSE streaming
- `ConversationsRichTextInput`: Token-aware input with attachments
- `ConversationsThinkingLog`: Real-time agent thought process
- `ConversationsChatHistorySidebar`: Conversation branching/history
- `ConversationsFloatingOrb`: Quantum orb with GPU-accelerated animation

**Visual Design**:
- Dark theme with glassmorphism effects
- Quantum orb animation (dynamic gradient)
- Smooth entrance/exit animations (Framer Motion)
- GPU-accelerated transforms for performance
- Throttled scroll handlers (60fps target)

### Completed Refactoring
Status for every Conversations refactor lives in `internal-docs/GA1.md`. That doc tracks the overlay modularization, hook extractions, ConversationAgent move, PTRR enforcement, and related follow-up work.

### Remaining TODOs (inline in code)
```typescript
// 1. Wire up ConversationAgent in streaming route
// Location: /api/conversations/[conversationId]/stream/route.ts:877-902
// Status: TODO comment with implementation guide

// 2. Implement rich reply components
// Location: /components/conversations/rich-replies/RichReplyRenderer.tsx
// Status: Full stub with TODO markers

// 3. Complete E2E test suite
// Location: /tests/e2e/conversation-digest-pipeline.test.ts
// Status: Comprehensive test structure with placeholders
```

## Architecture Principles

### 1. Basic Chat Experience (Conversations → Client)
- **Pure conversational AI** - Works E2E without requiring pipelines
- **Intelligent context** - Leverages digesting and on-the-fly understanding
- **Read-only tools** - Access to codebase without mutations
- **Pipeline optional** - Pipelines are tools, not requirements

### 2. Read-Only Intelligence Tools
The conversational AI has access to read-only tools for understanding:
- **Repository digesting** - Understand codebase structure and patterns
- **File reading** - Access specific files for context
- **Search & grep** - Find relevant code and patterns
- **VCS history** - Understand evolution and context
- **Documentation** - Access to internal and external docs

### 3. Pipeline as Tool
Pipelines (deliverables today, Measure upcoming) are **tools** the conversation can invoke:
- **Not required** - Many conversations complete without pipelines
- **Multiple possible** - A conversation could theoretically run multiple pipelines
- **Intelligent reduction** - Cleverness to reduce need for pipeline runs
- **Context preservation** - Pipeline results feed back into conversation

## Conversation Flow

### Basic Chat (No Pipeline)
```
User → Conversation → Conversational AI → Read-Only Tools → Response
```
- User asks question or seeks understanding
- AI uses read-only tools to gather context
- Provides intelligent response without mutations

### Chat with Pipeline
```
User → Conversation → Conversational AI → Decision → Pipeline Tool → Results → Continued Conversation
```
- User requests action requiring code changes
- AI decides pipeline is needed
- Executes pipeline as tool
- Integrates results back into conversation
- Continues dialogue with context

## Read-Only Tool Architecture

### Core Tool Categories

#### 1. Repository Analysis Tools
```typescript
interface RepositoryAnalysisTools {
  digestRepository: {
    purpose: "Generate semantic understanding of repository structure";
    input: { path: string; depth?: number };
    implementation: "@bitcode/digest";
  };
  
  analyzeStructure: {
    purpose: "Map repository architecture and dependencies";
    input: { root: string; patterns?: string[] };
  };
  
  detectPatterns: {
    purpose: "Identify coding patterns and conventions";
    input: { files: string[]; patternTypes?: PatternType[] };
  };
}
```

#### 2. File Reading Tools
```typescript
interface FileReadingTools {
  readFile: {
    purpose: "Read file contents with syntax highlighting";
    input: { path: string; lineRange?: [number, number] };
    implementation: "@bitcode/vcs (getFileContent)";
  };
  
  readFiles: {
    purpose: "Batch read multiple files efficiently";
    input: { paths: string[]; maxSize?: number };
  };
  
  extractRelevant: {
    purpose: "Extract relevant portions based on query";
    input: { path: string; query: string; context?: number };
  };
}
```

#### 3. Search & Discovery Tools
```typescript
interface SearchTools {
  searchPattern: {
    purpose: "Find patterns across codebase";
    input: { pattern: string; path?: string; options?: GrepOptions };
    implementation: "@bitcode/simple-system-text-search";
  };
  
  semanticSearch: {
    purpose: "Find conceptually related code";
    input: { query: string; scope?: SearchScope };
    implementation: "Digest + Vector similarity";
  };
  
  findSymbol: {
    purpose: "Locate definitions, references, implementations";
    input: { symbol: string; type?: SymbolType };
    implementation: "@bitcode/lsp-query";
  };
}
```

#### 4. VCS History Tools
```typescript
interface VCSHistoryTools {
  getHistory: {
    purpose: "Retrieve commit history for understanding evolution";
    input: { path?: string; limit?: number; author?: string };
    implementation: "@bitcode/vcs";
  };
  
  getBlame: {
    purpose: "Understand who changed what and why";
    input: { path: string; lineRange?: [number, number] };
  };
  
  getDiff: {
    purpose: "Compare versions to understand changes";
    input: { ref1: string; ref2: string; path?: string };
  };
}
```

### Context Accumulation Strategy
```typescript
interface ContextAccumulator {
  // Cache frequently accessed data
  cache: Map<string, CachedResult>;
  
  // Accumulate understanding
  knowledge: {
    structure: StructureMap;
    patterns: PatternAnalysis;
    dependencies: DependencyGraph;
  };
  
  // Smart retrieval
  getContext(query: string): Promise<RelevantContext>;
}
```

## Token System and Pipeline Triggers

### Token Types (UPDATED - Command Removed)
The rich text input supports **5 token types** via trigger characters:
- `@` for **source** - References VCS sources
- `^` reserved for the upcoming **Measure** pipeline (disabled in GA‑1; still surfaces placeholder UI copy only)
- `+` for **attachment** - Adds file/image attachments
- `>` for **pipeline_run** - References other pipeline runs (formerly OTF_TARGET)
- `[[deliverable:title]]` or `/deliverable` - Triggers deliverable pipeline

**REMOVED**: Command token (`:`) - Simplified UX, no longer needed

```typescript
interface Token {
  id: string;
  type: 'deliverable' | 'measure' | 'attachment' | 'source' | 'pipeline_run';
  text: string;
  data: any;
}
```

### 1. Pipeline Token Triggers
Pipeline-specific tokens (deliverable; Measure placeholder reserved):
```typescript
interface PipelineToken {
  type: 'deliverable' | 'measure';
  value: string;  // Task description
  metadata?: {
    repoOwner?: string;
    repoName?: string;
    repoBranch?: string;
    attachments?: Attachment[];
    mcpConfig?: Record<string, any>;
  };
}
```

### 2. Slash Command Triggers
Direct commands in message content:
```
/deliverable Create user authentication system with JWT
```

### 3. Intelligent Intent Detection
AI determines when pipeline is needed:
```typescript
interface IntentAnalysis {
  requiresPipeline: boolean;
  pipelineType?: 'deliverable' | 'measure';
  confidence: number;
  reasoning: string;
}
```

### Pipeline Execution Flow
```typescript
async function executePipeline(
  config: PipelineConfig,
  userId: string,
  conversationId: string,
  stream: ReadableStreamController
): Promise<PipelineResult> {
  // 1. Validate prerequisites
  const validation = await validatePipelineRequirements(config, userId);
  
  // 2. Reserve credits
  const reservation = await reserveCredits(userId, config.type);
  
  // 3. Create pipeline run
  const runId = await createPipelineRun(config, userId, conversationId);
  
  // 4. Emit start event
  emitStreamEvent(stream, {
    type: 'pipeline_triggered',
    data: { runId, pipelineType: config.type }
  });
  
  // 5. Execute pipeline
  const result = await runSDIVSPipeline(config, execution);
  
  // 6. Stream events during execution
  // 7. Complete and integrate results
  
  return result;
}
```

## Streaming Architecture

### Event Types
```typescript
type StreamEvent = 
  | { type: 'token'; data: string }
  | { type: 'message_complete'; data: { messageId: string; content: string } }
  | { type: 'pipeline_triggered'; data: { runId: string; pipelineType: string } }
  | { type: 'pipeline_event'; data: { runId: string; event: any } }
  | { type: 'pipeline_complete'; data: { runId: string; success: boolean; summary?: string } }
  | { type: 'error'; data: { message: string; code?: string } };
```

### SSE Protocol
- Real-time message streaming
- Pipeline events as part of conversation stream
- Backpressure handling for large responses
- Memory-efficient chunking

## Implementation Status

### ✅ Completed
- Conversation UI/UX refactoring (2771 → 683 lines)
- 7 hooks extracted and integrated with TypeScript generics
- 6+ components modularized (preserved all functionality)
- SSE streaming infrastructure
- Conversation persistence
- Message attachments (message-level, not conversation-level)
- Token parsing from messages (5 types)
- Slash command detection
- Pipeline execution framework
- Credit reservation system
- Read-only tool definitions
- Pipeline trigger logic documentation
- ConversationAgent with PTRR pattern
- Dependency injection for tools
- Feature flag control system

### 🚧 In Progress (Stubs Created)
- Wire up ConversationAgent in streaming route (TODO inline)
- Rich reply components (RichReplyRenderer stub created)
- E2E test suite (comprehensive test structure ready)
- Feature flag checks for Conversation API routes (utils.ts created)

### 📐 Architectural Decisions Made
1. **No 'Context' naming** - Sensitive to this word in constructors
2. **Tools via dependency injection** - Not hardcoded in agent
3. **UI vs DB types** - UI uses type/agent, DB uses role/assistant
4. **Attachment architecture** - Message-level, not conversation-level
5. **PTRR with schemas** - Declarative output definitions
6. **Feature flag first** - All Conversation features check NEXT_PUBLIC_CONVERSATIONS_WIDGET

### 📋 Future Enhancements
- Multi-pipeline execution from single conversation
- Advanced context reduction strategies
- Pipeline chaining based on results
- Conditional execution logic
- Pipeline templates and presets
- Incremental digesting for large repos
- Cross-repository understanding
- External API documentation access
- Real-time file watching integration

## Security & Performance

### Read-Only Guarantees
- Tools have NO write permissions
- All file access is read-only
- No execution of user code
- No modification of repository state

### Performance Optimization
- Lazy loading of file contents
- Incremental context building
- Caching of frequent queries (15 min TTL)
- Parallel tool execution where possible

### Resource Limits
- Max file size for reading: 10MB
- Max files per batch read: 100
- Search result limits: 1000 matches
- Pipeline timeout: Configurable per type

## Key Differentiators

### 1. Conversation First
Unlike traditional tools that are command-driven, Bitcode is conversation-driven. The chat IS the experience, not a wrapper around commands.

### 2. Intelligence Without Action
The AI can provide deep insights, explanations, and understanding WITHOUT needing to run pipelines or mutate code.

### 3. Progressive Enhancement
Start with understanding, progressively enhance to action when needed. Not every question needs a pipeline.

### 4. Tools as Options
Pipelines are powerful tools available when needed, not requirements for every conversation.

## Re-enablement Guide

When ready to re-enable Conversation:

1. **Enable feature flag**
   ```bash
   # .env.local
   NEXT_PUBLIC_CONVERSATIONS_WIDGET=true
   ```

2. **Complete inline TODOs**
   - Wire ConversationAgent in streaming route
   - Finish RichReplyRenderer implementation
   - Run E2E test suite

3. **Verify integrations**
   - Test digest loading
   - Verify pipeline triggering
   - Check SSE streaming
   - Validate rich replies

## Summary

The Bitcode conversational experience is about **intelligence first, action when needed**. The chat is the primary interface, with pipelines as powerful tools available when required. The system should be clever about reducing the need for pipeline runs through intelligent use of read-only tools and context accumulation.

**Current state**: Architecture is solid, refactoring complete, ready for focused implementation when Conversation is re-enabled.

Read-only tools enable:
1. **Understanding** codebases without mutations
2. **Searching** efficiently across files and history
3. **Accumulating** context incrementally
4. **Answering** questions without pipeline runs
5. **Suggesting** actions based on analysis

Pipeline triggers enable:
1. **Explicit triggers** via tokens and commands
2. **Implicit triggers** via intent analysis
3. **Context-aware execution** using conversation history
4. **Real-time feedback** through SSE streaming
5. **Graceful error handling** with recovery options

Remember: **Bitcode is complete**. We're not building new capabilities, we're revealing the excellence that already exists through the conversational interface.
