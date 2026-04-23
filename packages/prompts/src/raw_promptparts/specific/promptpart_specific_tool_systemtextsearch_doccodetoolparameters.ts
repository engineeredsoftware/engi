/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Specifies parameters for Bitcode repository-evidence search over a bounded working directory"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' specify all required text search parameters? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_accuracy", "test": "Are parameter types and requirements accurate? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_guidance", "test": "Do parameters provide clear implementation guidance? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLPARAMETERS: PromptPart = 
  'pattern: string | string[] (required) - grep extended-regex evidence pattern(s); cwd: string (optional) - repository or package working directory; maxResults: number (optional) - bounded evidence limit; ignoreCase: boolean (optional) - case-insensitive matching' as PromptPart;
