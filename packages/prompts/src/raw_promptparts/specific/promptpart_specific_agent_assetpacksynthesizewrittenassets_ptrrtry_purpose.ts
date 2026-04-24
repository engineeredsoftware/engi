/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for PTRR try"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_try_clarity", "test": "Clear try purpose?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_PTRRTRY_PURPOSE: PromptPart =
  'Synthesize AssetPack artifacts, including summary, source changes or document content, and proof evidence that Finish can store and optionally deliver.' as PromptPart;
