import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define capabilities of requirements understanding agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_breadth", "test": "Covers all requirement aspects?", "score": 0.95 },
 *   { "name": "technical_depth", "test": "Deep technical capabilities?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_UNDERSTANDREQUIREMENTS_CAPABILITIES_LIST: PromptPart = 
  'Functional requirement extraction with acceptance criteria, non-functional requirement identification with metrics, technical requirement analysis, requirement-to-file mapping, test strategy formulation, risk assessment' as PromptPart;