/**
 * GitLab - GitLab VCS provider implementation
 * 
 * Provides GitLab integration via the unified VCS abstraction.
 * Clean provider export without former dependency seams.
 * 
 * @doc-package
 * version: 1.0.0
 * pattern: vcs-provider
 * philosophy: "One provider, clean interface"
 */

import GitLabProvider from './providers/gitlab-provider';
export { GitLabAuth } from './auth';
export { GitLabConnections } from './connections';

// Export the provider class for direct usage
export { GitLabProvider };

// Default export for VCS factory pattern
export default GitLabProvider;
