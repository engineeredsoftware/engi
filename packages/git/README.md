# @bitcode/git

**DEPRECATED PACKAGE** - Version Control System abstraction layer migration notice.

## Overview

This package has been deprecated and functionality migrated to the modern VCS abstraction layer. The @bitcode/git package provided Git-specific operations but has been superseded by a multi-provider VCS system supporting GitHub, GitLab, and Bitbucket integrations.

## Migration Path

### Immediate Action Required
All imports from @bitcode/git will throw runtime errors directing users to the appropriate replacement packages.

### Replacement Packages

#### Core VCS Operations
```typescript
// OLD - Will throw error
import { getRepository } from '@bitcode/git';

// NEW - Multi-provider VCS abstraction
import { getRepository } from '@bitcode/vcs';
```

#### VCS Tools
```typescript
// OLD - Will throw error  
import { createPullRequest } from '@bitcode/git';

// NEW - Generic VCS tools
import { createPullRequest } from '@bitcode/vcs-tools';
```

#### VCS Agent Integration
```typescript
// OLD - Will throw error
import { syncUserGithubRepos } from '@bitcode/git';

// NEW - VCS agent with multi-provider support
import { syncUserRepos } from '@bitcode/generic-agents-vcs';
```

## Deprecated Functionality

### Repository Operations
- `syncUserGithubRepos` → Use `@bitcode/vcs` with provider selection
- `syncAllGithubUsers` → Use `@bitcode/vcs` batch operations
- `getRepository` → Use `@bitcode/vcs` repository interface
- `getAllRepositories` → Use `@bitcode/vcs` repository listing
- `cloneRepository` → Use `@bitcode/vcs` clone operations

### File Operations
- `listGitFiles` → Use `@bitcode/vcs` file listing
- `getFileContent` → Use `@bitcode/vcs` content retrieval
- `getFileInfo` → Use `@bitcode/vcs` metadata queries
- `createFileContent` → Use `@bitcode/vcs` file creation
- `updateFileContent` → Use `@bitcode/vcs` file updates
- `deleteFileContent` → Use `@bitcode/vcs` file deletion

### Branch Management
- `getAllBranches` → Use `@bitcode/vcs` branch listing
- `createReference` → Use `@bitcode/vcs` reference creation
- `getReferenceInfo` → Use `@bitcode/vcs` reference queries

### Pull Request Operations
- `createPullRequest` → Use `@bitcode/vcs` PR creation
- `reviewPullRequest` → Use `@bitcode/vcs` PR review system

### Issue Management
- `createIssue` → Use `@bitcode/vcs` issue creation
- `leaveCommentOnIssue` → Use `@bitcode/vcs` comment system
- `getIssueWithComments` → Use `@bitcode/vcs` issue retrieval
- `getRepositoryIssues` → Use `@bitcode/vcs` issue listing

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

All imports from @bitcode/git will throw detailed migration errors:

```typescript
import { getRepository } from '@bitcode/git';
// Throws: @bitcode/git is deprecated and has been removed.
// Please update your imports:
// - For VCS operations: import from '@bitcode/vcs'
// - For git tools: import from '@bitcode/vcs-tools'  
// - For VCS agent: import from '@bitcode/generic-agents-vcs'
// The VCS abstraction supports GitHub, GitLab, and Bitbucket.
```

## Recommended Actions

1. **Audit Dependencies**: Search codebase for `@bitcode/git` imports
2. **Update Imports**: Replace with appropriate `@bitcode/vcs` equivalents
3. **Test Integration**: Verify VCS operations work with your provider
4. **Remove Package**: Remove `@bitcode/git` from package.json dependencies
5. **Update Documentation**: Update any references to Git-specific operations

## Support

For migration assistance:
- Review `@bitcode/vcs` documentation for API equivalents
- Consult `@bitcode/generic-tools/vcs` for tool-specific operations
- Check `@bitcode/generic-agents/vcs` for agent integration patterns

The VCS abstraction provides superior functionality with multi-provider support, enhanced performance, and standardized error handling.