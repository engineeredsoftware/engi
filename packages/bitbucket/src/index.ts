/**
 * Bitbucket - Bitbucket VCS provider implementation
 * 
 * Provides Bitbucket integration via the unified VCS abstraction.
 * Clean provider export without former dependency seams.
 * 
 * @doc-package
 * version: 1.0.0
 * pattern: vcs-provider
 * philosophy: "One provider, clean interface"
 */

import BitbucketProvider from './providers/bitbucket-provider';
export { BitbucketAuth } from './auth';
export { BitbucketConnections } from './connections';

// Export the provider class for direct usage
export { BitbucketProvider };

// Default export for VCS factory pattern
export default BitbucketProvider;
