import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define static analysis pipeline for tech detection"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parser_specificity", "test": "Does it reference specific parsers and tools? Rate 0-1", "score": 0.95 },
 *   { "name": "file_format_coverage", "test": "Are key dependency file formats covered? Rate 0-1", "score": 0.93 },
 *   { "name": "implementation_clarity", "test": "Can developers implement this pipeline? Rate 0-1", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_STATICANALYSIS_DETAILCONTENT: PromptPart = 
  `STATIC ANALYSIS PIPELINE:
- Parse package.json, requirements.txt, Gemfile, go.mod for dependency detection
- Analyze file extensions and directory structures using glob patterns
- Extract import statements via AST parsing (Babel, Tree-sitter)
- Identify framework patterns through configuration file analysis` as PromptPart;