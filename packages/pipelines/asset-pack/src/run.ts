/**
 * Canonical run exports for the AssetPack SDIVF pipeline.
 * 
 * The old @bitcode/engine/pipeline/pipelineSDIVS path maps here only as a
 * compatibility import. New callers should use pipelineSDIVF or the package
 * root and should treat Finish as the final phase.
 * 
 * The actual implementation is in index.ts
 */

export { runSDIVFPipeline, runSDIVSPipeline } from './index';
export { assetPackPipeline, deliverablePipeline } from './index';

import { runSDIVFPipeline } from './index';
export default runSDIVFPipeline;
