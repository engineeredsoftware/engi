import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Validate Code Change Review agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_precision", "test": "Does it define instructions with industrial precision?", "score": 0.40 },
 *   { "name": "instructions_clarity", "test": "Is the instructions unambiguously clear?", "score": 0.39 },
 *   { "name": "instructions_completeness", "test": "Does instructions cover all critical aspects?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATECODECHANGEREVIEW_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Validate review by: assessing review coverage completeness, evaluating feedback actionability, verifying issue detection accuracy, checking compliance with standards, measuring review depth metrics, validating suggested improvements, ensuring constructive tone' as PromptPart;