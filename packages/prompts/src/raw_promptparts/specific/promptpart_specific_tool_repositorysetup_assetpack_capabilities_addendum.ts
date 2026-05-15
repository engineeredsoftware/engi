import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode AssetPack tool PromptPart for read-first asset-pack setup and written-asset evidence: tool repositorysetup asset-pack capabilities addendum"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_clarity", "test": "Describes precise operational behaviors", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_ASSET_PACK_CAPABILITIES_ADDENDUM: PromptPart =
  'Provider-agnostic clone with configurable depth; branch/ref selection; workspace path normalization; basic health validation hooks; integration with the Bitcode AssetPack execution context so downstream read understanding and written-asset synthesis can proceed cleanly' as PromptPart;
