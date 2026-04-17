# Engi GA-1 Database Architecture

## Overview

The Engi GA-1 database schema focuses on core functionality with a streamlined set of tables for maintainability and performance.

## Database Provider

**Supabase** (PostgreSQL with extensions)
- **Staging URL**: `https://your-project.supabase.co`
- **Extensions**: uuid-ossp, pgcrypto, vector, pg_stat_statements

## GA-1 Schema Structure

### Migration Strategy
- **Single Source of Truth**: All SQL lives under `supabase/migrations/` (e.g., `001_ga1_schema.sql`, `009_complete_deliverables_pipeline_naming.sql`).
- **Clean Architecture**: Avoid scattered schemas; compose types upward into ORM and pipelines‑generics.
- **No Duplication**: Application code consumes ORM types or pipelines‑generics DB aliases — never re‑declare tables.

## Database Tables (measured)

Total tables detected from squashed migration: 31

Tables (representative):
- attachments, conversations, executions, execution_events, phase_executions,
  deliverable_templates, deliverable_vectors, deliverables, error_logs, events,
  generated_assets, message_attachments, messages, notifications, pipeline_runs,
  run_jobs, run_otf_instructions, stream_logs, token_costs, ai_document_runs, ai_documents,
  user_connections, user_credit_usages, user_credits, user_model_preferences,
  user_profiles, user_template_preferences, user_vcs_connections, vcs_repositories

### 1. Core User & Authentication (5 tables)

#### `user_profiles`
- **Purpose**: Extended user profile beyond auth.users
- **Key Fields**: id (UUID), username, display_name, bio, role, onboarded_steps (JSON array)
- **Relations**: References auth.users(id)
- **RLS**: Users can only access their own profile
- **Note**: `onboarded_steps` defaults to `["models"]` for new users

#### `user_connections`
- **Purpose**: VCS provider connections (GitHub only for GA-1)
- **Key Fields**: id, user_id, provider ('github'), connection_data (JSONB)
- **Unique**: (user_id, provider)
- **Future**: Extensible for GitLab, Bitbucket post-GA-1

#### `user_model_preferences`
- **Purpose**: LLM model selection and settings
- **Key Fields**: user_id, model_provider, model_name, is_default
- **Usage**: Determines which AI model to use for pipeline executions

#### `user_credits`
- **Purpose**: Credit balance and Stripe integration
- **Key Fields**: user_id, balance, stripe_customer_id
- **Critical**: Financial data - handle with care

#### `user_credit_usages`
- **Purpose**: Track credit consumption
- **Key Fields**: user_id, amount, operation_type, operation_id
- **Append-only**: Never update or delete records

#### `processed_stripe_sessions`
- **Purpose**: Prevent duplicate Stripe webhook processing
- **Key Fields**: session_id (PRIMARY KEY), processed_at
- **Idempotency**: Check before processing checkout.session.completed events
- **Critical**: Ensures credits only added once per payment

### 2. VCS Integration (1 table)

#### `vcs_repositories`
- **Purpose**: Unified repository storage
- **Key Fields**: user_id, provider, provider_repo_id, repo_full_name
- **Design**: Provider-agnostic for future expansion
- **Note**: Repository data is cached here after fetching from VCS providers

#### ~~`user_github_connections`~~ (DEPRECATED)
- **Status**: DEPRECATED - Use `user_connections` table instead
- **Reason**: Unified VCS connections in `user_connections` table with provider field

### 3. Deliverables System

#### `deliverables`
- **Purpose**: Deliverable definitions and templates
- **Key Fields**: id, user_id, title, status, config (JSONB)
- **States**: draft → active → completed → archived
- **Metrics**: effectiveness_score, execution_count

// Legacy `deliverable_items` has been removed in GA‑1 in favor of unified
// postprocessed execution results persisted alongside executions.

#### `deliverable_vectors`
- **Purpose**: Vector embeddings for similarity search
- **Key Fields**: deliverable_id, embedding (vector(1536))
- **Index**: Uses ivfflat for efficient similarity search
- **Usage**: Powers deliverable recommendations

### 4. Team Management System (4 tables)

#### `organizations`
- **Purpose**: Multi-tenant organization support for enterprise teams
- **Key Fields**: id (UUID), name, slug (unique URL-friendly identifier), email_domain (unique domain restriction), credit_balance, subscription_tier
- **Usage**: Teams share credits and resources within organization
- **Security**: Email domain validation for member invitations

