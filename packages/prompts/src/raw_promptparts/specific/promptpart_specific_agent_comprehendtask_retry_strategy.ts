import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step strategy for Comprehend Task agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_effectiveness", "test": "Are recovery strategies effective?", "score": 0.50 },
 *   { "name": "fallback_robustness", "test": "Are fallback approaches robust?", "score": 0.50 },
 *   { "name": "clarification_handling", "test": "Does it handle clarification needs?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: requesting user clarification for critical ambiguities, applying alternative parsing techniques for complex statements, using domain-specific templates for missing information, inferring requirements from similar tasks, degrading to partial comprehension with confidence indicators, generating clarification questions for iterative refinement' as PromptPart;