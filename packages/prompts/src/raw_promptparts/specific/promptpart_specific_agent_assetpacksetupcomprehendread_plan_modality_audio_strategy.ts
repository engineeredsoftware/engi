import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-read PromptPart for read-first written-asset / asset-pack synthesis: agent assetpacksetupcomprehendread plan modality audio strategy"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses read-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "support_ready", "test": "AssetPack setup corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDREAD_PLAN_MODALITY_AUDIO_STRATEGY: PromptPart =
  "Audio: transcribe to text; apply speaker diarization when useful. Extract keywords, topics, decisions, and action items; summarize segments most relevant to read satisfaction and written-asset synthesis." as PromptPart;
