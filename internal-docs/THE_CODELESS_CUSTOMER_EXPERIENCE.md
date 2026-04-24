# THE CODELESS CUSTOMER EXPERIENCE

## Overview

Bitcode enables customers to accomplish complex software engineering tasks through natural language alone—no code required. **Executions** are the core mechanism: specified Bitcode agentic pipeline runs that measure Needs, synthesize AssetPacks, and deliver connected-interface written assets.

This document describes the complete customer experience, expectations, and flows that define the codeless interaction model.

---

## What Customers Expect

### 1. **Zero Technical Barrier**
Customers expect to describe what they want in plain English and receive working code. No need to understand:
- Git commands or GitHub APIs
- Testing frameworks or CI/CD pipelines
- Code architecture or design patterns
- Command-line tools or development environments

### 2. **Complete Visibility**
Customers expect to see:
- Real-time progress as work happens
- What agents are thinking and deciding
- File changes with visual diffs
- Credit consumption and cost transparency
- Clear validation results and quality checks

### 3. **Iterative Refinement**
Customers expect the system to:
- Automatically improve until quality standards are met
- Allow mid-execution steering and feedback
- Retry failed operations without manual intervention
- Learn from validation failures and adapt

### 4. **Professional Results**
Customers expect deliverables that include:
- Complete, tested, production-ready code
- Documentation and comments
- Adherence to existing code style
- Security and performance best practices
- Clear summaries of what was built

---

## The Four Deliverable Types

Bitcode produces four distinct deliverable types, each serving a different stage of the software development lifecycle. Customers choose the deliverable type through natural language—the system comprehends intent and selects the appropriate pipeline.

---

### Deliverable 1: Pull Request (Code Change)

**Purpose**: Transform requirements into production-ready code with tests and documentation.

**Customer Intent Examples**:
- "Add user authentication with JWT tokens"
- "Refactor the payment processing module for better error handling"
- "Implement dark mode toggle in settings"

**What Makes It Intelligent**:

**Automatic Requirement Decomposition**: System reads "Add user authentication" and autonomously determines:
- New files needed: `auth/jwt.ts`, `middleware/authenticate.ts`, `routes/auth.ts`
- Existing files to modify: `server.ts`, `types/user.ts`, `config.ts`
- Tests to generate: `auth.test.ts`, `middleware.test.ts`
- Documentation to update: `API.md`, `README.md`

**Parallel File Execution**: Implementation phase spawns concurrent agents—one per file—completing 15-file changes in the time of 3.

**Self-Validating**: Three parallel validators (discovery, implementation, meta) ensure:
- All requirements addressed
- Code style matches existing patterns
- Tests cover edge cases
- No security vulnerabilities introduced
- Performance within acceptable bounds

**Business Value**:
- **Time**: 7-15 minutes vs 2-8 hours (human)
- **Quality**: Automated validation catches issues pre-PR
- **Consistency**: Always follows project conventions
- **Completeness**: Never forgets tests or documentation

**Customer Experience Arc**:
1. **Define** (30s): Type what you want in plain English
2. **Contextualize** (30s): Attach designs, link issues, add constraints
3. **Execute** (1 click): System comprehends, plans, implements, validates
4. **Monitor** (passive): Watch real-time file diffs, agent reasoning, validation results
5. **Steer** (optional): Provide mid-execution instructions if needed
6. **Receive** (automatic): Merge-ready PR with description, code, tests, docs

**What Customer Sees**:
```
Pull Request #847: Add JWT Authentication

✓ 8 files changed
  + auth/jwt.ts (142 lines)
  + middleware/authenticate.ts (67 lines)
  + routes/auth.ts (89 lines)
  ~ server.ts (+23 -5)
  ~ types/user.ts (+15 -2)
  + tests/auth.test.ts (234 lines)
  ~ API.md (+47 -0)
  ~ README.md (+12 -0)

✓ All tests passing (127 tests, 0 failures)
✓ Security scan: No vulnerabilities
✓ Code coverage: 94% (+3%)
✓ Build successful

Summary:
Implemented JWT-based authentication system with login, logout,
and token refresh endpoints. Added middleware for route protection.
Comprehensive test coverage includes token expiry, refresh logic,
and security edge cases.

Time: 8m 34s | Credits: 67
```

---

### Deliverable 2: PR Review (Code Change Review)

**Purpose**: Comprehensive code review with inline comments, security analysis, and actionable recommendations.

**Customer Intent Examples**:
- "Review PR #456 for security vulnerabilities"
- "Check PR #789 for performance issues"
- "Review this PR for code quality and maintainability"

**What Makes It Intelligent**:

**Contextual Analysis**: System doesn't just read the diff—it:
- Analyzes base branch code to understand existing patterns
- Reviews related files not in the diff but affected by changes
- Checks issue/PR description for stated intent vs actual implementation
- Identifies breaking changes and API contract modifications

**Multi-Dimensional Review**: Single execution produces:
- **Security**: SQL injection, XSS, auth bypasses, data leaks
- **Performance**: N+1 queries, inefficient algorithms, memory leaks
- **Correctness**: Logic errors, edge cases, race conditions
- **Style**: Conventions, naming, structure, documentation
- **Testing**: Coverage gaps, missing edge cases, brittle tests

**Precise Inline Comments**: Not generic advice—specific line-level feedback:
```
auth.ts:47
❌ Token expiry not validated before refresh
Risk: Expired tokens can be refreshed indefinitely
Fix: Add `if (decoded.exp < Date.now() / 1000) throw new Error('Token expired')`
```

**Business Value**:
- **Speed**: 3-5 minutes vs 30-60 minutes (human)
- **Thoroughness**: Never misses security checks or edge cases
- **Objectivity**: No reviewer fatigue, consistent standards
- **Learning**: Team learns from detailed explanations

**Customer Experience Arc**:
1. **Specify** (15s): Provide PR number and focus areas
2. **Execute** (1 click): System fetches PR, analyzes all changes
3. **Monitor** (passive): Watch analysis progress through security, performance, correctness
4. **Receive** (automatic): Detailed review posted as PR comments

