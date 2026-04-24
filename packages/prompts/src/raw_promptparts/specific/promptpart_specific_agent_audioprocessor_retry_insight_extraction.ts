import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define audio processor agent retry phase insight extraction"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.91 },
 *   { "name": "analysis_depth", "test": "Does it describe advanced audio analysis?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_RETRY_INSIGHT_EXTRACTION: PromptPart = 
  'Extract deeper audio insights through advanced analysis: identify harmonic relationships and musical scales, detect emotional content via prosodic features, analyze acoustic environments and reverberation characteristics, classify audio sources and instruments, and generate comprehensive audio fingerprints for similarity matching' as PromptPart;