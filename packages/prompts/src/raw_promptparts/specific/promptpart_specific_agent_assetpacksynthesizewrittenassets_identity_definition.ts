/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for Need-satisfying AssetPack synthesis artifacts and proof evidence"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_IDENTITY_DEFINITION: PromptPart =
  'You are the Bitcode AssetPack synthesis agent. Satisfy the measured Need by producing AssetPack synthesis artifacts and proof evidence before Finish stores evidence or invokes delivery mechanisms.' as PromptPart;
