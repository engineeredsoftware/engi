# @engi/git

**DEPRECATED PACKAGE** - Version Control System abstraction layer migration notice.

## Overview

This package has been deprecated and functionality migrated to the modern VCS abstraction layer. The @engi/git package provided Git-specific operations but has been superseded by a multi-provider VCS system supporting GitHub, GitLab, and Bitbucket integrations.

## Migration Path

### Immediate Action Required
All imports from @engi/git will throw runtime errors directing users to the appropriate replacement packages.

### Replacement Packages

#### Core VCS Operations
```typescript
// OLD - Will throw error
import { getRepository } from '@engi/git';

// NEW - Multi-provider VCS abstraction
import { getRepository } from '@engi/vcs';
```

#### VCS Tools
```typescript
// OLD - Will throw error  
import { createPullRequest } from '@engi/git';

// NEW - Generic VCS tools
import { createPullRequest } from '@engi/vcs-tools';
```

#### VCS Agent Integration
```typescript
// OLD - Will throw error
import { syncUserGithubRepos } from '@engi/git';

// NEW - VCS agent with multi-provider support
import { syncUserRepos } from '@engi/generic-agents-vcs';
```

## Deprecated Functionality

### Repository Operations
- `syncUserGithubRepos` → Use `@engi/vcs` with provider selection
- `syncAllGithubUsers` → Use `@engi/vcs` batch operations
- `getRepository` → Use `@engi/vcs` repository interface
- `getAllRepositories` → Use `@engi/vcs` repository listing
- `cloneRepository` → Use `@engi/vcs` clone operations

### File Operations
- `listGitFiles` → Use `@engi/vcs` file listing
- `getFileContent` → Use `@engi/vcs` content retrieval
- `getFileInfo` → Use `@engi/vcs` metadata queries
- `createFileContent` → Use `@engi/vcs` file creation
- `updateFileContent` → Use `@engi/vcs` file updates
- `deleteFileContent` → Use `@engi/vcs` file deletion

### Branch Management
- `getAllBranches` → Use `@engi/vcs` branch listing
- `createReference` → Use `@engi/vcs` reference creation
- `getReferenceInfo` → Use `@engi/vcs` reference queries

### Pull Request Operations
- `createPullRequest` → Use `@engi/vcs` PR creation
- `reviewPullRequest` → Use `@engi/vcs` PR review system

### Issue Management
- `createIssue` → Use `@engi/vcs` issue creation
- `leaveCommentOnIssue` → Use `@engi/vcs` comment system
- `getIssueWithComments` → Use `@engi/vcs` issue retrieval
- `getRepositoryIssues` → Use `@engi/vcs` issue listing

## Migration Benefits

### Multi-Provider Support
The new VCS abstraction supports multiple version control providers:
- **GitHub**: Full API compatibility with GitHub REST and GraphQL APIs
- **GitLab**: Native GitLab integration with CI/CD pipeline support
- **Bitbucket**: Atlassian Bitbucket Cloud and Server support

### Enhanced Features
- **Unified Interface**: Single API for all VCS operations across providers
- **Connection Management**: Persistent connections with automatic failover
- **Rate Limiting**: Built-in rate limiting with provider-specific limits
- **Caching**: Intelligent caching layer for improved performance
- **Error Handling**: Standardized error handling across all providers

### Performance Improvements
- **Connection Pooling**: Persistent HTTP connections reduce latency
- **Batch Operations**: Grouped API calls for improved throughput
- **Background Sync**: Asynchronous repository synchronization
- **Memory Optimization**: Reduced memory footprint with streaming APIs

## Error Handling

All imports from @engi/git will throw detailed migration errors:

```typescript
import { getRepository } from '@engi/git';
// Throws: @engi/git is deprecated and has been removed.
// Please update your imports:
// - For VCS operations: import from '@engi/vcs'
// - For git tools: import from '@engi/vcs-tools'  
// - For VCS agent: import from '@engi/generic-agents-vcs'
// The VCS abstraction supports GitHub, GitLab, and Bitbucket.
```

## Recommended Actions

1. **Audit Dependencies**: Search codebase for `@engi/git` imports
2. **Update Imports**: Replace with appropriate `@engi/vcs` equivalents
3. **Test Integration**: Verify VCS operations work with your provider
4. **Remove Package**: Remove `@engi/git` from package.json dependencies
5. **Update Documentation**: Update any references to Git-specific operations

## Support

For migration assistance:
- Review `@engi/vcs` documentation for API equivalents
- Consult `@engi/generic-tools/vcs` for tool-specific operations
- Check `@engi/generic-agents/vcs` for agent integration patterns

The VCS abstraction provides superior functionality with multi-provider support, enhanced performance, and standardized error handling.