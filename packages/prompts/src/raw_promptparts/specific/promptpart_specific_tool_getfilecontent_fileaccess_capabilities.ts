import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "File access capabilities for Get File Content Tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "format_coverage", "test": "Does it specify concrete file formats? Rate 0-1", "score": 0.95 },
 *   { "name": "encoding_handling", "test": "Are encoding detection methods clear? Rate 0-1", "score": 0.93 },
 *   { "name": "binary_support", "test": "Does it handle binary files properly? Rate 0-1", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_FILEACCESS_CAPABILITIES: PromptPart = 
  'File system access with support for 200+ formats (PDF, DOCX, CSV, JSON, XML, etc.), UTF-8/16 encoding detection and conversion, binary file handling with MIME type validation, line-by-line streaming for large files (>100MB), compression support (gzip, brotli, zip archives), encrypted file handling with OpenSSL integration' as PromptPart;