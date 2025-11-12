/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Comprehensive capability listing for List Branches Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "discovery_sophistication", "test": "Does '{{content}}' demonstrate sophisticated repository discovery capabilities beyond basic listing? Rate 0-1" },
 *   { "name": "intelligent_analysis", "test": "Are intelligent branch analysis and insight generation features prominently featured in '{{content}}'? Rate 0-1" },
 *   { "name": "workflow_intelligence", "test": "Does '{{content}}' show deep workflow analysis and optimization capabilities? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Multi-VCS platform integration with unified branch discovery, intelligent branch categorization by purpose and lifecycle stage, activity timeline analysis with commit velocity tracking, merge readiness assessment using automated conflict detection, stale branch identification with cleanup recommendations, developer ownership mapping and collaboration pattern analysis, branch dependency graph visualization with impact assessment, CI/CD pipeline status integration and deployment tracking, feature flag correlation and release coordination, custom filtering with saved search patterns, real-time synchronization across distributed teams, and predictive analytics for branch lifecycle optimization and merge conflict prevention' as PromptPart;