#### `organization_memberships`
- **Purpose**: User-organization relationships with role-based access control
- **Key Fields**: organization_id, user_id, role (owner|admin|lead|developer)
- **Unique**: (organization_id, user_id) prevents duplicate memberships
- **Cascade**: Deletes when organization or user deleted

#### `organization_invitations`
- **Purpose**: Secure token-based invitation system for team members
- **Key Fields**: organization_id, email, role, token (unique), invited_by, expires_at, accepted_at
- **Security**: One-time use tokens with expiration
- **Validation**: Email must match organization domain

#### `organization_credit_usage`
- **Purpose**: Track credit consumption at organization level
- **Key Fields**: organization_id, user_id, amount, description, metadata (JSONB)
- **Audit**: Complete usage history for billing and compliance
- **Append-only**: Never modify historical usage records

### 5. Pipeline Execution — GA‑1 (current)

Note: Current GA‑1 schema uses `executions`, `execution_events`, and `phase_executions`. Structured `deliverables_pipeline_*` tables are planned but not present in the squashed schema.

#### `executions`
- **Purpose**: Top-level pipeline runs (PipelineExecution)
- **Key Fields**: id, user_id, type, guide, status, input (JSONB), output (JSONB), metadata (JSONB), error (TEXT)
- **States**: pending → running → completed/failed/cancelled
- **Metrics**: duration_ms, cost and token aggregates stored opportunistically in `metadata`
- **Notes**: Replaces legacy `deliverable_runs`/`pipeline_executions`; all GA‑1 persistence flows through this table

#### `execution_events`
- **Purpose**: Granular execution event stream
- **Key Fields**: run_id, event_type, phase, agent_name
- **Usage**: Real-time progress tracking via SSE

#### `phase_executions`
- **Purpose**: Phase execution records (PhaseExecution)
- **Key Fields**: run_id, phase_name, status, input, output
- **Phases**: setup → discovery → implementation → validation → shipping
- **E/E Level**: Phase Executor (formerly “delegation”)

#### `deliverables_pipeline_agent_steps` (NEW)
- **Purpose**: Agent PTRR steps within phase delegations (AgentExecution)
- **Key Fields**: phase_delegation_id, agent_name, step_type (plan|try|refine|retry), status
- **E/E Level**: Maps to AgentExecution with all 4 registries
- **Critical**: Every agent uses PTRR - no exceptions

#### `deliverables_pipeline_substeps` (NEW)
- **Purpose**: The 7 substeps within each PTRR step (SubStepExecution)
- **Key Fields**: agent_step_id, substep_type, substep_index, status
- **Substeps**: 3 failsafe parents → 3 generation children → 1 tool execution
- **E/E Level**: Maps to SubStepExecution class

#### `deliverables_pipeline_tool_executions` (NEW)
- **Purpose**: Tool usage tracking (ToolExecution)
- **Key Fields**: substep_id, tool_name, tool_input, tool_output, execution_time_ms
- **E/E Level**: Maps to ToolExecution with prompt registry

#### `deliverables_pipeline_generations` (NEW)
- **Purpose**: LLM API call tracking for cost and performance
- **Key Fields**: run_id, model_provider, model_name, tokens, cost, latency_ms
- **Usage**: Cost attribution and performance monitoring

#### `run_jobs`
- **Purpose**: Long-running job queue
- **Key Fields**: job_type, status, claimed_by, payload
- **Pattern**: Claim-based job processing

// Future structured variant (not present in GA‑1 schema)
// deliverables_pipeline_otf_instructions (was run_otf_instructions)
- **Purpose**: Dynamic instruction injection
- **Key Fields**: run_id, instruction_type, instruction_data
- **Usage**: Modify pipeline behavior during execution

#### `pipeline_runs`
- **Purpose**: Generic pipeline metadata
- **Key Fields**: user_id, type, config
- **Flexibility**: Supports future pipeline types

#### `stream_logs`
- **Purpose**: Real-time streaming logs
- **Key Fields**: stream_id, log_type, log_data
- **Usage**: SSE/WebSocket streaming to frontend

// Future structured variant (not present in GA‑1 schema)
// deliverables_pipeline_generated_assets (was generated_assets)

## Deliverables Pipeline Types & Codegen (GA‑1)

- **SRP Type Composition**:
  1) SQL migrations (SoT) →
  2) ORM Database types (`packages/orm/src/types/database.ts`) →
  3) Pipelines‑generics DB aliases (`packages/pipelines-generics/src/types/db.ts`) & primitives (`packages/pipelines-generics/src/types/primitives.ts`) →
  4) Store‑driven streaming and structured persistence.

