import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "List supported deliverable types"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_DELIVERABLE_DELIVERABLETYPE_LIST: PromptPart = 
  'code-change: Synthesize implementation written assets and ship them through pull requests or equivalent connected-interface mechanisms\ncode-review: Synthesize review written assets and ship them through line-level review comments on existing PRs\ndesign-change: Synthesize architecture and technical-specification written assets, then ship them through documents, issues, or equivalent connected-interface mechanisms\ndesign-review: Synthesize design-review written assets and ship them through review comments, issues, or equivalent connected-interface mechanisms' as PromptPart;
