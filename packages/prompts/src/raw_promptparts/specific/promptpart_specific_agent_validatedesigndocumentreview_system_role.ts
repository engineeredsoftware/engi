import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Validate Design Document Review agent system role"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it define role with precision?", "score": 0.40 },
 *   { "name": "role_clarity", "test": "Is the role unambiguously clear?", "score": 0.39 },
 *   { "name": "role_completeness", "test": "Does role cover all aspects?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENTREVIEW_SYSTEM_ROLE: PromptPart = 
  'Your role is to validate design review completeness, assess feedback quality, ensure stakeholder participation, verify concern addressing, and certify review adequacy' as PromptPart;