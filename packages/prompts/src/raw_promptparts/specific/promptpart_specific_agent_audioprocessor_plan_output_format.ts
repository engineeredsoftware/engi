import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define audio processor agent plan phase output format"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.91 },
 *   { "name": "structure_clarity", "test": "Does it define clear output structure?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_PLAN_OUTPUT_FORMAT: PromptPart = 
  'Structure audio processing plan as JSON schema: {\"input_analysis\": {\"format\": \"string\", \"sample_rate\": \"number\", \"channels\": \"number\"}, \"processing_pipeline\": [\"algorithm_steps\"], \"output_specifications\": {\"target_format\": \"string\", \"quality_metrics\": \"object\"}, \"performance_requirements\": {\"latency_ms\": \"number\", \"throughput_files_per_hour\": \"number\"}}' as PromptPart;