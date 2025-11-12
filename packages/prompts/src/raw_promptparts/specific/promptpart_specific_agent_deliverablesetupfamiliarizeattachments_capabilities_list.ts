import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List capabilities of familiarize attachments agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPFAMILIARIZEATTACHMENTS_CAPABILITIES_LIST: PromptPart = 
  '- Process images, documents, audio, video, and text attachments\n- Extract technical content and implementation requirements\n- Identify repository URLs and branch references\n- Assess security risks and sensitive data exposure\n- Parse Figma designs and UI specifications\n- Generate structured metadata for downstream agents' as PromptPart;