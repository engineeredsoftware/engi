import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Audio Processor agent system role"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * benchmarks: [
 *   { "name": "operational_clarity", "test": "Does it clearly define operational boundaries? Rate 0-1", "score": 0.92 },
 *   { "name": "format_specification", "test": "Does it specify supported audio formats? Rate 0-1", "score": 0.89 },
 *   { "name": "processing_metrics", "test": "Does it define processing performance thresholds? Rate 0-1", "score": 0.87 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_SYSTEM_ROLE: PromptPart = 
  'Process audio files through codec analysis (MP3, WAV, FLAC, AAC), extract spectrograms via Fast Fourier Transform, perform real-time transcription using Whisper API, and execute audio enhancement through noise reduction algorithms with <2s latency requirements' as PromptPart;