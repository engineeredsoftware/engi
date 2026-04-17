/**
 * @deprecated This package is deprecated. Use @bitcode/vcs instead.
 * 
 * This file provides minimal exports for backward compatibility only.
 * All functionality has been moved to the VCS abstraction layer.
 */

export const deprecationNotice = () => {
  throw new Error(`
    @bitcode/git is deprecated and has been removed.
    
    Please update your imports:
    - For VCS operations: import from '@bitcode/vcs'
    - For git tools: import from '@bitcode/vcs-tools'
    - For VCS agent: import from '@bitcode/generic-agents-vcs'
    
    The VCS abstraction supports GitHub, GitLab, and Bitbucket.
  `);
};

// Throw error on any import attempt
export const syncUserGithubRepos = deprecationNotice;
export const syncAllGithubUsers = deprecationNotice;
export const getInstallationAccessToken = deprecationNotice;
export const getRepository = deprecationNotice;
export const listGitFiles = deprecationNotice;
export const cloneRepository = deprecationNotice;
export const createPullRequest = deprecationNotice;
export const createReference = deprecationNotice;
export const getReferenceInfo = deprecationNotice;
export const getAllBranches = deprecationNotice;
export const getFileInfo = deprecationNotice;
export const createFileContent = deprecationNotice;
export const updateFileContent = deprecationNotice;
export const deleteFileContent = deprecationNotice;
export const createIssue = deprecationNotice;
export const leaveCommentOnIssue = deprecationNotice;
export const reviewPullRequest = deprecationNotice;
export const isLatestCommentFromBot = deprecationNotice;
export const getIssueWithComments = deprecationNotice;
export const getCommit = deprecationNotice;
export const getFileContent = deprecationNotice;
export const getAllRepositories = deprecationNotice;
export const getAllCommits = deprecationNotice;
export const getRepositoryIssues = deprecationNotice;
export const getInstallationAccounts = deprecationNotice;