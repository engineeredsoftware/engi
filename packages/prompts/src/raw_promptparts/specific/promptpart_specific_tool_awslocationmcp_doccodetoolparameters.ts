/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specifications for AWS Location geospatial operations"
 * current_version: "GA1.01.0"
 * versions: []
 * benchmarks: [
 *   { "name": "geospatial_parameter_comprehensiveness", "test": "Does '{{content}}' cover comprehensive geospatial service parameters? Rate 0-1" },
 *   { "name": "location_service_configuration", "test": "Does '{{content}}' demonstrate location service configuration depth? Rate 0-1" },
 *   { "name": "spatial_operation_parameters", "test": "Does '{{content}}' include spatial operation parameters? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLPARAMETERS: PromptPart = 
  'map_name: string, index_name: string, calculator_name: string, tracker_name: string, geofence_collection_name: string, place_index_name: string, route_calculator_name: string, style: string, configuration: object, data_source: string, data_source_configuration: object, description: string, kms_key_id: string, tags: object, pricing_plan: string, position: number[], device_id: string, sample_time: string, position_filtering: object, update_type: string, geometry: object, polygon: object, circle: object, text: string, bias_position: number[], filter_bbox: number[], filter_countries: string[], max_results: number, language: string, departure_position: number[], destination_position: number[], waypoint_positions: number[][], departure_time: string, distance_unit: string, travel_mode: string, truck_mode_options: object, car_mode_options: object, walking_options: object, optimize_for: string, include_leg_geometry: boolean, key: string, key_ring_id: string, bounds: number[], center: number[], z: number, x: number, y: number, format: string, height: number, width: number, padding: number, scale: number, geoarrow_metadata: object, intended_use: string, custom_layers: string[], political_view: string' as PromptPart;