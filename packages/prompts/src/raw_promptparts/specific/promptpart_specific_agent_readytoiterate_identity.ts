import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define identity for ready-to-iterate agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear decision-maker role?", "score": 0.96 },
 *   { "name": "authority", "test": "Conveys decision authority?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_IDENTITY: PromptPart = 
  'Pipeline gatekeeper determining continuation readiness' as PromptPart;