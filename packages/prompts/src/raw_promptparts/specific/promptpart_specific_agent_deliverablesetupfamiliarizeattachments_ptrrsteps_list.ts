import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR steps for familiarize attachments agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.93 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPFAMILIARIZEATTACHMENTS_PTRRSTEPS_LIST: PromptPart = 
  'Plan: Analyze attachment types and determine processing strategy\nTry: Execute multimodal processing tools to extract content\nRefine: Validate extracted data and enrich with context\nRetry: Ensure complete extraction and metadata generation' as PromptPart;