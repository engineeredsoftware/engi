import type {
  TerminalDepositedSourceRevision,
  TerminalDepositReadWorkbench,
} from './terminal-deposit-read-workbench';
import type { TerminalRepositoryContextState } from './terminal-repository-context';

export type TerminalFitPipelineHarnessRequest = {
  mode: 'asset_pack_pipeline';
  readId: string;
  readPrompt: string;
  depositId: string;
  depositAssetId?: string | null;
  depositHasWalletOrAttestationProof?: boolean;
  depositHasAssetMeasurementEvidence?: boolean;
  depositProofRoot?: string | null;
  depositMeasurementRoot?: string | null;
  depositReconciliationReadbackRoot?: string | null;
  repositoryFullName: string;
  sourceBranch: string;
  sourceCommit: string;
  sourceGitUrl?: string;
  sourceRevision?: string;
  connectionId?: string | number | null;
  sourceDepth: number;
};

export type TerminalFitPipelineHarnessRequestState =
  | {
      ready: true;
      request: TerminalFitPipelineHarnessRequest;
      missing: [];
    }
  | {
      ready: false;
      request: null;
      missing: string[];
    };

export type TerminalFitPipelineHarnessEvent = {
  event: string;
  data: unknown;
};

export type TerminalFitPipelineHarnessStreamSnapshot = {
  runId: string | null;
  output: string;
  outputDetails: Record<string, unknown>;
  executionState: Record<string, unknown>;
  isStreamingComplete: boolean;
  generationCount: number;
  error: string | null;
};

type StreamCallbacks = {
  onEvent?: (event: TerminalFitPipelineHarnessEvent) => void;
};

function normalizedText(value?: string | null): string {
  return String(value || '').trim();
}

function readRowValue(rows: Array<{ label: string; value: string }>, label: string): string {
  return normalizedText(rows.find((row) => row.label === label)?.value);
}

function githubCloneUrl(repositoryFullName: string): string {
  return `https://github.com/${repositoryFullName}.git`;
}

export function buildTerminalFitPipelineHarnessRequest({
  workbench,
  repositoryContext,
  depositedSourceRevision,
  readActivityId,
}: {
  workbench: TerminalDepositReadWorkbench | null;
  repositoryContext?: TerminalRepositoryContextState | null;
  depositedSourceRevision?: TerminalDepositedSourceRevision | null;
  readActivityId?: string | null;
}): TerminalFitPipelineHarnessRequestState {
  const selectedRepository = repositoryContext?.selectedRepository || null;
  const sourceRevision = workbench?.sourceRevision || null;
  const repositoryFullName = normalizedText(
    sourceRevision?.repositoryFullName ||
      depositedSourceRevision?.repositoryFullName ||
      selectedRepository?.fullName ||
      (workbench ? readRowValue(workbench.read.rows, 'Repository') : ''),
  );
  const sourceBranch = normalizedText(
    sourceRevision?.branch ||
      depositedSourceRevision?.branch ||
      repositoryContext?.selectedBranch ||
      selectedRepository?.defaultBranch ||
      (workbench ? readRowValue(workbench.fit.rows, 'Source branch') : ''),
  );
  const sourceCommit = normalizedText(
    sourceRevision?.commit ||
      depositedSourceRevision?.commit ||
      repositoryContext?.selectedCommit ||
      (workbench ? readRowValue(workbench.fit.rows, 'Source commit') : ''),
  );
  const depositId = normalizedText(depositedSourceRevision?.activityId || '');
  const readId = normalizedText(readActivityId || '');

  const missing = [
    !workbench ? 'read-fit workbench' : null,
    !repositoryFullName ? 'repository' : null,
    !sourceBranch ? 'source branch' : null,
    !sourceCommit ? 'source commit' : null,
    !depositId ? 'deposit activity' : null,
    !readId ? 'admitted Read activity' : null,
  ].filter((entry): entry is string => Boolean(entry));

  if (missing.length > 0 || !workbench) {
    return {
      ready: false,
      request: null,
      missing,
    };
  }

  return {
    ready: true,
    missing: [],
    request: {
      mode: 'asset_pack_pipeline',
      readId,
      readPrompt: workbench.read.summary,
      depositId,
      depositAssetId: depositedSourceRevision?.depositAssetId || null,
      depositHasWalletOrAttestationProof:
        depositedSourceRevision?.hasWalletOrAttestationProof ?? undefined,
      depositHasAssetMeasurementEvidence:
        depositedSourceRevision?.hasAssetMeasurementEvidence ?? undefined,
      repositoryFullName,
      sourceBranch,
      sourceCommit,
      sourceGitUrl: selectedRepository?.cloneUrl || selectedRepository?.url || githubCloneUrl(repositoryFullName),
      sourceRevision: sourceCommit,
      sourceDepth: 1,
    },
  };
}

