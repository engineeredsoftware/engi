import { factoryAgentWithSingleStep } from '@bitcode/agent-generics';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';
import { z } from 'zod';
import {
  resolveExpressedReadFromExecution,
  resolveWrittenAssetTypeFromExecution,
} from '../../semantic-resolution';

// Header-expected shapes for Finish-delivered shippables.
export const ShippableSchema = z.object({
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
  pullRequest: ShippableSchema.nullable().optional(),
  fileChanges: FileChangesSchema.nullable().optional(),
  summary: z.string().nullable().optional(),
});

const AssetPackSynthesisArtifactsSchema = WrittenAssetsSchema.extend({
  proofEvidence: z.array(z.string()).optional(),
  reviewNotes: z.array(z.string()).optional(),
});

const DeliveryMechanismSchema = z.object({
  pullRequest: ShippableSchema.nullable().optional(),
  summary: z.string().nullable().optional(),
});

export const AssetPackCompletionOutputSchema = z.object({
  shippables: z.object({
    pullRequest: ShippableSchema.nullable().optional(),
    fileChanges: FileChangesSchema.nullable().optional(),
    summary: z.string().nullable().optional(),
  }),
  assetPackSynthesisArtifacts: AssetPackSynthesisArtifactsSchema.optional(),
  writtenAssets: WrittenAssetsSchema.optional(),
  deliveryMechanism: DeliveryMechanismSchema.optional(),
  read: z.string().optional(),
  writtenAssetType: z.string().optional(),
  processingStats: z.object({
    time: z.string(),
    tokens: z
      .object({ input: z.number(), output: z.number(), total: z.number() })
      .optional(),
    measuredBtd: z.number().optional(),
    btdSemantics: z.string().optional(),
    feeAsset: z.literal('BTC').optional(),
    btcFeesPaid: z.number().nullable().optional(),
    btcFeeUsdEquivalent: z.number().optional(),
  }),
  repoSnapshot: z.object({ org: z.string(), repo: z.string(), branch: z.string(), commit: z.string().optional().default('') }),
});

export type AssetPackCompletionOutput = z.infer<typeof AssetPackCompletionOutputSchema>;

function formatDuration(ms: number): string {
  if (!ms || ms < 0) return '0s';
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m === 0) return `${r}s`;
  return `${m}m ${r}s`;
}

/**
 * AssetPackCompletion Quick Agent (single-step)
 *
 * Prepares the final AssetPack completion for a written-asset execution
 * by reading the execution state (repository, read, phase timings, basic metrics)
 * and producing a concise markdown summary plus structured metadata. Stores the
 * result under `finish/asset_pack_completion/*` in the execution store for API
 * layers to persist into `executions.output`.
 */
const AssetPackCompletionAgent = factoryAgentWithSingleStep<any, AssetPackCompletionOutput>({
  name: 'finish:asset-pack-completion',
  description: 'Prepare final AssetPack completion evidence from execution state',
  execute: async (_input, execution) => {
    // Minimal system prompt alignment (for logging/trace and future LLM)
    try {
      const identity = (
        'You are the AssetPackCompletion agent. Produce a concise Markdown summary and a structured JSON payload matching AssetPackCompletionOutputSchema for the execution header complete view.'
      ) as unknown as PromptPart;
      (execution as any).prompt?.setSpecificExecution('specific_execution:agent:identity', identity);
      (execution as any).prompt?.setSpecificExecution(
        'specific_execution:output:shape',
        (
          'Output JSON with keys: assetPackSynthesisArtifacts{fileChanges,summary,proofEvidence?,reviewNotes?}, writtenAssets{fileChanges,summary}, shippables{pullRequest,summary}, deliveryMechanism{pullRequest,summary}, processingStats{time,tokens?,measuredBtd?,feeAsset?,btcFeesPaid?,btcFeeUsdEquivalent?}, repoSnapshot{org,repo,branch,commit}. V26 Finish stores AssetPack evidence separately from the GitHub pull-request Shippable delivery mechanism.'
        ) as unknown as PromptPart
      );
    } catch {}
    // Repository snapshot
    const org = (execution as any).findUp?.('repository', 'owner') || (execution as any).get?.('repository', 'owner') || '';
    const repo = (execution as any).get?.('repository', 'name') || '';
    const branch = (execution as any).get?.('repository', 'branch') || '';
    const commit = (execution as any).get?.('repository', 'commit') || '';
    const repoSnapshot = { org, repo, branch, commit };

    // Expressed read
    const read = resolveExpressedReadFromExecution(execution);

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

    // Tokens, measured BTD, and BTC fee posture are enriched by the API layer.
    const processingStats = {
      time: formatDuration(totalMs),
    } as AssetPackCompletionOutput['processingStats'];

    // Compose a minimal markdown summary
    const lines: string[] = [];
    lines.push(`# AssetPack Completion`);
    if (read) {
      lines.push('', `## Read`, read.trim());
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
    const dtype = resolveWrittenAssetTypeFromExecution(execution);
    try {
      const prUrl = (execution as any).get?.('finish', 'pullRequestUrl') || '';
      const prTitle = (execution as any).get?.('finish', 'pullRequestTitle') || (read || 'Pull Request');
      const prNumber = (execution as any).get?.('finish', 'pullRequestNumber');
      pullRequest = prUrl ? { url: prUrl, title: prTitle, number: prNumber } : null;
    } catch {}

    const shippables = {
      pullRequest,
      fileChanges: undefined,
      summary,
    };
    const writtenAssets = {
      ...shippables,
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
      summary,
    };

    // Validate and finalize output
    const validated = AssetPackCompletionOutputSchema.parse({
      shippables,
      assetPackSynthesisArtifacts,
      writtenAssets,
      deliveryMechanism,
      read: read || undefined,
      writtenAssetType: dtype || undefined,
      processingStats,
      repoSnapshot,
    });

    const output: AssetPackCompletionOutput = validated;

    // Store for API persistence
    try {
      (execution as any).store?.('finish/asset_pack_completion', 'shippables', shippables as any);
      (execution as any).store?.('finish/asset_pack_completion', 'assetPackSynthesisArtifacts', assetPackSynthesisArtifacts as any);
      (execution as any).store?.('finish/asset_pack_completion', 'writtenAssets', writtenAssets as any);
      (execution as any).store?.('finish/asset_pack_completion', 'deliveryMechanism', deliveryMechanism as any);
      (execution as any).store?.('finish/asset_pack_completion', 'read', read || undefined);
      (execution as any).store?.('finish/asset_pack_completion', 'writtenAssetType', dtype || undefined);
      (execution as any).store?.('finish/asset_pack_completion', 'processingStats', processingStats as any);
      (execution as any).store?.('finish/asset_pack_completion', 'repoSnapshot', repoSnapshot as any);
    } catch {}

    return output;
  }
});

export default AssetPackCompletionAgent;
