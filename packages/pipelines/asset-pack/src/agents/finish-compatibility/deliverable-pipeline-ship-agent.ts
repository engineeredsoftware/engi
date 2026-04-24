/**
 * Compatibility wrapper for Finish Delivering callers that still request the
 * older ship-agent export.
 * Canonical V26 Finish/Delivering implementation lives in
 * `../finish/deliver-asset-pack-to-destination-agent`.
 */

export {
  DeliverablePipelineFinishPhaseDeliverAgent,
  default
} from '../finish/deliver-asset-pack-to-destination-agent';
