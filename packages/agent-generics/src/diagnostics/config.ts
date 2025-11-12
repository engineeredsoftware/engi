export const DIAG_ENABLED: boolean =
  (process?.env?.ENGI_EXECUTION_DEBUG === 'true') || (process?.env?.LOG_LEVEL === 'debug');

export const DIAG_TRACES: boolean = String(process?.env?.ENGI_LOG_TRACES || '').toLowerCase() === '1';
export const DIAG_FULL_TRACES: boolean = String(process?.env?.ENGI_LOG_FULL_TRACES || '').toLowerCase() === '1';
export const DIAG_FULL_PROMPTS: boolean = String(process?.env?.ENGI_LOG_FULL_PROMPTS || '').toLowerCase() === '1';

export const DIAG_WRITE_PROMPT_IO: boolean = !['0', 'false']
  .includes(String(process?.env?.ENGI_WRITE_PROMPT_IO ?? '1').toLowerCase());

// Off by default; enable with ENGI_WRITE_STEP_TRACES=1
export const DIAG_WRITE_STEP_TRACES: boolean = String(process?.env?.ENGI_WRITE_STEP_TRACES || '').toLowerCase() === '1';

export const DIAG_TRACE_MAX: number | undefined = (() => {
  const v = parseInt(String(process?.env?.ENGI_TRACE_MAX_SIZE || ''), 10);
  return Number.isFinite(v) && v > 0 ? v : undefined;
})();
