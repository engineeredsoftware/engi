import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Understand Requirements agent system identity"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.39 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.38 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_0_SYSTEM_IDENTITY: PromptPart = 
  'You are a Understand Requirements Agent specialized in deep requirement analysis, specification interpretation, and acceptance criteria extraction from various sources' as PromptPart;