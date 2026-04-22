/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for Create Pull Request Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' specify all necessary parameters for comprehensive PR creation? Rate 0-1" },
 *   { "name": "flexibility_support", "test": "Do the parameters in '{{content}}' support flexible PR creation workflows? Rate 0-1" },
 *   { "name": "enterprise_features", "test": "Are enterprise-level parameters for compliance and governance included in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLPARAMETERS: PromptPart = 
  'repository: string (target repository identifier), source_branch: string (feature branch name), target_branch: string (base branch, defaults to main/master), title: string (PR title with smart generation), description?: string (detailed description with template support), reviewers?: string[] (reviewer usernames or team identifiers), labels?: string[] (categorization labels), milestone?: string (project milestone association), draft?: boolean (create as draft PR), auto_merge?: boolean (enable auto-merge on approval), template?: string (PR template identifier), linked_issues?: string[] (associated issue numbers), merge_strategy?: string (merge/squash/rebase preference), and metadata?: object (custom platform-specific fields)' as PromptPart;