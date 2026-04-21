# API Core

## Overview

Unified Bitcode API orchestration layer. This package owns route-level request lifecycle management while delegating domain logic to retained package owners such as `@bitcode/orm`, `@bitcode/supabase`, `@bitcode/execution-generics`, `@bitcode/conversations-generics`, and the pipeline packages.

Interface-owned route bindings such as `uapi/app/api/*` should stay thin. They import formal route handlers from `packages/api` entry modules such as `@bitcode/api/src/routes/*`, while those handlers import narrower functionality from the appropriate subsystem packages.

In V26 fourth-gate this package is where merged-world Bitcode becomes concrete:
- `/conversations` continuity
- `/executions` compatibility and pipeline-run APIs
- `/executions/history` route-orchestration and normalization ownership
- `/edgetimes` storage/schema witness APIs
- retained need-ingestion and settle-write boundaries

## Core Functionality

### Route Architecture
- **Domain-Based Organization**: Routes structured by functional domains (auth, deliverables, integrations)
- **Bitcode Surface Ownership**: Route sets map onto merged-world Bitcode surfaces such as conversations, executions, activity, auxillaries, and persistence witnesses
- **Handler Composition**: Clean orchestration of package functionality without business logic implementation
- **Thin Interface Bindings**: Next.js FS routes and other interfaces stay as thin bindings over handlers exported here
- **Middleware Integration**: Standardized authentication, rate limiting, and error handling
- **Protocol Agnostic**: Support for REST, streaming, and webhook endpoints

### Request Processing
- **Authentication Layer**: Dual-mode authentication via API keys and session cookies
- **Context Enrichment**: Request augmentation with user, organization, and connection metadata
- **Parameter Validation**: Type-safe request validation and transformation
- **Response Standardization**: Consistent API response structures across all endpoints

### Integration Points
- **Database Operations**: All persistence via `@bitcode/orm` package integration
- **Authentication**: Complete delegation to `@bitcode/auth` subsystem
- **VCS Operations**: Repository interactions through `@bitcode/vcs` abstraction
- **Streaming**: Real-time updates via `@bitcode/streams` infrastructure
- **Activity**: Transactions, executions, and notifications normalize through shared activity modeling rather than isolated per-route labels

## Fourth-Gate Rule

This package should stay orchestration-first.
It should not absorb prompt ownership, schema ownership, or execution semantics that already belong in retained Bitcode packages.
Its job is to make the merged-world application concrete without flattening the old-world architectural boundaries that still serve the system.

## API Reference

### Core Exports

```typescript
// Authentication & User Management
export * as auth from './routes/auth';
export * as user from './routes/user';

// Pipeline Operations  
export * as deliverables from './routes/deliverables';

// Execution History Route Handlers
export {
  getExecutionHistoryRoute,
  postExecutionHistoryRoute,
  getExecutionHistoryRunRoute,
  normalizeExecutionHistoryRow,
  normalizeExecutionEventRow,
} from './routes/executions';

// Conversation Route Handlers
export {
  getConversationsRoute,
  postConversationsRoute,
  postConversationBranchRoute,
  postConversationStreamRoute,
  postConversationThreadStreamRoute,
} from './routes/conversations';

// Organization Management
export * as organizations from './routes/organizations';

// Integrations
export * as github from './routes/integrations/github';
export * as gitlab from './routes/integrations/gitlab';
export * as figma from './routes/integrations/figma';

// System Operations
export * as health from './routes/health';
```

### Type Definitions

```typescript
interface AuthenticatedRequest extends ExpressRequest {
  user: User;
  userId: string;
  connectionId?: string;
  organizationId?: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ResponseMetadata;
}
```

## Configuration

### Route Registration
```typescript
// Next.js App Router compatibility
app.use('/api/auth', auth);
app.use('/api/deliverables', deliverables);
app.use('/api/organizations', organizations);
```

### Middleware Configuration
```typescript
interface MiddlewareOptions {
  skipAuth?: boolean;
  requireAdmin?: boolean;
  requireOrganization?: boolean;
  rateLimit?: RateLimitConfig;
}
```

## Performance Characteristics

### Request Latency
- **Authentication**: < 50ms for cached sessions, < 200ms for API key lookup
- **Route Resolution**: < 5ms for all registered routes
- **Middleware Overhead**: < 10ms per request for standard middleware stack
- **Response Serialization**: < 25ms for typical payloads

### Throughput Metrics
- **Concurrent Requests**: 1000+ concurrent connections supported
- **Rate Limiting**: Configurable per-endpoint and per-user limits
- **Connection Pooling**: Automatic database connection management
- **Memory Usage**: < 50MB baseline, scales linearly with concurrent requests

### Scalability Patterns
- **Stateless Design**: Zero server-side session storage requirements
- **Horizontal Scaling**: Linear scaling across multiple instances
- **Database Optimization**: Connection pooling and query optimization
- **Caching Strategy**: Response caching for frequently accessed endpoints

## Integration Patterns

### Package Dependencies
```typescript
// Core infrastructure dependencies
import { authenticateRequest } from '@bitcode/auth';
import { deductBtdBalance } from '@bitcode/btd';
import { log } from '@bitcode/logger';
import { writeStreamMessage } from '@bitcode/streams';
```

### Error Handling
```typescript
// Standardized error propagation
try {
  const result = await packageOperation();
  return ApiResponse.success(result);
} catch (error) {
  return ApiResponse.error(error);
}
```

### Streaming Integration
```typescript
// Real-time operation streaming  
async function streamingHandler(req: AuthenticatedRequest) {
  const stream = createStream();
  await writeStreamMessage(stream, {
    type: 'status',
    message: 'Operation started'
  });
  return stream;
}
```

### Authentication Flow
```typescript
// Request authentication pipeline
const authResult = await authenticateRequest(request);
if ('userId' in authResult) {
  // Authenticated request processing
  return processAuthenticatedRequest(authResult.userId);
} else {
  // Return authentication error response
  return authResult;
}
```

## Operational Excellence

### Monitoring Integration
- **Request Tracing**: Full request lifecycle tracking via correlation IDs
- **Performance Metrics**: Response time and throughput monitoring
- **Error Aggregation**: Centralized error reporting and analysis
- **Health Endpoints**: Comprehensive service health monitoring

### Security Implementation
- **Input Validation**: Type-safe request validation on all endpoints
- **Rate Limiting**: Configurable request rate limiting per user/endpoint
- **CORS Configuration**: Strict cross-origin resource sharing policies
- **Security Headers**: Comprehensive security header implementation
