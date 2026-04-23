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
- Generate descriptive pull request wrapper titles following repository conventions
- Create comprehensive pull request shipping summaries with written-asset context
- Summarize validated written assets, file changes, and their impact clearly
- Generate review guidance for reviewers on the shipping surface
- Identify risk areas and testing requirements before the wrapper is emitted
- Apply appropriate labels and shipping metadata
- Calculate change statistics and written-asset metrics
- Format content for optimal readability across the connected-interface shipping surface` as PromptPart;
