import { readdirSync, readFileSync } from 'fs';
import path from 'path';

import {
  CANONICAL_BTD_TABLES,
  CANONICAL_PUBLIC_TABLES,
  DATA_HEALTH_CHECKS,
  getDataHealthChecksForSuite,
  getRequiredGeneratedTypeTableNames,
} from '../data-health/checks';

const repoRoot = path.resolve(__dirname, '../../../..');

describe('Supabase data-health manifest', () => {
  it('keeps check identifiers unique and operationally documented', () => {
    const ids = new Set<string>();

    for (const check of DATA_HEALTH_CHECKS) {
      expect(ids.has(check.id)).toBe(false);
      ids.add(check.id);
      expect(check.title).toBeTruthy();
      expect(check.description).toBeTruthy();
      expect(check.remediation).toBeTruthy();
      expect(check.sql).toContain(' ok');
      expect(check.sql).toContain('observed_count');
      expect(check.sql).toContain('details');
    }
  });

  it('keeps daily, CI, and QA suites populated with schema and ledger checks', () => {
    for (const suite of ['daily', 'ci', 'qa'] as const) {
      const checks = getDataHealthChecksForSuite(suite);
      expect(checks.length).toBeGreaterThan(0);
      expect(checks.some((check) => check.category === 'schema')).toBe(true);
      expect(checks.some((check) => check.category === 'ledger')).toBe(true);
    }
  });

  it('tracks the canonical BTD registry migration tables', () => {
    const migrationsDir = path.join(repoRoot, 'supabase/migrations');
    const migrationSource = readdirSync(migrationsDir)
      .filter((fileName) => fileName.endsWith('.sql'))
      .sort()
      .map((fileName) => readFileSync(path.join(migrationsDir, fileName), 'utf8'))
      .join('\n');

    for (const tableName of CANONICAL_BTD_TABLES) {
      expect(migrationSource).toContain(`CREATE TABLE IF NOT EXISTS public.${tableName}`);
      expect(migrationSource).toContain(`ALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY`);
    }
  });

  it('declares generated type coverage for every canonical public table', () => {
    expect(getRequiredGeneratedTypeTableNames()).toEqual([...CANONICAL_PUBLIC_TABLES]);
  });
});
