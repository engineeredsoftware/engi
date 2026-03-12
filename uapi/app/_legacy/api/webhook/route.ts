import { NextResponse } from 'next/server';
import { track } from '@vercel/analytics/server';
import { log } from '@engi/logger';
import { supabaseAdmin } from '@engi/supabase';
import { verifyGitHubSignature } from './verify';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

type AnyRequest = Request & {
  headers?: {
    get?(key: string): string | null;
  };
};

const DELIVERABLE_LABELS: Record<
  string,
  { scope: 'issue' | 'pr' | 'any'; trigger: string }
> = {
  'engi-deliver-issue': { scope: 'issue', trigger: 'engi-deliver-issue' },
  'engi-deliver-pr': { scope: 'pr', trigger: 'engi-deliver-pr' },
  'engi-pr': { scope: 'any', trigger: 'engi-pr' }
};

const COMMENT_COMMANDS: Array<{ regex: RegExp; trigger: string }> = [
  { regex: /@engi-pr\b/i, trigger: 'issue_comment:pr' },
  { regex: /@engi-review\b/i, trigger: 'issue_comment:review' },
  { regex: /@engi-commit\b/i, trigger: 'issue_comment:commit' }
];

async function readRequestBody(request: AnyRequest): Promise<{ raw: string; data: any }> {
  if (typeof request.text === 'function') {
    const raw = await request.text();
    return { raw, data: JSON.parse(raw || '{}') };
  }

  if (typeof request.json === 'function') {
    const data = await request.json();
    return { raw: JSON.stringify(data ?? {}), data };
  }

  throw new Error('Request does not support body parsing');
}