export function parseTerminalFitPipelineHarnessSseBlock(
  block: string,
): TerminalFitPipelineHarnessEvent | null {
  const lines = block.split(/\r?\n/);
  let event = 'message';
  const dataLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('event:')) {
      event = line.slice('event:'.length).trim() || 'message';
    } else if (line.startsWith('data:')) {
      dataLines.push(line.slice('data:'.length).trimStart());
    }
  }

  if (dataLines.length === 0) return null;

  const rawData = dataLines.join('\n');
  let data: unknown = rawData;
  try {
    data = JSON.parse(rawData);
  } catch {
    data = rawData;
  }

  return { event, data };
}

export function drainTerminalFitPipelineHarnessSseBuffer(
  buffer: string,
  onEvent: (event: TerminalFitPipelineHarnessEvent) => void,
): string {
  let remaining = buffer.replace(/\r\n/g, '\n');
  let separatorIndex = remaining.indexOf('\n\n');

  while (separatorIndex >= 0) {
    const block = remaining.slice(0, separatorIndex);
    remaining = remaining.slice(separatorIndex + 2);
    const event = parseTerminalFitPipelineHarnessSseBlock(block);
    if (event) onEvent(event);
    separatorIndex = remaining.indexOf('\n\n');
  }

  return remaining;
}

export async function streamTerminalFitPipelineHarness(
  request: TerminalFitPipelineHarnessRequest,
  callbacks: StreamCallbacks = {},
): Promise<void> {
  const response = await fetch('/api/pipeline-harness/asset-pack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(await readHarnessRouteError(response));
  }

  if (!response.body) {
    throw new Error('Pipeline harness response did not include a readable event stream.');
  }

  const decoder = new TextDecoder();
  const reader = response.body.getReader();
  let buffer = '';

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer = drainTerminalFitPipelineHarnessSseBuffer(
      buffer + decoder.decode(value, { stream: true }),
      (event) => callbacks.onEvent?.(event),
    );
  }

  const finalChunk = decoder.decode();
  if (finalChunk) {
    buffer = drainTerminalFitPipelineHarnessSseBuffer(buffer + finalChunk, (event) =>
      callbacks.onEvent?.(event),
    );
  }
  if (buffer.trim()) {
    const event = parseTerminalFitPipelineHarnessSseBlock(buffer);
    if (event) callbacks.onEvent?.(event);
  }
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function stringList(value: unknown, limit = 3): string[] {
  return Array.isArray(value)
    ? value.map((entry) => String(entry)).filter(Boolean).slice(0, limit)
    : [];
}

function summarizeCandidateIds(value: unknown): string {
  const ids = stringList(value, 3);
  if (!ids.length) return 'no selected candidates';
  return ids.length === 1 ? `candidate ${ids[0]}` : `candidates ${ids.join(', ')}`;
}

function numberText(value: unknown): string | null {
  return typeof value === 'number' && Number.isFinite(value) ? String(value) : null;
}

function shortIdentifier(value: unknown): string | null {
  const text = stringIdentifier(value);
  if (!text) return null;
  return text.length > 16 ? `${text.slice(0, 12)}...` : text;
}

function stringIdentifier(value: unknown): string | null {
  const text = typeof value === 'string' ? value.trim() : '';
  return text || null;
}

function canonicalPhase(value: unknown, fallback = 'Setup'): string {
  const text = typeof value === 'string' ? value.toLowerCase() : '';
  if (text.includes('setup') || text.includes('admission') || text.includes('preflight')) return 'Setup';
  if (text.includes('discovery') || text.includes('search') || text.includes('recall') || text.includes('candidate')) return 'Discovery';
  if (text.includes('implementation') || text.includes('synthesis') || text.includes('asset-pack') || text.includes('write')) return 'Implementation';
  if (text.includes('validation') || text.includes('evaluate') || text.includes('quality') || text.includes('readiness')) return 'Validation';
  if (text.includes('finish') || text.includes('delivery') || text.includes('settlement') || text.includes('finality') || text.includes('readback')) return 'Finish';
  return fallback;
}

