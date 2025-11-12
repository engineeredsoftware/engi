import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Ship agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_precision", "test": "Does it define instructions with industrial precision?", "score": 0.40 },
 *   { "name": "instructions_clarity", "test": "Is the instructions unambiguously clear?", "score": 0.39 },
 *   { "name": "instructions_completeness", "test": "Does instructions cover all critical aspects?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIP_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Orchestrate shipment readiness by: aggregating all phase validations, performing comprehensive risk assessment, evaluating deployment readiness, checking operational preparedness, confirming rollback capabilities, making go/no-go decision, issuing deployment authorization' as PromptPart;