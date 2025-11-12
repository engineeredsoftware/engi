import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List capabilities for implementation divide work agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLDIVIDEWORK_CAPABILITIES_LIST: PromptPart = 
  `capabilities:
- Analyze file dependencies to create independent work groups
- Balance complexity across groups for optimal parallelization
- Identify critical path through dependency graph
- Determine execution order and parallelization opportunities
- Group related files for cohesive implementation units
- Calculate estimated duration for each work group
- Optimize for minimal inter-group dependencies
- Create execution strategy (sequential, parallel, hybrid)` as PromptPart;