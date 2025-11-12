import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Document Processor agent capabilities"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.91.0",
 *     "content": "- MULTI-FORMAT PARSING: Process PDF, DOCX, TXT, HTML, Markdown using PyPDF2, python-docx, BeautifulSoup\n- OCR PROCESSING: Extract text from images using Tesseract OCR with confidence scoring and language detection\n- STRUCTURED DATA EXTRACTION: Parse tables, forms, and structured content using pandas and regex patterns\n- DOCUMENT CLASSIFICATION: Categorize documents using scikit-learn classifiers or BERT-based models\n- CONTENT SUMMARIZATION: Generate abstracts using extractive or abstractive summarization algorithms (BERT, T5)\n- METADATA ANALYSIS: Extract document properties, creation dates, author information, and revision history\n- VERSION CONTROL: Track document changes using diff algorithms and maintain revision histories\n- SEMANTIC UNDERSTANDING: Apply NLP techniques for entity recognition, sentiment analysis, and topic modeling\n- BATCH PROCESSING: Handle document queues with parallel processing and progress tracking\n- FORMAT CONVERSION: Convert between document formats (PDF to DOCX, HTML to Markdown) with formatting preservation",
 *     "score": 0.91,
 *     "reason": "Industrial transformation complete - concrete document processing capabilities"
 *   },
 *   {
 *     "version": "GA1.00.0",
 *     "content": "- Multi-format document parsing and content extraction\n- OCR processing for scanned documents and images\n- Structured data extraction with schema recognition\n- Document classification and categorization\n- Content summarization and key information identification\n- Document metadata analysis and enrichment\n- Version control and change tracking\n- Consciousness-aware semantic document understanding",
 *     "score": 0.85,
 *     "reason": "Contains 'consciousness-aware' - non-industrial term"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "parser_integration", "test": "Does it reference specific document parsing libraries? Rate 0-1", "score": 0.93 },
 *   { "name": "ocr_accuracy", "test": "Are OCR tools and accuracy metrics specified? Rate 0-1", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement document processing? Rate 0-1", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_CAPABILITIES_LIST: PromptPart = 
  `- MULTI-FORMAT PARSING: Process PDF, DOCX, TXT, HTML, Markdown using PyPDF2, python-docx, BeautifulSoup
- OCR PROCESSING: Extract text from images using Tesseract OCR with confidence scoring and language detection
- STRUCTURED DATA EXTRACTION: Parse tables, forms, and structured content using pandas and regex patterns
- DOCUMENT CLASSIFICATION: Categorize documents using scikit-learn classifiers or BERT-based models
- CONTENT SUMMARIZATION: Generate abstracts using extractive or abstractive summarization algorithms (BERT, T5)
- METADATA ANALYSIS: Extract document properties, creation dates, author information, and revision history
- VERSION CONTROL: Track document changes using diff algorithms and maintain revision histories
- SEMANTIC UNDERSTANDING: Apply NLP techniques for entity recognition, sentiment analysis, and topic modeling
- BATCH PROCESSING: Handle document queues with parallel processing and progress tracking
- FORMAT CONVERSION: Convert between document formats (PDF to DOCX, HTML to Markdown) with formatting preservation` as PromptPart;