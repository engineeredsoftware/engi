# Engi: Production AI Software Engineering Platform

[![Docs Refresh Check](https://github.com/engi/engi/actions/workflows/docs-refresh.yml/badge.svg)](https://github.com/engi/engi/actions/workflows/docs-refresh.yml)
[![CI](https://github.com/engi/engi/actions/workflows/ci.yml/badge.svg)](https://github.com/engi/engi/actions/workflows/ci.yml)
[![GA‑1 Core](https://github.com/engi/engi/actions/workflows/ga1.yml/badge.svg)](https://github.com/engi/engi/actions/workflows/ga1.yml)
[![Casing Check](https://github.com/engi/engi/actions/workflows/casing-check.yml/badge.svg)](https://github.com/engi/engi/actions/workflows/casing-check.yml)
[![UI SSOT Verify](https://github.com/engi/engi/actions/workflows/ui-ssot-verify.yml/badge.svg)](https://github.com/engi/engi/actions/workflows/ui-ssot-verify.yml)
[![Long‑Runner Image](https://github.com/engi/engi/actions/workflows/long-runner-ci.yml/badge.svg)](https://github.com/engi/engi/actions/workflows/long-runner-ci.yml)
[![Web Search Production](https://github.com/engi/engi/actions/workflows/web-search-production.yml/badge.svg)](https://github.com/engi/engi/actions/workflows/web-search-production.yml)

> **"Systematic engineering at scale."**

Engi is a production-grade AI software engineering platform that converts requirements into code through systematic agent orchestration. Built on architectural patterns that decompose software engineering into 7 primitive operations, Engi delivers 100x+ efficiency improvements with 99%+ quality consistency.

## Architecture Overview

Engi implements systematic AI-driven software development through modular architecture:

- **7 Primitive Operations** (4 Failsafe + 3 Generation) for complete task decomposition
- **10 Specialized Pipelines** providing comprehensive development workflows
- **Build-time Prompt System** with zero runtime overhead and versioned quality tracking
- **High-Performance UI** with real-time feedback and streaming capabilities

## Quick Start

```bash
# Clone Engi
git clone https://github.com/your-org/engi.git
cd engi

# Install with pnpm (required)
pnpm install

# Setup environment
cp uapi/.env.example uapi/.env.local
# Add: OPENAI_API_KEY, ANTHROPIC_API_KEY, SUPABASE keys

# Start development servers
pnpm dev              # Main app → http://localhost:3000
supabase start        # Local database
```

Visit http://localhost:3000 to access the development interface.

## Technical Architecture

### The Agent Action Step SubSteps

Every LLM operation in existence decomposes into these key operations:

**FAILSAFE GROUP (Operational Coordination)**
1. `PREPARE_CONTEXT` - Foundation context preparation
2. `CHUNK` - Parallel processing for scale
3. `SUM` - Intelligent synthesis and convergence  
4. `STITCH` - Recursive completion until perfect

**GENERATION GROUP (Cognitive Execution)**
5. `REASON` - Analysis and problem decomposition
6. `JUDGE` - Quality validation and assessment
7. `STRUCTURED_OUTPUT` - Structured data generation

Every agent execution uses BOTH a failsafe-step AND a generation-step, creating a 2D execution pattern for reliable operation.

### Core Pipelines (SDIVS Pattern)

Each pipeline follows **Setup → Discovery → Implementation → Validation → Shipping**:

1. **Deliverables** - Transform requirements into PRs, issues, features
2. **AI Documents** - `.ai/AGENTS.md` + `.ai/MCPS.md` overlays that capture modernization and dependency intelligence
3. **Measure** - Quality assessment and performance metrics
4. **Conversation** - Natural dialogue with context management
5. **Ad-hoc** - Rapid task execution for quick requests
6. **Sentient** - System-wide pattern analysis
7. **Obfuscate** - Privacy-preserving transformations

### The PTRR Agent Pattern

Agents execute through **Plan → Try → Refine → Retry**:

```typescript
export const CONQUER_AGENT = {
  name: 'Implementation Conquer Agent',
  stepExecutor: {
    plan: { taskPromptFn, tools: ['lsp-query'], schema: PlanSchema },
    try: { taskPromptFn, tools: ['text-editor'], schema: TrySchema },
    refine: { taskPromptFn, tools: ['text-editor'], schema: RefineSchema },
    retry: { taskPromptFn, tools: ['formatter'], schema: RetrySchema }
  }
} satisfies BaseAgent;
```

### Build-Time Prompts with Zero Overhead

```typescript
/**
 * @doc-promptpart
 * version: 1.0.0
 * category: system
 * @doc-ptrr
 * sentience: build-time
 * capabilities: ["adaptive", "versioned"]
 */
const prompt: PromptPart = "You are a production engineering system...";

// Compose with registry
const composer = new PromptComposer('id', 'name');
composer
  .stage('system', ENGI_SYSTEM_IDENTITY)
  .stage('agent', AGENT_MISSION)
  .stage('task', taskPrompt)
  .build();
```

## Core Components

### Execution System

The `Execution` primitive manages hierarchical process state:

```typescript
export class Execution {
  toolResults: Map<string, Map<string, ToolResult>>;
  agentOutputs: Map<string, any>;
  phaseArtifacts: Map<string, Artifact>;
  shared: Map<string, any>;
  
  spawn(id: string): Execution;  // Creates child executions
  findUp(finder: Function): T;    // Searches up the chain
  emit(event: string, data: any); // Event-driven coordination
}
```

### Conversations: High-Performance Interface

Real-time streaming interface with optimized rendering:

- **Token-by-token streaming** with 20 FPS optimization
- **Rich text features**: `#` sources, `+` attachments, `@` deliverables
- **Pipeline integration** through natural language
- **Visual feedback** for processing state

### Tool System with Doc-Comments

```typescript
/**
 * @doc-tool
 * name: "text-editor"
 * @doc-tool-purpose
 * Comprehensive file editing with atomic operations
 * @doc-tool-capabilities
 * - Create, read, update, delete files
 * - Pattern-based replacements
 * - Atomic operations with rollback
 */
class TextEditorTool extends Tool<typeof schema> {
  use = textEditor;
}
```

## 📂 Repository Structure

```
engi/
├── packages/
│   ├── pipelines/          # The 10 pipeline implementations
│   ├── agents/             # PTRR agent definitions
│   ├── execution-generics/ # Execution primitives
│   ├── prompts/            # Build-time prompt system
│   ├── tools-generics/     # Tool abstractions
│   └── [50+ packages]      # Specialized capabilities
├── uapi/                   # Next.js main application
└── docs/                   # Documentation
```

## Key Patterns

### File Naming Excellence

```typescript
// ✅ CORRECT - States essence
discoveryDeliverablesAgentPickRelevantFiles/
text-editor-tool.ts
prompt_generic_system_identity.ts

// ❌ BANNED - Meaningless terms
utils.ts, helpers.ts, common.ts, misc.ts
```

### Prompt Composition

```typescript
// System → Phase → Agent → Step → Task
const systemPrompt = new PipelineSystemPromptV2(input);
systemPrompt
  .buildPipeline()    // Pipeline subsystem
  .buildAgent()       // Agent capabilities
  .buildTask()        // Specific task
  .compose();         // Final composition
```

### 2D Execution Pattern

```typescript
// Every operation has failsafe AND generation dimensions
const execution = new Execution('root');
const failsafeResult = await failsafeExecutor.execute(input, execution);
const generationResult = await generationExecutor.execute(failsafeResult, execution);
```

## Engineering Principles

Engi follows core engineering principles:

1. **Decomposition Over Complexity** - 7 primitive operations compose all behaviors
2. **Systematic Over Ad-hoc** - Structured patterns, not one-off solutions
3. **Iteration Over Perfection** - DIV loops for continuous improvement
4. **Composition Over Configuration** - Modular components create systems

## For Developers

### Essential Documentation
- **[DEVELOPING.md](./DEVELOPING.md)** - Complete engineering guide with architecture, patterns, and workflows
- **[QA_CHECKLIST.md](./QA_CHECKLIST.md)** - Comprehensive quality assurance checklists
- **[TODOS.md](./TODOS.md)** - MVP launch checklist and outstanding tasks
- **[UI_FEATURES.md](./UI_FEATURES.md)** - Implemented UI/UX features reference
- **[TEAM_MANAGEMENT.md](./TEAM_MANAGEMENT.md)** - Team collaboration features and integrations
- **[CREDITS_AND_PAYMENTS.md](./CREDITS_AND_PAYMENTS.md)** - Payment system and credit management
- **[ELI5.md](./ELI5.md)** - Simple guide for getting started quickly

### Development Commands
```bash
pnpm test               # Run tests
pnpm lint              # Check code quality  
pnpm typecheck         # Verify types
pnpm dev:all           # Start everything
```

## Project Goals

Engi aims to transform software engineering by:
- Making AI accessible through intuitive interfaces
- Achieving consistent high-quality code generation
- Reducing development time by 100x+
- Enabling natural language software development

Engi is a systematic approach to AI-driven software engineering.

---

**"Systematic engineering at scale."**