function classifyHarnessLogType(event: TerminalFitPipelineHarnessEvent): string {
  const data = recordValue(event.data);
  const type = data?.type ? String(data.type) : '';
  const telemetryEvent = recordValue(data?.telemetryEvent);
  const streamEventType = String(telemetryEvent?.streamEventType || telemetryEvent?.type || '').toLowerCase();
  const namespace = String(telemetryEvent?.namespace || '').toLowerCase();
  const key = String(telemetryEvent?.key || '').toLowerCase();

  if (event.event === 'harness-failed') return 'error';
  if (event.event === 'harness-completed') return 'completion';
  if (event.event === 'harness-preflight' && data?.realInferenceEnabled === false) return 'error';
  if (type === 'command-started' || type === 'command-completed' || type === 'artifacts-read' || type === 'sandbox-created') {
    return 'tool-use';
  }
  if (type === 'telemetry-artifact-event') {
    if (streamEventType.includes('error')) return 'error';
    if (
      streamEventType.includes('generation') ||
      namespace === 'llm' ||
      key.includes('parsedoutput') ||
      typeof telemetryEvent?.inputMessageCount === 'number' ||
      typeof telemetryEvent?.outputContentLength === 'number'
    ) {
      return 'generation';
    }
    if (streamEventType.includes('tool') || namespace.includes('tool')) return 'tool-use';
    if (streamEventType.includes('complete')) return 'completion';
  }
  return 'thinking';
}

function buildHarnessExecutionState(event: TerminalFitPipelineHarnessEvent): Record<string, unknown> {
  if (event.event === 'harness-completed') {
    return {
      phase: 'Finish',
      agent: 'asset-pack-pipeline-harness',
      step: 'completed',
    };
  }
  if (event.event === 'harness-failed') {
    return {
      phase: 'Setup',
      agent: 'asset-pack-pipeline-harness',
      step: 'failed',
    };
  }

  const data = recordValue(event.data);
  const telemetryEvent = recordValue(data?.telemetryEvent);
  const telemetryExecutionState = recordValue(telemetryEvent?.executionState);
  const type = data?.type ? String(data.type) : event.event;
  const stage = telemetryEvent?.stage || telemetryExecutionState?.phase || type;
  const streamEventType = telemetryEvent?.streamEventType || telemetryEvent?.type || type;
  const namespace = telemetryEvent?.namespace ? String(telemetryEvent.namespace) : null;
  const key = telemetryEvent?.key ? String(telemetryEvent.key) : null;

  return {
    phase: canonicalPhase(stage),
    agent:
      telemetryExecutionState?.agent ||
      telemetryEvent?.agent ||
      telemetryEvent?.agentName ||
      data?.agent ||
      data?.label ||
      'asset-pack-pipeline-harness',
    step:
      telemetryExecutionState?.step ||
      telemetryEvent?.step ||
      streamEventType ||
      type,
    failsafe: telemetryExecutionState?.failsafe || telemetryEvent?.failsafe,
    generation:
      telemetryExecutionState?.generation ||
      telemetryEvent?.generation ||
      (classifyHarnessLogType(event) === 'generation' ? [namespace, key].filter(Boolean).join('.') || 'model' : undefined),
    tool:
      telemetryExecutionState?.tool ||
      telemetryEvent?.tool ||
      telemetryEvent?.toolName ||
      (classifyHarnessLogType(event) === 'tool-use' ? type : undefined),
  };
}

function harnessEventTimestamp(event: TerminalFitPipelineHarnessEvent): string | undefined {
  const data = recordValue(event.data);
  const telemetryEvent = recordValue(data?.telemetryEvent);
  const timestamp =
    telemetryEvent?.timestamp ||
    data?.startedAt ||
    data?.completedAt ||
    data?.timestamp ||
    null;
  return timestamp ? String(timestamp) : undefined;
}

function harnessProgress(event: TerminalFitPipelineHarnessEvent): 'error' | 'success' | 'in-progress' {
  if (event.event === 'harness-failed') return 'error';
  if (event.event === 'harness-completed') return 'success';
  return 'in-progress';
}

