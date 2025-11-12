import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List capabilities for shipping package PR agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGPACKAGEPR_CAPABILITIES_LIST: PromptPart = 
  `capabilities:
- Generate descriptive PR titles following conventional commits
- Create comprehensive PR descriptions with context
- Summarize changes and their impact clearly
- Generate review guidelines for reviewers
- Identify risk areas and testing requirements
- Apply appropriate labels and metadata
- Calculate change statistics and metrics
- Format content for optimal readability` as PromptPart;