**What Customer Sees**:
```
PR #456 Review Posted

Overall Assessment: Request Changes
Risk Level: Medium
Confidence: 0.89

Findings:
🔴 3 Security Issues (1 critical, 2 medium)
🟡 4 Performance Concerns
🟢 Code Style: Excellent
🟢 Test Coverage: 92% (+5%)

Critical Issues:
1. auth.ts:47 - Token refresh without expiry validation
2. routes/payment.ts:123 - SQL injection vulnerability in query
3. middleware/cors.ts:18 - Permissive CORS allows all origins

Recommendations:
- Add token expiry checks before refresh operations
- Use parameterized queries for all database operations
- Restrict CORS to specific trusted origins
- Consider rate limiting on authentication endpoints

Files Reviewed: 12
Lines Analyzed: 1,847
Time: 4m 12s | Credits: 34
```

---

### Deliverable 3: Issue (Design Document)

**Purpose**: Structured technical specification for features, bugs, or improvements.

**Customer Intent Examples**:
- "Create an issue for implementing user profiles"
- "Document the approach for migrating to PostgreSQL"
- "Write up the technical design for real-time notifications"

**What Makes It Intelligent**:

**Codebase-Aware Specification**: System doesn't write generic issues—it:
- Analyzes existing architecture to propose aligned solutions
- Identifies files and components that will be affected
- Estimates complexity based on similar past changes
- Suggests implementation approach matching project patterns

**Stakeholder Translation**: Converts vague requirements into structured specs:
```
Customer: "We need user profiles"

System generates:
User Story: As a user, I want to create and customize my profile...
Acceptance Criteria:
  ✓ Users can upload avatar images (max 5MB, PNG/JPG)
  ✓ Profile includes displayName, bio (500 char max), location
  ✓ Privacy settings control profile visibility
  ✓ Activity history shows recent contributions
Technical Approach:
  - New table: user_profiles (see schema below)
  - S3 integration for avatar storage
  - REST endpoints: GET/PUT /api/users/:id/profile
  - React components: ProfileEditor, ProfileViewer
Affected Files:
  - database/schema.sql
  - server/routes/users.ts
  - client/components/profile/
Estimated Effort: 5-8 hours | Complexity: Medium
```

**Pre-Implementation Validation**: Before code is written, team has:
- Clear acceptance criteria
- Technical approach consensus
- Complexity estimate
- Implementation checklist

**Business Value**:
- **Clarity**: No ambiguous requirements leading to rework
- **Alignment**: Technical approach vetted before implementation
- **Planning**: Accurate estimates for sprint planning
- **Documentation**: Permanent record of design decisions

**Customer Experience Arc**:
1. **Describe** (45s): Explain feature in natural language
2. **Contextualize** (optional): Attach mockups, user stories, constraints
3. **Execute** (1 click): System researches codebase, designs approach
4. **Monitor** (passive): Watch codebase analysis and approach formulation
5. **Receive** (automatic): Complete GitHub issue with technical specification

**What Customer Sees**:
```
Issue #892: Implement User Profile System

📋 User Story
As a user, I want to create and customize my profile so that other
users can learn about me and view my contributions.

✅ Acceptance Criteria
- [ ] Users can upload avatar images (PNG/JPG, max 5MB)
- [ ] Profile includes: displayName, bio, location, joinedDate
- [ ] Privacy settings: Public, Team Only, Private
- [ ] Activity history shows recent contributions (last 30 days)
- [ ] Profile URLs: /users/:username

🏗 Technical Approach

Database Schema:
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  display_name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  location VARCHAR(100),
  privacy_level VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

API Endpoints:
- GET /api/users/:username/profile (Public read)
- PUT /api/users/me/profile (Authenticated update)
- POST /api/users/me/avatar (Multipart upload)
- DELETE /api/users/me/avatar

Frontend Components:
- ProfileEditor.tsx (Edit mode with form validation)
- ProfileViewer.tsx (Display mode with activity timeline)
- AvatarUpload.tsx (Drag-drop with preview)
- PrivacySettings.tsx (Radio group selector)

🔧 Implementation Checklist
- [ ] Create database migration for user_profiles table
- [ ] Implement S3 integration for avatar storage
- [ ] Build REST API endpoints with authentication
- [ ] Create React components with TypeScript interfaces
- [ ] Add validation (image size, bio length, display name)
- [ ] Write unit tests for API endpoints
- [ ] Write integration tests for profile CRUD
- [ ] Update API documentation

📊 Estimates
Effort: 5-8 hours
Complexity: Medium
Risk: Low
Dependencies: S3 bucket configuration

📁 Affected Files
- database/migrations/
- server/routes/users.ts
- server/middleware/upload.ts
- client/components/profile/
- client/types/user.ts
- docs/API.md

Time: 2m 47s | Credits: 23
```

---

### Deliverable 4: Issue Comment (Design Document Review)

**Purpose**: Expert feedback on technical specifications, architectural proposals, or design documents.

**Customer Intent Examples**:
- "Review Issue #892 and suggest improvements"
- "Comment on the database migration approach in Issue #543"
- "Provide feedback on this architectural proposal"

**What Makes It Intelligent**:

**Context-Aware Critique**: System doesn't comment generically—it:
- Analyzes current codebase architecture for alignment
- Identifies potential conflicts with existing systems
- Suggests alternatives based on project-specific patterns
- References relevant files and past decisions

**Multi-Perspective Analysis**:
- **Technical Feasibility**: Can this be implemented as proposed?
- **Architecture Alignment**: Does this fit existing patterns?
- **Performance Implications**: Will this scale?
- **Security Considerations**: Are there vulnerabilities?
- **Maintenance Impact**: How does this affect future changes?

**Constructive Recommendations**: Not just critique—actionable alternatives:
```
Original Proposal: "Store avatars in database as BLOBs"

System Comment:
⚠️ Database BLOB storage for avatars may cause performance issues.

Concerns:
- Increases database size (typical avatar: 200KB × 10K users = 2GB)
- Slower queries when loading user data (avatar fetched with every profile)
- Database backups become significantly larger
- CDN caching not possible with BLOB storage

Recommendation:
Store avatars in S3 with CloudFront CDN for optimal performance.

Proposed Changes:
1. Add avatar_url column instead of avatar_blob
2. Implement multipart upload to S3 in avatar endpoint
3. Generate CloudFront signed URLs for private profiles
4. Add S3 lifecycle policy to delete orphaned avatars

Example Implementation:
// server/routes/users.ts
const uploadAvatar = async (file: File, userId: string) => {
  const key = `avatars/${userId}/${Date.now()}.${ext}`;
  await s3.putObject({ Bucket: 'bitcode-avatars', Key: key, Body: file });
  return `https://cdn.bitcode.example/${key}`;
};

References:
- Similar pattern in server/routes/attachments.ts:47
- S3 config in server/config/storage.ts
- CDN setup in infrastructure/cloudfront.tf

