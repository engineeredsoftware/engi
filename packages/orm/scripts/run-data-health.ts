import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';

import {
  DataHealthSeverity,
  DataHealthSuite,
  getDataHealthChecksForSuite,
} from '../src/data-health/checks';
import {
  createDataHealthClient,
  readDataHealthConnectionInfo,
  redactConnectionString,
  resolveDataHealthConnectionString,
  runDataHealthChecks,
  type DataHealthCheckResult,
  type DataHealthRunReport,
} from '../src/data-health/runner';

type OutputFormat = 'pretty' | 'json' | 'ndjson';

interface CliOptions {
  suite: DataHealthSuite;
  failOn: DataHealthSeverity;
  format: OutputFormat;
  output?: string;
  list: boolean;
}

const DEFAULT_OPTIONS: CliOptions = {
  suite: 'daily',
  failOn: 'critical',
  format: 'pretty',
  list: false,
};

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.list) {
    for (const check of getDataHealthChecksForSuite(options.suite)) {
      console.log(`${check.id}\t${check.severity}\t${check.category}\t${check.title}`);
    }
    return;
  }

  const connectionString = resolveDataHealthConnectionString();
  if (!connectionString) {
    console.error(
      'Missing database connection string. Set SUPABASE_DB_URL, SUPABASE_DATABASE_URL, DATABASE_URL, or POSTGRES_URL.',
    );
    process.exitCode = 2;
    return;
  }

  const client = await createDataHealthClient(connectionString);
  try {
    const info = await readDataHealthConnectionInfo(client);
    if (options.format === 'pretty') {
      console.log(`[Bitcode data health] suite=${options.suite} failOn=${options.failOn}`);
      console.log(`[Bitcode data health] connection=${redactConnectionString(connectionString)}`);
      console.log(
        `[Bitcode data health] database=${info.database ?? 'unknown'} user=${info.user ?? 'unknown'} server=${info.serverVersion ?? 'unknown'}`,
      );
      console.log('');
    }

    const report = await runDataHealthChecks(client, {
      suite: options.suite,
      failOn: options.failOn,
    });
    const rendered = renderReport(report, options.format);

    if (options.output) {
      const outputPath = path.resolve(process.cwd(), options.output);
      mkdirSync(path.dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, rendered.endsWith('\n') ? rendered : `${rendered}\n`, 'utf8');
      if (options.format === 'pretty') {
        console.log(`\nWrote report: ${outputPath}`);
      }
    } else {
      console.log(rendered);
    }

    process.exitCode = report.summary.exitCode;
  } finally {
    await client.end();
  }
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = { ...DEFAULT_OPTIONS };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    if (arg === '--') {
      continue;
    }

    if (arg === '--list') {
      options.list = true;
      continue;
    }

    if (arg === '--suite') {
      options.suite = parseSuite(next);
      index += 1;
      continue;
    }

    if (arg.startsWith('--suite=')) {
      options.suite = parseSuite(arg.slice('--suite='.length));
      continue;
    }

    if (arg === '--fail-on') {
      options.failOn = parseSeverity(next);
      index += 1;
      continue;
    }

    if (arg.startsWith('--fail-on=')) {
      options.failOn = parseSeverity(arg.slice('--fail-on='.length));
      continue;
    }

    if (arg === '--format') {
      options.format = parseFormat(next);
      index += 1;
      continue;
    }

    if (arg.startsWith('--format=')) {
      options.format = parseFormat(arg.slice('--format='.length));
      continue;
    }

    if (arg === '--output') {
      options.output = requireValue('--output', next);
      index += 1;
      continue;
    }

    if (arg.startsWith('--output=')) {
      options.output = requireValue('--output', arg.slice('--output='.length));
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function parseSuite(value: string | undefined): DataHealthSuite {
  const normalized = requireValue('--suite', value);
  if (
    normalized === 'schema' ||
    normalized === 'identity' ||
    normalized === 'terminal' ||
    normalized === 'ledger' ||
    normalized === 'operational' ||
    normalized === 'daily' ||
    normalized === 'ci' ||
    normalized === 'qa' ||
    normalized === 'all'
  ) {
    return normalized;
  }
  throw new Error(`Invalid suite: ${normalized}`);
}

function parseSeverity(value: string | undefined): DataHealthSeverity {
  const normalized = requireValue('--fail-on', value);
  if (normalized === 'info' || normalized === 'warning' || normalized === 'critical') {
    return normalized;
  }
  throw new Error(`Invalid severity: ${normalized}`);
}

function parseFormat(value: string | undefined): OutputFormat {
  const normalized = requireValue('--format', value);
  if (normalized === 'pretty' || normalized === 'json' || normalized === 'ndjson') {
    return normalized;
  }
  throw new Error(`Invalid format: ${normalized}`);
}

function requireValue(flag: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function renderReport(report: DataHealthRunReport, format: OutputFormat): string {
  if (format === 'json') {
    return JSON.stringify(report, null, 2);
  }

  if (format === 'ndjson') {
    return [
      JSON.stringify({ type: 'summary', ...report.summary }),
      ...report.results.map((result) => JSON.stringify({ type: 'check', ...result })),
    ].join('\n');
  }

  return renderPretty(report);
}

function renderPretty(report: DataHealthRunReport): string {
  const lines = [
    `Summary: checked=${report.summary.checked} passed=${report.summary.passed} failed=${report.summary.failed} skipped=${report.summary.skipped} errored=${report.summary.errored} durationMs=${report.summary.durationMs}`,
    '',
  ];

  for (const result of report.results) {
    lines.push(renderPrettyResult(result));
  }

  if (report.summary.exitCode !== 0) {
    lines.push('');
    lines.push(`Data health failed at failOn=${report.summary.failOn}.`);
  }

  return lines.join('\n');
}

function renderPrettyResult(result: DataHealthCheckResult): string {
  const observed =
    typeof result.observedCount === 'number' ? ` observed=${result.observedCount}` : '';
  const base = `[${result.status.toUpperCase()}] ${result.id} (${result.severity}/${result.category})${observed} ${result.durationMs}ms`;

  if (result.status === 'pass') {
    return base;
  }

  const detailLines = [
    base,
    `  title: ${result.title}`,
    `  remediation: ${result.remediation}`,
  ];

  if (result.skippedReason) {
    detailLines.push(`  skipped: ${result.skippedReason}`);
  }
  if (result.errorMessage) {
    detailLines.push(`  error: ${result.errorMessage}`);
  }
  if (result.details !== null && result.details !== undefined) {
    detailLines.push(`  details: ${JSON.stringify(result.details)}`);
  }

  return detailLines.join('\n');
}

function printHelp() {
  console.log(`
Bitcode Supabase data-health runner

Usage:
  pnpm -C packages/orm run data-health -- --suite daily --fail-on critical

Connection env:
  SUPABASE_DB_URL, SUPABASE_DATABASE_URL, DATABASE_URL, or POSTGRES_URL

Options:
  --suite <schema|identity|terminal|ledger|operational|daily|ci|qa|all>
  --fail-on <info|warning|critical>
  --format <pretty|json|ndjson>
  --output <path>
  --list
`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 2;
});
