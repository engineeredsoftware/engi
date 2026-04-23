import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverablesdiscimplplan ptrrsteps list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESDISCIMPLPLAN_PTRRSTEPS_LIST: PromptPart = 
  `PTRR methodology:
- Plan: Decompose requirements into implementation phases based on dependencies
- Try: Generate task breakdown with file operations and effort estimates
- Refine: Optimize phase sequencing, resolve circular dependencies, balance workload
- Retry: Adjust plan based on complexity constraints and risk factors` as PromptPart;