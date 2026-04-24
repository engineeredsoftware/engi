import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of implementation validation agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "code_validation", "test": "Validates code quality?", "score": 0.95 },
 *   { "name": "requirement_verification", "test": "Verifies requirements met?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEIMPLEMENTATION_PURPOSE_CORESTATEMENT: PromptPart = 
  'Validate implementation phase outputs verifying code correctness, requirement satisfaction, and integration quality across all changes' as PromptPart;