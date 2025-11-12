/**
 * GitHub MCP Tools - Modern Tool Class Architecture
 * 
 * GitHub repository, issue, and pull request management tools
 * using the Tool class pattern with DocCodeToolPrompt documentation.
 */

// Export the modern Tool class implementation
export { GitHubMCPTool, githubMCPTool } from './GitHubMCPTool';
export type { GitHubOperation, GitHubMCPParams } from './GitHubMCPTool';

// Export prompt for reuse
export { GITHUB_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/GitHubMCPDocCodeToolPrompt';