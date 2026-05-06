/**
 * GitHub - GitHub VCS provider implementation
 * 
 * Provides GitHub integration via the unified VCS abstraction.
 * Clean provider export without former MCP stubs.
 * 
 * @doc-package
 * version: 1.0.0
 * pattern: vcs-provider
 * philosophy: "One provider, clean interface"
 */

import GitHubProvider from './providers/github-provider';

// Export the provider class for direct usage
export { GitHubProvider };

// Export auth utilities
export { GitHubAppAuth, createGitHubAppAuth } from './auth/github-app';
export type { GitHubAppConfig, InstallationAccessToken } from './auth/github-app';

// Default export for VCS factory pattern
export default GitHubProvider;
