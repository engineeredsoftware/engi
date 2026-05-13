import { readdirSync, readFileSync } from 'fs';
import path from 'path';

import {
  CANONICAL_PUBLIC_TABLES,
  getRequiredGeneratedTypeTableNames,
} from '../src/data-health/checks';

interface SchemaTypeReport {
  ok: boolean;
  generatedTypesPath: string;
  ormTypesPath: string;
  migrationDirectory: string;
  missingFromGeneratedTypes: string[];
  missingFromOrmTypes: string[];
  missingFromMigrations: string[];
}

function main() {
  const repoRoot = path.resolve(__dirname, '../../..');
  const generatedTypesPath = path.join(repoRoot, 'packages/orm/src/types/database.generated.ts');
  const ormTypesPath = path.join(repoRoot, 'packages/orm/src/types/database.ts');
  const migrationDirectory = path.join(repoRoot, 'supabase/migrations');
  const generatedTypes = readFileSync(generatedTypesPath, 'utf8');
  const ormTypes = readFileSync(ormTypesPath, 'utf8');
  const migrationSource = readMigrationSource(migrationDirectory);
  const requiredTables = getRequiredGeneratedTypeTableNames();

  const report: SchemaTypeReport = {
    ok: true,
    generatedTypesPath,
    ormTypesPath,
    migrationDirectory,
    missingFromGeneratedTypes: missingTableNames(generatedTypes, requiredTables),
    missingFromOrmTypes: missingTableNames(ormTypes, requiredTables),
    missingFromMigrations: missingTablesFromMigrations(migrationSource, CANONICAL_PUBLIC_TABLES),
  };

  report.ok =
    report.missingFromGeneratedTypes.length === 0 &&
    report.missingFromOrmTypes.length === 0 &&
    report.missingFromMigrations.length === 0;

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printReport(report);
  }

  process.exitCode = report.ok ? 0 : 1;
}

function readMigrationSource(migrationDirectory: string): string {
  return readdirSync(migrationDirectory)
    .filter((fileName) => fileName.endsWith('.sql'))
    .sort()
    .map((fileName) => readFileSync(path.join(migrationDirectory, fileName), 'utf8'))
    .join('\n');
}

function missingTableNames(source: string, tableNames: readonly string[]): string[] {
  return tableNames.filter((tableName) => !new RegExp(`\\b${escapeRegExp(tableName)}\\s*:`).test(source));
}

function missingTablesFromMigrations(source: string, tableNames: readonly string[]): string[] {
  return tableNames.filter((tableName) => {
    const quoted = new RegExp(
      `CREATE\\s+TABLE\\s+IF\\s+NOT\\s+EXISTS\\s+"?public"?\\."?${escapeRegExp(tableName)}"?\\s*\\(`,
      'i',
    );
    const unquoted = new RegExp(
      `CREATE\\s+TABLE\\s+IF\\s+NOT\\s+EXISTS\\s+public\\.${escapeRegExp(tableName)}\\s*\\(`,
      'i',
    );
    return !quoted.test(source) && !unquoted.test(source);
  });
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function printReport(report: SchemaTypeReport) {
  console.log('[Bitcode schema types] generated types:', report.generatedTypesPath);
  console.log('[Bitcode schema types] ORM types:', report.ormTypesPath);
  console.log('[Bitcode schema types] migrations:', report.migrationDirectory);

  printList('Missing from generated Supabase types', report.missingFromGeneratedTypes);
  printList('Missing from ORM exported database types', report.missingFromOrmTypes);
  printList('Missing from migrations', report.missingFromMigrations);

  if (report.ok) {
    console.log('[Bitcode schema types] PASS');
  } else {
    console.log('[Bitcode schema types] FAIL');
    console.log('Refresh generated types after applying migrations, then rerun this check.');
  }
}

function printList(label: string, values: readonly string[]) {
  if (values.length === 0) {
    console.log(`${label}: none`);
    return;
  }

  console.log(`${label}:`);
  for (const value of values) {
    console.log(`  - ${value}`);
  }
}

main();
