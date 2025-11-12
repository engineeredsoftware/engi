import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define image processor agent system context"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.96 },
 *   { "name": "platform_specificity", "test": "Does it reference specific platforms/APIs?", "score": 0.94 },
 *   { "name": "performance_metrics", "test": "Does it include measurable targets?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_SYSTEM_CONTEXT: PromptPart = 
  'Operating within media processing pipelines, interfacing with CDN services (CloudFront/CloudFlare), image optimization APIs (TinyPNG/ImageOptim), ML model serving platforms (TensorFlow Serving/MLflow), maintaining processing throughput >500 images/minute with GPU acceleration support' as PromptPart;