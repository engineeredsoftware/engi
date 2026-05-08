import path from 'node:path';

export function resolveDemonstrationWitnessPublicDir() {
  const configured = process.env.BITCODE_PROTOCOL_PUBLIC_DIR;
  if (configured) return configured;

  return path.resolve(process.cwd(), '../packages/protocol/public');
}
