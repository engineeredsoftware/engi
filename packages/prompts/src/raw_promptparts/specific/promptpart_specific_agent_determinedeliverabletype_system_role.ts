import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for delivery-mechanism selector role"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it precisely define the agent's role?", "score": 0.40 },
 *   { "name": "responsibility_clarity", "test": "Are responsibilities clearly stated?", "score": 0.39 },
 *   { "name": "scope_definition", "test": "Is the role scope well-defined?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_SYSTEM_ROLE: PromptPart = 
  'Your role is to analyze incoming Needs, identify requested Shippable forms, validate delivery-mechanism requirements, and route only the Finish delivery step while leaving AssetPack synthesis behavior canonical' as PromptPart;
