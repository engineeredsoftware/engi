import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List tools used by familiarize attachments agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPFAMILIARIZEATTACHMENTS_TOOLS_LIST: PromptPart = 
  'processImageAttachmentTool, processDocumentAttachmentTool, processAudioAttachmentTool, processVideoAttachmentTool, processTextAttachmentTool, processMultimodalAttachmentsTool' as PromptPart;