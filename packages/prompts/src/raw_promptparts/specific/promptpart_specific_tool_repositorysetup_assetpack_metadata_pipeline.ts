import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode AssetPack tool PromptPart for read-first asset-pack setup and written-asset evidence: tool repositorysetup asset-pack metadata pipeline"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "context_specificity", "test": "Clarifies pipeline context without ambiguity", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_ASSET_PACK_METADATA_PIPELINE: PromptPart =
  'asset-pack setup' as PromptPart;
