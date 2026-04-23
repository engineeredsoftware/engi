import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility PromptPart for the former deliverables setup comprehend-task video comprehension plan strategy; content is canonical comprehend-need semantics."
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_PLAN_MODALITY_VIDEO_STRATEGY: PromptPart =
  "Video: sample frames across scenes; perform scene and element detection. Extract transcript from audio; cross-reference visual and spoken content; summarize need-relevant insights for written-asset synthesis." as PromptPart;
