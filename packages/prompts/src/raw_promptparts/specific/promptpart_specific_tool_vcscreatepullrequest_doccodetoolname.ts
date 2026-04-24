/**
 * PROMPTPART: VCS Create Pull Request Tool Name
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool name for VCS pull request creation"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
   { "name": "clarity", "test": "Does '{{content}}' clearly identify the tool?", "score": 0.50 },
   { "name": "consistency", "test": "Is the name consistent with other tool names?", "score": 0.50 },
   { "name": "descriptiveness", "test": "Does the name describe the tool's function?", "score": 0.50 }
 ]
 * 
 * @domain repository-management
 * @intent Identifies the VCS Create Pull Request Tool for cross-platform PR management
 * @benchmarks v2.0.0 industrial language patterns
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCSCREATEPULLREQUEST_DOCCODETOOLNAME: PromptPart = 
  'VCS Create Pull Request Tool' as PromptPart;