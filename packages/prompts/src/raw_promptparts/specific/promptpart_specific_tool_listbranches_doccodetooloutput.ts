/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for List Branches Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "discovery_completeness", "test": "Does '{{content}}' provide comprehensive repository discovery and analysis output? Rate 0-1" },
 *   { "name": "actionable_insights", "test": "Does the output in '{{content}}' provide actionable insights for workflow optimization? Rate 0-1" },
 *   { "name": "intelligence_integration", "test": "Are intelligent analysis results and recommendations effectively included in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns comprehensive branch discovery result including: branches (array of branch objects with names, authors, timestamps, and metadata), branch_analytics (activity patterns, velocity metrics, and collaboration insights), merge_readiness (conflict predictions and integration recommendations), stale_branch_candidates (cleanup suggestions with impact analysis), collaboration_map (developer ownership and cross-team dependencies), pipeline_status_summary (CI/CD health across branches), feature_correlation (linked issues, PRs, and feature flags), dependency_graph (branch relationships and merge ordering), cleanup_recommendations (automated maintenance suggestions), team_coordination_insights (workflow optimization opportunities), and repository_health_score (overall branch management effectiveness with trend analysis)' as PromptPart;