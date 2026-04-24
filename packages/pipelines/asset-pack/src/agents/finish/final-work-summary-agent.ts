import { factoryAgentWithSingleStep } from '@bitcode/agent-generics';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';
import { z } from 'zod';
import {
  resolveExpressedNeedFromExecution,
  resolveDeliveryMechanismTemplateFromExecution,
  resolveWrittenAssetTypeFromExecution,
} from '../../semantic-resolution';

// Header-expected shapes (aligned to DeliverablesPageHeader complete mode)
export const DeliverableSchema = z.object({
  url: z.string(),
  number: z.number().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(['open', 'closed', 'merged', 'draft']).optional(),
  createdAt: z.string().optional(),
});

export const FileChangesSchema = z.object({
  edited: z.number().optional(),
  created: z.number().optional(),
  deleted: z.number().optional(),
  paths: z.array(z.string()).optional(),
  charDiff: z
    .object({ edited: z.number(), created: z.number(), deleted: z.number() })
    .optional(),
});

const WrittenAssetsSchema = z.object({
  pullRequest: DeliverableSchema.nullable().optional(),
  pullRequestReviews: z.array(DeliverableSchema).nullable().optional(),
  comments: z.array(DeliverableSchema).nullable().optional(),
  issues: z.array(DeliverableSchema).nullable().optional(),
  fileChanges: FileChangesSchema.nullable().optional(),
  summary: z.string().nullable().optional(),
});

const AssetPackSynthesisArtifactsSchema = WrittenAssetsSchema.extend({
  proofEvidence: z.array(z.string()).optional(),
  reviewNotes: z.array(z.string()).optional(),
});

const DeliveryMechanismSchema = z.object({
  pullRequest: DeliverableSchema.nullable().optional(),
  pullRequestReviews: z.array(DeliverableSchema).nullable().optional(),
  comments: z.array(DeliverableSchema).nullable().optional(),
  issues: z.array(DeliverableSchema).nullable().optional(),
  summary: z.string().nullable().optional(),
});

export const FinalWorkSummaryOutputSchema = z.object({
  deliverables: z.object({
    pullRequest: DeliverableSchema.nullable().optional(),
    pullRequestReviews: z.array(DeliverableSchema).nullable().optional(),
    comments: z.array(DeliverableSchema).nullable().optional(),
    issues: z.array(DeliverableSchema).nullable().optional(),
    fileChanges: FileChangesSchema.nullable().optional(),
    summary: z.string().nullable().optional(),
  }),
  assetPackSynthesisArtifacts: AssetPackSynthesisArtifactsSchema.optional(),
  writtenAssets: WrittenAssetsSchema.optional(),
  deliveryMechanism: DeliveryMechanismSchema.optional(),
  need: z.string().optional(),
  writtenAssetType: z.string().optional(),
  processingStats: z.object({
    time: z.string(),
    tokens: z
      .object({ input: z.number(), output: z.number(), total: z.number() })
      .optional(),
    credits: z.number().optional(),
  }),
  repoSnapshot: z.object({ org: z.string(), repo: z.string(), branch: z.string(), commit: z.string().optional().default('') }),
});

export type FinalWorkSummaryOutput = z.infer<typeof FinalWorkSummaryOutputSchema>;

function formatDuration(ms: number): string {
  if (!ms || ms < 0) return '0s';
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m === 0) return `${r}s`;
  return `${m}m ${r}s`;
}

/**
 * FinalWorkSummary Quick Agent (single-step)
 *
 * Prepares the final work summary for a completed AssetPack written-asset execution
 * by reading the execution state (repository, need, phase timings, basic metrics)
 * and producing a concise markdown summary plus structured metadata. Stores the
 * result under `finish/final_work_summary/*` in the execution store for API
 * layers to persist into `executions.output`.
 */
