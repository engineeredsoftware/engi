/**
 * Bitbucket MCP tool adapter for Bitcode runs.
 *
 * The adapter exposes unified Bitbucket API operations through the shared Tool
 * class and DocCodeToolPrompt documentation while keeping operation behavior in
 * the Bitbucket primitive implementation.
 */

// Import and export the unified Tool class implementation
export { BitbucketMCPTool, bitbucketMCPTool } from './BitbucketMCPTool';

// Type exports for enhanced type safety
export type { BitbucketMCPTool as BitbucketMCPToolType } from './BitbucketMCPTool';

/**
 * Bitcode support boundary
 *
 * Removed from this adapter layer:
 * - tool() from 'ai' package
 * - Direct Vercel AI SDK dependency
 * - Multiple scattered tool definitions
 * - Redundant parameter definitions
 *
 * Current adapter contract:
 * - Single unified Tool class for all Bitbucket operations
 * - DocCodeToolPrompt documentation
 * - Clean .use = primitiveFunction pattern
 * - Type-safe exports with proper naming
 * - Centralized operation handling
 * 
 * All Bitbucket operations are now available through a single tool:
 * - Repository management
 * - Branch and tag operations
 * - File and commit operations
 * - Pull request lifecycle
 * - Issue tracking
 */
