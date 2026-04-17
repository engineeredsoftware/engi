/**
 * @deprecated Direct imports from @bitcode/git/src/git are deprecated.
 * 
 * This file is for backward compatibility only.
 * Please migrate to @bitcode/vcs.
 */

import { deprecationNotice } from './index';

// Re-export all deprecated functions
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