This approach reduces database load by 95% and enables global CDN caching.
```

**Business Value**:
- **Risk Mitigation**: Catches design flaws before implementation
- **Knowledge Transfer**: Team learns from detailed explanations
- **Architecture Quality**: Maintains consistency across codebase
- **Time Savings**: Prevents rework from poor initial designs

**Customer Experience Arc**:
1. **Specify** (15s): Provide issue number and review focus
2. **Execute** (1 click): System analyzes proposal and codebase context
3. **Monitor** (passive): Watch analysis of technical approach
4. **Receive** (automatic): Detailed comment posted on GitHub issue

**What Customer Sees**:
```
Comment on Issue #892

Overall Assessment: Good proposal with some recommended improvements

✅ Strengths:
- Clear acceptance criteria and user story
- Comprehensive technical approach
- Appropriate complexity estimate
- Good test coverage planning

💡 Recommendations:

1. Avatar Storage Strategy
Current: Database BLOB storage
Suggested: S3 + CloudFront CDN
Rationale: Performance, scalability, cost (see detailed analysis below)
Impact: High | Effort: +2 hours | Risk: Low

2. Privacy Level Enforcement
Gap: No API-level privacy checks mentioned
Suggested: Middleware function validateProfileAccess(viewerId, profileId)
Location: server/middleware/privacy.ts
Impact: Medium | Effort: +1 hour | Risk: Medium (security)

3. Username vs User ID in URLs
Current: /users/:username
Consider: Username uniqueness constraints, case sensitivity
Suggested: Add unique index on LOWER(username), max length 30 chars
Impact: Low | Effort: +30min | Risk: Low

4. Activity History Performance
Gap: No indexing mentioned for activity queries
Suggested: CREATE INDEX idx_activity_user_date ON activity(user_id, created_at DESC)
Rationale: Avoid table scans on activity history (100K+ rows expected)
Impact: High | Effort: +15min | Risk: None

🏗 Architectural Alignment:
✓ Follows existing pattern in attachments system
✓ Consistent with current authentication middleware
⚠ Privacy enforcement should mirror teams privacy system (team_members.privacy_level)
✓ TypeScript interfaces align with existing user types

🔧 Additional Considerations:
- Rate limiting on avatar upload (prevent abuse)
- Image validation/sanitization (prevent malicious files)
- Avatar caching strategy (304 Not Modified responses)
- Accessibility: alt text for avatars

📊 Revised Estimates:
Original: 5-8 hours
Revised: 7-10 hours (with recommendations)
ROI: +30% implementation time, -80% future maintenance issues

Time: 3m 18s | Credits: 28
```

---

## Deliverable Type Selection: Intelligent Comprehension

**Customers don't choose deliverable types explicitly**—the system comprehends intent from natural language.

**How It Works**:

**Setup Phase → Comprehend Task Agent** analyzes the Definition of Done:

```typescript
// Customer input analysis
"Add user authentication" → Code Change (Pull Request)
"Review PR #456" → Code Change Review (PR Review)
"Create issue for profiles" → Design Document (Issue)
"Comment on Issue #892" → Design Document Review (Issue Comment)
```

**Disambiguation** when ambiguous:
```
Customer: "user profiles"

System detects ambiguity:
- Could be: Implement profiles (Pull Request)
- Could be: Design profiles (Issue)

Comprehension agent analyzes:
- Attached files? None → Likely design phase
- Complexity? High → Specification first
- Codebase readiness? Auth system not yet built → Design first

Decision: Issue (Design Document)
```

**Type Stored in Execution**:
```typescript
execution.store('task', 'deliverableType', 'PullRequest');
// Routes to deliverable pipeline with PR-specific agents
```

**Customer Transparency**:
```
✓ Task comprehended
  Type: Pull Request (Code Change)
  Scope: 8 files estimated
  Complexity: Medium
