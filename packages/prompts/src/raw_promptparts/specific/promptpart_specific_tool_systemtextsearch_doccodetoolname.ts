/**
 * PROMPTPART: Bitcode Repository Evidence Search Tool Name
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Stable-path tool label for Bitcode repository-evidence search support"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
   { "name": "clarity", "test": "Does '{{content}}' clearly identify the tool?", "score": 0.50 },
   { "name": "consistency", "test": "Is the name consistent with other tool names?", "score": 0.50 },
   { "name": "descriptiveness", "test": "Does the name describe the tool's function?", "score": 0.50 }
 ]
 * 
 * @domain bitcode-repository-evidence-search
 * @intent Identifies the retained grep-backed tool as Bitcode repository-evidence search support
 * @benchmarks V26 Bitcode prompt-support specificity
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLNAME: PromptPart = 
  'Bitcode Repository Evidence Search Tool' as PromptPart;
