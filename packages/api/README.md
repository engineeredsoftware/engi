# API Core

## Overview

Enterprise API orchestration layer providing unified route handling and request lifecycle management for the ENGI platform. Implements pure orchestration patterns with zero business logic, delegating all operations to specialized packages while maintaining clean separation of concerns.

## Core Functionality

### Route Architecture
- **Domain-Based Organization**: Routes structured by functional domains (auth, deliverables, integrations)
- **Handler Composition**: Clean orchestration of package functionality without business logic implementation
- **Middleware Integration**: Standardized authentication, rate limiting, and error handling
- **Protocol Agnostic**: Support for REST, streaming, and webhook endpoints

### Request Processing
- **Authentication Layer**: Dual-mode authentication via API keys and session cookies
- **Context Enrichment**: Request augmentation with user, organization, and connection metadata
- **Parameter Validation**: Type-safe request validation and transformation
- **Response Standardization**: Consistent API response structures across all endpoints

### Integration Points
- **Database Operations**: All persistence via `@engi/orm` package integration
- **Authentication**: Complete delegation to `@engi/auth` subsystem
- **VCS Operations**: Repository interactions through `@engi/vcs` abstraction
- **Streaming**: Real-time updates via `@engi/streams` infrastructure

## API Reference

### Core Exports

```typescript
// Authentication & User Management
export * as auth from './routes/auth';
export * as user from './routes/user';

// Pipeline Operations  
export * as deliverables from './routes/deliverables';

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
import { authenticateRequest } from '@engi/auth';
import { deductCredits } from '@engi/credits';
import { log } from '@engi/logger';
import { writeStreamMessage } from '@engi/streams';
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
