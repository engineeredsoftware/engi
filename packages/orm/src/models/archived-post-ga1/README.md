# Archived Models (Post-GA-1)

This directory contains ORM model files that are **not** included in the GA-1 table specifications. These models have been archived to focus the codebase on GA-1 functionality.

## Archived Models

### Organization-related models
- `organizations.ts` - Organizations table management  
- `organization-members.ts` - Organization membership and roles
- `organization-invitations.ts` - Organization invitation system
- `organization-credits.ts` - Organization-level credit management

### Conversation/messaging models  
- `conversations.ts` - Conversation management
- `messages.ts` - Message management within conversations

### User management models
- `users.ts` - Core user management (non-profile data)
- `user-api-keys.ts` - User API key management

### Credit system models
- `credits.ts` - General credit system management

### Pipeline models
- `runs.ts` - Generic runs (uses `runs` table instead of GA-1's `run_jobs`)

## GA-1 Tables (Models Kept)

For reference, these are the GA-1 tables that have corresponding models in the main directory:

- `user_profiles` → `user-profiles.ts`
- `user_connections` → `user-connections.ts`
- `user_model_preferences` → `user-model-preferences.ts`
- `user_credits` → `user-credits.ts`
- `user_credit_usages` → `user-credit-usages.ts`
- `deliverables` → `deliverables.ts`
- `deliverable_items` → `deliverable-items.ts`
- `deliverable_runs` → `deliverable-runs.ts`
- `deliverable_run_events` → `deliverable-run-events.ts`
- `pipeline_runs` → `pipeline-runs.ts`
- `notifications` → `notifications.ts`

## Missing GA-1 Models

These GA-1 tables don't have corresponding model files yet:

- `vcs_repositories`
- `user_github_connections`
- `deliverable_vectors`
- `deliverable_run_phases`
- `run_jobs`
- `run_otf_instructions`
- `stream_logs`
- `generated_assets`
- `events`
- `error_logs`
- `token_costs`

## Restoration

If any of these archived models need to be restored for future development, simply move them back to the parent `models/` directory and update the `index.ts` file to include their exports.