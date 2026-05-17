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

function shortIdentifier(value: unknown): string | null {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) return null;
  return text.length > 16 ? `${text.slice(0, 12)}...` : text;
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
    return `Harness started for ${data?.repositoryFullName || 'selected repository'}.`;
  }
  if (event.event === 'harness-preflight') {
    const blockers = [
      data?.realInferenceEnabled === false ? 'real inference flag missing' : null,
      data?.openaiCredentialProvided === false ? 'OpenAI credential missing' : null,
      data?.supabaseUrlProvided === false ? 'Supabase URL missing' : null,
      data?.supabaseServiceRoleProvided === false ? 'Supabase service role missing' : null,
    ].filter(Boolean);
    return blockers.length
      ? `Harness preflight blocked: ${blockers.join(', ')}.`
      : 'Harness preflight passed with real inference and database streaming credentials present.';
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
