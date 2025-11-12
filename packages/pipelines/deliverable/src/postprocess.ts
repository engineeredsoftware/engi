import type { DeliverableOutput, DeliverablePostprocessed } from './types/PipelineSchemas';
import { Execution, getValidationReadyToShip } from '@engi/execution-generics';

export function normalizeDeliverableOutput(output: DeliverableOutput, execution: Execution): DeliverableOutput {
  const enhanced = { ...output };

  // 1) Ensure deliverable links are populated if available on execution
  const prUrl = enhanced.deliverable?.prUrl || (execution.get('shipping', 'prUrl') as string) || (execution.get('shipping', 'pullRequestUrl') as string);
  if (prUrl) {
    enhanced.deliverable = { ...(enhanced.deliverable || {}), prUrl } as any;
  }

  // 2) Backfill artifacts from execution if missing
  const filesModified = enhanced.artifacts?.filesModified?.length
    ? enhanced.artifacts.filesModified
    : ((execution.get('implementation', 'filesChanged') as string[]) || []);
  if (filesModified?.length) {
    enhanced.artifacts = {
      ...(enhanced.artifacts || ({} as any)),
      filesModified,
    } as any;
  }

  // 3) Ensure a human-readable summary exists
  if (!enhanced.summary || !enhanced.summary.trim()) {
    const parts: string[] = [];
    parts.push(enhanced.success ? 'Deliverable completed.' : 'Deliverable finished with issues.');
    if (prUrl) parts.push(`PR: ${prUrl}`);
    if (filesModified?.length) parts.push(`Files modified: ${filesModified.length}`);
    enhanced.summary = parts.join(' ');
  }

  return enhanced;
}

export function buildDeliverablePostprocessedResult(
  execution: Execution,
  normalized: DeliverableOutput
): DeliverablePostprocessed {
  const executionId = String(execution.get('execution', 'id') || '');
  const repoOwner = execution.get('source', 'owner');
  const repoName = execution.get('source', 'name');
  const repoFull = execution.get('source', 'fullName');
  const repository =
    (repoOwner && repoName ? `${repoOwner}/${repoName}` : repoFull) || undefined;

  const finalSummary =
    (execution as any).get?.('shipping/final_work_summary', 'summary') ||
    (execution as any).get?.('shipping/final_work_summary', 'deliverables')?.summary ||
    normalized.summary ||
    undefined;

  const shippingArtifacts = (execution as any).get?.('shipping/final_work_summary', 'deliverables');
  const filesCreated =
    normalized.artifacts?.filesCreated ??
    shippingArtifacts?.fileChanges?.created ??
    [];
  const filesModified =
    normalized.artifacts?.filesModified ??
    shippingArtifacts?.fileChanges?.modified ??
    [];

  const artifacts =
    filesCreated.length ||
    filesModified.length ||
    normalized.artifacts?.documentation?.length
      ? {
          filesCreated,
          filesModified,
          testsAdded: normalized.artifacts?.testsAdded ?? 0,
          testsPassing: normalized.artifacts?.testsPassing,
          documentation: normalized.artifacts?.documentation ?? [],
        }
      : null;

  const validationReady = getValidationReadyToShip(execution, 'deliverable');

  return {
    executionId,
    kind: 'deliverable',
    title:
      normalized.deliverable?.title ||
      normalized.summary ||
      'Deliverable',
    repository,
    summary: finalSummary,
    artifacts,
    deliverableType:
      normalized.deliverableType ||
      (execution.get('pipeline', 'deliverableType') as any) ||
      (execution as any).get?.('route/preprocessed', 'deliverables')?.deliverableType,
    ...(validationReady
      ? {
          validationReady: {
            approved: !!validationReady.approved,
            assessment: validationReady.assessment ?? null,
            confidence:
              typeof validationReady.confidence === 'number'
                ? validationReady.confidence
                : null,
          },
        }
      : {}),
  };
}
