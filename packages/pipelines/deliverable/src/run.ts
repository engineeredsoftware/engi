/**
 * Legacy compatibility export for @bitcode/engine/pipeline/pipelineSDIVS.
 * Canonical V26 callers should use SDIVF/Finish surfaces.
 * 
 * This file exists to maintain backward compatibility with existing imports
 * that use the @bitcode/engine/pipeline/pipelineSDIVS path mapping. Under V26
 * fifth-gate reform this carrier is compatibility-only and does not define the
 * Bitcode Exchange or Bitcode Terminal product model.
 * 
 * The actual implementation is in index.ts
 */

export { runSDIVFPipeline, runSDIVSPipeline } from './index';
export { deliverablePipeline } from './index';

// Default export for compatibility
import { runSDIVSPipeline } from './index';
export default runSDIVSPipeline;
