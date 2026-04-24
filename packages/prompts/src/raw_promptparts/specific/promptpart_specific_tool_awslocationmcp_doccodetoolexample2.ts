/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showcasing smart city urban planning with geospatial analytics"
 * current_version: "V26.01.0"
 * versions: []
 * benchmarks: [
 *   { "name": "smart_city_demonstration", "test": "Does '{{content}}' demonstrate smart city planning capabilities? Rate 0-1" },
 *   { "name": "urban_analytics_showcase", "test": "Does '{{content}}' showcase urban analytics and planning? Rate 0-1" },
 *   { "name": "geospatial_intelligence_depth", "test": "Does '{{content}}' demonstrate advanced geospatial intelligence? Rate 0-1" },
 *   { "name": "civic_infrastructure_relevance", "test": "Does '{{content}}' exemplify civic infrastructure management quality? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Smart City Urban Planning Platform: createGeofenceCollection({ collection_name: "smart-city-zones", description: "Urban planning and traffic management geofences", kms_key_id: "arn:aws:kms:us-east-1:123456789012:key/smart-city-key", pricing_plan: "RequestBasedUsage", tags: { Municipality: "MetroCity", Department: "Urban-Planning", Project: "Smart-City-2030" } }) + batchPutGeofence({ collection_name: "smart-city-zones", entries: [{ geofence_id: "downtown-core", geometry: { polygon: [[[-122.4194, 37.7749], [-122.4094, 37.7849], [-122.3994, 37.7749], [-122.4094, 37.7649], [-122.4194, 37.7749]]] } }, { geofence_id: "school-zone-safety", geometry: { circle: { center: [-122.4144, 37.7799], radius: 500 } } }, { geofence_id: "emergency-services-priority", geometry: { polygon: [[[-122.4244, 37.7799], [-122.4144, 37.7899], [-122.4044, 37.7799], [-122.4144, 37.7699], [-122.4244, 37.7799]]] } }] }) + searchPlaceIndexForText({ index_name: "smart-city-places", text: "public transportation", bias_position: [-122.4194, 37.7749], max_results: 50, filter_countries: ["USA"] }) → Returns comprehensive urban intelligence platform with real-time traffic flow optimization, automated school zone speed enforcement, emergency service route prioritization, public transit ridership analytics, air quality monitoring zones, noise pollution mapping, pedestrian traffic analysis, parking availability predictions, urban heat island detection, flood risk assessment zones, and AI-driven city planning recommendations that reduced traffic congestion by 34% and improved emergency response times by 18% across the metropolitan area.' as PromptPart;