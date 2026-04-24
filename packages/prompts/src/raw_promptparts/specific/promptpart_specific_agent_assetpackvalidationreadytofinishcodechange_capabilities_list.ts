/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack validation PromptPart for code-change written assets entering Finish: agent assetpackvalidationreadytofinishcodechange capabilities list"
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
 * intent: "Bitcode AssetPack validation PromptPart for code-change written assets entering Finish: agent assetpackvalidationreadytofinishcodechange capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capabilities_list_clarity", "test": "Clear capabilities list?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKVALIDATIONREADYTOFINISHCODECHANGE_CAPABILITIES_LIST: PromptPart = 
  'Capabilities: assess code-change written assets against the expressed Need, validation evidence, repository context, proof obligations, delivery-mechanism boundaries, and Finish readiness' as PromptPart;