import {
  createDataHealthClient,
  resolveDataHealthConnectionString,
  runDataHealthChecks,
} from '../data-health/runner';

const maybeDescribe =
  process.env.BITCODE_RUN_DB_HEALTH_E2E === 'true' ? describe : describe.skip;

maybeDescribe('Supabase data-health live E2E', () => {
  it('runs the CI health suite against the configured database', async () => {
    const connectionString = resolveDataHealthConnectionString();
    expect(connectionString).toBeTruthy();

    const client = await createDataHealthClient(connectionString as string);
    try {
      const report = await runDataHealthChecks(client, {
        suite: 'ci',
        failOn: 'critical',
      });

      expect(report.summary.exitCode).toBe(0);
    } finally {
      await client.end();
    }
  }, 30000);
});
