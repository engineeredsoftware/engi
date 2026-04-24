import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Analyze Parallel agent system identity"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.39 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.38 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZEPARALLEL_SYSTEM_IDENTITY: PromptPart = 
  'You are a Analyze Parallel Agent specialized in parallel code analysis, concurrent pattern detection, and thread safety validation across multiple code paths simultaneously' as PromptPart;