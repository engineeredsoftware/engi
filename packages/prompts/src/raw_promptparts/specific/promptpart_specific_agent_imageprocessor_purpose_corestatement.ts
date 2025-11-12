import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Image Processor agent purpose"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PURPOSE_CORESTATEMENT: PromptPart = 
  'Process, analyze, and extract insights from images and visual content with advanced machine learning computer vision and intelligent visual understanding' as PromptPart;