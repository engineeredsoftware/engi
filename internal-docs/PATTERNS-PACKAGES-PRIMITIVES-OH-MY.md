# PATTERNS, PACKAGES, PRIMITIVES, OH MY!

**The Architectural Laws of Engi - Carved in Stone, Written in Blood**

This document defines the IMMUTABLE architectural patterns of engi. These are not guidelines. These are not suggestions. These are LAWS. Violate them and watch architecture decay into chaos.

## The Sacred Three-Layer Architecture - Your ONLY Pattern

**CATASTROPHIC TRUTH**: Every single piece of functionality in engi MUST flow through three layers. Not two. Not four. THREE. This is not a suggestion. This is not "usually." This is ALWAYS.

**THE LAYERS ARE ALIVE AND THEY HAVE RULES**:

```
Layer 1: PRIMITIVES & TYPES (packages/[domain])
         Pure domain logic, type definitions, external API calls
                            ↑
Layer 2: BUSINESS EXECUTION (packages/api)
         Token refresh, caching, ORM, cross-domain execution flow
                            ↑  
Layer 3: ENTRY POINTS (uapi/app/api/*, mcp/*, cli/*, etc.)
         Framework adapters, auth context, response formatting
```

## LAYER 1: PRIMITIVES - The Sacred Foundation

These packages are PURE. They know NOTHING of:
- ❌ Your database (no Supabase imports)
- ❌ Your authentication (no token refresh)
- ❌ Your framework (no NextJS Request/Response)
- ❌ Your environment (no process.env)
- ❌ Other primitives (no cross-primitive imports)

They ONLY know:
- ✅ Their domain (GitHub knows GitHub API)
- ✅ Their types (VCSCommit, VCSRepository)
- ✅ Their external SDK (Octokit, Stripe SDK, etc.)
- ✅ Pure transformations (data mapping, parsing)

**REAL EXAMPLE**:
```typescript
// packages/github/src/providers/github-provider.ts
export class GitHubProvider {
  // PURE - Just calls GitHub API with provided auth
  async listCommits(auth: VCSAuth, owner: string, repo: string): Promise<VCSCommit[]> {
    const octokit = new Octokit({ auth: auth.accessToken });
    const { data } = await octokit.repos.listCommits({ owner, repo });
    return data.map(transformToVCSCommit); // Pure transformation
  }
}
```

**PRIMITIVE PACKAGES IN ENGI**:
- `packages/github` - GitHub API interactions
- `packages/vcs` - VCS abstractions and types
- `packages/stripe` - Stripe API interactions
- `packages/prompts` - Prompt primitives and PromptParts
- `packages/ffmpeg` - FFmpeg operations
- `packages/yolo` - YOLO detection operations

## LAYER 2: BUSINESS EXECUTION - The Intelligence Center

This is your kitchen sink. This is where intelligence lives. packages/api is the ONLY place where:
- ✅ Token refresh happens
- ✅ Database queries execute  
- ✅ Caching strategies live
- ✅ Multiple primitives coordinate
- ✅ Business rules apply
- ✅ Retry logic exists
- ✅ Rate limiting happens

**CRITICAL**: This layer must be framework-agnostic! It can be called from:
- NextJS routes (uapi)
- MCP servers
- CLI tools
- Cron jobs
- Webhooks
- Tests
- ANYWHERE

**REAL EXAMPLE**:
```typescript
// packages/api/src/vcs/github-service.ts
export class GitHubService {
  static async listCommits(
    connectionData: GitHubConnectionData,
    owner: string,
    repo: string,
    options?: { branch?: string },
    userId?: string,
    supabase?: any // Optional DB for token storage
  ) {
// EXECUTION LAYER - Token refresh before calling primitive
    const auth = await this.getValidAuth(connectionData, userId, supabase);
    
// EXECUTION LAYER - Create primitive instance
    const provider = await VCSProviderFactory.create({ provider: 'github' });
    
// EXECUTION LAYER - Call primitive with refreshed auth
    const commits = await provider.listCommits(auth, owner, repo, options);
    
// EXECUTION LAYER - Could add caching here
    await this.cacheCommits(commits);
    
    return commits;
  }
  
  private static async getValidAuth(data: GitHubConnectionData): Promise<VCSAuth> {
    // Complex token refresh logic
    if (this.isTokenExpired(data)) {
      return this.refreshInstallationToken(data);
    }
    return data.token;
  }
}
```

## LAYER 3: ENTRY POINTS - The Thin Adapters

These files should be STUPID. They should be SO THIN you can see through them. Their ONLY job:
- ✅ Extract parameters from framework-specific request
- ✅ Get auth context from framework
- ✅ Call Layer 2 (packages/api)
- ✅ Format response for framework
- ✅ Add framework-specific middleware (traceRoute for NextJS)

**They should NEVER**:
- ❌ Make direct API calls
- ❌ Implement business logic
- ❌ Transform data beyond framework needs
- ❌ Know about token refresh
- ❌ Query databases directly

