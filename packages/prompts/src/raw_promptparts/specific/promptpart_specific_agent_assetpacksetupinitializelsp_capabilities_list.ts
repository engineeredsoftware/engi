/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode PromptPart for asset-pack need LSP measurement: capabilities list"
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
 * intent: "Bitcode PromptPart for asset-pack need LSP measurement: capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capabilities_list_clarity", "test": "Clear capabilities list?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPINITIALIZELSP_CAPABILITIES_LIST: PromptPart = 
  'Capabilities: detect measurement-relevant languages, configure LSP evidence capture, validate Need and AssetPack measurement inputs, preserve provenance, handle edge cases, and maintain execution state' as PromptPart;
