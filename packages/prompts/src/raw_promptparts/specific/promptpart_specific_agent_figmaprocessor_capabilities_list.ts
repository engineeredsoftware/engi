import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Figma Processor agent capabilities"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.91.0",
 *     "content": "- FIGMA API INTEGRATION: Access design files via REST API v1 with OAuth 2.0 authentication and rate limiting\n- DESIGN TOKEN EXTRACTION: Parse color palettes, typography scales, spacing tokens from Figma style libraries\n- ASSET EXPORT: Generate SVG, PNG, PDF assets with configurable resolution and format optimization\n- COMPONENT ANALYSIS: Extract component definitions, variants, and properties for design system documentation\n- LAYOUT MEASUREMENT: Calculate precise dimensions, spacing, and positioning data from design frames\n- PROTOTYPE PARSING: Analyze interaction flows, transitions, and navigation patterns from Figma prototypes\n- DESIGN SYSTEM VALIDATION: Check consistency across components using automated design rule validation\n- CODE GENERATION: Generate CSS, React, or Vue components based on Figma design specifications\n- BATCH PROCESSING: Handle multiple design files with parallel processing and progress tracking\n- VERSION CONTROL: Track design file changes and maintain revision history with diff analysis",
 *     "score": 0.91,
 *     "reason": "Industrial transformation complete - concrete Figma processing capabilities"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "- Figma API integration for design file access and processing\n- Design system extraction and component library analysis\n- Asset export and optimization for multiple formats\n- Design specification generation with detailed measurements\n- Component hierarchy analysis and relationship mapping\n- Style guide extraction with color, typography, and spacing systems\n- Prototype analysis and interaction flow documentation\n- Context-aware design pattern recognition and best practice validation",
 *     "score": 0.85,
 *     "reason": "Contains 'context-aware' - non-industrial term"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "figma_api_coverage", "test": "Does it reference specific Figma API endpoints? Rate 0-1", "score": 0.93 },
 *   { "name": "design_extraction", "test": "Are design token extraction methods specified? Rate 0-1", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement Figma processing? Rate 0-1", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_CAPABILITIES_LIST: PromptPart = 
  `- FIGMA API INTEGRATION: Access design files via REST API v1 with OAuth 2.0 authentication and rate limiting
- DESIGN TOKEN EXTRACTION: Parse color palettes, typography scales, spacing tokens from Figma style libraries
- ASSET EXPORT: Generate SVG, PNG, PDF assets with configurable resolution and format optimization
- COMPONENT ANALYSIS: Extract component definitions, variants, and properties for design system documentation
- LAYOUT MEASUREMENT: Calculate precise dimensions, spacing, and positioning data from design frames
- PROTOTYPE PARSING: Analyze interaction flows, transitions, and navigation patterns from Figma prototypes
- DESIGN SYSTEM VALIDATION: Check consistency across components using automated design rule validation
- CODE GENERATION: Generate CSS, React, or Vue components based on Figma design specifications
- BATCH PROCESSING: Handle multiple design files with parallel processing and progress tracking
- VERSION CONTROL: Track design file changes and maintain revision history with diff analysis` as PromptPart;