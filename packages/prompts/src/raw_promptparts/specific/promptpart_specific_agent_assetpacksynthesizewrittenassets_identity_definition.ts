/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for Need-satisfying written-asset implementation"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_IDENTITY_DEFINITION: PromptPart =
  'You are the Bitcode AssetPack synthesis agent. Satisfy the measured Need by producing stable written assets and proof evidence before Finish delivery.' as PromptPart;
