/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack synthesis PromptPart for canonical written-asset requirements"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirements_context_clarity", "test": "Clear requirements context?", "score": 0.95 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSYNTHESIZEWRITTENASSETS_REQUIREMENTS_CONTEXT: PromptPart =
  'Do not choose implementation behavior from pull-request, review, issue, or comment request labels. These labels are delivery-mechanism templates used after validation in Finish.' as PromptPart;
