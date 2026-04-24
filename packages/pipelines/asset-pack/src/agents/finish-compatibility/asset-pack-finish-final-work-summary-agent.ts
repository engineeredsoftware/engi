/**
 * Compatibility wrapper for Finish callers that still request the older
 * final-summary export.
 * Canonical V26 Finish implementation lives in `../finish/final-work-summary-agent`.
 */

export {
  DeliverableSchema,
  FileChangesSchema,
  FinalWorkSummaryOutputSchema,
  type FinalWorkSummaryOutput,
  default
} from '../finish/final-work-summary-agent';
