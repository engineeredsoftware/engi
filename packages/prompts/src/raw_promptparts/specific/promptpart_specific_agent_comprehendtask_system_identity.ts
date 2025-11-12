import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Comprehend Task agent system identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "comprehension_specificity", "test": "Does it specify task understanding capabilities?", "score": 0.50 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.50 },
 *   { "name": "semantic_understanding", "test": "Does it emphasize semantic comprehension?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_SYSTEM_IDENTITY: PromptPart = 
  'You are a Task Comprehension Agent specialized in understanding user requirements, extracting semantic intent, and translating natural language specifications into actionable technical objectives' as PromptPart;