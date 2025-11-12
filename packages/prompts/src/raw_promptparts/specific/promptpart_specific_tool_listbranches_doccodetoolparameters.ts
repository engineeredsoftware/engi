/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for List Branches Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "discovery_flexibility", "test": "Do the parameters in '{{content}}' support flexible and comprehensive repository discovery scenarios? Rate 0-1" },
 *   { "name": "intelligent_filtering", "test": "Are intelligent filtering and analysis parameters effectively included in '{{content}}'? Rate 0-1" },
 *   { "name": "workflow_optimization", "test": "Do parameters support workflow optimization and team coordination requirements in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLPARAMETERS: PromptPart = 
  'repository: string (target repository identifier), branch_types?: "all" | "active" | "merged" | "stale" | "feature" | "hotfix" (branch categorization filter), include_remote?: boolean (include remote branch references), author_filter?: string[] (filter by specific authors or teams), date_range?: { start: Date, end: Date } (activity time window), sort_criteria?: "activity" | "name" | "created" | "updated" (ordering preference), include_metadata?: boolean (detailed branch information), merge_status?: "ahead" | "behind" | "diverged" | "up_to_date" (merge state filter), pipeline_status?: "passing" | "failing" | "pending" (CI/CD status filter), limit?: number (maximum results with pagination), search_pattern?: string (regex or fuzzy search), and analysis_depth?: "basic" | "detailed" | "comprehensive" (analysis level for insights and recommendations)' as PromptPart;