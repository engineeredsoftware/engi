import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-read PromptPart for read-first written-asset / asset-pack synthesis: agent assetpacksetupcomprehendread ptrrplan purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_semantics", "test": "Uses read-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "support_ready", "test": "AssetPack setup corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDREAD_PTRRPLAN_PURPOSE: PromptPart =
  "PTRR Plan Step: inspect the expressed read, attachments, repository context, and delivery-mechanism intent; plan how to derive read satisfaction criteria, written-asset type candidates, and asset-pack context." as PromptPart;
