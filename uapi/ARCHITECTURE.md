# UAPI Architecture - GA-1 Production Ready

## Overview

UAPI is the main API and web application layer for Engi. It has been modernized for GA-1 production readiness with a clean, maintainable architecture.

## Directory Structure

```
uapi/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (root)/            # Marketing pages
│   ├── (dashboard)/       # Authenticated app pages
│   └── utils/             # App-specific utilities
├── middleware/            # Middleware pipeline (GA-1 ready)
│   ├── index.ts          # Pipeline orchestrator
│   ├── authentication.ts # Auth handling with JWT validation
│   ├── rate-limit.ts     # Token bucket rate limiting
│   ├── security-headers.ts # OWASP security headers
│   ├── cors.ts           # CORS configuration
│   ├── telemetry.ts      # Request metrics
│   └── route-rewrite.ts  # URL rewriting
├── components/            # Shared React components
├── utils/                 # Shared utilities
│   └── supabase/         # Database clients
├── lib/                   # Legacy utilities (to be migrated)
├── stories/              # Storybook stories
├── tests/                # Test files
└── middleware.ts         # Next.js middleware entry

```

## Middleware Pipeline

The middleware system uses a composable pipeline architecture:

1. **Telemetry** (order: 10) - Captures metrics
2. **Security Headers** (order: 20) - OWASP headers
3. **CORS** (order: 30) - Cross-origin handling
4. **Rate Limiting** (order: 40) - Token bucket algorithm
5. **Authentication** (order: 50) - Session validation
6. **Route Rewriting** (order: 60) - URL compatibility

## Key Architectural Decisions

### 1. No "core" or "lib" directories
- If code is shareable, it belongs in `packages/`
- If it's UAPI-specific, it lives directly in `uapi/`

### 2. Middleware Pipeline
- All middleware concerns centralized
- Composable and configurable
- Order-based execution

### 3. Security First
- OWASP security headers on all responses
- Token bucket rate limiting
- Session validation with freshness checks
- Resource ownership validation

### 4. Observability
- Request telemetry captured
- Metrics exported to external service
- Structured logging throughout

## Migration from Legacy

### Old Structure Issues:
- Middleware at root level (`uapi/middleware.ts`)
- Authentication concerns scattered across files
- Utilities scattered across `app/utils/`, `utils/`, `lib/`
- No centralized security headers
- Inconsistent rate limiting

### New Structure Benefits:
- All middleware in `middleware/` directory
- Composable pipeline architecture
- Centralized security configuration
- Consistent rate limiting with token buckets
- Clean separation of concerns

## Integration Points

### Database Access
```typescript
import { createClient } from '@engi/supabase/ssr/server';
```

### Logging
```typescript
import { log } from '@engi/logger';
```

### Types
```typescript
import type { Database } from '@engi/database-types';
```

## Production Readiness

### Security
- ✅ CSRF protection via SameSite cookies
- ✅ XSS protection via CSP headers
- ✅ Clickjacking protection via X-Frame-Options
- ✅ MIME sniffing protection
- ✅ HSTS enforcement in production

### Performance
- ✅ Token bucket rate limiting
- ✅ Request telemetry
- ✅ Lazy middleware initialization
- ✅ In-memory caching for rate limits

### Reliability
- ✅ Error boundaries in middleware
- ✅ Graceful degradation
- ✅ Session freshness validation
- ✅ Automatic token refresh

## Next Steps

1. Migrate remaining `lib/` utilities to appropriate locations
2. Implement Redis for distributed rate limiting
3. Add middleware for request validation
4. Implement circuit breaker pattern for external services