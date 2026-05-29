export const TERMINAL_ROUTE = '/terminal' as const;
export const PACKS_ROUTE = '/packs' as const;
export const EXCHANGE_ROUTE = PACKS_ROUTE;

export function buildTerminalHref(params?: URLSearchParams | string | null) {
  const query = typeof params === 'string' ? params : params?.toString();
  return query ? `${TERMINAL_ROUTE}?${query}` : TERMINAL_ROUTE;
}

export function buildPacksHref(params?: URLSearchParams | string | null) {
  const query = typeof params === 'string' ? params : params?.toString();
  return query ? `${PACKS_ROUTE}?${query}` : PACKS_ROUTE;
}

export function buildExchangeHref(params?: URLSearchParams | string | null) {
  return buildPacksHref(params);
}
