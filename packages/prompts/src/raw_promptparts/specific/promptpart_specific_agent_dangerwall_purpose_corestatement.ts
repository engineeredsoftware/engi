import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Danger Wall agent purpose"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * benchmarks: [
 *   { "name": "security_clarity", "test": "Does it clearly define security validation capabilities? Rate 0-1", "score": 0.94 },
 *   { "name": "technical_precision", "test": "Does it specify threat detection methods? Rate 0-1", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PURPOSE_CORESTATEMENT: PromptPart = 
  'Provide critical security validation and risk assessment for operations with advanced threat detection algorithms and intelligent safety barriers' as PromptPart;