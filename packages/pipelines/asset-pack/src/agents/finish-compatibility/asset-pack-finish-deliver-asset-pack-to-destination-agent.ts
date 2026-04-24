/**
 * Compatibility wrapper for Finish Delivering callers routed through the
 * bounded V26 migration corridor.
 * Canonical V26 Finish/Delivering implementation lives in
 * `../finish/deliver-asset-pack-to-destination-agent`.
 */

export {
  AssetPackFinishDeliverAgent,
  default
} from '../finish/deliver-asset-pack-to-destination-agent';
