/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for need discovery, proof evidence, and AssetPack planning: agent assetpackdiscoveryunderstandrequirements ptrrretry purpose"
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
 * intent: "Bitcode AssetPack discovery PromptPart for need discovery, proof evidence, and AssetPack planning: agent assetpackdiscoveryunderstandrequirements ptrrretry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_retry_clarity", "test": "Clear retry purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYUNDERSTANDREQUIREMENTS_PTRRRETRY_PURPOSE: PromptPart = 
  'PTRR Retry Step: recover missing Need requirements or acceptance criteria before AssetPack fitting' as PromptPart;