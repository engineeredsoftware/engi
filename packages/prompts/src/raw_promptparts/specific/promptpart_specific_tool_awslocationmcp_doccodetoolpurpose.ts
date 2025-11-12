/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for AWS Location geospatial services integration"
 * current_version: "GA1.01.0"
 * versions: []
 * benchmarks: [
 *   { "name": "geospatial_purpose_clarity", "test": "Does '{{content}}' clearly articulate geospatial services integration purpose? Rate 0-1" },
 *   { "name": "location_intelligence_focus", "test": "Does '{{content}}' emphasize location intelligence and spatial analytics? Rate 0-1" },
 *   { "name": "global_positioning_mission", "test": "Does '{{content}}' convey global positioning and mapping mission? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLPURPOSE: PromptPart = 
  'Delivers comprehensive AWS Location Services integration with advanced geospatial analytics, real-time tracking, mapping visualization, geocoding, route optimization, geofencing, and location-based intelligence for applications requiring precise spatial data processing and global positioning capabilities.' as PromptPart;