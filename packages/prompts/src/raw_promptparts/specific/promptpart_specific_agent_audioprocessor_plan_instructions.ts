import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define audio processor agent plan phase instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.93 },
 *   { "name": "tool_specificity", "test": "Does it reference specific tools/techniques?", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_PLAN_INSTRUCTIONS: PromptPart = 
  'Analyze audio processing requirements: identify input formats and codecs, determine spectral analysis parameters, select appropriate DSP algorithms, establish quality thresholds, and define output specifications with performance benchmarks' as PromptPart;