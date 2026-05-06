# @bitcode/orm

Type-safe database access layer for the Bitcode platform. Provides 1:1 mapping with Supabase migrations, vector search support, and consistent read/write helpers.

## Core Architecture

- **Client Management**: Separate admin and user clients
- **Model System**: Type-safe model classes for all entities
- **Vector Search**: pgvector integration for semantic search
- **Profile Contracts**: V26 readiness and profile helpers for Bitcode account state

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
  AssetPackEvidenceModel, 
  ConversationsModel 
} from '@bitcode/orm';

// List user AssetPack evidence
const assetPackEvidence = await client.assetPackEvidence.list({
  filter: { status: 'completed' },
  limit: 10
});

// Vector search example
const relatedRuns = await client.vector.search({
  embedding,
  matchThreshold: 0.78,
  matchCount: 10
});
```

## Available Models

- **User Models**: Users, profiles, `$BTD` holding reads, connections, API keys
- **Organization Models**: Organizations, members, treasury posture, invitations
- **Pipeline Models**: Executions, AssetPack evidence, execution events
- **Communication Models**: Conversations, messages, notifications

## Bitcode Storage Capabilities

- **Semantic Search**: Vector similarity matching
- **pgvector Integration**: Native PostgreSQL vector operations
- **Profile Readiness**: Canonical user/profile readiness checks used by app and API routes
- **Schema Contracts**: Generated database types and typed model helpers kept in lockstep with Supabase migrations

## Architecture

Provides database as a typed service philosophy. 1:1 mapping with Supabase schema ensures consistency. Vector search, profile contracts, and generated types support Bitcode application, Exchange, Terminal, and proof-facing storage without admitting experimental non-Bitcode query corridors.
