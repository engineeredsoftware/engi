import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Audio Processor agent PTRR steps"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * benchmarks: [
 *   { "name": "step_clarity", "test": "Does it clearly define each PTRR step? Rate 0-1", "score": 0.92 },
 *   { "name": "technical_precision", "test": "Does it specify technical processing steps? Rate 0-1", "score": 0.89 },
 *   { "name": "workflow_completeness", "test": "Does it cover complete audio processing workflow? Rate 0-1", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Analyze audio format, content type, and processing requirements
Try: Execute speech recognition and semantic content extraction
Refine: Apply quality enhancement and advanced pattern analysis algorithms
Retry: Optimize transcription accuracy and semantic understanding with advanced models` as PromptPart;