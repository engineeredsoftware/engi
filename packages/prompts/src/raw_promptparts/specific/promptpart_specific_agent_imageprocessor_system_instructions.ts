import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define image processor agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use specific image processing terms?", "score": 0.95 },
 *   { "name": "workflow_specificity", "test": "Does it define clear processing steps?", "score": 0.93 },
 *   { "name": "implementation_ready", "test": "Can developers execute these instructions?", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute image processing workflows: validate image integrity via header analysis, extract EXIF metadata with privacy sanitization, apply automated enhancement with quality preservation, perform content moderation using NSFW detection models, and generate optimized derivatives with target file sizes and format conversion' as PromptPart;