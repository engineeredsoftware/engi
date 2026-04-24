import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Ship Code Change agent system instructions"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_precision", "test": "Does it define instructions with industrial precision?", "score": 0.40 },
 *   { "name": "instructions_clarity", "test": "Is the instructions unambiguously clear?", "score": 0.39 },
 *   { "name": "instructions_completeness", "test": "Does instructions cover all critical aspects?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPCODECHANGE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Certify code written-asset readiness by: confirming all tests pass, verifying zero critical bugs, validating performance benchmarks met, ensuring security compliance achieved, checking rollback procedures ready, confirming documentation complete, and authorizing pull request delivery-mechanism emission' as PromptPart;
