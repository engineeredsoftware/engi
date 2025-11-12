export interface ArtifactResult {
  url: string;
  size: number;
  name: string;
  contentType?: string;
}

export async function saveArtifact(
  _buf: unknown,
  name: string,
  _contentType?: string,
): Promise<ArtifactResult> {
  return {
    url: `mock://artifacts/${name}`,
    size: 0,
    name,
    contentType: _contentType,
  };
}
