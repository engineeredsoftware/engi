/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack validation PromptPart for code-change written assets entering Finish: agent assetpackvalidationreadytofinishcodechange purpose corestatement"
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
 * intent: "Bitcode AssetPack validation PromptPart for code-change written assets entering Finish: agent assetpackvalidationreadytofinishcodechange purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_corestatement_clarity", "test": "Clear purpose corestatement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKVALIDATIONREADYTOFINISHCODECHANGE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Core purpose: decide whether code-change written assets are complete enough to enter Finish or must return refinement blockers with proof evidence' as PromptPart;