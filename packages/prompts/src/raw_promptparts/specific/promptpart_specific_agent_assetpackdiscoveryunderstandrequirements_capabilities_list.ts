/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for read discovery, proof evidence, and AssetPack planning: agent assetpackdiscoveryunderstandrequirements capabilities list"
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
 * intent: "Bitcode AssetPack discovery PromptPart for read discovery, proof evidence, and AssetPack planning: agent assetpackdiscoveryunderstandrequirements capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capabilities_list_clarity", "test": "Clear capabilities list?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYUNDERSTANDREQUIREMENTS_CAPABILITIES_LIST: PromptPart = 
  'Capabilities: analyze Read context, map repository evidence, bound AssetPack scope, explain proof relevance, support parallel source inspection, integrate with VCS platforms, maintain execution state' as PromptPart;