```

**Type-Specific Pipeline Routing**:
- **Pull Request**: Full SDIVS with Divide|Conquer|Correct
- **PR Review**: Analysis-focused with security/performance agents
- **Issue**: Specification-focused with architecture analysis
- **Issue Comment**: Critique-focused with alternative suggestions

---

## Core Customer Flows

### Flow 1: Creating a Pull Request (Code Change)

**Customer Journey**: "I want to add user authentication to my Express API"

#### Step 1: Select Repository
- **UI**: VCS source selectors (Provider → Account → Repo → Branch → Commit)
- **Experience**: Auto-selects first account, default branch, latest commit
- **Persistence**: Remembers selections for next time
- **Effort**: 0-3 clicks if using previous repo

#### Step 2: Define Task
- **UI**: Large, glassy textarea with enhancement option
- **Input Example**:
  ```
  Add JWT-based authentication to the Express API.
  Include login, logout, and refresh token endpoints.
  Add middleware to protect authenticated routes.
  Generate tests for all new endpoints.
  ```
- **Enhancement**: Optional AI-powered refinement of task description
- **Templates**: Can save/apply common task patterns
- **Effort**: 30-90 seconds of typing

#### Step 3: Add Context (Optional)
Customers can attach:
- **Files**: Drag-and-drop designs, specs, config files (multipart upload)
- **URLs**: Figma designs, Notion docs, external references
- **Issues/PRs**: Link to related GitHub issues or pull requests
- **Integrations**: Connect Notion, Figma, Jira resources
- **Effort**: 0-60 seconds depending on context needs

#### Step 4: Configure Execution Depth (Optional)
- **Iteration Count**: Choose 3-100 iterations or Auto-Minimize/Auto-Maximize
- **Need Measurement Evidence**: Computer-use evidence is internal, server-flagged, and not operator-visible in V26
- **UI**: Iteration controls remain the visible power-user configuration for fifth-gate V26
- **Effort**: 0-10 seconds for power users

#### Step 5: Execute
- **Action**: Click "Execute" button
- **System**: Reserves credits (100 default), starts pipeline
- **URL**: Updates to include `runId` for tracking/sharing
- **SSE Connection**: Opens for real-time streaming
- **Effort**: 1 click

#### Step 6: Monitor Progress (Real-Time)

**Setup Phase** (~30 seconds)
- Customer sees: "Setting up workspace..."
- System: Clones repo, initializes LSP, comprehends task
- Visual: Progress indicators, phase completion checkmarks

**Discovery Phase** (~1-2 minutes)
- Customer sees: Live agent logs with accordion UI
  - Gray "Thinking" sections (agent reasoning)
  - Expandable context gathering
  - Implementation plans in structured format
- System: Gathers context, understands requirements, plans approach
- Visual: Color-coded log entries, confidence scores

**Implementation Phase** (~2-4 minutes)
- Customer sees: Real-time file diffs appearing
  - Purple "Tool Use" indicators
  - Indigo file diff viewers with syntax highlighting
  - Line-by-line changes (additions in green, deletions in red)
- System: Parallel file editing (Divide → Conquer → Correct pattern)
- Visual: Multiple files being edited simultaneously

**Validation Phase** (~30-60 seconds)
- Customer sees: Three parallel validators running
  - Discovery validation (requirements met?)
  - Implementation validation (code quality?)
  - Previous iteration validation (improvements?)
  - Final "Ready to Ship" decision
- System: Quality checks, test runs, security scans
- Visual: Validation results with pass/fail indicators

**Iteration Loop** (Repeats until validation passes, max 3 times)
- Customer sees: "Iteration 2 starting..." with confidence score from previous
- System: Automatically refines based on validation feedback
- Optional: Customer can provide mid-execution instructions
- Visual: Clear iteration boundaries in log

**Shipping Phase** (~30 seconds)
- Customer sees: "Creating pull request..."
- System: Commits code, creates PR via GitHub API, generates summary
- Visual: Link to PR, final work summary
- Output: Complete pull request with description, code, tests

#### Step 7: Review Deliverable
- **GitHub PR**: Fully formed with description and changes
- **Summary**: Customer-facing explanation of what was built
- **Metrics**: Files changed, lines added/removed, credits used
- **Next Actions**: Review PR, request changes, merge

**Total Time**: ~7-10 minutes for typical PR
**Customer Active Time**: ~2-3 minutes (mostly setup)
**Lines of Code Written by Customer**: **0**

---

### Flow 2: Reviewing a Pull Request

**Customer Journey**: "I need to review PR #456 for security vulnerabilities"

#### Input
```
Review PR #456 for:
- SQL injection vulnerabilities
- Authentication bypasses
- Sensitive data exposure
- Input validation issues
```

#### Experience
- System fetches PR from GitHub automatically
- Analyzes all changed files with security focus
- Generates inline comments on specific lines
- Provides actionable recommendations
- Posts structured review to GitHub

#### Output
- Thorough security analysis as PR review comments
- Risk assessment with severity levels
- Suggested fixes with code examples
- Overall recommendation (Approve/Request Changes/Comment)

**Time**: ~3-5 minutes
**Effort**: Type requirements, click Execute, monitor

---

### Flow 3: Creating a GitHub Issue

**Customer Journey**: "Create an issue for implementing a user profile feature"

#### Input
```
Create an issue for a user profile feature that includes:
- Avatar upload
- Bio and contact info
- Privacy settings
- Activity history
```

#### Experience
- System researches existing codebase architecture
- Generates detailed issue with acceptance criteria
- Includes technical approach and implementation estimates
- Posts directly to GitHub Issues

#### Output
- Structured GitHub issue with:
  - Clear user story
  - Acceptance criteria
  - Technical approach
  - Estimated complexity
  - Related files and components

**Time**: ~2-3 minutes
**Effort**: Type requirements, execute

---

### Flow 4: DDD Gate System (Advanced Control)

**Customer Journey**: "I want collaborative control over the design phase before implementation"

The Design → Develop → Digest (DDD) gate system provides checkpoints for customer input.

#### Design Gate (Collaborative)

**System Behavior**:
- Only allowed to edit `.ai/PRODUCT.md`
- Iterates on product specification based on requirements
- Cannot touch implementation files

**Customer Experience**:
1. System generates initial PRODUCT.md with feature spec
2. Customer sees real-time spec being written
3. Customer reviews spec in UI
4. Customer provides feedback: "Add support for OAuth providers"
5. System iterates on PRODUCT.md
6. Repeat until customer is satisfied
7. **Customer clicks "Ready to Develop"**

**Transition**: Moves to Develop Gate

#### Develop Gate (Autonomous)

**System Behavior**:
- Allowed to edit all files EXCEPT `.ai/` directory
- Implements code, tests, documentation
- Runs validation checks
- Iterates until quality passes

**Customer Experience**:
1. System implements code across multiple files in parallel
2. Customer monitors real-time progress
3. Optional: Customer provides mid-execution instructions
   - "Make sure to add rate limiting to the API"
   - System incorporates feedback in next iteration
4. System validates, iterates if needed
5. **Customer clicks "Ready to Digest"**

**Transition**: Moves to Digest Gate

#### Digest Gate (Collaborative)

**System Behavior**:
- Only allowed to edit `.ai/AGENTS.md` and `.ai/PRODUCT.md`
- Documents learnings for future executions
- Captures insights about codebase and patterns
- Cannot modify implementation

**Customer Experience**:
1. System writes learnings to AGENTS.md
2. Customer reviews captured knowledge
3. Customer provides feedback: "Also note the GraphQL schema patterns"
4. System updates documentation
5. **Customer clicks "Ship" or "Another Iteration"**

**Final Transition**: Ships deliverable or returns to Design

**Value**: Customer controls critical decision points without writing code

---

### Flow 5: Mid-Execution Steering (Instructions)

**Customer Journey**: "The execution is going in the wrong direction"

#### Scenario
System is halfway through implementation, but customer realizes:
- A different approach would be better
- Requirements were misunderstood
- Additional constraints need to be applied

#### Experience

**Step 1: Instruction Prompt Appears**
After each iteration, customer sees:
```
Iteration 1 complete: 5 files changed, tests passing
Confidence: 0.7

Continue with Iteration 2?
[Submit Instruction] [No Notes - Continue]
```

**Step 2: Customer Provides Feedback**
Customer types instruction:
```
Actually, use Redis for session storage instead of JWT tokens.
This will allow us to revoke sessions server-side.
```

**Step 3: System Adapts**
- Next iteration incorporates the instruction
- Discovery phase re-plans approach
- Implementation adapts to new requirements
- Validation checks against updated criteria

**Step 4: Confirmation**
- Customer sees in logs: "Incorporating user instruction from Iteration 1..."
- System shows how it's adapting the plan
- Implementation proceeds with new direction

**Value**: Course-correct without canceling/restarting entire execution

---

## Key Customer Experiences

### Experience 1: Real-Time Streaming

**What Customer Sees**: Live, color-coded accordion log

```
[✓] Setup Phase (32s)
    └─ [Thinking] Comprehending task...
       └─ "Customer wants JWT authentication with login/logout/refresh endpoints"

