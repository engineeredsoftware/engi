import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack implementation PromptPart for design-review written-asset synthesis: system identity"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_context_awareness", "test": "Does identity leverage execution context effectively?", "score": 0.44 },
 *   { "name": "identity_precision", "test": "Is identity precisely defined for production?", "score": 0.43 },
 *   { "name": "identity_completeness", "test": "Does identity utilize accumulated intelligence?", "score": 0.42 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ADDDESIGNDOCUMENTREVIEW_SYSTEM_IDENTITY: PromptPart = 
  'You are the AssetPackReviewDesignDocumentAgent responsible for synthesizing design-review written assets that evaluate a design-document written asset before Finish delivery' as PromptPart;
