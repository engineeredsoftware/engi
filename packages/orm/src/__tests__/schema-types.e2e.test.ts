import { readFileSync } from 'fs';
import path from 'path';

import { getRequiredGeneratedTypeTableNames } from '../data-health/checks';

const maybeDescribe =
  process.env.BITCODE_RUN_SCHEMA_TYPES_E2E === 'true' ? describe : describe.skip;

maybeDescribe('Supabase generated schema types E2E', () => {
  it('contains every canonical public table in generated and ORM database types', () => {
    const repoRoot = path.resolve(__dirname, '../../../..');
    const generatedTypes = readFileSync(
      path.join(repoRoot, 'packages/orm/src/types/database.generated.ts'),
      'utf8',
    );
    const ormTypes = readFileSync(path.join(repoRoot, 'packages/orm/src/types/database.ts'), 'utf8');

    for (const tableName of getRequiredGeneratedTypeTableNames()) {
      expect(generatedTypes).toMatch(new RegExp(`\\b${tableName}\\s*:`));
      expect(ormTypes).toMatch(new RegExp(`\\b${tableName}\\s*:`));
    }
  });
});
