/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example demonstrating enterprise logistics fleet management with real-time tracking"
 * current_version: "GA1.01.0"
 * versions: []
 * benchmarks: [
 *   { "name": "fleet_management_demonstration", "test": "Does '{{content}}' demonstrate enterprise fleet management capabilities? Rate 0-1" },
 *   { "name": "real_time_tracking_showcase", "test": "Does '{{content}}' showcase real-time tracking capabilities? Rate 0-1" },
 *   { "name": "logistics_optimization_example", "test": "Is '{{content}}' relevant for logistics optimization scenarios? Rate 0-1" },
 *   { "name": "geospatial_intelligence_quality", "test": "Does '{{content}}' exemplify advanced geospatial intelligence quality? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Global Logistics Fleet Management: createLocationTracker({ tracker_name: "global-logistics-fleet", description: "Enterprise fleet tracking for global supply chain", kms_key_id: "arn:aws:kms:us-east-1:123456789012:key/logistics-key", position_filtering: { accuracy_based: true, distance_based: true, time_based: true }, pricing_plan: "RequestBasedUsage", tags: { Department: "Logistics", Environment: "Production", ComplianceLevel: "DOT-Regulated" } }) + calculateRoute({ calculator_name: "logistics-route-optimizer", departure_position: [-122.4194, 37.7749], destination_position: [-74.0060, 40.7128], waypoint_positions: [[-87.6298, 41.8781], [-95.3698, 29.7604]], travel_mode: "Truck", truck_mode_options: { weight: 40000, height: 4.2, width: 2.6, length: 16.5, hazmat_type: "Flammable" }, optimize_for: "FastestRoute", departure_time: "2025-08-02T08:00:00Z", include_leg_geometry: true }) → Returns comprehensive fleet management system with real-time vehicle positions, optimized multi-stop routes saving 23% fuel costs, geofenced delivery zones with automated notifications, driver behavior analytics, predictive maintenance alerts based on route conditions, regulatory compliance monitoring for DOT requirements, customer delivery ETAs with 95% accuracy, and environmental impact tracking across 2,847 vehicles operating in 47 countries.' as PromptPart;