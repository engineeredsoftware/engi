/**
 * PROMPTPART: System Text Search Tool Name
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool name for system text search operations"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
   { "name": "clarity", "test": "Does '{{content}}' clearly identify the tool?", "score": 0.50 },
   { "name": "consistency", "test": "Is the name consistent with other tool names?", "score": 0.50 },
   { "name": "descriptiveness", "test": "Does the name describe the tool's function?", "score": 0.50 }
 ]
 * 
 * @domain content-discovery
 * @intent Identifies the System Text Search tool for codebase analysis
 * @benchmarks v2.0.0 industrial language patterns
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLNAME: PromptPart = 
  'System Text Search Tool' as PromptPart;