export function buildTerminalFitPipelineHarnessStreamSnapshot(
  events: TerminalFitPipelineHarnessEvent[],
  harnessState: 'idle' | 'running' | 'completed' | 'failed',
  streamError: string | null = null,
): TerminalFitPipelineHarnessStreamSnapshot {
  const outputDetails: Record<string, unknown> = {};
  const outputLines: string[] = [];
  let latestExecutionState: Record<string, unknown> = {
    phase: harnessState === 'completed' ? 'Finish' : 'Setup',
    agent: 'asset-pack-pipeline-harness',
    step: harnessState,
  };
  let generationCount = 0;
  let runId: string | null = null;

  events.forEach((event, index) => {
    const summary = summarizeTerminalFitPipelineHarnessEvent(event);
    let line = summary;
    if (outputDetails[line]) {
      line = `${summary} #${index + 1}`;
    }

    const type = classifyHarnessLogType(event);
    const executionState = buildHarnessExecutionState(event);
    const timestamp = harnessEventTimestamp(event);
    const data = recordValue(event.data);
    const telemetryEvent = recordValue(data?.telemetryEvent);
    const evidence = recordValue(data?.evidence);

    runId =
      stringIdentifier(data?.runId) ||
      stringIdentifier(telemetryEvent?.runId) ||
      stringIdentifier(evidence?.runId) ||
      runId;

    if (type === 'generation') generationCount += 1;
    latestExecutionState = executionState;
    outputLines.push(line);
    outputDetails[line] = {
      type,
      timestamp,
      harnessEvent: event.event,
      status: {
        message: summary,
        detail: summary,
        progress: harnessProgress(event),
        timestamp,
        executionState,
        metadata: {
          harnessEvent: event.event,
          harnessPayload: event.data,
          telemetryEvent,
        },
      },
    };
  });

  return {
    runId,
    output: outputLines.join('\n'),
    outputDetails,
    executionState: latestExecutionState,
    isStreamingComplete: harnessState === 'completed' || harnessState === 'failed',
    generationCount,
    error: streamError || (harnessState === 'failed' ? 'Live AssetPack fit harness failed.' : null),
  };
}

function summarizeTelemetryArtifactEvent(data: Record<string, unknown>): string {
  const telemetryEvent = recordValue(data.telemetryEvent);
  if (!telemetryEvent) {
    return `Telemetry line ${String(data.lineNumber || '?')} could not be parsed.`;
  }

  const executionState = recordValue(telemetryEvent.executionState);
  const streamType = String(
    telemetryEvent.streamEventType ||
      telemetryEvent.type ||
      'event',
  );
  const stage = String(
    telemetryEvent.stage ||
      executionState?.phase ||
      'telemetry-readback',
  );
  const namespace = telemetryEvent.namespace ? String(telemetryEvent.namespace) : null;
  const key = telemetryEvent.key ? String(telemetryEvent.key) : null;
  const runId = shortIdentifier(telemetryEvent.runId);
  const lineNumber = data.lineNumber ? `line ${String(data.lineNumber)}` : 'line';
  const executionPath = Array.isArray(telemetryEvent.executionPath)
    ? telemetryEvent.executionPath.map((entry) => String(entry)).filter(Boolean).slice(-4).join(' > ')
    : '';
  const dataKeys = stringList(telemetryEvent.dataKeys, 4);
  const inspectable = recordValue(telemetryEvent.inspectable);
  const inspectableKeys = stringList(inspectable?.keys, 4);
  const inputMessageCount = typeof telemetryEvent.inputMessageCount === 'number'
    ? `${telemetryEvent.inputMessageCount} input messages`
    : null;
  const outputContentLength = typeof telemetryEvent.outputContentLength === 'number'
    ? `${telemetryEvent.outputContentLength} output chars`
    : null;
  const parsedOutput = telemetryEvent.parsedOutputPresent === true ? 'parsed output present' : null;

  return [
    `Telemetry ${lineNumber}: ${stage} ${streamType}`,
    namespace || key ? [namespace, key].filter(Boolean).join('.') : null,
    executionPath ? `path ${executionPath}` : null,
    runId ? `run ${runId}` : null,
    dataKeys.length ? `data ${dataKeys.join(', ')}` : null,
    inspectableKeys.length ? `inspectable ${inspectableKeys.join(', ')}` : null,
    inputMessageCount,
    outputContentLength,
    parsedOutput,
  ].filter(Boolean).join('; ') + '.';
}

