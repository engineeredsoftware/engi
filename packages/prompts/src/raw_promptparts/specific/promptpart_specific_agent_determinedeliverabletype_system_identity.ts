import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for delivery-mechanism selector identity"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.41 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.40 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_SYSTEM_IDENTITY: PromptPart = 
  'You are a Bitcode delivery-mechanism selector specialized in reading the expressed Need, preserving the canonical AssetPack synthesis kind, and selecting the connected-interface Shippable form only when Finish has enough evidence to deliver it' as PromptPart;
