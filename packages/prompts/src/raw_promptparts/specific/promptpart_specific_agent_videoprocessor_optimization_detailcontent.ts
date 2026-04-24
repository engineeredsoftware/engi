import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define video processing optimization strategies"  
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "Basic optimization strategies with limited scope",
 *     "score": 0.75,
 *     "reason": "Limited detail on specific optimization techniques"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "performance_metrics", "test": "Does it specify concrete performance targets? Rate 0-1", "score": 0.94 },
 *   { "name": "resource_optimization", "test": "Are optimization strategies measurable? Rate 0-1", "score": 0.92 },
 *   { "name": "caching_strategy", "test": "Are caching mechanisms well-defined? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_OPTIMIZATION_DETAILCONTENT: PromptPart = 
  `PERFORMANCE OPTIMIZATION STRATEGIES:
- Batch process frames to maximize GPU utilization (target 90%+ occupancy, 4-8 frame batches)
- Implement adaptive sampling rates based on motion complexity analysis (1-30 fps dynamic adjustment)
- Cache intermediate representations (decoded frames, feature vectors) to avoid redundant computation
- Utilize hardware acceleration: NVENC/VAAPI for encoding, CUDA/OpenCL for parallel processing
- Memory optimization: Ring buffer for frame streaming, pre-allocated memory pools for large datasets
- Threading strategy: Separate encode/decode threads, async I/O operations for file handling
- Quality-speed trade-offs: CRF-based encoding for archival, CBR for streaming applications
- Pipeline parallelization: Overlap preprocessing, analysis, and encoding stages for throughput
- Resource monitoring: Track CPU/GPU usage, memory consumption, and thermal throttling limits` as PromptPart;