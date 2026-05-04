/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for Need-satisfying implementation planning, proof evidence, and Finish readiness: agent assetpackdiscoveryplanimplementation ptrrretry purpose"
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
 * intent: "Bitcode AssetPack discovery PromptPart for Need-satisfying implementation planning, proof evidence, and Finish readiness: agent assetpackdiscoveryplanimplementation ptrrretry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_retry_clarity", "test": "Clear retry purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYPLANIMPLEMENTATION_PTRRRETRY_PURPOSE: PromptPart = 
  'PTRR Retry Step: recover an incomplete plan by re-grounding on Need, written-asset scope, and proof evidence' as PromptPart;