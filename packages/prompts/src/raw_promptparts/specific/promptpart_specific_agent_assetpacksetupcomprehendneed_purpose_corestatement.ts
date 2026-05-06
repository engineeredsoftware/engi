import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-need PromptPart for need-first written-asset / asset-pack synthesis: agent assetpacksetupcomprehendneed purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "support_ready", "test": "AssetPack setup corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDNEED_PURPOSE_CORESTATEMENT: PromptPart =
  "Interpret the expressed need to extract constraints, satisfaction criteria, written-asset expectations, delivery-mechanism expectations, asset-pack context, and complexity posture using structured analysis." as PromptPart;
