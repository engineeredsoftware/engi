/**
 * VECTOR QUERY - Production-grade vector search
 * 
 * @doc-code
 * type: query
 * purpose: Vector similarity search using pgvector
 * capabilities: ["semantic-search", "embedding-match", "similarity-scoring"]
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database';
import { log } from '@engi/logger';
// TODO: metrics not yet implemented in observability package
// import { metrics } from '@engi/observability';

export interface VectorSearchParams {
  query: string | number[];
  collection: string;
  limit?: number;
  threshold?: number;
  filter?: Record<string, unknown>;
}

export interface VectorSearchResult {
  id: string;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}

export class VectorQuery {
  constructor(private supabase: SupabaseClient<Database>) {}

  /**
   * Search for similar vectors
   */
  async searchSimilar(params: VectorSearchParams): Promise<VectorSearchResult[]> {
    const startTime = Date.now();
    
    try {
      // Convert string query to embedding if needed
      const embedding = typeof params.query === 'string' 
        ? await this.getEmbedding(params.query)
        : params.query;

      // Call the match_vectors RPC function
      const { data, error } = await this.supabase.rpc('match_vectors', {
        query_embedding: embedding,
        match_threshold: params.threshold || 0.7,
        match_count: params.limit || 10,
        filter: params.filter
      });

      if (error) throw error;

      log.info('Vector search completed', {
        collection: params.collection,
        resultsCount: data?.length || 0,
        duration: Date.now() - startTime
      });

      return data || [];
    } catch (error) {
      log.error('Vector search failed', { error, params });
      throw error;
    } finally {
      // TODO: Re-enable when metrics is implemented
      // metrics.recordVectorSearch({
      //   collection: params.collection,
      //   duration: Date.now() - startTime
      // });
    }
  }

  /**
   * Insert vector with content
   */
  async insert(params: {
    collection: string;
    content: string;
    embedding: number[];
    metadata?: Record<string, unknown>;
  }): Promise<string> {
    const startTime = Date.now();
    
    try {
      const { data, error } = await this.supabase
        .from('vectors')
        .insert({
          collection: params.collection,
          content: params.content,
          embedding: params.embedding,
          metadata: params.metadata || {}
        })
        .select('id')
        .single();

      if (error) throw error;

      log.info('Vector inserted', {
        collection: params.collection,
        id: data.id
      });

      return data.id;
    } catch (error) {
      log.error('Vector insert failed', { error, collection: params.collection });
      throw error;
    } finally {
      // TODO: Re-enable when metrics is implemented
      // metrics.recordVectorOperation({
      //   operation: 'insert',
      //   collection: params.collection,
      //   duration: Date.now() - startTime
      // });
    }
  }

  /**
   * Batch insert vectors
   */
  async insertBatch(vectors: Array<{
    collection: string;
    content: string;
    embedding: number[];
    metadata?: Record<string, unknown>;
  }>): Promise<string[]> {
    const startTime = Date.now();
    
    try {
      const { data, error } = await this.supabase
        .from('vectors')
        .insert(vectors.map(v => ({
          collection: v.collection,
          content: v.content,
          embedding: v.embedding,
          metadata: v.metadata || {}
        })))
        .select('id');

      if (error) throw error;

      const ids = (data || []).map(d => d.id);
      
      log.info('Batch vectors inserted', {
        count: ids.length
      });

      return ids;
    } catch (error) {
      log.error('Batch vector insert failed', { error, count: vectors.length });
      throw error;
    } finally {
      // TODO: Re-enable when metrics is implemented
      // metrics.recordVectorOperation({
      //   operation: 'insertBatch',
      //   count: vectors.length,
      //   duration: Date.now() - startTime
      // });
    }
  }

  /**
   * Update vector metadata
   */
  async updateMetadata(
    vectorId: string,
    metadata: Record<string, unknown>
  ): Promise<void> {
    const { error } = await this.supabase
      .from('vectors')
      .update({ metadata })
      .eq('id', vectorId);

    if (error) throw error;
  }

  /**
   * Delete vectors by collection
   */
  async deleteCollection(collection: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('vectors')
      .delete()
      .eq('collection', collection)
      .select('id');

    if (error) throw error;

    const count = data?.length || 0;
    
    log.info('Vector collection deleted', {
      collection,
      count
    });

    return count;
  }

  /**
   * Get collections statistics
   */
  async getCollectionStats(): Promise<Array<{
    collection: string;
    count: number;
    avgSimilarity?: number;
  }>> {
    const { data, error } = await this.supabase
      .from('vectors')
      .select('collection')
      .order('collection');

    if (error) throw error;

    // Group by collection and count
    const stats = new Map<string, number>();
    (data || []).forEach(row => {
      const count = stats.get(row.collection) || 0;
      stats.set(row.collection, count + 1);
    });

    return Array.from(stats.entries()).map(([collection, count]) => ({
      collection,
      count
    }));
  }

  /**
   * Get embedding for text (would call an embedding service)
   */
  private async getEmbedding(text: string): Promise<number[]> {
    // In production, this would call OpenAI, Cohere, or another embedding service
    // For now, return a mock embedding
    log.warn('Using mock embedding - implement real embedding service');
    
    // Generate a deterministic mock embedding based on text
    const hash = this.hashString(text);
    const embedding = new Array(1536).fill(0).map((_, i) => 
      Math.sin(hash * (i + 1)) * 0.1
    );
    
    return embedding;
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}