[▶] Discovery Phase (1m 23s)
    ├─ [Thinking] Gathering context from existing auth files...
    │   └─ Found: src/middleware/auth.js, src/routes/users.js
    ├─ [Generation] Planning implementation approach...
    │   └─ Will create: src/auth/jwt.js, src/routes/auth.js, tests/auth.test.js
    └─ [Completion] Implementation plan ready

[▶] Implementation Phase (3m 12s)
    ├─ [Tool Use] Editing src/auth/jwt.js...
    │   └─ [File Diff]
    │       + const jwt = require('jsonwebtoken');
    │       + const generateToken = (userId) => { ... }
    ├─ [Tool Use] Creating src/routes/auth.js...
    │   └─ [File Diff] (42 lines added)
    └─ [Tool Use] Creating tests/auth.test.js...
        └─ [File Diff] (89 lines added)
```

**Technology**: Server-Sent Events (SSE) over `/api/executions/stream`

**Experience Quality**:
- No page refresh needed
- Smooth animations and transitions
- Clear visual hierarchy (phases → agents → steps)
- Expandable/collapsible sections
- Syntax-highlighted code diffs

### Experience 2: Visual File Diffs

**What Customer Sees**: Side-by-side before/after comparison

```
src/auth/jwt.js

BEFORE                          │ AFTER
────────────────────────────────┼────────────────────────────────
                                │ + const jwt = require('jsonwebtoken');
                                │ + const config = require('../config');
                                │ +
                                │ + const generateToken = (userId) => {
                                │ +   return jwt.sign(
                                │ +     { userId },
                                │ +     config.jwtSecret,
                                │ +     { expiresIn: '7d' }
                                │ +   );
                                │ + };
                                │ +
                                │ + module.exports = { generateToken };
```

**Value**: Customer understands changes without git expertise

### Experience 3: Credit Transparency

**What Customer Sees**: Real-time cost tracking

```
Credits Reserved: 100
Credits Used: 47 (47%)
Credits Remaining: 53

Breakdown:
- Setup: 3 credits
- Discovery: 12 credits
- Implementation (Iteration 1): 28 credits
- Validation: 4 credits
```

**Behavior**:
- Credits reserved before execution starts
- Real-time updates as pipeline progresses
- Automatic refund of unused credits
- No charges if execution fails early

**Value**: No surprise costs, clear pricing

### Experience 4: Templates

**What Customer Sees**: Reusable task patterns

**Saved Templates**:
- "Add API Endpoint" (Pull Request)
- "Security Review" (PR Review)
- "Feature Proposal" (Issue)
- "Bug Report" (Issue)

**Usage**:
1. Customer selects "Add API Endpoint" template
2. Pre-filled Definition of Done appears:
   ```
   Add a new REST API endpoint:
   - Define route and HTTP method
   - Implement controller logic
   - Add input validation
   - Generate tests
   - Update API documentation
   ```
3. Customer customizes as needed
4. Execute

**Value**: Consistency, speed, best practices

### Experience 5: Multimodal Context

**What Customer Attaches**: Figma design

**System Processing**:
1. Customer attaches Figma URL: `https://figma.com/file/xyz/user-profile`
2. System fetches design automatically
3. Image comprehension tool analyzes layout, colors, components
4. Implementation phase generates matching HTML/CSS/React code

**Output**: Code that matches design pixel-perfect

**Also Supported**:
- Videos → Requirements extraction
- PDFs → Documentation comprehension
- Audio → Transcription and analysis
- Screenshots → UI replication

**Value**: Customer doesn't translate designs to code manually

---

## Customer Expectations by Phase

### Setup Phase Expectations

**Customer Thinks**: "Is my repository accessible? Are there any blockers?"

**System Provides**:
- Clear progress indicators
- Repository clone status
- LSP initialization confirmation
- Task comprehension summary
- Deliverable type detection (PR/Issue/Review/Comment)

**Success Criteria**: "Workspace ready" with no errors

### Discovery Phase Expectations

**Customer Thinks**: "Does the system understand what I want?"

**System Provides**:
- Relevant files identified with reasoning
- Requirements paraphrased in structured format
- Implementation approach explained clearly
- Complexity estimation (time/credit forecast)
- Confidence score for understanding

**Success Criteria**: Customer sees accurate interpretation of requirements

### Implementation Phase Expectations

**Customer Thinks**: "Is the code being written correctly?"

**System Provides**:
- Real-time file diffs with syntax highlighting
- Clear indication of what's being changed and why
- Test generation alongside code
- Error handling and edge cases
- Adherence to existing code style

**Success Criteria**: Customer sees professional-quality code appearing

### Validation Phase Expectations

**Customer Thinks**: "Is this actually good quality?"

**System Provides**:
- Discovery validation (requirements met?)
- Implementation validation (code quality?)
- Test results (passing?)
- Security scan results
- Performance checks
- Ready-to-ship decision with reasoning

**Success Criteria**: High confidence score (>0.8) or clear issues identified

### Shipping Phase Expectations

**Customer Thinks**: "Will this integrate smoothly with my workflow?"

**System Provides**:
- Clean pull request with description
- Commits attributed appropriately
- CI/CD triggers (if configured)
- Clear summary for team review
- Links to all deliverables

**Success Criteria**: Merge-ready PR that team can review

---

## What Customers Don't Experience (Intentionally Hidden)

### 1. **Agent Orchestration Complexity**
Customers don't see:
- 63 specialized agents for code changes
- PTRR pattern (Plan → Try → Refine → Retry)
- 7-substep architecture per PTRR step
- Dynamic parallel execution coordination
- Registry-based agent loading

**Why**: Reduces cognitive load, maintains focus on outcomes

### 2. **Technical Infrastructure**
Customers don't see:
- Execution primitive system (sequential, parallel, conditional, retry)
- Storage adapters (ephemeral vs persistent)
- LLM provider switching and fallbacks
- Prompt composition (10,000+ PromptParts)
- Token optimization strategies

**Why**: Technical details irrelevant to customer goals

### 3. **Error Recovery Mechanisms**
Customers don't see:
- Automatic retry logic with exponential backoff
- Fallback strategies when agents fail
- Context truncation and chunking
- Rate limit handling
- Provider switching on errors

**Why**: System handles gracefully, customer sees smooth experience

