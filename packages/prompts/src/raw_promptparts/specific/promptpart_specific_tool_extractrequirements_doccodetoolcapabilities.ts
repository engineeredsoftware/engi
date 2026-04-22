/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities listing for requirements extraction tool"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Multi-modal requirement parsing, hierarchical categorization, implicit specification inference, contextual dependency mapping, functional requirement isolation, non-functional constraint identification, stakeholder perspective analysis, priority stratification, and cognitive requirement pattern recognition",
 *     "score": 0.70,
 *     "reason": "Contains 'multi-modal', 'cognitive' - non-industrial terms"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "requirement_extraction_accuracy", "test": "Does it extract specific functional and non-functional requirements? Rate 0-1", "score": 0.93 },
 *   { "name": "stakeholder_analysis", "test": "Are stakeholder needs clearly categorized? Rate 0-1", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement requirement extraction? Rate 0-1", "score": 0.89 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Natural language processing for requirement text analysis using spaCy and NLTK, functional requirement extraction through keyword pattern matching, non-functional requirement identification including performance, security, and usability specifications, user story parsing with role-goal-benefit structure analysis, acceptance criteria generation from requirement statements, business rule extraction through logical condition parsing, data requirement identification including entity relationships and constraints, API requirement specification through endpoint and parameter analysis, integration requirement detection across system boundaries, compliance requirement mapping to regulatory standards, stakeholder need categorization by role and priority, requirement traceability matrix generation with forward and backward linking' as PromptPart;