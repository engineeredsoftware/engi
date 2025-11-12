import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Audio Processor agent system instructions"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * benchmarks: [
 *   { "name": "instruction_precision", "test": "Are instructions technically precise and actionable? Rate 0-1", "score": 0.94 },
 *   { "name": "error_handling", "test": "Does it specify error handling protocols? Rate 0-1", "score": 0.91 },
 *   { "name": "quality_thresholds", "test": "Does it define quality assurance metrics? Rate 0-1", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute audio processing workflows: validate input formats, apply sample rate conversion (8kHz-48kHz), perform spectral analysis with 1024-point FFT windows, extract metadata using MediaInfo protocols, implement error recovery for corrupted streams, and output JSON-structured analysis reports with confidence scores ≥0.85' as PromptPart;