import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define audio processor agent try phase processing strategy"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.92 },
 *   { "name": "strategy_adaptability", "test": "Does it describe adaptive processing?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_TRY_PROCESSING_STRATEGY: PromptPart = 
  'Implement adaptive processing strategy: analyze input characteristics for optimal algorithm selection, apply parallel processing for multi-channel audio, use streaming buffers for large files, implement fallback codecs for compatibility, and monitor processing metrics in real-time' as PromptPart;