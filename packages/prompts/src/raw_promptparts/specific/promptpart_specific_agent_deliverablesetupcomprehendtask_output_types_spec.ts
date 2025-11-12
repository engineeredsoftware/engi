import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Specify deliverable types output expectations for deliverables comprehend-task agent"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Return the type", "reason": "No mention of enum or multiple types" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Mentions enum-backed values, multiplicity?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Clear mapping to enum and array?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_OUTPUT_TYPES_SPEC: PromptPart =
  'deliverable_types: Array of enum values [CodeChange | CodeChangeReview | DesignDocument | DesignDocumentReview] inferred from DoD wording' as PromptPart;
