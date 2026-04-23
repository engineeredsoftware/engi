import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility PromptPart for the former deliverables setup comprehend-task written-asset type output specification; content is canonical comprehend-need semantics."
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_OUTPUT_TYPES_SPEC: PromptPart =
  "written_asset_types: Array of enum values [CodeChange | CodeChangeReview | DesignDocument | DesignDocumentReview] inferred from need wording, attachments, and requested shipping wrapper; mirror these into compatibility deliverable_types while the retained schema remains active." as PromptPart;
