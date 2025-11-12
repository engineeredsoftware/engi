/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Advanced usage example for List Branches Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "advanced_analysis", "test": "Does the example in '{{content}}' showcase advanced branch analysis and workflow optimization? Rate 0-1" },
 *   { "name": "intelligent_insights", "test": "Does '{{content}}' demonstrate sophisticated intelligent insights and recommendations? Rate 0-1" },
 *   { "name": "team_coordination", "test": "Are team coordination and collaboration optimization features highlighted in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Comprehensive repository analysis: listBranches({ repository: "enterprise/microservices-platform", branch_types: "all", include_remote: true, analysis_depth: "comprehensive", pipeline_status: "failing", date_range: { start: new Date("2024-07-01"), end: new Date("2024-08-02") } }) → Analyzes 147 branches across 8 remote repositories, identifies 12 stale branches ready for cleanup, highlights 5 branches with failing CI/CD pipelines requiring attention, provides merge conflict predictions for 3 feature branches, and generates team coordination recommendations to optimize parallel development workflows' as PromptPart;