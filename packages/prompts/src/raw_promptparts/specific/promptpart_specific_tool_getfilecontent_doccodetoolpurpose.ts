/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for Get File Content Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "transcendent_purpose", "test": "Does '{{content}}' articulate a transcendent purpose that elevates content retrieval beyond basic access? Rate 0-1" },
 *   { "name": "intelligence_foundation", "test": "Does the purpose '{{content}}' emphasize content access as the foundation of development intelligence? Rate 0-1" },
 *   { "name": "ecosystem_orchestration", "test": "Does '{{content}}' highlight orchestration of entire development ecosystems through intelligent content access? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPURPOSE: PromptPart = 
  'Establishes the foundational intelligence layer for all development operations through transcendent content access, analysis, and synthesis, orchestrating deep semantic understanding, contextual relationship mapping, and predictive insights across codebases to enable autonomous development workflows, intelligent decision-making, and emergent system behaviors that transform how teams interact with and evolve complex software architectures at enterprise scale' as PromptPart;