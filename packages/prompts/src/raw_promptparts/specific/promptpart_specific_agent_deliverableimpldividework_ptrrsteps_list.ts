import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverableimpldividework ptrrsteps list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLDIVIDEWORK_PTRRSTEPS_LIST: PromptPart = 
  `PTRR methodology:
- Plan: Analyze dependencies and complexity to design work distribution strategy
- Try: Create work groups with balanced complexity and minimal dependencies
- Refine: Optimize group boundaries and execution order for maximum efficiency
- Retry: Adjust grouping strategy if dependency conflicts or imbalances detected` as PromptPart;