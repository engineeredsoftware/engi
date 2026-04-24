import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Ship Design Document Review agent system instructions"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_precision", "test": "Does it define instructions with industrial precision?", "score": 0.40 },
 *   { "name": "instructions_clarity", "test": "Is the instructions unambiguously clear?", "score": 0.39 },
 *   { "name": "instructions_completeness", "test": "Does instructions cover all critical aspects?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPDESIGNDOCUMENTREVIEW_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Certify design review readiness by: confirming comprehensive coverage, validating feedback incorporation, ensuring stakeholder consensus, verifying issue resolution, checking discussion closure, confirming review quality standards, authorizing design progression' as PromptPart;