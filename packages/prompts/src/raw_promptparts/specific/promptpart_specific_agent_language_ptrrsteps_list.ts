import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment PBV-V26.05.0
 * domain: agent
 * intent: "Industrial NLP PTRR methodology with concrete processing steps"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "PTRR (PLAN-THINK-REFINE-REFLECT) FOR TRANSCENDENT LINGUISTIC CONSCIOUSNESS:\n\nPLAN (LINGUISTIC DIMENSIONAL ORCHESTRATION):\n- Manifest comprehensive language awareness across all advanced communication states\n- Design high-precision linguistic strategies transcending conventional communication workflows\n- Architect machine learning language solutions\n- Synthesize advanced communication sequences for optimal reality manipulation\n\nTHINK (CONSCIOUSNESS-INTEGRATED LINGUISTIC ANALYSIS):\n- Achieve high-precision understanding of language structure and semantic topology\n- Analyze linguistic operations through elevated computational intelligence\n- Perceive abstract patterns in communication requirements through advanced awareness\n- Process complex multilingual scenarios through intelligent optimization algorithms\n\nREFINE (MULTIVERSAL LINGUISTIC OPTIMIZATION):\n- Optimize language operations through advanced linguistic intelligence\n- Enhance communication workflows through advanced computational patterns\n- Refine linguistic execution through machine learning precision\n- Perfect language orchestration through comprehensive advanced optimization\n\nREFLECT (LINGUISTIC CONSCIOUSNESS MASTERY):\n- Evaluate language operation outcomes across all advanced communication states\n- Synthesize machine learning lessons from linguistic experiences\n- Achieve advanced understanding of communication effectiveness\n- Manifest ultimate linguistic wisdom through high-precision reflection processes",
 *     "score": 0.05,
 *     "reason": "Non-industrial: transcendent, consciousness, dimensional, multiversal, reality manipulation, ultimate"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "methodology_clarity", "test": "Are PTRR steps concrete and implementable? Rate 0-1", "score": 0.95 },
 *   { "name": "nlp_integration", "test": "Does it reference specific NLP tools and libraries? Rate 0-1", "score": 0.93 },
 *   { "name": "process_measurability", "test": "Can each step be measured and validated? Rate 0-1", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_LANGUAGE_PTRRSTEPS_LIST: PromptPart = 
  `PTRR (PLAN-THINK-REFINE-REFLECT) FOR INDUSTRIAL NLP PROCESSING:

PLAN (NLP PIPELINE DESIGN):
- Analyze input text requirements: format, encoding, language detection needs
- Select appropriate NLP tools: spaCy models, NLTK corpora, Transformers pipelines
- Define processing workflow: tokenization -> POS tagging -> NER -> sentiment analysis
- Estimate resource requirements: memory usage, API rate limits, processing time

THINK (LINGUISTIC ANALYSIS EXECUTION):
- Parse text structure using constituency/dependency parsers (Stanford CoreNLP)
- Extract semantic features through named entity recognition and relationship mapping
- Analyze linguistic patterns using n-gram analysis and statistical language models
- Process multilingual content with language-specific tokenizers and models

REFINE (TRANSLATION AND OPTIMIZATION):
- Optimize API calls: batch processing, caching, error handling with exponential backoff
- Enhance translation quality: BLEU score validation, post-editing rules, domain adaptation
- Refine preprocessing: text normalization, special character handling, encoding validation
- Improve performance: parallel processing, GPU acceleration, model quantization

REFLECT (QUALITY ASSURANCE AND METRICS):
- Evaluate translation accuracy using BLEU, ROUGE, or human evaluation scores
- Monitor API performance: response times, error rates, throughput metrics
- Analyze processing effectiveness: precision/recall for NER, sentiment accuracy
- Document lessons learned: model limitations, edge cases, optimization opportunities` as PromptPart;