const FinalWorkSummaryAgent = factoryAgentWithSingleStep<any, FinalWorkSummaryOutput>({
  name: 'finish:final-work-summary',
  description: 'Prepare final asset-pack written-asset summary (markdown + metadata) from execution state',
  execute: async (_input, execution) => {
    // Minimal system prompt alignment (for logging/trace and future LLM)
    try {
      const identity = (
        'You are the FinalWorkSummary agent. Produce a concise Markdown summary and a structured JSON payload matching FinalWorkSummaryOutputSchema for the execution header complete view.'
      ) as unknown as PromptPart;
      (execution as any).prompt?.setSpecificExecution('specific_execution:agent:identity', identity);
      (execution as any).prompt?.setSpecificExecution(
        'specific_execution:output:shape',
        (
          'Output JSON with keys: deliverables{pullRequest,pullRequestReviews,comments,issues,fileChanges,summary}, assetPackSynthesisArtifacts{pullRequest,pullRequestReviews,comments,issues,fileChanges,summary,proofEvidence?,reviewNotes?}, writtenAssets{pullRequest,pullRequestReviews,comments,issues,fileChanges,summary}, deliveryMechanism{pullRequest,pullRequestReviews,comments,issues,summary}, processingStats{time,tokens?,credits?}, repoSnapshot{org,repo,branch,commit}'
        ) as unknown as PromptPart
      );
    } catch {}
    // Repository snapshot
    const org = (execution as any).findUp?.('repository', 'owner') || (execution as any).get?.('repository', 'owner') || '';
    const repo = (execution as any).get?.('repository', 'name') || '';
    const branch = (execution as any).get?.('repository', 'branch') || '';
    const commit = (execution as any).get?.('repository', 'commit') || '';
    const repoSnapshot = { org, repo, branch, commit };

    // Expressed need
    const need = resolveExpressedNeedFromExecution(execution);

    // Phase timings (derive total duration best-effort)
    const phases = ['setup', 'discovery', 'implementation', 'validation', 'finish'];
    let totalMs = 0;
    const phaseDurations: Record<string, number> = {};
    for (const p of phases) {
      const started = (execution as any).get?.(`phase/${p}`, 'started');
      const completed = (execution as any).get?.(`phase/${p}`, 'completed');
      if (started && completed && completed >= started) {
        const d = completed - started;
        phaseDurations[p] = d;
        totalMs += d;
      }
    }

    // Tokens / credits not wired here; leave undefined (API layer may enrich)
    const processingStats = {
      time: formatDuration(totalMs),
    } as FinalWorkSummaryOutput['processingStats'];

    // Compose a minimal markdown summary
    const lines: string[] = [];
    lines.push(`# Asset Pack Written Asset Summary`);
    if (need) {
      lines.push('', `## Need`, need.trim());
    }
    lines.push('', `## Repository`, `${org}/${repo} (${branch}@${commit ? commit.slice(0,7) : 'HEAD'})`);
    lines.push('', `## Processing`, `Total time: ${processingStats.time}`);
    if (Object.keys(phaseDurations).length) {
      lines.push('', `### Phase Durations`);
      for (const [p, ms] of Object.entries(phaseDurations)) {
        lines.push(`- ${p}: ${formatDuration(ms)}`);
      }
    }
    const summary = lines.join('\n');

    let pullRequest: any = null;
    let pullRequestReviews: any[] | null = null;
    let comments: any[] | null = null;
    let issues: any[] | null = null;
    const dtype = resolveWrittenAssetTypeFromExecution(execution);
    const deliveryMechanismTemplate = resolveDeliveryMechanismTemplateFromExecution(execution);
    try {
      if (deliveryMechanismTemplate === 'pull-request') {
        const prUrl = (execution as any).get?.('finish', 'pullRequestUrl') || '';
        const prTitle = (execution as any).get?.('finish', 'pullRequestTitle') || (need || 'Pull Request');
        const prNumber = (execution as any).get?.('finish', 'pullRequestNumber');
        pullRequest = prUrl ? { url: prUrl, title: prTitle, number: prNumber } : null;
      } else if (deliveryMechanismTemplate === 'review-comment') {
        const reviewUrl = (execution as any).get?.('finish', 'reviewUrl') || '';
        const reviewTitle = (execution as any).get?.('finish', 'reviewTitle') || 'PR Review';
        pullRequestReviews = reviewUrl ? [{ url: reviewUrl, title: reviewTitle }] : null;
      } else if (deliveryMechanismTemplate === 'issue') {
        const issueUrl = (execution as any).get?.('finish', 'issueUrl') || '';
        const issueTitle = (execution as any).get?.('finish', 'issueTitle') || 'Design Document';
        issues = issueUrl ? [{ url: issueUrl, title: issueTitle }] : null;
      } else if (deliveryMechanismTemplate === 'issue-comment') {
        const commentUrl = (execution as any).get?.('finish', 'commentUrl') || '';
        const commentTitle = (execution as any).get?.('finish', 'commentTitle') || 'Design Review Comment';
        comments = commentUrl ? [{ url: commentUrl, title: commentTitle }] : null;
      }
    } catch {}

    const deliverables = {
      pullRequest,
      pullRequestReviews: pullRequestReviews || undefined,
      comments: comments || undefined,
      issues: issues || undefined,
      fileChanges: undefined,
      summary,
    };
    const writtenAssets = {
      ...deliverables,
    };
    const implementationArtifacts = (execution as any).get?.('implementation', 'assetPackSynthesisArtifacts');
    const assetPackSynthesisArtifacts =
      implementationArtifacts && typeof implementationArtifacts === 'object'
        ? {
            ...writtenAssets,
            ...(implementationArtifacts as Record<string, unknown>),
            summary: (implementationArtifacts as any).summary || writtenAssets.summary,
          }
        : {
            ...writtenAssets,
          };
    const deliveryMechanism = {
      pullRequest,
      pullRequestReviews: pullRequestReviews || undefined,
      comments: comments || undefined,
      issues: issues || undefined,
      summary,
    };

    // Validate and finalize output
    const validated = FinalWorkSummaryOutputSchema.parse({
      deliverables,
      assetPackSynthesisArtifacts,
      writtenAssets,
      deliveryMechanism,
      need: need || undefined,
      writtenAssetType: dtype || undefined,
      processingStats,
      repoSnapshot,
    });

    const output: FinalWorkSummaryOutput = validated;

    // Store for API persistence
    try {
      (execution as any).store?.('finish/final_work_summary', 'deliverables', deliverables as any);
      (execution as any).store?.('finish/final_work_summary', 'assetPackSynthesisArtifacts', assetPackSynthesisArtifacts as any);
      (execution as any).store?.('finish/final_work_summary', 'writtenAssets', writtenAssets as any);
      (execution as any).store?.('finish/final_work_summary', 'deliveryMechanism', deliveryMechanism as any);
      (execution as any).store?.('finish/final_work_summary', 'need', need || undefined);
      (execution as any).store?.('finish/final_work_summary', 'writtenAssetType', dtype || undefined);
      (execution as any).store?.('finish/final_work_summary', 'processingStats', processingStats as any);
      (execution as any).store?.('finish/final_work_summary', 'repoSnapshot', repoSnapshot as any);
    } catch {}

    return output;
  }
});

export default FinalWorkSummaryAgent;
