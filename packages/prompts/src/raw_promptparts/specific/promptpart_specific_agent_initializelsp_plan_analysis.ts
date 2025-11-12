import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step analysis for Initialize LSP agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_depth", "test": "Does it enable deep analysis?", "score": 0.37 },
 *   { "name": "context_extraction", "test": "Does it extract relevant context?", "score": 0.36 },
 *   { "name": "requirement_identification", "test": "Are requirements identified?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_PLAN_ANALYSIS: PromptPart = 
  'Analyze environment to identify: available language servers, project language composition, IDE capabilities and limitations, workspace structure, existing configurations, performance constraints' as PromptPart;