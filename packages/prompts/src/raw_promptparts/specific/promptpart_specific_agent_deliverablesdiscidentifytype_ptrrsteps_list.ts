import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR methodology steps for discovery identify type agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESDISCIDENTIFYTYPE_PTRRSTEPS_LIST: PromptPart = 
  `PTRR methodology:
- Plan: Gather all available context sources and define identification criteria
- Try: Apply pattern matching and keyword analysis to determine type
- Refine: Resolve ambiguities between similar types, adjust confidence scores
- Retry: Re-evaluate with additional context if confidence is below threshold` as PromptPart;