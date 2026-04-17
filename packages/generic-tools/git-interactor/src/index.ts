/**
 * VCS-Migrated version of git-interactor
 * 
 * Git repository operations with Engi's distributed version control intelligence,
 * now using VCS abstraction for multi-provider support.
 * 
 * @purpose Git repository operations with Engi's distributed version control intelligence, VCS provider integration, atomic operation guarantees, and production-grade workflow automation for enterprise-level development processes
 * @capabilities Complete VCS provider integration with repository cloning, branch management, pull request workflows, issue tracking, comment management, file operations, and comprehensive Git metadata access with atomic transaction guarantees and enterprise-grade error handling
 * @specificity Generic
 */

import { Tool } from '@bitcode/tools-generics';
import { vcsTools } from '@bitcode/vcs-tools';
import { log } from '@bitcode/logger';
import { GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT } from './prompts/GitInteractorDocCodeToolPrompt';

// Import legacy functions for backward compatibility
// These will use VCS abstraction underneath
import { getRepository, listGitFiles, cloneRepository, createPullRequest, createReference, leaveCommentOnIssue, reviewPullRequest, createIssue, getAllBranches, getReferenceInfo, getFileInfo, isLatestCommentFromBot, createFileContent, updateFileContent, deleteFileContent, getIssueWithComments } from '@bitcode/git';

/**
 * Repository cloning with distributed version control intelligence and atomic archive operations
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use VCS tools directly for new implementations
 */
class CloneRepositoryTool extends Tool<typeof cloneRepository> {
  use = cloneRepository;
  
