import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define audio processor agent refine phase quality criteria"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.96 },
 *   { "name": "metric_precision", "test": "Does it provide specific measurable thresholds?", "score": 0.98 },
 *   { "name": "industry_standards", "test": "Does it reference industry standard metrics?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_REFINE_QUALITY_CRITERIA: PromptPart = 
  'Validate audio processing quality: SNR >60dB, THD+N <0.01%, frequency response ±0.5dB (20Hz-20kHz), processing latency <2s, transcription accuracy >95% WER, and output format compliance with industry standards (WAVE/MP3/FLAC specifications)' as PromptPart;