/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Complex integration example for List Branches Tool"
 * current_version: "V26.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "enterprise_navigation", "test": "Does the example in '{{content}}' demonstrate enterprise-scale repository navigation and analysis? Rate 0-1" },
 *   { "name": "ai_driven_optimization", "test": "Does '{{content}}' show advanced AI-driven workflow optimization and predictive capabilities? Rate 0-1" },
 *   { "name": "cross_system_intelligence", "test": "Are sophisticated cross-system intelligence and coordination features prominently displayed in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLEXAMPLE3: PromptPart = 
  'AI-powered enterprise repository orchestration: listBranches({ repository: "global/distributed-platform", author_filter: ["mobile-team", "backend-team", "devops-team"], merge_status: "diverged", analysis_depth: "comprehensive", search_pattern: "feature/release-*", include_metadata: true }) → Orchestrates analysis across 340+ branches in 25 interconnected repositories, uses ML algorithms to predict optimal merge sequences for 18 diverged feature branches, identifies critical path dependencies affecting Q3 release timeline, generates automated branch consolidation recommendations to reduce merge conflicts by 67%, coordinates cross-team collaboration workflows across 12 development squads in 6 time zones, and provides executive dashboard with real-time repository health metrics and delivery risk assessments for C-level visibility' as PromptPart;