### 4. **Cost Optimization**
Customers don't see:
- Prompt caching strategies
- Model selection per task type
- Parallel execution for cost savings
- Context minimization techniques
- Credit calculation algorithms

**Why**: Customer only cares about final cost, not optimization details

---

## Customer Success Metrics

### Speed
- **Setup**: <30 seconds
- **Discovery**: 1-2 minutes
- **Implementation**: 2-5 minutes per iteration
- **Validation**: 30-60 seconds
- **Shipping**: <30 seconds
- **Total**: 7-15 minutes for typical PR

### Quality
- **Validation Pass Rate**: >85% after iteration 1
- **Test Coverage**: Automatic test generation for new code
- **Code Style**: Matches existing patterns
- **Security**: No critical vulnerabilities
- **Documentation**: Clear comments and summaries

### Cost
- **Typical PR**: 40-80 credits (~$0.40-$0.80)
- **Complex Refactor**: 150-300 credits (~$1.50-$3.00)
- **PR Review**: 20-40 credits (~$0.20-$0.40)
- **Issue Creation**: 10-20 credits (~$0.10-$0.20)

### Satisfaction
- **Real-Time Visibility**: Customer always knows what's happening
- **Control**: Mid-execution steering and gate system
- **Predictability**: Clear iteration limits and cost caps
- **Results**: Production-ready code without manual coding

---

## Edge Cases and Customer Handling

### Scenario: Execution Fails Mid-Pipeline

**Customer Experience**:
1. Real-time log shows error clearly
2. System explains what went wrong
3. Credits automatically refunded
4. Customer receives actionable next steps

**Example Error**:
```
[Error] Implementation Phase failed
Reason: Unable to access private dependency @company/internal-lib
Resolution: Ensure repository has access to private npm registry
Credits refunded: 100 (full refund)
```

### Scenario: Unclear Requirements

**Customer Experience**:
1. System detects ambiguity during Discovery
2. Generates clarifying questions
3. Pauses execution for customer input
4. Customer provides clarification
5. Execution resumes with updated understanding

**Example**:
```
[Clarification Needed]
Your task mentions "user authentication" but doesn't specify the method.
Options: JWT tokens, session cookies, OAuth, or custom?
Please provide instruction to continue.
```

### Scenario: Very Large Changeset

**Customer Experience**:
1. System detects complexity during Discovery
2. Suggests enabling "Compute Mode" (enhanced resources)
3. Recommends higher iteration count
4. Estimates credit cost upfront
5. Customer approves or adjusts parameters

**Example**:
```
[Complexity Notice]
This task will modify 47 files across multiple directories.
Recommendation: Enable Compute Mode for faster execution
Estimated credits: 180-220 (vs 100 reserved)
Continue? [Adjust Settings] [Proceed Anyway]
```

### Scenario: External Dependency Issues

**Customer Experience**:
1. System attempts to install dependencies
2. Detects failure (private registry, incompatible versions)
3. Documents issue in validation phase
4. Provides workarounds in instruction format
5. Customer can provide credentials/fixes

**Example**:
```
[Validation Warning]
Unable to install @company/design-system@^2.0.0
This may be a private package requiring authentication.
Code changes complete, but tests cannot run without dependency.
Next steps: Configure npm auth or provide alternative package.
```

---

## Future Customer Expectations

### Collaborative Multi-User Executions
Multiple team members could:
- Watch same execution in real-time
- Provide instructions collaboratively
- Assign reviewers at gate checkpoints
- Comment on specific implementation decisions

### Learning from Past Executions
System could:
- Reference previous successful patterns
- Avoid previously failed approaches
- Reuse tested implementations
- Suggest improvements based on history

### Proactive Suggestions
System could:
- Detect code smells and suggest refactors
- Identify security vulnerabilities proactively
- Recommend performance optimizations
- Suggest test coverage improvements

### Integration Ecosystem
Customers could:
- Trigger executions from Slack/Discord
- Link to Jira tickets for context
- Pull designs from Figma automatically
- Post results to team channels

---

## Precise Definitions: Instructions System & Confidence Model

### Instructions (User-Provided Steering)

**Definition**: Natural language feedback that customers provide during or between iterations to guide the execution's next steps.

**Storage**: Database table `instructions`
```sql
CREATE TABLE instructions (
  id UUID PRIMARY KEY,
  execution_id UUID REFERENCES executions(id),
  content TEXT NOT NULL,  -- Rich text JSON or plain string
  created_at TIMESTAMPTZ DEFAULT NOW()
)
```

**Technical Implementation**: `/Users/garrettmaring/Developer/ENGI/supabase/migrations/002_instructions_table.sql:4`

**Lifecycle**:
1. Customer types instruction in UI during execution
2. Submitted via `POST /api/instructions`
3. Stored in database with `execution_id` link
4. Execution polls for new instructions via `execution.get('instructions', 'pending')`
5. Retrieved and incorporated in next iteration's context

**Example**:
```
Customer instruction: "Use Redis for session storage instead of JWT tokens"
System behavior: Next iteration incorporates this constraint in discovery and implementation
```

---

### Self-Instruction (System-Generated Prompt)

**Definition**: The system's automatically generated summary and confidence assessment after each DIV loop iteration, designed to prompt optional customer feedback.

**Generation Point**: End of Validation phase, generated by `ready-to-instruct` agent

**Technical Implementation**: `/Users/garrettmaring/Developer/ENGI/packages/pipelines/deliverable/src/agents/validation/deliverable-pipeline-ready-to-instruct-agent.ts:1`

**Structure**:
```typescript
{
  selfInstructConfidence: number,      // 0.0-1.0
  readyToInstruct: boolean,            // true if confidence < 0.6
  confidenceFactors: {
    issuesResolved: number,            // 0.0-1.0
    progressMade: number,              // 0.0-1.0
    complexityHandled: number,         // 0.0-1.0
    remainingWork: number              // 0.0-1.0 (inverse)
  },
  instructionSuggestions: string[],    // What customer could specify
  uncertainAreas: string[],            // Where AI is uncertain
  shouldContinueIterating: boolean,
  summary: string                      // Human-readable summary
}
```

**Storage**: Execution state, not database
```typescript
execution.store('agent', 'selfInstructConfidence', 0.7);
execution.store('agent', 'readyToInstruct', true);
execution.store('validation', 'instructionSuggestions', [...]);
```

**Purpose**: Transparency into system's confidence and opportunity for steering

---

### Notes vs No Notes

**"Notes" (Providing Instruction)**:
- Customer types feedback in instruction input field
- Submits instruction that will be incorporated in next iteration
- Execution continues after timer expires OR customer submits

