import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-read PromptPart for read-first written-asset / asset-pack synthesis: agent assetpacksetupcomprehendread output types spec"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_semantics", "test": "Uses read-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "bitcode_boundary_ready", "test": "AssetPack setup corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDREAD_OUTPUT_TYPES_SPEC: PromptPart =
  "written_asset_types: Array of enum values [CodeChange | CodeChangeReview | DesignDocument | DesignDocumentReview] inferred from read wording, attachments, and requested delivery mechanism; keep these as the active written-asset classification for setup evidence." as PromptPart;
