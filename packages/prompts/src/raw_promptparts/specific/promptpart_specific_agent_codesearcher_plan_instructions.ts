import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Industrial AST parsing plan instructions with concrete algorithmic steps"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "algorithmic_clarity", "test": "Does it specify concrete parsing algorithms? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_focus", "test": "Are implementation steps clearly defined? Rate 0-1", "score": 0.50 },
 *   { "name": "step_sequencing", "test": "Are the planning steps logically sequenced? Rate 0-1", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PLAN_INSTRUCTIONS: PromptPart = 
  'Execute lexical analysis to extract identifier tokens, construct AST node type queries, determine file inclusion using glob patterns, establish priority queues for parsing order, and configure TF-IDF scoring thresholds for result filtering' as PromptPart;