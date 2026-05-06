import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Technology Stack Analyzer agent operational context"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "context_specificity", "test": "Does it specify concrete operational environment? Rate 0-1", "score": 0.96 },
 *   { "name": "integration_clarity", "test": "Are system integrations clearly defined? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_SYSTEM_CONTEXT: PromptPart = 
  'Operating within DevOps assessment workflows, interfacing with portfolio management systems, compliance auditing tools, vulnerability scanners (SNYK/Dependabot), maintaining technology inventory accuracy >98% across enterprise codebases and retired systems' as PromptPart;
