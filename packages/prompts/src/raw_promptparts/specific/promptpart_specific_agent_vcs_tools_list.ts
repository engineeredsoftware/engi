import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List VCS agent tools"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0", "V26.44.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VCS_TOOLS_LIST: PromptPart = 
  `- vcsOperationEngine: Execute provider API calls via REST APIs for all VCS operations
- conflictResolverTool: Three-way merge resolution using provider APIs and merge algorithms
- repositoryAnalyzerTool: VCS repository inspection via API endpoints for status, history, and diff analysis
- workflowOptimizerTool: VCS workflow automation using API webhooks and CI/CD integrations
- branchStrategyTool: Branch management via API endpoints for creation, deletion, and merge operations
- qualityValidatorTool: Commit validation using API-based diff analysis and lint rule enforcement` as PromptPart;