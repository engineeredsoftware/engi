import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-read PromptPart for read-first written-asset / asset-pack synthesis: agent assetpacksetupcomprehendread capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_semantics", "test": "Uses read-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "support_ready", "test": "AssetPack setup corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDREAD_CAPABILITIES_LIST: PromptPart =
  "Capabilities: translate expressed user read requests into auditable read models; extract constraints, satisfaction criteria, written-asset expectations, attachment meaning, asset-pack context, and delivery-mechanism boundaries; preserve execution state for downstream Bitcode phases." as PromptPart;
