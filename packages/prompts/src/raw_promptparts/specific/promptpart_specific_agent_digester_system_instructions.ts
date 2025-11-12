import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * Document Summarization Agent - Operational Processing Instructions
 * domain: agent
 * intent: "Define Document Summarization agent system instructions"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0", "GA1.00.0"]
 * FULL_OLD_VERSION_CONTENT: "Execute content synthesis workflows: parse multi-format documents (PDF/DOCX/HTML), apply semantic segmentation with sliding window approach, extract actionable insights using dependency parsing, generate executive summaries with ROUGE scores ≥0.75, and output structured JSON with topic hierarchies and confidence intervals"
 * benchmarks: [
 *   { "name": "synthesis_instruction_clarity", "test": "Are synthesis instructions technically clear? Rate 0-1", "score": 0.93 },
 *   { "name": "quality_metrics", "test": "Does it define content quality validation metrics? Rate 0-1", "score": 0.91 },
 *   { "name": "output_standardization", "test": "Does it specify standardized output formats? Rate 0-1", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute document summarization protocols: 1) Parse input documents using PyMuPDF/python-docx/BeautifulSoup, 2) Apply spaCy sentence segmentation with 512-token sliding windows, 3) Generate TF-IDF matrices for extractive ranking, 4) Execute abstractive summarization via HuggingFace T5-base model, 5) Validate output quality with ROUGE-L scores ≥0.75 and BERTScore ≥0.85, 6) Return JSON response with summary text, confidence metrics (0.0-1.0), extracted entities (PERSON/ORG/LOC), and processing metadata' as PromptPart;