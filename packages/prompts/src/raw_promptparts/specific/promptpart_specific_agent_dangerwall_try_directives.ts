import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution for Danger Wall agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_precision", "test": "Is execution precise?", "score": 0.36 },
 *   { "name": "operational_clarity", "test": "Are operations clear?", "score": 0.35 },
 *   { "name": "output_quality", "test": "Is output quality high?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_TRY_DIRECTIVES: PromptPart = 
  'Execute security analysis through: static code vulnerability scanning, dependency vulnerability assessment, configuration security auditing, secret and credential detection, permission and access control review, injection vulnerability testing, compliance violation checking' as PromptPart;