- **Optional Codegen** (runtime validation only):
  - Command: `pnpm -C packages/orm run codegen:db`
  - Output: `packages/orm/src/types/generated/deliverables_pipeline.generated.ts` (TS + Zod)
  - Streaming layer attempts to `require()` these schemas to `safeParse(...)` insert payloads; failures don’t block execution — DB is final SoT.

- **Policy**: Never redefine DB tables/types in application code. Import from ORM or alias through pipelines‑generics.
- **Purpose**: Track generated files/outputs
- **Key Fields**: run_id, asset_type, asset_url
- **Storage**: References to external storage (S3, etc.)

### 5. Essential Infrastructure (4 tables)

#### `notifications`
- **Purpose**: User notification system
- **Key Fields**: user_id, type, title, is_read
- **Usage**: In-app notifications

#### `events`
- **Purpose**: System telemetry and analytics
- **Key Fields**: user_id, event_type, event_data
- **Privacy**: IP address and user agent tracking

#### `error_logs`
- **Purpose**: Centralized error tracking
- **Key Fields**: error_type, error_message, error_stack
- **Monitoring**: Critical for production debugging

#### `token_costs`
- **Purpose**: LLM token usage tracking
- **Key Fields**: user_id, model_provider, tokens, cost
- **Analytics**: Cost attribution per model/run

## Data Types & Enums

### TypeScript Types Location
- **Primary**: `packages/orm/src/types/database.ts`
- **Generated**: Aligned with GA-1 schema
- **Version**: ga1-1.0.0

### Key Enums
```typescript
user_role: 'user' | 'admin' | 'developer'
deliverable_status: 'draft' | 'active' | 'completed' | 'archived'
run_status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
phase_status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped'
job_status: 'pending' | 'claimed' | 'running' | 'completed' | 'failed'
```

## Security & Performance

### Row Level Security (RLS)
- **Enabled**: All tables have RLS policies
- **Pattern**: Users access only their own data
- **Service Role**: Backend has full access via service_role key

### Indexes
- **Primary Keys**: UUID with uuid_generate_v4()
- **Foreign Keys**: Indexed for join performance
- **Timestamps**: Indexed for time-based queries
- **Vectors**: ivfflat index for similarity search

### Triggers
- **update_updated_at**: Auto-updates updated_at timestamp
- **handle_new_user**: Creates profile and credits on signup

## API Alignment

### Endpoint Patterns
- `/api/executions/*` - Unified Executions API (use `type=pipeline:deliverables`; additional types such as `pipeline:measure` are reserved but inactive)
- `/api/runs/*` - Pipeline execution
- `/api/user/*` - User management
- `/api/credits/*` - Credit operations

### Removed/Deferred Endpoints
- ❌ `/api/marketplace/*` - Post-GA-1
- ❌ `/api/organizations/*` - Post-GA-1
- ❌ `/api/ai-documents/*` - Pending GA-2 knowledge ingestion APIs
- ❌ `/api/conversations/*` - Post-GA-1

## ORM Package Structure

### Location
`packages/orm/src/`

### Key Files
- `types/database.ts` - GA-1 aligned types
- `client.ts` - Supabase client initialization
- `queries/` - Reusable query functions

### Usage Pattern
```typescript
import { supabase } from '@bitcode/orm/client';
import type { Tables } from '@bitcode/orm/types/database';

// Type-safe queries
const deliverable: Tables<'deliverables'> = await supabase
  .from('deliverables')
  .select('*')
  .single();
```

## Migrations

### Current Migration Files
1. **001_ga1_schema.sql** - Initial GA-1 schema with core tables
2. **002_fix_default_credits.sql** - Credit system fixes  
3. **003_onboarding_refactor.sql** - Onboarding improvements
4. **004_conversations_tables.sql** - Conversations system
5. **005_fix_attachments_message_level.sql** - Attachments restructure
6. **006_templates_system.sql** - Templates, AI Documents persistence, and VCS connections
7. (archived) deliverable_runs columns expansion — merged into squashed schema as `deliverable_pipeline_runs`

### Migration 006: Templates & VCS System (NEW)
This migration adds support for:
- **Templates System**: User-customizable templates for deliverables (ACTIVE)
- **AI Documents Tables**: `.ai/` learning proposals + approvals (ACTIVE)
- **VCS Connections**: User VCS provider authentication (ACTIVE)

New Tables Added:
- `deliverable_templates` - Store user templates for deliverables
- `user_template_preferences` - User template preferences  
- `user_vcs_connections` - VCS provider authentication
- `ai_document_runs` - Tracks AI Document proposal runs
- `ai_documents` - Stores AI Document diff metadata / approvals

### Migration Commands

