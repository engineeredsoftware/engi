/**
 * Compatibility wrapper for callers still importing the former shipping phase.
 * Canonical V26 implementation lives in `./finish`.
 */

export {
  createFinishPhaseConfig,
  runFinishPhase,
  registerFinishAgentsForType,
  createShippingPhaseConfig,
  runShippingPhase,
  registerShippingAgentsForType
} from './finish';

export { createFinishPhaseConfig as default } from './finish';
