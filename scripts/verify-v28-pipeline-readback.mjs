#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DEFAULT_LOOKBACK_HOURS = 48;

const PIPELINE_TABLES = [
  'pipeline_runs',
  'run_jobs',
  'execution_events',
  'stream_logs',
  'phase_executions',
  'deliverable_pipeline_runs',
  'deliverable_pipeline_events',
  'deliverable_pipeline_phase_delegations',
  'deliverable_pipeline_agent_steps',
  'deliverable_pipeline_generations',
  'deliverable_pipeline_tool_executions',
];

const LEDGER_TABLES = [
  'btd_asset_pack_ranges',
  'btc_fee_transactions',
  'btd_terminal_journal_entries',
  'btd_asset_pack_ledger_anchors',
  'btd_ownership_events',
  'btd_read_licenses',
  'btd_crypto_telemetry_events',
];

const COUNTABLE_TABLES = [...PIPELINE_TABLES, ...LEDGER_TABLES];
const SUBSTITUTABLE_TABLES = new Set(['phase_executions']);

function usage() {
  console.log(`Usage: node scripts/verify-v28-pipeline-readback.mjs [options]

Options:
  --env-file <path>       Load env values from a dotenv file. Can be repeated.
  --expected-host <host>  Require SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL to match this host.
  --readback-source <s>   Count rows through "rest" or "db". Default: rest.
  --lookback-hours <n>    Recent-row lookback window. Default: ${DEFAULT_LOOKBACK_HOURS}.
  --json                  Emit machine-readable JSON only.
  --help                  Show this help.

The verifier never prints Supabase keys or model credentials. It checks only
sanitized host identity, table availability, recent pipeline telemetry counts,
and settlement/ledger readback counts required by the V28 Read/Fit gate.`);
}

