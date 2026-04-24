import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode ReadyToFinish PromptPart for need satisfaction, written-asset integrity, asset-pack proof evidence, and delivery admission"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it define role with industrial precision?", "score": 0.41 },
 *   { "name": "role_clarity", "test": "Is the role unambiguously clear?", "score": 0.40 },
 *   { "name": "role_completeness", "test": "Does role cover all critical aspects?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOFINISHDESIGNDOCUMENT_SYSTEM_ROLE: PromptPart = 
  'Your role is to certify design document completeness, validate stakeholder approval, ensure technical feasibility confirmed, verify implementation plan ready, and authorize document publication' as PromptPart;