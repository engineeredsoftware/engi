/**
 * Deliverable Pipeline - Comprehend Task Agent (compatibility shell)
 *
 * The active V26 setup owner is `deliverable-pipeline-comprehend-need-agent`.
 * This retained task-named path survives only as a compatibility export for
 * older imports while the live semantics have moved to Bitcode need handling.
 */

export {
  DeliverablePipelineComprehendNeedAgent,
  DeliverablePipelineComprehendDoDAgent,
  runComprehendNeedAgent,
} from './deliverable-pipeline-comprehend-need-agent';

export { default } from './deliverable-pipeline-comprehend-need-agent';
