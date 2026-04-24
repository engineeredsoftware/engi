import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode AssetPack tool PromptPart for need-first asset-pack setup and written-asset evidence: tool repositorysetup asset-pack purpose addendum"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "industrial_language", "test": "Uses concrete, technical instructions", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_ASSET_PACK_PURPOSE_ADDENDUM: PromptPart =
  'Prepare the repository for the Bitcode AssetPack run: provider-agnostic cloning, reliable workspace path generation, readiness for LSP initialization, and downstream discovery/implementation work that synthesizes AssetPack artifacts for Finish delivery mechanisms' as PromptPart;
