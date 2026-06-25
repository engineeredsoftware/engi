/**
 * Deposit-mode AssetPack synthesis agent (V48 Gate 3).
 *
 * The deposit lens of the SynthesizeAssetPacks Implementation phase: synthesize
 * reviewable, MEASURED AssetPack candidate options from the DEPOSITOR's
 * repository source — bounded, source-safe slices of repository knowledge the
 * depositor reviews and uploads to the Depository as supply. Runs on the formal
 * PTRR machinery (factoryAgentWithPTRR → Plan/Try/Refine/Retry, each a Failsafe
 * × Thricified generation) so every call renders in the SDIVF telemetry.
 *
 * Output is the candidate-options shape (options[] with per-pack measurements)
 * the /deposit review surface consumes; the surrounding pipeline (Setup clone,
 * Discovery exploration, Validation, Finish upload-for-review) wraps it.
 *
 * Source-safety: candidates are source-safe metadata (knowledge + capability),
 * never raw source. Protected-IP exclusions are honored absolutely.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts/prompt';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';
import { z } from 'zod';
import { DEPOSIT_MEASUREMENT_CATALOG } from '../../asset-packs-synthesis';

const part = (content: string): PromptPart => content as PromptPart;

const DEPOSIT_OPTION_KINDS = ['capability-slice', 'implementation-pattern', 'proof-operations-slice'] as const;

const candidateSchema = z.object({
  kind: z.string().min(1),
  title: z.string().min(8).max(160),
  summary: z.string().min(40).max(900),
  coveredSourcePaths: z.array(z.string().min(1)).min(1).max(40),
  measurements: z.record(z.string(), z.coerce.number().min(0).max(1)),
  measurementRationale: z.string().min(20).max(700),
  confidence: z.coerce.number().min(0).max(1),
});

const candidateSetSchema = z.object({
  options: z.array(candidateSchema).min(1).max(4),
});

export type DepositSynthesisOptions = z.infer<typeof candidateSetSchema>;

const DEPOSIT_IDENTITY = part(
  'You are SynthesizeAssetPacks in DEPOSIT mode. A depositor supplies their ' +
    'repository knowledge as AssetPacks — bounded, source-safe slices the ' +
    'Depository holds as supply, where future readers find Need-fitting packs. ' +
    'Synthesize 2-4 DISTINCT, measured AssetPack candidate options from the ' +
    'explored repository the depositor can review and admit. Describe knowledge ' +
    'and capability — never quote raw source, secrets, or file contents. Honor ' +
    'protected-IP exclusions absolutely.',
);

const DEPOSIT_REQUIREMENTS = part(
  [
    'Each candidate is a distinct, commercially-legible knowledge slice:',
    `- kind: one of ${DEPOSIT_OPTION_KINDS.join(', ')}.`,
    '- title + source-safe summary (knowledge/capability, never raw text).',
    '- coveredSourcePaths: chosen ONLY from the provided inventory paths, exactly as written.',
    '- measurements: an object with EXACTLY these 0..1 keys, each an honest volume:',
    ...DEPOSIT_MEASUREMENT_CATALOG.map((spec) => `    ${spec.measurementKind}: ${spec.guidance}`),
    '- measurementRationale justifying every measurement; confidence 0..1.',
    'Return ONLY {"options":[ ... ]} — the top-level key MUST be "options".',
  ].join('\n'),
);

const DEPOSIT_PLAN = part(
  'Plan: from the explored repository inventory + depositor steering, identify the ' +
    'distinct, buyer-legible AssetPack slices the repository supports.',
);
const DEPOSIT_TRY = part(
  'Try: synthesize each candidate option with kind, title, source-safe summary, ' +
    'covered source paths, honest measurements, and a measurement rationale.',
);
const DEPOSIT_REFINE = part(
  'Refine: ensure each option is distinct, source-safe, exclusion-honoring, and ' +
    'legible to a future buyer; verify measurements are honest 0..1 volumes.',
);
const DEPOSIT_RETRY = part(
  'Retry: complete any missing option as a minimal valid source-safe candidate ' +
    'rather than failing the synthesis.',
);

function createDepositSynthesisPrompt(): Prompt {
  const prompt = new Prompt();
  prompt.set('agent:identity', DEPOSIT_IDENTITY);
  prompt.set('agent:requirements', DEPOSIT_REQUIREMENTS);
  prompt.set('ptrr:plan', DEPOSIT_PLAN);
  prompt.set('ptrr:try', DEPOSIT_TRY);
  prompt.set('ptrr:refine', DEPOSIT_REFINE);
  prompt.set('ptrr:retry', DEPOSIT_RETRY);
  prompt.require('agent:identity');
  prompt.require('agent:requirements');
  prompt.requirePattern('ptrr:*');
  return prompt;
}

const depositPrompt = createDepositSynthesisPrompt();

export const DepositAssetPackSynthesisAgent = factoryAgentWithPTRR<any, DepositSynthesisOptions>({
  name: 'DepositAssetPackSynthesisAgent',
  description:
    'Synthesizes reviewable, source-safe, measured AssetPack candidate options from the depositor repository source (deposit lens).',
  outputSchema: candidateSetSchema,
  tools: [],
  prompt: depositPrompt,
  stepPrompts: {
    plan: () => depositPrompt,
    try: () => depositPrompt,
    refine: () => depositPrompt,
    retry: () => depositPrompt,
  },
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 5000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 },
});

function findValue(execution: any, namespace: string, key: string): any {
  const local = execution?.get?.(namespace, key);
  if (local !== undefined) return local;
  return execution?.findUp?.(namespace, key);
}

export default async function runDepositAssetPackSynthesisAgent(input: any, execution: any) {
  const repository = input?.repository ?? findValue(execution, 'deposit', 'repository') ?? {};
  const instructions = input?.instructions ?? findValue(execution, 'deposit', 'instructions') ?? null;
  const protectedIpExclusions =
    input?.protectedIpExclusions ?? findValue(execution, 'deposit', 'protectedIpExclusions') ?? [];
  const inventory = input?.inventory ?? findValue(execution, 'deposit', 'inventory');
  const demandContext = input?.demandContext ?? findValue(execution, 'deposit', 'demandContext') ?? [];

  const result = await DepositAssetPackSynthesisAgent(
    {
      ...input,
      repository,
      instructions,
      protectedIpExclusions,
      demandContext,
      inventory,
      inventoryPaths: inventory?.paths,
      excerpts: inventory?.samples,
      discovery: {
        context: execution?.get?.('discovery', 'context'),
        plan: execution?.get?.('discovery', 'plan'),
      },
    },
    execution,
  );

  const options = Array.isArray((result as any)?.options) ? (result as any).options : [];
  const output = {
    success: true,
    semanticKind: 'asset-pack-written-asset' as const,
    options,
    summary: `Synthesized ${options.length} measured deposit AssetPack option(s).`,
    assetPack: { repository },
  };

  try {
    execution.store('implementation', 'options', options);
    execution.store('implementation', 'assetPack', output.assetPack);
    execution.store('implementation', 'summary', output.summary);
  } catch {}

  return output;
}
