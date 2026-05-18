import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildVerificationReport,
  isSecretPresent,
  isSupabaseAdminCredential,
  parseArgs,
} from './verify-v28-pipeline-readback.mjs';

const REQUIRED_TABLES = [
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
  'btd_asset_pack_ranges',
  'btc_fee_transactions',
  'btd_terminal_journal_entries',
  'btd_asset_pack_ledger_anchors',
  'btd_ownership_events',
  'btd_read_licenses',
  'btd_crypto_telemetry_events',
];

function okCountResponse(count) {
  return {
    ok: true,
    headers: {
      get(name) {
        return name.toLowerCase() === 'content-range' ? `0-0/${count}` : null;
      },
    },
  };
}

function fakeSupabaseJwt(role) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ role, iss: 'supabase' })}.signature`;
}

function mockPgClientClass(countByTable, seenTables = []) {
  return class MockPgClient {
    async connect() {}

    async query(sql) {
      const match = String(sql).match(/public\."([^"]+)"/u);
      const table = match?.[1] || '';
      seenTables.push(table);
      const value = countByTable instanceof Map
        ? countByTable.get(table) ?? 0
        : countByTable;
      return { rows: [{ count: value }] };
    }

    async end() {}
  };
}

describe('verify-v28-pipeline-readback', () => {
  it('accepts pnpm argument separators and validates lookback', () => {
    const parsed = parseArgs([
      '--',
      '--env-file',
      '.env.local',
      '--expected-host',
      'staging.supabase.co',
      '--readback-source',
      'db',
      '--lookback-hours',
      '12',
      '--json',
    ]);

    assert.deepEqual(parsed.envFiles, ['.env.local']);
    assert.equal(parsed.expectedHost, 'staging.supabase.co');
    assert.equal(parsed.readbackSource, 'db');
    assert.equal(parsed.lookbackHours, 12);
    assert.equal(parsed.json, true);
  });

  it('does not treat placeholder service-role values as present', () => {
    assert.equal(isSecretPresent('your-service-role-placeholder'), false);
    assert.equal(isSecretPresent('sb_secret_YOUR_KEY'), false);
    assert.equal(isSecretPresent('<service-role>'), false);
    assert.equal(isSecretPresent('realistic-service-role-value-with-length'), true);
    assert.equal(isSupabaseAdminCredential(fakeSupabaseJwt('anon')), false);
    assert.equal(isSupabaseAdminCredential(fakeSupabaseJwt('service_role')), true);
    assert.equal(isSupabaseAdminCredential('sb_secret_realistic_secret_key_value'), true);
  });

  it('blocks host mismatch without querying Supabase', async () => {
    let fetchCalls = 0;
    const report = await buildVerificationReport(
      {
        envFiles: [],
        expectedHost: 'tkpyosihuouusyaxtbau.supabase.co',
        lookbackHours: 48,
      },
      {
        baseEnv: {
          SUPABASE_URL: 'https://rinalyjfecxnmyczrpzo.supabase.co',
          SUPABASE_SERVICE_ROLE_KEY: fakeSupabaseJwt('service_role'),
        },
        fetchImpl: async () => {
          fetchCalls += 1;
          return okCountResponse(1);
        },
      },
    );

    assert.equal(fetchCalls, 0);
    assert.equal(report.gate.state, 'blocked');
    assert.ok(
      report.gate.blockers.includes(
        'supabase_host_mismatch:rinalyjfecxnmyczrpzo.supabase.co!=tkpyosihuouusyaxtbau.supabase.co',
      ),
    );
  });

  it('blocks inconsistent Supabase REST and DB project hosts', async () => {
    let fetchCalls = 0;
    const report = await buildVerificationReport(
      {
        envFiles: [],
        expectedHost: 'rinalyjfecxnmyczrpzo.supabase.co',
        lookbackHours: 48,
      },
      {
        baseEnv: {
          SUPABASE_URL: 'https://rinalyjfecxnmyczrpzo.supabase.co',
          SUPABASE_DB_URL: 'postgresql://postgres:secret@db.tkpyosihuouusyaxtbau.supabase.co:5432/postgres',
          SUPABASE_SERVICE_ROLE_KEY: fakeSupabaseJwt('service_role'),
        },
        fetchImpl: async () => {
          fetchCalls += 1;
          return okCountResponse(1);
        },
      },
    );

    assert.equal(fetchCalls, 0);
    assert.equal(report.gate.state, 'blocked');
    assert.ok(
      report.gate.blockers.includes(
        'supabase_rest_db_host_mismatch:rinalyjfecxnmyczrpzo.supabase.co!=db.tkpyosihuouusyaxtbau.supabase.co',
      ),
    );
  });

  it('returns ready when all required recent readback counts are present', async () => {
    const seenTables = [];
    const report = await buildVerificationReport(
      {
        envFiles: [],
        expectedHost: 'tkpyosihuouusyaxtbau.supabase.co',
        lookbackHours: 48,
      },
      {
        baseEnv: {
          SUPABASE_URL: 'https://tkpyosihuouusyaxtbau.supabase.co',
          SUPABASE_SERVICE_ROLE_KEY: fakeSupabaseJwt('service_role'),
        },
        fetchImpl: async (url) => {
          const parts = new URL(url).pathname.split('/').filter(Boolean);
          const table = parts[parts.length - 1];
          seenTables.push(table);
          return okCountResponse(1);
        },
      },
    );

    assert.equal(report.gate.state, 'ready_for_v28_result_review');
    assert.deepEqual(report.gate.blockers, []);
    assert.deepEqual(seenTables.sort(), REQUIRED_TABLES.sort());
  });

  it('can count recent rows through the database URL', async () => {
    const seenTables = [];
    const report = await buildVerificationReport(
      {
        envFiles: [],
        expectedHost: 'tkpyosihuouusyaxtbau.supabase.co',
        readbackSource: 'db',
        lookbackHours: 48,
      },
      {
        baseEnv: {
          SUPABASE_DB_URL: 'postgresql://postgres:secret@db.tkpyosihuouusyaxtbau.supabase.co:5432/postgres',
        },
        PgClient: mockPgClientClass(1, seenTables),
      },
    );

    assert.equal(report.readbackSource, 'db');
    assert.equal(report.gate.state, 'ready_for_v28_result_review');
    assert.deepEqual(report.gate.blockers, []);
    assert.deepEqual(seenTables.sort(), REQUIRED_TABLES.sort());
  });

  it('accepts deliverable phase delegation rows when the generic phase table is absent', async () => {
    const report = await buildVerificationReport(
      {
        envFiles: [],
        expectedHost: 'tkpyosihuouusyaxtbau.supabase.co',
        readbackSource: 'db',
        lookbackHours: 48,
      },
      {
        baseEnv: {
          SUPABASE_DB_URL: 'postgresql://postgres:secret@db.tkpyosihuouusyaxtbau.supabase.co:5432/postgres',
        },
        PgClient: class MockPgClient {
          async connect() {}

          async query(sql) {
            const table = String(sql).match(/public\."([^"]+)"/u)?.[1] || '';
            if (table === 'phase_executions') throw new Error('relation "public.phase_executions" does not exist');
            return { rows: [{ count: 1 }] };
          }

          async end() {}
        },
      },
    );

    assert.equal(report.gate.state, 'ready_for_v28_result_review');
    assert.ok(report.gate.warnings.includes('substituted_missing_tables:phase_executions'));
    assert.equal(report.gate.blockers.some((blocker) => blocker.includes('phase_executions')), false);
  });

  it('blocks missing ledger rows even when pipeline telemetry exists', async () => {
    const report = await buildVerificationReport(
      {
        envFiles: [],
        expectedHost: 'tkpyosihuouusyaxtbau.supabase.co',
        lookbackHours: 48,
      },
      {
        baseEnv: {
          SUPABASE_URL: 'https://tkpyosihuouusyaxtbau.supabase.co',
          SUPABASE_SERVICE_ROLE_KEY: fakeSupabaseJwt('service_role'),
        },
        fetchImpl: async (url) => {
          const table = new URL(url).pathname.split('/').filter(Boolean).pop();
          return okCountResponse(table?.startsWith('btd_') || table === 'btc_fee_transactions' ? 0 : 1);
        },
      },
    );

    assert.equal(report.gate.state, 'blocked');
    assert.ok(
      report.gate.blockers.some((blocker) =>
        blocker.startsWith('ledger_settlement_rows_missing:'),
      ),
    );
  });
});
