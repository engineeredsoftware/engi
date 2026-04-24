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
export const PROMPTPART_SPECIFIC_AGENT_READYTOFINISHCODECHANGE_SYSTEM_ROLE: PromptPart = 
  'Your role is to perform final readiness assessment for code written assets, verify all quality gates passed, ensure zero critical issues, validate delivery-mechanism safety, and provide shipment certification' as PromptPart;
