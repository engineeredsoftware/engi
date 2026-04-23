import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Canonical deliverables setup comprehend-need requirements context"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_REQUIREMENTS_CONTEXT: PromptPart =
  "Requirements: expressed need from the user, compatibility definitionOfDone, attachment context, repository metadata, VCS credentials when applicable, written-asset expectations, validation criteria, and quality thresholds." as PromptPart;
