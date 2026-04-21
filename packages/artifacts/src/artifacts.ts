/**
 * Unified helper for storing artifacts generated during pipeline execution.
 * At runtime we prefer an S3 bucket (configured via env vars) but fall back
 * to Supabase Storage if S3 is not available (e.g. local dev).
 */

import { createClient as createSupabase } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as crypto from 'crypto';

export interface ArtifactInfo {
  url: string;
  size: number;
  name: string;
  etag?: string;
}

const s3Bucket = process.env.ARTIFACT_S3_BUCKET;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let s3Client: S3Client | null = null;
if (s3Bucket && process.env.AWS_REGION) {
  s3Client = new S3Client({ region: process.env.AWS_REGION });
}

let supabaseStorage: ReturnType<typeof createSupabase> | null = null;
if (!s3Client && supabaseUrl && supabaseAnonKey) {
  supabaseStorage = createSupabase(supabaseUrl, supabaseAnonKey);
}

export async function saveArtifact(buffer: Uint8Array | string, name: string, contentType = 'application/octet-stream'): Promise<ArtifactInfo> {
  const bytes = typeof buffer === 'string' ? Buffer.from(buffer) : Buffer.from(buffer);
  const key = `${Date.now()}-${crypto.randomUUID()}-${name}`;

  if (s3Client) {
    await s3Client.send(new PutObjectCommand({
      Bucket: s3Bucket,
      Key: key,
      Body: bytes,
      ContentType: contentType,
    }));

    const url = `https://${s3Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return { url, size: bytes.length, name };
  }

  if (supabaseStorage) {
    const { data, error } = await supabaseStorage.storage.from('artifacts').upload(key, bytes, {
      contentType,
    });
    if (error) throw error;
    const { data: publicUrlData } = supabaseStorage.storage.from('artifacts').getPublicUrl(data?.path || key);
    return { url: publicUrlData.publicUrl, size: bytes.length, name };
  }

  throw new Error('No artifact storage backend configured (S3 or Supabase).');
}

/**
 * Put an artifact at an explicit key/path in the backing store.
 * Useful for stable locations (e.g., logs) that are updated over time.
 * When S3 is configured, places the object at `key` inside the configured bucket.
 * When falling back to Supabase Storage, uploads to the 'artifacts' bucket under `key`.
 */
export async function putArtifactAtKey(
  key: string,
  buffer: Uint8Array | string,
  contentType = 'application/octet-stream'
): Promise<ArtifactInfo> {
  const bytes = typeof buffer === 'string' ? Buffer.from(buffer) : Buffer.from(buffer);

  if (s3Client) {
    await s3Client.send(new PutObjectCommand({
      Bucket: s3Bucket!,
      Key: key,
      Body: bytes,
      ContentType: contentType,
    }));
    const url = `https://${s3Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return { url, size: bytes.length, name: key };
  }

  if (supabaseStorage) {
    const { data, error } = await supabaseStorage.storage.from('artifacts').upload(key, bytes, {
      contentType,
      upsert: true,
    } as any);
    if (error) throw error;
    const { data: publicUrlData } = supabaseStorage.storage.from('artifacts').getPublicUrl((data as any)?.path || key);
    return { url: publicUrlData.publicUrl, size: bytes.length, name: key };
  }

  throw new Error('No artifact storage backend configured (S3 or Supabase).');
}
