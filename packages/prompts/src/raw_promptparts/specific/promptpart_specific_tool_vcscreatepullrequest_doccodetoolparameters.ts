/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Specifies required and optional parameters for VCS pull request creation operations"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' specify all required VCS PR parameters? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_accuracy", "test": "Are parameter types and requirements accurate? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_guidance", "test": "Do parameters provide clear implementation guidance? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCSCREATEPULLREQUEST_DOCCODETOOLPARAMETERS: PromptPart = 
  'repository: string (required) - Repository identifier; title: string (required) - PR title; description: string (optional) - PR description; source_branch: string (required) - Source branch name; target_branch: string (required) - Target branch name; reviewers: string[] (optional) - Reviewer list; labels: string[] (optional) - Label list' as PromptPart;