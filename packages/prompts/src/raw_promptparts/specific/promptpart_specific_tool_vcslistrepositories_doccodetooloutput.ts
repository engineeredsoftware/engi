/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output format specification for VCS list repositories tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure_clarity", "test": "Does '{{content}}' clearly describe the output data structure? Rate 0-1", "score": 0.50 },
 *   { "name": "field_completeness", "test": "Are all important repository fields mentioned? Rate 0-1", "score": 0.50 },
 *   { "name": "type_inference", "test": "Can developers infer the data types from the description? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLOUTPUT: PromptPart = 
  'Array of repository objects containing: id, name, fullName, description, private status, owner info, urls (clone/html), default branch, size, language, timestamps, star/fork counts' as PromptPart;