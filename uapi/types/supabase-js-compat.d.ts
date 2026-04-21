declare module '@supabase/supabase-js' {
  export interface SupabaseClient<T = unknown> {
    from(table: string): any;
    rpc(fn: string, params?: Record<string, unknown>): Promise<any>;
    auth: any;
  }

  export function createClient<T = unknown>(
    url: string,
    key: string,
    options?: Record<string, unknown>,
  ): SupabaseClient<T>;
}