**"No Notes" (Explicit Skip)**:
- Customer clicks "No Notes" button
- Signals: "I have no feedback, proceed immediately"
- Skips remaining timer countdown
- Execution continues to next iteration without waiting

**Technical Implementation**: `/Users/garrettmaring/Developer/ENGI/packages/pipelines-generics/src/executors/wait-for-instruction.ts:64`

```typescript
// "No Notes" button handler
const skipSignal = execution.get('instructions', 'skip');
if (skipSignal) {
  execution.store('instructions', 'skip', null);  // Clear
  execution.store('pipeline', 'awaitingInstruction', false);
  return input;  // Proceed without instruction
}
```

**Customer Experience**:
```
[Instruction Prompt Appears]
"Iteration 1 complete. Confidence: 0.7"
Timer: 2:00... 1:59... 1:58...

Options:
1. Type instruction → System waits for submission → Proceeds with instruction
2. Click "No Notes" → Timer stops → Proceeds immediately without instruction
3. Wait for timer → Timer expires → Proceeds without instruction
```

---

### Confidence Score

**Definition**: A numerical value (0.0-1.0) representing the system's confidence that the current iteration's results are ready to proceed to the next phase without additional customer guidance.

**Scale**:
- **1.0 (Total Confidence)**: Perfect execution, all requirements met, no issues, ready to ship
- **0.8-1.0 (High Confidence)**: Minor issues only, safe to proceed autonomously
- **0.4-0.8 (Medium Confidence)**: Some uncertainty, instruction may help but not required
- **0.0-0.4 (Low Confidence)**: Significant uncertainty, instruction recommended
- **0.0 (No Confidence)**: Must interact, cannot proceed autonomously (gate checkpoint)

**Calculation**: `/Users/garrettmaring/Developer/ENGI/packages/pipelines/deliverable/src/agents/validation/deliverable-pipeline-ready-to-instruct-agent.ts:39`

```typescript
confidenceFactors: {
  issuesResolved: 0.9,      // 90% of validation issues fixed
  progressMade: 0.8,        // 80% of planned work completed
  complexityHandled: 0.7,   // 70% of complexity addressed
  remainingWork: 0.3        // 30% work remaining (inverse)
}

// Weighted average:
selfInstructConfidence = (
  issuesResolved * 0.3 +
  progressMade * 0.3 +
  complexityHandled * 0.2 +
  (1 - remainingWork) * 0.2
) = 0.73
```

**Impact on Behavior**:
- **confidence >= 0.8**: No instruction prompt, auto-proceed to next iteration
- **0.6 <= confidence < 0.8**: Show instruction prompt with medium urgency timer
- **0.0 < confidence < 0.6**: Show instruction prompt with high urgency timer
- **confidence === 0.0**: MUST WAIT for customer decision, no auto-proceed

**UI Mapping**: `/Users/garrettmaring/Developer/ENGI/uapi/components/base/bitcode/execution/InstructionConfidenceTimer.tsx:49`

```typescript
confidenceConfig = {
  high: {     // confidence >= 0.8
    color: 'emerald',
    label: 'High Confidence',
    description: 'Agent proceeding optimally'
  },
  medium: {   // 0.4 <= confidence < 0.8
    color: 'sky',
    label: 'Medium Confidence',
    description: 'Guidance may help'
  },
  low: {      // confidence < 0.4
    color: 'amber',
    label: 'Low Confidence',
    description: 'Instruction recommended'
  }
}
```

---

### Confidence Countdown Timer

**Definition**: A visual countdown that shows customers how much time remains before the system proceeds autonomously to the next iteration.

**Duration Calculation**: `/Users/garrettmaring/Developer/ENGI/packages/pipelines-generics/src/executors/wait-for-instruction.ts:19`

```typescript
function calculateInstructionTimeout(confidence: number): number {
  if (confidence === 0) return Infinity;  // Must interact, no timeout

  const baseTime = 200;  // seconds at confidence ~0
  const minTime = 20;    // seconds at confidence 1
  const k = 3;           // Decay rate

  // Soft exponential inverse: higher confidence = shorter timer
  const seconds = minTime + (baseTime - minTime) * Math.exp(-k * confidence);
  return seconds * 1000;  // Convert to ms
}
```

**Examples**:
- **confidence = 0.0**: `Infinity` (must interact, timer shows "∞" or "Waiting...")
- **confidence = 0.3**: ~186 seconds (~3:06 minutes)
- **confidence = 0.5**: ~113 seconds (~1:53 minutes)
- **confidence = 0.7**: ~45 seconds (~0:45 minutes)
- **confidence = 0.9**: ~24 seconds (~0:24 minutes)
- **confidence = 1.0**: ~20 seconds (minimum)

**Behavior**:
1. Timer starts when self-instruction is generated
2. Counts down visually in UI
3. Color changes based on urgency:
   - Green/Emerald: >30% time remaining
   - Amber: 10-30% time remaining
   - Red: <10% time remaining
4. Three exit conditions:
   - **Customer provides instruction**: Timer stops, execution proceeds with instruction
   - **Customer clicks "No Notes"**: Timer stops, execution proceeds immediately
   - **Timer expires**: Execution proceeds autonomously without instruction

**UI Implementation**: `/Users/garrettmaring/Developer/ENGI/uapi/components/base/bitcode/execution/InstructionConfidenceTimer.tsx:70`

```typescript
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
  // Examples: "2:00", "1:37", "0:45", "0:03"
};
```

**Progress Bar**: Shows elapsed time as percentage
```typescript
const urgency = 1 - (timeRemaining / initialTimeRemaining);
// urgency = 0.0 (just started) to 1.0 (expired)
```

---

### Total Confidence (1.0)

**Definition**: Perfect confidence score indicating the system has complete certainty that the deliverable is production-ready and all requirements are fully satisfied.

**Meaning**:
- All validation checks passed with zero issues
- All requirements comprehensively met
- No uncertainty or ambiguity remaining
- Code quality exceeds standards
- Tests comprehensive and passing
- Ready to ship immediately

**Behavior**:
- No instruction prompt shown
- Minimal timer (20 seconds minimum)
- System proceeds directly to Shipping phase
- Customer sees: "High Confidence - Agent proceeding optimally"

**Rare in Practice**: Typically confidence is 0.85-0.95 even for excellent executions due to:
- Inherent uncertainty in software engineering
- Possibility of edge cases
- Conservative estimation by validation agents

