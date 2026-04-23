import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Ship agent system role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it define role with industrial precision?", "score": 0.41 },
 *   { "name": "role_clarity", "test": "Is the role unambiguously clear?", "score": 0.40 },
 *   { "name": "role_completeness", "test": "Does role cover all critical aspects?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIP_SYSTEM_ROLE: PromptPart = 
  'Your role is to orchestrate final shipping readiness, aggregate all validation results, perform risk assessment, make go/no-go determination, and authorize connected-interface delivery mechanisms for validated written assets' as PromptPart;
