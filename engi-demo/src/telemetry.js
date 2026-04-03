function summarize(value, depth = 0) {
  if (value == null) return value;
  if (depth > 2) return '[max-depth]';
  if (Array.isArray(value)) {
    return {
      kind: 'array',
      length: value.length,
      sample: value.slice(0, 3).map((item) => summarize(item, depth + 1))
    };
  }
  if (typeof value === 'object') {
    const out = {};
    for (const [key, entry] of Object.entries(value).slice(0, 12)) {
      if (typeof entry === 'string' && entry.length > 180) {
        out[key] = `${entry.slice(0, 180)}…`;
      } else {
        out[key] = summarize(entry, depth + 1);
      }
    }
    return out;
  }
  return value;
}

function emit(level, event, fields = {}) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    event,
    ...fields
  };
  const line = JSON.stringify(payload);
  if (level === 'error') console.error(line);
  else console.log(line);
}

export function telemetry(event, fields = {}) {
  emit('info', event, summarize(fields));
}

export function telemetryError(event, error, fields = {}) {
  emit('error', event, {
    ...summarize(fields),
    error: {
      name: error?.name,
      message: error?.message,
      stack: error?.stack?.split('\n').slice(0, 6).join('\n')
    }
  });
}

export function telemetrySpan(event, input, fn) {
  const startedAt = Date.now();
  telemetry(`${event}.start`, { input });
  try {
    const output = fn();
    if (output && typeof output.then === 'function') {
      return output.then((resolved) => {
        telemetry(`${event}.ok`, { input, output: resolved, durationMs: Date.now() - startedAt });
        return resolved;
      }).catch((error) => {
        telemetryError(`${event}.error`, error, { input, durationMs: Date.now() - startedAt });
        throw error;
      });
    }
    telemetry(`${event}.ok`, { input, output, durationMs: Date.now() - startedAt });
    return output;
  } catch (error) {
    telemetryError(`${event}.error`, error, { input, durationMs: Date.now() - startedAt });
    throw error;
  }
}
