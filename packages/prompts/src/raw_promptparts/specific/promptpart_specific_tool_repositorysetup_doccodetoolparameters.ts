/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameters description for repository setup (clone repository) tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' clearly describe all parameters? Rate 0-1" },
 *   { "name": "option_coverage", "test": "Does '{{content}}' cover key cloning options? Rate 0-1" },
 *   { "name": "type_specification", "test": "Does '{{content}}' specify parameter types? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLPARAMETERS: PromptPart = 
  'provider: "github"|"gitlab"|"bitbucket" (required) - VCS provider type; owner: string (required) - Repository owner/organization; name: string (required) - Repository name; ref: string (optional, default: "main") - Branch, tag, or commit; connectionId: number (required) - VCS connection ID for authentication; targetPath: string (optional) - Custom clone destination; shallow: boolean (optional, default: false) - Shallow clone flag; depth: number (optional, default: 1) - Depth for shallow clones; submodules: boolean (optional, default: true) - Initialize submodules; cache: object (optional) - Cache configuration with enabled, ttl, and strategy options' as PromptPart;