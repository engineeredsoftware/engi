import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Comprehend Task agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_effectiveness", "test": "Does it enable effective comprehension planning?", "score": 0.50 },
 *   { "name": "analysis_depth", "test": "Is the analysis approach comprehensive?", "score": 0.50 },
 *   { "name": "disambiguation_strategy", "test": "Does it plan for disambiguation?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_PLAN_STRATEGY: PromptPart = 
  'Plan comprehension approach by: identifying key technical terms requiring definition, determining task domain and applicable frameworks, outlining semantic parsing methodology, preparing ambiguity resolution strategies, establishing requirement extraction patterns, defining success metric interpretation criteria' as PromptPart;