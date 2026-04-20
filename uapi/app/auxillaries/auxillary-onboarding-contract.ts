export type {
  AuxillaryDataPayload,
  AuxillaryOnboardingPayload,
  AuxillaryOnboardingUpdatePayload,
  ConcreteAuxillaryPane,
} from '@bitcode/api/src/routes/auxillaries-contract';
export {
  AUXILLARY_FLOW_STEPS,
  buildAnonymousAuxillaryData,
  buildAuxillaryDataPayload,
  buildAuxillaryOnboardingPayload,
  isAuxillaryOnboardingComplete,
  normalizeAuxillaryPane,
  normalizeAuxillarySteps,
  normalizeCompletedAuxillaryPane,
  parseStoredAuxillarySteps,
  serializeAuxillarySteps,
} from '@bitcode/api/src/routes/auxillaries-contract';
