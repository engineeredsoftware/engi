/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Comprehensive capability listing for Create Issue Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "issue_management_depth", "test": "Does '{{content}}' demonstrate deep issue management capabilities beyond basic creation? Rate 0-1" },
 *   { "name": "ai_driven_features", "test": "Are AI-driven automation and intelligence features prominently featured in '{{content}}'? Rate 0-1" },
 *   { "name": "enterprise_integration", "test": "Does '{{content}}' show comprehensive enterprise system integration capabilities? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEISSUE_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Multi-platform issue system integration (Jira, GitHub Issues, Azure Boards, Linear), AI-powered issue classification and priority scoring, intelligent assignee recommendation using workload analysis and expertise mapping, automated dependency detection and impact assessment, natural language template generation with context-aware field population, duplicate issue detection using semantic similarity analysis, epic and story breakdown with effort estimation, cross-project issue linking and relationship management, SLA tracking and escalation automation, custom workflow engine with approval gates, real-time collaboration with stakeholder notifications, and comprehensive analytics dashboard with predictive insights' as PromptPart;