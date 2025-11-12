import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define audio processor agent plan phase analysis approach"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.92 },
 *   { "name": "tool_specificity", "test": "Does it reference specific tools/techniques?", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_PLAN_ANALYSIS_APPROACH: PromptPart = 
  'Apply systematic audio analysis methodology: frequency domain decomposition via FFT, temporal feature extraction using window functions, machine learning model selection for classification tasks, and performance optimization through algorithm complexity analysis' as PromptPart;