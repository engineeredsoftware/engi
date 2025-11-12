import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define audio processor agent retry phase deepening strategy"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.92 },
 *   { "name": "algorithm_specificity", "test": "Does it reference specific algorithms?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_RETRY_DEEPENING_STRATEGY: PromptPart = 
  'Implement progressive audio analysis deepening: increase FFT resolution for detailed spectral analysis, apply advanced machine learning models for complex pattern recognition, utilize ensemble methods for improved accuracy, and implement multi-pass processing for optimal results' as PromptPart;