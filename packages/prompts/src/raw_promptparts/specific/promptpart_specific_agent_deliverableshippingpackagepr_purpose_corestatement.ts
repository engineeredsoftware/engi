import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define core purpose for shipping package PR agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGPACKAGEPR_PURPOSE_CORESTATEMENT: PromptPart = 
  'package validated written assets and file-change evidence into a well-structured pull request shipping wrapper with comprehensive documentation' as PromptPart;
