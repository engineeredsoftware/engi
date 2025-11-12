import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define danger wall agent plan phase instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.92 },
 *   { "name": "methodology_clarity", "test": "Does it define clear security methodologies?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_INSTRUCTIONS: PromptPart = 
  'Analyze security validation requirements: identify attack vectors and threat models, determine scanning scope and depth, select appropriate security tools and methodologies, establish risk assessment criteria, and define compliance validation checkpoints' as PromptPart;