/**
 * BITBUCKET MCP TOOLS - MODERN TOOL CLASS ARCHITECTURE
 * 
 * Unified Bitbucket API operations through MCP integration using the new abstract Tool class
 * with DocCodeToolPrompt documentation. Zero legacy patterns, maximum elegance.
 */

// Import and export the unified Tool class implementation
export { BitbucketMCPTool, bitbucketMCPTool } from './BitbucketMCPTool';

// Type exports for enhanced type safety
export type { BitbucketMCPTool as BitbucketMCPToolType } from './BitbucketMCPTool';

/**
 * ARCHITECTURAL EXCELLENCE ACHIEVED
 * 
 * ✅ ELIMINATED:
 * - tool() from 'ai' package
 * - Direct Vercel AI SDK dependency
 * - Multiple scattered tool definitions
 * - Redundant parameter definitions
 * 
 * ✅ ACHIEVED:
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