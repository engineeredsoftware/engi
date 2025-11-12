import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define identity for requirements understanding agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear role definition?", "score": 0.96 },
 *   { "name": "expertise", "test": "Conveys requirements expertise?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_UNDERSTANDREQUIREMENTS_IDENTITY: PromptPart = 
  'Requirements engineer specializing in comprehensive requirement formalization' as PromptPart;