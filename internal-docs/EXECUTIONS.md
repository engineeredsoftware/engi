# Executions

**Complete architecture: primitives → implementation → UX**

---

## 🎯 PRODUCT POSITIONING

**Smarter than:** Webflow/Squarespace/Shopify (actual code, not templates)
**Actually codes unlike:** Lovable/Replit (they don't really code)
**Feel:** ChatGPT comfort + multi-paning + execution visibility

---

## ✅ WHAT'S WORKING

- Chat/conversational overlay (default open, comfortable)
- Multi-paning, multi-execution per conversation
- Rich inputs and responses
- Execution logs, history, search
- All foundation solid

---

## 🔧 WHAT NEEDS CHATGPT FEEL

### **Inner Waterfall (Conversations)**
- Message flow and rendering
- Smooth scrolling, auto-scroll behavior
- Message grouping and timestamps

### **Rich Responses**
- Markdown rendering
- Code blocks with syntax highlighting
- Inline file diffs
- Collapsible sections

### **Instructions UX/UI** (This Work)
- Remove "OTF" terminology everywhere
- Unified input (works during execution and after)
- Self-instruction prompt with countdown
- Timeline of previous instructions

### **Source & Attachments**
- Per pane (not global)
- Per message (non-RI)
- Clean attachment display

### **Log Embedding Levels**
- Per pane selector
- 1 selected execution's logs embedded
- Smooth expand/collapse

### **Left Bar Conversation History**
- Search conversations
- Advanced sorting (recent, active, archived)
- Filtering by execution type
- Quick navigation

### **Execution Detail Transition**
- Click conversation execution → `/executions/[id]` page
- Smooth transition, preserve context
- Production-final quality

### **Completed Execution Header**
- Metrics (time, tokens, credits, iterations)
- Deliverables (PR links, file changes, summary)
- Edits and links (file tree, commit SHA)
- Polish details

### **Execution Logs Refinement**
- File/tool names in line titles (not just "tool-use")
- Inner meta accordion (expand agent details, reasoning, outputs)
- Nested exploration

---

## 🏗️ ARCHITECTURE

### **Layer 1: Primitives**

```typescript
class Execution {
  store(namespace: string, key: string, value: any)
  get<T>(namespace: string, key: string): T | undefined
  child(id: string): Execution
}

type Executor<In, Out> = (input: In, execution: Execution) => Promise<Out>
```

### **Layer 2: Pipeline (SDIVS)**

```typescript
Setup → [Discovery → Implementation → Validation]* → Shipping

// DIV loop code (sdivs-factory.ts lines 101-147):
while (iterations < maxIterations && !validationPassed) {
  iterations++

  result = await discovery(result, execution)
  result = await implementation(result, execution)
  result = await validation(result, execution)

  validationPassed = execution.get('validation', 'passed')

  // Loop continues immediately (no pause/wait)
}
```

**Key:** Synchronous while loop. Each iteration completes before next starts. No pause mechanism.

### **Layer 3: Validation Sequence**

```typescript
validation = sequential(
  parallel(
    validateLast,
    validateDiscovery,
    validateImplementation
  ),
  readyToInstruct,  // Generates selfInstruction
  readyToShip       // Final go/no-go
)
```

---

## 💾 INSTRUCTIONS - COMPLETE PICTURE

### **Current Execution Model (How DIV Loop Actually Works)**

**1. Execution starts:** POST /api/executions creates execution, starts pipeline

**2. Pipeline runs:**
```
Setup phase completes
  ↓
DIV Loop begins:

  Iteration 1:
    Discovery → Implementation → Validation
      ↓
    ready-to-instruct runs:
      - Analyzes: validation issues, file changes, complexity
      - Generates: {summary: "...", confidence: 0.7}
      - Stores: execution.store('validation', 'selfInstruction', ...)
      - SSE streams to UI immediately
      ↓
    ready-to-ship runs:
      - Checks if ready to proceed to Shipping
      - If not: validationPassed = false
      ↓
    Loop continues IMMEDIATELY to Iteration 2
    (No pause, no wait for user)

  Iteration 2:
    Discovery → Implementation → Validation
    (Same pattern, selfInstruction updated)

  Iteration 3:
    ...

  ↓
All iterations complete
  ↓
Shipping phase
  ↓
Execution ends (status = 'completed')
```

**3. UI sees:**
- SSE streams each selfInstruction as it's generated
- Shows timer/prompt in real-time
- But execution doesn't wait - keeps running
- By the time user responds, execution might be done

**Problem:** User sees prompt but can't actually steer the iteration because it already continued.

---

### **Instruction Architecture Options (Full Analysis)**

## **OPTION A: Continuous Execution (Current Code)**

**How it works:**
- DIV loop runs all iterations synchronously
- selfInstruction generated each iteration, stored, streamed
- User sees prompts in real-time but execution doesn't wait
- Instructions submitted go to database
- Next execution (if started) can read them

**Code Changes:** Minimal
- Create instructions table
- Implement GET/POST persistence
- Change event types (otf → instruction)
- UI already works, just wire to real data

**User Experience:**
```
User starts execution
  ↓
Sees iteration 1 self-instruction: "3 files changed, syntax valid. Continue?"
  (Timer counting down... 2:00, 1:59, 1:58...)
  ↓
Before user responds, iteration 2 already started
  ↓
Sees iteration 2 self-instruction: "Added tests, all passing. Ship?"
  ↓
Execution completes
  ↓
User can submit instruction for NEXT execution
```

**Pros:**
- Simple, no blocking
- Execution doesn't wait for user
- Fast completion
- Works with current code

**Cons:**
- Not actually "steerable" (can't change mid-flight)
- Timer is visual only (doesn't affect execution)
- "Self-instructing" is post-hoc (see what happened, not guide what happens)

**For this to work as "steerable":**
- User would need to submit instruction DURING iteration
- Next iteration reads instructions from table
- But timing is tight (iterations run fast)

---

## **OPTION B: Pause-Wait Per Iteration**

**How it works:**
- After each validation, if confidence < threshold:
  - Pipeline pauses (doesn't proceed to next iteration)
  - Stores execution.status = 'awaiting_instruction'
  - SSE streams "waiting for instruction" event
  - UI shows prompt + timer
  - Waits for: user instruction OR "No Notes" OR timer expires
- When user responds or timer expires:
  - Instruction (if provided) stored in database
  - Pipeline resumes, continues to next iteration
  - Next iteration has instruction as context

**Code Changes:** Significant

**1. Add pause/wait mechanism to DIV loop:**
```typescript
while (iterations < maxIterations && !validationPassed) {
  // Run D → I → V
  result = await runIteration(result, execution)

  // After validation, check selfInstruction
  const selfInstruct = execution.get('validation', 'selfInstruction')

  if (selfInstruct && selfInstruct.confidence < 0.8) {
    // Pause execution
    execution.store('pipeline', 'status', 'awaiting_instruction')

    // Emit waiting event
    await emitSSE({ type: 'awaiting_instruction', selfInstruction })

    // Wait for instruction (polling database)
    const instruction = await waitForInstruction(execution, {
      timeout: selfInstruct.confidence === 0 ? Infinity : 120000,  // 2 min or forever
      pollInterval: 1000  // Check every second
    })

    // Resume
    execution.store('pipeline', 'status', 'running')
    if (instruction) {
      execution.store('instructions', 'current', instruction)
    }
  }

  iterations++
}
```

**2. Implement waitForInstruction:**
```typescript
async function waitForInstruction(
  execution: Execution,
  options: { timeout, pollInterval }
): Promise<Instruction | null> {
  const startTime = Date.now()

  while (true) {
    // Check database for new instructions
    const instructions = await db.select()
      .from('instructions')
      .where('execution_id', execution.id)
      .where('created_at', '>', execution.get('pipeline', 'lastInstructionCheck'))

    if (instructions.length > 0) {
      return instructions[instructions.length - 1]  // Latest
    }

    // Check timeout
    if (Date.now() - startTime > options.timeout) {
      return null  // Timer expired, proceed without instruction
    }

    // Check if user clicked "No Notes" (store skip signal)
    const skip = execution.get('instructions', 'skip')
    if (skip) {
      return null  // User explicitly skipped
    }

    // Wait before polling again
    await sleep(options.pollInterval)
  }
}
```

**3. "No Notes" button handler:**
```typescript
// UI button
<button onClick={async () => {
  // Signal skip (so polling stops)
  await fetch(`/api/executions/${runId}`, {
    method: 'PUT',
    body: JSON.stringify({ instruction_skip: true })
  })
}}>
  No Notes
</button>

// API updates execution state
execution.store('instructions', 'skip', true)
```

**User Experience:**
```
User starts execution
  ↓
Iteration 1: D → I → V completes
  ↓
Execution PAUSES
  ↓
UI shows: "Iteration 1 complete: 3 files changed, syntax valid. Continue?"
  Timer: 2:00... 1:59... 1:58...
  [Instruction input shown]
  [No Notes button]
  ↓
User has 2 minutes to:
  - Type instruction: "Add error handling to auth.ts"
  - Click "No Notes": Proceed immediately
  - Wait: Timer expires, proceeds automatically
  ↓
Pipeline RESUMES
  ↓
Iteration 2 runs with instruction as context
  ↓
...
```

**Pros:**
- Truly steerable (user actually affects next iteration)
- Timer is meaningful (real countdown)
- "Self-instructing" is interactive (guide execution real-time)
- Aligns with your description: "steerable self-instructing UX"

**Cons:**
- Execution takes longer (waits for user)
- Blocking: Server process holds connection while waiting
- Database polling (continuous queries)
- More complex implementation

**Infrastructure Implications:**
- Long-running connections (Node.js process stays alive)
- Need timeout handling (what if user never responds?)
- Database polling load (checking every second)
- Execution state persistence (if server restarts while waiting)

---

## **OPTION C: Hybrid (Recommended)**

**How it works:**
- DIV loop runs continuously (like Option A)
- BUT: After ALL iterations complete, show final self-instruction
- User can then start ANOTHER execution with their instruction
- OR: Confidence 0 (must gates) DO pause

**Specific behavior:**

**Normal Iterations (confidence > 0):**
```
Iterations run continuously
selfInstructions generated and streamed
User sees prompts in real-time
Execution completes
Final self-instruction shown with "Start Next Iteration" button
```

**Must Gates (confidence === 0):**
```
ready-to-iterate (after Setup):
  confidence = 0
  Pipeline PAUSES
  UI shows: "Setup complete. Ready to iterate?" (no timer)
  User clicks "Ready" or provides instruction
  Pipeline RESUMES to DIV loop

ready-to-ship (after Validation):
  confidence = 0
  Pipeline PAUSES
  UI shows: "Validation complete. Ready to ship?" (no timer)
  User clicks "Ship" or provides feedback
  Pipeline RESUMES to Shipping
```

**Code Changes:** Medium

**1. Add pause only for confidence === 0:**
```typescript
// After validation
const selfInstruct = execution.get('validation', 'selfInstruction')

if (selfInstruct.confidence === 0) {
  // Must interact - pause and wait
  await waitForUserDecision(execution)
}
// If confidence > 0, continue immediately
```

**2. User decision endpoints:**
```typescript
// User clicks "Proceed" or "No Notes"
PUT /api/executions/{id} { decision: 'proceed' }

// Or provides instruction
POST /api/executions/instructions { content: "..." }
// Then: PUT { decision: 'proceed' }
```

**User Experience:**
```
Normal flow (confidence > 0):
  - Iterations run fast
  - User sees prompts but execution doesn't wait
  - Can submit instructions for next execution

Critical gates (confidence = 0):
  - Pipeline pauses at ready-to-iterate (Setup)
  - Shows "Setup complete. Review and proceed?"
  - User must interact (can skip but deliberate)
  - Pauses at ready-to-ship (Validation)
  - Shows "Code complete. Ready to ship?"
  - User must approve
```

**Pros:**
- Fast execution (no waiting except critical gates)
- Truly steerable at decision points
- Simple implementation (only 2 pause points)
- Aligns with "must interact" semantics

**Cons:**
- Iterations themselves aren't steerable (only gates)
- Still can't guide mid-iteration

---

## Executions Experience Architecture

**Purpose**: Pipeline execution management and monitoring

**Location**: Dedicated page for running and tracking executions
- **Path**: `/app/executions/`
- **Routes**:
- `/executions?type=pipeline:deliverables` (AssetPack compatibility execution)
- `/executions?type=pipeline:measure` (reserved need-measurement placeholder that currently redirects to deliverables)

**Key Components**:
- `ExecutionsPage`: Main page container
- `ExecutionsPageHeader`: Dynamic header with gate indicator
- `GuideIndicator`: Stepwise 1-2-3 DDD progress display (prominent in header)
- `ExecutionsInstructions`: OTF instruction interface
- `ExecutionsProcessLog`: Live pipeline execution log
- `ExecutionsTaskInput`: Task definition input
- `ExecutionsDetailsView`: Execution result display
- `InstructionConfidenceTimer`: Confidence-based interaction timer

**Features**:
- DDD gate visualization (Design → Develop → Digest)
- Real-time execution monitoring via SSE
- File diff viewer for code changes
- Instructions system integration
- VCS source selection
- Attachment management (files, URLs, integrations)
- Template system for deliverables

**Visual Design**:
- Prominent stepwise gate indicator (always shows all 3 gates)
- Real-time processing animations
- File diff visualization
- Timeline-based instruction display
- Dark theme consistent with app

## 🎨 DDD GATES - CURRENT DESIGN REVIEW

### **What's Implemented**

**Database:**
```sql
executions.gate TEXT DEFAULT 'Develop'
```

**API:**
```typescript
PUT /api/executions/[runId] { gate: 'Design' | 'Develop' | 'Digest' }
```

**Phases:**
```typescript
designPhase = createPhaseRunner({
  sequence: [{ agent: 'design:iterate-product-md' }]
})

// Develop = normal SDIVS

digestPhase = createPhaseRunner({
  sequence: [{ agent: 'digest:capture-learnings' }]
})
```

**Agents:**
```typescript
iterate-product-md:
  Input: requirements, currentProductMd, userFeedback
  Output: productMdDraft, changes[], completeness, readyToImplement
  Tools: Write, Edit

capture-learnings:
  Input: executionResults, fileChanges, currentAgentsMd, userFeedback
  Output: agentsMdUpdates, questionsAnswered[], readyToShip
  Tools: Write, Edit
```

**UI:**
```typescript
<GuideIndicator currentGuide={guide} />

{gate === 'Design' && (
  <button onClick={() => PUT({ gate: 'Develop' })}>
    Ready to Develop
  </button>
)}
// Similar for Develop → Digest, Digest → Ship
```

### **What's NOT Implemented**

**Phase Routing:**
```typescript
// Doesn't exist yet - needs to be added
const metaPhase = getCurrentMetaPhase(execution)

if (metaPhase === 'Design') {
  return await designPhase(input, execution)
} else if (metaPhase === 'Digest') {
  return await digestPhase(input, execution)
} else {
  // Develop
  return await sdivsPipeline(input, execution)
}
```

**Agent Registration:**
```typescript
// Agents created but not registered
// Need in preprocess:
agentRegistry.register('design:iterate-product-md', IterateProductMdAgent)
agentRegistry.register('digest:capture-learnings', CaptureLearningsAgent)
```

**File Gates:**
```typescript
// Logic exists but not enforced
// Need in Write/Edit/Delete tools:
const metaPhase = execution.get('meta', 'phase')
if (metaPhase === 'Design' && path !== '.ai/PRODUCT.md') {
  throw new Error('Design phase: PRODUCT.md only')
}
```

**.ai/PRODUCT.md Template:**
```markdown
# Currently empty (1 line file)
# Needs template with:
## Features
## Architecture
## Requirements
```

### **Execution Model - Key Question**

**Current design ambiguity:**

**Model A - Same Execution Through All Phases:**
```
User: POST /api/executions { gate: 'Design' }
  → Creates execution exec-123 with gate = 'Design'
  ↓
Design phase runs (iterate PRODUCT.md)
  ↓
PRODUCT.md stored in execution state
  ↓
Execution completes (status = 'completed')
  ↓
User clicks "Ready to Develop"
  → PUT /api/executions/exec-123 { gate: 'Develop', status: 'pending' }
  ↓
How does execution resume? Need resume mechanism:
  - Re-run pipeline with same execution object
  - Read PRODUCT.md from previous phase
  - Continue from Develop phase
```

**Problem:** Execution already completed. Can't "resume" without new infrastructure.

**Model B - Chain of Executions:**
```
Design Execution:
  POST /api/executions { gate: 'Design' }
    → exec-design-123
    → Runs designPhase
    → Outputs PRODUCT.md
    → Completes
  ↓
User clicks "Ready to Develop"
  ↓
Develop Execution:
  POST /api/executions {
    gate: 'Develop',
    design_execution_id: 'exec-design-123'  // Link to Design
  }
    → exec-develop-456
    → Reads PRODUCT.md from exec-design-123 state
    → Runs SDIVS
    → Outputs code changes
    → Completes
  ↓
User clicks "Ready to Digest"
  ↓
Digest Execution:
  POST /api/executions {
    gate: 'Digest',
    develop_execution_id: 'exec-develop-456'
  }
    → exec-digest-789
    → Analyzes exec-develop-456 results
    → Proposes AGENTS.md updates
    → Completes
```

**Pros:**
- Each phase is complete execution (clean)
- Can see each phase's results separately
- No resume mechanism needed
- Execution model stays simple

**Cons:**
- 3 separate execution IDs
- Need linking (design_execution_id, develop_execution_id)
- UI needs to track chain
- More complex history

**Model C - Single Execution, Phase as Status:**
```
POST /api/executions { gate: 'Design' }
  → exec-123, status = 'running', gate = 'Design'
  ↓
Design phase runs, completes
  → status = 'completed', gate still 'Design'
  ↓
User clicks "Ready to Develop"
  → PUT { gate: 'Develop', status: 'pending' }
  → Backend job picks up, re-runs pipeline
  ↓
Same exec-123, now gate = 'Develop'
  → Runs Develop phase
  → status = 'completed'
  ↓
...
```

**Requires:**
- Background job system (cron checking for pending executions)
- Or webhook/queue trigger
- Execution state persists between runs
- Pipeline reads gate and routes to correct phase

**Pros:**
- Single execution ID (simple tracking)
- State persists (PRODUCT.md accessible)
- Clean transition history

**Cons:**
- Need job queue/trigger system
- Execution runs multiple times (restart pipeline)
- More complex orchestration

---

## 💭 MY RECOMMENDATIONS WITH FULL CONTEXT

### **For Instructions (Steerable UX)**

**Hybrid Approach (Option C from earlier):**

**Normal iterations (confidence > 0):**
- Run continuously (fast execution)
- selfInstructions streamed but don't wait
- User sees prompts, can submit for next execution

**Critical gates (confidence === 0):**
- ready-to-iterate (after Setup): PAUSE
- ready-to-ship (after final Validation): PAUSE
- These ARE steerable (user must interact)

**Implementation:**
```typescript
// In validation phase
const selfInstruct = execution.get('validation', 'selfInstruction')

if (selfInstruct.confidence === 0) {
  // Critical gate - must wait
  execution.store('pipeline', 'awaitingDecision', true)

  // Option: Polling
  await waitForUserDecision(execution, { timeout: Infinity })

  // Option: Store and exit, resume via job
  // (Cleaner but needs job queue)
  return { pause: true, resumeAt: 'nextIteration' }
}
```

**Why:** Balances speed (continuous iterations) with control (pause at critical decisions)

---

### **For DDD Meta-Phases**

**Recommended: Model B (Chain of Executions)**

**Why:**
- Each phase is atomic (complete execution)
- Clean separation (Design output → Develop input)
- No resume complexity
- UI can show each phase's results

**Implementation:**
```typescript
// Design execution
POST /api/executions {
  gate: 'Design',
  requirements: "..."
}
→ Runs designPhase
→ Outputs: PRODUCT.md content
→ Stores in execution.output

// Develop execution
POST /api/executions {
  gate: 'Develop',
  design_execution_id: 'exec-design-123',
  // Backend reads PRODUCT.md from parent execution
}
→ Runs SDIVS with PRODUCT.md as spec
→ Outputs: code changes

// Digest execution
POST /api/executions {
  gate: 'Digest',
  develop_execution_id: 'exec-develop-456'
}
→ Analyzes results, updates AGENTS.md
```

**UI Flow:**
```typescript
// After Design completes
<button onClick={async () => {
  const designResults = execution.output

  // Start new Develop execution
  const response = await fetch('/api/executions', {
    method: 'POST',
    body: JSON.stringify({
      gate: 'Develop',
      design_execution_id: designExecution.id,
      // PRODUCT.md automatically read from design execution
    })
  })

  const { runId } = await response.json()
  router.push(`/executions?runId=${runId}`)
}}>
  Ready to Develop
</button>
```

---

### **For Instructions Table**

**Simple Schema:**
```sql
CREATE TABLE instructions (
  id UUID PRIMARY KEY,
  execution_id UUID REFERENCES executions(id),
  content TEXT NOT NULL,  -- Rich text JSON: {"text":"...","mentions":[]}
  created_at TIMESTAMPTZ DEFAULT NOW()
)
```

**Why:**
- Just user inputs (simple)
- selfInstruction separate (in execution state)
- Rich text support (JSON in content)
- No state/type fields (keep minimal)

**Read Pattern:** iterationPreprocess
```typescript
iterationPreprocess = async (input, execution) => {
  // Fetch instructions submitted since last iteration
  const instructions = await fetchInstructions(execution.id)
  execution.store('instructions', 'all', instructions)

  // Latest instruction becomes context for agents
  if (instructions.length > 0) {
    execution.store('instructions', 'current', instructions[instructions.length - 1])

    // Include in Discovery agent input
    input.userInstructions = instructions.map(i => i.content)
  }

  return input
}
```

---

## 🎯 SPECIFIC IMPLEMENTATION RECOMMENDATIONS

### **1. Instructions (Immediate)**

**Do:**
- ✅ Create instructions table (simple schema)
- ✅ Implement GET/POST with persistence
- ✅ Change event types: user_otf_instruction → instruction
- ✅ Remove otf_adherence (unused)
- ✅ Rename flag: ENABLE_OTF_INSTRUCTIONS → ENABLE_INSTRUCTIONS
- ✅ Read instructions in iterationPreprocess
- ✅ Store selfInstruction in execution state
- ✅ UI listens for 'instruction' events

**Defer (for now):**
- ❌ Pause/wait mechanism (keep continuous execution)
- ❌ Can add later if needed

**Result:** Instructions work, submitted during execution affect NEXT execution or next iteration if timing aligns.

---

### **2. DDD Meta-Phases (Next Priority)**

**Do:**
- ✅ Populate .ai/PRODUCT.md template
- ✅ Register design/digest agents
- ✅ Wire phase routing based on gate
- ✅ Implement as CHAIN (new execution per phase)
- ✅ Link executions (add parent_execution_id column)

**Result:** Full Design → Develop → Digest flow working.

---

### **3. ChatGPT Feel Polish (After Core)**

**Priority order:**
1. Instructions UX (remove OTF terminology, clean input)
2. Execution detail page polish (metrics, deliverables, header)
3. Log refinement (file/tool names in titles, meta accordion)
4. Conversation history (search, sort, filter)
5. Source/attachments per pane
6. Inner waterfall smoothness

---

## 🎯 DECISION FRAMEWORK FOR YOU

**Instructions Pause/Wait:**
- **Need now?** If yes → Option B (pause per iteration)
- **Can defer?** If yes → Hybrid (continuous + critical gates)
- **Your call based on:** How important is mid-iteration steering vs fast execution?

**DDD Execution Model:**
- **Chain (Model B):** Cleaner, no resume needed, atomic phases
- **Single (Model C):** Single ID, need job queue, more complex

**Instructions Table:**
- **Simple schema** (just id, execution_id, content, created_at)
- **Rich text in content** (JSON string)
- **Read in iterationPreprocess** (fresh each iteration)

---

**Full context provided. Your architectural decisions will determine implementation path.**
