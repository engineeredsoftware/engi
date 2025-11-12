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
  'code-change: Generate implementation patches for feature requests\ncode-review: Create line-level review comments on existing PRs\ndesign-change: Modify architecture diagrams and technical specifications\ndesign-review: Analyze design documents for consistency and completeness' as PromptPart;