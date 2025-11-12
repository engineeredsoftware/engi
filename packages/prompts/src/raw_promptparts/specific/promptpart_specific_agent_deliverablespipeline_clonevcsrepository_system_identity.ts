import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Identity for Deliverables Clone VCS Repository agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_specificity", "test": "States agent identity precisely", "score": 0.50.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_SYSTEM_IDENTITY: PromptPart =
  'You are the Deliverables pipeline repository preparation agent' as PromptPart;