  constructor() {
    super();
    log('DEPRECATED: CloneRepositoryTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const cloneRepositoryTool = new CloneRepositoryTool();

/**
 * Repository file listing with tree-based navigation intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.listFiles for new implementations
 */
class ListGitFilesTool extends Tool<typeof listGitFiles> {
  use = listGitFiles;
  
  constructor() {
    super();
    log('DEPRECATED: ListGitFilesTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const listGitFilesTool = new ListGitFilesTool();

/**
 * Repository metadata acquisition with comprehensive information intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.getRepository for new implementations
 */
class GetRepositoryTool extends Tool<typeof getRepository> {
  use = getRepository;
  
  constructor() {
    super();
    log('DEPRECATED: GetRepositoryTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const getRepositoryTool = new GetRepositoryTool();

/**
 * Pull request creation with collaborative workflow intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.createPullRequest for new implementations
 */
class CreatePullRequestTool extends Tool<typeof createPullRequest> {
  use = createPullRequest;
  
  constructor() {
    super();
    log('DEPRECATED: CreatePullRequestTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const createPullRequestTool = new CreatePullRequestTool();

/**
 * Branch reference creation with atomic version control operations
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.createBranch for new implementations
 */
class CreateReferenceTool extends Tool<typeof createReference> {
  use = createReference;
  
  constructor() {
    super();
    log('DEPRECATED: CreateReferenceTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const createReferenceTool = new CreateReferenceTool();

/**
 * Issue commenting with collaborative communication intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.createComment for new implementations
 */
class LeaveCommentOnIssueTool extends Tool<typeof leaveCommentOnIssue> {
  use = leaveCommentOnIssue;
  
  constructor() {
    super();
    log('DEPRECATED: LeaveCommentOnIssueTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const leaveCommentOnIssueTool = new LeaveCommentOnIssueTool();

/**
 * Pull request review with code quality intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.reviewPullRequest for new implementations
 */
class ReviewPullRequestTool extends Tool<typeof reviewPullRequest> {
  use = reviewPullRequest;
  
  constructor() {
    super();
    log('DEPRECATED: ReviewPullRequestTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const reviewPullRequestTool = new ReviewPullRequestTool();

/**
 * Issue creation with project management intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.createIssue for new implementations
 */
class CreateIssueTool extends Tool<typeof createIssue> {
  use = createIssue;
  
  constructor() {
    super();
    log('DEPRECATED: CreateIssueTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const createIssueTool = new CreateIssueTool();

/**
 * Branch enumeration with comprehensive repository intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.listBranches for new implementations
 */
class GetAllBranchesTool extends Tool<typeof getAllBranches> {
  use = getAllBranches;
  
  constructor() {
    super();
    log('DEPRECATED: GetAllBranchesTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const getAllBranchesTool = new GetAllBranchesTool();

/**
 * Reference information with detailed branch intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.getBranch for new implementations
 */
class GetReferenceInfoTool extends Tool<typeof getReferenceInfo> {
  use = getReferenceInfo;
  
  constructor() {
    super();
    log('DEPRECATED: GetReferenceInfoTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const getReferenceInfoTool = new GetReferenceInfoTool();

/**
 * File information with comprehensive metadata intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.getFile for new implementations
 */
class GetFileInfoTool extends Tool<typeof getFileInfo> {
  use = getFileInfo;
  
  constructor() {
    super();
    log('DEPRECATED: GetFileInfoTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const getFileInfoTool = new GetFileInfoTool();

/**
 * File creation with atomic content management intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.createFile for new implementations
 */
class CreateFileContentTool extends Tool<typeof createFileContent> {
  use = createFileContent;
  
  constructor() {
    super();
    log('DEPRECATED: CreateFileContentTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const createFileContentTool = new CreateFileContentTool();

/**
 * File updating with versioned content intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.updateFile for new implementations
 */
class UpdateFileContentTool extends Tool<typeof updateFileContent> {
  use = updateFileContent;
  
  constructor() {
    super();
    log('DEPRECATED: UpdateFileContentTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const updateFileContentTool = new UpdateFileContentTool();

/**
 * File deletion with atomic removal intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.deleteFile for new implementations
 */
class DeleteFileContentTool extends Tool<typeof deleteFileContent> {
  use = deleteFileContent;
  
  constructor() {
    super();
    log('DEPRECATED: DeleteFileContentTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const deleteFileContentTool = new DeleteFileContentTool();

/**
 * Bot comment detection with collaborative intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use VCS tools directly for new implementations
 */
class IsLatestCommentFromBotTool extends Tool<typeof isLatestCommentFromBot> {
  use = isLatestCommentFromBot;
  
  constructor() {
    super();
    log('DEPRECATED: IsLatestCommentFromBotTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const isLatestCommentFromBotTool = new IsLatestCommentFromBotTool();

/**
 * Issue retrieval with comprehensive discussion intelligence
 * 
 * @doc-code-tool
 * @prompt GIT_INTERACTOR_DOC_CODE_TOOL_PROMPT
 * @deprecated Use vcsTools.getIssue and vcsTools.listComments for new implementations
 */
class GetIssueWithCommentsTool extends Tool<typeof getIssueWithComments> {
  use = getIssueWithComments;
  
  constructor() {
    super();
    log('DEPRECATED: GetIssueWithCommentsTool uses legacy GitHub-specific API. Consider using VCS tools.', 'warn');
  }
}

export const getIssueWithCommentsTool = new GetIssueWithCommentsTool();

// Re-export raw helpers for convenience (legacy call-sites)
export {
  createPullRequest,
  createReference,
  leaveCommentOnIssue,
  reviewPullRequest,
  createIssue,
  getAllBranches,
  getReferenceInfo,
  getFileInfo,
  isLatestCommentFromBot,
  createFileContent,
  updateFileContent,
  deleteFileContent,
  getIssueWithComments,
};

// Export new VCS tools for future use
export { vcsTools } from '@bitcode/vcs-tools';

// Log migration notice
log('git-interactor tools loaded with VCS abstraction compatibility layer', 'info', {
  deprecatedTools: [
    'cloneRepositoryTool',
    'listGitFilesTool', 
    'getRepositoryTool',
    'createPullRequestTool',
    'createReferenceTool',
    'leaveCommentOnIssueTool',
    'reviewPullRequestTool',
    'createIssueTool',
    'getAllBranchesTool',
    'getReferenceInfoTool',
    'getFileInfoTool',
    'createFileContentTool',
    'updateFileContentTool',
    'deleteFileContentTool',
    'isLatestCommentFromBotTool',
    'getIssueWithCommentsTool'
  ],
  recommendation: 'Use vcsTools directly for new implementations'
});