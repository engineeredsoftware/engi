/**
 * GitLab MCP Tools - Modern Tool Class Architecture
 * 
 * GitLab project and repository management tools using the Tool class pattern.
 */

import { Tool } from '@bitcode/tools-generics';
// Inline fail-closed placeholders so retained MCP compilation does not depend on
// absent project-operation exports from the provider package.
async function _gitlabListProjects(input: {
  host?: string;
  group?: string;
  search?: string;
  [key: string]: unknown;
}): Promise<{
  success: false;
  unavailable: true;
  tool: 'gitlabListProjects';
  reason: string;
  input: {
    host?: string;
    group?: string;
    search?: string;
    [key: string]: unknown;
  };
}> {
  return {
    success: false,
    unavailable: true,
    tool: 'gitlabListProjects',
    reason: 'GitLab MCP project enumeration is not available in this retained runtime',
    input,
  };
}

async function _gitlabGetProject(input: {
  projectId?: string | number;
  path?: string;
  [key: string]: unknown;
}): Promise<{
  success: false;
  unavailable: true;
  tool: 'gitlabGetProject';
  reason: string;
  input: {
    projectId?: string | number;
    path?: string;
    [key: string]: unknown;
  };
}> {
  return {
    success: false,
    unavailable: true,
    tool: 'gitlabGetProject',
    reason: 'GitLab MCP project inspection is not available in this retained runtime',
    input,
  };
}

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
