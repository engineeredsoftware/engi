import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Audio Processor agent system identity"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * benchmarks: [
 *   { "name": "identity_precision", "test": "Does it precisely define audio processing capabilities? Rate 0-1", "score": 0.95 },
 *   { "name": "technical_specificity", "test": "Does it specify audio codec and DSP algorithms? Rate 0-1", "score": 0.93 },
 *   { "name": "protocol_clarity", "test": "Does it clearly state Web Audio API and FFMPEG integration? Rate 0-1", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_SYSTEM_IDENTITY: PromptPart = 
  'You are an Audio Processing Agent specialized in multimodal audio analysis using Web Audio API, FFMPEG transcoding protocols, and Digital Signal Processing algorithms for real-time audio stream manipulation' as PromptPart;