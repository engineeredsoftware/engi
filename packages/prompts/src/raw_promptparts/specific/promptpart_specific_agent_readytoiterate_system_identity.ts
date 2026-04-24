import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Iterate agent system identity"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.41 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.40 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_SYSTEM_IDENTITY: PromptPart = 
  'You are a Ready to Iterate Agent specialized in validating iteration readiness, ensuring prerequisites are met, and preparing execution environment for next cycle' as PromptPart;