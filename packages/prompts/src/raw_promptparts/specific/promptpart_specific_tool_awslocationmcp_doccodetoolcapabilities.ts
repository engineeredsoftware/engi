/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Comprehensive capabilities listing for AWS Location geospatial services integration"
 * current_version: "GA1.01.0"
 * versions: []
 * benchmarks: [
 *   { "name": "geospatial_service_capabilities", "test": "Does '{{content}}' showcase comprehensive geospatial service capabilities? Rate 0-1" },
 *   { "name": "location_intelligence_features", "test": "Does '{{content}}' demonstrate location intelligence features? Rate 0-1" },
 *   { "name": "spatial_analytics_depth", "test": "Does '{{content}}' reflect spatial analytics depth? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Interactive map rendering with multiple data layers, geocoding and reverse geocoding services, route calculation and optimization, real-time device tracking and fleet management, geofencing with customizable boundaries, place indexing and search functionality, time zone resolution, coordinate system transformations, spatial data visualization, location-based analytics and insights, proximity analysis and spatial queries, batch geocoding operations, map tile generation and caching, custom map styling and branding, integration with AWS IoT for device positioning, location history tracking and analysis, traffic pattern recognition, and compliance with global privacy regulations.' as PromptPart;