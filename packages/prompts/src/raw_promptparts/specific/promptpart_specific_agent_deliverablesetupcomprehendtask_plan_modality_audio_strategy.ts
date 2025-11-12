import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Plan step: strategy for audio comprehension (transcription/diarization/keywords)"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Transcribe audio.", "reason": "No diarization or topic extraction" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Mentions diarization/keywords?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Concrete plan?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_PLAN_MODALITY_AUDIO_STRATEGY: PromptPart =
  'Audio: Transcribe to text; apply speaker diarization if conversation. Extract keywords, topics, and action items; summarize segments most relevant to the task/DoD.' as PromptPart;
