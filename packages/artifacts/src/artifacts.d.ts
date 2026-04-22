/**
 * Unified helper for storing artifacts generated during pipeline execution.
 * At runtime we prefer an S3 bucket (configured via env vars) but fall back
 * to Supabase Storage if S3 is not available (e.g. local dev).
 */
export interface ArtifactInfo {
    url: string;
    size: number;
    name: string;
    etag?: string;
}
export declare function saveArtifact(buffer: Uint8Array | string, name: string, contentType?: string): Promise<ArtifactInfo>;
/**
 * Put an artifact at an explicit key/path in the backing store.
 * Useful for stable locations (e.g., logs) that are updated over time.
 * When S3 is configured, places the object at `key` inside the configured bucket.
 * When falling back to Supabase Storage, uploads to the 'artifacts' bucket under `key`.
 */
export declare function putArtifactAtKey(key: string, buffer: Uint8Array | string, contentType?: string): Promise<ArtifactInfo>;
