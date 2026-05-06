import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-need PromptPart for need-first written-asset / asset-pack synthesis: agent assetpacksetupcomprehendneed ptrrretry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "support_ready", "test": "AssetPack setup corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDNEED_PTRRRETRY_PURPOSE: PromptPart =
  "PTRR Retry Step: recover missing or inconsistent need comprehension by re-grounding in the request, attachments, repository context, and Bitcode written-asset semantics." as PromptPart;
