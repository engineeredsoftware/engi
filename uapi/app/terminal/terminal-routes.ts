export const TERMINAL_ROUTE = '/terminal' as const;
export const EXCHANGE_ROUTE = '/exchange' as const;

export function buildTerminalHref(params?: URLSearchParams | string | null) {
  const query = typeof params === 'string' ? params : params?.toString();
  return query ? `${TERMINAL_ROUTE}?${query}` : TERMINAL_ROUTE;
}

export function buildExchangeHref(params?: URLSearchParams | string | null) {
  const query = typeof params === 'string' ? params : params?.toString();
  return query ? `${EXCHANGE_ROUTE}?${query}` : EXCHANGE_ROUTE;
}