export async function POST(request: AnyRequest) {
  let parsedBody: { raw: string; data: any };
  try {
    parsedBody = await readRequestBody(request);
  } catch (error: any) {
    log('[route /webhook POST] JSON parse error (test)', 'error', { error: error?.message ?? error });
    return NextResponse.json({ success: false, code: 400, error: 'Invalid JSON' }, { status: 200 });
  }

  const payload = parsedBody.data ?? {};

  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const signatureHeader =
    request.headers?.get?.('x-hub-signature-256') ?? request.headers?.get?.('X-Hub-Signature-256') ?? undefined;
  if (secret && !verifyGitHubSignature({ secret, payload: parsedBody.raw, signatureHeader })) {
    return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 });
  }

  const githubEvent = request.headers?.get?.('x-github-event') ?? '';

  if (githubEvent === 'issue_comment') {
    return handleIssueCommentEvent(payload);
  }

  if (payload.action !== 'labeled') {
    log('[route /webhook POST] Ignoring non-labeled event', 'info', { action: payload.action });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const labelName: string = payload.label?.name ?? '';

  const labelConfig = DELIVERABLE_LABELS[labelName];
  if (!labelConfig) {
    log('[route /webhook POST] Ignoring unsupported label', 'info', { labelName });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const isPR = Boolean(payload.issue?.pull_request);
  if (labelConfig.scope === 'pr' && !isPR) {
    log('[route /webhook POST] Label not applicable for issue', 'info', { labelName });
    return NextResponse.json({ success: true }, { status: 200 });
  }
  if (labelConfig.scope === 'issue' && isPR) {
    log('[route /webhook POST] Label not applicable for PR', 'info', { labelName });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return triggerDeliverablePipeline({
    trigger: labelConfig.trigger,
    payload,
    isPR
  });
}

async function handleIssueCommentEvent(payload: any) {
  const commentBody: string = payload.comment?.body ?? '';
  const match = COMMENT_COMMANDS.find((command) => command.regex.test(commentBody));
  if (!match) {
    log('[route /webhook POST] Ignoring unsupported comment command', 'info', { body: commentBody });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const isPR = Boolean(payload.issue?.pull_request);
  return triggerDeliverablePipeline({
    trigger: match.trigger,
    payload,
    isPR,
    interactionId: payload.comment?.id ?? undefined,
    eventType: 'issue_comment'
  });
}

async function triggerDeliverablePipeline(options: {
  trigger: string;
  payload: any;
  isPR: boolean;
  interactionId?: string | number;
  eventType?: 'labeled' | 'issue_comment';
}) {
  const { trigger, payload, isPR } = options;
  const eventType = options.eventType ?? 'labeled';
  const issueNumber = payload.issue?.number ?? payload.pull_request?.number;
  const installationId = payload.installation?.id;

  if (!installationId || typeof issueNumber === 'undefined') {
    log('[route /webhook POST] Missing installation or issue number', 'warn', { trigger });
    return NextResponse.json({ success: false, code: 500 }, { status: 200 });
  }

  const userId = await lookupUserId(installationId);
  if (!userId) {
    log('[route /webhook POST] No user connection found', 'warn', { installationId });
    return NextResponse.json({ success: false, code: 500 }, { status: 200 });
  }

  let alreadyHandled = false;
  try {
    alreadyHandled = await wasInteractionProcessed({
      installationId,
      trigger,
      eventType,
      issueNumber,
      interactionId: options.interactionId
    });
  } catch (error: any) {
    log('[route /webhook POST] Unable to check interaction history', 'warn', {
      trigger,
      error: error?.message ?? error
    });
  }

  if (alreadyHandled) {
    log('[route /webhook POST] Interaction already processed, skipping', 'info', { eventType, trigger });
    return NextResponse.json({ success: true, message: 'Already processed' }, { status: 200 });
  }

  log('[route /webhook POST] Invoking pipeline', 'info', { label: trigger, isPR, issueNumber });

  let pipelineTriggered = false;
  try {
    await execAsync(`ENGI_PIPELINE trigger --label=${trigger} --issue=${issueNumber}`);
    pipelineTriggered = true;
    try {
      await markInteractionProcessed({
        installationId,
        trigger,
        eventType,
        issueNumber,
        interactionId: options.interactionId,
        userId
      });
    } catch (error: any) {
      log('[route /webhook POST] Unable to record interaction', 'warn', {
        trigger,
        error: error?.message ?? error
      });
    }
  } catch (error: any) {
    log('[route /webhook POST] Pipeline trigger failed', 'error', {
      label: trigger,
      userId,
      issueNumber,
      error: error?.message ?? error
    });
  }

  if (pipelineTriggered) {
    await track('Trigger Deliverable Pipeline', {
      labelName: trigger,
      userId,
      issueNumber
    });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

async function lookupUserId(installationId: string | number) {
  const { data } = await supabaseAdmin
    .from('user_connections')
    .select('user_id')
    .eq('installation_id', installationId)
    .maybeSingle();

  return data?.user_id ?? null;
}

async function wasInteractionProcessed(options: {
  installationId: string | number;
  trigger: string;
  eventType: string;
  issueNumber: number;
  interactionId?: string | number;
}) {
  const interactionKey = options.interactionId ?? `${options.issueNumber}:${options.trigger}`;
  const { data } = await supabaseAdmin
    .from('github_interactions')
    .select('id')
    .eq('installation_id', options.installationId)
    .eq('trigger', options.trigger)
    .eq('event_type', options.eventType)
    .eq('issue_number', options.issueNumber)
    .eq('interaction_id', interactionKey)
    .maybeSingle();

  if (data) {
    return true;
  }

  return false;
}

async function markInteractionProcessed(options: {
  installationId: string | number;
  trigger: string;
  eventType: string;
  issueNumber: number;
  userId: string;
  interactionId?: string | number;
}) {
  const interactionKey = options.interactionId ?? `${options.issueNumber}:${options.trigger}`;
  await supabaseAdmin.from('github_interactions').insert({
    installation_id: options.installationId,
    trigger: options.trigger,
    event_type: options.eventType,
    issue_number: options.issueNumber,
    user_id: options.userId,
    interaction_id: interactionKey
  });
}
