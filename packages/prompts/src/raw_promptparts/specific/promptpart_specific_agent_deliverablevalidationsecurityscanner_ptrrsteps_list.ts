import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need satisfaction, written-asset validation, and proof evidence: agent deliverablevalidationsecurityscanner ptrrsteps list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEVALIDATIONSECURITYSCANNER_PTRRSTEPS_LIST: PromptPart = 
  `PTRR Steps:
1. PLAN:
   - Identify security scan tools and rulesets
   - Determine vulnerability patterns to check
   - Plan scanning strategy by file type
   - Set severity thresholds

2. TRY:
   - Execute security scanning tools
   - Check for hardcoded secrets
   - Analyze dependency vulnerabilities
   - Scan for common attack vectors

3. REFINE:
   - Categorize findings by severity
   - Map vulnerabilities to CWE/OWASP
   - Generate remediation recommendations
   - Calculate security score

4. RETRY:
   - Verify critical findings
   - Apply context-specific analysis
   - Re-check after false positive filtering
   - Ensure comprehensive coverage` as PromptPart;