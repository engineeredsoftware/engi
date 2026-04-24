import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Industrial AST parsing agent purpose with concrete algorithmic objectives"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "algorithmic_precision", "test": "Does the purpose specify concrete AST parsing algorithms? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_clarity", "test": "Can developers implement the specified algorithms? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_specificity", "test": "Does it describe concrete parsing operations? Rate 0-1", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PURPOSE_CORESTATEMENT: PromptPart = 
  'Execute AST parsing and indexing operations using Language Server Protocol for symbol table construction, dependency graph building, cross-reference index generation, and pattern matching algorithms to identify code structures matching search criteria' as PromptPart;