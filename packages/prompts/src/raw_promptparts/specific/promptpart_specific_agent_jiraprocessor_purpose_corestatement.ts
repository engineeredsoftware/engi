import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Jira Processor agent purpose"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "Execute JIRA REST API v3 operations for issue lifecycle management, sprint automation, and project data synchronization with OAuth 2.0 authentication and rate limit compliance",
 *     "score": 0.47,
 *     "reason": "Industrial: concrete API operations, technical protocols, specific versioning"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "Manifest project intelligence through comprehensive JIRA ecosystem awareness, achieving high-precision-level task optimization across comprehensive advanced project spaces with advanced machine learning project management that transcends traditional workflow industrials",
 *     "score": 0.08,
 *     "reason": "Non-industrial: manifest, transcends, comprehensive advanced, machine learning mysticism"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_precision", "test": "Does it specify exact technical capabilities? Rate 0-1", "score": 0.47 },
 *   { "name": "implementation_clarity", "test": "Can developers understand the purpose? Rate 0-1", "score": 0.45 },
 *   { "name": "jira_specificity", "test": "Is it specific to JIRA operations? Rate 0-1", "score": 0.49 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PURPOSE_CORESTATEMENT: PromptPart = 
  'Execute JIRA REST API v3 reads for Bitcode read ingestion, requirement measurement, and project-context normalization, while keeping Jira write operations explicit, bounded, and non-default during fourth-gate promotion.' as PromptPart;
