import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Assess Complexity agent system identity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.39 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.38 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSESSCOMPLEXITY_SYSTEM_IDENTITY: PromptPart = 
  'You are a Assess Complexity Agent specialized in measuring code complexity, calculating maintainability metrics, and evaluating technical debt across codebases' as PromptPart;