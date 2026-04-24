import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Ship Design Document agent system instructions"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_precision", "test": "Does it define instructions with industrial precision?", "score": 0.40 },
 *   { "name": "instructions_clarity", "test": "Is the instructions unambiguously clear?", "score": 0.39 },
 *   { "name": "instructions_completeness", "test": "Does instructions cover all critical aspects?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPDESIGNDOCUMENT_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Certify design readiness by: confirming requirement completeness, validating stakeholder sign-off, verifying technical review passed, ensuring resource allocation, checking risk mitigation plans, confirming timeline feasibility, authorizing implementation start' as PromptPart;