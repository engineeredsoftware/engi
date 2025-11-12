#!/usr/bin/env ts-node
// Load environment
require('dotenv').config();
// Validate API key
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is required');
  process.exit(1);
}
const { OpenAI } = require('openai');
const { supabaseAdmin } = require('@engi/supabase');

async function main() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  console.log('Fetching existing deliverables...');
  const { data: deliverables, error: fetchError } = await supabaseAdmin
    .from('deliverables')
    .select('id, user_id, output');
  if (fetchError) {
    console.error('Failed to fetch deliverables:', fetchError.message);
    process.exit(1);
  }
  console.log(`Embedding ${deliverables.length} deliverables...`);
  for (const d of deliverables) {
    process.stdout.write(`Embedding deliverable '${d.id}'... `);
    try {
      const res = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: d.output || ''
      });
      const embedding = res.data[0].embedding;
      const { error: upsertError } = await supabaseAdmin
        .from('deliverable_vectors')
        .upsert({
          deliverable_id: d.id,
          user_id: d.user_id,
          output: d.output,
          embedding,
          updated_at: new Date().toISOString()
        });
      if (upsertError) {
        console.error('FAILED', upsertError.message);
      } else {
        console.log('OK');
      }
    } catch (err) {
      console.error('ERROR', err.message || err);
    }
  }
}

main().catch(err => {
  console.error('Sync deliverables failed:', err);
  process.exit(1);
});