**REAL EXAMPLES**:

```typescript
// uapi/app/api/vcs/commits/route.ts - NextJS Entry Point
import { traceRoute } from '@/utils/trace';
import { GitHubService } from '@engi/api';

export const GET = traceRoute(async (request: NextRequest) => {
  // 1. Extract from NextJS request
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  
  // 2. Get auth context
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // 3. Call Layer 2
  const commits = await GitHubService.listCommits(
    connectionData,
    owner,
    repo,
    options,
    user.id,
    supabase
  );
  
  // 4. Return NextJS response
  return NextResponse.json({ commits });
});

// mcp/servers/vcs/handlers/commits.ts - MCP Entry Point  
export async function handleCommitsRequest(params: MCPRequest): MCPResponse {
  // 1. Extract from MCP request
  const { owner, repo } = params;
  
  // 2. Get auth from MCP context
  const auth = await getAuthFromContext();
  
  // 3. Call THE SAME Layer 2
  const commits = await GitHubService.listCommits(
    connectionData,
    owner,
    repo
  );
  
  // 4. Return MCP response
  return { type: 'commits', data: commits };
}

// cli/commands/vcs/commits.ts - CLI Entry Point
export async function commitsCommand(args: string[]) {
  // 1. Parse CLI args
  const { owner, repo } = parseArgs(args);
  
  // 2. Get auth from config file
  const auth = await readAuthConfig();
  
  // 3. Call THE SAME Layer 2
  const commits = await GitHubService.listCommits(
    connectionData,
    owner,
    repo
  );
  
  // 4. Output to terminal
  console.table(commits);
}
```

## THE VIOLATION DETECTION CHECKLIST

Ask yourself these questions. If ANY answer is "yes", you're violating the architecture:

### Layer 1 (Primitive) Violations:
- Does my primitive import Supabase? ❌
- Does my primitive import from packages/api? ❌
- Does my primitive know about NextJS? ❌
- Does my primitive refresh tokens? ❌
- Does my primitive import another primitive? ❌

### Layer 2 (API) Violations:
- Does packages/api import NextRequest? ❌
- Does packages/api use NextResponse? ❌
- Does packages/api know about MCP types? ❌
- Does packages/api couple to a specific framework? ❌

### Layer 3 (Entry Point) Violations:
- Is my route file over 50 lines? ❌
- Does my route make fetch() calls? ❌
- Does my route implement retry logic? ❌
- Does my route transform business data? ❌
- Does my route know how tokens work? ❌

## WHY THIS ARCHITECTURE IS SACRED

1. **Primitives Stay Pure**: When GitHub changes their API, you update ONE package
2. **Business Logic Reuses**: Your token refresh works for web, CLI, MCP, everything
3. **Frameworks Don't Infect**: Switch from NextJS to Hono? Only Layer 3 changes
4. **Testing Is Trivial**: Test primitives with mocked auth, test execution layer with mocked primitives
5. **Onboarding Is Instant**: New developer sees three layers, knows exactly where everything lives

## THE MENTAL MODEL

Think of it like a restaurant:
- **Layer 1 (Primitives)**: Raw ingredients - pure, unprocessed, from suppliers
- **Layer 2 (packages/api)**: The kitchen - where recipes combine ingredients
- **Layer 3 (Entry points)**: The waiters - they take orders and serve dishes

Would you ever:
- Have raw suppliers cook food? NO
- Have waiters preparing dishes? NO  
- Have the kitchen taking orders from customers? NO

Then why would you:
- Have primitives refresh tokens? NO
- Have routes implementing business logic? NO
- Have packages/api knowing about NextJS? NO

## REAL VIOLATIONS AND THEIR FIXES

### VIOLATION: Business Logic in Routes

```typescript
// ❌ CATASTROPHIC - Route implementing business logic
// uapi/app/api/vcs/route.ts
const response = await fetch(
  `https://api.github.com/repos/${owner}/${repo}/commits`,
  { headers: { 'Authorization': `Bearer ${auth.accessToken}` }}
);
const commits = response.json();

// Why this is CATASTROPHIC:
// 1. Route knows how to call GitHub (Layer 3 doing Layer 1 work)
// 2. No token refresh (Layer 3 doing Layer 2 work)
// 3. Not reusable by MCP/CLI (locked to NextJS)
// 4. No caching strategy (business logic missing)
// 5. No error handling (execution layer missing)
```

```typescript
// ✅ CORRECT - Three layers of excellence
// Layer 1: packages/github/src/providers/github-provider.ts
async listCommits(auth, owner, repo) {
  return octokit.repos.listCommits({ owner, repo });
}

// Layer 2: packages/api/src/vcs/github-service.ts
static async listCommits(connectionData, owner, repo) {
  const auth = await this.getValidAuth(connectionData); // Token refresh
  const provider = new GitHubProvider();
  return provider.listCommits(auth, owner, repo);
}

