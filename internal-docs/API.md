# Bitcode V26 API Architecture

## Overview

The Bitcode API provides RESTful endpoints for the V26 intelligence amplification system. The API is built with Next.js App Router, TypeScript, and Supabase, with clear separation between current V26 surfaces and later-gate features.

## API Design Principles

### Core Principles
1. **Type Safety**: Full TypeScript with strict types from database to response
2. **Consistency**: Uniform response shapes and error handling
3. **Security**: Row Level Security (RLS) with auth tokens
4. **Performance**: Streaming for long operations, pagination for lists
5. **Clarity**: GA-1 features work, post-GA-1 features return 501

### Response Standards

#### Success Response
```typescript
{
  success: true,
  data: T,
  metadata?: {
    requestId: string,
    duration: number,
    pagination?: {
      page: number,
      perPage: number,
      total: number,
      totalPages: number
    }
  }
}
```

#### Error Response
```typescript
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: unknown,
    statusCode: number
  }
}
```

#### Post-GA-1 Feature Response (501)
```typescript
{
  error: 'Feature not available',
  message: 'Organizations and teams is planned for Q2 2025',
  status: 'POST_GA1_FEATURE',
  ga1_release: '2025-01',
  planned_release: 'Q2 2025'
}
```

## GA-1 Active Endpoints

### Authentication & User Management

#### `POST /api/auth/[...nextauth]`
NextAuth.js authentication endpoints for OAuth providers.

#### `GET /api/user/profile`
Returns authenticated user's profile.
```typescript
Response: Tables<'user_profiles'>
```

#### `PATCH /api/user/profile`
Updates user profile fields.
```typescript
Body: Partial<Tables<'user_profiles'>>
Response: Tables<'user_profiles'>
```

#### `GET /api/user/credits`
Returns user's credit balance and usage history.
```typescript
Response: {
  balance: number,
  total_purchased: number,
  total_used: number,
  recent_usage: Tables<'user_credit_usages'>[]
}
```

### Stripe Payments Integration

#### `POST /api/stripe/create-checkout-session`
Creates Stripe checkout session for credit purchase.
```typescript
Body: { 
  priceId: string  // Stripe price ID for credit package
}
Response: { 
  sessionId: string,  // Stripe checkout session ID
  url: string        // Redirect URL for Stripe Checkout
}
```

#### `POST /api/stripe/webhook`
Webhook endpoint for Stripe events processing.
```typescript
Headers: { 'stripe-signature': string }
Body: Stripe event payload
Response: { received: true }
Note: Processes checkout.session.completed events to add credits
```

#### `GET /api/user/model-preferences`
Returns user's LLM model preferences.
```typescript
Response: Tables<'user_model_preferences'>[]
```

#### `PUT /api/user/model-preferences`
Updates model preferences.
```typescript
Body: {
  model_provider: string,
  model_name: string,
  is_default: boolean
}
```

### VCS Integration (GitHub Only for GA-1)

#### `GET /api/vcs/github/repositories`
Lists user's GitHub repositories.
```typescript
Response: Tables<'vcs_repositories'>[]
```

#### `GET /api/vcs/github/branches?repo={repo_full_name}`
Lists branches for a repository.
```typescript
Response: {
  name: string,
  commit: { sha: string, url: string },
  protected: boolean
}[]
```

#### `GET /api/vcs/github/files?repo={repo}&path={path}`
Gets file contents from repository.
```typescript
Response: {
  path: string,
  content: string,
  encoding: string,
  size: number
}
```

#### `POST /api/vcs/github/oauth`
Initiates GitHub OAuth flow.

#### `GET /api/vcs/github/callback`
Handles GitHub OAuth callback.

### Deliverables Pipeline

#### `GET /api/executions` (Unified)
Lists user's deliverables.
```typescript
Query: {
  status?: 'draft' | 'active' | 'completed' | 'archived',
  limit?: number,
  offset?: number
}
Response: Tables<'deliverables'>[]
```

#### `POST /api/executions` (Unified)
Creates a new deliverable.
```typescript
Body: {
  task: string,
  repoOwner: string,
  repoName: string,
  repoBranch?: string,
  templateId?: string,
  modelProvider?: string,
  modelId?: string
}
Response: {
  deliverable: Tables<'deliverables'>,
  run: Tables<'executions'>
}
```

