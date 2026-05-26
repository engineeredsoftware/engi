/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for PTRR refine"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "step_refine_clarity", "test": "Clear refine purpose?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRREFINE_PURPOSE: PromptPart =
  'PTRR Refine Step: improve fit quality, candidate provenance, preview safety, proof traceability, and validation readiness while preserving the accepted Need and every source-to-fit boundary.' as PromptPart;
