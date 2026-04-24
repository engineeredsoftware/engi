/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specifications for AWS Location geospatial operations"
 * current_version: "V26.01.0"
 * versions: []
 * benchmarks: [
 *   { "name": "geospatial_output_completeness", "test": "Does '{{content}}' provide complete geospatial service output specifications? Rate 0-1" },
 *   { "name": "location_intelligence_insights", "test": "Does '{{content}}' deliver location intelligence insights? Rate 0-1" },
 *   { "name": "spatial_analytics_data", "test": "Does '{{content}}' include comprehensive spatial analytics data? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns comprehensive geospatial data including: map_arn, index_arn, calculator_arn, tracker_arn, geofence_collection_arn, place_index_arn, route_calculator_arn, create_time, update_time, map_name, index_name, calculator_name, tracker_name, geofence_collection_name, place_index_name, route_calculator_name, description, data_source, pricing_plan, tags, position_filtering, kms_key_id, tracker_status, place_results with coordinates and addresses, route_legs with distance and duration, geometry data with LineString coordinates, summary with total_distance, total_time, route_bbox, legs with start_position, end_position, distance, duration_seconds, geometry, steps array, device_positions with device_id, sample_time, received_time, position_properties, accuracy, geofence_events with geofence_id, event_type, device_id, geofence_geometry, and comprehensive location analytics including traffic patterns, density maps, movement analytics, spatial clustering insights, proximity analysis results, time-based location trends, and privacy-compliant aggregated location intelligence.' as PromptPart;