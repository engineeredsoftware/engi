"use strict";
// Simple codegen: parse Supabase migrations to output TS/Zod for AssetPack pipeline storage tables.
// SRP: migrations → generated types; orm exposes helpers; *-generics import aliases
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ROOT = path_1.default.resolve(__dirname, '../../../..');
const MIGRATIONS_DIR = path_1.default.join(ROOT, 'supabase', 'migrations');
const OUT_DIR = path_1.default.join(__dirname, '..', 'src', 'types', 'generated');
const OUT_FILE = path_1.default.join(OUT_DIR, 'deliverables_pipeline.generated.ts');
function readMigrations() {
    const files = fs_1.default.readdirSync(MIGRATIONS_DIR).filter(f => f.endsWith('.sql')).sort();
    return files.map(f => fs_1.default.readFileSync(path_1.default.join(MIGRATIONS_DIR, f), 'utf8')).join('\n');
}
function parseTables(sql) {
    const tables = [];
    const re = /CREATE\s+TABLE\s+IF\s+NOT\s+EXISTS\s+([a-zA-Z0-9_]+)\s*\(([^;]+?)\)\s*;/gims;
    let m;
    while ((m = re.exec(sql))) {
        const name = m[1];
        if (!name.startsWith('deliverables_pipeline_'))
            continue;
        const body = m[2];
        const columns = [];
        for (const line of body.split('\n')) {
            const trimmed = line.trim().replace(/,$/, '');
            if (!trimmed || trimmed.startsWith('--'))
                continue;
            const colMatch = trimmed.match(/^(\"?[a-zA-Z0-9_]+\"?)\s+([A-Z]+(?:\([^)]+\))?)/);
            if (!colMatch)
                continue;
            const colName = colMatch[1].replace(/\"/g, '');
            const sqlType = colMatch[2];
            columns.push({ name: colName, sqlType });
        }
        tables.push({ name, columns });
    }
    return tables;
}
function sqlToTs(sqlType) {
    const t = sqlType.toUpperCase();
    if (t.startsWith('UUID') || t.startsWith('TEXT'))
        return 'string';
    if (t.startsWith('TIMESTAMPTZ') || t.startsWith('TIMESTAMP'))
        return 'string';
    if (t.startsWith('INTEGER') || t.startsWith('INT'))
        return 'number';
    if (t.startsWith('DECIMAL') || t.startsWith('NUMERIC'))
        return 'number';
    if (t.startsWith('JSONB') || t.startsWith('JSON'))
        return 'any';
    if (t.startsWith('BOOLEAN'))
        return 'boolean';
    return 'any';
}
function sqlToZod(sqlType) {
    const t = sqlType.toUpperCase();
    if (t.startsWith('UUID') || t.startsWith('TEXT'))
        return 'z.string()';
    if (t.startsWith('TIMESTAMPTZ') || t.startsWith('TIMESTAMP'))
        return 'z.string()';
    if (t.startsWith('INTEGER') || t.startsWith('INT'))
        return 'z.number()';
    if (t.startsWith('DECIMAL') || t.startsWith('NUMERIC'))
        return 'z.number()';
    if (t.startsWith('JSONB') || t.startsWith('JSON'))
        return 'z.any()';
    if (t.startsWith('BOOLEAN'))
        return 'z.boolean()';
    return 'z.any()';
}
function generate(tables) {
    const header = `/* AUTO-GENERATED FROM supabase/migrations (AssetPack pipeline storage tables) */\nimport { z } from 'zod';\n`;
    let body = '';
    for (const tbl of tables) {
        const ifaceName = toPascal(tbl.name);
        body += `\nexport interface ${ifaceName} {\n`;
        for (const c of tbl.columns) {
            body += `  ${c.name}: ${sqlToTs(c.sqlType)};\n`;
        }
        body += `}\n`;
        body += `export const ${ifaceName}Schema = z.object({\n`;
        for (const c of tbl.columns) {
            body += `  ${c.name}: ${sqlToZod(c.sqlType)},\n`;
        }
        body += `});\n`;
    }
    return header + body;
}
function toPascal(s) {
    return s.split('_').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}
function main() {
    const sql = readMigrations();
    const tables = parseTables(sql);
    if (!fs_1.default.existsSync(OUT_DIR))
        fs_1.default.mkdirSync(OUT_DIR, { recursive: true });
    const content = generate(tables);
    fs_1.default.writeFileSync(OUT_FILE, content, 'utf8');
    console.log(`Generated: ${OUT_FILE}`);
}
if (require.main === module)
    main();
