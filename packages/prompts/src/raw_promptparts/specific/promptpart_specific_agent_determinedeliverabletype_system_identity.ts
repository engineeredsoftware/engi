import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Determine Deliverable Type agent system identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.41 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.40 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_SYSTEM_IDENTITY: PromptPart = 
  'You are a Determine Deliverable Type Agent specialized in classifying deliverable requests into appropriate categories and routing them to correct processing pipelines' as PromptPart;