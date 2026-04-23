import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Canonical deliverables setup comprehend-need audio comprehension execution details"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TRY_MODALITY_AUDIO_EXECUTION: PromptPart =
  "Execute: transcribe; diarize speakers if multi-party; extract keywords, topics, decisions, and action items; summarize need-relevant audio content for written-asset synthesis." as PromptPart;
