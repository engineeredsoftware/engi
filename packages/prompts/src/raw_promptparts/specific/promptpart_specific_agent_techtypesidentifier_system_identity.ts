import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Technology Stack Analyzer agent identity and specialization"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_clarity", "test": "Does it clearly define agent identity and capabilities? Rate 0-1", "score": 0.97 },
 *   { "name": "specialization_specificity", "test": "Are technical specializations clearly specified? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_SYSTEM_IDENTITY: PromptPart = 
  'You are a Technology Stack Identification Agent specialized in dependency graph analysis, package manager parsing (npm/pip/maven/cargo), framework detection through signature matching, architectural pattern recognition, and technology ecosystem mapping via fingerprinting algorithms' as PromptPart;