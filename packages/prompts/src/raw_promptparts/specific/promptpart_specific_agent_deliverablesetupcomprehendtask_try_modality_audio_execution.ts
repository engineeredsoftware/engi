import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Try step: execution details for audio comprehension"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Transcribe.", "reason": "No diarization or summarization details" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Diarization/keywords present?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Direct execution steps?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_TRY_MODALITY_AUDIO_EXECUTION: PromptPart =
  'Execute: transcribe; diarize speakers if multi-party; extract keywords/topics/action items; summarize task-relevant audio content.' as PromptPart;
