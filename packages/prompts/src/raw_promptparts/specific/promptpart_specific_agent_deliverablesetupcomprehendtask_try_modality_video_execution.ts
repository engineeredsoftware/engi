import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Try step: execution details for video comprehension"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Analyze frames.", "reason": "Missing scene detection/transcript fusion" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Frames/scenes/audio transcript?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Clear execution details?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_TRY_MODALITY_VIDEO_EXECUTION: PromptPart =
  'Execute: sample frames per scene; detect salient visual elements; extract audio transcript; produce fused comprehension unifying visual and spoken content.' as PromptPart;