**Example Scenario**:
```
Iteration 3 complete:
- Discovery validation: 100% requirements met
- Implementation validation: Zero syntax errors, all patterns correct
- Test validation: 100% coverage, all passing
- Ready-to-ship assessment: Production-ready

→ selfInstructConfidence = 1.0
→ System shows: "Execution complete, shipping deliverable"
→ Proceeds immediately to create PR
```

---

### No Confidence (0.0)

**Definition**: Zero confidence score indicating the system CANNOT proceed autonomously and MUST have customer interaction to continue.

**Meaning**:
- Critical decision point (gate checkpoint)
- System needs explicit approval or direction
- Not a failure—intentional pause for collaboration
- Used at Design and Digest gates in DDD system

**Behavior**:
- Execution PAUSES (does not auto-proceed)
- Timer shows "∞" or "Waiting for decision"
- System WAITS indefinitely until customer interacts
- Customer MUST either:
  - Provide instruction with guidance
  - Click "Proceed" / "Ready to [Next Phase]"
  - Click "Ship" (at final gate)

**Technical Implementation**: `/Users/garrettmaring/Developer/ENGI/packages/pipelines-generics/src/executors/wait-for-instruction.ts:20`

```typescript
if (confidence === 0) return Infinity;  // Must interact, no timeout
```

**Use Cases**:

1. **Design Gate** (After Setup, Before Discovery):
```
ready-to-iterate confidence = 0.0
Message: "PRODUCT.md specification complete. Review and approve to proceed."
Customer must: Review .ai/PRODUCT.md → Click "Ready to Develop"
```

2. **Digest Gate** (After Validation, Before Shipping):
```
ready-to-ship confidence = 0.0
Message: "Implementation complete. Review AGENTS.md learnings and approve to ship."
Customer must: Review .ai/AGENTS.md → Click "Ready to Ship"
```

3. **Critical Ambiguity**:
```
ready-to-instruct confidence = 0.0
Message: "Unable to determine authentication approach. Instruction required."
Customer must: Provide clarifying instruction
```

**Customer Experience**:
```
[Execution Paused]
Phase: Design → Develop transition
Status: Awaiting customer decision
Confidence: 0.0 (Must interact)

.ai/PRODUCT.md has been generated with feature specification.
Please review and approve to proceed to implementation.

[Review PRODUCT.md] [Ready to Develop]
```

**Key Distinction from Low Confidence (<0.4)**:
- **Low Confidence (0.1-0.4)**: System CAN proceed after timer, but recommends instruction
- **No Confidence (0.0)**: System CANNOT proceed, MUST wait for customer

**File Reference**: `/Users/garrettmaring/Developer/ENGI/internal-docs/EXECUTIONS.md:399`

---

### Timer-to-Progress Mechanism

**Definition**: The system by which the countdown timer governs whether and when the execution proceeds to the next iteration.

**Three Modes**:

#### Mode 1: Auto-Progress (High Confidence >= 0.8)
- No instruction prompt shown
- No timer needed
- System proceeds immediately after validation
- Customer sees completion notification but no pause

#### Mode 2: Optional Instruction (Medium/Low Confidence 0.0 < c < 0.8)
- Instruction prompt shown with timer
- Timer duration based on confidence (lower = longer)
- Execution waits for: instruction OR "No Notes" OR timer expiry
- After any of those three events: execution proceeds to next iteration

**Pseudocode**:
```typescript
const timeout = calculateInstructionTimeout(confidence);  // e.g., 120 seconds
const startTime = Date.now();

while (true) {
  // Check for instruction submission
  if (newInstructionExists()) {
    return proceedWithInstruction();
  }

  // Check for "No Notes" skip
  if (noNotesClicked()) {
    return proceedImmediately();
  }

  // Check timer expiry
  if (Date.now() - startTime > timeout) {
    return proceedWithoutInstruction();
  }

  // Wait and check again
  await sleep(100ms);
}
```

#### Mode 3: Must Interact (No Confidence = 0.0)
- Instruction prompt shown with "∞" timer
- Execution BLOCKS indefinitely
- Only exits when customer provides instruction or clicks gate transition button
- No auto-progress possible

**File Reference**: `/Users/garrettmaring/Developer/ENGI/packages/pipelines-generics/src/executors/wait-for-instruction.ts:36`

---

### Summary Table

| Term | Type | Range | Storage | Purpose |
|------|------|-------|---------|---------|
| **Instruction** | User Input | N/A (text) | Database (`instructions` table) | Customer steering during execution |
| **Self-Instruction** | System Output | N/A (object) | Execution state | System's confidence assessment and prompt |
| **Confidence** | Numeric Score | 0.0-1.0 | Execution state | System's certainty level |
| **Timer** | Duration | 20s-∞ | Calculated, UI only | Countdown to auto-progress |
| **Total Confidence** | Score | 1.0 | Execution state | Perfect certainty, immediate progress |
| **No Confidence** | Score | 0.0 | Execution state | Must interact, infinite wait |
| **Notes** | User Action | N/A | Database | Provide instruction |
| **No Notes** | User Action | N/A | Execution state signal | Skip instruction, proceed now |

---

### Customer-Facing Language

**What Customer Sees** (not technical terms):

Instead of "selfInstructConfidence = 0.7", customer sees:
```
Iteration 1 Complete
✓ 3 files changed
✓ Tests passing
⚠ Medium confidence - guidance may help

Time remaining: 1:53

Suggestions:
- Specify error handling approach
- Clarify logging requirements

[Provide Instruction] [No Notes - Continue]
```

Instead of "confidence = 0.0", customer sees:
```
Design Phase Complete
📄 Product specification ready

Please review .ai/PRODUCT.md and approve to proceed to implementation.

[Review Specification] [Ready to Develop]
```

**Key Principle**: Technical precision in implementation, human clarity in presentation.

---

## Conclusion

The codeless customer experience is built on three pillars:

1. **Natural Language Interface**: Customers describe intent, system handles technical execution
2. **Real-Time Visibility**: Every step visible, every decision explained
3. **Intelligent Automation**: Multi-agent orchestration with quality assurance built-in

**Executions** are the mechanism that makes this possible—transforming requirements into production-ready code through hierarchical, iterative, validated pipeline runs, all without the customer writing a single line of code.

**Customer writes**: 0 lines of code
**System produces**: Complete, tested, production-ready deliverables
**Time to value**: 7-15 minutes
**Experience**: Professional, transparent, predictable
