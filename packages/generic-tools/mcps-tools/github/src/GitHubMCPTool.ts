/**
 * GITHUB MCP TOOL - UNIFIED TOOL CLASS
 * 
 * Single Tool class that handles all GitHub operations through
 * a unified interface with proper DocCodeToolPrompt integration.
 */

import { Tool } from '@engi/tools-generics';
import { wrapMCPToolWithMetadata } from '@engi/tools-generics';
import { GITHUB_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/GitHubMCPDocCodeToolPrompt';
import {
  githubCreateRepositoryTool,
  githubGetRepositoryTool,
  githubCreateIssueTool,
  githubGetIssueTool,
  githubCreatePullRequestTool,
} from '@engi/github';

// GitHub operation types
export type GitHubOperation = 
  | 'createRepository'
  | 'getRepository' 
  | 'createIssue'
  | 'getIssue'
  | 'createPullRequest';

// Unified parameters type
export interface GitHubMCPParams {
  operation: GitHubOperation;
  params: {
    // Repository operations
    name?: string;
    description?: string;
    private?: boolean;
    autoInit?: boolean;
    
    // Common parameters
    owner?: string;
    repo?: string;
    
    // Issue parameters
    title?: string;
    body?: string;
    labels?: string[];
    assignees?: string[];
    issueNumber?: number;
    
    // PR parameters
    head?: string;
    base?: string;
  };
}

/**
 * @doc-code-tool
 * @prompt GITHUB_MCP_DOC_CODE_TOOL_PROMPT
 */
export class GitHubMCPTool extends Tool<GitHubMCPParams, any> {
  private operations: Record<GitHubOperation, any>;
  
  constructor() {
    super();
    this.name = 'github-mcp';
    this.description = 'GitHub API operations with MCP integration';
    
    // Store the doc-code-tool prompt for runtime access
    this.metadata = {
      version: '1.0.0',
      categories: ['version-control', 'mcp'],
      capabilities: [
        'repository-management',
        'issue-tracking',
        'pull-request-management'
      ],
      docCodeToolPrompt: GITHUB_MCP_DOC_CODE_TOOL_PROMPT,
      mcp: {
        provider: 'github',
        authentication: 'token',
        rateLimit: {
          requests: 5000,
          window: 'hour'
        }
      }
    };
    
    // Map operations to their implementations
    this.operations = {
      createRepository: githubCreateRepositoryTool,
      getRepository: githubGetRepositoryTool,
      createIssue: githubCreateIssueTool,
      getIssue: githubGetIssueTool,
      createPullRequest: githubCreatePullRequestTool
    };
  }
  
  async use(params: GitHubMCPParams) {
    const { operation, params: operationParams } = params;
    
    // Get the appropriate tool for the operation
    const tool = this.operations[operation];
    if (!tool) {
      throw new Error(`Unknown GitHub operation: ${operation}`);
    }
    
    // Execute the operation
    try {
      const result = await tool(operationParams);
      
      return {
        success: true,
        operation,
        result,
        metadata: {
          rateLimitRemaining: result.rateLimitRemaining || -1,
          rateLimitReset: result.rateLimitReset || 'unknown'
        }
      };
    } catch (error) {
      return {
        success: false,
        operation,
        error: error instanceof Error ? error.message : String(error),
        result: null,
        metadata: {
          rateLimitRemaining: -1,
          rateLimitReset: 'unknown'
        }
      };
    }
  }
}

// Export singleton instance
export const gitHubMCPTool = new GitHubMCPTool();

// Also export individually wrapped tools for backward compatibility
export const githubTools = {
  createRepository: wrapMCPToolWithMetadata(
    'github-create-repository',
    githubCreateRepositoryTool,
    {
      provider: 'github',
      version: '1.0.0',
      authentication: 'token'
    }
  ),
  
  getRepository: wrapMCPToolWithMetadata(
    'github-get-repository',
    githubGetRepositoryTool,
    {
      provider: 'github',
      version: '1.0.0',
      authentication: 'token'
    }
  ),
  
  createIssue: wrapMCPToolWithMetadata(
    'github-create-issue',
    githubCreateIssueTool,
    {
      provider: 'github',
      version: '1.0.0',
      authentication: 'token'
    }
  ),
  
  getIssue: wrapMCPToolWithMetadata(
    'github-get-issue',
    githubGetIssueTool,
    {
      provider: 'github',
      version: '1.0.0',
      authentication: 'token'
    }
  ),
  
  createPullRequest: wrapMCPToolWithMetadata(
    'github-create-pull-request',
    githubCreatePullRequestTool,
    {
      provider: 'github',
      version: '1.0.0',
      authentication: 'token'
    }
  )
};