export function summarizeTerminalFitPipelineHarnessEvent(
  event: TerminalFitPipelineHarnessEvent,
): string {
  const data = recordValue(event.data);
  if (event.event === 'harness-started') {
    const runId = shortIdentifier(data?.runId);
    return [
      `Harness started for ${data?.repositoryFullName || 'selected repository'}`,
      runId ? `run ${runId}` : null,
    ].filter(Boolean).join('; ') + '.';
  }
  if (event.event === 'harness-preflight') {
    const blockers = [
      data?.realInferenceEnabled === false ? 'real inference flag missing' : null,
      data?.fullProfileRequiresAsyncCompletion === true
        ? 'full profile requires async completion gate'
        : null,
      data?.openaiCredentialProvided === false ? 'OpenAI credential missing' : null,
      data?.supabaseUrlProvided === false ? 'Supabase URL missing' : null,
      data?.supabaseServiceRoleProvided === false ? 'Supabase service role missing' : null,
    ].filter(Boolean);
    const profile = data?.realInferenceProfile ? String(data.realInferenceProfile) : null;
    const budget = numberText(data?.runtimeBudgetMs);
    const host = data?.supabaseHost ? String(data.supabaseHost) : null;
    return blockers.length
      ? `Harness preflight blocked: ${blockers.join(', ')}.`
      : [
          'Harness preflight passed with real inference and database streaming credentials present',
          profile ? `profile ${profile}` : null,
          budget ? `budget ${budget}ms` : null,
          host ? `db ${host}` : null,
        ].filter(Boolean).join('; ') + '.';
  }
  if (event.event === 'harness-completed') {
    const evidence = recordValue(data?.evidence);
    const fitResult = recordValue(evidence?.fitResult);
    const depositorySearch = recordValue(evidence?.depositorySearch);
    const ledgerSettlement = recordValue(evidence?.ledgerSettlement);
    const fitState = String(fitResult?.resultState || evidence?.resultState || 'unknown');
    const searchedAssetCount = depositorySearch?.searchedAssetCount;
    const ledgerStatus = ledgerSettlement?.status
      ? `ledger ${String(ledgerSettlement.status)}`
      : null;
    const selectedCandidateText = summarizeCandidateIds(
      fitResult?.selectedCandidateAssetIds || depositorySearch?.selectedCandidateAssetIds,
    );
    const telemetryLineCount = Number(data?.telemetryLineCount || 0);
    const telemetryText = telemetryLineCount > 0
      ? ` telemetry ${telemetryLineCount} lines`
      : ' telemetry artifact pending';
    const searchText = typeof searchedAssetCount === 'number'
      ? ` searched ${searchedAssetCount} assets`
      : ' searched asset count unknown';
    return [
      `Harness completed with outcome ${String(data?.outcome || 'unknown')}`,
      `fit ${fitState}`,
      searchText,
      selectedCandidateText,
      ledgerStatus,
      telemetryText,
    ].filter(Boolean).join('; ') + '.';
  }
  if (event.event === 'harness-failed') {
    return `Harness failed: ${String(data?.error || 'unknown error')}`;
  }
  if (event.event === 'harness-event') {
    if (!data) return 'Harness event: unknown.';
    const type = String(data?.type || 'event');
    const label = data?.label ? String(data.label) : '';
    if (type === 'command-started' && label) {
      return `Harness command started: ${label}.`;
    }
    if (type === 'command-completed' && label) {
      return `Harness command completed: ${label} exit ${String(data?.exitCode ?? 'unknown')}.`;
    }
    if (type === 'artifacts-read') {
      return 'Harness artifacts read back from sandbox.';
    }
    if (type === 'sandbox-created') {
      return `Harness sandbox created: ${String(data?.sandboxId || 'unknown sandbox')}.`;
    }
    if (type === 'telemetry-artifact-event') {
      return summarizeTelemetryArtifactEvent(data);
    }
    if (type === 'sandbox-stopped') {
      return 'Harness sandbox stopped after artifact export.';
    }
    return `Harness event: ${type}.`;
  }
  return `Harness stream event: ${event.event}.`;
}

async function readHarnessRouteError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { error?: unknown };
    if (typeof payload.error === 'string' && payload.error.trim()) return payload.error;
  } catch {
    // Fall through to text/status fallback.
  }

  try {
    const text = await response.text();
    if (text.trim()) return text.trim();
  } catch {
    // Fall through to status fallback.
  }

  return `Pipeline harness request failed with HTTP ${response.status}.`;
}
