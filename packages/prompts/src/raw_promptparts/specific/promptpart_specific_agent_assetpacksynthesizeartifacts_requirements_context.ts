/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for canonical synthesis-artifact requirements"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "requirements_context_clarity", "test": "Clear requirements context?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEARTIFACTS_REQUIREMENTS_CONTEXT: PromptPart =
  'Preserve many-candidate search provenance: accepted Need id, query root, ranking root, selected fit provenance root, fit deposit asset ids, embedding policy, source revision, and disclosure posture. Provide only a source-safe preview before settlement; source-bearing AssetPack delivery waits for paid settlement, BTD rights transfer, and ledger readback. Do not choose implementation behavior from pull-request, review, issue, or comment request labels; these labels are delivery-mechanism templates used after validation and settlement in Finish.' as PromptPart;
