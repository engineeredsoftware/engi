import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Code analysis capabilities for Get File Content Tool"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "ast_parsing_specificity", "test": "Does it reference specific AST parsers? Rate 0-1", "score": 0.94 },
 *   { "name": "syntax_highlighting", "test": "Are syntax highlighting libraries specified? Rate 0-1", "score": 0.92 },
 *   { "name": "dependency_analysis", "test": "Are dependency parsing methods clear? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_CODEANALYSIS_CAPABILITIES: PromptPart = 
  'Syntax highlighting using Prism.js or highlight.js, AST parsing with Babel/Tree-sitter for code analysis, dependency analysis through import/require statement parsing, code intelligence features with LSP (Language Server Protocol) integration' as PromptPart;