#### Development/Staging
```bash
# Reset and apply all migrations
supabase db reset
supabase migration up

# Apply specific migration
supabase migration up --file supabase/migrations/006_templates_system.sql

# Generate types
supabase gen types typescript --local > packages/orm/src/types/generated.ts
```

#### Production Deployment
```bash
# Via Supabase Dashboard (Recommended for staging)
# 1. Login to Supabase dashboard
# 2. Navigate to SQL Editor
# 3. Paste migration content
# 4. Execute

# Via Supabase CLI
npx supabase link --project-ref your-project
npx supabase db push --file supabase/migrations/006_templates_system.sql

# Verify
supabase db diff --prod
```

## Post-GA-1 Expansion Plan

### Phase 2 Features (Next)
- Organizations & team collaboration
- Multi-VCS support (GitLab, Bitbucket)
- Measure pipeline (dataset + $ENGI token integration — see `uapi/app/(root)/components/MarketingTokenMetricsSection.tsx`)

### Phase 3 Features (Later)
- Marketplace & procurement
- Advanced integrations (Figma, Notion, Jira)
- Chat/conversations system

### Phase 4 Features (Beyond)
- Advanced AI features (repo insights)
- Enterprise features
- API key management

## Critical Considerations

### Data Integrity
1. Never delete user_credits records
2. Maintain audit trail in events table
3. Preserve run_events for debugging

### Performance
1. Batch inserts for run_events
2. Use streaming for large result sets
3. Implement pagination on all list endpoints

### Monitoring
1. Track error_logs for system health
2. Monitor token_costs for budget alerts
3. Watch pipeline_runs for performance metrics

## Environment Variables

### Required for GA-1
```env
# Supabase Core
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Additional Keys
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

## Troubleshooting

### Common Issues
1. **RLS Policy Violations**: Check auth.uid() matches user_id
2. **Migration Failures**: Ensure clean database state
3. **Type Mismatches**: Regenerate types after schema changes

### Debug Queries
```sql
-- Check user's credit balance
SELECT * FROM user_credits WHERE user_id = 'UUID';

-- View recent pipeline executions
SELECT * FROM executions 
WHERE user_id = 'UUID' 
ORDER BY created_at DESC 
LIMIT 10;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'deliverables';
```

## References

- Migration: `supabase/migrations/001_ga1_schema.sql`
- Types: `packages/orm/src/types/database.ts`
- Client: `packages/orm/src/client.ts`
- Archived migrations: `supabase/archive-migrations-pre-mvp/`

---

*Last Updated: 2025-01-10*
*Version: GA-1 (1.0.0)*
*Status: Production Ready*

## Schema Squash (Pre‑Prod)

Pre‑customers, we maintain a single canonical migration (`000_squashed.sql`) rather than a chain of deltas. This guarantees a clean SoT and zero drift.

- Steps to squash:
  - Reset local DB: `supabase db reset`
  - Dump schema (default): `scripts/supabase.sh db:dump -f supabase/migrations/000_squashed.sql`
  - Archive old migrations: `ts=$(date +%Y%m%d_%H%M%S); mkdir -p supabase/migrations-archive/$ts && git mv supabase/migrations/*.sql supabase/migrations-archive/$ts/ && git add supabase/migrations/000_squashed.sql`
- Regenerate types: `pnpm -C packages/orm run generate-types && pnpm -C packages/orm run codegen:db`

Notes:
- `000_squashed.sql` must include all tables, indexes, enums, RLS policies, functions, and triggers.
- Codegen consumes `supabase/migrations/*.sql`; keep the squashed file there for runtime Zod generation.
- Structured streaming inserts are soft‑validated; DB is the final arbiter.

### Supabase Wrapper

Use the wrapper to ensure env variables are loaded correctly for Supabase CLI:

```
scripts/supabase.sh env:print           # show effective env
scripts/supabase.sh env:debug           # verbose: which files exist + which keys are set
scripts/supabase.sh db:reset            # reset local DB
scripts/supabase.sh db:dump -f supabase/migrations/000_squashed.sql
scripts/supabase.sh db:push             # push schema
scripts/supabase.sh gen:types           # regenerate ORM `database.ts`
scripts/supabase.sh codegen:db          # regenerate deliverables_pipeline Zod/TS

### Makefile Shortcuts

```
make db-reset
make db-dump
make db-gen-types
make db-codegen
make db-squash
make db-verify      # applies 000_squashed.sql to local psql (requires psql)
```
```

The wrapper sources `.env.local`, `.env`, `.ga1.env`, and `uapi/.env*` if present.
