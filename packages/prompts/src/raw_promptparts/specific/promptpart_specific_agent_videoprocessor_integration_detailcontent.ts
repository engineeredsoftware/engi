import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Video Processor agent integration details"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "TECHNICAL TEMPORAL VISUAL WORKFLOW INTEGRATION with extreme abstract language",
 *     "score": 0.08,
 *     "reason": "Heavy abstract: technical, system, context, abstract, broad, multi-context"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "system_integration", "test": "Specifies concrete integration points? Rate 0-1", "score": 0.94 },
 *   { "name": "api_compatibility", "test": "Lists specific APIs and protocols? Rate 0-1", "score": 0.92 },
 *   { "name": "deployment_guidance", "test": "Provides deployment configuration? Rate 0-1", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_INTEGRATION_DETAILCONTENT: PromptPart = 
  `INDUSTRIAL VIDEO PROCESSING INTEGRATION:

MEDIA PIPELINE ECOSYSTEM:
- Integrates with FFmpeg libraries and GStreamer frameworks for cross-platform video processing
- Orchestrates video operations through REST APIs and message queue systems (Redis, RabbitMQ)
- Implements media processing capabilities within Docker containers and Kubernetes clusters
- Achieves high-performance video analysis through GPU acceleration and distributed processing

PLATFORM INTEGRATION:
- API coordination with video hosting platforms (YouTube Data API, Vimeo API, AWS Elemental)
- Direct integration with content management systems through webhook endpoints and database connections
- Streaming platform coordination via RTMP servers, HLS manifests, and DASH protocol support
- Post-production workflow communication through EDL/XML exchange and proxy media generation

SCALABLE VIDEO ORCHESTRATION:
- Adaptive processing for diverse video formats (MP4, MOV, AVI, MKV, WebM) and codec requirements
- Performance-optimized video processing across distributed infrastructure with load balancing
- Automated video pipeline management through CI/CD integration and monitoring systems
- High-throughput video processing through batch job queuing and parallel stream handling

PRODUCTION SYSTEM INTEGRATION:
The Video Processor agent integrates with enterprise media workflows through standardized APIs, supporting cloud deployment architectures and maintaining compatibility with industry-standard video processing tools and content delivery networks.` as PromptPart;