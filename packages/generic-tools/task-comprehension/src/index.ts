/**
 * Need Comprehension Tools - retained task-comprehension compatibility package.
 *
 * These tools keep old package/class names stable while their active prompts and
 * runtime posture serve Bitcode need, written-asset, asset-pack, and
 * shipping-wrapper comprehension.
 */

// Export modern Tool implementations
export { AnalyzeTaskSemanticsTool, analyzeTaskSemanticsTool } from './AnalyzeTaskSemanticsTool';

// Export schemas for type safety
export * from './schemas';

// Export prompts for reuse
export * from './prompts';
