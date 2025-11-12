/**
 * Phase Delegators - Coordination layer between Pipelines and Agents
 * 
 * PhaseDelegators are Executors that delegate work to Agents within
 * pipeline phases. This index re-exports the factory functions.
 */

export {
  type PhaseDelegator,
  factoryPhaseDelegator,
  factorySequentialPhaseDelegator,
  factoryParallelPhaseDelegator,
  factorySDIVSPhaseDelegators,
  SDIVSPhase
} from './phase-factory';