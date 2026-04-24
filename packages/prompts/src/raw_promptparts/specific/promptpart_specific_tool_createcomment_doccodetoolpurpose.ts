/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for Create Comment Tool"
 * current_version: "V26.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "collaboration_enhancement", "test": "Does '{{content}}' clearly articulate enhancement of team collaboration through intelligent commenting? Rate 0-1" },
 *   { "name": "context_intelligence", "test": "Does the purpose '{{content}}' emphasize context-aware and intelligent comment generation? Rate 0-1" },
 *   { "name": "workflow_optimization", "test": "Does '{{content}}' highlight optimization of communication workflows across platforms? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATECOMMENT_DOCCODETOOLPURPOSE: PromptPart = 
  'Elevates collaborative development through intelligent comment orchestration, providing context-aware communication that bridges code reviews, issue discussions, and project coordination with natural language processing for sentiment analysis, automated threading, stakeholder routing, and integration across development platforms to foster productive team interactions and knowledge transfer' as PromptPart;