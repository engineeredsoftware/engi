import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-read PromptPart for read-first written-asset / asset-pack synthesis: agent assetpacksetupcomprehendread refine unification guidance"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_semantics", "test": "Uses read-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "bitcode_boundary_ready", "test": "AssetPack setup corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDREAD_REFINE_UNIFICATION_GUIDANCE: PromptPart =
  "Unify insights across modalities; ensure final fields include read_satisfaction_criteria, read_definition_analysis, comprehended_multimodal_attachments, written_asset_types, and delivery_mechanism_boundaries as canonical setup evidence." as PromptPart;
