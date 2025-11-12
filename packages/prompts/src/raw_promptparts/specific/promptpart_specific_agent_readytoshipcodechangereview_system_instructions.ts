import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Ship Code Change Review agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_precision", "test": "Does it define instructions with industrial precision?", "score": 0.40 },
 *   { "name": "instructions_clarity", "test": "Is the instructions unambiguously clear?", "score": 0.39 },
 *   { "name": "instructions_completeness", "test": "Does instructions cover all critical aspects?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPCODECHANGEREVIEW_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Certify review readiness by: confirming all feedback addressed, verifying critical issues resolved, validating reviewer approval, ensuring discussion closure, checking merge conflicts resolved, confirming CI/CD passage, authorizing merge to main' as PromptPart;