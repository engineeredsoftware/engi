import { factoryAgentWithSingleStep } from '@engi/agent-generics';
import type { PromptPart } from '@engi/prompts';
import { z } from 'zod';

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

export const FinalWorkSummaryOutputSchema = z.object({
  deliverables: z.object({
    pullRequest: DeliverableSchema.nullable().optional(),
    pullRequestReviews: z.array(DeliverableSchema).nullable().optional(),
    comments: z.array(DeliverableSchema).nullable().optional(),
    issues: z.array(DeliverableSchema).nullable().optional(),
    fileChanges: FileChangesSchema.nullable().optional(),
    summary: z.string().nullable().optional(),
  }),
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
 * Prepares the final work summary for a completed execution by reading the
 * execution state (repository, task, phase timings, basic metrics) and
 * producing a concise markdown summary plus structured metadata. Stores the
 * result under `shipping/final_work_summary/*` in the execution store for
 * API layers to persist into `executions.output`.
 */
const FinalWorkSummaryAgent = factoryAgentWithSingleStep<any, FinalWorkSummaryOutput>({
  name: 'shipping:final-work-summary',
  description: 'Prepare final work summary (markdown + metadata) from execution state',
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
          'Output JSON with keys: deliverables{pullRequest,pullRequestReviews,comments,issues,fileChanges,summary}, processingStats{time,tokens?,credits?}, repoSnapshot{org,repo,branch,commit}'
        ) as unknown as PromptPart
      );
    } catch {}
    // Repository snapshot
    const org = (execution as any).findUp?.('repository', 'owner') || (execution as any).get?.('repository', 'owner') || '';
    const repo = (execution as any).get?.('repository', 'name') || '';
    const branch = (execution as any).get?.('repository', 'branch') || '';
    const commit = (execution as any).get?.('repository', 'commit') || '';
    const repoSnapshot = { org, repo, branch, commit };

    // Task
    const task = (execution as any).get?.('task', 'description') || '';

    // Phase timings (derive total duration best-effort)
    const phases = ['setup', 'discovery', 'implementation', 'validation', 'shipping'];
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
    lines.push(`# Pipeline Execution Summary`);
    if (task) {
      lines.push('', `## Task`, task.trim());
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

    // Map deliverable type to summary groups
    let pullRequest: any = null;
    let pullRequestReviews: any[] | null = null;
    let comments: any[] | null = null;
    let issues: any[] | null = null;
    const dtype = (execution as any).findUp?.('pipeline', 'deliverableType') || (execution as any).get?.('pipeline', 'deliverableType');
    try {
      if (dtype === 'code-change') {
        const prUrl = (execution as any).get?.('shipping', 'pullRequestUrl') || '';
        const prTitle = (execution as any).get?.('shipping', 'pullRequestTitle') || (task || 'Pull Request');
        const prNumber = (execution as any).get?.('shipping', 'pullRequestNumber');
        pullRequest = prUrl ? { url: prUrl, title: prTitle, number: prNumber } : null;
      } else if (dtype === 'code-change-review') {
        const reviewUrl = (execution as any).get?.('shipping', 'reviewUrl') || '';
        const reviewTitle = (execution as any).get?.('shipping', 'reviewTitle') || 'PR Review';
        pullRequestReviews = reviewUrl ? [{ url: reviewUrl, title: reviewTitle }] : null;
      } else if (dtype === 'design-document') {
        const issueUrl = (execution as any).get?.('shipping', 'issueUrl') || '';
        const issueTitle = (execution as any).get?.('shipping', 'issueTitle') || 'Design Document';
        issues = issueUrl ? [{ url: issueUrl, title: issueTitle }] : null;
      } else if (dtype === 'design-document-review') {
        const commentUrl = (execution as any).get?.('shipping', 'commentUrl') || '';
        const commentTitle = (execution as any).get?.('shipping', 'commentTitle') || 'Design Review Comment';
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

    // Validate and finalize output
    const validated = FinalWorkSummaryOutputSchema.parse({
      deliverables,
      processingStats,
      repoSnapshot,
    });

    const output: FinalWorkSummaryOutput = validated;

    // Store for API persistence
    try {
      (execution as any).store?.('shipping/final_work_summary', 'deliverables', deliverables as any);
      (execution as any).store?.('shipping/final_work_summary', 'processingStats', processingStats as any);
      (execution as any).store?.('shipping/final_work_summary', 'repoSnapshot', repoSnapshot as any);
    } catch {}

    return output;
  }
});

export default FinalWorkSummaryAgent;
