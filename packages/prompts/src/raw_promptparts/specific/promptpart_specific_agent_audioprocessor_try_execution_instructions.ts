import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define audio processor agent try phase execution instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.93 },
 *   { "name": "workflow_clarity", "test": "Does it define clear processing steps?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart = 
  'Execute audio processing workflow: load audio file with format validation, apply preprocessing (normalization/denoising), implement selected DSP algorithms, perform quality assessment via SNR/THD+N measurements, and generate output with metadata embedding' as PromptPart;