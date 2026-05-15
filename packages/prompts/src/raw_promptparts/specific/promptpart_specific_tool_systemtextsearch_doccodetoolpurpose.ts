/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Defines Bitcode read-measurement and asset-pack source-grounding purpose for grep-backed repository evidence search"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain the tool's purpose? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_precision", "test": "Is the purpose described with technical accuracy? Rate 0-1", "score": 0.50 },
 *   { "name": "scope_definition", "test": "Does it clearly define the search scope and capabilities? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLPURPOSE: PromptPart = 
  'Collect line-level repository evidence with grep-backed recursive search so Bitcode agents can measure reads, inspect proof/source owners, and ground written-asset or AssetPack synthesis decisions' as PromptPart;
