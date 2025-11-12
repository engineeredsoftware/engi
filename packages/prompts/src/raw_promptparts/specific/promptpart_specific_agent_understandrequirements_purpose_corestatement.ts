import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of requirements understanding agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirement_extraction", "test": "Extracts all requirement types?", "score": 0.95 },
 *   { "name": "completeness", "test": "Comprehensive requirement analysis?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_UNDERSTANDREQUIREMENTS_PURPOSE_CORESTATEMENT: PromptPart = 
  'Deep requirements analysis combining task comprehension, attachment insights, and codebase context to formalize functional, non-functional, and technical requirements' as PromptPart;