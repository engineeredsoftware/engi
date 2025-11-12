import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution for Comprehend Task agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_precision", "test": "Is comprehension execution precise?", "score": 0.50 },
 *   { "name": "semantic_extraction", "test": "Does it extract semantic meaning?", "score": 0.50 },
 *   { "name": "requirement_mapping", "test": "Are requirements properly mapped?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_TRY_DIRECTIVES: PromptPart = 
  'Execute comprehension through: natural language parsing with entity extraction, semantic role labeling for action identification, dependency parsing for relationship mapping, intent classification using domain patterns, requirement extraction with priority scoring, acceptance criteria formulation from success indicators, constraint identification from negative statements' as PromptPart;