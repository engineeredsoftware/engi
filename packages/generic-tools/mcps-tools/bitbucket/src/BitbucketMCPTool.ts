/**
 * @doc-code-tool
 * @prompt BITBUCKET_MCP_DOC_CODE_TOOL_PROMPT
 */

import { Tool } from '@bitcode/tools-generics';
import { BITBUCKET_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/BitbucketMCPDocCodeToolPrompt';

// Import all Bitbucket operations
import {
  bitbucketListRepositoriesTool,
  bitbucketGetRepositoryTool,
  bitbucketListBranchesTool,
  bitbucketCreateBranchTool,
  bitbucketListTagsTool,
  bitbucketCreateTagTool,
  bitbucketGetFileContentTool,
  bitbucketListDirectoryTool,
  bitbucketCommitFilesTool,
  bitbucketListCommitsTool,
  bitbucketGetCommitTool,
  bitbucketGetCommitDiffTool,
  bitbucketListPullRequestsTool,
  bitbucketCreatePullRequestTool,
  bitbucketUpdatePullRequestTool,
  bitbucketCommentOnPullRequestTool,
  bitbucketApprovePullRequestTool,
  bitbucketMergePullRequestTool,
  bitbucketDeclinePullRequestTool,
  bitbucketListIssuesTool,
  bitbucketCreateIssueTool,
  bitbucketUpdateIssueTool,
  bitbucketCommentOnIssueTool,
  bitbucketDeleteIssueTool,
} from '@bitcode/bitbucket';

/**
 * Unified Bitbucket MCP operation handler
 */
async function bitbucketMCPOperation(
  operation: string,
  params: Record<string, any>
): Promise<any> {
  try {
    switch (operation) {
      // Repository operations
      case 'listRepositories':
        return await bitbucketListRepositoriesTool(params.workspace, params.role, params.accessToken, params.username, params.appPassword);
      case 'getRepository':
        return await bitbucketGetRepositoryTool(params.workspace, params.repoSlug, params.accessToken, params.username, params.appPassword);
      
      // Branch operations
      case 'listBranches':
        return await bitbucketListBranchesTool(params.workspace, params.repoSlug, params.accessToken, params.username, params.appPassword);
      case 'createBranch':
        return await bitbucketCreateBranchTool(params.workspace, params.repoSlug, params.branchName, params.target, params.accessToken, params.username, params.appPassword);
      
      // Tag operations
      case 'listTags':
        return await bitbucketListTagsTool(params.workspace, params.repoSlug, params.accessToken, params.username, params.appPassword);
      case 'createTag':
        return await bitbucketCreateTagTool(params.workspace, params.repoSlug, params.tagName, params.target, params.accessToken, params.username, params.appPassword);
      
      // File operations
      case 'getFileContent':
        return await bitbucketGetFileContentTool(params.workspace, params.repoSlug, params.path, params.branch, params.accessToken, params.username, params.appPassword);
      case 'listDirectory':
        return await bitbucketListDirectoryTool(params.workspace, params.repoSlug, params.path, params.branch, params.accessToken, params.username, params.appPassword);
      case 'commitFiles':
        return await bitbucketCommitFilesTool(params.workspace, params.repoSlug, params.branch, params.message, params.files, params.accessToken, params.username, params.appPassword);
      
      // Commit operations
      case 'listCommits':
        return await bitbucketListCommitsTool(params.workspace, params.repoSlug, params.branch, params.accessToken, params.username, params.appPassword);
      case 'getCommit':
        return await bitbucketGetCommitTool(params.workspace, params.repoSlug, params.commitHash, params.accessToken, params.username, params.appPassword);
      case 'getCommitDiff':
        return await bitbucketGetCommitDiffTool(params.workspace, params.repoSlug, params.commitHash, params.accessToken, params.username, params.appPassword);
      
      // Pull request operations
      case 'listPullRequests':
        return await bitbucketListPullRequestsTool(params.workspace, params.repoSlug, params.state, params.accessToken, params.username, params.appPassword);
      case 'createPullRequest':
        return await bitbucketCreatePullRequestTool(params.workspace, params.repoSlug, params.title, params.sourceBranch, params.destinationBranch, params.description, params.closeSourceBranch, params.accessToken, params.username, params.appPassword);
      case 'updatePullRequest':
        return await bitbucketUpdatePullRequestTool(params.workspace, params.repoSlug, params.pullRequestId, params.title, params.description, params.destinationBranch, params.accessToken, params.username, params.appPassword);
      case 'commentOnPullRequest':
        return await bitbucketCommentOnPullRequestTool(params.workspace, params.repoSlug, params.pullRequestId, params.content, params.accessToken, params.username, params.appPassword);
      case 'approvePullRequest':
        return await bitbucketApprovePullRequestTool(params.workspace, params.repoSlug, params.pullRequestId, params.accessToken, params.username, params.appPassword);
      case 'mergePullRequest':
        return await bitbucketMergePullRequestTool(params.workspace, params.repoSlug, params.pullRequestId, params.closeSourceBranch, params.mergeStrategy, params.accessToken, params.username, params.appPassword);
      case 'declinePullRequest':
        return await bitbucketDeclinePullRequestTool(params.workspace, params.repoSlug, params.pullRequestId, params.accessToken, params.username, params.appPassword);
      
      // Issue operations
      case 'listIssues':
        return await bitbucketListIssuesTool(params.workspace, params.repoSlug, params.status, params.assignee, params.accessToken, params.username, params.appPassword);
      case 'createIssue':
        return await bitbucketCreateIssueTool(params.workspace, params.repoSlug, params.title, params.content, params.kind, params.priority, params.assignee, params.accessToken, params.username, params.appPassword);
      case 'updateIssue':
        return await bitbucketUpdateIssueTool(params.workspace, params.repoSlug, params.issueId, params.title, params.content, params.status, params.kind, params.priority, params.assignee, params.accessToken, params.username, params.appPassword);
      case 'commentOnIssue':
        return await bitbucketCommentOnIssueTool(params.workspace, params.repoSlug, params.issueId, params.content, params.accessToken, params.username, params.appPassword);
      case 'deleteIssue':
        return await bitbucketDeleteIssueTool(params.workspace, params.repoSlug, params.issueId, params.accessToken, params.username, params.appPassword);
      
      default:
        throw new Error(`Unknown Bitbucket operation: ${operation}`);
    }
    
    return {
      success: true,
      operation,
      result,
      metadata: {
        workspace: params.workspace,
        repository: params.repoSlug,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      operation,
      error: error.message,
      metadata: {
        workspace: params.workspace,
        repository: params.repoSlug,
        timestamp: new Date().toISOString()
      }
    };
  }
}

export class BitbucketMCPTool extends Tool<typeof bitbucketMCPOperation> {
  use = bitbucketMCPOperation;
}

// Export singleton instance
export const bitbucketMCPTool = new BitbucketMCPTool();