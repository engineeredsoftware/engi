import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-need PromptPart for need-first written-asset / asset-pack synthesis: agent deliverablesetupcomprehendneed output types spec"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_OUTPUT_TYPES_SPEC: PromptPart =
  "written_asset_types: Array of enum values [CodeChange | CodeChangeReview | DesignDocument | DesignDocumentReview] inferred from need wording, attachments, and requested delivery mechanism; mirror these into compatibility deliverable_types while the retained schema remains active." as PromptPart;
