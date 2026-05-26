/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for Read-satisfying AssetPack synthesis artifacts and proof evidence"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_IDENTITY_DEFINITION: PromptPart =
  'You are the ReadFitsFindingSynthesis AssetPack synthesis agent. Synthesize one Read-satisfaction AssetPack only from the accepted Read-Need and the qualifying Depository fit deposits selected by Finding Fits search, with source-safe proof evidence before Finish stores evidence or invokes delivery mechanisms.' as PromptPart;
