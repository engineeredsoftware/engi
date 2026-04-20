export async function getRepository(): Promise<unknown> {
  return {};
}

export async function getAllBranches(): Promise<unknown[]> {
  return [];
}

export async function getCommit(): Promise<unknown> {
  return {};
}

export async function getFileContent(): Promise<string> {
  return '';
}

export async function cloneRepository(): Promise<string> {
  return '/tmp/bitcode/mock-repo';
}
