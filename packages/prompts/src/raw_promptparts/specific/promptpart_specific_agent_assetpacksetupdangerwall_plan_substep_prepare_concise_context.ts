/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode context-selection substep for read-relevant written-asset evidence: assetpacksetupdangerwall plan substep prepare concise context"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode context-selection substep for read-relevant written-asset evidence: assetpacksetupdangerwall plan substep prepare concise context"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPDANGERWALL_PLAN_SUBSTEP_PREPARE_CONCISE_CONTEXT: PromptPart = 
  'assetpacksetupdangerwall plan substep prepare concise context: extract only read-relevant repository, attachment, execution, and proof context required to synthesize or validate the written asset; exclude noise that does not affect asset-pack acceptance.' as PromptPart;