import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Comprehend Task agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all comprehension aspects?", "score": 0.50 },
 *   { "name": "semantic_extraction", "test": "Does it enable semantic extraction?", "score": 0.50 },
 *   { "name": "disambiguation_clarity", "test": "Are disambiguation steps clear?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Comprehend tasks by: parsing natural language for technical keywords and domain concepts, identifying implicit requirements from context, categorizing task complexity and required resources, extracting measurable success criteria and acceptance conditions, mapping task dependencies and prerequisites, generating structured task models with clear objectives, flagging ambiguities requiring clarification' as PromptPart;