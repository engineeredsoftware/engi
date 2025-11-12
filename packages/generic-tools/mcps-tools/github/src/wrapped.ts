/**
 * GITHUB MCP TOOLS - WRAPPED EXPORTS
 * 
 * Exports GitHub MCP tools with proper Tool class pattern and
 * DocCodeToolPrompt integration.
 */

// Export the unified tool
export { 
  GitHubMCPTool,
  gitHubMCPTool,
  githubTools,
  type GitHubOperation,
  type GitHubMCPParams
} from './GitHubMCPTool';

// Export the DocCodeToolPrompt
export {
  GitHubMCPDocCodeToolPrompt,
  gitHubMCPDocCodeToolPrompt
} from './prompts/GitHubMCPDocCodeToolPrompt';

// Default export is the unified tool
export default gitHubMCPTool;