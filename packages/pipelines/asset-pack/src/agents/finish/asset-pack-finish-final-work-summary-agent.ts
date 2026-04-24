/**
 * AssetPack-named Finish summary entrypoint that forwards to the shared final
 * work summary agent used by the SDIVF Finish phase.
 */

export {
  DeliverableSchema,
  FileChangesSchema,
  FinalWorkSummaryOutputSchema,
  type FinalWorkSummaryOutput,
  default
} from './final-work-summary-agent';
