/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Defines comprehensive purpose of VCS pull request creation across multiple platforms"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain the tool's purpose? Rate 0-1", "score": 0.50 },
 *   { "name": "platform_coverage", "test": "Does it emphasize cross-platform VCS support? Rate 0-1", "score": 0.50 },
 *   { "name": "workflow_integration", "test": "Does it indicate workflow integration capabilities? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCSCREATEPULLREQUEST_DOCCODETOOLPURPOSE: PromptPart = 
  'Create pull requests across VCS platforms (GitHub, GitLab, Bitbucket) with unified interface, automated workflows, and comprehensive metadata management' as PromptPart;