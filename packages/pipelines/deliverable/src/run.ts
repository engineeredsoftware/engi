/**
 * Legacy compatibility export for @engi/engine/pipeline/pipelineSDIVS
 * 
 * This file exists to maintain backward compatibility with existing imports
 * that use the @engi/engine/pipeline/pipelineSDIVS path mapping.
 * 
 * The actual implementation is in index.ts
 */

export { runSDIVSPipeline } from './index';
export { deliverablePipeline } from './index';

// Default export for compatibility
import { runSDIVSPipeline } from './index';
export default runSDIVSPipeline;