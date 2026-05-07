export const TERMINAL_ROUTE = '/terminal' as const;

export function buildTerminalHref(params?: URLSearchParams | string | null) {
  const query = typeof params === 'string' ? params : params?.toString();
  return query ? `${TERMINAL_ROUTE}?${query}` : TERMINAL_ROUTE;
}