export function parseArgs(argv) {
  const args = {
    envFiles: [],
    expectedHost: process.env.BITCODE_EXPECTED_SUPABASE_HOST || '',
    readbackSource: 'rest',
    lookbackHours: DEFAULT_LOOKBACK_HOURS,
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--') {
      continue;
    } else if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg === '--json') {
      args.json = true;
    } else if (arg === '--env-file') {
      const value = argv[index + 1];
      if (!value) throw new Error('--env-file requires a path.');
      args.envFiles.push(value);
      index += 1;
    } else if (arg === '--expected-host') {
      const value = argv[index + 1];
      if (!value) throw new Error('--expected-host requires a host.');
      args.expectedHost = value.trim();
      index += 1;
    } else if (arg === '--readback-source') {
      const value = argv[index + 1];
      if (value !== 'rest' && value !== 'db') {
        throw new Error('--readback-source must be rest or db.');
      }
      args.readbackSource = value;
      index += 1;
    } else if (arg === '--lookback-hours') {
      const value = Number(argv[index + 1]);
      if (!Number.isFinite(value) || value <= 0) {
        throw new Error('--lookback-hours requires a positive number.');
      }
      args.lookbackHours = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

export function parseDotenvFile(path) {
  const absolute = resolve(process.cwd(), path);
  if (!existsSync(absolute)) {
    throw new Error(`Env file does not exist: ${path}`);
  }
  const entries = {};
  for (const rawLine of readFileSync(absolute, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!match) continue;
    entries[match[1]] = stripEnvQuotes(match[2].trim());
  }
  return entries;
}

function stripEnvQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function loadEnvironment(envFiles, baseEnv = process.env) {
  const loaded = {};
  for (const file of envFiles) {
    Object.assign(loaded, parseDotenvFile(file));
  }
  return {
    ...loaded,
    ...baseEnv,
  };
}

function readSupabaseUrl(env) {
  return env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || '';
}

function readSupabaseDbUrl(env) {
  return env.SUPABASE_DB_URL || env.DATABASE_URL || '';
}

function readAdminCredential(env) {
  const candidates = [
    env.SUPABASE_SERVICE_ROLE_KEY,
    env.SUPABASE_SECRET_KEY,
    env.SUPABASE_ADMIN_KEY,
  ].filter((value) => typeof value === 'string' && value.trim());
  return (
    candidates.find(isSupabaseAdminCredential) ||
    candidates.find(isSecretPresent) ||
    ''
  );
}

function readHost(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

function normalizeSupabaseHost(host) {
  return host.startsWith('db.') ? host.slice(3) : host;
}

function isPlaceholderUrl(url) {
  return !url || url.includes('your-project.supabase.co') || url.includes('<');
}

export function isSecretPresent(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  const lower = text.toLowerCase();
  return (
    text.length > 16 &&
    !text.includes('<') &&
    !lower.includes('placeholder') &&
    !lower.includes('your-') &&
    !lower.includes('your_')
  );
}

function decodeJwtPayload(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  const [, payload] = text.split('.');
  if (!payload) return null;
  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

function isSupabaseSecretKey(value) {
  return typeof value === 'string' && value.trim().startsWith('sb_secret_');
}

export function isSupabaseAdminCredential(value) {
  if (!isSecretPresent(value)) return false;
  if (isSupabaseSecretKey(value)) return true;
  const payload = decodeJwtPayload(value);
  if (!payload || typeof payload !== 'object') return false;
  return payload.role === 'service_role';
}

function countFromContentRange(value) {
  if (!value) return null;
  const total = String(value).split('/').pop();
  if (!total || total === '*') return null;
  const parsed = Number(total);
  return Number.isFinite(parsed) ? parsed : null;
}

async function countRecentRows({ url, key, table, sinceIso, fetchImpl }) {
  const endpoint = new URL(`/rest/v1/${table}`, url);
  endpoint.searchParams.set('select', '*');
  endpoint.searchParams.set('created_at', `gte.${sinceIso}`);
  endpoint.searchParams.set('limit', '1');

  const response = await fetchImpl(endpoint, {
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      prefer: 'count=exact',
    },
  });

  if (!response.ok) {
    return {
      table,
      count: null,
      error: await readSupabaseError(response),
    };
  }

  return {
    table,
    count: countFromContentRange(response.headers.get('content-range')) ?? 0,
    error: null,
  };
}

function quotePgIdentifier(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function loadPgClientClass() {
  const requireFromOrm = createRequire(resolve(process.cwd(), 'packages/orm/package.json'));
  return requireFromOrm('pg').Client;
}

function normalizePgConnectionString(dbUrl) {
  try {
    const parsed = new URL(dbUrl);
    parsed.searchParams.delete('sslmode');
    return parsed.toString();
  } catch {
    return dbUrl;
  }
}

async function countRecentRowsFromDb({ dbUrl, table, sinceIso, PgClient = loadPgClientClass() }) {
  const client = new PgClient({
    connectionString: normalizePgConnectionString(dbUrl),
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query(
      `select count(*)::int as count from public.${quotePgIdentifier(table)} where created_at >= $1`,
      [sinceIso],
    );
    return {
      table,
      count: Number(result.rows?.[0]?.count || 0),
      error: null,
    };
  } catch (error) {
    return {
      table,
      count: null,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await client.end().catch(() => {});
  }
}

async function readSupabaseError(response) {
  try {
    const body = await response.json();
    return body?.message || body?.hint || `${response.status} ${response.statusText}`;
  } catch {
    return `${response.status} ${response.statusText}`;
  }
}

function countOf(counts, table) {
  return counts.find((entry) => entry.table === table)?.count ?? 0;
}

function missingTables(counts) {
  return counts
    .filter((entry) => entry.error)
    .map((entry) => entry.table);
}

export function buildGateState({
  counts,
  host,
  dbHost,
  expectedHost,
  url,
  dbUrl,
  adminCredential,
  readbackSource,
}) {
  const blockers = [];
  const warnings = [];

  if (readbackSource === 'rest') {
    if (isPlaceholderUrl(url)) blockers.push('supabase_url_missing_or_placeholder');
    if (!isSupabaseAdminCredential(adminCredential)) {
      blockers.push('supabase_admin_credential_missing_or_not_service_role');
    }
    if (expectedHost && host !== expectedHost) {
      blockers.push(`supabase_host_mismatch:${host || 'missing'}!=${expectedHost}`);
    }
  }
  if (readbackSource === 'db') {
    if (isPlaceholderUrl(dbUrl)) blockers.push('supabase_db_url_missing_or_placeholder');
    if (expectedHost && normalizeSupabaseHost(dbHost) !== expectedHost) {
      blockers.push(`supabase_db_host_mismatch:${dbHost || 'missing'}!=${expectedHost}`);
    }
  }
  if (host && dbHost && normalizeSupabaseHost(dbHost) !== host) {
    blockers.push(`supabase_rest_db_host_mismatch:${host}!=${dbHost}`);
  }

  const pipelineRunCount = countOf(counts, 'pipeline_runs');
  const deliverableRunCount = countOf(counts, 'deliverable_pipeline_runs');
  const eventCount =
    countOf(counts, 'deliverable_pipeline_events') +
    countOf(counts, 'execution_events') +
    countOf(counts, 'stream_logs');
  const phaseCount = countOf(counts, 'deliverable_pipeline_phase_delegations');
  const agentStepCount = countOf(counts, 'deliverable_pipeline_agent_steps');
  const generationCount = countOf(counts, 'deliverable_pipeline_generations');
  const toolCount = countOf(counts, 'deliverable_pipeline_tool_executions');
  const ledgerRows = LEDGER_TABLES.map((table) => [table, countOf(counts, table)]);
  const missingLedgerRows = ledgerRows
    .filter(([, count]) => count === 0)
    .map(([table]) => table);
  const missing = missingTables(counts);
  const substitutedMissing = [];
  const hardMissing = [];
  for (const table of missing) {
    if (table === 'phase_executions' && phaseCount > 0) {
      substitutedMissing.push(table);
    } else if (SUBSTITUTABLE_TABLES.has(table)) {
      warnings.push(`substitutable_table_missing:${table}`);
    } else {
      hardMissing.push(table);
    }
  }
  if (substitutedMissing.length > 0) {
    warnings.push(`substituted_missing_tables:${substitutedMissing.join(',')}`);
  }
  if (hardMissing.length > 0) blockers.push(`missing_tables:${hardMissing.join(',')}`);

  if (pipelineRunCount === 0 && deliverableRunCount === 0) {
    blockers.push('pipeline_harness_run_missing');
  }
  if (eventCount === 0) blockers.push('pipeline_event_telemetry_missing');
  if (phaseCount === 0) blockers.push('pipeline_phase_trace_missing');
  if (agentStepCount === 0) blockers.push('pipeline_agent_step_trace_missing');
  if (generationCount === 0) blockers.push('model_generation_trace_missing');
  if (toolCount === 0) warnings.push('tool_execution_trace_missing_or_unused');
  if (missingLedgerRows.length > 0) {
    blockers.push(`ledger_settlement_rows_missing:${missingLedgerRows.join(',')}`);
  }

  return {
    state: blockers.length ? 'blocked' : 'ready_for_v28_result_review',
    blockers,
    warnings,
  };
}

export function printTextReport(report) {
  console.log(`V28 pipeline readback verification: ${report.gate.state}`);
  console.log(`Supabase host: ${report.supabase.host || 'missing'}`);
  if (report.supabase.dbHost) {
    console.log(`Supabase DB host: ${report.supabase.dbHost}`);
  }
  if (report.supabase.expectedHost) {
    console.log(`Expected host: ${report.supabase.expectedHost}`);
  }
  console.log(`Readback source: ${report.readbackSource}`);
  console.log(`Lookback: ${report.lookbackHours}h`);
  console.log('');

  console.log('Counts:');
  for (const entry of report.counts) {
    const status = entry.error ? `error: ${entry.error}` : String(entry.count);
    console.log(`- ${entry.table}: ${status}`);
  }

  if (report.gate.blockers.length) {
    console.log('');
    console.log('Blockers:');
    for (const blocker of report.gate.blockers) console.log(`- ${blocker}`);
  }

  if (report.gate.warnings.length) {
    console.log('');
    console.log('Warnings:');
    for (const warning of report.gate.warnings) console.log(`- ${warning}`);
  }
}

export async function buildVerificationReport(
  args,
  {
    baseEnv = process.env,
    fetchImpl = globalThis.fetch,
    PgClient,
  } = {},
) {
  const env = loadEnvironment(args.envFiles, baseEnv);
  const url = readSupabaseUrl(env);
  const dbUrl = readSupabaseDbUrl(env);
  const adminCredential = readAdminCredential(env);
  const host = readHost(url);
  const dbHost = readHost(dbUrl);
  const sinceIso = new Date(Date.now() - args.lookbackHours * 60 * 60 * 1000).toISOString();
  const readbackSource = args.readbackSource || 'rest';
  const hostMatchesExpectation = !args.expectedHost || host === args.expectedHost;
  const dbHostMatchesExpectation = !args.expectedHost || normalizeSupabaseHost(dbHost) === args.expectedHost;
  const hostsAreConsistent = !host || !dbHost || normalizeSupabaseHost(dbHost) === host;

  let counts = [];
  if (readbackSource === 'rest' &&
    !isPlaceholderUrl(url) &&
    isSupabaseAdminCredential(adminCredential) &&
    hostMatchesExpectation &&
    hostsAreConsistent
  ) {
    counts = await Promise.all(
      COUNTABLE_TABLES.map((table) => countRecentRows({
        url,
        key: adminCredential,
        table,
        sinceIso,
        fetchImpl,
      })),
    );
  } else if (
    readbackSource === 'db' &&
    !isPlaceholderUrl(dbUrl) &&
    dbHostMatchesExpectation
  ) {
    counts = await Promise.all(
      COUNTABLE_TABLES.map((table) => countRecentRowsFromDb({
        dbUrl,
        table,
        sinceIso,
        PgClient,
      })),
    );
  }

  const gate = buildGateState({
    counts,
    host,
    dbHost,
    expectedHost: args.expectedHost,
    url,
    dbUrl,
    adminCredential,
    readbackSource,
  });

  return {
    schema: 'bitcode.v28.pipeline-readback-verification',
    generatedAt: new Date().toISOString(),
    lookbackHours: args.lookbackHours,
    readbackSource,
    supabase: {
      host,
      dbHost: dbHost || null,
      expectedHost: args.expectedHost || null,
      urlProvided: Boolean(url),
      dbUrlProvided: Boolean(dbUrl),
      adminCredentialProvided: isSupabaseAdminCredential(adminCredential),
    },
    counts,
    gate,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return 0;
  }

  const report = await buildVerificationReport(args);

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printTextReport(report);
  }

  return report.gate.blockers.length ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
    .then((code) => {
      process.exitCode = code;
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    });
}
