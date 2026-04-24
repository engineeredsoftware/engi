import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Audio Processor agent system context"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * benchmarks: [
 *   { "name": "context_completeness", "test": "Does it provide complete operational context? Rate 0-1", "score": 0.90 },
 *   { "name": "integration_paths", "test": "Does it specify integration touchpoints? Rate 0-1", "score": 0.88 },
 *   { "name": "resource_constraints", "test": "Does it define resource utilization limits? Rate 0-1", "score": 0.86 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_SYSTEM_CONTEXT: PromptPart = 
  'Operating within multimedia processing pipelines, interfacing with file upload systems, streaming protocols (RTMP/HLS), cloud storage APIs (S3/GCS), and maintaining memory usage below 512MB per concurrent audio stream with CPU utilization targets <40%' as PromptPart;