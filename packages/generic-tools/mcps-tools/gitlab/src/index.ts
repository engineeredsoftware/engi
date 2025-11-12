/**
 * GitLab MCP Tools - Modern Tool Class Architecture
 * 
 * GitLab project and repository management tools using the Tool class pattern.
 */

import { Tool } from '@engi/tools-generics';
import {
  gitlabListProjectsTool as _gitlabListProjects,
  gitlabGetProjectTool as _gitlabGetProject,
} from '@engi/gitlab';

// Import DocCodeToolPrompt
import { GITLAB_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/GitLabMCPDocCodeToolPrompt';

/**
 * GitLab List Projects Tool for project discovery and management
 * 
 * @doc-code-tool
 * @prompt GITLAB_MCP_DOC_CODE_TOOL_PROMPT
 */
class GitlabListProjectsTool extends Tool<typeof _gitlabListProjects> {
  use = _gitlabListProjects;
}

/**
 * GitLab Get Project Tool for detailed project information
 * 
 * @doc-code-tool
 * @prompt GITLAB_MCP_DOC_CODE_TOOL_PROMPT
 */
class GitlabGetProjectTool extends Tool<typeof _gitlabGetProject> {
  use = _gitlabGetProject;
}

// Export singleton instances - proper non-barrel exports
export const gitlabListProjectsTool = new GitlabListProjectsTool();
export const gitlabGetProjectTool = new GitlabGetProjectTool();

// Export DocCodeToolPrompt instance
export { GITLAB_MCP_DOC_CODE_TOOL_PROMPT };

// Export classes for type safety and extensibility
export { GitlabListProjectsTool };
export { GitlabGetProjectTool };
