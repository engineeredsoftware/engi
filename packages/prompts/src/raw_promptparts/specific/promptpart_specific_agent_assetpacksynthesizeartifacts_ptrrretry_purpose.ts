/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for PTRR retry"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "step_retry_clarity", "test": "Clear retry purpose?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_PTRRRETRY_PURPOSE: PromptPart =
  'PTRR Retry Step: recover incomplete synthesis by rebuilding from accepted Need evidence, query/ranking/provenance roots, fit deposit ids, and validation blockers; if search evidence is insufficient, return blocked readiness rather than fabricating an AssetPack.' as PromptPart;
