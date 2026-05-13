type BitcodeServerTelemetryLevel = 'debug' | 'info' | 'log' | 'warn' | 'error';

const TELEMETRY_PREFIX = '[Bitcode QA Server]';

export function isBitcodeServerTelemetryEnabled() {
  return (
    process.env.BITCODE_QA_VERBOSE === 'true' ||
    process.env.BITCODE_VERBOSE === 'true' ||
    process.env.NEXT_PUBLIC_BITCODE_QA_VERBOSE === 'true' ||
    process.env.NEXT_PUBLIC_BITCODE_VERBOSE === 'true'
  );
}

export function compactBitcodeServerId(value: string | null | undefined, edge = 6) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length <= edge * 2 + 3) return trimmed;
  return `${trimmed.slice(0, edge)}...${trimmed.slice(-edge)}`;
}

export function bitcodeServerTelemetry(
  level: BitcodeServerTelemetryLevel,
  scope: string,
  event: string,
  detail?: unknown,
) {
  if (!isBitcodeServerTelemetryEnabled()) return;

  const label = `${TELEMETRY_PREFIX} ${scope}:${event}`;
  const logger =
    level === 'debug'
      ? console.debug
      : level === 'info'
        ? console.info
        : level === 'warn'
          ? console.warn
          : level === 'error'
            ? console.error
            : console.log;

  if (detail === undefined) {
    logger.call(console, label);
    return;
  }

  logger.call(console, label, detail);
}
