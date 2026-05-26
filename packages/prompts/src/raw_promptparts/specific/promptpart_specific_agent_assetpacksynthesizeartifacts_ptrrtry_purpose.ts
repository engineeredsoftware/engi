/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for PTRR try"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "step_try_clarity", "test": "Clear try purpose?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRTRY_PURPOSE: PromptPart =
  'PTRR Try Step: synthesize source-bound AssetPack artifacts, non-source preview measurements, source-safe review notes, and proof evidence from fit deposits above threshold; do not expose unpaid AssetPack source, invent files, or claim BTC/BTD finality.' as PromptPart;