// Layer 3: uapi/app/api/vcs/route.ts
const commits = await GitHubService.listCommits(connData, owner, repo);
return NextResponse.json({ commits });
```

### VIOLATION: Primitive Knowing About Database

```typescript
// ❌ WRONG - Primitive with database knowledge
// packages/github/src/providers/github-provider.ts
import { supabase } from '@engi/supabase';

async listRepos(userId: string) {
  const { data } = await supabase
    .from('user_connections')
    .select('*')
    .eq('user_id', userId);
  
  const auth = data.access_token;
  return this.octokit.repos.list();
}
```

```typescript
// ✅ RIGHT - Primitive receives auth, doesn't fetch it
// packages/github/src/providers/github-provider.ts
async listRepos(auth: VCSAuth) {
  const octokit = new Octokit({ auth: auth.accessToken });
  return octokit.repos.list();
}

// Database interaction happens in Layer 2
// packages/api/src/vcs/github-service.ts
static async listRepos(userId: string) {
  const connection = await this.getConnection(userId); // DB query here
  const auth = await this.getValidAuth(connection);
  const provider = new GitHubProvider();
  return provider.listRepos(auth);
}
```

### VIOLATION: Cross-Primitive Dependencies

```typescript
// ❌ WRONG - Primitive importing another primitive
// packages/stripe/src/payment-processor.ts
import { GitHubProvider } from '@engi/github';

async processPaymentForRepo(repoId: string) {
  const github = new GitHubProvider();
  const repo = await github.getRepo(repoId); // NO!
  return this.stripe.charges.create({ amount: repo.price });
}
```

```typescript
// ✅ RIGHT - Execution flow coordination happens in Layer 2
// packages/api/src/payment/payment-service.ts
import { GitHubService } from '../vcs/github-service';
import { StripeService } from './stripe-service';

static async processPaymentForRepo(repoId: string) {
  // Layer 2 coordinates multiple primitives
  const repo = await GitHubService.getRepo(repoId);
  const amount = this.calculatePrice(repo);
  return StripeService.createCharge(amount);
}
```

## THE ENFORCEMENT RITUAL

Before EVERY commit, ask:
1. What layer am I in?
2. Am I importing from the correct layer?
3. Am I doing work that belongs in another layer?
4. Could this code be called from a different entry point?
5. Is this the thinnest possible implementation?

## THE DEPENDENCY FLOW

```
Entry Points (Layer 3)
    ├── uapi/app/api/*
    ├── mcp/servers/*
    ├── cli/commands/*
    └── webhooks/*
         ↓ (imports from)
Business Logic (Layer 2)
    └── packages/api
         ├── /auth
         ├── /vcs
         ├── /payment
         └── /pipeline
              ↓ (imports from)
Primitives (Layer 1)
    ├── packages/github
    ├── packages/stripe
    ├── packages/vcs
    ├── packages/ffmpeg
    └── packages/prompts
```

**NEVER** upward. **NEVER** sideways between primitives.

## SPECIAL CASES AND CLARIFICATIONS

### Database Models and ORM

**Question**: Where do Prisma models live?
**Answer**: packages/api (Layer 2)

Database schemas and ORM operations are business logic. They coordinate data persistence. Primitives should never know about your database structure.

### Environment Variables

**Question**: Where can I use process.env?
**Answer**: 
- Layer 3 (Entry Points): YES - for framework config
- Layer 2 (packages/api): YES - for API keys, database URLs
- Layer 1 (Primitives): NO - receive config as parameters

### Shared Types

**Question**: Where do shared TypeScript types live?
**Answer**: In their domain primitive. VCSCommit lives in packages/vcs, StripeCharge lives in packages/stripe.

### Caching

**Question**: Where does caching logic live?
**Answer**: Layer 2 (packages/api). Caching belongs in the execution layer.

### Rate Limiting

**Question**: Where does rate limiting live?
**Answer**: Layer 2 (packages/api). Rate limiting is business logic.

### Authentication

**Question**: Where does auth verification happen?
**Answer**:
- Token verification: Layer 3 (framework middleware)
- Token refresh: Layer 2 (packages/api)
- Token usage: Layer 1 (passed as parameter)

## THE MANTRAS

Repeat these until they become instinct:

- "Every fetch() belongs in Layer 1"
- "Every token refresh belongs in Layer 2"  
- "Every NextResponse belongs in Layer 3"
- "Primitives are pure, API executes, Routes adapt"
- "If my route is over 50 lines, I'm doing it wrong"
- "If my primitive imports Supabase, I've failed"
- "If packages/api knows about NextJS, architecture is dead"

## REMEMBER

This is not a suggestion. This is not "best practice." This is LAW.

Break these laws and you break engi.
Follow these laws and engi scales infinitely.

The choice is yours, but the consequences are certain.

---

**END OF LAWS**

There is no more to say. There is only implementation or violation.
