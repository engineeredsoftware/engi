// packages/digest/run
// Entry-point for building a digest.  During the first stage of the refactor we
// keep the public surface identical by re-exporting the current implementation
// from uapi/lib/digest/digest.ts.  Down-stream callers can immediately switch
// to `import { generateDigest } from "packages/digest/run"` (or its alias via
// ts-path mapping) without breaking existing behaviour.

import { generateDigest, callLLMAPI } from './digest';

export { generateDigest, callLLMAPI };

export default {
  generateDigest,
  callLLMAPI,
};
