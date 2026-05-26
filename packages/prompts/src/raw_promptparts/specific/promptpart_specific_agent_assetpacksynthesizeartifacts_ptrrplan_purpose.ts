/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for PTRR plan"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "step_plan_clarity", "test": "Clear plan purpose?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRPLAN_PURPOSE: PromptPart =
  'PTRR Plan Step: plan AssetPack synthesis from the accepted Read-Need, ranked fit deposits, selected source-safe evidence, repository constraints, proof obligations, preview measurements, and post-settlement delivery boundary.' as PromptPart;