#### `GET /api/executions/history?type=pipeline:deliverables`
Returns execution history (GA‑1 ships deliverables only; other types are feature-flagged and route back to this endpoint).
```typescript
Response: Tables<'executions'>[]
```

#### `GET /api/executions/history/{runId}?type=...`
Returns specific run details with events.
```typescript
Response: {
  run: Tables<'executions'>,
  events: Tables<'execution_events'>[],
  phases: Tables<'phase_executions'>[]
}
```

#### `GET /api/executions/stream?type=...&runId=...`
Server-Sent Events stream for real-time updates.
```typescript
Stream Events: {
  type: 'status' | 'progress' | 'data' | 'completion' | 'error',
  data: unknown,
  timestamp: string
}
```

Notes:
- On `type: 'completion'` events, the payload includes `result.summary`, `result.processingStats`, and `result.repoSnapshot`.
- `result.processingStats` may include `tokens: { input, output, total }` and `credits` when available (deliverables).
- The UI stream parser also maps `result.actions` into a normalized `deliverables` shape for consistent rendering (PR/reviews/comments/issues/files).

#### `DELETE /api/executions/{runId}?type=pipeline:deliverables`
Cancels an active pipeline execution.
```typescript
Response: { success: true, runId: string, status: 'cancelled' }
```

### Pipeline Execution

#### `GET /api/runs/{runId}`
Returns run details.
```typescript
Response: Tables<'executions'>
```

#### `POST /api/runs/{runId}/otf_instructions`
Adds on-the-fly instructions to a running pipeline.
```typescript
Body: {
  instruction_type: string,
  instruction_data: unknown
}
```

#### `GET /api/phases/stream`
Streams phase execution updates.

#### `GET /api/assets/stream`
Streams generated asset notifications.

### Infrastructure

#### `GET /api/notifications`
Lists user notifications.
```typescript
Query: {
  unread_only?: boolean,
  limit?: number
}
Response: Tables<'notifications'>[]
```

#### `PATCH /api/notifications/{notificationId}`
Marks notification as read.

#### `GET /api/health`
Health check endpoint.
```typescript
Response: {
  status: 'ok' | 'degraded' | 'down',
  version: string,
  services: {
    database: { status: string, latency: number },
    redis: { status: string },
    github: { status: string }
  }
}
```

### Payments

#### `POST /api/stripe`
Stripe webhook handler for payment events.

#### `POST /api/create-checkout-session`
Creates Stripe checkout session for credit purchases.
```typescript
Body: {
  amount: number,
  success_url: string,
  cancel_url: string
}
Response: {
  sessionId: string,
  url: string
}
```

## Post-GA-1 Endpoints (Return 501)

### Organizations & Teams (Q2 2025)
- `GET /api/organizations`
- `POST /api/organizations`
- `GET /api/organizations/{orgId}/members`
- `POST /api/organizations/{orgId}/invitations`
- `POST /api/invitations/accept`

### Measure Pipeline (Planned)
- Successor to the retired AI Document diff submission flow. Integrates dataset measurements with the `$BTD` share economy and broader Bitcode market layer (see marketing token section `uapi/app/(root)/components/MarketingTokenMetricsSection.tsx`).
- Not deployed yet; placeholder endpoints will live under `/api/measure/*` (history, stream, trigger). Specs tracked in product backlog.

### Conversations/Chat (Q3 2025)
- `GET /api/conversations`
- `POST /api/conversations`
- `GET /api/conversations/{conversationId}/messages`
- `POST /api/conversations/{conversationId}/messages`

### API Key Management (Q4 2025)
- `GET /api/user/api-keys`
- `POST /api/user/api-keys`
- `DELETE /api/user/api-keys/{keyId}`

### Additional VCS Integrations (Q2 2025)
- `/api/integrations/gitlab/*`
- `/api/integrations/bitbucket/*`
- `/api/integrations/figma/*`
- `/api/integrations/notion/*`

## Middleware Protection

The `uapi/middleware.ts` file implements GA-1 route protection:

