import OpenAI from 'openai';
let supabaseModulePromise: Promise<typeof import('@bitcode/supabase')> | null = null;

function getEvidenceDocumentEmbeddingModel() {
  return (
    process.env.BITCODE_EVIDENCE_DOCUMENT_EMBEDDING_MODEL ??
    process.env.BITCODE_DEFAULT_EMBEDDING_MODEL ??
    'text-embedding-ada-002'
  );
}

async function getSupabaseAdmin() {
  if (!supabaseModulePromise) {
    supabaseModulePromise = import('@bitcode/supabase');
  }
  const mod = await supabaseModulePromise;
  return mod.supabaseAdmin;
}

interface SearchRelevantEvidenceDocumentsParams {
  repoOwner: string;
  repoName: string;
  repoBranch: string;
  repoCommit: string;
  stage: 'pre-context' | 'post-context';
  count?: number;
  embeddingClient?: EvidenceDocumentEmbeddingClient;
}

interface EvidenceDocumentEmbeddingClient {
  embeddings: {
    create(params: { model: string; input: string }): Promise<{ data: Array<{ embedding: unknown }> }>;
  };
}

export async function searchRelevantEvidenceDocuments(params: SearchRelevantEvidenceDocumentsParams) {
  if (!params.embeddingClient && !process.env.OPENAI_API_KEY) {
    return [];
  }

  const summary = [
    `Repository: ${params.repoOwner}/${params.repoName}`,
    `Branch: ${params.repoBranch}`,
    `Commit: ${params.repoCommit}`,
    `Stage: ${params.stage}`
  ].join('\n');

  const client = params.embeddingClient ?? new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  let embedding: unknown;
  try {
    const embeddingResponse = await client.embeddings.create({
      model: getEvidenceDocumentEmbeddingModel(),
      input: summary
    });

    embedding = embeddingResponse.data?.[0]?.embedding;
  } catch {
    return [];
  }

  if (!Array.isArray(embedding)) {
    return [];
  }

  const matchCount = params.count ?? (params.stage === 'post-context' ? 5 : 10);
  const supabaseAdmin = await getSupabaseAdmin();

  if (process.env.LOCAL_VECTOR_SEARCH === 'true') {
    // Physical table name is a retained Exchange storage identifier.
    const { data, error } = await supabaseAdmin
      .from('ai_document_templates')
      .select('template_id, title, description, content, embedding');

    if (error || !Array.isArray(data)) {
      return [];
    }

    const scored = data
      .map((row: any) => {
        const vector: number[] = Array.isArray(row.embedding) ? row.embedding : [];
        const similarity = dotProduct(vector, embedding);
        return {
          id: row.template_id,
          title: row.title,
          description: row.description,
          content: row.content,
          similarity
        };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, matchCount);

    return scored;
  }

  // Physical RPC name is a retained Exchange storage identifier.
  const { data, error } = await supabaseAdmin.rpc('match_ai_document_templates', {
    query_embedding: embedding,
    match_count: matchCount
  });

  if (error || !Array.isArray(data)) {
    return [];
  }

  return data.map((row: any) => ({
    id: row.template_id,
    title: row.title,
    description: row.description,
    content: row.content,
    similarity: row.similarity
  }));

  function dotProduct(vecA: number[], vecB: number[]): number {
    if (!Array.isArray(vecA) || !Array.isArray(vecB)) return 0;
    const length = Math.min(vecA.length, vecB.length);
    let sum = 0;
    for (let i = 0; i < length; i += 1) {
      const a = typeof vecA[i] === 'number' ? vecA[i] : 0;
      const b = typeof vecB[i] === 'number' ? vecB[i] : 0;
      sum += a * b;
    }
    return sum;
  }
}
