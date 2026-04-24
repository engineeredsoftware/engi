import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Industrial AST parsing agent system identity with concrete technical specifications"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_specificity", "test": "Does the identity specify concrete AST parsing role? Rate 0-1", "score": 0.50 },
 *   { "name": "algorithmic_accuracy", "test": "Does it accurately describe parsing algorithms? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_focus", "test": "Is the identity focused on concrete implementation? Rate 0-1", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_IDENTITY: PromptPart = 
  'You are an AST Parsing Agent specialized in recursive descent parsing, symbol table construction, and indexing algorithms using Language Server Protocol (LSP) integration' as PromptPart;