```typescript
const POST_GA1_ROUTES = [
  '/api/organizations',
  '/api/invitations',
  '/api/measure',        // placeholder for the need-measurement pipeline primitive
  '/api/conversations',
  '/api/user/api-keys',
  '/api/integrations/gitlab',
  '/api/integrations/bitbucket',
  '/api/integrations/figma',
  '/api/integrations/notion',
]

// Returns 501 with helpful message for post-GA-1 routes
```

## Authentication

### Supabase Auth
- Bearer token in Authorization header
- Service role key for admin operations
- Row Level Security enforced at database

### NextAuth.js
- OAuth providers (GitHub primary)
- Session management
- JWT tokens

## Rate Limiting

### Default Limits
- Authenticated: 100 requests/minute
- Unauthenticated: 20 requests/minute
- Pipeline operations: 10 concurrent

### Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

## Error Codes

### Standard HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error
- `501` - Not Implemented (Post-GA-1 features)

### Application Error Codes
- `AUTH_REQUIRED` - Authentication required
- `INVALID_INPUT` - Validation failed
- `INSUFFICIENT_CREDITS` - Not enough credits
- `PIPELINE_FAILED` - Pipeline execution error
- `VCS_ERROR` - Version control operation failed
- `POST_GA1_FEATURE` - Feature not available in GA-1

## Streaming & Real-time

### Server-Sent Events (SSE)
Used for pipeline execution streaming:
- `/api/executions/stream`
- `/api/phases/stream`
- `/api/assets/stream`

### Event Types
```typescript
type StreamEvent = {
  type: 'status' | 'progress' | 'data' | 'completion' | 'error',
  data: unknown,
  message?: string,
  timestamp: string,
  correlationId: string
}
```

## Testing

### Test Endpoints
- `GET /api/health` - Basic health check
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/live` - Liveness probe

### Test Authentication
Development environment supports test tokens via environment variables.

## Client-Side Data Management

### React Query Integration

The frontend uses `@tanstack/react-query` for efficient API data caching and synchronization.

#### Configuration
```typescript
// app/react-providers/query-provider.tsx
const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes
      gcTime: 10 * 60 * 1000,      // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
};
```

#### Auth Query Hooks
```typescript
// app/hooks/use-auth-query.ts
export const authQueryKeys = {
  user: ['auth', 'user'],
  profile: ['auth', 'profile'],
  onboarding: ['auth', 'onboarding'],
};

// Available hooks
useUser()       // Get current authenticated user
useProfile()    // Get user profile data  
useOnboarding() // Get onboarding status
```

#### Performance Impact
- **Before React Query**: Auth check ~200-300ms, Profile fetch ~150ms, Total ~450-550ms
- **After React Query**: Cached data served instantly (<10ms for cached data)
- **Orbital Performance**: Instant open achieved (<16ms) with prefetched auth data

#### Best Practices
- Prefetch predictable user actions
- Use query keys consistently
- Handle loading and error states
- Invalidate queries after mutations
- Use `enabled` option for dependent queries

## SDK Usage

### TypeScript Client
```typescript
import { createClient } from '@bitcode/api-client';

const client = createClient({
  baseUrl: 'https://api.engi.software',
  authToken: 'your-token'
});

// Create deliverable
const result = await client.deliverables.create({
  task: 'Implement user authentication',
  repoOwner: 'bitcode-labs',
  repoName: 'bitcode'
});

// Stream execution
const stream = client.deliverables.stream(result.run.id);
stream.on('progress', (event) => {
  console.log('Progress:', event.data);
});
```

## Deployment

### Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.engi.software
API_RATE_LIMIT_WINDOW=60000
API_RATE_LIMIT_MAX=100

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Feature Flags
FEATURE_ORGANIZATIONS_ENABLED=false
FEATURE_MEASURE_ENABLED=false
FEATURE_CONVERSATIONS_ENABLED=false
```

### CORS Configuration
```typescript
headers: {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}
```

## Monitoring

### Metrics
- Request count by endpoint
- Response time percentiles
- Error rate by status code
- Active pipeline executions
- Credit usage trends

### Logging
Structured JSON logging with correlation IDs for request tracing.

### Observability
OpenTelemetry integration for distributed tracing across pipeline execution.

---

*Last Updated: 2025-01-10*
*Version: GA-1 (1.0.0)*
*Status: Production Ready*
