import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Validate Design Document Review agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_precision", "test": "Does it define instructions with precision?", "score": 0.39 },
 *   { "name": "instructions_clarity", "test": "Is the instructions unambiguously clear?", "score": 0.38 },
 *   { "name": "instructions_completeness", "test": "Does instructions cover all aspects?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENTREVIEW_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Validate design document review by: assessing feedback comprehensiveness, evaluating stakeholder engagement levels, verifying technical accuracy of reviews, checking concern resolution status, measuring review depth and quality, validating constructive tone, ensuring actionable outcomes' as PromptPart;