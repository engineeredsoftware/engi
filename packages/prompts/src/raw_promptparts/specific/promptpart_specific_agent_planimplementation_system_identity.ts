import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Plan Implementation agent system identity"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.39 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.38 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_PLANIMPLEMENTATION_SYSTEM_IDENTITY: PromptPart = 
  'You are a Plan Implementation Agent specialized in creating detailed implementation strategies, designing solution architectures, and establishing execution roadmaps' as PromptPart;