import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode AssetPack tool PromptPart for need-first asset-pack setup and written-asset evidence: tool asset-pack audiocomprehension doccodetool capabilities addendum"
 * current_version: "0.50.0"
 * versions: [
 *   { "version": "V26.20.0", "score": 0.50, "content": "Understands audio", "reason": "No mention of transcription/diarization" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "References transcription/diarization?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Actionable guidance?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_ASSET_PACK_AUDIOCOMPREHENSION_DOCCODETOOL_CAPABILITIES_ADDENDUM: PromptPart =
  'Focus: audio comprehension; supports transcription, speaker diarization, keyword/topic extraction, and task-relevance summarization' as PromptPart;
