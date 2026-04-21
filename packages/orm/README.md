# @bitcode/orm

Type-safe database access layer for the Bitcode platform. Provides 1:1 mapping with Supabase migrations, vector search support, and consistent read/write helpers.

## Core Architecture

- **Client Management**: Separate admin and user clients
- **Model System**: Type-safe model classes for all entities
- **Vector Search**: pgvector integration for semantic search
- **Query Helpers**: Specialized queries for field intelligence

## Client Types

```typescript
import { createClient, createAdminClient } from '@bitcode/orm';

// User-scoped client (API routes)
const client = createClient(authToken);

// Admin client (field doc plugin, background jobs)
const adminClient = createAdminClient();
```

## Model Usage

```typescript
import { 
  UsersModel, 
  DeliverablesModel, 
  ConversationsModel 
} from '@bitcode/orm';

// List user deliverables
const deliverables = await client.deliverables.list({
  filter: { status: 'completed' },
  limit: 10
});

// Vector search example
const results = await client.fieldIntelligence.query({
  code: sourceCode,
  context: 'How is this code working in the field?'
});
```

## Available Models

- **User Models**: Users, profiles, credits, connections, API keys
- **Organization Models**: Organizations, members, credits, invitations  
- **Pipeline Models**: Executions, deliverables, execution events
- **Communication Models**: Conversations, messages, notifications

## Vector Capabilities

- **Field Intelligence**: Code analysis with field context
- **Semantic Search**: Vector similarity matching
- **pgvector Integration**: Native PostgreSQL vector operations

## Architecture

Provides database as a typed service philosophy. 1:1 mapping with Supabase schema ensures consistency. Vector search enables semantic code analysis and field intelligence queries.
