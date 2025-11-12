import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Plan step: strategy for video comprehension (frame sampling/scene detection/transcript)"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Analyze video.", "reason": "Missing frame sampling and audio extraction details" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Includes frame sampling/scene/audio?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Actionable guidance?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_PLAN_MODALITY_VIDEO_STRATEGY: PromptPart =
  'Video: Sample frames across scenes; perform scene/element detection. Extract transcript from audio track; cross-reference visual and spoken content; summarize task-relevant insights.' as PromptPart;
