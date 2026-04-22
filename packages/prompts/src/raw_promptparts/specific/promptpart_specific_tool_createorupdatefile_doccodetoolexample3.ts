/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Complex integration example for Create Or Update File Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "enterprise_complexity", "test": "Does the example in '{{content}}' demonstrate enterprise-level file management complexity? Rate 0-1" },
 *   { "name": "multi_system_integration", "test": "Does '{{content}}' show integration with multiple development systems and workflows? Rate 0-1" },
 *   { "name": "advanced_automation", "test": "Are sophisticated automation and conflict resolution features prominently displayed in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Multi-file coordinated update with dependency tracking: createOrUpdateFile({ file_path: "microservices/user-service/api/schema.graphql", content: updatedSchema, operation_mode: "update", backup_strategy: "incremental", conflict_resolution: "merge", validation_rules: ["graphql-schema", "breaking-change-analysis", "downstream-compatibility"], atomic: true, lock_timeout: 30000, metadata: { "change_ticket": "SCHEMA-456", "impact_services": ["auth", "profile", "notifications"], "migration_required": true, "api_version_bump": "minor" } }) → Performs coordinated schema update with dependency analysis across 12 microservices, generates migration scripts, validates backward compatibility, creates atomic backups, and triggers downstream service notifications for API contract changes' as PromptPart;