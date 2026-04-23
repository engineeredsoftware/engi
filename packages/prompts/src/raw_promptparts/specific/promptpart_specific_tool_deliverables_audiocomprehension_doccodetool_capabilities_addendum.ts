import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Deliverables-specific capabilities addendum describing audio comprehension focus"
 * current_version: "0.50.0"
 * versions: [
 *   { "version": "GA1.20.0", "score": 0.50, "content": "Understands audio", "reason": "No mention of transcription/diarization" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "References transcription/diarization?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Actionable guidance?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_AUDIOCOMPREHENSION_DOCCODETOOL_CAPABILITIES_ADDENDUM: PromptPart =
  'Focus: audio comprehension; supports transcription, speaker diarization, keyword/topic extraction, and task-relevance summarization' as PromptPart;
