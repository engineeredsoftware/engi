/**
 * UAPI-specific browser VCS caching utility
 * Ultra-specific naming and placement under uapi/lib/ per architecture rules.
 */

import { VCSCache } from '@engi/vcs';

/**
 * UAPI-specific cache with custom TTL for UI responsiveness
 */
export const uapiVCSCache = new VCSCache({
  ttl: 1 * 60 * 1000 // 1 minute for UI freshness
});

