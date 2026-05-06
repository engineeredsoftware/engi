/**
 * GITHUB MCP TOOL - UNIFIED TOOL CLASS
 *
 * Single Tool class that handles all GitHub operations through
 * a unified interface with proper DocCodeToolPrompt integration.
 */

import { Tool } from '@bitcode/tools-generics';
import { GITHUB_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/GitHubMCPDocCodeToolPrompt';

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
    name?: string;
    description?: string;
    private?: boolean;
    autoInit?: boolean;
    owner?: string;
    repo?: string;
    title?: string;
    body?: string;
    labels?: string[];
    assignees?: string[];
    issueNumber?: number;
    head?: string;
    base?: string;
    [key: string]: unknown;
  };
}

type GitHubMCPResult = {
  success: false;
  unavailable: true;
  operation: GitHubOperation;
  error: string;
  result: null;
  metadata: {
    owner: string | null;
    repo: string | null;
    timestamp: string;
    docCodeToolPrompt: typeof GITHUB_MCP_DOC_CODE_TOOL_PROMPT;
  };
  params: GitHubMCPParams['params'];
};

async function githubMCPOperation(input: GitHubMCPParams): Promise<GitHubMCPResult> {
  return {
    success: false,
    unavailable: true,
    operation: input.operation,
    error:
      'GitHub MCP operations are not available in this retained fourth-gate runtime.',
    result: null,
    metadata: {
      owner: typeof input.params.owner === 'string' ? input.params.owner : null,
      repo: typeof input.params.repo === 'string' ? input.params.repo : null,
      timestamp: new Date().toISOString(),
      docCodeToolPrompt: GITHUB_MCP_DOC_CODE_TOOL_PROMPT,
    },
    params: input.params,
  };
}

/**
 * @doc-code-tool
 * @prompt GITHUB_MCP_DOC_CODE_TOOL_PROMPT
 */
export class GitHubMCPTool extends Tool<typeof githubMCPOperation> {
  use = githubMCPOperation;
}

// Export singleton instance
export const githubMCPTool = new GitHubMCPTool();
export const gitHubMCPTool = githubMCPTool;

// Stable grouped export surface
export const githubTools = {
  createRepository: async (params: GitHubMCPParams['params']) =>
    githubMCPOperation({ operation: 'createRepository', params }),
  getRepository: async (params: GitHubMCPParams['params']) =>
    githubMCPOperation({ operation: 'getRepository', params }),
  createIssue: async (params: GitHubMCPParams['params']) =>
    githubMCPOperation({ operation: 'createIssue', params }),
  getIssue: async (params: GitHubMCPParams['params']) =>
    githubMCPOperation({ operation: 'getIssue', params }),
  createPullRequest: async (params: GitHubMCPParams['params']) =>
    githubMCPOperation({ operation: 'createPullRequest', params }),
};
