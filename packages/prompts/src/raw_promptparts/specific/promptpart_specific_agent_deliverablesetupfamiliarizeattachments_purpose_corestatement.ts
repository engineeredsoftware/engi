import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of familiarize attachments agent in deliverables setup"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPFAMILIARIZEATTACHMENTS_PURPOSE_CORESTATEMENT: PromptPart = 
  'Analyze multimodal attachments to extract technical specifications, repository references, design assets, and security risks using content processing tools' as PromptPart;