import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Danger Wall agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.39 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.38 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Analyze for dangers by: scanning for security vulnerabilities and injection risks, identifying authentication and authorization weaknesses, detecting data exposure and privacy violations, evaluating dependency vulnerabilities and supply chain risks, assessing configuration security and secret management, checking for compliance violations and regulatory issues, generating comprehensive risk assessment reports' as PromptPart;