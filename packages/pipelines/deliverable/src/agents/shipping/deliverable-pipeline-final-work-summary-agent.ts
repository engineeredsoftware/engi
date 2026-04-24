/**
 * Compatibility wrapper for the former shipping final-summary path.
 * Canonical V26 Finish implementation lives in `../finish/final-work-summary-agent`.
 */

export {
  DeliverableSchema,
  FileChangesSchema,
  FinalWorkSummaryOutputSchema,
  type FinalWorkSummaryOutput,
  default
} from '../finish/final-work-summary-agent';
