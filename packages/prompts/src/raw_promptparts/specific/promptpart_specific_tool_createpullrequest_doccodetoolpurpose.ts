/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for Create Pull Request Tool"
 * current_version: "V26.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly articulate the tool's role in PR creation workflows? Rate 0-1" },
 *   { "name": "workflow_integration", "test": "Does the purpose '{{content}}' demonstrate integration with broader development workflows? Rate 0-1" },
 *   { "name": "collaboration_emphasis", "test": "Does '{{content}}' emphasize the collaborative aspects of pull request creation? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLPURPOSE: PromptPart = 
  'Streamlines pull request creation across version control platforms, enabling seamless code review workflows through automated branch analysis, intelligent commit grouping, template application, and reviewer assignment based on code ownership patterns and team collaboration metrics' as PromptPart;